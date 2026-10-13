#!/usr/bin/env python3
"""Pixel-art unit bases → assets/mesbg/bases/base_<faction>_<size>.png (same names the game already loads).

Each base is drawn as a small miniature plinth seen from above at a slight angle:
  * a terrain top face per faction (flagstones, grass, ash with ember cracks, granite tiles, moss, sand, ice ...)
    with dithered shading, pebbles / tufts and light from the top-left,
  * a bevelled rim in the faction metal with a highlight arc and a darker side band (thickness) at the bottom,
  * the faction emblem from the previous flat bases, inlaid into the ground as engraved metal at low contrast,
    so the faction still reads while the figure stands on it.
Drawn on a 56–120 px logical grid (by base size) and enlarged 4x with nearest-neighbour so the pixels match the unit tokens.
The previous flat bases are kept in art-src/bases-flat/ (they are the emblem source). Usage: python3 tools/make_bases.py"""
import os, math, random, shutil
import numpy as np
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'bases')
SRC = os.path.join(ROOT, 'art-src', 'bases-flat')
SIZES = ['S', 'M', 'L', 'XL', 'XXL']
N = 64            # logical pixels
UP = 4            # export scale

def hx(h): h = h.lstrip('#'); return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float)

# ground: base, dark, light, accent ; rim: dark, mid, light ; pattern
STYLE = {
 'gondor':     dict(g=('#8d9298', '#5d6268', '#b9bec2', '#7b8a6a'), rim=('#2f3338', '#8e969c', '#e3e8ea'), pat='flag'),
 'rivendell':  dict(g=('#c9c3b2', '#958f80', '#ece7d8', '#9fb08a'), rim=('#3b3a35', '#b4ae9a', '#f6f1dd'), pat='flag'),
 'rohan':      dict(g=('#6f8a3c', '#455c25', '#9cb35a', '#b39b52'), rim=('#3a2611', '#9a6a2c', '#e2b866'), pat='grass'),
 'lorien':     dict(g=('#5f7a3a', '#3b5122', '#8fa956', '#c9a54a'), rim=('#3b2d0e', '#b08a2c', '#f1d77a'), pat='moss'),
 'dwarf':      dict(g=('#5b5f66', '#383b41', '#858a92', '#6d5a3c'), rim=('#1f2833', '#5c7898', '#b7cde4'), pat='tile'),
 'moria':      dict(g=('#5a5048', '#352e29', '#80756b', '#6a3f22'), rim=('#2a1a10', '#7a5634', '#c8945a'), pat='rubble'),
 'mordor':     dict(g=('#3e3532', '#231d1b', '#5a4c46', '#e2542a'), rim=('#140f0e', '#463a36', '#8a7468'), pat='ember'),
 'isengard':   dict(g=('#45433f', '#292826', '#66625b', '#9a8f6c'), rim=('#121314', '#4d5155', '#9aa1a6'), pat='slag'),
 'harad':      dict(g=('#c39a5c', '#8f6a38', '#e3c48a', '#9c3f22'), rim=('#40150c', '#a8442a', '#f0b25a'), pat='sand'),
 'angmar':     dict(g=('#7d8a96', '#4e5862', '#c9d3db', '#9a2a2a'), rim=('#14181e', '#3c4652', '#9fb0c0'), pat='ice'),
 'dol_guldur': dict(g=('#3d4630', '#232a1b', '#5a6542', '#6e8a3c'), rim=('#0f130b', '#3a4a26', '#8fa45e'), pat='swamp'),
 'dead':       dict(g=('#56625a', '#323b36', '#869489', '#b9d4c4'), rim=('#1a201d', '#5f6e66', '#c4dccf'), pat='mist'),
}

def noise(seed, scale):
    r = np.random.default_rng(seed)
    small = r.random((N // scale + 2, N // scale + 2))
    im = Image.fromarray((small * 255).astype(np.uint8)).resize((N + 2 * scale, N + 2 * scale), Image.BICUBIC)
    a = np.asarray(im, float)[scale:scale + N, scale:scale + N] / 255
    return a

BAYER = np.array([[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]]) / 16

def ground(fam, seed):
    st = STYLE[fam]; base, dark, light, acc = (hx(c) for c in st['g'])
    yy, xx = np.mgrid[0:N, 0:N]
    n1, n2 = noise(seed, 8), noise(seed + 1, 3)
    # light from the top-left across the face
    lit = 0.55 + 0.45 * (1 - (xx + yy) / (2 * N)) + (n1 - .5) * .5 + (n2 - .5) * .25
    lit = lit + (BAYER[yy % 4, xx % 4] - .5) * .18          # ordered dither keeps it pixel-art
    t = np.clip(lit, 0, 1)[..., None]
    col = np.where(t < .5, dark + (base - dark) * (t / .5), base + (light - base) * ((t - .5) / .5))
    r = random.Random(seed)
    pat = st['pat']
    if pat in ('flag', 'tile'):       # stone joints
        step = 11 if pat == 'flag' else 9
        off = (yy // step) % 2 * (step // 2) if pat == 'flag' else 0
        joint = ((yy % step) == 0) | (((xx + off) % (step + 3)) == 0)
        col[joint] = col[joint] * .62
        col[np.roll(joint, 1, 0) & ~joint] = np.minimum(255, col[np.roll(joint, 1, 0) & ~joint] * 1.12)
    if pat in ('grass', 'moss', 'swamp'):
        for _ in range(70 if pat != 'swamp' else 40):
            x, y = r.randrange(N), r.randrange(2, N)
            c = light if r.random() < .6 else acc
            col[y, x] = c; col[y - 1, x] = c * .9
            if r.random() < .5 and x + 1 < N: col[y - 2, (x + (1 if r.random() < .5 else -1)) % N] = c * .8
        if pat == 'swamp':
            m = noise(seed + 5, 6) > .62; col[m] = col[m] * .55 + acc * .2
    if pat in ('rubble', 'slag', 'sand', 'mist', 'ice', 'ember'):
        for _ in range(26):
            x, y = r.randrange(1, N - 2), r.randrange(1, N - 2)
            col[y, x] = light; col[y + 1, x + 1] = dark * .8
            if pat in ('rubble', 'slag'): col[y, x + 1] = base * 1.05; col[y + 1, x] = dark
    if pat == 'ember':                 # glowing cracks
        x, y = N // 2, N // 2
        for k in range(4):
            a = r.random() * math.tau; L = r.randrange(14, 26)
            for i in range(L):
                xi, yi = int(x + math.cos(a) * i), int(y + math.sin(a) * i)
                a += (r.random() - .5) * .6
                if 0 <= xi < N and 0 <= yi < N: col[yi, xi] = acc if i % 3 else hx('#ffb35a')
    if pat == 'ice':
        cr = noise(seed + 9, 4) > .7; col[cr] = col[cr] * .8 + hx('#e8f2fa') * .2
    if pat == 'mist':
        m = noise(seed + 3, 10); col = col * (1 - m[..., None] * .35) + hx(st['g'][3]) * (m[..., None] * .35)
    if pat == 'sand':
        rip = ((yy + (np.sin(xx / 5) * 2).astype(int)) % 7) == 0; col[rip] = col[rip] * .85
    return col

def emblem_mask(fam):
    """Pixels of the old flat base that differ from its ground: the faction emblem."""
    p = os.path.join(SRC, f'base_{fam}_M.png')
    im = Image.open(p).convert('RGBA').resize((N, N), Image.BOX)
    a = np.asarray(im, float)
    rgb, al = a[..., :3], a[..., 3]
    yy, xx = np.mgrid[0:N, 0:N]; d = np.hypot(xx - N / 2 + .5, yy - N / 2 + .5)
    inner = (d < N * .36) & (al > 200)
    ref = np.median(rgb[(d > N * .30) & (d < N * .38) & (al > 200)], axis=0)
    diff = np.linalg.norm(rgb - ref, axis=2)
    lum = rgb.mean(2) - ref.mean()
    return inner & (diff > 55), lum

def make(fam, seed):
    st = STYLE[fam]; rd, rm, rl = (hx(c) for c in st['rim'])
    img = np.zeros((N, N, 4), float)
    cx = N / 2 - .5; R = N / 2 - 1.5; T = 4                  # T: visible side thickness in px (bottom)
    yy, xx = np.mgrid[0:N, 0:N]
    top_cy = cx - T / 2
    dt = np.hypot(xx - cx, yy - top_cy)                        # top face
    ds = np.hypot(xx - cx, yy - (top_cy + T))                  # bottom outline
    side = (ds <= R) & ~(dt <= R)
    side |= (dt > R) & (yy > top_cy) & (np.abs(xx - cx) <= R) & (yy <= top_cy + T + np.sqrt(np.maximum(0, R * R - (xx - cx) ** 2)))
    side &= ~(dt <= R)
    # side band: dark metal with a little vertical shade
    sh = np.clip((xx - cx) / R * .5 + .5, 0, 1)[..., None]
    img[side, :3] = (rd * (1 - sh) * .9 + rm * .5 * (1 - sh) + rd * sh * .7)[side]
    img[side, 3] = 255
    # top face
    face = dt <= R
    g = ground(fam, seed)
    img[face, :3] = g[face]; img[face, 3] = 255
    # inlaid emblem (engraved metal, low contrast)
    m, lum = emblem_mask(fam)
    m = m & face
    eng = rm * .55 + img[..., :3] * .45
    img[m, :3] = eng[m]
    hi = m & ~np.roll(m, 1, 0)                                 # top edges of the inlay catch light
    img[hi, :3] = np.minimum(255, rl * .6 + img[hi, :3] * .4)
    lo = m & ~np.roll(m, -1, 0)
    img[lo, :3] = img[lo, :3] * .7
    # rim ring on the top face (3 px): outer dark, metal, highlight arc toward the light
    ring = face & (dt > R - 3.2)
    ang = np.arctan2(yy - top_cy, xx - cx)                     # -pi..pi, light from upper-left (-3pi/4)
    lightness = np.cos(ang + 3 * math.pi / 4) * .5 + .5
    metal = rd + (rl - rd) * lightness[..., None]
    img[ring, :3] = metal[ring]
    outer = face & (dt > R - 1.1)
    img[outer, :3] = rd[None] * .85 if outer.any() else img[outer, :3]
    inner = face & (dt > R - 3.6) & (dt <= R - 3.0)
    img[inner, :3] = img[inner, :3] * .6                       # small groove inside the rim
    # outline
    solid = img[..., 3] > 0
    edge = solid & ~(np.roll(solid, 1, 0) & np.roll(solid, -1, 0) & np.roll(solid, 1, 1) & np.roll(solid, -1, 1))
    img[edge, :3] = np.array([16, 12, 9])
    # tiny palette clamp keeps colours tidy
    img[..., :3] = np.round(img[..., :3] / 6) * 6
    out = Image.fromarray(np.clip(img, 0, 255).astype(np.uint8), 'RGBA')
    return out.resize((N * UP, N * UP), Image.NEAREST)

if __name__ == '__main__':
    os.makedirs(SRC, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith('.png') and not os.listdir(SRC):
            shutil.copy2(os.path.join(OUT, f), os.path.join(SRC, f))
    GRID = {'S': 56, 'M': 64, 'L': 80, 'XL': 96, 'XXL': 120}   # bigger bases get a finer grid, so pixels stay the same size on screen
    for i, fam in enumerate(STYLE):
        for s in SIZES:
            N = GRID[s]
            make(fam, 100 + i * 7).save(os.path.join(OUT, f'base_{fam}_{s}.png'), optimize=True)
        print('wrote', fam)
