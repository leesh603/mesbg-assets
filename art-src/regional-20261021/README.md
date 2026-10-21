# Middle-earth regional rebuild — 2026-10-21

Main baseline: 51d62e5. The preceding rejected map work ce43997 is retained as the before view. Main is not modified by this branch.

Each of the 27 registered regions owns its battlefield geometry, approach routes, river course or chasm, crossings, physical object footprints and regional art. Definitions: src/tactical-terrain.js; baked ground compositor: src/world-art.js.

Built-in image_gen produced 27 architecture/tree sprites, a nine-material ground atlas, a Khazad-dum bridge, three rock shelves and four environmental FX. Sprites are cropped from measured alpha bounds and exported without repainting source characters. Regional atlas prompts: provenance.json. Export rectangles: slices.json and details.json. Generated source atlases stay separate from production exports.

Open arches collide on their piers, leaving the doorway walkable. Display dimensions and foundations are separate from roof/canopy height. Deep river, ford and bridge geometry drive navigation and rendering together. Preparation saves migrate older layouts to v3; current v3 placements persist unchanged.

Effects are baked when stages change: indoor stone dust, forest leaf litter, settlement fire and dark-land smoke. Background cache stays limited to three maps.

Browser review uses the actual engine and a deterministic four-unit fixture. It demonstrates the rendered maps, not hardware performance or a complete campaign playthrough. Separate regression tests cover missions, paths and production AI battles. No main merge or deployment is authorized.
