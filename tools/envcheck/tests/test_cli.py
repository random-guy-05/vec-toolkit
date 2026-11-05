import json
import subprocess
import sys


def test_cli_writes_json(tmp_path):
    output = tmp_path / "env.json"
    result = subprocess.run(
        [
            sys.executable,
            "-m",
            "vec_envcheck.cli",
            "--json",
            str(output),
            "--require",
            "python,git",
        ],
        capture_output=True,
        text=True,
        check=False,
    )
    assert result.returncode == 0, result.stdout + result.stderr
    payload = json.loads(output.read_text())
    assert payload["python_ok"] is True
    assert payload["git"]
