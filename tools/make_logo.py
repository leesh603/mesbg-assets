#!/usr/bin/env python3
"""Builds assets/mesbg/ui/logo.svg — the 미들어스 워밴드 title logo.
Lettering is converted to outlines (no font needed at runtime). Sources (OFL):
  Noto Serif CJK KR Black  (/usr/share/fonts/opentype/noto/NotoSerifCJK-Black.ttc)
  Cinzel                   (github.com/google/fonts ofl/cinzel/Cinzel[wght].ttf, path in CINZEL env or argv[1])
Usage: python3 tools/make_logo.py [path/to/Cinzel[wght].ttf]"""
import os, sys
from fontTools.ttLib import TTCollection, TTFont
from fontTools.pens.recordingPen import RecordingPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib import instancer

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'ui', 'logo.svg')
KR = TTCollection('/usr/share/fonts/opentype/noto/NotoSerifCJK-Black.ttc').fonts[1]
cin_path = sys.argv[1] if len(sys.argv) > 1 else os.environ.get('CINZEL')
LAT = instancer.instantiateVariableFont(TTFont(cin_path), {'wght': 700})
W = 400

def glyphs(font, text, size, tracking):
    gs, cmap = font.getGlyphSet(), font.getBestCmap()
    s = size / font['head'].unitsPerEm
    out, x = [], 0
    for ch in text:
        if ch == ' ':
            x += size * 0.32; continue
        g = cmap[ord(ch)]
        out.append((ch, g, x)); x += gs[g].width * s + tracking
    return out, x - tracking, s, gs

def line_path(font, text, size, tracking, cx, baseline, skip=None):
    """Returns (svg d, extras) for a centred line; skip(ch, contours) may drop contours and return a sword spec."""
    items, width, s, gs = glyphs(font, text, size, tracking)
    x0 = cx - width / 2
    d, extras = [], []
    for ch, g, x in items:
        rp = RecordingPen(); gs[g].draw(rp)
        cons, cur = [], []
        for op, a in rp.value:
            cur.append((op, a))
            if op in ('closePath', 'endPath'): cons.append(cur); cur = []
        tf = (s, 0, 0, -s, x0 + x, baseline)
        if skip:
            cons, extra = skip(ch, cons, tf)
            if extra: extras.append(extra)
        sp = SVGPathPen(None)
        tp = TransformPen(sp, tf)
        for c in cons:
            for op, a in c: getattr(tp, op)(*a)
        d.append(sp.getCommands())
    return ' '.join(d), extras

def bbox(c):
    pts = [p for op, a in c for p in a]
    return min(p[0] for p in pts), min(p[1] for p in pts), max(p[0] for p in pts), max(p[1] for p in pts)

def sword_from_mi(ch, cons, tf):
    """In 미, the vertical stroke (ㅣ) becomes a sword pointing down."""
    if ch != '미': return cons, None
    i = max(range(len(cons)), key=lambda k: bbox(cons[k])[0])
    x0, y0, x1, y1 = bbox(cons[i]); del cons[i]
    s, _, _, _, ox, oy = tf
    P = lambda x, y: (ox + x * s, oy - y * s)
    cx = (x0 + x1) / 2
    bw = (x1 - x0) * 0.78
    blade = [P(cx - bw / 2, 610), P(cx + bw / 2, 610), P(cx + bw / 2, 0), P(cx, -230), P(cx - bw / 2, 0)]
    guard = [P(cx - 205, 650), P(cx - 160, 696), P(cx + 160, 696), P(cx + 205, 650), P(cx + 160, 604), P(cx - 160, 604)]
    grip = [P(cx - 44, 696), P(cx + 44, 696), P(cx + 38, 890), P(cx - 38, 890)]
    pom = P(cx, 945); pr = 64 * s
    fuller = (P(cx, 580), P(cx, 20))
    return cons, dict(blade=blade, guard=guard, grip=grip, pom=pom, pr=pr, fuller=fuller)

pts = lambda ps: 'M' + ' L'.join('%.1f %.1f' % p for p in ps) + ' Z'

# ── layout ─────────────────────────────────────────────────────────────
L1_SIZE, L1_BASE = 74, 176
L2_SIZE, L2_BASE = 106, 290
d1, sw = line_path(KR, '미들어스', L1_SIZE, 5, W / 2, L1_BASE, sword_from_mi)
d2, _ = line_path(KR, '워밴드', L2_SIZE, 7, W / 2, L2_BASE)
sw = sw[0]
sword_d = pts(sw['blade']) + ' ' + pts(sw['guard']) + ' ' + pts(sw['grip']) + ' M%.1f %.1f m-%.1f 0 a%.1f %.1f 0 1 0 %.1f 0 a%.1f %.1f 0 1 0 -%.1f 0' % (sw['pom'] + (sw['pr'],) * 7)
rib_d, _ = line_path(LAT, 'MIDDLE-EARTH WARBAND', 13.5, 2.6, W / 2, 330)

def emblem_sword(angle):
    # long sword centred on the crossing point (tip up), rotated; hilt shows beside the shield's lower edge
    return ('<g transform="translate(200 66) rotate(%d)">'
            '<path d="M-6 30 L6 30 L6 -104 L0 -120 L-6 -104 Z" fill="url(#steel)" stroke="#120b05" stroke-width="2.2"/>'
            '<path d="M0 24 V-100" stroke="#7b8792" stroke-width="1.3"/>'
            '<path d="M-22 30 L22 30 L26 35 L22 40 L-22 40 L-26 35 Z" fill="url(#gold1)" stroke="#120b05" stroke-width="2.2"/>'
            '<rect x="-4.2" y="40" width="8.4" height="20" fill="#4a2e17" stroke="#120b05" stroke-width="2.2"/>'
            '<circle cy="65" r="6" fill="url(#gold1)" stroke="#120b05" stroke-width="2.2"/></g>') % angle

def flourish(side):
    # thin gilt rule leaving the shield, ending in a diamond
    k = -1 if side == 'l' else 1
    x0, x1 = 200 + k * 52, 200 + k * 150
    return ('<path d="M%d 60 L%d 60" stroke="url(#rule%s)" stroke-width="1.6"/>'
            '<path d="M%d 54 L%d 60 L%d 66 L%d 60 Z" fill="#e8c672" stroke="#120b05" stroke-width="1"/>'
            '<path d="M%d 66 Q%d 74 %d 70" fill="none" stroke="#c9a35b" stroke-opacity=".7" stroke-width="1.2"/>') % (
            x0, x1, side, x1 + k * 6, x1 + k * 12, x1 + k * 6, x1, x0 + k * 8, x0 + k * 40, x0 + k * 70)

svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} 396" width="{W}" height="396" role="img" aria-label="미들어스 워밴드">
<defs>
 <linearGradient id="gold1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff4c8"/><stop offset=".45" stop-color="#e9be63"/><stop offset=".55" stop-color="#9a6a26"/><stop offset="1" stop-color="#e2b45a"/></linearGradient>
 <linearGradient id="gL1" gradientUnits="userSpaceOnUse" x1="0" y1="{L1_BASE-66}" x2="0" y2="{L1_BASE+8}"><stop offset="0" stop-color="#fff7d6"/><stop offset=".34" stop-color="#f3cf78"/><stop offset=".55" stop-color="#c38c38"/><stop offset=".57" stop-color="#7d521c"/><stop offset=".8" stop-color="#d9a64f"/><stop offset="1" stop-color="#f7dc92"/></linearGradient>
 <linearGradient id="gL2" gradientUnits="userSpaceOnUse" x1="0" y1="{L2_BASE-94}" x2="0" y2="{L2_BASE+12}"><stop offset="0" stop-color="#fff7d6"/><stop offset=".34" stop-color="#f3cf78"/><stop offset=".55" stop-color="#c38c38"/><stop offset=".57" stop-color="#7d521c"/><stop offset=".8" stop-color="#d9a64f"/><stop offset="1" stop-color="#f7dc92"/></linearGradient>
 <linearGradient id="steel" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8d99a3"/><stop offset=".45" stop-color="#ffffff"/><stop offset=".55" stop-color="#c8d1d8"/><stop offset="1" stop-color="#6c7883"/></linearGradient>
 <linearGradient id="shield" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3024"/><stop offset="1" stop-color="#120e0a"/></linearGradient>
 <linearGradient id="ribbon" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9c2a1f"/><stop offset=".5" stop-color="#6e1712"/><stop offset="1" stop-color="#4a0d0a"/></linearGradient>
 <linearGradient id="rulel" x1="1" y1="0" x2="0" y2="0"><stop offset="0" stop-color="#f0d690"/><stop offset="1" stop-color="#c9a35b" stop-opacity=".25"/></linearGradient><linearGradient id="ruler" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f0d690"/><stop offset="1" stop-color="#c9a35b" stop-opacity=".25"/></linearGradient>
 <radialGradient id="glow"><stop offset="0" stop-color="#fff2c0" stop-opacity=".9"/><stop offset=".35" stop-color="#f0c868" stop-opacity=".35"/><stop offset="1" stop-color="#f0c868" stop-opacity="0"/></radialGradient>
 <linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="-160" y1="0" x2="-60" y2="60"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  <animateTransform id="sw" attributeName="gradientTransform" type="translate" from="0 0" to="720 0" dur="1.4s" begin="0.9s;sw.end+7s" fill="freeze"/></linearGradient>
 <path id="t1" d="{d1}"/><path id="t2" d="{d2}"/><path id="sd" d="{sword_d}"/>
 <clipPath id="ct"><use href="#t1"/><use href="#t2"/></clipPath>
 <mask id="mk" maskUnits="userSpaceOnUse" x="0" y="-40" width="{W}" height="430"><rect y="-40" width="{W}" height="430" fill="#000"/><use href="#t1" fill="#fff"/><use href="#t2" fill="#fff"/><use href="#sd" fill="#fff"/></mask>
 <filter id="drop" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="5" stdDeviation="5" flood-color="#000" flood-opacity=".75"/></filter>
</defs>
<g filter="url(#drop)" transform="translate(0 46)">
 <!-- emblem: crossed swords behind a heater shield bearing a star over the mountains -->
 <g transform="translate(0 -14)"><circle cx="200" cy="50" r="62" fill="url(#glow)" opacity=".55"/>
 {flourish('l')}{flourish('r')}{emblem_sword(-42)}{emblem_sword(42)}
 <path d="M158 12 H242 V52 Q242 92 200 116 Q158 92 158 52 Z" fill="#120b05" stroke="#120b05" stroke-width="8" stroke-linejoin="round"/>
 <path d="M158 12 H242 V52 Q242 92 200 116 Q158 92 158 52 Z" fill="url(#shield)" stroke="url(#gold1)" stroke-width="3.5" stroke-linejoin="round"/>
 <path d="M164 18 H236 V52 Q236 87 200 109 Q164 87 164 52 Z" fill="none" stroke="#c9a35b" stroke-opacity=".45" stroke-width="1"/>
 <path d="M166 84 L183 62 L192 72 L204 52 L219 70 L226 63 L234 82 Q220 96 200 106 Q180 96 166 84 Z" fill="#2a2219" stroke="#c9a35b" stroke-width="1.4" stroke-linejoin="round"/>
 <path d="M200 22 L203.2 34.6 L214.5 29.5 L208.6 40.2 L220 44 L208.6 47.8 L214.5 58.5 L203.2 53.4 L200 66 L196.8 53.4 L185.5 58.5 L191.4 47.8 L180 44 L191.4 40.2 L185.5 29.5 L196.8 34.6 Z" fill="#fff4cf" stroke="#d8b25c" stroke-width="1"/>
 <circle cx="200" cy="44" r="4" fill="#fff"/>
 </g>
 <!-- lettering: dark rim, gilt rim, metal fill -->
 <g stroke-linejoin="round">
  <use href="#t1" fill="none" stroke="#120b05" stroke-width="11"/><use href="#t2" fill="none" stroke="#120b05" stroke-width="13"/><use href="#sd" fill="none" stroke="#120b05" stroke-width="10"/>
  <use href="#t1" fill="none" stroke="#7a5420" stroke-width="4.5"/><use href="#t2" fill="none" stroke="#7a5420" stroke-width="5.5"/>
  <use href="#t1" fill="url(#gL1)"/><use href="#t2" fill="url(#gL2)"/>
 </g>
 <g clip-path="url(#ct)" fill="none">
  <use href="#t1" transform="translate(0 1.6)" stroke="#fff8dc" stroke-width="1.6" opacity=".8"/><use href="#t2" transform="translate(0 2)" stroke="#fff8dc" stroke-width="2" opacity=".8"/>
  <use href="#t1" transform="translate(0 -1.6)" stroke="#5a3a12" stroke-width="1.6" opacity=".7"/><use href="#t2" transform="translate(0 -2)" stroke="#5a3a12" stroke-width="2" opacity=".7"/>
 </g>
 <!-- the sword that forms the ㅣ of 미 -->
 <path d="{pts(sw['blade'])}" fill="url(#steel)" stroke="#2a2f34" stroke-width="1.2"/>
 <path d="M{sw['fuller'][0][0]:.1f} {sw['fuller'][0][1]:.1f} L{sw['fuller'][1][0]:.1f} {sw['fuller'][1][1]:.1f}" stroke="#6c7883" stroke-width="1.6"/>
 <path d="{pts(sw['grip'])}" fill="#4a2e17" stroke="#120b05" stroke-width="1.2"/>
 <path d="{pts(sw['guard'])}" fill="url(#gold1)" stroke="#5a3a12" stroke-width="1.2"/>
 <circle cx="{sw['pom'][0]:.1f}" cy="{sw['pom'][1]:.1f}" r="{sw['pr']:.1f}" fill="url(#gold1)" stroke="#5a3a12" stroke-width="1.2"/>
 <!-- ribbon -->
 <path d="M70 318 L44 318 L56 330 L44 342 L84 342 L84 324 Z" fill="#3a0a08" stroke="#120b05" stroke-width="3" stroke-linejoin="round"/>
 <path d="M330 318 L356 318 L344 330 L356 342 L316 342 L316 324 Z" fill="#3a0a08" stroke="#120b05" stroke-width="3" stroke-linejoin="round"/>
 <path d="M70 312 Q200 302 330 312 L330 338 Q200 328 70 338 Z" fill="url(#ribbon)" stroke="#120b05" stroke-width="3" stroke-linejoin="round"/>
 <path d="M74 315.5 Q200 305.5 326 315.5 M74 334.5 Q200 324.5 326 334.5" fill="none" stroke="#e1b860" stroke-width="1" opacity=".75"/>
 <path d="{rib_d}" transform="translate(0 0)" fill="#f3d58a"/>
</g>
<rect width="{W}" height="396" fill="url(#sweep)" mask="url(#mk)" transform="translate(0 46)" style="mix-blend-mode:screen"/>
</svg>
'''
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf8').write(svg)
print('wrote', OUT, len(svg) // 1024, 'KB')
