const fs=require('node:fs'),h=require('../tests/campaign-harness.cjs')(),q=h.q;
const result={samplesPerCase:2000,melee:[],shooting:[],arrivals:[],relics:[]};
function setup(cleared=0){q.start('ai');q.units=[];q.terrain=[];q.relics={};q.fallen=[];q.cleared=cleared;q.wave=cleared;q.phase='preparation';}
for(const id of ['mt_swordshield','osgiliath_veteran'])for(const [xp,battles]of [[0,0],[12,2],[30,4],[66,8]]){
 setup();let a=q.spawn(id,'good',{x:1000,y:500}),b=q.spawn('uruk_swordshield','evil',{x:1075,y:500});a.xp=xp;a.battlesParticipated=battles;q.refreshUnit(a);q.refreshUnit(b);
 const left=structuredClone(a),right=structuredClone(b);let wins=0,wounds=0,deaths=0;const rng=h.Ne(191019);
 for(let i=0;i<2000;i++){a=structuredClone(left);b=structuredClone(right);q.units=[a,b];const r=h.Ue([a,b],q.units,[],i%2?'good':'evil',rng);wins+=r.winnerSide==='good';wounds+=r.wounds.filter(uid=>uid===b.uid).length;deaths+=r.kills.includes(a.uid);}
 result.melee.push({id,xp,battles,stats:left.stats,rank:q.troopTrainingRank?.(left)||0,winRate:wins/2000,woundsPerCombat:wounds/2000,deathRate:deaths/2000});
}
for(const battles of [0,8]){
 setup();const a=q.spawn('mt_bowman','good',{x:1000,y:500}),b=q.spawn('uruk_swordshield','evil',{x:1300,y:500});a.xp=battles?66:0;a.battlesParticipated=battles;q.refreshUnit(a);const rng=h.Ne(191019);let wounds=0;
 for(let i=0;i<2000;i++){a.stageShots=0;wounds+=h.run('Xe')(a,b,[],rng,q.units).wounds.length;}
 result.shooting.push({id:a.id,battles,rank:q.troopTrainingRank?.(a)||0,woundRate:wounds/2000});
}
setup();for(const id of ['elrond','glorfindel_foot','elf_swordshield','elf_spear','arwen']){const u=q.spawn(id,'good');q.alive('good').forEach(v=>q.refreshUnit(v));result.arrivals.push({id,current:u.currentWounds,max:u.stats.wounds});}
for(const cleared of [0,8,24]){setup(cleared);const u=q.spawn('mt_swordshield','good');result.arrivals.push({cleared,id:u.id,rank:q.troopTrainingRank?.(u)||0,stats:u.stats,xp:u.xp,battles:u.battlesParticipated});}
for(const wave of [1,4,5,10]){setup(wave);let legendary=0,rare=0;for(let i=0;i<2000;i++){q.wave=wave;q.rollRelics();for(const id of q.relicChoices){const r=h.CX.relics.find(r=>r.id===id);legendary+=r.rarity===3;rare+=r.rarity===2;}}result.relics.push({wave,menus:2000,legendary,rare});}
const output=process.argv[2]||'reports/warband-growth-20261019/after.json';fs.writeFileSync(output,JSON.stringify(result,null,2)+'\n');console.log(output);
