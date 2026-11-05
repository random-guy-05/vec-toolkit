# Source notes

Official, live pages are the authority for challenge requirements. Checked 14 October 2026; re-check before use.

- [Challenge tasks](https://virtualembryo.ai/challenge/tasks): T2's embryo setting tests interpolation; T2's heart setting tests interpolation and extrapolation; expression, cell-state, shape/scale, and local spatial organization each contribute one quarter of the T2 score. T3 validation is Gata4 at E8.75; β-catenin at E8.75 is hidden test; Mab21l2 knockout at E9.5 is released training data. T3 scores perturbation response, not the matched wild-type background.
- [Challenge data](https://virtualembryo.ai/challenge/data): T2/T3 use 3D MERFISH; `obsm["spatial_3D"]` coordinates are in a per-embryo local frame, not registered across time points. Task schemas, ordered gene panels, and cell bounds are defined there.
- [Official rules](https://virtualembryo.ai/challenge/rules): external sources must be disclosed and licensed for the use; measured data from held-out stages/genotypes and specified near-stage windows are restricted. The rules page can change; check it each time.
- [Community resources](https://virtualembryo.ai/challenge/resources): filed resources are not necessarily reviewed or endorsed.

All values in the exercises are invented teaching examples, not challenge observations or official baselines.
