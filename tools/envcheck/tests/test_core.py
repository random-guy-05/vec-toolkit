from vec_envcheck.core import build_report, missing_requirements, package_version


def test_report_shape(tmp_path):
    report = build_report(tmp_path)
    for key in [
        "python",
        "python_ok",
        "platform",
        "machine",
        "git",
        "free_disk_gb",
        "packages",
        "veckit_import",
    ]:
        assert key in report
    assert report["free_disk_gb"] >= 0


def test_missing_package_returns_none():
    assert package_version("definitely-not-a-real-package-xyz") is None


def test_missing_requirements():
    report = {
        "python_ok": True,
        "git": "git version 2",
        "veckit_import": "ImportError",
        "packages": {"anndata": None, "veckit": "0.1.2"},
    }
    assert missing_requirements(
        report,
        ["python", "git", "anndata", "veckit", "veckit-import"],
    ) == ["anndata", "veckit-import"]
