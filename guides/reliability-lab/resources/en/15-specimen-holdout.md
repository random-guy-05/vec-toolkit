# Cell-level splits can share every biological specimen

**English · Reliability Lab 15 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

Splitting cells randomly does not necessarily hold out biological specimens. If cells from the same embryos appear on both sides, shared specimen effects can make generalization look better than it is. Grouped splitting changes the unit of evaluation from cells to the biological group of interest.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 15 --seed 7
```

## Your exercise

How many specimen IDs occur on both sides of each split?

## Reference output: seed 7

```json
{
  "cell_split_shared_specimens": 6,
  "specimen_split_shared_specimens": 0,
  "total_specimens": 6
}
```

## Interpret the result

The random cell split shares specimen IDs between train and test. The explicit specimen split shares none. Each specimen contains multiple cells, so the number of cells should not be interpreted as the number of independent embryos.

## Try another case

Make two specimen IDs aliases for the same embryo. Explain why a literal string-overlap check would miss that dependency.

## Limits

A zero-overlap identifier check cannot prove absence of every form of leakage. It depends on correct metadata and a scientifically appropriate grouping variable.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/15-specimen-holdout.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
