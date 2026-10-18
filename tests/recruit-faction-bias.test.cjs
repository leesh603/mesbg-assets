const test=require('node:test'),assert=require('node:assert/strict');
const create=require('./campaign-harness.cjs');

function sampleRecruitment(withElvenLeaders){
    const {q,CX,UnitCatalog}=create();
    q.start('ai');
    q.units=[];
    q.initialDraft=false;
    q.phase='reward';
    q.campStep='recruit';
    q.wave=8;
    q.mapIndex=CX.maps.indexOf('edoras'); // Enemy territory used to force Rohan-only recruitment.
    if(withElvenLeaders){
        q.spawn('elrond','good',{x:900,y:600});
        q.spawn('glorfindel_foot','good',{x:1050,y:600});
        assert.equal(q.permanent().length,2);
    }
    const counts={elf:0,rohan:0,other:0};
    const elfFactions=new Set(['rivendell','elf','lothlorien','mirkwood','lindon']);
    for(let i=0;i<90;i++){
        q.rollRecruits();
        assert.equal(q.recruitOffers.length,6);
        for(const offer of q.recruitOffers.slice(2)){
            const faction=UnitCatalog[offer.id].meta.faction;
            const key=elfFactions.has(faction)?'elf':faction==='rohan'?'rohan':'other';
            counts[key]++;
        }
    }
    return counts;
}

test('Elrond and Glorfindel favor elf troops even on a Rohan map',()=>{
    const neutral=sampleRecruitment(false);
    const elves=sampleRecruitment(true);
    assert.ok(elves.elf>elves.rohan,JSON.stringify({neutral,elves}));
    assert.ok(elves.elf>neutral.elf,JSON.stringify({neutral,elves}));
    assert.ok(elves.other>0,'allied factions remain possible');
});

test('recruitment still offers four troop roles without forcing map-faction picks',()=>{
    const {q,CX,UnitCatalog}=create();q.start('ai');q.units=[];
    q.initialDraft=false;q.wave=8;q.mapIndex=CX.maps.indexOf('edoras');
    q.spawn('elrond','good',{x:900,y:600});
    q.spawn('glorfindel_foot','good',{x:1050,y:600});
    for(let n=0;n<20;n++){
        q.rollRecruits();
        const offers=q.recruitOffers.slice(2);
        assert.equal(offers.length,4);
        assert.equal(new Set(offers.map(o=>o.id)).size,4);
        assert.ok(offers.every(o=>UnitCatalog[o.id]?.recruitable));
    }
});
