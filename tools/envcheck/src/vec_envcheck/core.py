from __future__ import annotations

import importlib
import importlib.metadata
import os
import platform
import shutil
import subprocess
import sys
from pathlib import Path

PACKAGE_DISTRIBUTIONS = {
    "numpy": "numpy",
    "scipy": "scipy",
    "pandas": "pandas",
    "anndata": "anndata",
    "h5py": "h5py",
    "sklearn": "scikit-learn",
    "veckit": "veckit",
}


def package_version(distribution: str) -> str | None:
    try:
        return importlib.metadata.version(distribution)
    except importlib.metadata.PackageNotFoundError:
        return None


def git_version() -> str | None:
    try:
        return subprocess.check_output(
            ["git", "--version"],
            text=True,
            stderr=subprocess.DEVNULL,
        ).strip()
    except (OSError, subprocess.CalledProcessError):
        return None


def build_report(cwd: str | Path = ".") -> dict:
    disk = shutil.disk_usage(cwd)
    packages = {
        name: package_version(distribution)
        for name, distribution in PACKAGE_DISTRIBUTIONS.items()
    }

    try:
        importlib.import_module("veckit")
        veckit_import: bool | str = True
    except Exception as exc:  # noqa: BLE001 - diagnostics report any import-time failure
        veckit_import = f"{type(exc).__name__}: {exc}"

    available_ram_gb = None
    try:
        import psutil

        available_ram_gb = psutil.virtual_memory().available / (1024**3)
    except ImportError:
        pass

    return {
        "python": platform.python_version(),
        "python_ok": sys.version_info >= (3, 10),
        "platform": platform.platform(),
        "machine": platform.machine(),
        "git": git_version(),
        "free_disk_gb": disk.free / (1024**3),
        "available_ram_gb": available_ram_gb,
        "packages": packages,
        "veckit_import": veckit_import,
        "VECKIT_PATH": os.environ.get("VECKIT_PATH"),
    }


def missing_requirements(report: dict, required: list[str]) -> list[str]:
    missing: list[str] = []
    packages = report["packages"]
    for name in required:
        if name == "git":
            if report["git"] is None:
                missing.append(name)
        elif name == "python":
            if not report["python_ok"]:
                missing.append(name)
        elif name == "veckit-import":
            if report["veckit_import"] is not True:
                missing.append(name)
        elif packages.get(name) is None:
            missing.append(name)
    return missing
