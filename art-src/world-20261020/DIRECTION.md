# World art renewal

Baseline main: a3e8a6983a9f5d701df0669d92de41941d5cffe5.

Scope: all 27 registered regions and 135 progression states. Character source images and anatomical profiles are immutable.

Shared camera: high-angle front, about 40 degrees, slight three-quarter, no horizon. Character human reference stature remains 86 world pixels. Ground is authored at 2 world pixels per logical art pixel; image scaling uses nearest sampling. Terrain fronts and top planes share upper-left light. Reduce ground contrast beneath characters instead of drawing bright character outlines.

Geometry remains authoritative in tactical-terrain.js. Ground patches and shadows never introduce collision. Solid objects are footpoint anchored and share the unit depth band; bridges remain below units. The playable deck width is drawn from bridge.w, not the decorative rails. Foreground objects fade only while they cover a live figure, retaining readable wall edges and tactical overlays.

Regional art is composed afresh from generated pixel materials, drawn roads/banks from engine geometry, bespoke regional masonry/cultivation/vegetation, and separated terrain sprites. The original repeated ground textures and archival background paintings remain available for baseline comparison. No production character PNG, base skeleton, combat statistic or save schema is changed.

Benchmarks, used for principles only (no copied assets):
- Tactics Ogre Reborn: https://www.square-enix-games.com/en_US/games/tactics-ogre-reborn
- Songs of Conquest: https://www.songsofconquest.com/
- Sea of Stars: https://sabotagestudio.com/presskits/sea-of-stars/
- Triangle Strategy: https://www.square-enix-games.com/en_US/games/triangle-strategy
- Into the Breach: https://subsetgames.com/itb.html

Acceptance is pending actual engine screenshots and gameplay/performance evidence. Never mark pending maps passed based on a generated asset alone.
