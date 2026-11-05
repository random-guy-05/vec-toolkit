# When normalized expression cannot recover molecule counts

**English · Reliability Lab 01 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

CP10K normalization removes the row total before applying log1p. The smallest positive value is one molecule only when the original row contains a single-molecule observation. A row whose positive counts share an integer factor loses that factor. Treating its smallest positive value as one therefore returns a scaled-down count row.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 01 --seed 7
```

## Your exercise

Why does the first recovered row disagree with the input while its normalized expression is unchanged?

## Reference output: seed 7

```json
{
  "input_counts": [
    [
      2.0,
      4.0,
      8.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "recovered_counts": [
    [
      1.0,
      2.0,
      4.0
    ],
    [
      1.0,
      3.0,
      5.0
    ]
  ],
  "exact_rows": 1,
  "lesson": "Normalization loses a common integer factor."
}
```

## Interpret the result

The row [2,4,8] and [1,2,4] have identical proportions. Both produce the same normalized expression; no inverse of that normalized row can distinguish them. The [1,3,5] row has an observed single molecule and is recovered in this example.

## Try another case

Replace the first input row by [3,6,12], then [1,6,12]. Predict which row is identifiable under this particular decoder.

## Limits

Exact recovery in a toy row does not establish recovery for a dataset. Prefer a measured count layer; record the normalization convention and any fractional segmentation counts.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/01-count-recovery.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
