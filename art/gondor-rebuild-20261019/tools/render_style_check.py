"""Review composition only. Source PNGs are never reshaped or overwritten."""
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json
ROOT=Path(__file__).resolve().parents[1]
def main():
    data=json.loads((ROOT/'manifest.json').read_text())
    ids=['warrior_minas_tirith','aragorn','boromir','faramir','forlong']
    labels=['LOCKED REFERENCE','ARAGORN','BOROMIR','FARAMIR','FORLONG']
    records={r['id']:r for r in data['units']}
    board=Image.new('RGB',(1600,730),(28,37,32));d=ImageDraw.Draw(board)
    font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
    title=ImageFont.truetype(font,23);small=ImageFont.truetype(font,15)
    d.text((24,20),'GONDOR / HIGH-ANGLE FRONT / FIVE-HEAD PIXEL STYLE',font=title,fill='#e5d2a4')
    d.text((24,57),'Shared world scale. Height and centre use measured body landmarks, not weapons or cloak bounds.',font=small,fill='#b8c6b4')
    for i,(ident,label) in enumerate(zip(ids,labels)):
        r=records[ident];p=ROOT/r['image'];assert p.exists(),ident
        image=Image.open(p).convert('RGBA');scale=r['stature']*3.7/(image.height*(r['bottom']-r['top']))
        size=(round(image.width*scale),round(image.height*scale));image=image.resize(size,Image.Resampling.NEAREST)
        x=i*320;origin=(x+160,370)
        box=(round(origin[0]-r['centerX']*size[0]),round(origin[1]-r['centerY']*size[1]))
        board.paste(image,box,image);d.rectangle((x+4,100,x+316,707),outline='#52624e')
        d.text((x+18,610),label,font=small,fill='#e5d2a4')
        d.text((x+18,645),str(r['stature'])+' world px / body',font=small,fill='#b8c6b4')
        d.text((x+18,675),'No shape/limb stretching',font=small,fill='#93ab95')
    (ROOT/'review').mkdir(exist_ok=True)
    board.save(ROOT/'review'/'strict-four-review.png',optimize=True)
    print('Wrote fixed-reference + four-unit review plate')
if __name__=='__main__':main()
