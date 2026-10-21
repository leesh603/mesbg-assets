# Locate isolated atlas sprites; export is handled by sharp without repainting.
import json,sys
import numpy as np
from PIL import Image
from scipy.ndimage import label,find_objects
from pathlib import Path
names=[['minas_tirith','osgiliath','amon_sul','helms_deep','edoras','pelennor','minas_court','dale','hornburg'],['fangorn','rivendell','lothlorien','moria','dunharrow','erebor','mirkwood','gondolin','erebor_hall'],['isengard','black_gate','gorgoroth','dead_marshes','dol_guldur','angband','orthanc','barad_dur','minas_morgul']]
files=['exec-b727337d-f991-4102-a971-26a1cca950f9.png','exec-3aa5a978-8dad-44ce-a443-06a7a6ad2e5e.png','exec-0c7cfe7e-9548-4259-87bb-cdb0b7c63147.png']
records=[]
for keys,file in zip(names,files):
 p=Path('../generated_images')/file;im=Image.open(p);a=np.asarray(im)[:,:,3];lab,n=label(a>64);sizes=np.bincount(lab.ravel());ids=np.argsort(sizes[1:])[-9:]+1;boxes=find_objects(lab);objects=[]
 for i in ids:
  sy,sx=boxes[i-1];x0=max(0,sx.start-3);y0=max(0,sy.start-3);x1=min(im.width,sx.stop+3);y1=min(im.height,sy.stop+3);objects.append(dict(x=x0,y=y0,w=x1-x0,h=y1-y0,cx=(sx.start+sx.stop)/2,cy=(sy.start+sy.stop)/2))
 objects.sort(key=lambda q:q['cy']);ordered=[]
 for i in range(0,9,3):ordered+=sorted(objects[i:i+3],key=lambda q:q['cx'])
 for key,box in zip(keys,ordered):records.append(dict(key=key,source=str(p),box=box))
Path('art-src/regional-20261021/slices.json').write_text(json.dumps(records,indent=2)+'\n')
print([(r['key'],r['box']['w'],r['box']['h']) for r in records])
