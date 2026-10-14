# VEC Cohort Audit

An offline, metadata-only cohort profile for comparing released training AnnData files across stages, conditions, batches, or embryos. It helps a participant notice a missing metadata column, an unrepresented cell label, a sample with very few cells, or a large shift in observed label proportions before building a model.

The audit reads AnnData observation metadata and observation names only. It opens each file in backed read mode and does not load the expression matrix or spatial coordinates. It never downloads data, guesses which split a file belongs to, or decides whether a shift is biologically correct.

## Install

Use a project-local environment with Python 3.10 or later and AnnData:

~~~sh
python -m venv .venv
source .venv/bin/activate
python -m pip install 'anndata>=0.10'
~~~

On clusters, follow the local package installation policy.

## Make a report

Pass explicit stage labels and paths. The order in which stages are provided is preserved for adjacent-stage comparisons.

~~~sh
python cohort_audit.py \
  --stage E8.5=data/E8.5.h5ad \
  --stage E9.5=data/E9.5.h5ad \
  --label-col celltype \
  --sample-col embryo_id \
  --batch-col batch \
  --out cohort-report
~~~

Only specify metadata keys that exist in your files. The --label-col option defaults to celltype; change it to match the released data. The report writes:

- **report.md** — readable summary, metadata coverage, adjacent-stage total-variation and Jensen–Shannon distances, and largest proportion changes.
- **report.json** — complete machine-readable summary.
- **composition.csv** — cell count and fraction for every label in each stage.
- **metadata-coverage.csv** — missingness and distinct-value counts for the requested metadata keys.
- **sample-composition.csv** — optional per-sample label counts when --sample-col is supplied. Sample names are replaced with per-report codes such as sample-0001; the original identifiers are not written.

Labels and sample IDs are treated as categorical strings. Missing values are retained as an explicit <missing> category in composition output so they cannot silently disappear.

## Interpreting the distances

The adjacent-stage comparisons are descriptive summaries of the supplied labels. Total variation is between 0 and 1; Jensen–Shannon distance is between 0 and 1 with base-2 logarithms. A high value can reflect development, sampling, annotation, or file-processing differences. It is not a hypothesis test, a significance estimate, or a claim that the data are wrong.

Use these summaries to ask where to inspect next. Do not use hidden validation or test targets while they are withheld, and do not include cell-type labels in a submission: the Challenge assigns submission labels with its own frozen classifier. The tool does not validate Challenge eligibility or reproduce the official scorer.

## Scope and safety

- Select only data you are permitted to inspect under the current [Challenge rules](https://virtualembryo.ai/challenge/rules).
- The program accepts local files only; it does not access the network.
- The input file basename is included in the report; full local paths are not written.
- Sample identifiers are replaced with per-report codes in the sample-composition output. This reduces direct identifier exposure but is not a formal privacy guarantee.
- No expression values, coordinates, or cell-level records are exported.
- The tool reports descriptive counts only. It does not infer developmental biology or label equivalence.

For the current task and data descriptions, see the official [Challenge tasks page](https://virtualembryo.ai/challenge/tasks).

## Limitations

The tool expects AnnData H5AD inputs and explicit stage labels. It cannot determine whether a stage is training, validation, or test data, cannot verify that the selected metadata key has the intended biological meaning, and cannot account for hidden sampling design. Review the files and their documentation before interpreting any difference.

## License

MIT. See LICENSE.
