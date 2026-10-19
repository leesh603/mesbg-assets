const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),test=require('node:test');
const source=fs.readFileSync('src/game.js','utf8');
const begin=source.indexOf('const UNIT_ART_PROFILES ='),end=source.indexOf('Ve.prototype.update = function (time)',begin);
const context={};vm.createContext(context);vm.runInContext(source.slice(begin,end)+';this.profiles=UNIT_ART_PROFILES;this.layout=unitArtLayout;this.apply=applyUnitArtSprite;',context);
const audit=JSON.parse(fs.readFileSync('docs/unit-art-audit.json','utf8'));
test('every production combat token has an explicit anatomical reference',()=>{
 const h=require('./campaign-harness.cjs')();const models=h.run(`Array.from(q.meta.values()).filter(m=>m.side!=='terrain'&&!m.id.startsWith('terr_')).map(m=>m.id)`);
 const additions=JSON.parse(fs.readFileSync('data/troop-new-units.json','utf8'));const ids=new Set(additions.map(u=>u.id));
 assert.equal(models.length,audit.units.length+additions.length);assert.equal(Object.keys(context.profiles).length,models.length);
 assert.deepEqual([...models].sort(),Object.keys(context.profiles).sort());assert.deepEqual([...models].filter(id=>!ids.has(id)).sort(),audit.units.map(u=>u.id).sort());assert.equal(audit.units.length,492);
});
test('all 492 anatomical spans render to their specified size, independent of radius and artScale',()=>{
 for(const a of audit.units){const p=context.profiles[a.id];assert(p[1]>=0&&p[2]>p[1]&&p[2]<=1);assert(p[3]>=0&&p[3]<=1&&p[4]>=0&&p[4]<=1);
  const src={width:a.sourceWidth,height:a.sourceHeight},u={id:a.id,radius:5,artScale:.1};const out=context.layout(u,src),other=context.layout({...u,radius:500,artScale:20},src);
  const measured=p[7]==='width'?out.width*(p[9]-p[8]):out.height*(p[2]-p[1]);
  assert.deepEqual(out,other);assert(Math.abs(measured-a.worldReferenceSize)<.001,a.id);
  assert(Math.abs(out.width/out.height-src.width/src.height)<1e-8,a.id);assert.equal(out.originX,a.centerX);assert.equal(out.originY,a.centerY);
  assert.equal(out.referenceAxis,'height',a.id);
 }
});
test('banners, staves and spears have anatomical centers independent of their ornament envelopes',()=>{
 assert(context.profiles.dwarf_banner[2]-context.profiles.dwarf_banner[1]<.8);
 assert(context.profiles.gandalf[3]>.5);assert(context.profiles.orc_spear2[3]>.5);
 assert.equal(context.profiles.mt_spear[5],context.profiles.mt_swordshield[5]);
 assert.equal(context.profiles.gandalf_mounted[5],43);assert.equal(context.profiles.dain_boar[5],37);
});
test('padding and seated poses do not create multiples of cavalry size',()=>{
 const heroRole=Object.fromEntries(require('./campaign-harness.cjs')().run(`Array.from(q.meta.values()).filter(m=>m.side!=='terrain').map(m=>[m.id,m.role])`));
 const mountedHeight=id=>{const a=audit.units.find(x=>x.id===id),o=context.layout({id},{width:a.sourceWidth,height:a.sourceHeight});return o.height*(.95-a.top);};
 for(const pair of [['aragorn_mounted','elrond_mounted'],['witchking_mounted','witchking_mounted_sheet'],['arathorn_mounted','faramir_mounted']]){
  const sizes=pair.map(mountedHeight);assert(Math.max(...sizes)/Math.min(...sizes)<1.25,pair.join('/'));
 }
 for(const a of audit.units.filter(x=>x.bodyClass==='dwarf'&&x.reference==='body')){
  const o=context.layout({id:a.id},{width:a.sourceWidth,height:a.sourceHeight});const stature=o.height*(a.bottom-a.top);
  // Heroes and soldiers share the same reviewed dwarf stature.
  assert(Math.abs(stature-68)<.001,a.id);
 }
 assert.equal(context.profiles.warg_chieftain[6],'rider');assert.equal(context.profiles.rhosgobel_rabbit[6],'body');
 assert.equal(context.profiles.witchking_fellbeast[6],'rider');
 assert(context.profiles.gwaihir[5]>context.profiles.great_eagle[5]);assert(context.profiles.thorondor[5]>context.profiles.gwaihir[5]);
});
test('character details do not reveal evolution thresholds or next forms',()=>{
 const ui={q:{pointCost:()=>165},pointSourceText:()=>''};vm.createContext(ui);vm.runInContext(source.slice(source.indexOf('function uiUnitStats('),source.indexOf('function uiConfirm('))+';this.render=uiUnitStats;',ui);
 for(const kills of [0,99,100]){const html=ui.render({id:'aragorn',kills,traits:['hero'],stats:{move:270,fight:6,strength:4,defence:6,attacks:3,courage:6,wounds:3,might:3},resources:{might:3},currentWounds:3});assert(!/진화|100킬|evolution-progress|aragorn_blackgate/.test(html));assert(html.includes('Might'));}
 const h=require('./campaign-harness.cjs')();h.run("const hiddenAragorn=q.spawn('aragorn','good'); hiddenAragorn.kills=99; this.hiddenHero=hiddenAragorn;");
 assert.equal(h.run('q.evolveHero(hiddenHero)'),false);h.run('hiddenHero.kills=100');assert.equal(h.run('q.evolveHero(hiddenHero)'),true);
 assert.equal(h.run('hiddenHero.id'),'aragorn_blackgate');
});
test('lazy-loaded and transformed units anchor rotation and idle at the body, with no stale profile',()=>{
 const data=new Map(),sprite={scaleX:1,scaleY:1,visible:true,getData:k=>data.get(k),setData(k,v){data.set(k,v);return this;},setDisplaySize(w,h){this.width=w;this.height=h;this.scaleX=w/400;this.scaleY=h/500;return this;},setOrigin(x,y){this.originX=x;this.originY=y;return this;},setFlipX(v){this.flipX=v;return this;},setPosition(x,y){this.x=x;this.y=y;return this;},setVisible(v){this.visible=v;return this;}};
 let loaded=false;const scene={textures:{exists:()=>loaded,get:()=>({getSourceImage:()=>({width:400,height:500})})}};
 context.apply(scene,sprite,{id:'gandalf'});assert.equal(sprite.visible,false);assert.equal(data.has('bodyProfile'),false);
 loaded=true;context.apply(scene,sprite,{id:'gandalf'});assert.equal(sprite.visible,true);assert.equal(sprite.originX,context.profiles.gandalf[3]);assert.equal(sprite.x,0);assert.equal(sprite.y,0);
 context.apply(scene,sprite,{id:'gandalf_white_mounted'});assert.equal(data.get('bodyProfile'),'gandalf_white_mounted');assert.equal(sprite.originX,context.profiles.gandalf_white_mounted[3]);
 assert.equal(data.get('baseSX'),sprite.scaleX);assert.equal(data.get('cxy').x,0);assert.equal(data.get('cxy').y,0);
});
test('newer main base rendering is preserved and never used to normalize body scale',()=>{
 assert(source.includes("setName('base')"));assert(!source.includes('__figCenterPx'));
});

test('review is tied to the actual production raster, never stale source copies',()=>{
 const crypto=require('node:crypto');
 for(const u of audit.units){
  const p='assets/mesbg/'+u.file;
  assert.equal(crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex'),u.sourceSHA256,u.id+' changed art: remeasure anatomy');
  assert.match(u.visualReview.date,/^2026-10-(13|14|19)$/);
  assert.equal(u.visualReview.source,'assets/mesbg/'+u.file);
  assert.equal(u.referenceAxis,'height');
 }
});
test('regressions: empty padding, torso-only foot profiles, and Nazgul class',()=>{
 for(const id of ['earendil','feanor']) assert(context.profiles[id][2]-context.profiles[id][1]>.7,id);
 for(const id of ['hobbit_bounder','hobbit_militia']) assert(context.profiles[id][1]>.5,id);
 for(const id of ['witchking_foot','khamul','nazgul_sword','dark_marshal']) assert.equal(context.profiles[id][5],98,id);
 for(const id of ['witchking_mounted','khamul_mounted','nazgul_mounted']) assert.equal(context.profiles[id][5],50,id);
});


test('fixed painted facing: no directional mirroring or alpha-derived facing remains',()=>{
 assert(!source.includes('function artDir('));assert(!source.includes('faceDir'));
 assert(!source.includes('1-_ox'));assert(!source.includes('turnK'));
 assert(source.includes('.setFlipX(false)'));
 const directions=[-1,1];for(const a of audit.units)for(const direction of directions){
  const body=context.layout({id:a.id,angle:direction*90},{width:a.sourceWidth,height:a.sourceHeight});
  assert.equal(body.originX,a.centerX);assert.equal(body.originY,a.centerY);
 }
});
test('every centre records a visually reviewed body rule, separate from size landmarks',()=>{
 for(const a of audit.units){
  assert.match(a.centerReview.date,/^2026-10-(14|19)$/,a.id);
  const expected=['fellbeast','great-beast','mumak'].includes(a.bodyClass)?'creature-body':a.reference==='rider'?'rider-and-mount':'body';
  assert.equal(a.centerReview.basis,expected,a.id);
  assert.equal(a.centerReview.source,'assets/mesbg/'+a.file);
 }
});

test('stature calibration keeps flags, half-body detections and creature species from corrupting scale',()=>{
 const byId=Object.fromEntries(audit.units.map(u=>[u.id,u]));
 for(const id of ['radagast','gorulf','orc_swordshield','dwarf_banner']){
  const a=byId[id],p=a.statureCalibration.reviewedReference;
  assert.equal(a.statureCalibration.applied,'reviewed-landmarks',id);
  assert.equal(a.top,p.top,id);assert.equal(a.bottom,p.bottom,id);
 }
 for(const id of ['gwaihir','thorondor','watcher_in_the_water','rhosgobel_rabbit','nazgul_fellbeast']){
  const a=byId[id],p=a.statureCalibration.reviewedReference;
  assert.equal(a.reference,p.reference,id);assert.equal(a.worldReferenceSize,p.worldReferenceSize,id);
  assert.equal(a.top,p.top,id);assert.equal(a.bottom,p.bottom,id);
 }
});

test('calibrator dry run is idempotent and cannot write or push implicitly',()=>{
 const crypto=require('node:crypto'),{runCalibration,calibrateUnit}=require('../tools/calibrate-unit-stature.cjs');
 const hash=path=>crypto.createHash('sha256').update(fs.readFileSync(path)).digest('hex');
 const paths=['src/game.js','index.html','docs/unit-art-audit.json'];const before=paths.map(hash);
 assert.deepEqual(runCalibration(process.cwd()),audit.units);
 assert.deepEqual(paths.map(hash),before);
 const a=audit.units.find(u=>u.id==='gandalf');
 assert.throws(()=>calibrateUnit({...a,sourceSHA256:'stale'},audit.targets,audit.measurementPolicy.riderTargets,fs.readFileSync('assets/mesbg/'+a.file)),/Changed source requires anatomical review/);
});

