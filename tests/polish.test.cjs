const {test}=require('node:test'),assert=require('node:assert/strict');
const h=require('./campaign-harness.cjs')(),q=h.q;
function camp(step='event'){
 q.start('hotseat');q.wave=1;q.phase='reward';q.campStep=step;q.chosenRelic='';q.campDraft=null;
 q.campEvent=h.LWB_EVENTS.find(e=>e.id==='omen');q.rollRelics();q.events=[];
}
test('camp event preview/cancel has no effect; confirmed effect survives reload and applies once',()=>{
 camp();const gold=q.gold;q.selectCampChoice('1');assert.equal(q.gold,gold);q.selectCampChoice('1');assert.equal(q.campDraft,null);
 q.selectCampChoice('1');q.save();assert.equal(q.resume(),true);assert.equal(q.campDraft.key,'1');assert.equal(q.confirmCampChoice(),true);
 assert.equal(q.gold,gold+15);assert.equal(q.confirmCampChoice(),false);assert.equal(q.gold,gold+15);
});
test('relic preview can change or cancel and confirmation awards only the final choice',()=>{
 camp('relic');const [a,b]=q.relicChoices;q.selectCampChoice(a);assert.equal(q.rank(a),0);q.selectCampChoice(b);assert.equal(q.rank(b),0);
 q.save();assert.equal(q.resume(),true);assert.equal(q.confirmCampChoice(),true);assert.equal(q.rank(a),0);assert.equal(q.rank(b),1);assert.equal(q.campStep,'ready');
});
test('stale camp drafts and choices outside camp cannot commit',()=>{
 camp();q.selectCampChoice('0');q.campStep='relic';assert.equal(q.confirmCampChoice(),false);
 q.phase='move';assert.equal(q.selectCampChoice(q.relicChoices[0]),false);assert.equal(q.confirmCampChoice(),false);
});
test('saved priority and command-point rewards persist then affect next battle',()=>{
 camp();q.selectCampChoice('0');q.confirmCampChoice();q.bonusCP=2;q.save();q.priorityForce=null;q.bonusCP=0;
 assert.equal(q.resume(),true);assert.equal(q.priorityForce,'good');assert.equal(q.bonusCP,2);
 q.campStep='ready';q.leaveCamp();q.startWave();assert.equal(q.priority,'good');assert.ok(q.cp>=2);
});
test('relic offers expose three different build directions without owned unique repeats',()=>{
 camp();for(let i=0;i<50;i++){q.rollRelics();assert.equal(new Set(q.relicChoices.map(h.relicFamily)).size,3);}
 for(const r of h.CX.relics.filter(r=>r.rarity===3))q.relics[r.id]=1;
 for(let i=0;i<20;i++){q.rollRelics();assert.ok(q.relicChoices.every(id=>h.CX.relics.find(r=>r.id===id).rarity!==3));}
});
test('recruit roster contains frontline, support and archer options',()=>{
 camp('recruit');q.rollRecruits();const p=q.recruitOffers.map(o=>h.zt[o.id]);
 assert.ok(p.some(v=>!v.traits.includes('hero')&&!v.traits.includes('mounted')&&!v.shootRange&&!v.traits.includes('spear')));
 assert.ok(p.some(v=>v.traits.includes('spear')));assert.ok(p.some(v=>v.shootRange>0));
});
test('wave 100 infantry retains original wounds and attacks',()=>{
 q.start('hotseat');q.units=[];q.terrain=[];q.delayed=[];q.wave=100;q.spawnEnemies(['orc_sword']);const e=q.alive('evil')[0];
 assert.ok(e);assert.equal(e.stats.wounds,h.zt.orc_sword.wounds);assert.equal(e.stats.attacks,h.zt.orc_sword.attacks);
 assert.ok(e.stats.fight<=h.zt.orc_sword.fight+2);
});
test('heroic movement adds exactly 2 inches after partial movement',()=>{
 q.start('hotseat');q.units=[];q.terrain=[];const u=q.spawn('aragorn','good',{x:600,y:600});q.spawn('orc_sword','evil',{x:1800,y:1100});
 q.phase='move';q.side='good';q.activeMoverUid='';q.move(u.uid,{x:690,y:600});const before=q.remaining(u),spent=u.movementSpent;
 assert.equal(q.heroic(u.uid,'move'),true);assert.equal(q.remaining(u)-before,90);assert.equal(u.movementSpent,spent);
});
test('new expeditions do not inherit old camp drafts, horses or queued buffs',()=>{
 camp();q.selectCampChoice('0');q.horses=3;q.bonusCP=7;q.nextRoundBuffs=[{stat:'move',n:90}];q.start('hotseat');
 assert.equal(q.campDraft,null);assert.equal(q.horses,0);assert.equal(q.bonusCP,0);assert.ok(!q.nextRoundBuffs||q.nextRoundBuffs.length===0);
});
