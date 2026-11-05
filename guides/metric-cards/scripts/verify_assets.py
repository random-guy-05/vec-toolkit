from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EXPECTED = 9
for kind, suffix in [("svg", ".svg"), ("png", ".png"), ("pdf", ".pdf")]:
    folder = ROOT / "assets" / kind
    files = sorted(folder.glob(f"*{suffix}"))
    assert len(files) == EXPECTED, (kind, len(files), EXPECTED)
    assert all(path.stat().st_size > 500 for path in files)

stems = {path.stem for path in (ROOT / "assets" / "svg").glob("*.svg")}
assert stems == {path.stem for path in (ROOT / "assets" / "png").glob("*.png")}
assert stems == {path.stem for path in (ROOT / "assets" / "pdf").glob("*.pdf")}
assert (ROOT / "VEC_METRIC_CARDS.pdf").stat().st_size > 10000
for required in ["README.md", "COMMUNITY_SUBMISSION.md", "LICENSE", "docs/SOURCES.md", "docs/ALT_TEXT.md", "index.html"]:
    assert (ROOT / required).is_file(), required
print(f"PASS: {EXPECTED} matched SVG/PNG/PDF assets + combined PDF")
