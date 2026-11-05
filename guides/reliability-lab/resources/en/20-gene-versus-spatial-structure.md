# Gene-gene structure and spatial structure answer different questions

**English · Reliability Lab 20 · Worked reliability exercise**

This is a small, synthetic experiment for participants who build single-cell or spatial predictions. It explains a modeling or evaluation failure without reading challenge data. It is an independent teaching resource, not an official scorer or a prediction of a leaderboard score.

A gene-pair functional can remain unchanged when entire cell rows are permuted. If coordinates stay fixed, that same permutation changes which expression states are neighbours. An unchanged expression-only structural summary therefore does not establish preserved spatial organization.

## Run the exercise

Use a fresh environment. Clone the repository, install the stated dependency, and run this lesson from the repository root. Read the output before changing anything. The JSON keys are literal code identifiers shared across language editions.

```sh
git clone https://github.com/random-guy-05/vec-reliability-lab.git
cd vec-reliability-lab
python3 -m venv .venv
# macOS/Linux; Windows: .venv\Scripts\activate
. .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 tools/experiments.py --lesson 20 --seed 7
```

## Your exercise

Which summary is invariant to a common permutation of the expression rows?

## Reference output: seed 7

```json
{
  "gene_pair_functional_before": 0.9446099464524159,
  "gene_pair_functional_after": 0.9446099464524159,
  "sequence_neighbor_distance_before": 2.1422813806369296,
  "sequence_neighbor_distance_after": 2.1619532929742107,
  "lesson": "Gene-gene structure and spatial structure answer different questions."
}
```

## Interpret the result

The mean gene-pair difference is unchanged because its rowwise values are only reordered. The distance between consecutive expression rows generally changes. Consecutive indices represent a deliberately simple fixed line neighbourhood in this demonstration.

## Try another case

Permute the coordinates with the expression rows. Explain why the cell-to-position relationship is then preserved.

## Limits

The line-neighbour summary is not the official three-dimensional neighbourhood metric. Use the real scorer and known released coordinates for an actual spatial benchmark.

English is the canonical factual source. Other language editions share this executable experiment. They are machine-assisted and have not been certified by native speakers. Corrections are welcome.

[Source code](../../tools/experiments.py) · [Canonical English](../en/20-gene-versus-spatial-structure.md) · [Sources and scope](../../SOURCES.md) · [All editions](../../README.md)
