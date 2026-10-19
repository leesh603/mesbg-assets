"""Render review plates; assets are never repainted, stretched, cropped or overwritten.

Run: python art/rebuild-skeletons/tools/render_previews.py
Only preview composites are resized (uniform nearest-neighbour sampling).
Source-space landmarks in measurements.json control scale and origin.
"""
from pathlib import Path
import json, hashlib
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'previews'
BG = (32, 38, 36)
FONT_PATH = '/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(size=19):
    try: return ImageFont.truetype(FONT_PATH, size)
    except OSError: return ImageFont.load_default()

def sprite(dest, path, profile, position, zoom=3):
    """Body/rider reference span, never weapon/alpha-bounds height."""
    im = Image.open(path).convert('RGBA')
    w, h = im.size
    span = (profile['bottom'] - profile['top']) * h
    scale = profile['worldReferenceSize'] * zoom / span
    sz = (round(w * scale), round(h * scale))
    im = im.resize(sz, Image.Resampling.NEAREST)
    x = round(position[0] - profile['centerX'] * sz[0])
    y = round(position[1] - profile['centerY'] * sz[1])
    dest.paste(im, (x, y), im)
    return {'scale': scale, 'drawRect': [x, y, *sz]}

def plate(records, folder, filename, title, zoom=3):
    cw, ch = 384, 490
    im = Image.new('RGB', (cw * 5, ch * 2 + 90), BG)
    d = ImageDraw.Draw(im)
    d.text((25, 18), title, font=font(25), fill='#ead6ac')
    d.text((25, 56), 'Shared world scale / measured body or rider / no equipment-based fitting', font=font(17), fill='#bfc4b6')
    for i, rec in enumerate(records):
        x, y = i % 5 * cw, 90 + i // 5 * ch
        d.rectangle((x+5, y+5, x+cw-5, y+ch-5), outline='#4d574f')
        sprite(im, ROOT / folder / (rec['id']+'.png'), rec, (x+cw/2, y+225), zoom)
        d.text((x+18, y+424), rec['label'], font=font(19), fill='#f2ead9')
        d.text((x+18, y+454), str(rec['worldReferenceSize'])+' world px / '+rec['reference'], font=font(16), fill='#aebda9')
    im.save(OUT / filename, optimize=True)

def main():
    OUT.mkdir(exist_ok=True)
    data = json.loads((ROOT/'measurements.json').read_text())
    bases, units = data['bases'], data['units']
    old = {p['id']: p for p in json.loads((ROOT/'old-profiles.json').read_text())}
    plate(bases, 'bases', 'standard-bodies.png', 'STANDARD BODIES / final high-angle front 3/4 camera')
    plate(units, 'test-units', 'ten-units.png', 'TEN TRIAL UNITS / Theoden pixel-style reference')

    cw, ch = 790, 440
    im = Image.new('RGB', (cw*2, ch*5+70), BG)
    d = ImageDraw.Draw(im)
    d.text((24,18),'CURRENT ASSET vs NEW TEMPLATE DERIVATIVE / shared world zoom',font=font(23),fill='#ead6ac')
    for i, rec in enumerate(units):
        x, y = i%2*cw, 70+i//2*ch
        d.rectangle((x+5,y+5,x+cw-5,y+ch-5),outline='#4d574f')
        d.text((x+18,y+12),rec['label'],font=font(20),fill='#f2ead9')
        d.text((x+140,y+45),'CURRENT',font=font(16),fill='#c7b09c')
        d.text((x+535,y+45),'NEW',font=font(16),fill='#adc5a8')
        sprite(im,ROOT/'references'/(rec['id']+'.png'),old[rec['id']],(x+195,y+230),2.65)
        sprite(im,ROOT/'test-units'/(rec['id']+'.png'),rec,(x+595,y+230),2.65)
        d.text((x+18,y+408),'Body-centred; source aspect ratios preserved',font=font(14),fill='#9daba0')
    im.save(OUT/'old-vs-new.png',optimize=True)

    # Production terrain bytes, copied unchanged; this is a placement study,
    # not a claim that the battle runtime has been modified or playtested.
    im = Image.new('RGB',(1920,1180))
    terrain = ROOT/'references/terrain'
    tile = Image.open(terrain/'meadow.webp').convert('RGB')
    for y in range(0,1180,tile.height):
        for x in range(0,1920,tile.width): im.paste(tile,(x,y))
    for name,xy,sz in [('oak.png',(12,350),(200,197)),('rock.png',(1730,880),(150,118)),('oak.png',(1730,300),(190,187))]:
        t=Image.open(terrain/name).convert('RGBA').resize(sz,Image.Resampling.NEAREST)
        im.paste(t,xy,t)
    d=ImageDraw.Draw(im)
    d.rectangle((0,0,1920,116),fill=BG)
    d.text((28,20),'TERRAIN PLACEMENT STUDY / proposed game-world sizes at 2x zoom',font=font(27),fill='#ead6ac')
    d.text((28,70),'Production meadow terrain / body-centred / no game replacement or gameplay verification',font=font(19),fill='#c3cbbd')
    for i,rec in enumerate(units):
        pos=(260+i%5*350,350+i//5*480)
        sprite(im,ROOT/'test-units'/(rec['id']+'.png'),rec,pos,2)
        d.text((pos[0]-110,pos[1]+188),rec['label'],font=font(19),fill='#fff8df',stroke_width=2,stroke_fill='#283129')
    im.save(OUT/'terrain-placement.png',optimize=True)

    # Verify files, alpha, dimensions, physical hashes and supplied anchors.
    report={'baseCount':len(bases),'unitCount':len(units),'files':[],'runtimeChanged':False,'deployment':False}
    for folder, records in [('bases',bases),('test-units',units)]:
        for rec in records:
            path=ROOT/folder/(rec['id']+'.png')
            pic=Image.open(path); pic.load()
            assert pic.mode=='RGBA',path
            assert min(pic.size)>=512,path
            assert 0 <= rec['top'] < rec['bottom'] <= 1,path
            assert 0 < rec['centerX'] < 1 and 0 < rec['centerY'] < 1,path
            assert pic.getchannel('A').getextrema()[0]==0,path
            bbox=pic.getchannel('A').point(lambda a:255 if a>128 else 0).getbbox()
            assert bbox and bbox[0]>0 and bbox[1]>0 and bbox[2]<pic.width and bbox[3]<pic.height,path
            report['files'].append({'file':str(path.relative_to(ROOT)),'dimensions':list(pic.size),'sha256':hashlib.sha256(path.read_bytes()).hexdigest(),'opaqueBounds':list(bbox)})
    assert len(bases)==10 and len(units)==10
    (ROOT/'verification.json').write_text(json.dumps(report,indent=2)+'\n')
    print(json.dumps({'bases':len(bases),'units':len(units),'previews':4,'verified':len(report['files'])}))

if __name__=='__main__': main()
