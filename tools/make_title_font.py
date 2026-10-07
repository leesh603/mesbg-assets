#!/usr/bin/env python3
"""Subsets NanumMyeongjo Bold (SIL OFL, github.com/google/fonts ofl/nanummyeongjo) for the title-screen menu.
Keeps ASCII, digits and the Hangul used by the title menu strings in src/game.js.
Usage: python3 tools/make_title_font.py <path to a google/fonts checkout>"""
import os, re, sys, subprocess
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
src = open(os.path.join(ROOT, 'src/game.js'), encoding='utf8').read()
a = src.index('<div class="modal campaign-menu">'); block = src[a:a + 4000]
chars = set(chr(c) for c in range(0x20, 0x7f)) | set('·…—') | {c for c in block if '가' <= c <= '힣'}
chars |= set('최고기록스테이지정비때자동저장근변경명예의전당쉬움보통어려움')
txt = os.path.join(ROOT, '.title-chars.txt'); open(txt, 'w', encoding='utf8').write(''.join(sorted(chars)))
out = os.path.join(ROOT, 'assets/mesbg/fonts/myeongjo/NanumMyeongjo-Bold-title.woff')
subprocess.check_call(['pyftsubset', os.path.join(sys.argv[1], 'ofl/nanummyeongjo/NanumMyeongjo-Bold.ttf'), '--text-file=' + txt, '--flavor=woff', '--output-file=' + out])
os.remove(txt); print(out, os.path.getsize(out) // 1024, 'KB')
