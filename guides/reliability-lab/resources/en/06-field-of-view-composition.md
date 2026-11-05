# A changed observed fraction need not mean population growth

**English · Reliability Lab 06 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

Cell-type proportions depend on which tissue enters the observed field of view. Removing many cells of one type increases another type's fraction without adding a single cell of that second type. Comparing only normalized proportions can conflate developmental growth with dissection, cropping or sampling changes.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 06 --seed 7
```

## Your exercise

Did the second population grow when its observed fraction increased?

## Reference output: seed 7

```json
{
  "early_counts": [
    900,
    100
  ],
  "late_counts": [
    90,
    100
  ],
  "early_fraction": [
    0.9,
    0.1
  ],
  "late_fraction": [
    0.47368421052631576,
    0.5263157894736842
  ],
  "unchanged_heart_count": true,
  "warning": "A changed observed fraction need not mean more heart cells."
}
```

## Interpret the result

Its count remains 100. The first population shrinks from 900 observed cells to 90, so the unchanged second population occupies a larger share. Absolute observed counts still do not establish absolute organism-level abundance when sampling changes.

## Try another case

Keep the total observed count fixed and move cells between populations. Explain how that is a different mechanism with a similar proportion change.

## Limits

The toy counts describe an observation mechanism. They do not reveal any challenge target's field of view or prescribe a crop for a prediction.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/06-field-of-view-composition.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
