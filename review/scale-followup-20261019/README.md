# Scale and proportion follow-up — 2026-10-19

83 active profiles corrected after inspecting all 510 active combat sprites. 38 native art replacements/heraldry edits; preserved exact Glorfindel, Gil-galad foot and Erestor image bytes.

- Imrahil foot and mounted: Dol Amroth white swan and waves, replacing Gondor trees.
- Theoden: one straight sword, hilt and blade connected to the gripping hand; shorter foreshortened horse and larger rider.
- Glorfindel: corrected anatomical crowns, foot image displays 8.96% smaller, mounted 14.30% smaller, original raster bytes retained.
- Same humanoid species use the same body/rider targets without hero-name multipliers. Dwarf soldiers and heroes share68; humans and elves86/43.
- Canonical Theodred asset is tokens/theodred_mounted.png; legacy foot compatibility image stays unchanged.
- Corrected Guthlaf and three Nazgul rider landmarks; actual in-game display reviewed next to unchanged reference art at a common camera within each comparison.

Latest main 7a5905b4 base preserved: body-centred quarter-view placement, intent arrows, forecasts, recap and troop quirks. Additional six mounted anatomy refinements are layered onto the merged PR45 artwork.

Validation: node --test tests/*.test.cjs; actual Phaser83 sprites desktop/mobile in after-browser.json; focus.jpg contains the specifically requested characters. Native artwork is uniformly packed, never stretched by axis or limbs. Historical review hashes retained with explicit supersession.
