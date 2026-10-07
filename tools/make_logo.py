#!/usr/bin/env python3
"""Draws the 미들어스 워밴드 title logo as pixel art → assets/mesbg/ui/logo.png.

Hi-bit look: Galmuri pixel lettering doubled, banded gold shading with lit top edges and a
two-step dark outline, a pixel gold ring around the title with a faint ember glow, a small
star above, and a red pennant ribbon with MIDDLE-EARTH WARBAND below. The PNG is drawn at
logo-pixel scale and shown at 2x with image-rendering: pixelated.

Fonts: Galmuri (SIL OFL 1.1) — https://github.com/quiple/galmuri  (dist/Galmuri11-Bold.ttf, dist/Galmuri7.ttf)
Usage:  python3 tools/make_logo.py <path to galmuri/dist>"""
import math, os, sys
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'ui', 'logo.png')
DIST = sys.argv[1]
BOLD = ImageFont.truetype(os.path.join(DIST, 'Galmuri11-Bold.ttf'), 12)
TINY = ImageFont.truetype(os.path.join(DIST, 'Galmuri7.ttf'), 8)

W, H = 172, 132
hexc = lambda h: tuple(int(h[i:i + 2], 16) for i in (1, 3, 5)) + (255,)


def text_mask(text, font, tracking, space):
    """1-bit mask of a line, glyph by glyph (no antialiasing)."""
    glyphs, x = [], 0
    for ch in text:
        if ch == ' ':
            x += space; continue
        im = Image.new('L', (24, 20), 0); d = ImageDraw.Draw(im); d.fontmode = '1'
        d.text((0, 0), ch, font=font, fill=255)
        glyphs.append((im, x)); x += int(font.getlength(ch)) + tracking
    m = Image.new('L', (x + 24, 20), 0)
    for im, gx in glyphs: m.paste(im, (gx, 0), im)
    return m.crop(m.getbbox())


def px(mask):
    w, h = mask.size; p = mask.load()
    return {(x, y) for y in range(h) for x in range(w) if p[x, y]}


def dilate(s, r=1):
    return {(x + dx, y + dy) for x, y in s for dx in range(-r, r + 1) for dy in range(-r, r + 1)}


canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
P = canvas.load()
def put(x, y, c):
    if 0 <= x < W and 0 <= y < H: P[x, y] = c

# ── title lettering: two stacked lines of Galmuri11 Bold, scaled up ──
def line_set(text, scale, ty):
    m = text_mask(text, BOLD, 1, 5)
    m = m.resize((m.width * scale, m.height * scale), Image.NEAREST)
    x0 = (W - m.width) // 2
    return {(x + x0, y + ty) for x, y in px(m)}, x0, m.width, ty, m.height
L1 = line_set('미들어스', 2, 22)
L2 = line_set('워밴드', 3, 22 + L1[4] + 6)
letters = L1[0] | L2[0]
GOLD = [hexc(c) for c in ('#fff7d4', '#ffe18e', '#f4bf55', '#d9993a', '#b0701f', '#7a4513')]
def gold_i(y):
    for st, x0, w, ty, h in (L1, L2):
        if ty <= y < ty + h:
            t = (y - ty) / h
            return 1 if t < .34 else 2 if t < .55 else 3 if t < .8 else 4
    return 3
TX = min(L1[1], L2[1]); tw = max(L1[2], L2[2]); th = L2[3] + L2[4] - L1[3]; TY = L1[3]

# ── ring around the title ───────────────────────────────────────────
cx, cy = W / 2 - .5, TY + th / 2
RX, RY, T = W / 2 - 3, th / 2 + 13, 3.0
ring = set()
for y in range(H):
    for x in range(W):
        dx, dy = x - cx, y - cy
        if (dx / RX) ** 2 + (dy / RY) ** 2 <= 1 and (dx / (RX - T * 1.25)) ** 2 + (dy / (RY - T)) ** 2 > 1:
            ring.add((x, y))
RING = [hexc(c) for c in ('#fff3c4', '#f5d27a', '#dca449', '#b17a2c', '#7f4f18')]
for x, y in dilate(ring) - ring: put(x, y, hexc('#1a0d05'))
for x, y in ring:
    a = math.atan2((y - cy) / RY, (x - cx) / RX)
    light = -math.sin(a) * .55 + math.cos(a + .6) * .35
    put(x, y, RING[0 if light > .62 else 1 if light > .25 else 2 if light > -.15 else 3 if light > -.5 else 4])

# ── lettering: drop shadow, two-step outline, banded gold, lit edges ─
o1 = dilate(letters) - letters
o2 = dilate(letters, 2) - letters - o1
for x, y in {(x, y + 2) for x, y in o2 | o1 | letters} - letters - o1 - o2:
    put(x, y, (0, 0, 0, 160))
for x, y in o2: put(x, y, hexc('#120904'))
for x, y in o1: put(x, y, hexc('#4a260c'))
for x, y in letters:
    c = GOLD[gold_i(y)]
    if (x, y - 1) not in letters: c = GOLD[0]
    elif (x, y + 1) not in letters: c = GOLD[5]
    put(x, y, c)
for st, x0, w, ty, h in (L1, L2):
    for gx in (x0 + 3, x0 + w - 8):
        for dx, dy in [(0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)]:
            if (gx + dx, ty + 1 + dy) in letters: put(gx + dx, ty + 1 + dy, hexc('#ffffff'))

# ── star above the ring ─────────────────────────────────────────────
sx, sy = int(cx), int(cy - RY - 1)
star = {(sx + a, sy + b) for a, b in [(0, k) for k in range(-4, 5)] + [(k, 0) for k in range(-4, 5)] +
        [(-1, -1), (1, -1), (-1, 1), (1, 1), (-2, -2), (2, -2), (-2, 2), (2, 2)]}
for x, y in dilate(star) - star: put(x, y, hexc('#1a0d05'))
for x, y in star:
    r = abs(x - sx) + abs(y - sy)
    put(x, y, hexc('#ffffff') if r <= 1 else hexc('#fff0b0') if r <= 3 else hexc('#e8b850'))

# ── pennant ribbon with MIDDLE-EARTH WARBAND ────────────────────────
rm = text_mask('MIDDLE-EARTH WARBAND', TINY, 1, 4)
rw, rh = rm.size
BW, BH = rw + 14, 12
bx, by = (W - BW) // 2, int(cy + RY - 6)
RED = [hexc(c) for c in ('#e0573c', '#b8352a', '#8e2219', '#66140f')]
for side in (-1, 1):
    x0 = bx - 9 if side < 0 else bx + BW - 3
    tail = {(x, y) for x in range(x0, x0 + 12) for y in range(by + 4, by + 4 + BH)}
    tail -= {(x0 + i if side < 0 else x0 + 11 - i, by + 4 + j) for j in range(BH) for i in range(0, 4 - abs(j - BH // 2) // 2 + 1)}
    for x, y in dilate(tail) - tail: put(x, y, hexc('#120904'))
    for x, y in tail: put(x, y, RED[2] if (y - by - 4) < BH * .6 else RED[3])
main = {(x, y) for x in range(bx, bx + BW) for y in range(by, by + BH)}
for x, y in dilate(main) - main: put(x, y, hexc('#120904'))
for x, y in main:
    t = (y - by) / BH
    put(x, y, RED[0] if t < .2 else RED[1] if t < .65 else RED[2])
for x in range(bx + 1, bx + BW - 1):
    put(x, by + 1, hexc('#f0c66a')); put(x, by + BH - 2, hexc('#b9802f'))
for x, y in px(rm):
    put(bx + 7 + x, by + 3 + y, hexc('#ffe7a0'))

os.makedirs(os.path.dirname(OUT), exist_ok=True)
canvas = canvas.crop(canvas.getbbox())
canvas.save(OUT, optimize=True)
print('wrote', OUT, canvas.size)
