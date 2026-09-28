# Tactical upgrade — validation record

Source: origin/main 6871d36f21bcccced78be2a982abd1227cc03436.
Branch: feat/last-war-band-tactical-upgrade. No merge or deployment.

## Scope
Preserves the existing campaign, recruitment, relics, events, movement planner,
shooting, art and dice. Adds physical footprints from units.json, distinct spear
and two-rank pike support, cavalry charge resolution, role-aware AI and deployment,
terrain variations, fight participant preview, movement/HUD contrast, contextual
mobile layout, facing and combat presentation with existing TokenIdle/FX.
Editable sources are in runtime; scripts/build-upgrade.py updates the standalone
HTML. Run npm run build:game then npm test. No dependency installation required.

## Assets actually connected
All 268 catalog entries continue to resolve original embedded token/faction-base
art. Existing battlefield backgrounds, dice faces and combat effects are retained.
TokenIdle.attackSample drives attack animation. Repository PNGs
 tokens/terr_barricade.png, tokens/terr_fallen_log.png and tokens/terr_crates.png
are embedded separately and used by terrain. units.json supplies physical base_mm.
The original embedded asset block is byte-for-byte preserved, SHA256
2931fb888a8fae2313991fecdae59eefac71b5a7405c6ba318012019a4515edd.

## Automated results
20 passing tests: asset resolution, physical bases, 1/2/3v1, spear stats and
exclusions, pike ranks, cavalry, role AI, incremental movement, ally avoidance,
shooting obstruction, recruit cancellation/payment, heroic costs, production
fight integration, 60 stage definitions, 20 camp/save/relic/event scenario cycles,
formation collision checks, terrain and event ordering, embedded script syntax.
Camp scenarios force the enemy dead; they are state-transition tests, not evidence
of 20 naturally played victories or difficulty balance.

## Baseline classification and limits
Code inspection: partial movement, shooting, recruitment cancellation, relics,
events, camp saves and waves were already implemented; retained and regression
checked. Support accounting, physical bases, role AI, combat feedback and HUD
needed improvement. Public baseline browser interaction was performed in the
previous session, but exhaustive source-matched baseline classification was not
completed and should not be inferred from these tests.

UNVERIFIED: updated browser interaction and visual correctness on desktop,
390x844 and 844x390; touch pan/zoom; real-time selection, charge, combat animation,
HUD/modal overlap; natural multi-wave balance and browser persistence. Cloud
browser access to the local test server was blocked. Keep this PR draft until
those checks and any resulting fixes are complete. This is not a production-ready
or fully play-verified completion claim.

Recovery note: an earlier unpushed local commit was lost when the workspace reset.
This change was reconstructed against the newer source SHA above and retested.
