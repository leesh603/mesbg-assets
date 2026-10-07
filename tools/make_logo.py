#!/usr/bin/env python3
"""Builds assets/mesbg/ui/logo.svg — the 미들어스 워밴드 title logo, in the manner of classic tactics-RPG
title cards: a large calligraphic gold word, a second word in silver-lavender set below and to the right,
both struck in metal (SVG emboss lighting) with a heavy dark outline, and a small Roman-capital line.
Lettering is converted to outlines, so no font loads at runtime.

Source fonts (SIL OFL), from https://github.com/google/fonts :
  ofl/songmyung/SongMyung-Regular.ttf, ofl/cinzeldecorative/CinzelDecorative-Bold.ttf
Usage:  python3 tools/make_logo.py <path to a google/fonts checkout>"""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'ui', 'logo.svg')
GF = sys.argv[1]
KR = TTFont(os.path.join(GF, 'ofl/songmyung/SongMyung-Regular.ttf'))
LAT = TTFont(os.path.join(GF, 'ofl/cinzeldecorative/CinzelDecorative-Bold.ttf'))
W, H = 420, 268


def line(font, text, size, tracking, x0, baseline, anchor='middle'):
    gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font['head'].unitsPerEm
    s = size / upm
    items, x = [], 0.0
    for ch in text:
        if ch == ' ':
            x += size * .3 + tracking; continue
        g = gs[cmap[ord(ch)]]; items.append((g, x)); x += g.width * s + tracking
    width = x - tracking
    start = x0 - width / 2 if anchor == 'middle' else x0 - width if anchor == 'end' else x0
    d = []
    for g, gx in items:
        sp = SVGPathPen(None); g.draw(TransformPen(sp, (s, 0, 0, -s, start + gx, baseline))); d.append(sp.getCommands())
    return ' '.join(d), start, start + width


L1, a1, b1 = line(KR, '미들어스', 96, -4, 196, 122)
L2, a2, b2 = line(KR, '워밴드', 74, -2, 282, 206)
L3, a3, b3 = line(LAT, 'MIDDLE-EARTH  WARBAND', 13, 2.2, 210, 246)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="미들어스 워밴드 · Middle-earth Warband">
<defs>
 <linearGradient id="gold" gradientUnits="userSpaceOnUse" x1="0" y1="40" x2="0" y2="128">
  <stop offset="0" stop-color="#fffbd6"/><stop offset=".22" stop-color="#f3dc7a"/><stop offset=".44" stop-color="#c79f35"/><stop offset=".52" stop-color="#8f6d1e"/>
  <stop offset=".62" stop-color="#d9b84e"/><stop offset=".8" stop-color="#f7e9a6"/><stop offset="1" stop-color="#9a7524"/></linearGradient>
 <linearGradient id="silver" gradientUnits="userSpaceOnUse" x1="0" y1="146" x2="0" y2="212">
  <stop offset="0" stop-color="#ffffff"/><stop offset=".3" stop-color="#ece8f6"/><stop offset=".5" stop-color="#a99cc9"/><stop offset=".58" stop-color="#7d6fa6"/>
  <stop offset=".75" stop-color="#d9d1ec"/><stop offset="1" stop-color="#7a6c9e"/></linearGradient>
 <linearGradient id="pale" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6dc"/><stop offset="1" stop-color="#c9b27a"/></linearGradient>
 <filter id="metal" x="-10%" y="-20%" width="120%" height="150%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceAlpha" stdDeviation="1.4" result="b"/>
  <feSpecularLighting in="b" surfaceScale="3.2" specularConstant=".9" specularExponent="14" lighting-color="#fffbe8" result="spec"><feDistantLight azimuth="240" elevation="50"/></feSpecularLighting>
  <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn"/>
  <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k2="1" k3=".6" result="lit"/>
  <feMorphology in="SourceAlpha" operator="dilate" radius="3.2" result="rim"/>
  <feFlood flood-color="#1c1208"/><feComposite in2="rim" operator="in" result="rimC"/>
  <feMorphology in="SourceAlpha" operator="dilate" radius="4.4" result="rim2"/>
  <feFlood flood-color="#000" flood-opacity=".55"/><feComposite in2="rim2" operator="in" result="rim2C"/>
  <feGaussianBlur in="rim2" stdDeviation="5" result="sh"/><feOffset in="sh" dy="5" result="shO"/>
  <feFlood flood-color="#000" flood-opacity=".8"/><feComposite in2="shO" operator="in" result="shC"/>
  <feMerge><feMergeNode in="shC"/><feMergeNode in="rim2C"/><feMergeNode in="rimC"/><feMergeNode in="lit"/></feMerge>
 </filter>
 <linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="-150" y1="0" x2="-40" y2="60"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fffbe6" stop-opacity=".6"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="700 0" dur="1.8s" begin="1.1s" fill="freeze"/></linearGradient>
 <path id="l1" d="{L1}"/><path id="l2" d="{L2}"/>
 <mask id="mk" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><use href="#l1" fill="#fff" stroke="#fff" stroke-width="2.4"/><use href="#l2" fill="#fff" stroke="#fff" stroke-width="2"/></mask>
</defs>
<g filter="url(#metal)"><use href="#l2" fill="url(#silver)" stroke="url(#silver)" stroke-width="2" stroke-linejoin="round"/></g>
<g filter="url(#metal)"><use href="#l1" fill="url(#gold)" stroke="url(#gold)" stroke-width="2.4" stroke-linejoin="round"/></g>
<path d="M{a3-48:.1f} 241.5 H{a3-10:.1f} M{b3+10:.1f} 241.5 H{b3+48:.1f}" stroke="#d8c48a" stroke-width="1" opacity=".75"/>
<path d="{L3}" fill="url(#pale)" stroke="#120a04" stroke-width="2.2" paint-order="stroke fill" stroke-linejoin="round"/>
<rect width="{W}" height="{H}" fill="url(#sweep)" mask="url(#mk)" style="mix-blend-mode:screen"/>
</svg>
'''
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf8').write(svg)
print('wrote', OUT, len(svg) // 1024, 'KB', (a1, b1), (a2, b2))
