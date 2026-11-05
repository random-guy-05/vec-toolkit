# Accessibility text

## DES - DE gene recovery

Did the model recover the genes that truly changed? Correct identity of response/developmental genes. Direction: HIGHER IS BETTER. Mean shifts in the wrong genes, or missing the responsive set. Debug suggestion: Compare predicted vs observed gene-level change against the same reference.

## DCS - Change direction

Did genes move in the same ranked direction as reality? Genome-wide directional agreement after controlling for reference expression. Direction: HIGHER IS BETTER. Right magnitude but reversed/up-down response pattern. Debug suggestion: Plot predicted vs true change vectors; inspect sign errors among strongest shifts.

## MMD - Cell-state distribution

Is the generated population the same mixture of cell states? Right states and proportions, not one average cell. Direction: LOWER IS BETTER. Population collapse, missing rare states, wrong mixture proportions. Debug suggestion: Inspect cell-level diversity and embeddings; do not rely on pseudobulk alone.

## CSS - Gene-gene co-variation

Are gene programs co-regulated together as in the target? Correct pairwise co-expression structure across cells. Direction: LOWER IS BETTER. Correct marginals but shuffled gene relationships across cells. Debug suggestion: Check covariance/co-expression patterns, not only per-gene distributions.

## SDD - 3D shape distance

Does the predicted tissue have the right overall 3D shape? Global geometric resemblance after allowed frame invariances. Direction: LOWER IS BETTER. Collapsed, distorted or anisotropic geometry. Debug suggestion: Compare centered point-cloud scale and principal axes; visualize 3D cloud.

## ODS - Occupancy Dice

Do prediction and target occupy the same tissue volume? Overlap of occupied spatial regions. Direction: HIGHER IS BETTER. Wrong extent or holes even when gross shape looks plausible. Debug suggestion: Voxelize/inspect coverage and spatial support, not only scatter appearance.

## TSR - Tissue scale ratio

Is the predicted tissue at the right physical growth scale? Matched global size; signed log ratio is scored by absolute distance from 0. Direction: ZERO IS IDEAL. Correct-looking shape that is uniformly too large or too small. Debug suggestion: Compare centered RMS radius / pairwise distance scale before changing topology.

## NFS - Neighborhood feature similarity

Are molecular cell states arranged in the right local neighborhoods? Correct expression-location relationships locally. Direction: LOWER IS BETTER. Right global shape + right cells, but expression states scrambled across positions. Debug suggestion: Inspect local neighbor composition and expression-position coupling.

## SEVERITY - Response magnitude

Is the overall knockout response magnitude calibrated? Predicted response amplitude matching the true perturbation amplitude. Direction: ZERO IS IDEAL. Correct direction but systematically too weak or too strong. Debug suggestion: Regress predicted change against true/reference-scale change; inspect slope bias.
