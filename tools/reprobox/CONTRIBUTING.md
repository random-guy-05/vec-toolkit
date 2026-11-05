# Contributing

Bug reports and focused pull requests are welcome. Do not commit restricted Challenge data.

Before opening a PR:

```bash
python -m pip install pytest
pytest -q
docker build -t vec-reprobox:test .
docker run --rm vec-reprobox:test python scripts/smoke_test.py
```

The Docker smoke test is the release gate because the repository exists to provide a working containerized environment.
