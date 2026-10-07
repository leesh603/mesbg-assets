#!/usr/bin/env python3
"""Generates the pixel-art 9-slice frames used by the UI (border-image), printed as CSS custom properties.
Each frame is drawn on an 8x8 art-pixel grid at 2 CSS px per art pixel: three bevelled rings
(outline, light/dark trim, inner edge) around a flat face, with notched corners and a rivet.
Paste the output into the :root block of the ui-pixel stylesheet in index.html.
Usage: python3 tools/make_pixel_frames.py"""
from urllib.parse import quote

PX = 2   # CSS px per art pixel
N = 8    # art pixels per side; slice = 3 art px


def frame(rings, face, rivet=None, notch=True):
    """rings: [(top_left_colour, bottom_right_colour)] from outside in."""
    rects = []
    def r(x, y, c, w=1, h=1):
        if c: rects.append(f'<rect x="{x*PX}" y="{y*PX}" width="{w*PX}" height="{h*PX}" fill="{c}"/>')
    r(0, 0, face, N, N)
    for i, (tl, br) in enumerate(rings):
        a, b = i, N - 1 - i
        r(a, a, tl, b - a + 1, 1)          # top
        r(a, a, tl, 1, b - a + 1)          # left
        r(a, b, br, b - a + 1, 1)          # bottom
        r(b, a, br, 1, b - a + 1)          # right
    if notch:
        # cut the outer corner pixel and round the trim with an outline pixel
        o = rings[0][0]
        for x, y in ((1, 1), (N - 2, 1), (1, N - 2), (N - 2, N - 2)):
            r(x, y, rivet or o)
    body = ''.join(rects)
    if notch:   # transparent rects do not erase — clip the outer corners instead
        clip = f'M{PX} 0H{(N-1)*PX}V{PX}H{N*PX}V{(N-1)*PX}H{(N-1)*PX}V{N*PX}H{PX}V{(N-1)*PX}H0V{PX}H{PX}Z'
        body = f'<clipPath id="c"><path d="{clip}"/></clipPath><g clip-path="url(#c)">{body}</g>'
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" width="{N*PX}" height="{N*PX}" shape-rendering="crispEdges">{body}</svg>'
    return 'url("data:image/svg+xml,' + quote(svg, safe=':/=" ') .replace('"', "'") + '")'


INK = '#0e0812'
F = {
 # panels and sheets: deep indigo with a worn-gold trim (matches the title card)
 'panel':   frame([(INK, INK), ('#e6c88c', '#6a4a2e'), ('#3a2c4e', '#1c1428')], '#1b1528', rivet='#fff4d0'),
 # inset wells (HUD chips, stat cells) — 2 rings so slice 4 covers the whole trim
 'inset':   frame([(INK, INK), ('#07040a', '#4a3c62')], '#130e1c', notch=False),
 # buttons
 'gold':    frame([(INK, INK), ('#fff3b0', '#8a5a0c'), ('#ffd966', '#c08a1e')], '#f2c14e'),
 'goldDn':  frame([(INK, INK), ('#8a5a0c', '#ffe27a'), ('#c08a1e', '#f5c95a')], '#e2b043'),
 'iron':    frame([(INK, INK), ('#a898c8', '#1e1630'), ('#5e4f7e', '#2e2442')], '#3e3256'),
 'ironDn':  frame([(INK, INK), ('#1e1630', '#9888b8'), ('#2e2442', '#504270')], '#362c4c'),
 'red':     frame([(INK, INK), ('#ff8f75', '#5c160f'), ('#d64a36', '#8a2b1f')], '#b33a2a'),
 # cards by rarity: grey · green · blue · purple · orange
 'card':    frame([(INK, INK), ('#c4bccf', '#4e465c'), ('#2e2640', '#18121f')], '#1c1626'),
 'cardEli': frame([(INK, INK), ('#b4ff9c', '#1f7a2a'), ('#2a5a33', '#12221a')], '#152218', rivet='#e8ffe0'),
 'cardRar': frame([(INK, INK), ('#b0dcff', '#1d5ab8'), ('#24447a', '#111d30')], '#121b2c', rivet='#ffffff'),
 'cardEpi': frame([(INK, INK), ('#ecbfff', '#6a22b8'), ('#4d2a78', '#1d1230')], '#1c1430', rivet='#ffffff'),
 'cardLeg': frame([(INK, INK), ('#fff08a', '#c25e05'), ('#a8560a', '#4a2706')], '#2a1a0a', rivet='#ffffff'),
}
print(':root{')
for k, v in F.items():
    print(f' --pf-{k}:{v};')
print('}')
