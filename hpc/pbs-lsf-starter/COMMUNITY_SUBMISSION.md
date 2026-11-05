# Community contribution submission

- **Kind:** build
- **Title:** VEC PBS + LSF Starter — research-cluster job templates beyond Slurm
- **Public link:** https://github.com/random-guy-05/vec-pbs-lsf-starter
- **What it is, and who it helps:** A public set of editable PBS Professional/OpenPBS and IBM Spectrum LSF templates for CPU scoring, GPU model runs, and independent seed arrays. It helps VEC participants whose university or national cluster does not use Slurm. The examples keep each seed's output isolated, make site-specific assumptions explicit, include a local preflight helper, and link to the relevant scheduler documentation. PBS GPU syntax is intentionally left site-specific because installations differ. No Challenge data or credentials are included.
- **How someone else runs it:** Clone the repository on the cluster, adapt the scheduler resource requests and model command, run bash scripts/preflight.sh pbs pbs/cpu-score.pbs or the corresponding lsf command, then submit with the site's qsub or bsub command. The preflight helper does not submit jobs.
- **Credit:** Arnav Mana
