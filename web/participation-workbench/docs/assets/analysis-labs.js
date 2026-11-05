(function () {
  "use strict";
  const byId = (id) => document.getElementById(id);
  const commonNote = "This is an exploratory analysis aid, not an official VEC score or biological conclusion. Use public or synthetic data, retain biological replicates, and check assumptions before interpreting results.";
  const locales = window.VEC_ANALYSIS_LOCALES || {};
  const englishUI = {
    language: "Interface language", back: "← Participation Workbench", community: "Community resources", official: "Official data page",
    analyze: "Analyze", example: "Load synthetic example", clear: "Clear inputs", scope: "Scope and interpretation",
    privacy: commonNote,
    localData: "Inputs are processed in this browser tab. The page does not upload, store, or fetch pasted data. Summarize large AnnData files locally before using these small-table tools.",
    initial: "Choose “Load synthetic example” to see the expected input shape, then replace it with a small public or synthetic data extract.",
    outputLanguage: "Interface labels and instructions are translated. Result summaries, validation messages, table column names, and category values remain in English to preserve technical identifiers and interoperability. Pasted data is processed only in your browser.",
    clearResult: "Inputs cleared. Your data is not saved by this page.", unknown: "Unknown analysis page.", note: "Note:",
    showRows: "Showing the first 200 rows; download the full table below.", download: "Download",
    communityFooter: "Check existing community resources", sourceFooter: "Source code and issue tracker"
  };
  let currentLanguage = "en", currentUI = englishUI, currentLabLocale = null, hasAnalysisResult = false;
  const labs = {
    pseudobulk: {
      title: "Pseudobulk Aggregator",
      eyebrow: "Replicate-aware data preparation",
      description: "Aggregate cell rows within biological samples before comparing conditions. Choose the sample and cell-state grouping columns explicitly; the output reports how many cells contributed to each pseudobulk row.",
      inputs: [
        { id: "data", label: "Cell-by-feature CSV", type: "textarea", rows: 8, placeholder: "sample,condition,cell_type,gene_A,gene_B\nembryo_1,control,cardiac,2,0\nembryo_1,control,cardiac,4,1\nembryo_2,treated,cardiac,1,3", example: "sample,condition,cell_type,gene_A,gene_B\nembryo_1,control,cardiac,2,0\nembryo_1,control,cardiac,4,1\nembryo_2,treated,cardiac,1,3\nembryo_2,treated,mesoderm,3,2\nembryo_3,control,mesoderm,5,1" },
        { id: "groups", label: "Group by columns (comma-separated)", type: "text", value: "sample,condition,cell_type" },
        { id: "features", label: "Feature columns (comma-separated)", type: "text", value: "gene_A,gene_B" },
        { id: "method", label: "Aggregate values", type: "select", options: [["sum", "Sum (raw counts)"], ["mean", "Mean (normalized values)"]] }
      ],
      run: (v) => {
        const rows = parseCSV(v.data);
        const groups = list(v.groups);
        const features = list(v.features);
        if (!rows.length) throw new Error("Add cell rows first.");
        if (!groups.length || !features.length) throw new Error("Name at least one grouping column and one numeric feature column.");
        requireColumns(rows, groups.concat(features));
        const buckets = new Map();
        rows.forEach((r, i) => {
          const key = groups.map((g) => String(r[g]).trim()).join("\u001f");
          if (groups.some((g) => !String(r[g]).trim())) throw new Error("Grouping values cannot be blank (row " + (i + 2) + ").");
          if (!buckets.has(key)) buckets.set(key, { values: Object.fromEntries(features.map((f) => [f, 0])), n: 0, labels: groups.map((g) => r[g]) });
          const b = buckets.get(key); b.n++;
          features.forEach((f) => { const x = numeric(r[f], f, i); b.values[f] += x; });
        });
        const method = v.method;
        const output = Array.from(buckets.values()).map((b) => {
          const o = {};
          groups.forEach((g, i) => { o[g] = b.labels[i]; });
          o.cells_aggregated = b.n;
          features.forEach((f) => { o[f] = round(method === "mean" ? b.values[f] / b.n : b.values[f]); });
          return o;
        });
        return { summary: output.length + " pseudobulk rows from " + rows.length + " cells. Each row is one biological-sample / cell-state group; cells are not treated as independent replicates.", tables: [{ title: "Aggregated values", columns: groups.concat(["cells_aggregated"], features), rows: output }], warnings: ["Use sum for raw counts and mean for already normalized values. Do not aggregate across biological samples before estimating biological variability."] };
      }
    },
    design: {
      title: "Design Confounding Auditor",
      eyebrow: "Study design",
      description: "Check whether categorical study factors can be separated in a sample manifest. A rank-deficient one-hot design means at least one factor is perfectly confounded with another; this is a design warning, not a biological diagnosis.",
      inputs: [
        { id: "data", label: "One row per biological sample (CSV)", type: "textarea", rows: 7, placeholder: "sample,condition,batch\ns1,control,b1\ns2,treated,b2", example: "sample,condition,batch,stage\ns1,control,b1,E8.5\ns2,control,b2,E8.5\ns3,treated,b1,E9.5\ns4,treated,b2,E9.5\ns5,control,b1,E8.5\ns6,treated,b2,E9.5" },
        { id: "factors", label: "Categorical design factors (comma-separated)", type: "text", value: "condition,batch,stage" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data), factors = list(v.factors);
        if (!rows.length) throw new Error("Add one row per biological sample.");
        if (!factors.length) throw new Error("Name at least one categorical design factor.");
        requireColumns(rows, factors);
        const usable = rows.filter((r) => factors.every((f) => String(r[f]).trim()));
        if (usable.length < 2) throw new Error("At least two complete sample rows are required.");
        const levels = Object.fromEntries(factors.map((f) => [f, Array.from(new Set(usable.map((r) => String(r[f]))).values()).sort()]));
        const cols = ["intercept"];
        factors.forEach((f) => levels[f].slice(1).forEach((l) => cols.push(f + "=" + l)));
        const matrix = usable.map((r) => {
          const a = [1];
          factors.forEach((f) => levels[f].slice(1).forEach((l) => a.push(String(r[f]) === l ? 1 : 0)));
          return a;
        });
        const rank = matrixRank(matrix);
        const levelRows = factors.map((f) => ({ factor: f, levels: levels[f].length, categories: levels[f].join(" | ") }));
        const pairRows = [];
        for (let i = 0; i < factors.length; i++) for (let j = i + 1; j < factors.length; j++) {
          const a = factors[i], b = factors[j], pairs = new Set(usable.map((r) => String(r[a]) + "\u001f" + String(r[b]))).size;
          const aToB = levels[a].every((la) => new Set(usable.filter((r) => String(r[a]) === la).map((r) => String(r[b]))).size === 1);
          const bToA = levels[b].every((lb) => new Set(usable.filter((r) => String(r[b]) === lb).map((r) => String(r[a]))).size === 1);
          pairRows.push({ factor_a: a, factor_b: b, observed_combinations: pairs, complete_crossing: pairs === levels[a].length * levels[b].length, one_to_one_confounding: aToB && bToA });
        }
        const deficient = rank < cols.length;
        return { summary: "Complete samples: " + usable.length + ". One-hot design rank " + rank + " of " + cols.length + " columns. " + (deficient ? "The selected factors are not jointly identifiable in this manifest." : "No exact linear alias was found among the selected factors."), tables: [{ title: "Factor levels", columns: ["factor", "levels", "categories"], rows: levelRows }, { title: "Factor-pair support", columns: ["factor_a", "factor_b", "observed_combinations", "complete_crossing", "one_to_one_confounding"], rows: pairRows }], warnings: deficient ? ["Perfectly aliased factors cannot be disentangled by adding more cells to the same samples. This check models categorical main effects only; inspect interactions and continuous covariates separately."] : ["Full column rank does not guarantee adequate power, balance, or absence of other confounding."] };
      }
    },
    rarestate: {
      title: "Rare-State Sampling Planner",
      eyebrow: "Replicate-aware design",
      description: "Estimate how often a cell state at a chosen prevalence would be observed at least a target number of times. See per-embryo and all-replicates probabilities rather than treating pooled cells as biological replicates.",
      inputs: [
        { id: "prevalence", label: "Expected state prevalence (%)", type: "number", value: "1", min: "0.001", max: "100", step: "any" },
        { id: "cells", label: "Cells sampled per embryo", type: "number", value: "500", min: "1", max: "10000000", step: "1" },
        { id: "replicates", label: "Independent embryos / samples", type: "number", value: "3", min: "1", max: "1000", step: "1" },
        { id: "minimum", label: "Minimum state cells per embryo", type: "number", value: "5", min: "1", max: "1000", step: "1" }
      ],
      run: (v) => {
        const p = Number(v.prevalence) / 100, n = Math.floor(Number(v.cells)), r = Math.floor(Number(v.replicates)), k = Math.floor(Number(v.minimum));
        if (!(p > 0 && p <= 1) || n < 1 || r < 1 || k < 1 || ![p, n, r, k].every(Number.isFinite)) throw new Error("Enter a prevalence from 0.001% to 100%, positive sample size, replicate count, and target cell count.");
        const per = binomialAtLeast(n, p, k);
        const all = Math.pow(per, r);
        const any = 1 - Math.pow(1 - per, r);
        return { summary: "Expected state cells per embryo: " + round(n * p) + ". Probability of at least " + k + " state cells in a given embryo: " + pct(per) + ". Probability this threshold is met in every one of " + r + " independent embryos: " + pct(all) + ".", tables: [{ title: "Sampling probabilities", columns: ["quantity", "probability"], rows: [{ quantity: "At least target count in one embryo", probability: pct(per) }, { quantity: "At least target count in every embryo", probability: pct(all) }, { quantity: "At least one embryo reaches target count", probability: pct(any) }] }], warnings: ["This binomial calculation assumes independent cell sampling and a fixed prevalence. Cell capture, annotation, and biological variability can lower the effective probability; it is not a power calculation."] };
      }
    },
    composition: {
      title: "Cell Composition Distance Explorer",
      eyebrow: "Population comparison",
      description: "Turn per-sample cell-type counts into compositions and compare every sample pair with Bray–Curtis dissimilarity and Jensen–Shannon distance. This quantifies how populations differ without pretending that cell counts are biological replicates.",
      inputs: [
        { id: "data", label: "Long-format cell counts (CSV)", type: "textarea", rows: 7, placeholder: "sample,group,cell_type,count\ns1,control,cardiac,70\ns1,control,mesoderm,30", example: "sample,group,cell_type,count\ns1,control,cardiac,70\ns1,control,mesoderm,30\ns2,control,cardiac,60\ns2,control,mesoderm,40\ns3,treated,cardiac,30\ns3,treated,mesoderm,70\ns4,treated,cardiac,40\ns4,treated,mesoderm,60" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["sample", "group", "cell_type", "count"]);
        const samples = new Map(), types = new Set();
        rows.forEach((r, i) => {
          const count = numeric(r.count, "count", i); if (count < 0) throw new Error("Counts cannot be negative.");
          if (!samples.has(r.sample)) samples.set(r.sample, { group: r.group, counts: {} });
          const s = samples.get(r.sample); if (s.group !== r.group) throw new Error("Sample " + r.sample + " has more than one group.");
          s.counts[r.cell_type] = (s.counts[r.cell_type] || 0) + count; types.add(r.cell_type);
        });
        const names = Array.from(samples.keys());
        if (names.length < 2) throw new Error("At least two distinct samples are required.");
        const pairs = [];
        for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
          const a = samples.get(names[i]), b = samples.get(names[j]);
          const va = Array.from(types, (t) => a.counts[t] || 0), vb = Array.from(types, (t) => b.counts[t] || 0);
          const sa = va.reduce((x, y) => x + y, 0), sb = vb.reduce((x, y) => x + y, 0);
          if (!sa || !sb) continue;
          const pa = va.map((x) => x / sa), pb = vb.map((x) => x / sb);
          const bc = va.reduce((s, x, k) => s + Math.abs(pa[k] - pb[k]), 0) / 2;
          const js = Math.sqrt(jsDivergence(pa, pb));
          pairs.push({ sample_a: names[i], group_a: a.group, sample_b: names[j], group_b: b.group, relation: a.group === b.group ? "within-group" : "between-group", bray_curtis: round(bc), jensen_shannon_distance: round(js) });
        }
        return { summary: "Compared " + pairs.length + " sample pairs across " + types.size + " cell types. Both distances are 0 for identical proportions; values near 1 indicate strongly different compositions.", tables: [{ title: "Pairwise distances", columns: ["sample_a", "group_a", "sample_b", "group_b", "relation", "bray_curtis", "jensen_shannon_distance"], rows: pairs }], warnings: ["Use the biological sample as the replicate. Pairwise distances are descriptive and do not provide a significance test."] };
      }
    },
    decompose: {
      title: "Composition–Expression Decomposer",
      eyebrow: "Biological interpretation",
      description: "Separate a two-condition change in overall mean expression into a cell-composition component and a within-cell-type expression component using a symmetric Shapley decomposition.",
      inputs: [
        { id: "data", label: "Per-cell-type means and proportions (CSV)", type: "textarea", rows: 7, placeholder: "cell_type,proportion_A,proportion_B,mean_A,mean_B", example: "cell_type,proportion_A,proportion_B,mean_A,mean_B\ncardiac,0.7,0.4,2.0,3.0\nmesoderm,0.3,0.6,1.0,1.5" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["cell_type", "proportion_A", "proportion_B", "mean_A", "mean_B"]);
        if (!rows.length) throw new Error("Add one row per cell type.");
        const vals = rows.map((r, i) => ({ type: r.cell_type, p0: numeric(r.proportion_A, "proportion_A", i), p1: numeric(r.proportion_B, "proportion_B", i), m0: numeric(r.mean_A, "mean_A", i), m1: numeric(r.mean_B, "mean_B", i) }));
        if (vals.some((x) => x.p0 < 0 || x.p1 < 0)) throw new Error("Proportions cannot be negative.");
        const s0 = vals.reduce((s, x) => s + x.p0, 0), s1 = vals.reduce((s, x) => s + x.p1, 0);
        if (!s0 || !s1) throw new Error("Each condition needs positive total cell-type proportion.");
        const norm = vals.map((x) => ({ ...x, p0: x.p0 / s0, p1: x.p1 / s1 }));
        const output = norm.map((x) => ({ cell_type: x.type, composition_effect: round((x.p1 - x.p0) * (x.m0 + x.m1) / 2), within_type_effect: round((x.m1 - x.m0) * (x.p0 + x.p1) / 2) }));
        const total0 = norm.reduce((s, x) => s + x.p0 * x.m0, 0), total1 = norm.reduce((s, x) => s + x.p1 * x.m1, 0);
        const comp = output.reduce((s, x) => s + x.composition_effect, 0), within = output.reduce((s, x) => s + x.within_type_effect, 0);
        output.push({ cell_type: "TOTAL", composition_effect: round(comp), within_type_effect: round(within) });
        return { summary: "Overall mean changed by " + round(total1 - total0) + " (A: " + round(total0) + "; B: " + round(total1) + "). Symmetric decomposition attributes " + round(comp) + " to composition and " + round(within) + " to within-type expression.", tables: [{ title: "Contribution by cell type", columns: ["cell_type", "composition_effect", "within_type_effect"], rows: output }], warnings: (Math.abs(s0 - 1) > 0.02 || Math.abs(s1 - 1) > 0.02) ? ["Input proportions were renormalized within each condition because they did not sum to 1. Use matched definitions of cell types and expression scale across conditions."] : ["This decomposition is descriptive; it does not establish causality and is sensitive to unmeasured cell states and annotation choices."] };
      }
    },
    coverage: {
      title: "Gene Signature Coverage Auditor",
      eyebrow: "Feature coverage",
      description: "Check how much of a candidate marker or gene signature is represented in a target panel. Identifiers are matched case-insensitively after trimming; aliases are never guessed.",
      inputs: [
        { id: "signature", label: "Candidate signature (one gene ID per line)", type: "textarea", rows: 7, placeholder: "GeneA\nGeneB\nGeneC", example: "GeneA\nGeneB\nGeneC\nGeneD\nGeneB" },
        { id: "panel", label: "Available panel (one gene ID per line)", type: "textarea", rows: 7, placeholder: "GeneA\nGeneC", example: "GeneA\nGeneC\nGeneE" }
      ],
      run: (v) => {
        const sig = list(v.signature), panel = list(v.panel);
        if (!sig.length || !panel.length) throw new Error("Enter a non-empty signature and panel.");
        const p = new Set(panel.map((x) => x.toLowerCase())), found = sig.filter((x) => p.has(x.toLowerCase())), missing = sig.filter((x) => !p.has(x.toLowerCase()));
        const duplicates = duplicateValues(sig.map((x) => x.toLowerCase()));
        return { summary: found.length + " of " + sig.length + " signature entries are present (" + pct(found.length / sig.length) + "). Missing identifiers stay explicit; no symbol mapping is inferred.", tables: [{ title: "Coverage detail", columns: ["status", "gene_id"], rows: found.map((x) => ({ status: "present", gene_id: x })).concat(missing.map((x) => ({ status: "missing", gene_id: x }))).concat(duplicates.map((x) => ({ status: "duplicate in signature", gene_id: x }))) }], warnings: ["Gene symbols can have aliases and species-specific orthologs. Resolve those with a sourced mapping before interpreting coverage."] };
      }
    },
    enrichment: {
      title: "Gene Set Enrichment Calculator",
      eyebrow: "Gene-list interpretation",
      description: "Calculate one-sided hypergeometric over-representation for user-supplied gene sets against an explicit universe, then apply Benjamini–Hochberg correction across the tested sets.",
      inputs: [
        { id: "selected", label: "Selected genes (one ID per line)", type: "textarea", rows: 5, placeholder: "GeneA\nGeneB\nGeneC", example: "GeneA\nGeneB\nGeneC" },
        { id: "universe", label: "Tested universe (one ID per line)", type: "textarea", rows: 5, placeholder: "List every gene eligible for selection.", example: "GeneA\nGeneB\nGeneC\nGeneD\nGeneE\nGeneF\nGeneG\nGeneH" },
        { id: "sets", label: "Gene-set membership CSV", type: "textarea", rows: 6, placeholder: "set,gene\nset_1,GeneA", example: "set,gene\nheart,GeneA\nheart,GeneB\nheart,GeneD\nmesoderm,GeneC\nmesoderm,GeneE\nmesoderm,GeneF" }
      ],
      run: (v) => {
        const selected = new Set(list(v.selected).map((x) => x.toLowerCase())), universeList = list(v.universe).map((x) => x.toLowerCase());
        if (!selected.size || !universeList.length) throw new Error("Provide selected genes and the full tested universe.");
        const universe = new Set(universeList), chosen = new Set(Array.from(selected).filter((x) => universe.has(x))), m = chosen.size, N = universe.size;
        if (!m || !N) throw new Error("No selected genes overlap the explicit universe.");
        const rows = parseCSV(v.sets); requireColumns(rows, ["set", "gene"]);
        const sets = new Map();
        rows.forEach((r) => { if (!sets.has(r.set)) sets.set(r.set, new Set()); const g = String(r.gene).toLowerCase(); if (universe.has(g)) sets.get(r.set).add(g); });
        const raw = Array.from(sets, ([name, genes]) => {
          const overlap = Array.from(genes).filter((g) => chosen.has(g)).length;
          return { gene_set: name, overlap: overlap, set_size_in_universe: genes.size, selected_size: m, universe_size: N, p_value: round(hypergeomTail(N, genes.size, m, overlap)) };
        }).sort((a, b) => a.p_value - b.p_value);
        let min = 1;
        for (let i = raw.length - 1; i >= 0; i--) { min = Math.min(min, raw[i].p_value * raw.length / (i + 1)); raw[i].fdr_bh = round(Math.min(1, min)); }
        return { summary: "Tested " + raw.length + " sets using " + m + " selected genes within a universe of " + N + ". Results are over-representation p-values, not pathway activity or causal evidence.", tables: [{ title: "Enrichment", columns: ["gene_set", "overlap", "set_size_in_universe", "selected_size", "universe_size", "p_value", "fdr_bh"], rows: raw }], warnings: ["Choose the universe from the assay and the selection procedure. Gene sets and selected genes must use the same identifier system; annotations are not fetched or mapped."] };
      }
    },
    contrast: {
      title: "Replicate-Aware Contrast Reporter",
      eyebrow: "Effect-size summary",
      description: "Summarize gene-level differences between two conditions from sample-level pseudobulk values. If each sample appears in both conditions, the tool reports paired direction agreement; it does not treat cells as replicates or run significance tests.",
      inputs: [
        { id: "data", label: "Long-format sample-level values (CSV)", type: "textarea", rows: 7, placeholder: "sample,condition,gene,value\nembryo1,WT,GeneA,1.2\nembryo1,KO,GeneA,1.8", example: "sample,condition,gene,value\nembryo1,WT,GeneA,1.0\nembryo1,KO,GeneA,1.7\nembryo2,WT,GeneA,1.3\nembryo2,KO,GeneA,1.8\nembryo1,WT,GeneB,2.0\nembryo1,KO,GeneB,1.4\nembryo2,WT,GeneB,1.8\nembryo2,KO,GeneB,1.5" },
        { id: "a", label: "Condition A", type: "text", value: "WT" },
        { id: "b", label: "Condition B", type: "text", value: "KO" },
        { id: "pseudo", label: "Pseudocount for log2 fold change", type: "number", value: "0.01", min: "0", step: "any" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["sample", "condition", "gene", "value"]);
        const aName = v.a.trim(), bName = v.b.trim(), pc = Number(v.pseudo);
        if (!aName || !bName || aName === bName || pc < 0 || !Number.isFinite(pc)) throw new Error("Enter two distinct condition labels and a non-negative pseudocount.");
        const by = new Map();
        rows.forEach((r, i) => {
          if (!by.has(r.gene)) by.set(r.gene, { a: new Map(), b: new Map() });
          const key = r.condition === aName ? "a" : (r.condition === bName ? "b" : null); if (!key) return;
          const m = by.get(r.gene)[key], value = numeric(r.value, "value", i);
          if (!m.has(r.sample)) m.set(r.sample, []); m.get(r.sample).push(value);
        });
        const out = [];
        by.forEach((d, gene) => {
          const A = Array.from(d.a, ([s, xs]) => [s, mean(xs)]), B = Array.from(d.b, ([s, xs]) => [s, mean(xs)]);
          if (!A.length || !B.length) return;
          const ma = mean(A.map((x) => x[1])), mb = mean(B.map((x) => x[1]));
          const paired = A.filter(([s]) => d.b.has(s)).map(([s, x]) => x - mean(d.b.get(s)));
          const effects = paired.length ? paired : [mb - ma];
          const sign = effects.filter((x) => x > 0).length;
          out.push({ gene: gene, n_A: A.length, n_B: B.length, n_pairs: paired.length, mean_A: round(ma), mean_B: round(mb), difference_B_minus_A: round(mb - ma), log2_fold_change: ma + pc > 0 && mb + pc > 0 ? round(Math.log2((mb + pc) / (ma + pc))) : "NA", paired_direction_agreement: paired.length ? round(Math.max(sign, paired.length - sign) / paired.length) : "not paired" });
        });
        if (!out.length) throw new Error("No gene has values in both requested conditions.");
        return { summary: "Reported " + out.length + " genes. Direction agreement is calculated only where sample IDs pair across conditions; no p-values or causal claims are produced.", tables: [{ title: "Condition contrast", columns: ["gene", "n_A", "n_B", "n_pairs", "mean_A", "mean_B", "difference_B_minus_A", "log2_fold_change", "paired_direction_agreement"], rows: out }], warnings: ["Use normalized values on a consistent scale and independent biological samples. The pseudocount affects log2 fold changes; paired samples must truly represent matched units."] };
      }
    },
    cellqc: {
      title: "Single-Cell QC Threshold Explorer",
      eyebrow: "Cell-level data review",
      description: "Apply transparent thresholds to a small per-cell QC table and show exactly which rule excludes each cell. Use the output to inspect how sensitive cell retention is to threshold choices.",
      inputs: [
        { id: "data", label: "Per-cell QC metrics (CSV)", type: "textarea", rows: 7, placeholder: "cell_id,n_counts,n_genes,mito_pct", example: "cell_id,n_counts,n_genes,mito_pct\nc1,2500,900,4.2\nc2,800,240,17.0\nc3,5000,1500,7.1\nc4,1100,380,3.5" },
        { id: "min_counts", label: "Minimum counts", type: "number", value: "1000", min: "0", step: "1" },
        { id: "min_genes", label: "Minimum detected genes", type: "number", value: "300", min: "0", step: "1" },
        { id: "max_mito", label: "Maximum mitochondrial percentage", type: "number", value: "10", min: "0", max: "100", step: "any" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["cell_id", "n_counts", "n_genes", "mito_pct"]);
        const mc = Number(v.min_counts), mg = Number(v.min_genes), mm = Number(v.max_mito);
        if (![mc, mg, mm].every(Number.isFinite) || mc < 0 || mg < 0 || mm < 0 || mm > 100) throw new Error("Enter non-negative count/gene cutoffs and a mitochondrial cutoff from 0 to 100.");
        const out = rows.map((r, i) => {
          const counts = numeric(r.n_counts, "n_counts", i), genes = numeric(r.n_genes, "n_genes", i), mito = numeric(r.mito_pct, "mito_pct", i);
          const reasons = []; if (counts < mc) reasons.push("low counts"); if (genes < mg) reasons.push("few genes"); if (mito > mm) reasons.push("high mitochondrial fraction");
          return { cell_id: r.cell_id, n_counts: counts, n_genes: genes, mito_pct: mito, keep: !reasons.length, exclusion_reasons: reasons.join("; ") || "" };
        });
        const kept = out.filter((x) => x.keep).length;
        return { summary: kept + " of " + out.length + " cells pass all three selected rules (" + pct(kept / out.length) + ").", tables: [{ title: "Per-cell decisions", columns: ["cell_id", "n_counts", "n_genes", "mito_pct", "keep", "exclusion_reasons"], rows: out }], warnings: ["Thresholds are data- and protocol-specific. This tool applies your cutoffs; it does not select biologically valid thresholds for you."] };
      }
    },
    module: {
      title: "Per-Cell Signature Scorer",
      eyebrow: "Exploratory feature scoring",
      description: "Calculate a simple per-cell mean z-score for a supplied gene signature from a small, already normalized cell-by-gene matrix. The gene-wise z-scores are computed within the pasted cells, so this is for exploration rather than cross-dataset comparison.",
      inputs: [
        { id: "data", label: "Normalized cell-by-gene CSV", type: "textarea", rows: 7, placeholder: "cell_id,group,GeneA,GeneB,GeneC", example: "cell_id,group,GeneA,GeneB,GeneC\nc1,cardiac,1.2,0.4,0.0\nc2,cardiac,1.8,0.8,0.1\nc3,mesoderm,0.1,1.1,1.4\nc4,mesoderm,0.3,0.7,1.8" },
        { id: "genes", label: "Signature genes (one per line)", type: "textarea", rows: 4, placeholder: "GeneA\nGeneB", example: "GeneA\nGeneB" },
        { id: "group", label: "Optional group column", type: "text", value: "group" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data), genes = list(v.genes);
        if (rows.length < 2 || !genes.length) throw new Error("Provide at least two cells and one signature gene.");
        const excluded = ["cell_id", v.group.trim()].filter(Boolean);
        const features = genes.filter((g) => rows[0] && Object.prototype.hasOwnProperty.call(rows[0], g));
        if (!features.length) throw new Error("None of the signature identifiers are exact columns in the matrix.");
        features.forEach((g) => rows.forEach((r, i) => numeric(r[g], g, i)));
        const means = Object.fromEntries(features.map((g) => [g, mean(rows.map((r) => Number(r[g])))]));
        const sd = Object.fromEntries(features.map((g) => [g, stdev(rows.map((r) => Number(r[g])))]));
        const out = rows.map((r, i) => {
          const scores = features.filter((g) => sd[g] > 0).map((g) => (Number(r[g]) - means[g]) / sd[g]);
          return { cell_id: r.cell_id || String(i + 1), group: excluded.includes(v.group.trim()) ? (r[v.group.trim()] || "") : "", genes_scored: scores.length, mean_z_score: scores.length ? round(mean(scores)) : "constant genes" };
        });
        return { summary: "Scored " + out.length + " cells using " + features.length + " signature genes. Constant genes are omitted because their within-matrix z-score is undefined.", tables: [{ title: "Cell scores", columns: ["cell_id", "group", "genes_scored", "mean_z_score"], rows: out }], warnings: ["Input values should already be on a comparable normalized scale. Z-scores are relative to this pasted matrix and must not be interpreted as calibrated pathway activity."] };
      }
    },
    trend: {
      title: "Stage Trend & Forecast Explorer",
      eyebrow: "Temporal modeling",
      description: "Fit descriptive linear and quadratic trends to replicate-level measurements across numeric stages, compare them with leave-one-stage-out error, and project to a user-selected stage.",
      inputs: [
        { id: "data", label: "Replicate-level measurements (CSV)", type: "textarea", rows: 7, placeholder: "stage,replicate,value", example: "stage,replicate,value\n6.75,a,1.1\n6.75,b,1.0\n7.25,a,1.5\n7.25,b,1.4\n8.0,a,2.1\n8.0,b,2.0\n8.75,a,2.5\n8.75,b,2.4" },
        { id: "target", label: "Target stage to project", type: "number", value: "9.5", step: "any" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["stage", "value"]);
        const target = Number(v.target); if (!Number.isFinite(target)) throw new Error("Enter a numeric target stage.");
        const by = new Map();
        rows.forEach((r, i) => { const x = numeric(r.stage, "stage", i), y = numeric(r.value, "value", i); if (!by.has(x)) by.set(x, []); by.get(x).push(y); });
        const points = Array.from(by, ([x, ys]) => ({ x: x, y: mean(ys), reps: ys.length })).sort((a, b) => a.x - b.x);
        if (points.length < 2) throw new Error("At least two distinct stages are needed.");
        const models = ["linear", "quadratic"].filter((m) => m === "linear" || points.length >= 3).map((kind) => {
          const predict = (train, x) => kind === "linear" ? fitLinear(train, x) : fitQuadratic(train, x);
          const loo = points.map((p, i) => { const train = points.filter((_, j) => j !== i); return train.length >= (kind === "linear" ? 2 : 3) ? Math.pow(p.y - predict(train, p.x), 2) : null; }).filter((x) => x !== null);
          const residual = points.map((p) => Math.pow(p.y - predict(points, p.x), 2));
          return { model: kind, projection: round(predict(points, target)), training_rmse: round(Math.sqrt(mean(residual))), leave_one_stage_out_rmse: loo.length ? round(Math.sqrt(mean(loo))) : "not available" };
        });
        const outside = target < points[0].x || target > points[points.length - 1].x;
        return { summary: "Fitted " + points.length + " stage means from " + rows.length + " observations. Target " + target + " is " + (outside ? "outside" : "within") + " the observed stage range.", tables: [{ title: "Trend comparison", columns: ["model", "projection", "training_rmse", "leave_one_stage_out_rmse"], rows: models }, { title: "Observed stage means", columns: ["stage", "replicates", "mean_value"], rows: points.map((p) => ({ stage: p.x, replicates: p.reps, mean_value: round(p.y) })) }], warnings: ["A quadratic curve can extrapolate sharply. Leave-one-stage-out error uses very small training sets and is not an independent validation estimate. Do not select a model using held-out Challenge targets."] };
      }
    },
    transition: {
      title: "Cell-Label Transition Explorer",
      eyebrow: "Annotation review",
      description: "Turn an observed source-to-target label table into a count and row-normalized transition matrix. This helps inspect label refinement, splitting, merging, and ambiguous mappings without silently choosing a mapping for you.",
      inputs: [
        { id: "data", label: "Source/target label counts (CSV)", type: "textarea", rows: 7, placeholder: "source_label,target_label,count", example: "source_label,target_label,count\nprogenitor,progenitor,40\nprogenitor,cardiac,30\nprogenitor,vascular,10\ncardiac,cardiac,50\ncardiac,vascular,2" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["source_label", "target_label", "count"]);
        const agg = new Map(), sourceTotals = new Map(), targetTotals = new Map();
        rows.forEach((r, i) => { const n = numeric(r.count, "count", i); if (n < 0) throw new Error("Counts cannot be negative."); const key = r.source_label + "\u001f" + r.target_label; agg.set(key, (agg.get(key) || 0) + n); sourceTotals.set(r.source_label, (sourceTotals.get(r.source_label) || 0) + n); targetTotals.set(r.target_label, (targetTotals.get(r.target_label) || 0) + n); });
        const out = Array.from(agg, ([k, count]) => { const [a, b] = k.split("\u001f"); return { source_label: a, target_label: b, count: count, source_row_fraction: round(count / sourceTotals.get(a)), target_column_fraction: round(count / targetTotals.get(b)) }; });
        return { summary: "Mapped " + out.length + " observed source/target pairs across " + sourceTotals.size + " source labels and " + targetTotals.size + " target labels. Row fractions sum to 1 within each source label.", tables: [{ title: "Transition table", columns: ["source_label", "target_label", "count", "source_row_fraction", "target_column_fraction"], rows: out }], warnings: ["A transition table describes the supplied mapping or observations; it does not establish lineage or prove that labels are biologically equivalent."] };
      }
    },
    detection: {
      title: "Gene Detection Rate Analyzer",
      eyebrow: "Expression sparsity",
      description: "For each requested group and gene, report the fraction of cells with value above zero and the mean among detected cells. This separates prevalence of detection from the magnitude of positive values.",
      inputs: [
        { id: "data", label: "Cell-by-gene matrix CSV", type: "textarea", rows: 7, placeholder: "cell_id,group,GeneA,GeneB", example: "cell_id,group,GeneA,GeneB\nc1,control,0,1.2\nc2,control,2.0,0\nc3,treated,1.1,0\nc4,treated,0.9,3.0" },
        { id: "group", label: "Group column", type: "text", value: "group" },
        { id: "genes", label: "Gene columns to analyze (comma-separated)", type: "text", value: "GeneA,GeneB" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data), genes = list(v.genes), group = v.group.trim();
        if (!rows.length || !group || !genes.length) throw new Error("Provide a matrix, a group column, and gene columns.");
        requireColumns(rows, [group].concat(genes));
        const grouped = new Map(); rows.forEach((r) => { if (!grouped.has(r[group])) grouped.set(r[group], []); grouped.get(r[group]).push(r); });
        const out = [];
        grouped.forEach((rs, g) => genes.forEach((gene) => { const xs = rs.map((r, i) => numeric(r[gene], gene, i)), detected = xs.filter((x) => x > 0); out.push({ group: g, gene: gene, cells: xs.length, detected_cells: detected.length, detection_fraction: round(detected.length / xs.length), mean_detected_value: detected.length ? round(mean(detected)) : "none" }); }));
        return { summary: "Summarized " + genes.length + " genes across " + grouped.size + " groups and " + rows.length + " cells.", tables: [{ title: "Detection prevalence", columns: ["group", "gene", "cells", "detected_cells", "detection_fraction", "mean_detected_value"], rows: out }], warnings: ["The zero threshold should reflect the matrix scale and assay. Detection fractions are descriptive and can reflect depth, normalization, and dropout."] };
      }
    },
    replicate: {
      title: "Replicate Concordance Reporter",
      eyebrow: "Reproducibility",
      description: "Compare sample-level gene profiles within each condition using Pearson and Spearman correlation over shared genes. The output exposes low-coverage pairs and is a descriptive check, not a reason to discard a replicate.",
      inputs: [
        { id: "data", label: "Sample-by-gene values in long format (CSV)", type: "textarea", rows: 7, placeholder: "sample,condition,gene,value", example: "sample,condition,gene,value\ns1,control,GeneA,1.0\ns1,control,GeneB,2.0\ns1,control,GeneC,3.0\ns2,control,GeneA,1.1\ns2,control,GeneB,1.9\ns2,control,GeneC,2.8\ns3,control,GeneA,3.0\ns3,control,GeneB,1.0\ns3,control,GeneC,2.0" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["sample", "condition", "gene", "value"]);
        const samples = new Map();
        rows.forEach((r, i) => { const key = r.condition + "\u001f" + r.sample; if (!samples.has(key)) samples.set(key, { condition: r.condition, sample: r.sample, genes: new Map() }); const x = samples.get(key); if (x.genes.has(r.gene)) throw new Error("Duplicate value for " + r.sample + " / " + r.gene + ". Aggregate technical rows first."); x.genes.set(r.gene, numeric(r.value, "value", i)); });
        const vals = Array.from(samples.values()), out = [];
        for (let i = 0; i < vals.length; i++) for (let j = i + 1; j < vals.length; j++) if (vals[i].condition === vals[j].condition) {
          const common = Array.from(vals[i].genes.keys()).filter((g) => vals[j].genes.has(g));
          const a = common.map((g) => vals[i].genes.get(g)), b = common.map((g) => vals[j].genes.get(g));
          out.push({ condition: vals[i].condition, sample_a: vals[i].sample, sample_b: vals[j].sample, shared_genes: common.length, pearson_r: common.length >= 2 ? round(pearson(a, b)) : "NA", spearman_r: common.length >= 3 ? round(pearson(ranks(a), ranks(b))) : "NA" });
        }
        if (!out.length) throw new Error("At least two sample profiles within one condition are required.");
        return { summary: "Calculated " + out.length + " within-condition sample pairs. Shared-gene count is reported because pairwise correlations are not comparable when feature coverage differs.", tables: [{ title: "Replicate correlations", columns: ["condition", "sample_a", "sample_b", "shared_genes", "pearson_r", "spearman_r"], rows: out }], warnings: ["Replicate correlation is sensitive to mean expression, feature filtering, and normalization. Do not use it alone to remove an unusual biological sample."] };
      }
    },
    alignment: {
      title: "3D Coordinate Alignment Explorer",
      eyebrow: "Spatial analysis",
      description: "Center a 3D point cloud and rotate it onto its principal axes with an eigendecomposition of the covariance matrix. The exported coordinates are a visualization aid; PCA axis signs are arbitrary and the transform does not register two embryos to a shared atlas.",
      inputs: [
        { id: "data", label: "Point cloud (CSV)", type: "textarea", rows: 7, placeholder: "cell_id,x,y,z", example: "cell_id,x,y,z\np1,1,0,0\np2,-1,0,0\np3,0,2,0\np4,0,-2,0\np5,0,0,0.5\np6,0,0,-0.5" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["x", "y", "z"]);
        if (rows.length < 3 || rows.length > 5000) throw new Error("Provide 3 to 5,000 points for this browser calculation.");
        const pts = rows.map((r, i) => [numeric(r.x, "x", i), numeric(r.y, "y", i), numeric(r.z, "z", i)]);
        const mu = [0, 1, 2].map((j) => mean(pts.map((p) => p[j])));
        const centered = pts.map((p) => p.map((x, j) => x - mu[j]));
        const cov = covariance3(centered), eig = jacobiEigen3(cov);
        const order = [0, 1, 2].sort((a, b) => eig.values[b] - eig.values[a]);
        let vecs = order.map((i) => eig.vectors[i].slice());
        vecs = vecs.map((vec) => { const k = vec.reduce((best, x, i) => Math.abs(x) > Math.abs(vec[best]) ? i : best, 0); return vec[k] < 0 ? vec.map((x) => -x) : vec; });
        if (det3(vecs) < 0) vecs[2] = vecs[2].map((x) => -x);
        const out = centered.map((p, i) => ({ id: rows[i].cell_id || String(i + 1), x_pca: round(dot(p, vecs[0])), y_pca: round(dot(p, vecs[1])), z_pca: round(dot(p, vecs[2])) }));
        const variance = eig.values[order[0]] + eig.values[order[1]] + eig.values[order[2]];
        return { summary: "Centered " + pts.length + " points and rotated them onto descending principal axes. Variance fractions: " + eig.values[order].map((x) => pct(x / variance)).join(", ") + ".", tables: [{ title: "Aligned coordinates", columns: ["id", "x_pca", "y_pca", "z_pca"], rows: out }], warnings: ["PCA axes can flip sign or swap when eigenvalues are tied. Coordinate units and biological meaning are preserved only up to the supplied transform; do not treat this as anatomical registration."] };
      }
    },
    neighborhood: {
      title: "Spatial Neighborhood Radius Explorer",
      eyebrow: "Spatial analysis",
      description: "Count nearby points at a selected radius and report nearest-neighbor distances for each cell. This helps make neighborhood definitions explicit before comparing spatial patterns.",
      inputs: [
        { id: "data", label: "Point coordinates (CSV)", type: "textarea", rows: 7, placeholder: "cell_id,x,y,z", example: "cell_id,x,y,z\np1,0,0,0\np2,1,0,0\np3,0,2,0\np4,5,5,5" },
        { id: "radius", label: "Neighborhood radius (same units as coordinates)", type: "number", value: "1.5", min: "0", step: "any" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["x", "y", "z"]);
        if (rows.length < 2 || rows.length > 3000) throw new Error("Provide 2 to 3,000 points for the pairwise calculation.");
        const radius = Number(v.radius); if (!(radius > 0)) throw new Error("Radius must be positive.");
        const pts = rows.map((r, i) => [numeric(r.x, "x", i), numeric(r.y, "y", i), numeric(r.z, "z", i)]);
        const out = pts.map((p, i) => {
          let n = 0, nearest = Infinity;
          pts.forEach((q, j) => { if (i === j) return; const d = Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); if (d <= radius) n++; if (d < nearest) nearest = d; });
          return { id: rows[i].cell_id || String(i + 1), neighbors_within_radius: n, nearest_neighbor_distance: round(nearest) };
        });
        return { summary: "Mean neighbors within radius " + radius + ": " + round(mean(out.map((x) => x.neighbors_within_radius))) + "; cells with no neighbor inside the radius: " + out.filter((x) => !x.neighbors_within_radius).length + ".", tables: [{ title: "Per-point neighborhoods", columns: ["id", "neighbors_within_radius", "nearest_neighbor_distance"], rows: out }], warnings: ["The calculation uses Euclidean distance in the coordinates exactly as supplied. Confirm units, coordinate transforms, and cell sampling density before comparing runs."] };
      }
    },
    occupancy: {
      title: "Spatial Occupancy Grid Comparator",
      eyebrow: "Spatial distribution",
      description: "Compare two 3D point clouds in the same coordinate frame using occupied-voxel Jaccard and Dice scores at several grid resolutions. Multi-resolution results show how a similarity changes with bin size.",
      inputs: [
        { id: "a", label: "Point cloud A (CSV)", type: "textarea", rows: 5, placeholder: "id,x,y,z", example: "id,x,y,z\na1,0,0,0\na2,1,0,0\na3,0,1,0\na4,0,0,1" },
        { id: "b", label: "Point cloud B (CSV)", type: "textarea", rows: 5, placeholder: "id,x,y,z", example: "id,x,y,z\nb1,0.1,0,0\nb2,1.1,0,0\nb3,0,1.1,0\nb4,0,0,1.1" }
      ],
      run: (v) => {
        const a = parseCSV(v.a), b = parseCSV(v.b); requireColumns(a, ["x", "y", "z"]); requireColumns(b, ["x", "y", "z"]);
        if (!a.length || !b.length || a.length + b.length > 6000) throw new Error("Provide two non-empty point clouds with at most 6,000 total points.");
        const A = a.map((r, i) => [numeric(r.x, "x", i), numeric(r.y, "y", i), numeric(r.z, "z", i)]), B = b.map((r, i) => [numeric(r.x, "x", i), numeric(r.y, "y", i), numeric(r.z, "z", i)]);
        const all = A.concat(B), lo = [0,1,2].map((j) => Math.min(...all.map((p) => p[j]))), hi = [0,1,2].map((j) => Math.max(...all.map((p) => p[j])));
        const resolutions = [6, 10, 16, 24], out = resolutions.map((bins) => {
          const key = (p) => p.map((x, j) => Math.max(0, Math.min(bins - 1, Math.floor((x - lo[j]) / (hi[j] === lo[j] ? 1 : hi[j] - lo[j]) * bins)))).join(",");
          const sa = new Set(A.map(key)), sb = new Set(B.map(key));
          const inter = Array.from(sa).filter((x) => sb.has(x)).length, union = new Set([...sa, ...sb]).size;
          return { bins_per_axis: bins, occupied_voxels_A: sa.size, occupied_voxels_B: sb.size, shared_voxels: inter, jaccard: round(inter / union), dice: round(2 * inter / (sa.size + sb.size)) };
        });
        return { summary: "Compared " + A.length + " and " + B.length + " points in one shared bounding box. Jaccard and Dice are reported across four voxel resolutions.", tables: [{ title: "Resolution sensitivity", columns: ["bins_per_axis", "occupied_voxels_A", "occupied_voxels_B", "shared_voxels", "jaccard", "dice"], rows: out }], warnings: ["Both clouds must already share a biologically meaningful coordinate frame and scale. The shared bounding box is only a computational grid; these values are not official Challenge metrics."] };
      }
    },
    moran: {
      title: "3D Spatial Autocorrelation Explorer",
      eyebrow: "Spatial expression analysis",
      description: "Calculate global Moran's I for a numeric feature using a directed k-nearest-neighbor graph built from 3D coordinates. The result describes spatial autocorrelation in the supplied point cloud and includes the randomization reference expectation.",
      inputs: [
        { id: "data", label: "Coordinates and one numeric feature (CSV)", type: "textarea", rows: 7, placeholder: "cell_id,x,y,z,value", example: "cell_id,x,y,z,value\np1,0,0,0,1.0\np2,1,0,0,1.2\np3,0,1,0,0.9\np4,1,1,0,1.1\np5,5,5,0,3.0\np6,6,5,0,3.2\np7,5,6,0,2.8\np8,6,6,0,3.1" },
        { id: "k", label: "Nearest neighbors (k)", type: "number", value: "3", min: "1", max: "20", step: "1" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["x", "y", "z", "value"]);
        if (rows.length < 4 || rows.length > 1500) throw new Error("Provide 4 to 1,500 rows for the pairwise graph calculation.");
        const k = Math.floor(Number(v.k)); if (!(k >= 1 && k < rows.length)) throw new Error("k must be at least 1 and smaller than the number of points.");
        const pts = rows.map((r, i) => [numeric(r.x, "x", i), numeric(r.y, "y", i), numeric(r.z, "z", i)]), x = rows.map((r, i) => numeric(r.value, "value", i)), mu = mean(x), dev = x.map((a) => a - mu), den = dev.reduce((s, a) => s + a * a, 0);
        if (den === 0) throw new Error("The feature is constant; Moran's I is undefined.");
        let numerator = 0, s0 = 0;
        for (let i = 0; i < pts.length; i++) {
          const near = pts.map((p, j) => ({ j: j, d: i === j ? Infinity : Math.hypot(pts[i][0]-p[0], pts[i][1]-p[1], pts[i][2]-p[2]) })).sort((a,b)=>a.d-b.d).slice(0,k);
          near.forEach((q) => { if (Number.isFinite(q.d)) { numerator += dev[i] * dev[q.j]; s0++; } });
        }
        const I = rows.length / s0 * numerator / den;
        return { summary: "Moran's I = " + round(I) + " using a directed kNN graph (k = " + k + "). The randomization expectation is approximately " + round(-1 / (rows.length - 1)) + ".", tables: [{ title: "Spatial autocorrelation", columns: ["statistic", "value"], rows: [{ statistic: "Moran's I", value: round(I) }, { statistic: "randomization expectation", value: round(-1 / (rows.length - 1)) }, { statistic: "points", value: rows.length }, { statistic: "directed edges", value: s0 }] }], warnings: ["No permutation p-value is calculated. Neighbor graph choice, spatial scale, expression normalization, and cell sampling affect this descriptive statistic."] };
      }
    },
    contract: {
      title: "Metric Contract Diff",
      eyebrow: "Scorer interoperability",
      description: "Compare two user-supplied JSON contract snapshots by key path and value. Use it to inspect public panel metadata against a local scorer's output shape without assuming either source is authoritative.",
      inputs: [
        { id: "a", label: "Contract or panel JSON", type: "textarea", rows: 8, placeholder: "Paste one JSON object.", example: "{\"task\":\"T2\",\"metrics\":[\"de_score\",\"mmd_u\"],\"panel_genes\":500}" },
        { id: "b", label: "Scorer output or second contract JSON", type: "textarea", rows: 8, placeholder: "Paste the comparison JSON object.", example: "{\"task\":\"T2\",\"metrics\":[\"de_score\",\"mmd_u\",\"energy_distance\"],\"panel_genes\":32285}" }
      ],
      run: (v) => {
        let a, b; try { a = JSON.parse(v.a); } catch (_) { throw new Error("The first input is not valid JSON."); } try { b = JSON.parse(v.b); } catch (_) { throw new Error("The second input is not valid JSON."); }
        const left = flattenJSON(a), right = flattenJSON(b), keys = new Set([...left.keys(), ...right.keys()]);
        const diffs = Array.from(keys).sort().filter((k) => !left.has(k) || !right.has(k) || JSON.stringify(left.get(k)) !== JSON.stringify(right.get(k))).map((k) => ({ json_path: k, first_value: left.has(k) ? stableValue(left.get(k)) : "(missing)", second_value: right.has(k) ? stableValue(right.get(k)) : "(missing)", difference: !left.has(k) ? "only in second" : (!right.has(k) ? "only in first" : "value differs") }));
        return { summary: diffs.length + " differing JSON paths across " + keys.size + " distinct paths.", tables: [{ title: "Contract differences", columns: ["json_path", "first_value", "second_value", "difference"], rows: diffs.length ? diffs : [{ json_path: "(none)", first_value: "", second_value: "", difference: "identical" }] }], warnings: ["A textual diff cannot determine which source is canonical or whether two scoring implementations are equivalent. Record package version, commit, and source URLs beside the compared files."] };
      }
    },
    schemadiff: {
      title: "Metadata Schema & Drift Comparator",
      eyebrow: "Data release comparison",
      description: "Compare two metadata CSV snapshots for added/removed columns, inferred value-type changes, missingness shifts, and new or removed categorical levels. It helps participants review a data refresh without re-running a full analysis.",
      inputs: [
        { id: "a", label: "Metadata snapshot A (CSV)", type: "textarea", rows: 7, placeholder: "One row per observation; keep identifiers out if not needed.", example: "sample,stage,cell_type,batch\ns1,E8.5,cardiac,b1\ns2,E8.5,mesoderm,b2\ns3,E9.5,cardiac,b1" },
        { id: "b", label: "Metadata snapshot B (CSV)", type: "textarea", rows: 7, placeholder: "The second release or metadata export.", example: "sample,stage,cell_type,condition\ns1,E8.5,cardiac,WT\ns2,E8.5,mesoderm,WT\ns3,E9.5,cardiac,KO\ns4,E9.5,vascular,KO" }
      ],
      run: (v) => {
        const a = parseCSV(v.a), b = parseCSV(v.b);
        if (!a.length || !b.length) throw new Error("Paste two non-empty metadata tables.");
        const ca = Object.keys(a[0]), cb = Object.keys(b[0]), all = Array.from(new Set(ca.concat(cb))).sort();
        const profile = (rows, col) => {
          if (!Object.prototype.hasOwnProperty.call(rows[0], col)) return null;
          const values = rows.map((r) => String(r[col]).trim()), nonempty = values.filter(Boolean);
          const numericShare = nonempty.length ? nonempty.filter((x) => Number.isFinite(Number(x))).length / nonempty.length : 0;
          const type = !nonempty.length ? "all missing" : (numericShare >= 0.9 ? "numeric-like" : "categorical/text");
          const levels = new Set(nonempty);
          return { missing: values.length - nonempty.length, missing_fraction: values.length ? (values.length - nonempty.length) / values.length : 0, type: type, levels: levels };
        };
        const out = all.map((col) => {
          const x = profile(a, col), y = profile(b, col);
          if (!x) return { column: col, change: "added in B", type_A: "(absent)", type_B: y.type, missing_fraction_A: "NA", missing_fraction_B: round(y.missing_fraction), levels_added: Array.from(y.levels).slice(0, 10).join(" | "), levels_removed: "" };
          if (!y) return { column: col, change: "removed in B", type_A: x.type, type_B: "(absent)", missing_fraction_A: round(x.missing_fraction), missing_fraction_B: "NA", levels_added: "", levels_removed: Array.from(x.levels).slice(0, 10).join(" | ") };
          return { column: col, change: x.type === y.type ? "retained" : "type changed", type_A: x.type, type_B: y.type, missing_fraction_A: round(x.missing_fraction), missing_fraction_B: round(y.missing_fraction), levels_added: Array.from(y.levels).filter((z) => !x.levels.has(z)).slice(0, 10).join(" | "), levels_removed: Array.from(x.levels).filter((z) => !y.levels.has(z)).slice(0, 10).join(" | ") };
        });
        return { summary: "Compared " + a.length + " rows in snapshot A and " + b.length + " rows in snapshot B. Value types are inferred from observed text, and categorical level changes are exact string differences.", tables: [{ title: "Metadata drift", columns: ["column", "change", "type_A", "type_B", "missing_fraction_A", "missing_fraction_B", "levels_added", "levels_removed"], rows: out }], warnings: ["The comparison does not match rows by sample or cell ID. Filter to comparable populations and align observation identities before interpreting level changes as true release drift. Numeric-like inference is heuristic."] };
      }
    },
    influence: {
      title: "Replicate Influence Explorer",
      eyebrow: "Effect robustness",
      description: "Measure how much each biological replicate changes a two-group feature contrast by recomputing the difference after leaving out one replicate at a time. This is a sensitivity diagnostic, not a significance test or an outlier-removal rule.",
      inputs: [
        { id: "data", label: "Sample-level values (CSV)", type: "textarea", rows: 8, placeholder: "sample,group,feature,value", example: "sample,group,feature,value\ns1,control,GeneA,1.0\ns2,control,GeneA,1.2\ns3,control,GeneA,0.9\ns4,treated,GeneA,2.0\ns5,treated,GeneA,1.8\ns6,treated,GeneA,3.4\ns1,control,GeneB,3.1\ns2,control,GeneB,3.0\ns3,control,GeneB,3.2\ns4,treated,GeneB,2.4\ns5,treated,GeneB,2.7\ns6,treated,GeneB,1.2" },
        { id: "a", label: "Group A", type: "text", value: "control" },
        { id: "b", label: "Group B", type: "text", value: "treated" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["sample", "group", "feature", "value"]);
        const aName = v.a.trim(), bName = v.b.trim();
        if (!aName || !bName || aName === bName) throw new Error("Enter two distinct group labels.");
        const sampleGroups = new Map(), values = new Map();
        rows.forEach((r, i) => {
          if (!r.sample || !r.group || !r.feature) throw new Error("Sample, group, and feature labels cannot be blank (row " + (i + 2) + ").");
          if (sampleGroups.has(r.sample) && sampleGroups.get(r.sample) !== r.group) throw new Error("Sample " + r.sample + " appears in more than one group; this tool expects independent groups.");
          sampleGroups.set(r.sample, r.group);
          if (r.group !== aName && r.group !== bName) return;
          if (!values.has(r.feature)) values.set(r.feature, { a: new Map(), b: new Map() });
          const side = r.group === aName ? "a" : "b", bucket = values.get(r.feature)[side], x = numeric(r.value, "value", i);
          if (!bucket.has(r.sample)) bucket.set(r.sample, []); bucket.get(r.sample).push(x);
        });
        const out = [];
        values.forEach((groups, feature) => {
          const A = Array.from(groups.a, ([sample, xs]) => ({ sample, value: mean(xs) })), B = Array.from(groups.b, ([sample, xs]) => ({ sample, value: mean(xs) }));
          if (A.length < 2 || B.length < 2) return;
          const full = mean(B.map((x) => x.value)) - mean(A.map((x) => x.value)), omitted = [];
          A.concat(B).forEach((left) => {
            const nextA = A.filter((x) => x.sample !== left.sample).map((x) => x.value);
            const nextB = B.filter((x) => x.sample !== left.sample).map((x) => x.value);
            if (nextA.length && nextB.length) omitted.push({ sample: left.sample, group: A.some((x) => x.sample === left.sample) ? aName : bName, effect: mean(nextB) - mean(nextA) });
          });
          const effects = omitted.map((x) => x.effect), signFlips = full === 0 ? 0 : omitted.filter((x) => Math.sign(x.effect) !== Math.sign(full)).length;
          const strongest = omitted.slice().sort((x, y) => Math.abs(y.effect - full) - Math.abs(x.effect - full))[0];
          out.push({ feature, n_A: A.length, n_B: B.length, difference_B_minus_A: round(full), leave_one_out_min: round(Math.min(...effects)), leave_one_out_max: round(Math.max(...effects)), max_absolute_change: round(Math.max(...omitted.map((x) => Math.abs(x.effect - full)))), sign_flips_when_omitted: signFlips, most_influential_sample: strongest ? strongest.sample : "", influential_group: strongest ? strongest.group : "" });
        });
        if (!out.length) throw new Error("Each feature needs at least two independent samples in both selected groups.");
        return { summary: "Calculated leave-one-replicate-out contrasts for " + out.length + " features. A sign flip or large range flags sensitivity to the sampled biological replicates; it does not identify a bad sample.", tables: [{ title: "Replicate influence", columns: ["feature", "n_A", "n_B", "difference_B_minus_A", "leave_one_out_min", "leave_one_out_max", "max_absolute_change", "sign_flips_when_omitted", "most_influential_sample", "influential_group"], rows: out }], warnings: ["Values are averaged within sample before comparing groups. Use independent biological replicates on a consistent scale; no p-values, confidence intervals, or automatic exclusions are produced."] };
      }
    },
    contact: {
      title: "Spatial Cell-Contact Explorer",
      eyebrow: "Spatial neighborhood composition",
      description: "Summarize which labeled cell types fall within a chosen 3D radius of one another. The output separates graph edge counts, pairwise contact frequency, and per-label neighbor counts without assigning a significance test.",
      inputs: [
        { id: "data", label: "Cell coordinates and labels (CSV)", type: "textarea", rows: 8, placeholder: "cell_id,x,y,z,label", example: "cell_id,x,y,z,label\nc1,0,0,0,epithelium\nc2,0.5,0,0,epithelium\nc3,1.1,0,0,mesenchyme\nc4,0,1.1,0,mesenchyme\nc5,2.2,0,0,mesenchyme\nc6,0,0,2.4,epithelium" },
        { id: "radius", label: "Contact radius (coordinate units)", type: "number", value: "1.2", min: "0", step: "any" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["cell_id", "x", "y", "z", "label"]);
        const radius = Number(v.radius); if (!(radius > 0) || !Number.isFinite(radius)) throw new Error("Enter a positive finite radius in the same units as the coordinates.");
        if (rows.length > 3000) throw new Error("This pairwise explorer accepts at most 3,000 cells. Subsample or summarize locally first.");
        const ids = new Set(), points = rows.map((r, i) => {
          if (!r.cell_id || !r.label) throw new Error("Cell IDs and labels cannot be blank (row " + (i + 2) + ").");
          if (ids.has(r.cell_id)) throw new Error("Duplicate cell ID: " + r.cell_id + "."); ids.add(r.cell_id);
          return { id: r.cell_id, label: r.label, xyz: [numeric(r.x, "x", i), numeric(r.y, "y", i), numeric(r.z, "z", i)], degree: 0 };
        });
        const labelCounts = new Map(); points.forEach((p) => labelCounts.set(p.label, (labelCounts.get(p.label) || 0) + 1));
        const contacts = new Map(); let edgeCount = 0;
        for (let i = 0; i < points.length; i++) for (let j = i + 1; j < points.length; j++) {
          const a = points[i], b = points[j], d = Math.hypot(a.xyz[0] - b.xyz[0], a.xyz[1] - b.xyz[1], a.xyz[2] - b.xyz[2]);
          if (d <= radius) {
            const pair = [a.label, b.label].sort(), key = JSON.stringify(pair);
            if (!contacts.has(key)) contacts.set(key, { label_a: pair[0], label_b: pair[1], contacts: 0 });
            contacts.get(key).contacts++; a.degree++; b.degree++; edgeCount++;
          }
        }
        const labels = Array.from(labelCounts.keys()).sort(), contactRows = [];
        for (let i = 0; i < labels.length; i++) for (let j = i; j < labels.length; j++) {
          const a = labels[i], b = labels[j], found = contacts.get(JSON.stringify([a, b])), nA = labelCounts.get(a), nB = labelCounts.get(b);
          const possible = a === b ? nA * (nA - 1) / 2 : nA * nB, count = found ? found.contacts : 0;
          contactRows.push({ label_a: a, label_b: b, contact_edges: count, fraction_of_all_edges: edgeCount ? round(count / edgeCount) : 0, possible_cell_pairs: possible, fraction_of_possible_pairs_in_radius: possible ? round(count / possible) : "NA" });
        }
        const labelRows = labels.map((label) => { const cells = points.filter((p) => p.label === label); return { label, cells: cells.length, mean_neighbors_within_radius: round(mean(cells.map((p) => p.degree))), zero_neighbor_cells: cells.filter((p) => p.degree === 0).length }; });
        return { summary: "Found " + edgeCount + " undirected neighbor edges among " + points.length + " cells at radius " + radius + ". Contact fractions describe this sampled point cloud; they are not enrichment statistics.", tables: [{ title: "Label-pair contacts", columns: ["label_a", "label_b", "contact_edges", "fraction_of_all_edges", "possible_cell_pairs", "fraction_of_possible_pairs_in_radius"], rows: contactRows }, { title: "Per-label neighborhood density", columns: ["label", "cells", "mean_neighbors_within_radius", "zero_neighbor_cells"], rows: labelRows }], warnings: ["Coordinates must already share a meaningful 3D frame and scale. Edge frequencies depend on cell density, radius, tissue boundaries, and sampling; no permutation test is performed."] };
      }
    },
    dose: {
      title: "Perturbation Dose Consistency Explorer",
      eyebrow: "Perturbation response",
      description: "Compare feature responses across dose levels and independent replicate series for one perturbation. It reports per-replicate Spearman direction consistency and dose means, without fitting a mechanistic curve or claiming significance.",
      inputs: [
        { id: "data", label: "Replicate-level dose values (CSV)", type: "textarea", rows: 8, placeholder: "replicate,perturbation,dose,feature,value", example: "replicate,perturbation,dose,feature,value\nr1,GENE_A,0,GeneX,1.0\nr1,GENE_A,1,GeneX,1.4\nr1,GENE_A,2,GeneX,2.0\nr1,GENE_A,4,GeneX,2.6\nr2,GENE_A,0,GeneX,0.9\nr2,GENE_A,1,GeneX,1.3\nr2,GENE_A,2,GeneX,1.8\nr2,GENE_A,4,GeneX,2.5\nr3,GENE_A,0,GeneX,1.1\nr3,GENE_A,1,GeneX,1.0\nr3,GENE_A,2,GeneX,1.9\nr3,GENE_A,4,GeneX,2.1" },
        { id: "perturbation", label: "Perturbation label to analyze", type: "text", value: "GENE_A" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["replicate", "perturbation", "dose", "feature", "value"]);
        const target = v.perturbation.trim(); if (!target) throw new Error("Enter the exact perturbation label to analyze.");
        const byFeature = new Map();
        rows.forEach((r, i) => {
          if (r.perturbation !== target) return;
          if (!r.replicate || !r.feature) throw new Error("Replicate and feature labels cannot be blank (row " + (i + 2) + ").");
          const doseValue = numeric(r.dose, "dose", i), value = numeric(r.value, "value", i);
          if (doseValue < 0) throw new Error("Dose values must be non-negative.");
          if (!byFeature.has(r.feature)) byFeature.set(r.feature, new Map());
          const replicates = byFeature.get(r.feature); if (!replicates.has(r.replicate)) replicates.set(r.replicate, new Map());
          const doses = replicates.get(r.replicate); if (!doses.has(doseValue)) doses.set(doseValue, []); doses.get(doseValue).push(value);
        });
        const trends = [], profiles = [];
        byFeature.forEach((replicates, feature) => {
          const series = [];
          replicates.forEach((doseMap, replicate) => {
            const points = Array.from(doseMap, ([doseValue, xs]) => ({ dose: doseValue, value: mean(xs) })).sort((a, b) => a.dose - b.dose);
            if (points.length >= 3) { const rho = pearson(ranks(points.map((x) => x.dose)), ranks(points.map((x) => x.value))); series.push({ replicate, rho: Number.isFinite(rho) ? rho : 0 }); }
          });
          if (series.length < 2) return;
          const allDoses = Array.from(new Set(Array.from(replicates.values()).flatMap((m) => Array.from(m.keys())))).sort((a, b) => a - b);
          allDoses.forEach((doseValue) => {
            const observed = Array.from(replicates.values()).filter((m) => m.has(doseValue)).map((m) => mean(m.get(doseValue)));
            profiles.push({ feature, dose: doseValue, replicates: observed.length, mean_value: round(mean(observed)), between_replicate_sd: observed.length > 1 ? round(stdev(observed)) : "NA" });
          });
          const rhos = series.map((x) => x.rho).sort((a, b) => a - b), median = rhos.length % 2 ? rhos[(rhos.length - 1) / 2] : mean([rhos[rhos.length / 2 - 1], rhos[rhos.length / 2]]);
          const positive = series.filter((x) => x.rho > 0.1).length, negative = series.filter((x) => x.rho < -0.1).length;
          trends.push({ feature, replicates_with_3plus_doses: series.length, median_replicate_spearman: round(median), positive_trends: positive, negative_trends: negative, near_flat_trends: series.length - positive - negative, direction_consistency: Math.max(positive, negative) / series.length });
        });
        if (!trends.length) throw new Error("For this perturbation, each reported feature needs at least two independent replicates with three or more distinct dose levels.");
        return { summary: "Summarized " + trends.length + " features for " + target + ". Replicate-level rank correlations show direction consistency, not dose-response significance or causal effect.", tables: [{ title: "Replicate trend consistency", columns: ["feature", "replicates_with_3plus_doses", "median_replicate_spearman", "positive_trends", "negative_trends", "near_flat_trends", "direction_consistency"], rows: trends }, { title: "Dose means", columns: ["feature", "dose", "replicates", "mean_value", "between_replicate_sd"], rows: profiles }], warnings: ["Repeated rows within replicate and dose are averaged before comparison. Dose scaling, vehicle controls, plate effects, and biological replicate definition must be checked separately. No fitted curve or p-value is produced."] };
      }
    },
    setoverlap: {
      title: "Gene-Set Redundancy Explorer",
      eyebrow: "Feature-set interpretation",
      description: "Quantify overlap among user-supplied gene sets so near-duplicate terms can be recognized before interpreting enrichment results. It reports exact identifier overlap and connected redundancy groups without importing annotations.",
      inputs: [
        { id: "data", label: "Gene-set membership (CSV)", type: "textarea", rows: 8, placeholder: "set,gene", example: "set,gene\ncardiac_A,GATA4\ncardiac_A,NKX2-5\ncardiac_A,TBX5\ncardiac_B,GATA4\ncardiac_B,NKX2-5\ncardiac_B,MEF2C\nmesoderm,TBX5\nmesoderm,FOXF1\nmesoderm,PDGFRA" },
        { id: "threshold", label: "Minimum Jaccard similarity for redundancy groups", type: "number", value: "0.25", min: "0", max: "1", step: "any" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["set", "gene"]);
        const threshold = Number(v.threshold); if (!Number.isFinite(threshold) || threshold < 0 || threshold > 1) throw new Error("Enter a Jaccard threshold from 0 to 1.");
        const sets = new Map(); rows.forEach((r) => { if (!r.set || !r.gene) throw new Error("Set and gene identifiers cannot be blank."); if (!sets.has(r.set)) sets.set(r.set, new Set()); sets.get(r.set).add(r.gene); });
        const names = Array.from(sets.keys()).sort(); if (names.length < 2) throw new Error("Provide at least two named gene sets.");
        const pairs = [], parent = new Map(names.map((n) => [n, n]));
        const root = (x) => { while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); } return x; };
        const join = (a, b) => { const ra = root(a), rb = root(b); if (ra !== rb) parent.set(rb, ra); };
        for (let i = 0; i < names.length; i++) for (let j = i + 1; j < names.length; j++) {
          const a = sets.get(names[i]), b = sets.get(names[j]), shared = Array.from(a).filter((g) => b.has(g)).length;
          if (!shared) continue;
          const union = new Set([...a, ...b]).size, jaccard = shared / union, containment = shared / Math.min(a.size, b.size);
          pairs.push({ set_a: names[i], set_b: names[j], size_a: a.size, size_b: b.size, shared_genes: shared, jaccard: round(jaccard), overlap_coefficient: round(containment), meets_threshold: jaccard >= threshold });
          if (jaccard >= threshold) join(names[i], names[j]);
        }
        pairs.sort((a, b) => b.jaccard - a.jaccard || a.set_a.localeCompare(b.set_a));
        const components = new Map(); names.forEach((n) => { const r = root(n); if (!components.has(r)) components.set(r, []); components.get(r).push(n); });
        const groups = Array.from(components.values()).filter((x) => x.length > 1).flatMap((members, i) => members.map((set) => ({ redundancy_group: "G" + (i + 1), set, group_size: members.length, sets: members.join(" | ") })));
        return { summary: "Compared " + names.length + " gene sets; " + pairs.filter((x) => x.meets_threshold).length + " overlapping pairs meet the chosen Jaccard threshold. Identifier matching is exact.", tables: [{ title: "Pairwise set overlap", columns: ["set_a", "set_b", "size_a", "size_b", "shared_genes", "jaccard", "overlap_coefficient", "meets_threshold"], rows: pairs.length ? pairs : [{ set_a: "", set_b: "", size_a: 0, size_b: 0, shared_genes: 0, jaccard: 0, overlap_coefficient: 0, meets_threshold: false }] }, { title: "Redundancy groups", columns: ["redundancy_group", "set", "group_size", "sets"], rows: groups }], warnings: ["Overlap does not mean gene sets are biologically equivalent. Identifier aliases, species, universe choice, and annotation version are not inferred; interpret enrichment terms with their sources."] };
      }
    },
    orthology: {
      title: "Cross-Species Mapping Audit",
      eyebrow: "Identifier mapping integrity",
      description: "Audit a user-provided source-to-target gene mapping for unmapped identifiers and one-to-many or many-to-one collisions. This exposes mapping structure before cross-species analyses and never invents orthologs.",
      inputs: [
        { id: "sources", label: "Expected source identifiers (one per line)", type: "textarea", rows: 5, placeholder: "GeneA\nGeneB", example: "GeneA\nGeneB\nGeneC\nGeneD" },
        { id: "data", label: "Mapping table (CSV)", type: "textarea", rows: 7, placeholder: "source_id,target_id", example: "source_id,target_id\nGeneA,Target1\nGeneB,Target2\nGeneB,Target3\nGeneC,Target2" }
      ],
      run: (v) => {
        const sources = Array.from(new Set(list(v.sources))), rows = parseCSV(v.data); requireColumns(rows, ["source_id", "target_id"]);
        if (!sources.length) throw new Error("Provide the expected source identifier universe.");
        const bySource = new Map(), byTarget = new Map(), pairs = new Set(), duplicates = [];
        rows.forEach((r, i) => {
          if (!r.source_id) throw new Error("Mapping source_id cannot be blank (row " + (i + 2) + ").");
          if (!r.target_id) return;
          const key = JSON.stringify([r.source_id, r.target_id]); if (pairs.has(key)) { duplicates.push({ source_id: r.source_id, target_id: r.target_id }); return; } pairs.add(key);
          if (!bySource.has(r.source_id)) bySource.set(r.source_id, new Set()); bySource.get(r.source_id).add(r.target_id);
          if (!byTarget.has(r.target_id)) byTarget.set(r.target_id, new Set()); byTarget.get(r.target_id).add(r.source_id);
        });
        const sourceSet = new Set(sources), outside = Array.from(bySource.keys()).filter((s) => !sourceSet.has(s));
        const audit = sources.map((source_id) => {
          const targets = Array.from(bySource.get(source_id) || []), shared = targets.some((t) => (byTarget.get(t) || new Set()).size > 1);
          let status = "unmapped";
          if (targets.length === 1) status = shared ? "many-to-one target" : "one-to-one";
          else if (targets.length > 1) status = shared ? "many-to-many" : "one-to-many source";
          return { source_id, target_count: targets.length, mapping_status: status, target_ids: targets.join(" | ") };
        });
        const collisions = Array.from(byTarget, ([target_id, sourceSet]) => ({ target_id, source_count: sourceSet.size, source_ids: Array.from(sourceSet).join(" | ") })).filter((x) => x.source_count > 1);
        const mapped = audit.filter((x) => x.target_count > 0).length;
        return { summary: mapped + " of " + sources.length + " expected source IDs have at least one target mapping; " + collisions.length + " target IDs receive mappings from multiple sources. Duplicate mapping rows: " + duplicates.length + ".", tables: [{ title: "Source mapping cardinality", columns: ["source_id", "target_count", "mapping_status", "target_ids"], rows: audit }, { title: "Many-to-one target collisions", columns: ["target_id", "source_count", "source_ids"], rows: collisions }, { title: "Mapping rows outside expected source universe", columns: ["source_id"], rows: outside.map((source_id) => ({ source_id })) }, { title: "Exact duplicate mappings", columns: ["source_id", "target_id"], rows: duplicates }], warnings: ["The audit checks only the supplied mapping table. It does not score orthology confidence, resolve identifier aliases, or determine whether a cross-species mapping is biologically appropriate."] };
      }
    },
    manifest: {
      title: "Sample Manifest Integrity Auditor",
      eyebrow: "Data intake quality",
      description: "Find duplicate sample IDs, contradictory metadata assignments, blank fields, and exact repeated rows in a sample manifest before modeling. It checks record integrity, not whether the experimental design is identifiable.",
      inputs: [
        { id: "data", label: "One-row-per-sample manifest (CSV)", type: "textarea", rows: 8, placeholder: "sample,condition,batch,stage", example: "sample,condition,batch,stage\ns1,control,b1,E8.5\ns2,control,b1,E8.5\ns3,treated,b2,E9.5\ns3,treated,b3,E9.5\ns4,treated,b2,E9.5\ns4,treated,b2,E9.5" },
        { id: "id", label: "Sample identifier column", type: "text", value: "sample" },
        { id: "metadata", label: "Metadata columns to audit (comma-separated)", type: "text", value: "condition,batch,stage" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data), idColumn = v.id.trim(), metadata = list(v.metadata); requireColumns(rows, [idColumn, ...metadata]);
        if (!idColumn || !metadata.length) throw new Error("Name a sample ID column and at least one metadata column.");
        const grouped = new Map(), rowCounts = new Map();
        rows.forEach((r) => {
          const key = JSON.stringify(Object.keys(r).sort().map((k) => r[k])); rowCounts.set(key, (rowCounts.get(key) || 0) + 1);
          const id = r[idColumn]; if (!id) return;
          if (!grouped.has(id)) grouped.set(id, []); grouped.get(id).push(r);
        });
        const ids = Array.from(grouped, ([sample_id, items]) => ({ sample_id, rows: items.length, status: items.length > 1 ? "duplicate ID" : "unique ID" }));
        const conflicts = [];
        grouped.forEach((items, sample_id) => {
          if (items.length < 2) return;
          metadata.forEach((column) => { const values = Array.from(new Set(items.map((r) => r[column]))); if (values.length > 1) conflicts.push({ sample_id, metadata_column: column, distinct_values: values.join(" | ") }); });
        });
        const fields = [idColumn, ...metadata].map((column) => {
          const values = rows.map((r) => r[column]), nonblank = values.filter((x) => x !== "");
          return { column, rows: rows.length, blank_values: rows.length - nonblank.length, unique_nonblank_values: new Set(nonblank).size };
        });
        const repeatedRows = Array.from(rowCounts.values()).filter((count) => count > 1).map((count, i) => ({ duplicate_group: "D" + (i + 1), repeated_copies: count }));
        return { summary: rows.length + " records, " + ids.filter((x) => x.status === "duplicate ID").length + " duplicated sample IDs, " + conflicts.length + " conflicting ID/metadata assignments, and " + repeatedRows.length + " exact repeated row patterns.", tables: [{ title: "Sample ID counts", columns: ["sample_id", "rows", "status"], rows: ids.concat(rows.filter((r) => !r[idColumn]).map(() => ({ sample_id: "(blank)", rows: 1, status: "blank ID" }))) }, { title: "Contradictory metadata by sample ID", columns: ["sample_id", "metadata_column", "distinct_values"], rows: conflicts }, { title: "Field completeness", columns: ["column", "rows", "blank_values", "unique_nonblank_values"], rows: fields }, { title: "Exact repeated row patterns", columns: ["duplicate_group", "repeated_copies"], rows: repeatedRows }], warnings: ["Resolve identity and record errors against the source records. Duplicate rows can represent either accidental repeats or legitimate structure; this tool does not delete or rewrite data."] };
      }
    },
    stagecover: {
      title: "Stage-by-Condition Coverage Planner",
      eyebrow: "Temporal study design",
      description: "Build an explicit stage-by-condition sample-count grid and flag combinations that miss a chosen biological-replicate minimum. Supply an expected stage order to expose gaps; the tool does not infer developmental ordering from labels.",
      inputs: [
        { id: "data", label: "One row per biological sample (CSV)", type: "textarea", rows: 8, placeholder: "sample,stage,condition", example: "sample,stage,condition\ns1,E8.5,control\ns2,E8.5,control\ns3,E8.5,treated\ns4,E9.5,control\ns5,E9.5,treated\ns6,E9.5,treated\ns7,E10.5,control" },
        { id: "stages", label: "Expected stage order (optional, comma-separated)", type: "text", value: "E8.5,E9.5,E10.5" },
        { id: "conditions", label: "Expected conditions (optional, comma-separated)", type: "text", value: "control,treated" },
        { id: "minimum", label: "Minimum independent samples per stage-condition cell", type: "number", value: "2", min: "1", step: "1" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["sample", "stage", "condition"]);
        const minimum = Number(v.minimum); if (!Number.isInteger(minimum) || minimum < 1) throw new Error("Minimum independent sample count must be a positive integer.");
        const seen = new Set(), observedStages = [], observedConditions = [];
        rows.forEach((r, i) => {
          if (!r.sample || !r.stage || !r.condition) throw new Error("Sample, stage, and condition cannot be blank (row " + (i + 2) + ").");
          if (seen.has(r.sample)) throw new Error("Sample ID " + r.sample + " occurs more than once; provide one row per biological sample."); seen.add(r.sample);
          if (!observedStages.includes(r.stage)) observedStages.push(r.stage); if (!observedConditions.includes(r.condition)) observedConditions.push(r.condition);
        });
        const expectedStages = Array.from(new Set(list(v.stages))), expectedConditions = Array.from(new Set(list(v.conditions)));
        const stages = expectedStages.length ? expectedStages : observedStages, conditions = expectedConditions.length ? expectedConditions : observedConditions;
        const absentStages = observedStages.filter((x) => !stages.includes(x)), absentConditions = observedConditions.filter((x) => !conditions.includes(x));
        if (absentStages.length || absentConditions.length) throw new Error("Expected stage/condition lists omit observed labels: " + absentStages.concat(absentConditions).join(", ") + ".");
        const counts = new Map(); rows.forEach((r) => { const key = JSON.stringify([r.stage, r.condition]); counts.set(key, (counts.get(key) || 0) + 1); });
        const grid = stages.flatMap((stage) => conditions.map((condition) => { const samples = counts.get(JSON.stringify([stage, condition])) || 0; return { stage, condition, biological_samples: samples, minimum_required: minimum, status: samples >= minimum ? "meets minimum" : samples === 0 ? "no samples" : "below minimum" }; }));
        const covered = grid.filter((x) => x.biological_samples >= minimum).length;
        const stageRows = stages.map((stage) => { const cells = grid.filter((x) => x.stage === stage); return { stage, conditions_meeting_minimum: cells.filter((x) => x.biological_samples >= minimum).length, total_conditions: conditions.length, stage_complete: cells.every((x) => x.biological_samples >= minimum) }; });
        return { summary: covered + " of " + grid.length + " planned stage-condition cells meet the chosen minimum of " + minimum + " independent samples.", tables: [{ title: "Stage-condition coverage", columns: ["stage", "condition", "biological_samples", "minimum_required", "status"], rows: grid }, { title: "Stage completeness", columns: ["stage", "conditions_meeting_minimum", "total_conditions", "stage_complete"], rows: stageRows }], warnings: ["Use independent embryos or other true biological units, not cells, as sample counts. Coverage is not a power calculation; stage order is taken exactly from the provided list."] };
      }
    },
    labelagreement: {
      title: "Cell Annotation Concordance Auditor",
      eyebrow: "Annotation version comparison",
      description: "Compare two cell-label assignments on shared cell IDs using an adjusted Rand index, a contingency table, and majority-mapped label purity. Scores are invariant to label names and do not declare either annotation to be correct.",
      inputs: [
        { id: "data", label: "Paired cell annotations (CSV)", type: "textarea", rows: 8, placeholder: "cell_id,label_a,label_b", example: "cell_id,label_a,label_b\nc1,cardiac,cardiomyocyte\nc2,cardiac,cardiomyocyte\nc3,cardiac,progenitor\nc4,mesoderm,mesenchyme\nc5,mesoderm,mesenchyme\nc6,mesoderm,mesenchyme\nc7,endoderm,endoderm" }
      ],
      run: (v) => {
        const rows = parseCSV(v.data); requireColumns(rows, ["cell_id", "label_a", "label_b"]);
        const ids = new Set(), table = new Map(), totalsA = new Map(), totalsB = new Map(), aToB = new Map(), bToA = new Map();
        rows.forEach((r, i) => {
          if (!r.cell_id || !r.label_a || !r.label_b) throw new Error("Cell IDs and both labels cannot be blank (row " + (i + 2) + ").");
          if (ids.has(r.cell_id)) throw new Error("Cell ID " + r.cell_id + " is duplicated; provide one paired label per cell."); ids.add(r.cell_id);
          const key = JSON.stringify([r.label_a, r.label_b]); table.set(key, (table.get(key) || 0) + 1);
          totalsA.set(r.label_a, (totalsA.get(r.label_a) || 0) + 1); totalsB.set(r.label_b, (totalsB.get(r.label_b) || 0) + 1);
          if (!aToB.has(r.label_a)) aToB.set(r.label_a, new Set()); aToB.get(r.label_a).add(r.label_b);
          if (!bToA.has(r.label_b)) bToA.set(r.label_b, new Set()); bToA.get(r.label_b).add(r.label_a);
        });
        const n = rows.length; if (n < 2) throw new Error("At least two paired cell annotations are required.");
        const choose2 = (x) => x * (x - 1) / 2, index = Array.from(table.values()).reduce((s, x) => s + choose2(x), 0);
        const sumA = Array.from(totalsA.values()).reduce((s, x) => s + choose2(x), 0), sumB = Array.from(totalsB.values()).reduce((s, x) => s + choose2(x), 0), totalPairs = choose2(n);
        const expected = sumA * sumB / totalPairs, denominator = 0.5 * (sumA + sumB) - expected;
        const samePartition = Array.from(aToB.values()).every((labels) => labels.size === 1) && Array.from(bToA.values()).every((labels) => labels.size === 1);
        const ari = Math.abs(denominator) < 1e-12 ? (samePartition ? 1 : 0) : (index - expected) / denominator;
        const cross = Array.from(table, ([key, count]) => { const [label_a, label_b] = JSON.parse(key); return { label_a, label_b, cells: count }; });
        const mapped = Array.from(totalsB.keys()).map((label_b) => {
          const candidates = cross.filter((x) => x.label_b === label_b).sort((x, y) => y.cells - x.cells), majority = candidates[0];
          return { label_b, majority_label_a: majority.label_a, cells: totalsB.get(label_b), majority_overlap: majority.cells, purity: round(majority.cells / totalsB.get(label_b)) };
        });
        return { summary: "Compared " + n + " cells across " + totalsA.size + " labels in A and " + totalsB.size + " labels in B. Adjusted Rand index: " + round(ari) + " (1 indicates identical partitions; values near 0 indicate chance-level pair agreement).", tables: [{ title: "Label contingency", columns: ["label_a", "label_b", "cells"], rows: cross }, { title: "B-to-A majority mapping", columns: ["label_b", "majority_label_a", "cells", "majority_overlap", "purity"], rows: mapped }], warnings: ["Both assignments must cover the same cell IDs and represent comparable observations. Adjusted Rand index measures partition agreement, not biological validity, lineage, or the correctness of either label set."] };
      }
    },
    incident: {
      title: "Challenge Service Incident Packet",
      eyebrow: "Operational support",
      description: "Create a compact, privacy-conscious incident report for an apparent Challenge sign-in, upload, scoring, or service outage. Keep observed facts separate from inference so other participants can reproduce the issue.",
      inputs: [
        { id: "action", label: "Affected action or page", type: "text", value: "Sign-in or submission" },
        { id: "time", label: "When it happened (include timezone)", type: "text", value: "" },
        { id: "symptom", label: "Exact visible symptom or status code", type: "textarea", rows: 3, placeholder: "Copy the public error text only. Do not include session cookies or tokens." },
        { id: "checks", label: "Checks you actually performed", type: "textarea", rows: 4, placeholder: "For example: retry time, second browser, public status page, service URL and response." },
        { id: "observed", label: "What is observed vs what is inferred?", type: "textarea", rows: 3, placeholder: "Observed: ...\nInference: ..." },
        { id: "impact", label: "Who or what is affected?", type: "textarea", rows: 3, placeholder: "Describe the workflow impact without names, account IDs, or private data." }
      ],
      run: (v) => {
        const required = ["action", "time", "symptom", "checks", "observed", "impact"];
        if (required.some((k) => !String(v[k]).trim())) throw new Error("Fill in each field; use “not checked” where appropriate so the report does not imply evidence you do not have.");
        const body = "# Challenge service incident\n\n- Affected action: " + v.action.trim() + "\n- Time and timezone: " + v.time.trim() + "\n\n## Observed symptom\n" + v.symptom.trim() + "\n\n## Checks performed\n" + v.checks.trim() + "\n\n## Observations and inference\n" + v.observed.trim() + "\n\n## Impact\n" + v.impact.trim() + "\n";
        return { summary: "Incident packet drafted. Review it before sharing; this page does not check live service status or submit the report.", tables: [{ title: "Copy-ready report", columns: ["markdown"], rows: [{ markdown: body }] }], warnings: ["Remove email addresses, account identifiers, session URLs, cookies, tokens, private paths, and unpublished data before posting."] };
      }
    }
  };

  function parseCSV(text) {
    const source = String(text || "").trim();
    if (!source) return [];
    if (source.length > 5000000) throw new Error("This page accepts up to 5 MB of pasted CSV. Summarize a larger file locally first.");
    const first = source.split(/\r?\n/, 1)[0];
    const delimiter = (first.match(/\t/g) || []).length > (first.match(/,/g) || []).length ? "\t" : ",";
    const rows = []; let row = [], field = "", quoted = false;
    for (let i = 0; i < source.length; i++) {
      const ch = source[i];
      if (quoted) {
        if (ch === '"' && source[i + 1] === '"') { field += '"'; i++; }
        else if (ch === '"') quoted = false;
        else field += ch;
      } else if (ch === '"' && field === "") quoted = true;
      else if (ch === delimiter) { row.push(field.trim()); field = ""; }
      else if (ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[i + 1] === "\n") i++;
        row.push(field.trim()); field = "";
        if (row.some((x) => x !== "")) rows.push(row);
        if (rows.length > 100000) throw new Error("This page accepts at most 100,000 data rows.");
        row = [];
      } else field += ch;
    }
    if (quoted) throw new Error("CSV contains an unmatched quote.");
    row.push(field.trim()); if (row.some((x) => x !== "")) rows.push(row);
    const header = rows.shift().map((x) => x.replace(/^\uFEFF/, ""));
    if (header.length > 1000) throw new Error("This page accepts at most 1,000 columns.");
    if (rows.length > 100000) throw new Error("This page accepts at most 100,000 data rows.");
    if (header.some((x) => !x)) throw new Error("CSV header contains a blank column name.");
    if (new Set(header).size !== header.length) throw new Error("CSV header contains duplicate column names.");
    return rows.map((cells, i) => {
      if (cells.length !== header.length) throw new Error("CSV row " + (i + 2) + " has " + cells.length + " fields; expected " + header.length + ".");
      return Object.fromEntries(header.map((h, j) => [h, cells[j]]));
    });
  }
  function list(x) { return String(x || "").split(/[\n,;\t]+/).map((s) => s.trim()).filter(Boolean); }
  function requireColumns(rows, cols) {
    if (!rows.length) throw new Error("Add CSV rows first.");
    const missing = cols.filter((c) => !Object.prototype.hasOwnProperty.call(rows[0], c));
    if (missing.length) throw new Error("Missing CSV column" + (missing.length > 1 ? "s: " : ": ") + missing.join(", "));
  }
  function numeric(x, field, row) { const n = Number(String(x).trim()); if (String(x).trim() === "" || !Number.isFinite(n)) throw new Error("Column " + field + " needs a finite number (data row " + (row + 2) + ")."); return n; }
  function round(x) { return Number.isFinite(x) ? Number(x.toFixed(6)) : "NA"; }
  function mean(xs) { return xs.reduce((a, b) => a + b, 0) / xs.length; }
  function stdev(xs) { const m = mean(xs); return Math.sqrt(xs.reduce((s, x) => s + (x - m) ** 2, 0) / Math.max(1, xs.length - 1)); }
  function pct(x) { return (100 * x).toFixed(2) + "%"; }
  function duplicateValues(xs) { const seen = new Set(), dup = new Set(); xs.forEach((x) => seen.has(x) ? dup.add(x) : seen.add(x)); return Array.from(dup); }
  function pearson(a, b) {
    const ma = mean(a), mb = mean(b), cov = a.reduce((s, x, i) => s + (x-ma) * (b[i]-mb), 0), da = a.reduce((s,x)=>s+(x-ma)**2,0), db = b.reduce((s,x)=>s+(x-mb)**2,0);
    return da && db ? cov / Math.sqrt(da * db) : NaN;
  }
  function ranks(xs) {
    const order = xs.map((x, i) => ({ x: x, i: i })).sort((a, b) => a.x - b.x), out = Array(xs.length);
    for (let i = 0; i < order.length;) { let j = i + 1; while (j < order.length && order[j].x === order[i].x) j++; const r = (i + 1 + j) / 2; for (let k = i; k < j; k++) out[order[k].i] = r; i = j; }
    return out;
  }
  function logGamma(z) {
    const p = [676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7];
    if (z < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI*z)) - logGamma(1-z);
    z -= 1; let x = 0.99999999999980993; for (let i = 0; i < p.length; i++) x += p[i] / (z + i + 1);
    const t = z + p.length - 0.5; return 0.5*Math.log(2*Math.PI) + (z+0.5)*Math.log(t) - t + Math.log(x);
  }
  function logChoose(n, k) { if (k < 0 || k > n) return -Infinity; return logGamma(n+1)-logGamma(k+1)-logGamma(n-k+1); }
  function binomialAtLeast(n, p, k) {
    if (k <= 0) return 1; if (k > n) return 0; if (p === 1) return 1; if (p === 0) return 0;
    const terms = []; for (let i = 0; i < k; i++) terms.push(logChoose(n,i)+i*Math.log(p)+(n-i)*Math.log1p(-p));
    const max = Math.max(...terms), logLower = max + Math.log(terms.reduce((s,x)=>s+Math.exp(x-max),0));
    return Math.max(0, Math.min(1, -Math.expm1(Math.min(0, logLower))));
  }
  function hypergeomTail(N, K, n, x) {
    if (x <= 0) return 1; const hi = Math.min(K,n), terms = [];
    for (let i = x; i <= hi; i++) terms.push(logChoose(K,i)+logChoose(N-K,n-i)-logChoose(N,n));
    if (!terms.length) return 0; const max = Math.max(...terms); return Math.min(1, Math.exp(max) * terms.reduce((s,t)=>s+Math.exp(t-max),0));
  }
  function jsDivergence(a,b) {
    let s=0; for(let i=0;i<a.length;i++){const m=(a[i]+b[i])/2;if(a[i]>0)s+=0.5*a[i]*Math.log2(a[i]/m);if(b[i]>0)s+=0.5*b[i]*Math.log2(b[i]/m);} return s;
  }
  function matrixRank(A) {
    const m=A.map((r)=>r.slice()), rows=m.length, cols=m[0].length; let rank=0;
    for(let c=0;c<cols&&rank<rows;c++){let p=rank;for(let r=rank+1;r<rows;r++)if(Math.abs(m[r][c])>Math.abs(m[p][c]))p=r;if(Math.abs(m[p][c])<1e-9)continue;[m[p],m[rank]]=[m[rank],m[p]];const d=m[rank][c];for(let j=c;j<cols;j++)m[rank][j]/=d;for(let r=0;r<rows;r++)if(r!==rank){const f=m[r][c];for(let j=c;j<cols;j++)m[r][j]-=f*m[rank][j];}rank++;} return rank;
  }
  function fitLinear(ps, x) {
    const mx=mean(ps.map((p)=>p.x)), my=mean(ps.map((p)=>p.y)), den=ps.reduce((s,p)=>s+(p.x-mx)**2,0);
    if (!den) return my; const slope=ps.reduce((s,p)=>s+(p.x-mx)*(p.y-my),0)/den; return my+slope*(x-mx);
  }
  function solve(A,b) {
    const m=A.map((r,i)=>r.concat([b[i]])), n=b.length;
    for(let c=0;c<n;c++){let p=c;for(let r=c+1;r<n;r++)if(Math.abs(m[r][c])>Math.abs(m[p][c]))p=r;if(Math.abs(m[p][c])<1e-12)throw new Error("Trend fit is singular; stages may be duplicated.");[m[p],m[c]]=[m[c],m[p]];const d=m[c][c];for(let j=c;j<=n;j++)m[c][j]/=d;for(let r=0;r<n;r++)if(r!==c){const f=m[r][c];for(let j=c;j<=n;j++)m[r][j]-=f*m[c][j];}}return m.map((r)=>r[n]);
  }
  function fitQuadratic(ps,x) {
    const X=ps.map((p)=>[1,p.x,p.x*p.x]), y=ps.map((p)=>p.y), A=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>X.reduce((s,r)=>s+r[i]*r[j],0))), b=Array.from({length:3},(_,i)=>X.reduce((s,r,k)=>s+r[i]*y[k],0)), c=solve(A,b);
    return c[0]+c[1]*x+c[2]*x*x;
  }
  function covariance3(points) {
    const n=points.length; return Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>points.reduce((s,p)=>s+p[i]*p[j],0)/Math.max(1,n-1)));
  }
  function jacobiEigen3(input) {
    const a=input.map((r)=>r.slice()), v=[[1,0,0],[0,1,0],[0,0,1]];
    for(let iter=0;iter<40;iter++){let p=0,q=1,max=Math.abs(a[0][1]);for(const [i,j] of [[0,2],[1,2]])if(Math.abs(a[i][j])>max){p=i;q=j;max=Math.abs(a[i][j]);}if(max<1e-12)break;const phi=0.5*Math.atan2(2*a[p][q],a[q][q]-a[p][p]), c=Math.cos(phi), s=Math.sin(phi);
      for(let k=0;k<3;k++){const apk=a[p][k],aqk=a[q][k];a[p][k]=c*apk-s*aqk;a[q][k]=s*apk+c*aqk;}
      for(let k=0;k<3;k++){const akp=a[k][p],akq=a[k][q];a[k][p]=c*akp-s*akq;a[k][q]=s*akp+c*akq;const vkp=v[k][p],vkq=v[k][q];v[k][p]=c*vkp-s*vkq;v[k][q]=s*vkp+c*vkq;}
    }
    return { values:[a[0][0],a[1][1],a[2][2]], vectors:[[v[0][0],v[1][0],v[2][0]],[v[0][1],v[1][1],v[2][1]],[v[0][2],v[1][2],v[2][2]]] };
  }
  function det3(rows) { const a=rows;return a[0][0]*(a[1][1]*a[2][2]-a[1][2]*a[2][1])-a[0][1]*(a[1][0]*a[2][2]-a[1][2]*a[2][0])+a[0][2]*(a[1][0]*a[2][1]-a[1][1]*a[2][0]); }
  function dot(a,b) { return a.reduce((s,x,i)=>s+x*b[i],0); }
  function flattenJSON(obj, path, out) {
    path = path || "$"; out = out || new Map();
    if (obj && typeof obj === "object") {
      if (Array.isArray(obj)) { out.set(path + ".length", obj.length); obj.forEach((v,i)=>flattenJSON(v,path+"["+i+"]",out)); }
      else { const keys=Object.keys(obj).sort(); if(!keys.length)out.set(path,"{}"); keys.forEach((k)=>flattenJSON(obj[k],path+"."+k,out)); }
    } else out.set(path,obj);
    return out;
  }
  function stableValue(x) { return x && typeof x === "object" ? JSON.stringify(x) : String(x); }
  function render(result) {
    const out=byId("result");out.replaceChildren();out.className="output";
    const p=document.createElement("p");p.textContent=result.summary;out.append(p);
    (result.warnings||[]).forEach((w)=>{const n=document.createElement("p");n.className="hint";n.textContent=currentUI.note+" "+w;out.append(n);});
    (result.tables||[]).forEach((t,index)=>{
      const displayTitle=currentLabLocale&&currentLabLocale.tables&&currentLabLocale.tables[index]||t.title;
      const section=document.createElement("section"),h=document.createElement("h3");h.textContent=displayTitle;section.append(h);
      const wrap=document.createElement("div");wrap.className="table-wrap";const table=document.createElement("table"),thead=document.createElement("thead"),tr=document.createElement("tr");
      t.columns.forEach((c)=>{const th=document.createElement("th");th.scope="col";th.textContent=c;tr.append(th);});thead.append(tr);table.append(thead);
      const tbody=document.createElement("tbody");t.rows.slice(0,200).forEach((r)=>{const row=document.createElement("tr");t.columns.forEach((c)=>{const td=document.createElement("td");td.textContent=String(r[c]===undefined?"":r[c]);row.append(td);});tbody.append(row);});table.append(tbody);wrap.append(table);section.append(wrap);
      if(t.rows.length>200){const note=document.createElement("p");note.className="hint";note.textContent=currentUI.showRows;section.append(note);}
      const btn=document.createElement("button");btn.className="secondary";btn.textContent=currentUI.download+" "+displayTitle+" CSV";btn.addEventListener("click",()=>downloadCSV(t));section.append(btn);out.append(section);
    });
  }
  function csvCell(x) { const s=String(x===undefined||x===null?"":x);return /[",\r\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s; }
  function downloadCSV(t) {
    const lines=[t.columns.map(csvCell).join(",")].concat(t.rows.map((r)=>t.columns.map((c)=>csvCell(r[c])).join(",")));
    const blob=new Blob([lines.join("\r\n")],{type:"text/csv;charset=utf-8"}),a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=t.title.toLowerCase().replace(/[^a-z0-9]+/g,"-")+".csv";a.click();URL.revokeObjectURL(a.href);
  }
  function init() {
    const name=document.body.dataset.lab,lab=labs[name];
    if(!lab){byId("result").textContent=englishUI.unknown;return;}
    const form=byId("lab-inputs");
    lab.inputs.forEach((f)=>{
      const wrap=document.createElement("div"),label=document.createElement("label");label.htmlFor=f.id;label.textContent=f.label;wrap.append(label);
      let el;
      if(f.type==="textarea"){el=document.createElement("textarea");el.rows=f.rows||6;el.placeholder=f.placeholder||"";el.spellcheck=false;}
      else if(f.type==="select"){el=document.createElement("select");f.options.forEach(([value,labelText])=>{const o=document.createElement("option");o.value=value;o.textContent=labelText;el.append(o);});}
      else{el=document.createElement("input");el.type=f.type||"text";if(f.min!==undefined)el.min=f.min;if(f.max!==undefined)el.max=f.max;if(f.step!==undefined)el.step=f.step;}
      el.id=f.id;if(f.value!==undefined)el.value=f.value;if(f.type==="textarea"&&f.initial)el.value=f.initial;
      if(f.help){const small=document.createElement("p");small.className="hint";small.textContent=f.help;wrap.append(label,el,small);}else wrap.append(label,el);
      form.append(wrap);
    });
    const selectorWrap=document.createElement("div");selectorWrap.className="language-control";
    const selectorLabel=document.createElement("label");selectorLabel.htmlFor="interface-language";
    const selector=document.createElement("select");selector.id="interface-language";selector.setAttribute("aria-label","Interface language / Idioma de la interfaz / 界面语言");
    const languageOptions=[ ["en","English"], ["es",locales.es.label], ["zh-CN",locales["zh-CN"].label] ];
    languageOptions.forEach(([value,label])=>{const option=document.createElement("option");option.value=value;option.textContent=label;selector.append(option);});
    selectorWrap.append(selectorLabel,selector);
    const header=document.querySelector(".tool-head"),nav=header.querySelector("nav");nav.after(selectorWrap);
    const result=byId("result"),resultNote=document.createElement("p");resultNote.id="result-language-note";resultNote.className="hint";result.parentNode.insertBefore(resultNote,result);
    const requested=new URLSearchParams(location.search).get("lang");
    currentLanguage=requested&&locales[requested]?requested:"en";
    selector.value=currentLanguage;
    function applyLanguage(code){
      currentLanguage=code;currentUI=code==="en"?englishUI:locales[code].ui;currentLabLocale=code==="en"?null:locales[code].labs[name]||null;
      const copy=currentLabLocale||lab;
      document.documentElement.lang=code==="zh-CN"?"zh-Hans":code;
      document.title=copy.title+" · VEC";
      byId("eyebrow").textContent=copy.eyebrow;byId("title").textContent=copy.title;byId("description").textContent=copy.description;
      selectorLabel.textContent=currentUI.language;
      const anchors=nav.querySelectorAll("a");if(anchors[0]){anchors[0].textContent=currentUI.back;anchors[0].href=code==="en"?"../../":"../../?lang="+encodeURIComponent(code)+"#analysis-tools";}if(anchors[1])anchors[1].textContent=currentUI.community;if(anchors[2])anchors[2].textContent=currentUI.official;
      byId("analyze").textContent=currentUI.analyze;byId("example").textContent=currentUI.example;byId("clear").textContent=currentUI.clear;
      byId("privacy-note").textContent=currentUI.privacy;
      const panels=document.querySelectorAll(".panel");if(panels[1]){const heading=panels[1].querySelector("h2"),paragraphs=panels[1].querySelectorAll("p");if(heading)heading.textContent=currentUI.scope;if(paragraphs[paragraphs.length-1])paragraphs[paragraphs.length-1].textContent=currentUI.localData;}
      const labels=form.querySelectorAll("label");
      lab.inputs.forEach((f)=>{
        const fieldCopy=currentLabLocale&&currentLabLocale.fields&&currentLabLocale.fields[f.id]||{};
        const fieldLabel=Array.from(labels).find((x)=>x.htmlFor===f.id);if(fieldLabel)fieldLabel.textContent=fieldCopy.label||f.label;
        const input=byId(f.id);if(input&&input.tagName!=="SELECT")input.placeholder=fieldCopy.placeholder!==undefined?fieldCopy.placeholder:(f.placeholder||"");
        if(input&&input.tagName==="SELECT")Array.from(input.options).forEach((option)=>{const optionLabel=fieldCopy.options&&fieldCopy.options[option.value];if(optionLabel)option.textContent=optionLabel;else if(code==="en"){const original=f.options.find((x)=>x[0]===option.value);if(original)option.textContent=original[1];}});
      });
      const footerLinks=document.querySelectorAll(".foot a");if(footerLinks[0])footerLinks[0].textContent=currentUI.communityFooter;if(footerLinks[1])footerLinks[1].textContent=currentUI.sourceFooter;
      resultNote.textContent=currentUI.outputLanguage;
      if(!hasAnalysisResult){result.className="output";result.textContent=currentUI.initial;}
      const url=new URL(location.href);if(code==="en")url.searchParams.delete("lang");else url.searchParams.set("lang",code);history.replaceState(null,"",url);
    }
    selector.addEventListener("change",()=>applyLanguage(selector.value));
    applyLanguage(currentLanguage);
    byId("analyze").addEventListener("click",()=>{try{const values={};lab.inputs.forEach((f)=>values[f.id]=byId(f.id).value);render(lab.run(values));hasAnalysisResult=true;}catch(e){const out=byId("result");out.className="output error";out.textContent=e.message||String(e);hasAnalysisResult=true;}});
    byId("example").addEventListener("click",()=>{lab.inputs.forEach((f)=>{const el=byId(f.id);if(f.example!==undefined)el.value=f.example;else if(f.value!==undefined)el.value=f.value;});byId("analyze").click();});
    byId("clear").addEventListener("click",()=>{lab.inputs.forEach((f)=>{const el=byId(f.id);el.value=f.type==="select"?f.options[0][0]:"";});hasAnalysisResult=false;const out=byId("result");out.className="output";out.textContent=currentUI.clearResult;});
  }
  init();
})();
