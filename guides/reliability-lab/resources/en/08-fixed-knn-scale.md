# A fixed neighbour count changes physical scale with density

**English · Reliability Lab 08 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

A k-nearest-neighbour summary uses a fixed number of cells, not a fixed physical radius. On the same domain, denser sampling makes those neighbours closer. Changing prediction sample size can therefore change the physical scale of a local average even when the underlying tissue distribution is unchanged.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 08 --seed 7
```

## Your exercise

How far does a 15-neighbour span extend on increasingly dense unit segments?

## Reference output: seed 7

```json
{
  "domain_length": 1,
  "fixed_neighbor_count": 15,
  "physical_span": {
    "100": 0.15151515151515152,
    "1000": 0.015015015015015015,
    "10000": 0.0015001500150015
  }
}
```

## Interpret the result

The script uses an endpoint and equally spaced positions. Its one-sided 15-step span decreases with sample size. This is a deliberately simple scale calculation, not an exact model of an interior three-dimensional neighbourhood.

## Try another case

Hold a physical radius fixed instead. Count how many sampled cells fall inside it at each density.

## Limits

Cell count is not a biological size prediction. Sampling and neighbourhood scale are still relevant statistical considerations; use the official scorer for an actual local-metric analysis.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/08-fixed-knn-scale.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
