from __future__ import annotations

import argparse
import json
from pathlib import Path

from .core import PACKAGE_DISTRIBUTIONS, build_report, missing_requirements


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="VEC environment diagnostic.")
    parser.add_argument("--json", type=Path, dest="json_path")
    parser.add_argument(
        "--require",
        default="",
        help="Comma-separated checks: python,git,veckit-import or package names.",
    )
    args = parser.parse_args(argv)

    required = [part.strip() for part in args.require.split(",") if part.strip()]
    valid = {"python", "git", "veckit-import", *PACKAGE_DISTRIBUTIONS}
    unknown = sorted(set(required) - valid)
    if unknown:
        raise SystemExit(f"unknown --require values: {', '.join(unknown)}")

    report = build_report()
    print(f"Python {report['python']} {'OK' if report['python_ok'] else 'TOO OLD'}")
    print(report["platform"])
    print("git:", report["git"] or "MISSING")
    print(f"free disk: {report['free_disk_gb']:.1f} GB")
    if report["available_ram_gb"] is not None:
        print(f"available RAM: {report['available_ram_gb']:.1f} GB")
    for name, version in report["packages"].items():
        print(f"{name:14s} {version or 'MISSING'}")
    print("veckit import:", report["veckit_import"])

    if args.json_path:
        args.json_path.parent.mkdir(parents=True, exist_ok=True)
        args.json_path.write_text(
            json.dumps(report, indent=2) + "\n",
            encoding="utf-8",
        )

    missing = missing_requirements(report, required)
    if missing:
        print("missing required:", ", ".join(missing))
        return 3
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
