const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const dir='review/scale-followup-20261019',manifest=JSON.parse(fs.readFileSync(dir+'/manifest.json'));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const audit=JSON.parse(fs.readFileSync('docs/unit-art-audit.json')),variants=JSON.parse(fs.readFileSync('data/troop-new-units.json'));
test('all humanoids share species stature irrespective of hero name or role',()=>{
 const {STATURE_TARGETS,resolveUnitClassAndTarget}=require('../tools/calibrate-unit-stature.cjs');
 for(const u of audit.units){const expected=STATURE_TARGETS[u.reference]?.[u.bodyClass];if(expected&&['human','elf','large-human','dwarf','orc','goblin','hobbit','uruk'].includes(u.bodyClass))assert.equal(u.worldReferenceSize,expected,u.id);}
 for(const u of variants){const p=u.artProfile;assert.equal(p[5],STATURE_TARGETS[p[6]][p[0]],u.id);}
 for(const id of ['aragorn','feanor','fingolfin','tom_bombadil','nameless_soldier']){
  const resolved=resolveUnitClassAndTarget(id,{bodyClass:'human',reference:'body'},null);
  assert.equal(resolved.mode,'body',id);assert.equal(resolved.worldReferenceSize,86,id);
 }
});
test('every changed consumed source, canonical filename, thumbnail and review agrees',()=>{
 assert.equal(manifest.redrawn.length,38);
 for(const u of manifest.units){
  for(const key of ['production','root','source'])assert.equal(sha(u.files[key]),u.sourceSHA256,u.id+' '+key);
  assert.equal(sha(u.files.before),u.beforeSHA256,u.id+' preserved before');
  const a=audit.units.find(a=>a.id===u.id);if(a){assert.equal(u.files.production,'assets/mesbg/'+a.file);assert.equal(a.sourceSHA256,u.sourceSHA256);assert(a.statureCalibration.pinned);}
  assert(fs.statSync(u.files.thumbnail).size>100,u.id);
  if(u.issue==='scale-only')assert.notDeepEqual(u.beforeProfile,u.artProfile);else assert.notEqual(u.beforeSHA256,u.sourceSHA256);
 }
 const t=manifest.units.find(u=>u.id==='theodred');assert.equal(t.artProfile[6],'rider');assert.equal(t.files.production,'assets/mesbg/tokens/theodred_mounted.png');
});
test('Glorfindel keeps original art while crown landmarks stop enlarging his body',()=>{
 for(const [id,hash]of Object.entries(manifest.preservedImages))assert.equal(sha('assets/mesbg/tokens/'+id+'.png'),hash,id);
 const g=audit.units.find(u=>u.id==='glorfindel_foot'),m=audit.units.find(u=>u.id==='glorfindel_mounted');
 assert(g.top>=.025&&g.top<=.045);assert.equal(g.bottom,.9384);assert.equal(g.worldReferenceSize,86);
 assert(m.top>=.04&&m.top<=.07);assert.equal(m.worldReferenceSize,43);
 assert.equal(manifest.heraldry.imrahil,'Dol Amroth white swan');assert.equal(manifest.heraldry.imrahil_mounted,'Dol Amroth white swan');
});
