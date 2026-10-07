#!/usr/bin/env python3
"""Subsets the Galmuri pixel fonts (SIL OFL 1.1, https://github.com/quiple/galmuri) for the UI.
Keeps ASCII, common punctuation/arrows, the 2,350 KS X 1001 Hangul syllables and every character
used in src/game.js and units.json. Writes assets/mesbg/fonts/galmuri/*.woff.
Usage: python3 tools/make_ui_fonts.py <path to galmuri/dist>"""
import os, sys, subprocess
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
DIST = sys.argv[1]
OUT = os.path.join(ROOT, 'assets', 'mesbg', 'fonts', 'galmuri')
chars = set(chr(c) for c in range(0x20, 0x7f))
chars |= set('·…—–‘’“”←→↑↓↺★☆✦✓✕×÷±°%‰※■□▲△▼▽◆◇○●♥♡⚠')
for hi in range(0xB0, 0xC9):
    for lo in range(0xA1, 0xFF):
        try: chars.add(bytes([hi, lo]).decode('euc-kr'))
        except UnicodeDecodeError: pass
for f in ('src/game.js', 'units.json'):
    chars |= set(open(os.path.join(ROOT, f), encoding='utf8').read())
chars = {c for c in chars if c.isprintable()}
os.makedirs(OUT, exist_ok=True)
txt = os.path.join(OUT, '.chars.txt'); open(txt, 'w', encoding='utf8').write(''.join(sorted(chars)))
for name in ('Galmuri11', 'Galmuri11-Bold', 'Galmuri9', 'Galmuri14'):
    subprocess.check_call(['pyftsubset', os.path.join(DIST, name + '.ttf'), '--text-file=' + txt, '--flavor=woff',
                           '--layout-features=*', '--output-file=' + os.path.join(OUT, name + '.woff')])
    print(name, os.path.getsize(os.path.join(OUT, name + '.woff')) // 1024, 'KB')
os.remove(txt)
