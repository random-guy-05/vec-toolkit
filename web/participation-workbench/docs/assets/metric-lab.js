(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const tools = [
    {
      id: "metric-skill",
      category: "Overall score",
      title: "Per-Metric Skill Transformer",
      description: "Convert raw metric values to the floor-and-ceiling skill scale. It supports higher-is-better, lower-is-better, and zero-is-ideal metrics.",
      schema: "CSV columns: metric, raw, floor, ceiling, direction. direction is higher, lower, or absolute (for a signed metric whose ideal is zero).",
      example: "metric,raw,floor,ceiling,direction\nExample higher-is-better,0.62,0.10,0.82,higher\nExample lower-is-better,0.025,0.080,0.004,lower\nExample zero-is-ideal,0.12,-0.30,0.01,absolute",
      caveat: "The anchors are user-supplied and must come from the matching public board and scorer version. For zero-is-ideal metrics, the calculator uses absolute values before applying a lower-is-better transform. It is not an official score endpoint.",
      run: skillRows
    },
    {
      id: "weight-audit",
      category: "Overall score",
      title: "Metric Weight Budget Auditor",
      description: "Check that metric weights sum to one within each scoring group and that each group has one consistent weight in the overall task score.",
      schema: "CSV columns: group, metric, group_weight, metric_weight. Enter each metric once. Weights should be fractions between 0 and 1.",
      example: "group,metric,group_weight,metric_weight\nExpression change,DES,0.25,0.50\nExpression change,DCS,0.25,0.50\nCell-state distribution,MMD,0.25,0.60\nCell-state distribution,CSS,0.25,0.40\nTissue shape,SDD,0.25,0.333333\nTissue shape,ODS,0.25,0.333333\nTissue shape,TSR,0.25,0.333334\nLocal spatial organisation,NFS,0.25,1",
      caveat: "This audits an entered weight table; it does not decide whether those weights are current or applicable to a selected task. Compare with the official scoring table.",
      run: weightAudit
    },
    {
      id: "task-score",
      category: "Overall score",
      title: "Hierarchical Task Score Reconciler",
      description: "Rebuild a task score from per-metric skills while preserving the two-level weighting: metrics within groups, then groups within a task. Missing or non-numeric skills count as zero.",
      schema: "CSV columns: group, metric, skill, group_weight, metric_weight. Leave skill blank or write NA to apply the published missing-metric penalty.",
      example: "group,metric,skill,group_weight,metric_weight\nExpression change,DES,0.70,0.25,0.50\nExpression change,DCS,0.55,0.25,0.50\nCell-state distribution,MMD,0.62,0.25,0.60\nCell-state distribution,CSS,0.48,0.25,0.40\nTissue shape,SDD,0.65,0.25,0.333333\nTissue shape,ODS,0.58,0.25,0.333333\nTissue shape,TSR,0.52,0.25,0.333334\nLocal spatial organisation,NFS,0.41,0.25,1",
      caveat: "This reproduces the published weight aggregation only when the entered metric skills and current weights are correct. It does not calculate DES, DCS, MMD, CSS, shape metrics, or official leaderboard values.",
      run: taskScore
    },
    {
      id: "des-preview",
      category: "Expression change",
      title: "DES Signed Top-Set Preview",
      description: "Preview sign-aware up/down gene overlap against a supplied truth DE list, then compare it with the reference-expression-only null in both directions.",
      schema: "CSV columns: gene, truth_direction (up or down), predicted_delta, reference. Enter only the truth DE set for this small diagnostic. The full scorer determines the set from cell-level data.",
      example: "gene,truth_direction,predicted_delta,reference\ngA,up,1.2,2.0\ngB,up,0.8,0.6\ngC,down,-0.9,1.2\ngD,down,-0.4,3.0\ngE,up,0.2,0.1\ngF,down,-0.1,0.4\ngG,up,-0.3,2.4\ngH,down,0.6,0.3",
      caveat: "This checks ranking and signed overlap on a user-supplied DE set. The official DES first calls truth DE genes with a two-sided Mann–Whitney test, Benjamini–Hochberg FDR control, and an effect-size floor, then applies the measured null adjustment. This small preview does not reproduce those steps.",
      run: desPreview
    },
    {
      id: "dcs-preview",
      category: "Expression change",
      title: "DCS Partial Rank Concordance",
      description: "Rank predicted changes, observed changes, and reference expression, then compute the partial correlation between the two change ranks while controlling for reference-expression rank.",
      schema: "CSV columns: gene, reference, true_delta, predicted_delta. Use one row per gene and at least three non-constant rows.",
      example: "gene,reference,true_delta,predicted_delta\ngA,0.2,0.8,0.7\ngB,1.1,-0.1,-0.2\ngC,2.3,0.4,0.6\ngD,0.7,-0.8,-0.6\ngE,1.8,0.2,0.1\ngF,0.4,-0.3,-0.5\ngG,1.4,0.6,0.4\ngH,2.8,-0.4,-0.3",
      caveat: "This is a small-table partial Spearman-style diagnostic using average ranks for ties. The official DCS uses the full task panel and its scorer implementation; degenerate or no-change cases are reported as zero there.",
      run: dcsPreview
    },
    {
      id: "mmd-preview",
      category: "Population distribution",
      title: "Unbiased Multi-Bandwidth MMD Explorer",
      description: "Compare two small feature-space populations with the unbiased RBF-kernel MMD estimator across five bandwidths around a target-based median heuristic.",
      schema: "CSV columns: population (true or predicted), then one or more numeric feature columns such as pc1,pc2,pc3. Keep the table to 200 rows per population.",
      example: "population,pc1,pc2\ntrue,-1.2,0.1\ntrue,-0.5,0.8\ntrue,0.1,-0.4\ntrue,0.8,0.7\ntrue,1.2,-0.2\ntrue,0.3,1.1\npredicted,-1.0,0.2\npredicted,-0.2,0.7\npredicted,0.2,-0.1\npredicted,0.9,0.5\npredicted,1.0,-0.3\npredicted,0.5,1.0",
      caveat: "The unbiased estimator can be slightly negative in finite samples. This page uses the supplied feature space and a small deterministic table; the official scorer first fits a 30-component PCA basis on the target and uses up to 2,000 cells per side.",
      run: mmdPreview
    },
    {
      id: "css-preview",
      category: "Population distribution",
      title: "Gene Co-Variation Variogram Comparator",
      description: "Compare per-pair gene variograms between two cell populations. The result focuses on whether gene pairs vary together, which marginal means alone cannot establish.",
      schema: "Wide CSV columns: population (true or predicted), then numeric gene columns. Use up to 40 genes and a modest number of cells per population.",
      example: "population,gA,gB,gC,gD\ntrue,0.2,0.3,1.8,2.0\ntrue,0.4,0.5,1.5,1.7\ntrue,1.1,1.0,0.8,0.7\ntrue,1.3,1.2,0.6,0.5\ntrue,0.8,0.9,1.0,1.1\npredicted,0.2,1.7,0.3,1.9\npredicted,0.4,1.5,0.5,1.6\npredicted,1.1,0.7,1.0,0.8\npredicted,1.3,0.6,1.2,0.5\npredicted,0.8,1.0,0.9,1.1",
      caveat: "For each gene pair this uses the mean square-root absolute difference across cells, then reports the mean squared difference between populations over all supplied pairs. The official CSS samples 20,000 gene pairs from the complete panel; this exact small-table comparison is an explanatory diagnostic.",
      run: cssPreview
    },
    {
      id: "pss-preview",
      category: "Perturbation response",
      title: "PSS Perturbation Severity Calculator",
      description: "Estimate the zero-intercept slope of predicted versus observed perturbation deltas on a supplied truth DE set, check explained variance, and report the gated log-slope.",
      schema: "CSV columns: gene, true_delta, predicted_delta. Each row should be a gene in the truth-defined DE set.",
      example: "gene,true_delta,predicted_delta\ngA,1.0,1.1\ngB,0.8,0.9\ngC,-0.7,-0.8\ngD,0.4,0.5\ngE,-0.5,-0.4\ngF,0.9,1.0\ngG,-0.9,-0.8",
      caveat: "The official PSS is zero when the fitted slope is non-positive or the fit explains at most 1% of variance, and otherwise is log(beta). This page is limited to the supplied truth DE list and does not call DE genes from cell-level data.",
      run: pssPreview
    },
    {
      id: "tsr-preview",
      category: "Tissue geometry",
      title: "Tissue Scale Ratio (TSR) Calculator",
      description: "Compute each point cloud's RMS radius about its centroid and the signed logarithm of predicted-to-true radius. The output isolates scale from shape.",
      schema: "CSV columns: cloud (true or predicted), x, y, z. Use at least two points per cloud in a common physical unit.",
      example: "cloud,x,y,z\ntrue,-1,0,0\ntrue,1,0,0\ntrue,0,-1,0\ntrue,0,1,0\ntrue,0,0,-1\ntrue,0,0,1\npredicted,-1.2,0,0\npredicted,1.2,0,0\npredicted,0,-1.2,0\npredicted,0,1.2,0\npredicted,0,0,-1.2\npredicted,0,0,1.2",
      caveat: "Positive log ratio means the prediction is too large; negative means too small. This does not assess shape. The official task has board-specific reference handling and the published scorer should be consulted for exact evaluation.",
      run: tsrPreview
    },
    {
      id: "sdd-preview",
      category: "Tissue geometry",
      title: "Shape Distance Distribution Comparator",
      description: "Normalize within-cloud pair distances by each cloud's RMS radius and compare the two empirical distributions with an approximate one-dimensional Wasserstein distance.",
      schema: "CSV columns: cloud (true or predicted), x, y, z. Use up to 600 points per cloud. Cross-cloud point correspondence is not required.",
      example: "cloud,x,y,z\ntrue,-1,0,0\ntrue,1,0,0\ntrue,0,-1,0\ntrue,0,1,0\ntrue,0,0,-1\ntrue,0,0,1\ntrue,0.6,0.6,0.6\ntrue,-0.6,-0.6,-0.6\npredicted,-1,0,0\npredicted,1,0,0\npredicted,0,-1,0\npredicted,0,1,0\npredicted,0,0,-1\npredicted,0,0,1\npredicted,0.6,0.6,0.6\npredicted,-0.6,-0.6,-0.6",
      caveat: "This descriptor is invariant to translation, rotation, and uniform size because it uses distances within each cloud normalized by its RMS radius. The Wasserstein calculation is a quantile-grid approximation; the official scorer samples 200,000 pairs per cloud.",
      run: sddPreview
    },
    {
      id: "ods-preview",
      category: "Tissue geometry",
      title: "Canonicalized Occupancy Dice Explorer",
      description: "Center and PCA-align two point clouds, scale each to unit RMS radius, voxelize them on the published 16-cubed grid, and compare occupied-voxel sets over proper PCA sign flips.",
      schema: "CSV columns: cloud (true or predicted), x, y, z. Use at least four non-degenerate 3D points per cloud and up to 2,000 points.",
      example: "cloud,x,y,z\ntrue,-1,0,0\ntrue,1,0,0\ntrue,0,-1,0\ntrue,0,1,0\ntrue,0,0,-1\ntrue,0,0,1\ntrue,0.6,0.6,0.6\ntrue,-0.6,-0.6,-0.6\npredicted,-1.1,0,0\npredicted,1.1,0,0\npredicted,0,-1.1,0\npredicted,0,1.1,0\npredicted,0,0,-1.1\npredicted,0,0,1.1\npredicted,0.66,0.66,0.66\npredicted,-0.66,-0.66,-0.66",
      caveat: "This visual diagnostic follows the published canonicalization and grid idea, but it is not the official ODS scorer. It reports the voxel-edge to true median-nearest-neighbor-spacing ratio; interpret Dice cautiously when that ratio is near or below 10. Laterality is not resolved by the official shape terms.",
      run: odsPreview
    },
    {
      id: "nfs-preview",
      category: "Local spatial organization",
      title: "Neighborhood Fidelity Profile Comparator",
      description: "For each point, average expression over its 15 nearest spatial neighbors, then compare the distributions of those local profiles with multi-bandwidth MMD.",
      schema: "CSV columns: cell_id, cloud (true or predicted), x, y, z, then 1–8 numeric gene columns. Each cloud needs at least 16 cells; up to 200 cells per cloud.",
      example: nfsExample(),
      caveat: "This is a small-data explanation of the NFS construction. It does not use the official 500-gene panel, frozen preprocessing, target sample, or exact scorer pipeline, and it does not assume cell-to-cell correspondence.",
      run: nfsPreview
    }
  ];

  function parseCSV(text) {
    const rows = [];
    let row = [], cell = "", quoted = false;
    const source = String(text || "").replace(/^\uFEFF/, "");
    for (let i = 0; i < source.length; i++) {
      const ch = source[i];
      if (quoted) {
        if (ch === '"' && source[i + 1] === '"') { cell += '"'; i++; }
        else if (ch === '"') quoted = false;
        else cell += ch;
      } else if (ch === '"') quoted = true;
      else if (ch === ",") { row.push(cell); cell = ""; }
      else if (ch === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
      else cell += ch;
    }
    row.push(cell.replace(/\r$/, "")); rows.push(row);
    const nonblank = rows.filter((r) => r.some((v) => String(v).trim() !== ""));
    if (nonblank.length < 2) throw new Error("Paste a header row and at least one data row.");
    const headers = nonblank[0].map((h) => String(h).trim());
    if (headers.some((h) => !h)) throw new Error("Every column needs a non-empty header.");
    if (new Set(headers).size !== headers.length) throw new Error("Column headers must be unique.");
    const records = nonblank.slice(1).map((values, i) => {
      if (values.length !== headers.length) throw new Error("CSV row " + (i + 2) + " has " + values.length + " cells; expected " + headers.length + ".");
      const item = {};
      headers.forEach((h, j) => { item[h] = String(values[j]).trim(); });
      return item;
    });
    return { headers, rows: records };
  }
  function requireColumns(data, columns) {
    const absent = columns.filter((c) => !data.headers.includes(c));
    if (absent.length) throw new Error("Missing required column(s): " + absent.join(", ") + ".");
  }
  function number(row, name, index) {
    const value = Number(row[name]);
    if (row[name] === "" || !Number.isFinite(value)) throw new Error("Row " + (index + 2) + " has a missing or non-finite number in " + name + ".");
    return value;
  }
  function mean(xs) { return xs.length ? xs.reduce((s, x) => s + x, 0) / xs.length : NaN; }
  function variance(xs) { const m = mean(xs); return xs.length ? xs.reduce((s, x) => s + (x - m) ** 2, 0) / xs.length : NaN; }
  function fmt(x, digits) { return Number.isFinite(x) ? x.toFixed(digits === undefined ? 4 : digits) : "undefined"; }
  function tableResult(summary, headers, rows, note) { return { summary, headers, rows, note }; }
  function finiteRows(data, columns) {
    return data.rows.map((row, i) => columns.map((column) => number(row, column, i)));
  }
  function skillValue(raw, floor, ceiling, direction) {
    if (![raw, floor, ceiling].every(Number.isFinite)) return 0;
    let x = raw, f = floor, c = ceiling, mode = direction;
    if (mode === "absolute") { x = Math.abs(raw); f = Math.abs(floor); c = Math.abs(ceiling); mode = "lower"; }
    const df = mode === "higher" ? c - f : f - c;
    const d = mode === "higher" ? c - x : x - c;
    if (df <= 0) throw new Error("For each metric, the floor must be worse than the ceiling in the selected direction.");
    if (d <= 0) return 1;
    return df / (df + d);
  }
  function skillRows(data) {
    requireColumns(data, ["metric", "raw", "floor", "ceiling", "direction"]);
    const rows = data.rows.map((r, i) => {
      const direction = r.direction.toLowerCase();
      if (!["higher", "lower", "absolute"].includes(direction)) throw new Error("Row " + (i + 2) + " direction must be higher, lower, or absolute.");
      const raw = number(r, "raw", i), floor = number(r, "floor", i), ceiling = number(r, "ceiling", i);
      return [r.metric, direction, fmt(raw), fmt(floor), fmt(ceiling), fmt(skillValue(raw, floor, ceiling, direction))];
    });
    return tableResult("Calculated " + rows.length + " per-metric skill value(s). A raw value at the floor maps to 0.5, the ceiling or better maps to 1, and progressively worse values approach 0.", ["Metric", "Direction", "Raw value", "Floor", "Ceiling", "Skill"], rows);
  }
  function weightAudit(data) {
    requireColumns(data, ["group", "metric", "group_weight", "metric_weight"]);
    const groups = new Map(), seenMetrics = new Set();
    data.rows.forEach((r, i) => {
      const gw = number(r, "group_weight", i), mw = number(r, "metric_weight", i);
      if (gw < 0 || gw > 1 || mw < 0 || mw > 1) throw new Error("Weights must be between 0 and 1.");
      const key = r.group + "\u0000" + r.metric;
      if (seenMetrics.has(key)) throw new Error("Metric appears twice in group " + r.group + ": " + r.metric + ".");
      seenMetrics.add(key);
      if (!groups.has(r.group)) groups.set(r.group, { groupWeight: gw, metricWeights: [] });
      const item = groups.get(r.group);
      if (Math.abs(item.groupWeight - gw) > 1e-9) throw new Error("Group weight is inconsistent within " + r.group + ".");
      item.metricWeights.push(mw);
    });
    const totalGroup = Array.from(groups.values()).reduce((s, g) => s + g.groupWeight, 0);
    const rows = Array.from(groups.entries()).map(([name, g]) => [name, fmt(g.groupWeight), fmt(g.metricWeights.reduce((a, b) => a + b, 0)), g.metricWeights.length]);
    rows.push(["TOTAL GROUP WEIGHT", fmt(totalGroup), "—", groups.size]);
    return tableResult(Math.abs(totalGroup - 1) < 1e-6 && Array.from(groups.values()).every(g => Math.abs(g.metricWeights.reduce((a,b)=>a+b,0)-1)<1e-6) ? "All group weights and within-group metric weights sum to 1 within tolerance." : "One or more weight budgets do not sum to 1. Review the group and within-group totals.", ["Group", "Group weight", "Within-group metric weight sum", "Metric count"], rows);
  }
  function taskScore(data) {
    requireColumns(data, ["group", "metric", "skill", "group_weight", "metric_weight"]);
    const groups = new Map();
    data.rows.forEach((r, i) => {
      const gw = number(r, "group_weight", i), mw = number(r, "metric_weight", i);
      const rawSkill = r.skill === "" || /^na$/i.test(r.skill) ? 0 : Number(r.skill);
      const skill = Number.isFinite(rawSkill) ? Math.max(0, Math.min(1, rawSkill)) : 0;
      if (gw < 0 || gw > 1 || mw < 0 || mw > 1) throw new Error("Weights must be between 0 and 1.");
      if (!groups.has(r.group)) groups.set(r.group, { weight: gw, terms: [] });
      const group = groups.get(r.group);
      if (Math.abs(group.weight - gw) > 1e-9) throw new Error("Group weight is inconsistent within " + r.group + ".");
      group.terms.push({ metric: r.metric, skill, weight: mw });
    });
    const groupTotal = Array.from(groups.values()).reduce((s, g) => s + g.weight, 0);
    if (Math.abs(groupTotal - 1) > 1e-5) throw new Error("Group weights sum to " + fmt(groupTotal) + "; they must sum to 1.");
    const rows = [];
    let score = 0;
    for (const [name, g] of groups) {
      const metricTotal = g.terms.reduce((s, t) => s + t.weight, 0);
      if (Math.abs(metricTotal - 1) > 1e-5) throw new Error("Metric weights in " + name + " sum to " + fmt(metricTotal) + "; they must sum to 1.");
      const groupSkill = g.terms.reduce((s, t) => s + t.skill * t.weight, 0);
      const contribution = groupSkill * g.weight * 100;
      score += contribution;
      rows.push([name, fmt(g.weight), fmt(groupSkill), fmt(contribution)]);
    }
    rows.push(["TASK SCORE", "1.0000", fmt(score / 100), fmt(score)]);
    return tableResult("Reconciled task score: " + fmt(score, 2) + " / 100. The calculation keeps group weights separate from metric weights and includes every supplied row.", ["Group", "Group weight", "Weighted group skill", "Points contributed"], rows);
  }
  function overlapFor(predicted, truthUp, truthDown, upN, downN) {
    const order = predicted.map((score, i) => ({ score, i })).sort((a,b) => b.score-a.score || a.i-b.i);
    const up = new Set(order.slice(0, upN).map(x => x.i));
    const down = new Set(order.slice(Math.max(0, order.length-downN)).map(x => x.i));
    let hit = 0;
    truthUp.forEach(i => { if (up.has(i)) hit++; });
    truthDown.forEach(i => { if (down.has(i)) hit++; });
    return hit / Math.max(1, upN + downN);
  }
  function desPreview(data) {
    requireColumns(data, ["gene", "truth_direction", "predicted_delta", "reference"]);
    const truthUp = [], truthDown = [], pred = [], ref = [];
    data.rows.forEach((r,i) => {
      if (!r.gene) throw new Error("Gene identifiers cannot be blank.");
      const direction = r.truth_direction.toLowerCase();
      if (direction !== "up" && direction !== "down") throw new Error("Row " + (i+2) + " truth_direction must be up or down.");
      (direction === "up" ? truthUp : truthDown).push(i);
      pred.push(number(r,"predicted_delta",i)); ref.push(number(r,"reference",i));
    });
    const upN=truthUp.length, downN=truthDown.length;
    const observed=overlapFor(pred,truthUp,truthDown,upN,downN);
    const nullUp=overlapFor(ref,truthUp,truthDown,upN,downN);
    const nullDown=overlapFor(ref.map(x=>-x),truthUp,truthDown,upN,downN);
    const chance=Math.max(nullUp,nullDown);
    const des=chance>=1?0:(observed-chance)/(1-chance);
    const rows=[
      ["Prediction",fmt(observed),fmt(des)],
      ["Reference-only null (+reference)",fmt(nullUp),"—"],
      ["Reference-only null (−reference)",fmt(nullDown),"—"],
      ["Measured chance baseline",fmt(chance),"—"],
      ["Truth set size",String(upN+downN),"—"]
    ];
    return tableResult("Signed overlap = " + fmt(observed) + "; measured null = " + fmt(chance) + "; chance-adjusted DES preview = " + fmt(des) + ".",["Comparison","Signed overlap","Adjusted preview"],rows);
  }
  function ranks(xs) {
    const sorted=xs.map((value,index)=>({value,index})).sort((a,b)=>a.value-b.value), result=Array(xs.length);
    for(let i=0;i<sorted.length;){let j=i+1;while(j<sorted.length&&sorted[j].value===sorted[i].value)j++;const rank=((i+1)+j)/2;for(let k=i;k<j;k++)result[sorted[k].index]=rank;i=j;}
    return result;
  }
  function pearson(a,b) {
    const ma=mean(a),mb=mean(b),da=a.reduce((s,x)=>s+(x-ma)**2,0),db=b.reduce((s,x)=>s+(x-mb)**2,0);
    return da&&db?a.reduce((s,x,i)=>s+(x-ma)*(b[i]-mb),0)/Math.sqrt(da*db):NaN;
  }
  function dcsPreview(data) {
    requireColumns(data,["gene","reference","true_delta","predicted_delta"]);
    const reference=[],truth=[],pred=[];
    data.rows.forEach((r,i)=>{reference.push(number(r,"reference",i));truth.push(number(r,"true_delta",i));pred.push(number(r,"predicted_delta",i));});
    if(reference.length<3)throw new Error("Use at least three genes.");
    const rr=ranks(reference),rt=ranks(truth),rp=ranks(pred),rpt=pearson(rp,rt),rpr=pearson(rp,rr),rtr=pearson(rt,rr);
    const denominator=Math.sqrt(Math.max(0,(1-rpr*rpr)*(1-rtr*rtr)));
    const partial=denominator>1e-12?(rpt-rpr*rtr)/denominator:0;
    return tableResult("Partial rank concordance = " + fmt(partial) + ". Plain predicted-versus-true rank correlation is " + fmt(rpt) + "; the calculation controls for the reference-expression rank.",["Rank relationship","Value"],[["Predicted change vs true change",fmt(rpt)],["Predicted change vs reference",fmt(rpr)],["True change vs reference",fmt(rtr)],["Partial concordance",fmt(partial)]]);
  }
  function sqDistance(a,b) { let s=0; for(let i=0;i<a.length;i++)s+=(a[i]-b[i])**2; return s; }
  function median(xs) { if(!xs.length)return 0; const a=xs.slice().sort((x,y)=>x-y),m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2; }
  function mmdValues(a,b) {
    if(a.length<2||b.length<2)throw new Error("Each population needs at least two rows.");
    const within=[];for(let i=0;i<a.length;i++)for(let j=i+1;j<a.length;j++)within.push(sqDistance(a[i],a[j]));
    const med=median(within.filter(x=>x>0));if(!med)throw new Error("The true population has no non-zero pairwise distance.");
    const gamma0=1/(2*med),scales=[0.25,0.5,1,2,4],results=[];
    for(const scale of scales){
      const gamma=gamma0*scale;
      let aa=0,bb=0,ab=0;
      for(let i=0;i<a.length;i++)for(let j=0;j<a.length;j++)if(i!==j)aa+=Math.exp(-gamma*sqDistance(a[i],a[j]));
      for(let i=0;i<b.length;i++)for(let j=0;j<b.length;j++)if(i!==j)bb+=Math.exp(-gamma*sqDistance(b[i],b[j]));
      for(const x of a)for(const y of b)ab+=Math.exp(-gamma*sqDistance(x,y));
      const value=aa/(a.length*(a.length-1))+bb/(b.length*(b.length-1))-2*ab/(a.length*b.length);
      results.push([scale,gamma,value]);
    }
    return {gamma0,results,average:mean(results.map(x=>x[2]))};
  }
  function mmdPreview(data) {
    if(data.rows.length>400)throw new Error("Keep this small-table calculator to at most 400 total rows.");
    const featureColumns=data.headers.filter(h=>h!=="population");
    if(!featureColumns.length)throw new Error("Add at least one numeric feature column.");
    const a=[],b=[];
    data.rows.forEach((r,i)=>{const v=featureColumns.map(c=>number(r,c,i));if(r.population.toLowerCase()==="true")a.push(v);else if(r.population.toLowerCase()==="predicted")b.push(v);else throw new Error("population must be true or predicted.");});
    const result=mmdValues(a,b);
    return tableResult("Unbiased multi-bandwidth MMD² average = " + fmt(result.average) + ". Median-heuristic γ₀ = " + fmt(result.gamma0) + "; negative finite-sample estimates are possible.",["Bandwidth multiplier","γ","Unbiased MMD²"],result.results.map(r=>[String(r[0]),fmt(r[1]),fmt(r[2])]));
  }
  function cssPreview(data) {
    requireColumns(data,["population"]);
    const genes=data.headers.filter(h=>h!=="population");
    if(genes.length<2||genes.length>40)throw new Error("Use 2–40 gene columns.");
    const groups={true:[],predicted:[]};
    data.rows.forEach((r,i)=>{const g=r.population.toLowerCase();if(!groups[g])throw new Error("population must be true or predicted.");groups[g].push(genes.map(c=>number(r,c,i)));});
    if(groups.true.length<2||groups.predicted.length<2)throw new Error("Each population needs at least two cells.");
    const pairRows=[];let total=0;
    for(let a=0;a<genes.length;a++)for(let b=a+1;b<genes.length;b++){
      const variogram=(mat)=>mean(mat.map(row=>Math.sqrt(Math.abs(row[a]-row[b]))));
      const vt=variogram(groups.true),vp=variogram(groups.predicted),delta=vp-vt,sq=delta*delta;total+=sq;
      pairRows.push([genes[a],genes[b],fmt(vt),fmt(vp),fmt(sq)]);
    }
    pairRows.sort((a,b)=>Number(b[4])-Number(a[4]));
    return tableResult("Small-panel CSS analogue (mean squared variogram difference) = " + fmt(total/pairRows.length) + " across " + pairRows.length + " gene pairs. The largest mismatches are listed first.",["Gene 1","Gene 2","True variogram","Predicted variogram","Squared difference"],pairRows.slice(0,30));
  }
  function pssPreview(data) {
    requireColumns(data,["gene","true_delta","predicted_delta"]);
    const t=[],p=[];data.rows.forEach((r,i)=>{t.push(number(r,"true_delta",i));p.push(number(r,"predicted_delta",i));});
    const denom=t.reduce((s,x)=>s+x*x,0);if(!denom)throw new Error("True deltas are all zero.");
    const beta=t.reduce((s,x,i)=>s+x*p[i],0)/denom,mp=mean(p),sst=p.reduce((s,x)=>s+(x-mp)**2,0),sse=p.reduce((s,x,i)=>s+(x-beta*t[i])**2,0),r2=sst?sse===0?1:1-sse/sst:0;
    const valid=beta>0&&r2>0.01,pss=valid?Math.log(beta):NaN;
    return tableResult(valid?"PSS = log(β) = " + fmt(pss) + "; β = " + fmt(beta) + ", R² = " + fmt(r2) + ".":"PSS is undefined under the published gate: β must be positive and the zero-intercept fit must explain more than 1% of predicted-delta variance. β = " + fmt(beta) + "; R² = " + fmt(r2) + ".",["Quantity","Value"],[["Zero-intercept slope β",fmt(beta)],["Explained variance R²",fmt(r2)],["PSS log(β)",fmt(pss)]]);
  }
  function cloudsFromRows(data,columns) {
    requireColumns(data,["cloud"].concat(columns));
    const groups={true:[],predicted:[]};
    data.rows.forEach((r,i)=>{const g=r.cloud.toLowerCase();if(!groups[g])throw new Error("cloud must be true or predicted.");groups[g].push(columns.map(c=>number(r,c,i)));});
    if(groups.true.length<2||groups.predicted.length<2)throw new Error("Each cloud needs at least two points.");
    return groups;
  }
  function rmsRadius(points) {
    const center=[0,1,2].map(k=>mean(points.map(p=>p[k])));
    return Math.sqrt(mean(points.map(p=>sqDistance(p,center))));
  }
  function tsrPreview(data) {
    const c=cloudsFromRows(data,["x","y","z"]),rt=rmsRadius(c.true),rp=rmsRadius(c.predicted);
    if(rt<=0||rp<=0)throw new Error("Both clouds need non-zero spread.");
    const value=Math.log(rp/rt);
    return tableResult("TSR = log(RMS radius predicted / true) = " + fmt(value) + ". The predicted RMS radius is " + fmt(rp) + " and the true RMS radius is " + fmt(rt) + ".",["Cloud","RMS radius"],[["True",fmt(rt)],["Predicted",fmt(rp)],["Signed log ratio",fmt(value)]]);
  }
  function normalizedPairDistances(points) {
    const radius=rmsRadius(points);if(radius<=0)throw new Error("A cloud has zero spatial spread.");
    const out=[];for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++)out.push(Math.sqrt(sqDistance(points[i],points[j]))/radius);
    return out.sort((a,b)=>a-b);
  }
  function quantile(sorted,p) {
    if(!sorted.length)return NaN;const pos=(sorted.length-1)*p,lo=Math.floor(pos),hi=Math.ceil(pos),f=pos-lo;return sorted[lo]*(1-f)+sorted[hi]*f;
  }
  function sddPreview(data) {
    const c=cloudsFromRows(data,["x","y","z"]);
    if(c.true.length>600||c.predicted.length>600)throw new Error("Use at most 600 points in each cloud.");
    const a=normalizedPairDistances(c.true),b=normalizedPairDistances(c.predicted),n=1000;
    const w1=mean(Array.from({length:n},(_,i)=>Math.abs(quantile(a,(i+0.5)/n)-quantile(b,(i+0.5)/n))));
    return tableResult("Approximate normalized pair-distance Wasserstein-1 = " + fmt(w1) + ". Each cloud is normalized by its own RMS radius, so the comparison describes form rather than physical scale.",["Cloud","Points","Pair distances","RMS radius"],[["True",c.true.length,a.length,fmt(rmsRadius(c.true))],["Predicted",c.predicted.length,b.length,fmt(rmsRadius(c.predicted))],["Approximate W₁", "—","1,000 quantile comparisons",fmt(w1)]]);
  }
  function identity3(){return [[1,0,0],[0,1,0],[0,0,1]];}
  function eigen3(points) {
    const center=[0,1,2].map(k=>mean(points.map(p=>p[k]))),cov=[[0,0,0],[0,0,0],[0,0,0]];
    points.forEach(p=>{for(let i=0;i<3;i++)for(let j=0;j<3;j++)cov[i][j]+=(p[i]-center[i])*(p[j]-center[j])/points.length;});
    const v=identity3();
    for(let iter=0;iter<40;iter++){
      let p=0,q=1;if(Math.abs(cov[0][2])>Math.abs(cov[p][q])){p=0;q=2;}if(Math.abs(cov[1][2])>Math.abs(cov[p][q])){p=1;q=2;}
      if(Math.abs(cov[p][q])<1e-12)break;
      const angle=0.5*Math.atan2(2*cov[p][q],cov[q][q]-cov[p][p]),c=Math.cos(angle),s=Math.sin(angle);
      const app=c*c*cov[p][p]-2*s*c*cov[p][q]+s*s*cov[q][q],aqq=s*s*cov[p][p]+2*s*c*cov[p][q]+c*c*cov[q][q];
      for(let k=0;k<3;k++)if(k!==p&&k!==q){const akp=c*cov[k][p]-s*cov[k][q],akq=s*cov[k][p]+c*cov[k][q];cov[k][p]=cov[p][k]=akp;cov[k][q]=cov[q][k]=akq;}
      cov[p][p]=app;cov[q][q]=aqq;cov[p][q]=cov[q][p]=0;
      for(let k=0;k<3;k++){const vkp=c*v[k][p]-s*v[k][q],vkq=s*v[k][p]+c*v[k][q];v[k][p]=vkp;v[k][q]=vkq;}
    }
    const order=[0,1,2].sort((a,b)=>cov[b][b]-cov[a][a]);
    const axes=order.map(k=>[v[0][k],v[1][k],v[2][k]]);
    return {center,axes,eigenvalues:order.map(k=>cov[k][k])};
  }
  function canonical(points) {
    const eig=eigen3(points),centered=points.map(p=>p.map((x,i)=>x-eig.center[i]));
    const rotated=centered.map(p=>eig.axes.map(axis=>p.reduce((s,x,i)=>s+x*axis[i],0)));
    const r=Math.sqrt(mean(rotated.map(p=>p.reduce((s,x)=>s+x*x,0))));
    if(r<=1e-12)throw new Error("A cloud has zero spatial spread.");
    return rotated.map(p=>p.map(x=>x/r));
  }
  function voxelSet(points,signs) {
    const out=new Set();
    points.forEach(p=>{
      const q=p.map((x,i)=>x*signs[i]);
      const bins=q.map(x=>Math.max(0,Math.min(15,Math.floor((x+3)/6*16))));
      out.add(bins.join(","));
    });
    return out;
  }
  function occupancyDice(a,b) {
    let overlap=0;for(const x of a)if(b.has(x))overlap++;
    return a.size+b.size?2*overlap/(a.size+b.size):0;
  }
  function medianNearest(points) {
    const ds=points.map((p,i)=>{let best=Infinity;points.forEach((q,j)=>{if(i!==j)best=Math.min(best,Math.sqrt(sqDistance(p,q)));});return best;});
    return median(ds);
  }
  function odsPreview(data) {
    const c=cloudsFromRows(data,["x","y","z"]);if(c.true.length<4||c.predicted.length<4)throw new Error("Use at least four points in each cloud.");if(c.true.length>2000||c.predicted.length>2000)throw new Error("Use at most 2,000 points per cloud for this browser-local preview.");
    const a=canonical(c.true),b=canonical(c.predicted),flips=[[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]];
    let best=0;flips.forEach(signs=>{best=Math.max(best,occupancyDice(voxelSet(a,signs),voxelSet(b,[1,1,1])));});
    const ratio=(6/16)/medianNearest(c.true);
    return tableResult("Best proper PCA sign-flip occupancy Dice = " + fmt(best) + ". Voxel edge / true median nearest-neighbor spacing = " + fmt(ratio) + ".",["Quantity","Value"],[["True occupied voxels",voxelSet(a,[1,1,1]).size],["Predicted occupied voxels",voxelSet(b,[1,1,1]).size],["Best Dice",fmt(best)],["Voxel-edge / spacing ratio",fmt(ratio)]]);
  }
  function nfsExample() {
    const lines=["cell_id,cloud,x,y,z,gA,gB"];
    for(const cloud of ["true","predicted"])for(let i=0;i<18;i++){
      const angle=2*Math.PI*i/18,rad=1+(i%3)*0.05,shift=cloud==="predicted"?0.12:0;
      const x=rad*Math.cos(angle)+shift,y=rad*Math.sin(angle),z=(i%4)*0.08;
      const gA=1+Math.cos(angle)+(cloud==="predicted"?0.08*Math.sin(2*angle):0);
      const gB=1+Math.sin(angle)+(cloud==="predicted"?0.06*Math.cos(2*angle):0);
      lines.push(cloud+"_"+i+","+cloud+","+x.toFixed(3)+","+y.toFixed(3)+","+z.toFixed(3)+","+gA.toFixed(3)+","+gB.toFixed(3));
    }
    return lines.join("\n");
  }
  function nfsPreview(data) {
    const genes=data.headers.filter(h=>!["cell_id","cloud","x","y","z"].includes(h));
    if(genes.length<1||genes.length>8)throw new Error("Use 1–8 expression columns.");
    const groups={true:[],predicted:[]};
    data.rows.forEach((r,i)=>{
      const g=r.cloud.toLowerCase();if(!groups[g])throw new Error("cloud must be true or predicted.");
      const coords=["x","y","z"].map(c=>number(r,c,i)),expression=genes.map(c=>number(r,c,i));
      groups[g].push({id:r.cell_id,coords,expression});
    });
    if(groups.true.length<16||groups.predicted.length<16)throw new Error("Each cloud needs at least 16 cells to define 15 other neighbors.");
    if(groups.true.length>200||groups.predicted.length>200)throw new Error("Use at most 200 cells per cloud for this local preview.");
    const profiles={true:[],predicted:[]};
    for(const name of ["true","predicted"]){
      const cells=groups[name];
      cells.forEach((cell,i)=>{
        const nearest=cells.map((other,j)=>({j,d:sqDistance(cell.coords,other.coords)})).filter(x=>x.j!==i).sort((a,b)=>a.d-b.d).slice(0,15);
        profiles[name].push(genes.map((_,g)=>mean(nearest.map(x=>cells[x.j].expression[g]))));
      });
    }
    const result=mmdValues(profiles.true,profiles.predicted);
    return tableResult("Neighborhood-profile MMD² average = " + fmt(result.average) + " across five bandwidths. Each row describes the mean expression of that cell's 15 closest spatial neighbors.",["Bandwidth multiplier","γ","Unbiased MMD²"],result.results.map(r=>[String(r[0]),fmt(r[1]),fmt(r[2])]));
  }

  const list=$("tool-list"),search=$("tool-search"),panel=$("tool-panel"),welcome=$("welcome"),dataInput=$("tool-data"),status=$("tool-status"),resultBox=$("tool-result");
  let selected=null,lastReport="";
  function buttonFor(tool) {
    const button=document.createElement("button");button.type="button";button.className="tool-pick";button.dataset.tool=tool.id;
    const strong=document.createElement("strong");strong.textContent=tool.title;
    const span=document.createElement("span");span.textContent=tool.category;
    button.append(strong,span);button.addEventListener("click",()=>selectTool(tool.id));return button;
  }
  function renderList(query) {
    list.replaceChildren();const q=String(query||"").trim().toLowerCase();
    tools.filter(t=>!q||(t.title+" "+t.category+" "+t.description).toLowerCase().includes(q)).forEach(t=>list.append(buttonFor(t)));
    if(selected)list.querySelectorAll("[data-tool]").forEach(b=>{if(b.dataset.tool===selected.id)b.setAttribute("aria-current","true");});
  }
  function clearResult() { resultBox.replaceChildren();lastReport="";$("download").disabled=true; }
  function selectTool(id) {
    const tool=tools.find(t=>t.id===id);if(!tool)return;
    selected=tool;welcome.hidden=true;panel.hidden=false;
    $("tool-category").textContent=tool.category;
    $("tool-title").textContent=tool.title;
    $("tool-description").textContent=tool.description;
    $("tool-schema").textContent=tool.schema;
    $("tool-caveat").textContent=tool.caveat;
    dataInput.value="";
    status.textContent="Load the example or paste a small table to begin.";
    clearResult();renderList(search.value);
    const url=new URL(location.href);url.searchParams.set("tool",tool.id);history.replaceState(null,"",url);
  }
  function addText(tag,className,text) { const el=document.createElement(tag);if(className)el.className=className;el.textContent=text;return el; }
  function renderTable(headers,rows) {
    const wrap=document.createElement("div");wrap.className="metric-table-wrap";
    const table=document.createElement("table");table.className="metric-table";
    const thead=document.createElement("thead"),tr=document.createElement("tr");
    headers.forEach(h=>tr.append(addText("th","",h)));thead.append(tr);
    const tbody=document.createElement("tbody");
    rows.forEach(row=>{const r=document.createElement("tr");row.forEach(cell=>r.append(addText("td","",String(cell))));tbody.append(r);});
    table.append(thead,tbody);wrap.append(table);return wrap;
  }
  function run() {
    if(!selected)return;
    clearResult();status.textContent="Calculating locally…";
    try {
      const data=parseCSV(dataInput.value),out=selected.run(data);
      resultBox.append(addText("p","metric-summary",out.summary));
      if(out.headers&&out.rows)resultBox.append(renderTable(out.headers,out.rows));
      if(out.note)resultBox.append(addText("p","metric-note",out.note));
      lastReport=[selected.title,out.summary,"",out.headers?out.headers.join("\t"):"",...(out.rows||[]).map(r=>r.join("\t")),selected.caveat].join("\n");
      $("download").disabled=false;status.textContent="Done. The input was processed in this browser tab.";
    } catch(error) {
      resultBox.append(addText("p","metric-error",error.message||String(error)));
      status.textContent="Could not calculate. Review the schema and error message.";
    }
  }
  $("load-example").addEventListener("click",()=>{if(selected){dataInput.value=selected.example;status.textContent="Synthetic example loaded. Select Calculate to inspect the result.";clearResult();}});
  $("analyze").addEventListener("click",run);
  $("clear").addEventListener("click",()=>{dataInput.value="";clearResult();status.textContent="Input cleared from this page.";});
  $("download").addEventListener("click",()=>{if(!lastReport)return;const blob=new Blob([lastReport],{type:"text/plain;charset=utf-8"}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=(selected.id||"metric-report")+".txt";a.click();URL.revokeObjectURL(url);});
  search.addEventListener("input",()=>renderList(search.value));
  renderList("");
  const requested=new URLSearchParams(location.search).get("tool");
  if(requested&&tools.some(t=>t.id===requested))selectTool(requested);
})();
