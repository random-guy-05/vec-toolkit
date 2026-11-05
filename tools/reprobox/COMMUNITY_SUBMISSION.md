# Community Contribution submission text

## Title
VEC ReproBox — one-command Docker/devcontainer environment with a real scorer smoke test

## Description
VEC ReproBox gives participants a tested container environment instead of only diagnosing a broken one. It provides a Dockerfile, Docker Compose setup and VS Code devcontainer with Python 3.11, the current public scorer pinned at `veckit==0.1.2`, a digest-pinned Python base image, bounded AnnData/scientific dependencies, JupyterLab and Git. `make smoke` builds the image and runs a fully synthetic T1 AnnData prediction/reference/target through the actual installed veckit scorer, checking the CLI, Python API and expected ranking metrics rather than merely testing imports. The image runs as a non-root user, contains no Challenge data, and records the exact resolved Python environment from each build at `/opt/vec-reprobox/pip-freeze.txt`. It helps first-time entrants, workshop participants, classrooms and teams reproduce the same working software environment across laptops and cloud machines.
