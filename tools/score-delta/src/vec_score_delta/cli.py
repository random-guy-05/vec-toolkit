from __future__ import annotations

import argparse
import json
from pathlib import Path

from .core import compare
from .specs import DIAGNOSTIC_METRICS


def _metrics(path: Path) -> dict:
    payload = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(payload, dict):
        raise TypeError(f"{path} must contain a JSON object")
    metrics = payload.get("metrics", payload)
    if not isinstance(metrics, dict):
        raise TypeError(f"{path}: metrics must be a JSON object")
    return metrics


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Compare two VEC scorer JSON results.")
    parser.add_argument("old", type=Path)
    parser.add_argument("new", type=Path)
    parser.add_argument("--task", required=True, choices=["T1", "T2", "T3"])
    parser.add_argument("--board")
    parser.add_argument("--json", type=Path, dest="json_path")
    args = parser.parse_args(argv)

    try:
        old_metrics = _metrics(args.old)
        new_metrics = _metrics(args.new)
        result = compare(old_metrics, new_metrics, args.task, args.board)
    except (OSError, ValueError, TypeError, json.JSONDecodeError) as exc:
        print(f"ERROR: {exc}")
        return 2

    print(f"Task {result['task']}")
    if args.board:
        print(
            f"{args.board}: {result['old_score']:.3f} -> "
            f"{result['new_score']:.3f} "
            f"({result['score_delta']:+.3f})"
        )
    print()
    for row in result["metrics"]:
        old = "NA" if row["old"] is None else f"{row['old']:.6g}"
        new = "NA" if row["new"] is None else f"{row['new']:.6g}"
        skill = (
            ""
            if "skill_delta" not in row
            else f" skill Δ={row['skill_delta']:+.5f}"
        )
        print(
            f"{row['metric']:20s} {row['status']:11s} "
            f"{old:>10s} -> {new:<10s}{skill}"
        )

    diagnostics = sorted(
        (set(old_metrics) | set(new_metrics)) & DIAGNOSTIC_METRICS
    )
    if diagnostics:
        print("\nDiagnostic-only fields (not included in ranking delta):")
        for metric in diagnostics:
            print(f"- {metric}: {old_metrics.get(metric)} -> {new_metrics.get(metric)}")

    if args.json_path:
        args.json_path.parent.mkdir(parents=True, exist_ok=True)
        args.json_path.write_text(
            json.dumps(result, indent=2) + "\n",
            encoding="utf-8",
        )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
