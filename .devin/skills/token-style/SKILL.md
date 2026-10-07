---
name: token-style
description: MESBG pixel-token generation rules — approved style, composition, and the draft-approval workflow. ALWAYS follow when generating or editing tokens in this repo.
---

# MESBG Token Style Rules

User-approved style. Do not deviate without explicit instruction.

## Camera & proportions (MOST IMPORTANT — user repeats this)
- **Steep top-down quarter view** — camera looks DOWN on the figure. Top of head/shoulders dominate the upper frame; body foreshortened below. NOT front view, NOT 45°, NOT side view.
- Chunky retro JRPG overworld-sprite proportions (Final Fantasy Tactics). **Updated 2026-10-07 (final lock): medium-stocky heroic build — head ≈ 1/4 of figure height. Reference tokens: barahir (ranger), huor (axeman), thrydan (burly).** NOT realistic 7-head proportions and NOT super-squat — the goal is the barahir/huor silhouette.
- Build VARIES per character — keep each unit's personality: burly/brawny characters (thrydan-type) → wider mass; normal warriors → barahir/huor medium; elves → slightly slimmer; monsters/mounts → fill frame. Do NOT force one numeric ratio on everyone; uniformity is in the PIXEL STYLE, not identical bodies.
- NEVER stretch or squash a sprite by resizing — regenerate at the right proportions instead (pixel-mangling is forbidden).
- Figure fills ~80–95% of frame height; feet toward the BOTTOM edge.
- Faces: hair/face visible for unhooded characters — dark hair must read as HAIR (strand texture), not blend into a hood mass. Only characters that canonically wear hoods (Nazgul etc.) get hoods. Aragorn = NO hood (wavy hair + face).

## Mounted figures
- ONE unified figure: rider's head/shoulders at TOP, FULL mount below — thick neck, rounded head, ears, muzzle pointing at BOTTOM edge.
- Horse/warg head must NOT dominate — rider is the top half, modest head size.
- Rider armor/design must match the foot version exactly (same colors, same gear).
- Fellbeast/flying mounts: rider sits on the NECK, not the back.

## Foot figures
- TWO separate legs/boots mid-stride at the bottom — a single tapered bottom reads as an animal head.
- Weapons shorter than or about equal to figure height — no needle-thin oversized spears/swords.

## Palette & rendering
- Flat chunky color regions, sharp pixel shading — avoid soft painterly gradients, but keep detail readable (middle ground, not over-flattened).
- Thick dark outline around the whole silhouette.
- GW model accuracy: copy the actual miniature's colors/pose when a reference photo exists (e.g. Theoden = maroon+gold, sword raised; Azog = chalk-white skin, spiked pauldron).
- Faction colors: Rohan green+gold, Gondor silver/black+white tree, Dol Amroth azure, Mordor black+red, Isengard white hand.

## Workflow (user rule)
- Show generated 시안(drafts) as chat attachments BEFORE pushing to the gallery. Wait for approval, then cut+build+push.
- Never regenerate user-approved tokens.
- After pushing main: `git push origin main:gh-pages --force-with-lease` (fetch first if lease is stale). Announce with `?v=` bump on both GitHub Pages and localhost:8181 gallery.
- Pipeline: `generate_image` → `_cut_jobs.json` `[file,rows,cols,[ids]]` → `node _manual_cut.js` → `node build-db.js && node build-codex.js` → `cp` to `../../gallery-site/` → commit/push.
