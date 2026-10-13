'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const load=require('./campaign-harness.cjs');
const plain=value=>JSON.parse(JSON.stringify(value));
function camp(){
  const h=load(),q=h.q;q.start('ai');q.units=[];
  const u=q.spawn('aragorn','good',{x:500,y:500});
  q.initialDraft=false;q.phase='reward';q.campStep='shop';q.gold=5000;
  return {...h,u};
}
test('new expedition clears stash, inherited equipment and shop history, not persistent progress',()=>{
  const h=camp(),q=h.q;
  h.store.set('lwb_loss_streak','2');h.store.set('mesbg-audio','off');
  q.stash=['north_map'];q.legacy=['anduril'];q._resale=[{i:0,uid:h.u.uid,refund:1}];
  q.shopStock=[0,1];q._stockFor='1@0';q._soldOut=[0];q._shopTarget=h.u.uid;
  q.fallen=[{id:'haldir',uid:'old',eq:['anduril']}];
  q.start('ai');
  for(const k of ['stash','legacy','_resale','shopStock','_soldOut','fallen'])assert.deepEqual(plain(q[k]),[],k);
  assert.equal(q._stockFor,'');assert.equal(q._shopTarget,'');
  assert.equal(q.initialDraft,true);assert.equal(q.wave,0);assert.equal(q.units.length,0);
  assert.equal(h.store.get('lwb_loss_streak'),'2');assert.equal(h.store.get('mesbg-audio'),'off');
});
test('repeated new expeditions own fresh inventory arrays in both game modes',()=>{
  const {q}=camp();
  for(const mode of ['ai','hotseat','ai']){
    const stash=q.stash=['north_map'],legacy=q.legacy=['anduril'];q.start(mode);
    assert.notEqual(q.stash,stash);assert.notEqual(q.legacy,legacy);
    stash.push('ringil');legacy.push('ringil');
    assert.deepEqual(plain(q.stash),[]);assert.deepEqual(plain(q.legacy),[]);
  }
});
test('same-expedition unequip, save, reload and re-equip preserve the real item exactly once',()=>{
  const h=camp(),q=h.q,u=h.u,items=h.run('LWB_EQUIP');
  const i=items.findIndex(e=>e.id==='anduril');assert.ok(i>=0);
  assert.equal(q.buyEquip(i,u.uid),true);const stats=plain(u.stats),gold=q.gold;
  assert.equal(q.unequip('anduril',u.uid),true);assert.deepEqual(plain(q.stash),['anduril']);
  q.legacy=['north_map'];q.save();q.stash=[];q.legacy=[];
  assert.equal(q.resume(),true);assert.deepEqual(plain(q.stash),['anduril']);assert.deepEqual(plain(q.legacy),['north_map']);
  assert.equal(q.equipFromStash(0,u.uid),true);assert.equal(q.equipFromStash(0,u.uid),false);
  assert.equal(q.gold,gold);assert.deepEqual(plain(q.unit(u.uid).equipment),['anduril']);
  assert.deepEqual(plain(q.unit(u.uid).stats),stats);assert.deepEqual(plain(q.stash),[]);
});
test('actual combat death produces legacy within a run, then a new run removes it',()=>{
  const h=camp(),q=h.q,u=h.u;
  q.terrain=[];q.phase='fight';q.side='evil';q.relics={};
  const killer=q.spawn('orc_sword','evil',{x:575,y:500});
  u.equipment=['anduril'];u.currentWounds=1;u.resources.fate=0;
  q.applyCombat({strikeResults:[{attacker:killer.uid,target:u.uid,wound:true,killed:true}],pushVectors:[]});
  assert.equal(u.alive,false);assert.deepEqual(plain(q.legacy),['anduril']);
  assert.equal(q.fallen.some(f=>f.uid===u.uid),true);
  q.start('ai');assert.deepEqual(plain(q.legacy),[]);assert.deepEqual(plain(q.fallen),[]);
});
test('save slots restore their own stash and legacy rather than current-session inventory',()=>{
  const h=camp(),q=h.q;q.stash=['north_map'];q.legacy=['anduril'];
  q.save();assert.equal(q.saveSlot(1),true);
  q.stash=['ringil'];q.legacy=[];q.save();assert.equal(q.saveSlot(2),true);
  assert.equal(q.resumeSlot(1),true);assert.deepEqual(plain(q.stash),['north_map']);assert.deepEqual(plain(q.legacy),['anduril']);
  assert.equal(q.resumeSlot(2),true);assert.deepEqual(plain(q.stash),['ringil']);assert.deepEqual(plain(q.legacy),[]);
});
test('old saves without inventory fields cannot inherit inventory from the current battle object',()=>{
  const h=camp(),q=h.q;q.save();const saved=JSON.parse(h.store.get('mesbg-endless-save'));
  delete saved.stash;delete saved.legacy;
  h.store.set('mesbg-endless-save',JSON.stringify(saved));q.stash=['north_map'];q.legacy=['anduril'];
  assert.equal(q.resume(),true);assert.deepEqual(plain(q.stash),[]);assert.deepEqual(plain(q.legacy),[]);
});
test('null or malformed optional inventory fields normalize to empty collections',()=>{
  const h=camp(),q=h.q;q.save();const saved=JSON.parse(h.store.get('mesbg-endless-save'));
  saved.stash=null;saved.legacy={old:'anduril'};h.store.set('mesbg-endless-save',JSON.stringify(saved));
  assert.equal(q.resume(),true);assert.deepEqual(plain(q.stash),[]);assert.deepEqual(plain(q.legacy),[]);
});
test('loading a save discards a different run\'s non-persisted buyback history',()=>{
  const h=camp(),q=h.q;q.save();q._resale=[{i:0,uid:h.u.uid,refund:1}];q._shopTarget='old-unit';
  assert.equal(q.resume(),true);assert.deepEqual(plain(q._resale),[]);assert.equal(q._shopTarget,'');
});
test('invalid save rejection leaves the current expedition inventory untouched',()=>{
  const h=camp(),q=h.q;q.stash=['north_map'];q.legacy=['anduril'];
  h.store.set('mesbg-endless-save',JSON.stringify({version:-1,units:[]}));
  assert.equal(q.resume(),false);assert.deepEqual(plain(q.stash),['north_map']);assert.deepEqual(plain(q.legacy),['anduril']);
});
