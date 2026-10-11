#!/usr/bin/env python
# Apply generated drafts: px pixelate already done -> alpha-crop -> resize preserving
# the OLD token's in-game scale (content fill fraction) -> pad -> tokens/ + assets/mesbg/tokens/
# usage: python survey/apply_gen.py uid:src.png [uid2:src2.png ...]
import os, shutil, sys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def process(uid, src):
    old_path = os.path.join(ROOT, 'tokens', uid + '.png')
    if not os.path.exists(old_path):
        print('SKIP no old token:', uid); return
    old = Image.open(old_path).convert('RGBA')
    ob = old.split()[3].getbbox()
    f_old = (ob[3] - ob[1]) / old.height  # old content fraction of canvas height
    im = Image.open(src).convert('RGBA')
    b = im.split()[3].getbbox()
    if not b:
        print('SKIP empty:', uid); return
    im = im.crop(b)
    cw, ch = im.size
    new_canvas = round(ch / f_old)
    canvas = Image.new('RGBA', (max(cw + 8, round(cw / f_old)), new_canvas), (0, 0, 0, 0))
    canvas.paste(im, ((canvas.width - cw) // 2, (new_canvas - ch) // 2), im)
    canvas.save(old_path)
    out2 = os.path.join(ROOT, 'assets', 'mesbg', 'tokens', uid + '.png')
    os.makedirs(os.path.dirname(out2), exist_ok=True)
    shutil.copy2(old_path, out2)
    print('OK', uid, f'{canvas.width}x{canvas.height} f_old={f_old:.3f}')

if __name__ == '__main__':
    for a in sys.argv[1:]:
        uid, _, src = a.partition(':')
        process(uid, src)
