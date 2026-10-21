const effective=require('./art-review-lineage.cjs');
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const dir='review/fivehead-20261019',m=JSON.parse(fs.readFileSync(dir+'/manifest.json'));
const sha=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
test('all 72 inspected targets resolve to corrected artwork, later user choice or retained compact species',()=>{
 const state=JSON.parse(fs.readFileSync(dir+'/checkpoint.json'));
 assert.equal(m.units.length,62);assert.equal(m.units.filter(u=>u.issue!=='user-selected').length,61);
 assert.equal(m.retainedCompact.length,10);assert.deepEqual(state.remaining,[]);
 assert.deepEqual([...m.units.map(u=>u.id),...m.retainedCompact].sort(),state.targets.slice().sort());
 for(const [id,hash]of Object.entries(m.reference)){const u=effective({id,supersededBy:'review/final-20261021/unit-manifest.json'});assert.equal(sha(u.files.production),u.sourceSHA256,id);}
 for(const id of m.retainedCompact){const u=effective({id,supersededBy:'review/final-20261021/unit-manifest.json'});assert.equal(sha(u.files.production),u.sourceSHA256,id);}
});
test('consumed native sprites, source copies, anatomy and thumbnail caches agree',()=>{
 const a=JSON.parse(fs.readFileSync('docs/unit-art-audit.json')).units,v=JSON.parse(fs.readFileSync('data/troop-new-units.json'));
 const source=fs.readFileSync('src/game.js','utf8'),start=source.indexOf('const UNIT_ART_REVISIONS = '),end=source.indexOf(';',start);
 const rev=JSON.parse(source.slice(start+'const UNIT_ART_REVISIONS = '.length,end));
 for(const original of m.units){ const u=effective(original);
  const b=fs.readFileSync(u.files.production);assert.equal(sha(u.files.production),u.sourceSHA256,u.id);
  for(const k of ['root','source'])assert.deepEqual(fs.readFileSync(u.files[k]),b,u.id+' '+k);
  assert.deepEqual([b.readUInt32BE(16),b.readUInt32BE(20)],u.sourceSize);assert.equal(b[25],6);
  if(u.issue==='user-selected'){assert.equal(u.id,'gil_galad');assert.equal(u.sourceSHA256,'c61b70331fd0d714b296c4531a9f8809d77c19a856c41b41cb0bc52b7cd248ad');}
  else assert(Math.max(...u.sourceSize)<=384,u.id+' mobile raster budget');
  const thumb=fs.readFileSync(u.files.thumbnail);assert(thumb.subarray(0,4).equals(Buffer.from('RIFF')),u.id);
  const p=a.find(x=>x.id===u.id),z=v.find(x=>x.id===u.id);const profile=p?[p.bodyClass,p.top,p.bottom,p.centerX,p.centerY,p.worldReferenceSize,p.reference]:z.artProfile;
  assert.deepEqual(profile,u.artProfile,u.id);if(p)assert(p.statureCalibration.pinned);
  assert.equal(rev['tokens/'+u.id+'.png'],u.revision);
  assert.equal(rev['thumbs/'+u.id+'.webp'],u.revision);
 }
});
test('later user attachments are preserved byte-for-byte and reviewed anatomy remains explicit',()=>{
 for(const u of JSON.parse(fs.readFileSync(dir+'/user-replacements.json'))){
  const current=effective({id:u.id,supersededBy:'review/final-20261021/unit-manifest.json'});assert.equal(sha(current.files.before),u.sourceSHA256,u.id);assert.equal(sha(current.files.production),current.sourceSHA256,u.id);
 }
});
