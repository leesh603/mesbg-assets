---
name: token-style
description: MESBG pixel-token generation rules — approved style, composition, and the draft-approval workflow. ALWAYS follow when generating or editing tokens in this repo.
---

# MESBG Token Style Rules

User-approved style. Do not deviate without explicit instruction.

## PERMANENT RULE (locked 2026-10-11 — user demand, never violate)
- On ANY character modify/redraw request: FIRST study the live asset gallery (gallery.html / tokens/*.png) — quarter-view camera, head/body ratio, pixel rendering. Produce drafts ONLY on that baseline.
- EVERY generation MUST pass 2-3 approved live tokens as input_image_paths references. Text-prompt-only generation is FORBIDDEN — it produces wrong-angle/front-view slop.

## Camera & proportions (MOST IMPORTANT — user repeats this)
- **Steep top-down quarter view** — camera looks DOWN on the figure. Top of head/shoulders dominate the upper frame; body foreshortened below. NOT front view, NOT 45°, NOT side view.
- Chunky retro JRPG overworld-sprite proportions (Final Fantasy Tactics). **Head ≈ 1/4 of figure height (~4-5등신) — measured on parent's shipped tokens (wave24: hurin_thalion, warrior_minas_tirith, doriath_warrior, gondolin_guard ~330-350px, fill ~90%) and canon refs.** Do NOT make shorter chibi — user rejected 2.5등신 explicitly. Keep medium-stocky build.
- **GOLD-STANDARD references (user-supplied 2026-10-11, "이게 기준"): `.devin/skills/token-style/refs/ref_boromir_ranger.png`, `ref_uruk.png`, `ref_swordsman.png`, `ref_knight_green.png`, `ref_gandalfs.png` — feed 2-3 of these as input_image_paths for every generation. They show the true target: head ≈ 1/4~1/5, detailed painterly pixel-cluster shading, thin dark outline, quarter-view, faces shadowed.**
- Live-token references: `tokens/maglor.png`, `tokens/gwindor.png`, `tokens/celebrimbor.png`, `tokens/imrahil.png`, `tokens/aragorn_blackgate.png`, `tokens/fingolfin.png` and parent's wave24 (hurin_thalion, warrior_minas_tirith, doriath_warrior). NEVER reference tokens_painted/ for style.
- Parent-session confirmed spec: ~55° top-down, low-saturation palette, dark outline, face minimal — buried in helm shadow, static forward-advance poses preferred.
- Build VARIES per character — keep each unit's personality: burly/brawny characters (thrydan-type) → wider mass; normal warriors → barahir/huor medium; elves → slightly slimmer; monsters/mounts → fill frame. Do NOT force one numeric ratio on everyone; uniformity is in the PIXEL STYLE, not identical bodies.
- NEVER stretch or squash a sprite by resizing — regenerate at the right proportions instead (pixel-mangling is forbidden).
- Figure fills ~80–95% of frame height; feet toward the BOTTOM edge.

## Faces (PERMANENT RULE — added 2026-10-11 after many rejections)
- **EYES ARE NEVER DRAWN.** The head is tilted DOWN (chin toward chest) so the steep top-down view shows mostly hair/helm top; only the small lower face is visible and eyes read as 1-2 tiny dark shadow pixels at most. Approved examples: maglor, gwindor, celebrimbor, fingolfin v9.
- NEVER generate realistic detailed faces with visible eyeballs/nose/lips — that reads as "anime slop" and gets rejected.
- NEVER "fix" visible eyes by painting a dark band/shade over the eye area — that looks like censored holes. Regenerate with the head angled down instead.
- Unhooded characters show hair + brow + hint of lower face; hair must read as HAIR (strand texture). Only canonical hoods (Nazgul) get hoods. Aragorn = NO hood.

## Individuality (PERMANENT RULE — added 2026-10-11)
- Matching proportions does NOT mean identical silhouettes — every character must differ in armor shape, cloak drape, weapon angle, stance, and heraldry. Two tokens that read as "the same guy recolored" get rejected (elfhelm vs eomer_foot incident).
- Mounted variants MUST share the foot design exactly, but two different CHARACTERS must never share a body design.
- Heraldry must be lore-correct: Noldor = eight-pointed star; swan = Dol Amroth ONLY; white tree = Gondor; horse = Rohan. Never guess motifs.

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
