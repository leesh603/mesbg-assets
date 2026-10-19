const test=require('node:test'),assert=require('node:assert/strict'),create=require('./campaign-harness.cjs');
function field(){const h=create(),q=h.q;q.start('ai');q.units=[];q.terrain=[];q.relics={};q.gold=100;q.wave=2;q.initialDraft=false;q.phase='move';q.round=3;q.mission='defense';q.current={ids:[],modifier:'clear'};return h;}
test('reserve ownership gives neither battle merit nor survival or result participation',()=>{
 const {q}=field(),a=q.spawn('mt_swordshield','good',{x:1000,y:600}),r=q.spawn('mt_spearshield','good',{x:1100,y:600});r.inReserve=true;
 assert.equal(q.awardMerit(r,'support','round:3'),false);q.captureBattleRecord();assert(!q.battleRecord.units.some(u=>u.uid===r.uid));q.finishWave();assert.equal(a.survivedBattles,1);assert.equal(r.survivedBattles||0,0);assert.equal(r.battlesParticipated||0,0);
});
test('dark-event income is displayed once in the same persistent reward ledger',()=>{
 const {q}=field();q.spawn('aragorn','good',{x:1000,y:600});q.darkActive={id:'warg_scouts',members:[],paid:false};const before=q.gold;
 assert.equal(q.rewardDarkEvent(),true);assert.equal(q.gold,before+15);assert.equal(q.rewardTotal(),15);assert.equal(q.rewardDarkEvent(),false);q.finishWave();assert.equal(q.gold-before,q.lastGold);const gold=q.gold;assert(q.resume());assert.equal(q.rewardDarkEvent(),false);assert.equal(q.gold,gold);
});
test('shared training caps are transactional and their compensation enters the reward ledger',()=>{
 const h=field(),q=h.q,u=q.spawn('aragorn','good',{x:1000,y:600});q.armyTraining={courage:2};q.phase='reward';q.campStep='event';q.campEvent=h.LWB_EVENTS.find(e=>e.id==='refugees');q.rewardBook();
 assert(q.chooseEvent(0));assert.equal(q.armyTrainingBonus('courage'),2);assert.equal(u.baseStats.courage,h.zt.aragorn.courage);assert.equal(q.gold,95);assert.equal(q.rewardTotal(),10);assert.equal(q.rewardBook().spending.reduce((n,e)=>n+e.amount,0),15);
 q.campEvent=h.LWB_EVENTS.find(e=>e.id==='refugees');const stored=h.store.get('mesbg-endless-save'),gold=q.gold;h.run('localStorage.setItem=()=>{throw Error("quota")};');assert.equal(q.chooseEvent(0),false);assert.equal(q.gold,gold);assert.equal(q.rewardTotal(),10);assert.equal(q.armyTrainingBonus('courage'),2);assert.equal(h.store.get('mesbg-endless-save'),stored);
});
test('latest faction weighting remains the ordinary recruit source and every offer uses the same unlock gate',()=>{
 const {q}=field();q.spawn('elrond','good',{x:1000,y:600});q.wave=20;let called=0;const roll=q.rollFactionRecruits;q.rollFactionRecruits=function(){called++;return roll.call(this);};q.rollRecruits();assert.equal(called,1);for(const o of q.recruitOffers)assert.equal(q.recruitGateReason(o.id),'');
});
