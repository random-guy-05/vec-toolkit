# VEC PBS + LSF Starter

Editable PBS Professional/OpenPBS and IBM Spectrum LSF job templates for Virtual Embryo Challenge scoring and model runs. This extends the existing Slurm starter to two schedulers used by research clusters.

The scripts are intentionally small. They do not assume a queue, module tree, GPU resource name, storage policy, or environment manager. Adapt the resource requests to your cluster's documentation before submitting real work.

## Included templates

| Scheduler | File | Use |
| --- | --- | --- |
| PBS | **pbs/cpu-score.pbs** | Single CPU local-scoring or preprocessing job |
| PBS | **pbs/gpu-model.pbs** | Single-GPU model job; GPU request is an explicit site-specific placeholder |
| PBS | **pbs/seeds.pbs** | Capped array for independent seeds |
| LSF | **lsf/cpu-score.lsf** | Single CPU local-scoring or preprocessing job |
| LSF | **lsf/gpu-model.lsf** | Single-GPU model job using LSF's GPU option |
| LSF | **lsf/seeds.lsf** | Capped array for independent seeds |

## Quick start

1. Clone this repository on the cluster and enter the repository directory.
2. Read the local cluster's user guide. Replace the example CPU, memory, wall-time, and GPU requests with values accepted by your site.
3. Create and activate a project-local Python environment using the institution's supported method. Do not install packages on a login node unless local policy permits it.
4. Replace the your_model command in the selected template with your scoring or training command. Keep paths explicit and outputs unique per run.
5. For LSF templates, create the output directory before submission because LSF opens output paths during job submission:

   ~~~sh
   mkdir -p logs
   bash scripts/preflight.sh lsf lsf/cpu-score.lsf
   bsub < lsf/cpu-score.lsf
   ~~~

6. For PBS, run preflight and submit the script with qsub:

   ~~~sh
   bash scripts/preflight.sh pbs pbs/cpu-score.pbs
   qsub pbs/cpu-score.pbs
   ~~~

The seed array examples use PBS_ARRAY_INDEX or LSB_JOBINDEX to keep each seed's outputs separate. The example range is five seeds and is deliberately small; increase it only after checking the site's array policy and storage limits.

## GPU requests need local confirmation

The LSF example uses #BSUB -gpu "num=1". IBM documents this syntax, but the cluster must enable compatible GPU scheduling. PBS GPU resource names and syntax are configured by each site; the PBS GPU template leaves the request commented out rather than guessing a resource name. Ask your cluster administrators which GPU resource request is supported before uncommenting or adding one.

## What the preflight helper checks

scripts/preflight.sh checks that the selected file contains the expected scheduler directive, that obvious example placeholders have been replaced, and that the LSF logs/ directory exists. It does not contact a scheduler, validate the cluster's resource vocabulary, or submit jobs.

## Data and rules

This repository contains no Challenge data and does not download anything. Use only data and external sources permitted by the current [Challenge rules](https://virtualembryo.ai/challenge/rules). For local evaluation, follow the current [evaluation and submission contract](https://virtualembryo.ai/challenge/evaluation).

## Official scheduler references

- [Altair PBS Professional 2024.1 User's Guide](https://help.altair.com/2024.1.0/PBS%20Professional/PBSUserGuide2024.1.pdf) — resource requests and job arrays. PBS Professional and OpenPBS installations can differ; follow the documentation for your specific site.
- [IBM Spectrum LSF job scripts](https://www.ibm.com/docs/en/spectrum-lsf/10.1.0?topic=options-job-script) — #BSUB script directives.
- [IBM Spectrum LSF GPU option](https://www.ibm.com/docs/en/spectrum-lsf/10.1.0?topic=o-gpu) — GPU syntax and cluster prerequisites.
- [IBM Spectrum LSF job arrays](https://www.ibm.com/docs/en/spectrum-lsf/10.1.0?topic=administration-job-arrays) — array indices and concurrency limits.

## Limitations

These are editable starting points, not endorsed or production-ready cluster configurations. Scheduler versions, resource units, GPU plugins, modules, filesystem behavior, and policy differ. Review each script and run a small permitted smoke job before scheduling a large array.

## License

MIT. See LICENSE.
