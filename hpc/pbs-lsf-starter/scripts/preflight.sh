#!/usr/bin/env bash
set -euo pipefail

usage() {
  echo "Usage: bash scripts/preflight.sh {pbs|lsf} JOB_SCRIPT" >&2
  exit 2
}

[[ $# -eq 2 ]] || usage
scheduler="$1"
job_script="$2"
[[ -f "$job_script" ]] || { echo "Missing job script: $job_script" >&2; exit 2; }

case "$scheduler" in
  pbs) directive='#PBS' ;;
  lsf) directive='#BSUB' ;;
  *) usage ;;
esac

if ! grep -qF "$directive" "$job_script"; then
  echo "Expected $directive directives in $job_script" >&2
  exit 1
fi

if grep -nEi 'TODO|REPLACE_ME|your_model|YOUR_[A-Z_]+' "$job_script"; then
  echo "Replace the example command or placeholder above before submitting." >&2
  exit 1
fi

if [[ "$scheduler" == "lsf" && ! -d logs ]]; then
  echo "Create logs/ before submitting; the LSF templates write output there." >&2
  exit 1
fi

echo "Preflight passed for $job_script. Site resource names and policies still need local review."
