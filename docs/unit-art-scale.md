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
