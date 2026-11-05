# Nearly tied eigenvalues make PCA directions unstable

**English · Reliability Lab 09 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

PCA directions are not uniquely determined within a repeated-eigenvalue subspace. A tiny covariance perturbation can rotate the selected leading direction substantially while barely changing the covariance matrix. Registration based on that direction may inherit numerical instability even when the point cloud itself changed very little.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 09 --seed 7
```

## Your exercise

How can a tiny perturbation rotate the leading direction by roughly 45 degrees?

## Reference output: seed 7

```json
{
  "covariance_perturbation": 1.4142135623730952e-08,
  "principal_axis_angle_degrees": 45.00000000000001,
  "eigenvalues": [
    0.1,
    1.0,
    1.0
  ]
}
```

## Interpret the result

The unperturbed covariance has two equal largest eigenvalues. Any orthonormal basis in their plane is valid. The perturbation chooses a different basis; the large axis-angle change does not imply a comparable change in the underlying shape.

## Try another case

Replace one leading eigenvalue by 1.2. Repeat the calculation and compare its sensitivity.

## Limits

An axis sign flip is a separate ambiguity. A stable subspace does not guarantee stable individual axes. This example does not prove an error in any particular scorer.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/09-pca-eigenvalue-gap.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
