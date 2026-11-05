# Normalization and temporal mixing do not commute

**English · Reliability Lab 05 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

Mixing raw counts and then normalizing differs from normalizing each endpoint and then mixing its log expression. Row totals and log1p introduce nonlinearities. These constructions express different assumptions about whether molecules, proportions or logged measurements evolve between stages. A time weight alone does not make them equivalent.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 05 --seed 7
```

## Your exercise

Why are the two midpoint vectors different even though both use weight 0.5?

## Reference output: seed 7

```json
{
  "normalize_after_mix": [
    9.115140186122302,
    6.813544494621113
  ],
  "mix_after_normalize": [
    4.6052201834882585,
    4.6052201834882585
  ],
  "difference": 5.0215609817365605
}
```

## Interpret the result

The raw rows [10,0] and [0,1] have different totals. Mixing counts gives the first gene more molecules; normalizing each endpoint first removes that depth difference. Averaging the logs then adds another nonlinear operation.

## Try another case

Set both endpoint row totals equal, then compare the two operations again. Separate the total-count effect from the log effect.

## Limits

Neither order is automatically a better biological model. State the modeled quantity and test alternatives without using held-out target measurements.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/05-normalization-order.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
