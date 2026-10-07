# -*- coding: utf-8 -*-
"""Mass restyle runner — executed via scripted_tools slices."""
import json, io, os

ROOT = "C:\\Users\\Administrator\\repos\\mesbg-assets"
TOK = ROOT + "\\tokens\\"
OUT = ROOT + "\\survey\\gen\\"

STYLE = ("a miniature wargame token seen from HIGH ABOVE at a steep three-quarter bird's-eye angle, "
         "as if looking down at a tabletop miniature - the top of the head/shoulders dominates the view, "
         "face small and shadowed, body foreshortened. CRISP PIXEL-ART rendering: limited color palette, "
         "visible pixel clusters and dithered shading, hard-edged shapes, NO smooth airbrush gradients, "
         "muted earthy colors, thin dark outline, transparent background, no base")

TAIL = {
    'monster': " Large creature anatomy, fill the frame; wings/limbs fit the same elevated viewing angle.",
    'dragon':  " Huge dragon anatomy, serpentine body with spread wings, same elevated viewing angle.",
    'flyer':   " Winged creature with spread wings, viewed at the same elevated angle, body foreshortened.",
    'beast':   " Animal anatomy on all fours, viewed at the same elevated angle.",
    'ent':     " Tall tree-giant, bark texture, leafy crown at top, same elevated viewing angle.",
    'cav':     " Rider on horseback; both horse and rider viewed at the same elevated angle.",
    'cav_warg':" Rider on a wolf-mount; both viewed at the same elevated angle.",
    'hobbit':  " Small statured figure, stocky ~4-heads proportions.",
    'dwarf':   " Short broad figure, ~4.5-heads proportions, heavy beard/armor.",
}
