from pathlib import Path


def test_required_environment_files_exist():
    root = Path(__file__).resolve().parents[1]
    for rel in [
        "Dockerfile",
        "requirements.txt",
        "docker-compose.yml",
        ".devcontainer/devcontainer.json",
        "scripts/smoke_test.py",
    ]:
        assert (root / rel).is_file(), rel


def test_scorer_is_exactly_pinned():
    root = Path(__file__).resolve().parents[1]
    requirements = (
        root / "requirements.txt"
    ).read_text()
    assert "veckit==0.1.2" in requirements


def test_dockerfile_runs_as_nonroot_user():
    root = Path(__file__).resolve().parents[1]
    dockerfile = (root / "Dockerfile").read_text()
    assert "USER vec" in dockerfile
    assert "FROM python:3.11-slim-bookworm@sha256:" in dockerfile
    assert "/opt/vec-reprobox/pip-freeze.txt" in dockerfile
