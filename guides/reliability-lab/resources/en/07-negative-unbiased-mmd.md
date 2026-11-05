# A negative unbiased MMD estimate can be valid

**English · Reliability Lab 07 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

The population squared kernel distance is nonnegative. Its finite-sample unbiased estimator removes within-sample diagonal terms and can be negative. A biased empirical squared distance includes those terms and behaves differently. Confusing the population quantity with its estimator can cause a valid negative estimate to be incorrectly rejected or silently clipped.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 07 --seed 7
```

## Your exercise

Why is the unbiased estimate negative while the biased estimate is nonnegative?

## Reference output: seed 7

```json
{
  "unbiased_mmd_squared": -0.8617044036602768,
  "biased_mmd_squared": 0.0029603131031104013,
  "population_distance_nonnegative": true
}
```

## Interpret the result

The diagonal correction changes the finite-sample estimate. The script calculates both expressions on two nearby two-point samples and verifies their signs. A negative estimate is not evidence that the population distance is negative.

## Try another case

Move the second sample farther away. Track both estimators while keeping the kernel fixed.

## Limits

This uses an explicitly defined one-dimensional Gaussian kernel, not the full official scorer with its fitted representation and bandwidth choices. Do not compare these toy values to board skills.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/07-negative-unbiased-mmd.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
