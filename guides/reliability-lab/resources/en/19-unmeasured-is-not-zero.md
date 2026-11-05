# An unmeasured gene is different from a measured zero

**English · Reliability Lab 19 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

Zero expression and absence from a measurement panel carry different information. Zero-filling an absent gene makes a rectangular matrix but can hide that distinction. An explicit measurement-status mask retains what was observed, even when the downstream submission contract eventually requires a fixed panel.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 19 --seed 7
```

## Your exercise

What information disappears when the absent gene is silently filled with zero?

## Reference output: seed 7

```json
{
  "measured_zero": {
    "gene": "G",
    "measured": true,
    "value": 0
  },
  "absent_panel_gene": {
    "gene": "G",
    "measured": false,
    "value": null
  },
  "zero_fill_cannot_preserve_measurement_status": true
}
```

## Interpret the result

The two records differ in whether measurement occurred. The numeric zero alone cannot distinguish absence of detected molecules from absence of measurement. The example keeps a boolean measured field and null for the unmeasured value.

## Try another case

Add a third record whose value is missing because of a processing failure. Design metadata that distinguishes all three cases.

## Limits

A mask does not decide how to impute or whether a source is eligible. Do not silently claim that imputed columns were experimentally measured.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/19-unmeasured-is-not-zero.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
