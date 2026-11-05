/* Shared tie-aware rank and paired-order helpers for local workbench tools. */
(() => {
  function averageRanks(values) {
    const order = values.map((value, index) => ({ value, index })).sort((a, b) => a.value - b.value || a.index - b.index);
    const ranks = Array(values.length);
    for (let start = 0; start < order.length;) {
      let end = start + 1;
      while (end < order.length && order[end].value === order[start].value) end++;
      const average = ((start + 1) + end) / 2;
      for (let i = start; i < end; i++) ranks[order[i].index] = average;
      start = end;
    }
    return ranks;
  }
  function pearson(x, y) {
    const n = x.length;
    const mx = x.reduce((a, b) => a + b, 0) / n, my = y.reduce((a, b) => a + b, 0) / n;
    let xx = 0, yy = 0, xy = 0;
    for (let i = 0; i < n; i++) { const dx = x[i] - mx, dy = y[i] - my; xx += dx * dx; yy += dy * dy; xy += dx * dy; }
    return xx && yy ? xy / Math.sqrt(xx * yy) : null;
  }
  function spearman(x, y) { return pearson(averageRanks(x), averageRanks(y)); }
  function kendallTauB(x, y) {
    let concordant = 0, discordant = 0, tiesX = 0, tiesY = 0;
    for (let i = 0; i < x.length; i++) for (let j = i + 1; j < x.length; j++) {
      const dx = Math.sign(x[i] - x[j]), dy = Math.sign(y[i] - y[j]);
      if (!dx && !dy) continue;
      if (!dx) tiesX++;
      else if (!dy) tiesY++;
      else if (dx === dy) concordant++;
      else discordant++;
    }
    const denom = Math.sqrt((concordant + discordant + tiesX) * (concordant + discordant + tiesY));
    return denom ? (concordant - discordant) / denom : null;
  }
  function superiority(a, b) {
    let wins = 0, ties = 0;
    for (const x of a) for (const y of b) { if (x > y) wins++; else if (x === y) ties++; }
    const pairs = a.length * b.length, auc = (wins + ties / 2) / pairs;
    return { pairs, wins, ties, auc, rankBiserial: 2 * auc - 1 };
  }
  window.VECRankStats = Object.freeze({ averageRanks, pearson, spearman, kendallTauB, superiority });
})();
