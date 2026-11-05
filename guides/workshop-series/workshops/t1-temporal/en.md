# Task 1 Workshop: Forecasting a Changing Cell Population

**75 minutes · 4–20 participants · no code or Challenge data required**

This facilitator-ready session is for participants who know basic single-cell concepts and are new to temporal gene-expression prediction. It uses fictional cell counts and feature values to separate changes in cell-state composition from changes within a cell state. The goal is to reason about the prediction target and evidence, not to prescribe a model.

## Prepare

Open the official [task descriptions](https://virtualembryo.ai/challenge/tasks), [data schema](https://virtualembryo.ai/challenge/data), and [evaluation page](https://virtualembryo.ai/challenge/evaluation). Bring paper or share this guide. The numbers below are invented and do not represent VEC observations. Do not use hidden-target measurements. Official pages take precedence and may change.

## Run of show

| Minutes | Activity | Facilitator prompt |
|---:|---|---|
| 0–8 | Define the prediction | “Are we forecasting individual cells, or a future population?” |
| 8–20 | Read the current split | “Which stages are training, validation, and hidden test today?” |
| 20–38 | Separate identity from distribution | Use Exercise 1. |
| 38–52 | Unpack a pseudobulk shift | Use Exercise 2. |
| 52–65 | Diagnose metric questions | Use Exercise 3. |
| 65–72 | Set a claim boundary | Each pair writes one supported claim and one unsupported claim. |
| 72–75 | Close | Return to the official task page and unresolved questions. |

## Exercise 1 — New population, not cell tracking

The following counts are invented. Imagine a released training sample with 70 cells of type A and 30 of type B. A fictional later target has 40 of type A, 30 of type B, and 30 of a newly appearing type C. Ask pairs: which cells in the target are “the same” cells as in training? What does the example show about predicting a population rather than following cell identities?

### Answer key

The toy table supplies no cell-identity evidence across stages, so participants cannot match individual cells. The target's distribution includes a type not present in the fictional training sample and different proportions of the existing types. A temporal population prediction must account for what states appear and how common they are; it is not a request to move each observed cell forward in time. Verify the actual split and target definition on the current official page.

## Exercise 2 — Composition can move an aggregate

These fictional feature means stay fixed within each cell type while the mixture changes:

| Stage | Type A share | Type A mean | Type B share | Type B mean | Pooled mean |
|---|---:|---:|---:|---:|---:|
| earlier | 80% | 2 | 20% | 12 | 4 |
| later | 20% | 2 | 80% | 12 | 10 |

Ask pairs to calculate the pooled mean at each stage. What changed: the within-type feature means or the population mixture? What would the pooled number alone fail to tell us?

### Answer key

The earlier pooled mean is `0.8 × 2 + 0.2 × 12 = 4`; the later mean is `0.2 × 2 + 0.8 × 12 = 10`. The within-type means did not change; the mixture did. A pooled shift alone cannot distinguish a within-state response from a change in cell-state proportions. This is a teaching example, not a claim about a real gene or stage.

## Exercise 3 — Four distinct scoring questions

The official Task 1 evaluation separates DE-gene recovery, change direction, cell-state distribution, and gene-gene co-variation. Ask groups to map each fictional failure to the question it most directly affects: (a) many changing genes are missed; (b) the relevant genes change in the opposite direction; (c) the predicted cell-type proportions are wrong; (d) gene-wise means look plausible but relationships between genes disappear.

### Answer key

(a) DE-gene recovery; (b) change direction; (c) cell-state distribution; (d) gene-gene co-variation. A failure can affect more than one metric, and these examples are not deterministic score signatures. A good result on one metric does not prove that the others are good.

## Participant worksheet

1. From the current official task page, list the visible training stages, validation target, hidden test target, and predicted quantity.
2. In Exercise 1, which evidence would be needed to claim that two cells at different stages are the same cell? Is that evidence present?
3. Show the calculation in Exercise 2. Explain how the pooled mean changed while both within-type means stayed fixed.
4. Match each failure in Exercise 3 to the most direct official metric question.
5. Write one claim supported by the fictional examples and one biological claim they cannot support.

## Facilitator close

Do not interpret the invented values as real biology or a model result. Invite participants to keep cell-state composition, within-state expression, split, and scorer evidence distinct in their analyses. This independent educational material is not an official scoring guide or modeling recipe.
