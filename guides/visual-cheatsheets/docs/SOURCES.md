# Source contract

Verified **2026-10-05**. The official Virtual Embryo Challenge website and public scorer remain authoritative if anything changes after this snapshot.

- Challenge overview/timeline: https://virtualembryo.ai/challenge
- Tasks: https://virtualembryo.ai/challenge/tasks
- Evaluation/scoring: https://virtualembryo.ai/challenge/evaluation
- Rules: https://virtualembryo.ai/challenge/rules
- Reference rows: https://virtualembryo.ai/challenge/baselines
- Community resources: https://virtualembryo.ai/challenge/community
- Public scorer: https://github.com/aristoteleo/veckit

## Current phase facts reflected in these visuals

- P2 is open on 2026-10-05.
- P3 starts **2026-10-20**. Validation ground truth is released then; hidden test ground truth is never distributed.
- P3 allows **2 official submissions per board for the whole phase**. Official submissions cannot be withdrawn; format checks remain unlimited.
- Final submissions are due **2026-12-02**; official evaluation starts **2026-12-04**; winners are announced at NeurIPS on **2026-12-11**.
- Task 1: train E8.5/E9.5; validation E10.5; hidden test E12.5.
- Task 2 heart: interpolation validation E8.5; extrapolation validation E10.5; hidden extrapolation test E12.5.
- Task 2 embryo: interpolation validation E7.5; hidden interpolation test E7.75.
- Task 3: validation Gata4 KO E8.75; hidden test beta-catenin KO E8.75; matched WT reference.

## Metric contract used in cards/graphics

Task 1 weights: DE recovery 25%, change direction 25%, cell-state distribution 30%, gene-gene co-variation 20%.

Task 2 question weights: expression change 25% (DES/DCS), cell-state distribution 25% (MMD/CSS), tissue shape and growth scale 25% (SDD/ODS/TSR), local spatial organisation 25% (NFS).

Task 3 weights: response gene recovery 30%, response direction 25%, response magnitude 25%, cell-state distribution 20% (MMD/CSS split 60/40 within that group). Tissue shape is deliberately not ranked for Task 3 in the current scoring contract.
