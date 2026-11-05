# VEC ReproBox

**A tested VEC container environment you can start before debugging Python packaging.**

ReproBox packages the public local scorer and the standard scientific Python stack into a Docker image and VS Code devcontainer. The scorer is pinned to **`veckit==0.1.2`**, the current PyPI release in the 2026-10-05 source snapshot. The Python base image is also pinned by digest, and every build records its exact resolved Python packages inside the image.

## Fastest path

Requirements: Docker Desktop / Docker Engine.

```bash
git clone <this-repository>
cd vec-reprobox
make smoke
```

`make smoke` builds the image and runs a real synthetic T1 H5AD through the installed public `veckit` scorer. A passing smoke test proves more than imports: AnnData write/read, the scorer CLI, the Python API, DE/direction/distribution/co-variation metrics, and core compiled dependencies all execute inside the container.

## Start JupyterLab

```bash
make lab
```

Open the Jupyter URL/token printed by the container. The repository is mounted at `/workspace`, so notebooks and scripts you create persist on the host.

## VS Code / Cursor devcontainer

Open the repository in a client supporting the Dev Containers specification and choose **Reopen in Container**. `.devcontainer/devcontainer.json` uses the exact same Dockerfile and runs the smoke test after creation.

## What's inside

- Python 3.11 on Debian bookworm-slim;
- `veckit==0.1.2` pinned exactly;
- bounded AnnData/NumPy/SciPy/pandas/scikit-learn/h5py versions;
- JupyterLab 4.x;
- Git and CA certificates;
- a non-root `vec` user;
- synthetic end-to-end scorer smoke test;
- Docker Compose and devcontainer entry points.

## Reproducibility policy

The scorer version and Python base image are pinned exactly. Scientific Python packages are bounded rather than frozen in the repository so compatible bug/security releases remain possible across architectures. Each built image writes the exact resolved environment to `/opt/vec-reprobox/pip-freeze.txt`, and the CI image build plus real scorer smoke test is the compatibility check. Rebuilding from a later date can therefore resolve newer packages inside those bounds; use the recorded freeze file when exact package provenance matters.

To record the exact resolved environment of a built image:

```bash
docker run --rm vec-reprobox:local cat /opt/vec-reprobox/pip-freeze.txt
# or a shorter summary:
docker run --rm vec-reprobox:local python scripts/versions.py
```

## Data

**No VEC data is included.** Mount or download your own authorized files. ReproBox does not alter Challenge access rules and does not contain validation/test targets.

See `docs/SOURCES.md` for the official source snapshot.
