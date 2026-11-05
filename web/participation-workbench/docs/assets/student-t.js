/* Small, dependency-free Student t CDF and quantile helper for the workbench. */
(() => {
  const c = [
    676.5203681218851, -1259.1392167224028, 771.3234287776531,
    -176.6150291621406, 12.507343278686905, -0.13857109526572012,
    9.984369578019572e-6, 1.5056327351493116e-7,
  ];
  function logGamma(z) {
    if (z < 0.5) return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * z)) - logGamma(1 - z);
    z -= 1;
    let x = 0.99999999999980993;
    for (let i = 0; i < c.length; i++) x += c[i] / (z + i + 1);
    const t = z + c.length - 0.5;
    return 0.5 * Math.log(2 * Math.PI) + (z + 0.5) * Math.log(t) - t + Math.log(x);
  }
  function betaFraction(a, b, x) {
    const max = 200, eps = 3e-14, fpmin = 1e-300, qab = a + b, qap = a + 1, qam = a - 1;
    let c0 = 1, d = 1 - qab * x / qap;
    if (Math.abs(d) < fpmin) d = fpmin;
    d = 1 / d;
    let h = d;
    for (let m = 1; m <= max; m++) {
      const m2 = 2 * m;
      let aa = m * (b - m) * x / ((qam + m2) * (a + m2));
      d = 1 + aa * d; if (Math.abs(d) < fpmin) d = fpmin;
      c0 = 1 + aa / c0; if (Math.abs(c0) < fpmin) c0 = fpmin;
      d = 1 / d; h *= d * c0;
      aa = -(a + m) * (qab + m) * x / ((a + m2) * (qap + m2));
      d = 1 + aa * d; if (Math.abs(d) < fpmin) d = fpmin;
      c0 = 1 + aa / c0; if (Math.abs(c0) < fpmin) c0 = fpmin;
      d = 1 / d;
      const delta = d * c0;
      h *= delta;
      if (Math.abs(delta - 1) < eps) break;
    }
    return h;
  }
  function regularizedBeta(x, a, b) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    const bt = Math.exp(logGamma(a + b) - logGamma(a) - logGamma(b) + a * Math.log(x) + b * Math.log1p(-x));
    const value = x < (a + 1) / (a + b + 2)
      ? bt * betaFraction(a, b, x) / a
      : 1 - bt * betaFraction(b, a, 1 - x) / b;
    return Math.max(0, Math.min(1, value));
  }
  function tCdf(t, df) {
    if (t === 0) return 0.5;
    const x = df / (df + t * t), tail = 0.5 * regularizedBeta(x, df / 2, 0.5);
    return t > 0 ? 1 - tail : tail;
  }
  function tQuantile(p, df) {
    if (!(p > 0.5 && p < 1 && df > 0)) return NaN;
    let lo = 0, hi = 1;
    while (tCdf(hi, df) < p && hi < 1e8) hi *= 2;
    for (let i = 0; i < 90; i++) {
      const mid = (lo + hi) / 2;
      if (tCdf(mid, df) < p) lo = mid; else hi = mid;
    }
    return (lo + hi) / 2;
  }
  window.VECStats = Object.freeze({ tQuantile });
})();
