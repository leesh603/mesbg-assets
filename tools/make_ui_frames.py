#!/usr/bin/env python3
"""Pixel UI frames for the mobile UI (9-slice border images, drawn at 1x and shown at 2x with image-rendering: pixelated).

Writes assets/mesbg/ui/frames/:
  panel.png            bronze frame for panels and sheets (transparent centre)
  card-<tier>.png      recruit/reward card frames: normal (iron) elite (verdigris) rare (steel blue) epic (amethyst) legendary (gold)
  btn-gold.png         filled gold button (pressed: btn-gold-down.png)
  btn-bronze.png       filled bronze button
  chip.png             small dark inset frame for stat chips and inputs
  grain.png            64x64 dither grain, tiled very faintly over panel backgrounds
Every frame is 18x18 with a 6px slice. Usage: python3 tools/make_ui_frames.py"""
import os, random
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'ui', 'frames')
INK = (10, 8, 6, 255)
S = 18


def hexrgb(h, a=255):
    h = h.lstrip('#')
    return (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), a)


def frame(dark, mid, light, fill=None, fill2=None, ornament=True, notch=True):
    """dark/mid/light metal tones. fill/fill2: optional centre gradient (top, bottom) for filled buttons."""
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0))
    px = im.load()
    D, M, L = hexrgb(dark), hexrgb(mid), hexrgb(light)
    if fill:
        F1, F2 = hexrgb(fill), hexrgb(fill2 or fill)
        for y in range(3, S - 3):
            t = (y - 3) / (S - 7)
            c = tuple(round(F1[i] + (F2[i] - F1[i]) * t) for i in range(3)) + (255,)
            for x in range(3, S - 3):
                px[x, y] = c
    for i in range(S):
        for j in range(S):
            d = min(i, j, S - 1 - i, S - 1 - j)       # ring index from the outside
            if d == 0: px[i, j] = INK
            elif d == 1: px[i, j] = D
            elif d == 2:
                top_left = (j == 2 and 2 <= i <= S - 3) or (i == 2 and 2 <= j <= S - 3)
                px[i, j] = L if top_left else M
            elif d == 3 and not fill: px[i, j] = (10, 8, 6, 170)
    if notch:   # clipped pixel corners
        for (cx, cy) in ((0, 0), (S - 1, 0), (0, S - 1), (S - 1, S - 1)):
            px[cx, cy] = (0, 0, 0, 0)
            nx, ny = (1 if cx == 0 else S - 2), (1 if cy == 0 else S - 2)
            px[nx, ny] = INK
    if ornament:  # small diamond rivet on each corner
        for (cx, cy) in ((3, 3), (S - 4, 3), (3, S - 4), (S - 4, S - 4)):
            for (dx, dy, c) in ((0, 0, L), (-1, 0, M), (1, 0, M), (0, -1, M), (0, 1, M)):
                px[cx + dx, cy + dy] = c
    return im


def save(im, name):
    os.makedirs(OUT, exist_ok=True)
    im.save(os.path.join(OUT, name), optimize=True)
    print('wrote', name)


save(frame('#3a2912', '#8a6a32', '#e2c27a'), 'panel.png')
TIERS = {
    'normal':    ('#26292b', '#6e767b', '#c3cbcf'),
    'elite':     ('#183020', '#4f9160', '#b7e3a4'),
    'rare':      ('#142439', '#3f74b4', '#b4d6fa'),
    'epic':      ('#28163a', '#8250b8', '#ddb6ff'),
    'legendary': ('#3d2706', '#c08a24', '#ffe594'),
}
for k, (d, m, l) in TIERS.items():
    save(frame(d, m, l), f'card-{k}.png')
save(frame('#5a3c0e', '#b88a2e', '#fff1bf', fill='#f6dd96', fill2='#c99a3c', ornament=False), 'btn-gold.png')
save(frame('#5a3c0e', '#a07a2a', '#e7c779', fill='#c99a3c', fill2='#e8c977', ornament=False), 'btn-gold-down.png')
save(frame('#2a1d0c', '#7a5c2a', '#c9a45e', fill='#3a2e1c', fill2='#1f180e', ornament=False), 'btn-bronze.png')
save(frame('#1a160f', '#3f3624', '#6b5c3a', ornament=False), 'chip.png')

random.seed(7)
g = Image.new('RGBA', (64, 64), (0, 0, 0, 0))
p = g.load()
for y in range(64):
    for x in range(64):
        r = random.random()
        if r < .06: p[x, y] = (255, 240, 200, 10)
        elif r < .14: p[x, y] = (0, 0, 0, 22)
save(g, 'grain.png')
