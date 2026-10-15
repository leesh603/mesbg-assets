const test=require('node:test'),assert=require('node:assert/strict'),create=require('./campaign-harness.cjs');
function camp(){const h=create(),q=h.q;q.start('ai');q.units=[];q.wave=2;q.phase='reward';q.initialDraft=false;q.campStep='event';q.relics={};q.gold=0;const u=q.spawn('aragorn','good',{x:600,y:300});u.currentWounds=2;u.injury='leg';u.injuryBackup={move:u.baseStats.move};q.spawn('mt_swordshield','good',{x:800,y:300});return {...h,u};}
function pick(q,event,i){q.phase='reward';q.campStep='event';q.campEvent=event;q.eventOutcome=null;return q.chooseEvent(i);}
const paidEvents=create().LWB_EVENTS.flatMap(e=>e.options.map((o,i)=>({event:e.id,index:i,cost:o.cost||0}))).filter(o=>o.cost);
test('all paid definitions declare cost: 28 options, no effect can silently clamp a payment',()=>{
 assert.equal(paidEvents.length,28);const h=create();for(const e of h.LWB_EVENTS)for(const o of e.options){assert.doesNotMatch(String(o.fx),/gold\s*=\s*Math.max\(0/);const m=o.sub?.match(/금화\s*[−-](\d+)/);if(m)assert.equal(o.cost,Number(m[1]),e.id);}
});
for(const paid of paidEvents)test('paid '+paid.event+' validates 0 / cost−1 / cost / cost+1, then cannot repeat',()=>{
 for(const balance of [0,paid.cost-1,paid.cost,paid.cost+1]){const h=camp(),q=h.q,event=h.LWB_EVENTS.find(e=>e.id===paid.event);q.gold=balance;q.campEvent=event;
  const before=JSON.stringify({gold:q.gold,relics:q.relics,units:q.units,cp:q.bonusCP});
  assert.equal(q.chooseEvent(paid.index),balance>=paid.cost,paid.event+' '+balance);
  if(balance<paid.cost){assert.equal(JSON.stringify({gold:q.gold,relics:q.relics,units:q.units,cp:q.bonusCP}),before);assert.match(q.eventCostReason(event.options[paid.index]),/부족/);}
  else {assert.equal(q.gold,balance-paid.cost);const after=JSON.stringify(q._saveState());assert.equal(q.chooseEvent(paid.index),false);assert.equal(JSON.stringify(q._saveState()),after);}
 }
});
test('the exact 15-coin boundary keeps 0 / 14 unchanged and deducts 15 / 16 once',()=>{for(const balance of [0,14,15,16]){const h=camp(),q=h.q;q.gold=balance;const courage=h.u.baseStats.courage;assert.equal(pick(q,h.LWB_EVENTS.find(e=>e.id==='refugees'),0),balance>=15);assert.equal(q.gold,balance>=15?balance-15:balance);assert.equal(h.u.baseStats.courage,courage+(balance>=15?1:0));}});
test('effect failure rolls back units, relics, gold, receipt, RNG, camp step and previous save',()=>{
 const h=camp(),q=h.q;q.gold=30;q.save();const stored=h.store.get('mesbg-endless-save'),u=h.u,courage=u.baseStats.courage,rng=q.rng.getState();
 q.campEvent={id:'failure',title:'test',options:[{cost:15,fx:b=>{b.rng();b.gold+=50;b.relics.test=1;u.baseStats.courage=99;throw Error('test');}}]};
 assert.equal(q.chooseEvent(0),false);assert.equal(q.gold,30);assert.equal(u.baseStats.courage,courage);assert.equal(q.unit(u.uid),u);assert.equal(q.relics.test,undefined);assert.equal(q.rewardLedger,null);assert.equal(q.rng.getState(),rng);assert.equal(h.store.get('mesbg-endless-save'),stored);assert.ok(q.campEvent);
});
test('storage failure rolls back a successful event and a shop mount purchase',()=>{
 for(const action of ['event','mount']){const h=camp(),q=h.q;q.gold=100;q.save();const stored=h.store.get('mesbg-endless-save');h.run('localStorage.setItem=()=>{throw Error("quota")};');
  const before=JSON.stringify({gold:q.gold,units:q.units,horses:q.horses});
  if(action==='event')assert.equal(pick(q,h.LWB_EVENTS.find(e=>e.id==='refugees'),0),false);else{q.campStep='shop';assert.equal(q.buyHorse(),false);}
  assert.equal(JSON.stringify({gold:q.gold,units:q.units,horses:q.horses}),before);assert.equal(h.store.get('mesbg-endless-save'),stored);
 }
});
test('all injury/damage events reduce HP, all declared health recovery options never reduce HP',()=>{
 const definitions=create().LWB_EVENTS;let damage=0,healing=0;
 for(const definition of definitions)for(let i=0;i<definition.options.length;i++){
  const op=definition.options[i],code=String(op.fx),isDamage=code.includes('eventDamage'),isHeal=code.includes('currentWounds')&&/회복|완치/.test(op.sub||'');if(!isDamage&&!isHeal)continue;
  const h=camp(),q=h.q;q.units=q.units.filter(u=>u.uid===h.u.uid);delete h.u.injury;q.gold=1000;q.rng=()=>.99;const before=h.u.currentWounds;
  assert.equal(pick(q,h.LWB_EVENTS.find(e=>e.id===definition.id),i),true,definition.id);
  if(isDamage){damage++;assert.equal(h.u.currentWounds,before-1,definition.id);h.u.currentWounds=1;assert.equal(q.eventDamage(h.u,1,true),0);assert.equal(h.u.alive,true);assert.equal(h.u.currentWounds,1);}
  else{healing++;assert.ok(h.u.currentWounds>=before&&h.u.currentWounds<=h.u.stats.wounds,definition.id);}
 }
 assert.ok(damage>=8,damage);assert.ok(healing>=6,healing);console.log(JSON.stringify({damageOptions:damage,healingOptions:healing}));
});
test('lethal environmental damage preserves fallen careers and equipment exactly once',()=>{
 const h=camp(),q=h.q,u=q.units[1];u.equipment=['whetstone'];u.xp=12;u.currentWounds=1;q.phase='reward';const points=q.rosterPoints();assert.equal(q.eventDamage(u,1,false),1);assert.equal(u.alive,false);assert.equal(q.stageDeaths,1);assert.equal(q.fallen.filter(f=>f.uid===u.uid).length,1);assert.equal(q.legacy.filter(x=>x==='whetstone').length,1);assert.equal(q.rosterPoints(),points-u.entryPoints);assert.equal(q.eventDamage(u,1,false),false);
});
test('postbattle injury precedes shield_wall, streak is counted and rewards cannot replay after resume',()=>{
 const h=camp(),q=h.q;const u=h.u;delete u.injury;delete u.injuryBackup;u.currentWounds=1;q.phase='move';q.round=3;q._flawless=2;q.bonusObjective=h.run("BONUS_OBJECTIVES.find(x=>x.id==='shield_wall')");q.bonusObjective2=null;q.finishWave();
 assert.ok(u.injury);assert.equal(q.battleRecord.objectives[0].passed,false);assert.equal(q.rewardBook().entries.some(e=>e.key==='battle:objective:shield_wall'),false);
 assert.equal(q.gold,q.rewardTotal());assert.equal(q.lastGold,q.gold);assert.equal(q.rewardBook().entries.find(e=>e.key==='battle:streak').amount,25);assert.equal(q.gold,126);assert.equal(q.events.find(e=>e.type==='StageCleared').gold,q.lastGold);assert.match(q.events.find(e=>e.type==='WaveEnded').message,/126/);
 const snapshot=()=>JSON.stringify({gold:q.gold,rewards:q.rewardLedger,units:q.units.map(u=>({id:u.id,hp:u.currentWounds,base:u.baseStats,x:u.x,y:u.y,xp:u.xp,entry:u.entryPoints,equipment:u.equipment||[]}))});const saved=snapshot(),gold=q.gold;assert.equal(q.resume(),true);q.phase='move';q.finishWave();assert.equal(q.gold,gold);q.phase='reward';assert.equal(snapshot(),saved);
});
test('combat health objective is evaluated before lembas recovery and injury remains in history',()=>{
 const h=camp(),q=h.q;delete h.u.injury;delete h.u.injuryBackup;h.u.currentWounds=1;q.relics.lembas=2;q.phase='fight';q.bonusObjective=h.run("BONUS_OBJECTIVES.find(x=>x.id==='healer')");q.bonusObjective2=null;q.finishWave();assert.equal(q.battleRecord.objectives[0].passed,false);assert.equal(h.u.currentWounds,3);assert.ok(h.u.injury);assert.equal(h.u.injuryHistory.length,1);
});
test('initial recruitment 1,000 times: no locked candidates and each core role when available',()=>{
 const h=create(),q=h.q;q.start('ai');let count=0;for(let i=0;i<1000;i++){q.rollInitialRecruits();const roles=new Set();for(const offer of q.recruitOffers){assert.equal(q.recruitGateReason(offer.id,true),'',offer.id);if(!h.run('isHeroUnit('+JSON.stringify(offer.id)+')'))roles.add(q.unitRole(offer.id));count++;}for(const role of ['infantry','support','archer','cavalry'])assert.ok(roles.has(role),role);}
 console.log(JSON.stringify({drafts:1000,candidates:count,locked:0}));
});
test('camp recruitment, paid rerolls and forged direct recruits share all unlock gates',()=>{
 const h=camp(),q=h.q;q.wave=0;q.campStep='recruit';q.gold=10000;for(let i=0;i<100;i++){q.rollRecruits();for(const o of q.recruitOffers)assert.equal(q.recruitGateReason(o.id),'',o.id);}
 q.recruitOffers=[{id:'numenorean_warrior',bought:false}];q.recruitDraft=[0];assert.equal(q.recruit(0),false);assert.equal(q.commitRecruits(),false);
});
test('roles use actual ranged weapon, spear, cavalry and support data',()=>{
 const h=camp(),q=h.q;for(const[id,role]of Object.entries({gondor_archer:'사격',mirkwood_ranger:'사격',mt_spearshield:'창 지원',mt_swordshield:'전열',rohan_rider:'기동',butterbur:'지휘·지원'}))assert.equal(q.unitRoleLabel(id),role,id);
});
test('merit contributions have per-action receipts and per-battle caps, survive promotions and saves',()=>{
 const h=camp(),q=h.q,u=q.units[1];u.xp=0;for(let n=0;n<100;n++){q.awardMerit(u,'support',n);q.awardMerit(u,'objective',n);q.awardMerit(u,'line',n);}
 assert.equal(u.xp,18);assert.equal(u.merit.total,18);const xp=u.xp;assert.equal(q.awardMerit(u,'support',0),false);assert.equal(u.xp,xp);q.save();assert.equal(q.resume(),true);assert.equal(q.unit(u.uid).merit.total,18);
});
test('one combat object cannot apply damage, support credit or a kill twice',()=>{
 const h=camp(),q=h.q;q.phase='fight';q.terrain=[];const u=q.units[1],foe=q.spawn('orc_sword','evil',{x:1000,y:700});foe.resources.fate=0;foe.currentWounds=1;
 const r={participants:[u.uid,foe.uid],supports:[],strikeResults:[{attacker:u.uid,target:foe.uid,wound:true,killed:true,roll:6}],pushVectors:[],knockedDownUnits:[]};q.applyCombat(r);const gold=q.gold,kills=q.stageKills,xp=u.xp;q.applyCombat(r);assert.equal(q.stageKills,kills);assert.equal(q.gold,gold);assert.equal(u.xp,xp);q._trkKill(u,foe);assert.equal(u.xp,xp);
});
test('charge prediction and execution share terrain bonus: open field yes, bridge no',()=>{
 const h=camp(),q=h.q;q.units=[];q.terrain=[];const u=q.spawn('rohan_rider','good',{x:1000,y:400}),foe=q.spawn('orc_sword','evil',{x:1200,y:400});q.phase='move';q.side='good';u.acted=false;
 const p=h.run('chargePlan(q.units[0],q.units[1],q.alive(),q.terrain,q.remaining(q.units[0]))');assert.ok(p);assert.equal(q.chargeBonus(u,foe,p).active,true);assert.equal(q.actionForecast({kind:'charge',uid:u.uid,target:foe.uid,to:p.to}).allowed,true);assert.equal(q.charge(u.uid,foe.uid),true);assert.equal(u.chargeOpen,true);
 q.terrain=[{id:'bridge',active:true,surface:'bridge',shape:'rect',x:1100,y:400,w:80,h:300}];assert.equal(q.chargeBonus(u,foe,{path:[{x:1000,y:400},{x:1200,y:400}]}).active,false);
});
function retreat(){const h=create(),q=h.q;q.start('hotseat');q.wave=2;q._routeChoice={...q.stageInfo(3),mission:'osgiliath_retreat',map:h.CX.maps.indexOf('osgiliath'),modifier:'clear',ids:['orc_sword'],linkedStep:1};q.linkedOperation={id:'anduin',active:true,startWave:2,step:1,bridge:0};q.prepareStage();q.startWave();
 q.units=q.units.filter(u=>u.side==='good');q.units.filter(u=>!u._evacuee).forEach((u,i)=>{u.x=100+i*150;u.y=350;});return h;}
test('retreat routes use two real bridges, cannot win by annihilation, all three reach the rear legally',()=>{
 const h=retreat(),q=h.q;assert.equal(q.checkRun(),false);assert.equal(q.retreatMission.convoys.length,3);assert.equal(q.terrain.filter(t=>t.surface==='bridge').length,2);
 for(let round=1;round<=9;round++){q.round=round;q.moveEvacuees();for(const u of q.alive().filter(u=>u._evacuee))assert.ok(h.Et(u,u,q.alive(),q.terrain),u.uid+' '+round);if(q.retreatMission.evacuated===3)break;}
 assert.equal(q.retreatMission.evacuated,3);assert.equal(q.retreatStatus().success,true);assert.equal(q.checkRun(),true);assert.equal(q.phase,'reward');assert.ok(q.rewardBook().entries.some(e=>e.key==='battle:anduin-full-evac'));
});
test('retreat fails after two real convoy losses, without reporting them as soldier deaths',()=>{
 const {q}=retreat();for(const uid of q.retreatMission.convoys.slice(0,2))q.eventDamage(q.unit(uid),3,false);assert.equal(q.stageDeaths,0);assert.equal(q.checkRun(),true);assert.equal(q.phase,'result');assert.equal(q.fallen.some(f=>q.retreatMission.convoys.includes(f.uid)),false);
});
test('early withdrawal needs two evacuated convoys and creates the next defensive branch once',()=>{
 const h=retreat(),q=h.q;assert.equal(q.earlyWithdraw(),false);for(let round=1;round<=9&&q.retreatMission.evacuated<2;round++){q.round=round;q.moveEvacuees();}assert.ok(q.retreatMission.evacuated>=2);assert.equal(q.earlyWithdraw(),true);assert.equal(q.linkedOperation.step,2);assert.equal(q.earlyWithdraw(),false);q.campStep='ready';q.leaveCamp();assert.equal(q.next.mission,'defense');assert.equal(q.next.linkedStep,2);
});
test('optional linked operation respects boss slots, saves choice, then returns to normal stages',()=>{
 const h=camp(),q=h.q;q.wave=1;q.campStep='ready';assert.equal(q.chooseAnduinOperation(),true);q.save();assert.equal(q.resume(),true);assert.equal(q.linkedOperation.step,0);assert.equal(q.stageInfo(2).mission,'scouting');q.linkedOperation.step=2;assert.equal(q.stageInfo(4).mission,'defense');assert.ok(q.stageInfo(5).boss);q.current={linkedStep:2};q.wave=4;q.resolveLinkedBattle();assert.equal(q.linkedOperation.active,false);assert.ok(q.stageInfo(5).boss);assert.equal(q.operationAvailable(),false);
});
test('auto interruption can be disabled and only triggers a concrete critical situation',()=>{
 const h=camp(),q=h.q;q.terrain=[];q.units=[h.u];h.u.currentWounds=1;h.u.resources.fate=0;h.u.x=1000;h.u.y=700;for(const x of [1000-h.u.radius-38,1000+h.u.radius+38])q.spawn('orc_sword','evil',{x,y:700});assert.match(q.autoPauseReason().text,/포위/);q.autoPauseSettings={hero:false,objective:false,choice:false};assert.equal(q.autoPauseReason(),null);
});
test('event IDs are unique; legacy duplicate IDs migrate by title and option without changing effects',()=>{
 const h=camp(),q=h.q,ids=h.LWB_EVENTS.map(e=>e.id);assert.equal(new Set(ids).size,ids.length);
 q.campEvent=h.LWB_EVENTS.find(e=>e.id==='gollum_track');q.save();const s=JSON.parse(h.store.get('mesbg-endless-save'));s.campEvent.id='gollum';h.store.set('mesbg-endless-save',JSON.stringify(s));assert.equal(q.resume(),true);assert.equal(q.campEvent.id,'gollum_track');
});
test('event movement inches, campaign injury and restoration match their descriptions',()=>{
 const h=camp(),q=h.q;q.nextRoundBuffs=[];pick(q,h.LWB_EVENTS.find(e=>e.id==='nazgul'),0);assert.equal(q.nextRoundBuffs[0].n,-90);q.nextRoundBuffs=[];pick(q,h.LWB_EVENTS.find(e=>e.id==='eagle'),1);assert.equal(q.nextRoundBuffs[0].n,45);
 const u=q.units[1],move=u.baseStats.move;q.units=[u];pick(q,h.LWB_EVENTS.find(e=>e.id==='broken_cart'),1);assert.equal(u.baseStats.move,Math.round(move*.75));assert.equal(u.injuryHistory.length,1);
 const v=q.spawn('mt_swordshield','good',{x:1200,y:400});const original=v.baseStats.move;assert.equal(q.applyCampaignInjury(v,'leg'),true);assert.equal(v.stats.move,Math.round(original*.75));assert.equal(v.injuryHistory.length,1);
 q.campEvent=h.LWB_EVENTS.find(e=>e.id==='elven_healer');q.units=q.units.filter(u=>u.uid===v.uid);q.gold=100;assert.equal(pick(q,q.campEvent,0),true);assert.equal(v.baseStats.move,original);assert.equal(v.injury,undefined);
});
test('successful bridge control expands next defense deployment; supplies add an actual support unit',()=>{
 const h=retreat(),q=h.q;q.retreatMission.evacuated=2;q.retreatMission.bridgeTicks=[2,0];q.retreatMission.supplies=true;q.finishWave();q.campStep='ready';q.leaveCamp();assert.equal(q.next.mission,'defense');assert.equal(q.deploymentAllowed({x:760,y:590}),true);assert.equal(q.deploymentAllowed({x:760,y:610}),false);
 const u=q.permanent()[0],p=h.run('Be(q.units[0],{x:760,y:550},q.alive(),q.terrain,200,p=>q.deploymentAllowed(p))');assert.ok(p);assert.equal(q.deploy(u.uid,p),true);q.startWave();assert.equal(q.alive('good').filter(u=>u._stageSupport==='anduin').length,1);
});
test('shop refresh and treatment share atomic payments, boundary checks and effect rollback',()=>{
 for(const balance of [0,19,20,21]){const h=camp(),q=h.q;q.gold=balance;const u=h.u,move=u.baseStats.move;q.campStep='ready';assert.equal(q.buyInjuryTreatment(u.uid),balance>=20);assert.equal(q.gold,balance>=20?balance-20:balance);if(balance>=20){assert.equal(u.injury,undefined);assert.equal(q.buyInjuryTreatment(u.uid),false);}else assert.equal(u.baseStats.move,move);}
 const h=camp(),q=h.q;q.campStep='shop';q.gold=7;assert.equal(q.rerollShop(),false);q.gold=8;assert.equal(q.rerollShop(),true);assert.equal(q.gold,0);assert.equal(q.shopStock.length,4);q.gold=8;const stock=JSON.stringify(q.shopStock),state=q.rng.getState();h.run('localStorage.setItem=()=>{throw Error("quota")}');assert.equal(q.rerollShop(),false);assert.equal(q.gold,8);assert.equal(JSON.stringify(q.shopStock),stock);assert.equal(q.rng.getState(),state);
});
test('resurrection starts a new casualty receipt without cloning legacy equipment',()=>{
 const h=camp(),q=h.q,u=q.units[1];u.equipment=['whetstone'];q.eventDamage(u,1,false);assert.equal(q.stageDeaths,1);assert.equal(u.equipment.length,0);assert.equal(q.legacy.filter(id=>id==='whetstone').length,1);assert.ok(q._reviveFallen(u.uid));assert.equal(u.alive,true);q.eventDamage(u,1,false);assert.equal(q.stageDeaths,2);assert.equal(q.legacy.filter(id=>id==='whetstone').length,1);
});
test('selling, buying back and reselling a legitimate item pays once each time',()=>{
 const h=camp(),q=h.q,u=h.u;q.campStep='shop';u.equipment=['whetstone'];const index=h.run("LWB_EQUIP.findIndex(a=>a.id==='whetstone')");q.gold=0;assert.equal(q.sellEquip(index,u.uid),true);const gold=q.gold;assert.ok(gold>0);assert.equal(q.sellEquip(index,u.uid),false);assert.equal(q.buybackEquip(0),true);assert.equal(q.gold,0);assert.equal(q.sellEquip(index,u.uid),true);assert.equal(q.gold,gold);assert.equal(q.rewardTotal('camp'),gold*2);
});
test('objective AI targets the actual lair and honors an explicit player hold order',()=>{
 const h=camp(),q=h.q;q.units=[];q.terrain=[];q.phase='move';q.side='good';q.mission='purge';q.battleOrder=null;const u=q.spawn('mt_swordshield','good',{x:400,y:600}),foe=q.spawn('orc_sword','evil',{x:900,y:900}),lair=q.spawn('orc_sword','evil',{x:1600,y:600});lair.lair=true;lair.static=true;
 assert.ok(q.orderPriority(u,lair)<q.orderPriority(u,foe));const plan=q.missionMovePlan(u);assert.ok(plan);assert.equal(plan.target,lair.uid);assert.ok(Math.hypot(plan.to.x-u.x,plan.to.y-u.y)<=q.remaining(u)+.1);assert.ok(h.Et(u,plan.to,q.alive(),q.terrain));q.setBattleOrder('hold');assert.equal(q.missionMovePlan(u),null);
});
