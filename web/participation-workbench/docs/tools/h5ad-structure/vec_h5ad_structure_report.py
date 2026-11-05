#!/usr/bin/env python3
"""Print a metadata-only structural report for an AnnData H5AD file."""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

import h5py


def _plain(value: Any) -> Any:
    """Convert HDF5 attribute values to JSON-safe values without exposing arrays."""
    if isinstance(value, bytes):
        return value.decode("utf-8", errors="replace")
    if hasattr(value, "tolist"):
        return _plain(value.tolist())
    if isinstance(value, (list, tuple)):
        return [_plain(item) for item in value]
    if isinstance(value, (str, int, float, bool)) or value is None:
        return value
    return str(value)


def _shape(node: h5py.Group | h5py.Dataset) -> list[int] | None:
    if isinstance(node, h5py.Dataset):
        return [int(size) for size in node.shape]
    if "shape" in node.attrs:
        try:
            return [int(size) for size in node.attrs["shape"]]
        except (TypeError, ValueError):
            return None
    return None


def _dataset_summary(node: h5py.Dataset) -> dict[str, Any]:
    """Describe storage metadata only; do not index or read values."""
    return {
        "kind": "dataset",
        "shape": _shape(node),
        "dtype": str(node.dtype),
        "compression": node.compression,
        "chunks": list(node.chunks) if node.chunks else None,
    }


def _node_summary(node: h5py.Group | h5py.Dataset) -> dict[str, Any]:
    if isinstance(node, h5py.Dataset):
        return _dataset_summary(node)

    summary: dict[str, Any] = {
        "kind": "group",
        "encoding_type": _plain(node.attrs.get("encoding-type")),
        "shape": _shape(node),
        "keys": sorted(str(key) for key in node.keys()),
    }
    # AnnData CSR/CSC encodings keep matrix values in a data dataset and shape
    # on the group. Reporting its length reveals nnz, not the values themselves.
    data = node.get("data")
    if isinstance(data, h5py.Dataset):
        summary["data_dtype"] = str(data.dtype)
        summary["stored_values"] = int(data.shape[0]) if data.shape else 1
    for index_name in ("indices", "indptr"):
        index = node.get(index_name)
        if isinstance(index, h5py.Dataset):
            summary[f"{index_name}_dtype"] = str(index.dtype)
            summary[f"{index_name}_length"] = int(index.shape[0]) if index.shape else 1
    return summary


def _table_summary(node: h5py.Group) -> dict[str, Any]:
    index_name = _plain(node.attrs.get("_index", "_index"))
    columns = []
    for name in sorted(node.keys()):
        if name in {str(index_name), "_index", "_column-order"}:
            continue
        child = node[name]
        entry: dict[str, Any] = {"name": name}
        if isinstance(child, h5py.Dataset):
            entry.update({"shape": _shape(child), "dtype": str(child.dtype)})
        else:
            entry.update({"encoding_type": _plain(child.attrs.get("encoding-type")), "keys": sorted(str(key) for key in child.keys())})
            categories = child.get("categories")
            codes = child.get("codes")
            if isinstance(categories, h5py.Dataset):
                entry["category_count"] = int(categories.shape[0]) if categories.shape else 1
            if isinstance(codes, h5py.Dataset):
                entry["codes_dtype"] = str(codes.dtype)
                entry["shape"] = _shape(codes)
        columns.append(entry)
    index = node.get(str(index_name))
    return {
        "index_name": str(index_name),
        "row_count": int(index.shape[0]) if isinstance(index, h5py.Dataset) and index.shape else None,
        "columns": columns,
    }


def build_report(path: Path) -> dict[str, Any]:
    if not path.is_file():
        raise FileNotFoundError(f"Not a file: {path}")
    if not h5py.is_hdf5(path):
        raise ValueError("The selected file is not recognized as HDF5.")

    with h5py.File(path, "r") as handle:
        report: dict[str, Any] = {
            "file_name": path.name,
            "file_size_bytes": path.stat().st_size,
            "read_only": True,
            "matrix": {},
            "tables": {},
            "arrays": {},
            "unstructured_keys": [],
        }
        if "X" in handle:
            report["matrix"]["X"] = _node_summary(handle["X"])
        else:
            report["matrix"]["X"] = None
        if "raw" in handle and isinstance(handle["raw"], h5py.Group):
            raw = handle["raw"]
            report["matrix"]["raw"] = {
                "keys": sorted(str(key) for key in raw.keys()),
                "X": _node_summary(raw["X"]) if "X" in raw else None,
            }
        for key in ("obs", "var"):
            node = handle.get(key)
            report["tables"][key] = _table_summary(node) if isinstance(node, h5py.Group) else None
        for key in ("obsm", "varm", "layers", "obsp", "varp"):
            node = handle.get(key)
            if isinstance(node, h5py.Group):
                report["arrays"][key] = {str(name): _node_summary(node[name]) for name in sorted(node.keys())}
            else:
                report["arrays"][key] = None
        uns = handle.get("uns")
        report["unstructured_keys"] = sorted(str(key) for key in uns.keys()) if isinstance(uns, h5py.Group) else []

        x = report["matrix"].get("X")
        x_shape = x.get("shape") if isinstance(x, dict) else None
        obs_rows = report["tables"].get("obs")
        var_rows = report["tables"].get("var")
        report["dimensions"] = {
            "observations": x_shape[0] if x_shape and len(x_shape) >= 2 else (obs_rows.get("row_count") if obs_rows else None),
            "variables": x_shape[1] if x_shape and len(x_shape) >= 2 else (var_rows.get("row_count") if var_rows else None),
        }
        report["notes"] = [
            "This inventory reports names and storage metadata only; it does not inspect matrix values or identifier values.",
            "Structural presence does not establish biological meaning, Challenge eligibility, or submission validity.",
        ]
        return report


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("h5ad", type=Path, help="Path to an H5AD file; it is opened read-only")
    parser.add_argument("--output", type=Path, help="Write JSON to this local path instead of standard output")
    args = parser.parse_args()
    try:
        report = build_report(args.h5ad)
        rendered = json.dumps(report, indent=2, ensure_ascii=False) + "\n"
        if args.output:
            args.output.write_text(rendered, encoding="utf-8")
            print(f"Wrote metadata-only report to {args.output}")
        else:
            print(rendered, end="")
    except (OSError, ValueError) as exc:
        parser.error(str(exc))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
