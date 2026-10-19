const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const read=n=>JSON.parse(fs.readFileSync(path.join(root,n),'utf8'));
const data=read('catalog.json'),source=read('source-units.json'),ring=read('nazgul-manifest.json');
assert.equal(data.count,source.length);
assert.deepEqual(data.pending,[]);
assert.equal(new Set(data.units.map(u=>u.id)).size,source.length);
assert.deepEqual(data.units.map(u=>u.id).sort(),source.map(u=>u.id).sort());
assert.deepEqual(data.units.filter(u=>u.family==='nazgul').map(u=>u.id).sort(),ring.units.map(u=>u.id).sort());
for(const u of data.units){
 for(const field of ['file','preview','old'])assert.ok(fs.existsSync(path.join(root,u[field])),u.id+' '+field);
 const digest=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,u.file))).digest('hex');
 assert.equal(digest,u.sourceSHA256,u.id+' source changed after review');
 assert.ok(u.profile.top>=0&&u.profile.bottom>u.profile.top&&u.profile.bottom<=1,u.id);
 if(u.family==='nazgul')assert.equal(u.profile.worldReferenceSize,u.body==='large-human'?98:50,u.id);
}
const html=fs.readFileSync(path.join(root,'gallery.html'),'utf8');
const script=html.split('<script>')[1].split('</script>')[0];new vm.Script(script);
const start=script.indexOf('function filtered()'),end=script.indexOf('function cards()',start);
const state={search:{value:''},group:{value:'all'}};
const context=vm.createContext({catalog:data.units,$:id=>state[id]});
vm.runInContext(script.slice(start,end),context);
for(const [group,count] of [['all',73],['nazgul',27],['nazgul-foot',14],['nazgul-mounted',11],['nazgul-fellbeast',2]]){
 state.group.value=group;assert.equal(context.filtered().length,count,group);
}
state.group.value='nazgul';state.search.value='khamul';assert.equal(context.filtered().length,2);
console.log('PASS: 73 complete catalog entries; all 27 cross-faction Ringwraith IDs; 14/11/2 gallery filters; profiles, image paths and hashes.');
