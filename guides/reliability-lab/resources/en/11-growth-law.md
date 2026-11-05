# Linear radius and constant log growth imply different midpoints

**English · Reliability Lab 11 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

Two endpoint sizes do not uniquely identify an intermediate growth law. Linear interpolation in radius and linear interpolation in log radius both fit the endpoints, but produce different middle values. Choosing one is a model assumption and should not be mistaken for information about an unseen specimen.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 11 --seed 7
```

## Your exercise

What midpoint follows from each assumption between radii 100 and 400?

## Reference output: seed 7

```json
{
  "early_radius": 100.0,
  "late_radius": 400.0,
  "linear_midpoint": 250.0,
  "constant_log_growth_midpoint": 200.0
}
```

## Interpret the result

Linear radius gives 250. Constant log growth gives the geometric mean, 200. Both calculations are correct under their respective assumptions; neither alone establishes the true intermediate radius.

## Try another case

Evaluate both curves at fractions 0.25 and 0.75. Explain which assumption makes relative growth constant.

## Limits

Published score anchors must not be inverted to recover a hidden size. This exercise uses invented endpoints and does not compute a challenge target property.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/11-growth-law.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
