const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const root=path.join(__dirname,'..'),code=fs.readFileSync(path.join(root,'src/game.js'),'utf8');
const block=code.slice(code.indexOf('const Ye = '),code.indexOf('function be(Z, Y)'));
let clock=100,fetches=0,resolveFetch,started=0;
class Audio{constructor(){this.paused=true;this.volume=0;}canPlayType(){return 'probably';}addEventListener(){}pause(){this.paused=true;}play(){this.paused=false;return Promise.resolve();}}
class AC{constructor(){this.state='running';}resume(){this.state='running';return Promise.resolve();}suspend(){this.state='suspended';return Promise.resolve();}decodeAudioData(){return Promise.resolve({duration:.5});}createBufferSource(){return{playbackRate:{},connect(){},disconnect(){},start(){started++;},stop(){this.onended?.();}};}createGain(){return{gain:{},connect(){},disconnect(){}};}}
const env={Audio,window:{AudioContext:AC},document:{hidden:false,body:{append(){}},getElementById(){return null;}},performance:{now:()=>clock},console,localStorage:{setItem(){}},fetch:async()=>{fetches++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(1)};}};
vm.createContext(env);vm.runInContext(block+';this.Engine=We;this.effects=Ye;',env);
(async()=>{const e=new env.Engine();e.asset=f=>'./assets/mesbg/'+f;await e.unlock();
assert.equal(e.music.loop,true);assert.match(e.music.src,/gate-of-the-west\.ogg/);
for(const [m,n] of [[0,'lwb-camp'],[1,'lwb-battle'],[2,'lwb-boss'],[3,'gate-of-the-west']]){e.setMood(m);assert.match(e.music.src,new RegExp(n));assert.equal(e.music.playbackRate,1);assert.equal(e.music.paused,false);}
e.setVolumes(.6,0);assert.equal(e.music.paused,true);e.setVolumes(.6,.3);assert.equal(e.music.paused,false);
assert.equal(Object.keys(env.effects).length,30);let count=0;
for(const [id,x]of Object.entries(env.effects)){for(const f of x.files){assert.ok(fs.existsSync(path.join(root,'assets/mesbg',f)),f);count++;}clock+=150;await e.play(id);}
assert.equal(count,74);assert.ok(started>=30);assert.ok(e.voices.size<=12);
clock+=150;await e.play('sword_swing');const first=e.lastVariant.get('sword_swing');clock+=150;await e.play('sword_swing');assert.notEqual(first,e.lastVariant.get('sword_swing'));
const before=fetches;await Promise.all([e._buffer('audio/test.wav'),e._buffer('audio/test.wav')]);assert.equal(fetches-before,1);
e.toggle();assert.equal(e.muted,true);assert.equal(e.music.paused,true);assert.equal(e.voices.size,0);const s=started;clock+=150;await e.play('cast');assert.equal(started,s);
e.toggle();await e.unlock();env.document.hidden=true;clock+=150;await e.play('cast');assert.equal(started,s);
env.document.hidden=false;e._buffer=()=>new Promise(r=>resolveFetch=r);clock+=150;const delayed=e.play('heal');await new Promise(r=>setImmediate(r));e.toggle();resolveFetch({});await delayed;assert.equal(started,s);
console.log('Audio pack: 30 cues, 74 files, mood transitions, cache deduplication, variants, volume/mute/hidden and async mute race passed');
})().catch(e=>{console.error(e);process.exit(1)});
