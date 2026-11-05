# VEC Rule Scenario Trainer

An offline, no-dependency practice quiz for Virtual Embryo Challenge rules that are easy to misread in real workflows: external-data boundaries, Agent Team configuration locks and evidence, P3 submission limits, and the Generality Award.

**Languages:** English, Spanish, and Simplified Chinese. All 33 scenarios are translated in the first Spanish and Chinese editions. The quiz covers 12 data-eligibility cases, 8 Agent Team cases, 6 phase/submission cases, 3 score-use cases, and 4 Generality Award cases. The official source pages linked by each answer remain authoritative and are currently in English.

## Use

Open the [hosted practice quiz](https://random-guy-05.github.io/vec-rule-scenario-trainer/) or download both `index.html` and `translations.js` into the same folder and open `index.html`. Choose a language and a topic, then answer the scenarios. The hosted page also accepts `?lang=es` or `?lang=zh-CN` to open directly in that language; English is the default. Changing language starts a fresh practice round. The app works offline after download, stores no answers, and sends no data. It has no build step, package installation, login, analytics, or server dependency.

## Scope and maintenance

This is a learning aid, not an organiser ruling. Challenge rules can change; the 33 scenarios were checked against the official pages on **14 October 2026**. Open the linked current source before acting on a consequential edge case. The quiz identifies the relevant rule section in each answer. Spanish and Simplified Chinese are community translations and have not had independent native-speaker review; corrections are welcome.

The scenario set covers:

- exact versus protected external-data stage boundaries for T1, T2 heart, and T2 embryo;
- disclosure, mixed-stage filtering, and T3 genotype/model-pretraining exclusions;
- the Agent Team configuration lock, crash/restart distinction, run selection, output authorship, and evidence requirements;
- P1/P2/P3 submission limits, format checks, withdrawal, and hidden-test ranking;
- the permitted use of returned scores for selection versus prohibited recovery of hidden-target values; and
- the shared-architecture requirement for the Generality Award.

English is the canonical factual source. `translations.js` follows the scenario order in `index.html`; each translation keeps the original answer index. When changing a scenario, update the English source and every language edition together, preserve the answer index, and check the current official page before publishing.

## Official sources

- [Challenge Rules](https://virtualembryo.ai/challenge/rules), especially §§9–14.
- [Challenge Data](https://virtualembryo.ai/challenge/data), including released stages and Task 3 replicate context.
- [Challenge Tasks](https://virtualembryo.ai/challenge/tasks), for task and split definitions.

## License

MIT. See [LICENSE](LICENSE).
