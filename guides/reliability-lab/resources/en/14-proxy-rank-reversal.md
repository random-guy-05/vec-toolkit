# A local validation board can reverse official method rankings

**English · Reliability Lab 14 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

A local surrogate is useful for model selection only to the extent that its ordering transfers to the intended evaluation. High local scores alone provide no such evidence. Tie-aware rank comparisons can reveal reversed or uninformative ordering without attempting to reconstruct any hidden target property.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 14 --seed 7
```

## Your exercise

What does a Spearman correlation of -1 imply for these four completed predictions?

## Reference output: seed 7

```json
{
  "local_scores": [
    1.0,
    2.0,
    2.0,
    4.0
  ],
  "official_scores": [
    4.0,
    2.0,
    2.0,
    1.0
  ],
  "tie_aware_spearman": -1.0,
  "constant_series_correlation": null
}
```

## Interpret the result

The local and official orderings reverse exactly, including the tied middle pair. A constant score vector has undefined rank correlation; the script reports null rather than inventing zero agreement or a winner.

## Try another case

Change one official score to break a tie. Recompute the ranks rather than assigning arbitrary distinct ranks to equal values.

## Limits

Four methods are a small descriptive sample. No significance claim or unseen-score forecast follows. Returned scores may select completed predictions, not reconstruct hidden target measurements.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/14-proxy-rank-reversal.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
