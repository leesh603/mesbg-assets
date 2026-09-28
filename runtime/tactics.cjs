(function(root){
'use strict';
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),has=(u,t)=>u.traits.includes(t);
const contact=(a,b)=>distance(a,b)<=a.radius+b.radius+3;
const engaged=(u,all)=>all.some(v=>v.alive&&v.side!==u.side&&contact(u,v));
function supportKind(u,meta){const w=meta(u.id)?.weapon||'';return /pike/.test(w)||has(u,'pike')?'pike':has(u,'spear')||/spear/.test(w)?'spear':null;}
function supportLinks(group,all,meta,clear=()=>true){
 const used=new Set(group.map(u=>u.uid)),links=[],occupied=new Set();
 const free=all.filter(u=>u.alive&&!used.has(u.uid)&&!u.supportSpent&&!u.prone&&!has(u,'mounted')&&!engaged(u,all)&&supportKind(u,meta));
 const candidates=[];
 for(const front of group.filter(u=>u.alive&&!has(u,'mounted')&&!has(u,'monster')&&!has(u,'flying')))for(const u of free){
  if(u.side!==front.side||u.radius+1<front.radius||!contact(u,front)||!clear(u,front))continue;
  const enemy=group.filter(v=>v.side!==front.side&&contact(front,v)).sort((a,b)=>distance(front,a)-distance(front,b))[0];
  if(!enemy||(u.x-front.x)*(enemy.x-front.x)+(u.y-front.y)*(enemy.y-front.y)>0)continue;
  candidates.push({unit:u,front,via:front,rank:1,d:distance(u,front)});
 }
 for(const l of candidates.sort((a,b)=>a.d-b.d||a.unit.uid.localeCompare(b.unit.uid))){if(used.has(l.unit.uid)||occupied.has(l.front.uid))continue;links.push(l);used.add(l.unit.uid);occupied.add(l.front.uid);}
 for(const first of [...links]){if(supportKind(first.unit,meta)!=='pike')continue;
  const second=free.filter(u=>!used.has(u.uid)&&u.side===first.unit.side&&supportKind(u,meta)==='pike'&&contact(u,first.unit)&&clear(u,first.unit)&&(u.x-first.unit.x)*(first.front.x-first.unit.x)+(u.y-first.unit.y)*(first.front.y-first.unit.y)<=0).sort((a,b)=>distance(a,first.unit)-distance(b,first.unit))[0];
  if(second){links.push({unit:second,front:first.front,via:first.unit,rank:2});used.add(second.uid);}
 }
 return links;
}
function resolveFight(group,all,terrain,priority,rng,links,api){
 const roll=()=>1+Math.floor(rng()*6),r={kind:'fight',participants:group.map(u=>u.uid),winnerSide:priority,diceResults:{good:[],evil:[]},strikeResults:[],wounds:[],kills:[],pushVectors:[],trappedUnits:[],knockedDownUnits:[],supports:links.map(l=>l.unit.uid),supportLinks:links.map(l=>({uid:l.unit.uid,front:l.front.uid,via:l.via.uid,rank:l.rank})),fightValues:{good:0,evil:0}};
 const fighters=[...group.map(unit=>({unit,front:unit,support:false})),...links.map(l=>({...l,support:true}))];
 const cavalry=u=>has(u,'mounted')&&u.charged&&!group.some(v=>v.side!==u.side&&contact(u,v)&&has(v,'mounted'));
 for(const f of fighters){const u=f.unit,dice=Array.from({length:f.support?1:u.stats.attacks+(cavalry(u)?1:0)},roll);if(has(u,'veteran')){const i=dice.indexOf(Math.min(...dice));dice[i]=Math.max(dice[i],roll());}r.diceResults[u.side].push(...dice);r.fightValues[u.side]=Math.max(r.fightValues[u.side],u.stats.fight);}
 const g=Math.max(...r.diceResults.good),e=Math.max(...r.diceResults.evil),f=r.fightValues;r.winnerSide=g!==e?(g>e?'good':'evil'):f.good!==f.evil?(f.good>f.evil?'good':'evil'):priority;
 const winners=group.filter(u=>u.side===r.winnerSide),losers=group.filter(u=>u.side!==r.winnerSide),positions=all.map(u=>({...u}));
 for(const u of losers){const p=api.push(u,winners,positions,terrain,52*(u.hold?.25:1)*(has(u,'steadfast')?.65:1));r.pushVectors.push({uid:u.uid,from:{x:u.x,y:u.y},to:p.to});if(p.trapped)r.trappedUnits.push(u.uid);Object.assign(positions.find(v=>v.uid===u.uid),p.to);if(winners.some(w=>cavalry(w)&&contact(w,u)&&!has(u,'mounted')&&!has(u,'monster')&&!has(u,'flying')))r.knockedDownUnits.push(u.uid);}
 const wounds=new Map(losers.map(u=>[u.uid,u.currentWounds]));
 for(const f of fighters.filter(f=>f.unit.side===r.winnerSide)){const u=f.unit,targets=losers.filter(v=>contact(f.front,v)).sort((a,b)=>distance(f.front,a)-distance(f.front,b));
  for(let a=0;a<(f.support?1:u.stats.attacks);a++){let v=targets.find(v=>wounds.get(v.uid)>0);if(!v)break;const doubled=r.trappedUnits.includes(v.uid)||r.knockedDownUnits.includes(v.uid);
   for(let j=0;j<(doubled?2:1);j++){v=targets.find(v=>wounds.get(v.uid)>0);if(!v)break;const die=roll(),needed=api.wound(u.stats.strength,v.stats.defence),wound=die>=needed;if(wound){wounds.set(v.uid,wounds.get(v.uid)-1);r.wounds.push(v.uid);}const killed=wound&&wounds.get(v.uid)===0;if(killed)r.kills.push(v.uid);r.strikeResults.push({attacker:u.uid,target:v.uid,roll:die,needed,wound,killed,support:f.support});}
  }
 }
 return r;
}
function role(u,meta){return has(u,'monster')?'monster':has(u,'mounted')?'cavalry':u.stats.shootRange?'archer':supportKind(u,meta)?'support':has(u,'hero')?'hero':'infantry';}
function positionScore(u,p,all,meta,objective,los){
 const foes=all.filter(v=>v.side!==u.side),friends=all.filter(v=>v.side===u.side&&v.uid!==u.uid);if(!foes.length)return 0;
 const nearest=foes.slice().sort((a,b)=>distance(p,a)-distance(p,b))[0],gap=distance(p,nearest)-u.radius-nearest.radius,r=role(u,meta),travel=distance(u,p)*.09,pressure=foes.filter(v=>distance(p,v)<u.radius+v.radius+120).length;
 if(r==='archer')return Math.abs(distance(p,nearest)-Math.min(u.stats.shootRange*.72,410))+travel+(los(p,nearest)==='blocked'?650:0)+Math.max(0,135-gap)*5+pressure*35;
 if(r==='support'){const fronts=friends.filter(v=>!['archer','support'].includes(role(v,meta))&&!has(v,'mounted')&&!has(v,'monster'));if(fronts.length){let best=Infinity;for(const f of fronts){const e=foes.slice().sort((a,b)=>distance(f,a)-distance(f,b))[0],d=distance(f,e)||1,target={x:f.x+(f.x-e.x)/d*(u.radius+f.radius+1),y:f.y+(f.y-e.y)/d*(u.radius+f.radius+1)};best=Math.min(best,distance(p,target)+(engaged(f,all)?0:35));}return best+travel+Math.max(0,15-gap)*8;}}
 const cohesion=friends.length?Math.min(...friends.map(v=>distance(p,v))):0;
 return gap+travel+(r==='cavalry'?pressure*45+Math.max(0,cohesion-300)*.25:r==='monster'?-pressure*20:r==='hero'?Math.max(0,cohesion-180)*.8:Math.max(0,cohesion-180)*.35+(objective?distance(p,objective)*.08:0));
}
const api={distance,supportKind,supportLinks,resolveFight,role,positionScore};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LWBTactics=api;
})(typeof window!=='undefined'?window:this);
