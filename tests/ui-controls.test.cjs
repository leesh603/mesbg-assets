const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('src/game.js','utf8');
test('settings and dock speeds share the same value, persistence and animation rate',()=>{
 const ids=['speed','speed-toggle','speed-dock','speed-quick'],nodes=Object.fromEntries(ids.map(id=>[id,{value:'1',textContent:'1×'}])),store=new Map();
 const ctx={qt:1,ut:id=>nodes[id],localStorage:{setItem:(k,v)=>store.set(k,v)},window:{MESBG:{scene:{tweens:{},time:{}}}},scheduled:0,audioStops:0,wt:{speedChanged(){ctx.audioStops++;}},me(){ctx.scheduled++;}};
 nodes.speed.options=[1,2,3,4,8,30].map(n=>({value:String(n),text:''}));
 vm.createContext(ctx);const start=source.indexOf('function setPlaybackSpeed('),end=source.indexOf('\n}',start)+2;assert.ok(start>=0);
 vm.runInContext(source.slice(start,end),ctx);
 vm.runInContext(source.split('\n').find(s=>s.startsWith("ut('speed').onchange =")),ctx);
 vm.runInContext(source.split('\n').find(s=>s.trimStart().startsWith("ut('speed-toggle').onclick =")),ctx);
 vm.runInContext(source.split('\n').find(s=>s.startsWith("for (const option of ut('speed').options)")),ctx);
 assert.deepEqual(nodes.speed.options.map(o=>o.text),['속도 ×1','속도 ×2','속도 ×3','속도 ×4','속도 ×8','즉시 진행']);
 function expect(n,label){assert.equal(ctx.qt,n);assert.equal(nodes['speed'].value,String(n));assert.equal(nodes['speed-toggle'].textContent,label);assert.equal(nodes['speed-dock'].textContent,label);assert.equal(store.get('lwb_speed'),String(n));assert.equal(ctx.window.MESBG.scene.tweens.timeScale,n);assert.equal(ctx.window.MESBG.scene.time.timeScale,n);}
 nodes.speed.value='3';nodes.speed.onchange();expect(3,'3×');
 nodes['speed-toggle'].onclick();expect(4,'4×');
 nodes['speed-toggle'].onclick();expect(8,'8×');
 nodes.speed.value='30';nodes.speed.onchange();expect(30,'즉시');
 ctx.setPlaybackSpeed(store.get('lwb_speed'));expect(30,'즉시');
 nodes['speed-toggle'].onclick();expect(1,'1×');assert.equal(ctx.scheduled,5);assert.equal(ctx.audioStops,6);
});
