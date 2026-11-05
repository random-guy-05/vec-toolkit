# Facilitator Guide

## Audience and outcomes

For first-time entrants, students, and collaborators who have not yet built a complete VEC workflow. No programming prerequisite. By the end, participants should be able to:

1. locate a resource that matches a specific task or workflow;
2. say what a local validator, pseudo-split score, or tutorial does **not** establish;
3. identify the official rules and source-licence checks needed before using external data; and
4. name a minimal record set for reproducing a run.

## Before the session

- Review the current [Challenge overview](https://virtualembryo.ai/challenge), [tasks](https://virtualembryo.ai/challenge/tasks), [rules](https://virtualembryo.ai/challenge/rules), [evaluation](https://virtualembryo.ai/challenge/evaluation), and [live community resources](https://virtualembryo.ai/challenge/resources).
- Open the [resource navigator](https://random-guy-05.github.io/vec-resource-navigator/) as an optional searchable view. The official resource page is authoritative for the current list and status.
- Print or share one copy of `PARTICIPANT_WORKSHEET.md` per pair. Display `slides.html` locally; it has no external dependencies.
- Tell participants not to bring private data, credentials, unpublished results, or hidden evaluation files. All exercises use fictional scenarios.
- If you cannot verify a date, board rule, or metric detail live, mark it as a follow-up rather than guessing.

## 75-minute run-of-show

| Time | Activity | Facilitator action |
|---:|---|---|
| 0–5 min | Welcome and boundaries | State the four outcomes. Explain that the session is about safe, reproducible workflows, not leaderboard tactics. |
| 5–13 min | Map the challenge | Ask each pair to pick one task and describe the input and prediction target in their own words. Check the current task page together. |
| 13–25 min | Find a resource | Give pairs a scenario from worksheet exercise 1. Ask them to find a resource, say who made it, and identify one stated limitation. |
| 25–40 min | Validation is not evaluation | Work through exercise 2. Separate structural validity, local pseudo-split usefulness, and official evaluation. Ask what evidence would support each claim. |
| 40–53 min | External data decision | Work through exercise 3. Require a source, licence/reuse review, task relevance, stage rationale, provenance record, and current-rule check. |
| 53–66 min | Reproducibility and agent evidence | Work through exercise 4. Have pairs distinguish a record that helps audit a run from a mechanism that guarantees compliant behavior. |
| 66–72 min | Personal next-step plan | Each person writes one action, its public source, and a pre-submission check. Keep plans noncompetitive and realistic. |
| 72–75 min | Close | Invite one unresolved question. Point back to the official pages and community channels. |

## Facilitation notes and answer key

### Exercise 1: choose a resource

Good answers name a resource that directly matches the stated need and explain the match. A title alone is not evidence of quality. Ask participants to open the resource and check its prerequisites, supported task, data source, license, run instructions, and limitations. A `Filed · not yet reviewed` label means the organizers have not reviewed it; it is not an endorsement.

### Exercise 2: separate three kinds of evidence

For a fictional prediction file:

- A **format check** can report whether specified structural conditions pass. It cannot by itself establish correct biological normalization, eligible provenance, or predictive quality.
- A **local pseudo-split score** can compare methods under that chosen split and scorer protocol. It is not a competition score and does not prove that the split ranks methods like a hidden target.
- **Official evaluation** is whatever the current challenge server and rules define. The official pages take precedence over a community wrapper or an old notebook.

Ask, “What did this result measure?” before asking, “Is it good?”

### Exercise 3: decide whether to use external data

The safe answer is “not yet.” Public availability alone does not settle eligibility. The team should identify the exact release and source, inspect its reuse terms, justify stage/tissue/species relevance, check the current challenge rules for the proposed use, retain provenance, and document transformations. If any point is unresolved, do not silently treat the source as eligible.

### Exercise 4: audit a run

Useful records include the exact code revision, environment/package versions, input identifiers or hashes where permitted, configuration and random seeds, command, output path, and a link between the scored file and the final file. Agent-track evidence may have additional current requirements; read the current official rules. A transcript, hash, hook, or frozen bundle supports review but does not alone prove that a run complied with every rule.

## 60-minute version

Use the same boundaries and outcomes. Shorten the challenge map to 5 minutes, resource search to 8, validation exercise to 12, external-data decision to 10, reproducibility discussion to 10, and next-step plan/close to 10. Skip the optional share-out, not the safety and limitations prompts.

## Accessibility and inclusion

- Provide the Markdown worksheet in advance; do not require reading the slide deck quickly.
- Read prompts aloud, describe any visual material, and allow written or spoken responses.
- Pair participants by choice and allow solo work.
- Use captions for any remote call. This kit has no audio or video requirement.
- Avoid asking participants to disclose their leaderboard position, unpublished work, institution, or team strategy.

## After the session

Collect only voluntary feedback about clarity and missing prerequisites. Do not collect model files, private data, or unpublished results. If you publish notes or slides, include the date and link to the current official rules.
