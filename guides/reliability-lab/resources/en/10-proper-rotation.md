# Rotation alignment needs a determinant constraint

**English · Reliability Lab 10 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

An unconstrained orthogonal least-squares fit may choose a reflection. Proper rotations have determinant +1 and preserve handedness. The determinant correction in a Kabsch-style fit changes the optimization domain, so a reflected target generally cannot have the same perfect fit under proper rotations.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 10 --seed 7
```

## Your exercise

Why does the zero-error unconstrained fit have determinant -1?

## Reference output: seed 7

```json
{
  "unconstrained_determinant": -1.0000000000000007,
  "proper_determinant": 1.0000000000000016,
  "unconstrained_error": 6.891658975852732e-15,
  "proper_error": 15.367278961474724
}
```

## Interpret the result

The synthetic target reflects one coordinate of the source. An orthogonal reflection fits it exactly, while the proper-rotation fit must retain determinant +1 and has nonzero residual error. Translation is irrelevant here because the test isolates the linear part.

## Try another case

Generate the target with a known determinant +1 rotation instead of a reflection. Compare both fitted residuals.

## Limits

Reflection-invariant summaries cannot establish laterality. This numerical example does not certify the handedness sensitivity of any challenge metric.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/10-proper-rotation.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
