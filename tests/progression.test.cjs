const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const load=require('./campaign-harness.cjs'),source=fs.readFileSync(process.env.MESBG_TEST_SOURCE||'src/game.js','utf8');
function field(){const h=load(),q=h.q;q.start('hotseat');q.units=[];q.events=[];q.terrain=[];q.phase='move';q.side=q.priority='good';q.mission='annihilation';q.current={modifier:'clear',ids:[],mission:'annihilation'};q.activeMoverUid='';return h;}
test('action lock releases after render error, missing dice and rejected async action',async()=>{
 const code=source.split('\n').find(s=>s.startsWith('Rt=async function(fn){if(At)return;wt.unlock();'));
 for(const fault of ['render','dice','action']){
  const node={classList:{add(){}}},ctx={At:false,Jt:0,Tt:{},wt:{unlock(){}},clearTimeout(){},resetGestures(){},renderDock(){if(fault==='render')throw Error('render');},q:{drain:()=>[]},ut:id=>fault==='dice'&&id==='dice'?null:node,console:{error(){}},localStorage:{setItem(){}},Xt(){},Yt(){},scheduled:0,me(){ctx.scheduled++;}};
  vm.createContext(ctx);vm.runInContext(code,ctx);await ctx.Rt(async()=>{if(fault==='action')throw Error('action');});assert.equal(ctx.At,false);assert.equal(ctx.Tt.busy,false);assert.equal(ctx.scheduled,1);
 }
});
test('enabled dock action reaches wait even when legacy button is disabled',()=>{
 const wait={disabled:true,onclick(){ctx.count++;},click(){if(!this.disabled)this.onclick();}},primary={disabled:false},ctx={At:false,Qt:false,q:{phase:'move',selected:'spent'},ut:id=>id==='wait'?wait:primary,actionableUnit:()=>({uid:'ready'}),renderDock(){},count:0};vm.createContext(ctx);
 vm.runInContext(source.split('\n').find(s=>s.startsWith("ut('dock-primary').onclick=()=>{if(At||Qt||ut('dock-primary').disabled)")),ctx);primary.onclick();assert.equal(ctx.q.selected,'ready');assert.equal(ctx.count,1);
});
test('one-phase auto handles an ordinary ally and completes its activation',()=>{
 const h=field(),q=h.q,u=q.spawn('warrior_minas_tirith','good',{x:500,y:500});q.spawn('orc_sword','evil',{x:1900,y:1300});h.run('AUTO=false;AUTO_STEP=true;');
 for(let n=0;n<8&&!u.acted;n++)h.He(q);assert.equal(u.acted,true);
});
test('production support adds one duel die and one own-strength strike',()=>{
 const h=field(),q=h.q,f=q.spawn('warrior_minas_tirith','good',{x:500,y:500}),e=q.spawn('orc_sword','evil',{x:500,y:576}),s=q.spawn('mt_spear','good',{x:500,y:424});
 e.currentWounds=e.stats.wounds=20;f.stats.strength=8;s.stats.strength=2;q._duelLosses=0;
 const r=h.Ue([f,e],[f,e,s],[],'good',()=>.99);assert.equal(r.diceResults.good.length,2);assert.equal(r.strikeResults.filter(v=>v.attacker===f.uid).length,1);assert.equal(r.strikeResults.filter(v=>v.attacker===s.uid).length,1);assert.equal(r.strikeResults.find(v=>v.attacker===s.uid).needed,h.oe(2,e.stats.defence));assert.ok(r.strikeResults.every(v=>v.target!==s.uid));
});
test('static structures retain zero attacks, reject movement and displacement',()=>{
 const h=field(),q=h.q,u=q.spawn('orc_sword','evil',{x:800,y:600}),a=q.spawn('warrior_minas_tirith','good',{x:724,y:600});u.static=u.lair=true;u.baseStats.attacks=0;q.refreshUnit(u);assert.equal(u.stats.attacks,0);q.side='evil';assert.equal(q.move(u.uid,{x:850,y:600}),false);assert.deepEqual({...h.De(u,[a],q.alive(),[],52).to},{x:800,y:600});
});
test('fear exhausting the priority side hands control to the enemy',()=>{
 const h=field(),q=h.q,u=q.spawn('warrior_minas_tirith','good',{x:500,y:500});q.spawn('nazgul_sword','evil',{x:700,y:500});u.baseStats.courage=1;q.priorityForce='good';q.rng=()=>0;q.beginRound();assert.equal(u.acted,true);assert.equal(q.side,'evil');assert.ok(q.eligible().length);
});
test('fellbeast dive emits valid animation endpoints',()=>{
 const h=field(),q=h.q,b=q.spawn('witchking_fellbeast','evil',{x:1400,y:1000});q.spawn('aragorn','good',{x:900,y:700});q.round=3;q.bossTurn(b);const e=q.events.find(e=>e.type==='UnitMoved');assert.ok(e);for(const p of [e.from,e.to])assert.ok(Number.isFinite(p.x)&&Number.isFinite(p.y));
});
test('boss phase bonus survives refresh and round reset; Glaurung breath fires on six',()=>{
 const h=field(),q=h.q,b=q.spawn('glaurung','evil',{x:850,y:700}),u=q.spawn('aragorn','good',{x:1100,y:700});q.round=6;u.resources.fate=0;q.rng=()=>0;b.currentWounds=Math.ceil(b.stats.wounds*.6);const before=b.stats.attacks;q.bossTurn(b);assert.equal(b.stats.attacks,before+1);q.refreshUnit(b);assert.equal(b.stats.attacks,before+1);assert.ok(q.events.some(e=>e.type==='BossCast'&&e.fx==='breath'));assert.ok(u.currentWounds<u.stats.wounds);
});
test('weather persists through buffs without compounding across refreshes',()=>{
 const h=field(),q=h.q,u=q.spawn('gondor_archer','good',{x:500,y:500});q.spawn('orc_sword','evil',{x:1900,y:1300});q.current.modifier='rain';q.refreshUnit(u);const range=u.stats.shootRange;u.roundBuff.defence=1;for(let n=0;n<3;n++)q.refreshUnit(u);assert.equal(u.stats.shootRange,range);assert.ok(range<u.baseStats.shootRange);
});
test('preparation resume preserves alternate route, terrain and placement',()=>{
 const h=load(),q=h.q;q.start('hotseat');const route={...q.stageInfo(2),map:3,mission:'hold'};q._routeChoice=route;q.prepareStage();q.alive('good')[0].x=900;q.save();const terrain=JSON.stringify(q.terrain);assert.equal(q.resume(),true);assert.equal(q.mission,'hold');assert.equal(q.mapIndex,3);assert.equal(q.alive('good')[0].x,900);assert.equal(JSON.stringify(q.terrain),terrain);assert.equal(q.next.map,3);
});
test('rear stance retreats rather than charging a reachable enemy',()=>{
 const h=field(),q=h.q,u=q.spawn('warrior_minas_tirith','good',{x:1000,y:700}),e=q.spawn('orc_sword','evil',{x:1180,y:700});u.stance='rear';h.run('AUTO=true;AUTO_STEP=false;');const before=Math.hypot(u.x-e.x,u.y-e.y);h.He(q);assert.equal(u.charged,false);assert.ok(Math.hypot(u.x-e.x,u.y-e.y)>before);
});
test('Eye zone applies courage and duel reroll only for its round',()=>{
 const h=field(),q=h.q,g=q.spawn('warrior_minas_tirith','good',{x:500,y:500}),e=q.spawn('orc_sword','evil',{x:680,y:500});q.round=2;q.rng=()=>0;q.beginRound();assert.equal(g.roundBuff.courage,-1);assert.equal(e._eyeReroll,true);
 let n=0;const r=h.Ue([g,e],[g,e],[],'good',()=>[.4,0,.99][n++]??0);assert.equal(r.winnerSide,'evil');q.beginRound();assert.equal(e._eyeReroll,false);assert.equal(q._eyeZone,null);
});
test('visible event option selects a preview without awarding it before confirm',()=>{
 const button={dataset:{evopt:'0'}},ctx={box:{querySelectorAll:()=>[button]},q:{selectCampChoice:key=>{ctx.key=key;},chooseEvent:()=>{ctx.awards++;return true;}},wt:{play(){}},Yt(){},Xt(){},awards:0};vm.createContext(ctx);
 vm.runInContext(source.split('\n').find(line=>line.includes("box.querySelectorAll('[data-evopt]').forEach")),ctx);button.onclick();assert.equal(ctx.key,'0');assert.equal(ctx.awards,0);
});
test('turn end forfeits every remaining friendly activation before enemy play',()=>{
 const h=field(),q=h.q;for(let n=0;n<3;n++)q.spawn('warrior_minas_tirith','good',{x:500+n*150,y:500});q.spawn('orc_sword','evil',{x:1700,y:1200});
 const button={classList:{contains:()=>true,remove(){}},textContent:''},ctx={q,At:false,Qt:false,ut:()=>button,clearTimeout(){},setTimeout(){},clearIntent(){},Rt:fn=>fn()};vm.createContext(ctx);const start=source.indexOf("const endB=ut('act-end');"),end=source.indexOf("    ut('act-ability').onclick",start);vm.runInContext(source.slice(start,end),ctx);button.onclick();assert.ok(q.alive('good').every(u=>u.acted));assert.equal(q.side,'evil');
});
test('failed token load releases its queue and allows a later successful retry',()=>{
 const {EventEmitter}=require('node:events'),events=new EventEmitter();let requests=0;const ctx={Ve:function(){},q:{meta:new Map([['token',{file:'tokens/token.png'}]])},console:{warn(){}}};vm.createContext(ctx);const start=source.indexOf('Ve.prototype._wantTex = function'),end=source.indexOf('Ve.prototype.drawMap = function',start);vm.runInContext(source.slice(start,end),ctx);
 const scene={_texQ:new Set(),asset:x=>x,load:{image(){requests++;},once:events.once.bind(events),on:events.on.bind(events),off:events.off.bind(events),start(){}},textures:{exists:()=>true},b:{units:[]},sync(){}};
 ctx.Ve.prototype._wantTex.call(scene,'token');events.emit('loaderror',{key:'token'});assert.equal(scene._texQ.has('token'),false);ctx.Ve.prototype._wantTex.call(scene,'token');assert.equal(requests,2);events.emit('filecomplete-image-token');assert.equal(scene._texQ.has('token'),false);assert.equal(events.listenerCount('loaderror'),0);
});
test('cloud restore passes both menu and camp loads through the action renderer',async()=>{
 for(const line of source.split('\n').filter(s=>s.includes("ut('cloud-load').onclick = async"))){
  const nodes={'cloud-load':{},'cloud-id':{value:'test'},'cloud-pw':{value:'test'},'cloud-msg':{}},ctx={ut:id=>nodes[id],LWB_API:'https://test.invalid',fetch:async()=>({ok:true,json:async()=>({data:{version:1}})}),localStorage:{setItem(){}},q:{importSave:()=>true},Xt(){},renders:0,Rt:async fn=>{fn();ctx.renders++;}};vm.createContext(ctx);vm.runInContext(line,ctx);await nodes['cloud-load'].onclick();assert.equal(ctx.renders,1);
 }
});
