(function () {
  "use strict";
  const locales = window.VEC_ANALYSIS_LOCALES;
  const tools = [
    ["pseudobulk", "pseudobulk"], ["design", "design-confounding"], ["rarestate", "rare-state-sampling"],
    ["composition", "composition-distance"], ["decompose", "composition-expression"], ["coverage", "signature-coverage"],
    ["enrichment", "gene-set-enrichment"], ["contrast", "contrast-reporter"], ["cellqc", "cell-qc"],
    ["module", "signature-score"], ["trend", "stage-trend"], ["transition", "label-transition"],
    ["detection", "gene-detection"], ["replicate", "replicate-concordance"], ["alignment", "coordinate-alignment"],
    ["neighborhood", "neighborhood-radius"], ["occupancy", "occupancy-comparison"], ["moran", "spatial-autocorrelation"],
    ["contract", "metric-contract-diff"], ["schemadiff", "metadata-drift"], ["incident", "service-incident-packet"]
  ];
  const copy = {
    en: {
      heading: "Analysis and reproducibility tools", language: "Interface language",
      note: "Choose English, Spanish, or Simplified Chinese for the 21 analysis tools below. Result summaries, validation messages, table columns, and data values remain in English; the tool pages explain this before analysis.",
      back: "← Participation Workbench", community: "Community resources", official: "Official data page"
    },
    es: {
      heading: "Herramientas de análisis y reproducibilidad", language: "Idioma de la interfaz",
      note: "Elige inglés, español o chino simplificado para estas 21 herramientas de análisis. Los resúmenes, mensajes de validación, columnas y valores permanecen en inglés; cada herramienta lo explica antes del análisis.",
      back: "← Herramientas de participación", community: "Recursos comunitarios", official: "Datos oficiales"
    },
    "zh-CN": {
      heading: "分析与可重复性工具", language: "界面语言",
      note: "可为以下 21 个分析工具选择英语、西班牙语或简体中文界面。结果摘要、校验提示、表格列名和数据值仍为英文；每个工具都会在分析前说明这一点。",
      back: "← 参与工具箱", community: "社区资源", official: "官方数据"
    }
  };
  const heading = document.getElementById("analysis-tools");
  const note = document.getElementById("analysis-language-note");
  const grid = document.querySelector('.grid[aria-label="Analysis and reproducibility tools"]');
  const picker = document.getElementById("analysis-language-picker");
  if (!heading || !note || !grid || !picker || !locales) return;
  const label = document.createElement("label"); label.htmlFor = "analysis-language";
  const select = document.createElement("select"); select.id = "analysis-language"; select.setAttribute("aria-label", "Interface language / Idioma de la interfaz / 界面语言");
  [["en", "English"], ["es", locales.es.label], ["zh-CN", locales["zh-CN"].label]].forEach(([value, text]) => {
    const option = document.createElement("option"); option.value = value; option.textContent = text; select.append(option);
  });
  picker.append(label, select);
  function applyLanguage(code) {
    const ui = copy[code] || copy.en, language = locales[code];
    document.documentElement.lang = code === "zh-CN" ? "zh-Hans" : code;
    heading.textContent = ui.heading; label.textContent = ui.language; note.textContent = ui.note;
    const nav = document.querySelector(".hero nav");
    if (nav) { const links = nav.querySelectorAll("a"); if (links[0]) links[0].textContent = ui.community; }
    tools.forEach(([key, slug], index) => {
      const card = grid.querySelectorAll(".card")[index], localized = language && language.labs[key];
      if (!card) return;
      const tag = card.querySelector(".tag"), title = card.querySelector("h2"), description = card.querySelector("p");
      if (tag && !card.dataset.englishTag) card.dataset.englishTag = tag.textContent;
      if (title && !card.dataset.englishTitle) card.dataset.englishTitle = title.textContent;
      if (description && !card.dataset.englishDescription) card.dataset.englishDescription = description.textContent;
      if (tag) tag.textContent = localized ? localized.eyebrow : card.dataset.englishTag;
      if (title) title.textContent = localized ? localized.title : card.dataset.englishTitle;
      if (description) description.textContent = localized ? localized.description : card.dataset.englishDescription;
      card.href = "tools/" + slug + "/" + (code === "en" ? "" : "?lang=" + encodeURIComponent(code));
    });
    const url = new URL(location.href); if (code === "en") url.searchParams.delete("lang"); else url.searchParams.set("lang", code); history.replaceState(null, "", url);
  }
  const requested = new URLSearchParams(location.search).get("lang");
  select.value = requested && (requested === "es" || requested === "zh-CN") ? requested : "en";
  select.addEventListener("change", () => applyLanguage(select.value));
  applyLanguage(select.value);
})();
