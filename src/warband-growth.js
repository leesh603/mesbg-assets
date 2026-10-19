/* Shared camp benefits, bounded personal training and meaningful troop service. */
const WARBAND_GROWTH=/*__WARBAND_GROWTH_DATA__*/ {};
const sharedCourageChoices=new Set(['refugees:0','ring:1','bombadil:1','minstrel:0','ents_song:0','saruman_voice:0','two_trees:1']);
const growthPermanent=u=>u?.alive&&u.side==='good'&&!u.temporary&&!u.autoAlly;
P.reinforcementDrillRank=function(){return WARBAND_GROWTH.reinforcements.reduce((n,r)=>(this.cleared||0)>=r.cleared?r.rank:n,0);};
P.troopTrainingRank=function(u){
    if(!growthPermanent(u)||!isCareerTroop(u))return 0;
    const earned=WARBAND_GROWTH.veterancy.reduce((n,r)=>(u.xp||0)>=r.xp&&(u.battlesParticipated||0)>=r.battles?r.rank:n,0);
    return Math.max(earned,Math.min(2,Math.max(0,Math.floor(u.reinforcementDrillRank||0))));
};
P.armyTrainingBonus=function(stat){return Math.max(0,Math.min(WARBAND_GROWTH.armyCaps[stat]||0,Number(this.armyTraining?.[stat])||0));};
const growthRefresh=P.refreshUnit;
P.refreshUnit=function(u){
    if(!u?.baseStats)return growthRefresh.call(this,u);
    if(u._growthVeteran){u.traits=u.traits.filter(t=>t!=='veteran');delete u._growthVeteran;}
    const rank=this.troopTrainingRank(u);
    if(rank>=1&&!u.traits.includes('veteran')){u.traits.push('veteran');u._growthVeteran=true;}
    growthRefresh.call(this,u);
    if(!growthPermanent(u))return;
    u.stats.courage+=this.armyTrainingBonus('courage');
    if(rank>=1)u.stats.courage+=1;
    if(rank>=2){u.stats.fight+=1;u.stats.defence+=1;}
    const woundBonus=rank>=3?1:0;
    if(woundBonus){u.stats.wounds+=1;if(!u.stats.shootRange)u.stats.attacks+=1;}
    // One newly earned wound slot, never a heal every refresh/resume/transform.
    const before=Number(u.growthWoundBonus)||0;
    if(woundBonus>before)u.currentWounds=Math.min(u.stats.wounds,(u.currentWounds||0)+woundBonus-before);
    else if(woundBonus<before)u.currentWounds=Math.min(u.currentWounds,u.stats.wounds);
    u.growthWoundBonus=woundBonus;
};
const growthSpawn=P.spawn;
P.spawn=function(id,side,pos){
    const u=growthSpawn.call(this,id,side,pos);
    if(side==='good'){
        if(isCareerTroop(u))u.reinforcementDrillRank=this.reinforcementDrillRank();
        else if(isHeroUnit(u.id)){
            const stats=WARBAND_GROWTH.mentoring.filter(t=>(this.cleared||0)>=t.cleared).at(-1)?.stats||[];
            const mentors=this.permanent().filter(v=>v!==u&&isHeroUnit(v.id));
            for(const stat of stats)if(mentors.length){
                const average=mentors.reduce((n,v)=>n+Math.max(0,(v.baseStats[stat]||0)-(zt[v.id]?.[stat]||0)),0)/mentors.length;
                const n=Math.min(WARBAND_GROWTH.personalCaps[stat],Math.floor(average));
                if(n>0){u.baseStats[stat]+=n;(u.eventTraining||={})[stat]=n;(u.mentored||={})[stat]=n;}
            }
        }
        this.refreshUnit(u);
        // A fresh arrival must not begin wounded because a faction/relic changes its maximum.
        u.currentWounds=u.stats.wounds;
        u.resources={might:u.stats.might||0,will:u.stats.will||0,fate:u.stats.fate||0};
    }
    return u;
};
// The last arrival can complete a faction bonus for earlier units in the same draft.
for(const method of ['commitRecruits','recruit']){
    const previous=P[method];P[method]=function(...args){
        const before=new Set(this.units.map(u=>u.uid)),ok=previous.apply(this,args);if(!ok)return ok;
        for(const u of this.alive('good'))this.refreshUnit(u);
        for(const u of this.permanent())if(!before.has(u.uid)){u.currentWounds=u.stats.wounds;u.resources={might:u.stats.might||0,will:u.stats.will||0,fate:u.stats.fate||0};}
        this.save();return ok;
    };
}
const growthShot=Xe;
Xe=function(a,target,terrain,rng,all){
    const prior=a.careerWoundReroll;
    a.careerWoundReroll=q.troopTrainingRank(a)>=3&&a.stats.shootRange&&!a.moved&&!a.movementSpent;
    try{return growthShot(a,target,terrain,rng,all);}finally{a.careerWoundReroll=prior;}
};
const growthWave=P.startWave;
P.startWave=function(){
    const before=this.phase,result=growthWave.call(this);
    if(before==='preparation')for(const u of this.permanent())if(isCareerTroop(u))this.refreshUnit(u);
    return result;
};
const growthFinish=P.finishWave;
P.finishWave=function(){const result=growthFinish.call(this);for(const u of this.permanent())if(isCareerTroop(u))this.refreshUnit(u);if(this.phase==='reward')this.save();return result;};

P.relicProgressReason=function(id){
    const r=CX.relics.find(r=>r.id===id);if(!r)return '등록되지 않은 유물';
    const wave=WARBAND_GROWTH.relicMinimumWave[id]??WARBAND_GROWTH.relicMinimumWaveByRarity[r.rarity]??0;
    return this.wave<wave?'스테이지 '+wave+' 이후 획득 가능':'';
};
P.randomAvailableRelic=function(){const pool=CX.relics.filter(r=>!this.relicProgressReason(r.id)&&(!this.relicUnique(r.id)||!this.rank(r.id)));return pool[Math.floor(this.rng()*pool.length)];};
const growthRollRelics=P.rollRelics;
P.rollRelics=function(){const all=CX.relics;CX.relics=all.filter(r=>!this.relicProgressReason(r.id));try{return growthRollRelics.call(this);}finally{CX.relics=all;}};
const growthChooseRelic=P.chooseRelic;
P.chooseRelic=function(id){return id!=='pass'&&this.relicProgressReason(id)?false:growthChooseRelic.call(this,id);};

// Event captions disclose the limits; effects are normalized only after a successful choice.
for(const e of LWB_EVENTS)for(let i=0;i<e.options.length;i++){
    const op=e.options[i];
    if(sharedCourageChoices.has(e.id+':'+i))op.sub+=' · 후속 영입 포함 · 공통 용기 최대 +2(상한 시 +10금)';
    else if(/영구/.test(op.sub||'')&&/결투|방어|Attack|힘|용기/.test(op.sub||''))op.sub+=' · 개인 항목별 +1 한도(용기 +2)';
}
// A risky early choice should not add two duel points to an otherwise complete Hero.
const ringChoice=LWB_EVENTS.find(e=>e.id==='ring')?.options[0];
if(ringChoice){ringChoice.sub='무작위 영웅 결투 +1 · 용기 −1 (영구) · 개인 훈련 상한 적용';ringChoice.fx=b=>{
    const heroes=b.permanent().filter(u=>u.traits.includes('hero')),pool=heroes.length?heroes:b.permanent(),u=pool[Math.floor(b.rng()*pool.length)];
    if(!u)return '대상 없음';u.baseStats.fight+=1;u.baseStats.courage=Math.max(0,u.baseStats.courage-1);b.refreshUnit(u);return u.name+' 결투 +1 · 용기 −1';
};}
const growthEvent=P.chooseEvent;
P.chooseEvent=function(i){
    const key=this.campEvent?.id+':'+i,units=this.permanent(),snap=new Map(units.map(u=>[u.uid,structuredClone(u.baseStats)])),beforeRelics={...this.relics};
    const result=growthEvent.call(this,i);if(!result)return result;
    let capped=0,shared=false;
    if(sharedCourageChoices.has(key)&&units.length&&units.every(u=>u.baseStats.courage-snap.get(u.uid).courage===1)){
        const current=this.armyTrainingBonus('courage');this.armyTraining={...(this.armyTraining||{}),courage:Math.min(2,current+1)};
        for(const u of units)u.baseStats.courage=snap.get(u.uid).courage;
        shared=true;if(current>=2)capped+=2;
    }
    for(const u of units){
        const old=snap.get(u.uid);u.eventTraining=u.eventTraining||{};
        for(const [stat,cap]of Object.entries(WARBAND_GROWTH.personalCaps)){
            const delta=(u.baseStats[stat]||0)-(old[stat]||0);if(delta<=0)continue;
            const prior=Math.max(0,Number(u.eventTraining[stat])||0),allowed=Math.min(delta,Math.max(0,cap-prior));
            u.baseStats[stat]-=delta-allowed;u.eventTraining[stat]=prior+allowed;capped+=delta-allowed;
        }
    }
    // Random-event relics obey the same floors as the visible draft, including restored events.
    for(const id of Object.keys(this.relics||{}))if(this.rank(id)>(beforeRelics[id]||0)&&this.relicProgressReason(id)){
        const count=this.rank(id)-(beforeRelics[id]||0);this.relics[id]=beforeRelics[id]||0;
        for(let n=0;n<count;n++){const replacement=this.randomAvailableRelic();if(replacement)this.relics[replacement.id]=(this.relics[replacement.id]||0)+1;}
    }
    const bonus=Math.min(20,capped*5);this.gold+=bonus;
    const note=(shared?' · 부대 공통 훈련: 후속 영입 포함':'')+(bonus?' · 훈련 상한 보급 +'+bonus+'금':'');
    if(note){this.campResult=(this.campResult||'')+note;if(this.eventOutcome)this.eventOutcome.result+=note;}
    if(this.eventOutcome)this.eventOutcome.relics=Object.keys(this.relics||{}).filter(id=>this.rank(id)>(beforeRelics[id]||0));
    for(const u of this.alive('good')){this.refreshUnit(u);u.currentWounds=Math.min(u.currentWounds,u.stats.wounds);}this.save();return result;
};
const growthState=P._saveState;
P._saveState=function(){return {...growthState.call(this),growthVersion:WARBAND_GROWTH.version,armyTraining:{courage:this.armyTrainingBonus('courage')}};};
const growthResume=P.resume;
P.resume=function(){
    let s;try{s=JSON.parse(this._incomingSaveRaw??localStorage.getItem('mesbg-endless-save'));}catch{return false;}
    const prior=this.armyTraining;this.armyTraining={courage:Math.max(0,Math.min(2,Number(s?.armyTraining?.courage)||0))};
    const ok=growthResume.call(this);if(!ok){this.armyTraining=prior;return false;}
    for(const u of this.units)if(growthPermanent(u))this.refreshUnit(u);
    if(this.campStep==='relic'&&!this.chosenRelic){this.relicChoices=(this.relicChoices||[]).filter(id=>!this.relicProgressReason(id));if(!this.relicChoices.length)this.rollRelics();}
    return true;
};
const growthStart=P.start;
P.start=function(mode){this.armyTraining={courage:0};return growthStart.call(this,mode);};
const growthProfile=troopProfileSection;
troopProfileSection=function(u){
    const original=growthProfile(u);if(!original)return original;
    const rank=q.troopTrainingRank(u),next=WARBAND_GROWTH.veterancy.find(r=>r.rank>rank),name=rank?WARBAND_GROWTH.veterancy[rank-1].name:'신병';
    return original+'<section class="troop-career"><h3>전투 숙련 · '+name+'</h3><p>'+WARBAND_GROWTH.veterancy.filter(r=>r.rank<=rank).map(r=>esc(r.text)).join(' · ')+'</p><p>'+(next?'다음 숙련: 경험치 '+next.xp+' · 실제 참전 '+next.battles+'회':'최고 숙련 · 병종 승급과 별도로 유지')+'</p>'+(u.reinforcementDrillRank?'<p>야전 교육 '+u.reinforcementDrillRank+'단계 · 승급 참전 횟수는 실제 전투로 획득</p>':'')+'</section>';
};
if(window.MESBG)window.MESBG.warbandGrowth=WARBAND_GROWTH;
if(typeof uiUnitStats==='function'){
    const growthUnitStats=uiUnitStats;
    uiUnitStats=function(u){const html=growthUnitStats.apply(this,arguments),labels={fight:'결투',strength:'힘',defence:'방어',attacks:'공격',courage:'용기'};
        return html+(u?.mentored?'<p>야전 전수 · '+Object.entries(u.mentored).map(([k,n])=>esc(labels[k]||k)+' +'+n).join(' · ')+' · 개인 훈련 상한에 포함</p>':'');};
}
