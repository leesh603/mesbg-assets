# Terrain art provenance — 2026-10-13

Generated with the built-in Imagegen tool, using an inspected contact sheet of the repository's current painted pixel units and environments. Original character assets and original backgrounds are preserved.

Production paths: `assets/mesbg/terrain/*.png` (16 alpha cutouts) and `*.webp` (8 material textures). Import is a lossless split/trim for RGBA objects and WebP encoding for textures, performed by `tools/import-terrain-art.cjs`; these are final game assets, not debug shapes.

Reference files: `tokens/imrahil.png`, `tokens/theoden.png`, `tokens/sauron.png`, existing `tokens/terr_*.png` objects, and `backgrounds/bg_*.png` from baseline `a1a254cf6c3a1e0e91f6cc4a82208a62a6bf5ef3`.

## Prompt set

1. **Object atlas:** One production 4×4 transparent sprite atlas in the reference's subdued olive/grey, detailed painted pixel style with sharp stepped edges, high quarter view, upper-left lighting. No token bases, ground discs, UI, labels or frames. Reading order: oak, pine, dead tree, mossy boulders; Rohirrim dry stone wall, farm fence, spiked palisade, ruined Gondorian white wall; intact Gondorian high wall, Mordor black wall, mountain cliff shelf, Moria chasm rim; north–south wooden bridge, north–south stone bridge, wall rubble, charred fallen tree. Separate padded cutouts; restrained Tolkien architecture, clear decks and no fantasy crystals or decorative bridge towers.
2. **Ground atlas:** One exact 2×2 ground-only atlas, edge-to-edge quadrants and no separators. Top left: dry Rohan/Eriador olive meadow; top right: worn Gondor limestone paved earth; bottom left: scorched Mordor/Angmar charcoal ash earth with no lava; bottom right: mossy Ithilien/Fangorn soil and leaves. Same quiet, detailed painted pixel style, high view, small dithered clusters, no trees, rocks, walls, rivers, buildings, symbols or baked-in blocking features.
3. **Material atlas:** One exact 2×2 continuous pixel material atlas, no margins/labels. Top left: bright shallow grey-turquoise pebble stream; top right: dark navy/petrol deep river with gentle currents and no visible stones; bottom left: near-black Moria chasm texture with faint rock striations and no rim/bridge; bottom right: muted ochre gravel road with subtle wheel tracks. Reference-matched pixels and restrained contrast, no objects/shores/UI/gloss/crystals. Materials are masked by the authoritative authored geometry.

## Asset meaning

- Tree, rock, high wall, ruin, palisade and cliff sprites are physically blocking.
- Low stone walls and fences use the existing jump test; landing inside a barrier remains illegal.
- Bridges are traversable only on the actual deck footprint; rock/wood banks are not new walkable space.
- Rubble is traversable at half speed. Scorch marks are decorative and do not introduce invisible collisions.
