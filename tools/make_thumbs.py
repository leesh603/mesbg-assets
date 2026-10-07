#!/usr/bin/env python3
"""Regenerate assets/mesbg/thumbs/*.webp (160px-tall portraits used by the DOM UI) from assets/mesbg/tokens/*.png.
Run after adding or changing unit art:  python3 tools/make_thumbs.py   (needs Pillow)"""
import glob, os
from PIL import Image
root = os.path.join(os.path.dirname(__file__), '..', 'assets', 'mesbg')
os.makedirs(os.path.join(root, 'thumbs'), exist_ok=True)
n = 0
for f in sorted(glob.glob(os.path.join(root, 'tokens', '*.png'))):
    im = Image.open(f).convert('RGBA'); w, h = im.size; H = min(160, h)
    t = im.resize((max(1, round(w * H / h)), H), Image.LANCZOS)
    t.save(os.path.join(root, 'thumbs', os.path.basename(f)[:-4] + '.webp'), 'WEBP', quality=82, method=6); n += 1
print('thumbs:', n)
