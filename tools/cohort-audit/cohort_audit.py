#!/usr/bin/env python3
"""Metadata-only composition audit for explicitly selected local H5AD files."""

from __future__ import annotations

import argparse
import csv
import json
import math
import sys
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass
class Stage:
    label: str
    path: Path


def parse_stage(value: str) -> Stage:
    label, separator, path_text = value.partition("=")
    if not separator or not label.strip() or not path_text.strip():
        raise argparse.ArgumentTypeError("Use LABEL=PATH for each --stage")
    path = Path(path_text).expanduser()
    if not path.is_file():
        raise argparse.ArgumentTypeError(f"Stage file does not exist: {path}")
    return Stage(label.strip(), path)


def display_value(value: Any, pd: Any) -> str:
    try:
        if pd.isna(value):
            return "<missing>"
    except (TypeError, ValueError):
        pass
    return str(value)


def requested_columns(args: argparse.Namespace) -> list[str]:
    return list(dict.fromkeys(
        key for key in (args.label_col, args.sample_col, args.batch_col, args.condition_col)
        if key
    ))


def summarize_stage(stage: Stage, args: argparse.Namespace, ad: Any, pd: Any) -> dict[str, Any]:
    adata = ad.read_h5ad(stage.path, backed="r")
    try:
        n_obs = int(adata.n_obs)
        if n_obs < 1:
            raise ValueError(f"{stage.path.name} has no observations")
        obs = adata.obs
        if args.label_col not in obs.columns:
            raise ValueError(
                f"{stage.path.name} has no requested label column {args.label_col!r}; "
                f"available columns: {', '.join(map(str, obs.columns)) or '(none)'}"
            )

        metadata = []
        for key in requested_columns(args):
            if key not in obs.columns:
                metadata.append({
                    "key": key,
                    "present": False,
                    "missing_count": n_obs,
                    "missing_fraction": 1.0,
                    "unique_nonmissing": 0,
                })
                continue
            series = obs[key]
            missing_count = int(series.isna().sum())
            metadata.append({
                "key": key,
                "present": True,
                "missing_count": missing_count,
                "missing_fraction": missing_count / n_obs,
                "unique_nonmissing": int(series.nunique(dropna=True)),
            })

        labels = [display_value(value, pd) for value in obs[args.label_col].tolist()]
        label_counts = Counter(labels)
        composition = [
            {"label": label, "cells": count, "fraction": count / n_obs}
            for label, count in sorted(label_counts.items(), key=lambda item: (-item[1], item[0]))
        ]

        sample_composition: list[dict[str, Any]] = []
        if args.sample_col and args.sample_col in obs.columns:
            raw_samples = [display_value(value, pd) for value in obs[args.sample_col].tolist()]
            known_samples = sorted(set(raw_samples) - {"<missing>"})
            sample_codes = {
                sample: f"sample-{index:04d}"
                for index, sample in enumerate(known_samples, start=1)
            }
            samples = [sample_codes.get(sample, "<missing>") for sample in raw_samples]
            cells_by_sample = Counter(samples)
            cells_by_pair = Counter(zip(samples, labels))
            for sample, label in sorted(cells_by_pair):
                count = cells_by_pair[(sample, label)]
                sample_composition.append({
                    "sample": sample,
                    "label": label,
                    "cells": count,
                    "sample_cells": cells_by_sample[sample],
                    "within_sample_fraction": count / cells_by_sample[sample],
                })

        duplicate_obs_names = int(adata.obs_names.duplicated().sum())
        return {
            "stage": stage.label,
            "file": stage.path.name,
            "n_obs": n_obs,
            "n_vars": int(adata.n_vars),
            "duplicate_obs_names": duplicate_obs_names,
            "metadata": metadata,
            "composition": composition,
            "sample_composition": sample_composition,
        }
    finally:
        if getattr(adata, "isbacked", False):
            adata.file.close()


def compare_compositions(first: dict[str, Any], second: dict[str, Any]) -> dict[str, Any]:
    p = {row["label"]: row["fraction"] for row in first["composition"]}
    q = {row["label"]: row["fraction"] for row in second["composition"]}
    labels = sorted(set(p) | set(q))
    if not labels:
        return {
            "from": first["stage"],
            "to": second["stage"],
            "total_variation": None,
            "jensen_shannon_distance": None,
            "largest_changes": [],
        }

    total_variation = 0.5 * sum(abs(p.get(label, 0.0) - q.get(label, 0.0)) for label in labels)
    js_divergence = 0.0
    changes = []
    for label in labels:
        p_value, q_value = p.get(label, 0.0), q.get(label, 0.0)
        midpoint = (p_value + q_value) / 2
        for value in (p_value, q_value):
            if value > 0:
                js_divergence += 0.5 * value * math.log2(value / midpoint)
        changes.append({
            "label": label,
            "from_fraction": p_value,
            "to_fraction": q_value,
            "change": q_value - p_value,
        })
    changes.sort(key=lambda row: (-abs(row["change"]), row["label"]))
    return {
        "from": first["stage"],
        "to": second["stage"],
        "total_variation": total_variation,
        "jensen_shannon_distance": math.sqrt(max(0.0, js_divergence)),
        "largest_changes": changes[:10],
    }


def write_csv(path: Path, fieldnames: list[str], rows: list[dict[str, Any]]) -> None:
    with path.open("w", encoding="utf-8", newline="") as handle:
        writer = csv.DictWriter(handle, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)


def flatten_reports(reports: list[dict[str, Any]]) -> tuple[list[dict[str, Any]], list[dict[str, Any]], list[dict[str, Any]]]:
    composition_rows, metadata_rows, sample_rows = [], [], []
    for report in reports:
        for row in report["composition"]:
            composition_rows.append({"stage": report["stage"], **row})
        for row in report["metadata"]:
            metadata_rows.append({
                "stage": report["stage"],
                "key": row["key"],
                "present": row["present"],
                "missing_count": row["missing_count"],
                "missing_fraction": row["missing_fraction"],
                "unique_nonmissing": row["unique_nonmissing"],
            })
        for row in report["sample_composition"]:
            sample_rows.append({"stage": report["stage"], **row})
    return composition_rows, metadata_rows, sample_rows


def make_markdown(result: dict[str, Any]) -> str:
    lines = [
        "# VEC Cohort Audit",
        "",
        "Metadata-only summary. The expression matrix and spatial coordinates were not loaded.",
        "",
        "| Stage | File | Cells | Variables | Duplicate observation names |",
        "| --- | --- | ---: | ---: | ---: |",
    ]
    for report in result["stages"]:
        lines.append(
            f"| {report['stage']} | {report['file']} | {report['n_obs']} | "
            f"{report['n_vars']} | {report['duplicate_obs_names']} |"
        )
    lines.extend([
        "",
        "## Metadata coverage",
        "",
        "| Stage | Key | Present | Missing | Missing fraction | Unique non-missing |",
        "| --- | --- | --- | ---: | ---: | ---: |",
    ])
    for report in result["stages"]:
        for row in report["metadata"]:
            lines.append(
                f"| {report['stage']} | {row['key']} | {row['present']} | "
                f"{row['missing_count']} | {row['missing_fraction']:.3f} | {row['unique_nonmissing']} |"
            )
    lines.extend([
        "",
        "## Adjacent-stage composition",
        "",
        "Distances describe the supplied labels only; they are not significance tests or quality judgments.",
        "",
    ])
    if not result["comparisons"]:
        lines.append("Provide at least two stages to produce adjacent-stage comparisons.")
    for comparison in result["comparisons"]:
        lines.append(
            f"### {comparison['from']} → {comparison['to']}\n\n"
            f"- Total variation: {comparison['total_variation']:.4f}\n"
            f"- Jensen–Shannon distance: {comparison['jensen_shannon_distance']:.4f}\n"
        )
        lines.extend([
            "| Label | From fraction | To fraction | Change |",
            "| --- | ---: | ---: | ---: |",
        ])
        for row in comparison["largest_changes"]:
            lines.append(
                f"| {row['label']} | {row['from_fraction']:.4f} | "
                f"{row['to_fraction']:.4f} | {row['change']:+.4f} |"
            )
        lines.append("")
    lines.extend([
        "## Interpretation",
        "",
        "A difference can reflect development, sampling, annotation, or file processing. Investigate the underlying released files and study design before drawing conclusions. This report does not establish biological significance, determine split eligibility, or replace the official scorer.",
        "",
    ])
    return "\n".join(lines)


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        description="Compare metadata and cell-label composition in explicitly selected local H5AD files."
    )
    parser.add_argument("--stage", action="append", required=True, type=parse_stage, metavar="LABEL=PATH",
                        help="stage label and local H5AD path; repeat in comparison order")
    parser.add_argument("--label-col", default="celltype",
                        help="observation column used for composition (default: celltype)")
    parser.add_argument("--sample-col", help="optional observation column identifying biological samples")
    parser.add_argument("--batch-col", help="optional observation column identifying processing batches")
    parser.add_argument("--condition-col", help="optional observation column identifying conditions")
    parser.add_argument("--out", type=Path, default=Path("cohort-report"), help="output directory")
    return parser


def main() -> int:
    args = build_parser().parse_args()
    labels = [stage.label for stage in args.stage]
    if len(labels) != len(set(labels)):
        print("Stage labels must be unique.", file=sys.stderr)
        return 2
    try:
        import anndata as ad
        import pandas as pd
    except ImportError:
        print("Install AnnData first: python -m pip install 'anndata>=0.10'", file=sys.stderr)
        return 2

    try:
        stages = [summarize_stage(stage, args, ad, pd) for stage in args.stage]
    except (OSError, ValueError, KeyError) as error:
        print(f"Could not audit inputs: {error}", file=sys.stderr)
        return 2

    comparisons = [
        compare_compositions(stages[index], stages[index + 1])
        for index in range(len(stages) - 1)
    ]
    result = {
        "tool": "VEC Cohort Audit",
        "version": "1.0.0",
        "scope": "metadata-only; no expression matrix or coordinates loaded",
        "stages": stages,
        "comparisons": comparisons,
        "interpretation": "Descriptive only; no significance test or eligibility determination.",
    }
    args.out.mkdir(parents=True, exist_ok=True)
    (args.out / "report.json").write_text(
        json.dumps(result, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )
    (args.out / "report.md").write_text(make_markdown(result), encoding="utf-8")
    composition_rows, metadata_rows, sample_rows = flatten_reports(stages)
    write_csv(args.out / "composition.csv", ["stage", "label", "cells", "fraction"], composition_rows)
    write_csv(
        args.out / "metadata-coverage.csv",
        ["stage", "key", "present", "missing_count", "missing_fraction", "unique_nonmissing"],
        metadata_rows,
    )
    if args.sample_col:
        write_csv(
            args.out / "sample-composition.csv",
            ["stage", "sample", "label", "cells", "sample_cells", "within_sample_fraction"],
            sample_rows,
        )
    print(f"Wrote cohort report for {len(stages)} stages to {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
