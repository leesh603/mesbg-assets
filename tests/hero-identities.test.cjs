const assert=require('node:assert/strict'),fs=require('node:fs');
const h=require('./campaign-harness.cjs')(),{q,CX,UnitCatalog}=h;
h.run(`
function heroTestState(v,filter){
 if(/wounded/.test(filter)&&v.stats.wounds>1)v.currentWounds=v.stats.wounds-1;
 if(/hurt/.test(filter))v.currentWounds=Math.max(1,Math.floor(v.stats.wounds/2));
 if(/missingWill/.test(filter))v.resources.will=Math.max(0,v.stats.will-1);
 if(/missingMight/.test(filter))v.resources.might=Math.max(0,v.stats.might-1);
 if(/missingFate/.test(filter))v.resources.fate=Math.max(0,v.stats.fate-1);
 if(/fear/.test(filter))v.feared=true;if(/prone/.test(filter))v.prone=true;
 if(/moved/.test(filter))v.moved=true;if(/charged/.test(filter)){v.charged=true;v.moved=true;}
}
function heroTestPartner(u,side,filter,pos){
 for(const d of Object.values(UnitCatalog)){
  if(d.id===u.id||d.meta.side==='terrain')continue;
  const v=q.spawn(d.id,side,pos);heroTestState(v,filter);
  if(heroMatch(q,u,v,filter.replaceAll('engaged','any').replaceAll('crowded','any')))return v;q.units.pop();
 }
 throw Error('No real profile for '+u.id+' / '+filter);
}
function heroFixture(id,side){
 q.start('ai');q.units=[];q.terrain=[];q.relics={};q.fallen=[];q.phase='move';q.side=side;q.wave=2;q.round=2;q.rng=()=>.99;
 const u=q.spawn(id,side,{x:1000,y:700}),d=heroDesigns.get(warbandFamily(u));
 if(!d)return u;
 q.phase=d.phase.split('|')[0];u.acted=false;u.skillRound=false;
 if(d.when)for(const condition of d.when.split(';')){
  if(condition.startsWith('near:'))heroTestPartner(u,side,condition.slice(5),{x:1000,y:450});
  else heroTestState(u,condition);
 }
 const [kind,filter='any']=d.select.split(':');
 let target;
 if(kind==='self')heroTestState(u,filter);
 else if(kind==='ally')target=heroTestPartner(u,side,filter,{x:1000,y:450});
 else {target=heroTestPartner(u,Ht(side),filter,{x:1250,y:700});if(kind==='contact')target.x=u.x+u.radius+target.radius;}
 if(d.when?.includes('engaged')||d.when?.includes('crowded')){
  const a=q.spawn('orc_sword',Ht(side),{x:800,y:700});a.x=u.x-u.radius-a.radius;
  if(d.when.includes('crowded')){const a=q.spawn('orc_sword',Ht(side),{x:1000,y:900});a.y=u.y+u.radius+a.radius;}
 }
 if(target&&filter.includes('engaged')&&!q.engaged(target)){const a=q.spawn('orc_sword',Ht(target.side),{x:target.x-100,y:target.y});a.x=target.x-target.radius-a.radius;}
 if(target&&filter.includes('crowded')){for(const sign of [-1,1]){const a=q.spawn('orc_sword',Ht(target.side),{x:target.x+sign*100,y:target.y});a.x=target.x+sign*(target.radius+a.radius);}}
 if(d.when?.includes('near:')&&d.when.includes('engaged')){const v=q.alive(side).find(v=>v!==u);if(v&&!q.engaged(v)){const a=q.spawn('orc_sword',Ht(side),{x:v.x-100,y:v.y});a.x=v.x-v.radius-a.radius;}}
 if(!q.alive(Ht(side)).length)q.spawn('orc_sword',Ht(side),{x:1300,y:700});
 q.side=side;q.phase=d.phase.split('|')[0];q.fightQueue=[[...q.alive().map(v=>v.uid)]];return u;
}
`);
const profiles=h.run('heroProfiles.map(p=>({id:p.id,family:p.uniqueKey||p.id}))');
assert.equal(profiles.length,293);
assert.equal(new Set(profiles.map(p=>p.family)).size,217);
const failures=[],tested=[];
for(const p of profiles){
 const d=h.run(`heroDesigns.get(${JSON.stringify(p.family)})`);
 if(!d)continue; // retained signatures have dedicated regression cases below and in integrated-rework.test.cjs
 for(const side of ['good','evil']){
  try{
   const u=h.run(`heroFixture(${JSON.stringify(p.id)},${JSON.stringify(side)})`);
   const reason=q.skillReason(u);assert.equal(reason,'',p.id+' cannot activate: '+reason);
   const snapshot=()=>JSON.stringify(q.units.map(v=>{const copy=structuredClone(v);delete copy.skillRound;if(v===u)copy.resources[d.resource]=0;return copy;}));
   const before=snapshot(),resource=u.resources[d.resource];
   assert.equal(q.skill(u.uid),true);assert.ok(u.skillRound);assert.notEqual(snapshot(),before,'ability changes only cost/used flag');
   assert.equal(q.skill(u.uid),false,'repeat '+p.id);assert.ok(Number.isFinite(u.resources[d.resource]));
   assert.ok(u.resources[d.resource]>=0);
   tested.push(p.id+':'+side);
   // A rejected activation does not consume anything or set the per-round marker.
   u.skillRound=false;q.phase='reward';const saved=JSON.stringify(q.units);
   assert.equal(q.skill(u.uid),false);assert.equal(JSON.stringify(q.units),saved);
   q.phase=d.phase.split('|')[0];u.alive=false;assert.equal(q.skill(u.uid),false);u.alive=true;
   if(d.cost){u.resources[d.resource]=0;const poor=JSON.stringify(q.units);assert.equal(q.skill(u.uid),false);assert.equal(JSON.stringify(q.units),poor);}
  }catch(e){failures.push(p.id+'/'+side+': '+e.message);}
 }
}
if(failures.length){console.error(failures.join('\n'));process.exitCode=1;}else console.log('PASS: '+tested.length+' new-profile activations on both sides; phase, death, repeat and cost guards');
fs.mkdirSync('review-output',{recursive:true});fs.writeFileSync('review-output/hero-coverage.json',JSON.stringify({profiles:profiles.length,families:217,executions:tested.length,failures},null,2));
// Retained signatures: every variant, both sides, with a real valid use.
let retained=0;
for(const p of profiles.filter(p=>h.run(`!!retainedHeroRoles[${JSON.stringify(p.family)}]`))){
 for(const side of ['good','evil']){
  q.start('ai');q.units=[];q.terrain=[];q.phase='move';q.side=side;
  const u=q.spawn(p.id,side,{x:1000,y:700});
  const ally=q.spawn('theoden',side,{x:1000,y:450});ally.resources.might=0;ally.currentWounds=1;
  q.spawn('frodo',side,{x:850,y:700});q.spawn('ithilien_ranger',side,{x:850,y:550});
  const foe=q.spawn('orc_sword',side==='good'?'evil':'good',{x:1280,y:700});
  if(['legolas','haldir','faramir'].includes(p.family))q.phase='shoot';
  if(p.family==='gimli'){foe.x=u.x+u.radius+foe.radius;q.phase='fight';}
  if(p.family==='aragorn')u.resources.might=1;
  if(p.family==='eomer')u.charged=true;
  assert.equal(q.skillReason(u),'',p.id);assert.equal(q.skill(u.uid),true,p.id);retained++;
 }
}
assert.equal(tested.length+retained,586);
console.log('PASS: all 293 profiles execute on both sides ('+(tested.length+retained)+' total)');
// Distinct identities must differ in behaviour, not merely their title or numeric range.
const duplicates=h.run(`(()=>{const groups=new Map();for(const d of heroDesigns.values()){const key=JSON.stringify([d.phase,d.select,d.actions,d.when||'',d.limit,d.sort||'']);groups.set(key,[...(groups.get(key)||[]),d.id]);}return [...groups.values()].filter(g=>g.length>1)})()`);
assert.equal(duplicates.length,0,JSON.stringify(duplicates));
// Targeted modifiers run through the actual combat resolver and respect defensive stances.
q.start('ai');q.units=[];q.terrain=[];q.phase='fight';q.side='evil';
const azog=q.spawn('azog','evil',{x:1000,y:700}),boromir=q.spawn('boromir','good',{x:1100,y:700});boromir.x=azog.x+azog.radius+boromir.radius;
boromir.stats.defence=10;boromir.resources.fate=0;boromir.currentWounds=30;azog.stats.attacks=1;
assert.equal(q.skill(azog.uid),true);
let fight=h.Ue([azog,boromir],q.alive(),[],'evil',()=>.5);
let strike=fight.strikeResults.find(s=>s.attacker===azog.uid&&s.target===boromir.uid);assert.ok(strike);assert.equal(strike.needed,3);assert.ok(strike.wound);
boromir.heroicDef=true;fight=h.Ue([azog,boromir],q.alive(),[],'evil',()=>.5);strike=fight.strikeResults.find(s=>s.attacker===azog.uid&&s.target===boromir.uid);assert.equal(strike.needed,6);assert.equal(strike.wound,false);
console.log('PASS: Azog hero hunting changes actual wound dice; heroic defence remains 6+');
// Personal kill milestones, prevention, mounted variants, equipment and save/load.
const paths=[['aragorn','aragorn_blackgate'],['aragorn_mounted','aragorn_blackgate_mounted'],['gandalf','gandalf_white'],['gandalf_mounted','gandalf_white_mounted'],['pippin','pippin_citadel']];
for(const [from,to]of paths){
 q.start('ai');q.units=[];q.terrain=[];q.phase='fight';q.side='good';
 const u=q.spawn(from,'good',{x:1000,y:700});u.kills=99;u.currentWounds=1;u.resources.might=0;u.equipment=['ringil'];u.baseStats.defence+=2;q.refreshUnit(u);
 const baseDef=u.baseStats.defence,delta=h.zt[to].defence-h.zt[from].defence,uid=u.uid;
 assert.equal(q.evolveHero(u),false);assert.equal(u.id,from);
 const target=q.spawn('orc_sword','evil',{x:1200,y:700});target.currentWounds=1;target.resources.fate=1;q.rng=()=>.99;
 const hit=()=>({kind:'skill',strikeResults:[{attacker:uid,target:target.uid,wound:true,killed:true}],pushVectors:[]});
 q.applyCombat(hit());assert.equal(u.kills,99);assert.equal(u.id,from,'Fate prevented kill must not evolve');
 target.resources.fate=0;q.applyCombat(hit());assert.equal(u.kills,100);assert.equal(u.id,to);assert.equal(u.uid,uid);assert.equal(u.currentWounds,1);assert.equal(u.resources.might,0);assert.equal(u.baseStats.defence,baseDef+delta);assert.deepEqual(Array.from(u.equipment),['ringil']);
 assert.equal(u.evolutionHistory.length,1);q.applyCombat(hit());assert.equal(u.kills,100);assert.equal(u.evolutionHistory.length,1);
 q.initialDraft=false;q.phase='reward';q.campStep='ready';q.save();assert.equal(q.resume(),true);const saved=q.unit(uid);assert.equal(saved.id,to);assert.equal(saved.kills,100);assert.equal(saved.currentWounds,1);assert.equal(saved.evolutionHistory.length,1);
}
q.start('ai');q.units=[];const rider=q.spawn('gandalf','good',{x:1000,y:700});q.phase='reward';q.campStep='shop';q.horses=2;
assert.equal(q.assignMount(rider.uid,'gandalf_white_mounted'),false);assert.equal(q.horses,2);
assert.equal(q.assignMount(rider.uid,'gandalf_mounted'),true);assert.equal(rider.id,'gandalf_mounted');
for(let i=0;i<100;i++){q.rollInitialRecruits();assert.ok(q.recruitOffers.every(o=>!UnitCatalog[o.id].evolutionOnly));q.wave=20;q.rollRecruits();assert.ok(q.recruitOffers.every(o=>!UnitCatalog[o.id].evolutionOnly));}
assert.ok(CX.recruits.every(id=>!UnitCatalog[id]?.evolutionOnly));
q.recruitOffers=[{id:'gandalf_white'}];q.recruitDraft=[0];q.campStep='recruit';assert.equal(q.commitRecruits(),false);
console.log('PASS: five 99→100 kill evolution paths, no prevented/corpse credit, preserved state, save/resume and recruitment/mount gates');
// Temporary identity states cannot leak into another round.
q.start('ai');q.units=[];const reset=q.spawn('azog','good',{x:1000,y:700});q.spawn('orc_sword','evil',{x:1400,y:700});reset.heroIntent={targets:['none'],cap:3};reset.heroVeil=true;reset.heroRiposte={strength:5};q.phase='fight';q.beginRound();assert.ok(!reset.heroIntent&&!reset.heroVeil&&!reset.heroRiposte);
fs.writeFileSync('review-output/hero-coverage.json',JSON.stringify({profiles:293,families:217,executions:tested.length+retained,failures,evolutionThreshold:100,evolutionPaths:paths},null,2));
