import json
import numpy as np
from PIL import Image
from scipy.ndimage import label,find_objects
from pathlib import Path
records=[]
p=Path('../generated_images/exec-929e2be8-dc89-4a1a-94ca-db41f6e9f3a7.png');im=Image.open(p);a=np.asarray(im)[:,:,3];lab,n=label(a>80);sizes=np.bincount(lab.ravel());ids=np.argsort(sizes[1:])[-4:]+1;boxes=find_objects(lab);objs=[]
for i in ids:
 sy,sx=boxes[i-1];objs.append(dict(x=sx.start,y=sy.start,w=sx.stop-sx.start,h=sy.stop-sy.start))
objs.sort(key=lambda r:r['y']+r['h']/2);ordered=sorted(objs[:2],key=lambda r:r['x'])+sorted(objs[2:],key=lambda r:r['x'])
for name,b in zip(['unused-bridge','abyss-edge','basalt','white-cliff'],ordered):
 if name!='unused-bridge':records.append(dict(key=name,source=str(p),box=b,width=256))
p=Path('../generated_images/exec-f4ddb094-cf83-4381-ac17-9a8ce975aaab.png');im=Image.open(p);a=np.asarray(im)[:,:,3];ys,xs=np.where(a>160);records.append(dict(key='khazad-bridge',source=str(p),box=dict(x=int(xs.min()),y=int(ys.min()),w=int(xs.max()-xs.min()+1),h=int(ys.max()-ys.min()+1)),width=128))
p=Path('../generated_images/exec-7ba3c256-3785-4170-b87a-b57ca382ffe3.png');im=Image.open(p)
for i,name in enumerate(['fire','smoke','dust','leaves']):
 x0=i%2*im.width//2;y0=i//2*im.height//2;cell=np.asarray(im)[y0:y0+im.height//2,x0:x0+im.width//2,3];ys,xs=np.where(cell>8);records.append(dict(key='fx-'+name,source=str(p),box=dict(x=int(x0+xs.min()),y=int(y0+ys.min()),w=int(xs.max()-xs.min()+1),h=int(ys.max()-ys.min()+1)),width=128))
Path('art-src/regional-20261021/details.json').write_text(json.dumps(records,indent=2)+'\n');print([(r['key'],r['box']) for r in records])
