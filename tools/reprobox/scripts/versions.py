import importlib.metadata

PACKAGES = [
    "veckit",
    "anndata",
    "numpy",
    "scipy",
    "pandas",
    "scikit-learn",
    "jupyterlab",
]

for package in PACKAGES:
    try:
        print(
            f"{package}=="
            f"{importlib.metadata.version(package)}"
        )
    except importlib.metadata.PackageNotFoundError:
        print(f"{package}: MISSING")
