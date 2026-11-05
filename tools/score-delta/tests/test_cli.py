import json
import subprocess
import sys


def test_cli_validation_board_score_and_diagnostics(tmp_path):
    old = tmp_path / "old.json"
    new = tmp_path / "new.json"
    output = tmp_path / "delta.json"

    old.write_text(
        json.dumps(
            {
                "metrics": {
                    "de_score": 0.0,
                    "de_direction": 0.0,
                    "mmd_u": 0.08359,
                    "variogram": 0.005219,
                    "energy_distance": 0.3,
                }
            }
        )
    )
    new.write_text(
        json.dumps(
            {
                "metrics": {
                    "de_score": 0.4,
                    "de_direction": 0.3,
                    "mmd_u": 0.04,
                    "variogram": 0.003,
                    "energy_distance": 0.2,
                }
            }
        )
    )

    result = subprocess.run(
        [
            sys.executable,
            "-m",
            "vec_score_delta.cli",
            str(old),
            str(new),
            "--task",
            "T1",
            "--board",
            "T1:val",
            "--json",
            str(output),
        ],
        capture_output=True,
        text=True,
        check=False,
    )

    assert result.returncode == 0, result.stdout + result.stderr
    assert "T1:val: 50.000 ->" in result.stdout
    assert "Diagnostic-only fields" in result.stdout
    payload = json.loads(output.read_text())
    assert payload["score_delta"] > 0
