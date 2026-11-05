# Task 3 Workshop: Predict the Perturbation Response

**75 minutes · 4–20 participants · no code or challenge data required**

This session helps participants reason about a conditional-knockout prediction task. The central learning goal is to distinguish the effect of a perturbation from the wild-type background. It does not propose a biological mechanism or a modeling recipe.

## Prepare

Open the official [task descriptions](https://virtualembryo.ai/challenge/tasks), [data schema](https://virtualembryo.ai/challenge/data), and current [rules](https://virtualembryo.ai/challenge/rules). Bring paper or share this guide. The exercises use invented numbers and generic feature names. Do not use hidden-target measurements. Official pages take precedence and may change.

## Run of show

| Minutes | Activity | Facilitator prompt |
|---:|---|---|
| 0–8 | Define the prediction | “What does the challenge ask the model to change?” |
| 8–20 | Map conditions and split | “Which knockout is training, validation, or hidden test?” |
| 20–38 | Compare against wild type | Use Exercise 1. |
| 38–52 | Read response metrics | Use Exercise 2. |
| 52–65 | Screen an outside source | Use Exercise 3. |
| 65–72 | State uncertainty | Write one response claim and one limitation. |
| 72–75 | Close | Revisit current official pages and unresolved questions. |

## Exercise 1 — Background versus response

The following values are invented, normalized toy values for one generic feature. They are not real VEC observations.

| Condition | Fictional value |
|---|---:|
| matched wild type | 10.0 |
| perturbation, Model A | 10.1 |
| perturbation, Model B | 7.0 |

Ask pairs which model reproduces the wild-type background and which predicts a larger change. Then ask why an absolute-expression comparison alone could favor a model that simply copies wild type.

### Answer key

Model A stays near the wild-type value, so its predicted change is near zero. Model B predicts a larger decrease. This toy example does not tell us which direction is biologically correct; the observed perturbation response defines that. The challenge evaluates response relative to wild type, so matching a shared background is not enough.

## Exercise 2 — Four response questions

The official T3 metrics cover response-gene recovery, response direction, response magnitude, and cell-state distribution. Ask each pair to match a fictional failure to a metric: (a) the right genes change in the wrong direction; (b) direction is right but effect is too small; (c) large changes occur in the wrong genes; (d) population proportions collapse.

### Answer key

(a) response direction; (b) response magnitude; (c) response-gene recovery; (d) cell-state distribution. Metrics are separate evidence. A good value on one is not proof of a good result on the others.

## Exercise 3 — External-data screen

A colleague proposes a public dataset with a knockout of a related gene and a similar stage. Ask groups to identify the checks before use: exact gene/allele and genotype, stage, source and release, license, task relevance, current held-out rules, and disclosure requirements. Which unresolved fact should stop use?

### Answer key

The group should pause until the exact source, perturbation, and stage can be checked against the current rules. A related allele or phenocopy may fall within a protected held-out condition; a public URL does not establish eligibility. Follow the rules' explicit boundary and ask organizers in advance if the match is ambiguous.

## Participant worksheet

1. Name the currently released Task 3 perturbation training example, validation target, and hidden test target from the official task page.
2. For an invented feature, calculate `perturbation − matched wild type` for each model. What did the difference reveal that absolute values hid?
3. Match each failure in Exercise 2 to the response metric it affects.
4. List the evidence needed before an external perturbation dataset can be considered eligible and disclosed.
5. Write one result claim that is supported by the toy example and one biological claim that is not.

## Facilitator close

Do not infer real biology from the invented example. Ask participants to keep the perturbation contrast, matched control, genotype, stage, and source provenance explicit in any analysis. This is independent educational material, not official evaluation guidance.
