#!/usr/bin/env python3
"""Pixel UI kit v2: plaque buttons and medallion rings, drawn at 1x.

The page shows them at an integer number of device pixels per art pixel (--px in CSS), so edges stay sharp on
phones with fractional devicePixelRatio. Writes assets/mesbg/ui/kit/:
  plaque-<gold|iron>[-down].png   3-slice buttons: pointed bronze end caps (CAP px) + plate (H tall)
  plaque-<gold|iron>-s[-down].png small (action bar) version, no gems
  medal.png                       round ring for icon buttons
Usage: python3 tools/make_ui_kit.py
9-slice for a plaque: border-image-slice 0 (CAP+4) fill; big plaques CAP=14 (slice 18), small CAP=6 LEAD=3 (slice 9)."""
import os, math
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'ui', 'kit')
INK = (12, 8, 5, 255)
CLEAR = (0, 0, 0, 0)


def rgb(h, a=255):
    h = h.lstrip('#'); return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), a)


def band(t, bands):
    for f, c in bands:
        if t <= f: return rgb(c)
    return rgb(bands[-1][1])


def plaque(name, H, CAP, plate, cap, gem=None, pressed=False, LEAD=4):
    """plate/cap: dict(bands=[(frac, colour)...], hi, lo, edge, lip=(a,b)); gem: (dark, mid, light)."""
    MID = 4                      # uniform middle sample; slice = CAP + LEAD on each side
    W = (CAP + LEAD) * 2 + MID
    im = Image.new('RGBA', (W, H), CLEAR); px = im.load()
    LIP = 1 if pressed else 3
    top = 2 if pressed else 0
    fh = H - top - LIP          # face rows: top .. top+fh-1, lip below
    mid_y = top + (fh - 1) / 2
    tip = CAP // 2 - 1           # how far the pointed end reaches in

    def cap_left_edge(y):        # outer silhouette x of the left cap at row y (chevron point)
        yy = min(max(y, top), top + fh - 1)
        return round(abs(yy - mid_y) / ((fh - 1) / 2) * tip)

    def solid(x, y):
        if not (top <= y < H and 0 <= x < W): return False
        xl = cap_left_edge(y)
        return xl <= x <= W - 1 - xl

    for y in range(H):
        for x in range(W):
            if not solid(x, y): continue
            edge = not all(solid(x + a, y + b) for a, b in ((1, 0), (-1, 0), (0, 1), (0, -1)))
            ry = y - top
            in_cap = x < CAP or x >= W - CAP
            P = cap if in_cap else plate
            if edge: px[x, y] = INK; continue
            if ry >= fh: px[x, y] = rgb(P['lip'][0] if ry < fh + LIP - 1 or LIP == 1 else P['lip'][1]); continue
            px[x, y] = band(ry / max(1, fh - 1), P['bands'])
            # bevel: first row / first column inside the ink is light on top-left, dark bottom-right
            if not solid(x, y - 2) or ry == 1: px[x, y] = rgb(P['hi'])
            elif ry == fh - 1: px[x, y] = rgb(P['lo'])
    # seams between caps and plate: ink line + light line on the plate side
    for y in range(top + 1, H - 1):
        for (sx, lx) in ((CAP - 1, CAP), (W - CAP, W - CAP - 1)):
            if px[sx, y][3]: px[sx, y] = INK
            if px[lx, y][3] and px[lx, y] != INK and y - top < fh - 1: px[lx, y] = rgb(plate['hi'])
    # plate engraving: inset rectangle with notched corners and a light underline
    e0, e1 = top + 3, top + fh - 4
    x0 = CAP + LEAD - 2; x1 = W - 1 - x0
    for x in range(x0 + 1, x1):
        px[x, e0] = rgb(plate['edge']); px[x, e0 + 1] = rgb(plate['hi'])
        px[x, e1] = rgb(plate['edge']); px[x, e1 + 1] = rgb(plate['hi'])
    for y in range(e0 + 1, e1):            # short vertical ends of the engraved frame
        px[x0, y] = rgb(plate['edge']); px[x0 + 1, y] = rgb(plate['hi'])
        px[x1, y] = rgb(plate['edge']); px[x1 - 1, y] = rgb(plate['lo'])
    # cap details: gem in a diamond bezel, rivets above and below
    cxs = (CAP // 2 + 1, W - CAP // 2 - 2)
    cy = round(mid_y)
    for cx in cxs:
        if gem:
            for dy in range(-4, 5):
                for dx in range(-4, 5):
                    d = abs(dx) + abs(dy)
                    if d == 4: px[cx + dx, cy + dy] = INK
                    elif d == 3: px[cx + dx, cy + dy] = rgb(cap['hi'] if dy < 0 or (dy == 0 and dx < 0) else cap['lo'])
                    elif d <= 2:
                        px[cx + dx, cy + dy] = rgb(gem[1] if dy <= 0 else gem[0])
            px[cx - 1, cy - 1] = rgb(gem[2]); px[cx, cy - 2] = rgb(gem[2])
        for ry in (top + 3, top + fh - 4):
            if solid(cx, ry) and px[cx, ry] != INK:
                px[cx, ry] = rgb(cap['hi']); px[cx + 1, ry] = rgb(cap['lo']); px[cx, ry + 1] = rgb(cap['lo'])
    os.makedirs(OUT, exist_ok=True)
    im.save(os.path.join(OUT, name), optimize=True); print('wrote', name, im.size)


BRONZE = dict(bands=[(.2, '#c9954a'), (.5, '#a8743a'), (.8, '#8a5a2a'), (1, '#6e4520')],
              hi='#f0c884', lo='#4e2e12', edge='#3a220c', lip=('#4a2c10', '#2a180a'))
GOLD = dict(bands=[(.12, '#fff0bc'), (.3, '#f6d67e'), (.55, '#ebc05a'), (.8, '#d9a442'), (1, '#c28a2e')],
            hi='#fff8dc', lo='#8a5a16', edge='#a06a1a', lip=('#8a5812', '#5a3608'))
IRON = dict(bands=[(.12, '#5e574e'), (.35, '#463f37'), (.7, '#37312a'), (1, '#2a2520')],
            hi='#7d7466', lo='#191511', edge='#15110d', lip=('#2a2520', '#16120e'))
STEEL_CAP = dict(bands=[(.2, '#8d8a84'), (.5, '#6e6a63'), (.8, '#55514a'), (1, '#423e38')],
                 hi='#c9c4b8', lo='#2a2723', edge='#1a1815', lip=('#2a2622', '#16130f'))
RUBY = ('#7a1410', '#d4382c', '#ffc0aa')
SAPPHIRE = ('#123058', '#3f86d0', '#cfe8ff')

for down, sfx in ((False, ''), (True, '-down')):
    plaque(f'plaque-gold{sfx}.png', 30, 14, GOLD, BRONZE, RUBY, down)
    plaque(f'plaque-iron{sfx}.png', 30, 14, IRON, BRONZE, SAPPHIRE, down)
    plaque(f'plaque-gold-l{sfx}.png', 38, 14, GOLD, BRONZE, RUBY, down)
    plaque(f'plaque-gold-s{sfx}.png', 22, 6, GOLD, BRONZE, None, down, LEAD=3)
    plaque(f'plaque-iron-s{sfx}.png', 22, 6, IRON, STEEL_CAP, None, down, LEAD=3)


WELL_DARK = ('#3c2c1c', '#2a1e13', '#1c140c', '#120c07')
WELL_GOLD = ('#fff0b8', '#ecc260', '#c88e2e', '#9a6418')


def medal(name, R=14, well=WELL_DARK):
    S = R * 2 + 3
    im = Image.new('RGBA', (S, S), CLEAR); px = im.load(); c = (S - 1) / 2
    for y in range(S):
        for x in range(S):
            d = math.hypot(x - c, y - c); ang = math.atan2(y - c, x - c)
            lit = math.cos(ang + math.pi * .75)   # light from the top-left
            if d <= R + 1.2: px[x, y] = INK
            if d <= R + .2: px[x, y] = rgb('#f6dc96' if lit > .35 else '#d6a24a' if lit > -.35 else '#9a6a24')
            if d <= R - .8: px[x, y] = rgb('#b8843a' if lit > 0 else '#8a5a22')
            if d <= R - 1.8: px[x, y] = rgb('#6e4520')
            if d <= R - 2.8: px[x, y] = INK
            if d <= R - 3.8:
                t = (y - c) / R
                px[x, y] = rgb(well[0]) if t < -.45 else rgb(well[1]) if t < .25 else rgb(well[2])
                if R - 4.8 < d and lit < -.2: px[x, y] = rgb(well[3])   # inner shadow bottom-right
    for a in range(0, 360, 45):
        x = round(c + (R - .8) * math.cos(math.radians(a))); y = round(c + (R - .8) * math.sin(math.radians(a)))
        px[x, y] = rgb('#fff6d0')
    im.save(os.path.join(OUT, name), optimize=True); print('wrote', name, im.size)


medal('medal.png')
medal('medal-gold.png', 21, WELL_GOLD)


# tier gems (7x7 cut diamond) shown before tier names instead of a filled label box
GEMS = {'normal': ('#4a4f53', '#9aa0a4', '#e4e8ea'), 'elite': ('#1f5a2c', '#5fbf72', '#d2f5c8'),
        'rare': ('#173d72', '#4f8fe0', '#d0e6ff'), 'epic': ('#43206e', '#a066e0', '#ecd6ff'),
        'unique': ('#6a1440', '#e05ca3', '#ffd6ec'), 'legendary': ('#7a4a08', '#f0b43a', '#fff3c4')}
for k, (d, m, l) in GEMS.items():
    g = Image.new('RGBA', (7, 7), CLEAR); px = g.load()
    for y in range(7):
        for x in range(7):
            r = abs(x - 3) + abs(y - 3)
            if r == 3: px[x, y] = INK
            elif r < 3: px[x, y] = rgb(m if y <= 3 else d)
    px[2, 2] = rgb(l); px[3, 1] = rgb(l); px[3, 2] = rgb(l)
    g.save(os.path.join(OUT, f'gem-{k}.png')); print('wrote', f'gem-{k}.png')
