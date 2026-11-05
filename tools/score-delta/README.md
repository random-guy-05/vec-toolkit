# VEC Score Delta

Compare two `veckit` result JSON files without misreading metric direction.

VEC metrics do **not** all move the same way:

- higher is better: `de_score`, `de_direction`, `occupancy_dice`;
- lower is better: `mmd_u`, `variogram`, `d2_shape`, `neighborhood_mmd`;
- zero is ideal: `scale_log_ratio`, `severity_slope`.

Diagnostic-only metrics such as `energy_distance` are displayed separately and are never treated as leaderboard metrics.

For current validation boards, Score Delta also reproduces the published per-metric skill transform and aggregate official-scale score using the current public anchors.

## Usage

```bash
pip install -e .

vec-score-delta old.json new.json --task T2 --board T2:heart:val_extrap
vec-score-delta old.json new.json --task T1 --json delta.json
```

Accepted JSON shapes:

```json
{"metrics": {"de_score": 0.5, "mmd_u": 0.02}}
```

or a direct metric mapping.

With `--board`, the board must belong to the selected task and one of the currently published validation boards.

## What the report means

- **IMPROVED / REGRESSED / UNCHANGED** are metric-direction aware.
- Missing official metrics count as skill 0 in board-score reproduction, matching the published scoring rule.
- Validation-board aggregate deltas are reproducible from published anchors; they are **not** forecasts of hidden P3 test scores.

Official source snapshot: [docs/SOURCES.md](docs/SOURCES.md).
