#!/usr/bin/env python3
"""Measure where each upright figure's feet are relative to its art origin.

Upright figures stand with their soles on the centre of the tilted ground disc. The art
origin (UNIT_ART_PROFILES centreX) is the body centre, which drifts from the feet when a
pose leans, steps or carries a long cloak. This scans the band just above the reviewed
sole landmark, keeps only boot-width runs (thin weapon shafts, staffs and spear butts are
ignored) and reports the offset [dx, dy] in world pixels; dy compares the lowest boot-width
row with the reviewed sole landmark (weapon tips and banners below the feet are ignored).

Usage: python3 tools/measure-feet-centre.py [--write]
  --write  replace the ART_FEET_DX table in src/game.js
"""
import json, re, sys
from PIL import Image

UPRIGHT = {'human', 'large-human', 'orc', 'dwarf', 'hobbit', 'goblin', 'troll', 'half-troll',
           'ent', 'balrog', 'giant', 'giant-humanoid', 'dark-lord'}
MIN_SHIFT = 3  # world px; smaller offsets are not visible
WIDE = .3      # feet lie within this fraction of the image width from the body centre; blades and shields further out are ignored

src = open('src/game.js', encoding='utf-8').read()
profiles = json.loads(re.search(r'const UNIT_ART_PROFILES = (\{.*?\});', src).group(1))
table = {}
for uid, r in sorted(profiles.items()):
    if r[6] != 'body' or r[0] not in UPRIGHT:
        continue
    try:
        im = Image.open(f'tokens/{uid}.png').convert('RGBA')
    except OSError:
        continue
    w, h = im.size
    alpha = im.split()[3].load()
    world_per_px = r[5] / (h * (r[2] - r[1]))
    def runs(y):
        out, x = [], 0
        while x < w:
            if alpha[x, y] > 160:
                start = x
                while x < w and alpha[x, y] > 160:
                    x += 1
                if x - start >= w * .05:
                    out.append(((start + x) / 2 / w, (x - start) / w))
            else:
                x += 1
        return out
    # Soles: the lowest row holding a boot-width run near the body (blades/shields further out are ignored).
    sole = None
    for y in range(h - 1, int(h * .5), -1):
        if any(abs(c - r[3]) <= WIDE for c, _ in runs(y)):
            sole = y
            break
    dy = round((sole / h - r[2]) * h * world_per_px, 1) if sole is not None else 0
    # Stance centre: in the band just above the soles, take the boot run closest to the body centre on
    # each side and use the midpoint between the two feet (a single run = feet together).
    dx = 0
    if sole is not None:
        left, right = [], []
        for y in range(max(0, sole - int(h * .06)), sole + 1):
            for c, k in runs(y):
                if abs(c - r[3]) > WIDE:
                    continue
                (left if c < r[3] else right).append((abs(c - r[3]), c, k))
        # Use the median foot position per side to resist single noisy rows.
        def foot(side):
            if not side:
                return None
            near = sorted(side)[:max(1, len(side) // 2)]
            cs = sorted(c for _, c, _ in near)
            return cs[len(cs) // 2]
        l, rr = foot(left), foot(right)
        if l is not None and rr is not None:
            centre = (l + rr) / 2
        else:
            centre = l if l is not None else rr
        if centre is not None:
            dx = round((centre - r[3]) * w * world_per_px, 1)
    dx = dx if abs(dx) >= MIN_SHIFT else 0
    dy = dy if abs(dy) >= MIN_SHIFT else 0
    if dx or dy:
        table[uid] = [dx, dy]

print(f'{len(table)} upright figures need a feet correction')
if '--write' in sys.argv:
    body = json.dumps(table, separators=(',', ':'))
    new, n = re.subn(r'const ART_FEET_DX=\{[^;]*\};', 'const ART_FEET_DX=' + body + ';', src)
    if n != 1:
        sys.exit('ART_FEET_DX table not found in src/game.js')
    open('src/game.js', 'w', encoding='utf-8').write(new)
    print('src/game.js updated')
