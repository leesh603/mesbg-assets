#!/usr/bin/env python
# Post-process generated token PNGs: alpha-bbox crop -> resize content height -> pad to content/0.955 -> tokens/ + assets/mesbg/tokens/
import json, os, shutil, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GEN = os.path.join(ROOT, 'survey', 'gen')
WL = {w['id']: w for w in json.load(open(os.path.join(ROOT, 'survey', 'worklist.json'), encoding='utf-8'))}

def process(uid, src=None):
    src = src or os.path.join(GEN, uid + '_v1.png')
    w = WL[uid]
    target_h = w['h']
    im = Image.open(src).convert('RGBA')
    # alpha bbox crop
    alpha = im.split()[3]
    bbox = alpha.getbbox()
    if not bbox:
        print('SKIP empty:', uid); return None
    im = im.crop(bbox)
    # resize content height to target
    cw, ch = im.size
    scale = target_h / ch
    nw, nh = max(1, round(cw * scale)), target_h
    im = im.resize((nw, nh), Image.LANCZOS)
    # pad so content is ~95.5% of canvas height, centered horizontally
    pad_h = round(target_h / 0.955)
    pad_w = max(nw + 8, round(nw / 0.955))
    canvas = Image.new('RGBA', (pad_w, pad_h), (0, 0, 0, 0))
    canvas.paste(im, ((pad_w - nw) // 2, (pad_h - nh) // 2), im)
    out1 = os.path.join(ROOT, 'tokens', uid + '.png')
    out2 = os.path.join(ROOT, 'assets', 'mesbg', 'tokens', uid + '.png')
    os.makedirs(os.path.dirname(out2), exist_ok=True)
    canvas.save(out1)
    shutil.copy2(out1, out2)
    print('OK', uid, f'{pad_w}x{pad_h}', '->', out1)
    return out1

if __name__ == '__main__':
    jobs = []
    # args: uid[:srcfile]
    for a in sys.argv[1:]:
        uid, _, src = a.partition(':')
        jobs.append((uid, src or None))
    for uid, src in jobs:
        process(uid, src)
