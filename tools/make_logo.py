#!/usr/bin/env python3
"""Builds the title logo → assets/mesbg/ui/logo.png (pixel art, shown at 2x with image-rendering: pixelated).

Step 1 draws a vector card in the manner of classic tactics-RPG titles: blackletter "Middle-earth" in gold,
"WARBAND" in silver-lavender flared capitals set below and to the right, both embossed metal with a heavy
dark outline. Step 2 renders it at half size in headless Chromium and snaps it to pixels: hard alpha edge
and a reduced palette, so it sits with the pixel-art battlefield.

Source fonts (SIL OFL), https://github.com/google/fonts :
  ofl/unifrakturmaguntia/UnifrakturMaguntia-Book.ttf, ofl/cinzeldecorative/CinzelDecorative-Black.ttf
Needs: fontTools, Pillow, playwright (python).  Usage: python3 tools/make_logo.py <google/fonts checkout>"""
import asyncio, os, sys, tempfile
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'ui', 'logo.png')
GF = sys.argv[1]
BL = TTFont(os.path.join(GF, 'ofl/unifrakturmaguntia/UnifrakturMaguntia-Book.ttf'))
CD = TTFont(os.path.join(GF, 'ofl/cinzeldecorative/CinzelDecorative-Black.ttf'))
W, H, SCALE = 440, 214, .5


def line(font, text, size, tracking, x0, baseline, anchor='middle'):
    gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font['head'].unitsPerEm
    s = size / upm; items, x = [], 0.0
    for ch in text:
        g = gs[cmap[ord(ch)]]; items.append((g, x)); x += g.width * s + tracking
    width = x - tracking
    start = {'middle': x0 - width / 2, 'end': x0 - width}.get(anchor, x0)
    d = []
    for g, gx in items:
        sp = SVGPathPen(None); g.draw(TransformPen(sp, (s, 0, 0, -s, start + gx, baseline))); d.append(sp.getCommands())
    return ' '.join(d), start, start + width


_, a0, b0 = line(BL, 'Middle-earth', 100, 0, 0, 0)
SZ = 100 * (W - 28) / (b0 - a0)          # fit the blackletter line to the card width
L1, a1, b1 = line(BL, 'Middle-earth', SZ, 0, W / 2, 112)
L2, a2, b2 = line(CD, 'WARBANDS', 40, 4, W / 2, 172)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W*SCALE}" height="{H*SCALE}">
<defs>
 <linearGradient id="gold" gradientUnits="userSpaceOnUse" x1="0" y1="34" x2="0" y2="120">
  <stop offset="0" stop-color="#fffbd2"/><stop offset=".25" stop-color="#f1d873"/><stop offset=".48" stop-color="#c49a32"/><stop offset=".56" stop-color="#7d5c18"/>
  <stop offset=".66" stop-color="#d6b44c"/><stop offset=".84" stop-color="#f6e6a0"/><stop offset="1" stop-color="#8f6a1e"/></linearGradient>
 <linearGradient id="silver" gradientUnits="userSpaceOnUse" x1="0" y1="140" x2="0" y2="178">
  <stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#e9e4f5"/><stop offset=".52" stop-color="#9f92c4"/><stop offset=".6" stop-color="#6f6198"/>
  <stop offset=".8" stop-color="#d8cfee"/><stop offset="1" stop-color="#6c5e92"/></linearGradient>
 <filter id="metal" x="-10%" y="-25%" width="120%" height="160%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceAlpha" stdDeviation="1.6" result="b"/>
  <feSpecularLighting in="b" surfaceScale="3.4" specularConstant=".95" specularExponent="13" lighting-color="#fffbe8" result="spec"><feDistantLight azimuth="240" elevation="50"/></feSpecularLighting>
  <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn"/>
  <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k2="1" k3=".6" result="lit"/>
  <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="rim"/>
  <feFlood flood-color="#1a1008"/><feComposite in2="rim" operator="in" result="rimC"/>
  <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="rim2"/>
  <feFlood flood-color="#05030a"/><feComposite in2="rim2" operator="in" result="rim2C"/>
  <feMerge><feMergeNode in="rim2C"/><feMergeNode in="rimC"/><feMergeNode in="lit"/></feMerge>
 </filter>
</defs>
<g filter="url(#metal)"><path d="{L2}" fill="url(#silver)" stroke="url(#silver)" stroke-width="1.5"/></g>
<g filter="url(#metal)"><path d="{L1}" fill="url(#gold)" stroke="url(#gold)" stroke-width="2"/></g>
</svg>'''


async def render(svg_path, png_path):
    from playwright.async_api import async_playwright
    async with async_playwright() as p:
        b = await p.chromium.launch()
        pg = await (await b.new_context(viewport={'width': int(W * SCALE), 'height': int(H * SCALE)}, device_scale_factor=1)).new_page()
        await pg.goto('file://' + svg_path); await pg.screenshot(path=png_path, omit_background=True); await b.close()

with tempfile.TemporaryDirectory() as td:
    sp, pp = os.path.join(td, 'logo.svg'), os.path.join(td, 'logo.png')
    open(sp, 'w', encoding='utf8').write(svg)
    asyncio.run(render(sp, pp))
    im = Image.open(pp).convert('RGBA')
    # snap to pixels: hard alpha, then a 40-colour palette without dithering
    a = im.getchannel('A').point(lambda v: 255 if v >= 110 else 0)
    rgb = Image.new('RGB', im.size, (0, 0, 0)); rgb.paste(im, mask=im.getchannel('A'))
    q = rgb.quantize(colors=40, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.NONE).convert('RGB')
    out = q.convert('RGBA'); out.putalpha(a)
    out = out.crop(out.getbbox())
    os.makedirs(os.path.dirname(OUT), exist_ok=True); out.save(OUT, optimize=True)
    print('wrote', OUT, out.size)
