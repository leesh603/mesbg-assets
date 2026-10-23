const {test}=require('node:test'),assert=require('node:assert/strict');
const {setup}=require('./audio-harness.cjs'),regions=require('../src/world-art.js').REGIONS;
const flush=()=>new Promise(r=>setImmediate(r));
test('every registered region keeps its OST through preparation, movement, shooting and melee',async()=>{
 const {engine:e}=setup();await e.unlock();await flush();
 for(const key of Object.keys(regions)){
  e.setScene('preparation',key,false);await flush();const track=e.music.dataset.ostTrack;
  assert(['gondor','rohan','mordor'].includes(track),key);
  for(const phase of ['move','shoot','fight']){e.setScene(phase,key,false);await flush();assert.equal(e.music.dataset.ostTrack,track,key+' '+phase);assert.equal(e.music.playbackRate,1);}
 }
 e.setScene('fight','orthanc',false);await flush();assert.equal(e.music.dataset.ostTrack,'mordor');
 e.setScene('fight','edoras',true);await flush();assert.equal(e.music.dataset.ostTrack,'heroes-bosses');
 e.setScene('reward','edoras',false);await flush();assert.equal(e.music.dataset.ostTrack,'aftermath');
});
