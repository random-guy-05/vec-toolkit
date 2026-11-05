# Stochastic rounding without systematic molecule loss

**English · Reliability Lab 02 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

Segmentation or allocation may produce fractional counts. Converting them to integers by truncation systematically lowers their expectation. Stochastic rounding adds a Bernoulli draw for the fractional part, preserving each input's expectation while adding sampling variability. It is a modeling choice, not proof of the true molecular observation process.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 02 --seed 7
```

## Your exercise

Which operation preserves 0.2, 0.7, 1.4 and 3.8 on average?

## Reference output: seed 7

```json
{
  "target": [
    0.2,
    0.7,
    1.4,
    3.8
  ],
  "floor": [
    0.0,
    0.0,
    1.0,
    3.0
  ],
  "randomized_mean": [
    0.202,
    0.70021,
    1.39812,
    3.79941
  ],
  "max_error": 0.0020000000000000018
}
```

## Interpret the result

Flooring maps the values to 0, 0, 1 and 3. Across many independent rounds, stochastic rounding approaches the original values. The script measures the maximum empirical mean error and checks it is small at its declared sample size.

## Try another case

Reduce the number of draws from 100000 to 100. Repeat with several seeds and explain why individual empirical errors grow.

## Limits

Unbiased expectation does not mean every draw is accurate, nor that random rounding is appropriate for every downstream method. Preserve the original fractional layer and record the random seed.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/02-fractional-rounding.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
