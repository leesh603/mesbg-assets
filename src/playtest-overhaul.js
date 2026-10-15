/* Playtest 2026-10-15. Digital mission/merit rules extend the retained MESBG solver. */
const QA_ROLE_NAMES={infantry:'전열',support:'창 지원',archer:'사격',cavalry:'기동',hero:'지휘·지원',monster:'괴수'};
P.unitRole=function(value){
    const u=typeof value==='string'?{id:value,traits:zt[value]?.traits||[],stats:zt[value]||{}}:value;
    if(u&&['civil','support'].includes(this.meta.get(u.id)?.role)&&!u.stats.shootRange&&!window.LWBTactics.supportKind(u,id=>this.meta.get(id)))return 'hero';
    return u?window.LWBTactics.role(u,id=>this.meta.get(id)):'infantry';
};
P.unitRoleLabel=function(u){return QA_ROLE_NAMES[this.unitRole(u)]||'전열';};
// Objective movement uses the same legal paths and per-unit movement budgets as player orders.
const qaOrderPriority=P.orderPriority;
P.orderPriority=function(u,target){
    if(u.side==='good'&&this.battleOrder?.mode==='focus')return this.battleOrder.target===target.uid?-5000:0;
    const prior=qaOrderPriority.call(this,u,target);
    if(u.side==='good'&&this.mission==='purge'&&target.lair)return prior-1000;
    if(u.side==='evil'&&this.mission==='osgiliath_retreat'&&target._evacuee)return prior-120;
    return prior;
};
P.missionMovePlan=function(u){
    if(this.phase!=='move'||u.side!=='good'||!this.canAct(u)||u.static||u.lair||this.engaged(u)||this.battleOrder)return null;
    const role=this.unitRole(u),stance=stanceOf(this,u),bridgeIndex=this.linkedOperation?.bridge||0,task=this.mission==='osgiliath_retreat'&&u.retreatTask,supplyTask=task==='supplies'&&!this.retreatMission?.supplies,bridgeTask=task==='bridge'&&(this.retreatMission?.bridgeTicks[bridgeIndex]||0)<2;
    if(!supplyTask&&!bridgeTask&&(['rear','defense'].includes(stance)||role==='support'))return null;
    let goal,target;
    if(supplyTask){if(ht(u,{x:1150,y:520})<180)return {wait:true};goal={x:1150,y:520};}
    else if(bridgeTask){const bridge=this.terrain.filter(t=>t.active&&t.surface==='bridge')[bridgeIndex];if(!bridge)return null;goal={x:bridge.x-bridge.w/2+u.radius+12,y:bridge.y-140};if(ht(u,goal)<30)return {wait:true};}
    else if(this.mission==='purge'){
        target=this.alive('evil').filter(v=>v.lair).sort((a,b)=>ht(u,a)-ht(u,b))[0];if(!target)return null;
        if(role==='archer'&&this.validTargets(u).includes(target))return {wait:true};
        const d=ht(u,target)||1,gap=u.radius+target.radius+8;goal={x:target.x+(u.x-target.x)/d*gap,y:target.y+(u.y-target.y)/d*gap};
    }else if(this.mission==='scouting'){
        goal=(this.devices||[]).filter(d=>d.type==='intel'&&d.armed).sort((a,b)=>ht(u,a)-ht(u,b))[0];
    }else if(['hold','rescue'].includes(this.mission)){
        if(ht(u,Mt.objective)<Mt.objective.radius-20&&!this.alive('evil').some(v=>ht(v,Mt.objective)<Mt.objective.radius+80))return {wait:true};
        goal=Mt.objective;
    }else if(this.mission==='escort'&&role!=='cavalry'){
        const cart=this.unit(this.escortCart);if(cart?.alive&&ht(u,cart)>260)goal={x:cart.x,y:Math.min(1250,cart.y+160)};
    }
    if(!goal)return null;
    const all=this.alive(),position=Et(u,goal,all,this.terrain)?goal:Be(u,goal,all,this.terrain,180);
    const budget=role==='archer'?Math.min(this.remaining(u),Math.max(0,u.stats.move/2-(u.movementSpent||0))):this.remaining(u);
    if(!position||budget<12)return null;
    const route=Terrain.route(u,position,all,this.terrain,Infinity)||Terrain.route(u,position,[],this.terrain,Infinity);if(!route)return null;
    for(const fraction of [1,.75,.5,.25]){const to=Terrain.prefix(u,route.path,this.terrain,budget*fraction),plan=ve(u,to,all,this.terrain,budget,{snap:false});if(plan&&plan.distance>=12)return{to:plan.to,target:target?.uid};}
    return target?{target:target.uid}:null;
};
P.recruitGateReason=function(id,initial=false){
    const d=UnitCatalog[id];
    if(!d?.enabled||!this.meta.has(id))return '영입 불가';
    if(d.evolutionOnly||evolutionForms.has(id))return '숨겨진 진화 형태';
    const hero=isHeroUnit(id,d.meta.role);
    if(d.meta.side!=='good'&&!(d.meta.side==='evil'&&this.rank('darkpact')&&!initial))return '어둠의 계약 필요';
    if(!hero&&!d.recruitable)return '모집 대상 아님';
    if(!(initial&&hero)&&this.wave<(d.unlockWave||0))return '공세 '+d.unlockWave+' 해금';
    if(SILMARIL_HEROES.has(d.uniqueKey||id)&&!this.rank('silmaril'))return '실마릴 필요';
    if(isCareerTroop(id)){const reason=this.troopGateReason(id);if(reason)return reason;}
    if(d.uniqueKey&&this.ownedUniqueKeys().has(d.uniqueKey))return '이미 합류했거나 전사한 인물';
    if(initial&&hero&&d.points>this.capacity())return '초기 편성 포인트 초과';
    if(initial&&hero&&d.recruitCost>this.gold)return '금화 '+(d.recruitCost-this.gold)+' 부족';
    return '';
};
const qaSelection=P.recruitSelection;
P.recruitSelection=function(i){const id=this.recruitOffers?.[i]?.id,reason=id&&this.recruitGateReason(id,!!this.initialDraft);return reason?{reason}:qaSelection.call(this,i);};
const qaDraft=P.draftReason;
P.draftReason=function(draft,quantities){for(const i of draft||[]){const id=this.recruitOffers?.[i]?.id,reason=id&&this.recruitGateReason(id,!!this.initialDraft);if(reason)return reason;}return qaDraft.call(this,draft,quantities);};
const qaRecruit=P.recruit;
P.recruit=function(i){const id=this.recruitOffers?.[i]?.id;if(!id||this.recruitGateReason(id,!!this.initialDraft))return false;return qaRecruit.call(this,i);};

P.costReason=function(cost){
    if(!Number.isSafeInteger(cost)||cost<0)return '올바르지 않은 비용';
    if(!Number.isFinite(this.gold)||this.gold<cost)return '금화 '+Math.max(0,cost-(this.gold||0))+' 부족 · 필요 '+cost;
    return '';
};
P.eventCostReason=function(option){return option?(this.costReason(option.cost||0)||option.requirement?.(this)||''):'선택 불가';};
P.eventEquipPairs=function(){const pairs=[];for(const u of this.permanent().filter(u=>u.traits.includes('hero')&&_eqSlotCount(u)<2))for(const a of LWB_EQUIP)if(!a.rare&&!a.once&&!a.mount&&!a.mountGear&&(!a.req||a.req(u))&&!(u.equipment||[]).includes(a.id))pairs.push({u,a});return pairs;};
// Snapshot all mutable own data, including RNG and storage. Restore existing unit identities.
// Callback definitions, Maps and functions retain their references; event data is immutable.
P.economicTransaction=function(effect,label='야영지 구매'){
    if(this._economicDepth)return effect();
    const before=new Map(),refs=new Map(this.units.map(u=>[u.uid,u]));
    for(const k of Object.keys(this)){
        const v=this[k];if(typeof v==='function'||v instanceof Map||v instanceof Set||k==='campEvent')before.set(k,{ref:v});
        else {try{before.set(k,{data:structuredClone(v)});}catch{before.set(k,{ref:v});}}
    }
    const rngState=this.rng?.getState?.(),stored=localStorage.getItem('mesbg-endless-save');
    this._economicDepth=1;
    try{
        const result=effect();if(result===false)throw Error('선택 효과 적용 실패');
        if(!Number.isFinite(this.gold)||this.gold<0)throw Error('금화 잔액 오류');
        const income=(this.rewardLedger?.entries||[]).reduce((n,e)=>n+e.amount,0)-(before.get('rewardLedger')?.data?.entries||[]).reduce((n,e)=>n+e.amount,0),debit=(before.get('gold')?.data||0)+income-this.gold;
        if(debit>0){const book=this.rewardBook();(book.spending=book.spending||[]).push({label,amount:debit});}
        delete this._economicDepth;
        if(!this.save())throw Error('저장 실패');
        this.economicError='';return result===undefined?true:result;
    }catch(error){
        for(const k of Object.keys(this))if(!before.has(k))delete this[k];
        for(const[k,v]of before)this[k]=Object.hasOwn(v,'data')?v.data:v.ref;
        this.units=this.units.map(u=>{const ref=refs.get(u.uid);if(!ref)return u;for(const k of Object.keys(ref))delete ref[k];Object.assign(ref,u);return ref;});
        if(Number.isInteger(rngState))this.rng=Ne(rngState);
        try{if(stored===null)localStorage.removeItem('mesbg-endless-save');else localStorage.setItem('mesbg-endless-save',stored);}catch{}
        this.economicError=error.message;return false;
    }
};
const qaSave=P.save;
P.save=function(){return this._economicDepth?true:qaSave.call(this);};
P.purchase=function(cost,effect,label='야영지 구매'){const reason=this.costReason(cost);if(reason){this.economicError=reason;return false;}return this.economicTransaction(()=>{this.gold-=cost;return effect();},label);};
P.buyInjuryTreatment=function(uid){const u=this.unit(uid);if(this.phase!=='reward'||!u?.alive||u.side!=='good'||!u.injury)return false;return this.purchase(20,()=>{restoreWarbandInjury(u);this.refreshUnit(u);return true;},'부상 치료');};
P.rerollShop=function(){
    if(this.phase!=='reward'||this.campStep!=='shop')return false;
    return this.purchase(8,()=>{
        const pool=LWB_EQUIP.map((a,i)=>i).filter(i=>!NAMED_MOUNT_HEROES[LWB_EQUIP[i].id]);
        for(let i=pool.length-1;i>0;i--){const j=Math.floor(this.rng()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
        const selected=pool.filter(i=>!LWB_EQUIP[i].rare||this.rng()<(LWB_EQUIP[i].rare>=3?.08:.18));
        this.shopStock=selected.concat(pool.filter(i=>!selected.includes(i))).slice(0,Math.min(4,pool.length));this._soldOut=[];return true;
    },'상점 재진열');
};
// Existing shops already validate contextual rules. Add the same atomic rollback boundary.
for(const method of ['buyEquip','sellEquip','buybackEquip','buyTrap','buyAlly','buyHorse','buyNamedMount','buySpecialMount','assignMount','buyTroopMount','promoteTroop','commitRecruits','recruit','reroll','expand']){
    const labels={buyEquip:'장비·치료',buybackEquip:'장비 되사기',buyTrap:'방어 장치',buyAlly:'지원군 고용',buyHorse:'군마 구매',buyNamedMount:'고유 탈것',buySpecialMount:'탈것 전환',buyTroopMount:'병사 탈것',promoteTroop:'병종 승급',commitRecruits:'동료 영입',recruit:'동료 영입',reroll:'모집 재추첨',expand:'편성 한도 확장'};
    const action=P[method];if(action)P[method]=function(...args){return this.economicTransaction(()=>action.apply(this,args),labels[method]);};
}
P.chooseEvent=function(i){
    if(this.phase!=='reward'||this.campStep!=='event'||!this.campEvent)return false;
    const event=this.campEvent,op=event.options[i];if(!op||this.eventCostReason(op))return false;
    return this.purchase(op.cost||0,()=>{
        const beforeRelics={...this.relics},health=new Map(this.alive('good').map(u=>[u.uid,u.currentWounds])),balance=this.gold,result=op.fx?.(this);
        if(result===false)throw Error('선택 효과 적용 실패');
        const income=this.gold-balance;
        if(income>0){this.gold-=income;this.grantGold('event:'+event.id,event.title,income,'camp');}
        const changes=this.units.filter(u=>health.has(u.uid)&&u.currentWounds!==health.get(u.uid)).map(u=>({uid:u.uid,name:u.name,before:health.get(u.uid),after:u.currentWounds}));
        const text=(typeof result==='string'&&result?result:op.sub||'선택 완료')+(changes.length?' · '+changes.map(u=>u.name+' 체력 '+u.before+'→'+u.after).join(' · '):'');
        this.campResult=event.title+' — '+op.label+' → '+text;
        this.eventOutcome={eventId:event.id,title:event.title,label:op.label,result:text,health:changes,relics:Object.keys(this.relics).filter(id=>(this.relics[id]||0)>(beforeRelics[id]||0))};
        this.lastGold=this.rewardTotal();this.campEvent=null;this.campDraft=null;this.emit('CampEvent',this.campResult);return true;
    },event.title);
};
P.eventDamage=function(u,amount,nonlethal=false){
    if(!u?.alive||!Number.isSafeInteger(amount)||amount<0)return false;
    const n=Math.min(amount,Math.max(0,u.currentWounds-(nonlethal?1:0)));
    // Direct environmental damage uses the retained casualty/legacy path without Fate rolls.
    let dealt=0;
    for(let i=0;i<n&&u.alive&&u.currentWounds>(nonlethal?1:0);i++){
        const killed=u.currentWounds===1;
        oldApply.call(this,{strikeResults:[{attacker:u.uid,target:u.uid,wound:true,killed}],pushVectors:[]});dealt++;
        if(killed){this._trkKill(u,u);const fallen=this.fallen?.find(f=>f.uid===u.uid);if(fallen)Object.assign(fallen,{xp:u.xp,entryPoints:u.entryPoints,merit:structuredClone(u.merit||{}),promotionHistory:structuredClone(u.promotionHistory||[])});}
    }
    return dealt;
};
P.applyCampaignInjury=function(u,kind){
    if(!u?.alive||u.injury||!['leg','arm'].includes(kind))return false;
    u.injury=kind;u.injuryCount=(u.injuryCount||0)+1;(u.injuryHistory=u.injuryHistory||[]).push({wave:this.wave,injury:kind});
    if(kind==='leg'){u.injuryBackup={move:u.baseStats.move};u.baseStats.move=Math.round(u.baseStats.move*.75);}
    else{u.injuryBackup={attacks:u.baseStats.attacks};u.baseStats.attacks=Math.max(1,u.baseStats.attacks-1);}
    this.refreshUnit(u);this.emit('Event',u.name+' 부상 — '+(kind==='leg'?'다리 · 이동 25%↓':'팔 · Attack −1')+' (야영지 치료 가능)');return true;
};
P.rewardBook=function(){if(!this.rewardLedger||this.rewardLedger.wave!==this.wave)this.rewardLedger={wave:this.wave,openingGold:this.gold,entries:[],spending:[]};return this.rewardLedger;};
P.grantGold=function(id,label,amount,scope='battle'){
    if(!Number.isSafeInteger(amount)||amount<0)throw Error('Invalid gold reward');
    const book=this.rewardBook(),key=scope+':'+id;if(book.entries.some(e=>e.key===key))return false;
    book.entries.push({key,label,amount,scope});this.gold+=amount;if(this.phase==='reward'&&this.settledWave===this.wave)this.lastGold=this.rewardTotal();return true;
};
P.rewardTotal=function(scope){return this.rewardBook().entries.filter(e=>!scope||e.scope===scope).reduce((sum,e)=>sum+e.amount,0);};
P.captureBattleRecord=function(){
    this.battleRecord={wave:this.wave,rounds:this.round,mission:this.mission,kills:this.stageKills||0,deaths:this.stageDeaths||0,
        units:this.units.filter(u=>u.side==='good'&&!u._evacuee).map(u=>({uid:u.uid,id:u.id,name:u.name,alive:u.alive,hp:u.currentWounds,maxHp:u.stats.wounds,kills:u._stageKills||0,supports:u._stageSupports||0,merit:structuredClone(u.battleMerit||{}),injury:u.injury||''})),
        objectives:[],tactics:structuredClone(this.tacticalEvents||[]),nextEffects:[],relics:[]};
};
P.objectivePassed=function(o){
    if(o.id==='healer')return this.battleRecord.units.filter(u=>u.alive).every(u=>u.hp>=u.maxHp);
    return !!o.test(this);
};
P.finalizeBattleRecord=function(){
    const record=this.battleRecord; if(!record)return;
    for(const row of record.units){const u=this.unit(row.uid);row.injury=u?.injury||row.injury;row.merit=structuredClone(u?.battleMerit||row.merit);}
    record.injuries=record.units.filter(u=>u.alive&&u.injury).length;
    record.objectives=[this.bonusObjective,this.bonusObjective2].filter(Boolean).map(o=>({id:o.id,text:o.text,passed:this.objectivePassed(o)}));
    this.resolveLinkedBattle();
    record.nextEffects=[this.expeditionReport,this.linkedOperation?.report].filter(Boolean);
    this.lastGold=this.rewardTotal();this.settledWave=this.wave;record.rewards=structuredClone(this.rewardBook().entries);
    record.promotions=this.pendingTroopPromotions().map(u=>({uid:u.uid,name:u.name}));
};
const qaEndRun=P.endRun;
P.endRun=function(victory,message){
    if(['move','shoot','fight'].includes(this.phase)){
        this.captureBattleRecord();const r=this.battleRecord;r.injuries=r.units.filter(u=>u.alive&&u.injury).length;
        r.objectives=[this.bonusObjective,this.bonusObjective2].filter(Boolean).map(o=>({id:o.id,text:o.text,passed:!!o.test(this)}));
        r.rewards=structuredClone(this.rewardBook().entries);r.promotions=[];
    }
    this.stopAutoForChoice('원정 결과',true);return qaEndRun.call(this,victory,message);
};
const qaFinish=P.finishWave;
P.finishWave=function(){
    if(this.settledWave===this.wave||['reward','result'].includes(this.phase))return;
    this.stopAutoForChoice('전투 결과와 야영지 선택',true);
    return qaFinish.call(this);
};
const qaNewRun=P.start;
P.start=function(mode){this.rewardLedger=null;this.battleRecord=null;this.settledWave=-1;this.linkedOperation=null;this.retreatMission=null;this.tacticalEvents=[];this._appliedCombats=new WeakSet();return qaNewRun.call(this,mode);};
const qaResume=P.resume;
P.resume=function(){
    const incoming=this._incomingSaveRaw;let state;
    try{state=JSON.parse(incoming??localStorage.getItem('mesbg-endless-save'));}catch{return false;}
    if(state?.campEvent){const event=LWB_EVENTS.find(e=>e.title===state.campEvent.title&&e.options[0]?.label===state.campEvent.options?.[0]?.label);if(event)state.campEvent.id=event.id;}
    this._incomingSaveRaw=JSON.stringify(state);
    try{if(!qaResume.call(this))return false;}finally{if(incoming===undefined)delete this._incomingSaveRaw;else this._incomingSaveRaw=incoming;}
    for(const key of ['rewardLedger','battleRecord','linkedOperation','retreatMission'])this[key]=state[key]||null;
    this.settledWave=state.settledWave??(this.phase==='reward'&&!this.initialDraft?this.wave:-1);
    this.autoPauseSettings=state.autoPauseSettings||{hero:true,objective:true,choice:true};
    this._appliedCombats=new WeakSet();this.tacticalEvents=[];
    if(this.rewardLedger?.wave===this.wave)this.lastGold=this.rewardTotal();
    this.stopAutoForChoice('저장한 원정 재개',true);return true;
};

const MERIT_RULES={support:{xp:2,cap:8,label:'창·결투 지원'},line:{xp:2,cap:6,label:'방어선 유지'},objective:{xp:3,cap:9,label:'임무 수비'},escort:{xp:2,cap:6,label:'호송 보호'},intercept:{xp:2,cap:6,label:'위협 저지'}};
P.awardMerit=function(u,kind,receipt){
    if(!isCareerTroop(u)||u.side!=='good'||u.temporary)return false;
    const rule=MERIT_RULES[kind];if(!rule)return false;
    if(u.meritWave!==this.wave){u.meritWave=this.wave;u.battleMerit={};u.meritReceipts=[];u.battleMeritXP=0;}
    const key=kind+':'+receipt;if(u.meritReceipts.includes(key))return false;
    const used=u.battleMerit[kind]||0,award=Math.min(rule.xp,rule.cap-used,18-(u.battleMeritXP||0));if(award<=0)return false;
    this.initTroopCareer(u);u.meritReceipts.push(key);u.battleMerit[kind]=used+award;u.battleMeritXP=(u.battleMeritXP||0)+award;u.xp+=award;
    u.merit=u.merit||{};u.merit[kind]=(u.merit[kind]||0)+award;u.merit.total=(u.merit.total||0)+award;
    if((u.merit.total||0)>=20)u.decoration='전열의 버팀목';if((u.merit.support||0)>=20)u.decoration='전우의 창';
    return true;
};
P.meritSummary=function(u){return (u.decoration?u.decoration+' · ':'')+'생존 '+(u.survivedBattles||0)+'전 · 전공 '+(u.merit?.total||0)+' · 지원 '+(u.merit?.support||0)+' · 부상 '+(u.injuryCount||0)+'회';};
P.tacticalLog=function(kind,u,text){
    this.tacticalEvents=this.tacticalEvents||[];
    if(this.tacticalEvents.length<36)this.tacticalEvents.push({round:this.round,kind,uid:u?.uid||'',text});
};
const qaCombat=P.applyCombat;
P.applyCombat=function(r){
    this._appliedCombats=this._appliedCombats||new WeakSet();if(this._appliedCombats.has(r))return false;this._appliedCombats.add(r);
    const survivors=new Map(this.alive('good').map(u=>[u.uid,u.currentWounds]));
    const result=qaCombat.call(this,r);
    for(const uid of r.supports||[]){const u=this.unit(uid);if(u&&this.awardMerit(u,'support','round:'+this.round))this.tacticalLog('support',u,u.name+'이 후열에서 교전을 지원했습니다.');}
    for(const uid of r.participants||[]){const u=this.unit(uid);if(!u?.alive||u.side!=='good')continue;
        const bridge=(this.terrain||[]).some(t=>t.active&&t.surface==='bridge'&&Terrain.contains(u,t,100));
        if(bridge&&u.hold&&!u.traits.includes('mounted')&&this.awardMerit(u,'line','round:'+this.round))this.tacticalLog('line',u,u.name+'이 다리 입구에서 적의 진군을 저지했습니다.');
        if(u.traits.includes('bodyguard')&&this.alive('good').some(h=>isHeroUnit(h.id)&&ht(u,h)<180)&&this.awardMerit(u,'intercept','round:'+this.round))this.tacticalLog('guard',u,u.name+'이 영웅 곁의 교전에 참여했습니다.');
    }
    for(const[uid,hp]of survivors){const u=this.unit(uid);if(u&&u.currentWounds<hp){u.damageTaken=(u.damageTaken||0)+hp-u.currentWounds;if(!u.alive&&this.fallen){const f=this.fallen.find(f=>f.uid===uid);if(f)Object.assign(f,{merit:structuredClone(u.merit||{}),promotionHistory:structuredClone(u.promotionHistory||[]),entryPoints:u.entryPoints,xp:u.xp});}}}
    this.checkAutoRisk();return result;
};
P.recordRoundMerit=function(){
    for(const u of this.permanent()){
        if(!isCareerTroop(u))continue;
        if(['hold','defense','rescue'].includes(this.mission)&&ht(u,Mt.objective)<=Mt.objective.radius&&!this.alive('evil').some(v=>ht(v,u)<180))this.awardMerit(u,'objective','round:'+this.round);
        const convoy=this.mission==='osgiliath_retreat'?this.alive('good').filter(v=>v._evacuee):[this.unit(this.escortCart)].filter(v=>v?.alive);
        if(convoy.some(v=>ht(v,u)<220)&&this.alive('evil').some(v=>ht(v,u)<420))this.awardMerit(u,'escort','round:'+this.round);
    }
};
const qaSurvival=P.finishWave;
P.finishWave=function(){
    if(this.settledWave===this.wave||['reward','result'].includes(this.phase))return;
    for(const u of this.permanent())if(isCareerTroop(u)&&u.survivalReceipt!==this.wave){u.survivalReceipt=this.wave;u.survivedBattles=(u.survivedBattles||0)+1;}
    return qaSurvival.call(this);
};

P.autoPauseReason=function(){
    const setting=this.autoPauseSettings||{hero:true,objective:true,choice:true};
    if(setting.hero){const u=this.alive('good').find(u=>isHeroUnit(u.id)&&u.currentWounds<=1&&(u.resources?.fate||0)===0&&this.alive('evil').filter(v=>Vt(v,u)).length>=2);if(u)return {key:'hero:'+u.uid+':'+this.round,text:u.name+'이 포위됐습니다 · 체력 1 · Fate 없음'};}
    if(setting.objective){
        const cart=this.unit(this.escortCart);if(this.mission==='escort'&&cart?.alive&&cart.currentWounds<=1&&this.alive('evil').some(v=>ht(v,cart)<220))return {key:'cart:'+this.round,text:'보급 마차가 파괴될 위험입니다'};
        if(this.mission==='defense'&&this.alive('evil').filter(v=>ht(v,Mt.objective)<=Mt.objective.radius).length>=Math.max(1,(this.breachCount||2)-1))return {key:'defense:'+this.round,text:'방어선 돌파가 임박했습니다'};
        if(this.retreatMission&&this.retreatMission.evacuated+this.alive('good').filter(u=>u._evacuee).length===this.retreatMission.required)return {key:'evac:'+this.round,text:'남은 피난민을 모두 지켜야 합니다'};
    }
    return null;
};
P.checkAutoRisk=function(){
    const risk=this.autoPauseReason();if(!risk||this._autoRiskReceipt===risk.key)return false;
    if(typeof AUTO!=='undefined'&&AUTO){this._autoRiskReceipt=risk.key;AUTO=false;AUTO_STEP=false;if(typeof Jt!=='undefined')clearTimeout(Jt);this.emit('AutoPaused',risk.text);if(document.body.dataset)document.body.dataset.auto='';for(const id of ['auto','auto-dock']){const button=document.getElementById(id);if(button){button.textContent='자동';button.classList.remove('on');button.title=risk.text;}}if(typeof renderDock==='function')renderDock();if(typeof Xt==='function')Xt(risk.text);return true;}return false;
};
P.stopAutoForChoice=function(text,boundary=false){
    if((boundary||(this.autoPauseSettings?.choice??true))&&typeof AUTO!=='undefined'){AUTO=false;AUTO_STEP=false;if(typeof Jt!=='undefined')clearTimeout(Jt);}
};

P.chargeBonus=function(u,target,plan){
    if(!u?.traits.includes('mounted')||!plan)return {active:false,reason:'기병 돌격 아님'};
    if(target?.traits.some(t=>['mounted','monster','flying'].includes(t)))return {active:false,reason:'기병·괴수 대상 · 보병 전도 없음'};
    const rough=plan.path.some((p,i)=>i>0&&Terrain.cost(u,plan.path[i-1],p,this.terrain)>ht(plan.path[i-1],p)+1);
    const narrow=this.pathCrossesBridge(plan.path);
    if(rough||narrow)return {active:false,reason:narrow?'다리 위 돌격 · 추가 주사위·전도 없음':'험지 돌격 · 추가 주사위·전도 없음'};
    const brace=target?.hold&&supportFor([u,target],this.alive()).some(l=>l.front.uid===target.uid);
    if(brace)return {active:false,reason:'준비된 창 지원 방어선 · 돌격 제동'};
    return {active:true,reason:'개활지 돌격 · 결투 주사위 +1 · 보병 전도'};
};
P.pathCrossesBridge=function(path){
    const bridges=this.terrain.filter(t=>t.active&&t.surface==='bridge');
    for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],n=Math.max(1,Math.ceil(ht(a,b)/16));for(let j=0;j<=n;j++){const p={x:a.x+(b.x-a.x)*j/n,y:a.y+(b.y-a.y)*j/n};if(bridges.some(t=>Terrain.contains(p,t)))return true;}}
    return false;
};
const qaCharge=P.charge;
P.charge=function(uid,targetId){
    const u=this.unit(uid),target=this.unit(targetId);if(!u||!target)return false;
    const plan=chargePlan(u,target,this.alive(),this.terrain,this.remaining(u)),bonus=this.chargeBonus(u,target,plan),before=u.chargeOpen;
    u.chargeOpen=bonus.active;const ok=qaCharge.call(this,uid,targetId);if(!ok)u.chargeOpen=before;else if(bonus.active)this.tacticalLog('charge',u,u.name+'이 개활지 돌격을 성공시켰습니다.');return ok;
};
P.actionForecast=function(intent){
    const u=this.unit(intent?.uid);if(!u)return {allowed:false,text:'병사를 선택하세요'};
    const target=this.unit(intent.target);
    if(['move','charge'].includes(intent.kind)){
        if(this.phase!=='move'||!this.canAct(u)||this.engaged(u))return {allowed:false,text:'현재 이동·돌격할 수 없는 병사입니다'};
        const plan=intent.kind==='charge'?chargePlan(u,target,this.alive(),this.terrain,this.remaining(u)):ve(u,intent.to,this.alive(),this.terrain,this.remaining(u));
        if(!plan)return {allowed:false,text:'경로 차단 또는 이동력 부족'};
        const slow=plan.distance>(plan.travel??plan.distance)+1,bridge=this.pathCrossesBridge(plan.path);
        const parts=[(plan.distance/45).toFixed(1)+'″ 소모','잔여 '+Math.max(0,(this.remaining(u)-plan.distance)/45).toFixed(1)+'″'];
        if(slow)parts.push('얕은 물·험지 이동속도 50%');if(bridge)parts.push('다리 경로');
        if(intent.kind==='charge'){parts.push(this.chargeBonus(u,target,plan).reason);if(target?.traits.includes('terror')&&!u.fearless&&!u.traits.includes('fearless')&&!this.careerBodyguard(u))parts.push('공포 검사 필요 · 실패 시 돌격 중지');const copy={...u,...plan.to},links=supportFor([copy,target],this.alive().map(v=>v.uid===u.uid?copy:v)).filter(l=>l.unit.side===u.side);if(links.length)parts.push('지원 '+links.map(l=>l.unit.name).join('·'));}
        return {allowed:true,text:parts.join(' · '),plan};
    }
    if(intent.kind==='shoot'){
        const allowed=this.phase==='shoot'&&this.canAct(u)&&!!target&&this.validTargets(u).some(v=>v.uid===target.uid),los=target?_t(u,target,this.terrain):'blocked';
        const allies=target&&this.alive(u.side).filter(v=>v!==u&&Vt(v,target));
        return {allowed,text:!allowed?'사거리·사선·이동 제한으로 사격 불가':(los==='cover'?'엄폐물 통과 판정':'사선 확보')+(allies?.length?' · 아군 교전 중 · 현재 사격 규칙 적용':' · 아군 오사 경로 없음')};
    }
    if(intent.kind==='skill'){const reason=this.skillReason(u);return {allowed:!reason,text:reason||'고유 능력 · Might 소모 없음'};}
    return {allowed:true,text:intent.detail||''};
};

function battleAnalysisHTML(b){
    const r=b.battleRecord;if(!r||r.wave!==b.wave)return '';
    const reward=b.rewardBook().entries,spending=b.rewardBook().spending||[];
    return '<details class="qa-battle-analysis"><summary>전투 분석 · 처치 '+r.kills+' · 생존 '+r.units.filter(u=>u.alive).length+' · 전사 '+r.deaths+' · 부상 '+r.injuries+'</summary><ul>'+r.objectives.map(o=>'<li>'+esc(o.text)+' · '+(o.passed?'달성':'미달성')+'</li>').join('')+'</ul><div class="qa-unit-results">'+r.units.map(u=>'<p><b>'+esc(u.name)+'</b> · '+u.kills+'처치 · '+u.supports+'지원 · 전공 '+Object.values(u.merit||{}).reduce((a,n)=>a+n,0)+(u.alive?'':' · 전사')+'</p>').join('')+'</div>'+r.tactics.map(e=>'<p>'+esc(e.text)+'</p>').join('')+'<dl class="qa-reward-ledger">'+reward.map(e=>'<div><dt>'+esc(e.label)+(e.scope==='camp'?' · 야영지':'')+'</dt><dd>+'+e.amount+'</dd></div>').join('')+'<div><dt>획득 합계</dt><dd>'+b.rewardTotal()+'</dd></div>'+spending.map(e=>'<div><dt>'+esc(e.label)+'</dt><dd>−'+e.amount+'</dd></div>').join('')+'<div><dt>수입 − 지출</dt><dd>'+(b.rewardTotal()-spending.reduce((n,e)=>n+e.amount,0))+'</dd></div></dl>'+r.promotions.map(u=>'<p>'+esc(u.name)+' · 승급 조건 도달</p>').join('')+r.nextEffects.map(text=>'<p>'+esc(text)+'</p>').join('')+'</details>';
}

// Optional three-battle operation; never occupies a scheduled boss stage.
CX.missionNames.osgiliath_retreat='오스길리아스 철수전';
P.operationAvailable=function(){const n=this.wave+1;return n%5===2&&!this.linkedOperation?.active&&n>(this.linkedOperation?.cooldownWave||0)&&!STAGE_BOSSES[n]&&!this.weeklySeed;};
P.chooseAnduinOperation=function(){
    if(this.phase!=='reward'||this.campStep!=='ready'||!this.operationAvailable())return false;
    this.linkedOperation={id:'anduin',active:true,startWave:this.wave+1,step:0,bridge:0,scoutSuccess:false,supplies:false,bridgeHeld:false,report:'정찰전 → 두 다리 철수전 → 강변 방어전'};
    this._routeChoice=this.operationStage(this.wave+1);this.save();return true;
};
P.chooseOperationBridge=function(index){
    if(!this.linkedOperation?.active||this.phase!=='preparation'||![0,1].includes(index))return false;
    this.linkedOperation.bridge=index;
    if(this.mission==='osgiliath_retreat')this.arrangeRetreatArmy();
    else if(this.linkedOperation.step===2&&this.linkedOperation.bridgeHeld){
        const bridge=this.terrain.filter(t=>t.active&&t.surface==='bridge')[index];
        for(const u of this.permanent()){const p=this.findMissionDeployment(u,{x:bridge.x,y:bridge.y-230});if(p)Object.assign(u,p);}
    }
    this.save();return true;
};
P.operationStage=function(n){
    const op=this.linkedOperation;if(!op?.active||n!==op.startWave+op.step)return null;
    const info=qaStageInfo.call(this,n);if(info.boss)return null;
    return {...info,map:CX.maps.indexOf('osgiliath'),mission:['scouting','osgiliath_retreat','defense'][op.step],modifier:'clear',linkedStep:op.step,
        title:['안두인 작전 · 정찰전','오스길리아스 철수전','안두인 작전 · 후방 방어전'][op.step],
        ids:op.step===1?['orc_sword','orc_sword','orc_spearman','orc_archer','warg_rider','moria_goblin']:info.ids};
};
const qaStageInfo=P.stageInfo;
P.stageInfo=function(n){return this.operationStage(n)||qaStageInfo.call(this,n);};
P.deploymentBounds=function(){
    if(this.mission==='osgiliath_retreat')return {minY:960,maxY:1185};
    return {minY:285,maxY:this.linkedOperation?.active&&this.linkedOperation.step===2&&this.linkedOperation.bridgeHeld?600:pt.deployY};
};
P.deploymentAllowed=function(p){const zone=this.deploymentBounds();return p.y>=zone.minY&&p.y<=zone.maxY;};
P.findMissionDeployment=function(u,preferred,zone=this.deploymentBounds()){
    const center=preferred||{x:pt.width/2,y:(zone.minY+zone.maxY)/2},all=this.alive(),bridges=this.terrain.filter(t=>t.active&&t.surface==='bridge');
    const allowed=p=>p.y>=zone.minY&&p.y<=zone.maxY&&!(this.mission==='osgiliath_retreat'&&!u._evacuee&&bridges.some(b=>Math.abs(p.x-b.x)<u.radius+80&&p.y>990));
    const near=Be(u,center,all,this.terrain,118,allowed);if(near)return near;
    // Be is a local snap helper capped at 118. A crowded deployment needs a whole-zone search.
    const step=Math.max(48,u.radius*2+12),xs=[],ys=[];
    for(let x=u.radius+12;x<=pt.width-u.radius-12;x+=step)xs.push(x);
    for(let y=zone.minY;y<=zone.maxY;y+=step)ys.push(y);
    xs.sort((a,b)=>Math.abs(a-center.x)-Math.abs(b-center.x));ys.sort((a,b)=>Math.abs(a-center.y)-Math.abs(b-center.y));
    for(const y of ys)for(const x of xs){const p={x,y};if(allowed(p)&&Et(u,p,all,this.terrain))return p;}
    return null;
};
const qaPlaceDeployment=P.placeInDeployment;
P.placeInDeployment=function(u){
    if(this.mission!=='osgiliath_retreat'&&!(this.linkedOperation?.active&&this.linkedOperation.step===2&&this.linkedOperation.bridgeHeld))return qaPlaceDeployment.call(this,u);
    const p=this.findMissionDeployment(u);
    if(!p)return false;Object.assign(u,p);return true;
};
P.arrangeRetreatArmy=function(){
    const bridges=this.terrain.filter(t=>t.active&&t.surface==='bridge'),main=bridges[this.linkedOperation?.bridge||0]||bridges[0];if(!main)return;
    for(const u of this.alive('good').filter(u=>!u._evacuee)){u.x=-1000;u.y=-1000;}
    const all=this.alive('good').filter(u=>!u._evacuee);
    const counts=new Map();
    for(let i=0;i<all.length;i++){
        const u=all[i],bridge=this.unitRole(u)==='cavalry'?bridges[1-(this.linkedOperation?.bridge||0)]||main:main,n=counts.get(bridge.x)||0;
        counts.set(bridge.x,n+1);
        const pos=this.findMissionDeployment(u,{x:bridge.x+(n%3-1)*125,y:Math.min(1170,1030+Math.floor(n/3)*80)});
        if(pos)Object.assign(u,pos);else this.placeInDeployment(u);
    }
};
const qaDeploy=P.deploy;
P.deploy=function(uid,p){
    if(this.mission!=='osgiliath_retreat'&&!(this.linkedOperation?.active&&this.linkedOperation.step===2&&this.linkedOperation.bridgeHeld))return qaDeploy.call(this,uid,p);
    const u=this.unit(uid);if(this.phase!=='preparation'||!u?.alive||u.side!=='good'||!this.deploymentAllowed(p)||!Et(u,p,this.alive(),this.terrain))return false;
    Object.assign(u,p);return true;
};
const qaPrepare=P.prepareStage;
P.prepareStage=function(){
    qaPrepare.call(this);
    for(const u of this.permanent())delete u.retreatTask;
    this.retreatMission=null;
    if(this.linkedOperation?.active){this._altRoute=null;this._altRoute2=null;}
    if(this.mission==='osgiliath_retreat'){
        this.retreatMission={version:1,total:3,required:2,evacuated:0,deadline:10,roundReceipt:0,supplyTicks:0,supplies:false,bridgeTicks:[0,0],reinforced:[],convoys:[]};
        this.arrangeRetreatArmy();
    }
};
P.retreatBrief=function(){
    const m=this.retreatMission;if(!m)return '';
    return '피난 보급대 '+m.evacuated+'/'+m.total+' 철수 · 최소 '+m.required+'대 · 다리를 건너 북쪽 금색 철수선까지 엄호 · 제한 '+m.deadline+'라운드 · '+(this.linkedOperation?.scoutSuccess?'적 증원 R3 동쪽/R6 서쪽':'추격 경로 미확인 · 도착 1라운드 전 전조')+' · 북쪽 중앙 보급품을 2라운드 수비하면 다음 전투 창병 지원';
};
P.retreatOrderReason=function(uid,task){
    if(this.mission!=='osgiliath_retreat'||!['preparation','move','shoot','fight'].includes(this.phase))return '철수전에서만 지시할 수 있습니다';
    if(!['supplies','bridge'].includes(task))return '지시할 임무를 선택하세요';
    if(task==='supplies'&&this.retreatMission?.supplies)return '보급품 회수 완료';
    if(!this.permanent().some(u=>u.uid===uid))return '지시할 병사를 선택하세요';
    if(task==='bridge'&&this.unit(uid).traits.includes('mounted'))return '다리 수비는 도보 병사에게 지시하세요';
    if(this.battleOrder)return '전체 명령을 해제한 뒤 개별 회수를 지시하세요';
    return '';
};
P.orderRetreatTask=function(uid,task){
    if(this.retreatOrderReason(uid,task))return false;
    const u=this.unit(uid);if(u.retreatTask===task)delete u.retreatTask;else u.retreatTask=task;
    this.emit('Mission',u.name+' · '+(u.retreatTask?(task==='supplies'?'보급품 회수':'선택 다리 북측 수비')+' 지시 · 정상 이동력으로 이동 후 2라운드 수비':'개별 임무 지시 해제'));this.save();return true;
};
// Reuse approved terrain art. Routes and zones are UI overlays on the real collision map.
function renderRetreatGuide(scene){
    const b=scene.b,m=b.retreatMission;if(b.mission!=='osgiliath_retreat'||!m||!['preparation','move','shoot','fight'].includes(b.phase))return;
    const g=scene.rings,bridges=b.terrain.filter(t=>t.active&&t.surface==='bridge'),font={fontFamily:'Pretendard',fontSize:'22px',color:'#f6e3a6',backgroundColor:'#17251be6',padding:{x:8,y:5}};
    g.lineStyle(5,0xf6e3a6,.9);g.lineBetween(60,260,pt.width-60,260);
    scene.labels.add(scene.add.text(pt.width/2,220,'북쪽 후방 · 철수선',font).setOrigin(.5));
    for(const bridge of bridges){for(let y=340;y<1200;y+=90){g.lineStyle(3,0xf6e3a6,.55);g.lineBetween(bridge.x,y,bridge.x,y+36);g.lineBetween(bridge.x,y,bridge.x-12,y+16);g.lineBetween(bridge.x,y,bridge.x+12,y+16);}}
    const art=scene.textures.exists('terr_loot_bag')?'terr_loot_bag':'terr_chest_closed';
    if(scene.textures.exists(art))scene.labels.add(scene.add.image(1150,520,art).setDisplaySize(70,60));
    g.lineStyle(3,0xd8b45e,.7);g.strokeCircle(1150,520,190);
    scene.labels.add(scene.add.text(1150,450,m.supplies?'보급품 회수 완료':'보급품 · 수비 '+m.supplyTicks+'/2R',font).setOrigin(.5));
    for(const[round,index]of[[3,1],[6,0]])if(!m.reinforced.includes(round)&&(b.linkedOperation?.scoutSuccess||b.round>=round-1))scene.labels.add(scene.add.text(bridges[index].x,1340,'R'+round+' 추격대 도착', {...font,color:'#ffb09a'}).setOrigin(.5));
}
P.spawnEvacuees=function(){
    const m=this.retreatMission;if(!m||m.convoys.length)return;
    const bridges=this.terrain.filter(t=>t.active&&t.surface==='bridge');
    for(let i=0;i<m.total;i++){
        const bridge=bridges[i===2?1:0],u=this.spawn('terr_cart','good',{x:-1000,y:-1000});
        u.name='피난 보급대 '+(i+1);u._evacuee=true;u.temporary=true;u.autoAlly=true;u.static=true;u.escortee=true;
        u.traits=[];Object.assign(u.baseStats,{move:145,fight:1,strength:2,defence:5,attacks:0,wounds:3,courage:10,might:0,will:0,fate:0,shootRange:0});
        u.resources={might:0,will:0,fate:0};u.currentWounds=3;this.refreshUnit(u);u.goal={x:bridge.x,y:210};
        const pos=this.findMissionDeployment(u,{x:bridge.x,y:1120+(i===1?90:0)},{minY:990,maxY:1330});
        if(!pos){this.units=this.units.filter(v=>v!==u);this.endRun(false,'피난 보급대 배치 공간을 확보하지 못했습니다.');return;}
        Object.assign(u,pos);m.convoys.push(u.uid);
    }
    this.emit('Mission','북쪽으로 2대 이상 철수시키세요. 2대 철수 뒤 즉시 철수하거나 마지막 보급대를 더 지킬 수 있습니다.');
};
const qaWave=P.startWave;
P.startWave=function(){
    if(this.phase!=='preparation')return;
    this.rewardLedger={wave:this.wave+1,openingGold:this.gold,entries:[],spending:[]};this.battleRecord=null;this.tacticalEvents=[];this._appliedCombats=new WeakSet();this._autoRiskReceipt='';this._meritRoundReceipt='';
    for(const u of this.permanent()){u.battleMerit={};u.battleMeritXP=0;u.meritReceipts=[];u.meritWave=this.wave+1;u.damageTaken=0;u.chargeOpen=undefined;}
    qaWave.call(this);
    if(this.mission==='osgiliath_retreat')this.spawnEvacuees();
    if(this.linkedOperation?.active&&this.linkedOperation.step===2&&this.linkedOperation.supplies){
        const u=this.spawn('mt_spearshield','good',{x:-1000,y:-1000});u.temporary=true;u.autoAlly=true;u._stageSupport='anduin';
        if(this.placeInDeployment(u))this.emit('Mission','회수한 보급품으로 창병 지원대가 후방 방어전에 합류했습니다.');
        else{this.units=this.units.filter(v=>v!==u);this.emit('Mission','지원병의 배치 공간이 부족합니다.');}
    }
};
P.moveEvacuees=function(){
    const m=this.retreatMission;if(!m||m.roundReceipt===this.round)return;
    m.roundReceipt=this.round;
    for(const uid of m.convoys){
        const u=this.unit(uid);if(!u?.alive||u.escaped||this.engaged(u))continue;
        const goal=Et(u,u.goal,this.alive(),this.terrain)?u.goal:Be(u,u.goal,this.alive(),this.terrain,220,p=>p.y<=260);if(!goal)continue;
        const route=Terrain.route(u,goal,this.alive(),this.terrain,Infinity)||Terrain.route(u,goal,[],this.terrain,Infinity);if(!route)continue;
        let plan;for(const fraction of [1,.75,.5,.25]){const to=Terrain.prefix(u,route.path,this.terrain,u.stats.move*fraction);plan=ve(u,to,this.alive(),this.terrain,u.stats.move,{snap:false});if(plan&&plan.distance>2)break;}
        if(plan){const from={x:u.x,y:u.y};Object.assign(u,plan.to);this.emit('UnitMoved',undefined,{uid,from,to:plan.to,path:plan.path});}
        if(u.y<=260){u.escaped=true;u.alive=false;m.evacuated++;this.emit('Mission',u.name+' 철수 성공 · '+m.evacuated+'/'+m.total);this.tacticalLog('evacuation',u,u.name+'이 북쪽 후방까지 철수했습니다.');}
    }
    const guards=this.permanent().filter(u=>ht(u,{x:1150,y:520})<190),danger=this.alive('evil').some(u=>ht(u,{x:1150,y:520})<230);
    if(guards.length&&!danger&&!m.supplies){m.supplyTicks++;for(const u of guards)this.awardMerit(u,'objective','supply:'+this.round);if(m.supplyTicks>=2){m.supplies=true;this.emit('Mission','보급품 회수 완료 · 다음 방어전 창병 지원');}}
    const bridges=this.terrain.filter(t=>t.active&&t.surface==='bridge');
    bridges.forEach((bridge,i)=>{const guard=this.permanent().find(u=>!u.traits.includes('mounted')&&Math.abs(u.x-bridge.x)<bridge.w/2&&u.y<bridge.y&&ht(u,bridge)<230),foe=this.alive('evil').some(u=>ht(u,bridge)<230);if(guard&&!foe){m.bridgeTicks[i]++;this.awardMerit(guard,'line','bridge:'+this.round);}});
    for(const [round,index,ids] of [[3,1,['warg_rider','orc_sword']],[6,0,['orc_spearman','orc_archer']]]){
        if(this.round===round-1)this.emit('Mission','다음 라운드 '+(index?'동쪽':'서쪽')+' 강변에 추격대 도착');
        if(this.round>=round&&!m.reinforced.includes(round)){
            m.reinforced.push(round);const before=new Set(this.units.map(u=>u.uid));this.spawnEnemies(ids);
            for(const u of this.alive('evil').filter(u=>!before.has(u.uid))){const pos=Be(u,{x:bridges[index].x,y:1340},this.alive(),this.terrain,200);if(pos)Object.assign(u,pos);}
            this.emit('Mission',(index?'동쪽':'서쪽')+' 추격대 도착');
        }
    }
};
P.retreatStatus=function(){
    const m=this.retreatMission;if(!m)return null;
    const remaining=m.convoys.filter(uid=>this.unit(uid)?.alive).length;
    if(m.evacuated+remaining<m.required)return {terminal:true,success:false,reason:'철수 가능한 보급대가 2대 미만입니다.'};
    if(m.evacuated===m.total)return {terminal:true,success:true,reason:'보급대 전원 철수'};
    if(this.round>=m.deadline)return {terminal:true,success:m.evacuated>=m.required,reason:m.evacuated>=m.required?'추격대를 피해 철수했습니다.':'철수 제한 시간을 넘겼습니다.'};
    return {terminal:false,success:false};
};
P.earlyWithdraw=function(){
    if(this.mission!=='osgiliath_retreat'||!['move','shoot','fight'].includes(this.phase)||this.retreatMission.evacuated<this.retreatMission.required)return false;
    this.retreatMission.early=true;this.tacticalLog('withdrawal',null,'추가 보급대보다 원정대 생존을 우선해 조기 철수했습니다.');this.finishWave();return true;
};
const qaCheckRun=P.checkRun;
P.checkRun=function(){
    if(this.mission!=='osgiliath_retreat'||['preparation','reward','result','menu'].includes(this.phase))return qaCheckRun.call(this);
    if(!this.permanent().length){this.endRun(false,'철수 엄호 부대가 전멸했습니다.');return true;}
    const status=this.retreatStatus();if(!status?.terminal)return false;
    if(status.success)this.finishWave();else this.endRun(false,status.reason);return true;
};
const qaEndRound=P.endRound;
P.endRound=function(){
    if(!['move','shoot','fight'].includes(this.phase))return;
    if(this._meritRoundReceipt!==this.wave+':'+this.round){this._meritRoundReceipt=this.wave+':'+this.round;this.recordRoundMerit();}
    if(this.mission==='osgiliath_retreat'){this.moveEvacuees();if(this.checkRun())return;this.emit('RoundEnded','철수전 라운드 '+this.round+' 종료');this.beginRound();return;}
    if(this.linkedOperation?.active&&this.linkedOperation.step===0&&this.round>=5){this.finishWave();return;}
    return qaEndRound.call(this);
};
P.resolveLinkedBattle=function(){
    const op=this.linkedOperation;if(!op?.active||this.current?.linkedStep!==op.step)return;
    if(op.step===0){
        op.scoutSuccess=(this.scouts||0)>=3;
        op.report=op.scoutSuccess?'정찰 성공 · R3 동쪽/R6 서쪽 추격 경로 공개 · 철수전 다리 선택':'정찰 일부 실패 · 서쪽 다리로 먼저 집결하거나 동쪽 우회 선택';
        if(op.scoutSuccess)this.expeditionIntel=this.wave+1;
    }else if(op.step===1){
        const m=this.retreatMission;op.supplies=!!m.supplies;op.bridgeHeld=m.bridgeTicks.some(n=>n>=2);op.evacuated=m.evacuated;
        if(m.supplies)this.grantGold('anduin-supplies','철수 보급품',25);
        if(m.evacuated===m.total)this.grantGold('anduin-full-evac','보급대 전원 철수',20);
        op.report=(m.early?'조기 철수 · 선택한 다리 후방에 집결':m.evacuated===m.total?'전원 철수':'일부 철수')+(op.bridgeHeld?' · 다리 확보: 후방 방어전 전진 배치(y≤600)·양쪽 다리 선택':' · 기존 배치 구역에서 후방 방어')+(m.supplies?' · 다음 전투 창병 지원':' · 보급대 추가 없이 기존 병력 방어');
    }else{
        op.active=false;op.cooldownWave=this.wave+5;op.report='안두인 작전 종료 · 다음 스테이지부터 일반 원정';
    }
    if(op.active)op.step++;
};

function operationChoiceHTML(b){
    if(b.linkedOperation?.active)return '<section class="qa-operation"><h3>안두인 연계 작전</h3><p>'+esc(b.linkedOperation.report)+'</p><small>다음 전투 '+(b.linkedOperation.step+1)+'/3 · 보스 공세 전에 일반 원정 복귀</small></section>';
    return b.operationAvailable()?'<section class="qa-operation"><h3>안두인 연계 작전</h3><p>정찰 → 두 다리 철수 → 후방 방어. 보급대 2/3 철수가 승리 조건입니다. 기존 무작위 경로도 선택할 수 있습니다.</p><button type="button" class="secondary" id="anduin-operation">연계 작전 선택 · 3전투</button></section>':'';
}
function installPlaytestUI(){
    const settings=document.querySelector('.settings-doctrine')?.parentElement;
    if(settings&&!document.getElementById('qa-auto-pause')){
        const box=document.createElement('fieldset');box.id='qa-auto-pause';box.innerHTML='<legend>자동전투 일시정지</legend>'+[['hero','영웅 포위·치명상 위험'],['objective','임무 실패 위험'],['choice','진화·승급·중요 선택']].map(([key,label])=>'<label><input type="checkbox" data-auto-pause="'+key+'">'+label+'</label>').join('');settings.appendChild(box);
        box.querySelectorAll('input').forEach(input=>{let saved;try{saved=JSON.parse(localStorage.getItem('lwb-auto-pause')||'null');}catch{}q.autoPauseSettings=q.autoPauseSettings||saved||{hero:true,objective:true,choice:true};input.checked=q.autoPauseSettings[input.dataset.autoPause]!==false;input.onchange=()=>{q.autoPauseSettings[input.dataset.autoPause]=input.checked;localStorage.setItem('lwb-auto-pause',JSON.stringify(q.autoPauseSettings));q.save();};});
    }
    const field=document.querySelector('#app .field');
    if(field&&!document.getElementById('qa-mission'))field.insertAdjacentHTML('beforeend','<details id="qa-mission" hidden><summary>안두인 작전</summary><p></p><div class="qa-bridge-choice"><button type="button" data-bridge-choice="0">서쪽 다리 집결</button><button type="button" data-bridge-choice="1">동쪽 다리 집결</button></div><button type="button" id="qa-supplies">선택 병사 · 보급 회수 명령</button><button type="button" id="qa-bridge-guard">선택 보병 · 다리 수비 명령</button><button type="button" id="qa-withdraw">지금 철수</button></details>');
    const qaRender=Yt;Yt=function(){
        qaRender();
        const op=document.getElementById('anduin-operation');if(op)op.onclick=()=>Rt(()=>q.chooseAnduinOperation());
        if(q.linkedOperation?.active)document.querySelectorAll('[data-route]').forEach(button=>{button.disabled=true;button.title='연계 작전 중에는 지정 전장을 진행합니다';});
        const mission=document.getElementById('qa-mission');if(mission){
            mission.hidden=!q.linkedOperation?.active||!['preparation','move','shoot','fight'].includes(q.phase);
            mission.querySelector('summary').textContent=q.mission==='osgiliath_retreat'?'철수 '+(q.retreatMission?.evacuated||0)+'/3 · '+q.round+'/10R':CX.missionNames[q.mission]+' · 연계 '+(q.linkedOperation?.step+1)+'/3';
            mission.querySelector('p').textContent=q.retreatBrief()||q.linkedOperation?.report||'';
            mission.querySelector('.qa-bridge-choice').hidden=q.phase!=='preparation'||!(q.mission==='osgiliath_retreat'||q.linkedOperation?.step===2&&q.linkedOperation.bridgeHeld);
            mission.querySelectorAll('[data-bridge-choice]').forEach(button=>{button.setAttribute('aria-pressed',String(q.linkedOperation?.bridge===Number(button.dataset.bridgeChoice)));button.onclick=()=>Rt(()=>q.chooseOperationBridge(Number(button.dataset.bridgeChoice)));});
            const supply=mission.querySelector('#qa-supplies'),reason=q.retreatOrderReason(q.selected,'supplies');supply.hidden=q.mission!=='osgiliath_retreat';supply.disabled=!!reason;supply.title=reason||'자동전투 우선순위 · CP/Might 소모 없음 · 정상 이동력 사용';supply.textContent=q.unit(q.selected)?.retreatTask==='supplies'?'보급 회수 명령 해제':'선택 병사 · 보급 회수 명령';supply.onclick=()=>Rt(()=>q.orderRetreatTask(q.selected,'supplies'));
            const guard=mission.querySelector('#qa-bridge-guard');guard.hidden=q.mission!=='osgiliath_retreat';guard.disabled=!!q.retreatOrderReason(q.selected,'bridge');guard.title=q.retreatOrderReason(q.selected,'bridge')||'무료 전술 지시 · 정상 이동력으로 다리 북측 이동 후 2라운드 수비';guard.textContent=q.unit(q.selected)?.retreatTask==='bridge'?'다리 수비 명령 해제':'선택 보병 · 다리 수비 명령';guard.onclick=()=>Rt(()=>q.orderRetreatTask(q.selected,'bridge'));
            const withdraw=mission.querySelector('#qa-withdraw');withdraw.hidden=q.mission!=='osgiliath_retreat'||q.phase==='preparation';withdraw.disabled=(q.retreatMission?.evacuated||0)<2;withdraw.textContent='지금 철수 · '+(q.retreatMission?.evacuated||0)+'/2대';withdraw.onclick=()=>Rt(()=>q.earlyWithdraw());
        }
    };
    const qaDock=renderDock;renderDock=function(){qaDock();let panel=document.getElementById('qa-forecast');const actions=document.querySelector('#command-dock .u-actions');if(!panel&&actions){panel=document.createElement('p');panel.id='qa-forecast';panel.setAttribute('aria-live','polite');actions.prepend(panel);}if(panel)panel.hidden=!UX.intent;if(UX.intent){const forecast=q.actionForecast(UX.intent);if(panel)panel.textContent=forecast.text;const button=document.getElementById('dock-primary');if(button)button.disabled=!forecast.allowed;}};
    const qaAuto=me;me=function(){if(q.checkAutoRisk())return;return qaAuto();};
    const qaEvolve=P.evolveHero;P.evolveHero=function(u){const changed=qaEvolve.call(this,u);if(changed)this.stopAutoForChoice(u.name+' 진화');return changed;};
}
