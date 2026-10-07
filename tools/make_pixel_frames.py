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


INK = '#120a05'
F = {
 # panels and sheets: dark iron with a gold trim
 'panel':   frame([(INK, INK), ('#e8bd63', '#8f5f22'), ('#3a2716', '#24170d')], '#1c1611', rivet='#fff0b0'),
 # inset wells (HUD chips, stat cells)
 'inset':   frame([(INK, INK), ('#070503', '#4a3a28')], '#15100c', notch=False),   # 2 rings: slice 4 = whole trim
 # buttons
 'gold':    frame([(INK, INK), ('#fff1b8', '#8a5a1c'), ('#f6d27a', '#b98330')], '#e3ad4f'),
 'goldDn':  frame([(INK, INK), ('#8a5a1c', '#f3c96c'), ('#c08a36', '#e6b55a')], '#d39d42'),
 'iron':    frame([(INK, INK), ('#8a7c66', '#2a231b'), ('#5a4f40', '#3a3228')], '#463d32'),
 'ironDn':  frame([(INK, INK), ('#2a231b', '#7a6d59'), ('#3a3228', '#4e4538')], '#3c342b'),
 'red':     frame([(INK, INK), ('#f08a70', '#5c160f'), ('#c4483a', '#8a2b1f')], '#a83728'),
 # cards by rarity
 'card':    frame([(INK, INK), ('#a8865a', '#5a4428'), ('#2e241a', '#1c160f')], '#221b14'),
 'cardLeg': frame([(INK, INK), ('#ffe08a', '#a8701f'), ('#4a3517', '#2a1d0c')], '#2b2114', rivet='#ffffff'),
 'cardEpi': frame([(INK, INK), ('#d6b2f4', '#5c3a85'), ('#33243f', '#1f1628')], '#241b2b', rivet='#f3e6ff'),
 'cardRar': frame([(INK, INK), ('#a9d2f5', '#355f8a'), ('#1f2e3d', '#141e28')], '#18212b', rivet='#e6f4ff'),
 'cardEli': frame([(INK, INK), ('#bfe0a0', '#4a6b35'), ('#25321d', '#182113')], '#1c2418'),
 'cardSel': frame([(INK, INK), ('#fff6c8', '#c4892c'), ('#f0c560', '#a8701f')], '#33281a', rivet='#ffffff'),
}
print(':root{')
for k, v in F.items():
    print(f' --pf-{k}:{v};')
print('}')
