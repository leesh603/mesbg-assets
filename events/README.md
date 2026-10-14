# Event illustration expansion

Twenty original scene paintings extend the existing Middle-earth event art. The original `evt_light.jpg`, `evt_wanderer.jpg` and `evt_darkforest.jpg` were used as visual references with the built-in image generation tool. Full prompts are preserved in `illustrations.json`.

The game loads only the current scene. JPEG assets are 1200 × 800, 3:2, and total approximately 6.44 MiB. Original thematic images remain available for other events. Event choice and outcome display the same scene; the scene identity survives save/resume.

| Scene | File | Event identifiers |
| --- | --- | --- |
| 곤도르의 피난민 | [evt_refugees_v2.jpg](evt_refugees_v2.jpg) | `refugees` |
| 절대반지의 유혹 | [evt_ring_v2.jpg](evt_ring_v2.jpg) | `ring` |
| 나즈굴의 추격 | [evt_nazgul_v2.jpg](evt_nazgul_v2.jpg) | `nazgul` |
| 야영지의 치유사 | [evt_healer_v2.jpg](evt_healer_v2.jpg) | `priest`, `apothecary`, `lost_warrior` |
| 이실리엔의 전쟁 회의 | [evt_council_v2.jpg](evt_council_v2.jpg) | `council` |
| 드워프 대장간 | [evt_smith_v2.jpg](evt_smith_v2.jpg) | `dwarven_smith`, `dwarf_market`, `dwarf_pact` |
| 마자르불의 기록실 | [evt_mazarbul_v2.jpg](evt_mazarbul_v2.jpg) | `mazarbul`, `balin` |
| 갈라드리엘의 거울 | [evt_mirror_v2.jpg](evt_mirror_v2.jpg) | `mirror` |
| 톰 봄바딜의 환대 | [evt_bombadil_v2.jpg](evt_bombadil_v2.jpg) | `bombadil` |
| 대독수리의 소식 | [evt_eagle_v2.jpg](evt_eagle_v2.jpg) | `eagle`, `eagle_eyrie`, `eagle_omen` |
| 판고른의 엔트 | [evt_ents_v2.jpg](evt_ents_v2.jpg) | `ents`, `ents_song`, `whispers`, `huorns` |
| 베오른의 식탁 | [evt_beorn_v2.jpg](evt_beorn_v2.jpg) | `beorn_feast`, `beorn_guest`, `beorning_hall` |
| 곤도르의 봉화 | [evt_beacons_v2.jpg](evt_beacons_v2.jpg) | `gondor_signal`, `beacon_relief` |
| 로히림의 맹세 | [evt_rohan_v2.jpg](evt_rohan_v2.jpg) | `redarrow`, `rohan_oath`, `rohirrim_horn` |
| 아르곤나스의 왕들 | [evt_argonath_v2.jpg](evt_argonath_v2.jpg) | `argonath` |
| 발리노르의 두 나무 | [evt_two_trees_v2.jpg](evt_two_trees_v2.jpg) | `two_trees`, `valar_grace` |
| 쉘롭의 굴 | [evt_shelob_v2.jpg](evt_shelob_v2.jpg) | `shelob_lair` |
| 버려진 미스릴 광산 | [evt_mithril_v2.jpg](evt_mithril_v2.jpg) | `mithril_vein`, `dwarf_vault` |
| 망자의 길 | [evt_deadpath_v2.jpg](evt_deadpath_v2.jpg) | `dead_men_path` |
| 이센가드의 연기 | [evt_isengard_v2.jpg](evt_isengard_v2.jpg) | `isengard_smoke`, `saruman_voice` |

Stage introductions also use the corresponding paintings for Fangorn, Moria, Edoras and Isengard.

Implementation: edit `src/game.js`; run `node tools/build.js`. The final CSS block in `index.html` controls full-scene event display without cropping.
