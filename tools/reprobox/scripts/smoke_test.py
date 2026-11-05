from __future__ import annotations

import importlib.metadata
import subprocess
import tempfile
from pathlib import Path

import anndata as ad
import numpy as np
import pandas as pd
from veckit import score


def main() -> int:
    print("VEC ReproBox smoke test")
    freeze = Path("/opt/vec-reprobox/pip-freeze.txt")
    if not freeze.is_file():
        raise RuntimeError("missing resolved environment snapshot")
    freeze_text = freeze.read_text(encoding="utf-8")
    if "veckit==0.1.2" not in freeze_text:
        raise RuntimeError("resolved environment does not contain veckit==0.1.2")
    print("resolved environment snapshot PASS")
    print("veckit", importlib.metadata.version("veckit"))
    print("anndata", importlib.metadata.version("anndata"))

    help_run = subprocess.run(
        ["veckit", "--help"],
        capture_output=True,
        text=True,
        check=False,
    )
    if help_run.returncode != 0:
        raise RuntimeError(help_run.stdout + help_run.stderr)

    rng = np.random.default_rng(2026)
    n_cells, n_genes = 100, 32
    genes = [f"g{i}" for i in range(n_genes)]
    labels = np.array(["A"] * 50 + ["B"] * 50)

    ref_x = np.log1p(
        rng.poisson(3, size=(n_cells, n_genes))
    ).astype(np.float32)
    target_x = ref_x.copy()
    target_x[:, :8] += 0.4
    target_x[:, 8:16] = np.maximum(
        target_x[:, 8:16] - 0.3,
        0,
    )
    pred_x = np.maximum(
        target_x + rng.normal(0, 0.1, target_x.shape),
        0,
    ).astype(np.float32)

    def write(path: Path, x, celltypes=None):
        obs = pd.DataFrame(
            index=[f"cell_{i}" for i in range(len(x))]
        )
        if celltypes is not None:
            obs["celltype"] = celltypes
        ad.AnnData(
            X=x,
            obs=obs,
            var=pd.DataFrame(index=genes),
        ).write_h5ad(path)

    with tempfile.TemporaryDirectory() as temporary:
        root = Path(temporary)
        ref = root / "ref.h5ad"
        target = root / "target.h5ad"
        pred = root / "pred.h5ad"

        write(ref, ref_x, labels)
        write(target, target_x, labels)
        write(pred, pred_x)

        result = score(
            task="T1",
            input=pred,
            target=target,
            reference=ref,
            seed=7,
        )
        required = {
            "de_score",
            "de_direction",
            "mmd_u",
            "variogram",
        }
        missing = required - set(result["metrics"])
        if missing:
            raise RuntimeError(
                "scorer result missing expected metrics: "
                f"{sorted(missing)}"
            )

        print("synthetic T1 scorer PASS")
        for metric in sorted(required):
            print(f"  {metric}: {result['metrics'][metric]}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
