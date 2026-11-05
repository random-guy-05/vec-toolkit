# VEC EnvCheck

A dependency-light first diagnostic for "why doesn't the VEC tooling run on this machine?"

```bash
pip install -e .
vec-envcheck
vec-envcheck --json environment.json
vec-envcheck --require anndata,veckit
```

It reports:

- Python version and architecture;
- OS/platform;
- Git executable/version;
- free disk;
- available RAM when `psutil` is installed;
- installed versions of NumPy, SciPy, pandas, AnnData, h5py, scikit-learn and veckit;
- whether `veckit` imports successfully;
- `VECKIT_PATH`, when set.

By default, optional scientific packages may be missing without making the diagnostic fail. Use `--require package1,package2` when you want CI-style enforcement.

No Challenge data is read.

## Development

```bash
pip install -e '.[dev]'
pytest
ruff check src tests
```
