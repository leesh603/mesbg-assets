const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const {setup}=require('./audio-harness.cjs');const {state,context:env,engine:e,source}=setup();
class Ve{};Ve.prototype.play=async()=>{};
Object.assign(env,{Ve,P:{prepareStage(){}},q:{},Tt:{},UX:{},bossIntro(){},Ut:file=>file,esc:String,BOSS_TACTICS:{}});env.window.MESBG={};env.engine=e;
vm.runInContext('const wt=this.engine;',env);vm.runInContext(source.slice(source.indexOf('/*__BOSS_CINEMATICS_BEGIN__*/'),source.indexOf('/*__BOSS_CINEMATICS_END__*/')),env);
(async()=>{const c=env.window.MESBG.bossCinematics;await e.unlock();
assert.equal(c.configs.witchking_fellbeast.line,'No living man may hinder me!');const volume=e._effVol();e._cinematicDuck=.24;e._applyMusicVolume();assert.equal(e._musicBus.gain.value,volume*.24);delete e._cinematicDuck;e._applyMusicVolume();assert.equal(e._musicBus.gain.value,volume);
for(const id of Object.keys(c.cues)){const handle=await e.cinematicCue(id);assert(handle);assert.equal(e.voices.size,1);handle.stop();handle.stop();assert.equal(e.voices.size,0);}
const before=state.started.length;e.muted=true;assert.equal(await e.cinematicCue('boss_nazgul_shriek'),null);e.muted=false;env.document.hidden=true;assert.equal(await e.cinematicCue('boss_nazgul_shriek'),null);env.document.hidden=false;assert.equal(await e.cinematicCue('boss_nazgul_shriek',()=>true),null);assert.equal(state.started.length,before);
let release,cancelled=false;e._buffer=()=>new Promise(r=>release=r);const pending=e.cinematicCue('boss_nazgul_shriek',()=>cancelled);await new Promise(r=>setImmediate(r));cancelled=true;release({});await pending;assert.equal(state.started.length,before);
cancelled=false;const stale=e.cinematicCue('boss_nazgul_shriek');await new Promise(r=>setImmediate(r));e.toggle();e.toggle();release({});await stale;assert.equal(state.started.length,before);
const metrics=JSON.parse(fs.readFileSync('assets/mesbg/audio/boss-cinematic-audio.json'));assert.equal(metrics.recordedFoley,true);assert.equal(metrics.cues.length,4);for(const cue of metrics.cues){const w=fs.readFileSync('assets/mesbg/'+cue.file);assert.equal(w.toString('ascii',0,4),'RIFF');assert.equal(w.readUInt32LE(24),22050);assert.equal(w.readUInt16LE(22),2);assert(cue.peak<=.28);assert(cue.rms>.005);assert.equal(cue.license,'CC0-1.0');}
console.log('Four recorded cinematic cues: soft peaks, shared bus, duck restore, double-stop cleanup, mute/hidden/cancel and stale load suppression passed');
})().catch(error=>{console.error(error);process.exitCode=1});
