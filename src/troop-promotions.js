/* Individual troop careers. Embedded by tools/build.js before Phaser preload. */
const TROOP_PROMOTIONS = /*__TROOP_DATA__*/ {};
const TROOP_NEW_UNITS = /*__TROOP_NEW_UNITS__*/ [];
const troopGroup = new Map(), troopEdges = new Map();
for (const [group, ids] of Object.entries(TROOP_PROMOTIONS.groups)) for (const id of ids) troopGroup.set(id, group);
for (const edge of TROOP_PROMOTIONS.edges) troopEdges.set(edge.from, edge);
function troopId(id) { return TROOP_PROMOTIONS.aliases[id] || id; }
function isCareerTroop(u) {
    const d = UnitCatalog[typeof u === 'string' ? u : u?.id];
    return !!d && !isHeroUnit(d.id, d.meta.role) && !d.uniqueKey && !d.profile.traits.some(t => ['hero','monster','boss','wizard'].includes(t)) && ['infantry','cavalry'].includes(d.meta.role);
}
for (const def of TROOP_NEW_UNITS) {
    registerUnit(def);
    WARBAND_POINTS.profiles[def.id] = {points:def.points,kind:'custom',basis:def.basis,note:'공식 포인트 미검증 · 게임 프로필 자체 산정',origin:def.origin};
    if(typeof UNIT_ART_PROFILES!=='undefined')UNIT_ART_PROFILES[def.id] = def.artProfile;
}
// Resolve duplicated recruitment entries without deleting any existing sprite or save ID.
for (const [alias, canonical] of Object.entries(TROOP_PROMOTIONS.aliases)) {
    if (UnitCatalog[alias]) { UnitCatalog[alias].recruitable=false; UnitCatalog[alias].troopAlias=canonical; }
    for (let i=CX.recruits.length-1;i>=0;i--) if(CX.recruits[i]===alias) CX.recruits.splice(i,1);
    if (troopGroup.has(canonical)) troopGroup.set(alias,troopGroup.get(canonical));
}
for (const [id, group] of troopGroup) {
    const d=UnitCatalog[id]; if(!d)continue;
    d.career={group,tier:0,origin:'existing',official:WARBAND_POINTS.profiles[id]?.kind==='book',terminal:!troopEdges.has(troopId(id))};
    if (['rivendell','lothlorien','mirkwood','iron_hills','dol_amroth','dale','umbar'].includes(group)) {
        d.meta.faction=group;q.meta.get(id).faction=group;
    }
}
for(const def of TROOP_NEW_UNITS) UnitCatalog[def.id].career.origin=def.origin;
// Translate displayed specialist tags to rules the existing battle solver actually consumes.
for(const id of TROOP_NEW_UNITS.map(d=>d.id).concat('palace_guard')){
    const p=zt[id],d=UnitCatalog[id];if(!p||!d)continue;
    if(p.traits.includes('woodland')&&!p.traits.includes('ranger'))p.traits.push('ranger');
    if(p.traits.includes('sharpshooter')&&!p.traits.includes('veteran'))p.traits.push('veteran');
    d.profile=structuredClone(p);
}
for (const edge of TROOP_PROMOTIONS.edges) for(const id of edge.to) if(UnitCatalog[id]?.career) UnitCatalog[id].career.tier=Math.max(UnitCatalog[id].career.tier,edge.tier);
// The existing tracker drawing already carries a bow and quiver; correct the melee-only profile.
for(const p of [zt.orc_tracker,UnitCatalog.orc_tracker?.profile]) if(p) Object.assign(p,{strength:3,defence:3,shootValue:4,shootRange:740,traits:[]});
if(UnitCatalog.orc_tracker){UnitCatalog.orc_tracker.meta.weapon='bow';q.meta.get('orc_tracker').weapon='bow';}
// Existing High Elf and Palace Guard profiles were misclassified as generic Elves.
for(const id of ['elf_swordshield','elf_spear','elf_bow'])for(const p of [zt[id],UnitCatalog[id]?.profile])if(p)p.defence=id==='elf_swordshield'?6:5;
for(const p of [zt.palace_guard,UnitCatalog.palace_guard?.profile])if(p)Object.assign(p,{fight:5,defence:6,traits:[...new Set([...p.traits,'elf','bodyguard'])]});
for(const id of ['gondor_knight','dol_amroth_knight','elf_knight','elven_lancer','galadhrim_knight'])for(const p of [zt[id],UnitCatalog[id]?.profile])if(p&&!p.traits.includes('lance'))p.traits.push('lance');
Object.assign(FACTION_KO,{dol_amroth:'돌 암로스',iron_hills:'철산',mirkwood:'미르크우드',dale:'데일'});

P.troopGateReason=function(id){
    const d=UnitCatalog[id],gate=TROOP_PROMOTIONS.gates[id];
    if(d?.meta.side==='evil'&&!this.rank('darkpact'))return '어둠의 계약 유물 필요';
    if(gate&&((gate.relic&&!this.rank(gate.relic))||(gate.wave&&this.wave<gate.wave)||(gate.hero&&!this.permanent().some(u=>(UnitCatalog[u.id]?.uniqueKey||u.id).startsWith(gate.hero)))))return gate.label;
    return '';
};
P.initTroopCareer=function(u,legacy=false){
    if(!isCareerTroop(u))return u;
    const old=zt[u.id];
    if(legacy&&!u.careerVersion){
        // Remove only the old automatic rank increments; retain equipment, event gains and injury.
        if(u.traits.includes('veteran')&&!old.traits.includes('veteran')){
            for(const k of ['fight','defence'])u.baseStats[k]=Math.max(0,u.baseStats[k]-1);
            u.traits=u.traits.filter(t=>t!=='veteran');
        }
        if(u.traits.includes('champion')&&!old.traits.includes('champion')){
            u.baseStats.courage=Math.max(0,u.baseStats.courage-2);
            if(u.injuryBackup?.attacks!=null)u.injuryBackup.attacks=Math.max(1,u.injuryBackup.attacks-1);
            else u.baseStats.attacks=Math.max(1,u.baseStats.attacks-1);
            u.traits=u.traits.filter(t=>t!=='champion');
        }
        u.xp=Math.min(112,Math.max(0,Math.floor(u.veteranXP||0))*3);
        u.battlesParticipated=Math.min(11,Math.floor((u.veteranXP||0)/3));
    }
    u.entryUnitId=isCareerTroop(u.entryUnitId)?u.entryUnitId:(u.promotionHistory?.[0]?.from||u.id);
    if(!Number.isSafeInteger(u.entryPoints)||u.entryPoints<=0||u.entryPoints>1000||u.entryPoints!==this.pointCost(u.entryUnitId))u.entryPoints=this.pointCost(u.entryUnitId);
    u.xp=Number.isSafeInteger(u.xp)&&u.xp>=0?u.xp:0;
    u.battlesParticipated=Number.isSafeInteger(u.battlesParticipated)&&u.battlesParticipated>=0?u.battlesParticipated:0;
    u.promotionHistory=Array.isArray(u.promotionHistory)?u.promotionHistory:[];
    u.currentTroopId=u.id;u.careerVersion=1;u.points=u.entryPoints;
    return u;
};
const troopSpawn=P.spawn;
P.spawn=function(id,side,pos){return this.initTroopCareer(troopSpawn.call(this,id,side,pos));};
P.unitFormationPoints=function(u){return isCareerTroop(u)?this.initTroopCareer(u).entryPoints:this.pointCost(u.id);};
P.rosterPoints=function(){return this.permanent().reduce((sum,u)=>sum+this.unitFormationPoints(u),0);};
const troopValidTargets=P.validTargets;
P.validTargets=function(u){if(u&&isCareerTroop(u)&&this.meta.get(u.id)?.weapon==='crossbow'&&(u.moved||u.movementSpent>0))return [];return troopValidTargets.call(this,u);};
const troopShoot=P.shoot;
P.shoot=function(uid,target){const u=this.unit(uid);if(u&&isCareerTroop(u)&&this.meta.get(u.id)?.weapon==='crossbow'&&(u.moved||u.movementSpent>0))return false;return troopShoot.call(this,uid,target);};
const careerShot=Xe;
Xe=function(a,target,terrain,rng,all){const prior=a.eqRerollHit;if(isCareerTroop(a)&&a.traits.includes('sharpshooter')&&!a.moved)a.eqRerollHit=true;try{return careerShot(a,target,terrain,rng,all);}finally{a.eqRerollHit=prior;}};
P.careerBodyguard=function(u){return !!u?.traits.includes('bodyguard')&&this.alive(u.side).some(v=>v!==u&&isHeroUnit(v.id));};
for(const method of ['move','charge']){
    const action=P[method];if(!action)continue;
    P[method]=function(uid,...args){const u=this.unit(uid),prior=u?.fearless;if(u&&this.careerBodyguard(u))u.fearless=true;try{return action.call(this,uid,...args);}finally{if(u)u.fearless=prior;}};
}
const careerRound=P.beginRound;
P.beginRound=function(){const guarded=this.alive().filter(u=>this.careerBodyguard(u)).map(u=>[u,u.fearless]);for(const[u]of guarded)u.fearless=true;try{return careerRound.call(this);}finally{for(const[u,prior]of guarded)u.fearless=prior;}};
const troopRoll=P.rollRecruits;
P.rollRecruits=function(){
    const disabled=[];
    for(const d of Object.values(UnitCatalog))if(isCareerTroop(d.id)&&this.troopGateReason(d.id)&&d.enabled){disabled.push(d);d.enabled=false;}
    try{return troopRoll.call(this);}finally{for(const d of disabled)d.enabled=true;}
};
const troopSelection=P.recruitSelection;
P.recruitSelection=function(i){const id=this.recruitOffers?.[i]?.id,reason=id&&isCareerTroop(id)&&this.troopGateReason(id);return reason?{reason}:troopSelection.call(this,i);};
const troopDraftReason=P.draftReason;
P.draftReason=function(draft,quantities){for(const i of draft||[]){const id=this.recruitOffers?.[i]?.id,reason=id&&isCareerTroop(id)&&this.troopGateReason(id);if(reason)return reason;}return troopDraftReason.call(this,draft,quantities);};

P.troopPromotionOptions=function(u){
    if(!u||!isCareerTroop(u)||u.temporary)return [];
    this.initTroopCareer(u);
    if(u.careerMountLost)return [{id:u.careerMountLost,tier:0,xp:0,battles:0,cost:30,mount:TROOP_PROMOTIONS.mounts[u.careerMountLost]?.kind||'horse',remount:true}];
    const edge=troopEdges.get(troopId(u.id));if(!edge)return [];
    const tier=Math.max(edge.tier,(u.promotionHistory.length||0)+1);if(tier>3)return [];
    return edge.to.filter(id=>isCareerTroop(id)&&UnitCatalog[id].enabled).map(id=>{
        const mounted=UnitCatalog[id].profile.traits.includes('mounted')&&!u.traits.includes('mounted');
        return {id,tier,xp:TROOP_PROMOTIONS.thresholds[tier-1],battles:TROOP_PROMOTIONS.minimumBattles[tier-1],cost:25+tier*20+(mounted?35:0),mount:mounted?(TROOP_PROMOTIONS.mounts[id]?.kind||'horse'):null};
    });
};
P.promotionReason=function(u,o){
    if(!u?.alive||u.side!=='good'||u.temporary||!isCareerTroop(u))return '영구 편성 병사만 승급할 수 있습니다';
    if(!['reward','preparation'].includes(this.phase))return '전투가 끝난 뒤 선택하세요';
    const gate=this.troopGateReason(o.id);if(gate&&(!o.remount||UnitCatalog[o.id]?.meta.side==='evil'))return gate;
    if(u.xp<o.xp)return '경험치 '+u.xp+'/'+o.xp;
    if(u.battlesParticipated<o.battles)return '전투 참여 '+u.battlesParticipated+'/'+o.battles+'회';
    if(this.gold<o.cost)return '금화 '+o.cost+' 필요';
    if(o.mount&&o.mount!=='spectral'){
        const count=o.mount==='horse'?this.horses:this.troopMounts?.[o.mount];
        if(!(count>0))return ({horse:'군마',warg:'와르그',goat:'산양',camel:'낙타',chariot:'전차'}[o.mount]||'탈것')+' 1 필요';
    }
    return '';
};
P.pendingTroopPromotions=function(){return this.permanent().filter(u=>this.troopPromotionOptions(u).some(o=>u.xp>=o.xp&&u.battlesParticipated>=o.battles));};
P.buyTroopMount=function(kind){
    const cost={horse:40,warg:50,goat:55,camel:50,chariot:90}[kind];
    if(!cost||!['reward','preparation'].includes(this.phase)||this.gold<cost||(kind==='warg'&&!this.rank('darkpact')))return false;
    this.gold-=cost;
    if(kind==='horse')this.horses=(this.horses||0)+1;else{this.troopMounts=this.troopMounts||{};this.troopMounts[kind]=(this.troopMounts[kind]||0)+1;}
    this.save();return true;
};
P.applyTroopProfile=function(u,target){
    const prev=zt[u.id],next=zt[target],d=UnitCatalog[target];if(!prev||!next||!d)return false;
    const base=structuredClone(u.baseStats),hp=u.currentWounds;
    if(u.injuryBackup)for(const [k,n]of Object.entries(u.injuryBackup))if(Number.isFinite(n))base[k]=n;
    const replacement=structuredClone(next);
    for(const k of Object.keys(next))if(Number.isFinite(next[k])&&Number.isFinite(prev[k])&&Number.isFinite(base[k]))replacement[k]+=base[k]-prev[k];
    if(u.injury==='leg'){u.injuryBackup={...u.injuryBackup,move:replacement.move};replacement.move=Math.round(replacement.move*.75);}
    if(u.injury==='arm'){u.injuryBackup={...u.injuryBackup,attacks:replacement.attacks};replacement.attacks=Math.max(1,replacement.attacks-1);}
    u.traits=[...new Set([...u.traits.filter(t=>!prev.traits.includes(t)&&!['mounted','dismounted','champion','veteran'].includes(t)),...next.traits])];
    u.id=target;u.currentTroopId=target;u.name=d.meta.name_ko;u.baseStats=replacement;
    u.radius=(d.meta.baseMm||25)*UNIT_RULES.worldPerMm/2;u.visualRadius=d.meta.visualRadius||u.radius;u.artScale=d.meta.artScale||1;
    this.refreshUnit(u);u.currentWounds=Math.min(hp,u.stats.wounds);u.points=u.entryPoints;
    return true;
};
P.promoteTroop=function(uid,target){
    const u=this.unit(uid),o=this.troopPromotionOptions(u).find(o=>o.id===target);if(!o)return false;
    this.promotionError=this.promotionReason(u,o);if(this.promotionError)return false;
    const before=structuredClone(u),from=u.id,budget=this.rosterPoints();
    this.applyTroopProfile(u,target);
    // A larger cavalry footprint must have a legal place before resources are charged.
    const pos=Be(u,{x:u.x,y:u.y},this.alive(),this.terrain||[],160);
    if(!pos||this.rosterPoints()!==budget){Object.keys(u).forEach(k=>delete u[k]);Object.assign(u,before);this.promotionError='기병 배치 공간이 부족합니다. 병사를 옮긴 뒤 다시 선택하세요';return false;}
    Object.assign(u,pos);this.gold-=o.cost;
    if(o.mount&&o.mount!=='spectral'){if(o.mount==='horse')this.horses--;else this.troopMounts[o.mount]--;}
    if(o.remount)delete u.careerMountLost;
    else u.promotionHistory.push({from,to:target,xp:u.xp,kills:u.kills||0,wave:this.wave,tier:o.tier,entryPoints:u.entryPoints});
    this.unlockAch('promoted');this.emit('TroopPromoted',UnitCatalog[from].meta.name_ko+' → '+u.name+' · 최초 '+u.entryPoints+'pt 유지',{uid,from,to:target});
    this.save();return true;
};
const troopMountReason=P.mountPointReason;
P.mountPointReason=function(u,v){return isCareerTroop(u)?'병종 승급 창에서 기병 전직을 선택하세요':troopMountReason.call(this,u,v);};
const troopDismount=P.dismount;
P.dismount=function(u){
    const mount=TROOP_PROMOTIONS.mounts[u?.id];
    if(isCareerTroop(u)&&u.traits.includes('mounted')&&mount){
        const mountedId=u.id;this.initTroopCareer(u);this.applyTroopProfile(u,mount.foot);u.careerMountLost=mountedId;
        u.traits.push('dismounted');this.emit('UnitDismounted',u.name+' 낙마 · 최초 '+u.entryPoints+'pt 유지',{uid:u.uid});return;
    }
    troopDismount.call(this,u);
};
const troopKill=P._trkKill;
P._trkKill=function(k,v){
    troopKill.call(this,k,v);
    if(k.side==='good'&&v.side==='evil'&&isCareerTroop(k)&&!k.temporary){
        this.initTroopCareer(k);const prior=k.careerKillWave===this.wave?(k.careerKillXP||0):0;
        const amount=Math.min(TROOP_PROMOTIONS.experience.kill,TROOP_PROMOTIONS.experience.killCapPerBattle-prior);
        k.xp+=Math.max(0,amount);k.careerKillWave=this.wave;k.careerKillXP=prior+Math.max(0,amount);
    }
};
const troopStartWave=P.startWave;
P.startWave=function(){
    const was=this.phase,nextWave=this.wave+1;
    // Count the deployed army before the round starts (a one-round victory may finish immediately).
    if(was==='preparation')for(const u of this.permanent())if(isCareerTroop(u)&&u.careerParticipationWave!==nextWave){
        this.initTroopCareer(u);u.xp+=TROOP_PROMOTIONS.experience.participation;u.battlesParticipated++;u.careerParticipationWave=this.wave;
        u.careerParticipationWave=nextWave;
    }
    troopStartWave.call(this);
};
const troopFinish=P.finishWave;
P.finishWave=function(){
    if(this.phase==='reward'||this.phase==='result')return;
    for(const u of this.permanent())if(isCareerTroop(u)&&u.careerParticipationWave===this.wave&&u.careerSurvivalWave!==this.wave){
        this.initTroopCareer(u);u.xp+=TROOP_PROMOTIONS.experience.survival;u.careerSurvivalWave=this.wave;
    }
    troopFinish.call(this);this.save();
};
const troopState=P._saveState;
P._saveState=function(){return {...troopState.call(this),troopPromotionVersion:1,troopMounts:structuredClone(this.troopMounts||{}),promotionDeferredWave:this.promotionDeferredWave??-1};};
const troopResume=P.resume;
P.resume=function(){
    // Migrate incoming units before older point-budget wrappers call rosterPoints().
    const incoming=this._incomingSaveRaw;let state;
    try{state=JSON.parse(incoming??localStorage.getItem('mesbg-endless-save'));}catch{return false;}
    if(Array.isArray(state?.units))for(const u of state.units)if(u&&isCareerTroop(u)){
        u.baseStats=u.baseStats||structuredClone(zt[u.id]);u.traits=Array.isArray(u.traits)?u.traits:zt[u.id].traits.slice();this.initTroopCareer(u,true);
    }
    this._incomingSaveRaw=JSON.stringify(state);let ok;
    try{ok=troopResume.call(this);}finally{if(incoming===undefined)delete this._incomingSaveRaw;else this._incomingSaveRaw=incoming;}
    if(!ok)return false;
    for(const u of this.units)if(isCareerTroop(u)){this.initTroopCareer(u,true);this.refreshUnit(u);}
    this.troopMounts=this.troopMounts||{};
    for(const kind of Object.keys(this.troopMounts))if(!Number.isSafeInteger(this.troopMounts[kind])||this.troopMounts[kind]<0)this.troopMounts[kind]=0;
    return true;
};
const troopStart=P.start;
P.start=function(mode){this.troopMounts={};this.promotionDeferredWave=-1;return troopStart.call(this,mode);};
function troopTreeText(id,depth=0,seen=new Set()){
    if(depth>3||seen.has(id))return '';seen.add(id);const e=troopEdges.get(troopId(id));
    return e?e.to.map(to=>'<li>'+esc(UnitCatalog[to]?.meta.name_ko||to)+' · '+(UnitCatalog[to]?.profile.traits.includes('mounted')?'기병':'보병')+'<small>'+esc(q.troopGateReason(to))+'</small><ul>'+troopTreeText(to,depth+1,new Set(seen))+'</ul></li>').join(''):'';
}
function troopProfileSection(u){
    if(!isCareerTroop(u)||u.temporary)return '';
    q.initTroopCareer(u);
    return '<section class="troop-career"><h3>현재 병종 · '+esc(q.meta.get(u.id).name_ko)+'</h3><p>최초 영입 '+u.entryPoints+'pt 유지 · 경험치 '+u.xp+' · 전투 '+u.battlesParticipated+'회</p><p>'+u.promotionHistory.map(h=>esc(UnitCatalog[h.to]?.meta.name_ko||h.to)).join(' → ')+'</p><ul>'+troopTreeText(u.id)+'</ul><button type="button" class="secondary" data-troop-career="'+u.uid+'">승급 선택 / 조건 확인</button></section>';
}
const careerWeaponNames={sword:'검',sword_shield:'검·방패',spear:'창',spear_shield:'창·방패',bow:'활',crossbow:'석궁',pike:'장창',twohanded:'양손무기',axe:'도끼',lance:'기창',dagger:'단검'};
const careerTraitNames={mounted:'기병 돌격',spear:'창 지원',lance:'기창 돌격',shieldwall:'인접 방벽 · 방어 +1',steadfast:'견고한 전열 · 밀림 감소',bodyguard:'지휘 영웅 생존 시 공포 면역',elf:'엘프',dwarf:'난쟁이',veteran:'결투 최저 주사위 재굴림',sharpshooter:'정지 사격 명중 재굴림',ranger:'이동 사격 페널티 없음',woodland:'숲 정찰',mountain:'산 지형 통과',crossbow:'이동 후 사격 불가',twohanded:'양손무기',fearless:'공포 면역',dagger:'단검',terror:'공포'};
function openTroopPromotion(uid,manual=false){
    if(!['reward','preparation'].includes(q.phase))return;
    const ready=q.pendingTroopPromotions(),u=q.unit(uid)||ready[0];if(!u||!isCareerTroop(u))return;
    let box=document.getElementById('troop-promotion');
    if(!box){box=document.createElement('div');box.id='troop-promotion';box.setAttribute('role','dialog');box.setAttribute('aria-modal','true');box.setAttribute('aria-labelledby','troop-promotion-title');document.body.appendChild(box);}
    const options=q.troopPromotionOptions(u),stats=['fight','strength','defence','attacks','courage','move'],labels=['결투','힘','방어','공격','용기','이동'];
    box.innerHTML='<div class="modal troop-promotion-modal"><div class="eyebrow">병사의 전직 · '+ready.length+'명 승급 가능</div><h2 id="troop-promotion-title">전장에서 쌓은 경험</h2><div class="promotion-current">'+unitImage(u.id)+'<div><strong>'+esc(q.meta.get(u.id).name_ko)+'</strong><p>경험치 '+u.xp+' · '+u.battlesParticipated+'회 참전 · '+(u.kills||0)+'처치</p><b>최초 '+u.entryPoints+'pt → 전직 후 '+u.entryPoints+'pt</b></div></div><div class="promotion-soldiers">'+ready.map(v=>'<button type="button" class="secondary" data-career-uid="'+v.uid+'"'+(v.uid===u.uid?' aria-current="true"':'')+'>'+esc(v.name)+'</button>').join('')+'</div><div class="promotion-choices">'+options.map(o=>{
        const d=UnitCatalog[o.id],p=d.profile,reason=q.promotionReason(u,o);
        return '<article class="promotion-choice"><header>'+unitImage(o.id)+'<div><small>'+ (p.traits.includes('mounted')?'기병 · 돌격':'보병 · '+(p.shootRange?'사격':p.traits.includes('spear')?'창 지원':'전열'))+'</small><h3>'+esc(d.meta.name_ko)+'</h3><p>'+esc(careerWeaponNames[d.meta.weapon]||d.meta.weapon)+' · '+o.cost+'금 · '+(d.career?.origin==='custom'?'게임 확장':d.career?.origin==='legacy'?'구판 병종':'MESBG 병종')+'</p></div></header><dl>'+stats.map((s,i)=>'<div><dt>'+labels[i]+'</dt><dd>'+zt[u.id][s]+' → '+p[s]+'</dd></div>').join('')+'</dl><p>무장 '+esc(careerWeaponNames[d.meta.weapon]||d.meta.weapon)+' · '+(p.shootRange?'사거리 '+p.shootRange+' / 명중 '+p.shootValue+'+':'근접')+'</p><p>능력 '+esc(p.traits.map(t=>careerTraitNames[t]||t).join(' · ')||'기본 전투')+'</p><p>필요 경험치 '+o.xp+' · 참전 '+o.battles+'회'+(o.mount?' · 탈것 1':'')+'</p><button type="button" class="primary" data-promote="'+o.id+'"'+(reason?' disabled':'')+'>'+esc(reason||'전직 · '+u.entryPoints+'pt 유지')+'</button>'+(o.mount&&o.mount!=='spectral'?'<button type="button" class="secondary" data-career-mount="'+o.mount+'">'+esc(({horse:'군마',warg:'와르그',goat:'산양',camel:'낙타',chariot:'전차'})[o.mount])+' 확보 · '+({horse:40,warg:50,goat:55,camel:50,chariot:90})[o.mount]+'금</button>':'')+'</article>';
    }).join('')+'</div><p class="promotion-error" role="status">'+esc(q.promotionError||(!options.length?'현재 병종은 이 계통의 최종 병종입니다':''))+'</p><footer><button type="button" class="secondary" id="promotion-defer">'+(manual?'닫기':'이번에는 보류')+'</button></footer></div>';
    box.querySelectorAll('[data-promote]').forEach(btn=>btn.onclick=()=>{if(q.promoteTroop(u.uid,btn.dataset.promote)){box.remove();Yt();}else openTroopPromotion(u.uid,manual);});
    box.querySelectorAll('[data-career-uid]').forEach(btn=>btn.onclick=()=>openTroopPromotion(btn.dataset.careerUid,manual));
    box.querySelectorAll('[data-career-mount]').forEach(btn=>btn.onclick=()=>{q.promotionError=q.buyTroopMount(btn.dataset.careerMount)?'':'금화 또는 해금 조건을 확인하세요';openTroopPromotion(u.uid,manual);});
    box.querySelector('#promotion-defer').onclick=()=>{q.promotionDeferredWave=q.wave;q.promotionError='';q.save();box.remove();};
}
function renderTroopPromotions(){
    if(q.phase==='reward'&&q.promotionDeferredWave!==q.wave&&!document.getElementById('troop-promotion')&&q.pendingTroopPromotions().length)openTroopPromotion();
    if(!['reward','preparation'].includes(q.phase))document.getElementById('troop-promotion')?.remove();
}
if(typeof Yt==='function'){
    const troopRender=Yt;Yt=function(){troopRender();renderTroopPromotions();};
}
if(typeof unitCardModal==='function'){
    const troopCard=unitCardModal;
    unitCardModal=function(u){troopCard(u);const card=document.querySelector('#unit-profile .modal');if(card&&isCareerTroop(u)&&u.uid){card.querySelector('footer')?.insertAdjacentHTML('beforebegin',troopProfileSection(u));card.querySelector('[data-troop-career]')?.addEventListener('click',()=>openTroopPromotion(u.uid,true));}};
}
if(window.MESBG){window.MESBG.troopPromotions=TROOP_PROMOTIONS;window.MESBG.isCareerTroop=isCareerTroop;}
