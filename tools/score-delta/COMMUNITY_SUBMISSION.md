# Community Contribution submission text

## Title
VEC Score Delta — direction-aware scorer comparison with official validation-scale deltas

## Description
VEC Score Delta compares two veckit metric JSON files while respecting the fact that VEC metrics have different optimization directions: some are higher-is-better, some lower-is-better, and signed log-ratio/slope metrics are zero-is-best. It isolates diagnostic-only fields from ranking metrics and, for the published validation boards, reproduces the official hyperbolic per-metric skill transform and task aggregation from the public floor/ceiling anchors. The output therefore answers both “which raw metrics improved?” and “what did that mean on the published validation scoring scale?” without pretending that raw metric magnitudes are directly comparable or forecasting hidden-test performance.
