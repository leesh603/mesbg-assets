"""Package visually selected unit art, update anatomy and cache keys, preserve source provenance."""
from pathlib import Path
from PIL import Image
import json,hashlib,re,shutil
ROOT=Path(__file__).resolve().parents[1]
def read(p):return json.loads((ROOT/p).read_text())
def write(p,v):(ROOT/p).parent.mkdir(parents=True,exist_ok=True);(ROOT/p).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
selections=read('review/final-20261021/visual-landmarks.json')
audit=read('docs/unit-art-audit.json');variants=read('data/troop-new-units.json')
by={u['id']:u for u in audit['units']};vb={u['id']:u for u in variants}
revision='final-art-20261021';rows=[]
for index,r in enumerate(selections):
 if index%25==0:print('Packaging',index,'/',len(selections),flush=True)
 id=r['id'];a=by.get(id);v=vb.get(id)
 if id=='theodred' and not (ROOT/'art-src/final-20261021/theodred-mounted.png').exists():continue
 source=ROOT/r['source'];im=Image.open(source).convert('RGBA');bb=im.getbbox()
 # Packaging removes transparent padding only; no pose/part warping.
 im=im.crop(bb);w,h=im.size;pad=round(max(w,h)*.025);canvas=Image.new('RGBA',(w+pad*2,h+pad*2));canvas.alpha_composite(im,(pad,pad))
 sc=min(1,384/max(canvas.size));packed=canvas.resize((round(canvas.width*sc),round(canvas.height*sc)),Image.Resampling.NEAREST)
 profile=[a[k] for k in ['bodyClass','top','bottom','centerX','centerY','worldReferenceSize','reference']] if a else v['artProfile'][:]
 profile[1]=(pad+r['crown']*h)/(h+pad*2);profile[2]=(pad+r['soleOrPelvis']*h)/(h+pad*2)
 profile[3]=(pad+r['bodyCenterX']*w)/(w+pad*2);profile[4]=(pad+r['bodyCenterY']*h)/(h+pad*2)
 canonical=a['file'] if a else v['meta']['file']
 paths={canonical,'tokens/'+id+'.png'}
 for file in paths:
  for prefix in ['','assets/mesbg/']:
   out=ROOT/(prefix+file);out.parent.mkdir(parents=True,exist_ok=True);packed.save(out,compress_level=3)
 production=ROOT/'assets/mesbg'/canonical;digest=sha(production)
 thumb=packed.copy();thumb.thumbnail((384,160),Image.Resampling.LANCZOS)
 for file in paths:
  dest=ROOT/'assets/mesbg'/file.replace('tokens/','thumbs/').replace('.png','.webp');dest.parent.mkdir(parents=True,exist_ok=True);thumb.save(dest,'WEBP',quality=82,method=4)
 basis='creature-body' if profile[0] in ['fellbeast','great-beast','mumak'] else 'rider-and-mount' if profile[6]=='rider' else 'body'
 if a:
  a.update(top=profile[1],bottom=profile[2],centerX=profile[3],centerY=profile[4],sourceWidth=packed.width,sourceHeight=packed.height,sourceSHA256=digest,referenceAxis='height',anatomicalCorrection=True)
  a['visualReview']={'date':'2026-10-21','sheet':'final-20261021','landmarks':'Individual visual crown-to-sole / seated pelvis selections; weapons and crests excluded. See visual-landmarks.json.','source':'assets/mesbg/'+canonical}
  a['centerReview']={'date':'2026-10-21','basis':basis,'source':'assets/mesbg/'+canonical,'excludes':['weapons','banners','decorations','cloak edges','tails','antlers']}
  a['calibration']='Individually selected landmarks; existing species world stature preserved; uniform raster packing.'
  sca=a.setdefault('statureCalibration',{});sca.update(pinned=True,reason='pinned-by-visual-review',applied='reviewed-landmarks',reviewedReference={k:a[k] for k in ['bodyClass','reference','top','bottom','worldReferenceSize','sourceSHA256']})
 else:
  v['artProfile']=profile;v['artAudit'].update(sourceSize=list(packed.size),sourcePath=str(source.relative_to(ROOT)),sourceSHA256=digest,headOrRiderTop=profile[1],feetOrRiderBottom=profile[2],bodyCenter=profile[3:5],method='2026-10-21 individual visual anatomical landmark selection; species stature preserved')
 rows.append({'id':id,'file':canonical,'aliases':sorted(paths),'source':str(source.relative_to(ROOT)),'sourceBlobSHA':r.get('sourceBlobSHA'),'sourceSHA256':sha(source),'productionSHA256':digest,'size':list(packed.size),'profile':profile})
write('docs/unit-art-audit.json',audit);write('data/troop-new-units.json',variants)
p=ROOT/'src/game.js';s=p.read_text();anchor='const UNIT_ART_REVISIONS = ';i=s.index(anchor)+len(anchor);j=s.index(';',i);rev=json.loads(s[i:j])
for r in rows:
 for file in r['aliases']:
  rev[file]=revision;rev[file.replace('tokens/','thumbs/').replace('.png','.webp')]=revision
p.write_text(s[:i]+json.dumps(rev,separators=(',',':'))+s[j:])
for file in ['gallery.html','gallery2.html']:
 p=ROOT/file;s=p.read_text()
 for r in rows:
  for f in r['aliases']:s=re.sub(r'(src=["\']'+re.escape(f)+r')(?:\?[^"\']*)?',lambda m:m.group(1)+'?v='+revision,s)
 p.write_text(s)
write('review/final-20261021/unit-manifest.json',{'baseline':'51d62e5c5d3865097a12c9ab9c8f55fadadc4ccb','artBranch':'art/full-roster-night-rebuild-20261019','artCommit':'447e78dc9a3c8dcbdb3b0305b48621cc20b6cc2d','revision':revision,'units':rows,'scope':'production PNG and gallery copy, thumbnails, anatomical profiles, cache keys; combat mechanics unchanged'})
# Prior reports keep historical hashes and identify their release successor.
for folder in ['fivehead-20261019','scale-followup-20261019','roster-unify-20261019','unit-redraw-20261019','osgiliath-growth-20261019']:
 p=ROOT/'review'/folder/'manifest.json'
 if not p.exists():continue
 d=json.loads(p.read_text())
 for u in d.get('units',[]):
  if u['id'] in {r['id'] for r in rows}:u['supersededBy']='review/final-20261021/unit-manifest.json'
 p.write_text(json.dumps(d,ensure_ascii=False,indent=2)+'\n')
print('Integrated',len(rows),'individual unit images; max edge 384; species stature unchanged')

