# -*- coding: utf-8 -*-
"""Unit sprite survey: size, silhouette, head-ratio, color richness per token."""
import json, io, os, csv, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
units = json.load(io.open(os.path.join(ROOT, 'units.json'), encoding='utf-8'))['units']

def head_ratio(alpha, w, h):
    """Estimate head height via width-profile first neck below crown.
    Returns (ratio, head_h). Rough: works for upright humanoids."""
    # per-row silhouette width and mass-center x
    rows = []
    for y in range(h):
        xs = [x for x in range(w) if alpha[y * w + x] > 40]
        rows.append(len(xs))
    maxw = max(rows) if rows else 0
    if maxw == 0:
        return None, None
    # find top of body: first row with >= 12% of max width (skip stray antennae/weapons)
    top = next((y for y, rw in enumerate(rows) if rw >= maxw * 0.12), 0)
    # smooth
    sm = [sum(rows[max(0, y - 2):y + 3]) / len(rows[max(0, y - 2):y + 3]) for y in range(h)]
    # head = top until first dip (neck): local min where width < 65% of the local peak
    peak = 0
    for y in range(top, min(h, top + int(h * 0.6))):
        if sm[y] > sm[peak]:
            peak = y
    neck = None
    for y in range(peak, min(h, peak + int(h * 0.5))):
        if sm[y] < sm[peak] * 0.62:
            neck = y
            break
    if neck is None:
        return None, None
    head_h = neck - top
    body_h = h - top
    if head_h <= 0 or body_h <= 0:
        return None, None
    return round(body_h / head_h, 2), head_h

out = []
missing = []
for u in units:
    f = u.get('file', '')
    p = os.path.join(ROOT, f)
    row = {'id': u['id'], 'name_ko': u.get('name_ko', ''), 'sheet': u.get('sheet') or '',
           'role': u.get('role', ''), 'base': u.get('base', ''), 'file': f}
    if not os.path.exists(p):
        missing.append(u['id'])
        row.update(exists=0)
        out.append(row)
        continue
    im = Image.open(p).convert('RGBA')
    w, h = im.size
    small = im.resize((max(1, w // 4), max(1, h // 4)))
    a = small.getchannel('A')
    aw, ah = small.size
    bbox = a.getbbox()
    pix = list(a.getdata())
    alpha_frac = sum(1 for v in pix if v > 40) / len(pix)
    rgb = small.convert('RGB')
    colors = len(set(rgb.getdata())) if w * h < 4_000_000 else -1
    row.update(exists=1, img_w=w, img_h=h,
               cw=(bbox[2] - bbox[0]) * 4 if bbox else 0,
               ch=(bbox[3] - bbox[1]) * 4 if bbox else 0,
               alpha=round(alpha_frac, 3), colors=colors)
    if u.get('role') in ('hero', 'infantry', 'support', 'soldier', 'civil'):
        al = list(a.getdata())
        ratio, hh = head_ratio(al, aw, ah)
        row['head_ratio'] = ratio
    out.append(row)

fields = ['id', 'name_ko', 'sheet', 'role', 'base', 'file', 'exists', 'img_w', 'img_h',
          'cw', 'ch', 'alpha', 'colors', 'head_ratio']
with io.open(os.path.join(ROOT, 'survey', 'metrics.csv'), 'w', encoding='utf-8', newline='') as fp:
    wr = csv.DictWriter(fp, fieldnames=fields, extrasaction='ignore')
    wr.writeheader()
    wr.writerows(out)
print('wrote', len(out), 'rows; missing files:', missing)
