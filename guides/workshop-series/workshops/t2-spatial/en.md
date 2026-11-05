# Task 2 Workshop: Reasoning Across Space and Time

**75 minutes · 4–20 participants · no code or challenge data required**

This facilitator-ready session is for participants who know basic single-cell concepts but are new to 3D spatial-temporal prediction. It uses a fictional model comparison. The goal is to reason about the task contract and evidence, not to teach an unverified modeling recipe.

## Prepare

Open the official [task descriptions](https://virtualembryo.ai/challenge/tasks), [data schema](https://virtualembryo.ai/challenge/data), and [evaluation page](https://virtualembryo.ai/challenge/evaluation). Bring paper or share this guide. Ask participants not to use hidden targets or share private model results. Re-check the official pages before the session; they are authoritative.

## Run of show

| Minutes | Activity | Facilitator prompt |
|---:|---|---|
| 0–8 | Set the question | “What exactly must a prediction contain?” |
| 8–20 | Map the split | “Is this interpolation or extrapolation? What stages are actually visible?” |
| 20–38 | Work the scenario | Use Exercise 1 below. |
| 38–52 | Interpret the score | Use Exercise 2 below. |
| 52–65 | Audit coordinates | Use Exercise 3 below. |
| 65–72 | Write a claim boundary | Each pair writes one supported claim and one unsupported claim. |
| 72–75 | Close | Point to the current official pages and invite unresolved questions. |

## Exercise 1 — One task, different settings

The fictional team “Small Atlas” assumes all Task 2 boards ask it to forecast beyond the latest training stage. Ask pairs to inspect the official split table and correct that assumption. They should identify the whole-embryo setting's held-out interpolation, then contrast it with the heart setting's interpolation and extrapolation questions. Ask what is shared and what differs: both predict expression and 3D coordinates, but the setting and stage split matter.

### Answer key

Task 2 has two settings. Whole-embryo testing is interpolation: the held-out stage falls between released stages. In the heart setting, one held-out validation question is interpolation, while later stages test extrapolation beyond the released training range. Verify the exact stage names and board IDs on the current official pages rather than relying on memory.

## Exercise 2 — Four equally weighted questions

Fictional Model A gets expression changes roughly right but predicts a uniform cloud of cells. Model B has a plausible shape and local neighborhoods but weak expression changes. Neither has been scored officially. Ask each pair: which evidence would distinguish molecular, cellular, tissue, and local-organization performance? What can a local pseudo-split establish, and what can it not establish about the hidden board?

### Answer key

The official T2 score gives one quarter each to expression change, cell-state distribution, tissue shape/growth scale, and local spatial organization. A strong result on one component does not prove performance on another. A local comparison describes only its chosen data, split, and scorer; it is not a hidden-test result.

## Exercise 3 — Coordinate frame check

Two fictional stages each have a 3D point cloud. A teammate matches cells at identical numeric `(x,y,z)` values across stages and calls them the same cells. Ask: what evidence would justify that identity claim?

### Answer key

None is supplied by the coordinate values alone. The official data page says coordinates use a per-embryo local frame and are not registered across time points. Do not infer cross-stage cell correspondence or a shared coordinate frame from matching numbers. Read the official schema before building a registration assumption into an analysis.

## Participant worksheet

1. For the board you chose, list the visible training stages, held-out question, and predicted channels. Cite the current official page.
2. For a reported score, record the split, scorer version, and which of the four T2 dimensions it measures.
3. What extra evidence would be needed before claiming that two cross-stage coordinates identify the same biological location or cell?
4. Write one narrow claim supported by your evidence and one broader claim it does not support.

## Facilitator close

Do not present the fictional comparison as a result or recommend a winning model. Invite participants to verify the board contract, inspect the limitations of any community tool, and document their own split and assumptions. The material is educational and independent; it is not an official scoring guide.
