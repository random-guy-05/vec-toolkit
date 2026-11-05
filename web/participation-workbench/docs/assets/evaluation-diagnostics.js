(function () {
  "use strict";
  const $ = (id) => document.getElementById(id);
  const round = (x) => Number.isFinite(x) ? Number(x.toFixed(5)) : "NA";
  const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length;
  const variance = (xs, m = mean(xs), sample = true) => xs.reduce((s, x) => s + (x - m) ** 2, 0) / Math.max(1, xs.length - (sample ? 1 : 0));
  const quantile = (xs, p) => { const a = xs.slice().sort((x, y) => x - y), h = (a.length - 1) * p, i = Math.floor(h), f = h - i; return a[i] + (a[Math.min(i + 1, a.length - 1)] - a[i]) * f; };
  function parseCSV(text) {
    const matrix = []; let row = [], cell = "", quoted = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (quoted) { if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; } else if (c === '"') quoted = false; else cell += c; }
      else if (c === '"') quoted = true;
      else if (c === ",") { row.push(cell); cell = ""; }
      else if (c === "\n" || c === "\r") { row.push(cell); cell = ""; if (row.some((v) => v.trim() !== "")) matrix.push(row); row = []; if (c === "\r" && text[i + 1] === "\n") i++; }
      else cell += c;
    }
    row.push(cell); if (row.some((v) => v.trim() !== "")) matrix.push(row);
    if (quoted) throw new Error("A quoted CSV field is not closed.");
    if (matrix.length < 2) throw new Error("Add a header row and at least two paired measurements.");
    const headers = matrix.shift().map((x) => x.trim());
    if (headers.some((x) => !x)) throw new Error("Column names cannot be blank.");
    if (new Set(headers).size !== headers.length) throw new Error("Column names must be unique.");
    return matrix.map((r, i) => {
      if (r.length !== headers.length) throw new Error("Row " + (i + 2) + " has " + r.length + " fields; expected " + headers.length + ".");
      return Object.fromEntries(headers.map((h, j) => [h, r[j].trim()]));
    });
  }
  function pairs(rows) {
    if (!rows.every((r) => "reference" in r && "predicted" in r)) throw new Error("CSV must include columns named reference and predicted.");
    const out = rows.map((r, i) => {
      const x = Number(r.reference), y = Number(r.predicted);
      if (!Number.isFinite(x) || !Number.isFinite(y)) throw new Error("Reference and predicted values must be finite numbers (row " + (i + 2) + ").");
      return { reference: x, predicted: y, error: y - x, row: i + 2 };
    });
    if (out.length < 2) throw new Error("At least two paired observations are required.");
    return out;
  }
  function correlation(a, b) {
    const ma = mean(a), mb = mean(b), cov = a.reduce((s, x, i) => s + (x - ma) * (b[i] - mb), 0) / (a.length - 1), va = variance(a, ma), vb = variance(b, mb);
    return va > 0 && vb > 0 ? cov / Math.sqrt(va * vb) : NaN;
  }
  function table(title, columns, rows) { return { title, columns, rows }; }
  const definitions = {
    agreement: {
      title: "Agreement Limits Analyzer", eyebrow: "Paired prediction agreement",
      description: "Summarize paired bias and approximate limits of agreement, then inspect how differences vary with the pair mean.",
      scope: "Differences are predicted − reference. The usual mean ± 1.96 SD limits are descriptive and rely on approximately normal, independent differences. Repeated measurements per subject require a repeated-measures method; these limits are not confidence intervals or official Challenge scores.",
      example: "reference,predicted\n1.0,1.2\n2.0,1.8\n3.0,3.4\n4.0,3.9\n5.0,5.3\n6.0,5.7\n7.0,7.4\n8.0,8.1",
      run: (p) => {
        const e = p.map((r) => r.error), avg = p.map((r) => (r.reference + r.predicted) / 2), bias = mean(e), sd = Math.sqrt(variance(e, bias)), lo = bias - 1.96 * sd, hi = bias + 1.96 * sd, prop = correlation(avg, e);
        return { summary: p.length + " paired observations; mean bias = " + round(bias) + ", SD of differences = " + round(sd) + ", approximate limits = [" + round(lo) + ", " + round(hi) + "]. Difference-versus-mean correlation = " + round(prop) + ".", tables: [table("Agreement summary", ["quantity", "value"], [{ quantity: "paired observations", value: p.length }, { quantity: "mean bias (predicted − reference)", value: round(bias) }, { quantity: "SD of paired differences", value: round(sd) }, { quantity: "lower approximate limit", value: round(lo) }, { quantity: "upper approximate limit", value: round(hi) }, { quantity: "correlation of difference with pair mean", value: round(prop) }]), table("Paired differences", ["row", "pair_mean", "difference"], p.map((r, i) => ({ row: i + 1, pair_mean: round(avg[i]), difference: round(r.error) })))] };
      }
    },
    ccc: {
      title: "Concordance Correlation Calculator", eyebrow: "Agreement versus association",
      description: "Compare Pearson association with Lin’s concordance correlation coefficient for paired numeric values.",
      scope: "Lin’s coefficient combines correlation with mean and scale agreement. It is descriptive, sensitive to the value range, and does not replace a study-design-aware analysis. Constant-valued inputs do not define the variance terms.",
      example: "reference,predicted\n1,1.2\n2,1.8\n3,3.1\n4,4.3\n5,4.7\n6,6.2\n7,6.8\n8,8.1",
      run: (p) => {
        const x = p.map((r) => r.reference), y = p.map((r) => r.predicted), mx = mean(x), my = mean(y), vx = variance(x, mx), vy = variance(y, my), cov = x.reduce((s, a, i) => s + (a - mx) * (y[i] - my), 0) / (x.length - 1), r = correlation(x, y), den = vx + vy + (mx - my) ** 2;
        if (!(den > 0)) throw new Error("Concordance is undefined when both series have no variation and no mean difference.");
        const ccc = 2 * cov / den;
        return { summary: "Pearson r = " + round(r) + "; Lin’s concordance correlation coefficient = " + round(ccc) + ". A high association can coexist with weaker agreement when means or scales differ.", tables: [table("Paired agreement quantities", ["quantity", "value"], [{ quantity: "n", value: p.length }, { quantity: "reference mean", value: round(mx) }, { quantity: "predicted mean", value: round(my) }, { quantity: "reference sample variance", value: round(vx) }, { quantity: "predicted sample variance", value: round(vy) }, { quantity: "Pearson correlation", value: round(r) }, { quantity: "Lin concordance correlation", value: round(ccc) }])] };
      }
    },
    calibration: {
      title: "Prediction Calibration Fitter", eyebrow: "Calibration diagnostic",
      description: "Fit a descriptive line from predictions to observed reference values and compare its intercept and slope with ideal calibration.",
      scope: "This fits reference = intercept + slope × predicted by ordinary least squares on the supplied pairs. Ideal values are intercept 0 and slope 1. The fit is descriptive, can be unstable on small or narrow-range data, and is not a recalibration recommendation or official score.",
      example: "reference,predicted\n1.0,0.8\n2.1,1.5\n2.8,2.4\n4.2,3.1\n4.8,4.2\n6.2,4.7\n6.9,5.8\n8.1,6.4",
      run: (p) => {
        const x = p.map((r) => r.predicted), y = p.map((r) => r.reference), mx = mean(x), my = mean(y), vx = variance(x, mx);
        if (!(vx > 0)) throw new Error("Predicted values must vary to fit a calibration slope.");
        const cov = x.reduce((s, a, i) => s + (a - mx) * (y[i] - my), 0) / (x.length - 1), slope = cov / vx, intercept = my - slope * mx, residuals = y.map((v, i) => v - (intercept + slope * x[i])), rmse = Math.sqrt(mean(residuals.map((v) => v * v)));
        return { summary: "Calibration line: reference = " + round(intercept) + " + " + round(slope) + " × predicted. Ideal intercept = 0 and slope = 1; calibration-fit RMSE = " + round(rmse) + ".", tables: [table("Calibration fit", ["quantity", "value"], [{ quantity: "paired observations", value: p.length }, { quantity: "intercept (ideal 0)", value: round(intercept) }, { quantity: "slope (ideal 1)", value: round(slope) }, { quantity: "calibration-fit RMSE", value: round(rmse) }, { quantity: "Pearson correlation", value: round(correlation(x, y)) }])] };
      }
    },
    errorrange: {
      title: "Error-by-Range Profiler", eyebrow: "Error heterogeneity",
      description: "Compare signed bias, absolute error, and squared error across four rank-based reference-value bands.",
      scope: "Rows are sorted by reference and split into four nearly equal-count bands; tied reference values can fall into adjacent bands. This is a descriptive check for range-dependent error, not a hypothesis test. Small groups make these summaries unstable.",
      example: "reference,predicted\n1,1.2\n2,2.1\n3,2.7\n4,4.5\n5,5.3\n6,5.5\n7,8.0\n8,9.4\n9,10.9\n10,13.2\n11,14.0\n12,16.5",
      run: (p) => {
        if (p.length < 4) throw new Error("At least four pairs are required to populate four reference bands.");
        const sorted = p.slice().sort((a, b) => a.reference - b.reference), rows = Array.from({ length: 4 }, (_, b) => {
          const lo = Math.floor(b * sorted.length / 4), hi = Math.floor((b + 1) * sorted.length / 4), g = sorted.slice(lo, hi), e = g.map((r) => r.error);
          return { reference_band: b + 1, reference_min: round(g[0].reference), reference_max: round(g[g.length - 1].reference), n: g.length, mean_bias: round(mean(e)), MAE: round(mean(e.map(Math.abs))), RMSE: round(Math.sqrt(mean(e.map((x) => x * x)))) };
        });
        return { summary: "Paired errors are summarized across four rank-based reference bands. Look for changes in bias or error size across the range; band summaries do not account for clustering.", tables: [table("Error by reference range", ["reference_band", "reference_min", "reference_max", "n", "mean_bias", "MAE", "RMSE"], rows)] };
      }
    },
    groupstability: {
      title: "Replicate Error Stability Auditor", eyebrow: "Replicate-aware evaluation",
      description: "Summarize paired prediction errors within each biological-sample or replicate group before pooling cell-level measurements.",
      scope: "The tool reports descriptive group-level bias, MAE, and RMSE only. It does not calculate p-values, confidence intervals, or recommend excluding any group. Use the biological sample as the grouping unit when cells share an embryo, donor, or specimen.",
      example: "sample,reference,predicted\ne1,1,1.3\ne1,2,1.8\ne1,3,3.2\ne2,4,4.1\ne2,5,4.7\ne2,6,6.4\ne3,7,7.3\ne3,8,7.8\ne3,9,9.2",
      extra: [{ id: "group-column", label: "Column identifying independent samples", value: "sample", type: "text" }],
      run: (p, rows, v) => {
        const col = v["group-column"].trim(); if (!col || !rows.every((r) => col in r)) throw new Error("Choose a group column present in the CSV.");
        const groups = new Map(); p.forEach((r, i) => { const name = rows[i][col].trim(); if (!name) throw new Error("Group labels cannot be blank (row " + r.row + ")."); if (!groups.has(name)) groups.set(name, []); groups.get(name).push(r.error); });
        if (groups.size < 2) throw new Error("At least two independent sample groups are needed for a stability comparison.");
        const out = Array.from(groups, ([group, e]) => ({ group, n: e.length, mean_bias: round(mean(e)), MAE: round(mean(e.map(Math.abs))), RMSE: round(Math.sqrt(mean(e.map((x) => x * x)))) }));
        return { summary: groups.size + " groups summarized separately. Compare patterns across groups; the cell or row count within a group does not increase the number of independent samples.", tables: [table("Per-group error", ["group", "n", "mean_bias", "MAE", "RMSE"], out)] };
      }
    },
    tolerance: {
      title: "Tolerance Coverage Analyzer", eyebrow: "Practical error coverage",
      description: "Calculate the fraction of paired predictions that fall within participant-chosen absolute-error tolerances.",
      scope: "Each tolerance is expressed in the same units as reference and predicted values. Thresholds are user-selected descriptive cutoffs, not official Challenge acceptance rules. Always report the chosen units and rationale.",
      example: "reference,predicted\n1.0,1.1\n2.0,2.3\n3.0,2.8\n4.0,4.4\n5.0,4.9\n6.0,6.5\n7.0,6.2\n8.0,8.1",
      extra: [{ id: "tolerances", label: "Absolute-error tolerances (comma separated, in value units)", value: "0.1,0.25,0.5,1" }],
      run: (p, rows, v) => {
        const ts = v.tolerances.split(/[;,\s]+/).filter(Boolean).map(Number);
        if (!ts.length || ts.some((x) => !Number.isFinite(x) || x < 0)) throw new Error("Enter one or more non-negative numeric tolerances.");
        const out = Array.from(new Set(ts)).sort((a, b) => a - b).map((t) => { const n = p.filter((r) => Math.abs(r.error) <= t).length; return { absolute_tolerance: t, pairs_within: n, total_pairs: p.length, coverage_percent: round(100 * n / p.length) }; });
        return { summary: "Tolerance coverage uses absolute paired error |predicted − reference|. The thresholds are descriptive choices, not contest rules.", tables: [table("Coverage by user-set tolerance", ["absolute_tolerance", "pairs_within", "total_pairs", "coverage_percent"], out)] };
      }
    },
    biasvariance: {
      title: "Bias–Variance Error Decomposer", eyebrow: "Squared-error interpretation",
      description: "Decompose the mean squared paired error into squared mean bias and variance of the errors.",
      scope: "For the empirical distribution using denominator n, MSE = mean-error² + variance(error). This identity is descriptive and does not separate model bias from sampling variance in the broader learning-theory sense. It makes no uncertainty or causal claim.",
      example: "reference,predicted\n1,1.4\n2,2.3\n3,2.7\n4,4.5\n5,5.4\n6,6.1\n7,7.5\n8,8.8",
      run: (p) => {
        const e = p.map((r) => r.error), bias = mean(e), v = variance(e, bias, false), bias2 = bias * bias, mse = mean(e.map((x) => x * x));
        return { summary: "Empirical MSE = " + round(mse) + "; squared mean bias + error variance = " + round(bias2) + " + " + round(v) + " = " + round(bias2 + v) + ".", tables: [table("Empirical squared-error decomposition", ["quantity", "value"], [{ quantity: "paired observations", value: p.length }, { quantity: "mean bias (predicted − reference)", value: round(bias) }, { quantity: "squared mean bias", value: round(bias2) }, { quantity: "population variance of errors", value: round(v) }, { quantity: "mean squared error", value: round(mse) }, { quantity: "root mean squared error", value: round(Math.sqrt(mse)) }])] };
      }
    },
    distribution: {
      title: "Prediction Distribution Shift Comparator", eyebrow: "Marginal distribution check",
      description: "Compare the marginal reference and prediction distributions using empirical CDF distance and one-dimensional Wasserstein distance.",
      scope: "These statistics ignore which prediction was paired with which reference. Two series can have identical marginal distributions and still have poor cell-by-cell agreement. Use the paired error tools alongside this distribution-only view; neither statistic is an official Challenge score.",
      example: "reference,predicted\n1,2\n2,3\n3,1\n4,5\n5,4\n6,7\n7,6\n8,8",
      run: (p) => {
        const x = p.map((r) => r.reference).sort((a, b) => a - b), y = p.map((r) => r.predicted).sort((a, b) => a - b), grid = Array.from(new Set(x.concat(y))).sort((a, b) => a - b);
        const ks = Math.max(...grid.map((z) => Math.abs(x.filter((v) => v <= z).length / x.length - y.filter((v) => v <= z).length / y.length))), w1 = mean(x.map((v, i) => Math.abs(v - y[i])));
        return { summary: "Empirical CDF maximum distance = " + round(ks) + "; 1D Wasserstein distance = " + round(w1) + " value units. Both compare marginal distributions and discard pair identities.", tables: [table("Marginal distribution comparison", ["quantity", "value"], [{ quantity: "paired observations", value: p.length }, { quantity: "empirical CDF maximum distance", value: round(ks) }, { quantity: "1D Wasserstein distance", value: round(w1) }, { quantity: "Pearson paired correlation (context only)", value: round(correlation(p.map((r) => r.reference), p.map((r) => r.predicted))) }])] };
      }
    }
  };
  const name = document.body.dataset.diagnostic, def = definitions[name];
  if (!def) return;
  document.title = def.title + " · VEC"; $("eyebrow").textContent = def.eyebrow; $("title").textContent = def.title; $("description").textContent = def.description; $("scope").textContent = def.scope;
  const inputs = $("diagnostic-inputs");
  const dataWrap = document.createElement("div"), dataLabel = document.createElement("label"), data = document.createElement("textarea");
  dataLabel.htmlFor = "data"; dataLabel.textContent = "Paired measurements as CSV (columns reference,predicted)"; data.id = "data"; data.rows = 8; data.spellcheck = false; data.placeholder = "reference,predicted\n1.2,1.0\n2.1,2.3"; dataWrap.append(dataLabel, data); inputs.append(dataWrap);
  (def.extra || []).forEach((f) => { const w = document.createElement("div"), l = document.createElement("label"), x = document.createElement("input"); l.htmlFor = f.id; l.textContent = f.label; x.id = f.id; x.type = f.type || "text"; x.value = f.value || ""; w.append(l, x); inputs.append(w); });
  const result = $("result");
  function render(output) {
    result.replaceChildren(); result.className = "output"; const p = document.createElement("p"); p.textContent = output.summary; result.append(p);
    (output.tables || []).forEach((t) => { const section = document.createElement("section"), h = document.createElement("h3"), wrap = document.createElement("div"), table = document.createElement("table"), head = document.createElement("thead"), hr = document.createElement("tr"), body = document.createElement("tbody"); h.textContent = t.title; wrap.className = "table-wrap"; t.columns.forEach((c) => { const th = document.createElement("th"); th.scope = "col"; th.textContent = c; hr.append(th); }); head.append(hr); table.append(head); t.rows.forEach((r) => { const tr = document.createElement("tr"); t.columns.forEach((c) => { const td = document.createElement("td"); td.textContent = String(r[c] === undefined ? "" : r[c]); tr.append(td); }); body.append(tr); }); table.append(body); wrap.append(table); section.append(h, wrap); const button = document.createElement("button"); button.className = "secondary"; button.textContent = "Download " + t.title + " CSV"; button.addEventListener("click", () => { const csv = [t.columns.join(",")].concat(t.rows.map((r) => t.columns.map((c) => '"' + String(r[c] === undefined ? "" : r[c]).replace(/"/g, '""') + '"').join(","))).join("\r\n"); const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); a.download = t.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + ".csv"; a.click(); URL.revokeObjectURL(a.href); }); section.append(button); result.append(section); });
  }
  $("example").addEventListener("click", () => { data.value = def.example; $("analyze").click(); });
  $("clear").addEventListener("click", () => { data.value = ""; (def.extra || []).forEach((f) => { $(f.id).value = f.value || ""; }); result.className = "output"; result.textContent = "Inputs cleared. This page does not save them."; });
  $("analyze").addEventListener("click", () => { try { const rows = parseCSV(data.value), p = pairs(rows), v = Object.fromEntries((def.extra || []).map((f) => [f.id, $(f.id).value])); render(def.run(p, rows, v)); } catch (e) { result.className = "output error"; result.textContent = e.message || String(e); } });
})();
