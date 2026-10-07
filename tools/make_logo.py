#!/usr/bin/env python3
"""Builds assets/mesbg/ui/logo.svg — the title logo: "MIDDLE-EARTH" in slanted ivory Roman capitals over a
larger decorative "Warband", ivory with a gold edge and a soft ink shadow (key-art title-card style).
Lettering is converted to outlines, so no font loads at runtime.
Source fonts (SIL OFL), https://github.com/google/fonts : ofl/cinzel/Cinzel[wght].ttf, ofl/cinzeldecorative/CinzelDecorative-Black.ttf
Usage: python3 tools/make_logo.py <google/fonts checkout>"""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib import instancer

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'ui', 'logo.svg')
GF = sys.argv[1]
CIN = instancer.instantiateVariableFont(TTFont(os.path.join(GF, 'ofl/cinzel/Cinzel[wght].ttf')), {'wght': 800})
DEC = TTFont(os.path.join(GF, 'ofl/cinzeldecorative/CinzelDecorative-Black.ttf'))
W, H, SK = 400, 176, -0.2          # SK: italic slant (x shift per unit of height)


def width(font, text, size, tracking):
    gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font['head'].unitsPerEm
    return sum(gs[cmap[ord(c)]].width for c in text) * size / upm + tracking * (len(text) - 1)


def line(font, text, size, tracking, cx, baseline, fit=None):
    if fit: size *= fit / width(font, text, size, tracking)
    gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font['head'].unitsPerEm
    s = size / upm; items, x = [], 0.0
    for ch in text:
        g = gs[cmap[ord(ch)]]; items.append((g, x)); x += g.width * s + tracking
    w = x - tracking; x0 = cx - w / 2; d = []
    for g, gx in items:
        sp = SVGPathPen(None)
        # slant around the baseline: x' = x + SK*(y-baseline) in screen space -> shear in glyph space
        g.draw(TransformPen(sp, (s, 0, -SK * s, -s, x0 + gx, baseline))); d.append(sp.getCommands())
    return ' '.join(d)

L1 = line(CIN, 'MIDDLE-EARTH', 40, 3, W / 2 - 16, 62, fit=300)
L2 = line(DEC, 'Warband', 88, 0, W / 2 + 10, 146, fit=350)
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="Middle-earth Warband · 미들어스 워밴드">
<defs>
 <linearGradient id="ivory" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf4"/><stop offset=".55" stop-color="#f7ecd0"/><stop offset="1" stop-color="#e3cf9f"/></linearGradient>
 <linearGradient id="edge" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3d68a"/><stop offset=".5" stop-color="#b8862c"/><stop offset="1" stop-color="#7a5418"/></linearGradient>
 <filter id="ink" x="-10%" y="-20%" width="120%" height="150%"><feGaussianBlur in="SourceAlpha" stdDeviation="3"/><feOffset dy="3"/><feComponentTransfer><feFuncA type="linear" slope=".55"/></feComponentTransfer><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>
 <path id="a" d="{L1}"/><path id="b" d="{L2}"/>
</defs>
<g filter="url(#ink)" stroke-linejoin="round">
 <use href="#a" fill="none" stroke="#5a3a10" stroke-width="7"/><use href="#b" fill="none" stroke="#5a3a10" stroke-width="9"/>
 <use href="#a" fill="none" stroke="url(#edge)" stroke-width="4"/><use href="#b" fill="none" stroke="url(#edge)" stroke-width="5.5"/>
 <use href="#a" fill="url(#ivory)"/><use href="#b" fill="url(#ivory)"/>
</g>
<path d="M64 76 H322" stroke="url(#edge)" stroke-width="1.6" opacity=".85"/>
</svg>'''
os.makedirs(os.path.dirname(OUT), exist_ok=True); open(OUT, 'w', encoding='utf8').write(svg); print('wrote', OUT, len(svg) // 1024, 'KB')
