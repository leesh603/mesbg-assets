# MIDDLE-EARTH WARBANDS

Read `EDITING.md` and `docs/WORK_RESUME.md` before continuing an interrupted task.

- Reuse the recorded branch and commits. Check the connected GitHub repository and branch before editing. Never restart a completed batch or clone the full asset history just to resume a source change.
- Run `node tools/work-session.cjs status` before downloads, builds and browser checks. Low disk space is an environment failure, not a reason to repeat the same operation.
- Use `node tools/build.js --online-only` for normal source changes. Generate the large offline bundle only when it is requested.
- Keep source changes in `src/`; regenerate `index.html`. Preserve unrelated artwork and changes from other workers.
- Run one browser and one test batch at a time. Give commands a timeout and save their results before starting the next phase.
- After each verified batch, commit and push that batch to its existing work branch, then verify the remote SHA. Record completed checks and the exact next step in `docs/WORK_RESUME.md`; do not defer all preservation until the final report.
- Use the connected GitHub tools first. Do not request a replacement token while that connection works. Git Data blob/tree/commit/ref calls can preserve source changes without another large checkout.
- Send a short progress update at least once a minute during active work. Do not represent a local commit or an unverified deployment as complete.
- Merge and deploy only within the user's authorization. The current battlefield task explicitly includes both.
