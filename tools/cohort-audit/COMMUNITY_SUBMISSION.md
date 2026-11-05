# Community contribution submission

- **Kind:** build
- **Title:** VEC Cohort Audit — metadata-only cell composition profiles across stages
- **Public link:** https://github.com/random-guy-05/vec-cohort-audit
- **What it is, and who it helps:** An offline CLI that compares metadata in explicitly selected local H5AD files. It reports cell counts, metadata missingness, label proportions, per-sample composition, and descriptive adjacent-stage composition distances without loading expression matrices or coordinates. It helps teams inspect cohort composition and metadata coverage before modeling, while keeping cell-level data local. It does not claim that a shift is wrong or reproduce the official scorer.
- **How someone else runs it:** Install AnnData in a project-local Python environment, pass each local file as --stage LABEL=PATH, then select the available label/sample/batch/condition columns. The tool writes Markdown, JSON, and CSV reports to a local output folder.
- **Credit:** Arnav Mana
