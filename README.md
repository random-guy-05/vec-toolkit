# VEC R Data Tour

An R and Bioconductor on-ramp for inspecting the Virtual Embryo Challenge's `.h5ad` files. It pairs a short guide with a read-only command-line inspector so R users can check a local release file's shape, metadata, and gene-panel alignment before building an analysis around it.

## Who this is for

Participants who work in R, Bioconductor, or RStudio and want to explore the Challenge's AnnData releases without first rebuilding their workflow in Python. The guide focuses on file orientation and ordered gene panels, two details that are easy to misread when moving between AnnData and Bioconductor objects.

## What it does

`scripts/inspect_h5ad.R` reads one local H5AD as a `SingleCellExperiment` using `zellkonverter`, then reports:

- feature and cell counts;
- assay names, cell-metadata columns, and reduced-dimension names;
- missing or duplicate feature names; and
- when given an official board panel file, missing/extra genes and exact order agreement.

The script uses `use_hdf5 = TRUE` so the assay can stay backed by the HDF5 file while the script inspects object metadata. It never writes to the input, edits expression values, downloads Challenge data, uploads files, or computes a score.

This is a learning and inspection aid. It is **not** the Challenge's official validator or scorer, does not decide whether a data source is eligible, and does not certify normalization or biological correctness. Run the official local validator on any prediction you plan to upload.

## Install

Install a current R release supported by Bioconductor, then install the H5AD reader and its on-disk array backend:

```r
if (!requireNamespace("BiocManager", quietly = TRUE)) {
  install.packages("BiocManager")
}
BiocManager::install(c("zellkonverter", "HDF5Array"))
```

The Bioconductor package page has release-specific installation instructions and the `zellkonverter` vignettes: <https://bioconductor.org/packages/release/bioc/html/zellkonverter.html>.

## Run the tour

Download a released `.h5ad` file and, optionally, the ordered gene-panel text file for the exact board you are studying from the [Challenge data page](https://virtualembryo.ai/challenge/data). From the repository root:

```sh
Rscript scripts/inspect_h5ad.R path/to/released-stage.h5ad
```

To compare the file's feature names with a board panel:

```sh
Rscript scripts/inspect_h5ad.R \
  path/to/released-stage.h5ad \
  path/to/T2__heart__val_interp.genes.txt
```

The second argument is optional. The script prints a compact report and exits nonzero if it cannot read the file or panel. A panel mismatch is reported as data; the script does not repair it.

## Read the report correctly

### AnnData and R show opposite matrix orientations

AnnData stores observations (cells) by variables (genes). A `SingleCellExperiment` presents features by cells, so its dimensions are **genes × cells**. The number of rows is the feature count; the number of columns is the cell count. Do not transpose the object just because the printed dimensions look reversed from a Python `AnnData` report.

### A gene set is not an ordered panel

The optional comparison checks the file's row names against the supplied panel in order. It separately reports missing names, extra names, duplicate names, and whether the complete sequence matches. Use the panel for the target board; do not infer a submission panel from whichever genes happen to be present in one stage file. If the order differs, use the official submission instructions and validator to decide how to repair the prediction.

### File structure does not reveal expression scale

The report deliberately does not classify `.X` as raw counts or normalized expression. Finite, non-negative values can still be on the wrong scale. Use the challenge's published data-processing contract and a domain-appropriate check for expression scale; a structural pass is not a biological or normalization check.

### HDF5-backed access is not a promise of constant memory

`use_hdf5 = TRUE` keeps the assay on disk for this metadata-focused report. Later operations such as `as.matrix()` can still materialize a large assay in memory. Work on small subsets when exploring expression values, and check the R/Bioconductor package documentation for the behavior of downstream operations.

## Troubleshooting

- **`zellkonverter` is missing:** install it with `BiocManager::install("zellkonverter")` as shown above.
- **A very large file seems slow:** HDF5-backed access avoids eagerly loading the assay, but opening and inspecting a large H5AD can still take time. The first access may also initialize package components.
- **The gene-panel check fails:** confirm that the panel file belongs to the same board as the file you are inspecting. The script never silently drops or invents genes.
- **A field is not listed:** H5AD-to-R conversion can represent metadata in different object slots. This tool reports the main SCE slot names; it does not claim that an absent field is absent from the original file.

## Challenge references

- [Challenge data and file layout](https://virtualembryo.ai/challenge/data)
- [Task definitions and submission contract](https://virtualembryo.ai/challenge/tasks)
- [Official local submission and evaluation requirements](https://virtualembryo.ai/challenge/evaluation)
- [Bioconductor `zellkonverter` documentation](https://bioconductor.org/packages/release/bioc/html/zellkonverter.html)

Reviewed against the public pages on 2026-10-14. The Challenge contract and software packages can change; check the linked sources before relying on the guide for a submission.

## License

MIT. See [LICENSE](LICENSE).
