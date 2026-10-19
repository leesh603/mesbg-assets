const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const report=JSON.parse(fs.readFileSync('review/roster-unify-20261019/manifest.json'));
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
test('resumed roster has 49 active replacements with preserved original artwork and synchronized gallery copies',()=>{
 const active=report.units.filter(u=>u.id!=='galadriel_war');assert.equal(active.length,49);assert.equal(new Set(active.map(u=>u.id)).size,49);
 for(const u of active){
  const b=fs.readFileSync(u.files.production);assert.equal(digest(b),u.sourceSHA256,u.id);
  assert.equal(b[25],6,u.id+' RGBA');assert.deepEqual([b.readUInt32BE(16),b.readUInt32BE(20)],u.sourceSize);
  assert(Math.max(...u.sourceSize)<=384,u.id+' mobile texture size');
  for(const k of ['root','source'])assert.deepEqual(fs.readFileSync(u.files[k]),b,u.id+' '+k);
  assert.equal(digest(fs.readFileSync(u.files.before)),u.beforeSHA256);assert.notEqual(u.beforeSHA256,u.sourceSHA256);
  assert.equal(fs.readFileSync(u.files.thumbnail).subarray(0,4).toString(),'RIFF');
  for(const file of ['gallery.html','gallery2.html']){
   const html=fs.readFileSync(file,'utf8'),pos=html.indexOf('<img src="tokens/'+u.id+'.png');
   assert(pos>=0,u.id+' '+file);const tag=html.slice(pos,html.indexOf('>',pos));
   assert(tag.includes('?v='+report.revision),u.id+' cache');assert(tag.includes('width:auto'),u.id+' aspect');
  }
 }
});
test('uncatalogued war Galadriel is archived without being registered as an extra combat unit',()=>{
 assert.deepEqual(report.archivedOnly.map(u=>u.id),['galadriel_war']);
 const audit=JSON.parse(fs.readFileSync('docs/unit-art-audit.json')).units;
 assert(!audit.some(u=>u.id==='galadriel_war'));assert(fs.existsSync(report.archivedOnly[0].source));
});
test('approved reference artwork and prior Lorien and Elrond replacements are excluded from this redraw',()=>{
 for(const id of ['glorfindel_foot','glorfindel_mounted','elrond','elrond_mounted','rumil','orophin'])assert(!report.units.some(u=>u.id===id));
});
