# Sources, related work and scope

These exercises are independently written synthetic demonstrations, not implementations of the official metric suite. No measured challenge cells, private project data, user correspondence, credentials, hidden labels or returned-score inversions are included.

Primary references:

- [Challenge community award](https://virtualembryo.ai/challenge/community): original useful work, public access, review and translation eligibility. It does not guarantee payment for this collection or independent awards for each edition.
- [Challenge rules](https://virtualembryo.ai/challenge/rules): held-out data and the distinction between selecting completed predictions from scores and reconstructing target properties.
- [Challenge data](https://virtualembryo.ai/challenge/data): normalized expression, spatial coordinates and per-board contracts.
- [Challenge evaluation](https://virtualembryo.ai/challenge/evaluation): the official definitions take precedence over these teaching examples.
- [NumPy Generator](https://numpy.org/doc/stable/reference/random/generator.html): seeded random sampling used in the exercises.
- [SciPy Spearman reference](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.spearmanr.html): rank correlation and undefined constant-input cases. Our small tie-aware implementation is for instruction, not inferential testing.

Related public resources were checked before writing:

- [Community directory](https://virtualembryo.ai/challenge/resources).
- [Virtual Embryo Intuition Lab](https://github.com/i-habib/virtual-embryo-community/tree/main/intuition-lab) demonstrates scorer behavior. This collection instead isolates mathematical and observation-process assumptions with small invented arrays; it does not rerun the official scorer.
- [VEC BatchRank](https://github.com/random-guy-05/vec-batchrank) selects among scored candidates. Lessons 14 and 16 explain limitations of surrogate ordering and correlated variants; they do not replace that tool.
- [VEC SplitForge](https://github.com/random-guy-05/vec-splitforge) builds audited splits. Lesson 15 demonstrates why the biological grouping unit matters; it is not another split-generation tool.

The 300 language-specific reading resources share 20 experiments. Each is an adapted worked lesson with a question, command, output, interpretation, extension and limits. The content is machine-assisted. Translation quality has not been certified by native speakers; automated tests establish code behavior and structural completeness, not linguistic accuracy or biological correctness in an unseen dataset. No audience, uptake, organizer acceptance, affiliation or award commitment is claimed.

Checked 20 October 2026. Official pages may change. Avoid inferring challenge schedules from this repository; consult the live official pages.
