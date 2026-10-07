# -*- coding: utf-8 -*-
"""Zoomed side-by-side of representative tokens for style comparison."""
import json, io, os
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
units = {u['id']: u for u in json.load(io.open(os.path.join(ROOT, 'units.json'), encoding='utf-8'))['units']}

GROUPS = [
    ('lotr', ['aragorn', 'gandalf', 'orc_sword', 'warrior_minas_tirith', 'cave_troll', 'witchking_foot']),
    ('roster', ['legolas', 'gimli', 'gothmog', 'nazgul_sword', 'sauron', 'uruk_captain', 'orc_sword2', 'boromir']),
    ('exp', ['hirluin', 'anborn', 'theodred', 'amdur', 'easterling_priest', 'mahud_beastmaster']),
    ('nb', ['gildor', 'dunhere', 'grishnakh', 'tom_bombadil', 'goldberry', 'snaga']),
    ('px-nb', ['mablung_sindar', 'earendil', 'ecthelion', 'tuor', 'fingolfin_mounted', 'numenorean_knight']),
    ('none', ['pallando', 'alatar', 'annatar', 'earendil', 'huor', 'maglor', 'thror', 'war_hound']),
    ('topdown+single', ['glorfindel_foot', 'glorfindel_mounted', 'witchking_fellbeast', 'witchking_mounted', 'aragorn_blackgate', 'fellbeast']),
    ('chibi-suspect', ['butterbur', 'bill_ferny', 'farmer_maggot', 'lobelia', 'mim', 'pippin_citadel', 'nori', 'bilbo']),
]

H = 300
def cell(u, w=200):
    try:
        im = Image.open(os.path.join(ROOT, u['file'])).convert('RGBA')
    except Exception:
        return Image.new('RGBA', (w, H), (80, 0, 0, 255))
    bb = im.getchannel('A').getbbox()
    if bb:
        im = im.crop(bb)
    k = min(H / im.height, (w - 6) / im.width)
    im = im.resize((max(1, int(im.width * k)), max(1, int(im.height * k))), Image.LANCZOS)
    c = Image.new('RGBA', (w, H + 22), (0, 0, 0, 0))
    c.paste(im, ((w - im.width) // 2, H - im.height), im)
    ImageDraw.Draw(c).text((4, H + 4), f"{u['id'][:24]}", fill=(255, 255, 255, 255))
    return c

for name, ids in GROUPS:
    us = [units[i] for i in ids if i in units]
    W = sum(min(220, max(120, int(300 * 0.66))) + 8 for _, _ in enumerate(us)) + 8
    row = Image.new('RGBA', (W, H + 30), (34, 36, 40, 255))
    x = 8
    d = ImageDraw.Draw(row)
    for u in us:
        w = min(220, max(120, int(300 * 0.66)))
        row.paste(cell(u, w), (x, 0))
        x += w + 8
    row.convert('RGB').save(os.path.join(ROOT, 'survey', f'zoom_{name}.png'), 'PNG')
    print(name, len(us), 'saved')
