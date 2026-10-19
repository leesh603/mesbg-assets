from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,math
R=Path(__file__).resolve().parents[1]
rows=[u for u in json.loads((R/'catalog.json').read_text())['units'] if u['family']=='nazgul']
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14)
out=Image.new('RGB',(1440,math.ceil(len(rows)/6)*300),'#343d35');d=ImageDraw.Draw(out)
for i,u in enumerate(rows):
 im=Image.open(R/u['file']);im.thumbnail((230,260),Image.Resampling.NEAREST);x=i%6*240+(240-im.width)//2;y=i//6*300;out.paste(im,(x,y),im);d.text((i%6*240+5,y+270),u['id'],font=font,fill='#eadbc1')
out.save(R/'previews/nazgul-all-27.jpg',quality=94)
out=Image.new('RGB',(1800,1050),'#343d35');d=ImageDraw.Draw(out)
groups=[('large-human',14),('mounted',11),('fellbeast',2)]
labels=['Witch-king','WK flail','Nazgul A','Nazgul B','Nazgul mace','Dwimmerlaik','Khamul','Dark Marshal','Shadow Lord','Betrayer','Tainted','Undying','Knight of Umbar','Forsaken']
foot_ids=[u['id'] for u in rows if u['body']=='large-human']; names=dict(zip(foot_ids,labels))
for row,(form,_) in enumerate(groups):
 units=[u for u in rows if u['body']==form];base=[270,610,1010][row]
 d.text((20,base-250),form+' / anatomical world scale x1.5',font=font,fill='#eadbc1')
 for i,u in enumerate(units):
  p=u['profile'];im=Image.open(R/u['file']);s=p['worldReferenceSize']/(im.height*(p['bottom']-p['top']))*1.5
  im=im.resize((round(im.width*s),round(im.height*s)),Image.Resampling.NEAREST)
  ground=im.getchannel('A').point(lambda a:255 if a>16 else 0).getbbox()[3]
  x=((90+i*1620/max(1,len(units)-1)) if form=='large-human' else (150+i*1500/max(1,len(units)-1))) if form!='fellbeast' else (600+i*650)
  out.paste(im,(round(x-im.width*p['centerX']),round(base-ground)),im)
  label=names.get(u['id'],names.get(u['id'].replace('_mounted_sheet','_foot').replace('_mounted',''),u['id'].replace('_fellbeast','').replace('witchking','Witch-king')));label='WK alternate' if u['id']=='witchking_mounted_sheet' else label;label='Witch-king' if u['id']=='witchking_mounted' else label;label='Nazgul' if u['id']=='nazgul_mounted' else label
  width=d.textlength(label,font=font);d.text((max(0,int(x-width/2)),base+5),label,font=font,fill='#eadbc1')
out.save(R/'previews/nazgul-world-scale.jpg',quality=94)
