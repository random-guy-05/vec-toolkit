# VEC P3 Attempt Ledger

An offline, browser-based notebook for tracking the Virtual Embryo Challenge's two official P3 submissions per board. It records official submissions separately from unlimited format checks, keeps a per-board count, and lets a team export or restore its ledger.

## Why it exists

P3 has a small, phase-wide submission budget: two scored submissions per board for the entire phase. A scored submission is published when made and cannot be withdrawn. Format checks are unlimited and do not spend a scored attempt. This ledger makes those two kinds of action visible side by side when a team is planning its final uploads.

## Use

Open `index.html` in a modern browser and add the board names your team uses. After each action in the official Challenge portal, record it here as either a scored submission or a format check. The tool does **not** upload predictions or connect to the portal; the portal's count is authoritative. The team must record events accurately.

The ledger uses browser `localStorage` when available. Use **Export backup** before switching browsers or clearing browser data. Use **Restore backup** to replace the current local ledger from an exported JSON file. If storage is unavailable (which can vary for `file://` pages), the app says so; for reliable persistence, serve the folder locally with `python3 -m http.server 8000` and open `http://localhost:8000`.

## Privacy and limits

- The page is self-contained and makes no network requests apart from opening the official Rules link when chosen.
- Board names, timestamps and optional notes stay in the browser or in a backup you export.
- Do not put private file paths, credentials, or sensitive notes in the ledger.
- This is a manual planning aid, not an official counter, reservation, or eligibility decision.

## Official source

[Challenge Rules §11 — Leaderboard Entries and Final Entries](https://virtualembryo.ai/challenge/rules) defines the phase-specific limits, unlimited format checks, P3 non-withdrawability and best-score ranking.

Rules snapshot checked 14 October 2026. Recheck the official page before P3 because rules may change.

## License

MIT. See [LICENSE](LICENSE).
