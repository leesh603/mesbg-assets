// Ownership is independent of the army selected for a battle.
P.permanent=function(){return this.units.filter(u=>u.alive&&u.side==='good'&&!u.temporary);};
const deploymentAlive=P.alive;
P.alive=function(side){return deploymentAlive.call(this,side).filter(u=>!u.inReserve);};
P.deployedPoints=function(){return this.alive('good').filter(u=>!u.temporary).reduce((n,u)=>n+this.unitFormationPoints(u),0);};
P.deploymentReason=function(){
    const army=this.alive('good').filter(u=>!u.temporary),over=this.deployedPoints()-this.capacity();
    if(!army.length)return '출전할 부대를 1명 이상 선택하세요';
    if(over>0)return '출전 포인트 '+over+'pt 초과 · 출전 편성에서 대기 부대를 정하세요';
    if(army.some(u=>u.x<0||u.y<0))return '출전 부대의 배치 위치를 정하세요';
    return '';
};
P.assignRecruitDeployment=function(u){
    u.inReserve=true;u.x=-1000;u.y=-1000;
    if(this.deployedPoints()+this.unitFormationPoints(u)<=this.capacity()){
        u.inReserve=false;
        if(!this.placeInDeployment(u)){u.inReserve=true;u.x=-1000;u.y=-1000;}
    }
};
const deploymentPlace=P.placeInDeployment;
P.placeInDeployment=function(u){return u.inReserve?false:deploymentPlace.call(this,u);};
P.toggleDeployment=function(uid){
    if(!this.canEditDeployment())return false;
    const u=this.unit(uid);if(!u?.alive||u.side!=='good'||u.temporary)return false;
    this.deploymentError='';
    if(!u.inReserve){u.deploymentPosition={x:u.x,y:u.y};u.inReserve=true;u.x=-1000;u.y=-1000;}
    else{
        if(this.deployedPoints()+this.unitFormationPoints(u)>this.capacity()){
            this.deploymentError='출전 포인트가 부족합니다. 다른 부대를 대기로 바꾸세요';return false;
        }
        u.inReserve=false;
        if(!this.placeInDeployment(u)){u.inReserve=true;u.x=-1000;u.y=-1000;this.deploymentError='배치 구역의 빈 공간을 확보하세요';return false;}
        this.refreshUnit(u);this.selected=u.uid;
    }
    if(this.unit(this.selected)?.inReserve)this.selected=this.alive('good')[0]?.uid||'';
    for(const v of this.alive('good'))this.refreshUnit(v);
    this.save();return true;
};
const deploymentWave=P.startWave;
P.startWave=function(){
    if(this.phase!=='preparation')return deploymentWave.apply(this,arguments);
    this.deploymentError=this.deploymentReason();
    if(this.deploymentError){this.emit('Event',this.deploymentError);if(window.openWarbandDeployment)window.openWarbandDeployment();return false;}
    return deploymentWave.apply(this,arguments);
};
const deploymentCanAct=P.canAct;
P.canAct=function(u){return !u?.inReserve&&deploymentCanAct.call(this,u);};
// Damage from stale targets, delayed effects and direct skill entry points cannot hit reserves.
const deploymentCombat=P.applyCombat;
P.applyCombat=function(result){
    if(result?.strikeResults)result.strikeResults=result.strikeResults.filter(hit=>!this.unit(hit.target)?.inReserve&&!this.unit(hit.attacker)?.inReserve);
    if(result?.pushVectors)result.pushVectors=result.pushVectors.filter(push=>!this.unit(push.uid)?.inReserve);
    for(const key of ['participants','wounds','kills','trappedUnits','knockedDownUnits'])if(Array.isArray(result?.[key]))result[key]=result[key].filter(uid=>!this.unit(uid)?.inReserve);
    return deploymentCombat.apply(this,arguments);
};
const deploymentPrepare=P.prepareStage;
P.prepareStage=function(){
    const result=deploymentPrepare.apply(this,arguments);
    for(const u of this.alive('good'))if(!u.temporary&&(u.x<0||u.y<0)){u.inReserve=true;u.x=-1000;u.y=-1000;}
    return result;
};
const deploymentSync=Ve.prototype.sync;
Ve.prototype.sync=function(){
 const result=deploymentSync.apply(this,arguments);
 for(const u of this.b?.units||[])if(u.inReserve)this.tokens?.get(u.uid)?.setVisible(false);
 return result;
};
// Unit-directed actions must reject stale selections of reserve heroes too.
for(const method of ['skill','castSpell','heroic','shoot','charge','move','deploy']){
 const action=P[method];if(typeof action!=='function')continue;
 P[method]=function(uid,...args){if(this.unit(uid)?.inReserve)return false;return action.call(this,uid,...args);};
}
const deploymentCommand=P.command;
P.command=function(key,uid=this.selected){if(this.unit(uid)?.inReserve)return false;return deploymentCommand.call(this,key,uid);};

// The camp owns the formation preview; entering it never advances the stage.
P.canEditDeployment=function(){return this.phase==='preparation'||this.phase==='reward'&&this.campStep==='ready';};
P.prepareReadyDeployment=function(){
 if(this.phase!=='reward'||this.campStep!=='ready')return false;
 const info=this._routeChoice||this.stageInfo(this.wave+1);
 const key=JSON.stringify([this.wave+1,info.map,info.mission,info.modifier,info.boss]);
 if(this.readyFormation===key)return true;
 this.next=info;this.mapIndex=info.map;this.mission=info.mission;
 Mt.objective.x=1165;Mt.objective.y=info.mission==='defense'?240:960;Mt.objective.radius=info.mission==='defense'?180:175;
 this.battlefield=Terrain.build(CX.maps[visualMapIdx(info.map)],info.n||this.wave+1);this.terrain=this.battlefield.terrain;
 if(info.mission==='rescue')this.terrain.push({id:'terr_cage',x:1165,y:960,w:80,h:80,kind:'cover',jump:true,los:'cover',active:true});
 // Old enemies and stage allies must not occupy the next battle's deployment zone.
 this.units=this.units.filter(u=>u.side==='good'&&u.alive&&(!u.temporary||u._pendingAlly));
 for(const u of this.alive('good')){u.x=-1000;u.y=-1000;}
 for(const u of this.alive('good'))if(!this.placeInDeployment(u)){u.inReserve=true;u.x=-1000;u.y=-1000;}
 this.selected=this.alive('good').find(u=>!u.temporary)?.uid||'';
 this.readyFormation=key;this.deploymentError='';this.save();return true;
};
P.placeReadyUnit=function(uid,pos){
 if(this.phase!=='reward'||this.campStep!=='ready'||!Number.isFinite(pos?.x)||!Number.isFinite(pos?.y))return false;
 if(pos.y<285||pos.y>pt.deployY){this.deploymentError='푸른 배치 구역의 빈 곳을 선택하세요';return false;}
 const u=this.unit(uid);if(!u?.alive||u.side!=='good'||u.inReserve||u.temporary)return false;
 this.deploymentError='';let ok=false;
 const eventCount=this.events.length;this.phase='preparation';
 try{ok=this.deploy(uid,pos);}finally{this.phase='reward';}
 // Preview moves update immediately; they must not replay after departure.
 this.events.splice(eventCount,this.events.length-eventCount);
 if(!ok)this.deploymentError='푸른 배치 구역의 빈 곳을 선택하세요';
 else{this.selected=uid;u.deploymentPosition={x:u.x,y:u.y};this.save();}
 return ok;
};
const readySave=P._saveState;
P._saveState=function(){return {...readySave.call(this),readyFormation:this.readyFormation||null};};
const readyResume=P.resume;
P.resume=function(){
 let state;try{state=JSON.parse(this._incomingSaveRaw??localStorage.getItem('mesbg-endless-save'));}catch{return false;}
 const ok=readyResume.apply(this,arguments);if(ok)this.readyFormation=state?.readyFormation||null;return ok;
};
const readyStart=P.start;
P.start=function(){this.readyFormation=null;return readyStart.apply(this,arguments);};
const readyLeave=P.leaveCamp;
P.leaveCamp=function(){
 const positions=this.phase==='reward'&&this.campStep==='ready'&&this.readyFormation?
  this.permanent().filter(u=>!u.inReserve).map(u=>({uid:u.uid,x:u.x,y:u.y})):[];
 const result=readyLeave.apply(this,arguments);if(!result)return result;
 // Run all normal stage setup (allies/devices/traps), then restore the chosen formation.
 for(const p of positions){const u=this.unit(p.uid);if(u){u.inReserve=false;u.x=-1000;u.y=-1000;}}
 for(const p of positions){const u=this.unit(p.uid);if(!u)continue;
  if(p.y<=pt.deployY&&Et(u,p,this.alive(),this.terrain))Object.assign(u,{x:p.x,y:p.y});
  else if(!this.placeInDeployment(u)){u.inReserve=true;u.x=-1000;u.y=-1000;}
 }
 this.readyFormation=null;
 if(this._retrySnapshot)this._retrySnapshot.units=structuredClone(this.units);
 this.save();return result;
};
P.departReady=function(){
 if(!this.prepareReadyDeployment())return false;
 this.deploymentError=this.deploymentReason();if(this.deploymentError)return false;
 if(!this.leaveCamp())return false;
 this.startWave();return this.phase!=='preparation';
};
