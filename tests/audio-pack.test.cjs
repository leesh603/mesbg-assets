const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {setup}=require('./audio-harness.cjs');const flush=()=>new Promise(r=>setImmediate(r));
test('initial army recruitment uses preparation music, while actual battle rewards use aftermath',async()=>{
 const {engine:e,context:c,source}=setup();const vm=require('node:vm');
 Object.assign(c,{wt:e,q:{phase:'reward',initialDraft:true,mapIndex:0,current:{}},CX:{maps:['minas_tirith']},visualMapIdx:()=>0,Vt:()=>false});
 const start=source.indexOf("    const nextFight=q.phase==='fight'"),end=source.indexOf('\n    const _sq=',start);assert(start>=0&&end>start);
 const route=()=>vm.runInContext('(function(){'+source.slice(start,end)+'})()',c);
 route();await e.unlock();await flush();assert.equal(e.music.dataset.ostTrack,'gondor');
 c.q.initialDraft=false;route();await flush();assert.equal(e.music.dataset.ostTrack,'aftermath');
});
test('seven scenes load lazily, music stays at natural speed and two transports suffice',async()=>{
 const {engine:e,context:c}=setup();e.setScene('preparation','edoras',false);assert.equal(e._slots.length,0);await e.unlock();await flush();assert.equal(e.music.dataset.ostTrack,'rohan');
 for(const [phase,map,boss,duel,track] of [['menu','',false,false,'main'],['preparation','minas_tirith',false,false,'gondor'],['preparation','black_gate',false,false,'mordor'],['move','',false,false,'battle'],['fight','',true,false,'heroes-bosses'],['fight','',false,true,'heroes-bosses'],['result','',false,false,'aftermath']]){e.setScene(phase,map,boss,duel);await flush();assert.equal(e.music.dataset.ostTrack,track);assert.equal(e.music.playbackRate,1);}
 assert.equal(e._slots.length,2);assert.equal(e.music.loop,false);e.music.ended=true;e.music.paused=true;e._syncMusic();assert.equal(e.music.paused,true);c.qt=8;e.setScene('fight','',false,false);await flush();assert.equal(e.music.playbackRate,1);
});
test('rapid music changes, failed Opus and mute/visibility cannot revive obsolete transports',async()=>{
 const {engine:e,context:c,state:s}=setup();await e.unlock();await flush();e.setScene('preparation','edoras',false);e.setScene('move','',false);await flush();assert.equal(e.music.dataset.ostTrack,'battle');e.setScene('preparation','black_gate',false);const slot=e._incoming;slot.audio.onerror();await flush();assert.match(e.music.src,/mordor\.mp3/);
 e.toggle();assert(e._slots.every(slot=>slot.audio.paused));e.toggle();await flush();c.document.hidden=true;e.visibilityChanged();assert(e._slots.every(slot=>slot.audio.paused));assert.equal(e.context.state,'suspended');c.document.hidden=false;e.visibilityChanged();await flush();assert.equal(e.context.state,'running');e.setVolumes(.5,0);assert(e._slots.every(slot=>slot.audio.paused));await e.play('ui_select');assert.equal(s.started.length,1);
});
test('all 30 recorded cues have normal and fast variants, with safe peaks and distinct files',()=>{
 const {context:c}=setup();const manifest=JSON.parse(fs.readFileSync(path.join(__dirname,'../docs/audio-foley-manifest.json')));assert.equal(Object.keys(c.effects).length,30);assert.equal(manifest.files.length,148);
 for(const item of manifest.files){assert(fs.existsSync(path.join(__dirname,'../assets/mesbg',item.file)));assert(item.peak<=.311);assert(item.rms>.001);assert(item.seconds>0&&item.seconds<=(item.source.startsWith('original OST')?2.2:.8));}for(const effect of Object.values(c.effects))assert.equal(effect.files.length,effect.fastFiles.length);
});
test('8x burst mixes related impacts as a group, budgets actual starts and favors meaningful UI cues',async()=>{
 const {engine:e,context:c,state:s}=setup();c.qt=8;await e.unlock();await flush();for(let i=0;i<80;i++){s.clock+=10;await Promise.all(['sword_flesh','sword_shield','sword_armor','dice_roll','base_slide','sword_swing'].map(id=>e.play(id)));}assert(s.started.length<=8);assert(e.voices.size<=4);assert(s.fetches.some(url=>url.includes('/fast/')));const before=s.started.length;s.clock+=100;await e.play('ui_confirm');assert(s.started.length>before,'UI can replace a low priority effect');assert(e.voices.size<=4);assert.equal(e.music.playbackRate,1);
});
test('one fetch per buffer and no delayed sound after mute or a speed change',async()=>{
 const {engine:e,state:s}=setup();await e.unlock();await flush();await Promise.all([e._buffer('same.wav'),e._buffer('same.wav')]);assert.equal(s.fetches.length,1);let release;e._buffer=()=>new Promise(r=>release=r);const delayed=e.play('heal');await flush();e.toggle();e.toggle();release({length:4410,numberOfChannels:1});await delayed;assert.equal(s.started.length,0);s.clock+=1000;const stale=e.play('sword_flesh');await flush();e.speedChanged();release({});await stale;assert.equal(s.started.length,0);s.clock+=1000;const late=e.play('sword_flesh');await flush();s.clock+=600;release({});await late;assert.equal(s.started.length,0);
});
test('normal-speed voices remain bounded, repeated effects vary and muting stops active sources',async()=>{
 const {engine:e,state:s,context:c}=setup();await e.unlock();await flush();await e.play('sword_flesh');const first=e.lastVariant.get('sword_flesh');s.clock+=300;await e.play('sword_flesh');assert.notEqual(first,e.lastVariant.get('sword_flesh'));for(let i=0;i<35;i++){s.clock+=400;await e.play(['sword_shield','heal','dice_roll','ui_confirm'][i%4]);assert(e.voices.size<=6);}e.toggle();assert.equal(e.voices.size,0);const before=s.started.length;s.clock+=1000;await e.play('sword_flesh');assert.equal(s.started.length,before);e.toggle();c.document.hidden=true;s.clock+=1000;await e.play('dice_roll');assert.equal(s.started.length,before);
});
test('decoded cache stays within 8 MiB and the WebKit/MP3 fallback honors the same mixer',async()=>{
 const {engine:e,context:c,AC,Audio}=setup();delete c.window.AudioContext;c.window.webkitAudioContext=AC;Audio.prototype.canPlayType=()=>'';
 await e.unlock();await flush();assert.match(e.music.src,/main\.mp3/);
 e.context.decodeAudioData=async()=>({length:1048576,numberOfChannels:2,duration:24});
 for(const name of ['large-a.wav','large-b.wav','large-c.wav'])await e._buffer(name);
 assert(e._decodedBytes<=8*1024*1024);assert.equal(e.buffers.size,1);assert(e.buffers.has('large-c.wav'));
});
test('music never uses a media element, so other apps keep playing and no media control appears',async()=>{
 const {engine:e,state:s}=setup();await e.unlock();await flush();assert.equal(e.music.dataset.ostTrack,'main');assert.equal(s.appended||0,0);assert.equal(s.music,1);assert.equal(e.music.paused,false);
 e._pauseMusic();assert.equal(e.music.paused,true);e._syncMusic();await flush();assert.equal(e.music.paused,false);assert.equal(s.music,2);
});
