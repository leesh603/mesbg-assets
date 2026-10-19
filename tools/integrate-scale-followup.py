"""Apply reviewed native artwork and species stature; no anatomical raster warping."""
from pathlib import Path
from PIL import Image
import json, hashlib, shutil, re
from io import BytesIO
root=Path(__file__).resolve().parents[1]
folder='scale-followup-20261019'; revision=folder
review=root/'review'/folder; art=root/'art-src'/folder
def read(p): return json.loads(p.read_text())
def write(p,v): p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def sha(p): return hashlib.sha256(p.read_bytes()).hexdigest()
keys=['bodyClass','top','bottom','centerX','centerY','worldReferenceSize','reference']
audit=read(root/'docs/unit-art-audit.json'); variants=read(root/'data/troop-new-units.json')
before=read(review/'before-audit.json'); beforevars=read(review/'before-variants.json')
old={u['id']:u for u in before['units']}; oldv={u['id']:u for u in beforevars}
points=read(review/'landmarks.json')
spec=read(review/'redraw-targets.json'); redraw=set(sum(spec.values(),[]))|{'imrahil_mounted'}
body={'human':86,'elf':86,'large-human':98,'large_human':98,'dwarf':68,'hobbit':54,'goblin':63,'orc':76,'uruk':90}
rider={'human':43,'elf':43,'large-human':50,'large_human':50,'dwarf':37,'hobbit':27,'goblin':32,'orc':39,'uruk':45}
changed=[]
for a in audit['units']:
 id=a['id']; previous=old[id]; profile_before=[previous[k] for k in keys]
 if id=='knight_of_umbar': a['bodyClass']='large-human'
 target=(rider if a['reference']=='rider' else body).get(a['bodyClass'])
 if target is not None:a['worldReferenceSize']=target
 if id in points:
  a['top'],a['bottom'],a['centerX'],a['centerY']=points[id]
 if id in redraw:
  assert id in points,id+' missing visual landmarks'
  source=art/(id+'.png');im=Image.open(source).convert('RGBA')
  # Canonical asset names may differ from unit IDs (Theodred).
  for dest in [root/a['file'],root/'assets/mesbg'/a['file']]:shutil.copyfile(source,dest)
  for dest in [root/'tokens'/(id+'.png'),root/'assets/mesbg/tokens'/(id+'.png')]:
   if id!='theodred':shutil.copyfile(source,dest)
  a.update(sourceWidth=im.width,sourceHeight=im.height,sourceSHA256=sha(source),anatomicalCorrection=True)
 if id not in redraw and [a[k] for k in keys]==profile_before:continue
 a['referenceAxis']='height'
 a['visualReview']={'date':'2026-10-19','sheet':folder,'landmarks':'visually reviewed anatomical crown-to-sole or seated crown-to-pelvis; weapons, heraldry, helmet wings and banners excluded','source':'assets/mesbg/'+a['file']}
 a['centerReview']={'date':'2026-10-19','basis':'rider-and-mount' if a['reference']=='rider' else 'body','source':'assets/mesbg/'+a['file'],'excludes':['weapons','banners','decorations','cloak edges','tails','antlers']}
 a['calibration']='Shared species stature without named hero multipliers; individual reviewed anatomical landmarks.'
 a['statureCalibration'].update(pinned=True,reason='pinned-by-visual-review',applied='reviewed-landmarks',reviewedReference={k:a[k] for k in ['bodyClass','reference','top','bottom','worldReferenceSize','sourceSHA256']})
 changed.append((a,id,profile_before,[a[k] for k in keys]))
for a in variants:
 id=a['id'];p=a['artProfile'];beforep=oldv[id]['artProfile'];p[5]=(rider if p[6]=='rider' else body).get(p[0],p[5])
 if id in points:p[1:5]=points[id]
 if id in redraw:
  source=art/(id+'.png');im=Image.open(source)
  for dest in [root/'tokens'/(id+'.png'),root/'assets/mesbg/tokens'/(id+'.png')]:shutil.copyfile(source,dest)
  a['artAudit'].update(sourceSize=list(im.size),sourcePath='art-src/'+folder+'/'+id+'.png',sourceSHA256=sha(source),headOrRiderTop=p[1],feetOrRiderBottom=p[2],bodyCenter=p[3:5],method='2026-10-19 compact adult anatomy and shared species stature; individual visual review')
 if p!=beforep or id in redraw:changed.append((a,id,beforep,p))
audit['targets'].update(body);audit['measurementPolicy']['riderTargets'].update(rider)
audit['measurementPolicy']['dwarf']='crown-to-sole68 for heroes and soldiers; seated rider37'
audit['measurementPolicy']['stature']='Species stature is independent of hero name, role, cost and weapon envelope.'
audit['statureCalibration']['reviewedTargets'].update(body)
write(root/'docs/unit-art-audit.json',audit);write(root/'data/troop-new-units.json',variants)
catalog={u['id']:u for u in read(root/'units.json')['units']};rows=[]
for a,id,beforep,p in changed:
 canonical=a.get('file','tokens/'+id+'.png');production=root/'assets/mesbg'/canonical;im=Image.open(production).convert('RGBA')
 if id not in redraw:shutil.copyfile(production,art/(id+'.png'))
 bp=art/'before'/(id+'.png')
 if not bp.exists():shutil.copyfile(production,bp)
 rows.append({'id':id,'name':catalog.get(id,{}).get('name_ko',a.get('name',id)),'role':catalog.get(id,{}).get('role','infantry'),'issue':'proportion' if id in redraw else 'scale-only','revision':revision,'sourceSize':list(im.size),'sourceSHA256':sha(production),'beforeSHA256':sha(bp),'beforeProfile':beforep,'artProfile':p,'files':{'production':str(production.relative_to(root)),'root':canonical,'source':'art-src/'+folder+'/'+id+'.png','before':str(bp.relative_to(root)),'thumbnail':'assets/mesbg/thumbs/'+id+'.webp'},'review':{'camera':'elevated-quarter-view','center':'rider-and-mount' if p[6]=='rider' else 'body','stature':'shared species target without hero multiplier'}})
 height=min(160,im.height);buf=BytesIO();im.resize((round(im.width*height/im.height),height),Image.Resampling.LANCZOS).save(buf,'WEBP',quality=82,method=6);encoded=buf.getvalue();assert len(encoded)>100,id; (root/'assets/mesbg/thumbs'/(id+'.webp')).write_bytes(encoded)
 shutil.copyfile(production,root/canonical)
manifest={'date':'2026-10-19','baseSHA':'17b1c8260b3edc6bf333d1b75067c24ba4ab11f5','revision':revision,'units':rows,'redrawn':sorted(redraw),'preservedImages':{id:sha(root/'tokens'/(id+'.png')) for id in ['glorfindel_foot','glorfindel_mounted','gil_galad','erestor']},'heraldry':{'imrahil':'Dol Amroth white swan','imrahil_mounted':'Dol Amroth white swan'},'note':'38 native redraws or heraldry edits; shared species sizes; corrected Glorfindel anatomical landmarks with original image bytes preserved.'}
write(review/'manifest.json',manifest)
source=root/'src/game.js';s=source.read_text();anchor='const UNIT_ART_REVISIONS = ';start=s.index(anchor)+len(anchor);end=s.index(';',start);rev=json.loads(s[start:end])
for row in rows:
 id=row['id'];rev['tokens/'+id+'.png']=revision;rev['thumbs/'+id+'.webp']=revision
 canonical=row['files']['root'];rev[canonical]=revision;rev[canonical.replace('tokens/','thumbs/').replace('.png','.webp')]=revision
 if canonical!='tokens/'+id+'.png':shutil.copyfile(root/row['files']['thumbnail'],root/'assets/mesbg'/canonical.replace('tokens/','thumbs/').replace('.png','.webp'))
source.write_text(s[:start]+json.dumps(rev,separators=(',',':'))+s[end:])
for filename in ['gallery.html','gallery2.html']:
 path=root/filename;s=path.read_text()
 for row in rows:
  id=row['id'];s=re.sub(r'<img src="tokens/'+re.escape(id)+r'\.png[^\"]*"[^>]*>',lambda m:re.sub(r'src="[^"]*"','src="'+row['files']['root']+'?v='+revision+'"',m.group()),s)
 path.write_text(s)
for folder2 in ['fivehead-20261019','roster-unify-20261019','unit-redraw-20261019','osgiliath-growth-20261019']:
 path=root/'review'/folder2/'manifest.json';d=read(path)
 for u in d['units']:
  if u['id'] in {r['id'] for r in rows}:u['supersededBy']='review/'+folder+'/manifest.json'
 write(path,d)
print('Integrated',len(rows),'reviewed profiles;',len(redraw),'native art edits')
