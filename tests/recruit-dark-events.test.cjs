const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const create=require('./campaign-harness.cjs');
function field(heroes=['elrond','glorfindel_foot']){
    const h=create(),q=h.q;q.start('ai');q.units=[];q.events=[];q.terrain=[];q.wave=12;q.initialDraft=false;q.phase='move';q.side=q.priority='good';q.round=4;
    q.current={ids:[],modifier:'clear',mission:'annihilation'};q.delayed=[];q.mission='annihilation';q.stageDeaths=0;q._brokenGood=false;
    heroes.forEach((id,i)=>q.spawn(id,'good',{x:850+i*180,y:500}));return h;
}
function powerful(){const h=field(),q=h.q;for(let i=0;i<18;i++)q.spawn('boromir','good',{x:600+(i%6)*150,y:200+Math.floor(i/6)*110});return h;}
const army=(h,id)=>h.run('recruitArmy('+JSON.stringify(id)+')');
const eventList=h=>h.run('DARK_EVENTS');
const results={seed:123,samplesPerStage:1000,recruitment:[],dark:[]};
test('full recruitment draws: 2,000 menus per hero combination, army size and map do not dominate',()=>{
    for(const [ids,expected] of [
        [['elrond','glorfindel_foot'],['rivendell']],
        [['elrond_mounted','glorfindel_mounted'],['rivendell']],
        [['theoden','eomer'],['rohan']],
        [['haldir','galadriel'],['lothlorien']],
        [['thranduil','tauriel'],['mirkwood']],
        [['elrond','theoden'],['rivendell','rohan']],
        [['imrahil','boromir'],['dol_amroth','gondor']]
    ]){
        const h=field(ids),q=h.q,counts={},roles={};q.mapIndex=h.run("CX.maps.indexOf('edoras')");let n=0;
        for(let k=0;k<2000;k++){
            q.rollRecruits();const offers=q.recruitOffers,unique=new Set();
            for(const o of offers){const d=h.UnitCatalog[o.id];assert.ok(d.enabled);assert.ok(q.wave>=(d.unlockWave||0));if(d.uniqueKey){assert.ok(!unique.has(d.uniqueKey));unique.add(d.uniqueKey);}if(!h.run('isHeroUnit('+JSON.stringify(o.id)+')')){const a=army(h,o.id);counts[a]=(counts[a]||0)+1;n++;}}
            assert.equal(new Set(offers.map(o=>o.id)).size,offers.length);
            const troops=offers.filter(o=>!h.run('isHeroUnit('+JSON.stringify(o.id)+')'));
            for(const o of troops){const p=h.zt[o.id],r=p.traits.includes('mounted')?'cavalry':p.shootRange?'archer':p.traits.includes('spear')?'support':'infantry';roles[r]=1;}
        }
        for(const a of expected)assert.ok(Math.abs((counts[a]||0)/n-.70/expected.length)<.055,JSON.stringify({ids,counts,n}));
        assert.equal(Object.keys(roles).length,4);
        results.recruitment.push({heroes:ids,menus:2000,offers:n,factions:counts});
    }
});
test('soldiers influence secondary mass, no catalog-size weighting, unlocks and unique identities remain enforced',()=>{
    const h=field(),q=h.q;q.wave=1;q.relics={};q.spawn('theoden','good',{x:1000,y:600});
    for(let i=0;i<1000;i++){q.rollRecruits();for(const o of q.recruitOffers){const d=h.UnitCatalog[o.id];assert.ok(q.wave>=(d.unlockWave||0));assert.equal(d.meta.side,'good');assert.equal(q.troopGateReason(o.id),'');assert.ok(!['elrond','glorfindel','theoden'].includes(d.uniqueKey));assert.ok(!d.evolutionOnly);}}
    q.wave=12;const pool=Object.values(h.UnitCatalog).filter(d=>d.recruitable&&!d.uniqueKey),before=q.recruitFactionWeights(pool);
    for(let i=0;i<12;i++)q.spawn('mt_swordshield','good',{x:800,y:700});const after=q.recruitFactionWeights(pool);
    assert.ok(after.gondor>before.gondor);assert.equal(after.rivendell,before.rivendell);
    assert.deepEqual(JSON.parse(JSON.stringify(q.recruitFactionWeights(pool.concat(pool.filter(d=>army(h,d.id)==='rohan'))))),JSON.parse(JSON.stringify(after)));
    assert.equal(army(h,'legolas'),'mirkwood');assert.equal(army(h,'imrahil_mounted'),'dol_amroth');assert.equal(army(h,'cirdan_mounted'),'rivendell');
    assert.equal(army(h,'noldor_warrior'),'first_age');assert.equal(army(h,'fingolfin_mounted'),'first_age');
});
test('all 70 stages × 1,000 draws: hard progress floor, all existing late threats reachable',()=>{
    const h=powerful(),q=h.q,events=eventList(h),seen=new Set();
    assert.equal(events.length,11);assert.ok(!events.some(e=>e.ids.some(id=>['balrog','ungoliant'].includes(id))));
    for(let wave=1;wave<=70;wave++){
        q.wave=wave;q.darkHistory=[];const counts={};
        for(let i=0;i<1000;i++){
            const e=q.rollDarkEvent();assert.ok(e,'wave '+wave);assert.ok(q.runProgress()>=e.min,e.id+' wave '+wave);
            if(q.runProgress()<70)assert.ok(!e.ids.includes('carcharoth'));counts[e.id]=(counts[e.id]||0)+1;seen.add(e.id);
        }
        results.dark.push({wave,progress:q.runProgress(),draws:1000,counts});
    }
    for(const e of events)assert.ok(seen.has(e.id),e.id);
    for(const e of events.filter(e=>e.min>0)){q.wave=Math.max(1,Math.ceil(e.min*69/100));q.darkHistory=[];assert.equal(q.queueDarkEvent(e.id),false,'before minimum '+e.id);q._darkEvent=false;}
});
test('warning precedes real collision-safe arrival; direct and queued entry both recheck minimum',()=>{
    const h=powerful(),q=h.q;q.wave=52;q.round=4;
    assert.equal(q.queueDarkEvent('red_maw'),true);assert.equal(q.alive('evil').length,0);
    assert.equal(q.arriveDarkEvent(),false);q.round++;assert.equal(q.arriveDarkEvent(),true);
    const foe=q.alive('evil')[0];assert.equal(foe.id,'carcharoth');assert.equal(foe._darkInfil,true);assert.equal(q.darkHistory.length,1);
    assert.equal(q.delayed.length,0);assert.ok(q.alive('good').every(u=>Math.hypot(u.x-foe.x,u.y-foe.y)>u.radius+foe.radius+220));
    foe.alive=false;const gold=q.gold;assert.equal(q.rewardDarkEvent(),true);assert.equal(q.gold-gold,110);assert.equal(q.rewardDarkEvent(),false);
    q._darkEvent=false;q.darkPending={id:'red_maw',wave:20,round:5,flank:'west',attempts:0};q.wave=20;assert.equal(q.arriveDarkEvent(),false);assert.equal(q.darkPending,null);
});
test('force, wounds, casualties, named repeats, boss overlap and consecutive major threats suppress events',()=>{
    const h=powerful(),q=h.q;q.wave=65;
    assert.equal(q.darkEventEligible('smaug_descent'),true);
    q.darkHistory=[{id:'red_maw',tier:4,wave:64}];assert.equal(q.darkEventEligible('smaug_descent'),false);
    q.darkHistory=[{id:'red_maw',tier:4,wave:50}];assert.equal(q.darkEventEligible('red_maw'),false);
    q.darkHistory=[];q.current.boss='sauron';assert.equal(q.darkEventPool().length,0);q.current.boss=null;
    q.stageDeaths=1;assert.equal(q.darkEventPool().length,0);q.stageDeaths=0;
    q.alive('good').forEach(u=>u.currentWounds=1);assert.equal(q.darkEventPool().length,0);
    const weak=field();weak.q.wave=65;assert.equal(weak.q.darkEventEligible('smaug_descent'),false);
    const overlap=powerful();overlap.q.wave=65;overlap.q.current.ids=['smaug'];assert.equal(overlap.q.darkEventEligible('smaug_descent'),false);
});
test('blocked placement never feeds an untagged monster into delayed spawns',()=>{
    const h=powerful(),q=h.q;q.wave=52;assert.equal(q.queueDarkEvent('red_maw'),true);q.round=5;
    q.terrain=[{x:1165,y:728,w:3000,h:2000,kind:'block',active:true}];assert.equal(q.arriveDarkEvent(),false);q.round++;assert.equal(q.arriveDarkEvent(),false);
    assert.equal(q.darkPending,null);assert.equal(q.alive('evil').length,0);assert.equal(q.delayed.length,0);assert.equal(q.darkHistory.length,0);
});
test('production beginRound schedules a warning then spawns next round; stage transition resets the spent flag',()=>{
    const h=field(),q=h.q;q.wave=12;q.round=3;q.rng=()=>0;q.current.ids=['orc_sword'];q.spawn('orc_sword','evil',{x:1200,y:1300});
    q.beginRound();assert.equal(q.round,4);assert.equal(q.darkPending?.id,'warg_scouts');assert.equal(q.alive('evil').some(u=>u._darkInfil),false);
    q.beginRound();assert.equal(q.round,5);assert.equal(q.alive('evil').filter(u=>u._darkInfil).length,3);assert.equal(q.darkHistory.length,1);
    q.phase='preparation';q.pointLimit=Math.max(300,q.rosterPoints());q.next={n:13,ids:['orc_sword'],modifier:'clear',mission:'annihilation'};q.startWave();assert.equal(q._darkEvent,false);assert.equal(q.darkActive,null);assert.equal(q.darkHistory.length,1);
});
test('old/new saves, retries and fresh starts preserve or reset only the intended history',()=>{
    const h=field(),q=h.q;q.phase='preparation';q.darkHistory=[{id:'warg_scouts',tier:1,wave:4}];q.recruitHistory=['elf_bow'];
    assert.equal(q.save(),true);q.darkHistory=[];q.recruitHistory=[];assert.equal(q.resume(),true);assert.equal(q.darkHistory.length,1);assert.equal(q.recruitHistory[0],'elf_bow');
    const s=q._saveState();delete s.darkHistory;delete s.recruitHistory;h.store.set('mesbg-endless-save',JSON.stringify(s));assert.equal(q.resume(),true);assert.equal(q.darkHistory.length,0);assert.equal(q.recruitHistory.length,0);
    q.start('ai');assert.equal(q.darkHistory.length,0);assert.equal(q._darkEvent,false);
});
test('1,000 full scheduler histories respect once-per-wave, cooldowns and named rarity',()=>{
    const h=powerful(),q=h.q;let arrivals=0;
    for(let run=0;run<1000;run++){
        q.darkHistory=[];
        for(let wave=1;wave<=70;wave++){
            q.wave=wave;q._darkEvent=false;q.darkPending=null;q.darkActive=null;q.units=q.units.filter(u=>u.side==='good');
            for(let round=4;round<=8;round++){q.round=round;q.processDarkEvents();}
            for(const u of q.alive('evil'))u.alive=false;
        }
        const names=new Set();let prev=null;
        for(const entry of q.darkHistory){const e=eventList(h).find(e=>e.id===entry.id);if(e.named){assert.ok(!names.has(e.id));names.add(e.id);}assert.ok(!prev||entry.wave-prev.wave>=2);if(prev?.tier>=4&&entry.tier>=4)assert.ok(entry.wave-prev.wave>=4);prev=entry;arrivals++;}
    }
    assert.ok(arrivals>1000);results.schedulerArrivals=arrivals;
    fs.mkdirSync('reports/recruit-dark-events-20261018',{recursive:true});fs.writeFileSync('reports/recruit-dark-events-20261018/simulation.json',JSON.stringify(results,null,2)+'\n');
});
