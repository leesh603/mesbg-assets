const effective=require('./art-review-lineage.cjs');
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const create=require('./campaign-harness.cjs');
function fresh(cleared=0){const h=create(),q=h.q;q.start('ai');q.units=[];q.terrain=[];q.relics={};q.cleared=cleared;q.wave=cleared;q.phase='preparation';q.gold=1000;return h;}
function choose(h,id,index){h.q.phase='reward';h.q.campStep='event';h.q.campEvent=h.LWB_EVENTS.find(e=>e.id===id);return h.q.chooseEvent(index);}
test('fresh arrivals and the entire quantity draft receive full faction/relic maxima; refresh never heals old wounds',()=>{
 const h=fresh(),q=h.q;for(const id of ['elrond','glorfindel_foot','elf_swordshield'])q.spawn(id,'good');
 const elf=q.spawn('elf_spear','good'),arwen=q.spawn('arwen','good');assert.equal(elf.stats.wounds,2);assert.equal(elf.currentWounds,2);assert.equal(arwen.currentWounds,arwen.stats.wounds);
 arwen.currentWounds=1;q.refreshUnit(arwen);assert.equal(arwen.currentWounds,1);
 q.phase='reward';q.campStep='recruit';q.initialDraft=false;q.pointLimit=1000;q.recruitOffers=[{id:'elf_swordshield',bought:false},{id:'elf_spear',bought:false}];q.recruitDraft=[0,1];q.recruitQuantities={0:2,1:2};const before=new Set(q.units.map(u=>u.uid));assert.equal(q.commitRecruits(),true);
 for(const u of q.permanent().filter(u=>!before.has(u.uid)))assert.equal(u.currentWounds,u.stats.wounds);
 assert.equal(arwen.currentWounds,1);
});
test('late soldiers get bounded field drills without invented XP, service or free promotions',()=>{
 for(const [cleared,rank]of [[0,0],[7,0],[8,1],[23,1],[24,2],[69,2]]){
  const {q}=fresh(cleared),u=q.spawn('mt_swordshield','good');assert.equal(q.troopTrainingRank(u),rank);assert.equal(u.xp,0);assert.equal(u.battlesParticipated,0);assert(q.troopPromotionOptions(u).every(o=>q.promotionReason(u,o)));
  if(rank)assert(u.traits.includes('veteran'));if(rank===2){assert.equal(u.stats.fight,u.baseStats.fight+1);assert.equal(u.stats.wounds,1);}
 }
});
test('earned veterancy changes live combat, survives promotion, and adds a wound only once',()=>{
 const h=fresh(),q=h.q,u=q.spawn('mt_swordshield','good');u.xp=66;u.battlesParticipated=8;q.refreshUnit(u);
 assert.equal(q.troopTrainingRank(u),3);assert.equal(u.stats.attacks,2);assert.equal(u.stats.wounds,2);assert.equal(u.currentWounds,2);const pts=u.entryPoints;
 u.currentWounds=1;for(let i=0;i<10;i++)q.refreshUnit(u);assert.equal(u.currentWounds,1);
 q.phase='reward';assert.equal(q.promoteTroop(u.uid,'osgiliath_veteran'),true);assert.equal(u.entryPoints,pts);assert.equal(u.currentWounds,1);assert.equal(q.troopTrainingRank(u),3);assert.equal(u.stats.attacks,2);
});
test('all nonhero soldier roles can grow; Heroes, monsters and temporary support cannot gain troop ranks',()=>{
 const h=fresh(24),q=h.q;
 for(const id of ['mt_spear','mt_bowman','gondor_knight','ironhills_crossbow','orc_sword']){const u=q.spawn(id,'good');u.xp=66;u.battlesParticipated=8;q.refreshUnit(u);assert.equal(q.troopTrainingRank(u),3,id);}
 for(const id of ['elrond','gimli','cave_troll']){const u=q.spawn(id,'good');u.xp=999;u.battlesParticipated=99;q.refreshUnit(u);assert.equal(q.troopTrainingRank(u),0);}
 const t=q.spawn('mt_swordshield','good');t.temporary=true;t.xp=99;t.battlesParticipated=99;q.refreshUnit(t);assert.equal(q.troopTrainingRank(t),0);assert(!t._growthVeteran);
});
test('veteran archers reroll failed wound dice only when stationary and still respect defensive dice',()=>{
 const h=fresh(),q=h.q,a=q.spawn('mt_bowman','good',{x:1000,y:500}),b=q.spawn('uruk_swordshield','evil',{x:1300,y:500});a.xp=66;a.battlesParticipated=8;q.refreshUnit(a);
 let rolls=[.99,0,.99];let r=h.run('Xe')(a,b,[],()=>rolls.shift()??.99,q.units);assert.equal(r.strikeResults[0].woundRerolled,true);assert.equal(r.wounds.length,1);
 a.moved=true;a.movementSpent=45;rolls=[.99,0,.99];r=h.run('Xe')(a,b,[],()=>rolls.shift()??.99,q.units);assert.equal(r.wounds.length,0);assert.equal(r.strikeResults[0].woundRerolled,false);
 a.moved=false;a.movementSpent=0;b.heroicDef=true;rolls=[.99,0,.7];r=h.run('Xe')(a,b,[],()=>rolls.shift()??.7,q.units);assert.equal(r.strikeResults[0].needed,6);assert.equal(r.wounds.length,0);
});
test('shared camp benefits apply to later recruits, cap at two and persist through saves without compounding',()=>{
 const h=fresh(),q=h.q,u=q.spawn('mt_swordshield','good',{x:1000,y:500}),base=u.baseStats.courage;
 for(let i=0;i<3;i++)assert.equal(choose(h,'ring',1),true);
 assert.equal(q.armyTrainingBonus('courage'),2);assert.equal(u.baseStats.courage,base);q.refreshUnit(u);assert.equal(u.stats.courage,base+2);
 const later=q.spawn('mt_swordshield','good',{x:1250,y:500});assert.equal(later.stats.courage,u.stats.courage);assert(q.save());assert(q.resume());for(const v of q.permanent()){q.refreshUnit(v);assert.equal(v.stats.courage,base+2);}
 q.start('ai');assert.equal(q.armyTrainingBonus('courage'),0);
});
test('personal early choices cannot stack combat stats endlessly and late Heroes inherit bounded basic training',()=>{
 const h=fresh(),q=h.q,u=q.spawn('boromir','good');q.rng=()=>0;
 for(let i=0;i<4;i++)assert.equal(choose(h,'numenor',0),true);
 assert.equal(u.baseStats.attacks,h.zt.boromir.attacks+1);assert.equal(u.eventTraining.attacks,1);
 u.baseStats.fight+=1;u.eventTraining.fight=1;q.cleared=24;const late=q.spawn('elrond','good');
 assert.equal(late.baseStats.attacks,h.zt.elrond.attacks+1);assert.equal(late.baseStats.fight,h.zt.elrond.fight+1);assert.equal(late.eventTraining.attacks,1);assert.equal(late.currentWounds,late.stats.wounds);
 const base=late.baseStats.attacks;q.refreshUnit(late);assert.equal(late.baseStats.attacks,base);
});
test('all relic acquisition paths obey the early power floor; existing owned artifacts stay usable',()=>{
 const h=fresh(),q=h.q;
 for(const wave of [0,1,3,4,5,9,10,69]){q.wave=wave;for(let i=0;i<1000;i++){q.rollRelics();for(const id of q.relicChoices)assert.equal(q.relicProgressReason(id),'');const random=q.randomAvailableRelic();assert.equal(q.relicProgressReason(random.id),'');}}
 q.wave=1;q.phase='reward';q.campStep='relic';q.chosenRelic='';q.relicChoices=['narya'];assert.equal(q.chooseRelic('narya'),false);assert.equal(q.rank('narya'),0);
 q.relics.narya=1;q.spawn('mt_swordshield','good',{x:1000,y:500});assert.equal(q.rank('narya'),1);assert(q.save());assert(q.resume());assert.equal(q.rank('narya'),1);assert(q.relicChoices.every(id=>!q.relicProgressReason(id)));
});
test('existing careers migrate into earned ranks and save/import/retry neither heal nor duplicate training',()=>{
 const h=fresh(),q=h.q,u=q.spawn('mt_swordshield','good',{x:1000,y:500});u.xp=66;u.battlesParticipated=8;q.refreshUnit(u);u.currentWounds=1;q.armyTraining={courage:1};q.refreshUnit(u);const stats=JSON.stringify(u.stats);q.save();assert.equal(q.resume(),true);assert.equal(q.unit(u.uid).currentWounds,1);assert.equal(JSON.stringify(q.unit(u.uid).stats),stats);
 assert.equal(q.importSave(q._saveState()),true);assert.equal(q.unit(u.uid).currentWounds,1);assert.equal(q.armyTrainingBonus('courage'),1);
 q._retrySnapshot={wave:q.wave,cleared:q.cleared,gold:200,relics:{},fallen:[],units:structuredClone(q.units),devices:[],runState:structuredClone(q._saveState())};q.phase='result';assert.equal(q.retryStage(),true);assert.equal(q.unit(u.uid).currentWounds,1);assert.equal(q.unit(u.uid).stats.attacks,2);
});
test('all three Osgiliath production, gallery and source copies match the reviewed transparent native rasters',()=>{
 const rows=JSON.parse(fs.readFileSync('review/osgiliath-growth-20261019/manifest.json')).units;assert.equal(rows.length,3);
 for(const original of rows){const u=effective(original);const b=fs.readFileSync(u.files.production);assert.equal(b[25],6);assert(Math.max(b.readUInt32BE(16),b.readUInt32BE(20))<=384);assert.equal(crypto.createHash('sha256').update(b).digest('hex'),u.sourceSHA256);for(const key of ['root','source'])assert.deepEqual(fs.readFileSync(u.files[key]),b);assert(fs.readFileSync(u.files.thumbnail).subarray(0,4).equals(Buffer.from('RIFF')));}
});

