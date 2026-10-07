# -*- coding: utf-8 -*-
"""Build labeled contact sheets of all unit tokens, grouped by source sheet."""
import json, io, os, math
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
units = json.load(io.open(os.path.join(ROOT, 'units.json'), encoding='utf-8'))['units']

CELL_H = 150   # sprite area height
LABEL_H = 26   # two lines of ~10px
GUT = 6
COLS = 14

FIG_ROLES = {'hero', 'infantry', 'support', 'soldier', 'civil', 'monster', 'cavalry', 'beast'}

def fam(sheet):
    if not sheet:
        return 'zz-none'
    s = sheet.lower()
    if 'topdown' in s:
        return 'topdown'
    if s.startswith('px-nb') or s.startswith('px-'):
        return 'px-nb'
    if s.startswith('nb-'):
        return 'nb'
    if s.startswith('exp-'):
        return 'exp'
    if s.startswith('roster-'):
        return 'roster'
    if s.startswith('terrain'):
        return 'terrain'
    if s.startswith('single') or 'fellbeast' in s or 'glorfindel' in s:
        return 'single'
    if 'lotr' in s:
        return 'lotr'
    return 'other'

def sprite_cell(u, cell_w):
    try:
        im = Image.open(os.path.join(ROOT, u['file'])).convert('RGBA')
    except Exception:
        return Image.new('RGBA', (cell_w, CELL_H), (60, 0, 0, 255))
    a = im.getchannel('A')
    bb = a.getbbox()
    if bb:
        im = im.crop(bb)
    k = min(CELL_H / im.height, (cell_w - 4) / im.width)
    im = im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.LANCZOS)
    cell = Image.new('RGBA', (cell_w, CELL_H), (0, 0, 0, 0))
    cell.paste(im, ((cell_w - im.width) // 2, CELL_H - im.height), im)
    return cell

def build(units_sub, path):
    cell_w = max(56, int(CELL_H * 0.62))
    rows = math.ceil(len(units_sub) / COLS)
    W = COLS * (cell_w + GUT) + GUT
    H = rows * (CELL_H + LABEL_H + GUT) + GUT
    sheet_img = Image.new('RGBA', (W, H), (38, 40, 44, 255))
    d = ImageDraw.Draw(sheet_img)
    for i, u in enumerate(units_sub):
        cx = GUT + (i % COLS) * (cell_w + GUT)
        cy = GUT + (i // COLS) * (CELL_H + LABEL_H + GUT)
        sheet_img.paste(sprite_cell(u, cell_w), (cx, cy))
        name = u['id'][:14]
        d.text((cx + 1, cy + CELL_H + 1), name, fill=(235, 235, 235, 255))
        d.text((cx + 1, cy + CELL_H + 11), (u.get('base') or '') + ' ' + (u.get('role') or '')[:9],
               fill=(150, 200, 150, 255))
    sheet_img.convert('RGB').save(path, 'PNG')
    return path, len(units_sub)

groups = {}
for u in units:
    if u['role'] not in FIG_ROLES:
        continue
    groups.setdefault(fam(u.get('sheet')), []).append(u)

for g, us in sorted(groups.items()):
    us.sort(key=lambda u: u['id'])
    n = len(us)
    chunk = 168
    for part in range((n + chunk - 1) // chunk):
        sub = us[part * chunk:(part + 1) * chunk]
        p, cnt = build(sub, os.path.join(ROOT, 'survey', f'sheet_{g}_{part}.png'))
        print(p, cnt)

# terrain separately
terr = [u for u in units if u['role'] not in FIG_ROLES]
terr.sort(key=lambda u: u['id'])
p, cnt = build(terr, os.path.join(ROOT, 'survey', 'sheet_terrain_0.png'))
print(p, cnt)
