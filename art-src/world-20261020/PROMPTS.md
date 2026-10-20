# Generated art source and prompts

Built-in image generation. Character PNG used only as a style and camera reference: existing new Gondor warrior, high-angle front with slight three-quarter, limited pixel clusters, upper-left lighting. Character pixels and anatomical profiles were never edited.

1. Terrain atlas: sixteen isolated terrain sprites, oak/pine/dead tree/rock; stone wall/fence/palisade/ruin; white wall/black wall/cliff/chasm rim; wooden bridge/stone bridge/rubble/burnt tree. Transparent background, high-angle front, matching muted tactics pixel art, no base discs, no text, full silhouettes.
2. Ground material atlas: nine square material cells, meadow/woodland/limestone, dirt/basalt/dwarven slabs, marsh/scree/golden leaves. Equal 3x3 cells, edge-to-edge, pixel clusters and subdued contrast, no scene objects or horizon. Region-specific ground composites are freshly authored in src/world-art.js and baked by tools/bake-world-ground.cjs.
3. Landmark atlas: sixteen isolated regional landmarks, Gondor gate/Osgiliath dome/Arnor tower/Hornburg, Golden Hall/dwarf arch/furnace/iron gate, elven pavilion/mallorn/farmhouse/reed graves, standing stones/dark ruin/dark tower/dwarf column. Same camera, material scale and lighting, real transparency. First output is under quality review because the atlas gutters do not isolate all silhouettes.
4. Surface atlas: shallow ford/deep river/chasm/dirt path. Equal 2x2 cells, crisp horizontal ripple marks, distinct light shallows and dark impassable depth, low contrast, no shore or horizon.

Export: atlas slicing with measured alpha bounds, nearest sampling, palette PNG. Logical ground scale is two world units per art pixel. No source token is recoloured or resampled in place. Static surface caching and in-game tint are renderer operations.
