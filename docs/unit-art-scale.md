# Strict body calibration — 2026-10-13

Base: e35d54c47127848f8d06a34638e2d8b631ce0c15.

All 492 production combat rasters were viewed individually in numbered contact sheets (24 units per sheet). The audit records source SHA256, pixel dimensions and sheet/cell for each entry. Production assets/mesbg paths are authoritative; the root malbeth copy is different.

## Anatomical rules

- Walking: crown to lowest foot, excluding plume, crown spikes, weapons, banner, empty padding. Heights: hobbit 54, dwarf 67, human 86, large human 100.
- Riding: crown to seated pelvis, separately measured on every one of 99 mounted images; human 43, dwarf 36, orc 39, large human 50. Recheck head size and mount silhouette at the same camera zoom. Do not measure cloak/shoulder width.
- Nazgul use large-human stature on foot and mounted. Fellbeast riders retain their mount class and record large-human rider class.
- Creatures use anatomical body landmarks; wings, tails and weapons do not define stature. Existing eagle species differences are retained.
- Uniform scaling preserves source aspect ratio. Inherent pose/illustration differences are not removed by stretching a rider or mount.
- Collision radius, movement and combat rules do not change.

## Corrections

The 99 riding profiles were remeasured. 150 foot/creature profiles had incorrect landmarks corrected, including Earendil/Feanor torso-height errors, Hobbit empty-padding errors, weapon/plume contamination, and dwarf width proxies. Malbeth production art was rechecked separately. Nazgul and misclassified orc/Uruk profiles were corrected. Remaining foot references were individually reviewed and retained.

## Maintenance

1. Visually inspect every new/replaced production raster.
2. Update docs/unit-art-audit.json landmarks, SHA256, dimensions and visualReview.
3. Run node tools/sync-unit-art-profiles.cjs then node tools/build.js --online-only.
4. Run node --test tests/unit-art.test.cjs. Source hash validation detects replaced art with stale measurements.
5. Review actual game screenshots at identical zoom. Numerical span checks alone are not visual approval.

## 2026-10-14 completion

Recovered onto main 85c1da1 while retaining its UI. Dunhere mounted art was replaced and separately calibrated: helmet crown y63, seated pelvis y201 on the 212×500 source; 43 world pixels. Phaser verified all 492 reference spans and origins. See [actual game comparisons](../review/recovery-20261014/comparison.html) and [verification summary](../review/recovery-20261014/summary.json).


## 2026-10-14 fixed facing and base centering (v1.44)

All 492 source rasters were reviewed again for centre placement, independently of their size landmarks. 75 centres were adjusted, including Gandalf, bowmen, several mounted profiles, flying creatures and large beasts. `centerReview` records the rule and source for every profile.

- Walking units: the torso axis and anatomical body middle, excluding equipment.
- Cavalry: the combined rider and mount body middle, excluding weapons, flags, antlers and tails.
- Fellbeasts, Mumakil and the Great Beast: the creature torso; riders and platforms do not define the centre.
- The figure origin and base use the same local (0, 0). Directional mirroring, silhouette-based facing detection and mirrored-origin compensation are removed.
- Standing/rider height landmarks, scale, tactical position, collision radius and movement rules remain unchanged. Breathing, walking bob and combat lunges return to this origin.

## 2026-10-14 supplied stature calibration (v1.45)

Integrated the anatomical mask, trunk/area harmonization, rider analysis and physique targets from `gemini-code-1791945887714.js` as `tools/calibrate-unit-stature.cjs`. All 492 production rasters are checked against their reviewed source hash and dimensions before calibration. The game consumes only the precomputed profiles; no image analysis runs during gameplay.

286 humanoid/rider candidates agree with the reviewed anatomical landmarks and are applied. 206 profiles retain their reviewed landmarks: automatic landmark outliers, padded Hobbits, creatures and vehicles. In particular, the supplied detector mistakes some flags for bodies and some half-body silhouettes for complete stature. These candidates are recorded for review, never blindly applied. Unsupported creature targets, individual eagle species sizes, and giant mounted creature references are preserved. The supplied class targets and named physique adjustments apply where a unit uses that class's standard target.

The 492 separately reviewed centre points and fixed facing from v1.44 remain intact. Size measurements and centre measurements are independent. Existing source aspect ratios, collision radii and combat logic remain intact.

`node tools/calibrate-unit-stature.cjs` previews without writing. `--write` updates the audit and profiles; then run `node tools/build.js --online-only`. The tool does not commit or push. Stored original reviewed references make repeated calibration idempotent, and changed rasters require a new anatomical review.
