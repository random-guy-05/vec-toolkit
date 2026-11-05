#!/usr/bin/env Rscript

usage <- function() {
  cat(
    "Usage: Rscript scripts/inspect_h5ad.R FILE.h5ad [BOARD.genes.txt]\n",
    "Reads one local H5AD and optionally compares its ordered feature names\n",
    "with a downloaded board panel. The input file is never modified.\n",
    file = stderr()
  )
  quit(status = 2L)
}

args <- commandArgs(trailingOnly = TRUE)
if (length(args) < 1L || length(args) > 2L) {
  usage()
}

h5ad_path <- args[[1L]]
if (!file.exists(h5ad_path) || dir.exists(h5ad_path)) {
  stop("H5AD file does not exist or is not a file: ", h5ad_path, call. = FALSE)
}

if (!requireNamespace("zellkonverter", quietly = TRUE)) {
  stop(
    "Missing package 'zellkonverter'. Install with ",
    "BiocManager::install(c(\"zellkonverter\", \"HDF5Array\"))",
    call. = FALSE
  )
}
if (!requireNamespace("HDF5Array", quietly = TRUE)) {
  stop(
    "Missing package 'HDF5Array'. Install with ",
    "BiocManager::install(c(\"zellkonverter\", \"HDF5Array\"))",
    call. = FALSE
  )
}

sce <- tryCatch(
  zellkonverter::readH5AD(
    h5ad_path,
    use_hdf5 = TRUE,
    reader = "R",
    verbose = FALSE
  ),
  error = function(e) {
    stop("Could not read H5AD with zellkonverter: ", conditionMessage(e), call. = FALSE)
  }
)

genes <- rownames(sce)
cat("VEC R Data Tour\n")
cat("==============\n")
cat("File: ", normalizePath(h5ad_path, mustWork = TRUE), "\n", sep = "")
cat("R orientation: ", nrow(sce), " features x ", ncol(sce), " cells\n", sep = "")

assay_names <- SummarizedExperiment::assayNames(sce)
cat("Assays: ", if (length(assay_names)) paste(assay_names, collapse = ", ") else "(none)", "\n", sep = "")

cell_metadata_names <- colnames(SummarizedExperiment::colData(sce))
cat(
  "Cell metadata columns: ",
  if (length(cell_metadata_names)) paste(cell_metadata_names, collapse = ", ") else "(none)",
  "\n",
  sep = ""
)

reduced_dimension_names <- SingleCellExperiment::reducedDimNames(sce)
cat(
  "Reduced-dimension names: ",
  if (length(reduced_dimension_names)) paste(reduced_dimension_names, collapse = ", ") else "(none)",
  "\n",
  sep = ""
)

if (is.null(genes)) {
  cat("Feature names: absent\n")
} else {
  cat("Feature names: ", length(genes), " total; ", sum(duplicated(genes)), " duplicate name(s)\n", sep = "")
}

if (length(args) == 2L) {
  panel_path <- args[[2L]]
  if (!file.exists(panel_path) || dir.exists(panel_path)) {
    stop("Panel file does not exist or is not a file: ", panel_path, call. = FALSE)
  }

  panel <- readLines(panel_path, warn = FALSE, encoding = "UTF-8")
  panel <- sub("\\r$", "", panel)
  panel <- panel[nzchar(panel)]

  if (is.null(genes)) {
    stop("Cannot compare the panel: the H5AD has no feature names.", call. = FALSE)
  }

  missing <- setdiff(panel, genes)
  extra <- setdiff(genes, panel)
  exact_order <- identical(genes, panel)

  cat("Panel file: ", normalizePath(panel_path, mustWork = TRUE), "\n", sep = "")
  cat("Panel entries: ", length(panel), " total; ", sum(duplicated(panel)), " duplicate name(s)\n", sep = "")
  cat("Exact ordered match: ", if (exact_order) "yes" else "no", "\n", sep = "")
  cat("Panel genes missing from H5AD: ", length(missing), "\n", sep = "")
  if (length(missing)) {
    cat("  ", paste(head(missing, 10L), collapse = ", "), if (length(missing) > 10L) ", ..." else "", "\n", sep = "")
  }
  cat("H5AD genes not in panel: ", length(extra), "\n", sep = "")
  if (length(extra)) {
    cat("  ", paste(head(extra, 10L), collapse = ", "), if (length(extra) > 10L) ", ..." else "", "\n", sep = "")
  }
}

cat("\nThis is an inspection report, not an official validator or score.\n")
