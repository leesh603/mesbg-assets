const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const load=require('./campaign-harness.cjs'),source=fs.readFileSync('src/game.js','utf8');
function field(){const h=load(),q=h.q;q.start('hotseat');q.units=[];q.events=[];q.terrain=[];q.delayed=[];q.phase='move';q.side=q.priority='good';q.mission='annihilation';q.current={modifier:'clear',ids:[],mission:'annihilation'};q.activeMoverUid='';return h;}
test('infantry wounds never dismount or strip buffs; mounted variants still dismount',()=>{
 const h=field(),q=h.q,a=q.spawn('orc_captain','evil',{x:500,y:500}),u=q.spawn('aragorn','good',{x:600,y:500});
 u.resources.fate=0;u.baseStats.defence+=2;q.refreshUnit(u);const before=JSON.stringify(u.baseStats),hp=u.currentWounds;q.events=[];
 q.applyCombat({kind:'skill',participants:[a.uid,u.uid],strikeResults:[{attacker:a.uid,target:u.uid,wound:true,killed:false}],pushVectors:[]});
 assert.equal(u.currentWounds,hp-1);assert.equal(u.alive,true);assert.equal(JSON.stringify(u.baseStats),before);assert.ok(!u.traits.includes('dismounted'));assert.ok(!q.events.some(e=>e.type==='UnitDismounted'));
 q.dismount(u);assert.equal(JSON.stringify(u.baseStats),before);assert.ok(!q.events.some(e=>e.type==='UnitDismounted'));
 const rider=q.spawn('glorfindel_mounted','good',{x:900,y:500});q.dismount(rider);assert.equal(rider.id,'glorfindel_foot');assert.ok(rider.traits.includes('dismounted'));assert.ok(!rider.traits.includes('mounted'));assert.ok(q.events.some(e=>e.type==='UnitDismounted'&&e.uid===rider.uid));
});
test('every map and variant prepares without sparse-zone errors or missing props',()=>{
 const h=load(),q=h.q;h.run("this.mapErrors=[];console={error:(...args)=>mapErrors.push(args.map(String).join(' ')),warn(){},log(){}};");q.start('hotseat');
 for(let map=0;map<h.CX.maps.length;map++)for(let wave=0;wave<5;wave++){
  q.wave=wave;q._routeChoice={...q.stageInfo(wave+1),map,mission:'annihilation'};q.prepareStage();
  assert.equal(q.phase,'preparation');assert.ok(q.terrain.every(t=>Number.isFinite(t.x)&&Number.isFinite(t.y)&&Number.isFinite(t.w)&&Number.isFinite(t.h)));
  assert.ok(q.terrain.some(t=>!t.id.startsWith('zone-')&&t.active));
 }
 assert.deepEqual(Array.from(h.run('mapErrors')),[]);
});
test('automatic archer retains half-move shooting eligibility while approaching a target',()=>{
 const h=field(),q=h.q,u=q.spawn('orc_archer','evil',{x:500,y:500});q.spawn('warrior_minas_tirith','good',{x:1300,y:500});q.side='evil';
 for(let i=0;i<8&&!u.acted;i++)h.He(q);
 assert.equal(u.acted,true);assert.ok(u.movementSpent>0);assert.ok(u.movementSpent*2<=u.stats.move+.01);
 q.phase='shoot';q.side='evil';u.acted=false;assert.ok(q.eligible().includes(u));h.He(q);assert.ok(q.events.some(e=>e.type==='ShotFired'));
});
test('ordinary archer fires rather than charging an unengaged target already in range',()=>{
 const h=field(),q=h.q,u=q.spawn('orc_archer','evil',{x:800,y:700}),e=q.spawn('warrior_minas_tirith','good',{x:1000,y:700});q.side='evil';
 for(let i=0;i<8&&!u.acted;i++)h.He(q);
 assert.equal(q.engaged(u),false);assert.ok(u.movementSpent*2<=u.stats.move+.01);q.phase='shoot';q.side='evil';u.acted=false;h.He(q);assert.ok(q.events.some(e=>e.type==='ShotFired'));
});
test('save slots and cloud payload preserve alternate battlefield and deployment',()=>{
 const h=load(),q=h.q;q.start('hotseat');q._routeChoice={...q.stageInfo(2),map:3,mission:'hold'};q.prepareStage();q.alive('good')[0].x=900;const before=JSON.stringify(q.terrain);
 assert.equal(q.saveSlot(1),true);const payload=JSON.parse(h.store.get('mesbg-endless-slot-1'));assert.equal(payload.tactical.mapIndex,3);assert.equal(payload.tactical.mission,'hold');
 q._routeChoice={...q.stageInfo(2),map:1,mission:'annihilation'};q.prepareStage();assert.equal(q.resumeSlot(1),true);assert.equal(q.mapIndex,3);assert.equal(q.mission,'hold');assert.equal(q.alive('good')[0].x,900);assert.equal(JSON.stringify(q.terrain),before);
 assert.equal(q._saveState().tactical.mapIndex,3);
});
test('enemy boss reward is awarded once in combat and persists in the cleared-stage save',()=>{
 const h=field(),q=h.q,u=q.spawn('aragorn','good',{x:500,y:500}),b=q.spawn('witchking_fellbeast','evil',{x:1000,y:700});q.wave=15;q.gold=100;q._firstBlood=true;b.traits.push('boss');b.currentWounds=1;b.resources.fate=0;q.rng=()=>0;
 const bounty=40+b.stats.wounds*6,result={kind:'skill',participants:[u.uid,b.uid],strikeResults:[{attacker:u.uid,target:b.uid,wound:true,killed:true}],pushVectors:[]};
 q.applyCombat(result);assert.equal(q.gold,100+bounty);q.applyCombat(result);assert.equal(q.gold,100+bounty);q.checkRun();const saved=JSON.parse(h.store.get('mesbg-endless-save'));assert.equal(saved.gold,q.gold);assert.ok(q.gold>=100+bounty);
});
test('a delayed casualty animation tolerates a removed unit and cannot award money',async()=>{
 const code=source.split('\n').find(s=>s.startsWith("Ve.prototype.play=async function(event){if(event.type==='UnitKilled'&&event.uid)"));
 const ctx={Ve:function(){},heroFallenPlay:async()=>{},window:{},esc:String,document:{},setTimeout(){}};vm.createContext(ctx);vm.runInContext(code,ctx);
 await ctx.Ve.prototype.play.call({b:{unit:()=>null}}, {type:'UnitKilled',uid:'removed'});
});
test('all 70 stage definitions and deployments have valid units and finite coordinates',()=>{
 const h=load(),q=h.q;h.run("console={error(){},warn(){},log(){}};");
 for(let n=1;n<=70;n++){q.start('hotseat');q.wave=n-1;q.prepareStage();q.startWave();assert.equal(q.wave,n);for(const u of q.alive()){assert.ok(q.meta.has(u.id));if(!u.static&&!u.lair)assert.ok(h.UnitCatalog[u.id]);for(const k of ['x','y','radius'])assert.ok(Number.isFinite(u[k]),n+':'+u.id+':'+k);assert.ok(u.currentWounds>0);}}
});

test('an invalid slot cannot replace the working autosave or put the game in a blocked phase',()=>{
 const h=load(),q=h.q;q.start('hotseat');q.prepareStage();q.save();const previous=h.store.get('mesbg-endless-save'),phase=q.phase;
 const bad=JSON.parse(previous);bad.phase='move';h.store.set('mesbg-endless-slot-2',JSON.stringify(bad));assert.equal(q.resumeSlot(2),false);assert.equal(q.phase,phase);assert.equal(h.store.get('mesbg-endless-save'),previous);
 bad.phase='preparation';bad.units[0].id='missing_unit';h.store.set('mesbg-endless-slot-2',JSON.stringify(bad));assert.equal(q.resumeSlot(2),false);assert.equal(h.store.get('mesbg-endless-save'),previous);
});

test('older camp saves restore missing resource containers and the loaded bonus objective',()=>{
 const h=load(),q=h.q;q.start('hotseat');q.prepareStage();q.save();const s=JSON.parse(h.store.get('mesbg-endless-save'));s.bonusId='lair_buster';delete s.units[0].resources;delete s.units[0].usedSkills;delete s.units[0].roundBuff;delete s.units[0].baseStats;h.store.set('mesbg-endless-save',JSON.stringify(s));q.bonusId='';q.bonusObjective=null;
 assert.equal(q.resume(),true);assert.equal(q.bonusObjective.id,'lair_buster');assert.ok(q.units[0].resources);assert.ok(q.units[0].baseStats);assert.doesNotThrow(()=>q.skillReason(q.units[0]));
});

test('campaign victory never creates the defeat overlay',()=>{
 const start=source.indexOf('P.endRun = function (won, msg) { oldEndRun'),end=source.indexOf('P.resumeSlot = function',start),cards=[];
 const ctx={P:{},oldEndRun(){},document:{createElement:()=>({remove(){}}),body:{appendChild:el=>cards.push(el.innerHTML)}},setTimeout(){},localStorage:{setItem(){},removeItem(){}}};vm.createContext(ctx);vm.runInContext(source.slice(start,end),ctx);
 ctx.P.endRun.call({units:[],wave:70,alive:()=>[],checkAchievements(){}},true,'완주');assert.equal(cards.length,1);assert.ok(cards[0].includes('캠페인 완주'));assert.ok(!cards[0].includes('원정대 전멸'));
});

test('action and render failures always release input locks and resume scheduling',async()=>{
 const code=source.split('\n').find(s=>s.startsWith('Rt=async function(fn){if(At)return;wt.unlock();'));
 const ctx={At:false,Tt:{busy:false},wt:{unlock(){}},Jt:0,clearTimeout(){},resetGestures(){},renderDock(){},localStorage:{setItem(){}},console:{error(){}},Xt(){},Yt(){throw Error('render');},me(){ctx.scheduled++;},scheduled:0,ut:()=>({classList:{add(){}}})};vm.createContext(ctx);vm.runInContext(code,ctx);
 await ctx.Rt(()=>{throw Error('action');});assert.equal(ctx.At,false);assert.equal(ctx.Tt.busy,false);assert.equal(ctx.scheduled,1);
 ctx.q={drain:()=>[{type:'UnitMoved'}]};ctx.$e=async()=>{};ctx.Tt.play=async()=>{throw Error('animation');};await ctx.Rt(()=>{});assert.equal(ctx.At,false);assert.equal(ctx.Tt.busy,false);assert.equal(ctx.scheduled,2);
});

test('source UI strings contain no corrupted control characters or replacement glyphs',()=>{
 for(const c of source){const n=c.charCodeAt(0);assert.ok(n>=32||[9,10,13].includes(n));assert.notEqual(n,0xfffd);}
});

test('elite and legendary maximum wounds, Fight and Defence survive round refreshes',()=>{
 const h=load(),q=h.q;q.start('hotseat');q.wave=5;q._routeChoice={...q.stageInfo(6),map:0,mission:'annihilation',modifier:'clear',ids:Array(8).fill('orc_sword')};q.prepareStage();q.rng=()=>0;q.startWave();
 const foes=q.alive('evil').filter(u=>u.elite||u.legendary);assert.ok(foes.some(u=>u.elite));assert.ok(foes.some(u=>u.legendary));
 for(let i=0;i<3;i++){for(const u of foes){const bonus=u.legendary?2:1;assert.equal(u.stats.fight,h.zt.orc_sword.fight+bonus);assert.equal(u.stats.defence,h.zt.orc_sword.defence+bonus);assert.equal(u.stats.wounds,h.zt.orc_sword.wounds+1);assert.ok(u.currentWounds<=u.stats.wounds);}q.beginRound();}
});

test('skill, trap and spell effects display production message text instead of blank labels',async()=>{
 const ctx={Ve:function(){},unitFxPlay:async()=>{},trapFxPlay:async()=>{},spellFxPlay:async()=>{}};vm.createContext(ctx);
 const node=()=>({setDepth(){return this;},setDisplaySize(){return this;},setAlpha(){return this;},setTint(){return this;},setOrigin(){return this;},destroy(){}}),labels=[],scene={b:{unit:()=>({x:100,y:100,radius:30})},add:{image:()=>node(),text:(x,y,text)=>{labels.push(text);return node();}},tween:async()=>{}};
 for(const [prefix,event,expected] of [["if(event.uid&&['Terror'",{type:'HeroSkill',uid:'u',message:'아라곤 · 검무'},'검무'],["if(event.type==='Trap'",{type:'Trap',at:{x:100,y:100,type:'oil'},message:'기름 · 적 둘'},'기름'],["if(event.type==='Spell'",{type:'Spell',uid:'u',message:'간달프 · 눈부신 빛'},'눈부신 빛']]){
  const code=source.split('\n').find(s=>s.startsWith('Ve.prototype.play=async function(event){'+prefix));assert.ok(code);vm.runInContext(code,ctx);await ctx.Ve.prototype.play.call(scene,event);assert.equal(labels.pop(),expected);
 }
});
