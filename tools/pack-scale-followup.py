"""Uniform RGBA packaging only; no separate limb, head, or axis scaling."""
from pathlib import Path
from PIL import Image,ImageDraw
import json
root=Path(__file__).resolve().parents[1]; art=root/'art-src/scale-followup-20261019'; out=root/'review/scale-followup-20261019'
rows=[]
for p in sorted((art/'raw').glob('*.png')):
 im=Image.open(p).convert('RGBA'); box=im.getchannel('A').getbbox(); im=im.crop(box); im.thumbnail((352,352),Image.Resampling.LANCZOS)
 canvas=Image.new('RGBA',(384,384)); canvas.alpha_composite(im,((384-im.width)//2,(384-im.height)//2));canvas.save(art/p.name,optimize=True);rows.append(p.stem)
for start in range(0,len(rows),8):
 sheet=Image.new('RGB',(1200,1000),'#232b31');d=ImageDraw.Draw(sheet)
 for n,id in enumerate(rows[start:start+8]):
  x=(n%4)*300;y=(n//4)*500;im=Image.open(art/(id+'.png'));im.thumbnail((288,384));sheet.paste(im,(x+6,y+35),im)
  d.text((x+8,y+8),id,fill='white')
  for f in [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]:
   py=y+35+round(f*im.height);d.line((x+6,py,x+294,py),fill='#59616b');d.text((x+6,py),str(f),fill='#ffffff')
 sheet.save(out/('packed-'+str(start//8)+'.jpg'),quality=90)
print('packed',len(rows))
