const effective=require('./art-review-lineage.cjs');
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto'),vm=require('node:vm');
const dir='review/roster-unify-20261019',manifest=JSON.parse(fs.readFileSync(dir+'/manifest.json')),census=JSON.parse(fs.readFileSync(dir+'/census.json'));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
test('full visual census records every one of the 597 production token files, with original identities',()=>{
 const files=fs.readdirSync('assets/mesbg/tokens').filter(f=>f.endsWith('.png')).map(f=>f.slice(0,-4)).sort();
 assert.equal(census.length,597);assert.deepEqual(census.map(u=>u.id).sort(),files);assert.equal(new Set(census.map(u=>u.id)).size,597);
 assert.equal(census.filter(u=>u.decision==='redrawn').length,50);assert.equal(census.filter(u=>u.decision==='scale-corrected').length,1);
 for(const u of census){const current=JSON.parse(fs.readFileSync('review/final-20261021/unit-manifest.json')).units.find(v=>v.aliases.includes('tokens/'+u.id+'.png'));if(current){assert.equal(sha(fs.readFileSync(current.files.production)),current.sourceSHA256,u.id);continue;}const follow=JSON.parse(fs.readFileSync('review/scale-followup-20261019/manifest.json')).units.find(v=>v.files.production==='assets/mesbg/tokens/'+u.id+'.png'),changed=manifest.units.find(v=>v.id===u.id),later=JSON.parse(fs.readFileSync('review/fivehead-20261019/manifest.json')).units.find(v=>v.id===u.id),path=changed?changed.files.before:later?later.files.before:follow?follow.files.before:fs.existsSync('art-src/fivehead-20261019/before/'+u.id+'.png')?'art-src/fivehead-20261019/before/'+u.id+'.png':'assets/mesbg/tokens/'+u.id+'.png';assert.equal(sha(fs.readFileSync(path)),u.beforeSHA256,u.id);assert(u.sheet>0&&u.cell>0);}
});
test('50 art replacements are bounded transparent native sprites with byte-identical production and gallery copies',()=>{
 assert.equal(manifest.units.length,50);assert.equal(manifest.units.filter(u=>u.issue==='mounted').length,21);
 for(const original of manifest.units){const u=effective(original);const b=fs.readFileSync(u.files.production);assert.equal(sha(b),u.sourceSHA256,u.id);assert.deepEqual([b.readUInt32BE(16),b.readUInt32BE(20)],u.sourceSize);assert.equal(b[25],6,u.id+' RGBA');assert((u.issue==='user-selected'?Math.max(...u.sourceSize)<=1343:Math.max(...u.sourceSize)<=384),u.id+' texture budget');
 for(const key of ['root','source'])assert.deepEqual(fs.readFileSync(u.files[key]),b,u.id+' '+key);assert.equal(sha(fs.readFileSync(u.files.before)),u.beforeSHA256);if(u.issue==='scale-only')assert.notDeepEqual(u.beforeProfile,u.artProfile);else assert.notEqual(u.sourceSHA256,u.beforeSHA256);
 const thumb=fs.readFileSync(u.files.thumbnail);assert.equal(thumb.toString('ascii',0,4),'RIFF');assert.equal(thumb.toString('ascii',8,12),'WEBP');}
});
test('anatomical reviews and image caches match replacements; ornaments never define body scale',()=>{
 const source=fs.readFileSync('src/game.js','utf8'),audit=JSON.parse(fs.readFileSync('docs/unit-art-audit.json')).units,ctx={};vm.createContext(ctx);
 for(const key of ['UNIT_ART_PROFILES','UNIT_ART_REVISIONS']){const start=source.indexOf('const '+key+' = '),end=source.indexOf(';',start);vm.runInContext(source.slice(start,end)+';this.'+key+'='+key,ctx);}
 for(const original of manifest.units){const u=effective(original);if(u.role!=='uncatalogued'){const a=audit.find(a=>a.id===u.id);assert(a,u.id);assert.equal(a.sourceSHA256,u.sourceSHA256);assert(a.statureCalibration.pinned);assert.deepEqual(Array.from(ctx.UNIT_ART_PROFILES[u.id]),u.artProfile);assert.equal(a.centerReview.basis,u.artProfile[6]==='rider'?'rider-and-mount':'body');}
 for(const key of ['tokens/'+u.id+'.png','thumbs/'+u.id+'.webp'])assert.equal(ctx.UNIT_ART_REVISIONS[key],u.revision);
 const p=u.artProfile;if(u.issue==='mounted'){assert.equal(p[5],43);assert.equal(p[6],'rider');assert(p[2]-p[1]<.34,u.id+' head-to-saddle span');}
 else assert(p[5]<=86,u.id+' normal species stature');
 const g=fs.readFileSync('gallery.html','utf8'),start=g.indexOf('<img src="tokens/'+u.id+'.png');if(start>=0){const tag=g.slice(start,g.indexOf('>',start));assert(tag.includes('?v='+u.revision));assert(tag.includes('width:auto;'));}}
 assert.equal(ctx.UNIT_ART_PROFILES.glorfindel_foot[5],86);assert.equal(ctx.UNIT_ART_PROFILES.witchking_foot[5],98);
});
test('audit, review prompts and runtime catalog distinguish compatibility-only art from actual fighters',()=>{
 const h=require('./campaign-harness.cjs')(),ids=h.run("Array.from(q.meta.values()).filter(u=>u.side!=='terrain'&&!u.id.startsWith('terr_')).map(u=>u.id)");
 const prompts=JSON.parse(fs.readFileSync(dir+'/prompts.json'));assert.equal(prompts.units.length,50);
 for(const id of ids)assert(census.some(u=>u.id===id),id+' missing census');
 assert(manifest.units.find(u=>u.id==='galadriel_war').role==='uncatalogued');assert(!ids.includes('galadriel_war'));
});
test('automatic calibration preserves the exact size of visually pinned named heroes',()=>{
 const {calibrateUnit}=require('../tools/calibrate-unit-stature.cjs'),a=JSON.parse(fs.readFileSync('docs/unit-art-audit.json'));
 for(const id of ['ecthelion','glorfindel_foot','durin_vi']){const u=a.units.find(u=>u.id===id),out=calibrateUnit(u,a.targets,a.measurementPolicy.riderTargets,fs.readFileSync('assets/mesbg/'+u.file));assert.equal(out.worldReferenceSize,u.worldReferenceSize,id+' named boost must not override visual review');assert.equal(out.top,u.top);assert.equal(out.bottom,u.bottom);}
});

