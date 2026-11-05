# Semantic equality and storage layout are different checks

**English · Reliability Lab 18 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

Arrays can have the same values while using different memory layouts. A digest of a canonical contiguous representation can make their value comparison independent of that layout. A submission-level semantic digest needs more context than the numeric matrix bytes alone.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 18 --seed 7
```

## Your exercise

Why do C-order and Fortran-order versions get the same canonical value digest?

## Reference output: seed 7

```json
{
  "c_layout": true,
  "f_layout": true,
  "semantic_digest_equal": true,
  "warning": "A real semantic hash must also include shape, gene order, cell order and coordinates."
}
```

## Interpret the result

The demonstration converts both arrays to the same dtype and contiguous order before hashing. That canonicalization removes the layout difference. It intentionally does not implement a full AnnData semantic hash.

## Try another case

Swap the two gene columns. Explain why a value digest and a gene-labeled semantic digest must be considered separately.

## Limits

A production digest must also define shape, gene order, cell order, coordinates, sparse duplicate handling, endianness and missing-value behavior. File hashes remain useful for exact artifact identity.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/18-semantic-array-hash.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
