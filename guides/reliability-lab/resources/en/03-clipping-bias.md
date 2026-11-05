# Why clipping an additive expression shift changes its mean

**English · Reliability Lab 03 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

A constant shift would move a mean by that constant on an unconstrained real line. Expression predictions must be nonnegative. Applying max(x+d,0) clips some cells and makes the resulting mean a nonlinear function of d. A proposed pseudobulk correction can therefore miss its intended target even when its arithmetic looked exact before clipping.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 03 --seed 7
```

## Your exercise

Does subtracting 0.5 from every entry reduce the mean by exactly 0.5 after clipping?

## Reference output: seed 7

```json
{
  "original_mean": 1.0,
  "shift": -0.5,
  "intended_mean": 0.5,
  "clipped_mean": 0.75
}
```

## Interpret the result

No. The zeros cannot become negative, so their intended decrease disappears. The actual clipped mean exceeds the intended mean. This is a numerical consequence of the transformation, independent of biological interpretation.

## Try another case

Change the fraction of zeros, keeping the nonzero values fixed. Plot the difference between intended and clipped means.

## Limits

The lesson does not prescribe a replacement model. Hurdle, multiplicative, molecule-level and constrained methods make different assumptions that need separate validation.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/03-clipping-bias.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
