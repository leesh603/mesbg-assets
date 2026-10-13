const {test}=require('node:test'),assert=require('node:assert/strict');
const load=require('./campaign-harness.cjs');

test('event confirmation keeps the scene identity through save and resume without awarding twice',()=>{
 const h=load(),q=h.q;
 q.start('hotseat');q.phase='reward';q.campStep='event';
 q.campEvent=h.LWB_EVENTS.find(e=>e.id==='refugees');q.eventOutcome=null;
 const gold=q.gold;
 q.selectCampChoice('1');
 assert.equal(q.eventOutcome,null);assert.equal(q.gold,gold);
 assert.equal(q.confirmCampChoice(),true);
 assert.equal(q.gold,gold+10);assert.equal(q.eventOutcome.eventId,'refugees');
 const outcome=JSON.stringify(q.eventOutcome);
 q.save();q.eventOutcome=null;
 assert.equal(q.resume(),true);assert.equal(JSON.stringify(q.eventOutcome),outcome);
 assert.equal(q.chooseEvent(1),false);assert.equal(q.gold,gold+10);
});

test('legacy saved event outcomes remain usable when they have no scene identity',()=>{
 const h=load(),q=h.q;
 q.start('hotseat');q.phase='reward';q.campStep='event';q.campEvent=null;
 q.eventOutcome={title:'전조의 별',label:'기도를 올린다',result:'선택 완료',relics:[]};
 q.save();q.eventOutcome=null;
 assert.equal(q.resume(),true);assert.equal(q.eventOutcome.title,'전조의 별');
 assert.equal(q.campEvent,null);assert.equal(q.eventOutcome.eventId,undefined);
 assert.equal(h.run('eventIllustration(undefined, "전조의 별")'),'');
});
