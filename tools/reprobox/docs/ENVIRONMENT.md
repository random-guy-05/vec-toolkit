# ReproBox environment notes

## Reproducibility policy

`veckit==0.1.2` is pinned exactly because scorer behavior is part of the evaluation contract. The Python base image is pinned by digest. The surrounding scientific stack is bounded rather than frozen to one wheel set so compatible builds can resolve on x86_64 and arm64 while avoiding unreviewed major API jumps. Every image stores the exact resolved `pip freeze` at `/opt/vec-reprobox/pip-freeze.txt`.

The release gate is executable: GitHub Actions builds the image and runs the scorer smoke test inside it.

## Mount Challenge data read-only

Do not bake private or licensed data into a derived image. Mount it when the container runs:

```bash
docker run --rm -it \
  -v "$PWD":/workspace \
  -v /absolute/path/to/vec-data:/data:ro \
  vec-reprobox:local bash
```

The `:ro` mount is recommended when the container only needs to score/read data.

## Apple Silicon

The Python base image is multi-architecture. On Apple Silicon, Docker normally builds a native arm64 image. If a downstream dependency lacks an arm64 wheel on a future release, build explicitly for amd64 as a compatibility fallback:

```bash
docker build --platform linux/amd64 -t vec-reprobox:amd64 .
```

That uses emulation and is slower, so native architecture is preferable when available.

## Jupyter security

The default `jupyter lab` command keeps Jupyter's normal token authentication. ReproBox deliberately does not disable the token. When using Docker Compose, open the URL printed in the container logs.

## Record the resolved environment

```bash
docker run --rm vec-reprobox:local cat /opt/vec-reprobox/pip-freeze.txt > resolved-versions.txt
```

Store this beside a final experiment if exact package provenance matters.
