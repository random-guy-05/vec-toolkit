# Every type can increase while aggregate expression decreases

**English · Reliability Lab 17 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

An aggregate expression mean depends on both within-type expression and cell-type proportions. A strong change in mixture can reverse the aggregate direction even when each type changes in the same direction. This is why a pseudobulk shift does not uniquely identify a within-cell response.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 17 --seed 7
```

## Your exercise

Why does the aggregate fall when both type means increase?

## Reference output: seed 7

```json
{
  "type_means_before": [
    1.0,
    8.0
  ],
  "type_means_after": [
    2.0,
    9.0
  ],
  "aggregate_before": 7.3,
  "aggregate_after": 2.7
}
```

## Interpret the result

The mixture moves from mostly high-expression cells to mostly low-expression cells. Its composition effect outweighs the increase within each type. The script displays the type means and the resulting aggregate means so both mechanisms remain visible.

## Try another case

Keep the proportions fixed while retaining the same type means. Compare the aggregate direction with the changing-mixture result.

## Limits

Two invented types illustrate non-identifiability. Real annotations may change across stages, and a missing label need not mean a biologically absent population.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/17-composition-simpson.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
