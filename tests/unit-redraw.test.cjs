const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),vm=require('node:vm');
const report=JSON.parse(fs.readFileSync('review/unit-redraw-20261019/manifest.json'));
const audit=JSON.parse(fs.readFileSync('docs/unit-art-audit.json')).units;
const variants=JSON.parse(fs.readFileSync('data/troop-new-units.json'));
const source=fs.readFileSync('src/game.js','utf8');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const effective=require('./art-review-lineage.cjs');
test('all 22 reviewed sprites have native RGBA dimensions, identical consumed copies and preserved originals',()=>{
 assert.equal(report.units.length,22);assert.equal(new Set(report.units.map(u=>u.id)).size,22);
 for(const original of report.units){const u=effective(original);
  const b=fs.readFileSync(u.files.production);assert.equal(hash(b),u.sourceSHA256,u.id);
  assert.deepEqual([b.readUInt32BE(16),b.readUInt32BE(20)],u.sourceSize);assert.equal(b[25],6);
  assert((u.issue==='user-selected'?Math.max(...u.sourceSize)<=1343:Math.max(...u.sourceSize)<=384));
  for(const k of ['root','source'])assert.deepEqual(fs.readFileSync(u.files[k]),b,u.id+' '+k);
  const before=fs.readFileSync(u.files.before);if(u.issue==='scale-only')assert.notDeepEqual(u.beforeProfile,u.artProfile);else assert.notEqual(hash(before),u.sourceSHA256,u.id+' replaced');
  assert(fs.readFileSync(u.files.thumbnail).subarray(0,4).equals(Buffer.from('RIFF')));
  const gallery=fs.readFileSync('gallery.html','utf8'),a=gallery.indexOf('<img src="tokens/'+u.id+'.png'),tag=gallery.slice(a,gallery.indexOf('>',a));
  assert(tag.includes('?v='+(u.revision||'quarter-redraw-20261019')),u.id+' gallery cache');assert(tag.includes('width:auto;'),u.id+' gallery aspect ratio');
 }
});
test('replacement anatomy matches authoritative data and caches cover both battle and card images',()=>{
 const context={};vm.createContext(context);
 const a=source.indexOf('const UNIT_ART_REVISIONS = '),b=source.indexOf(';',a);
 vm.runInContext(source.slice(a,b)+';this.rev=UNIT_ART_REVISIONS;',context);
 for(const original of report.units){const u=effective(original);
  const v=variants.find(d=>d.id===u.id);
  if(v){assert.deepEqual(v.artProfile,u.artProfile);assert.equal(v.artAudit.sourceSHA256,u.sourceSHA256);}
  else{
   const p=audit.find(d=>d.id===u.id);assert.equal(p.sourceSHA256,u.sourceSHA256);
   assert.deepEqual([p.bodyClass,p.top,p.bottom,p.centerX,p.centerY,p.worldReferenceSize,p.reference],u.artProfile);
   assert.equal(p.visualReview.date,'2026-10-19');assert.equal(p.statureCalibration.pinned,true);
  }
  assert.equal(context.rev['tokens/'+u.id+'.png'],u.revision||'quarter-redraw-20261019');
  assert.equal(context.rev['thumbs/'+u.id+'.webp'],u.revision||'quarter-redraw-20261019');
 }
});
test('online build embeds the exact tested source',()=>{
 const html=fs.readFileSync('index.html','utf8'),a=html.indexOf('/*__LWB_SRC_BEGIN__*/'),b=html.indexOf('/*__LWB_SRC_END__*/');
 assert.equal(html.slice(a+'/*__LWB_SRC_BEGIN__*/'.length,b).trim(),source.trim());
});

