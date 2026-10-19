from pathlib import Path
import json, shutil, hashlib
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
SITE=Path('/workspace/sites/gondor-art-workshop/dist')
SOURCE=Path('/workspace/scratch/25eb4fc81f95/mesbg')
def main():
    SITE.mkdir(parents=True,exist_ok=True)
    rows=json.loads((ROOT/'roster-source.json').read_text())
    specs=json.loads((ROOT/'variants.json').read_text())
    source=(SOURCE/'index.html').read_text()
    old_profiles=json.JSONDecoder().raw_decode(source.split('const UNIT_ART_PROFILES = ',1)[1])[0]
    records=[]
    for u in rows:
        ident=u['id'];spec=specs[ident];path=ROOT/'units'/(ident+'.png')
        r={'id':ident,'name':u['name_ko'],'english':u['name_en'],'role':u['role'],'weapon':u.get('weapon',''),'faction':u['faction'],**spec,'status':'ready' if path.exists() else 'pending'}
        r['old']='references/'+ident+'.png';r['image']='units/'+ident+'.png';r['thumb']='thumbs/'+ident+'.webp'
        r['oldProfile']=old_profiles.get(ident)
        if path.exists():
            im=Image.open(path);im.load();assert im.mode=='RGBA';assert im.getchannel('A').getextrema()[0]==0
            r['dimensions']=list(im.size);r['sha256']=hashlib.sha256(path.read_bytes()).hexdigest()
            thumb=im.copy();thumb.thumbnail((260,300),Image.Resampling.NEAREST)
            (ROOT/'thumbs').mkdir(exist_ok=True);thumb.save(ROOT/r['thumb'],'WEBP',lossless=True)
        records.append(r)
    (ROOT/'manifest.json').write_text(json.dumps({'baseMain':'3f60319f2a02b5837f456ac1a6b241c0dac047e7','branch':'art/gondor-body-variants-20261019','total':len(records),'complete':sum(r['status']=='ready' for r in records),'units':records},ensure_ascii=False,indent=2)+'\n')
    for folder in ['units','thumbs','references']:
        shutil.copytree(ROOT/folder,SITE/folder,dirs_exist_ok=True)
    shutil.copy2(ROOT/'manifest.json',SITE/'manifest.json')
    for p in (ROOT/'review').glob('*'):shutil.copy2(p,SITE/p.name)
    shutil.copy2(SOURCE/'index.html',SITE/'game-source.html')
    print(json.dumps({'total':len(records),'complete':sum(r['status']=='ready' for r in records)}))
if __name__=='__main__':main()
