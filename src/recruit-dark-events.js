// Recruitment and dark incursions. Embedded after troop careers by tools/build.js.
// Canonical recruitment armies preserve real affiliations; aliases only join duplicate labels.
const RECRUIT_ARMY_ALIASES={minastirith:'gondor',elf:'rivendell',dwarf:'khazad_dum',erebor:'khazad_dum',hobbit:'shire',rhun:'easterling',fangorn:'ent',isengard_orcs:'isengard',mordor_numenoreans:'mordor',far_harad:'harad'};
const RECRUIT_HERO_ARMIES={
    rivendell:'elrond glorfindel arwen elladan elrohir lindir erestor gildor gil_galad cirdan',
    lothlorien:'galadriel celeborn haldir rumil orophin',
    mirkwood:'legolas thranduil tauriel mirkwood_captain',
    dol_amroth:'imrahil',dale:'bard',numenor:'elendil isildur anarion elendur arpharazon numenorean_captain',
    iron_hills:'dain iron_hills_captain nain',
    first_age:'fingolfin feanor turgon fingon ecthelion maedhros finrod_felagund celegorm tuor hurin_thalion thingol luthien beren turin beleg huan mablung_sindar melian azaghal maglor gwindor celebrimbor daeron huor barahir earendil maeglin eol galdor'
};
const recruitArmyByHero=new Map(Object.entries(RECRUIT_HERO_ARMIES).flatMap(([army,ids])=>ids.split(' ').map(id=>[id,army])));
function recruitArmy(id){
    const d=UnitCatalog[id];if(!d)return '';
    const key=(d.uniqueKey||id).replace(/(_(foot_mace|mounted_sheet|mounted|foot|fellbeast|dismounted|sheet))+$/,'');
    const faction=!isHeroUnit(id)&&d.career?.group||d.meta.faction;
    return (isHeroUnit(id)&&recruitArmyByHero.get(key))||RECRUIT_ARMY_ALIASES[faction]||faction;
}
function weightedRecruitPick(rows,weight,rng){
    const weights=rows.map(r=>Math.max(0,weight(r))),sum=weights.reduce((a,b)=>a+b,0);
    if(!sum)return null;
    let n=rng()*sum;for(let i=0;i<rows.length;i++){n-=weights[i];if(n<0)return rows[i];}
    return rows[rows.length-1];
}
P.recruitFactionWeights=function(pool){
    const armies=[...new Set(pool.map(d=>recruitArmy(d.id)))],heroes={},soldiers={};
    const seen=new Set();
    for(const u of this.permanent()){
        const army=recruitArmy(u.id);if(!armies.includes(army))continue;
        if(isHeroUnit(u.id)){
            const key=UnitCatalog[u.id]?.uniqueKey||u.id;if(seen.has(key))continue;seen.add(key);
            heroes[army]=(heroes[army]||0)+1;
        }else soldiers[army]=(soldiers[army]||0)+1;
    }
    const total=Object.values(heroes).reduce((a,b)=>a+b,0),other=armies.filter(a=>!heroes[a]);
    const local=(FACTION_BY_MAP[CX.maps[visualMapIdx(this.mapIndex)]]||[]).map(a=>RECRUIT_ARMY_ALIASES[a]||a);
    const secondary=a=>1+Math.min(2,Math.sqrt(soldiers[a]||0))*.35+(local.includes(a)?.15:0);
    const sum=other.reduce((n,a)=>n+secondary(a),0),weights={};
    for(const army of armies)weights[army]=total?(heroes[army]?(other.length?.70:1)*heroes[army]/total:.30*secondary(army)/sum):secondary(army);
    return weights;
};
P.rollFactionRecruits=function(){
    const owned=this.ownedUniqueKeys(),isH=d=>isHeroUnit(d.id,d.meta.role);
    const base=Object.values(UnitCatalog).filter(d=>d.enabled&&!d.evolutionOnly&&this.meta.has(d.id)&&this.wave>=(d.unlockWave||0)&&
        (d.meta.side==='good'||this.rank('darkpact')&&d.meta.side==='evil')&&(!d.uniqueKey||!owned.has(d.uniqueKey))&&
        (!SILMARIL_HEROES.has(d.uniqueKey||d.id)||this.rank('silmaril'))&&(!isCareerTroop(d.id)||!this.troopGateReason(d.id)));
    const history=this.recruitHistory||[],picked=[],families=new Set(),roles=new Set();
    const rarity={normal:1,elite:.7,rare:.5,epic:.35,legendary:.3};
    const role=d=>d.profile.traits.includes('mounted')?'cavalry':d.profile.shootRange?'archer':d.profile.traits.some(t=>t==='spear'||t==='pike')?'support':'infantry';
    const draw=(pool,count,hero)=>{
        // Army mass is independent of the number of registered profiles/weapon variants.
        const factionWeights=this.recruitFactionWeights(pool);
        for(let i=0;i<count;i++){
            const available=pool.filter(d=>!picked.includes(d)&&(!d.uniqueKey||!families.has(d.uniqueKey))&&(!RECRUIT_FAMILY[d.id]||!families.has(RECRUIT_FAMILY[d.id])));
            const armies=[...new Set(available.map(d=>recruitArmy(d.id)))];
            const army=weightedRecruitPick(armies,a=>factionWeights[a]||0,this.rng);if(!army)break;
            const inArmy=available.filter(d=>recruitArmy(d.id)===army),freshRoles=hero?[]:inArmy.filter(d=>!roles.has(role(d)));
            const d=weightedRecruitPick(freshRoles.length?freshRoles:inArmy,d=>(rarity[d.rarity]||1)*(history.includes(d.id)?.15:1),this.rng);
            if(!d)break;picked.push(d);if(d.uniqueKey)families.add(d.uniqueKey);if(RECRUIT_FAMILY[d.id])families.add(RECRUIT_FAMILY[d.id]);if(!hero)roles.add(role(d));
        }
    };
    const heroes=base.filter(isH);draw(heroes,2,true);
    // Preserve the existing legendary drought protection; it affects hero slots only.
    if(picked.some(d=>d.rarity==='legendary'))this._legendStreak=0;
    else if((this._legendStreak=(this._legendStreak||0)+1)>=3){
        const d=weightedRecruitPick(heroes.filter(d=>d.rarity==='legendary'&&!picked.includes(d)&&!families.has(d.uniqueKey)&&!families.has(RECRUIT_FAMILY[d.id])),()=>1,this.rng);
        if(d){picked[Math.max(0,picked.length-1)]=d;this._legendStreak=0;}
    }
    draw(base.filter(d=>d.recruitable&&!isH(d)),4,false);
    this.recruitOffers=picked.map(d=>({id:d.id,bought:false}));
    this.recruitHistory=picked.map(d=>d.id).concat(history).slice(0,18);
};

// All eleven existing dark lineups; no new enemies, bosses or monster events.
const DARK_EVENTS=[
    {id:'warg_scouts',name:'와르그 정찰대',ids:['warg','warg','warg'],tier:1,min:0,weight:3,cooldown:3,max:5,reward:15},
    {id:'berserker_raid',name:'우루크 광전사 기습',ids:['uruk_berserker','uruk_berserker'],tier:2,min:25,weight:3,cooldown:4,max:4,reward:25},
    {id:'warg_hunt',name:'와르그 사냥대',ids:['warg','warg','warg','warg'],tier:2,min:25,weight:2,cooldown:4,max:4,reward:25},
    {id:'troll_incursion',name:'동굴 트롤 침투',ids:['cave_troll'],tier:3,min:45,weight:3,cooldown:6,max:3,reward:45},
    {id:'mounted_wraith',name:'기마 나즈굴 추격',ids:['nazgul_mounted'],tier:3,min:45,weight:2,cooldown:7,max:2,reward:55},
    {id:'shelob_lurking',name:'쉴로브의 매복',ids:['shelob'],tier:3,min:55,weight:2,cooldown:70,max:1,reward:65,named:true},
    {id:'winged_wraith',name:'펠비스트 급습',ids:['nazgul_fellbeast'],tier:4,min:70,weight:3,cooldown:8,max:2,reward:85},
    {id:'red_maw',name:'카르카로스 · 붉은 아귀',ids:['carcharoth'],tier:4,min:70,weight:2,cooldown:70,max:1,reward:110,named:true},
    {id:'scatha_hunt',name:'스카사의 사냥',ids:['scatha'],tier:4,min:75,weight:2,cooldown:70,max:1,reward:100,named:true},
    {id:'smaug_descent',name:'스마우그의 강림',ids:['smaug'],tier:5,min:90,weight:1,cooldown:70,max:1,reward:180,named:true},
    {id:'glaurung_gaze',name:'글라우룽의 시선',ids:['glaurung'],tier:5,min:90,weight:1,cooldown:70,max:1,reward:180,named:true}
];
const DARK_BY_ID=new Map(DARK_EVENTS.map(e=>[e.id,e]));
P.runProgress=function(){return Math.max(0,Math.min(100,(Math.max(1,this.wave||1)-1)/69*100));};
P.darkUnitPower=function(u){
    const p=u.stats||zt[u.id]||Ft,t=p.traits||u.traits||[],health=Math.max(0,Math.min(1,(u.currentWounds??p.wounds)/Math.max(1,p.wounds)));
    // Actual profile value, not a promoted soldier's discounted entry points.
    return Math.max(this.pointCost(u.id),estimatePoints(p))*(.35+.65*health)*
        (1+(t.includes('flying')?.18:0)+(t.includes('terror')?.10:0)+(BOSS_TACTICS[u.id]?.12:0));
};
P.darkContext=function(){
    const allies=this.alive('good'),party=allies.filter(u=>!u.temporary),foes=this.alive('evil');
    const health=allies.reduce((n,u)=>n+u.currentWounds,0)/Math.max(1,allies.reduce((n,u)=>n+u.stats.wounds,0));
    const power=party.reduce((n,u)=>n+this.darkUnitPower(u),0),enemy=foes.reduce((n,u)=>n+this.darkUnitPower(u),0);
    const leaderThreat=foes.some(u=>u.traits.includes('boss')||BOSS_TACTICS[u.id]&&this.darkUnitPower(u)>=150);
    return {power,enemy,health,points:(this.deployedPoints?this.deployedPoints():this.rosterPoints()),progress:this.runProgress(),
        safe:allies.length>=2&&health>=.60&&!(this.stageDeaths>0)&&!this._brokenGood&&!this.current?.boss&&!leaderThreat&&!this.delayed?.length};
};
P.darkEventEligible=function(event,ctx=this.darkContext()){
    const e=DARK_BY_ID.get(typeof event==='string'?event:event?.id);if(!e||!ctx.safe||ctx.progress<e.min)return false;
    const history=this.darkHistory||[],last=history[history.length-1],matches=history.filter(h=>h.id===e.id);
    if(matches.length>=e.max||matches.some(h=>this.wave-h.wave<e.cooldown)||last&&this.wave-last.wave<2)return false;
    if(e.tier>=4&&last&&last.tier>=4&&this.wave-last.wave<4)return false;
    if(e.tier>=3&&(ctx.points<e.tier*70||ctx.health<.72))return false;
    const ids=new Set(this.alive('evil').map(u=>u.id).concat(this.delayed||[],this.current?.ids||[]));
    if(e.ids.some(id=>!this.meta.has(id)||!UnitCatalog[id]?.enabled||ids.has(id)))return false;
    const threat=e.ids.reduce((n,id)=>n+this.darkUnitPower({id,stats:zt[id]}),0);
    return threat<=ctx.power*.55&&ctx.enemy+threat<=ctx.power*1.6;
};
P.darkEventPool=function(){
    const ctx=this.darkContext(),band=ctx.progress<25?1:ctx.progress<45?2:ctx.progress<70?3:ctx.progress<90?4:5;
    return DARK_EVENTS.filter(e=>this.darkEventEligible(e,ctx)).map(e=>({event:e,weight:e.weight*Math.pow(.28,Math.max(0,band-e.tier))/(1+(this.darkHistory||[]).filter(h=>h.id===e.id).length)}));
};
P.rollDarkEvent=function(){return weightedRecruitPick(this.darkEventPool(),r=>r.weight,this.rng)?.event||null;};
P.queueDarkEvent=function(id){
    const e=DARK_BY_ID.get(id);if(this._darkEvent||this.darkPending||this.round<4||!['move','shoot','fight'].includes(this.phase)||!this.darkEventEligible(e))return false;
    const flank=this.rng()<.5?'west':'east',at={x:flank==='west'?160:2170,y:1170};
    this.darkPending={id:e.id,wave:this.wave,round:this.round+1,flank,attempts:0};this._darkEvent=true;
    this.emit('BossWarning','위험 '+e.tier+' · '+e.name+' — 다음 라운드 '+(flank==='west'?'왼쪽':'오른쪽')+' 후방 출현 · 격파 보상 +'+e.reward+'금',{at});
    this.emit('Event','🌑 어둠의 전조 · '+e.name+' — 한 라운드 안에 전열을 정비하세요.',{at});return true;
};
P.arriveDarkEvent=function(){
    const pending=this.darkPending;if(!pending||this.round<pending.round)return false;
    const e=DARK_BY_ID.get(pending.id);
    if(pending.wave!==this.wave||!this.darkEventEligible(e)){this.darkPending=null;this.emit('Event','어둠의 기척이 멀어졌습니다.');return false;}
    // Plan the entire group before spawning: no partial group, overlapping units or untagged delayed queue.
    const planned=[],all=this.alive(),allies=this.alive('good');
    for(const id of e.ids){
        const radius=(UnitCatalog[id].meta.baseMm||25)*UNIT_RULES.worldPerMm/2,probe={id,uid:'dark-'+planned.length,radius,traits:zt[id].traits,x:-1000,y:-1000,alive:true};let at=null;
        for(const y of [1260,1110,960])for(const x of (pending.flank==='west'?[180,360,540]:[2150,1970,1790])){
            const pos={x,y};if(!at&&allies.every(u=>ht(u,pos)>radius+u.radius+220)&&Et(probe,pos,all.concat(planned),this.terrain))at=pos;
        }
        if(!at){pending.attempts++;pending.round=this.round+1;if(pending.attempts>=2)this.darkPending=null;return false;}
        planned.push({...probe,...at});
    }
    const members=planned.map(p=>{const u=this.spawn(p.id,'evil',{x:p.x,y:p.y});u._darkInfil=true;u.darkEventId=e.id;return u;});
    this.darkHistory=(this.darkHistory||[]).concat({id:e.id,tier:e.tier,wave:this.wave}).slice(-70);
    this.darkActive={id:e.id,members:members.map(u=>u.uid),paid:false};this.darkPending=null;
    this.emit('Event','🌑 다크 이벤트 · '+e.name+' — 후방에 '+members.length+'기 출현!',{at:members[0]});return true;
};
P.processDarkEvents=function(){
    if(this.darkPending){this.arriveDarkEvent();return;}
    if(this._darkEvent||this.round<4||!['move','shoot','fight'].includes(this.phase))return;
    const pool=this.darkEventPool();if(!pool.length)return;
    const chance=this.difficulty==='despair'?.16:this.difficulty==='hard'?.11:.08;
    if(this.rng()<chance){const e=weightedRecruitPick(pool,r=>r.weight,this.rng).event;this.queueDarkEvent(e.id);}
};
P.rewardDarkEvent=function(){
    const a=this.darkActive,e=a&&DARK_BY_ID.get(a.id);if(!e||a.paid||!a.members.every(uid=>{const u=this.unit(uid);return u&&!u.alive;}))return false;
    a.paid=true;this.grantGold('dark:'+e.id,'어둠의 전리품 · '+e.name,e.reward);this.emit('Event',e.name+' 격파 · 어둠의 전리품 +'+e.reward+'금');return true;
};
const darkTrackKill=P._trkKill;
P._trkKill=function(k,v){const result=darkTrackKill.call(this,k,v);if(k.side==='good'&&v.side==='evil')this.rewardDarkEvent();return result;};
const darkFinish=P.finishWave;
P.finishWave=function(){this.rewardDarkEvent();this.darkPending=null;return darkFinish.call(this);};
const darkStartWave=P.startWave;
P.startWave=function(){if(this.phase==='preparation'){this._darkEvent=false;this.darkPending=null;this.darkActive=null;}return darkStartWave.call(this);};
const darkStart=P.start;
P.start=function(mode){this.darkHistory=[];this.recruitHistory=[];this.darkPending=null;this.darkActive=null;this._darkEvent=false;return darkStart.call(this,mode);};
const darkSave=P._saveState;
P._saveState=function(){return {...darkSave.call(this),darkHistory:this.darkHistory||[],recruitHistory:this.recruitHistory||[],darkPending:this.darkPending||null,darkActive:this.darkActive||null,_darkEvent:!!this._darkEvent};};
const darkResume=P.resume;
P.resume=function(){
    let state;try{state=JSON.parse(this._incomingSaveRaw??localStorage.getItem('mesbg-endless-save'));}catch{return false;}
    if(!darkResume.call(this))return false;
    this.darkHistory=Array.isArray(state.darkHistory)?state.darkHistory.filter(h=>DARK_BY_ID.has(h.id)&&Number.isInteger(h.wave)&&h.wave>=1&&h.wave<=this.wave).slice(-70).map(h=>({id:h.id,wave:h.wave,tier:DARK_BY_ID.get(h.id).tier})):[];
    this.recruitHistory=Array.isArray(state.recruitHistory)?state.recruitHistory.filter(id=>UnitCatalog[id]).slice(0,18):[];
    this.darkPending=null;this.darkActive=null;this._darkEvent=false;return true;
};
if(window.MESBG)window.MESBG.encounters={events:DARK_EVENTS,recruitArmy};
