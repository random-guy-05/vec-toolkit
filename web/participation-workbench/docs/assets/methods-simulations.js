(function () {
  "use strict";
  const svgNS = "http://www.w3.org/2000/svg";
  const $ = (id) => document.getElementById(id);
  const svg = $("chart"), summary = $("summary");
  if (!svg || !summary) return;

  const node = (tag, attrs, text) => {
    const el = document.createElementNS(svgNS, tag);
    Object.entries(attrs || {}).forEach(([key, value]) => el.setAttribute(key, String(value)));
    if (text !== undefined) el.textContent = text;
    svg.append(el);
    return el;
  };
  const text = (x, y, value, size = 12, anchor = "start", color = "#263247") =>
    node("text", { x, y, "font-size": size, "text-anchor": anchor, fill: color, "font-family": "system-ui, sans-serif" }, value);
  const line = (x1, y1, x2, y2, color = "#7b8797", width = 1) =>
    node("line", { x1, y1, x2, y2, stroke: color, "stroke-width": width });
  const rect = (x, y, width, height, fill) =>
    node("rect", { x, y, width: Math.max(0, width), height: Math.max(0, height), rx: 4, fill });
  const value = (id) => Number($(id).value);
  const mean = (xs) => xs.length ? xs.reduce((sum, x) => sum + x, 0) / xs.length : NaN;
  const fmt = (x) => Number.isFinite(x) ? x.toFixed(2) : "NA";
  const clear = () => svg.replaceChildren();
  const rng = (seed) => {
    let state = seed >>> 0;
    return () => {
      state ^= state << 13;
      state ^= state >>> 17;
      state ^= state << 5;
      return (state >>> 0) / 4294967296;
    };
  };
  const normal = (random) => {
    const u = Math.max(random(), 1e-12), v = random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  };
  const pearson = (a, b) => {
    const ma = mean(a), mb = mean(b);
    const da = a.reduce((s, x) => s + (x - ma) ** 2, 0);
    const db = b.reduce((s, x) => s + (x - mb) ** 2, 0);
    if (!da || !db) return NaN;
    return a.reduce((s, x, i) => s + (x - ma) * (b[i] - mb), 0) / Math.sqrt(da * db);
  };
  const slope = (x, y) => {
    const mx = mean(x), my = mean(y);
    const ssx = x.reduce((s, n) => s + (n - mx) ** 2, 0);
    return ssx ? x.reduce((s, n, i) => s + (n - mx) * (y[i] - my), 0) / ssx : NaN;
  };
  const watch = (ids, update) => {
    ids.forEach((id) => $(id).addEventListener("input", update));
    update();
  };
  const showBars = (items, maxAbs) => {
    clear();
    const left = 48, width = 510, baseline = 166, scale = 105 / Math.max(maxAbs, 1e-9);
    line(left, baseline, left + width, baseline);
    const slot = width / items.length, barWidth = Math.min(72, slot * 0.55);
    items.forEach((item, i) => {
      const x = left + slot * (i + 0.5) - barWidth / 2;
      const h = Math.abs(item.value) * scale;
      rect(x, item.value >= 0 ? baseline - h : baseline, barWidth, h, item.color);
      text(x + barWidth / 2, item.value >= 0 ? baseline - h - 7 : baseline + h + 15, fmt(item.value), 11, "middle");
      text(x + barWidth / 2, 225, item.label, 10, "middle", "#526174");
    });
    text(left, 34, "Synthetic values · fixed seed for a stable comparison", 12, "start", "#526174");
  };
  const setOutput = (id, valueText) => { $(id).textContent = valueText; };

  const demos = {
    regressionToMean() {
      const update = () => {
        const n = Math.floor(value("r2m-n")), noise = value("r2m-noise"), top = value("r2m-top");
        const random = rng(81231);
        const data = Array.from({ length: n }, () => {
          const latent = normal(random);
          return { baseline: latent + noise * normal(random), followup: latent + noise * normal(random) };
        });
        const selectedN = Math.max(1, Math.ceil(n * top / 100));
        const selected = data.slice().sort((a, b) => b.baseline - a.baseline).slice(0, selectedN);
        const selectedBase = mean(selected.map((d) => d.baseline));
        const selectedFollow = mean(selected.map((d) => d.followup));
        const allFollow = mean(data.map((d) => d.followup));
        setOutput("r2m-n-value", n.toLocaleString());
        setOutput("r2m-noise-value", noise.toFixed(1));
        setOutput("r2m-top-value", top + "%");
        summary.textContent = "There is no intervention effect in this simulation. The " + top + "% selected for extreme baseline values average " + fmt(selectedBase) + " at baseline and " + fmt(selectedFollow) + " at follow-up; the full-sample follow-up mean is " + fmt(allFollow) + ".";
        showBars([
          { label: "Selected baseline", value: selectedBase, color: "#d9822b" },
          { label: "Selected follow-up", value: selectedFollow, color: "#386fa4" },
          { label: "All follow-up", value: allFollow, color: "#8c99a8" }
        ], Math.max(Math.abs(selectedBase), Math.abs(selectedFollow), Math.abs(allFollow), 1));
      };
      watch(["r2m-n", "r2m-noise", "r2m-top"], update);
    },
    rangeRestriction() {
      const update = () => {
        const width = value("range-width"), noise = value("range-noise"), random = rng(82317);
        const data = Array.from({ length: 800 }, () => {
          const x = 2 * random() - 1;
          return { x, y: 0.7 * x + noise * normal(random) };
        });
        const restricted = data.filter((d) => Math.abs(d.x) <= width);
        const fullR = pearson(data.map((d) => d.x), data.map((d) => d.y));
        const restrictedR = pearson(restricted.map((d) => d.x), restricted.map((d) => d.y));
        setOutput("range-width-value", width.toFixed(2));
        setOutput("range-noise-value", noise.toFixed(1));
        summary.textContent = "The full synthetic sample has r = " + fmt(fullR) + " (n = " + data.length + "); restricting the predictor to |x| ≤ " + width.toFixed(2) + " leaves n = " + restricted.length + " and r = " + fmt(restrictedR) + ". The underlying relationship is unchanged.";
        showBars([
          { label: "Full sample", value: fullR, color: "#386fa4" },
          { label: "Narrow range", value: restrictedR, color: "#d9822b" }
        ], 1);
      };
      watch(["range-width", "range-noise"], update);
    },
    winnersCurse() {
      const update = () => {
        const candidates = Math.floor(value("winner-candidates")), noise = value("winner-noise"), random = rng(83429);
        const trueQuality = 1, rounds = 500;
        let validationTotal = 0, holdoutTotal = 0;
        for (let r = 0; r < rounds; r++) {
          let bestValidation = -Infinity;
          for (let c = 0; c < candidates; c++) bestValidation = Math.max(bestValidation, trueQuality + noise * normal(random));
          validationTotal += bestValidation;
          holdoutTotal += trueQuality + noise * normal(random);
        }
        const validation = validationTotal / rounds, holdout = holdoutTotal / rounds;
        setOutput("winner-candidates-value", String(candidates));
        setOutput("winner-noise-value", noise.toFixed(1));
        summary.textContent = "Across " + rounds + " repeats, all candidates have the same true quality (1.00). Selecting the highest of " + candidates + " noisy validation estimates gives an average selected estimate of " + fmt(validation) + "; an independent evaluation averages " + fmt(holdout) + ".";
        showBars([
          { label: "True quality", value: trueQuality, color: "#8c99a8" },
          { label: "Selected validation", value: validation, color: "#d9822b" },
          { label: "Independent test", value: holdout, color: "#386fa4" }
        ], Math.max(validation, holdout, trueQuality) * 1.15);
      };
      watch(["winner-candidates", "winner-noise"], update);
    },
    optionalStopping() {
      const update = () => {
        const looks = Math.floor(value("stopping-looks")), random = rng(84541), trials = 1200, sampleSize = 100, zCutoff = 1.96;
        const checkpoints = Array.from({ length: looks }, (_, i) => Math.ceil(sampleSize * (i + 1) / looks));
        let peekRejects = 0, fixedRejects = 0;
        for (let r = 0; r < trials; r++) {
          let total = 0, checkpoint = 0, everRejected = false;
          for (let n = 1; n <= sampleSize; n++) {
            total += normal(random);
            if (n === checkpoints[checkpoint]) {
              if (Math.abs(total / Math.sqrt(n)) > zCutoff) everRejected = true;
              checkpoint++;
            }
          }
          if (everRejected) peekRejects++;
          if (Math.abs(total / Math.sqrt(sampleSize)) > zCutoff) fixedRejects++;
        }
        const peekRate = peekRejects / trials, fixedRate = fixedRejects / trials;
        setOutput("stopping-looks-value", String(looks));
        summary.textContent = "Under a true zero effect, checking the same accumulating data at " + looks + " looks and stopping at the first |z| > 1.96 rejects in " + (100 * peekRate).toFixed(1) + "% of " + trials + " simulations. A single pre-specified final look rejects in " + (100 * fixedRate).toFixed(1) + "%";
        showBars([
          { label: "Repeated looks", value: 100 * peekRate, color: "#d9822b" },
          { label: "One fixed look", value: 100 * fixedRate, color: "#386fa4" }
        ], 20);
      };
      watch(["stopping-looks"], update);
    },
    missingData() {
      const update = () => {
        const mode = $("missing-mode").value, rate = value("missing-rate"), random = rng(85663), n = 1200, effect = 0.6;
        const observed = [[], []], zeroTotals = [0, 0], missingCounts = [0, 0];
        for (let group = 0; group < 2; group++) {
          for (let i = 0; i < n; i++) {
            const y = (group ? effect : 0) + normal(random);
            let pMissing = rate;
            if (mode === "group") pMissing = Math.min(0.95, rate * (group ? 1.4 : 0.6));
            if (mode === "outcome") {
              const logit = Math.log(rate / (1 - rate)) + 0.8 * y;
              pMissing = 1 / (1 + Math.exp(-logit));
            }
            if (random() < pMissing) missingCounts[group]++;
            else {
              observed[group].push(y);
              zeroTotals[group] += y;
            }
          }
        }
        const completeEffect = mean(observed[1]) - mean(observed[0]);
        const zeroEffect = zeroTotals[1] / n - zeroTotals[0] / n;
        const modeLabel = mode === "mcar" ? "MCAR" : mode === "group" ? "group-dependent missingness (MAR)" : "outcome-dependent missingness (MNAR)";
        setOutput("missing-rate-value", Math.round(rate * 100) + "%");
        summary.textContent = "True group difference = 0.60. Under " + modeLabel + ", the complete-case estimate is " + fmt(completeEffect) + ", while coding missing values as zero gives " + fmt(zeroEffect) + ". Missing counts: control " + missingCounts[0] + "/" + n + ", treated " + missingCounts[1] + "/" + n + ".";
        showBars([
          { label: "True difference", value: 0.6, color: "#8c99a8" },
          { label: "Complete cases", value: completeEffect, color: "#386fa4" },
          { label: "Zero-filled", value: zeroEffect, color: "#d9822b" }
        ], Math.max(1, Math.abs(completeEffect), Math.abs(zeroEffect)) * 1.1);
      };
      watch(["missing-mode", "missing-rate"], update);
    },
    measurementError() {
      const update = () => {
        const error = value("measurement-noise"), random = rng(86777), n = 800, latent = [], measured = [], outcome = [];
        for (let i = 0; i < n; i++) {
          const x = normal(random);
          latent.push(x);
          measured.push(x + error * normal(random));
          outcome.push(0.8 * x + 0.6 * normal(random));
        }
        const trueSlope = slope(latent, outcome), observedSlope = slope(measured, outcome);
        setOutput("measurement-noise-value", error.toFixed(1));
        summary.textContent = "The generating slope is 0.80. In this fixed synthetic sample, regressing the outcome on the latent predictor gives " + fmt(trueSlope) + "; using the noisy measured predictor gives " + fmt(observedSlope) + ". Classical predictor error tends to attenuate the slope, but finite samples vary.";
        showBars([
          { label: "Generating slope", value: 0.8, color: "#8c99a8" },
          { label: "Latent estimate", value: trueSlope, color: "#386fa4" },
          { label: "Noisy measure", value: observedSlope, color: "#d9822b" }
        ], 1.2);
      };
      watch(["measurement-noise"], update);
    },
    batchAdjustment() {
      const update = () => {
        const overlap = Math.floor(value("batch-overlap")), batchShift = value("batch-shift"), random = rng(87889);
        const treatment = [], batch = [], outcome = [];
        const add = (b, t, count) => {
          for (let i = 0; i < count; i++) {
            treatment.push(t); batch.push(b);
            outcome.push(0.7 * t + batchShift * b + 0.8 * normal(random));
          }
        };
        add(0, 0, 90); add(0, 1, overlap); add(1, 0, overlap); add(1, 1, 90);
        const controlMean = mean(outcome.filter((_, i) => treatment[i] === 0));
        const treatedMean = mean(outcome.filter((_, i) => treatment[i] === 1));
        const naive = treatedMean - controlMean;
        setOutput("batch-overlap-value", String(overlap));
        setOutput("batch-shift-value", batchShift.toFixed(1));
        if (overlap === 0) {
          summary.textContent = "At zero overlap, every control is in batch 1 and every treated sample is in batch 2. Treatment and batch are perfectly confounded, so an adjusted treatment effect is not identifiable; the raw difference is " + fmt(naive) + ".";
          showBars([
            { label: "True effect", value: 0.7, color: "#8c99a8" },
            { label: "Raw difference", value: naive, color: "#d9822b" }
          ], Math.max(1, Math.abs(naive)) * 1.1);
          return;
        }
        const mt = mean(treatment), mb = mean(batch), my = mean(outcome);
        let stt = 0, sbb = 0, stb = 0, sty = 0, sby = 0;
        for (let i = 0; i < treatment.length; i++) {
          const t = treatment[i] - mt, b = batch[i] - mb, y = outcome[i] - my;
          stt += t * t; sbb += b * b; stb += t * b; sty += t * y; sby += b * y;
        }
        const det = stt * sbb - stb * stb;
        const adjusted = det > 1e-9 ? (sty * sbb - sby * stb) / det : NaN;
        summary.textContent = "With " + overlap + " samples in each off-diagonal condition–batch cell, the raw group difference is " + fmt(naive) + " and the additive batch-adjusted estimate is " + fmt(adjusted) + " (generating effect 0.70). Sparse overlap makes adjustment noisy; full rank does not guarantee balance or remove other confounding.";
        showBars([
          { label: "Generating effect", value: 0.7, color: "#8c99a8" },
          { label: "Raw difference", value: naive, color: "#d9822b" },
          { label: "Batch-adjusted", value: adjusted, color: "#386fa4" }
        ], Math.max(1, Math.abs(naive), Math.abs(adjusted)) * 1.1);
      };
      watch(["batch-overlap", "batch-shift"], update);
    },
    logCompression() {
      const update = () => {
        const baseline = value("log-baseline"), fold = value("log-fold"), after = baseline * fold;
        const logBefore = Math.log2(1 + baseline), logAfter = Math.log2(1 + after);
        setOutput("log-baseline-value", Math.round(baseline).toLocaleString());
        setOutput("log-fold-value", fold.toFixed(1) + "×");
        summary.textContent = "The same " + fold.toFixed(1) + "× count change adds " + Math.round(after - baseline).toLocaleString() + " raw counts, but changes log₂(1 + count) by " + fmt(logAfter - logBefore) + " units. The transform compresses high values; it does not make counts normally distributed or remove all mean–variance structure.";
        clear();
        const panels = [
          { x: 40, title: "Raw count", before: baseline, after, max: after, color: "#386fa4" },
          { x: 330, title: "log₂(1 + count)", before: logBefore, after: logAfter, max: logAfter, color: "#d9822b" }
        ];
        panels.forEach((panel) => {
          const barBase = 211, height = 145, barWidth = 64, scale = height / Math.max(panel.max, 1e-9);
          text(panel.x + 110, 37, panel.title, 13, "middle");
          line(panel.x + 22, barBase, panel.x + 235, barBase);
          const entries = [["Before", panel.before], ["After", panel.after]];
          entries.forEach(([label, number], i) => {
            const x = panel.x + 56 + i * 92, h = number * scale;
            rect(x, barBase - h, barWidth, h, panel.color);
            text(x + barWidth / 2, barBase - h - 7, fmt(number), 10, "middle");
            text(x + barWidth / 2, 231, label, 11, "middle", "#526174");
          });
        });
        text(48, 260, "Each panel uses its own vertical scale.", 11, "start", "#526174");
      };
      watch(["log-baseline", "log-fold"], update);
    }
  };
  const run = demos[document.body.dataset.methodSim];
  if (run) run();
})();
