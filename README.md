# VEC Toolkit

Community tools, guides and templates for the [Virtual Embryo Challenge](https://virtualembryo.ai/challenge) (NeurIPS 2026), collected in one place.

Each folder was its own repository. They were merged here with full commit history, and the original `vec-*` repositories are archived (read-only) but still online, so existing links keep working.

> Community resources only. The official challenge pages are the source of truth for rules, data and scoring.

## Python tools

| Project | What it does |
|---|---|
| [`metriclens`](tools/metriclens) | Metric attribution and debugging toolkit for Virtual Embryo Challenge scores |
| [`bootstrap`](tools/bootstrap) | Bootstrap uncertainty analysis for Virtual Embryo Challenge local scoring |
| [`splitforge`](tools/splitforge) | Leakage-audited pseudo-validation split generator for the Virtual Embryo Challenge |
| [`spatialqc`](tools/spatialqc) | Spatial quality control for Virtual Embryo Challenge T2 and T3 predictions. |
| [`slim`](tools/slim) | Scorer-aware H5AD minimizer for Virtual Embryo Challenge submissions. |
| [`collapsecheck`](tools/collapsecheck) | Detect mode collapse and repeated-cell failure modes in VEC generative predictions. |
| [`determinism`](tools/determinism) | Detect nondeterministic and scorer-relevant changes across repeated VEC prediction exports. |
| [`envcheck`](tools/envcheck) | One-command environment and dependency diagnostic for Virtual Embryo Challenge participants. |
| [`profile`](tools/profile) | Profile runtime and peak memory of Virtual Embryo Challenge scoring workflows. |
| [`methodcard`](tools/methodcard) | Reproducibility, provenance, and disclosure method cards for Virtual Embryo Challenge entries. |
| [`score-delta`](tools/score-delta) | Compare VEC scorer outputs and explain metric-level improvements and regressions. |
| [`runlog`](tools/runlog) | Append-only experiment and submission provenance ledger for the Virtual Embryo Challenge. |
| [`samplecheck`](tools/samplecheck) | Measure Virtual Embryo Challenge score stability across prediction cell counts. |
| [`p3-freeze`](tools/p3-freeze) | Freeze, hash, and manage final-phase VEC submission artifacts and scarce P3 slots. |
| [`panelguard`](tools/panelguard) | Audit and safely repair VEC gene-panel membership and ordering. |
| [`logcheck`](tools/logcheck) | Detect likely raw-count or improperly normalized VEC prediction files before submission. |
| [`diff`](tools/diff) | Scorer-aware semantic comparison of Virtual Embryo Challenge prediction files. |
| [`batchrank`](tools/batchrank) | Batch model-selection and stability analysis for Virtual Embryo Challenge predictions. |
| [`replicate-range`](tools/replicate-range) | Offline Python CLI for descriptive score sensitivity across VEC Task 3 biological replicates |
| [`cohort-audit`](tools/cohort-audit) | Offline metadata-only cell composition and cohort coverage reports for local Virtual Embryo Challenge AnnData files |
| [`resource-link-audit`](tools/resource-link-audit) | Polite, conservative checker for public community resource links in JSON catalogs |
| [`reprobox`](tools/reprobox) | Reproducible Docker and devcontainer environment for Virtual Embryo Challenge workflows |

## Guides, cheat sheets and workshops

| Project | What it does |
|---|---|
| [`multilingual-starter`](guides/multilingual-starter) | Multilingual beginner guides for the Virtual Embryo Challenge (NeurIPS 2026). |
| [`visual-cheatsheets`](guides/visual-cheatsheets) | Visual reference pack for the Virtual Embryo Challenge: tasks, splits, metrics, submissions, and phase transitions |
| [`metric-cards`](guides/metric-cards) | Portable visual reference cards explaining every official Virtual Embryo Challenge metric |
| [`failure-gallery`](guides/failure-gallery) | Visual atlas of common Virtual Embryo Challenge model and submission failure modes |
| [`p3-survival-guide`](guides/p3-survival-guide) | Illustrated P3 transition and final-submission guide for the Virtual Embryo Challenge |
| [`r-data-tour`](guides/r-data-tour) | R and Bioconductor guide plus read-only H5AD inspector for Virtual Embryo Challenge data |
| [`reliability-lab`](guides/reliability-lab) | Twenty runnable synthetic single-cell and spatial reliability lessons, with 300 adapted reading resources in 15 languages. Machine-assisted translations; no native review claimed. |
| [`workshop-kit`](guides/workshop-kit) | Facilitator-ready peer workshop for new Virtual Embryo Challenge participants |
| [`workshop-series`](guides/workshop-series) | Three facilitator-ready Virtual Embryo Challenge workshops in multiple languages |

## Browser apps (offline, single page)

| Project | What it does |
|---|---|
| [`participation-workbench`](web/participation-workbench) | Offline-first planning tools to lower practical barriers to participating in the Virtual Embryo Challenge · [live app](https://random-guy-05.github.io/vec-participation-workbench/) |
| [`pathway-builder`](web/pathway-builder) | Multilingual guided pathways through Virtual Embryo Challenge resources · [live app](https://random-guy-05.github.io/vec-pathway-builder/) |
| [`rule-scenario-trainer`](web/rule-scenario-trainer) | Offline scenario quiz for VEC data eligibility, Agent Team, P3, and Generality Award rules · [live app](https://random-guy-05.github.io/vec-rule-scenario-trainer/) |
| [`resource-navigator`](web/resource-navigator) | Searchable, curated index of public Virtual Embryo Challenge community resources · [live app](https://random-guy-05.github.io/vec-resource-navigator/) |
| [`p3-attempt-ledger`](web/p3-attempt-ledger) | Offline manual tracker for VEC P3 scored submissions and unlimited format checks |

## HPC job templates

| Project | What it does |
|---|---|
| [`slurm-starter`](hpc/slurm-starter) | Editable Slurm job templates and cluster guidance for VEC participants |
| [`pbs-lsf-starter`](hpc/pbs-lsf-starter) | PBS Professional and IBM Spectrum LSF job templates for Virtual Embryo Challenge scoring and model runs |

## Using a tool

Each Python tool is an independent package:

```bash
cd tools/slim
pip install -e '.[dev]'
pytest
```

## Licensing

Every project keeps its own `LICENSE` file (all MIT). See each folder for the copyright line that applies.

