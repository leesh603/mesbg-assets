"""Integrate individually reviewed rasters; never infer anatomy from alpha bounds."""
from pathlib import Path
from PIL import Image
import json, hashlib, shutil, re

root=Path(__file__).resolve().parents[1]
review=root/'review/fivehead-20261019'
art=root/'art-src/fivehead-20261019'
revision='fivehead-final-20261019'
digest=lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
def read(p): return json.loads(p.read_text())
def write(p,v): p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')

state=read(review/'checkpoint.json')
points=read(review/'landmarks.json')
audit=read(root/'docs/unit-art-audit.json')
variants=read(root/'data/troop-new-units.json')
chosen={u['id']:u for u in read(review/'user-replacements.json')}
for i,u in enumerate(audit['units']):
    if u['id'] in chosen: audit['units'][i]=chosen[u['id']]
byid={u['id']:u for u in audit['units']}
vbyid={u['id']:u for u in variants}
catalog={u['id']:u for u in read(root/'units.json')['units']}
rows=[]
for id in state['generated']:
    if id=='gil_galad': continue # A later explicit user attachment takes precedence.
    assert id in points,id
    source=art/(id+'.png')
    dest=root/'assets/mesbg/tokens'/(id+'.png')
    shutil.copyfile(source,dest)
    shutil.copyfile(source,root/'tokens'/(id+'.png'))
    top,bottom,cx,cy=points[id]
    im=Image.open(source).convert('RGBA')
    h=digest(source)
    if id in byid:
        a=byid[id]
        a.update(top=top,bottom=bottom,centerX=cx,centerY=cy,sourceWidth=im.width,sourceHeight=im.height,sourceSHA256=h,referenceAxis='height',anatomicalCorrection=True)
        a['visualReview']={'date':'2026-10-19','sheet':'fivehead-20261019','landmarks':'individual crown-to-sole or seated crown-to-pelvis; crest, weapon, banner and cloak excluded','source':'assets/mesbg/'+a['file']}
        a['centerReview']={'date':'2026-10-19','basis':'rider-and-mount' if a['reference']=='rider' else 'body','source':'assets/mesbg/'+a['file'],'excludes':['weapons','banners','decorations','cloak edges','tails','antlers']}
        a['calibration']='Individual visual review against unchanged Glorfindel; native anatomy redrawn by imagegen, uniform raster packaging only.'
        a['statureCalibration'].update(pinned=True,reason='pinned-by-visual-review',applied='reviewed-landmarks')
        a['statureCalibration']['reviewedReference']={k:a[k] for k in ['bodyClass','reference','top','bottom','worldReferenceSize','sourceSHA256']}
        profile=[a[k] for k in ['bodyClass','top','bottom','centerX','centerY','worldReferenceSize','reference']]
    else:
        a=vbyid[id]
        a['artProfile'][1:5]=[top,bottom,cx,cy]
        profile=a['artProfile']
        a['artAudit'].update(sourceSize=list(im.size),sourcePath='art-src/fivehead-20261019/'+id+'.png',sourceSHA256=h,headOrRiderTop=top,feetOrRiderBottom=bottom,bodyCenter=[cx,cy],method='2026-10-19 individual anatomical five-head quarter-view visual review; native proportions corrected; uniform packing')
    rows.append({'id':id,'name':catalog.get(id,{}).get('name_ko',id),'role':catalog.get(id,{}).get('role','infantry'),'issue':'mounted' if profile[6]=='rider' else 'proportion','revision':revision,'sourceSize':list(im.size),'sourceSHA256':h,'beforeSHA256':digest(art/'before'/(id+'.png')),'artProfile':profile,'files':{'production':'assets/mesbg/tokens/'+id+'.png','root':'tokens/'+id+'.png','source':'art-src/fivehead-20261019/'+id+'.png','before':'art-src/fivehead-20261019/before/'+id+'.png','thumbnail':'assets/mesbg/thumbs/'+id+'.webp'},'review':{'camera':'elevated-quarter-view','proportion':'compact adult five-head; seated rider matched to unchanged mounted Glorfindel','center':'rider-and-mount' if profile[6]=='rider' else 'body'}})

# Keep the two user-provided rasters byte-for-byte, including their original canvas.
for id,a in chosen.items():
    p=root/'tokens'/(id+'.png')
    assert digest(p)==a['sourceSHA256'],id
    shutil.copyfile(p,root/'assets/mesbg/tokens'/(id+'.png'))
    d=art/'user-selected';d.mkdir(exist_ok=True)
    shutil.copyfile(p,d/(id+'.png'))
    before=art/'before'/(id+'.png')
    # Erestor is preserved from the separately merged user-replacement PR.
    if not before.exists(): continue
    rows.append({'id':id,'name':a['name'],'role':'hero','issue':'user-selected','revision':revision,'sourceSize':[a['sourceWidth'],a['sourceHeight']],'sourceSHA256':a['sourceSHA256'],'beforeSHA256':digest(before),'artProfile':[a[k] for k in ['bodyClass','top','bottom','centerX','centerY','worldReferenceSize','reference']],'files':{'production':'assets/mesbg/tokens/'+id+'.png','root':'tokens/'+id+'.png','source':'art-src/fivehead-20261019/user-selected/'+id+'.png','before':'art-src/fivehead-20261019/before/'+id+'.png','thumbnail':'assets/mesbg/thumbs/'+id+'.webp'},'review':{'source':'Explicit later user attachment in PR #43; exact bytes preserved'}})

write(root/'docs/unit-art-audit.json',audit)
write(root/'data/troop-new-units.json',variants)
for id in {u['id'] for u in rows}|set(chosen):
    p=root/'assets/mesbg/tokens'/(id+'.png')
    im=Image.open(p).convert('RGBA');height=min(160,im.height)
    im.resize((round(im.width*height/im.height),height),Image.Resampling.LANCZOS).save(root/'assets/mesbg/thumbs'/(id+'.webp'),'WEBP',quality=82,method=6)

source=root/'src/game.js';s=source.read_text();key='const UNIT_ART_REVISIONS = ';a=s.index(key)+len(key);b=s.index(';',a);rev=json.loads(s[a:b])
for id in {u['id'] for u in rows}|set(chosen):
    rev['tokens/'+id+'.png']=revision;rev['thumbs/'+id+'.webp']=revision
s=s[:a]+json.dumps(rev,separators=(',',':'))+s[b:];source.write_text(s)
for file in ['gallery.html','gallery2.html']:
    p=root/file;s=p.read_text()
    for id in {u['id'] for u in rows}|set(chosen):
        pattern=r'<img src="tokens/'+re.escape(id)+r'\.png[^\"]*"[^>]*>'
        def update(m):
            tag=re.sub(r'src="[^"]*"','src="tokens/'+id+'.png?v='+revision+'"',m.group())
            tag=re.sub(r'style="[^"]*"','style="width:auto;height:152px;max-width:100%;object-fit:contain"',tag)
            return tag
        s=re.sub(pattern,update,s)
    p.write_text(s)

manifest={'date':'2026-10-19','baseSHA':'1f392511e0716f5af5a64b4ab45c037973d90f22','revision':revision,'reference':{id:digest(root/'tokens'/(id+'.png')) for id in ['glorfindel_foot','glorfindel_mounted']},'units':rows,'retainedCompact':state['preserveReviewedCompact'],'userSelected':['gil_galad','erestor'],'generationMode':'built-in imagegen; prompts in generation-log.json','note':'61 compact five-head redraws, one later user-selected Gil-galad, ten existing compact dwarf/goblin sprites preserved. Later Erestor attachment preserved too.'}
write(review/'manifest.json',manifest)
# Historical reports retain original hashes and gain an explicit review lineage.
for folder in ['roster-unify-20261019','unit-redraw-20261019','osgiliath-growth-20261019']:
    p=root/'review'/folder/'manifest.json';d=read(p)
    for u in d['units']:
        if u['id'] in {a['id'] for a in rows}:u['supersededBy']='review/fivehead-20261019/manifest.json'
    write(p,d)
state.update(stage='integrated; visual and regression verification in progress',remaining=[],applied=[u['id'] for u in rows],preservedUserSelection=['gil_galad','erestor'])
write(review/'checkpoint.json',state)
print('Integrated',len(rows),'targets; preserved',len(state['preserveReviewedCompact']),'compact species and later user attachments.')
