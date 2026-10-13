# Three requested tasks — 2026-10-14

Base: main `85c1da1`. Branch: `fix/finish-three-tasks-20261014`.

- Restore the recovered 492-unit anatomical calibration to latest main without replacing its UI changes. Rider sizes use individually recorded crown-to-seated-pelvis landmarks; dwarf bodies use height; Nazgul retain large-human stature. Source SHA256 checks protect against replaced art with stale measurements.
- Replace Dunhere mounted art, both production/root copies and the UI thumbnail. Repair horse/rider anatomy while preserving green Rohan equipment and the existing pixel sprite style. Re-measure helmet crown y63 through seated pelvis y201 on the new 212×500 raster.
- Clean all 16 separated terrain sprites. Remove neighboring atlas fragments such as bridges beneath black walls and trees above fences. Preserve geometry, river/bridge movement and regional layouts. Original assets remain available in pinned base main `85c1da1`.
- Fix the passive control-help tooltip intercepting the speed button. Bump token cache a19→a20 and terrain2→terrain3.

## Validation

52 regression tests pass, including river/bridge/obstacle movement, all 27 regions, representative AI combat, hero identities, inventory and source hashes. After the tooltip/cache edit, 11 focused checks pass; inline scripts parse during build.

Actual Phaser renderer: 492/492 anatomical sizes and origins validated. Fixture screenshots compare units and selected maps at identical zoom; they are explicitly arranged QA scenes, not a campaign clear. Visual run: no JS/HTTP errors.

Ordinary game UI: recruit four units, confirm deployment, start battle, enable auto/speed; Latest run: 20 rounds, defeat/result screen (zero surviving allies). An earlier run reached reward phase at round 13; final screenshots wait until combat presentation finishes. No combat stat overrides. Final ordinary-play run: no JS/HTTP errors. This does not claim a full expedition clear.

See `summary.json`, `tests.txt`, `final-checks.txt`, `play-report.json`, `visual-report.json`, and `comparison.html`.
