const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const load=require('./campaign-harness.cjs');
const json=x=>JSON.stringify(x);
function prepared(){const h=load();h.q.start('hotseat');h.q.prepareStage();return h;}
test('served HTML has no merge markers, duplicate documents or broken inline scripts',()=>{
 const h=fs.readFileSync('index.html','utf8');assert.equal((h.match(/<!doctype html/gi)||[]).length,1);assert.ok(!/^(<{7}|\|{7}|={7}|>{7})/m.test(h));
 const begin='/*__LWB_SRC_BEGIN__*/',end='/*__LWB_SRC_END__*/';assert.equal(h.slice(h.indexOf(begin)+begin.length,h.indexOf(end)).trim(),fs.readFileSync('src/game.js','utf8').trim());
 for(const m of h.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)){if(!m[2].trim())continue;assert.doesNotThrow(()=>new vm.Script(m[2]));}
});
test('PRNG state restoration preserves the original sequence, including zero and signed states',()=>{
 const h=load();for(const seed of [0,1,123456,2147483647,-2147483648]){let z=seed;const old=()=>{z|=0;z=z+1831565813|0;let y=Math.imul(z^z>>>15,1|z);y=y+Math.imul(y^y>>>7,61|y)^y;return((y^y>>>14)>>>0)/4294967296;};const rng=h.Ne(seed);for(let i=0;i<100;i++)assert.equal(rng(),old());const restored=h.Ne(rng.getState());for(let i=0;i<100;i++)assert.equal(restored(),rng());}
});
test('saving and resuming continues the next gameplay random values without reseeding',()=>{
 const h=prepared(),q=h.q;q.rng=h.Ne(9876);for(let i=0;i<17;i++)q.rng();assert.equal(q.save(),true);const expected=Array.from({length:12},()=>q.rng());assert.equal(q.resume(),true);assert.deepEqual(Array.from({length:12},()=>q.rng()),expected);
});
test('initial draft with zero placed troops restores offers and selected candidates',()=>{
 const h=load(),q=h.q;q.start('ai');q.toggleRecruit(q.recruitOffers[0].id);assert.equal(q.save(),true);const s=json(q.recruitDraft),offers=json(q.recruitOffers);assert.equal(q.resume(),true);assert.equal(json(q.recruitDraft),s);assert.equal(json(q.recruitOffers),offers);assert.equal(q.gold,600);
});
test('invalid cloud data never replaces either live state or the previous autosave',()=>{
 const h=prepared(),q=h.q;q.save();const raw=h.store.get('mesbg-endless-save'),before=json(q._saveState());for(const mutate of [s=>s.phase='fight',s=>s.units[0].id='not_a_unit',s=>s.units[0].x=null]){const s=JSON.parse(raw);mutate(s);assert.equal(q.importSave(s),false);assert.equal(h.store.get('mesbg-endless-save'),raw);assert.equal(json(q._saveState()),before);}
});
test('valid cloud data imports through full resume and ignores injected instance properties',()=>{
 const h=prepared(),q=h.q,s=JSON.parse(json(q._saveState()));s.gold=123;s.doctrine='shield';s.resume=null;s._incomingSaveRaw='broken';s.__proto__={intruder:true};assert.equal(q.importSave(s),true);assert.equal(q.gold,123);assert.equal(q.doctrine,'shield');assert.equal(typeof q.resume,'function');assert.equal(q.intruder,undefined);assert.equal(q._incomingSaveRaw,undefined);assert.equal(JSON.parse(h.store.get('mesbg-endless-save')).gold,123);
});
test('quota failure after successful validation preserves current game and old save',()=>{
 const h=prepared(),q=h.q;q.save();const raw=h.store.get('mesbg-endless-save'),before=json(q._saveState()),s=JSON.parse(raw);s.gold=900;h.run("localStorage.setItem=()=>{throw new Error('quota');}");assert.equal(q.importSave(s),false);assert.equal(h.store.get('mesbg-endless-save'),raw);assert.equal(json(q._saveState()),before);
});
test('failed resume wrapper cannot mutate the live party or global objective',()=>{
 const h=prepared(),q=h.q;q.save();const raw=h.store.get('mesbg-endless-save'),before=json(q._saveState()),objective=h.run('JSON.stringify(Mt.objective)');h.P.resume=function(){this.units[0].currentWounds=0;this.gold=0;h.run('Mt.objective.x=-999');throw Error('late validation failure');};assert.equal(q.importSave(JSON.parse(raw)),false);assert.equal(json(q._saveState()),before);assert.equal(h.run('JSON.stringify(Mt.objective)'),objective);assert.equal(h.store.get('mesbg-endless-save'),raw);
});
test('retry/retreat restore loot, statistics and alternate route, while fees accumulate',()=>{
 const h=prepared(),q=h.q;q.phase='reward';q.campStep='ready';q.gold=240;q.totalKills=11;q.chestsOpened=2;q.stash=['test-kept'];q.legacy=['old-legacy'];q._routeChoice={...q.stageInfo(1),map:3,mission:'hold'};q.rng=h.Ne(4567);assert.equal(q.leaveCamp(),true);const next=json(q.next),terrain=json(q.terrain),rng=q.rng.getState();
 for(const [action,fee] of [['retreatStage',40],['retryStage',60]]){q.phase=action==='retreatStage'?'move':'result';q.totalKills+=99;q.chestsOpened+=5;q.stash.push('stage-loot');q.legacy.push('stage-loss');q.rng();assert.equal(q[action](),true);assert.equal(q.totalKills,11);assert.equal(q.chestsOpened,2);assert.equal(json(q.stash),json(['test-kept']));assert.equal(json(q.legacy),json(['old-legacy']));assert.equal(json(q.next),next);assert.equal(json(q.terrain),terrain);assert.equal(q.rng.getState(),rng);}
 assert.equal(q.gold,140);assert.equal(q._retrySnapshot.gold,140);
});
test('checkpoint and RNG roundtrip survive browser-session save/load before retreat',()=>{
 const h=prepared(),q=h.q;q.phase='reward';q.campStep='ready';q.gold=200;q.totalKills=15;q.leaveCamp();const saved=q._saveState();assert.ok(saved._retrySnapshot.runState);q._retrySnapshot=null;assert.equal(q.importSave(saved),true);q.totalKills=42;q.phase='move';assert.equal(q.retreatStage(),true);assert.equal(q.totalKills,15);assert.equal(q.gold,160);
});
test('weekly challenge restarts with the same recruitment choices',()=>{
 const a=load(),b=load();a.q.weeklySeed=b.q.weeklySeed=202642;a.q.start('ai');b.q.start('ai');assert.equal(json(a.q.recruitOffers),json(b.q.recruitOffers));assert.equal(a.q.rng.getState(),b.q.rng.getState());
});
test('all seven purge stages retain three live lairs after preparation and first round',()=>{
 const h=load(),q=h.q;q.start('hotseat');for(const n of [4,14,24,34,44,54,64]){q.wave=n-1;q.prepareStage();q.startWave();assert.equal(q.phase,'move');assert.equal(q.purgeLairs.length,3);assert.equal(q.alive('evil').filter(u=>u.lair).length,3);}
});
test('lair reachability respects impassable cliffs without treating moving armies as permanent blockers',()=>{
 const h=load(),q=h.q;q.start('hotseat');q.terrain=[];const a={x:500,y:500,radius:38,traits:[],side:'good'},b={x:1500,y:500};assert.equal(q.lairReachability(a)(b),true);q.terrain=[{x:1100,y:900,w:120,h:2500,active:true,kind:'block',z:'cliff'}];assert.equal(q.lairReachability(a)(b),false);q.terrain=[];q.units.push({x:1100,y:500,radius:5000,alive:true,side:'evil'});assert.equal(q.lairReachability(a)(b),true);
});
