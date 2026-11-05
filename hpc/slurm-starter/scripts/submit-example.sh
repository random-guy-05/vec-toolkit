#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 path/to/adapted-job.sbatch" >&2
  exit 2
fi

job_file="$1"
if [[ ! -f "$job_file" ]]; then
  echo "Job file not found: $job_file" >&2
  exit 2
fi
if grep -Eq 'YOUR_[A-Z0-9_]+_MODULE' "$job_file"; then
  echo "Replace the module placeholders in $job_file before submission." >&2
  exit 2
fi
if [[ ! -f scripts/run-model.sh ]] || grep -q 'Replace this example with your VEC command' scripts/run-model.sh; then
  echo "Create and edit scripts/run-model.sh before submission." >&2
  exit 2
fi
if ! command -v sbatch >/dev/null 2>&1; then
  echo "sbatch is unavailable; run this from a Slurm login node." >&2
  exit 2
fi

mkdir -p logs
exec sbatch "$job_file"
