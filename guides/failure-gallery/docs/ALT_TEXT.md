# Accessibility text

## Population collapse

Many generated cells become nearly identical. Likely symptom: MMD usually worsens; co-variation may also degrade. Debug next: Check duplicate/near-duplicate cells, per-gene variance, effective rank.

## Wrong cell-state mixture

States exist, but their proportions are wrong. Likely symptom: MMD is the clearest population-level warning. Debug next: Compare embeddings/composition; avoid relying on pseudobulk alone.

## Reversed gene response

The model moves responsive genes in the wrong direction. Likely symptom: DCS / de_direction falls; DES can still look partly reasonable. Debug next: Plot predicted vs observed/reference change; inspect sign agreement.

## Scrambled co-expression

Per-gene distributions look right, but genes no longer vary together. Likely symptom: CSS / variogram worsens while marginal metrics may remain decent. Debug next: Inspect covariance or co-expression structure across cells.

## Spatial line collapse

A 3D tissue collapses toward one dimension. Likely symptom: T2 shape terms degrade strongly; local organization may also suffer. Debug next: Inspect geometric rank, PCA axes, duplicate coordinates.

## Uniform scale error

The predicted tissue shape is plausible but globally too large/small. Likely symptom: TSR / scale_log_ratio moves away from zero; shape may otherwise look good. Debug next: Compare RMS radius and pairwise-distance scale before altering topology.

## Neighborhood scramble

Global geometry and cell states look right, but states are assigned to wrong locations. Likely symptom: NFS / neighborhood_mmd worsens; global shape can stay good. Debug next: Inspect local neighbors and expression-position coupling.

## Raw-count expression

A structurally valid file is on the wrong expression scale. Likely symptom: Many metrics can fail unpredictably; format validation may still pass. Debug next: Check integer fraction, value range, per-cell sums; submit log-normalized values.

## Gene-order mismatch

The right genes are stored in the wrong column order. Likely symptom: Usually a validation error, not a low biological score. Debug next: Reindex columns to the released ordered panel / transcriptome.
