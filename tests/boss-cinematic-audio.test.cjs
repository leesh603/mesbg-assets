const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('src/game.js','utf8');let starts=0,stops=0,fetches=0;
class Audio{constructor(){this.paused=true;}canPlayType(){return 'probably';}addEventListener(){}pause(){this.paused=true;}play(){this.paused=false;return Promise.resolve();}}
class AC{constructor(){this.state='running';this.currentTime=0;}resume(){this.state='running';return Promise.resolve();}suspend(){this.state='suspended';return Promise.resolve();}decodeAudioData(){return Promise.resolve({duration:4});}createBufferSource(){return{playbackRate:{},connect(){},disconnect(){},start(){starts++;},stop(){stops++;this.onended?.();}};}createGain(){return{gain:{},connect(){},disconnect(){}};}}
class Ve{};Ve.prototype.play=async()=>{};
const env={Audio,window:{AudioContext:AC,MESBG:{}},document:{hidden:false,body:{append(){}},getElementById:()=>null},performance:{now:()=>1000},console,setTimeout,clearTimeout,localStorage:{setItem(){}},fetch:async()=>{fetches++;return{ok:true,arrayBuffer:async()=>new ArrayBuffer(1)};},Ve,P:{prepareStage(){}},q:{},Tt:{},UX:{},qt:1,bossIntro(){},Ut:f=>f,esc:String,BOSS_TACTICS:{}};
vm.createContext(env);vm.runInContext(source.slice(source.indexOf('const Ye = '),source.indexOf('function be(Z, Y)'))+';this.Engine=We;const wt=this.engine=new We;',env);
vm.runInContext(source.slice(source.indexOf('/*__BOSS_CINEMATICS_BEGIN__*/'),source.indexOf('/*__BOSS_CINEMATICS_END__*/')),env);
(async()=>{const e=env.engine,c=env.window.MESBG.bossCinematics;
assert.deepEqual(Array.from({length:6},(_,i)=>c.framePosition(i)),['0% 0%','50% 0%','100% 0%','0% 100%','50% 100%','100% 100%']);assert.equal(c.configs.witchking_fellbeast.line,'No living man may hinder me!');
await e.unlock();const vol=e._effVol();e._cinematicDuck=.24;assert.equal(e._effVol(),vol*.24);e.setVolumes(.4,.6);assert.equal(e._effVol(),.6*.24);delete e._cinematicDuck;assert.equal(e._effVol(),.6);
for(const id of Object.keys(c.cues)){const handle=await e.cinematicCue(id);assert(handle);assert.equal(e.voices.size,1);handle.stop();handle.stop();assert.equal(e.voices.size,0);}
const before=starts;e.muted=true;assert.equal(await e.cinematicCue('boss_nazgul_shriek'),null);e.muted=false;e.sfxVolume=0;assert.equal(await e.cinematicCue('boss_nazgul_shriek'),null);e.sfxVolume=.7;env.document.hidden=true;assert.equal(await e.cinematicCue('boss_nazgul_shriek'),null);env.document.hidden=false;assert.equal(await e.cinematicCue('boss_nazgul_shriek',()=>true),null);assert.equal(starts,before);
let release,cancelled=false;e._buffer=()=>new Promise(r=>release=r);const pending=e.cinematicCue('boss_nazgul_shriek',()=>cancelled);await new Promise(r=>setImmediate(r));cancelled=true;release({});assert.equal(await pending,null);assert.equal(starts,before);
const metrics=JSON.parse(fs.readFileSync('assets/mesbg/audio/boss-cinematic-audio.json','utf8'));assert.equal(metrics.cues.length,4);
for(const c of metrics.cues){const w=fs.readFileSync('assets/mesbg/'+c.file);assert.equal(w.toString('ascii',0,4),'RIFF');assert.equal(w.readUInt32LE(24),22050);assert.equal(w.readUInt16LE(22),2);assert(c.peak<=.681);assert(c.rms>.04);assert(c.seconds>=1.5&&c.seconds<=6.5);}
console.log('Cinematic cues: four PCM assets, exact frame grid/quote, duck restoration, volume, mute/hidden, bounded cleanup and async cancellation passed');
})().catch(e=>{console.error(e);process.exitCode=1});
