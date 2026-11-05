# Many hyperparameter variants are not independent method families

**English · Reliability Lab 16 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

A table may contain many predictions but only a few distinct modeling families. Strong pooled correlation can reflect between-family differences while saying little about selecting nearby variants within a family. Counting every row as independent overstates the breadth of validation evidence.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 16 --seed 7
```

## Your exercise

How do pooled and within-family correlations differ in this synthetic table?

## Reference output: seed 7

```json
{
  "pooled_spearman": 0.9352941176470588,
  "within_family_spearman": [
    0.39999999999999997,
    0.39999999999999997,
    -0.7999999999999999,
    -0.39999999999999997
  ],
  "independent_families": 4,
  "variants": 16,
  "lesson": "Many variants do not create many independent method families."
}
```

## Interpret the result

The table deliberately gives each family a strong shared signal and small independent within-family noise. Inspect both summaries. The precise within-family values depend on the seed; their variability is part of the lesson, not a result to optimize away.

## Try another case

Increase the number of variants within each family without adding families. Distinguish what information grows and what stays fixed.

## Limits

Neither a pooled nor a within-family correlation alone establishes generalization. Group structure, sample size, and prospective evaluation matter; do not infer a confidence level from row count.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/16-method-family-dependence.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
