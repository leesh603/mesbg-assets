from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
import json,math
R=Path(__file__).resolve().parents[1];D=json.loads((R/'catalog.json').read_text());U={u['id']:u for u in D['units']}
F=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',17)
S=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',13)
def paste(out,u,cx,baseline,z,old=False):
 p=u['oldProfile'] if old else u['profile'];im=Image.open(R/(u['old'] if old else u['file'])).convert('RGBA');scale=p['worldReferenceSize']/(im.height*(p['bottom']-p['top']))*z
 w,h=max(1,round(im.width*scale)),max(1,round(im.height*scale));im=im.resize((w,h),Image.Resampling.NEAREST);ground=im.getchannel('A').point(lambda v:255 if v>16 else 0).getbbox()[3];out.paste(im,(round(cx-p['centerX']*w),round(baseline-ground)),im)
# Original / new at same world size, excluding decorations from body reference.
ids=['orc_sword','orc_spearman','orc_archer','morannon_orc','orc_twohanded','orc_drummer','black_guard','gothmog','shagrat','gorbag','kardush','black_numenorean']
ids=[i for i in ids if i in U];cols=3;cw=460;ch=340;o=Image.new('RGB',(cols*cw,70+math.ceil(len(ids)/cols)*ch),(40,49,43));d=ImageDraw.Draw(o)
d.text((20,15),'OLD / NEW - SAME WORLD SCALE (2.3x) - manual body landmarks',font=F,fill='#e4d9b7')
for i,id in enumerate(ids):
 x=i%cols*cw;y=70+i//cols*ch;d.rectangle((x+4,y+4,x+cw-4,y+ch-4),outline='#596052');d.text((x+14,y+9),id,font=S,fill='#ddd5bd');d.text((x+50,y+34),'OLD',font=S,fill='#b7b5a9');d.text((x+280,y+34),'NEW',font=S,fill='#e4cb94');base=y+314;d.line((x+15,base,x+cw-15,base),fill='#5e6658');paste(o,U[id],x+110,base,2.3,True);paste(o,U[id],x+335,base,2.3)
o.save(R/'previews/old-vs-new.png')
# Review-only terrain placement using the original map image, same anatomical world scale for all units.
o=Image.open(R/'references/main/assets/mesbg/maps/mordor.jpg').convert('RGB').resize((1800,1800));shade=Image.new('RGB',o.size,(25,31,27));o=Image.blend(o,shade,.32);d=ImageDraw.Draw(o)
d.rectangle((0,0,1800,60),fill='#1b221e');d.text((20,17),'MORDOR - ART PLACEMENT REVIEW - 1.15x world scale',font=F,fill='#e7d7ae')
rows=[['sauron','black_numenorean','numenorean_marshal','mouth_of_sauron','morgul_knight','black_numenorean_mounted'],['gothmog','guritz','shagrat','gorbag','kardush','grishnakh','guritz_mounted'],['orc_sword','orc_sword2','orc_swordshield','orc_spearman','orc_spear2','orc_archer','orc_bow','orc_twohanded','orc_drummer','orc_taskmaster','orc_sergeant','ufthak'],['morannon_orc','morannon_swordshield','mordor_uruk','black_guard','orc_tracker','orc_elite_tracker','morgul_orc','morgul_rat','morgul_stalker','morgul_duellist','warg_rider'],['mountain_troll','war_troll','olog_hai','troll_shaman','werewolf','shelob','sauron_wolf'],['great_beast_gorgoroth','annatar']]
for r,ids in enumerate(rows):
 ids=[i for i in ids if i in U]
 for c,id in enumerate(ids):
  x=120+c*1560/max(1,len(ids)-1);base=[330,540,730,920,1280,1760][r]
  if r==0 and id=='sauron':base=330
  if r==5:x=650+c*650;base=1760
  paste(o,U[id],x,base,1.15)
o.save(R/'previews/terrain-placement.png')
# Mounted comparison: same rider head-to-seated-pelvis scale.
ids=[i for i in ['warg_rider','guritz_mounted','black_numenorean_mounted','morgul_knight','mouth_of_sauron'] if i in U]
o=Image.new('RGB',(1440,600),(42,51,44));d=ImageDraw.Draw(o);d.text((20,12),'MOUNTED - RIDER CROWN TO SEATED PELVIS (1.6x world scale)',font=F,fill='#dfd2ad')
for i,id in enumerate(ids):
 x=140+i*285;paste(o,U[id],x,530,1.6);d.text((i*285+15,566),id,font=S,fill='#d8d4c4')
o.save(R/'previews/mounted-comparison.png')
print('previews rendered',len(U))
