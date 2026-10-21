const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),create=require('./campaign-harness.cjs');
const source=fs.readFileSync('src/game.js','utf8'),AI=source.slice(source.indexOf('const tacticalLocalAI=be;'),source.indexOf('window.MESBG.terrain=Terrain;'));
function scenario(key,mission='annihilation',stage=1){const h=create(),q=h.q;h.run(AI);h.run("AUTO=true");q.start('hotseat');q.wave=stage-1;q._routeChoice={...q.stageInfo(stage),map:h.CX.maps.indexOf(key),mission,modifier:'clear'};q.prepareStage();q.rng=h.Ne(13013+stage);q.startWave();return h;}
test('27 regions place normal units, escort carts and purge lairs on legal ground',()=>{
 for(const key of Object.keys(require('../src/tactical-terrain.js').THEMES))for(const mission of['annihilation','escort','purge']){
  const h=scenario(key,mission),q=h.q;for(const u of q.alive()){assert.ok(h.Et(u,u,q.alive(),q.terrain),key+' '+mission+' '+u.id);}
  for(const d of q.devices||[]){if(!d.armed)continue;assert.ok(h.run(`Terrain.legal({uid:'device',radius:24,traits:[]},{x:${d.x},y:${d.y}},[],q.terrain)`),key+' marker '+d.type);}
 }
});
test('river, chasm and forest combat complete through the production AI without terrain shortcuts',()=>{
 for(const key of['osgiliath','moria','fangorn','mirkwood']){
  const h=scenario(key),q=h.q;let steps=0;for(;steps<1600&&!['reward','result'].includes(q.phase);steps++){
   if(q.phase==='fight')q.fightNext();else if(q.phase==='move'||q.phase==='shoot')h.He(q);else throw Error('Unexpected phase '+q.phase);
   for(const u of q.alive())assert.ok(h.Et(u,u,q.alive(),q.terrain),key+' round '+q.round+' illegal '+u.id);
   q.events=[];
  }
  assert.ok(['reward','result'].includes(q.phase),key+' stalled at round '+q.round);
  console.log(JSON.stringify({map:key,phase:q.phase,round:q.round,steps,survivors:q.alive('good').length}));
 }
});
test('preparation save carries a versioned authored layout and unchanged placements',()=>{const h=scenario('osgiliath');h.q.phase='preparation';h.q.save();const s=JSON.parse(h.store.get('mesbg-endless-save'));assert.equal(s.tactical.version,3);assert.equal(s.tactical.battlefield.key,'osgiliath');const old=s.tactical.terrain;assert.equal(h.q.resume(),true);assert.equal(JSON.stringify(h.q.terrain),JSON.stringify(old));});
