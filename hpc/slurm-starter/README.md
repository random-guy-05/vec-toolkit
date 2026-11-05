# VEC Slurm Starter

Editable Slurm job templates for participants who train models or run local VEC scoring on a university or national HPC cluster. The examples keep seed runs separate, write per-job logs, and record the code revision and installed Python packages. They do not assume a particular scheduler partition, module tree, GPU type, storage policy, or model command.

## What is included

- `slurm/cpu-score.sbatch.example` — one CPU scoring or preprocessing job.
- `slurm/gpu-model.sbatch.example` — optional single-GPU model job.
- `slurm/seeds.sbatch.example` — an array pattern that gives each seed its own output directory.
- `scripts/submit-example.sh` — creates the log directory before submission and refuses to submit files that still contain placeholder module names.
- `scripts/run-model.example.sh` — a small contract for the command the job should call.

These are starting points to adapt with your local HPC documentation. Slurm options and environment modules are site-specific; a valid job file at one institution may be rejected at another.

## Quick start

1. Clone this repository into a project directory on a cluster that uses Slurm.
2. Copy `scripts/run-model.example.sh` to `scripts/run-model.sh` and edit it to run your own training or scoring command. Keep input paths and output paths explicit.
3. Copy the relevant `.sbatch.example` to a `.sbatch` file. Replace the Python/CUDA module placeholders with modules provided by your cluster; adjust partition, time, CPU, memory, and GPU requests to match local policy and your measured workload.
4. Create a project-local Python environment at `.venv` using the site's supported method. Do not install packages on a login node unless local policy permits it.
5. From the project root, run `bash scripts/submit-example.sh slurm/cpu-score.sbatch` (or the adapted job file).

The seed-array example is only for independent runs. Every array task writes under a distinct `runs/<array-job-id>/<seed>/` directory so concurrent jobs do not overwrite one another. It assumes you adapt the example model command to accept a seed and output path.

## Resource and data notes

- Start with conservative CPU, memory, wall-time, and GPU requests. Use `VEC Profile` or your cluster's accounting reports to size later runs.
- Prefer the cluster's documented scratch or work storage for temporary files. Do not assume `$SLURM_TMPDIR` exists or persists after a job ends.
- Make large input files read-only to jobs where practical. Avoid copying large datasets for every array task; use site-approved shared storage or a documented per-node cache.
- Do not send withheld evaluation data, credentials, or private paths to a public repository. This starter contains no challenge data and does not download anything.
- The environment capture is an audit aid, not a guarantee of byte-for-byte reproducibility. Record your module list and container digest too if your cluster uses those.

## Scope and limitations

This is a general Slurm adapter, not an official VEC tool, a performance guarantee, a model, or a substitute for local cluster documentation. The examples use placeholder commands and module names intentionally. Confirm the challenge's current rules and your institution's policy before running jobs; this repository cannot determine whether a particular data source or compute workflow is eligible.

## License

MIT. See `LICENSE`.
