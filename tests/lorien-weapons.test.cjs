const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const harness=require('./campaign-harness.cjs');
test('Rumil and Orophin spawn as melee heroes with matching catalog and active skills',()=>{
 const h=harness();h.q.start('ai');
 for(const id of ['rumil','orophin']){
  const u=h.q.spawn(id,'good');
  assert.equal(h.q.meta.get(id).weapon,id==='rumil'?'sword_shield':'sword');
  assert.equal(h.UnitCatalog[id].profile.shootRange,0);assert.equal(h.zt[id].shootRange,0);
  assert.equal(u.stats.shootRange,0);assert.equal(u.stats.shootValue,0);assert(!u.traits.includes('spear'));
  assert(!/사격|명궁|화살/.test(JSON.stringify(h.CX.skills[id])));assert.match(h.CX.skills[id][3],/근접전/);
  assert.equal(h.q.pointCost(id),85);
  u.x=1000;u.y=500;const enemy=h.q.spawn('orc_sword','evil',{x:1300,y:500});
  h.q.phase='shoot';h.q.side='good';h.q.selected=u.uid;
  assert.equal(h.q.validTargets(u).length,0);assert.equal(h.q.shoot(u.uid,enemy.uid),false);
 }
});
test('legacy saves migrate wrong weapons without erasing earned stats, wounds or items',()=>{
 const h=harness(),q=h.q;q.start('ai');q.units=[];
 for(const id of ['rumil','orophin']){
  const u=q.spawn(id,'good',{x:1000,y:500});u.baseStats.fight+=2;u.baseStats.shootRange=830;u.baseStats.shootValue=3;
  if(id==='orophin'){u.traits.push('spear');u.baseStats.traits.push('spear');}
  u.currentWounds=1;u.resources.might=1;u.kills=7;u.equipment=['mithril_helm'];
 }
 q.phase='preparation';q.initialDraft=false;q.save();assert.equal(q.resume(),true);
 for(const u of q.permanent()){
  assert.equal(u.baseStats.shootRange,0);assert.equal(u.stats.shootRange,0);assert.equal(u.baseStats.fight,7);
  assert.equal(u.currentWounds,1);assert.equal(u.resources.might,1);assert.equal(u.kills,7);
  assert.deepEqual(Array.from(u.equipment),['mithril_helm']);assert(!u.traits.includes('spear'));
  q.refreshUnit(u);assert.equal(u.stats.shootRange,0);
 }
 const old=structuredClone(q._saveState());
 for(const u of old.units){u.baseStats.shootRange=830;u.baseStats.shootValue=3;}
 assert.equal(q.importSave(old),true);
 for(const u of q.permanent())assert.equal(u.stats.shootRange,0);
 q._retrySnapshot={wave:q.wave,cleared:q.cleared,gold:200,relics:{},fallen:[],units:old.units,devices:[]};q.phase='result';
 assert.equal(q.retryStage(),true);
 for(const u of q.permanent()){assert.equal(u.baseStats.shootRange,0);assert.equal(u.stats.shootRange,0);assert.equal(u.baseStats.fight,7);}
});
test('explicit bow equipment still works, and removal restores the melee profile',()=>{
 const h=harness(),q=h.q;q.start('ai');const u=q.spawn('rumil','good');
 u.equipment=['hunting_bow'];q.refreshUnit(u);assert.equal(u.stats.shootRange,600);assert.equal(u.baseStats.shootRange,0);
 u.equipment=[];q.refreshUnit(u);assert.equal(u.stats.shootRange,0);
});
test('database source and public unit metadata agree with runtime weapons',()=>{
 const rows=require('../db-data.js').flatMap(s=>s.units);
 const units=JSON.parse(fs.readFileSync('units.json','utf8')).units;
 for(const [id,weapon] of [['rumil','sword_shield'],['orophin','sword']]){
  assert.equal(rows.find(u=>u[0]===id)[3].weapon,weapon);assert.equal(units.find(u=>u.id===id).weapon,weapon);
  for(const p of ['gallery.html','gallery2.html']){
   const html=fs.readFileSync(p,'utf8'),a=html.indexOf('<div class="id">'+id+'</div>'),card=html.slice(a,a+330);
   assert(card.includes('영웅 · '+weapon),p+' '+id);assert(!card.includes('Lorien Archer'));
  }
 }
});

