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
NEAR = .22     # boots lie within this fraction of the image width from the body centre; blades and shields further out are ignored

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
    centres, weights = [], []
    for y in range(max(0, int(h * (r[2] - .06))), min(h - 1, int(h * r[2])) + 1):
        x = 0
        while x < w:
            if alpha[x, y] > 160:
                start = x
                while x < w and alpha[x, y] > 160:
                    x += 1
                if x - start >= w * .05 and abs((start + x) / 2 / w - r[3]) <= NEAR:
                    centres.append((start + x) / 2)
                    weights.append(x - start)
            else:
                x += 1
    # Lowest row that still holds a boot-width run = where the soles really are.
    sole = None
    for y in range(h - 1, int(h * .5), -1):
        x, hit = 0, False
        while x < w and not hit:
            if alpha[x, y] > 160:
                start = x
                while x < w and alpha[x, y] > 160:
                    x += 1
                hit = x - start >= w * .05 and abs((start + x) / 2 / w - r[3]) <= NEAR
            else:
                x += 1
        if hit:
            sole = y
            break
    dy = round((sole / h - r[2]) * h * world_per_px, 1) if sole is not None else 0
    dx = 0
    if weights:
        feet = sum(c * k for c, k in zip(centres, weights)) / sum(weights) / w
        dx = round((feet - r[3]) * w * world_per_px, 1)
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
