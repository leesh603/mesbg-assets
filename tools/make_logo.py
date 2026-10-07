#!/usr/bin/env python3
"""Builds assets/mesbg/ui/logo.svg — the 미들어스 워밴드 title logo.

Look: inscriptional Roman capitals with wide tracking, struck in aged gold (embossed with an SVG
lighting filter and a little wear), a thin gold ring passing behind the title, the Korean name set
between gilt rules underneath. All lettering is converted to outlines, so no font loads at runtime.

Source fonts (all OFL), from https://github.com/google/fonts :
  ofl/cinzel/Cinzel[wght].ttf
  ofl/nanummyeongjo/NanumMyeongjo-ExtraBold.ttf
Usage:  python3 tools/make_logo.py <path to a google/fonts checkout>"""
import os, sys
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.varLib import instancer

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'ui', 'logo.svg')
GF = sys.argv[1] if len(sys.argv) > 1 else os.environ.get('GOOGLE_FONTS', '')
CIN = instancer.instantiateVariableFont(TTFont(os.path.join(GF, 'ofl/cinzel/Cinzel[wght].ttf')), {'wght': 700})
KR = TTFont(os.path.join(GF, 'ofl/nanummyeongjo/NanumMyeongjo-ExtraBold.ttf'))
W, H = 420, 232


def run(font, parts, tracking):
    """parts: [(text, size)] laid on one baseline. Returns [(glyphset glyph, scale, x)] and total width."""
    gs, cmap, upm = font.getGlyphSet(), font.getBestCmap(), font['head'].unitsPerEm
    out, x = [], 0.0
    for text, size in parts:
        s = size / upm
        for ch in text:
            if ch == ' ':
                x += size * 0.3 + tracking; continue
            g = cmap[ord(ch)]
            out.append((gs[g], s, x)); x += gs[g].width * s + tracking
    return out, x - tracking


def line(font, parts, tracking, cx, baseline):
    items, width = run(font, parts, tracking)
    x0 = cx - width / 2
    d = []
    for g, s, x in items:
        sp = SVGPathPen(None)
        g.draw(TransformPen(sp, (s, 0, 0, -s, x0 + x, baseline)))
        d.append(sp.getCommands())
    return ' '.join(d), x0, x0 + width


# ── type ──────────────────────────────────────────────────────────────
# MIDDLE-EARTH with raised initials, the way inscriptional title lettering is set
T1_BASE = 112
t1, t1a, t1b = line(CIN, [('M', 52), ('IDDLE-', 42), ('E', 52), ('ARTH', 42)], 1.6, W / 2, T1_BASE)
T2_BASE = 160
t2, t2a, t2b = line(CIN, [('WARBAND', 30)], 9.5, W / 2, T2_BASE)
T3_BASE = 206
t3, t3a, t3b = line(KR, [('미들어스 워밴드', 24)], 6, W / 2, T3_BASE)


def rules(y, a, b, gap, reach):
    """Tapered gilt rules either side of a word (thick at the word, thin at the far end), each ending in a lozenge."""
    l1, l2 = a - gap - reach, a - gap
    r1, r2 = b + gap, b + gap + reach
    lz = lambda x: 'M%.1f %.1f l4 -4 4 4 -4 4 z' % (x - 4, y)
    taper = lambda xa, xb: 'M%.1f %.1f L%.1f %.1f L%.1f %.1f Z' % (xa, y, xb, y - 1.1, xb, y + 1.1)
    return ('<path d="%s %s" fill="#e2bf74" stroke="#2a1a08" stroke-width=".35"/>' % (taper(l1, l2), taper(r2, r1)) +
            '<path d="%s %s" fill="#f1d58c" stroke="#2a1a08" stroke-width=".8"/>' % (lz(l1 - 7), lz(r2 + 7)))


svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="미들어스 워밴드 · Middle-earth Warband">
<defs>
 <linearGradient id="gold" gradientUnits="userSpaceOnUse" x1="0" y1="{T1_BASE-40}" x2="0" y2="{T1_BASE+2}">
  <stop offset="0" stop-color="#fff1c2"/><stop offset=".28" stop-color="#e9c171"/><stop offset=".5" stop-color="#b07a30"/>
  <stop offset=".64" stop-color="#e3b862"/><stop offset=".82" stop-color="#f8e2a0"/><stop offset="1" stop-color="#9b6a28"/></linearGradient>
 <linearGradient id="gold2" gradientUnits="userSpaceOnUse" x1="0" y1="{T2_BASE-22}" x2="0" y2="{T2_BASE+1}">
  <stop offset="0" stop-color="#fff1c2"/><stop offset=".35" stop-color="#e3b862"/><stop offset=".55" stop-color="#a8742c"/><stop offset=".8" stop-color="#f3d996"/><stop offset="1" stop-color="#a06e2a"/></linearGradient>
 <linearGradient id="pale" gradientUnits="userSpaceOnUse" x1="0" y1="{T3_BASE-18}" x2="0" y2="{T3_BASE+4}">
  <stop offset="0" stop-color="#fbf0d2"/><stop offset=".6" stop-color="#e2c78c"/><stop offset="1" stop-color="#b68f4d"/></linearGradient>
 <linearGradient id="ringG" x1="0" y1="0" x2="1" y2=".35">
  <stop offset="0" stop-color="#7a5320"/><stop offset=".18" stop-color="#f6dc95"/><stop offset=".34" stop-color="#b98536"/>
  <stop offset=".52" stop-color="#fff0c4"/><stop offset=".7" stop-color="#a87530"/><stop offset=".86" stop-color="#ecc877"/><stop offset="1" stop-color="#6e4a1c"/></linearGradient>
 <linearGradient id="ruleG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c9a35b" stop-opacity="0"/><stop offset=".5" stop-color="#e8c97e"/><stop offset="1" stop-color="#c9a35b" stop-opacity="0"/></linearGradient>
 <radialGradient id="ember" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#ff9a3a" stop-opacity=".0"/><stop offset=".72" stop-color="#ff7a26" stop-opacity=".0"/><stop offset=".86" stop-color="#ff8a30" stop-opacity=".42"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient>
 <!-- struck metal: emboss light + a little wear, then a dark rim and a soft cast shadow -->
 <filter id="metal" x="-10%" y="-30%" width="120%" height="170%" color-interpolation-filters="sRGB">
  <feGaussianBlur in="SourceAlpha" stdDeviation="1.1" result="b"/>
  <feSpecularLighting in="b" surfaceScale="2.6" specularConstant=".85" specularExponent="16" lighting-color="#fff6dc" result="spec"><feDistantLight azimuth="235" elevation="48"/></feSpecularLighting>
  <feComposite in="spec" in2="SourceAlpha" operator="in" result="specIn"/>
  <feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="7" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 .55  0 0 0 0 .42  0 0 0 0 .25  0 0 0 -1.1 .62" result="wear"/>
  <feComposite in="wear" in2="SourceAlpha" operator="in" result="wearIn"/>
  <feComposite in="SourceGraphic" in2="specIn" operator="arithmetic" k2="1" k3=".55" result="lit"/>
  <feBlend in="wearIn" in2="lit" mode="multiply" result="worn"/>
  <feMorphology in="SourceAlpha" operator="dilate" radius="1.3" result="rim"/>
  <feFlood flood-color="#1a0f05"/><feComposite in2="rim" operator="in" result="rimC"/>
  <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="sh"/><feOffset in="sh" dy="4" result="shO"/>
  <feFlood flood-color="#000" flood-opacity=".85"/><feComposite in2="shO" operator="in" result="shC"/>
  <feMerge><feMergeNode in="shC"/><feMergeNode in="rimC"/><feMergeNode in="worn"/></feMerge>
 </filter>
 <filter id="glow" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="5"/></filter>
 <linearGradient id="sweep" gradientUnits="userSpaceOnUse" x1="-140" y1="0" x2="-40" y2="40"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff8e0" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  <animateTransform attributeName="gradientTransform" type="translate" from="0 0" to="680 0" dur="1.6s" begin="1s" fill="freeze"/></linearGradient>
 <path id="t1" d="{t1}"/><path id="t2" d="{t2}"/><path id="t3" d="{t3}"/>
 <mask id="mk" maskUnits="userSpaceOnUse" x="0" y="0" width="{W}" height="{H}"><use href="#t1" fill="#fff"/><use href="#t2" fill="#fff"/></mask>
</defs>
<!-- the ring: a thin band of gold in perspective, faint fire along its inner edge -->
<g transform="rotate(-7 210 112)">
 <ellipse cx="210" cy="112" rx="186" ry="58" fill="none" stroke="#ff7a26" stroke-width="10" stroke-opacity=".28" filter="url(#glow)"/>
 <ellipse cx="210" cy="112" rx="186" ry="58" fill="none" stroke="#120b04" stroke-width="9"/>
 <ellipse cx="210" cy="112" rx="186" ry="58" fill="none" stroke="url(#ringG)" stroke-width="6.5"/>
 <ellipse cx="210" cy="113.4" rx="183" ry="55.6" fill="none" stroke="#fff3cc" stroke-opacity=".55" stroke-width=".9"/>
</g>
<!-- a dark field behind the type so the ring reads as passing behind it -->
<ellipse cx="210" cy="128" rx="190" ry="54" fill="#0b0805" opacity=".55" filter="url(#glow)"/>
<g filter="url(#metal)"><use href="#t1" fill="url(#gold)"/><use href="#t2" fill="url(#gold2)"/></g>
{rules(T2_BASE - 10.5, t2a, t2b, 14, 64)}
<g filter="url(#metal)"><use href="#t3" fill="url(#pale)"/></g>
{rules(T3_BASE - 8.5, t3a, t3b, 12, 46)}
<rect width="{W}" height="{H}" fill="url(#sweep)" mask="url(#mk)" style="mix-blend-mode:screen"/>
</svg>
'''
os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf8').write(svg)
print('wrote', OUT, len(svg) // 1024, 'KB')
