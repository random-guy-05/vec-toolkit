# Spatial support when zero-expression ranks are tied

**English · Reliability Lab 04 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

Many cells have the same zero expression value. A quantile transform that activates some zeros must resolve those ties somehow. Random resolution scatters new detections. A local-support rule places them near cells with measured support. That choice changes spatial organization even when the number of activated cells is held fixed.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 04 --seed 7
```

## Your exercise

Which two zero cells are selected by the local-support ordering?

## Reference output: seed 7

```json
{
  "zero_cells": [
    0,
    1,
    2,
    3
  ],
  "random_activation": [
    2,
    3
  ],
  "supported_activation": [
    1,
    0
  ],
  "support": [
    0.9,
    0.8,
    0.2,
    0.1,
    2.0
  ]
}
```

## Interpret the result

The two cells with support 0.9 and 0.8 are selected. A random rule may or may not choose the same pair. The exercise compares mechanisms, rather than claiming that one random draw demonstrates universal superiority.

## Try another case

Reverse the support vector. Keep the activation count fixed and compare the selected cells again.

## Limits

Spatial smoothing can spread artifacts or reinforce existing annotation errors. Support is a prediction assumption, not hidden target evidence. Validate the rule on released-stage holdouts.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/04-zero-tie-activation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
