# Cropping can change RMS radius without biological growth

**English · Reliability Lab 12 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

RMS radius summarizes the observed cloud around its own centroid. A central crop removes distant points and reduces that radius even if every retained position is unchanged. A size trajectory fitted across specimens with different fields of view may partly describe observation rather than growth.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 12 --seed 7
```

## Your exercise

Why does the cropped synthetic cloud have a smaller RMS radius?

## Reference output: seed 7

```json
{
  "full_rms": 1.7226292470793867,
  "cropped_rms": 1.0827934049272807,
  "retained_cells": 4852,
  "biological_growth": 0
}
```

## Interpret the result

The crop removes points farther than 1.5 from the original center. The retained cloud is more concentrated. No biological motion or developmental time has been simulated, so the difference is entirely an observation effect.

## Try another case

Crop only one side and re-center each cloud. Compare the resulting centroid and RMS changes.

## Limits

A central spherical crop is an illustrative mechanism, not a reconstruction of an actual dissection. Field-of-view correction requires evidence beyond this toy example.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/12-crop-rms.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
