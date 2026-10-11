const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('src/game.js','utf8');
const start=source.indexOf('// ---- Battle FX v1.39:'),end=source.indexOf('// ---- Off-screen unit markers',start);
assert.ok(start>=0&&end>start);
function setup(options={}){
 let now=0,frames=0;const objects=[],draws=[],sounds=[],positions=[];
 function node(){const data=new Map();const n={scene:true,x:0,y:0,rotation:0,scaleX:1,scaleY:1,alpha:1,visible:true,isTinted:false,tintTopLeft:1,tintTopRight:2,tintBottomLeft:3,tintBottomRight:4,
 setDepth(){return this;},setOrigin(){return this;},setAlpha(v){this.alpha=v;return this;},setScale(x,y=x){this.scaleX=x;this.scaleY=y;return this;},setPosition(x,y){this.x=x;this.y=y;positions.push([x,y]);return this;},setRotation(v){this.rotation=v;return this;},setVisible(v){this.visible=v;return this;},setData(k,v){data.set(k,v);return this;},getData:k=>data.get(k),setTint(...v){this.isTinted=true;[this.tintTopLeft,this.tintTopRight,this.tintBottomLeft,this.tintBottomRight]=v;return this;},clearTint(){this.isTinted=false;return this;},destroy(){this.scene=false;},clear(){return this;},fillStyle(c,a){this.color=c;return this;},fillRect(x,y,w,h){if(options.failDraw)throw Error('GPU draw failed');draws.push({x,y,w,h,color:this.color});return this;}};objects.push(n);return n;}
 class Ve{}
 const ctx={Ve,window:{_lwbFx:!!options.off},qt:options.speed||1,UX:{zoom:.7,reduced:!!options.reduced},performance:{now:()=>options.stalled?Date.now():now+=12},requestAnimationFrame:options.stalled?()=>7:cb=>{frames++;return setImmediate(cb);},cancelAnimationFrame:id=>{if(!options.stalled)clearImmediate(id);},setTimeout,clearTimeout};vm.createContext(ctx);vm.runInContext(source.slice(start,end),ctx);
 const a={uid:'a',id:'swordsman',side:'good',x:100,y:200,radius:36,traits:[]},b={uid:'b',id:'orc',side:'evil',x:230,y:220,radius:36,traits:[]},as=node(),bs=node(),ac=node().setPosition(a.x,a.y),bc=node().setPosition(b.x,b.y);ac.getByName=()=>as;bc.getByName=()=>bs;
 const scene=new Ve();Object.assign(scene,{b:{selected:'a',unit:id=>id==='a'?a:id==='b'?b:null,meta:new Map([['swordsman',{weapon:options.weapon||'sword'}]])},tokens:new Map([['a',ac],['b',bc]]),sys:{isActive:()=>!options.shutdown},add:{graphics:()=>node(),text:(x,y,t)=>Object.assign(node(),{x,y,text:t})},soundFX:{play:t=>sounds.push(t)}});
 const result={kind:options.kind||'fight',strikeResults:[{attacker:'a',target:'b',wound:true,killed:!!options.killed}],pushVectors:[],trappedUnits:[],knockedDownUnits:[]};
 return {ctx,scene,result,a,b,as,bs,ac,bc,objects,draws,sounds,positions,get frames(){return frames;}};
}
function clean(s){assert.ok(s.objects.slice(4).every(n=>!n.scene),'every temporary graphics/text node is destroyed');assert.equal(s.as.getData('fxLock'),undefined);assert.equal(s.bs.getData('fxLock'),undefined);assert.equal(s.as.alpha,1);assert.equal(s.bs.alpha,1);assert.equal(s.bs.isTinted,false);assert.deepEqual([s.ac.x,s.ac.y,s.bc.x,s.bc.y],[100,200,230,220]);}
test('weapon and spell renders complete, restore sprites and remove all temporary objects',async()=>{
 for(const weapon of ['sword','twohanded_axe','spear','claw','fang','hammer','staff','whip']){const s=setup({weapon});await s.scene.combat(s.result);assert.ok(s.draws.length>0,weapon);clean(s);}
 for(const fx of ['lightning','meteor','whip','dive','breath','crack','dominate']){const s=setup();await s.scene.battleFXEvent({type:'BossCast',uid:'b',fx,from:s.a,at:s.b});assert.ok(s.draws.length>0,fx);assert.ok(s.objects.slice(4).every(n=>!n.scene),fx);}
});
test('render exception restores position, tint and locks and propagates to the action wrapper',async()=>{
 const s=setup({failDraw:true});s.bs.setTint(11,12,13,14);await assert.rejects(s.scene.combat(s.result),/GPU draw failed/);assert.ok(s.objects.slice(4).every(n=>!n.scene));assert.equal(s.as.getData('fxLock'),undefined);assert.equal(s.bs.getData('fxLock'),undefined);assert.deepEqual([s.bs.tintTopLeft,s.bs.tintTopRight,s.bs.tintBottomLeft,s.bs.tintBottomRight],[11,12,13,14]);assert.deepEqual([s.ac.x,s.ac.y,s.bc.x,s.bc.y],[100,200,230,220]);
});
test('effects off and instant speed apply death/displacement without cosmetic nodes or waits',async()=>{
 for(const options of [{off:true},{speed:30}]){const s=setup({...options,killed:true});s.result.pushVectors=[{uid:'a',from:s.a,to:{x:140,y:200}}];await s.scene.combat(s.result);await s.scene.battleFXEvent({type:'Spell',uid:'a',targets:['b']});assert.equal(s.objects.length,4);assert.equal(s.frames,0);assert.equal(s.bc.visible,false);assert.deepEqual([s.ac.x,s.ac.y],[140,200]);assert.equal(s.as.getData('fxLock'),undefined);}
});
test('reduced motion does not lunge or recoil and does not displace static structures',async()=>{
 const s=setup({reduced:true});s.b.traits=['static'];s.result.pushVectors=[{uid:'b',to:{x:350,y:350}}];await s.scene.combat(s.result);clean(s);assert.ok(s.positions.every(p=>p[0]===100&&p[1]===200||p[0]===230&&p[1]===220||p[0]===0&&p[1]===0));
});
test('shutdown and suspended RAF both finish and release the presentation locks',async()=>{
 const stopped=setup({shutdown:true});await stopped.scene.combat(stopped.result);clean(stopped);
 const suspended=setup({stalled:true,speed:8});const before=Date.now();await suspended.scene.combat(suspended.result);assert.ok(Date.now()-before<950);clean(suspended);
});
test('all cosmetic events route once while casualty housekeeping still runs exactly once',async()=>{
 const s=setup(),seen=[];s.ctx.Ve.prototype.play=async function(e){seen.push('legacy:'+e.type);};
 const routeStart=source.indexOf('const pixelFXPlay='),routeEnd=source.indexOf('window.MESBG.ui.confirm=',routeStart);vm.runInContext(source.slice(routeStart,routeEnd),s.ctx);
 s.scene.battleFXEvent=async e=>{seen.push('pixel:'+e.type);};
 for(const type of ['Spell','HeroSkill','Trap','CommandUsed','BossCast'])await s.scene.play({type,uid:'a'});
 assert.equal(seen.length,5);assert.ok(seen.every(x=>x.startsWith('pixel:')));
 await s.scene.play({type:'UnitKilled',uid:'b'});assert.deepEqual(seen.slice(-2),['pixel:UnitKilled','legacy:UnitKilled']);assert.equal(s.scene._pixelBattleFX,false);
 s.scene.battleFXEvent=async()=>{throw Error('FX cancelled');};await assert.rejects(s.scene.play({type:'UnitKilled',uid:'b'}));assert.equal(s.scene._pixelBattleFX,false);
});
test('combat casualty is not animated twice when UnitKilled follows its strike result',async()=>{
 const s=setup({killed:true});await s.scene.combat(s.result);const count=s.objects.length;await s.scene.battleFXEvent({type:'UnitKilled',uid:'b'});assert.equal(s.objects.length,count);assert.equal(s.scene._fxCasualties.size,0);
});
test('an area boss impact uses each victim location and keeps the area fire material',async()=>{
 const s=setup();await s.scene.battleFXEvent({type:'BossImpact',uid:'b',at:{x:900,y:900,radius:150,fx:'meteor'},message:'보스의 일격'});
 assert.ok(s.draws.length>0);assert.ok(s.draws.every(p=>Math.hypot(p.x-s.b.x,p.y-s.b.y)<100));assert.ok(s.draws.some(p=>p.color===0xe99b48));assert.ok(s.objects.slice(4).every(n=>!n.scene));
});
