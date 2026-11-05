# Community Contribution submission text

## Title
VEC EnvCheck — one-command environment diagnostic for VEC tooling

## Description
VEC EnvCheck produces a standardized environment report for VEC participants: Python/OS/architecture, Git, free disk, optional available RAM, versions of the common scientific packages and veckit, veckit import status, and VECKIT_PATH. It can save the report as JSON and optionally enforce a caller-specified set of required packages with a CI-friendly exit code. The goal is to replace vague "import error" screenshots with a concrete reproducible diagnostic that can be attached to issues across the growing VEC community-tool ecosystem. It reads no Challenge data and has no mandatory scientific runtime dependencies.
