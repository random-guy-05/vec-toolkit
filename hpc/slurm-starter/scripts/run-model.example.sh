#!/usr/bin/env bash
# Copy this file to run-model.sh and replace the example command.
set -euo pipefail

SEED="${SLURM_ARRAY_TASK_ID:-0}"
OUT_DIR="${VEC_RUN_DIR:-runs/manual-${SEED}}"
mkdir -p "$OUT_DIR"

# Replace this with your own training, preprocessing, or local-scoring command.
# Keep seeds and output files explicit so separate jobs cannot overwrite each other.
printf 'Replace this example with your VEC command. seed=%s out=%s\n' "$SEED" "$OUT_DIR"
