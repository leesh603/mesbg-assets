# HUD polish review — 2026-09-28

Base: `d14fffb0ccb4301df84ae5e775fa5658b396116a`
Branch: `feat/tactical-hud-polish-20260928`

## Changes

- Battlefield-first layout: compact phase strip, persistent selected-unit HP / Move / Attack / Defense / Fight and hero resources, optional command drawer.
- Existing portraits, faction bases, maps and effect assets retained. Flat frames, quiet colors, reduced introductory copy, reduced hit particles and camera shake.
- Gold active-unit ring; contrasting movement contour, obstacle marks, charge brackets and exact destination/path preview.
- PC and touch use destination/target preview, explicit confirmation and cancel. Skills use the same command bar. Mobile controls retain 44px minimum targets, safe-area spacing, pan and pinch gestures.
- Event/relic choices are previewable, reversible and saved. Offers span different existing relic build families; recruitment includes varied troop roles.
- Enemy count grows more gradually. Wounds/Attack no longer grow without bound; late Fight/Strength bonuses are capped. AI additionally considers wounded targets and large Fight disadvantages.
- Fixes: serialized camp events recover their effect callbacks; priority/CP rewards persist; new runs clear prior camp state; heroic movement no longer refunds spent distance; 40mm cavalry and 60mm cave-troll physical bases are respected.

## Verified

- `node --check src/game.js`: pass.
- `node tools/build.js`: pass, approximately 52.9 MiB standalone HTML.
- `node --test tests/*.test.cjs`: 29 tests pass. Harness now executes production tactics instead of the outdated runtime reference copy.
- Coverage includes partial movement, collision/yielding, Charge, shooting obstruction, spear/pike support, multiple combat, cavalry knockdown, recruitment cancel/confirm, event/relic preview and confirmation, save/load, 60 stage definitions and 20 camp cycles.
- Seed 20260928 model-only AI simulation: 5 waves cleared in 414 loop iterations, without forced kills or forced wins. This verifies state transitions, not visual gameplay or broad balance.
- Both generated HTML files are byte-identical. All bytes outside the source markers, including embedded images, remain unchanged from base main.

## Pending — 미검증

- PC actual browser play: unavailable. Cloud browser denied the local HTTP server (`ERR_BLOCKED_BY_CLIENT`) and disallowed file URLs. No browser-policy workaround was attempted.
- Mobile viewport/touch actual play: unavailable for the same reason. Responsive rules and input handlers are implemented but visual fit, tap comfort, pan/pinch and real frame rate still require device/browser review.
- No visual screenshots or commercial-quality claim. Long-run difficulty requires human playtesting. Keep this PR as a draft until those checks are completed.

## Review before merge

Open the built `index.html` locally, or on an approved non-production preview. Check 1440×900, 390×844, 360×800 and landscape 844×390. Play start → selection → move/Charge/shoot confirmation/cancel → Fight/support → AI → wave clear → event/recruit/relic → save/reload → next wave. Check the command drawer, keyboard focus, HUD overlap and frame rate with a large army.

No main merge or production deployment was performed.
