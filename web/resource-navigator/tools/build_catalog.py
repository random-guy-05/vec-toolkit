#!/usr/bin/env python3
"""Build the static JSON catalog from catalog.tsv."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
FIELDS = ["kind", "category", "tasks", "title", "url"]

with (ROOT / "catalog.tsv").open(encoding="utf-8", newline="") as f:
    rows = list(csv.DictReader(f, delimiter="\t"))

if rows and list(rows[0]) != FIELDS:
    raise SystemExit("catalog.tsv header does not match the expected fields")

if not rows:
    raise SystemExit("catalog.tsv is empty")

seen = set()
for i, row in enumerate(rows, start=1):
    missing = [field for field in FIELDS if not row[field].strip()]
    if missing:
        raise SystemExit(f"row {i}: missing {', '.join(missing)}")
    if row["url"] in seen:
        raise SystemExit(f"row {i}: duplicate URL {row['url']}")
    seen.add(row["url"])
    row["tasks"] = [task.strip() for task in row["tasks"].split(",") if task.strip()]
    row["status"] = "Accepted" if i <= 15 else "Filed · not yet reviewed"

with (ROOT / "catalog.json").open("w", encoding="utf-8") as f:
    json.dump(rows, f, ensure_ascii=False, indent=2)
    f.write("\n")

print(f"Wrote {len(rows)} catalog entries to catalog.json")
