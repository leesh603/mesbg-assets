# Tactical terrain rework — actual game review

Baseline: `a1a254cf6c3a1e0e91f6cc4a82208a62a6bf5ef3`.
Branch: `rework/tactical-terrain-20261013`. No merge or deployment to main.

Open `MESBG_Terrain_Review.html` for the self-contained Korean report with actual before/after captures, stage wear, six movement checks and all 27 regional themes/captures. Images are embedded, so no separate asset downloads are needed to view the report.

`browser-report.json` records the final UI movement probes and ordinary first-battle outcome. `map-review.json` records the full regional browser capture pass; `comparison-report.json` records the matching-camera baseline comparisons. `all-tests.txt` is the final 68-test run; `campaign-tests.txt` records four full production-engine AI battles and 81 mission placement scenarios. Map/movement fixtures set starting positions; combat stats and resources are not changed.

Run from the repository root:

```
node tools/build.js --online-only
node --test tests/terrain.test.cjs tests/terrain-campaign.test.cjs tests/tactics.test.cjs tests/polish.test.cjs tests/progression.test.cjs tests/expedition-inventory.test.cjs tests/integrated-rework.test.cjs tests/hero-identities.test.cjs
node tests/terrain-browser.cjs
node tools/terrain-review-report.cjs
```

Browser QA requires Playwright and an available Chromium binary (`CHROMIUM_PATH` optionally points to an installed binary). Report/atlas tools use Sharp. These are developer QA dependencies; production boot has no new package or network dependency beyond the committed game assets. `ART_PROVENANCE.md` lists the Imagegen prompts and reference assets.
