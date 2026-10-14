#!/usr/bin/env python3
"""Export V3 faction bases from the reviewed ImageGen master atlas.
V3 retains Devin's dark heraldic discs and adds restrained wear / relief.
The atlas and reviewed rectangles are authoritative; faction names and sizes
match existing runtime metadata. Sprite dimensions never determine unit scale.
"""
from pathlib import Path
import json
from PIL import Image
ROOT=Path(__file__).resolve().parent.parent
FACTIONS=['gondor','rohan','mordor','isengard','dwarf','lorien','rivendell','angmar','dead','dol_guldur','harad','moria']
SIZES={'S':224,'M':256,'L':320,'XL':384,'XXL':480}

def build():
    atlas=Image.open(ROOT/'art-src/bases-v3.png').convert('RGBA')
    regions=json.loads((ROOT/'art-src/bases-v3-regions.json').read_text())
    assert len(regions)==len(FACTIONS)
    out=ROOT/'assets/mesbg/bases';out.mkdir(parents=True,exist_ok=True)
    for faction,region in zip(FACTIONS,regions):
        sprite=atlas.crop((region['x']-2,region['y']-2,region['x2']+2,region['y2']+2))
        side=round(max(sprite.size)/.81) # Match V1 visible disc diameter within the texture.
        square=Image.new('RGBA',(side,side),(0,0,0,0))
        square.alpha_composite(sprite,((side-sprite.width)//2,(side-sprite.height)//2))
        # A consistent logical grid preserves pixel edges at the game's small display size.
        logical=square.resize((96,96),Image.Resampling.NEAREST)
        for size,pixels in SIZES.items():
            target=out/f'base_{faction}_{size}.png'
            temporary=target.with_suffix('.tmp')
            logical.resize((pixels,pixels),Image.Resampling.NEAREST).save(temporary,format='PNG',optimize=True)
            temporary.replace(target)
    print('Exported 12 factions × 5 sizes = 60 transparent V3 bases')
if __name__=='__main__':build()
