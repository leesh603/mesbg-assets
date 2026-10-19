# Unit redraw and Lorien weapons — 2026-10-19

Base: `d0c126de25adec191d954f5d0841cd753c5d6089` (latest main at start).

Rúmil had a bow in the expansion catalog, 830 range / 3+ shooting in his inherited profile, and stale extra-shot skill text. He now has sword/shield metadata and no inherent shooting. Orophin had spear metadata and a support trait despite using two blades; both are corrected. Their existing contact-based defensive/offensive signature abilities and 85-point costs are retained. Old saves, imports and retries pass through the weapon repair before equipment is reapplied, preserving earned stats, injuries, kills, equipment and resources. A deliberately equipped hunting bow still follows the existing equipment rules.

Official costume/weapon reference: [Warhammer Community — mighty Elven heroes](https://www.warhammer-community.com/en-gb/articles/KNIccgFZ/middle-earth-strategy-battle-game-warhammer-preview-online-mighty-elven-heroes-arrive/) (Rúmil's defensive shield/sword; Orophin's two blades).

All 18 additions in `data/troop-new-units.json`, Rúmil, Orophin and both Elrond forms were redrawn through built-in image_gen, one asset per call. Glorfindel foot/mounted establish the pixel shading, elevated quarter view, approximately five-head human/elf anatomy and rider readability. Gimli and the existing Uruk establish the shorter, broader dwarf/orc silhouettes. Equipment, kingdom colors and elite distinctions are retained. Glorfindel reference assets are unchanged.

`prompts.json` records every final generation prompt; `measurements.json` records manually reviewed anatomical landmarks, independently of alpha envelopes, weapons and helmet plumes. All final sprites use uniform aspect-preserving reduction to at most 384px RGBA. Production and root gallery copies, native source copies, 160px WebP card portraits and cache revisions are synchronized. Both static galleries correct the Lorien weapon labels, outdated stat lines and fixed dimensions that would distort the replaced images. Original production PNGs are preserved under `art-src/unit-redraw-20261019/before/`; previous high-resolution troop sources are retained in their existing directory.

## Validation

- `node --test tests/*test.cjs`: 78 tests, including actual recruitment/dark-event simulations, points, promotions, save migration, source/raster hashes and native art dimensions.
- `node tests/hero-identities.test.cjs`: all 293 hero profiles execute on both sides; evolution/save/ability guards pass.
- `BROWSER_EXECUTABLE=<headless-shell> node tests/unit-redraw-browser.cjs`: actual Phaser before/after rendering of every redraw, unchanged Glorfindel references, a 390×844 mobile viewport, live anatomy measurements and live melee profiles; no page errors. The baseline HTML was retrieved from the base main deployment; originals are served from the preserved copies for the before run.
- No per-frame image analysis or new gameplay network requests. The 22 production PNGs total about 2.86MB versus 2.77MB before; native dimensions remain at most 384px.

Open [the full comparison](index.html). The manifest includes production/source/backup paths, dimensions and SHA256 for all 22 sprites. Gameplay source and the served HTML are checked for exact equality.
