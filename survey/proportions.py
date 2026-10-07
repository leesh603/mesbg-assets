# -*- coding: utf-8 -*-
"""Refined proportion survey: head:body ratio + baked-base/clip detection."""
import json, io, os, csv
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
units = json.load(io.open(os.path.join(ROOT, 'units.json'), encoding='utf-8'))['units']
FIG = {'hero', 'infantry', 'support', 'soldier', 'civil'}

def measure(path):
    im = Image.open(path).convert('RGBA')
    a = im.getchannel('A')
    bb = a.getbbox()
    if not bb:
        return None
    im = im.crop(bb)
    w, h = im.size
    if h < 60:
        return None
    a = im.getchannel('A')
    px = a.load()
    rows = [0] * h
    for y in range(h):
        c = 0
        for x in range(w):
            if px[x, y] > 40:
                c += 1
        rows[y] = c
    gmax = max(rows)
    # body top: first row >= 10% of global max width
    top = next((y for y, r in enumerate(rows) if r >= gmax * 0.10), 0)
    # smooth ±2
    sm = [sum(rows[max(0, y - 2):y + 3]) / len(rows[max(0, y - 2):y + 3]) for y in range(h)]
    # head bulge: first local max in top 40% with width >= 25% of gmax
    search_end = top + int((h - top) * 0.42)
    peak, neck = None, None
    for y in range(top + 3, search_end):
        if sm[y] >= sm[y - 1] and sm[y] >= sm[y + 1] and sm[y] >= gmax * 0.22:
            if peak is None or sm[y] > sm[peak]:
                peak = y
        if peak is not None and y > peak + 4 and sm[y] < sm[peak] * 0.72:
            neck = y
            break
    # edge contact: does silhouette touch crop edges (clipping)?
    clip = (bb[0] <= 1 or bb[1] <= 1 or bb[2] >= Image.open(path).width - 1 or bb[3] >= Image.open(path).height - 1)
    # baked base guess: bottom 8% row width vs torso width at 55% height
    bottom_w = max(rows[int(h * 0.9):]) if h > 10 else 0
    torso_w = sm[int(h * 0.55)] if h > 4 else 0
    base_like = bottom_w > torso_w * 1.25 and torso_w > 0
    head_h = (neck - top) if neck else None
    ratio = round((h - top) / head_h, 1) if head_h and head_h >= 4 else None
    return {'img_w': im.width, 'img_h': im.height, 'top': top, 'head_h': head_h,
            'ratio': ratio, 'clip': clip, 'base_like': base_like}

out = []
for u in units:
    if u['role'] not in FIG:
        continue
    p = os.path.join(ROOT, u['file'])
    if not os.path.exists(p):
        continue
    m = measure(p) or {}
    m.update(id=u['id'], sheet=u.get('sheet') or '', role=u['role'], base=u.get('base', ''))
    out.append(m)

with io.open(os.path.join(ROOT, 'survey', 'proportions.csv'), 'w', encoding='utf-8', newline='') as fp:
    wr = csv.DictWriter(fp, fieldnames=['id', 'sheet', 'role', 'base', 'img_w', 'img_h', 'top', 'head_h', 'ratio', 'clip', 'base_like'])
    wr.writeheader()
    wr.writerows(out)

import collections
ratios = [m['ratio'] for m in out if m.get('ratio')]
ratios.sort()
n = len(ratios)
print('measured', n, 'of', len(out))
print('p5', ratios[n // 20], 'p25', ratios[n // 4], 'med', ratios[n // 2], 'p75', ratios[3 * n // 4], 'p95', ratios[19 * n // 20])
buckets = collections.Counter(int(r) for r in ratios)
print(sorted(buckets.items()))
print('clipped:', [m['id'] for m in out if m.get('clip')][:40])
print('base-like:', [m['id'] for m in out if m.get('base_like')][:40])
