// Reproducible catalogue metadata and build input. Existing art is never overwritten.
const fs=require('fs'),path=require('path');
const create=require('../tests/campaign-harness.cjs');const h=create();
const data=JSON.parse(fs.readFileSync('data/troop-promotions.json','utf8'));
const previousDefs=new Map((fs.existsSync('data/troop-new-units.json')?JSON.parse(fs.readFileSync('data/troop-new-units.json')):[]).map(d=>[d.id,d]));
const rows=[
 ['citadel_guard_bow','성채근위 궁병','Citadel Guard with longbow','gondor','bow','citadel_guard',10,'official',{fight:4,defence:5,shootValue:4,shootRange:850,traits:['bodyguard']}],
 ['osgiliath_spearshield','오스길리아스 베테랑 창방','Osgiliath Veteran with spear and shield','gondor','spear_shield','osgiliath_veteran',11,'official',{traits:['veteran','spear']}],
 ['osgiliath_bow','오스길리아스 베테랑 궁병','Osgiliath Veteran with bow','gondor','bow','osgiliath_veteran',10,'official',{defence:5,shootValue:4,shootRange:800,traits:['veteran']}],
 ['dol_amroth_swordshield','돌 암로스 검방병','Dol Amroth levy swordsman','dol_amroth','sword_shield','dol_amroth_man_at_arms',8,'custom',{fight:3,defence:5,traits:['shieldwall']}],
 ['dol_amroth_knight_foot','돌 암로스 백조기사 도보','Knight of Dol Amroth on foot','dol_amroth','sword_shield','dol_amroth_knight',12,'official',{move:270,fight:4,defence:7,traits:['bodyguard','shieldwall']}],
 ['rohan_helmingas','헬밍가 전사','Helmingas','rohan','axe','rohan_swordshield',9,'legacy',{strength:4,defence:5,traits:['steadfast']}],
 ['rohan_redshield','웨스트폴드 적색방패 기병','Westfold Redshield','rohan','spear','rohan_rider',17,'legacy',{fight:4,traits:['mounted','spear','steadfast']}],
 ['ironhills_warrior','철산 매톡 전사','Iron Hills Warrior with mattock','iron_hills','twohanded','dwarf_2haxe',12,'official',{move:240,fight:4,strength:4,defence:6,courage:5,traits:['dwarf','mountain','twohanded']}],
 ['ironhills_spearshield','철산 창방병','Iron Hills Warrior with spear and shield','iron_hills','spear_shield','dwarf_axeshield',13,'official',{move:240,fight:4,strength:4,defence:7,courage:5,traits:['dwarf','mountain','spear','shieldwall']}],
 ['ironhills_crossbow','철산 석궁병','Iron Hills Warrior with crossbow','iron_hills','crossbow','dwarf_ranger',14,'official',{move:240,fight:4,strength:4,defence:6,courage:5,shootValue:4,shootRange:900,traits:['dwarf','mountain','crossbow']}],
 ['galadhrim_bow','갈라드림 궁수','Galadhrim Warrior with Elf bow','lothlorien','bow','galadhrim_warrior',10,'official',{shootValue:3,shootRange:830,traits:['elf']}],
 ['galadhrim_elite_bow','갈라드림 정예 궁병','Galadhrim veteran bowguard','lothlorien','bow','galadhrim_warrior',13,'custom',{fight:5,defence:6,shootValue:3,shootRange:880,traits:['elf','bodyguard','sharpshooter']}],
 ['mirkwood_ranger','미르크우드 레인저','Mirkwood Ranger','mirkwood','bow','silvan_archer',14,'official',{move:290,fight:5,defence:3,shootValue:3,shootRange:830,traits:['elf','woodland','dagger']}],
 ['arnor_knight','아르노르 기사','Knight of Arnor','arnor','lance','arnor_warrior',18,'official',{move:430,fight:4,defence:6,traits:['mounted','lance','steadfast']}],
 ['arnor_ranger','아르노르 레인저','Ranger of Arnor','arnor','bow','arnor_archer',9,'official',{move:280,fight:4,defence:4,shootValue:3,shootRange:830,traits:['woodland']}],
 ['morannon_swordshield','모라논 오크 검방','Morannon Orc with sword and shield','mordor','sword_shield','morannon_orc',9,'official',{traits:['shieldwall']}],
 ['orc_elite_tracker','오크 정예 추적궁병','Veteran Orc Tracker','mordor','bow','orc_archer',8,'custom',{move:265,fight:3,strength:3,defence:4,shootValue:4,shootRange:800,traits:['woodland','sharpshooter']}],
 ['dale_guard','데일 기리온 근위병','Guard of Girion','dale','sword_shield','dale_warrior',10,'official',{fight:4,defence:6,courage:4,traits:['shieldwall','steadfast']}]
];
const defs=rows.map(([id,ko,en,faction,weapon,basis,points,origin,changes])=>{
 const base=h.UnitCatalog[basis],profile={...structuredClone(base.profile),...changes};
 // Foot variants cannot inherit cavalry resources or hero traits from their reference.
 profile.might=profile.will=profile.fate=0;
 const mounted=profile.traits.includes('mounted'),dwarf=faction==='iron_hills',orc=faction==='mordor';
 return {id,basis,origin,points,recruitCost:Math.max(20,Math.round(points*.8/5)*5),recruitable:true,enabled:true,unlockWave:origin==='custom'?4:0,rarity:origin==='custom'?'elite':'normal',meta:{id,name_ko:ko,name_en:en,side:base.meta.side,faction,role:mounted?'cavalry':'infantry',weapon,base:mounted?'XL':'M',baseMm:mounted?40:25,file:'tokens/'+id+'.png',sheet:'troop-promotions-20261014',visualRadius:mounted?62:38},profile,artProfile:[dwarf?'dwarf':orc?'orc':'human',.12,.9,.5,.51,mounted?43:dwarf?68:orc?76:86,mounted?'rider':'body']};
});
for(const d of defs){const previous=previousDefs.get(d.id);if(previous?.artAudit){d.artProfile=previous.artProfile;d.artAudit=previous.artAudit;}}
fs.writeFileSync('data/troop-new-units.json',JSON.stringify(defs,null,2)+'\n');
const catalog=JSON.parse(fs.readFileSync('units.json','utf8'));
for(const def of defs)if(!catalog.units.some(u=>u.id===def.id))catalog.units.push({id:def.id,name_ko:def.meta.name_ko,name_en:def.meta.name_en,side:def.meta.side,faction:def.meta.faction,role:def.meta.role,weapon:def.meta.weapon,base:def.meta.base,file:def.meta.file,sheet:def.meta.sheet,points:def.points,pointSource:'custom-estimate-unverified-2024',troopOrigin:def.origin});
const groups=new Map(Object.entries(data.groups).flatMap(([group,ids])=>ids.map(id=>[id,group])));
for(const u of catalog.units){const id=data.aliases[u.id]||u.id,group=groups.get(id),runtime=h.UnitCatalog[u.id];if(runtime){u.points=runtime.points;if(runtime.profile.traits.includes('hero'))u.role='hero';}
 if(group){u.troopPromotion={group,aliasOf:data.aliases[u.id]||null,targets:data.edges.find(e=>e.from===id)?.to||[],gate:data.gates[id]||null};if(['rivendell','lothlorien','mirkwood','iron_hills','dol_amroth','dale','umbar'].includes(group))u.faction=group;}
 if(u.id==='orc_tracker')u.weapon='bow';
}
catalog.count=catalog.units.length;fs.writeFileSync('units.json',JSON.stringify(catalog,null,2)+'\n');
const db=fs.readFileSync('db-data.js','utf8');if(!db.includes('/*__TROOP_DB__*/'))fs.appendFileSync('db-data.js','\n/*__TROOP_DB__*/\nmodule.exports.push({sheet:"troop-promotions-20261014",units:'+JSON.stringify(defs.map(d=>[d.id,d.meta.name_ko,d.meta.name_en,{side:d.meta.side,faction:d.meta.faction,role:d.meta.role,weapon:d.meta.weapon,base:d.meta.base,troopOrigin:d.origin,points:d.points}]))+'});\n');
let src=fs.readFileSync('src/game.js','utf8');
// Exact old rank blocks are removed from both legacy and endless paths.
for(const variable of ['b','k']){
 const quote=variable==='b'?'"':"'";
 const start='        if (!'+variable+'.traits.includes('+quote+'hero'+quote+') && !'+variable+'.traits.includes('+quote+'veteran'+quote+') && ('+variable+'.veteranXP || 0) >= 6) {';
 const a=src.indexOf(start);if(a<0)continue;
 const second=src.indexOf('        if (!'+variable+'.traits.includes('+quote+'hero'+quote+') && '+variable+'.traits.includes('+quote+'veteran'+quote+') && !'+variable+'.traits.includes('+quote+'champion'+quote+')',a);
 const end=src.indexOf('\n        }',second)+10;if(second<a||end<second)throw Error('Old rank block boundary');src=src.slice(0,a)+'        // Troop promotions are chosen after combat; no automatic stat stacking.\n'+src.slice(end);
}
const marker='/*__TROOP_PROMOTIONS_BEGIN__*/';if(!src.includes(marker))src=src.replace('/*__WARBAND_POINTS_END__*/','/*__WARBAND_POINTS_END__*/\n'+marker+'\n/*__TROOP_PROMOTIONS_END__*/');
fs.writeFileSync('src/game.js',src);
console.log('Prepared',defs.length,'new troop definitions and',catalog.count,'classified unit rows');
