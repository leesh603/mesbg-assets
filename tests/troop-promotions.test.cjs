const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs');
const create=require('./campaign-harness.cjs');
const data=JSON.parse(fs.readFileSync('data/troop-promotions.json'));
function camp(){const h=create(),q=h.q;q.start('ai');q.units=[];q.events=[];q.gold=10000;q.terrain=[];q.wave=12;q.phase='reward';q.campStep='shop';q.relics.darkpact=1;q.relics.silmaril=1;q.horses=30;q.troopMounts={goat:30,warg:30,camel:30,chariot:30};return h;}
function ready(q,id){const u=q.spawn(id,'good',{x:1000,y:600});u.xp=200;u.battlesParticipated=15;return u;}
test('every edge exists, remains in its kingdom/race and cannot promote into any hero or monster',()=>{
 const h=camp();for(const e of data.edges){assert.ok(h.UnitCatalog[e.from],e.from);for(const id of e.to){assert.ok(h.UnitCatalog[id],id);assert.equal(h.run('isCareerTroop('+JSON.stringify(id)+')'),true,id);const group=Object.entries(data.groups).find(([,ids])=>ids.includes(e.from))?.[0],target=Object.entries(data.groups).find(([,ids])=>ids.includes(id))?.[0];assert.equal(group,target,e.from+' -> '+id);assert.notEqual(e.from,id);}}
 for(const id of ['aragorn','gandalf','sharku','ingold','huan','cave_troll','witchking_mounted'])assert.equal(h.run('isCareerTroop('+JSON.stringify(id)+')'),false,id);
});
test('all configured paths execute with real profile IDs and fixed entry costs',()=>{
 for(const e of data.edges)for(const id of e.to){const h=camp(),q=h.q;q.spawn('grimbold','good',{x:2000,y:1000});q.spawn('erkenbrand','good',{x:2000,y:300});const u=ready(q,e.from),points=u.entryPoints;assert.equal(q.promoteTroop(u.uid,id),true,e.from+' -> '+id+' '+q.promotionError);assert.equal(u.id,id);assert.equal(u.entryPoints,points);assert.equal(u.currentTroopId,id);assert.equal(u.points,points);assert.equal(u.radius,h.UnitCatalog[id].meta.baseMm*76/25/2);assert.equal(u.baseStats.fight,h.zt[id].fight);assert.equal(u.baseStats.shootRange,h.zt[id].shootRange);}
});
test('troop identity, equipment, permanent gains, kills, injury and enhancement history survive',()=>{
 const {q,zt}=camp(),u=ready(q,'mt_swordshield'),uid=u.uid;u.kills=37;u.equipment=['shield'];u.enhancementHistory=[{kind:'training',stat:'strength',n:1}];u.baseStats.strength++;u.injury='leg';u.injuryBackup={move:u.baseStats.move};u.baseStats.move=Math.round(u.baseStats.move*.75);const before=q.rosterPoints();
 assert.equal(q.promoteTroop(uid,'osgiliath_veteran'),true);assert.equal(q.promoteTroop(uid,'gondor_knight'),true);assert.equal(u.uid,uid);assert.equal(u.kills,37);assert.equal(u.xp,200);assert.deepEqual(Array.from(u.equipment),['shield']);assert.equal(u.enhancementHistory[0].stat,'strength');assert.equal(u.injury,'leg');assert.equal(u.injuryBackup.move,zt.gondor_knight.move);assert.equal(u.baseStats.move,Math.round(zt.gondor_knight.move*.75));assert.equal(u.baseStats.strength,zt.gondor_knight.strength+1);assert.equal(q.rosterPoints(),before);assert.equal(u.promotionHistory.length,2);
});
test('direct elite recruitment pays the normal profile cost, unlike a trained soldier',()=>{const{q}=camp(),low=ready(q,'mt_swordshield');q.promoteTroop(low.uid,'osgiliath_veteran');q.promoteTroop(low.uid,'mt_fountain_guard');const direct=ready(q,'mt_fountain_guard');assert.equal(low.entryPoints,9);assert.equal(direct.entryPoints,q.pointCost('mt_fountain_guard'));assert.equal(q.rosterPoints(),9+direct.entryPoints);});
test('experience and participation requirements cannot be skipped; forged targets fail atomically',()=>{
 const{q}=camp(),u=ready(q,'mt_swordshield');u.xp=23;const gold=q.gold;assert.equal(q.promoteTroop(u.uid,'osgiliath_veteran'),false);u.xp=24;u.battlesParticipated=2;assert.equal(q.promoteTroop(u.uid,'osgiliath_veteran'),false);u.battlesParticipated=3;assert.equal(q.promoteTroop(u.uid,'aragorn'),false);q.phase='move';assert.equal(q.promoteTroop(u.uid,'osgiliath_veteran'),false);assert.equal(q.gold,gold);assert.equal(u.id,'mt_swordshield');
});
test('horse/goat/warg acquisition and conversion consume resources only on success',()=>{
 for(const [from,to,kind]of [['osgiliath_veteran','gondor_knight','horse'],['ironhills_spearshield','goat_rider','goat'],['orc_spearman','warg_rider','warg']]){
 const{q}=camp(),u=ready(q,from);q.horses=0;q.troopMounts[kind]=0;const gold=q.gold;assert.equal(q.promoteTroop(u.uid,to),false);assert.equal(q.gold,gold);assert.equal(q.buyTroopMount(kind),true);assert.equal(q.promoteTroop(u.uid,to),true);assert.ok(u.traits.includes('mounted'));assert.equal(kind==='horse'?q.horses:q.troopMounts[kind],0);}
});
test('new mounted troops dismount and remount without losing points or career',()=>{
 for(const id of ['arnor_knight','rohan_redshield','goat_rider','dol_amroth_knight']){const{q}=camp(),u=ready(q,id),points=u.entryPoints;u.kills=22;u.promotionHistory=[{from:data.mounts[id].foot,to:id,tier:2}];q.dismount(u);assert.equal(u.id,data.mounts[id].foot);assert.equal(u.entryPoints,points);assert.equal(u.kills,22);assert.equal(u.traits.includes('mounted'),false);assert.equal(q.promoteTroop(u.uid,id),true);assert.equal(u.entryPoints,points);assert.equal(u.promotionHistory.length,1);}
});
test('save/resume preserves promotion, deferral, mount inventory and validates entry points',()=>{
 const h=camp(),q=h.q,u=ready(q,'mt_swordshield');q.promoteTroop(u.uid,'osgiliath_veteran');q.promotionDeferredWave=q.wave;q.troopMounts.goat=2;q.save();u.id='mt_swordshield';u.xp=0;assert.equal(q.resume(),true);const v=q.unit(u.uid);assert.equal(v.id,'osgiliath_veteran');assert.equal(v.xp,200);assert.equal(v.entryPoints,9);assert.equal(v.promotionHistory.length,1);assert.equal(q.promotionDeferredWave,q.wave);assert.equal(q.troopMounts.goat,2);
 const s=q._saveState();s.units[0].entryPoints=-5;h.store.set('mesbg-endless-save',JSON.stringify(s));assert.equal(q.resume(),true);assert.equal(q.units[0].entryPoints,9);
});
test('legacy ranks migrate once without duplicating rank stats or removing event gains',()=>{
 const h=camp(),q=h.q,u=ready(q,'mt_swordshield');delete u.careerVersion;delete u.entryPoints;delete u.entryUnitId;u.veteranXP=15;u.traits.push('veteran','champion');u.baseStats.fight++;u.baseStats.defence++;u.baseStats.courage+=2;u.baseStats.attacks++;u.baseStats.strength++;q.save();assert.equal(q.resume(),true);const v=q.unit(u.uid);assert.equal(v.baseStats.fight,h.zt.mt_swordshield.fight);assert.equal(v.baseStats.attacks,1);assert.equal(v.baseStats.strength,h.zt.mt_swordshield.strength+1);assert.equal(v.xp,45);assert.equal(v.entryPoints,9);q.save();q.resume();assert.equal(q.unit(u.uid).baseStats.fight,h.zt.mt_swordshield.fight);
});
test('darkpact and named legacy/era gates remain required',()=>{
 const{q}=camp(),u=ready(q,'orc_sword');delete q.relics.darkpact;assert.equal(q.promoteTroop(u.uid,'morannon_swordshield'),false);q.relics.darkpact=1;assert.equal(q.promoteTroop(u.uid,'morannon_swordshield'),true);const r=ready(q,'rohan_rider');assert.equal(q.promoteTroop(r.uid,'rohan_redshield'),false);q.spawn('erkenbrand','good',{x:2000,y:800});assert.equal(q.promoteTroop(r.uid,'rohan_redshield'),true);delete q.relics.silmaril;assert.match(q.troopGateReason('numenorean_knight'),/실마릴/);
});
test('ordinary kill XP is capped per battle; heroes retain their 100-kill hidden evolution',()=>{
 const{q}=camp(),u=ready(q,'mt_swordshield');u.xp=0;for(let n=0;n<12;n++){const foe=q.spawn('orc_sword','evil',{x:2000,y:1000});q._trkKill(u,foe);}assert.equal(u.xp,18);assert.equal(u.baseStats.fight,4);const a=q.spawn('aragorn','good',{x:500,y:500});a.kills=99;assert.equal(q.evolveHero(a),false);a.kills=100;assert.equal(q.evolveHero(a),true);assert.equal(a.id,'aragorn_blackgate');
});
test('new archers fire, melee infantry cannot shoot, and crossbows cannot fire after moving',()=>{
 const{q}=camp();q.phase='shoot';q.side=q.priority='good';const u=ready(q,'ironhills_crossbow'),target=q.spawn('orc_sword','evil',{x:1500,y:600});u.acted=false;u.moved=false;assert.ok(q.validTargets(u).includes(target));u.moved=true;assert.equal(q.validTargets(u).length,0);assert.equal(q.shoot(u.uid,target.uid),false);const melee=ready(q,'dol_amroth_knight_foot');assert.equal(melee.stats.shootRange,0);for(const id of ['citadel_guard_bow','galadhrim_bow','mirkwood_ranger','arnor_ranger','orc_elite_tracker']){const a=ready(q,id);assert.ok(a.stats.shootRange>0);assert.ok(a.stats.shootValue>=2&&a.stats.shootValue<=5);}
});
test('all new PNGs have true alpha, sensible dimensions and measured body profiles',()=>{
 const defs=JSON.parse(fs.readFileSync('data/troop-new-units.json'));for(const d of defs){const p='assets/mesbg/'+d.meta.file,b=fs.readFileSync(p);assert.equal(b.readUInt32BE(16)<=384,true,p);assert.equal(b.readUInt32BE(20)<=384,true,p);assert.equal(b[25],6,p);assert.ok(d.artAudit.method.includes('anatomical'));assert.ok(d.artProfile[2]>d.artProfile[1]);assert.ok(fs.existsSync(d.artAudit.sourcePath||'art-src/troop-promotions/'+d.id+'.png'));}
});
test('deployed troops earn participation and survival once per actual wave',()=>{
 const{q}=camp();q.units=[];q.wave=0;q.phase='preparation';const u=ready(q,'mt_swordshield');u.xp=0;u.battlesParticipated=0;q.prepareStage();q.startWave();assert.equal(u.careerParticipationWave,1);assert.equal(u.xp,2);assert.equal(u.battlesParticipated,1);q.finishWave();assert.equal(u.xp,6);q.finishWave();assert.equal(u.xp,6);q.save();q.resume();assert.equal(q.unit(u.uid).xp,6);
});
test('stationary elite archers use their live shooting rule and bodyguards need a living hero',()=>{
 const h=camp(),q=h.q,u=ready(q,'galadhrim_elite_bow'),t=q.spawn('orc_sword','evil',{x:1450,y:600});u.moved=false;
 // Dice 1 misses, 6 rerolls the hit, 6 wounds: exercises the existing shot solver.
 h.run('this.careerAttacker=q.unit('+JSON.stringify(u.uid)+');this.careerTarget=q.unit('+JSON.stringify(t.uid)+');');
 const r=h.run('(()=>{const rolls=[1/6,5/6,5/6];return Xe(careerAttacker,careerTarget,[],()=>rolls.shift()??5/6,q.alive());})()');assert.equal(r.strikeResults[0].rerolled,true);assert.equal(q.careerBodyguard(u),false);q.spawn('aragorn','good',{x:800,y:600});assert.equal(q.careerBodyguard(u),true);
});
test('a later version of the cost table does not reprice an existing trained soldier',()=>{
 const h=camp(),q=h.q,u=ready(q,'mt_swordshield');assert.equal(u.entryPoints,9);assert.equal(u.entryPointVersion,1);h.run('WARBAND_POINTS.version=2;UnitCatalog.mt_swordshield.points=11;');assert.equal(q.rosterPoints(),9);q.save();assert.equal(q.resume(),true);assert.equal(q.unit(u.uid).entryPoints,9);assert.equal(q.rosterPoints(),9);
});


