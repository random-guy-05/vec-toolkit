# Release audit

Release: **v1.0.0**  
Audit date: **2026-10-05**

## Release gate

GitHub Actions has two independent gates:

- static repository/layout tests;
- an actual Docker image build followed by `python scripts/smoke_test.py` inside the image.

The smoke test constructs synthetic H5AD files and runs the installed public `veckit==0.1.2` scorer end to end.

## Reproducibility checks

- the Python base image is pinned by digest;
- `veckit==0.1.2` is pinned exactly;
- every built image stores its resolved Python environment at `/opt/vec-reprobox/pip-freeze.txt`;
- the smoke test verifies that snapshot exists and contains the expected scorer version;
- the image runs as a non-root user.

Scientific dependencies remain bounded rather than fully frozen in the repository, so a later rebuild can resolve newer compatible packages inside those bounds. The recorded freeze file captures the exact environment of each built image.

No Challenge data is bundled.

## Current verification

The public Docker workflow builds the image successfully and runs the real scorer smoke test inside it.
