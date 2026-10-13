# Live playtest runbook — reuse this before declaring execution blocked

Repository: leesh603/mesbg-assets. Live URL: https://leesh603.github.io/mesbg-assets/ . Diagnostic branch: diagnostics/playtest-20261013. Do not merge this branch into main or deploy without approval.

## Established working route

The local assistant browser/network environment previously failed to resolve or open the live site. This did NOT establish that the live game was unavailable. The successful alternative is GitHub Actions ubuntu-latest with its installed Google Chrome, driven by Playwright. Use the authenticated GitHub connector; no additional user token or reauthentication is needed when that connector works.

Original successful browser workflow: .github/workflows/live-gameplay-review.yml at commit 0e003421b41273a90a1f9117d08d6e1e9ef2186a (also present at 4c25e253c85da629779c0e2e45ed21167a692587). Original run 38324812691 completed successfully on 2026-10-13. Targeted reproduction workflow .github/workflows/live-review-repro.yml, commit 4c25e253c85da629779c0e2e45ed21167a692587, run 38325743433 also succeeded.

These workflows open the real live URL, not a source-only simulation. The historical gameplay driver exercises recruitment, manual movement preview/cancel/confirm when possible, normal UI auto-play, camp choices and reload/resume. It stops after two completed waves or defeat; this is NOT a full-game completion test.

## Current reusable recheck

.github/workflows/live-current-recheck.yml, introduced by a8207924004f063d893ff6e23455ef871300e14e, reuses the exact original driver from the pinned successful commit. It downloads only that small workflow, not the full multi-gigabyte repository.

It adds a normal-party case and a single-hero restart case, fresh mobile screenshots, lifecycle state observations, console summaries, same-tab restart via visible UI buttons if available, and live index.html byte comparison against the current main commit. The weaker party is selected through real recruitment UI; no health, kill count, victory, or inventory is injected.

Each artifact name includes run ID, case and attempt. When rerunning historical workflows, NEVER mistake an old artifact with the same name for fresh evidence. Check created_at, run_attempt, recorded timestamps and live-build.json. A workflow success alone is not sufficient: inspect the actual phase progression and whether each requested interaction ran.

Known limitations: restart button lookup must match the actual visible UI; a missing candidate means the restart case was NOT executed. A natural casualty without equipment may not generate a recoverable heirloom, and does not establish that an heirloom leak is fixed. Existing driver uses UI 4x speed and normally caps play at about 210 seconds. It does not submit rankings or change production files.

## Required evidence and communication

1. Check latest main SHA and repository permissions through the connected GitHub tools.
2. Open the real live game in remote Chrome using this known route before falling back to static analysis.
3. Keep the user informed immediately; do not hide an execution failure until a long final report.
4. Preserve screenshots, actions.json, error logs, live-build.json and before/after state. Distinguish normal UI play, controlled fixtures, source inspection and untested suggestions.
5. For cross-run leaks, keep the same browser context/storage, naturally create the relevant casualty/item, start a new expedition through UI, and check both visible UI and underlying state. A fresh browser context alone cannot test cross-run leakage.
6. Do not report a complete playthrough based on the first two waves. Do not use old screenshots as current evidence. Do not claim that local ERR_BLOCKED_BY_ADMINISTRATOR makes live play impossible before using this working alternative.

This file records the operational solution so subsequent project sessions can retrieve it instead of repeating failed local access attempts.
