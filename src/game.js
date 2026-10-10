Ae=[{id:"warrior_minas_tirith",name_ko:"미나스 티리스 전사",name_en:"Warrior of Minas Tirith",side:"good",faction:"gondor",role:"infantry",weapon:"sword_shield",base:"M",sheet:"lotr-tokens-v1.png",file:"tokens/warrior_minas_tirith.png"},{id:"orc_sword",name_ko:"모르도르 오크(검)",name_en:"Mordor Orc, sword",side:"evil",faction:"mordor",role:"infantry",weapon:"sword",base:"S",sheet:"lotr-tokens-v1.png",file:"tokens/orc_sword.png"},{id:"orc_captain",name_ko:"오크 대장",name_en:"Orc Captain",side:"evil",faction:"mordor",role:"hero",weapon:"sword",base:"M",sheet:"roster-enemy-heroes-v1.png",file:"tokens/orc_captain.png"},{id:"orc_archer",name_ko:"오크 궁수",name_en:"Orc Archer",side:"evil",faction:"mordor",role:"infantry",weapon:"bow",base:"S",sheet:"roster-enemy-troops-v1.png",file:"tokens/orc_archer.png"},{id:"gondor_archer",name_ko:"곤도르 궁수",name_en:"Gondor Archer",side:"good",faction:"gondor",role:"infantry",weapon:"bow",base:"M",sheet:"roster-free-troops-v1.png",file:"tokens/gondor_archer.png"},{id:"terr_rock_outcrop",name_ko:"바위 지형",name_en:"Rock outcrop",side:"terrain",faction:"terrain",role:"terrain",weapon:"none",base:"L",sheet:"terrain-natural-v1.png",file:"tokens/terr_rock_outcrop.png"},{id:"terr_dead_tree",name_ko:"고목",name_en:"Dead tree",side:"terrain",faction:"terrain",role:"terrain",weapon:"none",base:"L",sheet:"terrain-natural-v1.png",file:"tokens/terr_dead_tree.png"},{id:"terr_ruined_wall",name_ko:"무너진 성벽",name_en:"Ruined wall",side:"terrain",faction:"terrain",role:"terrain",weapon:"none",base:"XL",sheet:"terrain-structures-v1.png",file:"tokens/terr_ruined_wall.png"},{id:"aragorn",name_ko:"아라곤",name_en:"Aragorn",side:"good",faction:"gondor",role:"hero",weapon:"sword",base:"L",sheet:"lotr-tokens-v1.png",file:"tokens/aragorn.png"},{id:"witchking_fellbeast",name_ko:"마술왕(펠비스트)",name_en:"Witch-king on Fell Beast",side:"evil",faction:"angmar",role:"monster",weapon:"sword",base:"XXL",sheet:"fellbeast-topdown-v2.png",file:"tokens/witchking_fellbeast.png"},{id:"boromir",name_ko:"보로미르",name_en:"Boromir",side:"good",faction:"gondor",role:"hero",weapon:"sword_shield",base:"L",sheet:"roster-free-heroes-v1.png",file:"tokens/boromir.png"},{id:"gothmog",name_ko:"고스모그",name_en:"Gothmog",side:"evil",faction:"mordor",role:"hero",weapon:"mace",base:"L",sheet:"roster-evil-heroes-exp-v1.png",file:"tokens/gothmog.png"},{id:"glorfindel_foot",name_ko:"글로르핀델(도보)",name_en:"Glorfindel on foot",side:"good",faction:"rivendell",role:"hero",weapon:"sword",base:"L",sheet:"glorfindel-topdown-v2.png",file:"tokens/glorfindel_foot.png"},{id:"glorfindel_mounted",name_ko:"글로르핀델(기마)",name_en:"Glorfindel mounted",side:"good",faction:"rivendell",role:"cavalry",weapon:"sword",base:"XL",sheet:"glorfindel-topdown-v2.png",file:"tokens/glorfindel_mounted.png"}],Me={units:Ae},Re=[{faction:"minastirith",faces:{1:"dice-faces/minastirith-1.png",2:"dice-faces/minastirith-2.png",3:"dice-faces/minastirith-3.png",4:"dice-faces/minastirith-4.png",5:"dice-faces/minastirith-5.png",6:"dice-faces/minastirith-emblem.png"}},{faction:"mordor",faces:{1:"dice-faces/mordor-1.png",2:"dice-faces/mordor-2.png",3:"dice-faces/mordor-3.png",4:"dice-faces/mordor-4.png",5:"dice-faces/mordor-5.png",6:"dice-faces/mordor-emblem.png"}}],Fe={dice:Re},Ht=Z=>Z==="good"?"evil":"good",$t={S:38,M:38,L:38,XL:62,XXL:91,BOSS:120},pt={width:2330,height:1456,cpPerRound:2,maxCP:4,push:52,trappedExtraStrikes:1,friendlyFireThreshold:4,cavalryAttackBonus:1,cavalryKnockdownStrikeBonus:1,contactTolerance:2,movePenalty:1,deployY:672},Ft={move:270,fight:3,strength:3,defence:5,attacks:1,wounds:1,courage:3,shootValue:0,shootRange:0,might:0,will:0,fate:0,traits:[]},zt={glorfindel_mounted:{...Ft,move:400,fight:7,strength:4,defence:6,attacks:3,wounds:4,traits:["hero","mounted"]},glorfindel_foot:{...Ft,move:280,fight:7,strength:4,defence:6,attacks:3,wounds:3,traits:["hero","dismounted"]},aragorn:{...Ft,move:290,fight:6,strength:4,defence:6,attacks:3,wounds:3,traits:["hero"]},boromir:{...Ft,move:260,fight:6,strength:4,defence:7,attacks:3,wounds:3,traits:["hero"]},gothmog:{...Ft,move:255,fight:5,strength:4,defence:6,attacks:3,wounds:3,traits:["hero"]},witchking_fellbeast:{...Ft,move:360,fight:6,strength:6,defence:6,attacks:3,wounds:5,traits:["hero","flying"]},warrior_minas_tirith:{...Ft,fight:4,defence:6},gondor_archer:{...Ft,defence:4,shootValue:4,shootRange:800},orc_sword:{...Ft,move:250,fight:2,defence:4},orc_archer:{...Ft,move:235,fight:2,defence:3,shootValue:5,shootRange:740},orc_captain:{...Ft,move:260,fight:4,strength:4,defence:5,attacks:2,wounds:2}},Mt={objective:{x:1165,y:240,radius:180,breachCount:2},initial:[{id:"warrior_minas_tirith",count:4},{id:"gondor_archer",count:2},{id:"aragorn",count:1},{id:"boromir",count:1},{id:"glorfindel_mounted",count:1}],waves:[[{id:"orc_sword",count:6}],[{id:"gothmog",count:1},{id:"orc_sword",count:5},{id:"orc_archer",count:2}],[{id:"witchking_fellbeast",count:1},{id:"orc_captain",count:1},{id:"orc_sword",count:6},{id:"orc_archer",count:2}]]},ee=[{id:"wall-l",x:842,y:61,w:576,h:122,kind:"block",active:!0},{id:"wall-r",x:1487,y:61,w:574,h:122,kind:"block",active:!0},{id:"terr_rock_outcrop",x:440,y:790,w:175,h:170,kind:"block",active:!0},{id:"terr_ruined_wall",x:1890,y:790,w:180,h:165,kind:"block",active:!0},{id:"barricade-l",x:875,y:515,w:190,h:56,kind:"cover",active:!0},{id:"barricade-r",x:1455,y:515,w:190,h:56,kind:"cover",active:!0}],ae=[{id:"hold",name:"HOLD THE LINE",ko:"전열 유지",cost:1,description:"이번 라운드 선택 병사의 밀림 거리 75% 감소"},{id:"aim",name:"AIMED VOLLEY",ko:"정밀 사격",cost:1,description:"선택 궁수의 다음 빗나간 명중 주사위 1회 재굴림"},{id:"urgent",name:"URGENT ORDER",ko:"긴급 명령",cost:2,description:"미행동 병사를 지금 활성화. 현재 상대 차례를 앞지릅니다."},{id:"fury",name:"FULL CHARGE",ko:"총돌격",cost:2,description:"이번 라운드 모든 아군 Attack +1"},{id:"march",name:"FORCED MARCH",ko:"강행군",cost:1,description:"선택 병사가 이번 이동 단계에 소모한 이동력의 절반을 되찾습니다."},{id:"rally",name:"RALLY",ko:"결집",cost:2,description:"선택 병사와 주변 아군(8인치)의 공포·쓰러짐을 해제합니다."},{id:"aid",name:"FIELD AID",ko:"응급 치료",cost:2,description:"선택 병사의 상처를 1 회복합니다."}],jt=[{id:"reinforce",name:"REINFORCEMENTS",ko:"새로운 방패",text:"미나스 티리스 전사 2명이 합류합니다.",icon:"♜"},{id:"gate",name:"REINFORCE THE GATE",ko:"성문 보강",text:"방어물을 복구하고 돌파 패배 기준을 1명 늘립니다.",icon:"▥"},{id:"veteran",name:"VETERAN’S EDGE",ko:"전장의 기억",text:"생존자 1명을 골라 매 전투 최저 결투 주사위를 한 번 재굴립니다.",icon:"✦"},{id:"volley",name:"VOLLEY",ko:"일제 사격",text:"정밀 사격 명령 비용이 0이 됩니다. 궁수당 라운드 1회.",icon:"➶"},{id:"hold",name:"HOLD THE LINE",ko:"흔들리지 않는 전열",text:"모든 생존자와 새 병력의 밀림 거리가 35% 줄어듭니다.",icon:"◈"},{id:"supplies",name:"SUPPLIES",ko:"보급 행렬",text:"다음 Wave 첫 라운드에 CP 2를 추가합니다.",icon:"+"}],kt=[{id:"delay",name:"적 증원 지연",text:"다음 Wave의 마지막 오크 2기가 2라운드에 도착합니다."},{id:"broken",name:"무너진 방어물",text:"왼쪽 방어물이 파괴되었습니다. 빈틈을 병력으로 막으세요."},{id:"morale",name:"높아진 사기",text:"다음 Wave 첫 라운드 CP +2."}],Le=Array.from({length:10},(Z,Y)=>Array.from({length:10},(b,H)=>Math.max(3,Math.min(6,4+Math.ceil((H-Y)/2))))),oe=(Z,Y)=>Le[Math.max(0,Math.min(9,Z-1))][Math.max(0,Math.min(9,Y-1))],ht=(Z,Y)=>Math.hypot(Z.x-Y.x,Z.y-Y.y);function Vt(Z,Y){return Z.alive&&Y.alive&&Z.side!==Y.side&&ht(Z,Y)<=Z.radius+Y.radius+pt.contactTolerance}function he(Z,Y,b){const H=b.x-Y.x,K=b.y-Y.y,$=Math.max(0,Math.min(1,((Z.x-Y.x)*H+(Z.y-Y.y)*K)/(H*H+K*K||1)));return ht(Z,{x:Y.x+$*H,y:Y.y+$*K})}function le(Z,Y,b=0){return Math.abs(Z.x-Y.x)<Y.w/2+b&&Math.abs(Z.y-Y.y)<Y.h/2+b}function Et(Z,Y,b,H){return Y.x>=Z.radius+12&&Y.x<=pt.width-Z.radius-12&&Y.y>=Z.radius+25&&Y.y<=pt.height-Z.radius-12&&!H.some(K=>!le(Z,K,-.5)&&le(Y,K,Z.radius)&&!zoneOpen(Z,K))&&!b.some(K=>K.uid!==Z.uid&&K.alive&&ht(K,Y)<Z.radius+K.radius-.3)}function bt(Z,Y,b,H){if(Z.traits.includes("flying"))return Et(Z,Y,b,H);const K=Math.ceil(ht(Z,Y)/4),walls=H.filter(t=>!lowBarrier(t)&&!zoneOpen(Z,t)&&!le(Z,t,0));for(let $=1;$<=K;$++)if(!Et(Z,{x:Z.x+(Y.x-Z.x)*$/K,y:Z.y+(Y.y-Z.y)*$/K},b,walls))return!1;return!0}function ie(Z,Y,b,H,K=Z.stats.move){return ht(Z,Y)<=K+.1&&Et(Z,Y,b,H)&&bt(Z,Y,b,H)}function ue(Z,Y){const b=ht(Z,Y)||1;return{x:Y.x+(Z.x-Y.x)/b*(Z.radius+Y.radius+.1),y:Y.y+(Z.y-Y.y)/b*(Z.radius+Y.radius+.1)}}function _t(Z,Y,b){let H=!1;for(const K of b.filter($=>$.active))for(let $=1;$<60;$++)if(le({x:Z.x+(Y.x-Z.x)*$/60,y:Z.y+(Y.y-Z.y)*$/60},K)){if(K.kind==="block")return"blocked";H=!0;break}return H?"cover":"clear"}function Oe(Z){const Y=new Set,b=[];for(const H of Z.filter(K=>K.alive)){if(Y.has(H.uid))continue;const K=[],$=[H];for(Y.add(H.uid);$.length;){const p=$.pop();K.push(p);for(const S of Z)!Y.has(S.uid)&&Vt(p,S)&&(Y.add(S.uid),$.push(S))}K.some(p=>p.side!==H.side)&&b.push(K)}return b}function we(Z,Y,b){const H=Y.x-Z.x,K=Y.y-Z.y,$=H*H+K*K;return b.filter(p=>p.alive&&p.uid!==Z.uid&&p.uid!==Y.uid&&(p.x-Z.x)*H+(p.y-Z.y)*K>0&&(p.x-Z.x)*H+(p.y-Z.y)*K<$&&he(p,Z,Y)<p.radius+2).sort((p,S)=>ht(Z,p)-ht(Z,S))}function fe(Z,Y,b){const H=we(Z,Y,b).filter(K=>K.side===Z.side);for(const K of b)K.side===Z.side&&Vt(K,Y)&&!H.includes(K)&&K.uid!==Z.uid&&H.push(K);return H}function De(Z,Y,b,H,K){const $=Y.slice().sort((t,f)=>ht(Z,t)-ht(Z,f))[0],p=Math.atan2(Z.y-$.y,Z.x-$.x);let S={x:Z.x,y:Z.y};for(const t of[0,.3,-.3,.6,-.6,1,-1,1.35,-1.35]){let f={x:Z.x,y:Z.y};for(let c=2;c<=K;c+=2){const o={x:Z.x+Math.cos(p+t)*c,y:Z.y+Math.sin(p+t)*c};if(!Et(Z,o,b,H)||!bt(Z,o,b,H))break;f=o}if(ht(Z,f)>ht(Z,S)&&(S=f),ht(Z,S)>=K*.9)break}return{to:S,trapped:ht(Z,S)<K*.7}}function Be(Z,Y,b,H,K=95,$=()=>!0){if($(Y)&&Et(Z,Y,b,H))return Y;let p=null,S=1/0;for(const t of[12,24,38,54,72,95,118]){if(t>K)break;for(let f=0;f<24;f++){const c=f*Math.PI/12,o={x:Y.x+Math.cos(c)*t,y:Y.y+Math.sin(c)*t};if(!$(o)||!Et(Z,o,b,H))continue;const r=ht(Y,o);r<S&&(p=o,S=r)}if(p)return p}return null}function de(Z,Y,b,H,K=Z.stats.move){if(!Et(Z,Y,b,H)||ht(Z,Y)>K)return null;if(bt(Z,Y,b,H))return{to:Y,path:[{x:Z.x,y:Z.y},Y],distance:ht(Z,Y),snapped:!1,yields:[]};if(Z.traits.includes("flying"))return null;const $=[{x:Z.x,y:Z.y},Y],p=8;for(const c of b){if(!c.alive||c.uid===Z.uid||ht(Z,c)>K+Z.radius+c.radius+16)continue;const o=Z.radius+c.radius+p;for(let r=0;r<12;r++){const n=r*Math.PI/6,e={x:c.x+Math.cos(n)*o,y:c.y+Math.sin(n)*o};ht(Z,e)<K&&Et(Z,e,b,H)&&$.push(e)}}for(const c of H){if(!c.active||ht(Z,c)>K+Math.max(c.w,c.h))continue;const o=c.w/2+Z.radius+p,r=c.h/2+Z.radius+p;for(const n of[-1,0,1])for(const e of[-1,0,1]){if(!n&&!e)continue;const s={x:c.x+n*o,y:c.y+e*r};ht(Z,s)<K&&Et(Z,s,b,H)&&$.push(s)}}const S=Array($.length).fill(1/0),t=Array($.length).fill(-1),f=new Set;S[0]=0;for(let c=0;c<$.length;c++){let o=-1;for(let r=0;r<$.length;r++)!f.has(r)&&(o<0||S[r]<S[o])&&(o=r);if(o<0||S[o]>K)break;if(o===1){const r=[];for(let n=o;n>=0&&(r.unshift($[n]),n!==0);n=t[n]);return{to:Y,path:r,distance:S[1],snapped:!1,yields:[]}}f.add(o);for(let r=1;r<$.length;r++){if(r===o||f.has(r))continue;const n=ht($[o],$[r]);if(S[o]+n>=S[r]||S[o]+n>K)continue;const e={...Z,x:$[o].x,y:$[o].y};bt(e,$[r],b,H)&&(S[r]=S[o]+n,t[r]=o)}}return null}function ve(Z,Y,b,H,K=Z.stats.move,$={}){const p=[];if(Et(Z,Y,b,H)&&p.push(Y),$.snap!==!1&&!$.chargeTarget)for(const t of[12,24,38,54,72,95])for(let f=0;f<16;f++){const c=f*Math.PI/8,o={x:Y.x+t*Math.cos(c),y:Y.y+t*Math.sin(c)};Et(Z,o,b,H)&&ht(Z,o)<=K&&p.push(o)}p.sort((t,f)=>ht(t,Y)-ht(f,Y));let S=null;for(const t of p.slice(0,15)){const f=de(Z,t,b,H,K),c=Ie(Z,t,b,H,K,f),o=c&&(!f||c.distance+12<f.distance)?c:f;if(!o)continue;const r={...o,snapped:ht(t,Y)>1};if((!S||ht(t,Y)<ht(S.to,Y)-.1||ht(t,Y)===ht(S.to,Y)&&r.distance<S.distance)&&(S=r),ht(t,Y)<1)break}return S}function Ie(Z,Y,b,H,K,$){const p=Y.x-Z.x,S=Y.y-Z.y,t=Math.hypot(p,S);if(t<10)return null;const f={x:-S/t,y:p/t},c=b.filter(n=>n.uid!==Z.uid&&n.alive&&n.side===Z.side&&!n.hold&&!b.some(e=>Vt(n,e))&&ht(Z,n)<K+n.radius+Z.radius&&he(n,Z,Y)<n.radius+Z.radius+16).sort((n,e)=>ht(Z,n)-ht(Z,e)).slice(0,3);if(!c.length)return null;const o=b.map(n=>({...n})),r=[];for(const n of c){const e=o.find(d=>d.uid===n.uid),s=Z.x+((e.x-Z.x)*p+(e.y-Z.y)*S)/(t*t)*p,h=Z.y+((e.x-Z.x)*p+(e.y-Z.y)*S)/(t*t)*S,i=(e.x-s)*f.x+(e.y-h)*f.y>=0?1:-1;let a=!1;for(const d of[22,38,55]){for(const u of[i,-i]){const v={x:e.x+f.x*d*u,y:e.y+f.y*d*u};if(!(!Et(e,v,o,H)||!bt(e,v,o,H))){r.push({uid:e.uid,from:{x:e.x,y:e.y},to:v}),Object.assign(e,v),a=!0;break}}if(a)break}if(!a)continue;const l=de(Z,Y,o,H,K);if(l&&(!$||l.distance+12<$.distance))return{...l,yields:[...r]}}return null}const Ge={gondor_archer:0},Wt=(Z,Y,b)=>Math.atan2(b.y-Y.y,b.x-Y.x)*180/Math.PI-(Ge[Z]??90),Lt=Z=>1+Math.floor(Z()*6);function Ne(Z){return()=>{Z|=0,Z=Z+1831565813|0;let Y=Math.imul(Z^Z>>>15,1|Z);return Y=Y+Math.imul(Y^Y>>>7,61|Y)^Y,((Y^Y>>>14)>>>0)/4294967296}}function ce(Z,Y,b){return{kind:Z,participants:Y.map(H=>H.uid),winnerSide:b,diceResults:{good:[],evil:[]},strikeResults:[],wounds:[],kills:[],pushVectors:[],trappedUnits:[],knockedDownUnits:[]}}function Ue(Z,Y,b,H,K){const $=ce("fight",Z,H),p={good:Z.filter(s=>s.side==="good"),evil:Z.filter(s=>s.side==="evil")};for(const _sd of["good","evil"]){const _sp=Y.filter(t=>t.alive&&t.side===_sd&&t.traits.includes("spear")&&!Z.includes(t)&&p[_sd].some(a=>ht(t,a)<=t.radius+a.radius+pt.contactTolerance));$.supportUnits=($.supportUnits||[]).concat(_sp.map(t=>t.uid));p[_sd]=p[_sd].concat(_sp)}for(const s of["good","evil"])for(const h of p[s]){const i=h.charged&&h.traits.includes("mounted")?pt.cavalryAttackBonus:0;let a=Array.from({length:h.stats.attacks+i},()=>Lt(K));if(h.traits.includes("veteran")){const l=Math.min(...a),d=a.indexOf(l);a[d]=Math.max(l,Lt(K))}if(h.mightReroll){const l=Math.min(...a),d=a.indexOf(l);a[d]=Math.max(l,Lt(K))}const _bn=Y.some(g=>g.alive&&g.side===s&&g.uid!==h.uid&&((g.equipment||[]).includes('war_banner_eq')||g.id==='uruk_banner')&&ht(g,h)<=135);if(_bn){const l=Math.min(...a),d=a.indexOf(l);a[d]=Math.max(l,Lt(K))}$.diceResults[s].push(...a)}const S=Math.max(...$.diceResults.good),t=Math.max(...$.diceResults.evil),f=Math.max(...p.good.map(s=>s.stats.fight)),c=Math.max(...p.evil.map(s=>s.stats.fight));$.winnerSide=S!==t?S>t?"good":"evil":f!==c?f>c?"good":"evil":H;const o=p[$.winnerSide],r=Z.filter(s=>s.side!==$.winnerSide),n=Y.map(s=>({...s})),e=new Map(r.map(s=>[s.uid,s.currentWounds]));for(const s of r){const _sf=(s.traits.includes('hero')||s.traits.includes('steadfast'))&&Lt(K)+s.stats.courage>=10,h=_sf?0:pt.push*(s.hold?.25:1)*(s.traits.includes("steadfast")?.65:1),{to:i,trapped:a}=De(s,o,n,b,h);_sf&&($.standFast=$.standFast||[],$.standFast.push(s.uid)),a&&$.trappedUnits.push(s.uid),$.pushVectors.push({uid:s.uid,from:{x:s.x,y:s.y},to:i}),Object.assign(n.find(l=>l.uid===s.uid),i)}for(const s of o){if(s.prone)continue;let h=s.stats.attacks;const i=r.slice().sort((d,u)=>ht(s,d)-ht(s,u));i.some(d=>$.trappedUnits.includes(d.uid))&&(h+=pt.trappedExtraStrikes);const l=i.filter(d=>s.charged&&!d.traits.includes("flying")&&(s.traits.includes("monster")||(s.traits.includes("mounted")&&d.radius<s.radius)));for(const d of l)($.knockedDownUnits.push(d.uid),d.prone=!0);l.length&&(h+=pt.cavalryKnockdownStrikeBonus);for(let d=0;d<h;d++){const u=i.find(y=>(e.get(y.uid)||0)>0);if(!u)break;const v=Lt(K),m=u.heroicDef?6:oe(s.stats.strength,u.stats.defence),x=v>=m;x&&(e.set(u.uid,e.get(u.uid)-1),$.wounds.push(u.uid));const g=x&&e.get(u.uid)===0;g&&$.kills.push(u.uid),$.strikeResults.push({attacker:s.uid,target:u.uid,roll:v,needed:m,wound:x,killed:g})}}return $}function Xe(Z,Y,b,H,K=[]){const $=ce("shot",[Z,Y],Z.side),p=_t(Z,Y,b)==="cover"?1:0,_wx=q.current?q.current.modifier:"",_hill=b.some(t=>t.z==="hill"&&t.active&&le(Z,t,0)),S=Math.min(6,Z.stats.shootValue+(Z.moved?pt.movePenalty:0)+p-(_hill?1:0)+(["rain","dark","fog"].includes(_wx)?1:0));let t=Lt(H),f=!1;t<S&&Z.aim&&(t=Lt(H),f=!0);const c=[];let o=Y;if(t>=S&&Z.side==="evil")for(const h of fe(Z,Y,K)){const i=Lt(H),a=i>=pt.friendlyFireThreshold;if(c.push({uid:h.uid,roll:i,passed:a}),!a){o=h;break}}let r=Lt(H),_dr=0;{const _d=Z.side==='good'&&q.rank?q.rank('harad_dart'):0;while(r===1&&_dr<_d){r=Lt(H);_dr++}}const n=o.heroicDef?6:oe(Z.stats.strength,o.stats.defence),e=t>=S&&r>=n,s=e&&o.currentWounds===1;return $.participants.includes(o.uid)||$.participants.push(o.uid),$.diceResults[Z.side]=[t,...c.map(h=>h.roll),r],$.strikeResults=[{attacker:Z.uid,target:o.uid,intendedTarget:Y.uid,hit:t,hitNeeded:S,roll:r,needed:n,wound:e,killed:s,rerolled:f,dartReroll:_dr,interceptions:c,friendlyFire:o.side===Z.side}],e&&$.wounds.push(o.uid),s&&$.kills.push(o.uid),$}class ze {
    constructor(Y, b = Date.now()) { lt(this, "units", []); lt(this, "terrain", structuredClone(ee)); lt(this, "phase", "menu"); lt(this, "side", "good"); lt(this, "priority", "good"); lt(this, "mode", "ai"); lt(this, "wave", 0); lt(this, "round", 0); lt(this, "cp", 0); lt(this, "selected", ""); lt(this, "activeMoverUid", ""); lt(this, "counter", 0); lt(this, "events", []); lt(this, "log", []); lt(this, "rewardChoices", []); lt(this, "chosenReward", ""); lt(this, "eventId", ""); lt(this, "result", ""); lt(this, "bonusCP", 0); lt(this, "breachCount", Mt.objective.breachCount); lt(this, "freeVolley", !1); lt(this, "steadfast", !1); lt(this, "delayed", []); lt(this, "fightQueue", []); lt(this, "rng"); lt(this, "meta"); this.meta = new Map(Y.map(H => [H.id, H])), this.rng = Ne(b); }
    emit(Y, b, H = {}) { this.events.push({ type: Y, message: b, ...H }), b && (this.log.unshift(b), this.log = this.log.slice(0, 200)); }
    drain() { return this.faceOpponents(), this.events.splice(0); }
    faceOpponents() { for (const Y of this.alive()) {
        const b = this.alive(Ht(Y.side)).sort((H, K) => (Vt(Y, H) ? -1e4 : 0) + ht(Y, H) - (Vt(Y, K) ? -1e4 : 0) - ht(Y, K));
        b[0] && (Y.angle = Wt(Y.id, Y, b[0]));
    } }
    alive(Y) { return this.units.filter(b => b.alive && (!Y || b.side === Y)); }
    unit(Y) { return this.units.find(b => b.uid === Y); }
    spawn(Y, b, H) { const K = this.meta.get(Y); if (!K || !zt[Y])
        throw new Error("Unknown unit " + Y); const $ = `${b[0]}${++this.counter}`, p = { ...H, uid: $, id: Y, name: zt[Y].traits.includes("hero") ? K.name_ko : `${b === "good" ? "수비대" : "공격대"} ${this.counter}`, side: b, radius: $t[K.base], stats: structuredClone(zt[Y]), alive: !0, currentWounds: zt[Y].wounds, kills: 0, veteranXP: 0, traits: [...zt[Y].traits, ...this.steadfast && b === "good" ? ["steadfast"] : []], oncePerRunAbilities: [], moved: !1, movementSpent: 0, acted: !1, charged: !1, hold: !1, aim: !1, angle: b === "good" ? 0 : 180 }; return this.units.push(p), p; }
    start(Y) { this.mode = Y, this.units = [], this.terrain = structuredClone(ee), this.wave = 0, this.round = 0, this.cp = 0, this.counter = 0, this.activeMoverUid = "", this.bonusCP = 0, this.breachCount = Mt.objective.breachCount, this.freeVolley = !1, this.steadfast = !1, this.delayed = [], this.result = "", this.log = [], this.events = [], this.eventId = "", this.chosenReward = "", this.campResult = null; let b = 0; for (const H of Mt.initial)
        for (let K = 0; K < H.count; K++)
            this.spawn(H.id, "good", b < 4 ? { x: 920 + b * 116, y: 330 } : b < 6 ? { x: 995 + (b - 4) * 345, y: 195 } : b < 8 ? { x: 1050 + (b - 6) * 230, y: 270 } : { x: 1690, y: 300 }), b++; this.phase = "preparation", this.side = "good", this.selected = this.alive("good")[0]?.uid || "", this.emit("Preparation", "푸른 배치 구역에서 병력을 배치하세요."); }
    deploy(Y, b) { const H = this.unit(Y); if (!H || this.phase !== "preparation" || H.side !== "good" || b.y > pt.deployY)
        return !1; const K = Be(H, b, this.alive(), this.terrain, 38, p => p.y <= pt.deployY); if (!K)
        return !1; const $ = { x: H.x, y: H.y }; return Object.assign(H, K), this.emit("UnitMoved", void 0, { uid: Y, from: $, to: K }), !0; }
    startWave() { if (this.phase !== "preparation")
        return; this.wave++, this.round = 0, this.units = this.units.filter(b => b.side === "good"); let Y = Mt.waves[this.wave - 1].flatMap(b => Array(b.count).fill(b.id)); this.delayed = this.eventId === "delay" && this.wave === 3 ? Y.splice(-2) : [], this.spawnEnemies(Y), this.waveStartCounts = { good: this.alive("good").length, evil: this.alive("evil").length }, this.emit("WaveStarted", `WAVE ${this.wave} — ${this.wave === 3 ? "오크 대장의 총공세" : "적이 접근합니다."}`), this.beginRound(); }
    spawnEnemies(Y) { let _bi = 0; Y.forEach((b, H) => { const _rad = [(this.meta.get(b) || {}).base || 'M'] || 38, _big = _rad >= 62; const _pos = b === "witchking_fellbeast" ? { x: 1165, y: 1255 } : _big ? { x: 420 + _bi % 3 * 560, y: 1120 - Math.floor(_bi / 3) * 190 } : { x: 260 + H % 7 * 300, y: 1295 - Math.floor(H / 7) * 150 }; _big && _bi++; const K = this.spawn(b, "evil", _pos); if (!Et(K, K, this.alive(), this.terrain))
        for (let $ = 1290; $ > 980; $ -= 90) {
            let p = !1;
            for (let S = 140; S < 2200; S += 115)
                if (Et(K, { x: S, y: $ }, this.alive(), this.terrain)) {
                    Object.assign(K, { x: S, y: $ }), p = !0;
                    break;
                }
            if (p)
                break;
        } }); }
    beginRound() { if (this.checkRun())
        return; this.round++, this.activeMoverUid = "", this.emit("Round", "── 라운드 " + this.round + " ──"), this.round === 2 && this.delayed.length && (this.spawnEnemies(this.delayed), this.delayed = [], this.emit("ReinforcementsArrived", "지연된 오크 증원이 도착했습니다.")), this.cp = Math.min(pt.maxCP, this.cp + pt.cpPerRound + this.bonusCP + (this.relicSets && this.relicSets().some(s => s.family === '원정' && s.active) ? 1 : 0)), this.bonusCP = 0; for (const K of this.alive())
        K.acted = !1, K.moved = !1, K.movementSpent = 0, K.charged = !1, K.prone = !1, K.feared = !1, K.hold = !1, K.aim = !1, K.oncePerRunAbilities = K.oncePerRunAbilities.filter($ => $ !== "aim-used"); for (const mc of ["good", "evil"]) {
        const mcBase = this.waveStartCounts ? this.waveStartCounts[mc] : 0;
        if (mcBase && this.alive(mc).length <= mcBase / 2)
            for (const v of this.alive(mc).slice())
                if (Lt(this.rng) + Lt(this.rng) + v.stats.courage < 8)
                    v.alive = false, this.emit("UnitKilled", `${v.name} · 전열 붕괴 — 도주`, { uid: v.uid });
    }
    if (this.mission === 'escort' && this.escortCart) {
        const _ec = this.unit(this.escortCart);
        if (_ec && _ec.alive && _ec.y < 1180) {
            const _ny = Math.min(1200, _ec.y + 70);
            if (!this.alive().some(v => v.uid !== _ec.uid && Math.abs(v.x - _ec.x) < v.radius + _ec.radius + 6 && Math.abs(v.y - _ny) < v.radius + _ec.radius + 6))
                _ec.y = _ny;
        }
    }
    this._roundStartCounts = { good: this.alive("good").length, evil: this.alive("evil").length };
    let Y = Lt(this.rng), b = Lt(this.rng), H = 0; for (; Y === b && H < 100;)
        H++, Y = Lt(this.rng), b = Lt(this.rng); this.priority = Y >= b ? "good" : "evil", this.priorityForce && (this.priority = this.side = this.priorityForce, this.priorityForce = ""), this.nextRoundBuffs && (this.nextRoundBuffs.forEach(rb => this.alive(rb.side || "good").forEach(u => (!rb.trait || u.traits.includes(rb.trait)) && (u.roundBuff[rb.stat] = (u.roundBuff[rb.stat] || 0) + rb.n, this.refreshUnit(u)))), this.nextRoundBuffs = null), this.side = this.priority, this.phase = "move", this.emit("RoundStarted", `라운드 ${this.round} · ${this.priority === "good" ? "곤도르" : "모르도르"} 우선권`), this.emit("PriorityRolled", void 0, { good: Y, evil: b, ties: H }), this.autoSelect(); }
    remaining(Y) { return Math.max(0, Y.stats.move - Y.movementSpent); }
    eligible(Y = this.side) { return this.alive(Y).filter(b => !b.acted && (!this.activeMoverUid || this.phase !== "move" || Y !== this.side || b.uid === this.activeMoverUid) && (this.phase === "move" || this.phase === "shoot" && b.stats.shootRange > 0 && !this.engaged(b) && b.movementSpent * 2 <= b.stats.move)); }
    engaged(Y) { return this.alive().some(b => Vt(Y, b)); }
    autoSelect() { var Y; this.selected = ((Y = this.eligible()[0]) == null ? void 0 : Y.uid) || ""; }
    canAct(Y) { return !!Y && Y.alive && Y.side === this.side && !Y.acted && (this.phase === "move" || this.phase === "shoot") && this.eligible().includes(Y); }
    move(Y, b, H) { const K = this.unit(Y); if (!this.canAct(K) || this.phase !== "move" || this.engaged(K))
        return !1; const $ = H ? this.unit(H) : void 0, p = ve(K, b, this.alive(), this.terrain, this.remaining(K), { snap: !$, chargeTarget: $ }); if (!p || p.distance < .5)
        return !1; for (const f of p.yields) {
        const c = this.unit(f.uid);
        Object.assign(c, f.to), this.emit("UnitYielded", void 0, { uid: c.uid, from: f.from, to: f.to });
    } this.activeMoverUid = K.uid; const S = { x: K.x, y: K.y }; K.angle = Wt(K.id, K, p.to), K.moved = !0, K.movementSpent = Math.min(K.stats.move, K.movementSpent + p.distance + climbCost(K, p.to, this.terrain)), Object.assign(K, p.to); const t = this.engaged(K); return K.charged = !!t && K.traits.includes("mounted") && K.movementSpent > K.radius, this.emit("UnitMoved", void 0, { uid: Y, from: S, to: p.to, path: p.path, distance: p.distance }), t ? (this.emit("ChargeConnected", `${K.name} 돌격${K.charged ? " · 기병 충격" : ""}!`, { uid: Y, cavalry: K.charged }), this.finishActivation(K)) : this.remaining(K) < 12 ? this.finishActivation(K) : this.emit("MovementPartial", `${K.name} · 남은 이동력 ${Math.floor(this.remaining(K))}`), !0; }
    charge(Y, b) { const H = this.unit(Y), K = this.unit(b); if (!H || !K || !K.alive || H.side === K.side)
        return !1; const $ = ue(H, K), p = Math.atan2($.y - K.y, $.x - K.x), S = Array.from({ length: 16 }, (t, f) => { const c = p + (f % 2 ? 1 : -1) * Math.ceil(f / 2) * Math.PI / 8; return { x: K.x + Math.cos(c) * (H.radius + K.radius + .8), y: K.y + Math.sin(c) * (H.radius + K.radius + .8) }; }); for (const t of S)
        if (this.move(Y, t, K.uid))
            return !0; return !1; }
    validTargets(Y) { const _hr = this.terrain.some(t => t.z === 'hill' && t.active && le(Y, t, 0)) ? 45 : 0; return this.alive(Ht(Y.side)).filter(b => ht(Y, b) <= Y.stats.shootRange + _hr && !this.engaged(Y) && (Y.side === "evil" || !this.engaged(b) && !fe(Y, b, this.alive()).length) && _t(Y, b, this.terrain) !== "blocked"); }
    shoot(Y, b) { const H = this.unit(Y), K = this.unit(b); if (this.phase !== "shoot" || !this.canAct(H) || !K || !this.validTargets(H).includes(K))
        return !1; const $ = Xe(H, K, this.terrain, this.rng, this.alive()); return H.aim = !1, this.applyCombat($), this.emit("ShotFired", `${H.name} → ${this.unit($.strikeResults[0].target).name}: ${$.strikeResults[0].friendlyFire ? "아군 오사 · " : ""}${$.wounds.length ? "부상" : "피해 없음"}`, { result: $ }), this.finishActivation(H), !0; }
    wait(Y = this.selected) { const b = this.unit(Y); return this.canAct(b) ? (this.finishActivation(b), !0) : !1; }
    finishActivation(Y) { Y.acted = !0, this.activeMoverUid === Y.uid && (this.activeMoverUid = ""), this.side = Ht(Y.side), !this.checkRun() && this.advance(); }
    advance() { if (!(this.phase !== "move" && this.phase !== "shoot")) {
        if (this.eligible().length || (this.side = Ht(this.side)), this.eligible().length) {
            this.autoSelect();
            return;
        }
        if (this.phase === "move") {
            this.phase = "shoot", this.side = this.priority;
            for (const Y of this.alive())
                Y.acted = !1;
            this.emit("PhaseChanged", "사격 · 곤도르: 아군 차폐 금지 / 모르도르: 4+ 통과, 1–3 아군 오사"), this.advance();
        }
        else
            this.phase = "fight", this.fightQueue = Oe(this.alive()).map(Y => Y.map(b => b.uid)), this.selected = "", this.emit("PhaseChanged", `근접전 단계 · ${this.fightQueue.length}개 교전`);
    } }
    fightNext() { if (this.phase !== "fight")
        return; const Y = this.fightQueue.shift(); if (!Y) {
        this.endRound();
        return;
    } const b = Y.map(H => this.unit(H)).filter(H => H.alive); if (b.some(H => H.side === "good") && b.some(H => H.side === "evil")) {
        for (const h of b.filter(v => v.traits.includes('hero') && v.side === 'evil' && this.mode === 'ai' && (v.resources.might || 0) > 0 && !v.heroicDef && !v.roundBuff.fight)) {
            const foes = b.filter(v => v.side === 'good'), best = Math.max(...foes.map(v => v.stats.fight)), bestStr = Math.max(...foes.map(v => v.stats.strength));
            if (bestStr >= h.stats.defence + 1 || (h.currentWounds <= 1 && h.stats.fight <= best)) {
                h.resources.might--; h.heroicDef = true;
                this.refreshUnit(h), this.emit('Heroic', h.name + ' — 영웅적 수비 (AI)', { uid: h.uid });
            } else if (h.stats.fight <= best + 1) {
                h.resources.might--; h.roundBuff.fight = (h.roundBuff.fight || 0) + 1;
                this.refreshUnit(h), this.emit('Heroic', h.name + ' — 영웅적 일격 (AI)', { uid: h.uid });
            }
        }
        const H = Ue(b, this.alive(), this.terrain, this.priority, this.rng);
        this.applyCombat(H), this.emit("FightResolved", `${b.filter(K => K.side === "good").length} 대 ${b.filter(K => K.side === "evil").length} · ${H.winnerSide === "good" ? "곤도르" : "모르도르"} 승리${H.trappedUnits.length ? " · 포위 추가 타격" : ""}${(H.standFast||[]).length ? " · 버텼다 ×" + H.standFast.length : ""}${(H.supportUnits||[]).length ? " · 창 지원 ×" + H.supportUnits.length : ""}`, { result: H });
        for (const h of b.filter(v => v.heroicCombat && v.alive && v.side === H.winnerSide)) {
            h.heroicCombat = false;
            const foes2 = this.alive(Ht(h.side)), others = foes2.filter(f => !b.includes(f)), nf = (others[0] ? others : foes2).sort((a, c) => ht(h, a) - ht(h, c))[0];
            if (nf && ht(h, nf) <= h.stats.move) { Object.assign(h, ue(h, nf)); this.fightQueue.unshift([h.uid, nf.uid]); this.emit('Heroic', h.name + ' — 영웅의 전투 · 재돌격', { uid: h.uid }); }
        }
    } this.checkRun(); }
    applyCombat(Y) { for (const b of Y.strikeResults) {
        const H = this.unit(b.target), K = this.unit(b.attacker);
        b.wound && (H.currentWounds--, K.side !== H.side && (K.dmgDealt = (K.dmgDealt || 0) + 1), this.meta.has(H.id.replace(/_mounted$/, "_foot")) && this.dismount(H), this.emit("UnitWounded", void 0, { uid: H.uid })), b.wound && H.traits.includes('boss') && !H._enraged && H.currentWounds > 0 && H.currentWounds * 2 <= H.stats.wounds && (H._enraged = !0, H.stats.attacks = (H.stats.attacks || 1) + 1, this.emit('Event', esc(H.name) + ' 격노 — 공격 +1', { uid: H.uid })), b.killed && (H.alive = !1, K.side !== H.side && (K.kills++, K.veteranXP += 2, H.traits.includes('boss') && (K._bossSlain = H.name, this.emit('Event', esc(K.name) + ' · 보스 사냥꾼 — ' + esc(H.name) + ' 처치', { uid: K.uid })), this._trkKill && this._trkKill(K, H)), K.side === 'good' && H.traits.includes('hero') && (this.cp = Math.min(pt.maxCP, this.cp + 2), this.emit('Event', '영웅 처치 · 지휘력 +2 CP')), H.side === "good" && this.fallen && this.fallen.push({ id: H.id, uid: H.uid, kills: H.kills, wave: this.wave, name: H.name }), this.emit("UnitKilled", void 0, { uid: H.uid }), H.side === "good" && (H.equipment || []).length && (() => { const _sv = (H.equipment || []).reduce((a2, eid) => a2 + Math.floor((((typeof LWB_EQUIP !== "undefined" ? LWB_EQUIP : []).find(x => x.id === eid) || {}).cost || 0) / 2), 0); _sv > 0 && (this.gold += _sv, this.emit("Event", H.name + "의 장비 회수 · +" + _sv + "금")); })());
    } for (const b of Y.pushVectors) {
        const H = this.unit(b.uid);
        Object.assign(H, b.to), this.emit("UnitPushed", void 0, { uid: H.uid });
    } }
    dismount(Y) { const base = Y.id.replace(/_mounted$/, ""); const fid = this.meta.has(base + "_foot") ? base + "_foot" : base; if (!this.meta.has(fid)) return; Y.id = fid, Y.name = this.meta.get(Y.id).name_ko, Y.stats = structuredClone(zt[Y.id]), Y.radius = $t[this.meta.get(Y.id).base], Y.traits = Y.traits.filter(b => b !== "mounted"), Y.traits.includes("dismounted") || Y.traits.push("dismounted"), Y.currentWounds = Math.min(Y.currentWounds, Y.stats.wounds), this.emit("UnitDismounted", `${Y.name} 낙마했습니다. 도보로 전투를 계속합니다.`, { uid: Y.uid }); }
    endRound() { const Y = Mt.objective, b = this.alive("evil").filter(H => ht(H, Y) <= Y.radius).length; const _rc = this._roundStartCounts || { good: 0, evil: 0 }, _sl = `라운드 ${this.round} 정산 — 격파 ${Math.max(0, _rc.evil - this.alive('evil').length)} · 손실 ${Math.max(0, _rc.good - this.alive('good').length)}`; if (this.emit("RoundEnded", `${_sl} · 성문 점유 ${b}/${this.breachCount}`), b >= this.breachCount) {
        this.endRun(!1, "적이 성문 방어선을 돌파했습니다.");
        return;
    } this.beginRound(); }
    checkRun() { return this.alive("good").length ? !this.alive("evil").length && !this.delayed.length && this.wave > 0 ? (this.wave === 3 ? this.endRun(!0, "성문을 지켜냈습니다.") : this.finishWave(), !0) : !1 : (this.endRun(!1, "수비대가 전멸했습니다."), !0); }
    finishWave() { var Y; for (const b of this.alive("good"))
        b.veteranXP++; if (this.phase = "reward", this.selected = ((Y = this.alive("good")[0]) == null ? void 0 : Y.uid) || "", this.chosenReward = "", this.rewardChoices = jt.filter(b => !(b.id === "volley" && this.freeVolley) && !(b.id === "hold" && this.steadfast)).map(b => b.id).map(b => ({ id: b, key: this.rng() })).sort((b, H) => b.key - H.key).slice(0, 3).map(b => b.id), this.emit("WaveEnded", `Wave ${this.wave} Defense 성공 · 생존자 ${this.alive("good").length}명`), this.wave === 2) {
        const b = kt[Math.floor(this.rng() * kt.length)];
        this.eventId = b.id, b.id === "broken" && (this.terrain.find(H => H.id === "barricade-l").active = !1), b.id === "morale" && (this.bonusCP += 2), this.emit("Event", b.name + " — " + b.text);
    } }
    reward(Y, b = this.selected) { if (this.phase !== "reward" || !this.rewardChoices.includes(Y) || this.chosenReward || Y === "veteran" && !this.alive("good").some(H => H.uid === b))
        return !1; if (this.chosenReward = Y, Y === "reinforce")
        for (let H = 0; H < 2; H++) {
            const K = this.spawn("warrior_minas_tirith", "good", { x: 110, y: 360 });
            this.placeInDeployment(K);
        } Y === "gate" && (this.breachCount++, this.terrain.filter(H => H.id.startsWith("barricade")).forEach(H => H.active = !0)), Y === "veteran" && this.unit(b).traits.push("veteran"), Y === "volley" && (this.freeVolley = !0), Y === "hold" && (this.steadfast = !0, this.alive("good").forEach(H => { H.traits.includes("steadfast") || H.traits.push("steadfast"); })), Y === "supplies" && (this.bonusCP += 2), this.emit("RewardChosen", jt.find(H => H.id === Y).ko), this.phase = "preparation", this.side = "good"; for (const H of this.alive("good"))
        H.acted = !1, H.hold = !1, H.aim = !1, (H.y > pt.deployY || !Et(H, H, this.alive("good"), this.terrain)) && this.placeInDeployment(H); return this.selected = this.alive("good")[0].uid, !0; }
    placeInDeployment(Y) { for (let b = 635; b >= 350; b -= 110)
        for (let H = 820; H <= 1640; H += 115)
            if (Et(Y, { x: H, y: b }, this.alive("good"), this.terrain)) {
                Object.assign(Y, { x: H, y: b });
                return true;
            } for (let b = 120; b < 2210; b += 115)
        if (Et(Y, { x: b, y: 635 }, this.alive("good"), this.terrain)) {
            Object.assign(Y, { x: b, y: 635 });
            return true;
        } return false; }
    command(Y, b = this.selected) { const H = this.unit(b), K = ae.find(p => p.id === Y); if (!H || !H.alive || H.side !== "good" || !K || !["move", "shoot"].includes(this.phase))
        return !1; const $ = Y === "aim" && this.freeVolley ? 0 : K.cost; return this.cp < $ || Y === "hold" && H.hold || Y === "aim" && (!H.stats.shootRange || H.oncePerRunAbilities.includes("aim-used")) || Y === "urgent" && (H.acted || !this.eligible("good").includes(H)) || Y === "fury" && this.furyRound === this.round || Y === "march" && (this.phase !== "move" || !H.movementSpent) || Y === "rally" && !this.alive("good").some(p => ht(p, H) <= 240 && (p.feared || p.prone)) || Y === "aid" && H.currentWounds >= H.stats.wounds ? !1 : (Y === "hold" && (H.hold = !0), Y === "aim" && (H.aim = !0, H.oncePerRunAbilities.push("aim-used")), Y === "urgent" && (this.side = "good", this.selected = H.uid), Y === "fury" && (this.furyRound = this.round, this.alive("good").forEach(p => (p.roundBuff.attacks = (p.roundBuff.attacks || 0) + 1, this.refreshUnit(p)))), Y === "march" && (H.movementSpent = Math.floor(H.movementSpent * .5)), Y === "rally" && this.alive("good").filter(p => ht(p, H) <= 240).forEach(p => (p.feared = !1, p.prone = !1)), Y === "aid" && (H.currentWounds = Math.min(H.stats.wounds, H.currentWounds + 1)), this.cp -= $, this.emit("CommandUsed", `${K.ko} · ${H.name}`), !0); }
    endRun(Y, b) { this.phase = "result", this.result = Y ? "victory" : "defeat", this.emit("RunEnded", b); }
}
class Ve extends Ot.Scene {
    constructor() { super("battle"); lt(this, "b"); lt(this, "soundFX"); lt(this, "asset"); lt(this, "onPoint"); lt(this, "onUnit"); lt(this, "onDrop"); lt(this, "tokens", new Map); lt(this, "rings"); lt(this, "terrainLayer"); lt(this, "labels"); lt(this, "dragStart"); lt(this, "dragUnit", ""); lt(this, "busy", !1); lt(this, "focusedUid", ""); lt(this, "preview"); lt(this, "previewPlan"); lt(this, "previewAt", 0); }
    preload() { this.load.maxParallelDownloads = 8; this.load.image("gate-art", this.asset("backgrounds/bg_minas_gate.png?v=p2")); this.load.image("terr_barricade", this.asset("tokens/terr_barricade.png?v=p2")); this.load.image("terr_bomb", this.asset("tokens/terr_bomb.png?v=p2")), this.load.image("terr_ballista", this.asset("tokens/terr_ballista.png?v=p2")), this.load.image("terr_brazier", this.asset("tokens/terr_brazier.png?v=p2")); for (const b of this.b.meta.values())
        if (b.side === 'terrain' && b.file) this.load.image(b.id, this.asset(b.file)); }
    create() { this.drawMap(), this.terrainLayer = this.add.container(0, 0), this.rings = this.add.graphics().setDepth(3), this.labels = this.add.container(0, 0).setDepth(8), this.cameras.main.setBounds(0, 0, pt.width, pt.height), this.cameras.main.setZoom(this.scale.width < 850 ? .85 : 1), this.cameras.main.centerOn(1165, 720), this.input.addPointer(1), this.input.on("pointerdown", b => { this.dragStart = { x: b.worldX, y: b.worldY }; const H = this.hit({ x: b.worldX, y: b.worldY }); this.dragUnit = (H == null ? void 0 : H.uid) || ""; }), this.input.on("pointerup", b => { if (this.busy)
        return; const H = { x: b.worldX, y: b.worldY }; if (!this.dragUnit && this.dragStart && Math.hypot(b.x - b.downX, b.y - b.downY) > 10) {
        this.dragStart = void 0;
        return;
    } if (this.dragUnit && this.dragStart && ht(this.dragStart, H) > 10)
        this.onDrop(this.dragUnit, H);
    else {
        const K = this.hit(H);
        K ? this.onUnit(K.uid) : this.onPoint(H);
    } this.dragUnit = "", this.dragStart = void 0, this.preview = void 0, this.previewPlan = null, this.drawRings(); }), this.input.on("pointermove", b => { if (b.isDown && !this.dragUnit && this.dragStart) {
        this.cameras.main.scrollX -= (b.x - b.prevPosition.x) / this.cameras.main.zoom, this.cameras.main.scrollY -= (b.y - b.prevPosition.y) / this.cameras.main.zoom;
        return;
    } if (this.busy || !["move", "preparation"].includes(this.b.phase))
        return; const H = this.b.unit(this.dragUnit || this.b.selected); if (!H || H.side !== this.b.side || H.acted || this.b.phase === "move" && !this.b.canAct(H))
        return; const K = { x: b.worldX, y: b.worldY }; this.preview && ht(this.preview, K) < 12 || this.time.now - this.previewAt < 75 || (this.preview = K, this.previewAt = this.time.now, this.previewPlan = this.b.phase === "move" ? ve(H, K, this.b.alive(), this.b.terrain, this.b.remaining(H)) : null, this.drawRings()); }), this.input.on("wheel", (b, H, K, $) => this.zoom($ > 0 ? -.15 : .15)), this._pinchD = 0, this.input.on("pointermove", b => { const p1 = this.input.pointer1, p2 = this.input.pointer2; if (p1.isDown && p2.isDown) { const d = Math.hypot(p1.x - p2.x, p1.y - p2.y); if (this._pinchD) this.zoom((d - this._pinchD) / 300); this._pinchD = d, this.dragStart = void 0; } }), this.input.on("pointerup", () => { (this.input.pointer1.isDown && this.input.pointer2.isDown) || (this._pinchD = 0); }), this.sync(); }
    hit(b) { return this.b.alive().slice().reverse().find(H => ht(b, H) <= H.radius + 8); }
    zoom(b) { this.cameras.main.setZoom(Ot.Math.Clamp(this.cameras.main.zoom + b, .4, 1.8)); }
    overview() { this.cameras.main.setZoom(Math.min(this.scale.width / pt.width, this.scale.height / pt.height)), this.cameras.main.centerOn(pt.width / 2, pt.height / 2); }
    focus() { const b = this.b.unit(this.b.selected); b && (this.cameras.main.setZoom(this.scale.width < 850 ? .95 : 1.1), this.cameras.main.pan(b.x, b.y, 250, "Sine.easeOut")); }
    center(b, H) { this.cameras.main.centerOn(b, H); }
    drawMap() { this.add.image(pt.width / 2, pt.height / 2, "gate-art").setDisplaySize(pt.width, pt.height); const b = this.add.graphics(); b.lineStyle(3, 13087605, .8), b.strokeRoundedRect(Mt.objective.x - 185, 95, 370, 310, 12), this.add.text(Mt.objective.x, 165, "성문 Defense 구역", { fontFamily: "Pretendard", fontSize: "21px", color: "#fff3cc", stroke: "#18201b", strokeThickness: 5 }).setOrigin(.5); }
    sync() { if (!this.rings)
        return; this.terrainLayer.removeAll(!0); for (const H of this.b.terrain.filter(K => K.active))
        if (!H.id.startsWith("wall"))
            if (H.id.startsWith("barricade"))
                this.terrainLayer.add(this.add.image(H.x, H.y, 'terr_barricade').setDisplaySize(H.w + 34, 116).setAlpha(.97));
            else if (H.z) {
                const K = this.add.graphics(), x = H.x - H.w / 2, y = H.y - H.h / 2, c = H.z === 'hill' ? 0xc9b06a : H.z === 'mountain' ? 0xb09a72 : 0x8fa8bd;
                K.fillStyle(c, .08), K.fillRoundedRect(x, y, H.w, H.h, 24); K.lineStyle(2, c, .42), K.strokeRoundedRect(x + 2, y + 2, H.w - 4, H.h - 4, 22);
                this.terrainLayer.add(K);
            }
            else if(this.textures.exists(H.id))
                this.terrainLayer.add(this.add.image(H.x, H.y, H.id).setDisplaySize(H.w + 24, H.h + 22)); for (const D of (this.b.devices || []))
        if (D.armed) {
            const K2 = { ballista: 'terr_ballista', scorpion: 'terr_trebuchet', barrel: 'terr_bomb', oil: 'terr_brazier', firepot: 'terr_brazier', snare: 'terr_chain_post', spike: 'terr_spike_line' }[D.type] || 'terr_brazier';
            this.textures.exists(K2) && this.terrainLayer.add(this.add.image(D.x, D.y, K2).setDisplaySize(D.type === 'ballista' ? 130 : 76, D.type === 'ballista' ? 130 : 76));
        } for (const H of this.b.units) {
        let K = this.tokens.get(H.uid);
        if (!H.alive || H.escaped) { if (K && !this.busy) { const _tk = K; this.tokens.delete(H.uid); this.tweens.add({ targets: _tk, alpha: 0, scaleX: .8, scaleY: .8, duration: 320, onComplete: () => _tk.destroy() }); } continue; }
        if (K && K.getData("assetId") !== H.id && (K.destroy(), this.tokens.delete(H.uid), K = void 0), !K) {
            const p = this.add.ellipse(3, 6, H.radius * 2.15, H.radius * 1.6, 594704, .5), _tid = this.textures.exists(H.id) ? H.id : this._wantTex(H.id), S = this.textures.get(_tid).getSourceImage(), t = S.width / S.height, f = (H.artScale || 1) * Math.min(H.radius * 2.15, H.radius * 2 * Math.min(t, 1 / t)), c = this.add.image(0, 0, _tid).setDisplaySize(f * (t > 1 ? t : 1), f * (t > 1 ? 1 : 1 / t)).setName("token"), o = this.add.circle(0, 0, H.radius).setStrokeStyle(H.traits.includes("hero") ? 3 : (H.elite ? 3 : 2), H.side === "good" ? 10276837 : (H.elite ? 0xe8c45c : 15242357), .9).setName("rim"), r = this.add.text(0, H.radius + 8, H.traits.includes("hero") ? H.name : (H.autoAlly ? "◆" : H.elite ? "★" : "") + H.uid.toUpperCase(), { fontFamily: "Pretendard", fontSize: "12px", color: H.side === "good" ? "#e1eff0" : "#f0c4ae", backgroundColor: "#172223bb", padding: { x: 3, y: 2 } }).setOrigin(.5).setName("label");
            const m = this.add.image(0, -H.radius - 14, 'fx-clash').setName("clash").setVisible(!1), m2 = this.add.image(0, -H.radius - 14, 'fx-prone').setName("prone").setVisible(!1), m3 = this.add.image(0, -H.radius - 14, 'fx-terror').setName("terror").setVisible(!1), m4 = this.add.image(0, -H.radius - 14, 'fx-charge').setName("charge").setVisible(!1), m5 = this.add.image(0, -H.radius - 14, 'fx-halfmove').setName("halfmove").setVisible(!1), m6 = this.add.image(0, -H.radius - 14, 'fx-blood').setName("blood").setVisible(!1);
            const m7 = this.add.text(H.radius * .75, -H.radius - 10, '', { fontFamily: "Pretendard", fontSize: "11px", fontStyle: "bold", color: "#ff9d8a", stroke: "#17211d", strokeThickness: 2 }).setOrigin(.5).setName("wounds");
            K = this.add.container(H.x, H.y, [p, c, o, r, m, m2, m3, m4, m5, m6, m7]).setDepth(5), K.setData("assetId", H.id), this.tokens.set(H.uid, K);
        }
        K.setPosition(H.x, H.y).setAlpha(1).setVisible(H.alive && this.b.phase !== "menu");
        const _bd = Math.max(18, H.radius * .44), _ord = ["prone", "terror", "charge", "clash", "halfmove", "blood"], _on = { prone: !!H.prone, terror: !!H.feared, charge: !!H.charged, clash: this.b.engaged(H), halfmove: H.movementSpent * 2 > H.stats.move, blood: H.currentWounds < H.stats.wounds };
        const _top = (H.alive && !H.escaped && this.b.phase !== "menu") ? _ord.find(nm => _on[nm]) : null;
        for (const nm of _ord) { const el = K.getByName(nm); if (!el) continue; if (nm === _top) el.setVisible(!0).setPosition(0, -H.radius - 14).setDisplaySize(_bd, _bd); else el.setVisible(!1); }
        const _wt = K.getByName("wounds"); if (_wt) { const _mw = H.stats.wounds > 1 && H.currentWounds < H.stats.wounds && H.currentWounds > 0; _wt.setVisible(!!_mw && H.alive && this.b.phase !== "menu"); if (_mw) _wt.setText(H.currentWounds + "/" + H.stats.wounds); }
        const $ = K.getByName("token");
        this.tweens.killTweensOf($), this.tween($, { angle: $.angle + Ot.Math.Angle.ShortestBetween($.angle, H.angle) }, 180), H.alive ? K.setDepth(5).setAngle(0) : K.setDepth(1);
    } for (const [H, K] of this.tokens)
        this.b.unit(H) || (K.destroy(), this.tokens.delete(H)); this.drawRings(); /* Camera stays where the player left it. */ }
    drawRings() { this.rings.clear(), this.labels.removeAll(!0); const b = this.b; b.phase === "preparation" && (this.rings.fillStyle(5748685, .24), this.rings.fillRect(32, 285, pt.width - 64, pt.deployY - 285), this.rings.lineStyle(4, 11137535, .95), this.rings.lineBetween(32, pt.deployY, pt.width - 32, pt.deployY), this.labels.add(this.add.text(55, pt.deployY - 34, "배치 가능 구역 · 병사를 드래그해 전열을 정하세요", { fontFamily: "Pretendard", fontSize: "20px", color: "#f0ffff", stroke: "#172523", strokeThickness: 5 }))); { const _now = Date.now(); for (const p of b.alive()) if (p._spawnedAt && _now - p._spawnedAt < 1600) { const a = 1 - (_now - p._spawnedAt) / 1600; this.rings.lineStyle(5, p.side === 'evil' ? 15210014 : 10151679, a), this.rings.strokeCircle(p.x, p.y, 46 + (1 - a) * 28), this.labels.add(this.add.text(p.x, p.y - p.radius - 16, p.name || p.uid, { fontFamily: "Pretendard", fontSize: "14px", color: p.side === 'evil' ? "#ffc9b8" : "#c9ffd8", backgroundColor: "#1c2a24d8", padding: { x: 6, y: 3 } }).setOrigin(.5)); } } const H = b.unit(b.activeMoverUid || this.dragUnit || b.selected); if (H != null && H.alive) {
        if (this.rings.lineStyle(4, 16769697, 1), this.rings.strokeCircle(H.x, H.y, H.radius + 7), b.phase === "move" && b.canAct(H) && !b.engaged(H)) {
            const p = b.remaining(H), S = [], t = b.alive();
            for (let f = 0; f <= 80; f++) {
                const c = f * Math.PI * 2 / 80, o = { x: Math.cos(c), y: Math.sin(c) };
                let r = { x: H.x, y: H.y };
                for (let n = 16; n <= p; n += 16) {
                    const e = { x: H.x + o.x * n, y: H.y + o.y * n };
                    if (!Et(H, e, t, b.terrain))
                        break;
                    r = e;
                }
                S.push(r);
            }
            this.rings.fillStyle(4442538, .32), this.rings.fillPoints(S, !0), this.rings.lineStyle(4, 8716258, .95), this.rings.strokePoints(S, !0), this.rings.lineStyle(2, 16768907, .88), this.rings.strokeCircle(H.x, H.y, p);
            if (H.side === 'good') for (const _t2 of b.alive('evil')) { if (ht(_t2, H) <= _t2.stats.move + _t2.radius + H.radius + 8) this.rings.lineStyle(3, 15054950, .75), this.rings.strokeCircle(_t2.x, _t2.y, _t2.radius + 6), this.labels.add(this.add.text(_t2.x, _t2.y - _t2.radius - 14, '⚠', { fontFamily: 'Pretendard', fontSize: '13px' }).setOrigin(.5)); else if (_t2.stats.shootRange && ht(_t2, H) <= _t2.stats.shootRange + H.radius) this.rings.lineStyle(2, 15290840, .6), this.rings.strokeCircle(_t2.x, _t2.y, _t2.radius + 5), this.labels.add(this.add.text(_t2.x, _t2.y - _t2.radius - 14, '🏹', { fontFamily: 'Pretendard', fontSize: '12px' }).setOrigin(.5)); }
            for (const f of b.terrain.filter(c => c.active && ht(H, c) < p + Math.max(c.w, c.h) / 2))
                this.rings.fillStyle(15097942, .2), this.rings.fillRect(f.x - f.w / 2 - H.radius, f.y - f.h / 2 - H.radius, f.w + H.radius * 2, f.h + H.radius * 2), this.rings.lineStyle(2, 15957352, .8), this.rings.strokeRect(f.x - f.w / 2 - H.radius, f.y - f.h / 2 - H.radius, f.w + H.radius * 2, f.h + H.radius * 2);
            for (const f of t.filter(c => c.uid !== H.uid && ht(H, c) < p + H.radius + c.radius))
                this.rings.fillStyle(f.side === H.side ? 14658143 : 15295845, .26), this.rings.fillCircle(f.x, f.y, f.radius + H.radius), this.rings.lineStyle(2, f.side === H.side ? 16766090 : 16750475, .9), this.rings.strokeCircle(f.x, f.y, f.radius + H.radius);
            if (this.preview) {
                const f = this.previewPlan;
                if (this.rings.lineStyle(6, f ? 15269819 : 16744050, .96), this.rings.strokeCircle(((f == null ? void 0 : f.to) || this.preview).x, ((f == null ? void 0 : f.to) || this.preview).y, H.radius + 5), f) {
                    this.rings.lineStyle(6, 15983272, 1), this.rings.beginPath(), this.rings.moveTo(f.path[0].x, f.path[0].y);
                    for (const c of f.path.slice(1))
                        this.rings.lineTo(c.x, c.y);
                    this.rings.strokePath(), this.labels.add(this.add.text(f.to.x + H.radius + 8, f.to.y - 14, `${Math.ceil(f.distance)} / 남은 ${Math.floor(p)}${f.snapped ? " · 착지점 보정" : ""}${f.yields.length ? " · 아군 비켜줌" : ""}`, { fontFamily: "Pretendard", fontSize: "19px", color: "#fff4d4", backgroundColor: "#17332edf", padding: { x: 8, y: 4 } }).setDepth(8));
                }
            }
        }
        if (b.phase === "shoot" && H.stats.shootRange) {
            this.rings.lineStyle(3, 16769437, .8), this.rings.strokeCircle(H.x, H.y, H.stats.shootRange);
            const _hill = b.terrain.some(t => t.z === 'hill' && t.active && le(H, t, 0)), _wx = b.current ? b.current.modifier : '', _wpen = ["rain", "dark", "fog"].includes(_wx) ? 1 : 0;
            for (const p of b.validTargets(H)) {
                this.rings.lineStyle(3, 16751989, 1), this.rings.strokeCircle(p.x, p.y, p.radius + 8);
                const hitN = Math.min(6, H.stats.shootValue + (H.moved ? pt.movePenalty : 0) + (_t(H, p, b.terrain) === 'cover' ? 1 : 0) - (_hill ? 1 : 0) + _wpen + (p.evadeRanged || 0)), wN = oe(H.stats.strength, p.stats.defence);
                this.labels.add(this.add.text(p.x, p.y - p.radius - 16, `명중 ${hitN}+ · 상처 ${wN}+`, { fontFamily: "Pretendard", fontSize: "14px", color: "#ffe6b0", backgroundColor: "#1c2a24e0", padding: { x: 6, y: 3 } }).setOrigin(.5));
            }
        }
        if (b.phase === "move" && b.canAct(H) && !b.engaged(H))
            for (const p of b.alive(Ht(H.side))) {
                const c = ue(H, p);
                if (c && ie(H, c, b.alive(), b.terrain, b.remaining(H)))
                    this.rings.lineStyle(3, 15295845, .85), this.rings.strokeCircle(p.x, p.y, p.radius + 8), this.labels.add(this.add.text(p.x, p.y - p.radius - 16, `돌격 · 결투 ${H.stats.fight} vs ${p.stats.fight}`, { fontFamily: "Pretendard", fontSize: "14px", color: "#ffd9c9", backgroundColor: "#2a1c1ce0", padding: { x: 6, y: 3 } }).setOrigin(.5));
            }
    } for (const p of b.alive()) {
        p.traits && p.traits.includes('boss') && (this.rings.fillStyle(12534097, .1 + .06 * Math.sin(performance.now() / 240)), this.rings.fillCircle(p.x, p.y, (p.visualRadius || p.radius) + 14), this.rings.lineStyle(4, 16745560, .5 + .3 * Math.sin(performance.now() / 240)), this.rings.strokeCircle(p.x, p.y, (p.visualRadius || p.radius) + 14)),
        p.hold && (this.rings.lineStyle(3, 9362410, .8), this.rings.strokeCircle(p.x, p.y, p.radius + 2)), p.feared && this.labels.add(this.add.text(p.x, p.y - p.radius - 30, '😨', { fontFamily: 'Pretendard', fontSize: '15px' }).setOrigin(.5)), (this.b.commanders || []).includes(p.uid) && this.labels.add(this.add.text(p.x, p.y - p.radius - 44, '♛', { fontFamily: 'Pretendard', fontSize: '15px', color: '#ffd76a', stroke: '#000', strokeThickness: 3 }).setOrigin(.5)), p.uid === this.b.escortCart && this.labels.add(this.add.text(p.x, p.y - p.radius - 44, '호송', { fontFamily: 'Pretendard', fontSize: '12px', color: '#bfe3ff', stroke: '#000', strokeThickness: 3 }).setOrigin(.5)), p.protected && this.labels.add(this.add.text(p.x, p.y + p.radius + 8, '🛡', { fontFamily: 'Pretendard', fontSize: '13px' }).setOrigin(.5)), p.aim && this.labels.add(this.add.text(p.x - p.radius + 4, p.y - p.radius - 8, '🎯', { fontFamily: 'Pretendard', fontSize: '12px' }).setOrigin(.5)), p.prone && this.labels.add(this.add.text(p.x + p.radius - 4, p.y - p.radius - 8, '💥', { fontFamily: 'Pretendard', fontSize: '13px' }).setOrigin(.5)), p.acted && ["move", "shoot"].includes(b.phase) && this.labels.add(this.add.text(p.x + p.radius - 3, p.y - p.radius, "✓", { fontFamily: "Pretendard", fontSize: "17px", color: "#fff1bc", stroke: "#121b1c", strokeThickness: 3 }));
        const S = p.radius + 10, t = p.stats.wounds;
        for (let f = 0; f < t; f++) {
            const c = -Math.PI / 2 + f * Math.PI * 2 / t + .055, o = -Math.PI / 2 + (f + 1) * Math.PI * 2 / t - .055;
            this.rings.lineStyle(p.traits.includes("hero") ? 7 : p.elite ? 6 : 5, f < p.currentWounds ? p.side === "good" ? 9559497 : p.elite ? 15235146 : 15111288 : 4994612, .95), this.rings.beginPath(), this.rings.arc(p.x, p.y, S, c, o), this.rings.strokePath();
        }
        p.traits.includes("hero") && this.labels.add(this.add.text(p.x, p.y - p.radius - 24, `✦ ${p.currentWounds}/${p.stats.wounds}`, { fontFamily: "Pretendard", fontSize: "16px", color: "#fff0c0", backgroundColor: "#1b2a2ce8", stroke: "#2a1b18", strokeThickness: 2, padding: { x: 6, y: 3 } }).setOrigin(.5));
    }
    if (b.banter && Date.now() < b.banter.until) {
        const _bu = b.unit(b.banter.uid);
        if (_bu && _bu.alive)
            this.labels.add(this.add.text(_bu.x, _bu.y - _bu.radius - 18, b.banter.text, { fontFamily: "Pretendard", fontSize: "14px", color: "#f3e8c8", backgroundColor: "#242c20e0", padding: { x: 8, y: 4 } }).setOrigin(.5));
    }
    for (const d of (b.devices || [])) {
        if (!d.armed) continue;
        this.rings.lineStyle(2, d.type === 'barrel' ? 0x8a3a20 : d.type === 'ballista' ? 0xc9a03f : 0xd4502a, .85);
        this.rings.strokeCircle(d.x, d.y, d.type === 'barrel' ? 34 : d.trigger * .35);
        this.labels.add(this.add.text(d.x, d.y - 16, d.type === 'ballista' ? '\u2699 투석기' : d.type === 'snare' ? '\u26D3 덫' : d.type === 'barrel' ? '\u{1F4A3} 화약통' : '\u{1F525} 불통', { fontFamily: "Pretendard", fontSize: "15px", color: "#ffd98a", backgroundColor: "#1b2218d0", padding: { x: 6, y: 3 } }).setOrigin(.5));
    }
    const K = b.unit(b.selected), $ = b.unit(b.activeMoverUid) || (K && b.canAct(K) ? K : b.eligible()[0]); if ($ != null && $.alive && ["move", "shoot", "preparation"].includes(b.phase) && (this.rings.lineStyle(5, 16769698, 1), this.rings.strokeCircle($.x, $.y, $.radius + 18), this.rings.lineStyle(2, 16773823, .96), this.rings.strokeCircle($.x, $.y, $.radius + 23), this.labels.add(this.add.text($.x, $.y - $.radius - 69, "▼ 현재 행동", { fontFamily: "Pretendard", fontSize: "18px", color: "#17282b", backgroundColor: "#f3d494", padding: { x: 10, y: 4 } }).setOrigin(.5))), b.phase === "fight")
        for (const p of b.fightQueue) {
            const S = p.map(t => b.unit(t)).filter(t => t.alive);
            for (const t of S)
                for (const f of S)
                    t.side !== f.side && ht(t, f) <= t.radius + f.radius + 3 && (this.rings.lineStyle(3, 14724967, .65), this.rings.lineBetween(t.x, t.y, f.x, f.y));
        }
        if (b.fightQueue[0]) { const _nx = b.fightQueue[0].map(t => b.unit(t)).filter(t => t && t.alive), _cx = _nx.reduce((a, t) => a + t.x, 0) / Math.max(1, _nx.length), _cy = _nx.reduce((a, t) => a + t.y, 0) / Math.max(1, _nx.length); for (const t of _nx) this.rings.lineStyle(3, 15501166, .9).strokeCircle(t.x, t.y, t.radius + 8); _nx.length && this.labels.add(this.add.text(_cx, _cy - 60, '▼ 다음 교전 · 탭한 교전부터 해결', { fontFamily: 'Pretendard', fontSize: '13px', color: '#fbe8b0', backgroundColor: '#241d0aea', padding: { x: 7, y: 3 } }).setOrigin(.5)); } }
    tween(b, H, K = 250) { return new Promise($ => { this.tweens.add({ targets: b, ...H, duration: K, ease: "Sine.easeInOut", onComplete: () => $() }); }); }
    sleep(b) { return new Promise(H => this.time.delayedCall(window._lwbFx ? Math.min(b, 30) : b, H)); }
    async play(b) { if (b.type === "UnitYielded") {
        const H = this.tokens.get(b.uid);
        if (H) {
            const K = b.from, $ = b.to;
            H.setPosition(K.x, K.y), await this.tween(H, { x: $.x, y: $.y }, 160);
        }
    } if (b.type === "UnitMoved") {
        const H = this.tokens.get(b.uid);
        if (H) {
            const K = b.from, $ = b.to, p = b.path || [K, $];
            H.setPosition(K.x, K.y);
            const S = H.getByName("token");
            this.soundFX.play("base_slide");
            const t = p.slice(1).reduce((f, c, o) => f + ht(p[o], c), 0) || 1;
            for (let f = 1; f < p.length; f++) {
                const c = p[f - 1], o = p[f], r = Wt(this.b.unit(b.uid).id, c, o);
                this.tween(S, { angle: S.angle + Ot.Math.Angle.ShortestBetween(S.angle, r) }, Math.min(150, 280 * ht(c, o) / t)), await this.tween(H, { x: o.x, y: o.y }, Math.max(40, 280 * ht(c, o) / t));
            }
            // No automatic camera following after a unit move.
        }
    } b.type === "ChargeConnected" && this.soundFX.play("base_contact"), b.result && await this.combat(b.result); }
    async combat(b) { for (const K of b.trappedUnits) {
        const $ = this.b.unit(K), p = this.add.text($.x, $.y - $.radius - 25, "포위 · 추가 타격", { fontFamily: "Pretendard", fontSize: "11px", color: "#ffdb9c", backgroundColor: "#5d241cee", padding: { x: 5, y: 3 } }).setOrigin(.5).setDepth(20);
        this.time.delayedCall(1500, () => p.destroy());
    } for (const K of b.knockedDownUnits) {
        const $ = this.b.unit(K), p = this.add.text($.x, $.y - $.radius - 45, "기병 충격 · 넘어짐", { fontFamily: "Pretendard", fontSize: "12px", color: "#f9edba", backgroundColor: "#31504cf0", padding: { x: 5, y: 3 } }).setOrigin(.5).setDepth(21);
        this.time.delayedCall(1400, () => p.destroy());
    } const H = K => { var $; return (($ = b.pushVectors.find(p => p.uid === K)) == null ? void 0 : $.from) || this.b.unit(K); }; for (const K of b.strikeResults) {
        const $ = H(K.attacker), p = H(K.target), S = this.tokens.get(K.attacker), t = this.tokens.get(K.target);
        if (!S || !t)
            continue;
        const f = S.getByName("token"), c = t.getByName("token");
        if (await Promise.all([this.tween(f, { angle: f.angle + Ot.Math.Angle.ShortestBetween(f.angle, Wt(this.b.unit(K.attacker).id, $, p)) }, 140), this.tween(c, { angle: c.angle + Ot.Math.Angle.ShortestBetween(c.angle, Wt(this.b.unit(K.target).id, p, $)) }, 140)]), b.kind === "shot") {
            const _su = this.b.unit(K.attacker), _fire = _su && _su.traits && (_su.traits.includes('monster') || _su.traits.includes('boss'));
            this.soundFX.play(_fire ? "cast" : "arrow_release");
            const r = _fire ? this.add.container($.x, $.y, [this.add.circle(0, 0, 17, 16751870, .3), this.add.circle(0, 0, 9, 16770085, .95), this.add.circle(-7, 0, 5, 15234331, .85)]).setDepth(12) : this.add.container($.x, $.y, [this.add.rectangle(0, 0, 25, 2, 15127457), this.add.triangle(14, 0, 0, 0, 7, 4, 0, 8, 15656132).setOrigin(.5)]).setDepth(12).setRotation(Math.atan2(p.y - $.y, p.x - $.x));
            await this.tween(r, { x: p.x + (K.wound ? 0 : 15), y: p.y + (K.wound ? 0 : -12) }, 330), r.destroy(), this.soundFX.play("arrow_impact");
        }
        else {
            this.soundFX.play("sword_swing");
            const r = ht($, p) || 1;
            await this.tween(S, { x: $.x + (p.x - $.x) / r * 10, y: $.y + (p.y - $.y) / r * 10 }, 90);
            const n = this.add.graphics().setDepth(11);
            n.lineStyle(4, 16772288, .9), n.beginPath(), n.arc(p.x, p.y, 22, -2.5, .7), n.strokePath(), await this.tween(n, { alpha: 0, scaleX: 1.02, scaleY: 1.02 }, 110), n.destroy(), this.tween(S, { x: $.x, y: $.y }, 110);
        }
        this.soundFX.play(K.wound ? "sword_flesh" : "sword_armor");
        for (let r = 0; r < 7; r++) {
            const n = this.add.circle(p.x, p.y, 1.5 + Math.random() * 2, K.wound ? 10767420 : 16044688).setDepth(12);
            this.tween(n, { x: p.x + (Math.random() - .5) * 48, y: p.y + (Math.random() - .5) * 48, alpha: 0 }, 240).then(() => n.destroy());
        }
        // Camera shake disabled in the clarity build.
        const o = this.add.text(p.x, p.y - 25, K.wound ? "−1" : "Defense", { fontFamily: "Pretendard", fontSize: "14px", color: K.wound ? "#ffd0ab" : "#fff1bf", stroke: "#17211d", strokeThickness: 2 }).setOrigin(.5).setDepth(13);
        this.tween(o, { y: p.y - 55, alpha: 0 }, 550).then(() => o.destroy()); if (K.killed) { const _ku = this.b.unit(K.target), _kl = _ku && _ku.elite ? "엘리트 처치 +8금" : "처치!", _kt = this.add.text(p.x, p.y - 48, _kl, { fontFamily: "Pretendard", fontSize: "12px", color: "#ffe9a8", stroke: "#17211d", strokeThickness: 2 }).setOrigin(.5).setDepth(14); this.tween(_kt, { y: p.y - 74, alpha: 0 }, 750).then(() => _kt.destroy()); } K.killed ? (this.soundFX.play("death"), await this.tween(t, { alpha: .2, angle: 12 }, 120)) : await this.tween(t, { x: p.x + 3, y: p.y + 2 }, 70);
    } for (const K of b.participants) {
        const $ = this.b.unit(K), p = this.tokens.get(K);
        if (($ == null ? void 0 : $.id) === "glorfindel_foot" && (p == null ? void 0 : p.getData("assetId")) === "glorfindel_mounted") {
            const S = this.add.text($.x, $.y - 65, "낙마 → 도보 전환", { fontFamily: "Pretendard", fontSize: "12px", color: "#fff0b8", backgroundColor: "#24382cee", padding: { x: 6, y: 4 } }).setOrigin(.5).setDepth(30);
            this.time.delayedCall(1600, () => S.destroy());
        }
    } await Promise.all(b.pushVectors.map(async (K) => { const $ = this.tokens.get(K.uid); $ && (this.soundFX.play("push"), await this.tween($, { x: K.to.x, y: K.to.y }, 200)); })); }
}
const Ye = Object.fromEntries(["dice_roll", "base_slide", "base_contact", "sword_swing", "sword_armor", "sword_shield", "sword_flesh", "arrow_release", "arrow_fly", "arrow_impact", "push", "death", "ui_select", "reward_select"].map(Z => [Z, { file: `audio/${Z}.wav`, volume: Z === "dice_roll" ? .5 : .75 }]));
class We {
    constructor() { lt(this, "context"); lt(this, "muted", !0); lt(this, "sfxVolume", .7); lt(this, "musicVolume", .35); lt(this, "music"); lt(this, "buffers", new Map); lt(this, "asset", Y => Y); lt(this, "mood", 1); }
    _effVol(b = this.musicVolume) { return b * (this.mood === 0 ? .45 : 1); }
    setMood(Y) { if (this.mood === Y) return; this.mood = Y, this.music && (this.music.playbackRate = Y === 2 ? 1.05 : 1, this.music.volume = this.muted ? 0 : this._effVol()); }
    fanfare(Y = true) { if (this.muted || this.sfxVolume <= 0 || !this.context || document.hidden) return; const b = this.context, H = b.currentTime, K = Y ? [[261.6, 0, .16], [329.6, .15, .16], [392, .3, .18], [523.3, .5, .55]] : [[220, 0, .3], [174.6, .28, .62]]; for (const [$, p, S] of K) { const t = b.createOscillator(), f = b.createGain(), c = b.createBiquadFilter(); t.type = "sawtooth", t.frequency.value = $, c.type = "lowpass", c.frequency.value = 1300, f.gain.setValueAtTime(0, H + p), f.gain.linearRampToValueAtTime(this.sfxVolume * .4, H + p + .04), f.gain.setValueAtTime(this.sfxVolume * .4, Math.max(0, H + p + S - .05)), f.gain.linearRampToValueAtTime(0, H + p + S), t.connect(c), c.connect(f), f.connect(b.destination), t.start(H + p), t.stop(H + p + S + .05); } }
    async unlock() { this.music || (this.music = new Audio(this.asset("audio/gate-of-the-west.mp3")), this.music.loop = !0), this.music.volume = this.muted ? 0 : this._effVol(); if (this.muted || document.hidden)
        return; this.context ?? (this.context = new AudioContext), await this.context.resume(), this._startTheme && this._startTheme(), this.musicVolume > 0 && this.music.play().catch(() => { }); }
    savePrefs() { try { localStorage.setItem("lwb-audio", JSON.stringify({ muted: this.muted, sfxVolume: this.sfxVolume, musicVolume: this.musicVolume })); }
        catch { } }
    setVolumes(Y, b) { this.sfxVolume = Y, this.musicVolume = b; this.music && (this.music.volume = this.muted ? 0 : this._effVol(b), this.muted || b <= 0 ? this.music.pause() : this.music.paused && this.music.play().catch(() => { })); this.context && (this.muted || Y <= 0 && b <= 0 ? this.context.suspend() : this.context.state === "suspended" && this.context.resume().catch(() => { })); this.savePrefs(); }
    toggle() { this.muted = !this.muted; if (this.music)
        this.music.volume = this.muted ? 0 : this._effVol(), this.muted ? this.music.pause() : this.musicVolume > 0 && this.music.play().catch(() => { }); this.context && (this.muted ? this.context.suspend() : this.context.resume().catch(() => { })); this.savePrefs(); }
    async play(Y) { if (this.muted || document.hidden || this.sfxVolume <= 0)
        return; const b = Ye[Y]; if (b)
        try {
            this.context ?? (this.context = new AudioContext), this.context.state === "suspended" && await this.context.resume();
            let H = this.buffers.get(Y);
            if (!H) {
                const p = await (await fetch(this.asset(b.file))).arrayBuffer();
                H = await this.context.decodeAudioData(p), this.buffers.set(Y, H);
            }
            const K = this.context.createBufferSource(), $ = this.context.createGain();
            K.buffer = H, K.playbackRate.value = .96 + Math.random() * .08, $.gain.value = this.sfxVolume * b.volume, K.connect($), $.connect(this.context.destination), K.start();
        }
        catch { } }
}
function be(Z, Y) { if (Z.engaged(Y) || Z.remaining(Y) < 12)
    return null; if (Y.traits.includes('spear')) { if (supportAlly(Y)) return null; const sup = Z.alive(Y.side).filter(v => v !== Y && Z.alive(Ht(Y.side)).some(f => Vt(v, f))).sort((a, c) => ht(Y, a) - ht(Y, c)); for (const v of sup.slice(0, 3)) { const ang = Math.atan2(v.y - Y.y, v.x - Y.x); for (const t of [v.radius + Y.radius + 30, v.radius + Y.radius + 44]) for (let k = 0; k < 14; k++) { const c = ang + (k % 2 === 0 ? 1 : -1) * Math.ceil(k / 2) * Math.PI / 7, o = { x: v.x + Math.cos(c) * t, y: v.y + Math.sin(c) * t }; if (ht(o, v) > v.radius + Y.radius + 48) continue; if (Z.alive(Ht(Y.side)).some(f => ht(o, f) <= Y.radius + f.radius + 3)) continue; if (de(Y, o, Z.alive(), Z.terrain, Z.remaining(Y))) return o; } } } const b = Z.alive(Y.side === "good" ? "evil" : "good"), H = b.map(t => ({ v: t, p: ue(Y, t) })).filter(t => de(Y, t.p, Z.alive(), Z.terrain, Z.remaining(Y))).sort((t, f) => ht(Y, t.v) - ht(Y, f.v)); if (H.length && (!Y.stats.shootRange || ht(Y, H[0].v) < 90))
    return H[0].p; const K = Y.side === "evil" ? Mt.objective : b.slice().sort((t, f) => ht(Y, t) - ht(Y, f))[0] || Y; if (Y.stats.shootRange && Z.validTargets(Y).length)
    return null; let $ = null, p = ht(Y, K); const S = Math.atan2(K.y - Y.y, K.x - Y.x); for (const t of [Z.remaining(Y), Z.remaining(Y) * .7, Z.remaining(Y) * .4, 20])
    for (let f = 0; f < 32; f++) {
        const c = S + (f % 2 === 0 ? 1 : -1) * Math.ceil(f / 2) * Math.PI / 16, o = { x: Y.x + Math.cos(c) * t, y: Y.y + Math.sin(c) * t };
        if (!de(Y, o, Z.alive(), Z.terrain, Z.remaining(Y)))
            continue;
        let r = ht(o, K);
        Y.side === "evil" && (r += Math.abs(o.x - Mt.objective.x) * .13), r < p && (p = r, $ = o);
    } return $; }
function He(Z) { const Y = Z.eligible()[0]; if (!Y) {
    Z.advance();
    return;
} if (UX.ready && !UX.reduced && (Z.mode === 'ai' && Z.side === 'evil' || AUTO)) { const _p = screenAt(Y.x, Y.y); (_p.x < 60 || _p.x > UX.width - 60 || _p.y < 70 || _p.y > UX.height - 70) && panTo(Y.x, Y.y, UX.zoom, Math.max(120, 340 / qt)); } if (Z.phase === "move") {
    const __sk = CX.skills[Y.id];
    if (__sk && !Z.skillReason(Y)) {
        const __fx = __sk[4], __foeIds = ["sauron", "witchking_fellbeast", "witchking_foot", "witchking_foot_mace", "witchking_mounted", "saruman", "boromir", "grima", "barrow_wight", "mouth_of_sauron", "necromancer", "king_of_the_dead", "melkor", "luthien", "nazgul_sword", "nazgul_sword_2", "nazgul_mace", "nazgul_mounted", "dwimmerlaik", "khamul", "muzgur", "gandalf", "gandalf_mounted"];
        const __need = __fx ? !!(__fx.foe || __fx.foeStrongest || __fx.strike || __fx.push) : __foeIds.includes(Y.id);
        if (!__need || Z.alive(Ht(Y.side)).some(v => ht(v, Y) <= 520))
            Z.skill(Y.uid);
    }
    const b = be(Z, Y);
    (!b || !Z.move(Y.uid, b)) && Z.wait(Y.uid);
}
else if (Z.phase === "shoot") {
    const b = Z.validTargets(Y).sort((H, K) => H.currentWounds - K.currentWounds || H.stats.defence - K.stats.defence || ht(H, Mt.objective) - ht(K, Mt.objective))[0];
    (!b || !Z.shoot(Y.uid, b.uid)) && Z.wait(Y.uid);
} }
const __ASSET_SET__ = new Set([...Object.keys(window.__MESBG_ASSETS__ || {}), ...(window.__MESBG_ASSET_KEYS__ || [])]), __assetOk = Z => __ASSET_SET__.has(Z), Ut = Z => { var Y; return ((Y = window.__MESBG_ASSETS__) == null ? void 0 : Y[Z]) || `./assets/mesbg/${Z}${Z.includes('?') ? '' : '?v=a7'}`; }, pe = document.createElement("style");
// Small WebP portraits for DOM UI (cards, panels). Full PNGs stay for the battlefield. Regenerate with tools/make_thumbs.py.
const Th = Z => { const m = /^tokens\/(.+)\.png/.exec(Z || ''); return m ? Ut('thumbs/' + m[1] + '.webp') : Ut(Z); }, ThFallback = 'this.onerror=null;this.src=this.dataset.full';
pe.textContent = `@font-face{font-family:Pretendard;src:url('${Ut("fonts/PretendardVariable.woff2")}') format('woff2');font-weight:100 900;font-display:swap}`;
document.head.append(pe);
(function(){const go=()=>{const seen=new Set(),pool=[];for(const m of window.CAMPAIGN_META||[]){if(m&&m.side==='good'&&m.file&&!seen.has(m.file)){seen.add(m.file);pool.push(m.file);}}let i=0;const step=()=>{for(let k=0;k<24&&i<pool.length;k++){const im=new Image();im.fetchPriority='low';im.src=Th(pool[i++]);}if(i<pool.length)setTimeout(step,60);};step();};const _boot=()=>{if(document.body.classList.contains('assets-ready'))return go();const mo=new MutationObserver(()=>{if(document.body.classList.contains('assets-ready')){mo.disconnect();go();}});mo.observe(document.body,{attributeFilter:['class']});setTimeout(go,9000);};if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',_boot);else _boot();})();
document.addEventListener("visibilitychange", () => { const Z = document.hidden; Z ? (wt.__resumeOnShow = !!(wt.music && !wt.music.paused), wt.music && wt.music.pause()) : (wt.__resumeOnShow && !wt.muted && wt.music && wt.music.play().catch(() => { }), wt.__resumeOnShow = !1); wt.context && (Z ? wt.context.state === "running" && wt.context.suspend() : !wt.muted && wt.context.state === "suspended" && wt.context.resume().catch(() => { })); });
const q = new ze(Me.units), wt = new We, Tt = new Ve;
try { const Z = JSON.parse(localStorage.getItem("lwb-audio")); Z && (Z.muted != null && (wt.muted = !!Z.muted), Z.sfxVolume != null && (wt.sfxVolume = Z.sfxVolume), Z.musicVolume != null && (wt.musicVolume = Z.musicVolume)); }
catch { }
Tt.b = q;
Tt.soundFX = wt;
Tt.asset = Ut;
wt.asset = Ut;
// ---- 막별 프로시저럴 BGM 레이어: 저음 드론 + 전쟁북 + 뿔피리 (mp3 위에 막 테마가 겹침)
wt.act = 0;
wt._THEMES = [
    { base: 110.0, rate: 2.7, drum: .45, horn: [220, 277.2, 329.6] },   // 1막 반지의제왕 — 장중한 A장조
    { base: 146.83, rate: 2.2, drum: .5, horn: [293.7, 349.2, 440] },   // 2막 호빗 — D장조 모험
    { base: 98.0, rate: 1.7, drum: .8, horn: [196, 233.1, 261.6] },     // 3막 사우론 — G단조 무거운 북
    { base: 73.42, rate: 3.0, drum: .9, horn: [146.8, 155.6, 174.6] }   // 4막 대암흑 — D드론 불협화
];
wt.setAct = function (a) { if (wt.act === a) return; wt.act = a; if (wt._drone) wt._tuneTheme(); };
wt._tuneTheme = function () { const T = wt._THEMES[wt.act] || wt._THEMES[0]; if (wt._drone) { wt._drone.frequency.setTargetAtTime(T.base, wt.context.currentTime, .8); wt._drone2.frequency.setTargetAtTime(T.base * 1.5, wt.context.currentTime, .8); } wt._drumRate = T.rate; };
wt._startTheme = function () {
    if (wt._themeOn || !wt.context) return; wt._themeOn = true;
    const c = wt.context, g = c.createGain(); g.gain.value = 0; g.connect(c.destination); wt._tg = g;
    const f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 240;
    const og = c.createGain(); og.gain.value = .014;
    const o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 110;
    const o2 = c.createOscillator(); o2.type = 'sawtooth'; o2.frequency.value = 165; o2.detune.value = 9;
    o.connect(f); o2.connect(f); f.connect(og); og.connect(g); o.start(); o2.start();
    wt._drone = o; wt._drone2 = o2; wt._nextDrum = c.currentTime + .8; wt._hornCount = 0; wt._drumRate = wt._THEMES[wt.act].rate;
    wt._themeTimer = setInterval(() => {
        if (!wt.context || wt.muted || document.hidden) return;
        const ct = c.currentTime, T = wt._THEMES[wt.act] || wt._THEMES[0];
        g.gain.setTargetAtTime((wt.musicVolume || 0) * .85, ct, .3);
        if (ct >= wt._nextDrum) {
            wt._nextDrum = ct + wt._drumRate; wt._hornCount++;
            const k = c.createOscillator(); k.type = 'sine';
            k.frequency.setValueAtTime(150, ct); k.frequency.exponentialRampToValueAtTime(38, ct + .09);
            const kg = c.createGain(), dv = .14 * T.drum * (wt.mood === 2 ? 1.6 : 1);
            kg.gain.setValueAtTime(dv, ct); kg.gain.exponentialRampToValueAtTime(.001, ct + .55);
            k.connect(kg); kg.connect(g); k.start(ct); k.stop(ct + .6);
            if (wt._hornCount % 6 === 1) {
                const hz = T.horn[(wt._hornCount >> 1) % T.horn.length];
                const h = c.createOscillator(); h.type = 'sawtooth'; h.frequency.value = hz;
                const hf = c.createBiquadFilter(); hf.type = 'lowpass'; hf.frequency.value = hz * 3;
                const hg = c.createGain(); hg.gain.setValueAtTime(.0001, ct); hg.gain.exponentialRampToValueAtTime(.028, ct + .4); hg.gain.exponentialRampToValueAtTime(.0001, ct + 2.4);
                h.connect(hf); hf.connect(hg); hg.connect(g); h.start(ct); h.stop(ct + 2.5);
            }
        }
    }, 380);
};
let At = !1, Jt, se, Qt = !1, qt = 1;
const Ke = document.querySelector("#app");
Ke.innerHTML = '<div class="rotate">가로 화면에서 전장이 가장 잘 보입니다. 기기를 가로로 돌려주세요.</div><header class="top"><div class="sigil">♜</div><div class="brand"><small>A SIEGE ROGUELITE</small><strong>MINAS TIRITH</strong></div><div class="runmeta"><div class="metric"><small>WAVE</small><strong id="wave">— / 03</strong></div><div class="metric"><small>ROUND</small><strong id="round">—</strong></div><div class="metric"><small>COMMAND</small><strong id="cp" class="gold">0 / 4 CP</strong></div></div><div class="top-actions"><button class="iconbtn" id="sound" title="음향 설정">음향</button><button class="iconbtn" id="help" title="조작법">?</button></div></header><div class="layout"><main class="battle-column"><nav class="phases" id="phases"></nav><div class="field"><div id="game"></div><div id="turn-indicator" class="turn-indicator hidden" aria-live="polite"></div><div class="map-label"><b>The Great Gate</b>PELENNOR FIELDS · III AGE</div><div id="dice" class="dice-panel hidden"></div><div id="toast" class="toast hidden"></div><canvas id="minimap" class="minimap" width="220" height="138" title="클릭하면 해당 위치로 카메라 이동"></canvas><div class="zoom"><button class="iconbtn" id="overview">전체</button><button class="iconbtn" id="focus">선택</button><button class="iconbtn" id="zoomout" title="축소">−</button><button class="iconbtn" id="zoomin" title="선택 병사 중심 확대">+</button></div></div><div class="hint"><b>FIELD ORDER</b><span id="hint"></span></div></main><aside class="aside"><section class="objective"><div class="section-label">01 / THE OBJECTIVE</div><h3>Hold the gate.</h3><p id="objective"></p><div id="gatebar" class="gatebar"></div></section><section><div class="section-label">02 / SELECTED UNIT</div><div id="unit" class="unit-card"></div></section><section class="control-block"><div class="section-label">03 / COMMAND ORDERS</div><div id="commands"></div><button id="action" class="primary action"></button><button id="wait" class="secondary action">선택 병사 대기</button><button id="step-auto" class="secondary action hidden">전체 진행</button><button id="deploy-all" class="secondary action hidden">일괄 배치</button></section><section class="log"><div class="section-label">BATTLE CHRONICLE</div><div id="log"></div></section></aside></div><footer class="footer"><span>GATE DEFENCE / V0.4</span><span>3 WAVES · 영웅 테스트 · 원형 베이스 전투</span></footer><div id="overlay" class="overlay"></div><div id="audio-panel" class="audio-panel hidden"><small>GATE OF THE WEST · 오리지널 BGM</small><label>배경음악<input id="bgm-volume" type="range" min="0" max="1" step=".05" value=".35"></label><label>효과음<input id="sfx-volume" type="range" min="0" max="1" step=".05" value=".7"></label><button id="mute" class="secondary">전체 음소거</button></div>';
const ut = Z => document.getElementById(Z), Ze = [["priority", "우선권"], ["move", "이동 / 돌격"], ["shoot", "사격"], ["fight", "근접전"]];
function Xt(Z) { ut("toast").textContent = Z, ut("toast").classList.remove("hidden"), clearTimeout(se), se = setTimeout(() => ut("toast").classList.add("hidden"), 2800); }
function Je() { const _el = ["move", "shoot"].includes(q.phase) ? ` · 남은 아군 ${q.eligible('good').length} / 적 ${q.eligible('evil').length}기` : ''; return At ? "행동을 처리하고 있습니다…" : q.phase === "preparation" ? "밝은 파란 구역에 배치 · 다른 병사 옆에 놓으면 합법 위치로 보정됩니다." : q.phase === "move" ? `${q.side === "good" ? "곤도르" : "모르도르"} 차례` + _el + ` · 병사 선택 → 빈 곳 이동 / 적을 탭하면 돌격. 밝은 민트색=이동 가능, 주황/빨강=베이스/장애물. 목적지까지 우회 경로를 확인하세요. 이동력을 나눠 쓰고, 돌격하거나 이동 종료를 누르면 차례가 끝납니다.` : q.phase === "shoot" ? "궁수 선택 → 적 탭" + _el + ". 곤도르는 아군 차폐 시 금지. 모르도르는 4+ 통과 / 1–3 아군 오사." : q.phase === "fight" ? "연결된 모든 적·아군은 하나의 교전. 주사위 → 타격 → 밀림 순으로 해결합니다." : "성문을 지키고, 생존자와 함께 다음 공세에 대비하세요."; }
function Yt() { const Z = q.unit(q.selected), Y = q.unit(q.activeMoverUid) || (q.canAct(Z) ? Z : q.eligible()[0]), b = ut("turn-indicator"); b.classList.toggle("hidden", !["move", "shoot", "preparation"].includes(q.phase)), b.classList.toggle("evil", q.side === "evil"), b.innerHTML = q.phase === "preparation" ? "<span>배치 단계</span><strong>성문을 지킬 위치를 정하세요</strong>" : Y ? `<span>${q.side === "good" ? "곤도르" : "모르도르"} · ${q.phase === "move" ? "이동 / 돌격" : "사격"} 차례</span><strong>◆ ${Y.name}</strong><small>${q.phase === "move" ? `남은 이동력 ${Math.floor(q.remaining(Y))} / ${Y.stats.move}` : "사격 또는 대기"}</small>` : "", ut("wave").textContent = `${String(q.wave || 1).padStart(2, "0")} / 03`, ut("round").textContent = String(q.round || "—"), ut("cp").textContent = `${q.cp} / 4 CP`, ut("phases").innerHTML = Ze.map(([t, f]) => `<span class="phase ${q.phase === t ? "active" : ""}">${f}</span>`).join("") + `<span class="turn ${At ? "busy" : ""}">${At ? "진행 중…" : q.phase === "preparation" ? "배치 단계" : q.phase === "fight" ? "교전 해결" : q.side === "good" ? "◆ 곤도르 차례" : "◆ 모르도르 차례"}</span>`; const H = q.alive("evil").filter(t => ht(t, Mt.objective) <= Mt.objective.radius).length; ut("objective").innerHTML = `3개 공세를 견디세요.<br>라운드 종료 시 성문에 적 <b class="gold">${q.breachCount}명</b>이 있으면 패배.<br>수비대 ${q.alive("good").length}명 · 적 ${q.alive("evil").length}명`, ut("gatebar").innerHTML = Array.from({ length: q.breachCount }, (t, f) => `<i class="${f < H ? "danger" : ""}"></i>`).join(""); if (H > (q._gateWarn || 0)) Xt(`성문 구역에 적 ${H}기 — 라운드가 끝나기 전에 몰아내세요!`), q._gateWarn = H; else if (!H) q._gateWarn = 0; const K = q.unit(q.selected), $ = K && q.meta.get(K.id); ut("unit").innerHTML = K && $ ? `<div class="unit-head"><img src="${Ut($.file)}" alt="${$.name_ko}"><div><strong>${$.name_ko}</strong><small>${K.uid.toUpperCase()} · ${K.name}</small>${isHeroUnit(K.id)?`<small class="unit-tier tier-${heroGrade(K.id)}">${tierLabel(K.id)} · ${UnitCatalog[K.id]?.points??0}pt</small>`:''}<small>처치 ${K.kills} · XP ${K.veteranXP}</small></div></div><div class="vitality"><div class="vitality-title"><span>✦ 생명력</span><b>${K.currentWounds} / ${K.stats.wounds}</b></div><div class="vitality-segments">${Array.from({ length: K.stats.wounds }, (t, f) => `<i class="${f < K.currentWounds ? "filled" : "lost"}"></i>`).join("")}</div></div><div class="stats"><span>남은 이동<b>${K.acted && q.phase === "move" ? 0 : Math.floor(q.remaining(K))}</b></span><span>결투<b>${K.stats.fight}</b></span><span>힘<b>${K.stats.strength}</b></span><span>Defense<b>${K.stats.defence}</b></span><span>Attack<b>${K.stats.attacks}</b></span><span>용기<b>${K.stats.courage}</b></span>${K.stats.shootRange ? `<span>명중<b>${K.stats.shootValue}+</b></span>` : ""}</div><div class="traits">${[K.hold ? "전열 유지" : "", K.aim ? "정밀 사격" : "", K.traits.includes("veteran") ? "베테랑" : "", K.traits.includes("steadfast") ? "견고한 전열" : "", K.traits.includes("mounted") ? "기마 · 돌격 +1 결투 / 보병 넘어짐 · 첫 상처 시 도보 전환" : "", K.traits.includes("dismounted") ? "도보 전환 완료" : "", K.traits.includes("flying") ? "비행 · 장애물 통과 이동" : "", K.traits.includes("mountain") ? "산악 거주자 · 산 지형 통과" : "", q.terrain.some(t => t.z === "hill" && t.active && le(K, t, 0)) ? "고지 점유 · 사격 명중 +1 · 사거리 +1\u2033 · 결투 동수 우선" : "", K.injury === "leg" ? "부상 · 다리 (이동 ↓)" : K.injury === "arm" ? "부상 · 팔 (Attack ↓)" : "", K.side === "good" && q.bonded && q.bonded(K) ? "전우 유대 · 같은 진영 근접 · 결투 +1" : "", K.side === "good" && q.bondDesc ? q.bondDesc(K) : "", K.elite ? "엘리트 · 강화 개체 · 처치 시 +8금" : "", q.engaged(K) ? "교전 · " + q.alive().filter(b => Vt(K, b)).map(b => b.name).join("·") : ""].filter(Boolean).join(" · ") || "기본 훈련 · 전투 준비"}</div>${K.side === "good" ? '<div class="rtabs" style="margin-top:8px"><small style="align-self:center;color:#8f9a7f;font-size:9px">태세</small>' + [["auto", "자동"], ["aggressive", "돌격"], ["defense", "수비"], ["rear", "후방"]].map(([v, l]) => `<button class="rtab ${K.stance === v || !K.stance && v === "auto" ? "active" : ""}" data-stance="${v}">${l}</button>`).join("") + "</div>" : ""}` : '<p class="mini">전장의 병사를 선택하면 능력과 명령을 확인할 수 있습니다.</p>', ut("unit").querySelectorAll("[data-stance]").forEach(t => t.onclick = () => { K.stance = t.dataset.stance === "auto" ? "" : t.dataset.stance, Yt(); }), ut("commands").innerHTML = ae.map(t => { const f = t.id === "aim" && q.freeVolley ? 0 : t.cost, c = At || !K || K.side !== "good" || !["move", "shoot"].includes(q.phase) || q.cp < f || t.id === "hold" && K.hold || t.id === "aim" && (!K.stats.shootRange || K.oncePerRunAbilities.includes("aim-used")) || t.id === "urgent" && (K.acted || !q.eligible("good").includes(K)) || t.id === "fury" && q.furyRound === q.round; return `<button class="command" data-command="${t.id}" title="${t.description}" ${c ? "disabled" : ""}><span><b>${t.ko}</b><small>${t.name}</small></span><em>${f} CP</em></button>`; }).join(""), ut("commands").querySelectorAll("[data-command]").forEach(t => t.onclick = () => Rt(() => { q.command(t.dataset.command) || Xt("이 병사에게 사용할 수 없는 명령입니다."); })); const p = ut("action"); p.textContent = q.phase === "preparation" ? `START WAVE ${q.wave + 1}  →` : q.phase === "fight" ? q.fightQueue.length ? `교전 해결 (${q.fightQueue.length})` : "다음 라운드 →" : "단계 진행 중", p.disabled = At || !["preparation", "fight"].includes(q.phase); const S = ut("wait"); S.classList.toggle("hidden", !["move", "shoot"].includes(q.phase)), S.textContent = q.phase === "move" ? "선택 병사 이동 종료" : "선택 병사 사격 대기", S.disabled = At || !q.canAct(K) || q.mode === "ai" && q.side === "evil", ut("step-auto").classList.toggle("hidden", !(["move", "shoot", "fight"].includes(q.phase) && q.side === "good" && !AUTO && (q.phase !== "fight" || q.fightQueue.length))), !AUTO_STEP && (ut("step-auto").textContent = q.phase === "fight" ? "전부 해결" : "전체 진행"), ut("deploy-all") && ut("deploy-all").classList.toggle("hidden", !(q.phase === "preparation" && q.side === "good" && !AUTO && q.alive("good").some(t => t.x < 0))), ut("hint").textContent = Je(), ut("log").innerHTML = q.log.slice(0, 5).map(t => `<p>${t}</p>`).join(""), !At && Tt.rings && Tt.sync(), xe(), Qt || Qe(); }
function Qe() { const Z = ut("overlay"); if (!["menu", "reward", "result"].includes(q.phase)) {
    Z.classList.add("hidden");
    return;
} if (Z.classList.remove("hidden"), q.phase === "menu" && (Z.innerHTML = `<div class="modal"><div class="eyebrow">A MINIATURE SIEGE ROGUELITE</div><div class="intro-layout"><div><h1>MINAS<br>TIRITH</h1><div class="subtitle">GATE DEFENCE</div><p>세 영웅과 수비대. 세 번의 공세. 하나의 성문.<br>전열을 세우고, 주사위에 운명을 걸고,<br>살아남은 병사들과 마지막 공세를 버티세요.</p></div><div class="hero-tokens"><img src="${Ut("tokens/aragorn.png")}" alt="아라곤"><img src="${Ut("tokens/witchking_fellbeast.png")}" alt="펠비스트를 탄 위치킹"></div></div><div class="hero-strip"><span>아라곤 · 보로미르 · 기마 글로르핀델</span><span>고스모그 · 펠비스트 위치킹</span></div><div class="menu-buttons"><button id="start-ai" class="primary">VS AI · 성문 Defense →</button><button id="start-hotseat" class="secondary">2P · 함께 플레이</button><button id="test-final" class="secondary">위치킹 최종전 테스트</button></div><div class="menu-notes"><span>3 WAVES / 10–20 MIN 목표</span><span>OFFLINE</span><span>마우스 · 터치</span></div><p class="mini">v0.3 이동·기병 개편 · 능력치와 간소화 규칙은 플레이테스트용입니다.</p></div>`, ut("start-ai").onclick = () => Rt(() => q.start("ai")), ut("start-hotseat").onclick = () => Rt(() => q.start("hotseat")), ut("test-final").onclick = () => Rt(() => { q.start("ai"), q.wave = 2, q.emit("Preparation", "최종전 테스트 · 배치 후 START WAVE 3"); })), q.phase === "reward") {
    const Y = kt.find(b => b.id === q.eventId);
    Z.innerHTML = `<div class="modal"><div class="eyebrow">WAVE ${q.wave} / DEFENDED</div><h2>다음 공세를 준비하세요.</h2><p>생존자 ${q.alive("good").length}명은 다음 전투에도 함께합니다. 보상 하나를 선택하세요.</p>${Y && q.wave === 2 ? `<div class="event-note">${Y.name} — ${Y.text}</div>` : ""}<div class="reward-cards">${q.rewardChoices.map(b => { const H = jt.find(K => K.id === b); return `<button class="reward" data-reward="${b}"><span class="symbol">${H.icon}</span><b>${H.ko}</b><small>${H.name}</small><p>${H.text}</p></button>`; }).join("")}</div><div class="mini">베테랑 보상을 받을 생존자 선택</div><div class="survivors">${q.alive("good").map(b => `<button class="survivor ${q.selected === b.uid ? "active" : ""}" data-survivor="${b.uid}">${b.uid.toUpperCase()} · 처치 ${b.kills}</button>`).join("")}</div></div>`, Z.querySelectorAll("[data-survivor]").forEach(b => b.onclick = () => { q.selected = b.dataset.survivor, Yt(); }), Z.querySelectorAll("[data-reward]").forEach(b => b.onclick = () => Rt(() => { q.reward(b.dataset.reward), wt.play("reward_select"); }));
} if (q.phase === "result") {
    const Y = q.result === "victory";
    Z.innerHTML = `<div class="modal"><div class="eyebrow">THE SIEGE / ${Y ? "SURVIVED" : "FALLEN"}</div><h1>${Y ? "THE GATE<br>STILL STANDS." : "THE GATE<br>HAS FALLEN."}</h1><img class="evt-art" src="events/evt_${Y?'light':'dark'}.jpg" alt="" onerror="this.remove()"><p>${q.log[0]}<br>${q.armyName ? esc(q.armyName) + ' · ' : ''}공세 ${q.wave}/3 · 생존 ${q.alive("good").length}명 · 총 처치 ${q.units.filter(b => b.side === "good").reduce((b, H) => b + H.kills, 0)}</p><div class="survivors">${q.alive("good").map(b => `<span class="survivor">${b.uid.toUpperCase()} · ${b.kills} 처치 · XP ${b.veteranXP}</span>`).join("")}</div>${q.fallen && q.fallen.length ? `<div class="survivors fallen"><b class="mini">명예록</b>${q.fallen.map(f => `<span class="survivor dead">${f.name || f.uid.toUpperCase()} · ${f.kills} 처치 · STAGE ${f.wave} 전사</span>`).join("")}</div>` : ""}<div class="rank-row"><input id="rank-nick" maxlength="16" placeholder="닉네임 (최대 16자)"><button id="rank-submit" class="secondary">랭킹 등록</button></div><div id="rank-status" class="mini"></div><div class="stat-block"><b class="mini">전투 기록</b>${q.units.filter(u => u.side === 'good' && !u.temporary).sort((a, b) => (b.kills - a.kills) || ((b.dmgDealt || 0) - (a.dmgDealt || 0))).map((u, _ri) => `<span class="stat-row ${u.alive ? '' : 'dead'}">${unitImage(u.id)}<b>${esc(u.name)}${u.kills > 0 && _ri === 0 ? ' <span class="gold">★MVP</span>' : ''}</b><small>처치 ${u.kills} · 피해 ${u.dmgDealt || 0} · ${u.alive ? '생존' : '전사'}${u.injury ? ' · 부상' : ''}${u._bossSlain ? ' · ☠보스 사냥꾼' : ''}</small></span>`).join('')}</div><div id="rank-board-result"></div><div class="menu-buttons"><button id="restart" class="primary">새로운 방어전</button><button id="to-menu" class="secondary">메인 메뉴</button></div></div>`, ut("restart").onclick = () => Rt(() => { q.dailySeed = 0; q.start(q.mode) }), ut("to-menu").onclick = () => { q.phase = "menu", Yt(); };
} }
const LWB_API = "https://lwb-server.justzeon.workers.dev";
const lwbEsc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c]));
const lwbLocal = {
    load() { try { return JSON.parse(localStorage.getItem("lwb-scores") || "[]"); } catch (e) { return []; } },
    save(l) { try { localStorage.setItem("lwb-scores", JSON.stringify(l.slice(0, 100))); } catch (e) { } },
    add(s2) { const l = this.load(); l.push(s2); l.sort((a, b) => b.stage - a.stage || b.kills - a.kills || b.gold - a.gold || a.t - b.t); this.save(l); return l.indexOf(s2) + 1; }
};
function lwbRender(el, list, note) {
    el.innerHTML = (list && list.length
        ? '<table class="rank-table"><tbody>' + list.slice(0, 20).map((s2, i) => `<tr><td class="r">${s2.rank || i + 1}</td><td class="n">${lwbEsc(s2.nickname)}</td><td>${s2.stage} 스테이지</td><td>${s2.kills} 처치</td></tr>`).join("") + "</tbody></table>"
        : '<p class="mini">아직 등록된 기록이 없습니다.</p>') + (note ? '<p class="mini">' + note + "</p>" : "");
}
async function lwbBoardInto(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (!LWB_API) { lwbRender(el, lwbLocal.load(), "이 기기의 기록입니다."); return; }
    try {
        const r = await fetch(LWB_API + "/scores?limit=20");
        const d = r.ok ? await r.json() : null;
        if (d && d.scores) lwbRender(el, d.scores);
        else lwbRender(el, lwbLocal.load(), "서버 연결 실패 · 이 기기의 기록을 표시합니다.");
    } catch (e) { lwbRender(el, lwbLocal.load(), "서버 연결 실패 · 이 기기의 기록을 표시합니다."); }
}
async function lwbSubmit() {
    const nickEl = document.getElementById("rank-nick"), st = document.getElementById("rank-status");
    const nick = ((nickEl && nickEl.value) || "").trim().slice(0, 16) || "무명 전사";
    try { localStorage.setItem("lwb-nick", nick); } catch (e) { }
    const kills = q.totalKills || q.units.filter(u => u.side === "good").reduce((a, u) => a + (u.kills || 0), 0);
    const stage = q.cleared || q.wave || 0;
    const entry = { nickname: nick, stage, kills, gold: q.gold | 0, t: Date.now() };
    const localRank = lwbLocal.add(entry);
    if (st) st.textContent = "등록 중…";
    if (!LWB_API) { if (st) st.innerHTML = `기록 저장 · 이 기기 순위 <b class="gold">#${localRank}</b>`; lwbBoardInto("rank-board-result"); return; }
    try {
        const r = await fetch(LWB_API + "/scores", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ nickname: nick, stage, kills, gold: q.gold | 0 }) });
        const d = await r.json();
        if (st) st.innerHTML = d && d.rank ? `등록 완료 · 현재 순위 <b class="gold">#${d.rank}</b>` : "등록 실패";
        lwbBoardInto("rank-board-result");
    } catch (e) { if (st) st.innerHTML = `서버 연결 실패 · 이 기기 순위 <b class="gold">#${localRank}</b>`; lwbBoardInto("rank-board-result"); }
}
function lwbOpenRank() {
    let m = document.getElementById("rank-modal");
    if (!m) {
        document.body.insertAdjacentHTML("beforeend", '<div id="rank-modal" class="rank-modal"><div class="modal"><div class="eyebrow">HALL OF FAME</div><h1>명예의 전당</h1><div id="rank-board"></div><div style="font-size:10px;color:#a89878;letter-spacing:.4px">업적 ' + LWB_ACH.filter(x=>q.achievements()[x[0]]).length + '/' + LWB_ACH.length + ' 해금</div><div class="ach-row">' + LWB_ACH.map(function (x) { return '<span class="ach-badge ' + (q.achievements()[x[0]] ? 'on' : '') + '" title="' + x[2] + '">' + x[1] + '</span>'; }).join('') + '</div><div class="menu-buttons"><button id="rank-close" class="secondary">닫기</button></div></div></div>');
        document.getElementById("rank-close").onclick = () => document.getElementById("rank-modal").classList.add("hidden");
        m = document.getElementById("rank-modal");
    }
    if (!m) return;
    m.classList.remove("hidden");
    const _ar = m.querySelector(".ach-row");
    if (_ar) _ar.innerHTML = LWB_ACH.map(function (x) { return '<span class="ach-badge ' + (q.achievements()[x[0]] ? 'on' : '') + '" title="' + x[2] + '">' + x[1] + '</span>'; }).join('');
    lwbBoardInto("rank-board");
}
function lwbWireRank() {
    const rb = document.getElementById("rank-btn");
    if (rb && !rb.dataset.w) { rb.dataset.w = "1"; rb.onclick = () => lwbOpenRank(); }
    const sb = document.getElementById("rank-submit");
    if (sb && !sb.dataset.w) { sb.dataset.w = "1"; sb.onclick = () => lwbSubmit(); }
    const rn = document.getElementById("rank-nick");
    if (rn && !rn.value) { try { rn.value = localStorage.getItem("lwb-nick") || ""; } catch (e) { } }
    if (document.getElementById("rank-board-result") && !document.getElementById("rank-board-result").dataset.loaded) { document.getElementById("rank-board-result").dataset.loaded = "1"; lwbBoardInto("rank-board-result"); }
}

async function $e(Z) { let Y = [], b = [], H = ""; if (Z.type === "PriorityRolled")
    Y = [Z.good], b = [Z.evil], H = `라운드 우선권 · ${Z.ties ? "동점 재굴림 · " : ""}${q.priority === "good" ? "곤도르" : "모르도르"}`;
else if (Z.result)
    Y = Z.result.diceResults.good, b = Z.result.diceResults.evil, H = Z.result.kind === "fight" ? "결투 주사위 · 최고값 비교" : "사격 · 명중 / 상처";
else
    return; const K = ut("dice"); K.classList.remove("hidden"), K.classList.add("rolling"); const $ = (S, t) => { const f = S === "good" ? "minastirith" : "mordor", c = Fe.dice.find(o => o.faction === f); return `<div class="dice-row"><span>${S === "good" ? "곤도르" : "모르도르"}</span>${t.map(o => `<img src="${Ut(c.faces[o])}" alt="${o}">`).join("")}<small>${t.length ? Math.max(...t) : "—"}</small></div>`; }; for (let S = 0; S < 5; S++)
    K.innerHTML = `<div class="dice-title">주사위 굴리는 중…</div>${$("good", Y.map(() => 1 + Math.floor(Math.random() * 6)))}${$("evil", b.map(() => 1 + Math.floor(Math.random() * 6)))}`, wt.play("dice_roll"), await ne(65 / qt); K.classList.remove("rolling"); let p = ""; if (Z.result) {
    const S = Z.result;
    if (S.kind === "shot") {
        const t = S.strikeResults[0];
        p = `명중 ${t.hit}/${t.hitNeeded}+ · ${(t.interceptions || []).map(f => `사선 ${f.roll}/4+ ${f.passed ? "통과" : "아군 오사"}`).join(" · ")} · 상처 ${t.roll}/${t.needed}+${t.friendlyFire ? " · 아군 피격" : ""}`;
    }
    else
        p = `${S.winnerSide === "good" ? "곤도르" : "모르도르"} 결투 승리 · ${S.knockedDownUnits.length ? `기병 충격 ${S.knockedDownUnits.length}명 · ` : ""}${S.trappedUnits.length ? `포위 ${S.trappedUnits.length}명 · 추가 타격` : "밀림 판정"} · 부상 ${S.wounds.length}`;
} K.innerHTML = `<div class="dice-title">${H}</div>${$("good", Y)}${$("evil", b)}<div class="dice-detail">${p}</div>`, await ne(500 / qt); }
const ne = Z => new Promise(Y => {
    const go = () => setTimeout(Y, Z);
    if (!document.hidden) { go(); return; }
    const onVis = () => { if (!document.hidden) { document.removeEventListener('visibilitychange', onVis); go(); } };
    document.addEventListener('visibilitychange', onVis);
});
async function Rt(Z) { if (At)
    return; wt.unlock(), clearTimeout(Jt), At = !0, Tt.busy = !0, Z(); const Y = q.drain(); ut("hint").textContent = "행동을 처리하고 있습니다…", ut("action").disabled = !0, ut("wait").disabled = !0; try {
    for (const b of Y)
        await Promise.all([$e(b), Tt.play(b)]), ["WaveStarted", "Event", "CommandUsed", "RoundStarted"].includes(b.type) && b.message && Xt(b.message), b.type === "WaveStarted" && ((b == null ? void 0 : b.boss) ? bossIntro(b.boss) : stageIntro());
}
finally {
    ut("dice").classList.add("hidden"), At = !1, Tt.busy = !1, Tt.preview = void 0, Tt.previewPlan = null, Yt(), me();
} }
function me() { clearTimeout(Jt), !At && !Qt && q.mode === "ai" && q.side === "evil" && ["move", "shoot"].includes(q.phase) && (Jt = setTimeout(() => Rt(() => He(q)), 650 / qt)); }
function Zt(Z) { if (q.phase === "move" && q.activeMoverUid && Z !== q.activeMoverUid) {
    Xt("이동 중인 병사의 남은 이동력을 사용하거나 이동 종료를 누르세요.");
    return;
} Tt.preview = void 0, Tt.previewPlan = null, q.selected = Z, wt.play("ui_select"), Yt(); if (Tt.scale.width < 850) { const u = q.unit(Z), c = Tt.cameras.main; u && u.alive && c && !c.worldView.contains(u.x, u.y) && c.pan(u.x, u.y, 320, "Sine.easeOut"); } }
function unitCardModal(u) {
    try {
    const meta = q.meta.get(u.id) || {}; let m = document.getElementById('unit-profile');
    if (!m) { m = document.createElement('div'); m.id = 'unit-profile'; m.style.cssText = 'position:fixed;inset:0;background:rgba(8,12,10,.85);z-index:60;display:flex;align-items:center;justify-content:center;padding:16px'; m.onclick = e => { if (e.target === m) m.remove(); }; document.body.appendChild(m); }
    m.innerHTML = `<div class="modal" style="max-width:360px;padding:18px;width:100%"><div class="unit-head">${unitImage(u.id)}<div><strong>${esc(u.name)}</strong><small>${u.side === 'good' ? '아군' : '적군'} · ${CX.roleNames[meta.role] || meta.role || ''}</small>${isHeroUnit(u.id) ? `<small class="unit-tier tier-${heroGrade(u.id)}">${tierLabel(u.id)} · ${(UnitCatalog[u.id] || {}).points ?? 0}pt</small>` : ''}</div></div><div class="stats"><span>이동<b>${(u.stats.move / 45).toFixed(1)}″</b></span><span>결투<b>${u.stats.fight}</b></span><span>힘<b>${u.stats.strength}</b></span><span>방어<b>${u.stats.defence}</b></span><span>공격<b>${u.stats.attacks}</b></span><span>용기<b>${u.stats.courage}</b></span>${u.stats.shootRange ? `<span>명중<b>${u.stats.shootValue}+ · ${(u.stats.shootRange / 45).toFixed(1)}″</b></span>` : ''}<span>HP<b>${u.currentWounds}/${u.stats.wounds}</b></span></div>${(u.traits || []).includes('hero') ? `<div class="resources"><span>Might <b>${u.resources.might}</b></span><span>Will <b>${u.resources.will}</b></span><span>Fate <b>${u.resources.fate}</b></span></div>` : ''}${(u.equipment || []).length ? `<div class="equip-row">${u.equipment.map(eid => { const a = (typeof LWB_EQUIP !== 'undefined' ? LWB_EQUIP : []).find(x => x.id === eid); return a ? `<span class="equip-chip" title="${esc(a.desc)}">${a.iconImg ? `<img src="${a.iconImg}" alt="">` : ''}${esc(a.label)}</span>` : ''; }).join('')}</div>` : ''}<div class="traits">${[(u.traits || []).includes('veteran') ? '베테랑' : '', u.injury ? '부상 ' + u.injury : '', '처치 ' + (u.kills || 0)].filter(Boolean).join(' · ')}</div>${CX.skills && CX.skills[u.id] ? `<div class="traits" style="margin-top:4px"><b style="color:#c9b06a">⚔ ${esc(CX.skills[u.id][0])}</b> · ${CX.skills[u.id][2]} ${CX.skills[u.id][1]} — ${esc(CX.skills[u.id][3] || '')}</div>` : ''}<button class="primary" style="margin-top:10px;width:100%" id="unit-profile-close">닫기</button></div>`;
    m.querySelector('#unit-profile-close').onclick = () => { m.remove(); if (Tt._threatGfx) { const _l = Tt._threatGfx.getData && Tt._threatGfx.getData('lbl'); if (_l) _l.destroy(); Tt._threatGfx.destroy(); Tt._threatGfx = null; } };
    if (u.side !== 'good' && Tt && Tt.add) {
        if (Tt._threatGfx) Tt._threatGfx.destroy();
        const g = Tt.add.graphics().setDepth(9).setBlendMode(Phaser.BlendModes.ADD);
        const mv = u.stats.move || 0, threat = Math.max(mv, u.stats.shootRange || 0) + mv + u.radius;
        g.lineStyle(5, 0xff5a3c, .5).strokeCircle(u.x, u.y, threat);
        g.lineStyle(4, 0xffb46a, .3).strokeCircle(u.x, u.y, mv + u.radius);
        const lbl = Tt.add.text(u.x, u.y - threat - 22, `위협 ${(threat / 45).toFixed(0)}″`, { fontFamily: 'Pretendard, sans-serif', fontSize: '15px', fontStyle: '800', color: '#ff8a6a', stroke: '#1a0b06', strokeThickness: 4 }).setOrigin(.5).setDepth(10);
        g.setData('lbl', lbl);
        Tt._threatGfx = g;
        const _rm = m.remove.bind(m);
        m.onclick = e => { if (e.target === m) { _rm(); lbl.destroy(); g.destroy(); Tt._threatGfx = null; } };
    }
    } catch (e) { console.error('unitCardModal', e); }
}
Tt.onUnit = Z => { if (At)
    return; const Y = q.unit(Z); if (q.mode === "ai" && q.side === "evil" && ["move", "shoot"].includes(q.phase)) {
    if (Y.side === "good") { Zt(Z); unitCardModal(Y); }
    return;
} if (q.phase === "preparation") {
    Y.side === "good" && Zt(Z);
    return;
} q.phase === "move" && q.activeMoverUid && (q.selected = q.activeMoverUid); const b = q.unit(q.selected); if (b && b.side === q.side && Y.side !== b.side && q.canAct(b)) {
    q.phase === "move" ? Rt(() => { q.charge(b.uid, Z) || Xt("돌격할 수 없습니다. 남은 이동력과 우회 경로를 확인하세요."); }) : q.phase === "shoot" && Rt(() => { q.shoot(b.uid, Z) || Xt(_t(b, Y, q.terrain) === "blocked" ? "지형이 시야를 막고 있습니다." : "사거리 밖이거나 아군이 사선을 막고 있습니다. 곤도르는 교전 중인 대상도 사격할 수 없습니다."); });
    return;
} Zt(Z); if (Y.side !== q.side) unitCardModal(Y); };
function ge(Z, Y = q.selected) { At || !Y || (q.phase === "preparation" ? Rt(() => { if (q.deploy(Y, Z)) { const _n = q.alive('good').find(u => u.x < 0); if (_n) q.selected = _n.uid; } else Xt("푸른 배치 구역 안의 빈 공간에 배치하세요."); }) : q.phase === "move" && !(q.mode === "ai" && q.side === "evil") && Rt(() => { q.move(Y, Z) || Xt("이동할 경로가 없습니다. 민트색 범위에서 착지점을 바꾸거나 병력을 먼저 비켜주세요."); })); }
Tt.onPoint = Z => ge(Z);
Tt.onDrop = (Z, Y) => { const b = q.unit(Z); if (b && b.side === (q.phase === "preparation" ? "good" : q.side)) {
    if (q.phase === "move" && q.activeMoverUid && Z !== q.activeMoverUid) {
        Zt(Z);
        return;
    }
    q.selected = Z;
    const H = Tt.hit(Y);
    H && H.side !== b.side ? Tt.onUnit(H.uid) : ge(Y, Z);
} };
ut("action").onclick = () => Rt(() => { q.phase === "preparation" ? q.startWave() : q.fightNext(); });
ut("wait").onclick = () => Rt(() => { q.wait(q.activeMoverUid || q.selected); });
ut("sound").onclick = () => { ut("audio-panel").classList.toggle("hidden"), wt.unlock(); };
ut("mute").onclick = () => { wt.toggle(), ut("mute").textContent = wt.muted ? "음소거 해제" : "전체 음소거"; };
for (const Z of ["bgm-volume", "sfx-volume"])
    ut(Z).oninput = () => wt.setVolumes(Number(ut("sfx-volume").value), Number(ut("bgm-volume").value));
ut("sfx-volume").value = wt.sfxVolume;
ut("bgm-volume").value = wt.musicVolume;
ut("mute").textContent = wt.muted ? "음소거 해제" : "전체 음소거";
// 음향 패널 바깥을 탭하면 자동으로 닫기
document.addEventListener("pointerdown", Z => { const b = ut("audio-panel"); !b || b.classList.contains("hidden") || Z.target.closest(".audio-panel,#sound") || b.classList.add("hidden"); }, true);
ut("zoomin").onclick = () => Tt.zoom(.2);
ut("zoomout").onclick = () => Tt.zoom(-.2);
{ const _st = document.createElement('style'); _st.textContent = `#battle-log{position:fixed;left:10px;bottom:10px;width:min(430px,86vw);max-height:62dvh;overflow-y:auto;background:#1d251cf2;border:1px solid #6f7a58;padding:10px 12px;z-index:55;font-size:11px;line-height:1.65;color:#c4cfb4;border-radius:3px}#battle-log .log-title{font-size:9px;letter-spacing:2px;color:#b6bd90;margin-bottom:7px}#battle-log .log-line{padding:2px 0;border-bottom:1px solid #ffffff10}#battle-log .log-line:first-of-type{color:#e4e9c8}#battle-log .log-round{color:#e0cf8f;border-top:1px solid #ffffff22;margin-top:4px;font-weight:600}#battle-log .log-line{padding:2px 6px}#battle-log .log-kill{color:#e8927f}#battle-log .log-spell{color:#b9a4e8}#battle-log .log-gold{color:#e0cf8f}#battle-log .log-bad{color:#8f97a8}#battle-log-toggle{position:fixed;left:10px;bottom:10px;z-index:56}.log-filters{display:flex;gap:4px;margin:0 0 6px}.log-f{background:#26301f;border:1px solid #4a5537;color:#b9c9a6;font-size:9px;padding:2px 9px;border-radius:9px;cursor:pointer}.log-f.on{background:#c9a84c;color:#241d0a;border-color:#e8c76a;font-weight:700}.honor-roll{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 4px}.honor-entry{width:53px;display:block;opacity:.55;filter:grayscale(.7)}.honor-entry img{width:100%;height:53px;object-fit:contain;image-rendering:pixelated}.honor-entry small{display:block;font-size:9px;text-align:center;color:#b9c9a6;line-height:1.4}.honor-roll .section-label{width:100%;margin:0 0 2px}.survivors.fallen{margin-top:10px;opacity:.7}.survivor.dead{text-decoration:line-through}.diff-row{display:flex;align-items:center;gap:6px;margin:12px 0 4px}.diff-btn{background:#30382a;border:1px solid #657156;color:#d4d9bd;font-size:11px;padding:6px 14px;border-radius:2px}.diff-btn.active{background:#c1bd96;color:#222b1d;border-color:#d9d2af;font-weight:650}.rtabs{display:flex;flex-wrap:wrap;gap:5px;margin:10px 0 4px}.rtab{background:#293026;border:1px solid #59604d;color:#ded9c3;font-size:10px;padding:4px 10px;border-radius:2px}.rtab.active{background:#c1bd96;color:#222b1d;border-color:#d9d2af;font-weight:650}.recruit-card.hidden{display:none}#patch-pop{position:fixed;inset:0;background:#10170fde;display:flex;align-items:center;justify-content:center;z-index:60;padding:18px}.patch-inner{background:#242c20;border:1px solid #89906b;max-width:560px;width:100%;max-height:84dvh;overflow-y:auto;padding:26px 30px;color:#b6c1a9;font-size:12px;line-height:1.7}.patch-inner h2{color:#e4dcc0;margin:10px 0 16px}.patch-inner b{color:#d6cb92;display:block;margin:14px 0 4px}.patch-inner ul{margin:0;padding-left:18px}.patch-inner .primary{margin-top:20px}.ally-row{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:10px 0}.ally-row .mini{width:100%;margin-bottom:2px}.shop-cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px;margin:10px 0}.shop-card{position:relative;display:flex;flex-direction:column;align-items:center;background:linear-gradient(180deg,#2a331f,#1d2415);border:1px solid #3f4a2c;border-radius:12px;padding:0 10px 10px;color:#e4e5d9;text-align:center;cursor:pointer;overflow:hidden}.shop-card:disabled{opacity:.45;cursor:default}.shop-card:not(:disabled):hover{border-color:#c1bd96}.shop-icon{width:calc(100% + 20px);height:96px;display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 60%,#3d4a26 0%,#1d2415 78%);color:#d9c98a;margin-bottom:6px}.shop-icon svg{width:44px;height:44px}.shop-icon img{width:72px;height:72px;object-fit:contain;image-rendering:pixelated;filter:drop-shadow(0 5px 5px #000a)}.shop-card b{font-size:13px;color:#efe4b0;line-height:1.35}.shop-card small{font-size:10px;line-height:1.4;color:#9aa77f;min-height:26px;margin:3px 0 7px}.shop-card em{font-style:normal;font-size:12px;font-weight:800;color:#fff;margin-top:auto;width:100%;padding:7px 0;border-radius:8px;border:1px solid #6d8f4a;background:linear-gradient(#5d8a3c,#45702e)}.shop-card em.owned{background:#31422a;border-color:#5a7a48;color:#a8d88a}.shop-fit{position:absolute;top:6px;right:6px;background:linear-gradient(#e8c76a,#c9a13b);color:#241d0a;font-size:9px;font-weight:800;padding:2px 7px;border-radius:8px;font-style:normal;z-index:2}.shop-head{display:flex;align-items:center;gap:10px;padding:10px 12px;margin:-14px -14px 10px;background:#161a11;border-bottom:1px solid #33391f}.shop-x{width:32px;height:32px;border-radius:8px;background:#242a17;border:1px solid #46522a;color:#cfc89f;font-size:14px;cursor:pointer}.shop-name{font-size:15px;font-weight:800;color:#efe4b0}.shop-gold{margin-left:auto;background:#232a16;border:1px solid #8a7440;border-radius:16px;padding:5px 12px;font-size:13px;font-weight:800;color:#ffd970}.modal.camp:has(.shop-head){background:#0f120b;border-color:#33391f}.shop-tabs .rtab{border-radius:14px;padding:6px 14px;font-weight:700}.shop-tabs .rtab.active{background:linear-gradient(#e8c76a,#c9a13b);color:#241d0a;border-color:#e8c76a}.sell-rows{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 8px}.sell-rows:empty{display:none}.sell-row{display:flex;align-items:center;gap:6px;background:#33241c;border:1px solid #6b4a3a;color:#e8d8c0;font-size:10px;padding:4px 10px;border-radius:10px;cursor:pointer}.sell-row em{font-style:normal;color:#d8a060;font-weight:700}.shop-target{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0 4px}.unit-chip{display:flex;align-items:center;gap:6px;background:#242b24;border:1px solid #59604d;padding:4px 8px 4px 4px;color:#ded9c3;font-size:11px;cursor:pointer}.unit-chip img{width:30px;height:30px;object-fit:contain;image-rendering:pixelated}.unit-chip.active{background:#3d452c;border-color:#c1bd96}.unit-chip small{color:#8f9a7f;font-size:9px}.stat-block{display:flex;flex-wrap:wrap;gap:5px;margin:12px 0}.stat-block .mini{width:100%}.stat-row{display:flex;gap:8px;background:#2c3328;padding:4px 10px;font-size:10px}.stat-row img{width:24px;height:24px;object-fit:contain;image-rendering:pixelated;align-self:center}.stat-row.dead{opacity:.55}.stat-row b{color:#e4dec0}.stat-row small{color:#a6b599}.army-name-row{margin:8px 0 12px}.ach-row{display:flex;flex-wrap:wrap;gap:5px;margin:12px 0 4px}.ach-badge{background:#262b22;border:1px solid #4a5040;color:#8a9078;font-size:9px;padding:5px 9px;border-radius:2px;opacity:.55}.ach-badge.on{background:#3d452c;border-color:#a8945c;color:#e4dcb8;opacity:1}#army-name{background:#1e251c;border:1px solid #59604d;color:#e4e5d9;padding:7px 11px;font-size:12px;width:min(320px,100%);font-family:inherit}.hero-fallen{position:fixed;top:16%;left:50%;transform:translate(-50%,-10px);opacity:0;transition:opacity .35s,transform .35s;background:linear-gradient(180deg,#3a1520f2,#160b0ef5);border:1px solid #a04a3a;border-radius:10px;padding:9px 30px;text-align:center;z-index:58;pointer-events:none;box-shadow:0 8px 40px #000c}.hero-fallen.on{opacity:1;transform:translate(-50%,0)}.hero-fallen.good{border-color:#a08a4a;background:linear-gradient(180deg,#2a2413f2,#141008f5)}.hero-fallen b{display:block;font-size:10px;letter-spacing:3px;color:#e8cf9a;margin-bottom:2px}.hero-fallen span{font-size:16px;font-weight:800;color:#fff}.relic-chip{background:none;border:1px solid #4a5030;border-radius:8px;padding:2px;cursor:pointer;display:inline-flex}.relic-chip:active,.relic-chip:hover{border-color:#c1bd96}.equip-row{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.equip-chip{display:flex;align-items:center;gap:5px;background:#242b1d;border:1px solid #4a5537;border-radius:10px;padding:3px 8px 3px 3px;font-size:10px;color:#d8cfae}.equip-chip img{width:22px;height:22px;object-fit:contain;image-rendering:pixelated}.event-result{background:#2c3425;border-left:3px solid #c1bd96;padding:9px 13px;font-size:13px;color:#e4ddba;margin:0 0 12px}.event-outcome{display:flex;flex-direction:column;gap:10px}.gain-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}.gain-card{position:relative;flex:0 1 240px;min-width:190px;background:#1e3239;border:1px solid #4d676e;padding:20px 16px 16px;display:flex;flex-direction:column;align-items:center;text-align:center;gap:4px}.gain-card .gain-label{position:absolute;top:-1px;left:-1px;background:#c1bd96;color:#222b1d;font-size:9px;font-weight:700;letter-spacing:2px;padding:3px 8px}.gain-card img{margin:8px 0 4px}.gain-card b{font-size:16px;color:#e4ddba}.gain-card small{font-size:10px}.gain-card p{font-size:12px;line-height:1.6;color:#b9c9a6;margin:4px 0 0}.event-outcome>.primary{align-self:stretch;padding:12px;font-size:14px}.modal.camp .camp-confirm{bottom:0!important;margin-left:-14px;margin-right:-14px;padding-left:14px;padding-right:14px}#u-panel.empty{min-height:26px!important;padding:3px 10px!important}#u-panel.empty #dock-portrait{display:none!important}#gatebar i.danger{animation:gatePulse .9s ease-in-out infinite}@keyframes gatePulse{0%,100%{opacity:1}50%{opacity:.35}}.evt-art{width:100%;height:150px;object-fit:cover;border-radius:10px;border:1px solid #4a5030;box-shadow:0 4px 18px #0009;margin:2px 0 12px;display:block}#wx-fx{position:absolute;inset:0;pointer-events:none;z-index:3;transition:background .9s}#wx-fx.wx-rain{background:rgba(60,90,140,.18)}#wx-fx.wx-dark{background:rgba(8,10,25,.4)}#wx-fx.wx-eclipse{background:rgba(45,18,8,.42)}#wx-fx.wx-fog{background:rgba(185,195,195,.2)}#wx-fx.wx-snow{background:rgba(215,228,240,.16)}#wx-fx.wx-gale{background:rgba(150,130,80,.14)}#wx-fx.wx-frost{background:rgba(140,180,220,.16)}#wx-fx.wx-mud{background:rgba(80,60,30,.13)}`; document.head.appendChild(_st); const _lg = document.createElement('div'); _lg.id = 'battle-log'; _lg.className = 'hidden'; document.body.appendChild(_lg); const _lb = document.createElement('button'); _lb.id = 'battle-log-toggle'; _lb.className = 'iconbtn'; _lb.textContent = '기록'; _lb.title = '전투 기록 열기/닫기'; _lb.onclick = () => { _lg.classList.toggle('hidden'); if (_lg.classList.contains('hidden')) return; const _renderLog = f => { _lg.innerHTML = '<div class="log-title">BATTLE CHRONICLE · ' + q.log.length + ' entries</div><div class="log-filters">' + [['', '전체'], ['log-kill', '처치'], ['log-spell', '주문'], ['log-gold', '보상'], ['log-bad', '불길']].map(([k, l]) => '<button class="log-f' + (f === k ? ' on' : '') + '" data-lf="' + k + '">' + l + '</button>').join('') + '</div>' + q.log.map(t => { let cls = /^──/.test(t) ? 'log-round' : ''; if (!cls && /처치|격파|전사|쓰러졌|피 묻/.test(t)) cls = 'log-kill'; else if (!cls && /주문|✦|마법/.test(t)) cls = 'log-spell'; else if (!cls && /유물|금화|보상|전리품|획득/.test(t)) cls = 'log-gold'; else if (!cls && /공포|부상|넘어졌|밀려|실패/.test(t)) cls = 'log-bad'; return { cls, t }; }).map(({ cls, t }) => (!f || (f === 'log-round' && cls === 'log-round') || cls === f || (cls === 'log-round' && !f)) ? '<div class="log-line ' + cls + '">' + t + '</div>' : '').join(''); _lg.querySelectorAll('[data-lf]').forEach(b => b.onclick = () => _renderLog(b.dataset.lf)); _lg.scrollTop = _lg.scrollHeight; }; _renderLog(''); }; document.body.appendChild(_lb); }
ut("help").onclick = () => { At || (clearTimeout(Jt), Qt = !0, ut("overlay").classList.remove("hidden"), ut("overlay").innerHTML = `<div class="modal"><div class="eyebrow">FIELD MANUAL</div><h2>성문 Defense 지침</h2><div class="help-list"><p><b>01 · 배치</b><br>병사를 드래그하거나 선택 후 빈 곳을 탭하세요. 푸른 구역에서 배치할 수 있습니다.</p><p><b>02 · 번갈아 행동</b><br>우선권 진영부터 한 모델씩 이동합니다. 밝은 민트색=이동 가능, 주황/빨강=베이스/장애물. 목적지까지 우회 경로를 확인하세요. 이동력을 나눠 쓰고, 돌격하거나 이동 종료를 누르면 차례가 끝납니다. 움직이지 않으려면 ‘대기’.</p><p><b>03 · 돌격과 다중전</b><br>적을 탭하면 베이스 접촉 지점까지 돌격합니다. 연결된 병사들의 Attack 수만큼 주사위를 합칩니다.</p><p><b>04 · 결투와 밀림</b><br>최고 주사위 → 결투 수치 → 우선권으로 승자를 정합니다. 패자는 뒤쪽 부채꼴의 안전한 방향으로 밀립니다. 어느 방향으로도 충분히 물러나지 못하면 포위 추가 타격.</p><p><b>05 · 사격</b><br>주황 테두리 대상을 탭. 명중 후 상처 주사위. 이동·방어물은 각각 명중에 −1. 곤도르는 아군이 가로막거나 교전 중인 대상 사격 금지. 모르도르는 명중 후 사선의 아군마다 4+면 통과, 1–3이면 그 아군에게 상처 판정.</p><p><b>06 · 명령과 목표</b><br>라운드마다 CP +2, 최대 4. 성문 안 적 ${q.breachCount}명으로 라운드가 끝나면 패배. 증원·보상을 활용하세요.</p></div><p>빈 땅을 드래그해 카메라 이동. 미니맵 클릭으로 위치 이동. 전체/선택 버튼과 +/− 또는 휠로 확대. 기마 글로르핀델은 돌격 접촉 후 결투 주사위 +1, 승리 시 보병 넘어짐·추가 타격. 2P에서는 HUD에 표시된 진영이 같은 기기를 번갈아 조작합니다.</p><button id="close-help" class="primary">전장으로 돌아가기</button></div>`, ut("close-help").onclick = () => { Qt = !1, Yt(), me(); }); };
document.fonts.load("16px Pretendard"); /* MESBG Endless campaign extension. Original battle engine remains underneath.
 * Asset source: leesh603/mesbg-assets @ 2c33279. Game rules are adapted house rules.
 */
const CX = {
    version: 1, inches: 45,
    maps: ['minas_tirith', 'osgiliath', 'amon_sul', 'helms_deep', 'fangorn', 'edoras', 'moria', 'isengard', 'black_gate', 'gorgoroth', 'rivendell', 'lothlorien', 'pelennor', 'dead_marshes', 'dunharrow', 'erebor', 'mirkwood', 'dol_guldur', 'gondolin', 'angband'],
    mapNames: ['미나스 티리스', '오스길리아스', '아몬 술', '헬름 협곡', '팡고른', '에도라스', '모리아', '아이센가드', '검은 문', '고르고로스', '리븐델', '로스로리엔', '펠렌노르', '죽은 늪', '던하로우', '에레보르', '미르크우드', '돌 굴두르', '곤돌린', '앙그반드'],
    missionNames: { annihilation: '적 전멸', defense: '방어선 수호', hold: '거점 확보', survive: '포위망 생존', breakthrough: '전선 돌파', commander: '지휘관 처치', rescue: '포로 구출', escort: '보급 호송' },
    roleNames: { infantry: '보병', hero: '영웅', cavalry: '기병', monster: '괴수', support: '지원', beast: '야수' },
    rarityNames: ['일반', '마법', '희귀', '고유'],
    relics: [
        ['lembas', '렘바스', 0, '전투 후 생존자의 Wounds를 1 회복. 중첩마다 회복량 +1.'],
        ['cloak', '이실리엔 수호망토', 1, '레인저가 8인치 밖에서 받는 사격의 명중 난도 +1. 중첩마다 보호 거리 감소.'],
        ['horn', '곤도르의 뿔', 2, '영웅이 2명 이상과 접촉하면 결투 수치 +1. 중첩마다 +1.'],
        ['horseshoe', '로한의 말굽', 0, '기병 이동력 +1인치. 중첩마다 +1인치.'],
        ['phial', '갈라드리엘의 빛', 2, '영웅의 6인치 내 아군은 Terror 면역. 중첩마다 범위 +1인치.'],
        ['mithril', '미스릴 셔츠', 3, 'Run 중 처음 치명상을 입은 아군 영웅이 1 Wound로 살아남음.'],
        ['cart', '라다가스트의 동물마차', 2, '3스테이지마다 큰 독수리 1기 지원. 전투 종료 후 떠남. 중첩마다 Attack +1.'],
        ['palantir', '팔란티르 파편', 1, '다음 적 편성을 전부 공개. 스테이지 보상 금화 +10, 중첩마다 +10.'],
        ['banner', '백색나무 군기', 1, '곤도르 보병이 아군 보병과 2인치 내 진형을 이루면 Defense +1. 중첩마다 +1.'],
        ['arrow', '검은 화살', 2, '궁수의 스테이지 첫 사격은 괴수에게 상처 주사위 +2. 중첩마다 +1.'],
        ['silmaril', '실마릴', 3, '모든 아군 Courage +2. 스테이지 시작 시 모든 영웅의 Might·Will·Fate +1 회복. 제1시대의 영웅들이 영입 목록에 등장합니다.'],
        ['narya', '나랴', 3, '라운드마다 가장 상처가 깊은 아군의 Wound 1 회복.'],
        ['nenya', '네냐', 3, '라운드마다 각 아군의 첫 상처를 5+로 막음.'],
        ['vilya', '빌랴', 3, '라운드마다 아군 마법사의 Will 1 회복.'],
        ['narsil', '나르실의 파편', 1, '영웅의 스테이지 첫 근접 타격은 상처 주사위 +1. 중첩마다 +1.'],
        ['quiver', '레인저의 화살통', 0, '궁수 사거리 +1인치. 중첩마다 +1인치. 반 이동 이내 사격은 이동 페널티 없음.'],
        ['darkpact', '위력의 반지', 3, '인간에게 주어진 아홉 반지의 파편. 악의 진영 영웅도 그 권능에 복종해 영입 목록에 등장합니다.'],
        ['warbanner', '로한의 전쟁깃발', 2, '영웅의 8인치 내 아군 결투 +1.'],
        ['durin_axe', '두린의 도끼', 2, '모든 아군 힘 +1. 중첩마다 +1.'],
        ['eagle_feather', '대독수리의 깃털', 1, '모든 아군 이동력 +1인치. 중첩마다 +1인치.'],
        ['second_breakfast', '두 번째 아침상', 0, '스테이지 시작 시 아군 전원 Wound 1 회복. 중첩마다 +1.'],
        ['crown_west', '웨스터네스의 왕관', 1, '모든 아군 용기 +1. 중첩마다 +1.'],
        ['eohere_horn', '에오르의 경적', 2, '기병 결투 +1. 중첩마다 +1.'],
        ['elven_feather', '갈라드림의 깃털', 2, '궁수 사격 명중 필요값 −1 (최소 2+). 중첩마다 −1.'],
        ['numenor_map', '누메노르의 지도', 1, '스테이지 보상 금화 +10. 중첩마다 +10.']
    ].map(([id, name, rarity, text], icon) => ({ id, name, rarity, text, icon })),
    skills: {
        aragorn: ['왕의 귀환', 'might', 1, '이번 라운드 Attack +1, 상처 필요값 최대 4+, 주변 아군 용기 +2.'],
        boromir: ['곤도르의 뿔', 'might', 1, '6인치 내 아군 결투 +1, 인접 적은 Courage 검사 실패 시 Attack −1.'],
        legolas: ['죽음의 명중', 'might', 1, '이번 라운드 3회 정밀 사격 (명중 2+).'],
        gimli: ['마자브룰의 도끼', 'might', 1, '이번 라운드 Attack +2.'],
        gandalf: ['눈부신 빛', 'will', 2, '주변 아군 Defense +2·공포 면역, 가장 가까운 적을 밀어냅니다.'],
        theoden: ['에오헬레!', 'might', 1, '이번 라운드 기병 아군 이동 +90, 결투 +1.'],
        elrond: ['엘론드의 치유', 'will', 2, '주변 아군 2명 상처 1 회복, 결투 +1.'],
        glorfindel_mounted: ['엘다의 빛', 'will', 2, '이번 라운드 힘 +1, 주변 아군 공포 면역.'],
        glorfindel_foot: ['엘다의 빛', 'will', 2, '이번 라운드 힘 +1, 주변 아군 공포 면역.'],
        witchking_fellbeast: ['검은 낙인', 'will', 2, '8인치 적 결투 −1·이동 −90, 가장 가까운 적 상처 1.'],
        saruman: ['명령하는 목소리', 'will', 1, '가장 강한 적 Attack −1, 이동 절반.'],
        sauron: ['어둠의 군주', 'will', 2, '6인치 내 적에게 힘 6 타격, Courage 실패 시 추가 밀림.'],
        gothmog: ['모굴의 집행자', 'might', 1, '주변 아군 결투 +1.']
    },
    recruits: ['warrior_minas_tirith', 'gondor_archer', 'mt_spear', 'ithilien_ranger', 'rohan_rider', 'citadel_guard', 'elf_swordsman', 'dwarf_guardian', 'boromir', 'legolas', 'gimli', 'gandalf', 'theoden', 'elrond', 'glorfindel_mounted']
};
const newProfiles = {
    mt_spear: { fight: 3, defence: 5, traits: ['spear', 'gondor'] },
    ithilien_ranger: { fight: 4, defence: 4, shootValue: 3, shootRange: 810, traits: ['ranger'] },
    rohan_rider: { move: 450, fight: 3, defence: 5, traits: ['mounted'] },
    citadel_guard: { fight: 4, defence: 6, courage: 5, traits: ['spear', 'gondor'] },
    elf_swordsman: { fight: 5, defence: 5, courage: 5, traits: ['elf'] },
    dwarf_guardian: { move: 225, fight: 4, strength: 4, defence: 7, courage: 4, traits: ['dwarf'] },
    legolas: { fight: 6, defence: 4, attacks: 2, wounds: 3, courage: 6, shootValue: 3, shootRange: 900, traits: ['hero', 'ranger'] },
    gimli: { move: 225, fight: 6, strength: 4, defence: 8, attacks: 3, wounds: 3, courage: 6, traits: ['hero', 'dwarf'] },
    gandalf: { fight: 5, strength: 4, defence: 5, attacks: 2, wounds: 3, courage: 7, traits: ['hero', 'wizard'] },
    theoden: { move: 450, fight: 5, strength: 4, defence: 6, attacks: 2, wounds: 3, courage: 6, traits: ['hero', 'mounted'] },
    elrond: { fight: 6, strength: 4, defence: 7, attacks: 3, wounds: 3, courage: 6, traits: ['hero', 'wizard'] },
    moria_goblin: { move: 235, fight: 2, defence: 4, courage: 2 },
    uruk_berserker: { move: 270, fight: 4, strength: 4, defence: 5, attacks: 2, courage: 4 },
    warg_rider: { move: 435, fight: 3, strength: 4, defence: 4, traits: ['mounted'] },
    cave_troll: { move: 270, fight: 6, strength: 6, defence: 6, attacks: 3, wounds: 4, courage: 4, traits: ['monster', 'terror'] },
    balrog: { move: 300, fight: 8, strength: 8, defence: 8, attacks: 4, wounds: 9, courage: 8, traits: ['monster', 'terror', 'boss'] },
    sauron: { move: 230, fight: 9, strength: 8, defence: 9, attacks: 4, wounds: 10, courage: 9, traits: ['hero', 'monster', 'terror', 'boss'] },
    saruman: { move: 260, fight: 5, strength: 4, defence: 5, attacks: 2, wounds: 4, courage: 7, traits: ['hero', 'wizard', 'boss'] },
    great_eagle: { move: 510, fight: 6, strength: 5, defence: 5, attacks: 2, wounds: 3, courage: 5, traits: ['flying'] },
    morgoth: { move: 225, fight: 10, strength: 9, defence: 9, attacks: 5, wounds: 18, courage: 10, traits: ['hero', 'monster', 'terror', 'boss'] }
};
for (const [id, p] of Object.entries(newProfiles))
    zt[id] = { ...structuredClone(Ft), ...p, traits: p.traits || [] };
zt.warrior_minas_tirith.traits = ['gondor'];
zt.aragorn.courage = 6;
zt.boromir.courage = 6;
zt.glorfindel_foot.courage = 6;
zt.glorfindel_mounted.courage = 6;
for (const id of Object.keys(CX.skills))
    if (zt[id]) {
        zt[id].might = id === 'boromir' ? 6 : 3;
        zt[id].will = zt[id].traits.includes('wizard') ? 6 : 3;
        zt[id].fate = 2;
    }
zt.witchking_fellbeast.traits.push('terror', 'wizard', 'boss');
// MESBG army-book traits: Mountain Dweller (climbs rocky ground) and flying.
for (const [id, p] of Object.entries(zt)) {
    if (/goblin|snaga|warg|spider|stone_giant|mountain_troll|hill_troll|cave_troll|cave_drake|moria|gollum|smeagol/i.test(id) && !p.traits.includes('mountain'))
        p.traits.push('mountain');
    if (/eagle|gwaihir|landroval|meneldor|fellbeast|fell_beast|smaug|ancalagon|dragon|drake|bat_swarm/i.test(id) && !p.traits.includes('flying'))
        p.traits.push('flying');
}
q.meta = new Map((window.CAMPAIGN_META || []).filter(u => zt[u.id] || u.side === 'terrain').map(u => [u.id, u]));
q.meta.set('morgoth', { id: 'morgoth', name_ko: '모르고스', name_en: 'Morgoth', side: 'evil', faction: 'mordor', role: 'monster', weapon: 'mace', base: 'XXL', file: 'tokens/morgoth.png' });
// Check the exact metadata and asset availability before preload.
for (const [id, u] of q.meta)
    if (!__assetOk(u.file))
        q.meta.delete(id);
// Faction circular bases drawn under every token (asset pack bases/ directory).
const BASE_FACTION = { gondor: 'gondor', mordor: 'mordor', moria: 'moria', angmar: 'angmar', isengard: 'isengard', rohan: 'rohan', dwarf: 'dwarf', rivendell: 'rivendell', harad: 'harad', dol_guldur: 'dol_guldur', dead: 'dead', lothlorien: 'lorien', elf: 'lorien', lorien: 'lorien', erebor: 'dwarf', arnor: 'gondor', shire: 'gondor', men: 'gondor', doriath: 'lorien', valinor: 'rivendell', eagle: 'gondor', ent: 'lorien', beorning: 'rohan', gundabad: 'moria', angband: 'mordor', easterling: 'harad', rhun: 'harad', dunland: 'isengard', maiar: 'rivendell' };
const baseFile = u => { const f = BASE_FACTION[u.faction] || (u.side === 'evil' ? 'mordor' : 'gondor'); const s = ['S', 'M', 'L', 'XL', 'XXL'].includes(u.base) ? u.base : 'M'; return `bases/base_${f}_${s}.png`; };
// High-quality painted maps for the stages that have them; other stages keep the asset-pack backdrops.
const MAP_HQ = {};
const MAP_TINT = {};
// Play order of maps: open fields first, chokepoint maps (여울·다리·협곡 길목) pushed late.
// mapIndex stays the stage slot (enemy theme/difficulty); only the visuals/terrain/name follow this order.
const MAP_PLAY_ORDER=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
const visualMapIdx=i=>MAP_PLAY_ORDER[(i||0)%MAP_PLAY_ORDER.length];
// Per-map impassable zones (rects are x,y center-top-left style {x,y,w,h,z}; merged into terrain each stage).
// z:'cliff' blocks every non-flyer; z:'mountain' also opens for units with the 'mountain' trait.
const MAP_ZONES = {
    // 미나스 티리스: 성체 없이 성문+성벽 한 줄만 상단 가장자리. 그 아래 평원 전부 개방.
    minas_tirith: [{ x: 554, y: 0, w: 576, h: 122, z: 'cliff' }, { x: 1200, y: 0, w: 574, h: 122, z: 'cliff' }, { x: 230, y: 620, w: 240, h: 150, z: 'hill' }, { x: 1860, y: 700, w: 240, h: 150, z: 'hill' }],
    // 헬름스딥: 배후 산맥·협곡 양벽·디핑 성벽(성문 개방) + 하단 개울(길목 여울 개방).
    helms_deep: [{ x: 0, y: 0, w: 2330, h: 172, z: 'mountain' }, { x: 0, y: 172, w: 230, h: 1130, z: 'mountain' }, { x: 2100, y: 172, w: 230, h: 1130, z: 'mountain' }, { x: 260, y: 272, w: 843, h: 231, z: 'cliff' }, { x: 1210, y: 272, w: 875, h: 231, z: 'cliff' }, { x: 0, y: 1350, w: 1100, h: 106, z: 'cliff' }, { x: 1210, y: 1350, w: 1120, h: 106, z: 'cliff' }],
    // 모리아: 카자드둠 협곡, 다리(중앙)만 통과.
    moria: [{ x: 0, y: 530, w: 1090, h: 335, z: 'cliff' }, { x: 1195, y: 530, w: 1135, h: 335, z: 'cliff' }],
    // 검은 문: 모란논 산맥 + 성벽(문 통로 개방) + 전장 양끝 산등.
    black_gate: [{ x: 0, y: 0, w: 827, h: 290, z: 'mountain' }, { x: 1500, y: 0, w: 830, h: 290, z: 'mountain' }, { x: 827, y: 72, w: 291, h: 218, z: 'cliff' }, { x: 1210, y: 72, w: 290, h: 218, z: 'cliff' }, { x: 0, y: 1060, w: 310, h: 396, z: 'mountain' }, { x: 2020, y: 1205, w: 310, h: 251, z: 'mountain' }],
    // 에도라스: 사면 산봉우리 + 하단 개울(중앙 다리) + 목책 링(남북문 개방) + 메두셀드 홀.
    edoras: [{ x: 0, y: 0, w: 185, h: 143, z: 'mountain' }, { x: 2145, y: 0, w: 185, h: 143, z: 'mountain' }, { x: 0, y: 1293, w: 185, h: 163, z: 'mountain' }, { x: 2145, y: 1264, w: 185, h: 192, z: 'mountain' }, { x: 0, y: 1150, w: 1090, h: 172, z: 'cliff' }, { x: 1210, y: 1150, w: 1120, h: 172, z: 'cliff' }, { x: 340, y: 125, w: 740, h: 62, z: 'cliff' }, { x: 1250, y: 125, w: 740, h: 62, z: 'cliff' }, { x: 340, y: 172, w: 104, h: 862, z: 'cliff' }, { x: 1886, y: 172, w: 107, h: 948, z: 'cliff' }, { x: 340, y: 1000, w: 730, h: 120, z: 'cliff' }, { x: 1200, y: 1000, w: 670, h: 120, z: 'cliff' }, { x: 950, y: 230, w: 430, h: 230, z: 'cliff' }],
    // 판고른: 강 4구간(두 여울 개방) + 중앙 바위 언덕(산악 특성 통과).
    fangorn: [{ x: 735, y: 0, w: 245, h: 373, z: 'cliff' }, { x: 766, y: 575, w: 340, h: 290, z: 'cliff' }, { x: 920, y: 865, w: 90, h: 250, z: 'cliff' }, { x: 1225, y: 865, w: 195, h: 250, z: 'cliff' }, { x: 1420, y: 1115, w: 910, h: 341, z: 'cliff' }, { x: 1230, y: 400, w: 610, h: 400, z: 'mountain' }],
    // 고르고로스: 화산·흑탑·바위 콘 + 용암 줄기들.
    gorgoroth: [{ x: 1770, y: 0, w: 560, h: 280, z: 'mountain' }, { x: 0, y: 0, w: 200, h: 370, z: 'cliff' }, { x: 185, y: 0, w: 275, h: 115, z: 'mountain' }, { x: 185, y: 100, w: 800, h: 120, z: 'cliff' }, { x: 0, y: 560, w: 245, h: 115, z: 'cliff' }, { x: 1255, y: 660, w: 460, h: 115, z: 'cliff' }, { x: 1655, y: 575, w: 450, h: 230, z: 'cliff' }, { x: 2105, y: 775, w: 225, h: 115, z: 'cliff' }, { x: 0, y: 1260, w: 735, h: 196, z: 'cliff' }, { x: 1840, y: 975, w: 300, h: 230, z: 'cliff' }, { x: 2020, y: 1205, w: 310, h: 251, z: 'cliff' }, { x: 820, y: 510, w: 230, h: 160, z: 'mountain' }, { x: 1318, y: 272, w: 92, h: 130, z: 'mountain' }],
    // 이센가드: 원형 성벽(남북문 개방) + 오르상크 언덕(산악) + 4개 공사 구덩이.
    isengard: [{ x: 820, y: 55, w: 250, h: 170, z: 'cliff' }, { x: 1260, y: 55, w: 240, h: 170, z: 'cliff' }, { x: 275, y: 172, w: 310, h: 375, z: 'cliff' }, { x: 1747, y: 172, w: 310, h: 375, z: 'cliff' }, { x: 275, y: 718, w: 400, h: 402, z: 'cliff' }, { x: 1714, y: 718, w: 300, h: 402, z: 'cliff' }, { x: 300, y: 1120, w: 770, h: 200, z: 'cliff' }, { x: 1260, y: 1120, w: 770, h: 200, z: 'cliff' }, { x: 980, y: 330, w: 370, h: 480, z: 'mountain' }, { x: 705, y: 258, w: 305, h: 172, z: 'cliff' }, { x: 1318, y: 172, w: 396, h: 258, z: 'cliff' }, { x: 521, y: 733, w: 399, h: 243, z: 'cliff' }, { x: 1318, y: 890, w: 396, h: 202, z: 'cliff' }],
    // 아몬 술: 웅덩이 4곳 + 산비탈 바위 3곳(산악 통과). 나선 길·정상 전부 개방.
    amon_sul: [{ x: 170, y: 160, w: 415, h: 260, z: 'cliff' }, { x: 2005, y: 820, w: 275, h: 160, z: 'cliff' }, { x: 170, y: 1220, w: 335, h: 175, z: 'cliff' }, { x: 1500, y: 1100, w: 400, h: 250, z: 'mountain' }, { x: 460, y: 400, w: 290, h: 350, z: 'mountain' }, { x: 1590, y: 400, w: 280, h: 230, z: 'mountain' }, { x: 980, y: 630, w: 300, h: 170, z: 'hill' }],
    // 오스길리아스: 안두인 강 대각선(무너진 다리 구간 개방).
    osgiliath: [{ x: 1470, y: 0, w: 860, h: 460, z: 'cliff' }, { x: 490, y: 460, w: 430, h: 575, z: 'cliff' }, { x: 1350, y: 460, w: 180, h: 340, z: 'cliff' }, { x: 400, y: 1035, w: 490, h: 200, z: 'cliff' }, { x: 0, y: 1180, w: 400, h: 276, z: 'cliff' }],
    // 리븐델: 상단 폭포수 + 다리 아래 협곡·하단 수로 + 양측 폭포. 다리·돌다리 여울 개방.
    rivendell: [{ x: 980, y: 0, w: 340, h: 230, z: 'cliff' }, { x: 920, y: 575, w: 505, h: 515, z: 'cliff' }, { x: 1010, y: 1205, w: 490, h: 251, z: 'cliff' }, { x: 60, y: 660, w: 215, h: 430, z: 'cliff' }, { x: 1655, y: 545, w: 150, h: 565, z: 'cliff' }],
    // 로스로리엔: 우측·하단 강(가장자리) + 좌하단 연못.
    lothlorien: [{ x: 1970, y: 0, w: 360, h: 600, z: 'cliff' }, { x: 1900, y: 600, w: 430, h: 400, z: 'cliff' }, { x: 1320, y: 1050, w: 1010, h: 406, z: 'cliff' }, { x: 0, y: 1092, w: 368, h: 364, z: 'cliff' }],
    // 에레보르: 외로운 산 정상부·성문 양옥 + 중앙 강(다리 개방) + 하단 호수.
    erebor: [{ x: 0, y: 0, w: 2330, h: 230, z: 'mountain' }, { x: 800, y: 230, w: 330, h: 200, z: 'cliff' }, { x: 1270, y: 230, w: 263, h: 200, z: 'cliff' }, { x: 0, y: 488, w: 245, h: 230, z: 'mountain' }, { x: 1073, y: 530, w: 214, h: 375, z: 'cliff' }, { x: 1040, y: 970, w: 300, h: 180, z: 'cliff' }, { x: 550, y: 1150, w: 1780, h: 306, z: 'cliff' }],
    // 펠레노르: 외성 성벽 전면(대성문 개방) + 좌하단 연못·우하단 개울.
    pelennor: [{ x: 0, y: 0, w: 1100, h: 215, z: 'cliff' }, { x: 1200, y: 0, w: 1130, h: 215, z: 'cliff' }, { x: 138, y: 1278, w: 153, h: 130, z: 'cliff' }, { x: 2025, y: 1205, w: 305, h: 251, z: 'cliff' }, { x: 430, y: 640, w: 260, h: 160, z: 'hill' }, { x: 1690, y: 760, w: 260, h: 160, z: 'hill' }],
    // 죽은 늪: 물웅덩이 7곳만 봉쇄(안개낀 마른 땅은 전부 개방).
    dead_marshes: [{ x: 340, y: 160, w: 458, h: 242, z: 'cliff' }, { x: 920, y: 57, w: 490, h: 143, z: 'cliff' }, { x: 1747, y: 230, w: 552, h: 258, z: 'cliff' }, { x: 122, y: 575, w: 460, h: 373, z: 'cliff' }, { x: 1380, y: 661, w: 583, h: 373, z: 'cliff' }, { x: 92, y: 1063, w: 674, h: 287, z: 'cliff' }, { x: 1318, y: 1120, w: 583, h: 259, z: 'cliff' }],
    // 던하로우: 좌상 설봉·우상 봉우리 + 우측 절벽면·하단 벼랑 밑 숲.
    dunharrow: [{ x: 0, y: 0, w: 889, h: 430, z: 'mountain' }, { x: 2114, y: 0, w: 216, h: 115, z: 'mountain' }, { x: 1080, y: 455, w: 1250, h: 1001, z: 'cliff' }, { x: 0, y: 1150, w: 368, h: 306, z: 'cliff' }],
    // 곤돌린: 하얀 성벽(성문 개방) + 양측 안개 산벽 + 하단 우측 개울·좌측 폭포 웅덩이.
    gondolin: [{ x: 0, y: 0, w: 965, h: 285, z: 'cliff' }, { x: 1365, y: 0, w: 965, h: 285, z: 'cliff' }, { x: 0, y: 285, w: 290, h: 560, z: 'mountain' }, { x: 2040, y: 285, w: 290, h: 560, z: 'mountain' }, { x: 1850, y: 1180, w: 480, h: 276, z: 'cliff' }, { x: 0, y: 1180, w: 260, h: 276, z: 'cliff' }],
    // 앙그반드: 탕고로드림 산맥 + 철성벽 전면 + 하단 양끝 용암 봉우리. 재의 평원은 개방.
    angband: [{ x: 0, y: 0, w: 2330, h: 270, z: 'mountain' }, { x: 0, y: 270, w: 2330, h: 160, z: 'cliff' }, { x: 0, y: 1250, w: 420, h: 206, z: 'mountain' }, { x: 1910, y: 1250, w: 420, h: 206, z: 'mountain' }, { x: 700, y: 850, w: 300, h: 120, z: 'cliff' }, { x: 1400, y: 700, w: 280, h: 120, z: 'cliff' }],
    // 미르크우드: 사면 어둠숲 벨트 + 우하단 시냇물 + 좌하단 밀림. 중앙 숲길·공터 개방.
    mirkwood: [{ x: 0, y: 0, w: 2330, h: 170, z: 'cliff' }, { x: 0, y: 170, w: 400, h: 1286, z: 'cliff' }, { x: 1930, y: 170, w: 400, h: 1286, z: 'cliff' }, { x: 0, y: 1280, w: 700, h: 176, z: 'cliff' }, { x: 1780, y: 1120, w: 550, h: 336, z: 'cliff' }, { x: 700, y: 1280, w: 400, h: 176, z: 'cliff' }],
    // 돌 굴두르: 북서 폐허 요새 + 흩어진 잔해·구덩이. 넓은 들판 개방.
    dol_guldur: [{ x: 0, y: 0, w: 1450, h: 420, z: 'cliff' }, { x: 1700, y: 250, w: 330, h: 180, z: 'cliff' }, { x: 300, y: 650, w: 280, h: 160, z: 'cliff' }, { x: 1900, y: 800, w: 280, h: 180, z: 'cliff' }, { x: 900, y: 1150, w: 300, h: 160, z: 'cliff' }]
};
// True when unit Z may pass through terrain entry t (flyers ignore all terrain; mountain-dwellers ignore 'mountain' zones).
// 같은 지역도 웨이브마다 다른 하위 전장: 각 지역 3개의 손수 설계 레이아웃을 (wave-1)%5%3으로 순환.
// 항목: [x,y,w,h,z] (x,y=좌상단) — z: 'cliff'(통과불가) 'mountain'(산악특성만) 'hill'(고지, 통과가능).
const MAP_ZONE_SETS = {
minas_tirith: [ null,
    [[554,0,576,122,'cliff'],[1200,0,574,122,'cliff'],[700,240,220,80,'cliff'],[1410,240,220,80,'cliff'],[230,620,240,150,'hill'],[1860,700,240,150,'hill'],[1000,900,330,110,'hill']],
    [[400,300,260,160,'hill'],[1670,280,260,160,'hill'],[1160,760,300,120,'hill'],[0,1180,240,180,'cliff'],[2090,1150,240,180,'cliff']],
    [[300,450,700,60,'cliff'],[1330,450,700,60,'cliff'],[300,850,700,60,'cliff'],[1330,850,700,60,'cliff'],[1000,600,330,140,'hill']],
    [[0,300,340,200,'cliff'],[1990,300,340,200,'cliff'],[700,1050,930,140,'cliff'],[1000,500,330,150,'hill']] ],
helms_deep: [ null,
    [[0,0,2330,172,'mountain'],[0,172,380,1130,'mountain'],[1950,172,380,1130,'mountain'],[760,400,300,180,'cliff'],[1270,700,300,180,'cliff'],[0,1350,900,106,'cliff'],[1400,1350,930,106,'cliff']],
    [[0,640,720,120,'cliff'],[960,640,450,120,'cliff'],[1650,640,680,120,'cliff'],[200,120,400,150,'hill'],[1700,140,400,150,'hill'],[0,1180,500,140,'cliff'],[1830,1180,500,140,'cliff']],
    [[0,0,2330,172,'mountain'],[0,172,230,1130,'mountain'],[2100,172,230,1130,'mountain'],[700,640,930,120,'cliff'],[400,1100,300,140,'hill'],[1630,1100,300,140,'hill']],
    [[0,0,2330,172,'mountain'],[300,400,1730,90,'cliff'],[300,900,700,90,'cliff'],[1330,900,700,90,'cliff']] ],
moria: [ null,
    [[560,240,180,180,'cliff'],[1090,240,180,180,'cliff'],[1620,240,180,180,'cliff'],[560,760,180,180,'cliff'],[1090,760,180,180,'cliff'],[1620,760,180,180,'cliff'],[1090,1220,180,180,'cliff']],
    [[0,420,700,200,'cliff'],[900,620,700,200,'cliff'],[1800,420,530,200,'cliff'],[0,980,500,180,'cliff'],[700,1100,600,180,'cliff'],[1500,1000,830,200,'cliff']],
    [[0,700,700,220,'cliff'],[1630,700,700,220,'cliff'],[1090,300,150,856,'cliff']],
    [[400,300,300,300,'cliff'],[1630,300,300,300,'cliff'],[400,856,300,300,'cliff'],[1630,856,300,300,'cliff']] ],
black_gate: [ null,
    [[0,0,700,320,'mountain'],[1630,0,700,320,'mountain'],[0,500,260,460,'mountain'],[2070,560,260,460,'mountain'],[900,700,530,140,'cliff'],[0,1150,400,306,'mountain'],[1930,1150,400,306,'mountain']],
    [[400,300,700,120,'cliff'],[1230,300,700,120,'cliff'],[0,700,500,120,'cliff'],[700,900,500,120,'cliff'],[1330,700,500,120,'cliff'],[1830,900,500,120,'cliff']],
    [[0,0,700,320,'mountain'],[1630,0,700,320,'mountain'],[0,800,300,300,'mountain'],[2030,800,300,300,'mountain'],[700,600,930,110,'cliff']],
    [[700,300,930,110,'cliff'],[400,700,500,110,'cliff'],[1430,700,500,110,'cliff'],[0,1100,700,120,'cliff'],[1630,1100,700,120,'cliff']] ],
edoras: [ null,
    [[340,300,700,70,'cliff'],[1290,300,700,70,'cliff'],[200,700,180,400,'hill'],[1950,700,180,400,'hill'],[600,1150,500,70,'cliff'],[1230,1150,500,70,'cliff']],
    [[900,150,530,180,'cliff'],[150,450,260,150,'hill'],[1920,450,260,150,'hill'],[450,1000,300,150,'cliff'],[1580,1000,300,150,'cliff']],
    [[340,300,1650,80,'cliff'],[340,600,180,500,'hill'],[1810,600,180,500,'hill'],[600,1150,500,70,'cliff'],[1230,1150,500,70,'cliff']],
    [[950,230,430,230,'cliff'],[340,700,300,140,'hill'],[1690,700,300,140,'hill'],[0,1180,400,276,'cliff'],[1930,1180,400,276,'cliff']] ],
fangorn: [ null,
    [[300,200,300,240,'cliff'],[1030,160,300,240,'cliff'],[1760,200,300,240,'cliff'],[560,700,280,220,'cliff'],[1500,700,280,220,'cliff'],[300,1150,300,240,'cliff'],[1030,1180,300,240,'cliff'],[1760,1150,300,240,'cliff']],
    [[0,0,760,700,'cliff'],[0,800,560,656,'cliff'],[1400,300,240,150,'hill'],[1300,900,400,180,'hill'],[1900,1200,300,150,'cliff']],
    [[735,0,245,373,'cliff'],[1225,0,245,373,'cliff'],[735,865,860,250,'cliff'],[0,400,300,300,'cliff'],[2030,400,300,300,'cliff']],
    [[1230,400,610,400,'mountain'],[300,300,280,200,'cliff'],[1750,300,280,200,'cliff'],[300,1000,280,200,'cliff'],[1750,1000,280,200,'cliff']] ],
gorgoroth: [ null,
    [[0,400,600,110,'cliff'],[800,560,500,110,'cliff'],[1500,440,830,110,'cliff'],[0,900,450,110,'cliff'],[650,1020,560,110,'cliff'],[1450,900,880,110,'cliff'],[1770,0,560,280,'mountain']],
    [[400,350,230,160,'mountain'],[1300,300,230,160,'mountain'],[900,800,230,160,'mountain'],[1900,700,230,160,'mountain'],[150,1150,230,160,'mountain'],[1770,0,560,280,'mountain']],
    [[1770,0,560,280,'mountain'],[0,300,500,110,'cliff'],[1830,300,500,110,'cliff'],[650,700,1030,110,'cliff'],[0,1200,500,110,'cliff'],[1830,1200,500,110,'cliff']],
    [[400,400,300,200,'mountain'],[1630,400,300,200,'mountain'],[965,900,400,200,'mountain'],[1770,0,560,280,'mountain']] ],
isengard: [ null,
    [[275,172,310,375,'cliff'],[1747,172,310,375,'cliff'],[275,718,400,402,'cliff'],[1714,718,300,402,'cliff'],[300,1120,770,200,'cliff'],[1260,1120,770,200,'cliff'],[705,258,305,172,'cliff'],[1318,172,396,258,'cliff'],[820,55,250,170,'cliff'],[1260,55,240,170,'cliff'],[980,500,370,240,'cliff']],
    [[275,172,310,375,'cliff'],[1747,172,310,375,'cliff'],[275,718,400,402,'cliff'],[1714,718,300,402,'cliff'],[300,1120,770,200,'cliff'],[1260,1120,770,200,'cliff'],[705,258,305,172,'cliff'],[1318,172,396,258,'cliff'],[820,55,250,170,'cliff'],[1260,55,240,170,'cliff'],[521,733,399,243,'cliff'],[1318,890,396,202,'cliff']],
    [[275,172,310,375,'cliff'],[1747,172,310,375,'cliff'],[275,718,400,402,'cliff'],[1714,718,300,402,'cliff'],[300,1120,770,200,'cliff'],[1260,1120,770,200,'cliff'],[705,258,305,172,'cliff'],[1318,172,396,258,'cliff'],[820,55,250,170,'cliff'],[1260,55,240,170,'cliff'],[980,330,370,480,'mountain']],
    [[275,172,310,375,'cliff'],[1747,172,310,375,'cliff'],[275,718,400,402,'cliff'],[1714,718,300,402,'cliff'],[300,1120,770,200,'cliff'],[1260,1120,770,200,'cliff'],[705,258,305,172,'cliff'],[1318,172,396,258,'cliff'],[820,55,250,170,'cliff'],[1260,55,240,170,'cliff'],[600,600,400,200,'cliff'],[1330,600,400,200,'cliff']] ],
amon_sul: [ null,
    [[300,250,300,170,'hill'],[1600,200,300,170,'hill'],[900,550,330,170,'hill'],[400,900,300,170,'hill'],[1700,1000,300,170,'hill'],[1100,1250,300,150,'hill']],
    [[450,250,260,180,'cliff'],[1620,250,260,180,'cliff'],[1030,600,260,180,'cliff'],[450,950,260,180,'cliff'],[1620,950,260,180,'cliff'],[100,1300,300,150,'cliff']],
    [[980,200,370,200,'mountain'],[300,600,300,200,'mountain'],[1730,600,300,200,'mountain'],[980,1100,370,200,'mountain']],
    [[300,300,280,160,'hill'],[1750,300,280,160,'hill'],[1015,640,300,160,'hill'],[300,1000,280,160,'hill'],[1750,1000,280,160,'hill']] ],
osgiliath: [ null,
    [[560,300,240,170,'cliff'],[1530,300,240,170,'cliff'],[260,700,240,170,'cliff'],[1830,700,240,170,'cliff'],[1030,1100,240,170,'cliff'],[1470,0,860,460,'cliff']],
    [[0,300,530,140,'cliff'],[800,300,530,140,'cliff'],[1600,300,730,140,'cliff'],[300,800,430,140,'cliff'],[1000,800,430,140,'cliff'],[1700,800,630,140,'cliff'],[0,1250,400,206,'cliff']],
    [[1470,0,860,460,'cliff'],[300,600,400,140,'cliff'],[900,900,400,140,'cliff'],[1630,600,400,140,'cliff']],
    [[0,300,400,200,'cliff'],[965,300,400,200,'cliff'],[1930,300,400,200,'cliff'],[500,1100,1330,140,'cliff']] ],
rivendell: [ null,
    [[0,480,760,140,'cliff'],[1570,480,760,140,'cliff'],[980,900,370,140,'cliff'],[100,120,330,160,'hill'],[1900,120,330,160,'hill']],
    [[300,250,280,190,'cliff'],[1750,250,280,190,'cliff'],[1030,600,270,190,'cliff'],[300,1050,280,190,'cliff'],[1750,1050,280,190,'cliff']],
    [[980,0,340,230,'cliff'],[300,480,1730,120,'cliff'],[980,900,370,140,'cliff']],
    [[100,120,330,160,'hill'],[1900,120,330,160,'hill'],[920,575,505,515,'cliff'],[0,660,215,430,'cliff'],[2115,660,215,430,'cliff']] ],
lothlorien: [ null,
    [[300,200,340,220,'cliff'],[1690,200,340,220,'cliff'],[1000,550,330,220,'cliff'],[300,900,340,220,'cliff'],[1690,900,340,220,'cliff'],[1000,1250,330,180,'cliff']],
    [[1970,0,360,500,'cliff'],[150,300,340,180,'hill'],[900,700,340,180,'hill'],[1500,1150,400,180,'cliff'],[150,1100,400,200,'cliff']],
    [[1970,0,360,600,'cliff'],[300,400,340,180,'hill'],[995,750,340,180,'hill'],[1690,400,340,180,'hill']],
    [[300,250,340,220,'cliff'],[1690,250,340,220,'cliff'],[995,1050,340,180,'cliff'],[0,700,240,300,'cliff'],[2090,700,240,300,'cliff']] ],
erebor: [ null,
    [[0,0,2330,230,'mountain'],[0,230,500,400,'mountain'],[1830,230,500,400,'mountain'],[800,600,330,160,'hill'],[1300,600,330,160,'hill'],[550,1150,1780,306,'cliff']],
    [[0,0,2330,230,'mountain'],[700,300,300,170,'cliff'],[1330,300,300,170,'cliff'],[0,900,700,556,'cliff'],[800,1100,300,150,'cliff'],[1500,1000,830,456,'cliff']],
    [[0,0,2330,230,'mountain'],[0,700,500,300,'mountain'],[1830,700,500,300,'mountain'],[965,300,400,160,'hill'],[550,1150,1780,306,'cliff']],
    [[0,0,2330,230,'mountain'],[700,450,300,170,'cliff'],[1330,450,300,170,'cliff'],[0,1150,700,306,'cliff'],[1630,1150,700,306,'cliff']] ],
pelennor: [ null,
    [[0,0,1100,215,'cliff'],[1200,0,1130,215,'cliff'],[300,500,600,70,'cliff'],[1430,500,600,70,'cliff'],[300,900,600,70,'cliff'],[1430,900,600,70,'cliff'],[1100,1150,130,150,'cliff']],
    [[0,0,1100,215,'cliff'],[1200,0,1130,215,'cliff'],[1900,300,430,600,'cliff'],[400,700,300,150,'hill'],[1200,1100,400,180,'cliff']],
    [[0,0,1100,215,'cliff'],[1200,0,1130,215,'cliff'],[300,500,600,90,'hill'],[1430,500,600,90,'hill'],[865,1100,600,90,'cliff']],
    [[0,0,1100,215,'cliff'],[1200,0,1130,215,'cliff'],[400,650,300,160,'cliff'],[1630,650,300,160,'cliff'],[865,1050,600,150,'hill']] ],
dead_marshes: [ null,
    [[250,150,380,200,'cliff'],[1000,120,380,180,'cliff'],[1700,150,380,200,'cliff'],[120,600,380,240,'cliff'],[900,600,380,240,'cliff'],[1700,600,380,240,'cliff'],[250,1050,400,240,'cliff'],[1400,1050,500,240,'cliff']],
    [[340,200,400,220,'cliff'],[1600,300,400,220,'cliff'],[900,700,300,150,'hill'],[300,1100,400,200,'cliff'],[1600,1100,400,200,'cliff']],
    [[340,300,460,160,'cliff'],[1530,300,460,160,'cliff'],[935,750,460,160,'cliff'],[340,1100,460,160,'cliff'],[1530,1100,460,160,'cliff']],
    [[0,200,400,240,'cliff'],[1930,200,400,240,'cliff'],[965,550,400,200,'cliff'],[0,1050,400,240,'cliff'],[1930,1050,400,240,'cliff']] ],
dunharrow: [ null,
    [[0,0,889,430,'mountain'],[960,430,390,60,'cliff'],[1080,480,1250,976,'cliff'],[0,1150,368,306,'cliff']],
    [[0,0,889,430,'mountain'],[1400,200,300,170,'hill'],[700,800,300,170,'hill'],[1500,900,300,170,'hill'],[1080,480,1250,976,'cliff'],[0,1150,368,306,'cliff']],
    [[0,0,889,430,'mountain'],[1080,455,1250,1001,'cliff'],[1400,650,300,170,'hill'],[400,700,300,170,'hill']],
    [[0,0,889,430,'mountain'],[960,430,390,60,'cliff'],[1080,480,1250,976,'cliff'],[0,1150,368,306,'cliff'],[700,900,300,140,'hill']] ],
mirkwood: [ null,
    [[0,0,2330,170,'cliff'],[0,170,400,1286,'cliff'],[1930,170,400,1286,'cliff'],[700,500,300,140,'cliff'],[1330,500,300,140,'cliff'],[0,1280,700,176,'cliff'],[1780,1120,550,336,'cliff']],
    [[0,0,2330,170,'cliff'],[0,170,400,1286,'cliff'],[1930,170,400,1286,'cliff'],[965,750,400,160,'hill'],[0,1280,700,176,'cliff']],
    [[0,0,2330,170,'cliff'],[0,170,400,1286,'cliff'],[1930,170,400,1286,'cliff'],[500,400,1330,90,'cliff'],[500,1100,1330,90,'cliff'],[1780,1120,550,336,'cliff']],
    [[0,0,2330,170,'cliff'],[0,170,400,1286,'cliff'],[1930,170,400,1286,'cliff'],[700,600,260,160,'cliff'],[1370,900,260,160,'cliff'],[0,1280,700,176,'cliff'],[1780,1120,550,336,'cliff']] ],
dol_guldur: [ null,
    [[0,0,1450,420,'cliff'],[1600,300,350,180,'cliff'],[400,800,300,160,'cliff'],[900,1150,300,160,'cliff']],
    [[0,0,1450,420,'cliff'],[1700,600,300,170,'cliff'],[300,600,300,170,'cliff'],[1030,950,300,170,'cliff'],[1900,1200,300,160,'cliff']],
    [[0,0,1450,420,'cliff'],[700,500,930,90,'cliff'],[300,1000,400,150,'cliff'],[1630,1000,400,150,'cliff']],
    [[0,0,1450,420,'cliff'],[1900,300,330,200,'cliff'],[600,800,260,160,'hill'],[1470,800,260,160,'hill'],[900,1200,530,140,'cliff']] ],
gondolin: [ null,
    [[0,0,965,285,'cliff'],[1365,0,965,285,'cliff'],[0,300,290,400,'mountain'],[2040,300,290,400,'mountain'],[400,700,280,160,'hill'],[1750,700,280,160,'hill'],[1850,1180,480,276,'cliff']],
    [[0,0,965,285,'cliff'],[1365,0,965,285,'cliff'],[0,300,290,700,'mountain'],[2040,300,290,700,'mountain'],[700,1000,930,120,'cliff'],[0,1180,260,276,'cliff']],
    [[0,0,965,285,'cliff'],[1365,0,965,285,'cliff'],[450,500,300,170,'hill'],[1580,500,300,170,'hill'],[1015,850,300,160,'hill'],[1850,1180,480,276,'cliff'],[0,1180,260,276,'cliff']],
    [[0,0,965,285,'cliff'],[1365,0,965,285,'cliff'],[0,300,290,560,'mountain'],[2040,300,290,560,'mountain'],[600,600,1130,110,'cliff'],[600,1050,500,110,'cliff'],[1330,1050,500,110,'cliff']] ],
angband: [ null,
    [[0,0,2330,270,'mountain'],[0,270,2330,160,'cliff'],[400,700,280,140,'cliff'],[1650,700,280,140,'cliff'],[0,1250,420,206,'mountain'],[1910,1250,420,206,'mountain']],
    [[0,0,2330,270,'mountain'],[0,270,2330,160,'cliff'],[700,600,930,110,'cliff'],[300,1050,300,140,'cliff'],[1730,1050,300,140,'cliff']],
    [[0,0,2330,270,'mountain'],[0,270,2330,160,'cliff'],[0,700,500,130,'cliff'],[1830,700,500,130,'cliff'],[965,900,400,130,'cliff'],[0,1250,420,206,'mountain'],[1910,1250,420,206,'mountain']],
    [[0,0,2330,270,'mountain'],[0,270,2330,160,'cliff'],[500,550,260,160,'mountain'],[1570,550,260,160,'mountain'],[1035,1000,260,160,'mountain']] ]
};
// 하위 전장 표시명 — 맵 라벨에 '지역 · 전장'으로 표기.
const MAP_ZONE_NAMES = {
minas_tirith:['성벽 아래','성문 앞','펠렌노르 평원','돌격 참호','외곽 들판'], helms_deep:['성벽 앞','협곡 입구','개울 하류','디핑 성벽','협곡 중턱'],
moria:['카자드둠 다리','기둥의 전당','깊은 계단','동쪽 회랑','무너진 경사로'], black_gate:['모란논 정면','북쪽 설원','폐허 참호선','재 언덕','철조망 선'],
edoras:['목책 앞','평원 들판','메두셀드 외곽','언덕 초원','남쪽 개울'], fangorn:['강과 여울','깊은 숲','숲 가장자리','강 어귀','최고목 언덕'],
gorgoroth:['화산 아래','용암 절벽','재의 평원','용암 갈라진 땅','검은 바위산'], isengard:['오르상크 링','공사 구덩이','물길 플랜트','오르상크 그늘','물길 제방'],
amon_sul:['순찰탑','둥근 고개','무너진 돌무덤','바위 산등성이','탑 그늘'], osgiliath:['강과 다리','폐허 광장','강변 수풀','무너진 궁전','강 건너편'],
rivendell:['협곡 다리','폭포 계곡','숲속 정원','돌다리','절벽 테라스'], lothlorien:['강가','말론 숲','물가 초원','은빛 시내','높은 공터'],
erebor:['성문 앞','외로운 산 비탈','호수 건너','회색 산기슭','호수 잔교'], pelennor:['외성벽','들판 농장','강변 초지','농장 사잇길','외성 평원'],
dead_marshes:['죽음의 늪','밀집 웅덩이','마른 갈대밭','안개 늪','죽은 수로'], dunharrow:['산 입구','영혼의 길','풀밭 고원','절벽 전망','벼랑 위 풀밭'],
mirkwood:['숲길','거미줄 숲','쓰러진 거목','버섯 골짜기','시냇물가'], dol_guldur:['너른 폐허','독안개 들판','무너진 회랑','가시덤불 벌판','지하 구덩이'],
gondolin:['하얀 성벽','숨겨진 계곡','왕의 탑 앞','수정 개울가','은빛 들판'], angband:['철의 성벽 앞','탕고로드림 아래','재의 평원','용암 균열','검은 문터'] };
function mapVariant(wave) { return (wave - 1) % 5; }
// 변형 배경 색조: 기본 / 황혼(웜) / 새벽(쿨) — MAP_TINT에 곱연산으로 블렌드.
function variantTint(base, v) {
    const t = [0xffffff, 0xffddaa, 0xc4d8ff][v] || 0xffffff;
    if (t === 0xffffff) return base;
    const r = (base >> 16 & 255) * (t >> 16 & 255) / 255 | 0, g = (base >> 8 & 255) * (t >> 8 & 255) / 255 | 0, b = (base & 255) * (t & 255) / 255 | 0;
    return (r << 16) | (g << 8) | b;
}
// hard-block 유지 규칙: true를 반환하면 cliff 유지(강·성벽·협곡·용암), false면 mountain으로 바꿔 등반 가능 지형 처리.
// 등반 불가 지역 최소화 원칙 — 아트 기준 "정말 못 지나가는" 것만 차단.
const CLIFF_KEEP = {
    minas_tirith: z => z.y === 0,
    pelennor: z => z.y === 0 || z.y + z.h > 1300,
    black_gate: z => z.y < 300,
    gondolin: z => z.y === 0 || z.y + z.h > 1100,
    dol_guldur: z => z.y === 0,
    erebor: z => z.y < 450 || z.y + z.h > 1100,
    angband: z => z.y < 500,
    lothlorien: z => z.x + z.w >= 2330 || z.y + z.h >= 1456,
    mirkwood: z => z.x + z.w >= 2330 && z.y + z.h >= 1400,
    osgiliath: z => z.y === 0 || z.y + z.h >= 1150 || z.w * z.h >= 200000,
    fangorn: z => z.y === 0 && z.w < 400 || z.x < 1500 && z.w < 400 || z.y + z.h > 1100,
    gorgoroth: z => z.y < 400 || z.w >= 400 && z.h <= 140,
    amon_sul: z => z.w > 300 && z.h > 150,
    dunharrow: z => z.w > 600,
    moria: () => true, rivendell: () => true, dead_marshes: () => true,
    helms_deep: () => true, isengard: () => true, edoras: () => true,
};
function mapZones(key, wave) {
    const sets = MAP_ZONE_SETS[key];
    const v = mapVariant(wave);
    const zs = sets && sets[v] ? sets[v].map(z => ({ x: z[0], y: z[1], w: z[2], h: z[3], z: z[4] })) : (MAP_ZONES[key] || []);
    const keep = CLIFF_KEEP[key] || (() => false);
    return zs.map(z => z.z === 'cliff' && !keep(z) ? { ...z, z: 'mountain' } : z);
}
const MAP_PROPS = {
    minas_tirith: [['terr_white_tree', 110, 170, 90, 110], ['terr_gondor_house', 2210, 480, 120, 100], ['terr_brazier', 2210, 760, 60, 70], ['terr_statue_head', 120, 1240, 110, 90]],
    helms_deep: [['terr_palisade', 110, 700, 140, 60], ['terr_dead_tree', 2220, 760, 90, 110], ['terr_ballista', 2220, 1180, 110, 90]],
    moria: [['terr_broken_pillar', 150, 300, 80, 110], ['terr_bone_pile', 2180, 320, 100, 70], ['terr_rubble', 2180, 1180, 120, 80], ['terr_cage', 150, 1240, 90, 90]],
    black_gate: [['terr_grond', 160, 760, 160, 100], ['terr_catapult', 2160, 540, 130, 100], ['terr_orc_totem', 120, 1180, 70, 100], ['terr_siege_tower', 2160, 1240, 140, 130]],
    edoras: [['terr_rohan_hall', 2160, 560, 200, 150], ['terr_hay_cart', 150, 1080, 110, 80], ['terr_market_stall', 2200, 940, 110, 90], ['terr_palisade', 150, 240, 140, 60]],
    fangorn: [['terr_oak_tree', 140, 330, 110, 130], ['terr_pine_copse', 2200, 300, 130, 110], ['terr_fallen_log', 150, 1240, 120, 60], ['terr_mushroom_ring', 2200, 1200, 90, 70], ['terr_bramble', 600, 1400, 130, 60]],
    gorgoroth: [['terr_orc_totem', 150, 760, 70, 100], ['terr_bone_pile', 2200, 560, 100, 70], ['terr_mumak_skull', 120, 1240, 120, 80], ['terr_rubble', 2240, 1240, 110, 80]],
    isengard: [['terr_anvil', 160, 600, 90, 80], ['terr_orc_camp', 2170, 620, 130, 110], ['terr_bomb', 160, 1240, 80, 80], ['terr_palisade', 2160, 1240, 140, 60]],
    amon_sul: [['terr_broken_stairs', 150, 560, 110, 90], ['terr_standing_stones', 2180, 300, 130, 100], ['terr_barrow', 2200, 1240, 120, 90], ['terr_waystone', 140, 1400, 70, 90]],
    osgiliath: [['terr_osgiliath_dome', 200, 140, 220, 170], ['terr_argonath', 2150, 140, 160, 130], ['terr_statue_head', 150, 1240, 110, 90], ['terr_broken_pillar', 2180, 980, 80, 110]],
    rivendell: [['terr_relic_shrine', 150, 300, 100, 110], ['terr_oak_tree', 2200, 300, 110, 130], ['terr_pond', 160, 1240, 130, 90], ['terr_well', 2200, 1240, 90, 80]],
    lothlorien: [['terr_oak_tree', 150, 240, 110, 130], ['terr_pine_copse', 150, 600, 130, 110], ['terr_relic_shrine', 1200, 140, 100, 110], ['terr_mushroom_ring', 900, 1400, 90, 70]],
    erebor: [['terr_hoard', 160, 700, 140, 100], ['terr_gold_pile', 2180, 560, 110, 80], ['terr_anvil', 2180, 980, 90, 80], ['terr_bone_pile', 150, 1240, 100, 70]],
    pelennor: [['terr_hay_cart', 160, 480, 110, 80], ['terr_haystack', 2200, 540, 100, 90], ['terr_fence_gate', 140, 1000, 120, 50], ['terr_hedgerow', 2200, 1240, 130, 60], ['terr_grond', 1100, 1420, 160, 100]],
    dead_marshes: [['terr_bone_pile', 1180, 1400, 100, 70], ['terr_dead_tree', 2200, 760, 90, 110], ['terr_mushroom_ring', 140, 1400, 90, 70], ['terr_sarcophagus', 2240, 300, 100, 80]],
    dunharrow: [['terr_standing_stones', 160, 700, 130, 100], ['terr_dead_tree', 2100, 300, 90, 110], ['terr_palisade', 150, 1400, 140, 60], ['terr_torch_post', 2000, 1240, 60, 90]],
    mirkwood: [['terr_oak_tree', 150, 300, 110, 130], ['terr_dead_tree', 2150, 300, 90, 110], ['terr_mushroom_ring', 700, 1300, 90, 70], ['terr_fallen_log', 1600, 1300, 120, 60], ['terr_bramble', 1400, 400, 130, 60]],
    dol_guldur: [['terr_dead_tree', 2200, 500, 90, 110], ['terr_rubble', 1600, 900, 120, 80], ['terr_sarcophagus', 300, 900, 100, 80], ['terr_broken_pillar', 2000, 1200, 80, 110], ['terr_cage', 140, 1240, 90, 90]],
    gondolin: [['terr_white_tree', 140, 700, 90, 110], ['terr_relic_shrine', 2150, 600, 100, 110], ['terr_oak_tree', 600, 1300, 110, 130], ['terr_pond', 1900, 1350, 130, 90]],
    angband: [['terr_orc_totem', 150, 760, 70, 100], ['terr_bone_pile', 2150, 600, 100, 70], ['terr_mumak_skull', 130, 1100, 120, 80], ['terr_rubble', 2000, 1100, 110, 80], ['terr_war_banner', 1160, 1300, 60, 110]],
};
const MAP_PROP_SETS = {
    minas_tirith: [null,
        // 성문 앞 — 포트큘리스·석상·전투 잔해
        [['terr_portcullis', 1165, 130, 180, 90], ['terr_siege_ladder', 2190, 1180, 90, 130], ['terr_ruined_gate', 130, 480, 140, 100], ['terr_siege_wreck', 2210, 900, 140, 90], ['terr_war_banner', 150, 1180, 60, 110], ['terr_rubble', 1050, 1410, 120, 60]],
        // 펠렌노르 평원 — 농장·밀짚·울타리
        [['terr_haystack', 160, 480, 100, 90], ['terr_fence_gate', 2200, 700, 120, 50], ['terr_hay_cart', 150, 1240, 110, 80], ['terr_hedgerow', 2190, 1400, 140, 60]]],
    helms_deep: [null,
        // 협곡 입구 — 암석·바리케이드
        [['terr_rock_outcrop', 140, 300, 140, 100], ['terr_spike_barricade', 2200, 400, 120, 70], ['terr_wall_segment', 1160, 1400, 160, 90], ['terr_boulders', 150, 1240, 130, 80], ['terr_dead_tree', 2230, 1180, 90, 110]],
        // 개울 하류 — 공성 잔해·사지
        [['terr_siege_wreck', 200, 700, 140, 90], ['terr_siege_ladder', 2100, 300, 90, 130], ['terr_bone_pile', 2180, 620, 100, 70], ['terr_ruined_wall', 1160, 130, 180, 80], ['terr_torch_post', 2200, 1240, 60, 90]]],
    moria: [null,
        // 기둥의 전당 — 부러진 기둥 행렬
        [['terr_broken_pillar', 300, 260, 80, 110], ['terr_loot_bag', 1160, 700, 70, 60], ['terr_broken_pillar', 2040, 260, 80, 110], ['terr_stone_archway', 1160, 140, 160, 100], ['terr_bone_pile', 130, 1300, 100, 70], ['terr_chain_post', 2200, 1300, 70, 90]],
        // 깊은 계단 — 석관·폐허
        [['terr_broken_stairs', 150, 560, 110, 90], ['terr_cage', 2040, 1180, 90, 90], ['terr_sarcophagus', 2180, 340, 100, 80], ['terr_bramble', 2180, 1240, 120, 60], ['terr_rubble', 160, 1240, 120, 80], ['terr_waystone', 1160, 1420, 70, 90]]],
    black_gate: [null,
        // 북쪽 설원 — 바위·뼈대
        [['terr_boulders', 140, 300, 130, 80], ['terr_tent', 150, 1240, 120, 90], ['terr_mumak_skull', 2210, 420, 120, 80], ['terr_orc_barricade', 150, 1180, 130, 80], ['terr_dead_tree', 2210, 1240, 90, 110]],
        // 폐허 참호선 — 모래주머니·가시
        [['terr_sandbag', 160, 480, 130, 70], ['terr_wall_segment', 1100, 150, 160, 90], ['terr_spike_line', 2200, 760, 130, 70], ['terr_orc_totem', 140, 1240, 70, 100], ['terr_trebuchet', 2150, 1300, 130, 110]]],
    edoras: [null,
        // 평원 들판 — 건초·목책
        [['terr_haystack', 140, 300, 100, 90], ['terr_tent', 2150, 1200, 120, 90], ['terr_hay_cart', 2200, 480, 110, 80], ['terr_fence_gate', 150, 1400, 120, 50], ['terr_hedgerow', 2200, 1240, 140, 60]],
        // 메두셀드 외곽 — 전당·기마대
        [['terr_war_banner', 2200, 300, 60, 110], ['terr_weapon_rack', 150, 700, 90, 80], ['terr_cart', 160, 1240, 110, 80], ['terr_torch_post', 2150, 1180, 60, 90]]],
    fangorn: [null,
        // 깊은 숲 — 거목·가시덤불
        [['terr_oak_tree', 150, 560, 110, 130], ['terr_campfire', 1160, 730, 70, 70], ['terr_pine_copse', 2200, 620, 130, 110], ['terr_bramble', 150, 900, 130, 60], ['terr_dead_tree', 2200, 980, 90, 110], ['terr_beehive', 1160, 140, 90, 80]],
        // 숲 가장자리 — 통나무·버섯
        [['terr_fallen_log', 160, 420, 120, 60], ['terr_campfire', 140, 900, 70, 70], ['terr_mushroom_ring', 2200, 480, 90, 70], ['terr_oak_tree', 140, 1300, 110, 130], ['terr_bramble', 2180, 1380, 130, 60]]],
    gorgoroth: [null,
        // 용암 절벽 — 암석·화로
        [['terr_rock_outcrop', 140, 300, 140, 100], ['terr_brazier', 2200, 560, 60, 70], ['terr_orc_camp', 1160, 130, 130, 110], ['terr_boulders', 150, 1180, 130, 80], ['terr_orc_totem', 2210, 1240, 70, 100]],
        // 재의 평원 — 공성 잔해·우상
        [['terr_idol', 2200, 300, 80, 110], ['terr_tent', 140, 900, 120, 90], ['terr_siege_wreck', 160, 620, 140, 90], ['terr_bone_pile', 2150, 1300, 100, 70], ['terr_mumak_skull', 140, 1240, 120, 80]]],
    isengard: [null,
        // 공사 구덩이 — 가마·폭탄·목재
        [['terr_fallen_log', 150, 300, 120, 60], ['terr_map_table', 1160, 1420, 120, 80], ['terr_ammo_pile', 2200, 420, 100, 80], ['terr_crates', 160, 1240, 100, 80], ['terr_orc_barricade', 2180, 1400, 130, 80]],
        // 물길 플랜트 — 방벽·포로 우리
        [['terr_cage', 150, 620, 90, 90], ['terr_orc_camp', 140, 1180, 130, 110], ['terr_stone_barricade', 2200, 760, 130, 70], ['terr_anvil', 140, 1400, 90, 80], ['terr_torch_post', 2150, 1300, 60, 90]]],
    amon_sul: [null,
        // 둥근 고개 — 스탠딩 스톤 원
        [['terr_standing_stones', 1165, 300, 130, 100], ['terr_ruined_tower', 2150, 1240, 120, 140], ['terr_standing_stones', 150, 1240, 130, 100], ['terr_waystone', 2200, 760, 70, 90], ['terr_boulders', 140, 400, 130, 80]],
        // 무너진 돌무덤 — 고분·석관
        [['terr_barrow', 140, 700, 120, 90], ['terr_ruined_tower', 2100, 1400, 120, 140], ['terr_sarcophagus', 2200, 620, 100, 80], ['terr_broken_stairs', 160, 1400, 110, 90], ['terr_dead_tree', 2210, 1180, 90, 110]]],
    osgiliath: [null,
        // 폐허 광장 — 잔해·기둥·동상
        [['terr_broken_pillar', 300, 900, 80, 110], ['terr_throne', 1160, 150, 100, 110], ['terr_ruined_wall', 1900, 900, 180, 80], ['terr_statue_head', 1160, 1400, 110, 90], ['terr_rubble', 300, 1300, 120, 80], ['terr_stone_archway', 1160, 120, 160, 100]],
        // 강변 수풀 — 덤불·연못·난간
        [['terr_bramble', 140, 480, 130, 60], ['terr_loot_bag', 150, 1400, 70, 60], ['terr_pond', 2200, 560, 130, 90], ['terr_hedgerow', 150, 1240, 140, 60], ['terr_broken_pillar', 2190, 1300, 80, 110]]],
    rivendell: [null,
        // 폭포 계곡 — 연못·우물
        [['terr_pond', 2200, 620, 130, 90], ['terr_palantir', 150, 480, 70, 90], ['terr_well', 150, 700, 90, 80], ['terr_oak_tree', 140, 1300, 110, 130], ['terr_mushroom_ring', 2200, 1380, 90, 70]],
        // 숲속 정원 — 제단·정자
        [['terr_relic_shrine', 2200, 300, 100, 110], ['terr_altar', 140, 1180, 90, 80], ['terr_stone_archway', 150, 480, 160, 100], ['terr_oak_tree', 2200, 1240, 110, 130], ['terr_waystone', 140, 1400, 70, 90]]],
    lothlorien: [null,
        // 말론 숲 — 거목·버섯
        [['terr_oak_tree', 2200, 480, 110, 130], ['terr_altar', 140, 1300, 90, 80], ['terr_pine_copse', 150, 1180, 130, 110], ['terr_mushroom_ring', 2180, 1300, 90, 70], ['terr_beehive', 140, 700, 90, 80]],
        // 물가 초원 — 연못·덤불
        [['terr_pond', 150, 560, 130, 90], ['terr_bramble', 2200, 900, 130, 60], ['terr_oak_tree', 140, 1240, 110, 130], ['terr_waystone', 2210, 1400, 70, 90]]],
    erebor: [null,
        // 외로운 산 비탈 — 바위·보물
        [['terr_rock_outcrop', 150, 300, 140, 100], ['terr_gold_pile', 2200, 480, 110, 80], ['terr_throne', 1160, 130, 100, 110], ['terr_boulders', 2180, 1240, 130, 80], ['terr_chest_open', 150, 1400, 90, 70]],
        // 호수 건너 — 연못·작업대
        [['terr_pond', 1160, 1400, 150, 80], ['terr_chest_closed', 140, 1180, 90, 70], ['terr_anvil', 140, 620, 90, 80], ['terr_crates', 2200, 700, 100, 80], ['terr_bone_pile', 140, 1240, 100, 70]]],
    pelennor: [null,
        // 들판 농장 — 농기구·울타리
        [['terr_cart', 2200, 300, 110, 80], ['terr_map_table', 150, 1240, 120, 80], ['terr_fence_gate', 160, 700, 120, 50], ['terr_haystack', 2150, 1300, 100, 90], ['terr_market_stall', 140, 1400, 110, 90]],
        // 강변 초지 — 울타리·수풀
        [['terr_hedgerow', 140, 480, 140, 60], ['terr_campfire', 2200, 1180, 70, 70], ['terr_bramble', 2200, 620, 130, 60], ['terr_waystone', 150, 1300, 70, 90], ['terr_dead_tree', 2210, 1400, 90, 110]]],
    dead_marshes: [null,
        // 밀집 웅덩이 — 연못·석관
        [['terr_pond', 300, 480, 130, 90], ['terr_altar', 150, 1180, 90, 80], ['terr_pond', 1900, 900, 130, 90], ['terr_sarcophagus', 140, 1240, 100, 80], ['terr_bone_pile', 2200, 1300, 100, 70]],
        // 마른 갈대밭 — 덤불·고목
        [['terr_bramble', 150, 400, 130, 60], ['terr_loot_bag', 2180, 1180, 70, 60], ['terr_dead_tree', 2200, 300, 90, 110], ['terr_dead_tree', 140, 1180, 90, 110], ['terr_mushroom_ring', 2210, 1380, 90, 70]]],
    dunharrow: [null,
        // 영혼의 길 — 스탠딩 스톤 행렬
        [['terr_standing_stones', 900, 200, 130, 100], ['terr_altar', 150, 900, 90, 80], ['terr_standing_stones', 1400, 1300, 130, 100], ['terr_waystone', 150, 400, 70, 90], ['terr_torch_post', 2200, 700, 60, 90]],
        // 풀밭 고원 — 초원 소품
        [['terr_boulders', 2200, 400, 130, 80], ['terr_chest_closed', 140, 620, 90, 70], ['terr_bramble', 140, 1000, 130, 60], ['terr_standing_stones', 2210, 1240, 130, 100], ['terr_torch_post', 150, 1400, 60, 90]]],
};
// 구역 변주 확장: 기존 2종 → 4종(v3,v4 추가) + 신규 4맵 전용 소품 세트.
{
    const X = (k, ...sets) => { (MAP_PROP_SETS[k] = MAP_PROP_SETS[k] || [null]).push(...sets); };
    X('minas_tirith',
        [['terr_gondor_house', 140, 300, 120, 100], ['terr_war_banner', 2200, 400, 60, 110], ['terr_statue_head', 150, 1180, 110, 90], ['terr_brazier', 2190, 1240, 60, 70], ['terr_market_stall', 1160, 1420, 110, 90]],
        [['terr_white_tree', 150, 480, 90, 110], ['terr_weapon_rack', 2200, 300, 90, 80], ['terr_chest_closed', 160, 1240, 90, 70], ['terr_portcullis', 1160, 140, 180, 90], ['terr_rubble', 2180, 1400, 120, 60]]);
    X('helms_deep',
        [['terr_torch_post', 150, 400, 60, 90], ['terr_weapon_rack', 2190, 560, 90, 80], ['terr_spike_barricade', 160, 1180, 120, 70], ['terr_boulders', 2200, 1240, 130, 80], ['terr_sandbag', 1160, 1420, 130, 70]],
        [['terr_catapult', 150, 700, 130, 110], ['terr_ammo_pile', 2200, 300, 100, 80], ['terr_crates', 140, 1240, 100, 80], ['terr_dead_tree', 2210, 1180, 90, 110], ['terr_chain_post', 1160, 130, 70, 90]]);
    X('moria',
        [['terr_bone_pile', 160, 420, 100, 70], ['terr_sarcophagus', 2180, 560, 100, 80], ['terr_broken_pillar', 150, 1300, 80, 110], ['terr_loot_bag', 2200, 1300, 70, 60], ['terr_cage', 1160, 140, 90, 90]],
        [['terr_stone_archway', 140, 620, 160, 100], ['terr_bramble', 2190, 1240, 120, 60], ['terr_broken_stairs', 2180, 300, 110, 90], ['terr_waystone', 160, 1400, 70, 90], ['terr_chain_post', 1160, 1420, 70, 90]]);
    X('black_gate',
        [['terr_orc_totem', 140, 400, 70, 100], ['terr_mumak_skull', 150, 1240, 120, 80], ['terr_trebuchet', 2190, 400, 130, 110], ['terr_sandbag', 2150, 1240, 130, 70], ['terr_spike_line', 1160, 1420, 130, 70]],
        [['terr_dead_tree', 150, 300, 90, 110], ['terr_bone_pile', 2200, 480, 100, 70], ['terr_orc_barricade', 140, 1180, 130, 80], ['terr_tent', 2150, 1400, 120, 90], ['terr_wall_segment', 1160, 130, 160, 90]]);
    X('edoras',
        [['terr_rohan_hall', 1160, 140, 160, 110], ['terr_palisade', 150, 480, 140, 60], ['terr_haystack', 2200, 620, 100, 90], ['terr_tent', 150, 1300, 120, 90], ['terr_war_banner', 2190, 1300, 60, 110]],
        [['terr_cart', 160, 300, 110, 80], ['terr_fence_gate', 2180, 400, 120, 50], ['terr_hedgerow', 150, 1180, 140, 60], ['terr_torch_post', 2200, 1240, 60, 90], ['terr_beehive', 1160, 1420, 90, 80]]);
    X('fangorn',
        [['terr_oak_tree', 2200, 300, 110, 130], ['terr_fallen_log', 150, 700, 120, 60], ['terr_mushroom_ring', 2180, 1240, 90, 70], ['terr_beehive', 160, 1380, 90, 80], ['terr_pine_copse', 1160, 1420, 130, 110]],
        [['terr_dead_tree', 150, 480, 90, 110], ['terr_bramble', 2200, 560, 130, 60], ['terr_oak_tree', 2180, 1300, 110, 130], ['terr_campfire', 160, 1240, 70, 70], ['terr_fallen_log', 1160, 130, 120, 60]]);
    X('gorgoroth',
        [['terr_orc_camp', 140, 480, 130, 110], ['terr_brazier', 150, 1240, 60, 70], ['terr_rock_outcrop', 2200, 700, 140, 100], ['terr_bone_pile', 2180, 1380, 100, 70], ['terr_tent', 1160, 1420, 120, 90]],
        [['terr_siege_wreck', 150, 560, 140, 90], ['terr_idol', 2200, 400, 80, 110], ['terr_boulders', 160, 1300, 130, 80], ['terr_mumak_skull', 2190, 1240, 120, 80], ['terr_ammo_pile', 1160, 130, 100, 80]]);
    X('isengard',
        [['terr_anvil', 150, 400, 90, 80], ['terr_crates', 2200, 300, 100, 80], ['terr_stone_barricade', 160, 1180, 130, 70], ['terr_torch_post', 2190, 1240, 60, 90], ['terr_cage', 1160, 1420, 90, 90]],
        [['terr_ammo_pile', 140, 560, 100, 80], ['terr_orc_barricade', 2200, 700, 130, 80], ['terr_map_table', 150, 1300, 120, 80], ['terr_fallen_log', 2180, 1380, 120, 60], ['terr_spike_barricade', 1160, 1420, 120, 70]]);
    X('amon_sul',
        [['terr_barrow', 160, 480, 120, 90], ['terr_sarcophagus', 2180, 1180, 100, 80], ['terr_standing_stones', 150, 1300, 130, 100], ['terr_dead_tree', 2200, 300, 90, 110], ['terr_boulders', 1160, 1420, 130, 80]],
        [['terr_ruined_tower', 140, 700, 120, 140], ['terr_waystone', 2200, 560, 70, 90], ['terr_stone_archway', 150, 1240, 160, 100], ['terr_bramble', 2180, 1380, 120, 60], ['terr_torch_post', 1160, 130, 60, 90]]);
    X('osgiliath',
        [['terr_osgiliath_dome', 1160, 140, 160, 120], ['terr_broken_pillar', 150, 620, 80, 110], ['terr_statue_head', 2200, 480, 110, 90], ['terr_rubble', 160, 1300, 120, 80], ['terr_stone_archway', 2190, 1240, 160, 100]],
        [['terr_ruined_wall', 140, 300, 180, 80], ['terr_pond', 2200, 620, 130, 90], ['terr_loot_bag', 160, 1180, 70, 60], ['terr_bramble', 2190, 1300, 130, 60], ['terr_bone_pile', 1160, 1420, 100, 70]]);
    X('rivendell',
        [['terr_relic_shrine', 140, 300, 100, 110], ['terr_well', 2200, 480, 90, 80], ['terr_pond', 150, 1180, 130, 90], ['terr_oak_tree', 2180, 1240, 110, 130], ['terr_altar', 1160, 1420, 90, 80]],
        [['terr_palantir', 150, 560, 70, 90], ['terr_mushroom_ring', 2200, 700, 90, 70], ['terr_oak_tree', 160, 1300, 110, 130], ['terr_stone_archway', 2190, 300, 160, 100], ['terr_waystone', 1160, 130, 70, 90]]);
    X('lothlorien',
        [['terr_pine_copse', 150, 400, 130, 110], ['terr_beehive', 2200, 300, 90, 80], ['terr_pond', 160, 1240, 130, 90], ['terr_altar', 2180, 1300, 90, 80], ['terr_oak_tree', 1160, 1420, 110, 130]],
        [['terr_bramble', 140, 560, 130, 60], ['terr_mushroom_ring', 2180, 480, 90, 70], ['terr_waystone', 150, 1300, 70, 90], ['terr_oak_tree', 2200, 1240, 110, 130], ['terr_relic_shrine', 1160, 130, 100, 110]]);
    X('erebor',
        [['terr_throne', 1160, 140, 100, 110], ['terr_chest_open', 150, 480, 90, 70], ['terr_anvil', 2200, 560, 90, 80], ['terr_boulders', 160, 1300, 130, 80], ['terr_gold_pile', 2180, 1240, 110, 80]],
        [['terr_hoard', 140, 700, 130, 90], ['terr_crates', 2200, 300, 100, 80], ['terr_bone_pile', 150, 1180, 100, 70], ['terr_chest_closed', 2180, 1380, 90, 70], ['terr_rock_outcrop', 1160, 1420, 140, 100]]);
    X('pelennor',
        [['terr_hay_cart', 150, 400, 110, 80], ['terr_hedgerow', 2180, 560, 140, 60], ['terr_cart', 160, 1240, 110, 80], ['terr_market_stall', 2200, 1240, 110, 90], ['terr_waystone', 1160, 1420, 70, 90]],
        [['terr_campfire', 140, 620, 70, 70], ['terr_bramble', 2200, 700, 130, 60], ['terr_fence_gate', 160, 1300, 120, 50], ['terr_haystack', 2190, 1380, 100, 90], ['terr_dead_tree', 1160, 130, 90, 110]]);
    X('dead_marshes',
        [['terr_pond', 160, 400, 130, 90], ['terr_dead_tree', 2200, 560, 90, 110], ['terr_bone_pile', 150, 1240, 100, 70], ['terr_sarcophagus', 2180, 1240, 100, 80], ['terr_bramble', 1160, 1420, 130, 60]],
        [['terr_mushroom_ring', 140, 560, 90, 70], ['terr_pond', 2200, 300, 130, 90], ['terr_dead_tree', 160, 1180, 90, 110], ['terr_altar', 2190, 1380, 90, 80], ['terr_loot_bag', 1160, 130, 70, 60]]);
    X('dunharrow',
        [['terr_standing_stones', 150, 300, 130, 100], ['terr_boulders', 2200, 480, 130, 80], ['terr_altar', 160, 1240, 90, 80], ['terr_torch_post', 2180, 1300, 60, 90], ['terr_bramble', 1160, 1420, 130, 60]],
        [['terr_waystone', 140, 560, 70, 90], ['terr_standing_stones', 2200, 620, 130, 100], ['terr_chest_closed', 160, 1300, 90, 70], ['terr_boulders', 2190, 1240, 130, 80], ['terr_dead_tree', 1160, 130, 90, 110]]);
    // 신규 맵 전용 세트 (v1-v4)
    X('mirkwood',
        [['terr_bramble', 150, 400, 130, 60], ['terr_dead_tree', 2200, 300, 90, 110], ['terr_mushroom_ring', 160, 1240, 90, 70], ['terr_fallen_log', 2180, 1300, 120, 60], ['terr_cage', 1160, 140, 90, 90]],
        [['terr_dead_tree', 140, 560, 90, 110], ['terr_oak_tree', 2180, 480, 110, 130], ['terr_bramble', 160, 1300, 130, 60], ['terr_cage', 2200, 1240, 90, 90], ['terr_bone_pile', 1160, 1420, 100, 70]],
        [['terr_mushroom_ring', 150, 300, 90, 70], ['terr_dead_tree', 2200, 560, 90, 110], ['terr_fallen_log', 160, 1180, 120, 60], ['terr_beehive', 2180, 1380, 90, 80], ['terr_standing_stones', 1160, 1420, 130, 100]],
        [['terr_pine_copse', 140, 480, 130, 110], ['terr_bramble', 2200, 700, 130, 60], ['terr_dead_tree', 150, 1240, 90, 110], ['terr_campfire', 2190, 1240, 70, 70], ['terr_waystone', 1160, 130, 70, 90]]);
    X('dol_guldur',
        [['terr_bramble', 150, 480, 130, 60], ['terr_dead_tree', 2200, 400, 90, 110], ['terr_cage', 160, 1240, 90, 90], ['terr_sarcophagus', 2180, 1300, 100, 80], ['terr_torch_post', 1160, 1420, 60, 90]],
        [['terr_ruined_wall', 140, 300, 180, 80], ['terr_bone_pile', 2200, 620, 100, 70], ['terr_dead_tree', 150, 1180, 90, 110], ['terr_bramble', 2190, 1240, 130, 60], ['terr_idol', 1160, 140, 80, 110]],
        [['terr_cage', 150, 560, 90, 90], ['terr_dead_tree', 2180, 300, 90, 110], ['terr_sarcophagus', 160, 1300, 100, 80], ['terr_bramble', 2200, 1380, 130, 60], ['terr_waystone', 1160, 1420, 70, 90]],
        [['terr_bone_pile', 140, 400, 100, 70], ['terr_bramble', 2200, 560, 130, 60], ['terr_ruined_tower', 150, 1240, 120, 140], ['terr_dead_tree', 2180, 1300, 90, 110], ['terr_torch_post', 1160, 130, 60, 90]]);
    X('gondolin',
        [['terr_white_tree', 150, 480, 90, 110], ['terr_stone_archway', 2200, 300, 160, 100], ['terr_statue_head', 160, 1240, 110, 90], ['terr_relic_shrine', 2180, 1300, 100, 110], ['terr_pond', 1160, 1420, 130, 90]],
        [['terr_gondor_house', 140, 300, 120, 100], ['terr_altar', 2200, 560, 90, 80], ['terr_well', 160, 1180, 90, 80], ['terr_stone_archway', 2190, 1240, 160, 100], ['terr_waystone', 1160, 1420, 70, 90]],
        [['terr_statue_head', 150, 620, 110, 90], ['terr_relic_shrine', 2180, 400, 100, 110], ['terr_gondor_house', 160, 1300, 120, 100], ['terr_white_tree', 2200, 1300, 90, 110], ['terr_brazier', 1160, 130, 60, 70]],
        [['terr_well', 140, 480, 90, 80], ['terr_statue_head', 2200, 620, 110, 90], ['terr_stone_archway', 150, 1240, 160, 100], ['terr_pond', 2180, 1380, 130, 90], ['terr_torch_post', 1160, 1420, 60, 90]]);
    X('angband',
        [['terr_bone_pile', 150, 400, 100, 70], ['terr_orc_totem', 2200, 300, 70, 100], ['terr_brazier', 160, 1240, 60, 70], ['terr_siege_wreck', 2180, 1240, 140, 90], ['terr_spike_line', 1160, 1420, 130, 70]],
        [['terr_idol', 140, 560, 80, 110], ['terr_bone_pile', 2200, 480, 100, 70], ['terr_cage', 160, 1180, 90, 90], ['terr_orc_barricade', 2190, 1300, 130, 80], ['terr_dead_tree', 1160, 130, 90, 110]],
        [['terr_mumak_skull', 150, 300, 120, 80], ['terr_brazier', 2200, 560, 60, 70], ['terr_bone_pile', 160, 1300, 100, 70], ['terr_spike_barricade', 2180, 1380, 120, 70], ['terr_orc_totem', 1160, 1420, 70, 100]],
        [['terr_orc_camp', 140, 480, 130, 110], ['terr_siege_wreck', 2200, 700, 140, 90], ['terr_cage', 150, 1240, 90, 90], ['terr_bone_pile', 2190, 1240, 100, 70], ['terr_idol', 1160, 1420, 80, 110]]);
    // 반지의제왕 로어 변형 세트 (구 맵 v3)
    X('minas_tirith', [['terr_white_tree', 150, 300, 90, 110], ['terr_trebuchet', 2200, 620, 130, 100], ['terr_sarcophagus', 160, 1240, 100, 80], ['terr_war_banner', 2180, 1240, 60, 110], ['terr_portcullis', 1160, 1420, 180, 90]]);
    X('helms_deep', [['terr_wall_segment', 1160, 140, 200, 90], ['terr_bomb', 150, 700, 80, 80], ['terr_siege_ladder', 2200, 620, 90, 110], ['terr_ballista', 160, 1240, 110, 90], ['terr_dead_tree', 2180, 1380, 90, 110]]);
    X('moria', [['terr_sarcophagus', 150, 620, 100, 80], ['terr_relic_shrine', 2200, 400, 100, 110], ['terr_broken_pillar', 160, 1180, 80, 110], ['terr_bone_pile', 2180, 1300, 100, 70], ['terr_idol', 1160, 1420, 80, 110]]);
    X('black_gate', [['terr_spike_line', 150, 400, 130, 70], ['terr_orc_totem', 2200, 620, 70, 100], ['terr_mumak_skull', 160, 1240, 120, 80], ['terr_catapult', 2180, 1300, 130, 100], ['terr_brazier', 1160, 1420, 60, 70]]);
    X('edoras', [['terr_throne', 1160, 140, 100, 110], ['terr_rohan_hall', 150, 480, 160, 120], ['terr_weapon_rack', 2200, 700, 90, 80], ['terr_haystack', 160, 1300, 100, 90], ['terr_war_banner', 2180, 1240, 60, 110]]);
    X('fangorn', [['terr_oak_tree', 150, 300, 110, 130], ['terr_oak_tree', 2200, 480, 110, 130], ['terr_standing_stones', 160, 1240, 130, 100], ['terr_bramble', 2180, 1300, 130, 60], ['terr_mushroom_ring', 1160, 1420, 90, 70]]);
    X('gorgoroth', [['terr_idol', 150, 560, 80, 110], ['terr_spike_barricade', 2200, 300, 120, 70], ['terr_bone_pile', 160, 1180, 100, 70], ['terr_orc_barricade', 2180, 1240, 130, 80], ['terr_torch_post', 1160, 1420, 60, 90]]);
    X('isengard', [['terr_palantir', 150, 560, 70, 90], ['terr_orc_camp', 2200, 300, 130, 110], ['terr_anvil', 160, 1180, 90, 80], ['terr_bomb', 2180, 1300, 80, 80], ['terr_spike_line', 1160, 1420, 130, 70]]);
    X('amon_sul', [['terr_statue_head', 150, 400, 110, 90], ['terr_ruined_tower', 2200, 560, 120, 140], ['terr_standing_stones', 160, 1180, 130, 100], ['terr_barrow', 2180, 1240, 120, 90], ['terr_waystone', 1160, 1420, 70, 90]]);
    X('osgiliath', [['terr_argonath', 150, 620, 130, 110], ['terr_broken_pillar', 2200, 300, 80, 110], ['terr_osgiliath_dome', 160, 1240, 160, 120], ['terr_stone_archway', 2180, 1300, 160, 100], ['terr_loot_bag', 1160, 1420, 70, 60]]);
    X('rivendell', [['terr_palantir', 150, 300, 70, 90], ['terr_relic_shrine', 2200, 560, 100, 110], ['terr_stone_archway', 160, 1180, 160, 100], ['terr_pond', 2180, 1240, 130, 90], ['terr_altar', 1160, 1420, 90, 80]]);
    X('lothlorien', [['terr_oak_tree', 150, 560, 110, 130], ['terr_oak_tree', 2200, 300, 110, 130], ['terr_altar', 160, 1180, 90, 80], ['terr_waystone', 2180, 1300, 70, 90], ['terr_pond', 1160, 1420, 130, 90]]);
    X('erebor', [['terr_gold_pile', 150, 400, 110, 80], ['terr_throne', 2200, 560, 100, 110], ['terr_anvil', 160, 1180, 90, 80], ['terr_hoard', 2180, 1240, 130, 90], ['terr_bone_pile', 1160, 1420, 100, 70]]);
    X('pelennor', [['terr_white_tree', 150, 400, 90, 110], ['terr_war_banner', 2200, 560, 60, 110], ['terr_trebuchet', 160, 1240, 130, 100], ['terr_hedgerow', 2180, 1300, 140, 60], ['terr_waystone', 1160, 1420, 70, 90]]);
    X('dead_marshes', [['terr_barrow', 150, 560, 120, 90], ['terr_pond', 2200, 300, 130, 90], ['terr_brazier', 160, 1180, 60, 70], ['terr_sarcophagus', 2180, 1240, 100, 80], ['terr_dead_tree', 1160, 1420, 90, 110]]);
    X('dunharrow', [['terr_standing_stones', 150, 480, 130, 100], ['terr_standing_stones', 2200, 300, 130, 100], ['terr_sarcophagus', 160, 1240, 100, 80], ['terr_torch_post', 2180, 1300, 60, 90], ['terr_waystone', 1160, 1420, 70, 90]]);
    X('minas_gate', [['terr_argonath', 150, 560, 130, 110], ['terr_trebuchet', 2200, 300, 130, 100], ['terr_war_banner', 160, 1180, 60, 110], ['terr_grond', 2180, 1240, 160, 100], ['terr_bone_pile', 1160, 1420, 100, 70]]);
}
function mapProps(key, wave) {
    const v = mapVariant(wave);
    const sets = MAP_PROP_SETS[key];
    const base = MAP_PROPS[key] || [];
    if (v === 0) return base.length ? base : (sets && sets[1]) || [];
    if (sets && sets[v]) return sets[v];
    if (sets && sets.length > 1) return sets[1 + ((v - 1) % (sets.length - 1))];
    return base.filter((p, i) => i % 4 === v - 1);
}
function zoneOpen(Z, t) { return !t.active || t.z !== 'cliff' || !!Z && Z.traits.includes('flying'); }
// 등반 코스트: 비산악 유닛이 산(mountain) 존 안으로 들어갈 때 추가 이동력 소모.
function climbCost(u, to, terrain) { return !u || u.traits.includes('flying') || u.traits.includes('mountain') ? 0 : (terrain || []).some(t => t.active && t.z === 'mountain' && le(to, t, 0)) ? 135 : 0; }
// Spear-support predicate, shared by the fight solver and the HUD link lines.
function supportAlly(u) { const all = q.alive(); if (!u.alive || !u.traits.includes('spear') || all.some(v => Vt(u, v)))
    return null; return all.filter(v => v !== u && v.side === u.side && all.some(f => f.side !== u.side && Vt(v, f)) && ht(u, v) <= u.radius + v.radius + 48).sort((a, b2) => ht(u, a) - ht(u, b2))[0] || null; }
let AUTO = false; // auto-play: drives whichever side needs input; camp stays manual
let AUTO_STEP = false; // one-phase auto: finishes the current move/shoot phase for Gondor, then hands control back
Mt.initial = [{ id: 'aragorn', count: 1 }, { id: 'warrior_minas_tirith', count: 2 }, { id: 'mt_spear', count: 1 }, { id: 'gondor_archer', count: 2 }];
const P = ze.prototype, oldSpawn = P.spawn, oldStart = P.start, oldRound = P.beginRound, oldMove = P.move, oldShoot = P.shoot, oldApply = P.applyCombat;
P.rank = function (id) { return this.relics?.[id] || 0; };
P.bonded = function (u) {
    const f = this.meta.get(u.id)?.faction;
    return !!(f && this.alive('good').some(v => v !== u && this.meta.get(v.id)?.faction === f && ht(u, v) <= u.radius + v.radius + 60));
};
const FACTION_KO = { gondor: '곤도르', minastirith: '미나스 티리스', rohan: '로한', elf: '엘프', rivendell: '리븐델', lothlorien: '로스로리엔', dwarf: '난쟁이', erebor: '에레보르', hobbit: '홉빗', shire: '샤이어', dead: '망자', arnor: '아르노르', silmaril: '1시대', mordor: '모르도르', angmar: '앙그마르', isengard: '아이센가드', gundabad: '군다바드', harad: '하라드', rhun: '룬', dolguldur: '돌 굴두르', dunland: '던란드', fangorn: '판고른', laketown: '호숫골', dale: '데일', bree: '브리', numenor: '누메노르' };
// 세력 결속: 같은 세력 아군 4기 이상이면 그 세력 고유의 패시브가 전원에게 발동.
const FACTION_BONDS = {
    gondor: ['방벽 · Defence +1', u => { u.stats.defence += 1; }],
    minastirith: ['방벽 · Defence +1', u => { u.stats.defence += 1; }],
    rohan: ['기마대 · 기병 결투 +1', u => { if (u.traits.includes('mounted')) u.stats.fight += 1; }],
    elf: ['매의 눈 · 사격 명중 +1', u => { if (u.stats.shootRange) u.stats.shootValue = Math.max(2, u.stats.shootValue - 1); }],
    lothlorien: ['매의 눈 · 사격 명중 +1', u => { if (u.stats.shootRange) u.stats.shootValue = Math.max(2, u.stats.shootValue - 1); }],
    rivendell: ['고결한 의지 · 용기 +1', u => { u.stats.courage += 1; }],
    dwarf: ['강철 전열 · Defence +1', u => { u.stats.defence += 1; }],
    erebor: ['강철 전열 · Defence +1', u => { u.stats.defence += 1; }],
    hobbit: ['작은 용기 · 용기 +1', u => { u.stats.courage += 1; }],
    shire: ['작은 용기 · 용기 +1', u => { u.stats.courage += 1; }],
    dead: ['맹세의 군대 · 용기 +1', u => { u.stats.courage += 1; }],
    silmaril: ['고대의 위엄 · 결투 +1', u => { u.stats.fight += 1; }],
    mordor: ['공포의 물결 · 용기 +1', u => { u.stats.courage += 1; }],
    angmar: ['마술의 서약 · 용기 +1', u => { u.stats.courage += 1; }],
    isengard: ['광기의 충성 · 용기 +1', u => { u.stats.courage += 1; }],
    numenor: ['왕족의 핏줄 · 결투 +1', u => { u.stats.fight += 1; }],
    laketown: ['검은 화살 · 사격 명중 +1', u => { if (u.stats.shootRange) u.stats.shootValue = Math.max(2, u.stats.shootValue - 1); }],
    dale: ['북부 무역상 · 용기 +1', u => { u.stats.courage += 1; }],
    bree: ['여관의 동지애 · 용기 +1', u => { u.stats.courage += 1; }],
    fangorn: ['나무의 인내 · 체력 +1', u => { u.stats.wounds += 1; }],
    rhovanion: ['산림 정찰 · 이동 +1인치', u => { u.stats.move += 45; }],
    fiefdoms: ['곤도르의 외곽 · Defence +1', u => { u.stats.defence += 1; }],
    harad: ['남방 전사 · 결투 +1', u => { u.stats.fight += 1; }],
    umbar: ['해적의 강인함 · 용기 +1', u => { u.stats.courage += 1; }],
    khand: ['바리아그 · 결투 +1', u => { u.stats.fight += 1; }],
    dunland: ['혐오의 분노 · 힘 +1', u => { u.stats.strength += 1; }],
    deeping: ['충심의 결의 · 용기 +1', u => { u.stats.courage += 1; }],
};
P.factionBonds = function () {
    const counts = {};
    for (const u of this.alive('good')) {
        const f = this.meta.get(u.id)?.faction;
        if (f && f !== 'terrain') counts[f] = (counts[f] || 0) + 1;
    }
    return Object.entries(counts).filter(([, n]) => n >= (this.relics && this.relics.alliance_standard ? 3 : 4)).map(([f, n]) => {
        const [desc, apply] = FACTION_BONDS[f] || ['군심 결속 · 용기 +1', u => { u.stats.courage += 1; }];
        return { faction: f, count: n, desc: `${FACTION_KO[f] || f} 결속 · ${desc}`, apply };
    });
};
P.factionCounts = function () {
    const counts = {};
    for (const u of this.permanent()) {
        const f = this.meta.get(u.id)?.faction;
        if (f && f !== 'terrain') counts[f] = (counts[f] || 0) + 1;
    }
    return counts;
};
P.bondDesc = function (u) {
    const f = this.meta.get(u.id)?.faction, b = f && this.factionBonds().find(x => x.faction === f);
    return b ? b.desc : '';
};
// 유물 세트: 같은 계열 유물을 need개 모으면 세트 보너스 발동. 빌드 방향성을 줌.
const RELIC_SETS = {
    '기병': { need: 2, desc: '기병 세트 · 기병 결투 +1', apply: u => { if (u.traits.includes('mounted')) u.stats.fight += 1; } },
    '전열': { need: 2, desc: '전열 세트 · 보병 Defence +1', apply: u => { if (!u.traits.includes('mounted') && !u.stats.shootRange) u.stats.defence += 1; } },
    '사격': { need: 3, desc: '사격 세트 · 궁수 명중 −1', apply: u => { if (u.stats.shootRange) u.stats.shootValue = Math.max(2, u.stats.shootValue - 1); } },
    '영웅': { need: 3, desc: '영웅 세트 · 영웅 결투 +1', apply: u => { if (u.traits.includes('hero')) u.stats.fight += 1; } },
    '생존': { need: 3, desc: '생존 세트 · 아군 용기 +2', apply: u => { u.stats.courage += 2; } },
    '원정': { need: 3, desc: '원정 세트 · 라운드 CP +1', apply: null },
};
P.relicSets = function () {
    const counts = {};
    for (const id of Object.keys(this.relics || {}))
        if (this.relics[id] > 0) {
            const f = relicFamily(id);
            counts[f] = (counts[f] || 0) + 1;
        }
    return Object.entries(RELIC_SETS).map(([f, x]) => ({ family: f, count: counts[f] || 0, need: x.need, active: (counts[f] || 0) >= x.need, desc: x.desc, apply: x.apply }));
};
P.capacity = function () { return Math.min(30, 8 + Math.floor((this.wave || 0) / 3) * 2 + (this.capacityBought || 0) * 2); };
P.permanent = function () { return this.alive('good').filter(u => !u.temporary); };
P.spawn = function (id, side, pos) {
    const u = oldSpawn.call(this, id, side, pos);
    u.name = this.meta.get(id).name_ko;
    u.visualRadius = this.meta.get(id).visualRadius || u.radius;
    u.baseStats = structuredClone(u.stats);
    u.resources = { might: u.stats.might, will: u.stats.will, fate: u.stats.fate };
    u.usedSkills = [];
    u.roundBuff = {};
    u.stageShots = 0;
    u.stageStrikes = 0;
    u.heroicUsed = false;
    u.shotsLeft = 1;
    u.bossPhase = 1;
    u._spawnedAt = Date.now();
    if (id === 'morgoth')
        u.radius = 132;
    this.refreshUnit(u);
    return u;
};
P.refreshUnit = function (u) {
    if (!u.baseStats)
        return;
    u.stats = structuredClone(u.baseStats);
    if (u.side === 'good') {
        if (u.traits.includes('mounted'))
            u.stats.move += 45 * this.rank('horseshoe');
        if (u.stats.shootRange)
            u.stats.shootRange += 45 * this.rank('quiver');
        u.stats.courage += 2 * this.rank('silmaril');
        u.stats.strength += this.rank('durin_axe');
        u.stats.move += 45 * this.rank('eagle_feather');
        u.stats.courage += this.rank('crown_west');
        if (u.traits.includes('mounted'))
            u.stats.fight += this.rank('eohere_horn');
        u.stats.courage += Math.min(2, Math.floor((this.fallen || []).length / 2)) * this.rank('oath_dead');
        const _uf = (this.meta.get(u.id) || {}).faction;
        if (_uf === 'dwarf' || _uf === 'erebor')
            u.stats.fight += this.rank('erebor_crown');
        if (u.stats.shootRange) {
            u.stats.move += 45 * this.rank('dunedain_star');
            u.stats.shootValue = Math.max(2, u.stats.shootValue - this.rank('ranger_hood'));
        }
        if (u.traits.includes('hero'))
            u.stats.wounds += this.rank('troll_heart');
        if (u.stats.shootRange)
            u.stats.shootValue = Math.max(2, u.stats.shootValue - this.rank('elven_feather'));
        for (const b of this.factionBonds())
            if ((this.meta.get(u.id) || {}).faction === b.faction)
                b.apply(u);
        for (const s of this.relicSets())
            if (s.active && s.apply)
                s.apply(u);
    }
    if (u.side === 'evil') {
        if (u.stats.shootRange)
            u.stats.shootRange = Math.max(60, u.stats.shootRange - 45 * this.rank('anduin_mist'));
        u.stats.courage = Math.max(1, u.stats.courage - this.rank('black_breath'));
    }
    for (const [key, v] of Object.entries(u.roundBuff || {}))
        u.stats[key] = (u.stats[key] || 0) + v;
    u.stats.attacks = Math.max(1, u.stats.attacks);
    u.stats.fight = Math.max(1, u.stats.fight);
};
P.start = function (mode) {
    this.gold = mode === 'ai' ? 600 : 35;
    this.relics = {};
    this.capacityBought = 0;
    this.totalKills = 0;
    this.mithrilSpent = false;
    this.recruited = [];
    this.campDraft = null;
    this.priorityForce = null;
    this.bonusCP = 0;
    this.nextRoundBuffs = [];
    this.horses = 0;
    this.fallen = [];
    this.devices = [];
    if (!this.difficulty) this.difficulty = 'normal';
    if (this.dailySeed)
        this.rng = Ne(this.dailySeed);
    this.initialDraft = false;
    this.best = this.readBest();
    this.mission = 'defense';
    this.capture = 0;
    this.warnings = [];
    this.cleared = 0;
    const _mtInit = Mt.initial;
    if (mode === 'ai')
        Mt.initial = [];
    oldStart.call(this, mode);
    Mt.initial = _mtInit;
    this.prepareStage();
    if (mode === 'ai') {
        this.initialDraft = true;
        this.phase = 'reward';
        this.campStep = 'recruit';
        this.recruitDraft = [];
        this.rerolls = 0;
        this.chosenRelic = '';
        this.rollInitialRecruits();
        this.emit('Preparation', '출정할 원정대를 고르세요. 영웅 1기와 병사들을 금화 안에서 선택합니다.');
    }
    else
        this.emit('Preparation', '아라곤과 다섯 병사. 병사를 선택해 전열을 정하세요.');
};
P.rollInitialRecruits = function () {
    this.rng || (this.rng = Ne(Date.now()));
    const isH = d => (d.profile.traits || []).includes('hero') || d.meta.role === 'hero';
    const base = Object.values(UnitCatalog).filter(d => d.enabled && d.meta.side === 'good' && this.meta.has(d.id) && (0 >= (d.unlockWave || 0) || isH(d)));
    const heroes = base.filter(d => isH(d) && (!SILMARIL_HEROES.has(d.uniqueKey || d.id) || this.rank("silmaril"))).map(d => ({ id: d.id, r: this.rng() })).sort((a, b) => a.r - b.r).slice(0, 2);
    const troops = base.filter(d => d.recruitable && !isH(d)).map(d => ({ id: d.id, r: this.rng() })).sort((a, b) => a.r - b.r).slice(0, 4);
    this.recruitOffers = [...heroes, ...troops].map(d => ({ id: d.id, bought: false }));
};
P.readBest = function () { try {
    return Number(localStorage.getItem('mesbg-endless-best')) || 0;
}
catch {
    return 0;
} };
const STAGE_BOSSES = { 5: 'cave_troll', 10: 'saruman', 15: 'witchking_fellbeast', 20: 'mouth_of_sauron', 25: 'goblin_king', 30: 'azog', 35: 'smaug', 40: 'sauron', 45: 'glaurung', 50: 'carcharoth', 55: 'ungoliant', 60: 'gothmog_balrog', 65: 'ancalagon', 70: 'morgoth' };
const DESPAIR_BOSS_POOL = ['cave_troll','goblin_king','azog','witchking_fellbeast','mouth_of_sauron','saruman','sauron','carcharoth','smaug','glaurung','gothmog_balrog','ungoliant','ancalagon','morgoth'];
const ELDER_BOSSES = ['ungoliant', 'gothmog_balrog', 'ancalagon', 'morgoth'];
const STAGE_CO_COMMANDERS = { 20: ['war_troll', 'nazgul_fellbeast', 'nazgul_fellbeast', 'nazgul_fellbeast'], 60: ['balrog'] };
const STAGE_EXTRA_FOES = { 15: ['mumakil', 'haradrim_raider', 'haradrim_raider', 'haradrim_spearman', 'haradrim_spearman'], 25: ['moria_goblin', 'moria_goblin', 'moria_goblin', 'moria_goblin'] };
const STAGE_TITLES = { 5: '모리아의 트롤', 10: '아이센가드의 배신', 15: '펠렌노르 평원', 20: '검은문 총공세', 25: '고블린 도시', 30: '다섯 군대의 전투', 35: '외로운 산의 용', 40: '모르도르의 군주', 45: '다고르 브라골라흐', 50: '카르카로스의 추격', 55: '니르에나스 아르노이디아드', 60: '곤돌린의 몰락', 65: '분노의 전쟁', 70: '발리노르 최후의 대결' };
const ARC_MAPS = ['amon_sul', 'isengard', 'pelennor', 'black_gate', 'mirkwood', 'erebor', 'erebor', 'dol_guldur', 'angband', 'lothlorien', 'gorgoroth', 'gondolin', 'angband', 'angband'];
// 스테이지 단위 맵 지정 — 헬름 협곡 공성전(사루만 10 ↔ 펠렌노르 15 사이 스토리 자리).
const STAGE_MAP_OVERRIDE = { 11: 'helms_deep', 12: 'helms_deep', 13: 'helms_deep', 14: 'helms_deep' };
P.stageInfo = function (n) {
    let boss = n % (this.difficulty === 'despair' ? 4 : 5) === 0 ? (STAGE_BOSSES[n] || (n > 70 ? ELDER_BOSSES[Math.floor(n / 5) % ELDER_BOSSES.length] : this.difficulty === 'despair' ? DESPAIR_BOSS_POOL[(Math.floor(n / 4) - 1) % DESPAIR_BOSS_POOL.length] : null)) : null;
    const missions = ['defense', 'annihilation', 'hold', 'survive', 'commander', 'breakthrough', 'rescue', 'escort'];
    const mission = boss ? 'commander' : missions[(n - 1) % missions.length];
    const ids = [];
    const dmul = this.difficulty === 'easy' ? .75 : this.difficulty === 'hard' ? 1.35 : this.difficulty === 'despair' ? 1.6 : 1;
    // 잡병 수 — 보스전은 보스+부관 수만큼 잡병을 빼서 총량 폭증 방지.
    const _extras = boss ? 1 + (STAGE_CO_COMMANDERS[n] || []).length + (STAGE_EXTRA_FOES[n] || []).length : 0;
    const count = Math.min(this.difficulty === 'despair' ? 36 : this.difficulty === 'hard' ? 30 : 24, Math.max(3, Math.round((4 + Math.floor(n * 1.15)) * dmul))) - _extras;
    for (let i = 0; i < count; i++)
        ids.push(
            n > 45 && i % 4 === 0 ? 'cave_troll' :          // 후반부 트롤 빈도 상승
            n > 9 && i % 7 === 0 ? 'cave_troll' :
            n > 4 && i % 5 === 0 ? 'warg_rider' :
            n > 2 && i % 4 === 0 ? 'uruk_berserker' :
            i % 4 === 3 ? 'orc_archer' :
            i % 3 === 1 ? (n > 25 ? 'uruk_berserker' : 'moria_goblin') : 'orc_sword'); // 후반부 고블린→버서커
    if (boss)
        ids.push(boss, ...(STAGE_CO_COMMANDERS[n] || []), ...(STAGE_EXTRA_FOES[n] || []));
    else if (mission === 'commander')
        ids.push(n > 8 ? 'saruman' : 'orc_captain');
    else if (n > 3)
        ids.push('orc_captain');
    let modifier = n < 4 ? 'clear' : ['clear', 'rain', 'dark', 'reinforce', 'warg', 'ambush', 'cavalry', 'swarm', 'snow', 'eclipse', 'mud', 'gale', 'frost'][n % 13];
    if (modifier === 'clear' && n > 6 && n % 4 === 1)
        modifier = 'fog';
    if (modifier === 'warg')
        ids.push('warg_rider', 'warg_rider');
    if (modifier === 'cavalry')
        for (let i = 0; i < ids.length; i += 2)
            ids[i] = 'warg_rider';
    if (modifier === 'swarm') { ids.length = 0; for (let i = 0; i < count + 7; i++) ids.push(i % 6 === 5 ? 'uruk_berserker' : 'moria_goblin'); }
    if (modifier === 'ambush')
        for (let i = 0; i < ids.length; i++) if (ids[i] === 'warg_rider' || ids[i] === 'cave_troll') ids[i] = 'moria_goblin';
    if (boss) modifier = 'eclipse';
    const _arcKey = (STAGE_MAP_OVERRIDE[n]) || ARC_MAPS[Math.floor((n - 1) / 5) % ARC_MAPS.length], _arcIdx = CX.maps.indexOf(_arcKey);
    return { n, boss, bossAll: boss ? [boss, ...(STAGE_CO_COMMANDERS[n] || [])] : null, mission, ids, map: _arcIdx >= 0 ? _arcIdx : Math.floor((n - 1) / 5) % CX.maps.length, modifier, title: STAGE_TITLES[n] || '' };
};
P.prepareStage = function () {
    const info = this.stageInfo(this.wave + 1);
    this.next = info;
    this.mapIndex = info.map;
    this.mission = info.mission;
    this.capture = 0;
    this.rescued = false;
    this.escortCart = null;
    this.escaped = [];
    this.warnings = [];
    this.terrain = structuredClone(ee).filter(t => !t.id.startsWith('wall') || this.mapIndex === 0);
    const _mapKey = CX.maps[visualMapIdx(this.mapIndex)];
    try {
        for (const [i, z] of mapZones(_mapKey, this.wave || 1).entries())
            this.terrain.push({ id: 'zone-' + i, x: z.x + z.w / 2, y: z.y + z.h / 2, w: z.w, h: z.h, kind: 'block', z: z.z, active: true });
        for (const p of mapProps(_mapKey, this.wave || 1))
            this.terrain.push({ id: p[0], x: p[1], y: p[2], w: p[3], h: p[4], kind: 'cover', active: true });
        if (this.mission === 'rescue' && Mt.objective)
            this.terrain.push({ id: 'terr_cage', x: Mt.objective.x - 40, y: Mt.objective.y - 40, w: 80, h: 80, kind: 'cover', active: true });
    }
    catch (e) {
        console.error('[map data]', _mapKey, e);
        try { localStorage.setItem('__dbgstart', 'mapdata ' + _mapKey + ' :: ' + String(e && e.stack || e).slice(0, 1000)); } catch (e2) {}
    }
    for (const t of this.terrain)
        if (t.id.startsWith('barricade'))
            t.active = this.mission === 'defense';
    if (this.mapIndex !== 0) {
        this.terrain.find(t => t.id === 'terr_rock_outcrop').x = 420 + (this.mapIndex % 3) * 120;
        this.terrain.find(t => t.id === 'terr_ruined_wall').x = 1780 - (this.mapIndex % 2) * 130;
    }
    Mt.objective.x = 1165;
    Mt.objective.y = this.mission === 'defense' ? 240 : 960;
    Mt.objective.radius = this.mission === 'defense' ? 180 : 175;
    this.phase = 'preparation';
    this.side = 'good';
    this.activeMoverUid = '';
    for (const u of this.alive('good')) {
        u.x = -1000;
        u.y = -1000;
    }
    for (const u of this.alive('good')) {
        u.roundBuff = {};
        this.refreshUnit(u);
        u.acted = false;
        u.moved = false;
        u.movementSpent = 0;
        u.stageShots = 0;
        u.stageStrikes = 0;
        u.usedSkills = [];
        u.protected = false;
        u.escaped = false;
        this.placeInDeployment(u);
    }
    this.selected = this.alive('good')[0]?.uid || '';
};
P.placeInDeployment = function (u) {
    for (let y = 345; y <= 645; y += 130)
        for (const x of [1090, 1240, 940, 1390, 790, 1540, 640, 1690, 490, 1840, 340, 1990, 190, 2140])
            if (Et(u, { x, y }, this.alive(), this.terrain)) {
                Object.assign(u, { x, y });
                return true;
            }
    return false;
};
const BONUS_OBJECTIVES = [
    { id: 'flawless', text: '아군 무손실 승리', gold: 30, test: q => !q.stageDeaths },
    { id: 'blitz', text: '4라운드 안에 승리', gold: 25, cond: q => q.mission !== 'survive', test: q => q.round <= 4 },
    { id: 'headsman', text: '적 영웅 처치', gold: 25, cond: q => q.alive('evil').some(u => u.traits.includes('hero')), test: q => (q.stageHeroKills || 0) >= 1 },
    { id: 'volley', text: '사격으로 4기 처치', gold: 20, cond: q => q.alive('good').some(u => u.stats.shootRange), test: q => (q.stageShootKills || 0) >= 4 },
    { id: 'rout', text: '적 8기 이상 처치', gold: 20, cond: q => q.alive('evil').length >= 8, test: q => (q.stageKills || 0) >= 8 },
    { id: 'linehold', text: '성문 무접근 — 목표 구역에 적 0기로 마무리', gold: 20, cond: q => q.mission === 'defense', test: q => !q.alive('evil').some(u => ht(u, Mt.objective) <= Mt.objective.radius) },
    { id: 'charge', text: '돌격으로 3기 처치', gold: 20, test: q => (q.stageChargeKills || 0) >= 3 },
    { id: 'cavalry', text: '기병으로 3기 처치', gold: 20, cond: q => q.alive('good').some(u => u.traits.includes('mounted')), test: q => (q.stageCavKills || 0) >= 3 },
    { id: 'monster', text: '몬스터 처치', gold: 15, cond: q => q.alive('evil').some(u => u.traits.includes('monster')), test: q => (q.stageMonsterKills || 0) >= 1 },
    { id: 'hero_slayer', text: '영웅이 4기 처치', gold: 25, cond: q => q.alive('good').some(u => u.traits.includes('hero')), test: q => (q.stageHeroSlayer || 0) >= 4 },
    { id: 'healer', text: '아군 전원 완전한 체력으로 승리', gold: 20, test: q => q.alive('good').every(u => u.currentWounds >= u.stats.wounds) },
    { id: 'assassin', text: '적 우두머리 처치', gold: 30, cond: q => !!q.current?.boss, test: q => !!q.current?.boss && !q.alive('evil').some(u => u.id === q.current.boss) },
    { id: 'elite_hunter', text: '엘리트 적 2기 처치', gold: 25, cond: q => q.alive('evil').some(u => u.elite), test: q => (q.stageEliteKills || 0) >= 2 },
    { id: 'untouchable', text: '아군 전사 없이 승리', gold: 30, test: q => (q.stageDeaths || 0) === 0 },
    { id: 'shield_wall', text: '아군 무사 승리 (전투 후 부상 0)', gold: 25, test: q => q.alive('good').every(u => !u.injury) },
];
const CHALLENGES = [
    { id: 'reinforce', label: '증원 경보', text: '적 +4기 추가', gold: 30 },
    { id: 'elite', label: '강적 소집', text: '적 엘리트 +2기', gold: 25 },
    { id: 'onslaught', label: '총공세', text: '적 +4기 & 엘리트 +2기', gold: 50 },
    { id: 'supplies', label: '보급 차단', text: '첫 라운드 아군 용기 −1', gold: 25 },
    { id: 'doubt', label: '사기 저하', text: '첫 라운드 아군 결투 −1', gold: 30 },
    { id: 'fog', label: '짙은 안개', text: '첫 라운드 아군 이동 −1인치', gold: 20 },
    { id: 'veteran_foe', label: '노련한 적', text: '첫 라운드 적 전원 결투 +1', gold: 30 },
    { id: 'dark_blades', label: '검은 칼날', text: '첫 라운드 적 전원 Attack +1', gold: 35 },
    { id: 'dark_horde', label: '어둠의 무리', text: '적 +2기 & 엘리트 +1기', gold: 35 },
    { id: 'tired_line', label: '지친 전열', text: '첫 라운드 아군 전원 이동·결투 −1', gold: 40 },
    { id: 'poison_mist', label: '독 안개', text: '첫 라운드 아군 전원 힘 −1', gold: 30 },
    { id: 'iron_wall', label: '철벽 포위', text: '첫 라운드 적 전원 방어 +1', gold: 30 },
    { id: 'arcane_storm', label: '마력 폭풍', text: '첫 라운드 적 전원 Will +2', gold: 30 },
    { id: 'long_bows', label: '장궁 사수', text: '첫 라운드 적 전원 사거리 +1인치', gold: 30 },
];
P._trkKill = function (k, v) {
    if (k.side === 'good' && v.side === 'evil') {
        this.stageKills = (this.stageKills || 0) + 1;
        if (v.traits.includes('hero')) this.stageHeroKills = (this.stageHeroKills || 0) + 1;
        if (k.stats.shootRange) this.stageShootKills = (this.stageShootKills || 0) + 1;
        if (v.traits.includes('hero') && this.rank && this.rank('morgul_thorn')) { this.bonusCP = (this.bonusCP || 0) + 1; this.emit('Event', '모르굴의 가시 · 다음 전투 CP +1'); }
        if (k.charged) this.stageChargeKills = (this.stageChargeKills || 0) + 1;
        if (v.elite) this.eliteKills = (this.eliteKills || 0) + 1;
        if (k.traits.includes('mounted')) this.stageCavKills = (this.stageCavKills || 0) + 1;
        if (v.traits.includes('monster')) this.stageMonsterKills = (this.stageMonsterKills || 0) + 1;
        if (v.elite) this.stageEliteKills = (this.stageEliteKills || 0) + 1;
        if (k.traits.includes('hero')) this.stageHeroSlayer = (this.stageHeroSlayer || 0) + 1;
        k._stageKills = (k._stageKills || 0) + 1;
        [3, 5, 8].includes(k._stageKills) && this.emit('Event', `⚔ ${k.name} 연속 처치 ×${k._stageKills}`);
        if (!k.traits.includes('hero') && !k.traits.includes('veteran') && (k.veteranXP || 0) >= 6) {
            k.traits.push('veteran'); k.baseStats.fight = (k.baseStats.fight || 0) + 1; k.baseStats.defence = (k.baseStats.defence || 0) + 1; this.refreshUnit(k);
            this.emit('Event', `★ ${k.name} 베테랑 승급 · 결투 +1 Defense +1`);
            this.unlockAch('promoted');
        }
    }
    if (v.side === 'good') this.stageDeaths = (this.stageDeaths || 0) + 1;
};
P.startWave = function () {
    if (this.phase !== 'preparation')
        return;
    this.wave++;
    this.round = 0;
    this.capture = 0;
    this.current = this.stageInfo(this.wave);
    if (this.noAmbushNext) { this.noAmbushNext = false; if (this.current.modifier === 'ambush') this.current.modifier = 'clear'; }
    this.units = this.units.filter(u => u.side === 'good' && u.alive && !u.temporary);
    this.delayed = [];
    this.spawnEnemies(this.current.ids);
    const _er = Object.entries(this.current.ids.reduce((a, id) => (a[id] = (a[id] || 0) + 1, a), {})).map(([id, n]) => { const m = this.meta.get(id) || {}; return m.name_ko ? m.name_ko + (n > 1 ? ' ×' + n : '') : ''; }).filter(Boolean);
    this.emit('EnemyRoster', '적 편성 — ' + _er.join(', ') + ((this.current.bossAll || [this.current.boss]).filter(Boolean).length ? ' · ⚠ ' + (this.current.bossAll || [this.current.boss]).map(b2 => this.meta.get(b2)?.name_ko).filter(Boolean).join(' · ') + ' 출현' : ''));
    if (this.current.modifier === 'ambush')
        this.alive('evil').forEach((u, i) => { u.x = i % 2 ? 260 + (i % 4) * 140 : 1960 - (i % 4) * 140; u.y = 560 + Math.floor(i / 8) * 160; });
    this.commander = this.alive('evil').find(u => u.id === this.current.boss)?.uid || this.alive('evil').filter(u => u.traits.includes('hero')).at(-1)?.uid; this.commanders = (this.current.bossAll || []).map(id => this.alive('evil').find(u => u.id === id)?.uid).filter(Boolean); if (!this.commanders.length && this.commander) this.commanders = [this.commander];
    if (this.challenge === 'dark_horde')
        this.spawnEnemies((this.wave > 8 ? ['uruk_berserker', 'warg_rider'] : this.wave > 4 ? ['uruk_berserker', 'orc_sword'] : ['orc_sword', 'moria_goblin']).filter(id => this.meta.has(id)));
    if (this.challenge === 'reinforce' || this.challenge === 'onslaught')
        this.spawnEnemies((this.wave > 8 ? ['uruk_berserker', 'warg_rider', 'orc_sword', 'moria_goblin'] : this.wave > 4 ? ['uruk_berserker', 'orc_sword', 'moria_goblin', 'orc_archer'] : ['orc_sword', 'moria_goblin', 'orc_sword', 'orc_archer']).filter(id => this.meta.has(id)));
    let _eliteN = Math.min(6, 1 + Math.floor(this.wave / 4)) + (this.difficulty === 'despair' ? 2 : this.difficulty === 'hard' ? 1 : 0) + (this.challenge === 'elite' || this.challenge === 'onslaught' ? 2 : 0) + (this.challenge === 'dark_horde' ? 1 : 0);
    const _ecands = this.alive('evil').filter(u => !u.traits.includes('hero'));
    for (let i = 0; i < _eliteN && _ecands.length; i++) {
        const u = _ecands.splice(Math.floor(this.rng() * _ecands.length), 1)[0];
        u.elite = true; u.stats.fight++; u.stats.defence++; u.stats.wounds++; u.currentWounds++;
    }
    if (_eliteN) this.emit('Event', `⚠ 엘리트 ${_eliteN}기 발견 — 처치 시 각 +8금`);
    if (this.challenge === 'supplies') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'courage', n: -1, side: 'good' });
    if (this.challenge === 'doubt') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'fight', n: -1, side: 'good' });
    if (this.challenge === 'fog') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'move', n: -45, side: 'good' });
    if (this.challenge === 'veteran_foe') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'fight', n: 1, side: 'evil' });
    if (this.challenge === 'dark_blades') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'attacks', n: 1, side: 'evil' });
    if (this.challenge === 'tired_line') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'move', n: -45, side: 'good' }, { stat: 'fight', n: -1, side: 'good' });
    if (this.challenge === 'poison_mist') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'strength', n: -1, side: 'good' });
    if (this.challenge === 'iron_wall') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'defence', n: 1, side: 'evil' });
    if (this.challenge === 'arcane_storm') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'will', n: 2, side: 'evil' });
    if (this.challenge === 'long_bows') (this.nextRoundBuffs = this.nextRoundBuffs || []).push({ stat: 'shootRange', n: 45, side: 'evil' });
    this.eliteKills = 0;
    this.stageDeaths = 0; this.stageHeroKills = 0; this.stageShootKills = 0; this.stageChargeKills = 0; this.stageKills = 0; this.stageCavKills = 0; this.stageMonsterKills = 0; this.stageHeroSlayer = 0; this.stageEliteKills = 0;
    const _bp = BONUS_OBJECTIVES.filter(o => !o.cond || o.cond(this));
    this.bonusObjective = _bp.length ? _bp[Math.floor(this.rng() * _bp.length)] : null;
    this.bonusId = this.bonusObjective?.id || '';
    if (this.bonusObjective) this.emit('Event', `보너스 목표 — ${this.bonusObjective.text} (+${this.bonusObjective.gold}금)`);
    for (const u of this.alive('good')) {
        const s = this.rank('silmaril');
        for (const k of ['might', 'will', 'fate'])
            u.resources[k] = Math.min(u.baseStats[k] + s, u.resources[k] + 1 + s);
        u.stageShots = 0;
        u.stageStrikes = 0;
        u._stageKills = 0;
        if (this.rank('second_breakfast'))
            u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + this.rank('second_breakfast'));
    }
    if (this.rank('cart') && this.wave % 3 === 0 && this.meta.has('great_eagle')) {
        const u = this.spawn('great_eagle', 'good', { x: 200, y: 500 });
        u.temporary = true;
        u.autoAlly = true;
        u.baseStats.attacks += this.rank('cart') - 1;
        this.placeInDeployment(u);
    }
    if (this.mission === 'escort' && this.meta.has('terr_cart') && !this.escortCart) {
        const _cart = this.spawn('terr_cart', 'good', { x: 1200, y: 240 });
        _cart.autoAlly = true; _cart.escortee = true; _cart.temporary = true;
        Object.assign(_cart.stats, { move: 0, fight: 1, strength: 2, defence: 6, attacks: 0, wounds: 3, courage: 2, shootValue: 7, might: 0, will: 0, fate: 0 });
        _cart.baseStats = structuredClone(_cart.stats); _cart.currentWounds = 3; _cart.resources = { might: 0, will: 0, fate: 0 };
        this.refreshUnit(_cart); this.escortCart = _cart.uid;
        this.emit('Event', '보급 마차가 야영지를 출발합니다 — 남쪽 출구까지 호송하세요!');
    }
    this.emit('WaveStarted', `STAGE ${this.wave} · ${CX.missionNames[this.mission]}${this.current.boss ? ' · ' + (this.current.bossAll || [this.current.boss]).map(b2 => this.meta.get(b2)?.name_ko).filter(Boolean).join(' · ') : ''}${this.current.title ? ' · ' + this.current.title : ''}`, { boss: this.current.boss || null });
    this.beginRound();
};
P.spawnEnemies = function (ids) {
    for (const id of ids) {
        if (!this.meta.has(id))
            continue;
        const u = this.spawn(id, 'evil', { x: -1000, y: -1000 });
        let placed = false;
        for (let y = 1300; y >= 840 && !placed; y -= 125)
            for (let x = 180; x < 2180; x += 145)
                if (Et(u, { x, y }, this.alive(), this.terrain)) {
                    Object.assign(u, { x, y });
                    placed = true;
                    break;
                }
        if (!placed) {
            u.alive = false;
            this.delayed.push(id);
            continue;
        }
        // Composition carries the difficulty. Late veterans gain bounded skill, not endless HP.
        const tier = Math.min(2, Math.floor(Math.max(0, this.wave - 1) / 20));
        u.baseStats.fight = Math.min(10, u.baseStats.fight + tier);
        u.baseStats.strength = Math.min(9, u.baseStats.strength + (tier === 2 ? 1 : 0));
        u.currentWounds = u.baseStats.wounds;
        this.refreshUnit(u);
    }
};
P.beginRound = function () {
    if (this.checkRun())
        return;
    for (const u of this.alive()) {
        u.roundBuff = {};
        if (u._snared) { u.roundBuff.move = -999; u._snared--; if (!u._snared) delete u._snared; }
        u.protected = false;
        u.heroicUsed = false;
        u.heroicCombat = false;
        u.heroicDef = false;
        u.mightReroll = false;
        u.spellRound = false;
        u.heroics = {};
        u.skillRound = false;
        u.nenyaUsed = false;
        u.shotsLeft = 1;
        u.terrorTested = false;
        u.anduril = false;
        u.precise = false;
        this.refreshUnit(u);
    }
    oldRound.call(this);
    if (this.phase === 'reward' || this.phase === 'result')
        return;
    for (const u of this.alive('good')) {
        if (u.traits.includes('hero') && u.baseStats.might > 0)
            u.resources.might = Math.min(u.baseStats.might, u.resources.might + 1);
        if (this.rank('vilya') && u.traits.includes('wizard'))
            u.resources.will = Math.min(u.baseStats.will + 1, u.resources.will + 1);
    }
    if (this.rank('narya')) {
        const u = this.alive('good').filter(u => u.currentWounds < u.stats.wounds).sort((a, b) => (b.stats.wounds - b.currentWounds) - (a.stats.wounds - a.currentWounds))[0];
        if (u) {
            u.currentWounds++;
            this.emit('Relic', '나랴 · ' + u.name + ' 회복', { uid: u.uid, heal: !0 });
        }
    }
    const _wm = this.current?.modifier;
    if (_wm === 'rain' || _wm === 'dark' || _wm === 'fog' || _wm === 'snow')
        for (const u of this.alive())
            if (u.stats.shootRange)
                u.stats.shootRange *= _wm === 'rain' ? .8 : _wm === 'fog' ? .45 : _wm === 'snow' ? .6 : .65;
    if (_wm === 'snow' || _wm === 'mud')
        for (const u of this.alive())
            if (!u.traits.includes('flying') && (_wm === 'snow' || !u.traits.includes('mounted')))
                u.stats.move = Math.max(90, u.stats.move - 45);
    if (_wm === 'eclipse')
        for (const u of this.alive())
            u.stats.courage = Math.max(1, u.stats.courage - 1);
    if (_wm === 'gale')
        for (const u of this.alive())
            if (u.stats.shootRange)
                u.stats.shootValue = Math.min(6, u.stats.shootValue + 1);
    if (_wm === 'frost')
        for (const u of this.alive())
            u.stats.strength = Math.max(1, u.stats.strength - 1);
    if (this.current?.modifier === 'reinforce' && this.round % 3 === 0 && this.alive('evil').length < 26)
        this.spawnEnemies(['orc_sword', 'orc_archer']);
    if (this.delayed.length) {
        const pending = this.delayed.splice(0, 3);
        this.spawnEnemies(pending);
    }
    for (const boss of this.alive('evil').filter(u => u.traits.includes('boss')))
        this.bossTurn(boss);
    this.autoSelect();
};
P.bossTurn = function (u) {
    const ratio = u.currentWounds / u.stats.wounds;
    const phase = u.currentWounds <= Math.ceil(u.stats.wounds * .33) ? 3 : u.currentWounds <= Math.ceil(u.stats.wounds * .66) ? 2 : 1;
    if (phase > u.bossPhase) {
        u.bossPhase = phase;
        u.stats.attacks += 1;
        if (phase === 3)
            u.stats.move += 45;
        this.emit('BossPhase', `${u.name} · ${phase}단계 — 격노 (Attack +1${phase === 3 ? ' · 이동력 상승' : ''})`);
        if (phase === 2 && this.alive('evil').length < 24)
            this.spawnEnemies(['orc_sword', 'uruk_berserker']);
    }
    if (u.id === 'morgoth') {
        if (this.warnings.length) {
            for (const area of this.warnings) {
                for (const v of this.alive('good').filter(v => ht(v, area) < area.radius + v.radius)) {
                    this.inflict(u, v, 1 + Number(phase === 3));
                    this.emit('BossImpact', '그론드의 충격', { uid: v.uid, at: area });
                }
            }
            this.warnings = [];
        }
        const targets = this.alive('good').sort((a, b) => b.stats.attacks - a.stats.attacks).slice(0, phase);
        this.warnings = targets.map(v => ({ x: v.x, y: v.y, radius: 130, round: this.round + 1 }));
        this.emit('BossWarning', '그론드가 내리칩니다. 다음 라운드 전에 붉은 균열에서 벗어나세요.');
    }
    else if (u.id === 'balrog' && this.round % 2 === 0) {
        const target = this.alive('good').filter(v => ht(v, u) < 500).sort((a, b) => ht(a, u) - ht(b, u))[0];
        if (target) {
            this.inflict(u, target, 1);
            this.emit('BossImpact', '발록의 화염 채찍', { uid: target.uid, at: target });
        }
    }
    else if (u.id === 'witchking_fellbeast' && this.round % 3 === 0) {
        const t = this.alive('good').sort((a, b) => ht(a, u) - ht(b, u))[0];
        if (t) { t.prone = true; this.emit('BossImpact', '펠비스트의 급강하 — 넘어짐', { uid: t.uid, at: t }); }
    }
    else if (u.id === 'ungoliant' && this.round % 3 === 0) {
        const t = this.alive('good').filter(v => ht(v, u) < 420).sort((a, b) => ht(a, u) - ht(b, u))[0];
        if (t) { this.inflict(u, t, 1); this.emit('BossImpact', '암흑의 포식', { uid: t.uid, at: t }); }
        if (this.alive('evil').length < 24) this.spawnEnemies(['moria_goblin', 'moria_goblin']);
    }
    else if (u.id === 'sauron' && this.round % 2 === 0) {
        const t = this.alive('good').sort((a, b) => b.stats.fight - a.stats.fight)[0];
        if (t) { t.feared = true; this.emit('BossImpact', '사우론의 눈이 응시한다 — 공포', { uid: t.uid, at: t }); }
    }
    else if (u.id === 'smaug' && this.round % 3 === 0) {
        for (const t of this.alive('good').filter(v => ht(v, u) < 500).sort((a, b) => ht(a, u) - ht(b, u)).slice(0, 2)) {
            this.inflict(u, t, 1); this.emit('BossImpact', '스마우그의 화염', { uid: t.uid, at: t });
        }
    }
    else if (u.id === 'glaurung' && this.round % 3 === 0) {
        const t = this.alive('good').sort((a, b) => b.stats.fight - a.stats.fight)[0];
        if (t) { t.feared = true; t.prone = true; this.emit('BossImpact', '글라우룽의 최면 — 공포·넘어짐', { uid: t.uid, at: t }); }
    }
    else if (u.id === 'carcharoth' && this.round % 2 === 0) {
        const t = this.alive('good').filter(v => ht(v, u) < 320).sort((a, b) => ht(a, u) - ht(b, u))[0];
        if (t) { this.inflict(u, t, 1); this.emit('BossImpact', '카르카로스의 발광', { uid: t.uid, at: t }); }
    }
    else if (u.id === 'gothmog_balrog' && this.round % 2 === 0) {
        const t = this.alive('good').filter(v => ht(v, u) < 500).sort((a, b) => ht(a, u) - ht(b, u))[0];
        if (t) { this.inflict(u, t, 1); this.emit('BossImpact', '고스모그의 화염 채찍', { uid: t.uid, at: t }); }
    }
    else if (u.id === 'ancalagon' && this.round % 3 === 0) {
        const targets = this.alive('good').sort((a, b) => ht(a, u) - ht(b, u)).slice(0, phase);
        for (const t of targets) { this.inflict(u, t, 1); this.emit('BossImpact', '앙칼라곤의 용화', { uid: t.uid, at: t }); }
    }
    this.checkRun();
};
P.inflict = function (attacker, target, n) {
    const result = ce('skill', [attacker, target], attacker.side);
    let wounds = target.currentWounds;
    for (let i = 0; i < n; i++) {
        wounds--;
        result.strikeResults.push({ attacker: attacker.uid, target: target.uid, roll: 6, needed: 4, wound: true, killed: wounds <= 0 });
    }
    this.applyCombat(result);
    this.emit('SkillResolved', undefined, { result });
};
P.endRound = function () {
    if (this.checkRun())
        return;
    const allies = this.alive('good').filter(u => ht(u, Mt.objective) <= Mt.objective.radius);
    const foes = this.alive('evil').filter(u => ht(u, Mt.objective) <= Mt.objective.radius);
    if (this.mission === 'defense' && foes.length >= this.breachCount) {
        this.endRun(false, '적이 방어선을 돌파했습니다.');
        return;
    }
    if (this.mission === 'hold') {
        const _capUp = allies.length > foes.length;
        this.capture = _capUp ? this.capture + 1 : Math.max(0, this.capture - 1);
        if (_capUp) this.bonusCP += 1;
        if (this.capture >= 3) {
            this.finishWave();
            return;
        }
    }
    if (this.mission === 'rescue') {
        if (allies.length && !foes.length) {
            if (!this.rescued && this.meta.has('arnor_warrior')) {
                const _pu = this.spawn('arnor_warrior', 'good', { x: Mt.objective.x, y: Math.min(1380, Mt.objective.y + 60) });
                _pu && this.emit('Event', '포로 해방 — ' + _pu.name + '이(가) 부대에 합류!', { uid: _pu.uid });
            }
            this.rescued = true;
        }
        if (this.rescued)
            this.capture++;
        if (this.capture >= 3) {
            this.finishWave();
            return;
        }
    }
    if (this.mission === 'survive' && this.round >= 5) {
        this.finishWave();
        return;
    }
    if (this.mission === 'breakthrough' && this.alive('good').filter(u => u.y > 1200).length >= Math.min(2, this.permanent().length)) {
        this.finishWave();
        return;
    }
    this.emit('RoundEnded', `라운드 ${this.round} 종료`);
    this.beginRound();
};
P.checkRun = function () {
    if (['menu', 'reward', 'result', 'preparation'].includes(this.phase))
        return false;
    if (!this.alive('good').length) {
        this.endRun(false, '원정대가 전멸했습니다.');
        return true;
    }
    if (this.mission === 'commander' && ((this.commanders?.length && this.commanders.every(uid => !this.unit(uid)?.alive)) || (!this.commanders?.length && this.commander && !this.unit(this.commander)?.alive))) {
        this.finishWave();
        return true;
    }
    if (this.mission === 'escort') {
        const _ec = this.unit(this.escortCart);
        if (!_ec || !_ec.alive) {
            this.endRun(false, '보급 마차가 파괴됐습니다.');
            return true;
        }
        if (_ec.y >= 1180) {
            this.finishWave();
            return true;
        }
    }
    if (!this.alive('evil').length && !this.delayed.length && this.wave > 0) {
        this.finishWave();
        return true;
    }
    return false;
};
P.finishWave = function () {
    if (this.phase === 'reward' || this.phase === 'result')
        return;
    this.cleared = this.wave;
    const bounty = Math.round((60 + this.wave * 8 + this.rank('palantir') * 10 + this.rank('numenor_map') * 10 + this.rank('steward_ledger') * 15) * (this.difficulty === 'easy' ? 1.2 : this.difficulty === 'hard' ? 1.5 : this.difficulty === 'despair' ? 1.75 : 1) * (1 + .5 * this.rank('nauglamir')));
    if (this.bonusObjective && this.bonusObjective.test(this)) {
        this.gold += this.bonusObjective.gold;
        this.lastGold = bounty + this.bonusObjective.gold;
        this.campResult = (this.campResult ? this.campResult + ' · ' : '') + `보너스 목표 — ${this.bonusObjective.text} 달성 → 금화 +${this.bonusObjective.gold}`;
        this.emit('Event', `보너스 목표 달성 · +${this.bonusObjective.gold} 금화`);
    }
    else
        this.lastGold = bounty;
    this.gold += bounty;
    if (!(this.stageDeaths || 0)) { this.gold += 25; this.lastGold += 25; this.campResult = '무결 수비 · 전사자 없음 → 금화 +25' + (this.campResult ? ' · ' + this.campResult : ''); this.emit('Event', '무결 수비 · 전사자 없이 스테이지 클리어 · +25금'); }
    this.campResult = `스테이지 ${this.wave} 수비 보상 → 금화 +${bounty}` + (this.campResult ? ' · ' + this.campResult : '');
    if (this.eliteKills) {
        const eg = this.eliteKills * 8;
        this.gold += eg;
        this.lastGold += eg;
        this.campResult = (this.campResult ? this.campResult + ' · ' : '') + `엘리트 ${this.eliteKills}기 처치 → 금화 +${eg}`;
    }
    if (this.rank('mithril_ore')) {
        const mg = 10 * this.rank('mithril_ore');
        this.gold += mg;
        this.campResult = (this.campResult ? this.campResult + ' · ' : '') + `미스릴 원석 → 금화 +${mg}`;
    }
    if (this.rank('bounty_list') && this.stageKills) {
        const bg = this.stageKills * 2 * this.rank('bounty_list');
        this.gold += bg;
        this.lastGold += bg;
        this.campResult = (this.campResult ? this.campResult + ' · ' : '') + `현상금 목록 — 처치 ${this.stageKills}기 → 금화 +${bg}`;
    }
    if (this.challenge) {
        const ch = CHALLENGES.find(c => c.id === this.challenge);
        if (ch) {
            this.gold += ch.gold;
            this.lastGold += ch.gold;
            this.campResult = (this.campResult ? this.campResult + ' · ' : '') + `도전 의뢰 — ${ch.label} 완수 → 금화 +${ch.gold}`;
        }
        this.challenge = '';
    }
    const _ramp = this.alive('good').filter(u => (u._stageKills || 0) >= 4);
    if (_ramp.length) {
        const rg = _ramp.length * 8;
        this.gold += rg; this.lastGold += rg;
        this.campResult = (this.campResult ? this.campResult + ' · ' : '') + `광전사 — ${_ramp.map(u => u.name).join(', ')} → 금화 +${rg}`;
    }
    this.phase = 'reward';
    try { arcTransition(this.wave); } catch (e) { console.error('arcTransition', e); }
    typeof wt !== 'undefined' && wt.fanfare && wt.fanfare(true);
    this.campStep = 'event';
    this.rollCampEvent();
    this.chosenRelic = '';
    this.campDraft = null;
    this.rerolls = 0;
    this.warnings = [];
    this.devices = [];
    for (const u of this.alive('good')) {
        u.veteranXP++;
        u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + this.rank('lembas'));
        u.roundBuff = {};
        u.protected = false;
        if (!u.injury && u.currentWounds === 1 && u.stats.wounds > 1) {
            u.injury = Lt(this.rng) >= 4 ? 'leg' : 'arm';
            u.injuryCount = (u.injuryCount || 0) + 1;
            if (u.injury === 'leg') { u.injuryBackup = { move: u.baseStats.move }; u.baseStats.move = Math.round(u.baseStats.move * .75); }
            else { u.injuryBackup = { attacks: u.baseStats.attacks }; u.baseStats.attacks = Math.max(1, u.baseStats.attacks - 1); }
            this.emit('Event', `${u.name} 부상 — ${u.injury === 'leg' ? '다리 · 이동 25%↓' : '팔 · Attack −1'} (야영지에서 치료 가능)`);
        }
        this.refreshUnit(u);
    }
    this.rollRecruits();
    this.rollRelics();
    this.checkAchievements();
    this.emit('WaveEnded', `STAGE ${this.wave} 완료 · 금화 +${bounty}`);
    this.best = Math.max(this.best || 0, this.wave);
    try {
        localStorage.setItem('mesbg-endless-best', String(this.best));
    }
    catch { }
    this.save();
};
P.price = function (id) { return zt[id].traits.includes('hero') ? 115 : zt[id].traits.includes('mounted') ? 55 : zt[id].shootRange ? 38 : zt[id].defence >= 7 ? 48 : 30; };
P.rollRecruits = function () {
    let pool = CX.recruits.filter(id => this.meta.has(id) && (!zt[id].traits.includes('hero') || this.wave >= 2 && !this.permanent().some(u => u.id === id)));
    this.recruitOffers = pool.map(id => ({ id, r: this.rng() + (zt[id].traits.includes('hero') ? .28 : 0) })).sort((a, b) => a.r - b.r).slice(0, 4).map(x => ({ id: x.id, bought: false }));
};
const LWB_EQUIP = [
    { id: 'whetstone', label: '전투검', cost: 35, desc: '결투 +1 · 영구 장착', icon: '<path d="M4 20 16 8M14 3l7 7-4 4-7-7zM4 20l2.5-.5L6 17z"/>', iconImg: 'icons/eq_whetstone.png', fx: u => u.stats.fight += 1 },
    { id: 'plate', label: '판금갑옷', cost: 40, desc: '방어 +1 · 영구 장착', icon: '<path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z"/>', iconImg: 'icons/eq_plate.png', fx: u => u.stats.defence += 1 },
    { id: 'hunting_bow', label: '사냥활', cost: 30, desc: '사격 능력 부여 · 13″ · 명중 4+', icon: '<path d="M7 3c5 3 5 15 0 18M7 3h4M7 21h4M11 12h10m-3-3 3 3-3 3"/>', iconImg: 'icons/eq_hunting_bow.png', fx: u => { if (!u.stats.shootRange) { u.stats.shootRange = 600; u.stats.shootValue = Math.max(u.stats.shootValue, 4); } } },
    { id: 'war_banner_eq', label: '전투 기', cost: 45, desc: '용기 +1 · 3″ 내 아군의 결투 최저 주사위 1회 재굴림 · 영구 장착', icon: '<path d="M6 21V4m0 0h11l-2.5 4L17 12H6"/>', iconImg: 'icons/relic_gondor_banner.png', fx: u => u.stats.courage += 1 },
    { id: 'salve', label: '치유 연고', cost: 20, once: true, needsWound: true, desc: '즉시 사용 · 상처 1 회복', icon: '<path d="M9 3h6M10 3v4l-5 9a3 3 0 0 0 3 5h8a3 3 0 0 0 3-5l-5-9V3M7 14h10"/>', iconImg: 'icons/relic_athelas.png', fx: u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1) },
    { id: 'tower_shield', label: '탑방패', cost: 45, desc: '방어 +1 · 이동 −1″', icon: '<path d="M6 3h12v9c0 5-2.5 8-6 9-3.5-1-6-4-6-9z"/>', iconImg: 'icons/eq_tower_shield.png', fx: u => { u.stats.defence += 1; u.stats.move = Math.max(90, u.stats.move - 45); } },
    { id: 'mithril_helm', label: '미스릴 투구', cost: 70, desc: '방어 +2 · 영구 장착', icon: '<path d="M4 15V10a8 8 0 0 1 16 0v5M4 15h16m-16 0v4h4v-4m8 0v4h4v-4"/>', iconImg: 'icons/eq_mithril_helm.png', fx: u => u.stats.defence += 2 },
    { id: 'pike', label: '날카로운 창', cost: 40, desc: '힘 +1 · 영구 장착', icon: '<path d="M5 21 19 7m0 0-1-4 4-1-1 4-2 1z"/>', iconImg: 'icons/eq_pike.png', fx: u => u.stats.strength += 1 },
    { id: 'ranger_boots', label: '순찰자 장화', cost: 35, desc: '이동 +1″ · 영구 장착', icon: '<path d="M7 3v10l4 4h8a1 1 0 0 0 0-2l-5-2-1-6H9L8 3z"/>', iconImg: 'icons/eq_ranger_boots.png', fx: u => u.stats.move += 45 },
    { id: 'war_horn', label: '전쟁 뿔피리', cost: 30, desc: '용기 +2 · 영구 장착', icon: '<path d="M4 13c0-3 4-5 8-5h2l6-4v16l-6-4h-2c-4 0-8-2-8-5zM8 16l1 5"/>', iconImg: 'icons/relic_rohan_horn.png', fx: u => u.stats.courage += 2 },
    { id: 'bandage', label: '전장 붕대', cost: 30, once: true, needsInjury: true, desc: '즉시 사용 · 부상 해제', icon: '<path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z"/>', iconImg: 'icons/eq_bandage.png', fx: u => { u.injury = null; } },
    { id: 'gondor_shield', label: '곤도르 방패', cost: 55, desc: '방어 +1 · 용기 +1', icon: '<path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6zM12 7v10M8 10h8"/>', iconImg: 'icons/eq_gondor_shield.png', fx: u => { u.stats.defence += 1; u.stats.courage += 1; } },
    { id: 'war_gauntlets', label: '전투 건틀릿', cost: 85, desc: 'Attack +1 · 영구 장착', icon: '<path d="M7 21V11l5-8 5 8v10M7 15h10M10 8v4"/>', iconImg: 'icons/eq_gauntlets.png', fx: u => u.stats.attacks += 1 },
    { id: 'anduril', label: '안두릴', cost: 120, desc: '유니크 · 아라곤 전용 · Attack +1', iconImg: 'icons/relic_anduril.png', req: u => u.id === 'aragorn', fx: u => u.stats.attacks += 1 },
    { id: 'barrow_blade', label: '무덤의 칼', cost: 55, desc: '유니크 · 결투 +1 · 영구 장착', iconImg: 'icons/eq_barrow_blade.png', fx: u => u.stats.fight += 1 },
    { id: 'rohan_lance', label: '로한 기수 투창', cost: 60, desc: '기마 영웅 전용 · Attack +1', iconImg: 'icons/eq_rohan_lance.png', req: u => u.traits.includes('mounted'), fx: u => u.stats.attacks += 1 },
    { id: 'galadhrim_quiver', label: '갈라드림 화살통', cost: 50, desc: '궁수 영웅 전용 · 사거리 +1″', iconImg: 'icons/eq_galadhrim_quiver.png', req: u => u.stats.shootRange > 0, fx: u => u.stats.shootRange += 45 },
    { id: 'elven_cloak_eq', label: '갈라드림 수호망토', cost: 55, desc: '적 사격이 이 유닛에 명중 난도 +1', iconImg: 'icons/eq_elven_cloak.png', fx: u => u.evadeRanged = 1 },
    { id: 'mithril_shirt_eq', label: '미스릴 쇠사슬', cost: 150, desc: '유니크 · 방어 +1 · Fate +1', iconImg: 'icons/eq_mithril_shirt.png', fx: u => { u.stats.defence += 1; u.stats.fate = (u.stats.fate || 0) + 1; if (!u._shirtFate) { u._shirtFate = 1; u.resources && (u.resources.fate = (u.resources.fate || 0) + 1); } } },
    { id: 'galadriel_phial', label: '갈라드리엘의 병', cost: 110, desc: '치명상을 견디는 빛 · Fate +2', iconImg: 'icons/eq_galadriel_phial.png', fx: u => { u.stats.fate = (u.stats.fate || 0) + 2; if (!u._phialFate) { u._phialFate = 1; u.resources && (u.resources.fate = (u.resources.fate || 0) + 2); } } },
    { id: 'king_standard', label: '왕의 문장', cost: 90, desc: '용기 +2 · 영구 장착', iconImg: 'icons/eq_king_standard.png', fx: u => u.stats.courage += 2 },
    { id: 'glamdring', label: '글람드링', cost: 130, desc: '유니크 · 간달프 전용 · Attack +1', iconImg: 'icons/eq_glamdring.png', req: u => u.id === 'gandalf', fx: u => u.stats.attacks += 1 },
    { id: 'lembas', label: '엘프 빵 레메이스', cost: 60, once: true, needsWound: true, desc: '즉시 사용 · 상처 전부 회복', iconImg: 'icons/eq_lembas.png', fx: u => u.currentWounds = u.stats.wounds },
    { id: 'star_flower', label: '별의 꽃', cost: 35, desc: '용기 +1 · 영구 장착', iconImg: 'icons/eq_star_flower.png', fx: u => u.stats.courage += 1 },
    { id: 'dunedain_star', label: '두네다인의 별', cost: 65, desc: 'Might +1', iconImg: 'icons/eq_dunedain_star.png', fx: u => { if (!u._starM) { u._starM = 1; u.resources && (u.resources.might = (u.resources.might || 0) + 1); } } },
    { id: 'wizard_powder', label: '술사의 가루', cost: 55, desc: 'Will +1', iconImg: 'icons/eq_wizard_powder.png', fx: u => { if (!u._powW) { u._powW = 1; u.resources && (u.resources.will = (u.resources.will || 0) + 1); } } },
    { id: 'guardian_feather', label: '수호 깃털', cost: 70, desc: 'Fate +1', iconImg: 'icons/eq_guardian_feather.png', fx: u => { u.stats.fate = (u.stats.fate || 0) + 1; if (!u._gfeF) { u._gfeF = 1; u.resources && (u.resources.fate = (u.resources.fate || 0) + 1); } } },
    { id: 'lorien_arrow', label: '로스로리엔 화살', cost: 55, desc: '궁수 영웅 전용 · 명중 +1', iconImg: 'icons/eq_lorien_arrow.png', req: u => u.stats.shootRange > 0, fx: u => u.stats.shootValue = Math.max(2, u.stats.shootValue - 1) },
    { id: 'arrowhead', label: '연마 화살촉', cost: 60, desc: '궁수 영웅 전용 · 힘 +1', iconImg: 'icons/eq_arrowhead.png', req: u => u.stats.shootRange > 0, fx: u => u.stats.strength += 1 },
    { id: 'erebor_plate', label: '에레보르 도금 갑주', cost: 95, desc: '방어 +1 · 영구 장착', iconImg: 'icons/eq_erebor_plate.png', fx: u => u.stats.defence += 1 },
    { id: 'north_map', label: '북부 지도', cost: 40, desc: '이동 +0.7″ · 영구 장착', iconImg: 'icons/eq_north_map.png', fx: u => u.stats.move += 30 },
    { id: 'durin_axe', label: '두린의 룬도끼', cost: 95, desc: '유니크 · 힘 +1', iconImg: 'icons/eq_durin_axe.png', fx: u => u.stats.strength += 1 },
    { id: 'twin_knives', label: '엘프 쌍날검', cost: 110, desc: '유니크 · Attack +1', iconImg: 'icons/eq_twin_knives.png', fx: u => u.stats.attacks += 1 },
    { id: 'athelas_leaf', label: '아쓸라스 잎', cost: 55, once: true, needsWound: true, desc: '즉시 사용 · 상처 1 회복 + 부상 해제', iconImg: 'icons/eq_athelas_leaf.png', fx: u => { u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1); u.injury = null; } },
    { id: 'rohan_saddle', label: '로한 안장', cost: 60, desc: '기마 영웅 전용 · 이동 +1″', iconImg: 'icons/eq_rohan_saddle.png', req: u => u.traits.includes('mounted'), fx: u => u.stats.move += 45 },
    { id: 'dark_berry', label: '검은숲 열매', cost: 40, once: true, desc: '즉시 사용 · 용기 +2', iconImg: 'icons/eq_dark_berry.png', fx: u => u.stats.courage += 2 },
    { id: 'king_oath', label: '왕의 서약인장', cost: 50, once: true, desc: '즉시 사용 · Might 1 회복', iconImg: 'icons/eq_king_oath.png', fx: u => { u.resources && (u.resources.might = (u.resources.might || 0) + 1); } },
    { id: 'war_pennant', label: '울부짖는 전쟁깃', cost: 60, desc: '기마 영웅 전용 · 용기 +2', iconImg: 'icons/eq_war_pennant.png', req: u => u.traits.includes('mounted'), fx: u => u.stats.courage += 2 },
    { id: 'oath_stone', label: '난쟁이 서약돌', cost: 120, desc: '유니크 · 상처 +1', iconImg: 'icons/eq_oath_stone.png', fx: u => { u.stats.wounds += 1; } }
];
P.buyEquip = function (i, uid) {
    if (this.phase !== 'reward' || !['recruit', 'shop'].includes(this.campStep))
        return false;
    const a = LWB_EQUIP[i], u = this.unit(uid);
    if (!a || !u || u.side !== 'good' || !u.traits.includes('hero') || (a.req && !a.req(u)) || this.gold < this.dc(a.cost, 'master_flame'))
        return false;
    u.equipment = u.equipment || [];
    if (a.once) {
        if (a.needsWound && u.currentWounds >= u.stats.wounds)
            return false;
        if (a.needsInjury && !u.injury)
            return false;
        a.fx(u);
        this.gold -= this.dc(a.cost, 'master_flame');
        this.save();
        return true;
    }
    if (u.equipment.length >= 2 || u.equipment.includes(a.id))
        return false;
    u.equipment.push(a.id);
    this.gold -= this.dc(a.cost, 'master_flame');
    this.refreshUnit(u);
    this.save();
    return true;
};
P.sellEquip = function (i, uid) {
    const u = this.unit(uid), a = LWB_EQUIP[i];
    if (!a || !u || u.side !== 'good' || a.once || !(u.equipment || []).includes(a.id)) return false;
    u.equipment = u.equipment.filter(e => e !== a.id);
    const refund = Math.floor(this.dc(a.cost, 'master_flame') / 2);
    this.gold += refund;
    this.refreshUnit(u);
    this.emit('EquipSold', `${u.name} · ${a.label} 판매 · ${refund}금화`, { uid: u.uid });
    this.save();
    return true;
};
const TRAP_PACKS = [
    { label: '화살 투석기', cost: 55, type: 'ballista', desc: '가까운 적 3기 타격 · 다음 전투 1회', iconImg: 'icons/trap_ballista.png', icon: '<path d="M4 20h16M6 20l2-7h8l2 7M8 13l7-8 3 1-4 7M10 16h4"/>' },
    { label: '불통', cost: 40, type: 'firepot', desc: '범위 내 적 전체 1피해', iconImg: 'icons/trap_firepot.png', icon: '<path d="M12 21a5 5 0 0 1-5-5c0-3 3-4 3-7 2 1 3 3 3 5 1-1 1-2 1-3 2 2 3 4 3 5a5 5 0 0 1-5 5z"/>' },
    { label: '연발 투석기', cost: 95, type: 'scorpion', desc: '가까운 적 5기 타격', iconImg: 'icons/trap_scorpion.png', icon: '<path d="M4 20l8-8m0 0H8m4 0v4M9 5l3 3M15 3l-1 4M3 9l4 1"/>' },
    { label: '기름 통', cost: 70, type: 'oil', desc: '광역 화염 · 2피해', iconImg: 'icons/trap_oil.png', icon: '<path d="M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11z"/>' },
    { label: '화약통', cost: 35, type: 'barrel', desc: '광역 1피해 · 아군도 피해', iconImg: 'icons/trap_barrel.png', icon: '<path d="M6 4h12v16H6zM6 8h12M6 16h12M4 4h16M4 20h16"/>' },
    { label: '가시 함정', cost: 60, type: 'spike', desc: '적 2기 붙들기 · 이동 둔화', iconImg: 'icons/trap_spike.png', icon: '<path d="M4 20h16M6 20V12l2 8V9l3 11V7l3 13V10l2 10V12l2 8"/>' },
    { label: '짐승 덫', cost: 55, type: 'snare', desc: '가장 가까운 적 1기 · 상처 1 + 2라운드 속박', iconImg: 'icons/trap_snare.png', icon: '<path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm0 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm-1 3h2v4h-2z"/>' }
];
P.dc = function (base, relicId) { const r = this.rank ? this.rank(relicId) : 0; return r ? Math.max(5, Math.round(base * (1 - 0.25 * r))) : base; };
P.buyTrap = function (i) {
    if (this.phase !== 'reward' || !['recruit', 'shop'].includes(this.campStep))
        return false;
    const a = TRAP_PACKS[i];
    if (!a || this.gold < this.dc(a.cost, 'siege_wright'))
        return false;
    const _r = { ballista: [420, 260], scorpion: [420, 300], firepot: [140, 150], oil: [180, 200], barrel: [140, 160], spike: [160, 140], snare: [90, 100] }[a.type] || [140, 150];
    (this.devices = this.devices || []).push({ type: a.type, armed: true, x: 0, y: 0, trigger: _r[0], radius: _r[1] });
    this.gold -= this.dc(a.cost, 'siege_wright');
    this.save();
    return true;
};
P.checkTraps = function (u) {
    for (const d of this.devices || []) {
        if (!d.armed || ht(u, d) > d.trigger)
            continue;
        if (!d.neutral && u.side !== 'evil')
            continue;
        d.armed = false;
        const ag = this.alive('good').filter(v => v.traits.includes('hero'))[0] || this.alive('good')[0] || u;
        const hits = d.type === 'barrel'
            ? this.alive().filter(v => ht(v, d) <= d.radius)
            : d.type === 'ballista'
                ? this.alive('evil').filter(v => ht(v, d) <= d.radius).sort((a, b) => ht(a, d) - ht(b, d)).slice(0, 3)
                : d.type === 'scorpion'
                    ? this.alive('evil').filter(v => ht(v, d) <= d.radius).sort((a, b) => ht(a, d) - ht(b, d)).slice(0, 5)
                    : d.type === 'spike'
                        ? this.alive('evil').filter(v => ht(v, d) <= d.radius).sort((a, b) => ht(a, d) - ht(b, d)).slice(0, 2)
                        : d.type === 'snare'
                            ? this.alive('evil').filter(v => ht(v, d) <= d.radius).sort((a, b) => ht(a, d) - ht(b, d)).slice(0, 1)
                        : this.alive('evil').filter(v => ht(v, d) <= d.radius);
        hits.forEach(v => { this.inflict(ag, v, d.type === 'oil' ? 2 : 1); if (d.type === 'spike' && v.alive) v.roundBuff = { ...(v.roundBuff || {}), move: (v.roundBuff.move || 0) - 90 }; if (d.type === 'snare' && v.alive) v._snared = 2; });
        this.emit('Trap', (d.type === 'ballista' ? '투석기 발사' : d.type === 'scorpion' ? '연발 투석기 발사' : d.type === 'barrel' ? '화약통 폭발' : d.type === 'oil' ? '기름 화염' : d.type === 'spike' ? '가시 함정 발동 · 이동 둔화' : d.type === 'snare' ? '짐승 덫 발동 · 2라운드 속박' : '불통 폭발') + ' · ' + hits.length + '기 타격', { at: d });
    }
};
const ALLY_PACKS = [
    { label: '로한 기병대 ×2', cost: 80, ids: ['rohan_rider', 'rohan_rider'] },
    { label: '대독수리', cost: 60, ids: ['great_eagle'] },
    { label: '후온', cost: 90, ids: ['huorn'] },
    { label: '두네다인 순찰 ×2', cost: 70, ids: ['ranger_north', 'ranger_north'] },
    { label: '엘프 궁수 ×2', cost: 55, ids: ['elf_bow', 'elf_bow'] },
    { label: '철언덕 방벽병', cost: 55, ids: ['vault_warden'] },
    { label: '에오를의 아들들', cost: 85, ids: ['sons_of_eorl'] },
    { label: '망자 기병', cost: 120, ids: ['dead_rider'] },
    { label: '곤도르 기사', cost: 65, ids: ['gondor_knight'] },
    { label: '로한 근위기병', cost: 75, ids: ['rohan_royal_guard_mounted'] },
    { label: '엔트', cost: 130, ids: ['ent'] },
    { label: '베오른 (곰)', cost: 145, ids: ['beorn_bear'] },
    { label: '돌 암로스 백조기사', cost: 80, ids: ['dol_amroth_knight'] },
    { label: '카자드 근위병 ×2', cost: 100, ids: ['khazad_guard', 'khazad_guard'] },
    { label: '샘물수위병 ×2', cost: 90, ids: ['mt_fountain_guard', 'mt_fountain_guard'] }
];
P.buyAlly = function (i) {
    if (this.phase !== 'reward' || !['recruit', 'shop'].includes(this.campStep) || this.allyBought)
        return false;
    const a = ALLY_PACKS[i];
    if (!a || this.gold < this.dc(a.cost, 'white_pact'))
        return false;
    for (const id of a.ids) {
        if (!this.meta.has(id))
            continue;
        const u = this.spawn(id, 'good', { x: -1000, y: -1000 });
        u.temporary = true;
        u.autoAlly = true;
        this.placeInDeployment(u);
    }
    this.gold -= this.dc(a.cost, 'white_pact');
    this.allyBought = true;
    this.save();
    return true;
};
const LWB_PAIRS = [
    ['aragorn', 'legolas', '레골라스, 오늘도 내 곁에 있어 다행이다.'],
    ['gimli', 'legolas', '여전히 내가 앞서 있다, 엘프!'],
    ['frodo', 'samwise', '괜찮아, 샘. 조금만 더 가면 돼.'],
    ['merry', 'pippin', '메리, 우리가 어깨를 나란히 하는 날이 왔군.'],
    ['eowyn', 'merry', '함께 가자, 메리. 겁내지 말고.'],
    ['aragorn', 'boromir', '곤도르는 네가 있어 강하다, 보로미르.'],
    ['gandalf', 'aragorn', '서녘의 왕이여, 희망을 놓지 마라.'],
    ['haldir', 'legolas', '로리엔의 활이 서녘과 함께한다.'],
    ['faramir', 'boromir', '형, 곤도르를 위해.'],
    ['theoden', 'eowyn', '에오윈, 네 용기를 안다.'],
    ['eomer', 'theoden', '왕이여, 리더마크가 함께합니다.'],
    ['thorin', 'balin', '발린, 두린의 후예는 물러서지 않는다.'],
    ['elrond', 'glorfindel_foot', '리븐델의 빛이 아직 꺼지지 않았다.'],
    ['samwise', 'frodo', '프로도 님, 제가 업어 드리겠습니다.'],
    ['bard', 'dain', '호숫골과 철언덕은 한 뜻이다.'],
    ['beorn', 'beorning', '곰의 후예들이여, 숲을 지켜라.'],
    ['king_of_the_dead', 'aragorn', '맹세를 지켜라, 이실두르의 후예여.']
];
const LWB_ACH = [
    ['veteran', '전장의 베테랑', '한 유닛이 10처치'],
    ['survivor', '불굴의 생존자', '부상 3회를 견딘 유닛'],
    ['boss', '보스 처형인', '보스를 쓰러뜨림'],
    ['ally', '동맹의 힘', '동맹을 소환하고 스테이지 클리어'],
    ['marksman', '명사수', '사격 유닛이 8처치'],
    ['wave10', '장거리 원정', 'STAGE 10 도달'],
    ['hoard', '전리품 수집가', '금화 500 보유'],
    ['flawless', '무결의 방어', '전사자 없이 스테이지 클리어'],
    ['daily', '일일 도전자', '오늘의 도전 클리어'],
    ['collector', '유물 수집가', '유물 6종 보유'],
    ['slayer', '학살자', '원정 통산 100처치'],
    ['bondmaster', '파벌 결속', '파벌 결속 발동 (같은 파벌 아군 4기 이상)'],
    ['trapper', '함정 장인', '지형 장치 설치'],
    ['monster_hunter', '몬스터 사냥꾼', '몬스터 3기 처치'],
    ['dragon_slayer', '용 사냥꾼', '스마우그·글라우룽·앙칼라곤 처치'],
    ['promoted', '베테랑 승급', '병사가 베테랑으로 승급'],
    ['elite_bane', '엘리트 파괴자', '엘리트 적 5기 처치'],
    ['warlord', '대군주', '부대 12기 이상으로 원정'],
    ['relic_master', '유물 달인', '유물 12종 보유'],
    ['veteran_host', '백전 노장', '베테랑 5기 보유'],
    ['long_march', '먼 길을 온 자', '스테이지 20 도달'],
    ['hero_hunter', '영웅 사냥꾼', '한 전투에서 적 영웅 2기 처치'],
    ['treasury', '왕의 금고', '금화 1000 보유'],
    ['desperado', '절망의 생존자', '절망 난이도 STAGE 5 도달']
];
P.achievements = function () { try {
    return JSON.parse(localStorage.getItem('mesbg-achievements')) || {};
}
catch { return {}; } };
P.unlockAch = function (id) {
    const a = this.achievements();
    if (a[id])
        return;
    a[id] = Date.now();
    try { localStorage.setItem('mesbg-achievements', JSON.stringify(a)); }
    catch { }
    const t = LWB_ACH.find(x => x[0] === id);
    t && this.emit('Event', '업적 달성 — ' + t[1]);
};
P.checkAchievements = function () {
    const us = this.units.filter(u => u.side === 'good');
    if (us.some(u => u.kills >= 10))
        this.unlockAch('veteran');
    if (us.some(u => (u.injuryCount || 0) >= 3))
        this.unlockAch('survivor');
    if (us.some(u => u.stats?.shootRange && u.kills >= 8))
        this.unlockAch('marksman');
    if (this.wave >= 10)
        this.unlockAch('wave10');
    if ((this.gold || 0) >= 500)
        this.unlockAch('hoard');
    if (this.dailySeed)
        this.unlockAch('daily');
    if (this.allyBought)
        this.unlockAch('ally');
    if (this.current?.boss && !this.units.some(u => u.id === this.current.boss && u.alive))
        this.unlockAch('boss');
    if (this.current?.boss && ['smaug','glaurung','ancalagon'].includes(this.current.boss) && !this.units.some(u => u.id === this.current.boss && u.alive))
        this.unlockAch('dragon_slayer');
    if ((this.stageHeroKills || 0) >= 2)
        this.unlockAch('hero_hunter');
    if ((this.gold || 0) >= 1000)
        this.unlockAch('treasury');
    if (this.difficulty === 'despair' && this.wave >= 5)
        this.unlockAch('desperado');
    if (!(this.fallen || []).some(f => f.wave === this.wave))
        this.unlockAch('flawless');
    if (Object.keys(this.relics || {}).length >= 6)
        this.unlockAch('collector');
    if ((this.totalKills || 0) >= 100)
        this.unlockAch('slayer');
    if ((this.factionBonds ? this.factionBonds() : []).length >= 1)
        this.unlockAch('bondmaster');
    if ((this.devices || []).length)
        this.unlockAch('trapper');
    if ((this.stageMonsterKills || 0) >= 3)
        this.unlockAch('monster_hunter');
    if ((this.eliteKills || 0) >= 5)
        this.unlockAch('elite_bane');
    if (us.length >= 12)
        this.unlockAch('warlord');
    if (Object.keys(this.relics || {}).length >= 12)
        this.unlockAch('relic_master');
    if (us.filter(u => (u.traits || []).includes('veteran')).length >= 5)
        this.unlockAch('veteran_host');
    if (this.wave >= 20)
        this.unlockAch('long_march');
};
const LWB_EVT_ART = { refugees:'wanderer', strider:'wanderer', dunedain:'wanderer', ranger_way:'wanderer', lost_warrior:'wanderer', rider:'wanderer',
    shelob_lair:'darkforest', whispers:'darkforest', ents_song:'darkforest', huorns:'darkforest', ents:'darkforest', morgul_fog:'darkforest',
    osgiliath:'ruins', balin:'ruins', mazarbul:'ruins', monolith:'ruins', old_watchtower:'ruins', barrow_blade:'ruins', forgotten_shrine:'ruins', numenor_ruin:'ruins', numenor:'ruins', dwarf_vault:'ruins', argonath:'ruins',
    storm_watch:'storm', nightraid:'storm', mordor_ash:'storm', wargs_hunt:'storm', warg_track:'storm',
    mithril:'treasure', mithril_vein:'treasure', arsenal:'treasure', dwarf_market:'treasure', dwarf_pact:'treasure', dwarf_brewer:'treasure', dwarven_smith:'treasure', broken_cart:'treasure', lost_supply:'treasure', rohan_caravan:'treasure',
    nazgul:'dark', ring:'dark', gollum:'dark', saruman_voice:'dark', grima:'dark', palantir_dream:'dark', uruk_prisoner:'dark', goblin_scout:'dark', haradrim_spy:'dark',
    valar_grace:'light', lorien:'light', evenstar:'light', elven_harp:'light', elven_healer:'light', mirror:'light', white_blossom:'light', two_trees:'light', omen:'light', eagle_omen:'light', eagle:'light', eagle_eyrie:'light', priest:'light',
    breakfast:'feast', beorn_feast:'feast', beorn_guest:'feast', bombadil:'feast', minstrel:'feast', apothecary:'feast',
    council:'war', redarrow:'war', rohan_oath:'war', rohirrim_horn:'war', gondor_signal:'war', beacon_relief:'war', hornburg:'war',
    marshes:'marshes', dead_men_path:'marshes', emyn_muil:'marshes', beorning_hall:'feast', south_merchant:'treasure', isengard_smoke:'dark', argonath:'ruins', dead_marshes:'marshes', mithril_vein:'treasure' };
const LWB_EVENTS = [
    { id: 'refugees', title: '피난민 행렬', text: '곤도르 피난민 행렬이 성문을 지나치려 몰려듭니다.', options: [
        { label: '식량을 나눈다', sub: '금화 −15 · 아군 전원 용기 +1 (영구)', fx: q => { q.gold = Math.max(0, q.gold - 15); q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }); } },
        { label: '대열을 재촉한다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'arsenal', title: '훼손된 무기고', text: '성벽 아래 무기고가 침수되었습니다.', options: [
        { label: '수리에 비용을 쓴다', sub: '금화 −25', fx: q => q.gold = Math.max(0, q.gold - 25) },
        { label: '버리고 간다', sub: '무작위 아군 1기 Attack −1 (영구)', fx: q => { const u = q.alive('good').filter(u2 => u2.stats.attacks > 1); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.attacks = Math.max(1, t.baseStats.attacks - 1); q.refreshUnit(t); } return t ? `${t.name} Attack −1` : '대상 없음'; } }] },
    { id: 'omen', title: '전조의 별', text: '밤하늘에 서쪽의 별이 유난히 밝습니다.', options: [
        { label: '기도를 올린다', sub: '다음 전투 첫 라운드 우선권 확보', fx: q => q.priorityForce = 'good' },
        { label: '무시하고 행군한다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'mithril', title: '미스릴 파편', text: '쓰러진 기사의 갑옷 속에서 빛나는 금속 조각이 발견됩니다.', options: [
        { label: '유물로 벼려낸다', sub: '무작위 유물 1개 획득', fx: q => { const r = CX.relics[Math.floor(q.rng() * CX.relics.length)]; if (r) q.relics[r.id] = (q.relics[r.id] || 0) + 1; return r ? `유물 획득: ${r.name}(${CX.rarityNames[r.rarity]}) — ${r.text}` : '유물 없음'; } },
        { label: '상인에게 판다', sub: '금화 +45', fx: q => q.gold += 45 }] },
    { id: 'rider', title: '부상당한 기수', text: '로한 기수가 쓰러진 채 발견됩니다. 다음 전투에 대한 소식을 알고 있습니다.', options: [
        { label: '치료해준다', sub: '금화 −20 · 다음 라운드 CP +2', fx: q => { q.gold = Math.max(0, q.gold - 20); q.bonusCP += 2; } },
        { label: '지나친다', sub: '아무 일도 없다', fx: q => { } }] },
    { id: 'nightraid', title: '야영지 습격', text: '밤중에 워그 무리가 야영지를 기습합니다.', options: [
        { label: '흩어져 싸운다', sub: '무작위 아군 1기 상처 +1 · 금화 +50', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds = Math.min(t.stats.wounds, t.currentWounds + 1); q.gold += 50; return (t ? `${t.name} 상처 +1` : '피해 없음') + ' · 금화 +50'; } },
        { label: '전열을 지킨다', sub: '피해 없음', fx: q => { } }] },
    { id: 'priest', title: '성속의 사제', text: '백탑의 사제가 부상병들을 돌보겠다고 합니다.', cond: q => q.alive('good').some(u => u.currentWounds < u.stats.wounds), options: [
        { label: '전원 치료를 부탁한다', sub: '금화 −30 · 상처 입은 아군 전원 완치', fx: q => { q.gold = Math.max(0, q.gold - 30); q.alive('good').forEach(u => u.currentWounds = u.stats.wounds); } },
        { label: '가장 위독한 이만 부탁한다', sub: '상처 가장 큰 아군 1기 완치', fx: q => { const u = q.alive('good').filter(u2 => u2.currentWounds < u2.stats.wounds).sort((a, b) => (b.stats.wounds - b.currentWounds) - (a.stats.wounds - a.currentWounds))[0]; if (u) u.currentWounds = u.stats.wounds; return u ? `${u.name} 완치` : '대상 없음'; } }] },
    { id: 'valar_grace', title: '발라의 은총', text: '바람이 잠시 멈추고, 쓰러진 전우들의 이름이 야영지에 울립니다.', cond: q => q.fallen && q.fallen.length > 0, options: [
        { label: '영혼의 기도를 올린다', sub: '전사한 영웅 1명이 부활 (상처 1)', fx: q => { const f = q.fallen.shift(); if (!f) return '부활할 영웅 없음'; const u = q.units.find(u2 => u2.uid === f.uid); if (u) { u.alive = true; u.currentWounds = 1; u.feared = false; u.prone = false; q.refreshUnit(u); } else if (q.meta.has(f.id)) { const nu = q.spawn(f.id, 'good', { x: -1000, y: -1000 }); nu.currentWounds = 1; nu.kills = f.kills || 0; } return `${f.name || '영웅'} 부활`; } },
        { label: '그들의 명예를 기린다', sub: '금화 +25', fx: q => q.gold += 25 }] },
    { id: 'apothecary', title: '방랑 약제사', text: '낡은 가방을 멘 약제사가 부상병들을 살핍니다.', cond: q => q.alive('good').some(u => u.injury), options: [
        { label: '전원 수술을 부탁한다', sub: '금화 −40 · 부상 아군 전원 완치', fx: q => { q.gold = Math.max(0, q.gold - 40); q.alive('good').forEach(u => { if (u.injury) { for (const k in u.injuryBackup || {}) u.baseStats[k] = u.injuryBackup[k]; delete u.injury; delete u.injuryBackup; q.refreshUnit(u); } }); } },
        { label: '가장 심한 이만 부탁한다', sub: '부상 아군 1기 완치', fx: q => { const u = q.alive('good').filter(u2 => u2.injury)[0]; if (u) { for (const k in u.injuryBackup || {}) u.baseStats[k] = u.injuryBackup[k]; delete u.injury; delete u.injuryBackup; q.refreshUnit(u); } return u ? `${u.name} 부상 완치` : '대상 없음'; } }] },
    { id: 'council', title: '전쟁 회의', text: '파라미르의 척후병이 적의 배치도를 가져왔습니다.', options: [
        { label: '정찰을 강화한다', sub: '팔란티르 · 다음 전장의 적 편성 공개 (영구)', fx: q => q.relics.palantir = (q.relics.palantir || 0) + 1 },
        { label: '여비만 받는다', sub: '금화 +20', fx: q => q.gold += 20 }] },
    { id: 'monolith', title: '고대의 경계석', text: '누르의 왕들이 세운 경계석이 길가에 서 있습니다.', options: [
        { label: '묵상한다', sub: '무작위 아군 1기 결투 +1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; q.refreshUnit(t); } return t ? `${t.name} 결투 +1` : '대상 없음'; } },
        { label: '유물을 수거한다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'ring', title: '절대반지의 유혹', text: '주머니 깊은 곳의 반지가 마음을 무겁게 짓누릅니다. 한 번만, 아주 잠깐 쓴다면 전세를 뒤집을 수도 있습니다.', options: [
        { label: '유혹에 몸을 맡긴다', sub: '무작위 영웅 결투 +2 · 용기 −2 (영구)', fx: q => { const hs = q.alive('good').filter(u => Object.values(u.resources || {}).some(r => r > 0)); const pool = hs.length ? hs : q.alive('good'); const t = pool[Math.floor(q.rng() * pool.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 2; t.baseStats.courage = Math.max(0, (t.baseStats.courage || 0) - 2); q.refreshUnit(t); } return t ? `${t.name} 결투 +2 · 용기 −2` : '대상 없음'; } },
        { label: '반지를 거부한다', sub: '아군 전원 용기 +1 (영구)', fx: q => q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }) }] },
    { id: 'nazgul', title: '나즈굴의 추격', text: '검은 날개 짐승의 비명이 하늘을 가릅니다. 모두가 납작 엎드려 숨을 죽입니다.', options: [
        { label: '숨어서 지나가기를 기다린다', sub: '다음 전투 첫 라운드 아군 전원 이동 −2″', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -60 }) },
        { label: '빠르게 빠져나간다', sub: '금화 −20', fx: q => q.gold = Math.max(0, q.gold - 20) }] },
    { id: 'lorien', title: '로스로리엔의 선물', text: '은빛 나뭇잎 사이로 엘프 정령이 나타나 작은 선물을 건넵니다.', options: [
        { label: '렘바스 빵을 나눈다', sub: '상처 입은 아군 전원 상처 1 회복', fx: q => q.alive('good').forEach(u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1)) },
        { label: '엘프 망토를 받는다', sub: '무작위 아군 방어 +1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.defence = (t.baseStats.defence || 0) + 1; q.refreshUnit(t); } return t ? `${t.name} 방어 +1` : '대상 없음'; } }] },
    { id: 'marshes', title: '죽음의 늪지', text: '검은 물속에서 창백한 얼굴들이 눈을 뜨고 올려다봅니다. 촛불 같은 빛이 손짓합니다.', options: [
        { label: '빛을 외면하고 걷는다', sub: '다음 전투 첫 라운드 아군 전원 용기 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1 }) },
        { label: '늪지를 아는 자에게 길을 묻는다', sub: '금화 −15', fx: q => q.gold = Math.max(0, q.gold - 15) }] },
    { id: 'osgiliath', title: '오스길리아스의 폐허', text: '무너진 달의 돔 아래 잔해 속에 아직 쓸만한 것이 남아있을지 모릅니다 — 또는 매복이.', options: [
        { label: '폐허를 수색한다', sub: '행운 시험 · 금화 +50 또는 무작위 아군 상처 +1', fx: q => { if (q.rng() < 0.6) { q.gold += 50; return '행운 성공 — 금화 +50'; } const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds = Math.min(t.stats.wounds, t.currentWounds + 1); return t ? `실패 — ${t.name} 상처 +1` : '실패 — 피해 없음'; } },
        { label: '조심스레 우회한다', sub: '아무 일도 없다', fx: q => { } }] },
    { id: 'eagle', title: '대독수리의 소식', text: '과이히르의 후손이 먼 산 위를 선회하며 적의 움직임을 알려줍니다.', options: [
        { label: '정찰 정보를 받는다', sub: '팔란티르 획득 — 적 편성 공개 (영구)', fx: q => q.relics.palantir = (q.relics.palantir || 0) + 1 },
        { label: '희소식에 기세가 오른다', sub: '다음 전투 첫 라운드 아군 전원 이동 +1″', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: 30 }) }] },
    { id: 'mazarbul', title: '마자르불의 책', text: '낡은 책에 드워프의 마지막 기록이 남았습니다: “그들이 온다. 그들이 온다…”', options: [
        { label: '기록을 읽어 교훈을 얻는다', sub: '무작위 아군 결투 +1 · 용기 −1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; t.baseStats.courage = Math.max(0, (t.baseStats.courage || 0) - 1); q.refreshUnit(t); } return t ? `${t.name} 결투 +1 · 용기 −1` : '대상 없음'; } },
        { label: '책을 덮고 떠난다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'breakfast', title: '두 번째 아침식사', text: '호빗의 격언 — 아침을 두 번 먹는 자에게 하루는 든든합니다.', cond: q => q.alive('good').some(u => u.currentWounds < u.stats.wounds), options: [
        { label: '푸짐하게 차려낸다', sub: '금화 −8 · 상처 입은 아군 전원 상처 1 회복', fx: q => { q.gold = Math.max(0, q.gold - 8); q.alive('good').forEach(u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1)); } },
        { label: '건빵으로 때운다', sub: '금화 +5', fx: q => q.gold += 5 }] },
    { id: 'ents', title: '엔트의 경계', text: '느릅나무들이 오랜 침묵 끝에 부대를 물끄러미 내려다봅니다. 숲은 기억합니다.', options: [
        { label: '엔트의 축복을 받는다', sub: '무작위 아군 완치 · 방어 +1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.currentWounds = t.stats.wounds; t.baseStats.defence = (t.baseStats.defence || 0) + 1; q.refreshUnit(t); } return t ? `${t.name} 완치 · 방어 +1` : '대상 없음'; } },
        { label: '조용히 지나간다', sub: '아무 일도 없다', fx: q => { } }] }
    ,{ id: 'dunedain', title: '두네다인의 합류', text: '북부 순찰대가 캠프를 찾아왔습니다. 길 안내와 약속된 강철을 제안합니다.', options: [
        { label: '합류를 환영한다', sub: '금화 −20 · 무작위 아군 결투·힘 +1 (영구)', fx: q => { q.gold = Math.max(0, q.gold - 20); const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; t.baseStats.strength = (t.baseStats.strength || 0) + 1; q.refreshUnit(t); } return (t ? `${t.name} 결투·힘 +1` : '대상 없음') + ' · 금화 −20'; } },
        { label: '보급품만 나눈다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'redarrow', title: '붉은 화살', text: '로한의 붉은 화살이 도착했습니다 — 곤도르가 지원을 요청합니다.', options: [
        { label: '즉시 응한다', sub: '다음 전투 CP +2 · 금화 −10', fx: q => { q.gold = Math.max(0, q.gold - 10); q.bonusCP = (q.bonusCP || 0) + 2; } },
        { label: '지금은 무리다', sub: '다음 전투 첫 라운드 아군 전원 용기 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1 }) }] },
    { id: 'whispers', title: '나무들의 속삭임', text: '판고른의 나무들이 동요합니다. 나뭇잎의 소란이 적들의 야영지로 번져갑니다.', options: [
        { label: '소란을 번지게 한다', sub: '다음 전투 첫 라운드 적 전원 결투 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'fight', n: -1, side: 'evil' }) },
        { label: '지나친다', sub: '금화 +5', fx: q => q.gold += 5 }] },
    { id: 'hornburg', title: '헬름 협곡의 메아리', text: '협곡에서 돌아온 선포자가 전합니다 — 성벽 아래 적의 보급 마차를 노획할 수 있습니다.', options: [
        { label: '노획한다', sub: '금화 +35 · 다음 전투 첫 라운드 적 전원 이동 −1인치', fx: q => { q.gold += 35; (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -45, side: 'evil' }); } },
        { label: '노리지 않는다', sub: '아무 일도 없다', fx: q => { } }] }
    ,{ id: 'bombadil', title: '톰 봄바딜의 오두막', text: '노란 부츠와 노랫소리 — "딩동딜릴로!" 옛숲의 주인이 이방인들을 환영합니다.', options: [
        { label: '함께 쉬어간다', sub: '금화 −10 · 상처 입은 아군 전원 상처 1 회복', fx: q => { q.gold = Math.max(0, q.gold - 10); q.alive('good').forEach(u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1)); } },
        { label: '노래 선물을 받는다', sub: '아군 전원 용기 +1 (영구)', fx: q => q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }) }] },
    { id: 'balin', title: '발린의 무덤', text: '모리아의 기록실, 흩어진 뼈와 낡은 책. "그들이 온다" — 마지막 구절 아래 드워프의 유품이 남았습니다.', options: [
        { label: '유품을 수습한다', sub: '금화 +30', fx: q => q.gold += 30 },
        { label: '드워프의 맹세를 잇는다', sub: '무작위 아군 결투 +1 · 완치 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; t.currentWounds = t.stats.wounds; q.refreshUnit(t); } return t ? `${t.name} 결투 +1 · 완치` : '대상 없음'; } }] },
    { id: 'mirror', title: '갈라드리엘의 거울', text: '은빛 대야 속에 있었던 일, 있는 일, 그리고 올 수 있는 일이 어립니다.', options: [
        { label: '들여다본다', sub: '다음 전투 첫 라운드 적 전원 용기 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1, side: 'evil' }) },
        { label: '뒤돌아선다', sub: '금화 +20', fx: q => q.gold += 20 }] },
    { id: 'evenstar', title: '이븐스타의 부적', text: '새벽별의 빛이 담긴 은 부적 — 죽음의 시간조차 거슬러 돌려주는 자들의 표식입니다.', options: [
        { label: '영웅에게 건넨다', sub: '무작위 영웅 Fate +1 (영구)', fx: q => { const hs = q.alive('good').filter(u => u.traits.includes('hero')); const t = hs[Math.floor(q.rng() * hs.length)]; if (t) { t.baseStats.fate = (t.baseStats.fate || 0) + 1; t.resources.fate = (t.resources.fate || 0) + 1; } return t ? `${t.name} Fate +1` : '영웅 없음'; } },
        { label: '판매한다', sub: '금화 +40', fx: q => q.gold += 40 }] },
    { id: 'numenor', title: '누메노르의 유물', text: '바다 아래 가라앉은 왕국의 고대 강철이 흙 속에서 드러났습니다. 아직도 서쪽의 빛이 서려 있습니다.', options: [
        { label: '벼려 전사에게 준다', sub: '무작위 아군 Attack +1 (영구)', fx: q => { const u = q.alive('good').filter(x => (x.stats.attacks || 1) < 4); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.attacks = (t.baseStats.attacks || 1) + 1; q.refreshUnit(t); } return t ? `${t.name} Attack +1` : '대상 없음'; } },
        { label: '골동품 상인에게 판다', sub: '금화 +35', fx: q => q.gold += 35 }] },
    { id: 'gollum', title: '스메아골의 발자국', text: '진흙 위의 웃기는 발자국 — "우리 것!" 목소리가 멀어집니다. 끝까지 쫓을 수도, 무시할 수도 있습니다.', options: [
        { label: '끝까지 쫓는다', sub: '다음 전투 첫 라운드 적 전원 결투 −1 · 금화 +10', fx: q => { (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'fight', n: -1, side: 'evil' }); q.gold += 10; } },
        { label: '그냥 지나간다', sub: '아무 일도 없다', fx: q => { } }] },
    { id: 'minstrel', title: '방랑 음유시인', text: '오래된 노래가 캠프파이어 위로 떠오릅니다 — 나라 잃은 왕과, 다시 돌아올 왕의 노래.', options: [
        { label: '전부 경청한다', sub: '아군 전원 용기 +1 (영구)', fx: q => q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }) },
        { label: '주머니를 털어준다', sub: '금화 −5 · 무작위 아군 결투 +1 (영구)', fx: q => { q.gold = Math.max(0, q.gold - 5); const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; q.refreshUnit(t); } return (t ? `${t.name} 결투 +1` : '대상 없음') + ' · 금화 −5'; } }] },
    { id: 'grima', title: '회색 속삭임', text: '캠프 경계에서 의심의 속삭임이 들립니다 — "우리는 이미 졌다." 사기가 흔들립니다.', options: [
        { label: '속삭임을 끊는다', sub: '금화 −10', fx: q => q.gold = Math.max(0, q.gold - 10) },
        { label: '무시한다', sub: '무작위 영웅 용기 −1 (영구)', fx: q => { const hs = q.alive('good').filter(u => u.traits.includes('hero')); const t = hs[Math.floor(q.rng() * hs.length)]; if (t) { t.baseStats.courage = Math.max(0, (t.baseStats.courage || 0) - 1); q.refreshUnit(t); } return t ? `${t.name} 용기 −1` : '영웅 없음'; } }] }
    ,{ id: 'dwarven_smith', title: '드워프 대장장이', text: '길 위의 임시 대장간에서 드워프 장인이 갑주를 손보며 투덜댑니다 — "보자, 이걸로는 오크도 못 막겠군."', options: [
        { label: '갑주를 맡긴다', sub: '금화 −15 · 무작위 아군 방어 +1 (영구)', fx: q => { q.gold = Math.max(0, q.gold - 15); const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.defence = (t.baseStats.defence || 0) + 1; q.refreshUnit(t); } return (t ? `${t.name} 방어 +1` : '대상 없음') + ' · 금화 −15'; } },
        { label: '소매만 두드린다', sub: '금화 +5', fx: q => q.gold += 5 }] },
    { id: 'uruk_prisoner', title: '우루크 포로', text: '경계병이 우루크 정찰병 한 마리를 묶어 끌고 왔습니다. 녀석은 적의 진형을 알고 있습니다.', options: [
        { label: '심문한다', sub: '다음 전투 첫 라운드 우선권 확보', fx: q => q.priorityForce = 'good' },
        { label: '그 자리에서 처형한다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'shelob_lair', title: '쉘롭의 동굴', text: '검은 굴 입구에 끈적한 거미줄과… 병사들의 말린 유품이 보입니다. 안에는 전리품이 있을 수도.', options: [
        { label: '조심스레 들어간다', sub: '행운 시험 · 금화 +60 또는 무작위 아군 상처 +1', fx: q => { if (q.rng() < 0.55) { q.gold += 60; return '성공 — 금화 +60'; } const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds = Math.min(t.stats.wounds, t.currentWounds + 1); return t ? `쉘롭의 독 — ${t.name} 상처 +1` : '쉘롭의 독 — 피해 없음'; } },
        { label: '멀리 우회한다', sub: '아무 일도 없다', fx: q => { } }] },
    { id: 'haradrim_spy', title: '하라드림 첩자', text: '붉은 천을 두른 첩자가 캠프를 살피다 붙잡혔습니다. 그는 동쪽 군대의 사기가 떨어진다고 속삭입니다.', options: [
        { label: '정보를 캐낸다', sub: '금화 −10 · 다음 전투 첫 라운드 적 전원 용기 −1', fx: q => { q.gold = Math.max(0, q.gold - 10); (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1, side: 'evil' }); } },
        { label: '놓아준다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'beorn_feast', title: '베오른의 식탁', text: '커다란 꿀단지와 치즈가 쌓인 식탁 — 거대한 주인이 이방인들을 묵묵히 대접합니다.', options: [
        { label: '배불리 먹는다', sub: '금화 −12 · 상처 입은 아군 전원 상처 1 회복', fx: q => { q.gold = Math.max(0, q.gold - 12); q.alive('good').forEach(u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1)); } },
        { label: '꿀 선물을 받는다', sub: '무작위 아군 힘 +1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.strength = (t.baseStats.strength || 0) + 1; q.refreshUnit(t); } return t ? `${t.name} 힘 +1` : '대상 없음'; } }] },
    { id: 'elven_harp', title: '밤의 엘프 하프', text: '어둠 너머에서 가녀린 하프 소리가 들립니다 — 사라진 시대의 노래가 병사들의 눈물을 적십니다.', options: [
        { label: '끝까지 듣는다', sub: '무작위 영웅 Might +1 (영구)', fx: q => { const hs = q.alive('good').filter(u => u.traits.includes('hero')); const t = hs[Math.floor(q.rng() * hs.length)]; if (t) { t.baseStats.might = (t.baseStats.might || 0) + 1; t.resources.might = (t.resources.might || 0) + 1; } return t ? `${t.name} Might +1` : '영웅 없음'; } },
        { label: '조용히 자리를 뜬다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'rohan_oath', title: '로한 기사의 맹세', text: '로한의 기수들이 칼 위에 손을 얹고 맹세합니다 — "세오덴 왕의 이름으로, 내일의 전장은 우리의 것."', options: [
        { label: '맹세에 호응한다', sub: '다음 전투 첫 라운드 아군 전원 결투 +1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'fight', n: 1, side: 'good' }) },
        { label: '공물을 받는다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'morgul_fog', title: '모르굴 안개', text: '죽은 도시에서 넘어온 창백한 안개가 캠프를 감쌉니다. 안쪽에서 속삭임이 들립니다.', options: [
        { label: '안개를 뚫고 진군한다', sub: '다음 전투 첫 라운드 적 전원 용기 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1, side: 'evil' }) },
        { label: '밤새 경계 근무한다', sub: '무작위 아군 용기 −1 (영구) · 금화 +20', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.courage = Math.max(0, (t.baseStats.courage || 0) - 1); q.refreshUnit(t); } q.gold += 20; return (t ? `${t.name} 용기 −1` : '피해 없음') + ' · 금화 +20'; } }] },
    { id: 'gondor_signal', title: '곤도르의 신호등', text: '멀리 봉우리 위로 신호 불꽃이 이어집니다 — 지원군을 부르는 옛 신호. 응답할 수 있습니다.', options: [
        { label: '응답한다', sub: '금화 −15 · 다음 전투 CP +3', fx: q => { q.gold = Math.max(0, q.gold - 15); q.bonusCP = (q.bonusCP || 0) + 3; } },
        { label: '불을 끄고 지나간다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'barrow_blade', title: '무덤의 칼', text: '흙무덤 틈에서 청동빛 옛 칼이 반쯤 드러났습니다. 손에 쥐면 차가운 힘이 전해집니다.', options: [
        { label: '뽑아 쓴다', sub: '무작위 아군 Attack +1 · 용기 −1 (영구)', fx: q => { const u = q.alive('good').filter(x => (x.stats.attacks || 1) < 4); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.attacks = (t.baseStats.attacks || 1) + 1; t.baseStats.courage = Math.max(0, (t.baseStats.courage || 0) - 1); q.refreshUnit(t); } return t ? `${t.name} Attack +1 · 용기 −1` : '대상 없음'; } },
        { label: '제자리에 둔다', sub: '금화 +25', fx: q => q.gold += 25 }] }
    ,{ id: 'eagle_eyrie', title: '독수리의 둥지', text: '절벽 위 거대한 둥지에서 바람의 왕족이 아래를 내려다봅니다. 높은 곳의 눈은 모든 길을 압니다.', options: [
        { label: '정찰을 부탁한다', sub: '다음 전투 첫 라운드 적 전원 이동 −1″ (매복 노출)', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -45, side: 'evil' }) },
        { label: '어깨 빌려 멀리 본다', sub: '다음 전투 첫 라운드 아군 전원 이동 +1″', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: 45 }) }] },
    { id: 'dwarf_vault', title: '버려진 드워프 금고', text: '산허리 눈에 덮인 문틈 아래 룬 금고가 반쯤 열려 있습니다. 드워프는 떠났고 보물은 남았습니다.', options: [
        { label: '열어 본다', sub: '행운 시험 · 금화 +60 또는 무작위 아군 상처 +1', fx: q => { if (q.rng() < 0.6) { q.gold += 60; return '금고 개방 — 금화 +60'; } const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds = Math.min(t.stats.wounds, t.currentWounds + 1); return t ? `함정 작동 — ${t.name} 상처 +1` : '함정 — 피해 없음'; } },
        { label: '무게만 확인한다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'rohirrim_horn', title: '로한의 전쟁 뿔', text: '언덕 너머 기마대의 뿔소리가 울립니다. 로히림이 전투를 앞두고 서로의 용기를 북돋습니다.', options: [
        { label: '함께 울린다', sub: '다음 전투 첫 라운드 아군 기병 결투 +1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'fight', n: 1, side: 'good', trait: 'mounted' }) },
        { label: '말을 쉬게 한다', sub: '무작위 아군 완치', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds = t.stats.wounds; return t ? `${t.name} 완치` : '대상 없음'; } }] },
    { id: 'forgotten_shrine', title: '잊힌 제단', text: '덩굴에 파묻힌 돌제단, 아직 물이 마르지 않았습니다. 무엇을 섬기던 자리인지는 아무도 모릅니다.', options: [
        { label: '제물을 바친다', sub: '금화 −20 · 무작위 영웅 Might·Will +1 (영구)', fx: q => { q.gold = Math.max(0, q.gold - 20); const u = q.alive('good').filter(x => x.traits.includes('hero')); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.might = (t.baseStats.might || 0) + 1; t.baseStats.will = (t.baseStats.will || 0) + 1; q.refreshUnit(t); } return t ? `${t.name} Might·Will +1` : '영웅 없음'; } },
        { label: '제단물로 손을 씻는다', sub: '무작위 아군 상처 1 회복', fx: q => { const u = q.alive('good').filter(x => x.currentWounds < x.stats.wounds); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds += 1; return t ? `${t.name} 상처 1 회복` : '모두 온전함'; } }] },
    { id: 'wargs_hunt', title: '와르그의 사냥', text: '어둠 속에서 노란 눈동자 수십 개가 부대를 에워쌉니다. 살쾡이보다 큰 늑대들이 울부짖습니다.', options: [
        { label: '불로 몰아낸다', sub: '무작위 아군 상처 +1', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds = Math.min(t.stats.wounds, t.currentWounds + 1); return t ? `${t.name} 상처 +1` : '피해 없음'; } },
        { label: '미끼를 던지고 도망친다', sub: '금화 −15', fx: q => q.gold = Math.max(0, q.gold - 15) }] },
    { id: 'beacon_relief', title: '신호등의 지원군', text: '산꼭대기 불빛이 응답했습니다 — 곤도르 전령이 무기와 약초를 전달합니다.', options: [
        { label: '무기를 받는다', sub: '무작위 아군 힘 +1 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.strength = (t.baseStats.strength || 0) + 1; q.refreshUnit(t); } return t ? `${t.name} 힘 +1` : '대상 없음'; } },
        { label: '약초를 받는다', sub: '상처 입은 아군 1명 완치', fx: q => { const u = q.alive('good').filter(x => x.currentWounds < x.stats.wounds); const t = u[Math.floor(q.rng() * u.length)]; if (t) t.currentWounds = t.stats.wounds; return t ? `${t.name} 완치` : '모두 온전함'; } }] },
    { id: 'ranger_way', title: '레인저의 옛길', text: '이실리엔 순찰자들이 쓰던 은밀한 길을 발견했습니다. 발소리 없는 자들의 길은 가장 빠릅니다.', options: [
        { label: '길을 따라간다', sub: '다음 전투 첫 라운드 아군 전원 이동 +1″ · 적 전원 용기 −1', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: 45 }, { stat: 'courage', n: -1, side: 'evil' }) },
        { label: '숨어서 지나간다', sub: '다음 전투 첫 라운드 적 전원 이동 −1″', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -45, side: 'evil' }) }] },
    { id: 'dwarf_brewer', title: '드워프 양조가', text: '양조통을 멘 드워프가 야영지에 들어섭니다. "한 잔 마시면 내일 싸움이 두렵지 않을 걸세."', options: [
        { label: '벌꿀술을 나눠 마신다', sub: '다음 전투 아군 전원 용기 +1', fx: q => { (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: 1 }); return '다음 전투 아군 전원 용기 +1'; } },
        { label: '진한 곡물주를 산다', sub: '금화 −20 · 무작위 영웅 Might +1', fx: q => { if (q.gold < 20) return '금화가 부족합니다'; q.gold -= 20; const h = q.permanent().filter(u => u.traits.includes('hero')); const t = h[Math.floor(q.rng() * h.length)]; if (t) { t.baseStats.might = (t.baseStats.might || 0) + 1; q.refreshUnit(t); } return t ? t.name + '의 Might +1' : '영웅이 없습니다'; } }] },
    { id: 'lost_warrior', title: '길 잃은 전사', text: '부상 입은 방랑 전사가 비틀거리며 나타납니다. 무릎 꿇고 은인이 되어달라 합니다.', options: [
        { label: '치료해주고 보낸다', sub: '금화 +25 (이후의 보답)', fx: q => { q.gold += 25; return '그는 금화를 두고 떠났습니다'; } },
        { label: '부대에 합류시킨다', sub: '무작위 아군 병사 상처 1 회복 — 없으면 금화 +15', fx: q => { const w = q.permanent().filter(u => !u.traits.includes('hero') && u.currentWounds < u.stats.wounds); const t = w[Math.floor(q.rng() * w.length)]; if (t) { t.currentWounds = Math.min(t.stats.wounds, t.currentWounds + 1); q.refreshUnit(t); return t.name + '의 상처 1 회복'; } q.gold += 15; return '새 동료의 은혜 · 금화 +15'; } }] },
    { id: 'mithril_vein', title: '미스릴 광맥', text: '돌무덤 아래에서 푸르게 빛나는 광맥이 발견됐습니다. 깊이 파면 더 나오지만 위험합니다.', options: [
        { label: '조심스레 얕게 캔다', sub: '금화 +15', fx: q => { q.gold += 15; return '미스릴 조각 · 금화 +15'; } },
        { label: '깊이 파고든다', sub: '행운에 따라 금화 +60 또는 무작위 아군 상처 1', fx: q => { if (q.rng() < .55) { q.gold += 60; return '대박 · 금화 +60'; } const w = q.permanent().filter(u => u.alive); const t = w[Math.floor(q.rng() * w.length)]; if (t) { t.currentWounds = Math.max(1, t.currentWounds - 1); q.refreshUnit(t); return '붕괴! ' + t.name + ' 상처 −1'; } return '붕괴 — 다행히 다친 이가 없습니다'; } }] },
    { id: 'elven_healer', title: '떠도는 엘프 치유사', text: '실버 로브의 치유사가 야영지를 지나갑니다. 노래 한 자락이면 상처가 아뭅니다.', options: [
        { label: '부상병을 맡긴다', sub: '무작위 부상 아군의 부상 해제 — 없으면 상처 2 회복', fx: q => { const inj = q.permanent().filter(u => u.injury); if (inj.length) { const t = inj[Math.floor(q.rng() * inj.length)]; t.injury = 0; return t.name + '의 부상 해제'; } const w = q.permanent().filter(u => u.alive && u.currentWounds < u.stats.wounds); const t = w[Math.floor(q.rng() * w.length)]; if (t) { t.currentWounds = Math.min(t.stats.wounds, t.currentWounds + 2); q.refreshUnit(t); return t.name + '의 상처 2 회복'; } return '아무도 아프지 않습니다'; } },
        { label: '예물로 감사한다', sub: '금화 −15 · 무작위 아군 용기 +1 영구', fx: q => { if (q.gold < 15) return '금화가 부족합니다'; q.gold -= 15; const w = q.permanent(); const t = w[Math.floor(q.rng() * w.length)]; if (t) { t.baseStats.courage = (t.baseStats.courage || 0) + 1; q.refreshUnit(t); return t.name + '의 용기 +1 영구'; } return '영향 없음'; } }] },
    { id: 'storm_watch', title: '폭풍 전야', text: '검은 구름이 머리 위로 모입니다. 폭풍은 적에게도 아군에게도 공평하게 불리합니다.', options: [
        { label: '폭풍 속을 걷는다', sub: '다음 전투 양측 전원 이동 −1″ · 금화 +20', fx: q => { q.gold += 20; (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -45 }, { stat: 'move', n: -45, side: 'evil' }); } },
        { label: '비를 피해 늦어진다', sub: '다음 전투 첫 라운드 아군 전원 이동 −2″', fx: q => (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -90 }) }] },
    { id: 'beorn_guest', title: '베오른의 손님', text: '넓은 오두막에서 거대한 인물이 양떼 꿀빵을 나눕니다. "내 안에서 밤을 지새우든, 들판에서 자든."', options: [
        { label: '오두막에서 쉰다', sub: '아군 전원 완치', fx: q => { q.alive('good').forEach(u => u.currentWounds = u.stats.wounds); return '따뜻한 벽난로 옆 — 전원 완치'; } },
        { label: '짐을 나눠준다', sub: '금화 +30', fx: q => { q.gold += 30; return '베오른이 밀가루와 치즈를 실어줬습니다 · 금화 +30'; } }] },
    { id: 'numenor_ruin', title: '누메노르의 잔해', text: '검은 현무암 기둥 아래, 왕들의 별이 새겨진 석판이 있습니다. 촉촉한 곳에 묻힌 유물의 기운이 남아 있습니다.', options: [
        { label: '석판을 읽는다', sub: '무작위 영웅 Will +1 (영구)', fx: q => { const h = q.permanent().filter(u => u.traits.includes('hero')); const t = h[Math.floor(q.rng() * h.length)]; if (t) { t.baseStats.will = (t.baseStats.will || 0) + 1; q.refreshUnit(t); } return t ? t.name + ' Will +1' : '영웅이 없습니다'; } },
        { label: '유물 조각을 챙긴다', sub: '다음 유물 선택지에서 희귀 이상 1개 확정', fx: q => { q.nextRelicRare = true; return '다음 유물 선택에 희귀 이상 보장'; } }] },
    { id: 'goblin_scout', title: '고블린 정찰병', text: '덤불 속에서 고블린 하나가 부대를 지켜보다 걸렸습니다. 발이 묶인 채 찍찍거립니다.', options: [
        { label: '위치를 심문한다', sub: '다음 전투 적 전원 용기 −1', fx: q => { (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1, side: 'evil' }); return '고블린이 불었습니다'; } },
        { label: '주머니를 뒤진다', sub: '금화 +20', fx: q => { q.gold += 20; return '녹슨 금화를 챙겼습니다 · 금화 +20'; } }] },
    { id: 'eagle_omen', title: '독수리의 조짐', text: '해질녘 하늘을 거대한 독수리가 날아 지나갑니다. 병사들이 침묵 속에 그림자를 올려다봅니다.', options: [
        { label: '조짐을 따른다', sub: '다음 전투 첫 라운드 CP +2', fx: q => { q.bonusCP += 2; return '상서로운 조짐 · 다음 전투 첫 라운드 CP +2'; } },
        { label: '경계를 강화한다', sub: '다음 전투 적 기습 무효', fx: q => { q.noAmbushNext = true; return '경계 강화 · 다음 전투 기습 무효'; } }] },    { id: 'rohan_caravan', title: '로한 상인 행렬', text: '에도라스로 향하던 상인 행렬이 야영지에 들릅니다.', options: [
        { label: '말을 한 필 산다', sub: '금화 −40 · 무작위 도보 영웅 기마 획득', fx: q => { q.horses = (q.horses||0)+1; return '말 획득 · 정비 시 기마 전환 가능'; } },
        { label: '물자를 산다', sub: '금화 −25 · 금화 상점 장비 1개 무료', fx: q => { const a = LWB_EQUIP[Math.floor(q.rng()*LWB_EQUIP.length)]; const u = q.alive('good')[Math.floor(q.rng()*q.alive('good').length)]; if(u&&a){u.equipment=u.equipment||[];if(u.equipment.length<2&&!u.equipment.includes(a.id)){u.equipment.push(a.id);q.refreshUnit(u);return `${u.name} · ${a.label||a.id} 획득`;}} return '장비 없음'; } },
        { label: '길 안내를 받는다', sub: '다음 전투 적 기습 무효', fx: q => { q.noAmbushNext = true; return '정찰 보고 · 기습 무효'; } }] },
    { id: 'dwarf_pact', title: '드워프 용병단', text: '철언덕 용병들이 계약을 제안합니다.', options: [
        { label: '고용한다', sub: '금화 −60 · 다음 전투 아군 전원 방어 +1', fx: q => { q.gold=Math.max(0,q.gold-60); q.nextRoundBuffs=(q.nextRoundBuffs||[]).concat([{stat:'defence',n:1,side:'good'}]); return '드워프 용병 고용 · 다음 전투 전열 방어 +1'; } },
        { label: '거절한다', sub: '금화 +10 (그들이 팁을 둠)', fx: q => { q.gold+=10; } }] },
    { id: 'palantir_dream', title: '팔란티르의 꿈', text: '한 병사가 악몽에 시달립니다. 꿈속에서 적의 진형을 보았다고 합니다.', options: [
        { label: '믿는다', sub: '다음 전투 우선권 확보 · 그 병사 용기 −1', fx: q => { q.priorityForce='good'; const u=q.alive('good')[Math.floor(q.rng()*q.alive('good').length)]; if(u){u.baseStats.courage=Math.max(1,(u.baseStats.courage||0)-1);q.refreshUnit(u);} return '선제 정보 획득 · 대가로 용기 −1'; } },
        { label: '꿈을 무시한다', sub: '아무 일도 없다', fx: q => {} }] },
    { id: 'broken_cart', title: '전복된 마차', text: '길 한가운데 상인의 마차가 뒤집혀 있습니다. 짐이 흩어져 있습니다.', options: [
        { label: '짐을 주워준다', sub: '금화 +30 (사례금)', fx: q => { q.gold += 30; return '상인의 사례 · 금화 +30'; } },
        { label: '품을 판다', sub: '무작위 아군 1기 부상', fx: q => { const u=q.alive('good')[Math.floor(q.rng()*q.alive('good').length)]; if(u&&!u.injury){u.injury='leg';q.refreshUnit(u);return `${u.name} 부상 (다리)`;} return '다친 이 없음'; } }] },
    { id: 'dwarf_market', title: '난쟁이 상회', text: '에레보르 상인들이 무기와 갑주를 펼쳐 보입니다.', options: [
        { label: '판금을 산다', sub: '금화 −35 · 무작위 아군 방어 +1 (영구)', fx: q => { if(q.gold<35)return '금화 부족'; q.gold-=35; const u=q.alive('good')[Math.floor(q.rng()*q.alive('good').length)]; if(u){u.baseStats.defence+=1;q.refreshUnit(u);return `${u.name} 방어 +1`;} return '대상 없음'; } },
        { label: '수리를 맡긴다', sub: '금화 −20 · 부상 1기 해제', fx: q => { if(q.gold<20)return '금화 부족'; const u=q.alive('good').find(x=>x.injury); if(!u)return '부상자 없음'; q.gold-=20; u.injury=null;q.refreshUnit(u); return `${u.name} 부상 해제`; } }] },
    { id: 'old_watchtower', title: '폐허의 보초탑', text: '무너진 감시탑이 적의 동향을 엿보기에 좋은 위치입니다.', options: [
        { label: '올라가 살핀다', sub: '다음 전투 적 기습 무효', fx: q => { q.noAmbushNext=true; return '적진 관측 · 기습 무효'; } },
        { label: '탑 안을 뒤진다', sub: '무작위 유물 1개 획득', fx: q => { const r=CX.relics[Math.floor(q.rng()*CX.relics.length)]; if(r)q.relics[r.id]=(q.relics[r.id]||0)+1; return r?`유물 획득: ${r.name}`:'유물 없음'; } }] },
    { id: 'warg_track', title: '와르그의 발자국', text: '캠프 주변에 커다란 발굽 자국이 남아 있습니다. 추적자를 내보낼 수 있습니다.', options: [
        { label: '끝까지 추적한다', sub: '금화 +35 · 무작위 아군 상처 1', fx: q => { q.gold+=35; const u=q.alive('good')[Math.floor(q.rng()*q.alive('good').length)]; if(u){u.currentWounds=Math.max(0,u.currentWounds-1);return `${u.name} 와르그 사냥 성공 · 상처 1`;} return '금화 +35'; } },
        { label: '경계를 강화한다', sub: '다음 전투 적 용기 −1', fx: q => { (q.nextRoundBuffs=q.nextRoundBuffs||[]).push({stat:'courage',n:-1,side:'evil'}); return '경계 강화 · 적 용기 −1'; } }] },
    { id: 'lost_supply', title: '버려진 보급 수레', text: '길가에 주인 없는 곤도르 보급 수레가 서 있습니다.', options: [
        { label: '식량을 챙긴다', sub: '무작위 부상 아군 1기 완치', fx: q => { const w=q.alive('good').filter(u=>u.injury),t=w[Math.floor(q.rng()*w.length)]; if(!t)return '부상자 없음'; t.injury=null;q.refreshUnit(t); return `${t.name} 완치`; } },
        { label: '마차를 개조한다', sub: '스테이지마다 대독수리 지원 유물 획득 시도', fx: q => { q.gold+=20; return '부품 회수 · 금화 +20'; } }] },
    { id: 'strider', title: '방랑자의 발자국', text: '길가 비탈에서 담뱃대를 문 방랑자가 부대를 지켜봅니다. 풀잎에 남은 발자국은 원정대가 가려던 길과 같습니다.', options: [
        { label: '그의 길을 따른다', sub: '다음 전투 첫 라운드 아군 이동 +1½″', fx: q => { (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: 45 }); return '레인저의 길 · 이동 +1½″'; } },
        { label: '경계를 유지한다', sub: '다음 전투 적 기습 무효', fx: q => { q.noAmbushNext = true; return '경계 유지 · 기습 무효'; } }] },
    { id: 'gollum', title: '물가의 웅크린 그림자', text: '물가 바위 뒤에서 웅크린 무언가가 찰싹거리며 사라집니다. 비린내와 함께 두 갈래 발자국.', options: [
        { label: '추적한다', sub: '행운 시험 · 금화 +40 또는 무작위 아군 상처 +1', fx: q => { if (q.rng() < 0.55) { q.gold += 40; return '추적 성공 · 금화 +40'; } const t = q.alive('good')[Math.floor(q.rng() * q.alive('good').length)]; if (t) t.currentWounds = Math.max(1, t.currentWounds - 1); return t ? `습격당함 — ${t.name} 상처` : '습격 · 피해 없음'; } },
        { label: '놔두고 행군한다', sub: '아무 일도 없다', fx: q => { } }] },
    { id: 'ents_song', title: '엔트의 노래', text: '숲 깊은 곳에서 낮고 느린 노랫소리가 울려옵니다. 병사들은 무슨 말인지 모르지만 왠지 마음이 가라앉습니다.', options: [
        { label: '노래에 귀 기울인다', sub: '아군 전원 용기 +1 (영구)', fx: q => { q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }); return '온후름 노래 · 용기 +1'; } },
        { label: '서둘러 숲을 빠져나간다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'huorns', title: '헤라그림의 행진', text: '밤사이 나무들이 움직였습니다. 그림자 나무들이 부대 주위에 모여 있고, 사이로 무언가가 걸어다닙니다.', options: [
        { label: '나무들을 존중하며 지나간다', sub: '다음 전투 첫 라운드 아군 용기 +2', fx: q => { (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: 2 }); return '헤라그림의 호의 · 용기 +2'; } },
        { label: '장작을 채취한다', sub: '무작위 아군 1기 힘 +1 · 용기 −1 (영구)', fx: q => { const t = q.alive('good')[Math.floor(q.rng() * q.alive('good').length)]; if (t) { t.baseStats.strength = (t.baseStats.strength || 0) + 1; t.baseStats.courage = Math.max(0, (t.baseStats.courage || 0) - 1); q.refreshUnit(t); } return t ? `${t.name} 힘 +1 · 용기 −1` : '대상 없음'; } }] },
    { id: 'white_blossom', title: '흰나무의 꽃봉오리', text: '돌무덤 틈에서 작은 흰 꽃이 피어 있습니다. 시들어가는 왕성의 후예가 마지막 봄을 맞이합니다.', options: [
        { label: '꽃을 아끼며 기도한다', sub: '상처 입은 아군 전원 상처 1 회복', fx: q => { q.alive('good').forEach(u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1)); return '흰나무의 축복 · 전원 회복'; } },
        { label: '꽃잎을 거둔다', sub: '무작위 유물 1개 획득', fx: q => { const r = CX.relics[Math.floor(q.rng() * CX.relics.length)]; if (r) q.relics[r.id] = (q.relics[r.id] || 0) + 1; return r ? `유물 획득: ${r.name}` : '유물 없음'; } }] },
    { id: 'mordor_ash', title: '모르도르의 화산재', text: '북동쪽에서 화산재가 비처럼 내립니다. 병사들이 기침하며 하늘을 올려다봅니다 — 적도 똑같이 고통받고 있습니다.', options: [
        { label: '재를 뚫고 전진한다', sub: '다음 전투 양층 모두 이동 −1″', fx: q => { (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -45 }, { stat: 'move', n: -45, side: 'evil' }); return '화산재 · 양층 이동 감소'; } },
        { label: '재가 가라앉길 기다린다', sub: '금화 +15', fx: q => q.gold += 15 }] },
    { id: 'argonath', title: '아르곤나스의 그림자', text: '강변 절벽에 거대한 왕의 석상 두 기가 내려다봅니다. 손바닥을 편 경고 속에 왕의 위엄이 살아 있습니다.', options: [
        { label: '왕의 그림자 아래 맹세한다', sub: '무작위 아군 결투 +1 (영구)', fx: q => { const t = q.alive('good')[Math.floor(q.rng() * q.alive('good').length)]; if (t) { t.baseStats.fight = (t.baseStats.fight || 0) + 1; q.refreshUnit(t); } return t ? `${t.name} 결투 +1` : '대상 없음'; } },
        { label: '잔해에서 파편을 수거한다', sub: '금화 +30', fx: q => q.gold += 30 }] },
    { id: 'saruman_voice', title: '귀에 속삭이는 목소리', text: '어디선가 달콤하고 설득적인 목소리가 들립니다 — "항복하면 살려주겠다. 무릎 꿇어라."', options: [
        { label: '목소리를 뿌리친다', sub: '용기 시험 · 성공 시 전원 용기 +1, 실패 시 다음 전투 용기 −1', fx: q => { if (q.rng() < 0.6) { q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }); return '극복 성공 · 용기 +1'; } (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'courage', n: -1 }); return '동요함 · 다음 전투 용기 −1'; } },
        { label: '귀를 막고 행군한다', sub: '다음 전투 첫 라운드 이동 −1″', fx: q => { (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'move', n: -45 }); return '우회 행군 · 이동 감소'; } }] },
    { id: 'dead_men_path', title: '망자의 길목', text: '발 아래 돌들이 속삭이고, 어두운 회색 형체들이 모퉁이를 배회합니다. 둔하로우 밑 망자의 길.', options: [
        { label: '망자에게 경의를 표한다', sub: '용기 시험 · 성공 시 전원 결투 +1, 실패 시 용기 −2', fx: q => { if (q.rng() < 0.5) { q.alive('good').forEach(u => { u.baseStats.fight = (u.baseStats.fight || 0) + 1; q.refreshUnit(u); }); return '망자의 축복 · 결투 +1'; } q.alive('good').forEach(u => { u.baseStats.courage = Math.max(0, (u.baseStats.courage || 0) - 2); q.refreshUnit(u); }); return '공포에 질림 · 용기 −2'; } },
        { label: '해빛 길로 우회한다', sub: '금화 +20', fx: q => q.gold += 20 }] },
    { id: 'two_trees', title: '두 나무의 기억', text: '몽상에서 오래된 두 나무가 함께 빛났습니다 — 라우렐린의 금빛과 텔페리온의 은빛이 잎사귀마다 남아 있습니다.', options: [
        { label: '꿈의 빛을 간직한다', sub: '무작위 유물 1개 획득', fx: q => { const r = CX.relics[Math.floor(q.rng() * CX.relics.length)]; if (r) q.relics[r.id] = (q.relics[r.id] || 0) + 1; return r ? `유물 획득: ${r.name}` : '유물 없음'; } },
        { label: '전우들에게 꿈을 들려준다', sub: '아군 전원 용기 +1 (영구)', fx: q => { q.alive('good').forEach(u => { u.baseStats.courage = (u.baseStats.courage || 0) + 1; q.refreshUnit(u); }); return '두 나무의 이야기 · 용기 +1'; } }] },
    { id: 'emyn_muil', title: '엠인 무일의 길잡이', text: '뒤틀린 바위 미궁에서 작은 움직임이 포착됩니다 — 어디선가 골룸의 노랫소리가 들립니다.', options: [
        { label: '흔적을 추적한다', sub: '다음 전투 매복 무력화', fx: q => { q.noAmbushNext = true; return '매복 경로를 미리 간파했습니다'; } },
        { label: '무시하고 지나간다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'beorning_hall', title: '베오르닝의 환대', text: '안돼인 골짜기의 대장간에서 베오른 일족이 원정대를 맞이합니다.', options: [
        { label: '함께 쉬어간다', sub: '금화 −15 · 아군 전원 상처 1 회복', fx: q => { q.gold = Math.max(0, q.gold - 15); q.alive('good').forEach(u => u.currentWounds = Math.min(u.stats.wounds, u.currentWounds + 1)); } },
        { label: '벌꿀주를 선물받는다', sub: '무작위 아군 용기 +2 (영구)', fx: q => { const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.baseStats.courage = (t.baseStats.courage || 0) + 2; q.refreshUnit(t); } return t ? t.name + ' 용기 +2' : '대상 없음'; } }] },
    { id: 'south_merchant', title: '남쪽 상인', text: '하라드 방향에서 온 상인이 신기한 물건들을 펼쳐 보입니다.', options: [
        { label: '희귀품을 산다', sub: '금화 −40 · 무작위 유물 1개 획득', fx: q => { q.gold = Math.max(0, q.gold - 40); const r = CX.relics[Math.floor(q.rng() * CX.relics.length)]; if (r) q.relics[r.id] = (q.relics[r.id] || 0) + 1; return r ? '유물 획득: ' + r.name : '유물 없음'; } },
        { label: '소식을 나눈다', sub: '금화 +5', fx: q => q.gold += 5 }] },
    { id: 'isengard_smoke', title: '이센가드의 연기', text: '서쪽 하늘에 검은 연기 기둥이 피어오릅니다 — 전쟁의 그림자가 다가옵니다.', options: [
        { label: '경계를 강화한다', sub: '다음 전투 CP +2', fx: q => { q.bonusCP = (q.bonusCP || 0) + 2; } },
        { label: '신속히 통과한다', sub: '금화 +10', fx: q => q.gold += 10 }] },
    { id: 'argonath', title: '아르고나스의 그림자', text: '강 양쪽에 옛 왕들의 거상이 서 있습니다. 지나는 이들의 마음을 울리는 기백이 느껴집니다.', options: [
        { label: '왕들에게 경의를 표한다', sub: '다음 전투 첫 라운드 아군 전원 결투 +1', fx: q => { (q.nextRoundBuffs = q.nextRoundBuffs || []).push({ stat: 'fight', n: 1, side: 'good' }); } },
        { label: '서둘러 하류로 나아간다', sub: '금화 +8', fx: q => q.gold += 8 }] },
    { id: 'dead_marshes', title: '죽음의 늪 불빛', text: '늪 위로 창백한 불빛이 일렁입니다. 이끌리면 물 아래 얼굴들이 기다립니다.', options: [
        { label: '불빛을 따라간다', sub: '용기 시험 — 성공 +12금 · 실패 무작위 아군 상처 1', fx: q => { if (q.rng() < .5) { q.gold += 12; return '불빛을 물리쳤다 · +12금'; } const u = q.alive('good'); const t = u[Math.floor(q.rng() * u.length)]; if (t) { t.currentWounds = Math.max(1, (t.currentWounds || 1) - 1); return `${t.name} 상처 1`; } return '대상 없음'; } },
        { label: '길을 돌아 피해간다', sub: '금화 +5', fx: q => q.gold += 5 }] },
    { id: 'mithril_vein', title: '버려진 광산', text: '난쟁이들이 버려둔 광맥에서 은빛 광석이 희미하게 빛납니다.', options: [
        { label: '채굴에 시간을 쓴다', sub: '금화 +40', fx: q => q.gold += 40 },
        { label: '지나치고 행군한다', sub: '금화 +5', fx: q => q.gold += 5 }] },
];
P.rollCampEvent = function () {
    this.rng || (this.rng = Ne(Date.now()));
    const pool = LWB_EVENTS.filter(e => !e.cond || e.cond(this));
    this.campEvent = pool[Math.floor(this.rng() * pool.length)] || null;
    this.campResult = null;
};
P.chooseEvent = function (i) {
    if (this.phase !== 'reward' || this.campStep !== 'event' || !this.campEvent)
        return false;
    const op = this.campEvent.options[i];
    if (!op)
        return false;
    const beforeRelics = Object.assign({}, this.relics);
    const result = op.fx ? op.fx(this) : '';
    const resultText = typeof result === 'string' && result ? result : '선택 완료';
    this.campResult = (this.campResult ? this.campResult + ' · ' : '') + `${this.campEvent.title} — ${op.label}` + ` → ${resultText}`;
    this.emit('CampEvent', this.campResult);
    const gainedRelics = Object.keys(this.relics || {}).filter(id => (this.relics[id] || 0) > (beforeRelics[id] || 0));
    this.eventOutcome = { title: this.campEvent.title, label: op.label, result: resultText, relics: gainedRelics };
    this.campEvent = null;
    this.campDraft = null;
    this.save();
    return true;
};
const __lwbResume = P.resume;
P.resume = function () {
    const r = __lwbResume.apply(this, arguments);
    if (this.campStep === 'event' && !this.campEvent && !this.eventOutcome)
        this.rollCampEvent();
    return r;
};
P.recruit = function (i) {
    const offer = this.recruitOffers[i];
    if (this.phase !== 'reward' || this.campStep !== 'recruit' || !offer || offer.bought || this.permanent().length >= this.capacity() || this.gold < this.price(offer.id))
        return false;
    const u = this.spawn(offer.id, 'good', { x: -1000, y: -1000 });
    if (!this.placeInDeployment(u)) {
        this.units.pop();
        return false;
    }
    this.gold -= this.price(offer.id);
    offer.bought = true;
    this.save();
    return true;
};
P.rerollCost = function () { const _rr = this.rank && this.rank('lords_letter') ? 2 : 1; return Math.max(5, Math.round((10 + this.rerolls * 5) / _rr)); };
P.reroll = function () { const _rr = this.rank && this.rank('lords_letter') ? 2 : 1; const cost = Math.max(5, Math.round((10 + this.rerolls * 5) / _rr)); if (this.phase !== 'reward' || this.campStep !== 'recruit' || this.gold < cost)
    return false; this.gold -= cost; this.rerolls++; this.initialDraft ? this.rollInitialRecruits() : this.rollRecruits(); this.save(); return true; };
P.expand = function () { const cost = 45 + this.capacityBought * 25; if (this.phase !== 'reward' || this.gold < cost || this.capacity() >= 30)
    return false; this.gold -= cost; this.capacityBought++; this.save(); return true; };
function relicFamily(id) {
    if(['horseshoe','eohere_horn','rohan_standard','rohan_shield','rohan_lance','shadowfax'].includes(id))return '기병';
    if(['quiver','arrow','elven_feather','elf_bow','cloak','haradrim_bow','harad_dart','ranger_cloak'].includes(id))return '사격';
    if(['banner','westfold_shield','dwarf_axe','ithilien_blade','durin_axe','morannon_pike','gondor_tabard','mithril_mail','sting'].includes(id))return '전열';
    if(['horn','phial','narsil','silmaril','vilya','warbanner','anduril_hilt','barahir_ring','elessar','evenstar'].includes(id))return '영웅';
    if(['alliance_standard','fellowship_flag','edain_banner'].includes(id))return '전열';
    if(['lembas','mithril','narya','nenya','second_breakfast','athelas','pipeweed','miruvor'].includes(id))return '생존';
    return '원정';
}
P.rollRelics = function () {
    if (STAGE_BOSSES[this.wave] || (this.difficulty === 'despair' && this.wave % 4 === 0)) this.nextRelicRare = true;
    const pool = CX.relics.filter(r => r.rarity !== 3 || !this.rank(r.id));
    const weighted = pool.map(r => ({ id: r.id, family: relicFamily(r.id), k: -Math.log(Math.max(.00001, this.rng())) / [1, .75, .42, Math.min(.32, .035 + this.wave * .015)][r.rarity] }));
    weighted.sort((a, b) => a.k - b.k);
    const picks = [], families = new Set(), N=3+this.rank('keys_erebor');
    for (const r of weighted) if (!families.has(r.family)) { picks.push(r.id); families.add(r.family); if(picks.length===N)break; }
    for (const r of weighted) if(picks.length<N&&!picks.includes(r.id))picks.push(r.id);
    if (this.nextRelicRare) {
        this.nextRelicRare = false;
        const _rr = weighted.find(r => CX.relics.find(x => x.id === r.id).rarity >= 1 && !picks.includes(r.id));
        if (_rr) picks[0] = _rr.id;
    }
    this.relicChoices = picks;
};
P.chooseRelic = function (id) {
    if (this.phase !== 'reward' || this.campStep !== 'relic' || (id !== 'pass' && !(this.relicChoices || []).includes(id)) || this.chosenRelic)
        return false;
    if (id === 'pass') {
        this.gold += 25;
        this.lastGold += 25;
        this.chosenRelic = 'pass';
        this.campResult = (this.campResult ? this.campResult + ' · ' : '') + '유물 패스 — 금화 +25';
        this.campDraft = null;
        this.campStep = 'ready';
        this._chalPool = CHALLENGES.slice().sort(() => (this.rng ? this.rng() : Math.random()) - .5).slice(0, 3).map(c => c.id);
        this.save();
        return true;
    }
    this.relics[id] = (this.relics[id] || 0) + 1;
    this.chosenRelic = id;
    const r = CX.relics.find(x => x.id === id);
    if (r)
        this.campResult = (this.campResult ? this.campResult + ' · ' : '') + `유물 획득: ${r.name} — ${r.text}`;
    this.campDraft = null;
    this.campStep = 'ready';
    this._chalPool = CHALLENGES.slice().sort(() => (this.rng ? this.rng() : Math.random()) - .5).slice(0, 3).map(c => c.id);
    for (const u of this.alive())
        this.refreshUnit(u);
    this.save();
    return true;
};
P.selectCampChoice = function (key) {
    if (this.phase !== 'reward') return false;
    const step = this.campStep;
    if (step === 'event' ? !this.campEvent?.options[Number(key)] : step === 'relic' ? (key !== 'pass' && !(this.relicChoices || []).includes(key)) : true) return false;
    this.campDraft = this.campDraft?.step === step && this.campDraft.key === key ? null : {step, key};
    this.save(); return true;
};
P.confirmCampChoice = function () {
    const d = this.campDraft;
    if (!d || d.step !== this.campStep || this.phase !== 'reward') return false;
    return d.step === 'event' ? this.chooseEvent(Number(d.key)) : this.chooseRelic(d.key);
};
P.leaveCamp = function () { if (this.phase !== 'reward' || this.campStep !== 'ready')
    return false; this.campResult = null; this.units = this.units.filter(u => u.side === 'good' && u.alive && !u.temporary); this.prepareStage(); this._retrySnapshot = { wave: this.wave, cleared: this.cleared, gold: this.gold, relics: structuredClone(this.relics), fallen: structuredClone(this.fallen || []), units: structuredClone(this.units), devices: structuredClone(this.devices || []) }; this.save(); return true; };
P.retryStage = function () {
    const s = this._retrySnapshot;
    if (!s || this.phase !== 'result' || s.gold < 60)
        return false;
    Object.assign(this, { wave: s.wave, cleared: s.cleared, gold: Math.max(0, s.gold - 60), relics: structuredClone(s.relics), fallen: structuredClone(s.fallen), units: structuredClone(s.units), devices: structuredClone(s.devices) });
    this.result = '';
    this.round = 0;
    this.capture = 0;
    this.selected = '';
    this.prepareStage();
    this.save();
    this.emit('Preparation', '재도전 — 같은 스테이지를 다시 준비합니다. (금화 −60)');
    return true;
};
P.retreatStage = function () {
    const s = this._retrySnapshot;
    if (!s || !['preparation', 'move', 'shoot', 'fight'].includes(this.phase) || s.gold < 40)
        return false;
    Object.assign(this, { wave: s.wave, cleared: s.cleared, gold: Math.max(0, s.gold - 40), relics: structuredClone(s.relics), fallen: structuredClone(s.fallen), units: structuredClone(s.units), devices: structuredClone(s.devices) });
    this.result = '';
    this.round = 0;
    this.capture = 0;
    this.selected = '';
    this.events = [];
    this.fightQueue = [];
    this.nextRoundBuffs = [];
    this.roundBuffs = [];
    this.prepareStage();
    this.save();
    this.emit('Preparation', '후퇴 — 스테이지 처음 상태로 돌아갑니다. (금화 −40)');
    return true;
};
P._saveState = function () {
    const keys = ['gold', 'relics', 'capacityBought', 'totalKills', 'mithrilSpent', 'wave', 'cleared', 'units', 'counter', 'mode', 'best', 'campStep', 'campEvent', 'nextRoundBuffs', 'recruitOffers', 'relicChoices', 'chosenRelic', 'rerolls', 'lastGold', 'recruitDraft', 'initialDraft', 'horses', 'campDraft', 'campResult', 'eventOutcome', 'priorityForce', 'bonusCP', 'fallen', 'difficulty', 'armyName', 'allyBought', 'dailySeed', 'devices', 'weeklySeed', 'bonusId', 'escortCart', 'nextRelicRare', 'noAmbushNext', 'stageDeaths', 'stageHeroKills', 'stageShootKills', 'stageChargeKills', 'stageCavKills', 'stageMonsterKills', 'stageHeroSlayer', 'stageEliteKills', 'stageKills', 'challenge', 'eliteKills'];
    const state = { version: CX.version };
    for (const k of keys)
        state[k] = this[k];
    state.phase = this.phase;
    return state;
};
P.save = function () {
    if (!['reward', 'preparation'].includes(this.phase))
        return;
    try {
        localStorage.setItem('mesbg-endless-save', JSON.stringify(this._saveState()));
    }
    catch { }
};
P.saveSlot = function (n) {
    if (!['reward', 'preparation'].includes(this.phase))
        return false;
    try {
        localStorage.setItem('mesbg-endless-slot-' + n, JSON.stringify(this._saveState()));
        return true;
    }
    catch { return false; }
};
P.slotInfo = function (n) {
    try {
        const s = JSON.parse(localStorage.getItem('mesbg-endless-slot-' + n));
        return s && s.version === CX.version ? { wave: s.wave, gold: s.gold, count: (s.units || []).filter(u => u.alive && u.side === 'good').length, difficulty: s.difficulty, mapIndex: s.mapIndex } : null;
    }
    catch { return null; }
};
P.resume = function () { try {
    const s = JSON.parse(localStorage.getItem('mesbg-endless-save'));
    if (s?.version !== CX.version || !Array.isArray(s.units) || !s.units.some(u => u.alive && u.side === 'good'))
        return false;
    Object.assign(this, s);
    this.events = [];
    this.log = [];
    this.terrain = structuredClone(ee);
    this.activeMoverUid = '';
    this.selected = this.alive('good')[0].uid;
    this.rng = Ne(this.dailySeed || Date.now());
    if (s.phase === 'preparation')
        this.prepareStage();
    return true;
}
catch {
    return false;
} };
const baseResume=P.resume;
P.resume=function(){
    if (this.bonusId) this.bonusObjective = BONUS_OBJECTIVES.find(o => o.id === this.bonusId) || null;
    if(!baseResume.call(this))return false;
    for(const u of this.units){const m=this.meta.get(u.id);if(!m)continue;
        u.radius=$t[m.base]||$t.M;
        u.visualRadius=m.visualRadius||u.radius;
        u.artScale=m.artScale||1;
    }
    return true;
};
const oldEndRun = P.endRun;
P.endRun = function (won, msg) { oldEndRun.call(this, won, msg); if (typeof wt !== 'undefined' && wt.fanfare) wt.fanfare(won); if (won) this.checkAchievements(); try {
    localStorage.removeItem('mesbg-endless-save');
    if (this.dailySeed) try { const k = 'mesbg-daily-' + this.dailySeed; if ((this.wave || 0) > (Number(localStorage.getItem(k)) || 0)) localStorage.setItem(k, String(this.wave)); } catch (e) { }
    if (this.weeklySeed) try { const k = 'mesbg-weekly-' + this.weeklySeed; if ((this.wave || 0) > (Number(localStorage.getItem(k)) || 0)) localStorage.setItem(k, String(this.wave)); } catch (e) { }
}
catch { } };
P.resumeSlot = function (n) {
    try {
        const s = localStorage.getItem('mesbg-endless-slot-' + n);
        if (!s)
            return false;
        localStorage.setItem('mesbg-endless-save', s);
        return this.resume();
    }
    catch { return false; }
};
P.rotate = function (uid, degrees) { const u = this.unit(uid); if (!u || this.phase !== 'move' || !this.canAct(u) || this.engaged(u))
    return false; u.angle = (u.angle + degrees) % 360; return true; };
P.move = function (uid, to, target) {
    const u = this.unit(uid), v = this.unit(target);
    if (v?.traits.includes('terror') && u && !u.terrorTested && !u.protected && !(this.rank('phial') && this.alive(u.side).some(a => a.traits.includes('hero') && ht(a, u) < 270 + 45 * (this.rank('phial') - 1)))) {
        u.terrorTested = true;
        const score = Lt(this.rng) + Lt(this.rng) + u.stats.courage;
        if (score < (v.id === 'balrog' ? 12 : 10)) {
            u.feared=!0;this.emit('Terror', `${u.name} · 공포 검사 실패${v.id === 'balrog' ? ' — 모르고스의 그림자 앞에서' : ''}, 돌격 불가`, { uid: u.uid });
            this.finishActivation(u);
            return false;
        }
    }
    return oldMove.call(this, uid, to, target);
};
P.skillReason = function (u) { const s = u && CX.skills[u.id]; if (!s)
    return '고유 능력 없음'; if (this.phase !== 'move' && this.phase !== 'shoot' && this.phase !== 'fight')
    return '전투 중 사용'; if (this.side !== u.side && this.phase !== 'fight')
    return '아군 차례에 사용'; if (u.skillRound)
    return '이번 라운드 사용 완료'; if (u.resources[s[1]] < s[2])
    return `${s[1] === 'will' ? 'Will' : 'Might'} 부족`; return ''; };
Object.assign(CX.skills, {
    eowyn: ['나는 남자가 아니다', 'might', 1, 'Attack +1, 결투 +1, 주변 공포 유닛 결투 −1.', { self: { attacks: 1, fight: 1 } }],
    eomer: ['로히림의 돌격', 'might', 1, '이번 라운드 기병 아군 결투 +1, 이동 +90.', { ally: { trait: 'mounted', stats: { fight: 1, move: 90 } } }],
    faramir: ['레인저 대장', 'might', 1, '이번 라운드 정밀 사격 3회.', { shots: 3 }],
    imrahil: ['돌 암로스의 기사', 'might', 1, '이번 라운드 기병 아군 결투 +1, 이동 +90.', { ally: { trait: 'mounted', stats: { fight: 1, move: 90 } } }],
    haldir: ['로리엔 궁대', 'might', 1, '이번 라운드 정밀 사격 3회.', { shots: 3 }],
    galadriel: ['네냐의 빛', 'will', 2, '주변 아군 Defense +2, 공포 면역.', { ally: { stats: { defence: 2 }, protect: 1 } }],
    elendil: ['나르실의 주인', 'might', 1, '이번 라운드 Attack +1, 힘 +1.', { self: { attacks: 1, strength: 1 } }],
    fingolfin: ['모르고스를 향한 도전', 'might', 1, '이번 라운드 Attack +1, 결투 +2.', { self: { attacks: 1, fight: 2 } }],
    feanor: ['불의 영혼', 'might', 1, '이번 라운드 Attack +2.', { self: { attacks: 2 } }],
    beren: ['인간의 용기', 'might', 1, '이번 라운드 결투 +1, 용기 +3.', { self: { fight: 1, courage: 3 } }],
    luthien: ['베렌의 노래', 'will', 2, '8인치 적 이동 −90.', { foe: { r: 480, stats: { move: -90 } } }],
    thranduil: ['어둠숲의 왕', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    celeborn: ['로리엔의 군주', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    beorn: ['곰의 변신', 'might', 1, '이번 라운드 힘 +2, Attack +1.', { self: { strength: 2, attacks: 1 } }],
    beorning: ['변신', 'might', 1, '이번 라운드 힘 +2, Attack +1.', { self: { strength: 2, attacks: 1 } }],
    frodo: ['프로도의 용기', 'will', 1, '용기 +3, 공포 면역.', { self: { courage: 3 }, selfFlags: ['protected'] }],
    samwise: ['샘의 충성', 'might', 1, '이번 라운드 용기 +3, Attack +1.', { self: { courage: 3, attacks: 1 } }],
    merry: ['펠렌노르의 호빗', 'might', 1, '이번 라운드 용기 +2, Attack +1.', { self: { courage: 2, attacks: 1 } }],
    pippin: ['성문 수위의 호빗', 'might', 1, '이번 라운드 용기 +2, Attack +1.', { self: { courage: 2, attacks: 1 } }],
    bilbo: ['운명의 행운', 'fate', 1, '이번 라운드 Defense +1, 용기 +2.', { self: { defence: 1, courage: 2 } }],
    mt_captain: ['백탑의 지휘', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    nazgul_sword: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    nazgul_sword_2: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    nazgul_mace: ['검은 숨결', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    nazgul_mounted: ['검은 기수의 압박', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    dwimmerlaik: ['의지의 마수', 'will', 1, '8인치 적 용기 −2.', { foe: { r: 480, stats: { courage: -2 } } }],
    khamul: ['동쪽의 그림자', 'will', 1, '8인치 내 적 결투 −1.', { foe: { r: 480, stats: { fight: -1 } } }],
    mouth_of_sauron: ['사우론의 입', 'will', 1, '8인치 적 용기 −2.', { foe: { r: 480, stats: { courage: -2 } } }],
    lurtz: ['우르크 출사표', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    sharku: ['워그 전주', 'might', 1, '6인치 내 기병 이동력 +60.', { ally: { r: 360, trait: 'mounted', stats: { move: 60 } } }],
    uruk_captain: ['우르크의 전진', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    orc_captain: ['오크장의 호령', 'might', 1, '주변 아군 결투 +1.', { ally: { stats: { fight: 1 } } }],
    orc_taskmaster: ['채찍질', 'might', 1, '6인치 내 아군 이동력 +45.', { ally: { r: 360, stats: { move: 45 } } }],
    goblin_king: ['고블린 왕의 명령', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    bolg: ['볼그의 분노', 'might', 1, '이번 라운드 힘 +1, Attack +1.', { self: { strength: 1, attacks: 1 } }],
    easterling_warlord: ['동부인의 규율', 'might', 1, '6인치 내 아군 결투 +1, Defense +1.', { ally: { r: 360, stats: { fight: 1, defence: 1 } } }],
    harad_chieftain: ['하라드의 전장 함성', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    king_of_the_dead: ['저주받은 왕의 서약', 'will', 1, '8인치 내 적 용기 −2.', { foe: { r: 480, stats: { courage: -2 } } }],
    grima: ['구레나물의 혀', 'will', 1, '10인치 내 가장 강한 적 Attack −1.', { foeStrongest: { attacks: -1 } }],
    radagast: ['갈색의 요술사', 'will', 2, '6인치 내 상처 입은 아군 2기 회복.', { heal: { r: 360, n: 2 } }],
    barrow_wight: ['고대 무덤의 냉기', 'will', 1, '8인치 내 적 이동력 −45.', { foe: { r: 480, stats: { move: -45 } } }],
    melkor: ['철왕좌의 주인', 'will', 2, '가장 가까운 적 3기에 각각 1 상처.', { strike: { r: 450, n: 3, dmg: 1 } }],
    witchking_foot: ['검은 낙인', 'will', 1, '8인치 적 결투 −1, 이동 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    witchking_foot_mace: ['검은 낙인', 'will', 1, '8인치 적 결투 −1, 이동 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    witchking_mounted: ['검은 낙인', 'will', 1, '8인치 적 결투 −1, 이동 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    muzgur: ['모르굴의 강령술', 'will', 1, '8인치 내 적 결투 −1, 이동력 −90.', { foe: { r: 480, stats: { fight: -1, move: -90 } } }],
    aragorn_mounted: ['왕의 귀환', 'might', 1, '이번 라운드 Attack +2.', { self: { attacks: 2 } }],
    gandalf_mounted: ['눈부신 빛', 'will', 2, '주변 아군 Defense +2, 공포 면역.', { ally: { stats: { defence: 2 }, protect: 1 } }],
    thranduil_mounted: ['어둠숲의 왕', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    bard: ['검은 화살', 'might', 1, '정밀 사격 3회, 가장 가까운 적 상처 1.', { shots: 3, strike: { r: 600, n: 1, dmg: 1 } }],
    tauriel: ['왕실 경비대의 활', 'might', 1, '이번 라운드 정밀 사격 2회.', { shots: 2 }],
    beleg: ['쿠말리온', 'might', 1, '이번 사격 단계 최대 3발.', { shots: 3 }],
    turin: ['구르탕', 'might', 1, '이번 라운드 Attack +1, 힘 +1.', { self: { attacks: 1, strength: 1 } }],
    azog: ['창백한 오크의 명령', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    necromancer: ['돌굴두르의 주인', 'will', 2, '8인치 적 결투 −1, 용기 −2.', { foe: { r: 480, stats: { fight: -1, courage: -2 } } }],
    gil_galad: ['아에글로스', 'might', 1, '이번 라운드 Attack +1, 결투 +2.', { self: { attacks: 1, fight: 2 } }],
    arwen: ['운도미엘의 별빛', 'will', 1, '가장 상처 큰 아군 1명 상처 1 회복.', { heal: { r: 450, n: 1 } }],
    cirdan: ['회색 항구의 주인', 'will', 1, '가장 상처 큰 아군 1명 상처 1 회복.', { heal: { r: 450, n: 1 } }],
    gamling: ['로한의 기수', 'might', 1, '6인치 내 기병 결투 +1.', { ally: { r: 360, trait: 'mounted', stats: { fight: 1 } } }],
    halbarad: ['왕의 군기', 'might', 1, '6인치 내 아군 결투 +1, 용기 +1.', { ally: { r: 360, stats: { fight: 1, courage: 1 } } }],
    beregond: ['성채 근위', 'might', 1, '이번 라운드 Defense +2.', { self: { defence: 2 } }],
    elladan: ['엘론드의 쌍둥이', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    elrohir: ['엘론드의 쌍둥이', 'might', 1, '이번 라운드 Attack +1, 결투 +1.', { self: { attacks: 1, fight: 1 } }],
    grimbeorn: ['곰 가문의 분노', 'might', 1, '이번 라운드 힘 +1, Attack +1.', { self: { strength: 1, attacks: 1 } }],
    suladan: ['뱀 군주의 전군', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    shagrat: ['시릿 웅골의 책임자', 'might', 1, '이번 라운드 Attack +1, 용기 +2.', { self: { attacks: 1, courage: 2 } }],
    gorbag: ['모르굴의 순찰대장', 'might', 1, '이번 라운드 Attack +1, 용기 +2.', { self: { attacks: 1, courage: 2 } }],
    boldog: ['오크 전장군', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    thorin: ['오큰실드', 'might', 1, '이번 라운드 Defense +1, 결투 +1.', { self: { defence: 1, fight: 1 } }],
    mahud_chieftain: ['마후드 전쟁 경적', 'might', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }],
    forlong: ['늙은 도끼', 'might', 1, '이번 라운드 Attack +1.', { self: { attacks: 1 } }],
    mablung: ['이실리엔 척후대장', 'might', 1, '이번 라운드 정밀 사격 3회.', { shots: 3 }],
    rumil: ['로리엔의 명궁', 'might', 1, '추가 사격 2회.', { shots: 2 }],
    orophin: ['로리엔의 화살', 'might', 1, '이번 라운드 정밀 사격 3회.', { shots: 3 }],
    turgon: ['곤돌린의 왕', 'might', 1, '이번 라운드 결투 +1, Defense +2.', { self: { fight: 1, defence: 2 } }],
    ecthelion: ['샘물의 군주', 'might', 1, '이번 라운드 결투 +2, 힘 +1.', { self: { fight: 2, strength: 1 } }],
    fingon: ['핑곤의 기상', 'might', 1, '이번 라운드 결투 +1, 용기 +2.', { self: { fight: 1, courage: 2 } }],
    maedhros: ['마이드로스의 분노', 'might', 1, '이번 라운드 결투 +1, Attack +1.', { self: { fight: 1, attacks: 1 } }],
    celegorm: ['위대한 사냥꾼', 'might', 1, '이번 라운드 Attack +1, 힘 +1.', { self: { attacks: 1, strength: 1 } }],
    finrod_felagund: ['노래 대결', 'will', 1, '6인치 내 적 용기 −1, 결투 −1.', { foe: { r: 360, stats: { courage: -1, fight: -1 } } }],
    tuor: ['울모의 축복', 'will', 1, '이번 라운드 Defense +1, 용기 +2.', { self: { defence: 1, courage: 2 } }],
    hurin_thalion: ['아우레 엔툴루바', 'might', 1, '이번 라운드 Attack +2, 결투 +1.', { self: { attacks: 2, fight: 1 } }],
    thingol: ['은빛 왕의 위엄', 'might', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }],
    tom_bombadil: ['봄바딜의 노래', 'will', 1, '6인치 내 적 이동 −90, 결투 −1.', { foe: { r: 360, stats: { move: -90, fight: -1 } } }],
    goldberry: ['강의 딸의 노래', 'will', 1, '6인치 내 아군 상처 1 회복.', { heal: { r: 360, n: 1 } }],
    isildur: ['나르실의 일격', 'might', 1, '이번 라운드 결투 +2, Attack +1.', { self: { fight: 2, attacks: 1 } }],
    denethor: ['집정관의 명령', 'might', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }],
    dain: ['붉은 도끼', 'might', 1, '이번 라운드 결투 +1, Attack +1.', { self: { fight: 1, attacks: 1 } }],
    fili: ['두린의 혈통', 'might', 1, '이번 라운드 결투 +1, 용기 +2.', { self: { fight: 1, courage: 2 } }],
    kili: ['젊은 사냥꾼', 'might', 1, '이번 라운드 결투 +1, Attack +1.', { self: { fight: 1, attacks: 1 } }],
    balin: ['모리아의 군주', 'might', 1, '6인치 내 아군 결투 +1.', { ally: { r: 360, stats: { fight: 1 } } }],
    dwalin: ['드왈린의 쌍도끼', 'might', 1, '이번 라운드 Attack +2.', { self: { attacks: 2 } }],
    gloin: ['에레보르의 불꽃', 'might', 1, '이번 라운드 힘 +1, 결투 +1.', { self: { strength: 1, fight: 1 } }],
    erestor: ['리븐델의 자문', 'might', 1, '6인치 내 아군 용기 +1.', { ally: { r: 360, stats: { courage: 1 } } }],
    lindir: ['리븐델의 노래', 'will', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }],
    damrod: ['레인저 부대장', 'might', 1, '이번 라운드 정밀 사격 2회.', { shots: 2 }],
    duinhir: ['검은뿌리 골짜기 매복', 'might', 1, '주변 아군 명중 필요값 −1.', { ally: { stats: { shootValue: -1 } } }],
    elfhelm: ['에도라스 기마대장', 'might', 1, '이번 라운드 기병 아군 결투 +1.', { ally: { trait: 'mounted', stats: { fight: 1 } } }],
    erkenbrand: ['웨스트폴드의 주인', 'might', 1, '주변 아군 결투 +1.', { ally: { stats: { fight: 1 } } }],
    ugluk: ['이센가드의 선봉', 'might', 1, '이번 라운드 결투 +1, Attack +1.', { self: { fight: 1, attacks: 1 } }],
    mauhur: ['매복의 선두', 'might', 1, '이번 라운드 이동 +120, 결투 +1.', { self: { move: 120, fight: 1 } }],
    vrasku: ['쇠뇌 대장', 'might', 1, '추가 사격 2회.', { shots: 2 }],
    dark_marshal: ['앙그마르의 장막', 'will', 1, '6인치 내 적 결투 −1.', { foe: { r: 360, stats: { fight: -1 } } }],
    shadow_lord: ['그림자 포위', 'will', 1, '6인치 내 적 용기 −1, 결투 −1.', { foe: { r: 360, stats: { courage: -1, fight: -1 } } }],
    betrayer: ['배신자의 칼', 'might', 1, '이번 라운드 결투 +2.', { self: { fight: 2 } }],
    tainted: ['타락의 독칼', 'will', 1, '이번 라운드 힘 +2.', { self: { strength: 2 } }],
    undying: ['불사의 원념', 'will', 1, '이번 라운드 Defense +1, 용기 +2.', { self: { defence: 1, courage: 2 } }],
    knight_of_umbar: ['움바르의 기수', 'might', 1, '이번 라운드 이동 +90, 결투 +1.', { self: { move: 90, fight: 1 } }],
    warg_chieftain: ['워그 우두머리', 'might', 1, '6인치 내 기병 이동 +90.', { ally: { r: 360, trait: 'mounted', stats: { move: 90 } } }]
});
// MESBG Will 주문 (마법사 전용)
CX.spells = Object.assign(CX.spells || {}, {
    gandalf: [['빛의 폭발', 1, '주술 폭발 — 가장 가까운 적 넉백·상처 1', { push: 90, strike: { r: 480, n: 1, dmg: 1 } }], ['너는 지나가지 못한다', 1, '근접 적 상처 1·용기 −2', { strike: { r: 240, n: 1, dmg: 1 }, foe: { r: 240, stats: { courage: -2 } } }], ['명령', 1, '6″ 아군 용기 +2', { ally: { r: 300, stats: { courage: 2 } } }]],
    saruman: [['쿠루니르의 목소리', 1, '12″ 내 적 용기 −3', { foe: { r: 540, stats: { courage: -3 } } }], ['주술사의 폭풍', 2, '적 1기 넉백·상처 1', { push: 135, strike: { r: 480, n: 1, dmg: 1 } }]],
    sauron: [['사우론의 눈', 1, '9″ 내 적 공포·용기 −2', { foe: { r: 430, stats: { courage: -2 } }, fear: { r: 430 } }], ['파멸의 화염', 2, '9″ 내 적 3기 화염 상처 1', { strike: { r: 430, n: 3, dmg: 1 } }], ['그림자 손길', 2, '9″ 내 가장 가까운 적 상처 2', { strike: { r: 430, n: 1, dmg: 2 } }]],
    witchking_fellbeast: [['검은 숨결', 1, '7″ 내 적 결투 −1·공포', { foe: { r: 320, stats: { fight: -1 } }, fear: { r: 320 } }], ['몽글의 외침', 1, '7″ 내 적 용기 −2', { foe: { r: 320, stats: { courage: -2 } } }]],
    elrond: [['브루이넨의 격류', 2, '적 2기 넉백', { push: 180, strike: { r: 560, n: 2, dmg: 0 } }], ['리븐델의 치유', 1, '6″ 아군 상처 1 회복', { heal: { r: 300, n: 1 } }]],
    galadriel: [['가라앉는 빛', 1, '9″ 내 적 사격 명중 −1', { foe: { r: 430, stats: { shootValue: -1 } } }], ['네냐의 장막', 2, '6″ 아군 보호·방어 +1', { ally: { r: 300, stats: { defence: 1 }, protect: 1 } }]],
    luthien: [['자장가', 1, '9″ 내 적 이동 −2″', { foe: { r: 430, stats: { move: -90 } } }], ['위로의 노래', 1, '6″ 아군 상처 1 회복', { heal: { r: 300, n: 1 } }]],
    morgoth: [['발라의 저주', 2, '최강 적 Attack −1·결투 −2', { foeStrongest: { attacks: -1, fight: -2 } }], ['공포의 주인', 1, '9″ 내 적 공포', { fear: { r: 430 } }]],
    gothmog_balrog: [['화염 채찍', 1, '10″ 내 적 상처 1', { strike: { r: 500, n: 1, dmg: 1 } }], ['불꽃 장막', 1, '7″ 내 적 결투 −1', { foe: { r: 320, stats: { fight: -1 } } }]],
    glorfindel: [['빛의 형상', 1, '6″ 아군 결투 +1', { ally: { r: 300, stats: { fight: 1 } } }], ['정화의 빛', 2, '적 1기 상처 1·주변 공포', { strike: { r: 430, n: 1, dmg: 1 }, fear: { r: 430 } }]],
    aragorn_blackgate: [['왕의 명령', 1, '6″ 아군 용기 +2', { ally: { r: 300, stats: { courage: 2 } } }]]
});
CX.spells.gandalf_white = CX.spells.gandalf;
CX.spells.gandalf_white_mounted = CX.spells.gandalf;
CX.spells.witchking_mounted = CX.spells.witchking_fellbeast;
CX.spells.witchking_mounted_sheet = CX.spells.witchking_fellbeast;
CX.spells.elrond_mounted = CX.spells.elrond;
CX.spells.glorfindel_foot = CX.spells.glorfindel;
CX.spells.glorfindel_mounted = CX.spells.glorfindel;
CX.skills.fingolfin_mounted = CX.skills.fingolfin;
CX.skills.boromir_mounted = CX.skills.boromir;
CX.skills.eowyn_mounted = CX.skills.eowyn;
CX.skills.faramir_mounted = CX.skills.faramir;
CX.skills.imrahil_mounted = CX.skills.imrahil;
CX.skills.elrond_mounted = CX.skills.elrond;
CX.skills.gandalf_white = CX.skills.gandalf;
CX.skills.gandalf_white_mounted = CX.skills.gandalf;
CX.skills.aragorn_blackgate = CX.skills.aragorn;
CX.skills.aragorn_blackgate_mounted = CX.skills.aragorn;
CX.skills.theoden_foot = CX.skills.theoden;
CX.skills.theoden_mounted = CX.skills.theoden;
CX.skills.dain_boar = CX.skills.dain;
CX.skills.azog_warg_rider = CX.skills.azog;
CX.skills.witchking_mounted_sheet = CX.skills.witchking_mounted;
CX.skills.eomer_foot = CX.skills.eomer;
const __lwbSkillStart = P.start;
P.start = function (m) {
    __lwbSkillStart.call(this, m);
    const WIZ = ['마법 화살', 'will', 1, '8인치 내 적 1기에 타격.', { strike: { r: 480, n: 1 } }];
    const BOW = ['명사수', 'might', 1, '이번 사격 단계 최대 2발.', { shots: 2 }];
    const LEAD = ['전장 지휘', 'might', 1, '6인치 내 아군 용기 +2.', { ally: { r: 360, stats: { courage: 2 } } }];
    const DUEL = ['영웅적 돌격', 'might', 1, '이번 라운드 결투 +1.', { self: { fight: 1 } }];
    for (const id of Object.keys(zt)) {
        const p = zt[id];
        if (!p || !p.traits.includes('hero') || CX.skills[id])
            continue;
        const nm = (this.meta.get(id) && this.meta.get(id).name_ko) || '';
        CX.skills[id] = p.traits.includes('wizard') || /요술|마법|주술/.test(nm) ? WIZ : /궁수|명사수|사수|활/.test(nm) ? BOW : /왕|대장|지도관|장군|군주|전주|주|영주|captain/i.test(nm) ? LEAD : DUEL;
    }
    for (const id of Object.keys(zt)) {
        const p = zt[id];
        if (p && p.traits.includes('hero') && CX.skills[id] && !p.might && !p.will && !p.fate) { p.might = 2; p.will = 1; p.fate = 3; }
    }
};
P.heroic = function (uid, key) {
    const u = this.unit(uid);
    if (!u || !u.alive || u.side !== 'good' || !u.traits.includes('hero') || (u.resources.might || 0) < 1 || (u.heroics || {})[key])
        return false;
    const T = {
        // MESBG Heroic Actions
        strike: () => { u.roundBuff.fight = (u.roundBuff.fight || 0) + 1; }, // 영웅적 일격: 결투 +1
        combat: () => { u.heroicCombat = true; }, // 영웅의 전투: 승리 후 재돌격
        defence: () => { u.heroicDef = true; }, // 영웅적 수비: 상처 필요값 6
        shoot: () => { u.roundBuff.shootValue = (u.roundBuff.shootValue || 0) + 1; }, // 영웅적 사격: 명중 +1
        move: () => { u.roundBuff.move = (u.roundBuff.move || 0) + 135; }, // 영웅적 진군: +3″
        might: () => { u.mightReroll = true; }, // 운명의 일격: 결투 최저 주사위 재굴림
    };
    if (!T[key])
        return false;
    u.resources.might--;
    (u.heroics || (u.heroics = {}))[key] = true;
    T[key]();
    this.refreshUnit(u);
    const N = { strike: '영웅적 일격', combat: '영웅의 전투', defence: '영웅적 수비', shoot: '영웅적 사격', move: '영웅적 진군', might: '운명의 일격' };
    this.emit('Heroic', u.name + ' — 영웅 행동 · ' + N[key], { uid: u.uid });
    this.save();
    return true;
};
P.castSpell = function (uid, idx) {
    const u = this.unit(uid), sp = (CX.spells[u.id] || [])[idx | 0];
    if (!u || !u.alive || !sp || u.spellRound || (u.resources.will || 0) < sp[1])
        return false;
    u.resources.will -= sp[1];
    u.spellRound = true;
    const fxd = sp[2] || {}, near = this.alive(u.side).filter(v => ht(v, u) <= 360), foes = this.alive(Ht(u.side)).filter(v => ht(v, u) <= 620);
    const buff = (v, k, n) => { v.roundBuff[k] = (v.roundBuff[k] || 0) + n; this.refreshUnit(v); };
    const sb = (t, o) => { for (const k in o) buff(t, k, o[k]); };
    const inR = (l, r) => l.filter(t => ht(t, u) <= r);
    const _aff = [], _res = [];
    const _rk = (t) => {
        if (!t || !t.alive) return false;
        if ((t.resources.will || 0) < 1 || (t.stats.will || 0) < 1) return false;
        t.resources.will -= 1;
        if (Lt(t) >= 4) { _res.push(t.uid); return true; }
        return false;
    };
    if (fxd.self) sb(u, fxd.self);
    if (fxd.ally) inR(near, fxd.ally.r || 360).filter(t => !fxd.ally.trait || t.traits.includes(fxd.ally.trait)).forEach(t => { sb(t, fxd.ally.stats || {}); if (fxd.ally.protect) t.protected = !0; _aff.push(t.uid); });
    if (fxd.foe) inR(foes, fxd.foe.r || 450).forEach(t => { if (_rk(t)) return; sb(t, fxd.foe.stats || {}); _aff.push(t.uid); });
    if (fxd.foeStrongest) { const t = foes.sort((a, b) => b.stats.attacks - a.stats.attacks)[0]; if (t && !_rk(t)) { sb(t, fxd.foeStrongest); _aff.push(t.uid); } }
    if (fxd.heal) inR(near, fxd.heal.r || 360).filter(t => t.currentWounds < t.stats.wounds).sort((a, b) => (b.stats.wounds - b.currentWounds) - (a.stats.wounds - a.currentWounds)).slice(0, fxd.heal.n || 1).forEach(t => { t.currentWounds++; _aff.push(t.uid); });
    if (fxd.strike) inR(foes, fxd.strike.r || 450).slice(0, fxd.strike.n || 1).forEach(t => { if (fxd.strike.dmg && !_rk(t)) { this.inflict(u, t, fxd.strike.dmg); _aff.push(t.uid); } });
    if (fxd.fear) inR(foes, fxd.fear.r || 450).forEach(t => { if (_rk(t)) return; t.feared = !0; _aff.push(t.uid); });
    if (fxd.push) { const t = foes.sort((a, b) => ht(a, u) - ht(b, u))[0]; if (t && !_rk(t)) { const ps = De(t, [u], this.alive(), this.terrain, fxd.push); Object.assign(t, ps.to); _aff.push(t.uid); } }
    this.emit('Spell', `${u.name} · ${sp[0]}${_res.length ? ' · 저항 ×' + _res.length : ''}`, { uid: u.uid, targets: _aff, resisted: _res, offensive: !!(fxd.strike || fxd.push || fxd.fear || fxd.foe || fxd.foeStrongest) });
    this.checkRun();
    return true;
};
P.autoSpell = function (u) {
    const S = CX.spells[u.id] || [];
    if (!u || !u.alive || !S.length || u.spellRound || (u.resources.will || 0) < 1)
        return false;
    const foes = this.alive(Ht(u.side)).filter(v => ht(v, u) <= 640), friends = this.alive(u.side).filter(v => ht(v, u) <= 360);
    for (let i = 0; i < S.length; i++) {
        const sp = S[i], fxd = sp[2] || {};
        if ((u.resources.will || 0) < sp[1]) continue;
        const offensive = fxd.strike || fxd.push || fxd.fear || fxd.foe || fxd.foeStrongest;
        if (offensive && foes.length) { if (this.castSpell(u.uid, i)) return true; }
        else if (fxd.heal && friends.some(v => v.currentWounds < v.stats.wounds)) { if (this.castSpell(u.uid, i)) return true; }
        else if (!offensive && fxd.ally && foes.length && foes.some(v => ht(v, u) <= 420)) { if (this.castSpell(u.uid, i)) return true; }
    }
    return false;
};
P.skill = function (uid) {
    const u = this.unit(uid);
    if (this.skillReason(u))
        return false;
    const [name, resource, cost] = CX.skills[u.id];
    u.resources[resource] -= cost;
    u.skillRound = true;
    const near = this.alive(u.side).filter(v => ht(v, u) <= 360), foes = this.alive(Ht(u.side)).filter(v => ht(v, u) <= 450);
    const buff = (v, k, n) => { v.roundBuff[k] = (v.roundBuff[k] || 0) + n; this.refreshUnit(v); };
    if (u.id === 'aragorn') {
        buff(u, 'attacks', 1);
        u.anduril = true;
        near.forEach(v => buff(v, 'courage', 2));
    }
    if (u.id === 'gimli')
        buff(u, 'attacks', 2);
    if (u.id === 'boromir') {
        near.forEach(v => buff(v, 'fight', 1));
        foes.filter(v => ht(v, u) < v.radius + u.radius + 5).forEach(v => { if (Lt(this.rng) + Lt(this.rng) + v.stats.courage < 10)
            buff(v, 'attacks', -1); });
    }
    if (u.id === 'legolas') {
        u.shotsLeft = 3;
        u.precise = true;
    }
    if (u.id === 'gandalf') {
        near.forEach(v => { buff(v, 'defence', 2); v.protected = true; });
        const v = foes.sort((a, b) => ht(a, u) - ht(b, u))[0];
        if (v) {
            const push = De(v, [u], this.alive(), this.terrain, 90);
            Object.assign(v, push.to);
            buff(v, 'move', -90);
        }
    }
    if (u.id === 'theoden')
        near.filter(v => v.traits.includes('mounted')).forEach(v => { buff(v, 'move', 90); buff(v, 'fight', 1); });
    if (u.id === 'elrond') {
        near.filter(v => v.currentWounds < v.stats.wounds).sort((a, b) => (b.stats.wounds - b.currentWounds) - (a.stats.wounds - a.currentWounds)).slice(0, 2).forEach(v => v.currentWounds++);
        buff(u, 'fight', 1);
    }
    if (u.id.startsWith('glorfindel')) {
        buff(u, 'strength', 1);
        near.forEach(v => v.protected = true);
    }
    if (u.id === 'witchking_fellbeast') { foes.forEach(v => { buff(v, 'fight', -1); buff(v, 'move', -90); }); const v = foes.sort((a, b) => ht(a, u) - ht(b, u))[0]; if (v) this.inflict(u, v, 1); }
    if (u.id === 'eowyn')
        foes.filter(v => v.traits.includes('terror')).forEach(v => buff(v, 'fight', -1));
    if (u.id === 'saruman') {
        const v = foes.sort((a, b) => b.stats.attacks - a.stats.attacks)[0];
        if (v) {
            buff(v, 'attacks', -1);
            buff(v, 'move', -v.stats.move / 2);
        }
    }
    if (u.id === 'sauron')
        foes.filter(v => ht(v, u) < 270).forEach(v => { if (Lt(this.rng) >= oe(6, v.stats.defence))
            this.inflict(u, v, 1); });
    if (u.id === 'gothmog')
        near.forEach(v => buff(v, 'fight', 1));
    const fxd = CX.skills[u.id] && CX.skills[u.id][4];
    if (fxd) {
        const sb = (t2, o) => { for (const k in o) buff(t2, k, o[k]); };
        const inR = (list, r) => list.filter(t2 => ht(t2, u) <= r);
        if (fxd.self) sb(u, fxd.self);
        if (fxd.selfFlags) fxd.selfFlags.forEach(k => u[k] = !0);
        if (fxd.ally) inR(near, fxd.ally.r || 360).filter(t2 => !fxd.ally.trait || t2.traits.includes(fxd.ally.trait)).forEach(t2 => { sb(t2, fxd.ally.stats || {}); if (fxd.ally.protect) t2.protected = !0; });
        if (fxd.foe) inR(foes, fxd.foe.r || 450).forEach(t2 => sb(t2, fxd.foe.stats || {}));
        if (fxd.foeStrongest) { const t2 = foes.sort((a, b) => b.stats.attacks - a.stats.attacks)[0]; if (t2) sb(t2, fxd.foeStrongest); }
        if (fxd.heal) inR(near, fxd.heal.r || 360).filter(t2 => t2.currentWounds < t2.stats.wounds).sort((a, b) => (b.stats.wounds - b.currentWounds) - (a.stats.wounds - a.currentWounds)).slice(0, fxd.heal.n || 1).forEach(t2 => t2.currentWounds++);
        if (fxd.strike) inR(foes, fxd.strike.r || 450).slice(0, fxd.strike.n || 1).forEach(t2 => this.inflict(u, t2, fxd.strike.dmg || 1));
        if (fxd.shots) { u.shotsLeft = fxd.shots; u.precise = !0; }
        if (fxd.push) { const t2 = foes.sort((a, b) => ht(a, u) - ht(b, u))[0]; if (t2) { const ps = De(t2, [u], this.alive(), this.terrain, fxd.push); Object.assign(t2, ps.to); } }
    }
    this.emit('HeroSkill', `${u.name} · ${name}`, { uid: u.uid });
    this.checkRun();
    return true;
};
// Apply prevention before deaths and XP, so saved heroes never count as casualties.
P.applyCombat = function (result) {
    result.wounds = [];
    result.kills = [];
    for (const s of result.strikeResults) {
        const u = this.unit(s.target), a = this.unit(s.attacker);
        if (!u?.alive)
            continue;
        if (s.wound && u.side === 'good' && this.rank('nenya') && !u.nenyaUsed) {
            u.nenyaUsed = true;
            if (Lt(this.rng) >= 5) {
                s.wound = false;
                s.prevented = '네냐';
            }
        }
        if (s.wound && u.resources?.fate > 0) {
            u.resources.fate--;
            if (Lt(this.rng) >= 4) {
                s.wound = false;
                s.prevented = 'Fate';
            }
        }
        if (s.wound && u.currentWounds <= 1 && u.side === 'good' && u.traits.includes('hero') && this.rank('mithril') && !this.mithrilSpent) {
            this.mithrilSpent = true;
            s.wound = false;
            s.prevented = '미스릴 셔츠';
        }
        if (s.wound && u.id === 'morgoth') {
            const gate = u.bossPhase === 1 ? Math.ceil(u.stats.wounds * .66) : u.bossPhase === 2 ? Math.ceil(u.stats.wounds * .33) : 0;
            if (u.currentWounds <= gate)
                s.wound = false;
        }
        s.killed = !!s.wound && u.currentWounds === 1;
        const single = { ...result, strikeResults: [s], pushVectors: [] };
        oldApply.call(this, single);
        if (s.wound)
            result.wounds.push(u.uid);
        if (s.killed) {
            result.kills.push(u.uid);
            if (a?.side === 'good')
                this.totalKills = (this.totalKills || 0) + 1;
        }
        if (s.prevented)
            this.emit('Saved', `${u.name} · ${s.prevented}로 상처 Defense`, { uid: u.uid });
    }
    for (const p of result.pushVectors) {
        const u = this.unit(p.uid);
        if (u?.alive)
            Object.assign(u, p.to);
    }
};
// Add spear support and relic synergies around the retained multi-fight solver.
const baseFight = Ue;
Ue = function (group, all, terrain, priority, rng) {
    const saved = all.map(u => [u, u.stats, structuredClone(u.roundBuff || {})]);
    for (const u of all) {
        u.stats = { ...u.stats };
        if (u.side === 'good' && u.traits.includes('gondor') && q.rank('banner') && all.some(v => v !== u && v.side === u.side && v.traits.includes('gondor') && ht(u, v) < u.radius + v.radius + 90))
            u.stats.defence += q.rank('banner');
        if (u.side === 'good' && u.traits.includes('hero') && group.filter(v => Vt(u, v)).length >= 2)
            u.stats.fight += q.rank('horn');
        if (u.side === 'good' && q.rank('warbanner') && all.some(h => h !== u && h.side === 'good' && h.alive && h.traits.includes('hero') && ht(h, u) <= 360))
            u.stats.fight += 1;
        if (u.side === 'good' && q.bonded && q.bonded(u))
            u.stats.fight += 1;
        if (group.includes(u))
            for (const v of group) {
                if (v.side === u.side || !Vt(u, v))
                    continue;
                const face = (v.angle || 0) + (Ge[v.id] ?? 90), dir = Math.atan2(u.y - v.y, u.x - v.x) * 180 / Math.PI,
                    diff = Math.abs(((dir - face) % 360 + 540) % 360 - 180);
                if (diff > 115) { u.stats.fight += 1; break; }
            }
        if (u.side === 'good' && all.some(v => v.alive && v.id === 'balrog' && ht(u, v) <= 280))
            u.stats.fight = Math.max(1, u.stats.fight - 1);
    }
    const links = supportFor(group, all);
    const supports = links.map(l => l.unit);
    // Spear/pike support links: one supporter per front; pikes may hold a second rank.
    const participating = group.map(u => ({ ...u, stats: { ...u.stats } }));
    for (const l of links) {
        const front = participating.find(v => v.uid === l.front.uid);
        if (front) {
            front.stats.attacks++;
            front.stats.fight = Math.max(front.stats.fight, l.unit.stats.fight);
        }
    }
    const result = baseFight(participating, all, terrain, priority, rng);
    result.supports = supports.map(u => u.uid);
    result.supportLinks = links.map(l => ({ unit: l.unit.uid, front: l.front.uid, via: l.via.uid, rank: l.rank }));
    // A winning side's supporters each roll one strike against a loser still in contact with their front.
    for (const l of links) {
        const support = l.unit;
        if (support.side !== result.winnerSide) continue;
        const foes = participating.filter(v => v.side === Ht(support.side) && Vt(l.front, v));
        if (!foes.length) continue;
        const foe = foes.slice().sort((a, b) => a.stats.defence - b.stats.defence)[0];
        let pool = foe.currentWounds - result.wounds.filter(w => w === foe.uid).length;
        if (pool <= 0) continue;
        const roll = Lt(rng), needed = oe(support.stats.strength, foe.stats.defence),
            trapped = (result.trappedUnits || []).includes(foe.uid) || (result.knockedDownUnits || []).includes(foe.uid);
        if (roll >= needed) {
            const hits = trapped ? 2 : 1;
            for (let n = 0; n < hits && pool > 0; n++) { result.wounds.push(foe.uid); pool--; }
            result.strikeResults.push({ attacker: support.uid, target: foe.uid, roll, needed, wound: true, killed: pool <= 0, support: true });
            if (pool <= 0) result.kills.push(foe.uid);
        } else result.strikeResults.push({ attacker: support.uid, target: foe.uid, roll, needed, wound: false, killed: false, support: true });
    }
    result.fightValues = { good: Math.max(...participating.filter(u => u.side === 'good').map(u => u.stats.fight)), evil: Math.max(...participating.filter(u => u.side === 'evil').map(u => u.stats.fight)) };
    // Might is a deliberate pre-fight stance, selected through the hero UI.
    for (const strike of result.strikeResults) {
        const a = all.find(u => u.uid === strike.attacker);
        if (a?.side === 'good' && a.traits.includes('hero')) {
            const bonus = a.stageStrikes === 0 ? q.rank('narsil') : 0;
            if (a.anduril)
                strike.needed = Math.min(4, strike.needed);
            strike.wound = strike.roll + bonus >= strike.needed;
            a.stageStrikes++;
        }
    }
    for (const [u, stats] of saved)
        u.stats = stats;
    return result;
};
const baseShot = Xe;
Xe = function (a, target, terrain, rng, all) {
    const stats = a.stats, moved = a.moved;
    a.stats = { ...stats };
    if (a.side === 'good' && q.rank('quiver') && a.movementSpent <= a.stats.move / 2)
        a.moved = false;
    if (a.precise) {
        a.stats.shootValue = 2;
        a.moved = false;
    }
    if (target.side === 'good' && target.traits.includes('ranger') && q.rank('cloak') && ht(a, target) > Math.max(90, 360 - 45 * (q.rank('cloak') - 1)))
        a.stats.shootValue++;
    const result = baseShot(a, target, terrain, rng, all);
    a.stats = stats;
    a.moved = moved;
    const s = result.strikeResults[0];
    if (a.side === 'good' && a.stageShots === 0 && q.rank('arrow') && target.traits.includes('monster') && s.hit >= s.hitNeeded)
        s.wound = s.roll + 1 + q.rank('arrow') >= s.needed;
    s.killed = s.wound && target.currentWounds === 1;
    a.stageShots++;
    return result;
};
P.shoot = function (uid, target) { const u = this.unit(uid); const multi = u?.precise && u.shotsLeft > 1; if (!multi)
    return oldShoot.call(this, uid, target); const v = this.unit(target); if (this.phase !== 'shoot' || !this.canAct(u) || !this.validTargets(u).includes(v))
    return false; const r = Xe(u, v, this.terrain, this.rng, this.alive()); this.applyCombat(r); u.shotsLeft--; this.emit('ShotFired', `${u.name} · 남은 화살 ${u.shotsLeft}`, { result: r }); this.checkRun(); return true; };
// Enemy movement evaluates role, engagement, objectives and ranged spacing.
const __lwbFA = P.finishActivation;
P.finishActivation = function (u) {
    if (u && (this.devices || []).some(d => d.armed && (u.side === 'evil' || d.type === 'barrel')))
        this.checkTraps(u);
    if (u && u.side === 'good' && u.traits.includes('hero') && this.rng() < 0.1) {
        const pr = LWB_PAIRS.find(w => w[0] === u.id || w[1] === u.id);
        if (pr) {
            const other = this.alive('good').find(v => v !== u && v.id === (pr[0] === u.id ? pr[1] : pr[0]) && ht(u, v) <= 340);
            if (other) {
                this.banter = { uid: u.uid, text: pr[2], until: Date.now() + 3800 };
                this.emit('Event', u.name + ' — ' + pr[2]);
            }
        }
    }
    return __lwbFA.call(this, u);
};
be = function (b, u) {
    if (b.engaged(u) || b.remaining(u) < 12)
        return null;
    const enemies = b.alive(Ht(u.side)), friends = b.alive(u.side);
    if (!enemies.length)
        return null;
    const ranged = u.stats.shootRange > 0 || u.traits.includes('wizard');
    let target = enemies.slice().sort((a, c) => ht(u, a) - ht(u, c))[0];
    if (u.traits.includes('mounted'))
        target = enemies.slice().sort((a, c) => (a.stats.shootRange ? -250 : 0) + ht(u, a) - (c.stats.shootRange ? -250 : 0) - ht(u, c))[0];
    const charges = enemies.map(v => ({ v, p: ue(u, v) })).filter(v => ie(u, v.p, b.alive(), b.terrain, b.remaining(u)));
    if (charges.length && !ranged)
        return charges.sort((a, c) => ht(u, a.v) - ht(u, c.v))[0].p;
    if (ranged && ht(u, target) > 300 && b.validTargets(u).length)
        return null;
    let goal = target;
    if (['hold', 'defense', 'rescue'].includes(b.mission) && u.side === 'evil' && !u.traits.includes('monster') && !u.traits.includes('hero'))
        goal = Mt.objective;
    if (['defense', 'hold', 'rescue'].includes(b.mission) && u.side === 'good' && ht(u, target) > 330)
        goal = Mt.objective; // defenders hold the line until the enemy closes
    if (u.traits.includes('spear'))
        goal = friends.filter(v => v !== u && !v.stats.shootRange).sort((a, c) => ht(a, target) - ht(c, target))[0] || target;
    let best = null, score = Infinity;
    for (const d of [b.remaining(u), b.remaining(u) * .7, b.remaining(u) * .4])
        for (let i = 0; i < 24; i++) {
            const angle = i * Math.PI / 12, p = { x: u.x + Math.cos(angle) * d, y: u.y + Math.sin(angle) * d };
            if (!ie(u, p, b.alive(), b.terrain, b.remaining(u)))
                continue;
            let value = ranged ? Math.abs(ht(p, target) - Math.min(u.stats.shootRange || 500, 570)) + (_t(p, target, b.terrain) === 'blocked' ? 300 : 0) : ht(p, goal);
            if (u.traits.includes('mounted'))
                value -= Math.abs(p.x - 1165) * .08;
            if (value < score) {
                score = value;
                best = p;
            }
        }
    return best;
};
const baseAI = He;
He = function (b) { const u = b.eligible()[0]; if (u && CX.skills[u.id] && !b.skillReason(u))
    b.skill(u.uid); baseAI(b); };
const campaignOldDismount = P.dismount;
P.dismount = function (u) { campaignOldDismount.call(this, u); u.baseStats = structuredClone(u.stats); this.refreshUnit(u); };
// Mobile clarity 1.2: jumpable low barriers, stronger combat AI, and working relics.
const lowBarrier=t=>t.active&&t.kind==='cover';
function firstJumpOnPath(path,terrain){
    for(let i=1;i<path.length;i++){
        const a=path[i-1],b=path[i],steps=Math.ceil(ht(a,b)/3);
        for(let j=1;j<=steps;j++){
            const p={x:a.x+(b.x-a.x)*j/steps,y:a.y+(b.y-a.y)*j/steps};
            const barrier=terrain.find(t=>lowBarrier(t)&&le(p,t));
            if(barrier)return{barrier,edge:{x:a.x+(b.x-a.x)*(j-1)/steps,y:a.y+(b.y-a.y)*(j-1)/steps}};
        }
    }
    return null;
}
const moveBeforeJump=P.move;
P.move=function(uid,to,charge){
    const u=this.unit(uid);
    if(!u||!this.canAct(u)||this.phase!=='move'||this.engaged(u))return false;
    const plan=ve(u,to,this.alive(),this.terrain,this.remaining(u),{snap:!charge,chargeTarget:charge&&this.unit(charge)});
    if(!plan)return false;
    const jump=firstJumpOnPath(plan.path,this.terrain);
    if(!jump)return moveBeforeJump.call(this,uid,to,charge);
    const roll=Math.min(6,Lt(this.rng)+(u.side==='good'?this.rank('elven_rope'):0));
    if(roll===1){
        const edge=Be(u,jump.edge,this.alive(),this.terrain,38);
        if(edge&&ht(u,edge)>1)moveBeforeJump.call(this,uid,edge);
        if(this.phase==='move'&&this.canAct(u))this.finishActivation(u);
        this.emit('JumpTest',`${u.name} · 장애물 넘기 ${roll} · 실패`,{uid,roll});
        return true;
    }
    const moved=moveBeforeJump.call(this,uid,to,charge);
    if(moved){
        u.movementSpent=Math.min(u.stats.move,u.movementSpent+45);
        this.emit('JumpTest',`${u.name} · 장애물 넘기 ${roll} · ${roll===6?'계속 이동':'이동 종료'}`,{uid,roll});
        if(this.phase==='move'&&this.canAct(u)&&(roll<6||this.remaining(u)<12))this.finishActivation(u);
    }
    return moved;
};
CX.relics.push(...[
    ['rohan_shield','로한 기병 방패',1,'기병의 Defense +1. 중첩마다 +1.',0],
    ['rohan_lance','로한 기수 투창',1,'기병의 Attack +1. 중첩마다 +1.',0],
    ['haradrim_bow','하라드 장궁',1,'궁수의 힘 +1. 중첩마다 +1.',0],
    ['ranger_cloak','북부 순찰자 망토',1,'레인저의 Defense +1. 중첩마다 +1.',0],
    ['morannon_pike','모란논 장창',1,'창 지원 아군의 Attack +1. 중첩마다 +1.',0],
    ['gondor_tabard','곤도르 전투복',0,'곤도르 아군의 결투 +1. 중첩마다 +1.',0],
    ['mithril_mail','미스릴 쇠사슬',2,'드워프의 Defense +1. 중첩마다 +1.',0],
    ['barahir_ring','바라히르의 반지',2,'모든 영웅의 Fate 상한 +1. 중첩마다 +1.',0],
    ['elessar','엘렛사르',3,'스테이지 시작 시 모든 영웅의 Will 1 회복.',0],
    ['evenstar','아렌델 저녁별',3,'스테이지 시작 시 모든 영웅의 Might 1 회복.',0],
    ['sting','스팅',3,'Attack이 1인 비영웅 아군의 Attack +1.',0],
    ['shadowfax','섀도팩스의 제갈',3,'기병의 Attack +1 · 이동 +1인치.',0],
    ['nauglamir','나우글라미르',3,'스테이지 보상 금화 ×1.5. 중첩마다 +25%.',0],
    ['miruvor','미루보르',2,'스테이지 시작 시 무작위 부상 아군의 상처 2 회복. 중첩마다 +1.',0],
    ['keys_erebor','에레보르의 열쇠',2,'유물 선택지가 4개로 증가. 중첩마다 +1.',0],
    ['steward_ledger','집정관의 장부',1,'스테이지 보상 금화 +15. 중첩마다 +15.',0],
    ['scouts_mark','북녘 정찰 표지',0,'스테이지 시작 시 금화 +5. 중첩마다 +5.',0],
    ['pipeweed','샤이어의 담뱃잎',1,'매 라운드 지휘력 +1. 중첩마다 +1.',1],
    ['athelas','아셀라스 잎',2,'전투 시작 시 가장 상처 입은 아군의 상처를 1 회복. 중첩마다 +1.',0],
    ['dwarf_axe','두린의 도끼날',1,'드워프의 힘 +1. 중첩마다 +1.',14],
    ['elf_bow','갈라드림 활시위',1,'궁수 사거리 +1인치. 중첩마다 +1인치.',15],
    ['ithilien_blade','이실리엔 단검',2,'레인저의 힘 +1. 중첩마다 +1.',4],
    ['westfold_shield','서부 변경 방패',2,'방패를 든 아군의 Defense +1. 중첩마다 +1.',8],
    ['rohan_standard','로한 기병기',2,'기병의 결투 수치 +1. 중첩마다 +1.',3],
    ['elven_rope','엘프제 밧줄',1,'낮은 장애물 넘기 주사위 +1. 중첩마다 +1.',1],
    ['alliance_standard','동맹의 표준',2,'파벌 결속 발동 조건이 4기 → 3기로 완화.',0],
    ['fellowship_flag','이종연합의 깃발',3,'파벌이 6종 이상 모이면 전원 용기 +1.',0],
    ['edain_banner','에다인의 대기',1,'인간 계열(곤도르·로한·누메노르·데일·호숫골·브리·봉기령·샤이어·로바니온) 아군의 힘 +1.',0],
    ['bounty_list','현상금 목록',1,'스테이지 처치당 금화 +2. 중첩마다 +2.',0],
    ['siege_wright','공성 기술자',0,'지형 장치 가격 −25%. 중첩마다 추가 −25%.',0],
    ['white_pact','백색 조약',1,'동맹 지원팩 가격 −25%. 중첩마다 추가 −25%.',0],
    ['master_flame','에레보르의 명장 불꽃',1,'장비 상점 가격 −25%. 중첩마다 추가 −25%.',0],
    ['lords_letter','군주의 추천서',0,'영입 후보 교체 비용 절반.',0],
    ['oath_dead','망자의 맹세',1,'전사한 영웅 2기당 아군 용기 +1 (최대 +2).',0],
    ['harad_dart','하라드림 독 화살',0,'궁수의 상처 주사위 1 눈을 다시 굴립니다. 중첩마다 +1회.',0],
    ['erebor_crown','에레보르의 군왕관',2,'난쟁이·에레보르 계열 아군 결투 +1.',0],
    ['dunedain_star','두네다인의 별표',0,'궁수의 이동 +1인치. 중첩마다 +1인치.',0],
    ['troll_heart','트롤의 심장',2,'영웅의 체력 +1. 중첩마다 +1.',0],
    ['morgul_thorn','모르굴의 가시',1,'적 영웅 처치 시 다음 전투 CP +1.',0],
    ['ranger_hood','레인저의 두건',0,'궁수의 명중 −1. 중첩마다 −1.',0],
    ['mithril_ore','미스릴 원석',1,'스테이지 보상 금화 +10. 중첩마다 +10.',0],
    ['beorn_mead','베오른의 꿀주',1,'스테이지 시작 시 무작위 아군 1기 상처 1 회복.',0],
    ['anduin_mist','안두인의 안개',1,'적 궁수의 사거리 −1인치. 중첩마다 −1인치.',0],
    ['black_breath','검은 숨결',2,'적 전원 용기 −1. 중첩마다 −1.',0]
].map(([id,name,rarity,text,icon])=>({id,name,rarity,text,icon})));
const relicRefresh=P.refreshUnit;
P.refreshUnit=function(u){
    relicRefresh.call(this,u);
    if(u.side!=='good'||!u.baseStats)return;
    if(u.traits.includes('dwarf'))u.stats.strength+=this.rank('dwarf_axe');
    if(u.stats.shootRange)u.stats.shootRange+=45*this.rank('elf_bow');
    if(u.traits.includes('ranger'))u.stats.strength+=this.rank('ithilien_blade');
    if(/shield/.test(this.meta.get(u.id)?.weapon||''))u.stats.defence+=this.rank('westfold_shield');
    if(u.traits.includes('mounted'))u.stats.fight+=this.rank('rohan_standard');
    if(u.id==='aragorn')u.stats.attacks+=this.rank('anduril_hilt');
    if(u.traits.includes('mounted')){u.stats.defence+=this.rank('rohan_shield');u.stats.attacks+=this.rank('rohan_lance');if(this.rank('shadowfax')){u.stats.attacks+=this.rank('shadowfax');u.stats.move+=45*this.rank('shadowfax');}}
    if(u.stats.shootRange)u.stats.strength+=this.rank('haradrim_bow');
    if(u.traits.includes('ranger'))u.stats.defence+=this.rank('ranger_cloak');
    if(u.traits.includes('spear'))u.stats.attacks+=this.rank('morannon_pike');
    if(u.traits.includes('gondor'))u.stats.fight+=this.rank('gondor_tabard');
    if(u.traits.includes('dwarf'))u.stats.defence+=this.rank('mithril_mail');
    if(u.traits.includes('hero')&&this.rank('barahir_ring')){u.stats.fate=(u.stats.fate||0)+this.rank('barahir_ring');if(!u._barahirFate){u._barahirFate=1;u.resources&&(u.resources.fate=(u.resources.fate||0)+this.rank('barahir_ring'));}}
    if(!u.traits.includes('hero')&&(u.baseStats.attacks||1)===1&&this.rank('sting'))u.stats.attacks+=1;
    {const _HF=new Set(['gondor','minastirith','rohan','numenor','dale','laketown','bree','fiefdoms','shire','rhovanion','deeping']);const _fac=(this.meta.get(u.id)||{}).faction;
    if(this.rank('edain_banner')&&u.side==='good'&&_HF.has(_fac))u.stats.strength+=1;
    if(this.rank('fellowship_flag')&&u.side==='good'){const _fs=new Set();for(const w of this.alive('good')){const f=(this.meta.get(w.id)||{}).faction;if(f&&f!=='terrain')_fs.add(f);}if(_fs.size>=6)u.stats.courage+=1;}}
};
const __lwbRU2=P.refreshUnit;
P.refreshUnit=function(u){
    __lwbRU2.call(this,u);
    if(this.weeklySeed&&this.weeklySeed%12===2)u.stats.shootRange=0;
    if(this.weeklySeed&&this.weeklySeed%12===3&&u.side==='good')u.stats.fight+=1;
    if(this.weeklySeed&&this.weeklySeed%12===4&&u.traits.includes('mounted'))u.stats.fight+=1;
    if(this.weeklySeed&&this.weeklySeed%12===5&&u.side==='evil')u.stats.courage+=1;
    if(this.weeklySeed&&this.weeklySeed%12===6)u.stats.defence+=1;
    if(this.weeklySeed&&this.weeklySeed%12===7&&u.stats.shootRange)u.stats.shootRange=Math.round(u.stats.shootRange*1.5);
    if(this.weeklySeed&&this.weeklySeed%12===8&&u.stats.shootRange)u.stats.shootRange=Math.round(u.stats.shootRange*.7);
    if(this.weeklySeed&&this.weeklySeed%12===9&&u.side==='evil')u.stats.fight+=1;
    if(this.weeklySeed&&this.weeklySeed%12===10)u.stats.move+=45;
    if(this.weeklySeed&&this.weeklySeed%12===11)u.stats.strength+=1;
    for(const e of u.equipment||[]){const d=LWB_EQUIP.find(x=>x.id===e);d&&!d.once&&d.fx(u);}
};
const relicRound=P.beginRound;
P.beginRound=function(){relicRound.call(this);if(['move','shoot'].includes(this.phase))this.cp+=this.rank('pipeweed');
    this._roundSnap={units:structuredClone(this.units),cp:this.cp,side:this.side,phase:this.phase,round:this.round,selected:this.selected,capture:this.capture,devices:structuredClone(this.devices||[]),fightQueue:[]};};
P.undoRound=function(){
    const s=this._roundSnap;
    if(!s||!['move','shoot','fight'].includes(this.phase))return false;
    Object.assign(this,{units:structuredClone(s.units),cp:s.cp,side:s.side,phase:s.phase,round:s.round,selected:s.selected,capture:s.capture,devices:structuredClone(s.devices||[]),fightQueue:[],activeMoverUid:''});
    this.emit('Event','지휘부가 직전 라운드 지점으로 되돌립니다.');
    return true;
};
const relicWave=P.startWave;
P.startWave=function(){
    relicWave.call(this);
    if(this.phase==='reward'||this.phase==='result')return;
    const patient=this.alive('good').filter(u=>u.currentWounds<u.stats.wounds)
        .sort((a,b)=>(b.stats.wounds-b.currentWounds)-(a.stats.wounds-a.currentWounds))[0];
    if(patient&&this.rank('athelas')){
        patient.currentWounds=Math.min(patient.stats.wounds,patient.currentWounds+this.rank('athelas'));
        this.emit('Relic','아셀라스 · '+patient.name+' 회복', { uid: patient.uid, heal: !0 });
    }
    if(this.rank('scouts_mark'))this.gold+=5*this.rank('scouts_mark');
    if(this.rank('miruvor')){const w=this.alive('good').filter(u=>u.currentWounds<u.stats.wounds),t=w[Math.floor(this.rng()*w.length)];if(t){t.currentWounds=Math.min(t.stats.wounds,t.currentWounds+2*this.rank('miruvor'));this.emit('Relic','미루보르 · '+t.name+' 회복', { uid: t.uid, heal: !0 });}}
    if(this.rank('beorn_mead')){const w=this.alive('good').filter(u=>u.currentWounds<u.stats.wounds),t=w[Math.floor(this.rng()*w.length)];if(t){t.currentWounds=Math.min(t.stats.wounds,t.currentWounds+this.rank('beorn_mead'));this.emit('Relic','베오른의 꿀주 · '+t.name+' 회복', { uid: t.uid, heal: !0 });}}
    if(this.rank('elessar')||this.rank('evenstar'))for(const u of this.alive('good')){if(!u.traits.includes('hero'))continue;if(this.rank('elessar'))u.resources.will=Math.min((u.baseStats.will||0)+this.rank('elessar'),(u.resources.will||0)+1);if(this.rank('evenstar'))u.resources.might=Math.min((u.baseStats.might||0)+2*this.rank('evenstar'),(u.resources.might||0)+2*this.rank('evenstar'));}
};
// The player AI looks for an attack first and only moves if that improves an attack.
be=function(b,u){
    if(b.engaged(u)||b.remaining(u)<12)return null;
    const foes=b.alive(Ht(u.side));if(!foes.length)return null;
    const ranged=!!u.stats.shootRange;
    const stance=u.side==='good'?(u.stance||'auto'):'auto';
    const ranked=foes.slice().sort((a,c)=>(a.currentWounds===1?-60:0)+ht(u,a)-(c.currentWounds===1?-60:0)-ht(u,c));
    if(ranged&&b.validTargets(u).length)return null;
    if(!ranged&&stance!=='rear'&&!(stance==='defense'&&ht(u,ranked[0])>260)){
        for(const foe of ranked){
            const point=ue(u,foe),plan=ve(u,point,b.alive(),b.terrain,b.remaining(u),{snap:false,chargeTarget:foe});
            if(plan&&plan.distance>=Math.min(45,b.remaining(u)))return plan.to;
        }
    }
    let best=null,bestScore=Infinity;
    const reach=b.remaining(u),closest=ranked[0],before=ht(u,closest);
    const options=[];
    for(const d of [reach,reach*.65,reach*.35]){
        for(let i=0;i<16;i++){
            const angle=i*Math.PI/8,p={x:u.x+Math.cos(angle)*d,y:u.y+Math.sin(angle)*d};
            if(!Et(u,p,b.alive(),b.terrain))continue;
            const enemy=ranked.slice().sort((a,c)=>ht(p,a)-ht(p,c))[0];
            const distance=ht(p,enemy),los=_t(p,enemy,b.terrain);
            const ideal=stance==='aggressive'?Math.min(u.stats.shootRange*.45,260):stance==='rear'?Math.min(u.stats.shootRange*.95,540):Math.min(u.stats.shootRange*.75,360);
            const score=ranged
                ?(distance<=u.stats.shootRange&&los!=='blocked'?0:600)+Math.abs(distance-ideal)+.12*d+(distance<170&&stance!=='aggressive'?(170-distance)*3:0)+(stance==='defense'?ht(p,Mt.objective)*.35:0)
                :stance==='rear'?-distance+.12*d:stance==='defense'?(distance<300?distance*.5:ht(p,Mt.objective)*1.2):distance+.12*d;
            options.push({p,score});
        }
    }
    options.sort((a,c)=>a.score-c.score);
    for(const candidate of options.slice(0,7)){
        const plan=ve(u,candidate.p,b.alive(),b.terrain,reach,{snap:false});
        if(plan&&plan.distance>=45&&candidate.score<bestScore){bestScore=candidate.score;best=plan.to;}
    }
    if(!best){
        const wp=Mt.objective;
        let wpBest=null,wpScore=Infinity;
        for(const d of [reach,reach*.5]){
            for(let i=0;i<16;i++){
                const angle=i*Math.PI/8,p={x:u.x+Math.cos(angle)*d,y:u.y+Math.sin(angle)*d};
                if(!Et(u,p,b.alive(),b.terrain))continue;
                const s=ht(p,wp)+.1*d;
                if(s<wpScore){wpScore=s;wpBest=p;}
            }
        }
        if(wpBest){const plan=ve(u,wpBest,b.alive(),b.terrain,reach,{snap:false});if(plan&&plan.distance>=45)best=plan.to;}
    }
    if(!best&&!ranged){
        let fr=null,frScore=Infinity;
        for(const d of [reach,reach*.75,reach*.5,reach*.3]){
            for(let i=0;i<24;i++){
                const angle=i*Math.PI/12,p={x:u.x+Math.cos(angle)*d,y:u.y+Math.sin(angle)*d};
                if(!Et(u,p,b.alive(),b.terrain))continue;
                const s=ht(p,closest)+.1*d;
                if(s<frScore){frScore=s;fr=p;}
            }
        }
        if(fr){const plan=ve(u,fr,b.alive(),b.terrain,reach,{snap:false});if(plan&&plan.distance>=45)best=plan.to;}
    }
    if(!best)return null;
    if(ranged)return bestScore<600+Math.abs(before-Math.min(u.stats.shootRange*.75,360))-15?best:null;
    if(stance==='rear'||stance==='defense')return best;
    return ht(best,closest)<before-45?best:null;
};
He=function(b){
    const u=b.eligible()[0];if(!u){b.advance();return;}
    try{HeAct(b,u);}catch(e){console.error('ai turn error',e);try{b.wait(u.uid)}catch(_){try{b.advance()}catch(__){}}}
};
function HeAct(b,u){
    if(CX.skills[u.id]&&!b.skillReason(u))b.skill(u.uid);
    b.autoSpell(u);
    if(u.side==='good'&&(b.cp||0)>0){
        if(b.phase==='shoot'&&u.stats.shootRange&&!u.aim&&!(u.oncePerRunAbilities||[]).includes('aim-used'))b.command('aim',u.uid);
        else if(b.phase==='move'&&b.furyRound!==b.round&&b.cp>=2&&b.alive('evil').length>b.alive('good').length*1.5)b.command('fury',u.uid);
        else if(b.phase==='fight'&&!u.hold&&u.stats.defence>=6&&b.cp>=1&&b.engaged(u))b.command('hold',u.uid);
    }
    if(b.phase==='move'){
        const _st=u.side==='good'?(u.stance||'auto'):'auto';
        if(!u.stats.shootRange&&!b.engaged(u)&&_st!=='rear'&&!(_st==='defense'&&b.alive(Ht(u.side)).every(f=>ht(u,f)>260))){
            const foes=b.alive(Ht(u.side)).sort((a,c)=>ht(u,a)-ht(u,c)).slice(0,5);
            const scored=foes.map(f=>({f,s:(f.currentWounds===1?30:0)+(f.stats.shootRange?18:0)+Math.max(0,6-f.stats.defence)*3-ht(u,f)*.04}));
            scored.sort((a,c)=>c.s-a.s);
            for(const {f:foe} of scored){if(b.charge(u.uid,foe.uid))return;}
        }
        const dest=be(b,u);
        if(!dest||!b.move(u.uid,dest))b.wait(u.uid);
    }else if(b.phase==='shoot'){
        const _hill=b.terrain.some(t=>t.z==='hill'&&t.active&&le(u,t,0)),_wx=b.current?b.current.modifier:'',_wpen=['rain','dark','fog'].includes(_wx)?1:0;
        const _hn=t=>Math.min(6,u.stats.shootValue+(u.moved?pt.movePenalty:0)+(_t(u,t,b.terrain)==='cover'?1:0)-(_hill?1:0)+_wpen+(t.evadeRanged||0));
        const _sc=t=>-_hn(t)*10+(t.currentWounds===1?18:0)+(t.traits.includes('hero')?8:0)+(t.currentWounds===2?6:0)-ht(u,t)*.01;
        const target=b.validTargets(u).sort((a,c)=>_sc(c)-_sc(a))[0];
        if(!target||!b.shoot(u.uid,target.uid))b.wait(u.uid);
    }
}
const MESBG_TIERS=[[100,'legendary','전설의 영웅'],[50,'epic','용맹의 영웅'],[26,'rare','강인의 영웅'],[0,'elite','하급 영웅']];
const isHeroUnit=(id,role)=>(zt[id]?.traits||[]).includes('hero')||role==='hero'||UnitCatalog[id]?.meta?.role==='hero';
const heroGrade=(id,pts,role)=>{if(isHeroUnit(id,role)){const p=pts??UnitCatalog[id]?.points??0;for(const[m,g]of MESBG_TIERS)if(p>=m)return g;}return(zt[id]?.traits||[]).includes('mounted')?'elite':'normal'};
const tierLabel=id=>{if(isHeroUnit(id)){const p=UnitCatalog[id]?.points??0;for(const[m,,n]of MESBG_TIERS)if(p>=m)return n}return gradeName[heroGrade(id)]};
const gradeName={normal:'일반',elite:'정예',rare:'희귀 영웅',epic:'영웅',legendary:'전설'};

const physicalHit=Ve.prototype.hit;
Ve.prototype.hit=function(p){
    const hero=this.b.alive().filter(u=>u.traits.includes('hero')&&ht(p,u)<=Math.max(u.radius+10,(u.visualRadius||u.radius)*1.12))
        .sort((a,b)=>ht(p,a)-ht(p,b))[0];
    return hero||physicalHit.call(this,p);
};
// Shared visual vocabulary: worn parchment, slate, moss, ember. No character substitutes.
const oldPreload = Ve.prototype.preload, oldCreate = Ve.prototype.create, oldSync = Ve.prototype.sync;
Ve.prototype.preload = function () {
    oldPreload.call(this);
    {
        const name = CX.maps[visualMapIdx(q.mapIndex)];
        this.load.image('map-' + name, this.asset('backgrounds/' + (name === 'minas_tirith' ? 'bg_minas_gate' : 'bg_' + name) + '.png?v=p2'));
    }
    for (const name of ['slash', 'thrust', 'smash', 'shoot', 'cast', 'pounce', 'rally', 'blood', 'clash', 'prone', 'terror', 'charge', 'halfmove'])
        this.load.image('fx-' + name, this.asset('effects/fx_' + name + '.png'));
    // 베이스 링은 53개 고유 파일만 받는다 (유닛당 1건씩 큐잉하던 것을 중복 제거).
    { const _bf = new Set(); for (const [, u] of q.meta) if (u.side !== 'terrain') _bf.add(baseFile(u)); for (const f of _bf) this.load.image('basefile:' + f, this.asset(f)); }
};
// 지연 로드: 전장에 스폰된 유닛의 토큰만 받는다 — 부팅 프리로드에 전체 로스터를 받지 않음.
Ve.prototype._wantTex = function (id) {
    const m = q.meta.get(id); if (!m || !m.file) return 'unit-pending';
    (this._texQ ||= new Set());
    if (!this._texQ.has(id)) {
        this._texQ.add(id);
        this.load.image(id, this.asset(m.file));
        this.load.once('filecomplete-image-' + id, () => {
            this._texQ.delete(id);
            for (const u of this.b.units) { const c = this.tokens.get(u.uid); if (c && c.getData('assetId') === id) { c.destroy(); this.tokens.delete(u.uid); } }
            this.sync();
        });
        this.load.start();
    }
    if (!this.textures.exists('unit-pending')) { const g0 = this.add.graphics(); g0.fillStyle(0x3a4438, 1); g0.fillCircle(32, 32, 30); g0.lineStyle(3, 0x9aa38a, .8); g0.strokeCircle(32, 32, 27); g0.generateTexture('unit-pending', 64, 64); g0.destroy(); }
    return 'unit-pending';
};
Ve.prototype.drawMap = function () { this.backdrop = this.add.image(pt.width / 2, pt.height / 2, 'map-minas_tirith').setDisplaySize(pt.width, pt.height).setTint(0xb6b5a4); this.boundary = this.add.graphics().setDepth(2); this.objectiveLabel = this.add.text(0, 0, '', { fontFamily: 'Pretendard', fontSize: '22px', color: '#e7ddbd', backgroundColor: '#20231de6', padding: { x: 10, y: 6 } }).setOrigin(.5).setDepth(4); };
// Selection prefers the active unit, then the moving side, then the nearest base within reach.
Ve.prototype.hit = function (b) { const near = this.b.alive().filter(u => ht(b, u) <= u.radius + 10); near.sort((u, v) => ht(b, u) - (u.uid === this.b.selected ? 16 : u.side === this.b.side ? 8 : 0) - (ht(b, v) - (v.uid === this.b.selected ? 16 : v.side === this.b.side ? 8 : 0))); return near[0]; };
Ve.prototype.create = function () {
    oldCreate.call(this);
    const small = this.scale.width < 820;
    this.cameras.main.setZoom(small ? Math.max(.4, Math.min(.62, this.scale.width / 1350)) : Math.max(.48, Math.min(.76, this.scale.width / 1650)));
    this.cameras.main.centerOn(1165, 770);
    this.hoverBox = document.createElement('div');
    this.hoverBox.className = 'unit-tooltip hidden';
    document.querySelector('.field').append(this.hoverBox);
    this.input.addPointer(1);
    this.input.on('pointermove', p => {
        const u = this.hit({ x: p.worldX, y: p.worldY });
        this.chargeTarget = null;
        if (u && this.b.phase === 'move' && !p.isDown) {
            const sel = this.b.unit(this.b.activeMoverUid || this.b.selected);
            if (sel && sel.alive && sel.side === this.b.side && u.side !== sel.side && this.b.canAct(sel) && !this.b.engaged(sel)) {
                const plan = ve(sel, ue(sel, u), this.b.alive(), this.b.terrain, this.b.remaining(sel), { chargeTarget: u });
                this.chargeTarget = { u, plan };
                this.drawRings();
            }
        }
        if (!u || p.isDown) {
            this.hoverBox.classList.add('hidden');
            return;
        }
        const m = q.meta.get(u.id);
        this.hoverBox.innerHTML = `<b>${u.name}</b><span>${u.side === 'good' ? '아군' : '적군'} · ${isHeroUnit(u.id) ? tierLabel(u.id) + ' · ' : ''}${CX.roleNames[m.role] || m.role} 베이스</span><span>결투 ${u.stats.fight} / 힘 ${u.stats.strength} / Defense ${u.stats.defence}</span><span>${q.engaged(u) ? '교전 중' : u.acted ? '행동 완료' : '행동 가능'}${CX.skills[u.id] ? ' · ' + CX.skills[u.id][0] : ''}</span>`;
        this.hoverBox.style.left = Math.min(p.x + 18, this.scale.width - 230) + 'px';
        this.hoverBox.style.top = Math.max(5, Math.min(p.y + 18, this.scale.height - 115)) + 'px';
        this.hoverBox.classList.remove('hidden');
    });
    const oldUpdate = this.update.bind(this);
    this.update = function (t) {
        oldUpdate(t);
        const p1 = this.input.pointer1, p2 = this.input.pointer2;
        if (p1 && p2 && p1.isDown && p2.isDown) {
            const d = Math.hypot(p2.x - p1.x, p2.y - p1.y);
            if (this._pinchD)
                this.cameras.main.setZoom(Ot.Math.Clamp(this.cameras.main.zoom * d / this._pinchD, .32, 1.9));
            this._pinchD = d;
            this.dragStart = void 0;
            this.preview = void 0;
            this.previewPlan = null;
        }
        else
            this._pinchD = 0;
    };
};
Ve.prototype.sync = function () {
    oldSync.call(this);
    if (!this.backdrop)
        return;
    const name = CX.maps[visualMapIdx(this.b.mapIndex)];
    const mapKey = MAP_HQ[name] || 'map-' + name;
    if (!this.textures.exists(mapKey)) {
        // 지연 로드: 스테이지 전환 때만 필요한 배경을 받는다 (preload에서 전부 받지 않음).
        const file = 'backgrounds/' + (name === 'minas_tirith' ? 'bg_minas_gate' : 'bg_' + name) + '.png?v=p2';
        if (this._mapLoading !== mapKey) {
            this._mapLoading = mapKey;
            this.load.image(mapKey, this.asset(file));
            this.load.once('complete', () => { this._mapLoading = null; if (this.backdrop) this.backdrop.setTexture(mapKey).setTint(variantTint(MAP_TINT[name] || (MAP_HQ[name] ? 0xffffff : 0xb6b5a4), mapVariant(this.b.wave||1))).setDisplaySize(pt.width, pt.height); });
            this.load.start();
        }
    } else
        this.backdrop.setTexture(mapKey).setTint(variantTint(MAP_TINT[name] || (MAP_HQ[name] ? 0xffffff : 0xb6b5a4), mapVariant(this.b.wave||1))).setDisplaySize(pt.width, pt.height);
    this.boundary.clear();
    // Soft stepped fog margins remain outside the legal base-center boundary.
    for (let i = 0; i < 5; i++) {
        const w = 5 + i * 5;
        this.boundary.lineStyle(w, 0x141b17, .10);
        this.boundary.strokeRect(8, 8, pt.width - 16, pt.height - 16);
    }
    this.boundary.fillStyle(0x111813, .55);
    this.boundary.fillRect(0, 0, 12, pt.height);
    this.boundary.fillRect(pt.width - 12, 0, 12, pt.height);
    this.boundary.fillRect(0, 0, pt.width, 25);
    this.boundary.fillRect(0, pt.height - 12, pt.width, 12);
    const _objTxt = this.b.mission === 'defense' ? '방어선' : this.b.mission === 'hold' ? '거점 · 3라운드 확보' : this.b.mission === 'rescue' ? '포로 구출 지점' : this.b.mission === 'breakthrough' ? '남쪽 돌파선' : '';
    const _objPos = this.b.mission === 'breakthrough' ? { x: 1165, y: 1178 } : { x: Mt.objective.x, y: Mt.objective.y - 190 };
    this.objectiveLabel.setBackgroundColor('rgba(0,0,0,0)').setStroke('#162027',3).setText(_objTxt).setPosition(_objPos.x, _objPos.y).setVisible(this.b.phase !== 'menu' && !!_objTxt);
    for (const u of this.b.alive()) {
        const c = this.tokens.get(u.uid);
        if (!c)
            continue;
        const sprite = c.getByName('token');
        if (!sprite.getData('baseSX')) {
            sprite.setData('baseSX', sprite.scaleX);
            sprite.setData('baseSY', sprite.scaleY);
            sprite.setData('cxy', __figCenterPx(this.textures.get(u.id).getSourceImage(), sprite.displayWidth, sprite.displayHeight));
        }
        if (!c.getByName('base')) {
            const _bm = q.meta.get(u.id), key = _bm ? 'basefile:' + baseFile(_bm) : 'basefile:bases/base_gondor_M.png', base = this.textures.exists(key) ? this.add.image(0, 0, key).setDisplaySize(u.radius * 2.45, u.radius * 2.45).setName('base') : this.add.ellipse(0, 1, u.radius * 2.3, u.radius * 1.75, u.side === 'good' ? 0x87897a : 0x3a332c, .97).setStrokeStyle(2, u.side === 'good' ? 0xc9c4a8 : 0x6b4a3c).setName('base');
            c.addAt(base, 1);
        }
        sprite.setAlpha(1); // Spent units use the cached grayscale texture in the clarity adapter.
        c.getByName('label').setVisible(u.uid === this.b.selected || u.traits.includes('hero'));
        c.getByName('rim').setStrokeStyle(2, u.side === 'good' ? 0xded9bf : 0x8a5a45, .9);
    }
};
function __figCenterPx(img, dw, dh) {
    const w = 96, h = Math.max(1, Math.round(96 * img.height / img.width)), cv = document.createElement('canvas');
    cv.width = w; cv.height = h;
    const x = cv.getContext('2d', { willReadFrequently: true });
    x.drawImage(img, 0, 0, w, h);
    const d = x.getImageData(0, 0, w, h).data;
    const col = new Float64Array(w), row = new Float64Array(h);
    let x0 = w, x1 = -1, y0 = h, y1 = -1;
    for (let y = 0; y < h; y++) for (let i = 0; i < w; i++) { const a = d[(y * w + i) * 4 + 3]; if (a > 16) { col[i] += a; row[y] += a; if (i < x0) x0 = i; if (i > x1) x1 = i; if (y < y0) y0 = y; if (y > y1) y1 = y; } }
    if (x1 < 0) return { x: 0, y: 0, fx: 1, fy: 1 };
    const core = (arr, lo, hi) => {
        let s = 0, cx = 0; for (let i = lo; i <= hi; i++) { s += arr[i]; cx += i * arr[i]; }
        cx = s ? cx / s : (lo + hi) / 2;
        let L = Math.max(lo, Math.floor(cx)), R = Math.min(hi, L), acc = arr[L] || 0; const goal = s * .8;
        while (acc < goal && (L > lo || R < hi)) { const a = L > lo ? arr[L - 1] : -1, b = R < hi ? arr[R + 1] : -1; if (a >= b) { L--; acc += Math.max(0, a); } else { R++; acc += Math.max(0, b); } }
        return (R - L + 1) / (hi - lo + 1);
    };
    return { x: (0.5 - (x0 + x1 + 1) / 2 / w) * dw, y: (0.5 - (y0 + y1 + 1) / 2 / h) * dh, fx: core(col, x0, x1), fy: core(row, y0, y1) };
}
Ve.prototype.update = function (time) { if (!this.tokens || this.busy)
    return; for (const u of this.b.alive()) {
    const c = this.tokens.get(u.uid), s = c?.getByName('token');
    if (!s || !s.getData('baseSX'))
        continue;
    let kind = c.getData('ik'); if (kind === undefined) { kind = window.TokenIdle.classify(u.id, this.b.meta.get(u.id)); c.setData('ik', kind); }
    const m = window.TokenIdle.sample(kind, time, u.uid);
    s.setScale(s.getData('baseSX') * m.sx, s.getData('baseSY') * m.sy);
    { const _c = s.getData('cxy') || { x: 0, y: 0 }; s.setPosition(m.dx * u.radius * 2 + _c.x, m.dy * u.radius * 2 + _c.y); }
} };
Ve.prototype.drawRings = function () {
    if (!this.rings)
        return;
    const g = this.rings, b = this.b;
    g.clear();
    this.labels.removeAll(true);
    const font = { fontFamily: 'Pretendard', fontSize: '20px', color: '#eee5c9', backgroundColor: '#1b211cea', padding: { x: 8, y: 5 } };
    const label = (x, y, text, style = {}) => this.labels.add(this.add.text(x, y, text, { ...font, ...style }).setOrigin(.5));
    if (b.phase === 'menu')
        return;
    // UI v2 map palette — role colours with a dark under-stroke so every mark reads on busy painted maps.
    const Z = UX.zoom || 1, INK = 0x0b100d, ALLY = 0x58c9a5, ALLY_HI = 0x9ff0cf, FOE = 0xe8705e, FOE_HI = 0xffa898, GOLD = 0xe9c97e, GOLD_HI = 0xfbe8b0, MOVE = 0x62c6f2, MOVE_HI = 0xc4ecff, CHARGE = 0xff9a52, AMBER = 0xf2c45a, TARGET = 0xff5f4a;
    const duo = (w, color, alpha, draw) => { g.lineStyle(w + 3.5 / Z, INK, .62 * alpha); draw(); g.lineStyle(w, color, alpha); draw(); };
    const dashCircle = (x, y, r, w, color, alpha, n = 40) => { for (let i = 0; i < n; i++) { const a0 = i * Math.PI * 2 / n, a1 = a0 + Math.PI / n * 1.15; duo(w, color, alpha, () => { g.beginPath(); g.arc(x, y, r, a0, a1); g.strokePath(); }); } };
    if (b.phase === 'preparation') {
        g.fillStyle(ALLY, .13);
        g.fillRect(24, 285, pt.width - 48, pt.deployY - 285);
        for (let x = 24; x < pt.width - 24; x += 34) { const x2 = Math.min(x + 20, pt.width - 24); duo(3, ALLY_HI, .95, () => g.lineBetween(x, pt.deployY, x2, pt.deployY)); }
        label(1165, pt.deployY - 28, '배치 구역 · 병사를 선택하고 빈 땅을 클릭');
        g.fillStyle(FOE, .09);
        g.fillRect(24, pt.height - 160, pt.width - 48, 140);
        g.lineStyle(3, FOE, .5);
        g.strokeRect(24, pt.height - 160, pt.width - 48, 140);
        label(pt.width / 2, pt.height - 92, '적 진입 예상 · 하단 방향');
    }
    if (['hold', 'defense', 'rescue'].includes(b.mission)) {
        g.fillStyle(FOE, .035);
        g.fillCircle(Mt.objective.x, Mt.objective.y, Mt.objective.radius);
        g.lineStyle(7, FOE, .10);
        g.strokeCircle(Mt.objective.x, Mt.objective.y, Mt.objective.radius - 4);
        dashCircle(Mt.objective.x, Mt.objective.y, Mt.objective.radius, 3, FOE_HI, .8, 56);
    }
    if (b.mission === 'breakthrough') {
        g.fillStyle(0xb4c891, .25);
        g.fillRect(12, 1200, pt.width - 24, 244);
        label(1165, 1225, '돌파 지점 · 아군 2기 도달 후 라운드 종료');
    }
    const selected = b.unit(b.activeMoverUid || this.dragUnit || b.selected);
    if (selected?.alive) {
        const u = selected, r = b.remaining(u);
        if (actionableUnit()?.uid !== u.uid) {
            duo(2.5 / Z, GOLD_HI, .95, () => g.strokeCircle(u.x, u.y, u.radius + 10));
        }
        // Current-unit label is a fixed-size DOM overlay, not downscaled canvas text.
        if (b.phase === 'move' && b.canAct(u) && !b.engaged(u)) {
            const stamp=[u.uid,u.x,u.y,r,...b.alive().map(v=>`${v.uid}:${v.x},${v.y}`),...b.terrain.map(t=>`${t.id}:${t.active}`)].join('|');
            if(this._rangeStamp!==stamp){
                const obstacles=b.terrain.filter(t=>t.active&&!lowBarrier(t)),enemies=b.alive().filter(v=>v.side!==u.side||v.uid===u.uid);
                // Dense rays + bisection put the edge exactly on walls/zone borders (no staircase),
                // then single-ray spikes are trimmed and the outline is rounded with Chaikin (draw only).
                const N=144,STEP=11,R=new Array(N);
                const at=(a,d)=>({x:u.x+Math.cos(a)*d,y:u.y+Math.sin(a)*d});
                const stopOk=p=>Et(u,p,enemies,obstacles)&&Et(u,p,enemies,b.terrain);
                for(let i=0;i<N;i++){
                    const a=i*Math.PI*2/N;let last=0,hit=0;
                    for(let distance=STEP;distance<=r+STEP;distance+=STEP){const d=Math.min(distance,r),p=at(a,d);
                        if(!Et(u,p,enemies,obstacles)){if(!hit)hit=d;break;}
                        if(Et(u,p,enemies,b.terrain)){last=d;hit=0;}else if(!hit)hit=d;
                        if(d===r)break;
                    }
                    if(hit&&hit>last){let lo=last,hi=hit;for(let k=0;k<4;k++){const mid=(lo+hi)/2;if(stopOk(at(a,mid)))lo=mid;else hi=mid;}last=lo;}
                    R[i]=last;
                }
                for(let i=0;i<N;i++){const p=R[(i+N-1)%N],n=R[(i+1)%N];if(R[i]>Math.max(p,n)+20)R[i]=Math.max(p,n);}
                let pts=R.map((d,i)=>at(i*Math.PI*2/N,d));
                for(let it=0;it<2;it++){const out=[];for(let i=0;i<pts.length;i++){const A=pts[i],B=pts[(i+1)%pts.length];out.push({x:A.x*.75+B.x*.25,y:A.y*.75+B.y*.25},{x:A.x*.25+B.x*.75,y:A.y*.25+B.y*.75});}pts=out;}
                this._rangePoints=pts;
                this._rangeStamp=stamp;
            }
            const points=this._rangePoints,z=UX.zoom||1;
            // Two-tone boundary survives both light stone and dark ground.
            g.fillStyle(MOVE,.15);g.fillPoints(points,true);
            g.lineStyle(12/z,MOVE,.14);g.strokePoints(points,true);
            g.lineStyle(5.5/z,INK,.45);g.strokePoints(points,true);
            g.lineStyle(2.4/z,MOVE_HI,1);g.strokePoints(points,true);
            for(const t of b.terrain.filter(t=>t.active&&!t.z&&ht(t,u)<r+Math.max(t.w,t.h))){
                const jump=lowBarrier(t);
                g.lineStyle(1.4/z,jump?GOLD:FOE_HI,jump?.7:.45);g.strokeRoundedRect(t.x-t.w/2,t.y-t.h/2,t.w,t.h,Math.min(10,t.h/3,t.w/3));
            }
            for(const foe of b.alive(Ht(u.side)).filter(v=>ht(v,u)<=r+u.radius+v.radius+UNIT_RULES.chargeTolerance)){
                const plan=chargePlan(u,foe,b.alive(),b.terrain,r);if(!plan)continue;
                const fr=foe.radius+9/z;g.fillStyle(CHARGE,.14);g.fillCircle(foe.x,foe.y,fr);
                for(let k=0;k<4;k++)duo(3.2/z,CHARGE,1,()=>{g.beginPath();g.arc(foe.x,foe.y,fr,k*Math.PI/2+.2,k*Math.PI/2+1.37);g.strokePath();});
            }
            const plan=this.chargeTarget?.plan||this.previewPlan,dest=plan?.to||this.preview;
            if(dest){
                const color=this.chargeTarget?CHARGE:plan?MOVE_HI:TARGET;
                g.fillStyle(color,.2);g.fillCircle(dest.x,dest.y,u.radius);
                duo(2.6/z,color,1,()=>g.strokeCircle(dest.x,dest.y,u.radius));
                if(!plan){duo(3/z,TARGET,1,()=>{const k=u.radius*.5;g.lineBetween(dest.x-k,dest.y-k,dest.x+k,dest.y+k);g.lineBetween(dest.x+k,dest.y-k,dest.x-k,dest.y+k);});}
                if(plan){
                    const line=width=>{g.lineStyle(width/z,width>4?INK:color,width>4?.6:1);g.beginPath();g.moveTo(plan.path[0].x,plan.path[0].y);for(const p of plan.path.slice(1))g.lineTo(p.x,p.y);g.strokePath();};line(14);g.lineStyle(10/z,color,.18);g.beginPath();g.moveTo(plan.path[0].x,plan.path[0].y);for(const p of plan.path.slice(1))g.lineTo(p.x,p.y);g.strokePath();line(3.5);
                    const prev=plan.path.at(-2)||u,a=Math.atan2(dest.y-prev.y,dest.x-prev.x),tip=18/z;
                    g.fillStyle(INK,.7);g.fillTriangle(dest.x+Math.cos(a)*2/z,dest.y+Math.sin(a)*2/z,dest.x-Math.cos(a-.5)*(tip+3/z),dest.y-Math.sin(a-.5)*(tip+3/z),dest.x-Math.cos(a+.5)*(tip+3/z),dest.y-Math.sin(a+.5)*(tip+3/z));
                    g.fillStyle(color,1);g.fillTriangle(dest.x,dest.y,dest.x-Math.cos(a-.5)*tip,dest.y-Math.sin(a-.5)*tip,dest.x-Math.cos(a+.5)*tip,dest.y-Math.sin(a+.5)*tip);
                    label(dest.x,dest.y+u.radius+23/z,`${this.chargeTarget?'돌격 · ':''}${(plan.distance/45).toFixed(1)}″ · 잔여 ${Math.max(0,(r-plan.distance)/45).toFixed(1)}″${this.chargeTarget?` · 결투 ${sel.stats.fight}v${this.chargeTarget.u.stats.fight} · 상처 ${oe(sel.stats.strength,this.chargeTarget.u.stats.defence)}+${this.chargeTarget.u.traits.includes('terror')?' · ⚠공포 검사':''}`:''}`,{color:'#f0e0b7'});
                }else label(dest.x,dest.y+u.radius+23/z,'이동 불가',{color:'#efaf9b'});
            }
        }
        if (b.phase === 'shoot' && u.stats.shootRange) {
            g.fillStyle(AMBER, .07);
            g.fillCircle(u.x, u.y, u.stats.shootRange);
            dashCircle(u.x, u.y, u.stats.shootRange, 2.6 / Z, AMBER, .95, 64);
            for (const v of b.validTargets(u)) {
                const rr = v.radius + 11 / Z;
                g.fillStyle(TARGET, .16); g.fillCircle(v.x, v.y, rr);
                duo(3 / Z, TARGET, 1, () => g.strokeCircle(v.x, v.y, rr));
                for (let k = 0; k < 4; k++) { const a = k * Math.PI / 2; duo(3 / Z, TARGET, 1, () => g.lineBetween(v.x + Math.cos(a) * (rr - 6 / Z), v.y + Math.sin(a) * (rr - 6 / Z), v.x + Math.cos(a) * (rr + 9 / Z), v.y + Math.sin(a) * (rr + 9 / Z))); }
                const _hit = Math.min(6, u.stats.shootValue + (u.moved ? pt.movePenalty : 0) + (_t(u, v, b.terrain) === 'cover' ? 1 : 0) + (b.terrain.some(t => t.z === 'hill' && t.active && le(u, t, 0)) ? -1 : 0));
                label(v.x, v.y + v.radius + 14 / Z, `명중 ${_hit}+ · 상처 ${oe(u.stats.strength, v.stats.defence)}+`, { fontSize: '14px', color: '#ffd9c2', padding: { x: 5, y: 3 } });
            }
        }
    }
    // Spear/pike support: gold link from each ranked supporter to the model it fights through.
    for (const group of Oe(b.alive()))
        for (const l of supportFor(group)) {
            duo(2.5, GOLD, .95, () => { g.lineBetween(l.unit.x, l.unit.y, l.via.x, l.via.y); g.strokeCircle(l.unit.x, l.unit.y, l.unit.radius + 5); });
        }
    for (const u of b.alive()) {
        const color = u.side === 'good' ? ALLY_HI : FOE_HI;
        const fa = (u.angle || 0) * Math.PI / 180;
        // Facing: small team-coloured wedge just outside the base.
        { const r0 = u.radius + 3, r1 = u.radius + 13, w = .22; g.fillStyle(INK, .6); g.fillTriangle(u.x + Math.cos(fa) * (r1 + 2), u.y + Math.sin(fa) * (r1 + 2), u.x + Math.cos(fa - w - .05) * (r0 - 1), u.y + Math.sin(fa - w - .05) * (r0 - 1), u.x + Math.cos(fa + w + .05) * (r0 - 1), u.y + Math.sin(fa + w + .05) * (r0 - 1)); g.fillStyle(color, 1); g.fillTriangle(u.x + Math.cos(fa) * r1, u.y + Math.sin(fa) * r1, u.x + Math.cos(fa - w) * r0, u.y + Math.sin(fa - w) * r0, u.x + Math.cos(fa + w) * r0, u.y + Math.sin(fa + w) * r0); }
        if (u.stats.wounds > 1) {
            g.lineStyle(9, INK, .6); g.beginPath(); g.arc(u.x, u.y, u.radius + 4, 0, Math.PI * 2); g.strokePath();
            for (let i = 0; i < u.stats.wounds; i++) {
                const a = -Math.PI / 2 + i * Math.PI * 2 / u.stats.wounds + .07, z = -Math.PI / 2 + (i + 1) * Math.PI * 2 / u.stats.wounds - .07;
                g.lineStyle(5, i < u.currentWounds ? (u.currentWounds / u.stats.wounds <= .34 ? 0xff6a50 : u.side === 'good' ? 0x7fd36b : FOE_HI) : 0x2b2622, 1);
                g.beginPath();
                g.arc(u.x, u.y, u.radius + 4, a, z);
                g.strokePath();
            }
        }
        const status = b.engaged(u) ? CHARGE : u.acted ? 0x6b6f66 : u.movementSpent ? AMBER : (u.side === 'good' ? ALLY : FOE);
        const sx = u.x + u.radius * .78, sy = u.y - u.radius * .78;
        g.fillStyle(INK, .9);
        g.fillCircle(sx, sy, 9.5);
        g.fillStyle(status, 1);
        g.fillCircle(sx, sy, 6);
        g.fillStyle(0xffffff, .45);
        g.fillCircle(sx - 1.8, sy - 1.8, 2.2);
        if (b.engaged(u))
            for (const v of b.alive(Ht(u.side)).filter(v => Vt(u, v)))
                duo(2.6, CHARGE, .9, () => g.lineBetween(u.x, u.y, v.x, v.y));
    }
    for (const area of b.warnings || []) {
        g.fillStyle(TARGET, .22);
        g.fillCircle(area.x, area.y, area.radius);
        dashCircle(area.x, area.y, area.radius, 5, FOE_HI, 1, 36);
        label(area.x, area.y, '다음 라운드 · 그론드', { color: '#ffd2ab' });
    }
};
const oldTween = Ve.prototype.tween;
Ve.prototype.tween = function (target, props, ms) { if (window._lwbFx) { Object.assign(target, props); return Promise.resolve(); } return oldTween.call(this, target, props, Math.max(12, (ms || 250) / Math.min(qt, 5))); };
Ve.prototype.combat = async function (result) {
    const frames = result.strikeResults.slice(0, qt >= 20 ? 2 : 12); // instant mode condenses presentation, not simulation
    for (const hit of frames) {
        const u = this.b.unit(hit.attacker), v = this.b.unit(hit.target), sprite = this.tokens.get(u?.uid)?.getByName('token');
        if (!u || !v || !sprite)
            continue;
        const type = window.TokenIdle.attackTypeFor(u.id, this.b.meta.get(u.id));
        const c = this.tokens.get(u.uid), sx = sprite.getData('baseSX') || sprite.scaleX, sy = sprite.getData('baseSY') || sprite.scaleY;
        const fx = this.add.image(v.x, v.y, 'fx-' + type).setDisplaySize(v.radius * 2.5, v.radius * 2.5).setDepth(12);
        this.soundFX.play(result.kind === 'shot' ? 'arrow_release' : u.traits.includes('monster') ? 'base_contact' : hit.wound ? 'sword_flesh' : 'sword_shield');
        const duration = qt >= 20 ? 12 : 250 / qt;
        const start = performance.now();
        await new Promise(resolve => { const frame = () => { const t = Math.min(1, (performance.now() - start) / duration), m = window.TokenIdle.attackSample(type, t); sprite.setScale(sx * m.sx, sy * m.sy); { const _c = sprite.getData('cxy') || { x: 0, y: 0 }; sprite.setPosition(m.dx * u.radius * 2 + _c.x, m.dy * u.radius * 2 + _c.y); } fx.setAlpha(1 - t); if (t < 1)
            requestAnimationFrame(frame);
        else
            resolve(); }; frame(); });
        fx.destroy();
        sprite.setScale(sx, sy).setPosition(0, 0);
        const text = this.add.text(v.x, v.y - v.radius - 15, hit.prevented || (hit.killed ? '처치' : hit.wound ? '−1' : 'Defense'), { fontFamily: 'Pretendard', fontSize: hit.killed ? '30px' : '23px', color: hit.killed ? '#ff9166' : hit.wound ? '#f3b69b' : '#e6dfbd', stroke: '#141a17', strokeThickness: 4 }).setOrigin(.5).setDepth(15);
        this.tween(text, { y: text.y - 30, alpha: 0 }, 550).then(() => text.destroy());
        if (hit.killed) { const dead = this.tokens.get(v.uid); if (dead) dead.setVisible(false); }
        if (hit.wound) {
            const victim = this.tokens.get(v.uid)?.getByName('token');
            victim?.setTint(0xffceab);
            this.time.delayedCall(110, () => { if (victim?.scene) victim.clearTint(); });
        }
    }
    await Promise.all(result.pushVectors.map(p => { const c = this.tokens.get(p.uid); return c ? this.tween(c, { x: p.to.x, y: p.to.y }, 180) : Promise.resolve(); }));
};
const oldPlay = Ve.prototype.play;
Ve.prototype.play = async function (e) { if (e.type === 'HeroSkill') {
    const u = this.b.unit(e.uid);
    if (u) {
        const fx = this.add.image(u.x, u.y, u.traits.includes('wizard')?'fx-cast':'fx-rally').setDepth(12).setDisplaySize(220, 220);
        await this.tween(fx, { alpha: 0 }, 400);
        fx.destroy();
    }
} return oldPlay.call(this, e); };
// UI helpers use the same images as the battlefield and inventory.
const PATCH_NOTES = [
    ['v1.19', ['유물 아이콘 전수 복구 — 58종 유물 전용 픽셀 아이콘 (기존 ✦ 대체)', '맵 소품 시스템 버그 수정 — 배열 구멍 29곳·변형0 널 반환으로 5스테이지마다 소품 누락되던 것', '무결 수비 보너스 — 전사자 없이 클리어 시 +25금', '다중상처 유닛 토큰에 상처 카운터 표시 — 영웅·트롤·보스 2/3 형태', '명예의 전당에 업적 해금 카운터', '구출 미션 포로 합류 — 거점 해방 시 아르노르 전사 영입', '저장 슬롯에 저장된 스테이지 표시', '엘리트 적 금색 테두리+★ 표시', '팔란티르 보유 시 정찰 보고 전체 편성 공개','신규 미션 보급 호송 — 짐수레를 남쪽 출구까지 호송 · 파괴 시 패배','유물 패스 선택지 — 보고 넘기면 금화 +25','짐승 덫 — 가장 가까운 적 상처+2라운드 속박','지휘관 미션 적 지휘관 ♛ 표시','전투 속도 8배 추가 · 함정 다수 배치 시 겹침 방지']],
    ['v1.18', ['콘텐츠 대량 확장 — 캠프 이벤트 7종 추가 (엠인 무일·베오르닝·남쪽 상인·이센가드·아르고나스·죽음의 늪·버려진 광산)', '스테이지 도전 2종 — 마력 폭풍(적 Will+2)·장궁 사수(적 사거리+1)', '도전 과제 3종 — 영웅 사냥꾼·왕의 금고·절망의 생존자', '동맹 지원 5종 — 엔트·베오른(곰)·돌 암로스 백조기사·카자드 근위병×2·샘물수위병×2', '신규 유물 2종 — 안두인의 안개(적 궁수 사거리 −1)·검은 숨결(적 용기 −1)', '캠프 카드에 전투 요약(처치·전사·생존) · 도움말에 위협/상태 아이콘 설명 · 보스 바운티 상처 비례 차등']],
    ['v1.17', ['레이드 보스전 완성 — 용 화염 브레스·불덩이 발사체·격노(체력 반 공격+1)·준비 화면 보스 경고·미니맵 보스 점·보스 처치 금화+80·용 사냥꾼 도전', '위협 표시 — 선택 유닛을 돌격 가능한 적 ⚠·사거리 내 궁수 🏹 표시', '절망 난이도 보스 4스테이지 주기 실적용 + 보스 클리어 시 희귀 유물 보장', '유닛 사망 페이드아웃 연출 · 타이틀 버전 자동 표시', '보스전 마무리 — 일식 날씨·격노 체력바 표시·처치 슬로우모션·사망 카메라 팬·보스 사냥꾼 태그·스탯 미리보기·큰 유닛 스폰 분리', '상태 아이콘 — 겁먹음 😨·넘어짐 💥·보호 🛡·조준 🎯 상시 표시']],
    ['v1.16', ['레이드 보스전 — 스마우그·글라우룽·앙칼라곤 BOSS급 거대화 (일반 유닛 6배) + 상단 보스 체력바', '보스 인트로 후 카메라 팬·흔들림 + 발 밑 붉은 오라 + 처치 시 레이드 격파 배너·금화 +80', '엘더 보스도 확대 — 웅골리안트·고스모그 발록·전쟁 트롤 표시 크기 상향']],
    ['v1.15', ['교전 우선권 — 탭한 교전부터 해결 + 다음 교전 금색 표시', '전장 날씨 연출 — 비·어둠·안개·눈·일식·강풍·서리·진창 틴트', 'MESBG 밀림 저항 — 영웅·견고 유닛 용기 판정 성공 시 밀림 완전 저항', 'MESBG 주문 저항 — 공격 주문 대상 영웅이 Will 소비해 4+ 저항 + 연출', '캠프 장비 판매·상점 추천 뱃지·전투 기록 필터 칩', '유닛 카드에 교전 상대·장착 장비 표시 + 자동 CP 명령']],
    ['v1.14', ['난이도 4단계 절망 — 적 수+엘리트 증가·보스 4스테이지 주기·보상 상향', 'MESBG 영웅 행동 전면 접목 — 영웅적 일격/수비/사격/진군·영웅의 전투·운명의 일격(마이트 재굴림)', '마법 시스템 신설 — Will 주문 20종, 마법사 커맨드 + AI 자동 시전', '난이도별 적 AI 차등 — 절망은 부상·저방어 표적 집중', '상점 전면 재편 — 캠프 독립 단계·픽셀 아이콘·장비 39종 랜덤 재고·영웅 전용·판매', '안두릴·글람드링 등 유명 무기는 유니크 고가 장비로', '적 위협 범위 표시 — 적 카드 열면 도달·사거리 링', '야영 이벤트 일러스트 10종·스테이지 인트로 아트 카드·캠프 화면 아트 헤더', '유닛 프로필에 장착 장비 표시', '자동 버튼 하단 바 상시 배치 + 배율 버튼', 'MESBG 깃발 룰 — 전투 기·우루크 기수 3″ 내 결투 최저값 재굴림', '전투 연출 확충 — 주문·함정·공포·영웅행동·회복·상처막음에 유닛 위 시각효과 + 영웅 처치 배너', '돌격/사격 전망 표시 — 결투 비교·상처·명중 필요값·공포 경고', '준비 화면 로스터에 장비 아이콘 + 전투 기록 색상 구분 + 상처 유닛 피 배지']],
    ['v1.13', ['전장 로딩 대폭 단축 — 부팅 시 필요한 에셋만 받고 유닛 토큰은 등장할 때 지연 로드', 'BGM 다이나믹 — 메뉴·야영지에서 잦아들고 보스전에서 고조', '승리·패배 팡파레', '도크에 배속 퀵버튼 (×1/×2/×4)', '킬스트릭 표시 + 광전사 금화 보상', '유닛 배치 후 다음 미배치 병사 자동 선택', '스테이지 전환·교전 추적 시 부드러운 카메라 이동', '도전 의뢰 — 강한 적 대신 금화 추가', '엘리트 적 표식 + 처치 보상']],
    ['v1.12', ['타이틀 화면 개편', '영입·패널 초상화가 바로 뜨도록 경량 이미지와 로딩 표시 추가', '영웅·유물 등급 색 구분 강화']],
    ['v1.11', ['유닛 카드에 상성 힌트 표시 (기병·창·사격 등)', '진행 속도 + ↺ 직전 라운드 되돌리기', '영웅 장비 상점: 전투검·판금갑옷·사냥활·전투기·치유연고', '전장에 중립 화약통 — 어느 쪽이든 근접하면 폭발', '야영지에서 다음 전투 적 편성·진입 방향 정찰 보고', '유명 조합 영웅이 나란히 서면 가끔 대사', '이번 주 원정 모드 — 주마다 다른 규칙 + 주간 최고 기록', '영웅 처치 +2 CP · 거점 점령 진행 시 다음 라운드 +1 CP']],
    ['v1.10', ['동맹 지원병이 스스로 진형을 잡고 행동합니다 (플레이어 조작 불필요)', '같은 진영 아군이 근접하면 결투 +1 (전우 유대)', '야영지 함정: 투석기 · 불통 — 다음 전투에서 자동 발동', '발로그 공포 강화: 근처 아군 결투 -1, 공포 검사 더 어려움', '패배 시 금화 60으로 같은 스테이지 재도전', '업적 시스템 — 명예의 전당에 배지 표시', '결과 화면에 기록 공유 코드']],
['v1.9', ['고지 사격 보너스 + 날씨(비·밤·안개) 명중 영향','부상 시스템 + 야영지 약제사','동맹 지원: 다음 전투 한정 소환병 구입','오늘의 도전: 매일 같은 시드 원정','결과 화면 전투 기록 + 부대명·영웅 별칭','발라의 은총: 전사한 영웅을 부활시키는 야영지 이벤트','자동 진행 중 화면 터치로 일시정지','AI 개선: 갇힌 적이 목표로 우회, 궁수는 근접 시 후퇴','전투 기록 패널: 좌하단 기록 버튼으로 최근 30건 열람','영웅 58명 고유 능력 추가','명예록: 전사한 영웅을 캠프·결과 화면에 기록','난이도 선택: 쉬움/보통/어려움 — 적 수·보상 조절','영입 필터 탭: 등급·전투 유형별 보기','지역별 하위 전장 48종 — 지형·소품·하늘이 웨이브마다 변화','전장 수식어 13종(눈보라·일식·강풍·서리 등) + 전투 HUD 표시','주간 규칙 12종 — 매주 다른 전투 조건','유물 68종 · 이벤트 63종 · 도전 의뢰 12종 · 보너스 목표 15종','베테랑 승급: 병사 XP 6 누적 시 자동 승급','야영지 상시 약초 치료 + 전투 훈련(경험치) 구입','기마 낙마: 기마 영웅 첫 상처 시 도보 버전으로 전환','함정 6종 · 동맹 지원팩 10종 · 장비 14종 · 업적 20종']],
['v1.8', ['저장 슬롯 3개 + 자동 저장','보스 등장 배너','모바일 핀치 줌·카메라 자동 이동','신규 명령: 강행군·결집·응급 치료','유물 아이콘 34종 실물 아트']],
['v1.7', ['통행금지 지형: 절벽·강·성벽 — 비행/산악 특성만 통과','픽셀 탑다운 맵 16종','토큰 429종 투명 복구','괴수 발판 70mm 확대 + 스프라이트 넘침 상한']]
];
window.__PATCH_NOTES = PATCH_NOTES; // kept outside esc(): it used to sit after esc's return and never ran
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
Object.assign(CX.skills,{
fingolfin_mounted: ['모르고스를 향한 도전','might',1,'이번 라운드 Attack +2, 결투 +1.',{self:{attacks:2,fight:1}}],
gandalf_white:['백색의 빛','will',1,'주변 아군 용기 +2, 공포 면역.',{ally:{stats:{courage:2},protect:1}}],
theoden_foot: ['에오헬레!','might',1,'주변 기병 결투 +1, 용기 +1.',{ally:{trait:'mounted',stats:{fight:1,courage:1}}}],
eomer_foot: ['로히림의 돌격','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],
aragorn_blackgate:['서부 왕의 위엄','might',1,'주변 아군 용기 +2.',{ally:{stats:{courage:2}}}],
aragorn_blackgate_mounted: ['왕의 귀환','might',1,'이번 라운드 Attack +2.',{self:{attacks:2}}],
anborn: ['이실리엔의 매복','might',1,'이번 라운드 정밀 사격 3회.',{shots:3}],
hirluin: ['녹색 언덕의 용기','might',1,'이번 라운드 Defense +2.',{self:{defence:2}}],
madril: ['이실리엔의 표적','might',1,'이번 라운드 정밀 사격 3회.',{shots:3}],
irolas: ['칼립통다의 수위','might',1,'이번 라운드 Defense +2.',{self:{defence:2}}],
hurin:['열쇠의 수문장','might',1,'이번 라운드 Defense +3.',{self:{defence:3}}],
cirion: ['곤도르의 대대장','might',1,'주변 아군 결투 +1, 용기 +1.',{ally:{stats:{fight:1,courage:1}}}],
theodred:['왕자의 돌격','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
hama:['문지기의 충직','might',1,'이번 라운드 Defense +2.',{self:{defence:2}}],
deorwine:['근위대장의 맹세','might',1,'이번 라운드 Defense +2.',{self:{defence:2}}],
grimbold: ['그림슬레이드의 전사','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
harding:['동부 변경의 사수','might',1,'이번 라운드 정밀 사격 3회.',{shots:3}],
arvedui:['마지막 왕의 결의','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],
malbeth:['예언자의 환시','will',1,'주변 아군 용기 +2.',{ally:{stats:{courage:2}}}],
numenorean_captain:['누메노르의 군기','might',1,'주변 아군 결투 +1.',{ally:{stats:{fight:1}}}],
paladin_took:['툭 가문의 용맹','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
farmer_maggot: ['농장주의 개들','might',1,'가장 가까운 적에게 개들이 달려 1 상처.',{strike:{n:1,dmg:1,r:150}}],
fredegar:['팻티의 결단','might',1,'이번 라운드 용기 +2.',{self:{courage:2}}],
durin_vi:['카자드둠의 왕','might',1,'이번 라운드 힘 +1, Attack +1.',{self:{strength:1,attacks:1}}],
arathorn: ['두네다인 유격대장','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
angbor: ['그레이 헤븐의 창수','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],
dunhere: ['언더하로우의 창수','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
haleth:['할레스의 마지막 창','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
bandobras:['투크의 황소','might',1,'이번 라운드 힘 +2.',{self:{strength:2}}],
gildor: ['핀로드 가문의 노래','will',1,'주변 아군 용기 +1.',{ally:{stats:{courage:1}}}],
eorl_the_young:['북방의 기마왕','might',1,'이번 라운드 Attack +2.',{self:{attacks:2}}],
helm_hammerhand:['해머핸드의 주먹','might',1,'가장 가까운 적에게 1 상처.',{strike:{n:1,dmg:1,r:150}}],
dervorin:['링글로의 기사','might',1,'이번 라운드 Defense +2.',{self:{defence:2}}],
mablung_sindar: ['도리아스 척후장','will',1,'이번 라운드 정밀 사격 3회.',{shots:3}],
melian:['멜리안의 장막','will',1,'주변 아군 Defense +2, 공포 면역.',{ally:{stats:{defence:2},protect:1}}],
mim:['작은 종족의 독기','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
mirkwood_captain:['어둠숲 매복','might',1,'이번 라운드 정밀 사격 3회.',{shots:3}],
hera:['로힐림의 여걸','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
frealaf:['협곡의 용사','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
duilin:['검은 골짜기의 사수','might',1,'이번 라운드 정밀 사격 3회.',{shots:3}],
derufin:['검은 골짜기의 창수','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],
hirgon:['전령의 용기','might',1,'이번 라운드 용기 +2.',{self:{courage:2}}],
pippin_citadel:['호빗의 결의','might',1,'이번 라운드 용기 +2, Defense +1.',{self:{courage:2,defence:1}}],
lobelia:['외곬골의 매서움','might',1,'가장 강한 적의 Attack -1.',{foeStrongest:{attacks:-1}}],
will_whitfoot:['마을 회의장의 목소리','might',1,'주변 아군 용기 +1.',{ally:{stats:{courage:1}}}],
iron_hills_captain:['철언덕 전열','might',1,'주변 아군 Defense +1.',{ally:{stats:{defence:1}}}],
pallando: ['푸른 마법사의 주술','will',1,'주변 아군 용기 +1, 공포 면역.',{ally:{stats:{courage:1},protect:1}}],
alatar:['푸른 마법사의 빛','will',1,'주변 아군 용기 +1, 공포 면역.',{ally:{stats:{courage:1},protect:1}}],
azaghal:['베레고스트의 왕','might',1,'이번 라운드 Defense +3.',{self:{defence:3}}],
nain:['나인의 도끼','might',1,'이번 라운드 힘 +1, Attack +1.',{self:{strength:1,attacks:1}}],
maglor:['노래의 마법','will',1,'주변 아군 용기 +2.',{ally:{stats:{courage:2}}}],
gwindor:['날라흐의 분노','might',1,'이번 라운드 Attack +2.',{self:{attacks:2}}],
celebrimbor:['단조공의 손','will',1,'주변 아군 결투 +1.',{ally:{stats:{fight:1}}}],
daeron:['다에론의 노래','will',1,'주변 아군 용기 +2.',{ally:{stats:{courage:2}}}],
earnur:['마지막 왕의 도전','might',1,'이번 라운드 Attack +2.',{self:{attacks:2}}],
huor:['후오르의 최후','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],
barahir:['바라히르의 맹세','might',1,'이번 라운드 Defense +2.',{self:{defence:2}}],
elendur:['이실두르의 장자','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}]
});
 }
const RELIC_ICON_FILE={lembas:'relic_lembas',cloak:'relic_elven_cloak',horn:'relic_rohan_horn',horseshoe:'relic_horseshoe',phial:'relic_phial_galadriel',mithril:'relic_mithril_shirt',cart:'relic_wagon',palantir:'relic_palantir',banner:'relic_gondor_banner',arrow:'relic_red_arrow',silmaril:'relic_silmaril',narya:'relic_narya',nenya:'relic_nenya',vilya:'relic_vilya',narsil:'relic_anduril',quiver:'relic_quiver',darkpact:'relic_one_ring',warbanner:'relic_warbanner',durin_axe:'relic_durin_axe',eagle_feather:'relic_eagle_feather',second_breakfast:'res_food',crown_west:'relic_winged_crown',eohere_horn:'relic_eohere_horn',elven_feather:'relic_elven_feather',numenor_map:'relic_map_scroll',pipeweed:'relic_pipeweed',athelas:'relic_athelas',dwarf_axe:'relic_durin_axe',elf_bow:'relic_elf_bow',ithilien_blade:'relic_barrow_blade',westfold_shield:'relic_rohan_shield',rohan_standard:'relic_warbanner',elven_rope:'relic_elven_rope',anduril_hilt:'relic_anduril',barahir_ring:'relic_ring_barahir',rohan_shield:'relic_rohan_knight'};
function relicIcon(r,size=72){
    const f='relics/icons/'+(RELIC_ICON_FILE[r.id]||'relic_'+r.id)+'.png';
    return `<span class="relic-icon" style="width:${size}px;height:${size}px;display:inline-flex;align-items:center;justify-content:center;background:rgba(18,24,17,.55);border:1px solid #6b6f52;border-radius:3px;color:#e6d3a0;font-size:${Math.round(size*.4)}px" aria-hidden="true"><img src="${Ut(f)}" alt="" style="width:92%;height:92%;object-fit:contain" onerror="this.remove();this.parentElement.textContent='✦'"></span>`;
}
function unitImage(id) { const f = q.meta.get(id).file; return `<img src="${Th(f)}" data-full="${Ut(f)}" onerror="${ThFallback}" decoding="async" fetchpriority="high" alt="${esc(q.meta.get(id).name_ko)}">`; }
let __bossStyle = false;
const BOSS_INTRO = {
    cave_troll: { tag: '모리아의 괴수', line: '동굴에서 무언가가 기어나온다 — 트롤이다.', accent: '#b9a98a', glow: 'rgba(160,140,100,.5)', cls: 'bi-doom' },
    saruman: { tag: '아이센가드의 주인', line: '오르상크의 백색 마법사가 배신을 완성한다.', accent: '#d8d3c0', glow: 'rgba(220,220,200,.5)', cls: 'bi-frost' },
    goblin_king: { tag: '고블린 도시의 왕', line: '삼베 군주가 옥좌에서 일어난다 — 동굴 전체가 적이다.', accent: '#a8c48a', glow: 'rgba(120,170,90,.5)', cls: 'bi-void' },
    azog: { tag: '창백한 오크', line: '아조그가 등장한다 — 드워프들의 오랜 원한.', accent: '#cfe0e0', glow: 'rgba(180,220,220,.5)', cls: 'bi-frost' },
    smaug: { tag: '외로운 산의 용', line: '금의 산 아래에서 눈이 뜬다 — 스마우그가 깨어났다.', accent: '#ffb04a', glow: 'rgba(255,140,40,.65)', cls: 'bi-fire' },
    gothmog: { tag: '모굴의 집행자', line: '모르도르의 부관이 전선을 밟고 선다.', accent: '#e07a4a', glow: 'rgba(220,90,40,.55)', cls: 'bi-fire' },
    mouth_of_sauron: { tag: '사우론의 입', line: '검은문이 열리고 그의 혀가 조롱한다 — 남은 것은 싸움뿐.', accent: '#d43b3b', glow: 'rgba(200,50,40,.6)', cls: 'bi-doom' },
    glaurung: { tag: '용의 아버지', line: '불꽃의 전투에서 첫 번째 용이 기어나온다 — 글라우룽.', accent: '#e8963c', glow: 'rgba(235,140,40,.6)', cls: 'bi-fire' },
    carcharoth: { tag: '붉은 아귀', line: '앙그반드의 문지기 늑대 — 실마릴을 삼킨 자.', accent: '#c94a4a', glow: 'rgba(190,50,50,.55)', cls: 'bi-void' },
    gothmog_balrog: { tag: '발록의 왕', line: '곤돌린의 화염 속에서 고스모그가 걸어 나온다.', accent: '#ff6a3c', glow: 'rgba(255,80,20,.7)', cls: 'bi-doom' },
    ancalagon: { tag: '검은 앙칼라곤', line: '분노의 전쟁 — 하늘을 뒤덮는 가장 거대한 용.', accent: '#e8b23c', glow: 'rgba(255,120,30,.7)', cls: 'bi-doom' },
    witchking_fellbeast: { tag: '앙마르의 마술사왕', line: '펠비스트의 울음이 하늘을 가른다 — 무덤의 왕이 내려온다.', accent: '#9db6d9', glow: 'rgba(120,160,220,.55)', cls: 'bi-frost' },
    balrog: { tag: '두린의 파멸', line: '깊은 곳의 불길이 깨어났다 — 채찍과 화염의 그림자.', accent: '#ff8a4a', glow: 'rgba(255,90,30,.6)', cls: 'bi-fire' },
    ungoliant: { tag: '빛을 삼키는 자', line: '어둠이 스스로 기어온다 — 웅골리안트가 배고프다.', accent: '#a883d8', glow: 'rgba(140,90,220,.55)', cls: 'bi-void' },
    sauron: { tag: '어둠의 군주', line: '눈이 너를 보고 있다 — 사우론이 직접 전장에 섰다.', accent: '#e8b23c', glow: 'rgba(235,120,25,.65)', cls: 'bi-eye' },
    morgoth: { tag: '세계의 첫 어둠', line: '발라조차 두려워한 이름 — 모르고스, 암흑의 적.', accent: '#d84343', glow: 'rgba(200,30,30,.6)', cls: 'bi-doom' },
};
function bossIntro(id) {
    if (!__bossStyle) { const st = document.createElement('style'); st.textContent = `#boss-intro{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;background:radial-gradient(ellipse at center,rgba(26,9,6,.9),rgba(0,0,0,.97));z-index:70;animation:bossFade .45s ease}#boss-intro h2{font-size:clamp(30px,7vw,62px);letter-spacing:.1em;margin:0;font-family:'Noto Serif KR',serif}#boss-intro .boss-tag{color:#e8d7c0;letter-spacing:.34em;font-size:12px}#boss-intro img{width:min(34vh,270px);height:auto;filter:drop-shadow(0 14px 34px rgba(0,0,0,.85))}#boss-intro p{color:#c9b9a6;max-width:76%;text-align:center;margin:0;font-size:15px}@keyframes bossFade{from{opacity:0}to{opacity:1}}@keyframes biRise{from{transform:translateY(46px) scale(.82);opacity:0}to{transform:none;opacity:1}}#boss-intro .boss-art{animation:biRise .8s cubic-bezier(.16,.8,.3,1)}
#boss-intro.bi-frost{background:radial-gradient(ellipse at center,rgba(10,18,34,.92),rgba(0,0,0,.97))}#boss-intro.bi-frost img{animation:biRise .8s ease,biDrift 3.2s ease-in-out .8s infinite}@keyframes biDrift{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
#boss-intro.bi-fire{background:radial-gradient(ellipse at center,rgba(52,14,4,.93),rgba(0,0,0,.97))}#boss-intro.bi-fire img{animation:biRise .7s ease,biFlicker .28s ease-in-out .7s infinite alternate}@keyframes biFlicker{from{filter:drop-shadow(0 14px 34px rgba(0,0,0,.85)) brightness(1)}to{filter:drop-shadow(0 10px 42px rgba(255,90,20,.5)) brightness(1.14)}}
#boss-intro.bi-void{background:radial-gradient(ellipse at center,rgba(20,8,34,.94),rgba(0,0,0,.985))}#boss-intro.bi-void img{animation:biRise .9s ease,biPulse 2.1s ease-in-out .9s infinite}@keyframes biPulse{0%,100%{opacity:1}50%{opacity:.72}}
#boss-intro.bi-eye{background:radial-gradient(ellipse at center,rgba(48,20,2,.93),rgba(0,0,0,.97))}#boss-intro.bi-eye img{animation:biRise .75s ease,biGlare 1.6s ease-in-out .75s infinite}@keyframes biGlare{0%,100%{filter:drop-shadow(0 14px 34px rgba(0,0,0,.85))}50%{filter:drop-shadow(0 0 46px rgba(255,170,40,.55))}}
#boss-intro.bi-doom{background:radial-gradient(ellipse at center,rgba(30,4,4,.95),rgba(0,0,0,.985));animation:bossFade .45s ease,biShake .5s linear .5s 2}@keyframes biShake{0%,100%{transform:none}20%{transform:translate(-7px,3px)}40%{transform:translate(6px,-4px)}60%{transform:translate(-5px,-3px)}80%{transform:translate(5px,4px)}}#boss-intro.bi-doom img{width:min(40vh,320px)}
`; document.head.appendChild(st); __bossStyle = true; }
    const old = document.getElementById('boss-intro'); old && old.remove();
    const meta = q.meta.get(id); if (!meta) return;
    const cfg = BOSS_INTRO[id] || { tag: '적장 출현', line: '보스를 처치하면 이 전투에서 승리합니다.', accent: '#ffb08a', glow: 'rgba(240,60,30,.8)', cls: '' };
    const el = document.createElement('div'); el.id = 'boss-intro'; el.className = cfg.cls;
    el.innerHTML = `<div class="boss-tag">WARNING · ${esc(cfg.tag)}</div><h2 style="color:${cfg.accent};text-shadow:0 0 34px ${cfg.glow}">${esc(meta.name_ko)}</h2><div class="boss-art">${unitImage(id)}</div><p>${esc(cfg.line)}</p>`;
    el.onclick = () => el.remove();
    document.body.appendChild(el);
    const _dur = cfg.cls === 'bi-doom' ? 4200 : 3400;
    setTimeout(() => el.remove(), _dur);
    setTimeout(() => { try {
        const _bu = q.alive('evil').find(u => u.id === id) || q.alive('evil').find(u => u.traits && u.traits.includes('boss'));
        const _cam = window.MESBG && window.MESBG.scene && window.MESBG.scene.cameras && window.MESBG.scene.cameras.main;
        if (_bu && _cam) { _cam.pan(_bu.x, _bu.y, 750, 'Sine.easeInOut'); _cam.shake(320, .0045); }
        const _bb = ut('ux-bossbar'); if (_bb && !_bb.classList.contains('hidden')) { _bb.classList.remove('bossbar-in'); void _bb.offsetWidth; _bb.classList.add('bossbar-in'); }
    } catch (e) {} }, Math.min(_dur - 200, 2500));
}
let __siStyle = false;
const LWB_STAGE_ART = { minas_tirith: 'war', osgiliath: 'ruins', amon_sul: 'ruins', helms_deep: 'war', fangorn: 'darkforest', edoras: 'war', moria: 'dark', isengard: 'dark', black_gate: 'dark', gorgoroth: 'dark', rivendell: 'light', lothlorien: 'light', pelennor: 'war', dead_marshes: 'marshes', dunharrow: 'ruins', erebor: 'treasure', mirkwood: 'darkforest', dol_guldur: 'dark', gondolin: 'light', angband: 'dark' };
function stageIntro() {
    if (!__siStyle) { const st = document.createElement('style'); st.textContent = `#stage-intro{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(8,10,6,.62);z-index:68;animation:bossFade .4s ease}#stage-intro .si-card{width:min(430px,88vw);background:#161b12f2;border:1px solid #5a6142;border-radius:14px;overflow:hidden;box-shadow:0 18px 60px #000c;animation:siUp .5s cubic-bezier(.16,.8,.3,1)}@keyframes siUp{from{transform:translateY(34px);opacity:0}to{transform:none;opacity:1}}#stage-intro .si-art{width:100%;height:150px;object-fit:cover;display:block}#stage-intro .si-body{padding:14px 18px 16px;text-align:center}#stage-intro .si-eyebrow{color:#b6bd90;letter-spacing:.3em;font-size:10px;margin-bottom:5px}#stage-intro h2{margin:0 0 6px;font-size:26px;color:#efe4b0;font-family:'Noto Serif KR',serif;letter-spacing:.04em}#stage-intro h2 small{display:block;font-size:12px;color:#c9c39a;margin-top:3px;font-family:Pretendard,sans-serif;letter-spacing:.08em}#stage-intro .si-mission{display:inline-block;background:#232a16;border:1px solid #59603d;color:#e0cf8f;font-size:12px;font-weight:700;padding:4px 14px;border-radius:12px}`; document.head.appendChild(st); __siStyle = true; }
    const old = document.getElementById('stage-intro'); old && old.remove();
    const info = q.current; if (!info) return;
    const key = CX.maps[visualMapIdx(q.mapIndex)] || '';
    const art = LWB_STAGE_ART[key] || (['rain', 'gale', 'snow', 'frost'].includes(info.modifier) ? 'storm' : ['dark', 'eclipse', 'ambush', 'warg'].includes(info.modifier) ? 'dark' : ['fog', 'mud'].includes(info.modifier) ? 'marshes' : 'war');
    const _zn = (MAP_ZONE_NAMES[key] || [])[mapVariant(q.wave || info.n || 1)] || '';
    const modTxt = ({ clear: '', rain: '폭우', dark: '어둠', reinforce: '적 증원', warg: '와르그 사냥대', ambush: '기습', cavalry: '기병 돌격', swarm: '고블린 떼', snow: '눈보라', eclipse: '일식', mud: '진창', gale: '강풍', frost: '서리' })[info.modifier || 'clear'] || '';
    const el = document.createElement('div'); el.id = 'stage-intro';
    el.innerHTML = `<div class="si-card"><img class="si-art" src="events/evt_${art}.jpg" alt="" onerror="this.remove()"><div class="si-body"><div class="si-eyebrow">STAGE ${String(info.n || q.wave).padStart(2, '0')}${info.title ? ' · ' + esc(info.title) : ''}</div><h2>${esc(CX.mapNames[visualMapIdx(q.mapIndex)] || '')}${_zn ? `<small>${esc(_zn)}</small>` : ''}</h2><div class="si-mission">${esc(CX.missionNames[info.mission] || '전투')}${modTxt ? ` · ${modTxt}` : ''}</div></div></div>`;
    el.onclick = () => el.remove();
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2400);
}
let __arcStyle = false;
const ARC_TRANSITIONS = {
    20: { end: 'THE END', endSub: '검은문의 적들이 무너졌다 — 원정은 끝난 듯했다.', teaser: null, teaserTag: 'ACT II · 호빗', teaserText: '외로운 산에서 불꽃이 일어난다 — 스마우그의 그림자가 드리운다.', cls: 'at-fire' },
    35: { end: 'THE END', endSub: '스마우그가 쓰러졌다 — 산 아래에 평화가 온 듯했다.', teaser: '<div class="at-ring"></div><div class="at-eye"></div>', teaserTag: 'ACT III · 사우론 대전', teaserText: '하나의 반지가 깨어난다 — 사우론의 눈이 뜬다.', cls: 'at-eye' },
    40: { end: 'THE END', endSub: '사우론의 눈이 꺼졌다 — 모르도르의 그림자가 물러난 듯했다.', teaser: '<div class="at-tree at-tree-l"></div><div class="at-tree at-tree-r"></div>', teaserTag: 'ACT IV · 실마릴리온', teaserText: '두 나무가 불탄다 — 최초의 어둠과의 전쟁이 시작된다.', cls: 'at-trees' },
    70: { end: 'ALL WARS ENDED', endSub: '발리노르 최후의 대결이 끝났다.', teaser: '<div class="at-dawn"></div>', teaserTag: 'LEGEND CONTINUES', teaserText: '세계의 첫 어둠이 물러갔다 — 그러나 원정은 계속된다.', cls: 'at-dawn' },
};
function arcTransition(stage) {
    const cfg = ARC_TRANSITIONS[stage]; if (!cfg) return;
    if (!__arcStyle) { const st = document.createElement('style'); st.textContent = `#arc-transition{position:fixed;inset:0;z-index:90;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:18px;background:#000;animation:bossFade .5s ease;text-align:center}#arc-transition .at-end{font-family:'Noto Serif KR',serif;font-size:clamp(30px,8vw,64px);letter-spacing:.22em;color:#e8e0c8;margin:0}#arc-transition .at-endsub{color:#8a8574;font-size:14px;max-width:80%}#arc-transition .at-tag{letter-spacing:.4em;font-size:12px;color:#e8d7c0}#arc-transition .at-text{color:#c9b9a6;font-size:15px;max-width:78%}#arc-transition .at-art img{width:min(40vh,300px);filter:drop-shadow(0 0 46px rgba(255,110,20,.65));animation:biFlicker .3s ease-in-out infinite alternate}
#arc-transition.at-fire{background:radial-gradient(ellipse at 50% 90%,rgba(120,30,4,.9),rgba(0,0,0,.98) 70%)}
#arc-transition .at-ring{width:min(26vh,190px);height:min(26vh,190px);border:10px solid #d9b45a;border-radius:50%;box-shadow:0 0 60px rgba(230,190,80,.8),inset 0 0 40px rgba(230,190,80,.5);animation:atRing 2.2s ease-in-out infinite}@keyframes atRing{0%,100%{transform:scale(1)}50%{transform:scale(1.06);box-shadow:0 0 90px rgba(230,190,80,1)}}
#arc-transition .at-eye{position:absolute;top:34%;left:50%;transform:translate(-50%,0);width:min(20vh,150px);height:min(9vh,66px);border-radius:50%;background:radial-gradient(ellipse at center,#ffd34a 0%,#e2571e 45%,#5c0f04 90%);box-shadow:0 0 70px rgba(255,120,20,.75);animation:biPulse 1.8s ease-in-out infinite}#arc-transition .at-eye::after{content:'';position:absolute;top:8%;bottom:8%;left:48%;width:6px;background:#0a0503;border-radius:3px}
#arc-transition.at-eye{background:radial-gradient(ellipse at 50% 36%,rgba(70,10,4,.95),rgba(0,0,0,.985) 62%)}
#arc-transition.at-trees{background:#000}#arc-transition .at-tree{position:absolute;top:6%;width:26vw;height:62vh;border-radius:45%}#arc-transition .at-tree-l{left:14%;background:radial-gradient(ellipse at 50% 30%,rgba(220,235,255,.5),transparent 65%)}#arc-transition .at-tree-r{right:14%;background:radial-gradient(ellipse at 50% 30%,rgba(255,215,120,.5),transparent 65%)}#arc-transition.at-trees .at-tree{animation:atBurn 3.4s ease forwards}@keyframes atBurn{0%{opacity:1;filter:brightness(1)}55%{opacity:.85;filter:brightness(1.3) hue-rotate(-30deg)}100%{opacity:.06;filter:brightness(.2) saturate(0)}}
#arc-transition.at-dawn{background:radial-gradient(ellipse at 50% 70%,rgba(200,180,120,.32),rgba(0,0,0,.98) 70%)}#arc-transition .at-dawn{width:min(30vh,220px);height:min(30vh,220px);border-radius:50%;background:radial-gradient(circle,rgba(255,240,200,.85),rgba(255,190,90,.25) 55%,transparent 75%);animation:atRing 2.6s ease-in-out infinite}
`; document.head.appendChild(st); __arcStyle = true; }
    document.getElementById('arc-transition')?.remove();
    const el = document.createElement('div'); el.id = 'arc-transition';
    el.innerHTML = `<h2 class="at-end">${esc(cfg.end)}</h2><p class="at-endsub">${esc(cfg.endSub)}</p>`;
    document.body.appendChild(el);
    let killed = false; const kill = () => { if (killed) return; killed = true; el.remove(); };
    el.onclick = kill;
    const t1 = setTimeout(() => { if (killed || !el.isConnected) return; el.className = cfg.cls; let art = cfg.teaser || ''; try { if (stage === 20) art = '<div class="at-art">' + unitImage('smaug') + '</div>'; } catch (e) {} el.innerHTML = `${art}<div class="at-tag">${esc(cfg.teaserTag)}</div><p class="at-text">${esc(cfg.teaserText)}</p>`; }, 2600);
    const t2 = setTimeout(kill, 6400);
    el.addEventListener('click', () => { clearTimeout(t1); clearTimeout(t2); });
}
function objectiveText() {
    if (q.phase === 'menu')
        return '작은 원정대에서 시작하는 끝없는 전쟁.';
    const counts = `아군 ${q.alive('good').length} · 적 ${q.alive('evil').length}`;
    const rules = { defense: `라운드 종료 시 Defense 구역에 적 ${q.breachCount}명이 모이면 패배. 적을 전멸시키세요.`, annihilation: '적 부대를 전멸시키세요.', hold: `거점에서 아군이 수적 우세인 라운드 3회. 진행 ${q.capture || 0}/3.`, survive: `5라운드까지 살아남으세요. 현재 ${q.round}/5.`, breakthrough: '아군 2기를 남쪽 돌파선에 보낸 뒤 라운드를 종료하세요.', rescue: `포로 지점을 아군만 점유한 뒤 3라운드 생존. ${q.rescued ? '구출 완료 · ' + q.capture + '/3' : '아직 구출되지 않음'}`, commander: `${q.meta.get(q.current?.boss)?.name_ko || '적 지휘관'}을 처치하세요. 호위병은 남아도 됩니다.` };
    return `${rules[q.mission] || rules.defense}<br><b>${counts}</b>` + (q.bonusObjective ? `<br><b class='gold'>보너스 · ${q.bonusObjective.text} (+${q.bonusObjective.gold}금)</b>` : '') + (q.alive('evil').some(u => u.elite) ? `<br><b class='gold'>엘리트 ${q.alive('evil').filter(u => u.elite).length}기 — 처치 시 각 +8금</b>` : '');
}
const baseRender = Yt;
Yt = function () {
    baseRender();
    ut('wave').textContent = String(q.phase === 'preparation' ? q.wave + 1 : q.wave || 1).padStart(2, '0') + ' / ∞';
    ut('gold-count').textContent = q.gold ?? 35;
    ut('roster-count').textContent = `${q.permanent().length}/${q.capacity()}`;
    ut('objective').innerHTML = objectiveText();
    document.querySelector('.objective h3').textContent = CX.missionNames[q.mission] || '원정대';
    const info = q.phase === 'preparation' ? q.next : q.current;
    const mod = { clear: '맑음', rain: '폭우 · 사거리 감소', dark: '어둠 · 사거리 감소', reinforce: '적 증원 · 3라운드마다', warg: '와르그 사냥대', ambush: '기습 · 측면 포위', cavalry: '기병 돌격', swarm: '고블린 떼', snow: '눈보라 · 사거리↓ 이동↓', eclipse: '일식 · 용기↓', mud: '진창 · 보병 이동↓', gale: '강풍 · 궁수 명중↓', frost: '서리 · 힘↓' };
    const _zn=MAP_ZONE_NAMES[CX.maps[visualMapIdx(q.mapIndex)]],_zv=mapVariant(q.wave||1);
    document.querySelector('.map-label').innerHTML = `<b>${CX.mapNames[visualMapIdx(q.mapIndex)]}${_zn?.[_zv]?' · '+_zn[_zv]:''}</b>${mod[info?.modifier || 'clear']}`;
    ut('action').textContent = q.phase === 'preparation' ? `스테이지 ${q.wave + 1} 출전 →` : q.phase === 'fight' ? q.fightQueue.length ? `교전 해결 · ${q.fightQueue.length}곳` : '라운드 종료 →' : '전투 진행 중';
    ut('hint').textContent = At ? '행동 처리 중…' : q.phase === 'preparation' ? '병사 선택 → 배치할 곳 클릭 · 빈 땅 드래그: 카메라 · 휠: 확대' : q.phase === 'move' ? '밝은 영역: 이동 범위 · 경로 표시로 실제 거리 확인 · 적 클릭: 돌격 · Q/E: 방향 전환' : q.phase === 'shoot' ? '테두리 표시된 적을 클릭해 사격 · 선택 병사 대기로 다음 병사' : q.phase === 'fight' ? '연결된 교전을 함께 해결합니다. 창병은 뒤에서 지원합니다.' : '다음 전투를 준비하세요.';
    const u = q.unit(q.selected);
    if (u) {
        const meta = q.meta.get(u.id);
        ut('unit').innerHTML = `<div class="unit-head">${unitImage(u.id)}<div><strong>${esc(u.name)}</strong><small>${u.side === 'good' ? '아군' : '적군'} · ${isHeroUnit(u.id)?`<span class="unit-tier tier-${heroGrade(u.id)}" style="display:inline;margin:0">${tierLabel(u.id)}</span>`:(CX.roleNames[meta.role]||meta.role)}</small><small>${q.engaged(u) ? '교전 중' : u.acted ? '행동 완료' : '행동 가능'}</small></div></div><div class="movement-readout"><b>${(q.remaining(u) / 45).toFixed(1)}″</b> / ${(u.stats.move / 45).toFixed(1)}″ 이동 <span>사용 ${(u.movementSpent / 45).toFixed(1)}″</span></div><div class="stats"><span>Fight<b>${u.stats.fight}</b></span><span>힘<b>${u.stats.strength}</b></span><span>Defense<b>${u.stats.defence}</b></span><span>Attack<b>${u.stats.attacks}</b></span><span>용기<b>${u.stats.courage}</b></span><span>처치<b>${u.kills || 0}</b></span></div>${u.stats.wounds > 0 ? `<div class="wound-readout">HP <b>${u.currentWounds} / ${u.stats.wounds}</b><progress max="${u.stats.wounds}" value="${u.currentWounds}"></progress></div>` : ''}${u.traits.includes('hero') ? `<div class="resources"><span>Might <b>${u.resources.might}</b></span><span>Will <b>${u.resources.will}</b></span><span>Fate <b>${u.resources.fate}</b></span></div>` : ''}${(u.equipment || []).length ? `<div class="equip-row">${u.equipment.map(eid => { const a = (typeof LWB_EQUIP !== 'undefined' ? LWB_EQUIP : []).find(x => x.id === eid); return a ? `<span class="equip-chip" title="${esc(a.desc)}">${a.iconImg ? `<img src="${a.iconImg}" alt="">` : ''}${esc(a.label)}</span>` : ''; }).join('')}</div>` : ''}<div class="traits">${u.traits.includes('flying') ? '비행 · 절벽·낭떠러지 위를 지남' : u.traits.includes('mountain') ? '산악 거주자 · 산 지형 통과' : u.traits.includes('mounted') ? '기병 · 돌격 +1 결투, 보병 넘어뜨리기' : u.traits.includes('spear') ? '창 지원 · 후열에서 아군 베이스 접촉' : u.stats.shootRange ? `사거리 ${(u.stats.shootRange / 45).toFixed(1)}″ · 명중 ${u.stats.shootValue}+` : u.traits.includes('terror') ? '공포 · 돌격하는 적에게 Courage 검사' : '검과 방패 · 전열 유지'}</div><div class="traits" style="margin-top:2px;opacity:.85">${(() => { if (!u.stats) return ''; if (u.side === 'good' && q.bonded && q.bonded(u)) return '유대 · 결투 +1 활성'; const w = (q.meta.get(u.id) || {}).weapon || ''; if (u.stats.shootRange) return '상성 · 원거리 선제 / 근접에 무방비'; if (u.traits.includes('monster')) return '상성 · 소형 보병 압도 / 포위·사격에 취약'; if (u.traits.includes('mounted')) return '상성 · 보병 돌격 강함 / 창병 지원에 취약'; if (u.traits.includes('spear') || /spear|pike/.test(w)) return '상성 · 후열 지원으로 돌격에 강함'; if (u.traits.includes('flying')) return '상성 · 지형 무시 / 방어 취약'; if (u.traits.includes('hero')) return '상성 · 지휘·영웅 결투'; return '상성 · 전열 유지, 창 지원과 함께'; })()}</div>`;
        if (CX.skills[u.id]) {
            const skill = CX.skills[u.id], reason = q.mode === 'ai' && u.side === 'evil' ? 'AI가 조작하는 영웅입니다' : q.skillReason(u);
            ut('commands').insertAdjacentHTML('afterbegin', `<button class="hero-skill" id="hero-skill" ${At || reason ? 'disabled' : ''} title="${esc(reason || skill[3])}">${unitImage(u.id)}<span><b>${skill[0]}</b><small>${skill[3]}</small><em>${reason || `${skill[2]} ${skill[1] === 'will' ? 'Will' : 'Might'}`}</em></span></button>`);
            ut('hero-skill').onclick = () => {setSheet(false);setIntent({kind:'skill',uid:u.uid,label:skill[0],detail:skill[3]+' · '+skill[2]+' '+skill[1]});};
        }
    }
    if (u && u.side === 'good' && u.traits.includes('hero') && (u.resources.might || 0) > 0 && !At && (q.phase === 'move' || q.phase === 'fight' || q.phase === 'shoot')) {
        const _ha = [['strike', '영웅적 일격', '결투 +1'], ['combat', '영웅의 전투', '승리 후 재돌격'], ['defence', '영웅적 수비', '상처 필요 6'], ['shoot', '영웅적 사격', '명중 +1'], ['move', '영웅적 진군', '이동 +3″'], ['might', '운명의 일격', '결투 주사위 재굴림']].filter(([k]) => !(u.heroics || {})[k] && (k !== 'shoot' || u.stats.shootRange) && (k !== 'combat' || q.phase === 'fight'));
        if (_ha.length) {
            ut('commands').insertAdjacentHTML('beforeend', '<div class="heroic-row" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:7px">' + _ha.map(([k, l, d]) => '<button class="heroic-btn" data-heroic="' + k + '" title="' + d + ' · Might 1 소모" style="flex:1;min-width:70px;background:#2d2417;border:1px solid #8f7540;border-radius:7px;padding:5px 3px;color:#e8d5a8;font:600 12px Pretendard,ui-sans-serif;cursor:pointer">' + l + '<small style="display:block;font-weight:400;color:#b9a077">' + d + '</small></button>').join('') + '</div>');
            document.querySelectorAll('.heroic-btn').forEach(b => b.onclick = () => {setSheet(false);setIntent({kind:'heroic',uid:u.uid,key:b.dataset.heroic,label:b.firstChild.textContent,detail:b.title});});
        }
    }
    if (u && u.side === 'good' && CX.spells && CX.spells[u.id] && ['move', 'shoot', 'fight'].includes(q.phase)) {
        ut('commands').insertAdjacentHTML('beforeend', '<div class="spell-row" style="display:flex;gap:6px;flex-wrap:wrap;margin-top:5px">' + CX.spells[u.id].map((sp, i) => '<button class="spell-btn" data-spell="' + i + '" ' + (At || u.spellRound || (u.resources.will || 0) < sp[1] ? 'disabled' : '') + ' title="' + esc(sp[0] + ' — ' + sp[2]) + '" style="flex:1;min-width:90px;background:#1d2233;border:1px solid #5f6a8f;border-radius:7px;padding:5px 3px;color:#c9d5f2;font:600 12px Pretendard,ui-sans-serif;cursor:pointer">✦ ' + sp[0] + '<small style="display:block;font-weight:400;color:#8f9ab9">' + sp[1] + ' Will</small></button>').join('') + '</div>');
        document.querySelectorAll('.spell-btn').forEach(b => b.onclick = () => {const sp = CX.spells[u.id][+b.dataset.spell]; setSheet(false); setIntent({ kind: 'spell', uid: u.uid, key: +b.dataset.spell, label: '✦ ' + sp[0], detail: sp[2] + ' · ' + sp[1] + ' Will' }); });
    }
    const inv = ut('relic-inventory');
    inv.innerHTML = Object.entries(q.relics || {}).map(([id, rank]) => { const r = CX.relics.find(r => r.id === id); return `<button class="owned-relic rarity-${r.rarity}" type="button" data-owned-relic="${id}" aria-label="${esc(r.name)} · ${rank}중첩 · ${esc(r.text)}">${relicIcon(r, 32)}<small>${rank}</small></button>`; }).join('') || '<span class="mini">유물 없음</span>';
    if (q.phase === 'preparation')
        ut('turn-indicator').innerHTML = '<span>배치 단계</span><strong>출전 준비</strong>';
    const turn = q.unit(q.activeMoverUid || q.selected);
    if (turn && ['move', 'shoot'].includes(q.phase))
        ut('turn-indicator').innerHTML = `<span>${q.mode === 'ai' && q.side === 'evil' ? '상대가 행동 중' : '현재 선택'}</span><strong>${esc(turn.name)}</strong><small>${q.phase === 'move' ? (q.remaining(turn) / 45).toFixed(1) + '″ 남음' : '사격 단계'}</small>`;
    if (!At && q.phase === 'preparation')
        q.save();
};
const originalOverlay = Qe;
Qe = function () {
    const box = ut('overlay');
    if (!['menu', 'reward', 'result'].includes(q.phase)) {
        box.classList.add('hidden');
        return;
    }
    box.classList.remove('hidden');
    if (q.phase === 'menu') {
        let canResume = false;
        try {
            canResume = !!localStorage.getItem('mesbg-endless-save');
        }
        catch { }
        box.innerHTML = `<div class="modal campaign-menu t-title" style="--title-bg:url('${Ut('ui/title-bg.jpg')}')"><div class="t-ver">Ver ${PATCH_NOTES[0][0].replace(/^v/,"")}<br>난이도 : ${({easy:'쉬움',normal:'보통',hard:'어려움',despair:'절망'})[q.difficulty || 'normal']}</div><div class="intro-layout"><h1 class="logo"><img src="${Ut('ui/logo.png')}" width="424" height="140" alt="Middle-earth Warbands · 미들어스 워밴드"></h1><svg class="t-fili" viewBox="0 0 380 40" fill="none" stroke="#cfd3dc" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M190 8 C170 30 140 4 120 18 C104 30 86 10 70 20 C58 28 46 18 40 26"/><path d="M190 8 C210 30 240 4 260 18 C276 30 294 10 310 20 C322 28 334 18 340 26"/><path d="M120 18 C116 8 128 4 130 12"/><path d="M260 18 C264 8 252 4 250 12"/><path d="M70 20 C64 12 74 6 78 12"/><path d="M310 20 C316 12 306 6 302 12"/><path d="M184 6 L190 0 L196 6 L190 14 Z" fill="#e8e2d0"/></svg><div class="logo-ko">미들어스 워밴드</div></div><button id="start-ai" class="t-touch"><svg viewBox="0 0 56 16" aria-hidden="true"><path d="M0 8h34M38 8l6-6 6 6-6 6z M50 8h6" stroke="currentColor" stroke-width="2" fill="none"/></svg><span>TOUCH</span><svg viewBox="0 0 56 16" aria-hidden="true"><path d="M0 8h34M38 8l6-6 6 6-6 6z M50 8h6" stroke="currentColor" stroke-width="2" fill="none"/></svg></button>${canResume ? '<button id="resume" class="t-resume">원정 계속하기</button>' : ''}<p class="t-tip">♪ 소리를 켜면 중간계의 전장을 더 생생하게 즐길 수 있습니다.</p><div id="boot-load" class="boot-load" aria-live="polite"><i><b></b></i><span>전장 준비 중</span></div><div class="t-btns"><button id="daily" class="t-btn">오늘의 도전</button><button id="fs-btn2" class="t-btn">전체화면</button><button id="rank-btn" class="t-btn">명예의 전당</button><button id="t-menu-open" class="t-btn">메뉴</button></div><div class="menu-notes"><span>최고 기록 ${q.readBest()}스테이지 · 정비 때 자동 저장</span></div><div id="t-menu" class="t-menu hidden"><div class="t-sheet"><div class="t-sheet-title">메뉴</div><nav class="menu-buttons to-menu">${[1, 2, 3].map(n => { const s = q.slotInfo(n); return s ? `<button class="to-item slot-btn" data-slot="${n}">슬롯 ${n} 이어하기<small>${s.wave}스테이지 · ${s.count}명 · ${({easy:'쉬움',normal:'보통',hard:'어려움',despair:'절망'})[s.difficulty||'normal']}${s.mapIndex!=null&&CX.mapNames[s.mapIndex]?' · '+CX.mapNames[s.mapIndex]:''}</small></button>` : ''; }).join('')}<button id="fs-btn" class="to-item">전체화면<small>전체 화면으로 전환 · 다시 누르면 해제</small></button><button id="weekly" class="to-item">이번 주 원정<small>${['적 대군', '보스 러시', '근접전', '베테랑', '기병 전성', '모르도르의 광기', '강철의 전장', '궁술 경연', '긴 밤', '비열한 날', '강행군', '피의 전장'][Math.floor(Date.now() / 6048e5) % 12]}</small></button><button id="start-hotseat" class="to-item">2인 번갈아<small>한 기기로 대전</small></button><button id="patch-notes" class="to-item">최근 변경</button><div class="diff-row" role="group" aria-label="난이도"><span>난이도</span>${[['easy','쉬움'],['normal','보통'],['hard','어려움'],['despair','절망']].map(([d,label]) => `<button class="diff-btn ${(q.difficulty || 'normal') === d ? 'active' : ''}" data-diff="${d}"${d==='despair'?' style="color:#ff9a7a"':''}>${label}</button>`).join('')}</div></nav>${LWB_API ? '<details class="cloud-box"><summary>다른 기기의 원정 불러오기</summary><div class="save-slots cloud-save"><input id="cloud-id" maxlength="24" placeholder="아이디"><input id="cloud-pw" type="password" maxlength="24" placeholder="비번"><button class="secondary mini" id="cloud-load">불러오기</button><span id="cloud-msg" class="mini"></span></div></details>' : ''}<button class="t-close">닫기</button></div></div></div>`;
        { const tm = ut('t-menu'), show = v => { window.__tMenu = v; tm.classList.toggle('hidden', !v); }; show(!!window.__tMenu); ut('t-menu-open').onclick = () => show(true); tm.querySelector('.t-close').onclick = () => show(false); tm.onclick = e => { if (e.target === tm) show(false); }; tm.querySelectorAll('.to-item').forEach(b => b.addEventListener('click', () => { window.__tMenu = false; })); }
        const _fs=()=>{try{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}catch(e){}};
        ut('start-ai').onclick = () => Rt(() => { _fs(); q.dailySeed = 0; q.weeklySeed = 0; q.start('ai'); });
        ut('start-hotseat').onclick = () => Rt(() => { q.dailySeed = 0; q.weeklySeed = 0; q.start('hotseat'); });
        box.querySelectorAll('[data-diff]').forEach(el => el.onclick = () => { q.difficulty = el.dataset.diff; Yt(); });
        if (canResume)
            ut('resume').onclick = () => Rt(() => { _fs(); if (!q.resume())
                Xt('저장된 원정을 불러올 수 없습니다.'); });
        ut('daily').onclick = () => Rt(() => { _fs(); const d = new Date(); q.dailySeed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); q.start('ai'); Xt('오늘의 도전 — 모든 플레이어가 같은 편성과 보상을 받습니다'); });
        ut('fs-btn')&&(ut('fs-btn').onclick=()=>_fs());ut('fs-btn2')&&(ut('fs-btn2').onclick=()=>_fs());
        ut('weekly').onclick = () => Rt(() => { _fs(); const w = Math.floor(Date.now() / 6048e5); q.weeklySeed = w; q.start('ai'); Xt('이번 주 원정 — 규칙: ' + ['적 대군 (+40%)', '보스 러시 (3스테이지마다 보스)', '근접전 (사격 불가)', '베테랑 (아군 결투 +1)', '기병 전성 (기병 결투 +1)', '모르도르의 광기 (적 용기 +1)', '강철의 전장 (전원 방어 +1)', '궁술 경연 (사거리 +50%)', '긴 밤 (사거리 −30%)', '비열한 날 (적 결투 +1)', '강행군 (전원 이동 +1″)', '피의 전장 (전원 힘 +1)'][w % 12]); });
        ut('patch-notes').onclick = () => { const pn = document.createElement('div'); pn.id = 'patch-pop'; pn.innerHTML = '<div class="patch-inner"><div class="eyebrow">PATCH NOTES</div><h2>최근 변경 사항</h2>' + (window.__PATCH_NOTES || []).map(([v, items]) => `<b>${v}</b><ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`).join('') + '<button id="patch-close" class="primary">닫기</button></div>'; document.body.appendChild(pn); pn.onclick = e => { if (e.target === pn || e.target.id === 'patch-close') pn.remove(); }; };
        if (ut('cloud-load'))
            ut('cloud-load').onclick = async () => { const id = (ut('cloud-id').value || '').trim(), pw = ut('cloud-pw').value || ''; if (!id || !pw) { Xt('아이디와 비번을 입력하세요.'); return; } if (!LWB_API) { Xt('서버가 연결되지 않았습니다.'); return; } try { const r = await fetch(LWB_API + '/save/' + encodeURIComponent(id) + '/load', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pw }) }); const d = r.ok ? await r.json() : null; if (d && d.data) { localStorage.setItem('mesbg-endless-save', JSON.stringify(d.data)); if (!q.resume()) Xt('불러온 기록을 재개할 수 없습니다.'); ut('cloud-msg').textContent = '불러왔습니다.'; } else ut('cloud-msg').textContent = r.status === 403 ? '비번이 다릅니다.' : r.status === 404 ? '저장된 기록이 없습니다.' : '불러오기 실패 ' + r.status; } catch (e) { ut('cloud-msg').textContent = '서버 연결 실패'; } };
        box.querySelectorAll('[data-slot]').forEach(el => el.onclick = () => Rt(() => { if (!q.resumeSlot(el.dataset.slot))
            Xt('슬롯을 불러올 수 없습니다.'); }));
        return;
    }
    if (q.phase === 'reward') {
        const steps = ['event', 'recruit', 'relic', 'ready'];
        const step = q.campStep;
        let body = '';
        if (step === 'recruit')
            body = `<img class="evt-art" src="events/evt_wanderer.jpg" alt="" onerror="this.remove()"><p>금화 <b>${q.gold}</b> · 부대 ${q.permanent().length}/${q.capacity()}. 원하는 동료를 영입하거나 금화를 아끼세요.</p>${(() => { const typ = id => { const s = zt[id]; return s.traits.includes('monster') ? 'monster' : s.traits.includes('spear') ? 'spear' : s.traits.includes('mounted') ? 'mounted' : s.shootRange ? 'shooter' : s.defence >= 7 ? 'tank' : 'melee'; }; const typKo = { monster: '괴수', spear: '창 지원', mounted: '기병', shooter: '사격', tank: '전열', melee: '근접' }; const grades = [...new Set((q.recruitOffers||[]).map(o => heroGrade(o.id)))]; const types = [...new Set((q.recruitOffers||[]).map(o => typ(o.id)))]; return '<div class="rtabs"><button class="rtab active" data-rfilter="all">전체</button>' + grades.map(g => `<button class="rtab" data-rfilter="grade:${g}">${({ normal: '일반', elite: '정예', rare: '희귀 영웅', epic: '영웅', legendary: '전설' })[g]}</button>`).join('') + types.map(t => `<button class="rtab" data-rfilter="type:${t}">${typKo[t]}</button>`).join('') + '</div>'; })()}<div class="recruit-cards">${(q.recruitOffers||[]).map((o, i) => { const m = q.meta.get(o.id)||{}, p = zt[o.id]||{traits:[]}, cost = q.price(o.id), full = q.permanent().length >= q.capacity(); const _typ = p.traits.includes('monster') ? 'monster' : p.traits.includes('spear') ? 'spear' : p.traits.includes('mounted') ? 'mounted' : p.shootRange ? 'shooter' : p.defence >= 7 ? 'tank' : 'melee'; return `<button class="recruit-card tier-${heroGrade(o.id)} ${o.bought ? 'purchased' : ''}" data-grade="${heroGrade(o.id)}" data-type="${_typ}" data-recruit="${i}" ${o.bought || q.gold < cost || full ? 'disabled' : ''}>${q.meta.get(o.id)?unitImage(o.id):''}<span class="recruit-grade">${tierLabel(o.id)}</span><b>${esc(m.name_ko||o.id)}</b><small>${CX.roleNames[m.role] || m.role}</small><small class="recruit-stats">F${p.fight} S${p.strength} D${p.defence} A${p.attacks} W${p.wounds} C${p.courage}${p.shootRange ? ' · 사격 ' + p.shootValue + '+' : ''}</small><p>${p.traits.includes('spear') ? '후열 창 지원' : p.traits.includes('mounted') ? '빠른 돌격과 우회' : p.shootRange ? '원거리 사격' : p.defence >= 7 ? '단단한 전열' : '근접 전투'}${CX.skills[o.id] ? '<br>' + CX.skills[o.id][0] : ''}</p><em>${o.bought ? '합류 완료' : full ? '부대 정원 초과' : cost + ' 금화'}</em></button>`; }).join('')}</div><div class="camp-actions"><button id="reroll" class="secondary" ${q.gold < q.rerollCost() ? 'disabled' : ''}>후보 교체 · ${q.rerollCost()} 금화</button><button id="expand" class="secondary" ${q.gold < 45 + q.capacityBought * 25 || q.capacity() >= 30 ? 'disabled' : ''}>정원 +2 · ${45 + q.capacityBought * 25} 금화</button><button id="heal-injury" class="secondary" ${q.gold < 20 || !q.permanent().some(u=>u.injury) ? 'disabled' : ''}>약초 치료 · 20 금화</button><button id="to-relic" class="primary">영입 완료 · 유물 선택 →</button></div>`;
        if (step === 'shop') {
            {
                const _tab = q._shopTab || 'equip';
                const _tgt = q.permanent().find(u => u.uid === q._shopTarget) || q.permanent()[0];
                if (q._stockFor !== q.stage) { const _pool = LWB_EQUIP.map((t, f) => f); for (let t = _pool.length - 1; t > 0; t--) { const f = Math.floor(Math.random() * (t + 1)); [_pool[t], _pool[f]] = [_pool[f], _pool[t]]; } q.shopStock = _pool.slice(0, Math.min(10, _pool.length)); q._stockFor = q.stage; }
                const _stock = q.shopStock || LWB_EQUIP.map((t, f) => f);
                q._shopTarget = _tgt ? _tgt.uid : '';
                const _ec = a => q.dc(a.cost, 'master_flame'), _ac = a => q.dc(a.cost, 'white_pact'), _tc = a => q.dc(a.cost, 'siege_wright');
                const _own = _tgt ? (LWB_EQUIP || []).map((a, i) => ({ a, i })).filter(({ a }) => !a.once && (_tgt.equipment || []).includes(a.id)).map(({ a, i }) => `<button class="sell-row" data-sell="${i}" title="판매하면 ${Math.floor(q.dc(a.cost, 'master_flame') / 2)}금화 환급">${esc(a.label)} <em>${Math.floor(q.dc(a.cost, 'master_flame') / 2)}금화 판매</em></button>`).join('') : '';
                const _eq = _stock.map(i => { const a = LWB_EQUIP[i]; const owned = _tgt && (_tgt.equipment || []).includes(a.id); const full = _tgt && !a.once && (_tgt.equipment || []).length >= 2; const badOnce = _tgt && a.once && ((a.needsWound && _tgt.currentWounds >= _tgt.stats.wounds) || (a.needsInjury && !_tgt.injury)); const badReq = _tgt && a.req && !a.req(_tgt); const dis = !_tgt || owned || full || badOnce || badReq || q.gold < _ec(a); const _ic = a.iconImg ? `<img src="${a.iconImg}" class="shop-px" alt="">` : icon(a.icon); const _fit = !owned && !badReq && ((a.req && a.req(_tgt)) || (a.once && ((a.needsWound && _tgt.currentWounds < _tgt.stats.wounds) || (a.needsInjury && _tgt.injury)))) ? '<i class="shop-fit">추천</i>' : ''; return `<button class="shop-card" data-equip="${i}" ${dis ? 'disabled' : ''}>${_fit}<span class="shop-icon">${_ic}</span><b>${a.label}</b><small>${a.desc}</small><em class="${owned ? 'owned' : ''}">${owned ? '장착 중' : _ec(a) + ' 금화'}</em></button>`; }).join('');
                const _al = ALLY_PACKS.map((a, i) => { const dis = q.gold < _ac(a) || q.allyBought; return `<button class="shop-card" data-ally="${i}" ${dis ? 'disabled' : ''}><span class="shop-icon">${q.meta.get(a.ids[0]) ? unitImage(a.ids[0]) : ''}</span><b>${a.label}</b><small>다음 전투에 임시 합류${a.ids.length > 1 ? ' · ' + a.ids.length + '기' : ''}</small><em>${q.allyBought ? '합류 완료' : _ac(a) + ' 금화'}</em></button>`; }).join('');
                const _tr = TRAP_PACKS.map((a, i) => { const dis = q.gold < _tc(a); const _ic = a.iconImg ? `<img src="${a.iconImg}" class="shop-px" alt="">` : icon(a.icon); return `<button class="shop-card" data-trap="${i}" ${dis ? 'disabled' : ''}><span class="shop-icon">${_ic}</span><b>${a.label}</b><small>${a.desc}</small><em>${_tc(a)} 금화</em></button>`; }).join('');
                body = `<div class="shop-head"><button id="shop-x" class="shop-x">✕</button><b class="shop-name">상점 · 길손의 병기장</b><span class="shop-gold">◈ ${q.gold}</span><button id="shop-reroll" class="shop-x" style="width:auto;padding:0 8px;font-size:10px" ${q.gold < 8 ? 'disabled' : ''}>↻ 재고 · 8금</button></div><div class="rtabs shop-tabs"><button class="rtab ${_tab === 'equip' ? 'active' : ''}" data-shoptab="equip">장비</button><button class="rtab ${_tab === 'ally' ? 'active' : ''}" data-shoptab="ally">동맹 지원</button><button class="rtab ${_tab === 'trap' ? 'active' : ''}" data-shoptab="trap">지형 장치</button></div><div class="shop-pane" data-pane="equip" ${_tab !== 'equip' ? 'hidden' : ''}>${_tgt ? `<div class="shop-target"><b class="mini" style="align-self:center">영웅 대상</b>${q.permanent().filter(u => u.traits.includes('hero')).map(u => `<button class="unit-chip ${u.uid === _tgt.uid ? 'active' : ''}" data-target="${u.uid}">${unitImage(u.id)}<span>${esc(u.name)}</span><small>장비 ${(u.equipment || []).length}/2${u.injury ? ' · 부상' : ''}</small></button>`).join('')}</div>` : '<p class="mini">영웅만 장착할 수 있습니다 — 영웅 유닛이 없습니다.</p>'}<div class="sell-rows">${_own}</div><div class="shop-cards">${_eq}</div></div><div class="shop-pane" data-pane="ally" ${_tab !== 'ally' ? 'hidden' : ''}><p class="mini">다음 전투에만 합류하는 임시 전력 — 1회만 구입 가능.</p><div class="shop-cards">${_al}</div></div><div class="shop-pane" data-pane="trap" ${_tab !== 'trap' ? 'hidden' : ''}><p class="mini">다음 전투에서 적이 다가오면 자동 발동.</p><div class="shop-cards">${_tr}</div></div><div class="camp-actions"><button id="heal-injury" class="secondary" ${q.gold < 20 || !q.permanent().some(u => u.injury) ? 'disabled' : ''}>약초 치료 · 20 금화</button><button id="shop-back" class="primary">← 부대 정비로</button></div>`;
            }
        }
        if (step === 'event') { const oc = q.eventOutcome, ev = q.campEvent; body = oc ? `<div class="event-outcome">${(oc.relics || []).length ? `<div class="gain-row">${oc.relics.map(id => { const rr = CX.relics.find(x => x.id === id); return rr ? `<div class="gain-card rarity-${rr.rarity}"><span class="gain-label">유물 획득</span>${relicIcon(rr, 96)}<b>${esc(rr.name)}</b><small>${CX.rarityNames[rr.rarity]} · ${relicFamily(rr.id)}</small><p>${esc(rr.text)}</p></div>` : ''; }).join('')}</div>` : ''}<p class="event-result">${esc(oc.title)} — ${esc(oc.label)} → ${esc(oc.result)}</p><button id="ev-next" class="primary">동료 영입으로 →</button></div>` : (ev ? `<img class="evt-art" src="events/evt_${LWB_EVT_ART[ev.id] || 'wanderer'}.jpg" alt="" onerror="this.remove()"><p>${esc(ev.text)}</p><div class="reward-cards">${ev.options.map((o, i) => `<button class="reward rarity-common" data-evopt="${i}"><b>${esc(o.label)}</b><p>${esc(o.sub)}</p></button>`).join('')}</div>` : ''); }
        if (step === 'relic') {
            if (!(q.relicChoices || []).length && !q.chosenRelic) { q.rollRelics(); q.save(); }
            body = setProgressLine() + `<img class="evt-art" src="events/evt_treasure.jpg" alt="" onerror="this.remove()"><div class="reward-cards">${(q.relicChoices || []).filter(id => CX.relics.find(x => x.id === id)).map(id => { const r = CX.relics.find(r => r.id === id); return `<button class="reward rarity-${r.rarity}" data-relic="${id}">${relicIcon(r, 88)}<small>${CX.rarityNames[r.rarity]} · ${relicFamily(id)}${q.rank(id) ? ' · ' + (q.rank(id) + 1) + '중첩' : ''}</small><b>${r.name}</b><p>${r.text}</p></button>`; }).join('') + `<button class="reward rarity-0" data-relic="pass" style="opacity:.85"><span style="font-size:34px;line-height:88px">✕</span><small>선택 안 함</small><b>유물 패스</b><p>필요한 유물이 없다면 넘기고 금화 25를 받습니다.</p></button>`}</div>`;
        }
        if (step === 'ready') {
            const next = q.stageInfo(q.wave + 1);
            body = `<img class="evt-art" src="events/evt_${LWB_STAGE_ART[CX.maps[visualMapIdx(next.map)]] || 'war'}.jpg" alt="" onerror="this.remove()"><p>동료 ${q.permanent().length}명 · 유물 ${Object.keys(q.relics||{}).length}종 · 남은 금화 ${q.gold}</p><p class="army-summary">${(() => { const t = q.permanent(); const kills = t.reduce((a, u) => a + (u.kills || 0), 0); const inj = t.filter(u => u.injury).length; const hp = Math.round(t.reduce((a, u) => a + u.currentWounds / Math.max(1, u.stats.wounds), 0) / Math.max(1, t.length) * 100); return '부대 기록 · 총 처치 ' + kills + ' · 평균 HP ' + hp + '% · 부상 ' + inj + '명' + (() => { const mvp = t.slice().sort((a, b) => (b.kills || 0) - (a.kills || 0))[0]; const vets = t.filter(u => u.traits && u.traits.includes('veteran')).length; return (mvp && (mvp.kills || 0) > 0 ? ' · MVP ' + mvp.name + '(' + mvp.kills + '처치)' : '') + (vets ? ' · 베테랑 ' + vets + '명' : ''); })(); })()}</p><div class="next-stage"><span>다음 전장</span><h3>${CX.mapNames[visualMapIdx(next.map)]}${(MAP_ZONE_NAMES[CX.maps[visualMapIdx(next.map)]]||[])[mapVariant(q.wave+1)]?' · '+(MAP_ZONE_NAMES[CX.maps[visualMapIdx(next.map)]]||[])[mapVariant(q.wave+1)]:''} · ${CX.missionNames[next.mission]}</h3>${next.boss?"<p style=\"color:#ff8a5c;font-weight:800;margin:2px 0\">⚠ 보스 등장 임박 — "+(UnitCatalog[next.boss]?.name||next.boss)+((zt[next.boss]||{}).fight?" <small style=\"font-weight:600;color:#e8b890\">전투 "+zt[next.boss].fight+" · 힘 "+(zt[next.boss].strength||"-")+" · 방어 "+(zt[next.boss].defence||"-")+" · 상처 "+(zt[next.boss].wounds||"-")+"</small>":"")+"</p>":""}<p>${(() => { const g = Object.entries(next.ids.reduce((a, id) => (a[id] = (a[id] || 0) + 1, a), {})).map(([id, nn]) => (q.meta.get(id) || {}).name_ko ? q.meta.get(id).name_ko + ' ×' + nn : '').filter(Boolean); return '정찰 보고 · ' + g.slice(0, q.rank('palantir') ? g.length : 5).join(' · ') + (g.length > 5 && !q.rank('palantir') ? ' 외 ' + (g.length - 5) + '종' : '') + (q.rank('palantir') ? ' <small style="color:#9fd8c0">팔란티르 · 전체 편성</small>' : '') + ' · ' + (next.modifier === 'ambush' ? '측면 기습' : '남쪽 진입') + (next.boss ? ' · ⚠ ' + (q.meta.get(next.boss) || {}).name_ko + ' 출현' : '') + (q.weeklySeed ? ' · 주간 규칙: ' + ['대군', '보스 러시', '근접전', '베테랑', '기병', '광기', '강철', '궁술', '긴 밤', '비열한 날', '강행군', '피의 전장'][q.weeklySeed % 12] : ''); })()}</p></div><div class="army-name-row"><input id="army-name" maxlength="20" placeholder="부대 이름 (예: 서녘의 전열)" value="${esc(q.armyName || '')}"></div><div class="result-relics" style="margin:4px 0 8px">${Object.keys(q.relics||{}).filter(id=>CX.relics.find(r=>r.id===id)).map(id => `<button class="relic-chip" data-rinfo="${id}" title="터치하면 유물 정보">${relicIcon(CX.relics.find(r => r.id === id), 44)}</button>`).join('')}</div><div class="camp-roster">${q.permanent().map(u => `<span style="position:relative" title="${u.name} · 탭하면 프로필" data-rename="${u.uid}">${unitImage(u.id)}${(u.kills || 0) > 0 ? '<i class="kill-badge" style="position:absolute;top:-3px;right:-3px;min-width:17px;height:17px;padding:0 4px;border-radius:9px;background:#b8452f;color:#ffe9c9;font:700 10px/17px Pretendard,sans-serif;text-align:center;box-shadow:0 0 0 2px rgba(20,26,23,.9);pointer-events:none;font-style:normal">' + u.kills + '</i>' : '' }<small>${u.currentWounds}/${u.stats.wounds} · 처치 ${u.kills || 0}${u.injury ? ' · 부상' : ''}${u.traits && u.traits.includes('veteran') ? ' · 베테랑' : ''}</small>${(u.equipment||[]).length?'<div style="display:flex;gap:2px;justify-content:center;margin-top:2px">'+u.equipment.map(eid=>{const a=(typeof LWB_EQUIP!=='undefined'?LWB_EQUIP:[]).find(x=>x.id===eid);return a&&a.iconImg?`<img src="${a.iconImg}" title="${esc(a.label)}" style="width:14px;height:14px;image-rendering:pixelated" alt="">`:''}).join('')+'</div>':''}</span>`).join('')}</div>${q.fallen && q.fallen.length ? `<div class="honor-roll"><div class="section-label">명예록 · 전사한 영웅</div>${q.fallen.map(f => `<span class="honor-entry">${unitImage(f.id)}<small>${f.name || f.uid.toUpperCase()} · ${f.kills}처치 · S${f.wave}</small></span>`).join('')}</div>` : ''}<div class="ally-row"><b class="mini">도전 의뢰 · 이번 전투의 의뢰 3종 — 더 어려운 대신 추가 금화 (택 1)</b>${CHALLENGES.filter(c => (q._chalPool || CHALLENGES.slice(0,3).map(c => c.id)).includes(c.id)).concat(q.challenge && !(q._chalPool || CHALLENGES.slice(0,3).map(c => c.id)).includes(q.challenge) ? CHALLENGES.filter(c => c.id === q.challenge) : []).map(c => `<button class="secondary mini" data-challenge="${c.id}" ${q.challenge === c.id ? 'style="background:#c1bd96;color:#222b1d"' : ''}>${c.label} · ${c.text} → +${c.gold}금</button>`).join('')}${q.challenge ? `<button class="secondary mini" data-challenge="">해제 · 현재 ${(CHALLENGES.find(c=>c.id===q.challenge)||{}).label||q.challenge}</button>` : ''}</div><div class="camp-actions"><button id="to-shop" class="secondary">⚒ 상점 열기 · 금화 ${q.gold}</button></div><button id="leave-camp" class="primary">부대 정비 · 배치 화면으로 →</button><div class="save-slots">수동 저장: ${[1, 2, 3].map(n => { let _si = ''; try { const _sv = JSON.parse(localStorage.getItem('mesbg-endless-slot-' + n) || 'null'); _si = _sv && _sv.wave ? ' · ST ' + _sv.wave : (_sv ? ' · 저장됨' : ' · 비어있음'); } catch (e) { } return `<button class="secondary mini" data-saveslot="${n}">슬롯 ${n}${_si}</button>`; }).join('')}</div>${LWB_API?'<div class="save-slots cloud-save"><b class="mini">서버 이어하기 · 같은 아이디로 다른 기기에서도</b><input id="cloud-id" maxlength="24" placeholder="아이디"><input id="cloud-pw" type="password" maxlength="24" placeholder="비번"><button class="secondary mini" id="cloud-save">서버 저장</button><button class="secondary mini" id="cloud-load">불러오기</button><span id="cloud-msg" class="mini"></span></div>':''}`;
        }
        if (q.campResult && !(step === 'event' && q.eventOutcome))
            body = `<p class="event-result">${esc(q.campResult)}</p>` + body;
        box.innerHTML = `<div class="modal camp"><div class="eyebrow">STAGE ${q.wave} CLEARED · +${q.lastGold} GOLD</div>${step==='event'?`<div style="font-size:10px;color:#a89878;margin:4px 0 0;letter-spacing:.4px">이번 전투 · 처치 ${q.stageKills||0} · 전사 ${q.stageDeaths||0} · 생존 ${q.alive('good').length}</div>`:''}<h2>${step==='event'?(q.campEvent?.title||'야영지'):step==='shop'?'상점':step==='relic'?'유물 선택':'출전 준비'}</h2><div class="camp-steps" ${step==='shop'?'style="display:none!important"':''}>${steps.map((s, i) => `<span class="${step === s ? 'current' : ''}">${i + 1}. ${['전장 이벤트', '동료 영입', '유물 선택', '다음 전투'][i]}</span>`).join('')}</div>${body}</div>`;
        box.querySelectorAll('[data-recruit]').forEach(el => el.onclick = () => { q.recruit(Number(el.dataset.recruit)); wt.play('reward_select'); Yt(); });
         if (ut('army-name')) ut('army-name').oninput = e => { q.armyName = e.target.value; q.save(); };
         box.querySelectorAll('[data-rename]').forEach(el => el.onclick = () => { const u = q.unit(el.dataset.rename); if (!u) return; const meta = q.meta.get(u.id) || {}; let m = box.querySelector('#camp-profile'); if (!m) { m = document.createElement('div'); m.id = 'camp-profile'; m.style.cssText = 'position:fixed;inset:0;background:rgba(8,12,10,.85);z-index:60;display:flex;align-items:center;justify-content:center;padding:16px'; m.onclick = e => { if (e.target === m) m.remove(); }; box.appendChild(m); }
            m.innerHTML = `<div class="modal" style="max-width:360px;padding:18px;width:100%"><div class="unit-head">${unitImage(u.id)}<div><strong>${esc(u.name)}</strong><small>${u.side === 'good' ? '아군' : '적군'} · ${CX.roleNames[meta.role] || meta.role || ''}</small>${isHeroUnit(u.id) ? `<small class="unit-tier tier-${heroGrade(u.id)}">${tierLabel(u.id)} · ${(UnitCatalog[u.id] || {}).points ?? 0}pt</small>` : ''}</div></div><div class="stats"><span>이동<b>${(u.stats.move / 45).toFixed(1)}″</b></span><span>결투<b>${u.stats.fight}</b></span><span>힘<b>${u.stats.strength}</b></span><span>방어<b>${u.stats.defence}</b></span><span>공격<b>${u.stats.attacks}</b></span><span>용기<b>${u.stats.courage}</b></span>${u.stats.shootRange ? `<span>명중<b>${u.stats.shootValue}+ · ${(u.stats.shootRange / 45).toFixed(1)}″</b></span>` : ''}<span>HP<b>${u.currentWounds}/${u.stats.wounds}</b></span></div>${(u.traits || []).includes('hero') ? `<div class="resources"><span>Might <b>${u.resources.might}</b></span><span>Will <b>${u.resources.will}</b></span><span>Fate <b>${u.resources.fate}</b></span></div>` : ''}${(u.equipment || []).length ? `<div class="equip-row">${u.equipment.map(eid => { const a = (typeof LWB_EQUIP !== 'undefined' ? LWB_EQUIP : []).find(x => x.id === eid); return a ? `<button class="equip-chip" data-campsell="${eid}" title="${esc(a.desc)} · 터치하면 판매 +${Math.floor((a.cost || 0) / 2)}금화">${a.iconImg ? `<img src="${a.iconImg}" alt="">` : ''}${esc(a.label)} <em style="font-style:normal;color:#d8a060">+${Math.floor((a.cost || 0) / 2)}</em></button>` : ''; }).join('')}</div>` : ''}<div class="traits">${[(u.traits || []).includes('veteran') ? '베테랑' : '', u.injury ? '부상 ' + u.injury : '', '처치 ' + (u.kills || 0)].filter(Boolean).join(' · ')}</div>${CX.skills && CX.skills[u.id] ? `<div class="traits" style="margin-top:4px"><b style="color:#c9b06a">⚔ ${esc(CX.skills[u.id][0])}</b> · ${CX.skills[u.id][2]} ${CX.skills[u.id][1]} — ${esc(CX.skills[u.id][3] || '')}</div>` : ''}${u.side === 'good' ? '<button class="secondary" id="cp-dismiss" style="margin-top:8px;width:100%;border-color:#8f4a3a;color:#e8a08a">부대에서 제명</button>' : ''}<button class="primary" style="margin-top:10px;width:100%" id="camp-profile-close">닫기</button></div>`;
            m.querySelector('#camp-profile-close').onclick = () => m.remove();
            const _ds = m.querySelector('#cp-dismiss'); if (_ds) _ds.onclick = () => { if (!_ds.dataset.arm) { _ds.dataset.arm = '1'; _ds.textContent = '정말 제명할까요? 장비도 함께 사라집니다 · 한 번 더'; return; } q.units = q.units.filter(w => w.uid !== u.uid); q.save(); Xt(u.name + '을(를) 부대에서 내보냈습니다.'); m.remove(); Yt(); }; m.querySelectorAll('[data-campsell]').forEach(b => b.onclick = () => Rt(() => { const ei = LWB_EQUIP.findIndex(x => x.id === b.dataset.campsell); if (ei < 0) return; if (q.sellEquip(ei, u.uid)) { m.remove(); Yt(); } else Xt('판매할 수 없습니다.'); })); });
         box.querySelectorAll('[data-ally]').forEach(el => el.onclick = () => Rt(() => { q.buyAlly(Number(el.dataset.ally)) ? Xt('동맹이 합류했습니다. 다음 전투 한정.') : Xt('금화가 부족합니다.'); }));
        box.querySelectorAll('[data-trap]').forEach(el => el.onclick = () => Rt(() => { q.buyTrap(Number(el.dataset.trap)) ? Xt('함정을 설치했습니다. 다음 전투에서 자동 발동합니다.') : Xt('금화가 부족합니다.'); }));
        box.querySelectorAll('[data-challenge]').forEach(el => el.onclick = () => { q.challenge = el.dataset.challenge || ''; q.save(); Yt(); });
        box.querySelectorAll('[data-rinfo]').forEach(el => el.onclick = () => { const r = CX.relics.find(x => x.id === el.dataset.rinfo); if (!r) return; let m = box.querySelector('#relic-info'); if (!m) { m = document.createElement('div'); m.id = 'relic-info'; m.style.cssText = 'position:fixed;inset:0;background:rgba(8,12,10,.85);z-index:61;display:flex;align-items:center;justify-content:center;padding:16px'; m.onclick = e => { if (e.target === m) m.remove(); }; box.appendChild(m); } m.innerHTML = `<div class="modal" style="max-width:330px;padding:18px;text-align:center">${relicIcon(r, 80)}<b style="display:block;font-size:15px;color:#efe4b0;margin:8px 0 2px">${esc(r.name)}</b><small style="color:#9aa77f">${CX.rarityNames[r.rarity]} · ${relicFamily(r.id)}${q.rank(r.id) > 1 ? ' · ×' + q.rank(r.id) : ''}</small><p style="font-size:12px;line-height:1.6;color:#c4cfb4;margin:8px 0 10px">${esc(r.text)}</p><button class="primary" style="width:100%" id="relic-info-close">닫기</button></div>`; m.querySelector('#relic-info-close').onclick = () => m.remove(); });

        box.querySelectorAll('[data-sell]').forEach(el => el.onclick = () => Rt(() => { const t = q._shopTarget || (q.permanent()[0] || {}).uid; q.sellEquip(Number(el.dataset.sell), t) ? (Xt('판매했습니다 — 절반 금화 환급.'), Yt()) : Xt('판매할 수 없습니다.'); }));
        box.querySelectorAll('[data-equip]').forEach(el => el.onclick = () => Rt(() => { const t = q._shopTarget || (q.permanent()[0] || {}).uid; q.buyEquip(Number(el.dataset.equip), t) ? (Xt('장비를 장착했습니다.'), Yt()) : Xt('장착할 수 없습니다 — 금화·슬롯·상처를 확인하세요.'); }));
        box.querySelectorAll('[data-shoptab]').forEach(el => el.onclick = () => { q._shopTab = el.dataset.shoptab; Yt(); });
        if (ut('shop-reroll'))
            ut('shop-reroll').onclick = () => Rt(() => {
                if (q.gold < 8)
                    return Xt('금화가 부족합니다.');
                q.gold -= 8;
                const _pool = LWB_EQUIP.map((t2, f) => f);
                for (let t2 = _pool.length - 1; t2 > 0; t2--) {
                    const f = Math.floor(Math.random() * (t2 + 1));
                    [_pool[t2], _pool[f]] = [_pool[f], _pool[t2]];
                }
                q.shopStock = _pool.slice(0, Math.min(10, _pool.length));
                q.save();
                Xt('새 상품을 진열했습니다.');
            });
        box.querySelectorAll('[data-target]').forEach(el => el.onclick = () => { q._shopTarget = el.dataset.target; Yt(); });
         box.querySelectorAll('[data-rfilter]').forEach(el => el.onclick = () => { box.querySelectorAll('[data-rfilter]').forEach(x => x.classList.toggle('active', x === el)); const f = el.dataset.rfilter; box.querySelectorAll('[data-recruit]').forEach(c => c.classList.toggle('hidden', f !== 'all' && !(f === 'grade:' + c.dataset.grade || f === 'type:' + c.dataset.type))); });
        if (ut('reroll'))
            ut('reroll').onclick = () => { q.reroll(); Yt(); };
        if (ut('expand'))
            ut('expand').onclick = () => { q.expand(); Yt(); };
        if (ut('to-relic'))
            ut('to-relic').onclick = () => { q.campStep = 'relic'; q.save(); Yt(); };
        if (ut('shop-back'))
            ut('shop-x').onclick = ut('shop-back').onclick = () => { q.campStep = 'ready'; q.save(); Yt(); };
        if (ut('shop-next'))
            ut('shop-next').onclick = () => { q.campStep = 'relic'; q.save(); Yt(); };
        if (ut('heal-injury'))
            ut('heal-injury').onclick = () => { const w = q.permanent().filter(u => u.injury); const t = w[0]; if (!t || q.gold < 20) return Xt('치료할 대상이 없습니다.'); q.gold -= 20; t.injury = 0; q.refreshUnit(t); q.save(); Xt(t.name + '의 부상 치료 완료'); Yt(); };
        box.querySelectorAll('[data-evopt]').forEach(el => el.onclick = () => { if (q.chooseEvent(Number(el.dataset.evopt))) { wt.play('reward_select'); if (q.eventOutcome) Xt(q.eventOutcome.result); else if (q.campResult) Xt(q.campResult.split('→').pop().trim()); } Yt(); });
        if (ut('ev-next')) ut('ev-next').onclick = () => { q.eventOutcome = null; q.campStep = 'recruit'; q.save(); Yt(); };
        box.querySelectorAll('[data-relic]').forEach(el => el.onclick = () => { q.selectCampChoice(el.dataset.relic); wt.play('ui_select'); Yt(); });
        if (ut('to-shop'))
            ut('to-shop').onclick = () => { q.campStep = 'shop'; q.save(); Yt(); };
        if (ut('leave-camp'))
            ut('leave-camp').onclick = () => Rt(() => q.leaveCamp());
        box.querySelectorAll('[data-saveslot]').forEach(el => el.onclick = () => { if (q.saveSlot(el.dataset.saveslot)) { Xt(`슬롯 ${el.dataset.saveslot}에 저장했습니다.`); wt.play('ui_select'); } else Xt('지금은 저장할 수 없습니다.'); });
        if (ut('cloud-save')) {
            ut('cloud-save').onclick = async () => { const id = (ut('cloud-id').value || '').trim(), pw = ut('cloud-pw').value || ''; if (!id || !pw) { Xt('아이디와 비번을 입력하세요.'); return; } if (!LWB_API) { Xt('서버가 연결되지 않았습니다.'); return; } try { const r = await fetch(LWB_API + '/save/' + encodeURIComponent(id), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pw, data: q._saveState() }) }); ut('cloud-msg').textContent = r.ok ? '서버에 저장했습니다.' : (r.status === 403 ? '비번이 다릅니다.' : '저장 실패 ' + r.status); if (r.ok) wt.play('ui_select'); } catch (e) { ut('cloud-msg').textContent = '서버 연결 실패'; } };
            ut('cloud-load').onclick = async () => { const id = (ut('cloud-id').value || '').trim(), pw = ut('cloud-pw').value || ''; if (!id || !pw) { Xt('아이디와 비번을 입력하세요.'); return; } if (!LWB_API) { Xt('서버가 연결되지 않았습니다.'); return; } try { const r = await fetch(LWB_API + '/save/' + encodeURIComponent(id) + '/load', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ pw }) }); const d = r.ok ? await r.json() : null; if (d && d.data) { localStorage.setItem('mesbg-endless-save', JSON.stringify(d.data)); q.resume(); ut('cloud-msg').textContent = '불러왔습니다.'; } else ut('cloud-msg').textContent = r.status === 403 ? '비번이 다릅니다.' : r.status === 404 ? '저장된 기록이 없습니다.' : '불러오기 실패 ' + r.status; } catch (e) { ut('cloud-msg').textContent = '서버 연결 실패'; } };
        }
        return;
    }
    box.innerHTML = `<div class="modal"><div class="eyebrow">MIDDLE-EARTH WARBANDS · 원정 종료</div><h1>${q.result==='victory'?'승전했습니다.':'전열은<br>무너졌지만.'}</h1><img class="evt-art" src="events/evt_${q.result==='victory'?'light':'dark'}.jpg" alt="" onerror="this.remove()"><p>${esc(q.log[0] || '원정대가 쓰러졌습니다.')}<br>${q.armyName ? esc(q.armyName) + ' · ' : ''}클리어 ${q.cleared || 0} 스테이지 · 처치 ${q.totalKills || 0} · 최고 기록 ${q.readBest()}${q.dailySeed ? ' · 오늘의 도전' : ''}${q.weeklySeed ? ' · 이번 주 원정' : ''}</p><div class="stat-block"><b class="mini">전투 기록</b>${q.units.filter(u => u.side === 'good' && !u.temporary).sort((a, b) => (b.kills - a.kills) || ((b.dmgDealt || 0) - (a.dmgDealt || 0))).map((u, _ri) => `<span class="stat-row ${u.alive ? '' : 'dead'}">${unitImage(u.id)}<b>${esc(u.name)}${u.kills > 0 && _ri === 0 ? ' <span class="gold">★MVP</span>' : ''}</b><small>처치 ${u.kills} · 피해 ${u.dmgDealt || 0} · ${u.alive ? '생존' : '전사'}${u.injury ? ' · 부상' : ''}${u._bossSlain ? ' · ☠보스 사냥꾼' : ''}</small></span>`).join('')}</div><div class="result-relics">${Object.keys(q.relics||{}).filter(id=>CX.relics.find(r=>r.id===id)).map(id => relicIcon(CX.relics.find(r => r.id === id), 56)).join('')}</div><div class="rank-row"><input id="rank-nick" maxlength="16" placeholder="닉네임 (최대 16자)"><button id="rank-submit" class="secondary">랭킹 등록</button></div><div id="rank-status" class="mini"></div><div id="rank-board-result"></div><p class="mini">기록 코드: <b class="gold">LWB-${q.wave}-${q.totalKills || 0}-${({easy:'E',normal:'N',hard:'H',despair:'X'})[q.difficulty]||'N'}${q.dailySeed ? 'D' : ''}</b></p><div class="menu-buttons">${q.result === 'defeat' && q._retrySnapshot ? `<button id="retry" class="secondary" ${q._retrySnapshot.gold < 60 ? 'disabled' : ''}>이 스테이지 재도전 · 금화 −60</button>` : ''}<button id="share-code" class="secondary">기록 코드 복사</button><button id="restart" class="primary">새로운 원정 →</button><button id="to-menu" class="secondary">메인 메뉴</button></div></div>`;
    ut('restart').onclick = () => Rt(() => { _fs(); q.dailySeed = 0; q.weeklySeed = 0; q.start(q.mode); });
    ut('to-menu').onclick = () => { q.phase = 'menu'; Yt(); };
    if (ut('retry')) ut('retry').onclick = () => Rt(() => { q.retryStage() ? Yt() : Xt('재도전할 수 없습니다.'); });
    if (ut('share-code')) ut('share-code').onclick = () => { const c = 'LWB-' + q.wave + '-' + (q.totalKills || 0) + '-' + (q.difficulty || 'n')[0].toUpperCase() + (q.dailySeed ? 'D' : ''); const done = () => Xt('기록 코드를 복사했습니다: ' + c); (navigator.clipboard?.writeText(c) || Promise.reject()).then(done).catch(() => window.prompt('코드를 복사하세요', c)); };
};
Qe = (() => { const f = Qe; return function () { f.apply(this, arguments); lwbWireRank(); }; })();
const oldDice = $e;
$e = async function (e) { if (qt >= 20)
    return; await oldDice(e); if (e.result?.kind === 'fight') {
    const r = e.result;
    ut('dice').insertAdjacentHTML('beforeend', `<div class="dice-detail">참여 ${r.participants.map(id => q.unit(id)?.name).filter(Boolean).join(' · ')}<br>창 지원 ${(r.supports || []).map(id => q.unit(id)?.name).join(' · ') || '없음'} · 결투 ${r.fightValues?.good || '—'} / ${r.fightValues?.evil || '—'}</div>`);
    await ne(200 / qt);
} };
document.querySelector('.brand').innerHTML = '<small>MIDDLE-EARTH WARBANDS · TACTICAL DEFENSE</small><strong>미들어스 워밴드</strong>';
document.querySelector('.sigil').innerHTML = `<img src="${Ut('dice-faces/minastirith-emblem.png')}" alt="곤도르">`;
document.querySelector('.runmeta').insertAdjacentHTML('beforeend', '<div class="metric"><small>GOLD</small><strong id="gold-count">35</strong></div><div class="metric"><small>WARBAND</small><strong id="roster-count">6/8</strong></div>');
document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<select id="speed" aria-label="진행 속도"><option value="1">보통</option><option value="3">빠르게</option><option value="30">즉시</option></select><button class="iconbtn" id="undo" title="직전 라운드로 되돌리기" style="margin-left:4px">↺</button>');
ut('speed').onchange = () => { qt = Number(ut('speed').value); me(); };
ut('undo').onclick = () => { clearTimeout(Jt); Rt(() => { q.undoRound() ? (Xt('직전 라운드로 되돌렸습니다.'), Yt()) : Xt('되돌릴 수 있는 이전 라운드가 없습니다.'); }); };
document.querySelector('.aside').insertAdjacentHTML('beforeend', '<section class="inventory"><div class="section-label">원정대의 유물</div><div id="relic-inventory"></div></section>');
document.querySelector('.footer').innerHTML = '<span>MIDDLE-EARTH WARBANDS · ENDLESS 1.0</span><span>Q/E 방향 · Tab 다음 병사 · F 선택 중심 · Space 행동 종료</span>';
document.title = '미들어스 워밴드 · MIDDLE-EARTH WARBANDS';
let waitConfirm = '';
ut('wait').onclick = () => { const u = q.unit(q.activeMoverUid || q.selected); if (!u || At)
    return; const key = q.round + '-' + q.phase + '-' + u.uid; if ((q.phase === 'move' && q.remaining(u) > 45 || q.phase === 'shoot' && q.validTargets(u).length) && waitConfirm !== key) {
    waitConfirm = key;
    Xt('아직 행동할 수 있습니다. 종료하려면 한 번 더 누르세요.');
    return;
} waitConfirm = ''; Rt(() => q.wait(u.uid)); };
document.addEventListener('keydown', e => { if (e.target.matches('input,select,textarea') || e.target.closest('button,[contenteditable]') || At || Qt || inputBlocked())
    return; if (AUTO)
    ut('auto').click(); if (e.key === 'Tab') {
    e.preventDefault();
    const list = q.eligible('good');
    if (list.length) {
        const i = list.findIndex(u => u.uid === q.selected);
        Zt(list[(i + 1) % list.length].uid);
    }
} if (e.key.toLowerCase() === 'f')
    Tt.focus(); if (e.key.toLowerCase() === 'q' || e.key.toLowerCase() === 'e')
    Rt(() => q.rotate(q.selected, e.key.toLowerCase() === 'q' ? -45 : 45)); if (e.code === 'Space') {
    e.preventDefault();
    if(e.target.closest('button,[contenteditable]')||inputBlocked())return;
    ut('dock-primary').click();
} });
// One persistent info panel for hover, keyboard focus and touch taps.
const relicInfo=document.createElement('div');relicInfo.id='relic-info';relicInfo.className='hidden';relicInfo.setAttribute('role','tooltip');Ke.append(relicInfo);
const relicList=ut('relic-inventory');
function openRelicInfo(button){
    const r=CX.relics.find(v=>v.id===button?.dataset.ownedRelic),rank=r&&q.rank(r.id);
    if(!r||!rank)return;
    relicInfo.innerHTML=`<div style="display:flex;gap:10px;align-items:center">${relicIcon(r, 56)}<div><b>${esc(r.name)}</b><small>${CX.rarityNames[r.rarity]} · ${relicFamily(r.id)} · 현재 ${rank}중첩</small></div></div><p>${esc(r.text)}</p>`;
    relicInfo.classList.remove('hidden');button.setAttribute('aria-describedby','relic-info');
    const a=button.getBoundingClientRect(),w=Math.min(290,innerWidth-20);
    relicInfo.style.width=w+'px';const h=relicInfo.offsetHeight;
    relicInfo.style.left=Math.max(10,Math.min(innerWidth-w-10,a.left+a.width/2-w/2))+'px';
    relicInfo.style.top=Math.max(8,a.top-h-9)+'px';
    if(a.top<h+20)relicInfo.style.top=Math.min(innerHeight-h-8,a.bottom+9)+'px';
}
function closeRelicInfo(){relicInfo.classList.add('hidden');relicList.querySelectorAll('[aria-describedby="relic-info"]').forEach(v=>v.removeAttribute('aria-describedby'));}
relicList.addEventListener('pointerover',e=>{if(e.pointerType==='mouse'){const b=e.target.closest('[data-owned-relic]');if(b)openRelicInfo(b);}});
relicList.addEventListener('pointerout',e=>{if(e.pointerType==='mouse'&&!e.relatedTarget?.closest?.('[data-owned-relic]'))closeRelicInfo();});
relicList.addEventListener('focusin',e=>{const b=e.target.closest('[data-owned-relic]');if(b)openRelicInfo(b);});
relicList.addEventListener('focusout',closeRelicInfo);
relicList.addEventListener('click',e=>{const b=e.target.closest('[data-owned-relic]');if(!b)return;e.stopPropagation();openRelicInfo(b);});
document.addEventListener('pointerdown',e=>{if(!e.target.closest('#relic-inventory,#relic-info'))closeRelicInfo();});
// Expose a small read-only-friendly QA surface for repeatable regression checks.
window.MESBG = { battle: q, scene: Tt, render: () => Yt(), act: fn => Rt(fn), ai: () => He(q), constants: CX, profiles: zt, legal: Et, plan: ve, contact: Vt, path: bt, zones: MAP_ZONES };
// Selecting another friendly model while one is mid-move ends the active mover's turn (spec: unit switch = movement end).
const baseSelect = Zt;
Zt = function (uid) {
    if (q.phase === 'move' && q.activeMoverUid && uid !== q.activeMoverUid) {
        const next = q.unit(uid);
        if (next && next.side === q.side && next.alive) {
            // End the mover's activation, then keep the clicked unit selected even if
            // finishActivation's autoSelect briefly picks the first eligible model.
            Rt(() => { q.wait(q.activeMoverUid); q.selected = uid; });
            let n = 0;
            const reassert = () => { if (q.selected === uid)
                return; if (At && n++ < 40)
                return setTimeout(reassert, 40); q.selected = uid; Tt.preview = void 0; Tt.previewPlan = null; Yt(); };
            setTimeout(reassert, 40);
            return;
        }
    }
    baseSelect(uid);
};
// Dice panel marks the winning side's row after each roll.
const baseDicePanel = $e;
$e = async function (e) { await baseDicePanel(e); if (qt >= 20)
    return; const rows = ut('dice').querySelectorAll('.dice-row'); if (rows.length < 2)
    return; let w = null; if (e.type === 'PriorityRolled')
    w = q.priority;
else if (e.result?.kind === 'fight')
    w = e.result.winnerSide;
else if (e.result?.kind === 'shot')
    w = q.unit(e.result.strikeResults?.[0]?.attacker)?.side; if (w)
    rows[w === 'good' ? 0 : 1].classList.add('winner'); };
// AUTO mode: the same AI that runs Mordor also drives Gondor; camps stay manual.
const safeAct = fn => () => Rt(() => { try {
    fn();
}
catch (e) {
    console.warn('[auto]', e);
} });
me = function () {
    clearTimeout(Jt);
    if (At || Qt)
        return;
    if (q.mode === 'ai' && q.side === 'evil' && ['move', 'shoot'].includes(q.phase)) {
        Jt = setTimeout(safeAct(() => He(q)), 650 / qt);
        return;
    }
    if (!AUTO && q.mode === 'ai' && q.side === 'good' && ['move', 'shoot'].includes(q.phase) && q.eligible().some(u => u.autoAlly)) {
        Jt = setTimeout(safeAct(() => He(q)), 700 / qt);
        return;
    }
    if (AUTO_STEP && window._stepPhase !== 'fight' && q.mode === 'ai' && q.side === 'good' && ['move', 'shoot'].includes(q.phase)) {
        Jt = setTimeout(safeAct(() => He(q)), 520 / qt);
        return;
    }
    if (AUTO_STEP && window._stepPhase === 'fight' && q.phase === 'fight' && q.fightQueue.length) {
        Jt = setTimeout(safeAct(() => q.fightNext()), 750 / Math.max(1, Math.min(qt, 10)));
        return;
    }
    if (AUTO_STEP) {
        AUTO_STEP = false;
        window._stepPhase = null;
        const _sb = ut('step-auto');
        if (_sb) _sb.textContent = '전체 진행';
        Xt('전체 진행 종료 — 수동으로 돌아옵니다');
    }
    if (!AUTO || !['ai', 'hotseat'].includes(q.mode))
        return;
    if (['move', 'shoot'].includes(q.phase))
        Jt = setTimeout(safeAct(() => He(q)), 650 / qt);
    else if (q.phase === 'fight')
        Jt = setTimeout(safeAct(() => q.fightNext()), 750 / Math.max(1, Math.min(qt, 10)));
    else if (q.phase === 'preparation' && q.side === 'good')
        Jt = setTimeout(safeAct(() => q.startWave()), 900);
    else if (q.phase === 'reward' && !q._autoCampNote) {
        q._autoCampNote = 1;
        Xt('자동 진행 중 · 영입과 유물은 직접 선택하세요');
    }
};
document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<button class="iconbtn" id="auto" title="AI가 아군 턴도 진행합니다. 전투·배치·교전을 자동으로 넘깁니다">자동</button>');
document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<button class="iconbtn" id="retreat" title="전투를 포기하고 스테이지 처음으로 돌아갑니다 (금화 -40)">후퇴</button>');
{
    let _rc = 0, _rt = null;
    const _syncRetreat = () => { const b = ut('retreat'); if (b) { const on = q && ['preparation', 'move', 'shoot', 'fight'].includes(q.phase) && q.mode === 'ai' && q.side === 'good' && (q._retrySnapshot || {}).gold >= 40 && !AUTO && !AUTO_STEP; b.classList.toggle('hidden', !on); if (!on && _rc) { _rc = 0; b.textContent = '후퇴'; } } };
    const _origYt = Yt; Yt = function () { _origYt(); _syncRetreat(); };
    ut('retreat').onclick = () => {
        if (At || !_rc) {
            if (At) return;
            _rc = 1;
            const b = ut('retreat'); b.textContent = '후퇴 확인 · 금화 -40';
            clearTimeout(_rt); _rt = setTimeout(() => { _rc = 0; if (ut('retreat')) ut('retreat').textContent = '후퇴'; }, 3200);
            return;
        }
        _rc = 0; clearTimeout(_rt);
        ut('retreat').textContent = '후퇴';
        Rt(() => { q.retreatStage() ? Yt() : Xt('후퇴할 수 없습니다.'); });
    };
}
if(localStorage.getItem('lwb-view')!=='pc')document.body.classList.add('force-mobile');
  document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<button class="iconbtn" id="speed-toggle" title="배속">1×</button>');
  document.querySelector('.top-actions').insertAdjacentHTML('afterbegin', '<button class="iconbtn" id="fx-toggle" title="전투 연출">연출</button>');
  window._lwbFx = localStorage.getItem('lwb_fx') === '0'; const _fxb = ut('fx-toggle');
  const _fxr = () => { _fxb.textContent = window._lwbFx ? '연출 OFF' : '연출'; _fxb.style.opacity = window._lwbFx ? .55 : 1; };
  _fxr(); _fxb.onclick = () => { window._lwbFx = !window._lwbFx; localStorage.setItem('lwb_fx', window._lwbFx ? '0' : '1'); _fxr(); };
  let _spd = Math.max(1, Math.min(8, parseInt(localStorage.getItem('lwb_speed') || '1') || 1)); if (_spd > 1) { qt = _spd; ut('speed-toggle').textContent = _spd + '×'; }
  ut('speed-toggle').onclick = () => { _spd = _spd >= 8 ? 1 : _spd * 2; qt = _spd; ut('speed-toggle').textContent = _spd + '×'; localStorage.setItem('lwb_speed', String(_spd)); if (window.MESBG && MESBG.scene) { MESBG.scene.tweens.timeScale = _spd; MESBG.scene.time.timeScale = _spd; } };
  ut('auto').onclick = () => { AUTO = !AUTO; q._autoCampNote = 0; ut('auto').classList.toggle('on', AUTO); ut('auto').textContent = AUTO ? '자동 중' : '자동'; const _ad2=ut('auto-dock'); if(_ad2){_ad2.textContent=AUTO?'자동 중':'자동';_ad2.classList.toggle('on',AUTO);} Xt(AUTO ? '자동 진행 시작 — 아군 턴도 AI가 맡습니다. 보상 화면에서는 멈춥니다.' : '자동 진행 해제'); me(); };
  ut('deploy-all').onclick = () => Rt(() => {
    const un = q.alive('good').filter(u => u.x < 0);
    if (!un.length) return;
    un.forEach(u => q.placeInDeployment(u));
    const left = q.alive('good').find(u => u.x < 0);
    q.selected = (left || q.alive('good')[0] || {}).uid || q.selected;
    Xt(left ? '일부 병사를 배치하지 못했습니다 — 직접 위치를 정하세요.' : '남은 병사를 전부 배치했습니다. 자유롭게 위치를 바꿀 수 있습니다.');
    Yt();
});
ut('step-auto').onclick = () => {
    if (AUTO || At || !(q.mode === 'ai' && q.side === 'good' && ['move', 'shoot', 'fight'].includes(q.phase)))
        return;
    AUTO_STEP = !AUTO_STEP;
    window._stepPhase = AUTO_STEP ? q.phase : null;
    ut('step-auto').textContent = AUTO_STEP ? '진행 중 · 탭하여 중지' : (q.phase === 'fight' ? '전부 해결' : '전체 진행');
    if (AUTO_STEP) {
        Xt(q.phase === 'fight' ? '남은 교전을 순서대로 해결합니다 — 끝나면 멈춥니다' : '이 단계의 남은 병사를 AI가 처리합니다 — 단계가 끝나면 멈춥니다');
        me();
    }
    else clearTimeout(Jt);
  };
window.MESBG.auto = v => { if (v !== undefined && v !== AUTO)
    ut('auto').click(); return AUTO; };
// 자동 진행 중: 전장(#game)을 짧게 탭해야만 자동 해제. 카메라 드래그·핀치·미니맵·줌·패널·정비 화면·상단 버튼은 자동 유지.
let _autoTapPt = null;
document.addEventListener('pointerdown', e => {
    if (!AUTO) { _autoTapPt = null; return; }
    if (e.target.closest('.top-actions,#overlay'))
        return;
    if (!_autoTapPt && e.target.closest('#game'))
        _autoTapPt = { id: e.pointerId, x: e.clientX, y: e.clientY };
}, true);
document.addEventListener('pointerup', e => {
    if (!AUTO || !_autoTapPt || e.pointerId !== _autoTapPt.id)
        return;
    const dx = e.clientX - _autoTapPt.x, dy = e.clientY - _autoTapPt.y;
    _autoTapPt = null;
    if (dx * dx + dy * dy < 100)
        ut('auto').click();
}, true);
document.addEventListener('pointercancel', () => { _autoTapPt = null; }, true);
// Collapsible battle panel on small screens.
document.querySelector('.aside').insertAdjacentHTML('afterbegin', '<button id="sheet-toggle" type="button">전투 패널</button>');
ut('sheet-toggle').onclick = () => { const a = document.querySelector('.aside'); a.classList.toggle('open'); if (a.classList.contains('open'))
    a.scrollTop = 0; };
ut('help').onclick = () => { if (At)
    return; clearTimeout(Jt); Qt = true; ut('overlay').classList.remove('hidden'); ut('overlay').innerHTML = `<div class="modal"><div class="eyebrow">FIELD MANUAL / ENDLESS</div><h2>원정대 야전 지침</h2><div class="help-list"><p><b>배치와 이동</b><br>배치 때 병사를 선택하고 빈 땅을 누르세요. 전투 중 이동력을 나눠 쓸 수 있습니다. 남은 이동력을 쓰거나 이동 종료로 차례를 넘기세요. Q/E로 방향을 정합니다.</p><p><b>돌격과 사격</b><br>선택한 병사로 적을 누르면 돌격 또는 사격합니다. 기병 돌격은 추가 결투 주사위와 보병 넘어짐을 줍니다. 창병은 접촉한 아군을 지원합니다. 아군과 장애물이 사선을 막습니다. 낮은 바리케이드는 탭하여 넘을 수 있습니다. 넘기 주사위 1은 실패, 2–5는 건넌 뒤 이동 종료, 6은 계속 이동합니다.</p><p><b>위협과 상태 표시</b><br>아군 병사를 선택하면 그 병사를 노리는 적이 표시됩니다 — ⚠ 이번 턴 돌격 가능, 🏹 사거리 내 궁수. 병사 위 아이콘: 😨 겁먹음 · 💥 넘어짐 · 🛡 보호 · 🎯 조준. 보스는 상단 체력바와 발밑 붉은 오라로 표시됩니다.</p><p><b>영웅</b><br>선택 패널에서 Might·Will·Fate와 고유 능력을 확인하세요. 능력은 자원을 소비하며, Fate는 상처를 입을 때 자동 판정합니다.</p><p><b>임무와 보상</b><br>매 전투의 목표를 상단에서 확인하세요. 승리하면 금화로 모집·정원 확장·재추첨을 하고 유물 세 장 중 하나를 고릅니다. 이후 재배치하여 다음 전투로 갑니다.</p><p><b>끝없는 원정</b><br>같은 전장에서 다섯 스테이지를 치른 뒤 다음 지도로 이동합니다. 다섯 단계마다 보스가 등장합니다. 25단계 모르고스는 체력에 따라 단계가 변하고 다음 라운드의 강타 위치를 예고합니다. 처치 뒤에도 원정은 계속됩니다.</p><p><b>조작과 저장</b><br>Tab 다음 병사 · F 선택 중심 · Space 행동 종료. 휠로 확대, 빈 땅 드래그로 카메라 이동. 보상·준비 단계에서 자동 저장됩니다. 2P 모드는 한 기기를 번갈아 사용합니다.</p></div><p>원작 전투 엔진에 맞춘 간소화 규칙입니다.</p><button id="close-help" class="primary">전장으로 돌아가기</button></div>`; ut('close-help').onclick = () => { Qt = false; Yt(); me(); }; };
/* ----------------------------------------------------------------------
 * MIDDLE-EARTH WARBANDS — Mobile clarity 1.1
 * World coordinates/rules are unchanged. CSS pixels, render pixels, and
 * world pixels are intentionally separate; only this adapter moves camera.
 * No network dependencies. Native Pointer Events own all field gestures.
 * -------------------------------------------------------------------- */
const UX = {version:'1.9-hud-polish', dpr:1, zoom:.7, width:1, height:1, ready:false,
    cameraMode:'tactical', pointers:new Map(), gesture:null, stage:null, rosterKey:'', reduced:matchMedia('(prefers-reduced-motion: reduce)').matches};
const mobileLayout = () => matchMedia('(max-width:900px)').matches || document.body.classList.contains('force-mobile');
const touchLayout = () => matchMedia('(pointer:coarse)').matches || mobileLayout();
const icon = (body) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
const crossIcon = icon('<path d="M8 3H3v5m13-5h5v5M3 16v5h5m8 0h5v-5"/><circle cx="12" cy="12" r="4"/>');
const tree = '<svg viewBox="0 0 48 64" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><path d="M24 49V14M24 37L12 29l-6-1m18 2L35 21l6-2M24 23l-8-6-2-7M24 31l-12-9-6-1M24 40l11-7 7-1M24 21l7-8 1-5M24 47l-10 7h20l-10-7M12 29l-3-7M35 21l1-7M35 33l3-7M16 17l-7-3M31 13l7-3"/><path d="m24 2 1.3 3.1 3.4.3-2.5 2.2.7 3.3L24 9.1 21.1 11l.7-3.4-2.5-2.2 3.4-.3z" fill="currentColor" stroke="none"/><path d="M7 57h34M13 60h22" opacity=".7"/><circle cx="6" cy="11" r="1"/><circle cx="42" cy="11" r="1"/><circle cx="3" cy="18" r="1"/><circle cx="45" cy="18" r="1"/></svg>';
document.title = '미들어스 워밴드 · MIDDLE-EARTH WARBANDS';
document.querySelector('meta[name="theme-color"]').content='#14212b';
document.querySelector('.sigil').innerHTML = '<img src="'+Ut('dice-faces/minastirith-emblem.png')+'" alt="곤도르">';
document.querySelector('.brand').innerHTML='<small>MIDDLE-EARTH WARBANDS</small><strong>미들어스 워밴드</strong>';
[...document.querySelectorAll('.metric small')].forEach((e,i)=>e.textContent=['공세','라운드','지휘력','금화','원정대'][i]);
document.querySelector('.top').insertAdjacentHTML('beforeend',`<button id="settings-toggle" class="iconbtn" aria-label="진행 속도·자동·음향 설정" aria-expanded="false">${icon('<path d="M4 6h16M4 12h16M4 18h16"/><circle cx="9" cy="6" r="2" fill="#18232c"/><circle cx="16" cy="12" r="2" fill="#18232c"/><circle cx="8" cy="18" r="2" fill="#18232c"/>')}</button>`);
ut('help').setAttribute('aria-label','게임 조작법');
ut('speed').options[0].text='속도 ×1';ut('speed').options[1].text='속도 ×3';ut('speed').options[2].text='즉시 진행';
const field = document.querySelector('.field');
field.insertAdjacentHTML('beforeend',`<div id="wx-fx"></div><div class="battle-info"><div id="ux-place" class="place"></div><div id="ux-mission" class="mission"></div><div id="ux-bossbar" class="bossbar hidden"><span class="bossbar-name"></span><div class="bossbar-track"><i class="bossbar-fill"></i></div><span class="bossbar-hp"></span></div></div><div id="world-ui"><div id="active-tag" class="active-tag hidden"></div></div><button id="offscreen-unit" class="hidden" aria-label="화면 밖 현재 행동 병사로 이동">현재 병사 ↗</button><button id="map-toggle" class="iconbtn" aria-expanded="false" aria-controls="minimap">${icon('<path d="m3 5 6-2 6 3 6-2v15l-6 2-6-3-6 2zM9 3v15M15 6v15"/>')}<span>전술 지도</span></button><div class="field-actions"></div>`);
const fieldActions=field.querySelector('.field-actions');
for(const id of ['focus','zoomout','zoomin'])fieldActions.append(ut(id));
ut('focus').innerHTML=crossIcon+'<span>현재 병사</span>';ut('focus').classList.add('focus-control');ut('focus').setAttribute('aria-label','현재 행동 병사에 카메라 맞추기');
ut('zoomout').setAttribute('aria-label','전장 축소');ut('zoomin').setAttribute('aria-label','전장 확대');
field.append(ut('overview'));ut('overview').classList.add('hidden');ut('overview').style.cssText='position:absolute;bottom:64px;left:164px;z-index:9;background:#14202cee';
ut('minimap').setAttribute('aria-label','전술 지도. 위치를 누르면 해당 지역으로 이동');
const dock=document.createElement('div');dock.id='command-dock';dock.innerHTML=`<div class="dock-main"><img class="dock-portrait" id="dock-portrait" alt=""><div class="dock-text"><span class="dock-eyebrow" id="dock-eyebrow">원정대 지휘</span><strong id="dock-name">병사를 선택하세요</strong><div class="dock-status" id="dock-status"></div></div><button id="auto-dock" class="secondary" title="자동 진행 온/오프" aria-label="자동 진행 온/오프">자동</button><button id="dock-primary" class="dock-primary" disabled>전투 시작</button></div><div id="dock-vitals" aria-label="선택 병사 능력치"></div><div class="dock-sub"><div class="roster-strip" id="roster-strip" aria-label="원정대 병사 선택"></div><div class="roster-tools"><button id="next-unit" class="secondary" title="다음 행동 가능 병사" aria-label="다음 행동 가능 병사">다음</button><button id="speed-quick" class="secondary" title="재생 속도" aria-label="재생 속도">×1</button><button id="dock-detail" class="secondary" aria-controls="battle-sheet" aria-expanded="false">명령 ⌃</button></div></div>`;
document.querySelector('.battle-column').insertBefore(dock,document.querySelector('.hint'));
{const _ad=ut('auto-dock');if(_ad)_ad.onclick=()=>{const _o=ut('auto');_o&&_o.click();};}
document.querySelector('.hint b').textContent='야전 지침';
const aside=document.querySelector('.aside');aside.id='battle-sheet';aside.setAttribute('aria-label','병사 상세 및 지휘 명령');
Ke.insertAdjacentHTML('beforeend','<button id="sheet-backdrop" tabindex="-1" aria-label="명령 패널 닫기"></button>');
const sec=aside.querySelectorAll('.section-label');if(sec[0])sec[0].textContent='전장 임무';if(sec[1])sec[1].textContent='선택한 병사';if(sec[2])sec[2].textContent='지휘 명령';
ut('sheet-toggle').textContent='원정대 · 지휘 명령';
function setSheet(open){aside.classList.toggle('open',open);ut('sheet-backdrop').classList.toggle('open',open);ut('dock-detail').setAttribute('aria-expanded',String(open));aside.inert=!open;aside.setAttribute('aria-hidden',String(!open));if(open)aside.scrollTop=0;}
setSheet(false);
ut('sheet-toggle').onclick=()=>setSheet(false);ut('sheet-backdrop').onclick=()=>setSheet(false);ut('dock-detail').onclick=()=>setSheet(!aside.classList.contains('open'));
ut('settings-toggle').onclick=()=>{const a=document.querySelector('.top-actions'),on=!a.classList.contains('open');a.classList.toggle('open',on);ut('settings-toggle').setAttribute('aria-expanded',String(on));};
document.addEventListener('pointerdown',e=>{if(!e.target.closest('.top-actions,#settings-toggle')){document.querySelector('.top-actions').classList.remove('open');ut('settings-toggle').setAttribute('aria-expanded','false')}});
ut('map-toggle').onclick=()=>{const on=!ut('minimap').classList.contains('shown');ut('minimap').classList.toggle('shown',on);ut('overview').classList.toggle('hidden',!on);ut('map-toggle').setAttribute('aria-expanded',String(on));xe();};
function actionableUnit(){
    if(q.phase==='preparation')return q.unit(q.selected)?.alive&&q.unit(q.selected).side==='good'?q.unit(q.selected):q.alive('good')[0];
    if(!['move','shoot'].includes(q.phase)||AUTO||(q.mode==='ai'&&q.side==='evil'))return null;
    const active=q.unit(q.activeMoverUid);if(q.canAct(active))return active;
    const selected=q.unit(q.selected);return q.canAct(selected)?selected:q.eligible()[0]||null;
}
function shortName(u){return u.name.replace('미나스 티리스 전사','곤도르 전사').replace('미나스 티리스 창병','곤도르 창병').replace('모르도르 오크(검)','오크 전사')}
function cameraCenter(){const c=Tt.cameras?.main;return c?{x:c.scrollX+c.width/2,y:c.scrollY+c.height/2}:{x:1165,y:670}}
function fitZoom(){return Math.max(UX.width/pt.width,UX.height/pt.height)}
function setCamera(x,y,z=UX.zoom,mode=UX.cameraMode){
    if(!UX.ready)return;
    const c=Tt.cameras.main;UX.zoom=Ot.Math.Clamp(z,Math.max(.12,fitZoom()),1.65);UX.cameraMode=mode;
    const halfW=UX.width/(2*UX.zoom),halfH=UX.height/(2*UX.zoom);
    x=halfW>=pt.width/2?pt.width/2:Ot.Math.Clamp(x,halfW,pt.width-halfW);
    y=halfH>=pt.height/2?pt.height/2:Ot.Math.Clamp(y,halfH,pt.height-halfH);
    c.panEffect.reset();c.shakeEffect.reset();c.setZoom(UX.zoom*UX.dpr).centerOn(x,y);c.preRender();
    Tt.drawRings();updateWorldUI();
}
// panTo: 유닛 추적·턴 전환용 부드러운 카메라 이동. 수동 팬·핀치는 setCamera 그대로 둡니다.
function panTo(x,y,z=UX.zoom,ms=320){
    if(!UX.ready)return;
    if(UX.reduced||ms<=0){setCamera(x,y,z,'tactical');return;}
    UX.zoom=Ot.Math.Clamp(z,Math.max(.12,fitZoom()),1.65);UX.cameraMode='tactical';
    const halfW=UX.width/(2*UX.zoom),halfH=UX.height/(2*UX.zoom);
    x=halfW>=pt.width/2?pt.width/2:Ot.Math.Clamp(x,halfW,pt.width-halfW);
    y=halfH>=pt.height/2?pt.height/2:Ot.Math.Clamp(y,halfH,pt.height-halfH);
    const c=Tt.cameras.main;c.panEffect.reset();c.shakeEffect.reset();
    c.pan(x,y,ms,'Sine.easeInOut',true);
    if(Math.abs(c.zoom-UX.zoom*UX.dpr)>.001)c.zoomTo(UX.zoom*UX.dpr,ms);
    Tt.drawRings();updateWorldUI();
}
function worldAt(x,y){const c=cameraCenter();return{x:c.x+(x-UX.width/2)/UX.zoom,y:c.y+(y-UX.height/2)/UX.zoom}}
function screenAt(x,y){const c=cameraCenter();return{x:(x-c.x)*UX.zoom+UX.width/2,y:(y-c.y)*UX.zoom+UX.height/2}}
function zoomAt(z,x=UX.width/2,y=UX.height/2){const p=worldAt(x,y);z=Ot.Math.Clamp(z,Math.max(.12,fitZoom()),1.65);setCamera(p.x-(x-UX.width/2)/z,p.y-(y-UX.height/2)/z,z,'manual');}
Ve.prototype.zoom=function(delta){zoomAt(UX.zoom*(delta>0?1.2:1/1.2));};
Ve.prototype.overview=function(){setCamera(pt.width/2,pt.height/2,fitZoom(),'overview')};
Ve.prototype.focus=function(){const u=actionableUnit()||this.b.unit(this.b.selected);if(u?.alive){panTo(u.x,u.y,UX.cameraMode==='overview'?(mobileLayout()?.78:.82):UX.zoom,320)}};
Ve.prototype.center=function(x,y){setCamera(x,y,UX.zoom,'manual')};
ut('offscreen-unit').onclick=()=>Tt.focus();
function resetGestures(){for(const id of UX.pointers.keys()){try{Tt.game.canvas.releasePointerCapture(id)}catch{}}UX.pointers.clear();UX.gesture=null;Tt.dragStart=undefined;Tt.dragUnit='';Tt.preview=undefined;Tt.previewPlan=null;Tt.chargeTarget=null;}
function inputBlocked(){return Qt||aside.classList.contains('open')||!ut('overlay').classList.contains('hidden')}
function installFieldInput(scene){
    const canvas=scene.game.canvas;
    const point=e=>{const r=canvas.getBoundingClientRect();return{x:(e.clientX-r.left)*UX.width/r.width,y:(e.clientY-r.top)*UX.height/r.height}};
    canvas.addEventListener('contextmenu',e=>e.preventDefault());
    canvas.addEventListener('pointerdown',e=>{
        if(inputBlocked()||e.pointerType==='mouse'&&e.button!==0)return;
        e.preventDefault();const p=point(e);UX.pointers.set(e.pointerId,p);try{canvas.setPointerCapture(e.pointerId)}catch{}
        scene.preview=undefined;scene.previewPlan=null;scene.chargeTarget=null;
        if(UX.pointers.size===1){const at=worldAt(p.x,p.y),hit=scene.hit(at);UX.gesture={mode:'tap',start:p,world:at,center:cameraCenter(),hit:hit?.uid||'',touch:e.pointerType!=='mouse'};}
        else if(UX.pointers.size===2){const [a,b]=[...UX.pointers.values()],mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2};UX.gesture={mode:'pinch',distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),zoom:UX.zoom,anchor:worldAt(mid.x,mid.y)};}
        else UX.gesture={mode:'blocked'};
        scene.drawRings();
    },{passive:false});
    canvas.addEventListener('pointermove',e=>{
        if(!UX.pointers.has(e.pointerId)){
            if(e.pointerType!=='mouse'||At||UX.intent||inputBlocked())return;
            const p=point(e),wp=worldAt(p.x,p.y),u=actionableUnit();
            if(u&&q.phase==='move'&&performance.now()-(UX.previewAt||0)>100){UX.previewAt=performance.now();scene.preview=wp;scene.previewPlan=ve(u,wp,q.alive(),q.terrain,q.remaining(u));const foe=scene.hit(wp);scene.chargeTarget=foe&&foe.side!==u.side?{u:foe,plan:ve(u,ue(u,foe),q.alive(),q.terrain,q.remaining(u),{chargeTarget:foe})}:null;scene.drawRings();}
            return;
        }
        e.preventDefault();const p=point(e);UX.pointers.set(e.pointerId,p);const g=UX.gesture;if(!g)return;
        if(g.mode==='pinch'&&UX.pointers.size===2){const [a,b]=[...UX.pointers.values()],mid={x:(a.x+b.x)/2,y:(a.y+b.y)/2},d=Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),z=Ot.Math.Clamp(g.zoom*d/g.distance,Math.max(.12,fitZoom()),1.65);setCamera(g.anchor.x-(mid.x-UX.width/2)/z,g.anchor.y-(mid.y-UX.height/2)/z,z,'manual');return;}
        if(g.mode==='blocked'||UX.pointers.size!==1)return;
        const dx=p.x-g.start.x,dy=p.y-g.start.y;
        if(g.mode==='tap'&&Math.hypot(dx,dy)>(g.touch?9:5))g.mode=!g.touch&&g.hit&&!At?'unit-drag':'pan';
        if(g.mode==='pan')setCamera(g.center.x-dx/UX.zoom,g.center.y-dy/UX.zoom,UX.zoom,'manual');
        if(g.mode==='unit-drag'&&!At&&performance.now()-(UX.previewAt||0)>100){UX.previewAt=performance.now();const u=q.unit(g.hit);if(u?.alive&&u.side===q.side){scene.dragUnit=u.uid;scene.preview=worldAt(p.x,p.y);scene.previewPlan=q.phase==='move'?ve(u,scene.preview,q.alive(),q.terrain,q.remaining(u)):null;scene.drawRings();}}
    },{passive:false});
    const finish=(e,cancel)=>{
        if(!UX.pointers.has(e.pointerId))return;e.preventDefault();const p=point(e),g=UX.gesture;UX.pointers.delete(e.pointerId);try{canvas.releasePointerCapture(e.pointerId)}catch{}
        if(UX.pointers.size){UX.gesture={mode:'blocked'};return;}UX.gesture=null;
        scene.dragUnit='';scene.preview=undefined;scene.previewPlan=null;scene.chargeTarget=null;
        if(!cancel&&!At&&!inputBlocked()&&g){const pos=worldAt(p.x,p.y);
            if(g.mode==='tap'){const hit=scene.hit(pos);if(hit)scene.onUnit(hit.uid);else scene.onPoint(pos);}
            else if(g.mode==='unit-drag'){const u=q.unit(g.hit);if(u?.side===q.side){Zt(u.uid);if(q.selected===u.uid)planIntent(pos,scene.hit(pos)?.side!==u.side?scene.hit(pos):null);}}
        }
        scene.drawRings();
    };
    canvas.addEventListener('pointerup',e=>finish(e,false),{passive:false});canvas.addEventListener('pointercancel',e=>finish(e,true),{passive:false});
    canvas.addEventListener('lostpointercapture',e=>{if(UX.pointers.has(e.pointerId))resetGestures()});
    canvas.addEventListener('pointerleave',()=>{if(!UX.pointers.size){scene.preview=undefined;scene.previewPlan=null;scene.chargeTarget=null;scene.drawRings()}});
    canvas.addEventListener('wheel',e=>{if(inputBlocked())return;e.preventDefault();const p=point(e);zoomAt(UX.zoom*Math.exp(-Ot.Math.Clamp(e.deltaY,-120,120)*.002),p.x,p.y)},{passive:false});
    for(const ev of ['gesturestart','gesturechange','gestureend'])canvas.addEventListener(ev,e=>e.preventDefault(),{passive:false});
    window.addEventListener('blur',resetGestures);document.addEventListener('visibilitychange',()=>{resetGestures();if(document.hidden)clearTimeout(Jt);else me()});
}
// Grayscale copies are cached once per original token. Alpha is unchanged.
function grayTexture(id){const key='__spent_'+id;if(Tt.textures.exists(key))return key;if(!Tt.textures.exists(id))return'unit-pending';
    const source=Tt.textures.get(id).getSourceImage(),c=document.createElement('canvas');c.width=source.width;c.height=source.height;
    const ctx=c.getContext('2d',{willReadFrequently:true});ctx.drawImage(source,0,0);
    try{const im=ctx.getImageData(0,0,c.width,c.height),p=im.data;for(let i=0;i<p.length;i+=4){if(!p[i+3])continue;const g=.2126*p[i]+.7152*p[i+1]+.0722*p[i+2];p[i]=p[i]*.13+g*.75;p[i+1]=p[i+1]*.13+g*.77;p[i+2]=p[i+2]*.13+g*.80;}ctx.putImageData(im,0,0);Tt.textures.addCanvas(key,c);return key;}catch{return id;}
}
function removeCasualty(uid){const c=Tt.tokens.get(uid);if(c){Tt.tweens.killTweensOf(c);for(const child of c.list)Tt.tweens.killTweensOf(child);c.destroy();Tt.tokens.delete(uid)}}
const claritySync=Ve.prototype.sync;
Ve.prototype.sync=function(){
    claritySync.call(this);if(!UX.ready)return;
    for(const [uid,c] of this.tokens){const u=this.b.unit(uid),sprite=c.getByName('token');if(!u?.alive||!sprite)continue;
        const visual=u.visualRadius||u.radius;
        if(sprite.getData('visualRadius')!==visual){
            const source=this.textures.get(u.id).getSourceImage(),ratio=source.width/source.height,E=u.radius*2*(u.artScale||1),st=__figCenterPx(source,1,1);
            let dw,dh;
            if(ratio>=1){dw=Math.min(E/Math.max(.35,st.fx||1),E*1.95);dh=dw/ratio;}else{dh=Math.min(E/Math.max(.35,st.fy||1),E*1.95);dw=dh*ratio;}
            const mx=E*1.3,lg=Math.max(dw,dh);if(lg>mx){const k=mx/lg;dw*=k;dh*=k;}
            sprite.setDisplaySize(dw,dh);
            sprite.setData('baseSX',sprite.scaleX);sprite.setData('baseSY',sprite.scaleY);
            sprite.setData('cxy',{x:st.x*dw,y:st.y*dh});
            sprite.setData('visualRadius',visual);
        }
    }
    for(const [uid,c] of this.tokens){const u=this.b.unit(uid);if(!u?.alive||u.escaped){removeCasualty(uid);continue;}
        c.setAlpha(1).setVisible(this.b.phase!=='menu');const s=c.getByName('token'),spent=u.acted&&['move','shoot'].includes(this.b.phase);
        s.setAlpha(1).setTexture(spent?grayTexture(u.id):(Tt.textures.exists(u.id)?u.id:s.texture.key)).clearTint();c.setData('spent',spent);
        c.getByName('label')?.setVisible(false);const base=c.getByName('base');if(base){base.setAlpha(1);if(base.setTint)spent?base.setTint(0xb1b8bb):base.clearTint();}
        c.getByName('rim')?.setStrokeStyle((u.traits.includes('hero')?3:2.2)/UX.zoom,spent?0x7d8478:u.traits.includes('hero')?0xe9c97e:u.side==='good'?0x58c9a5:0xe8705e,spent?.7:1);
    }
    if(this.b.phase==='menu'){UX.stage=null;return;}
    const stage=(this.b.phase==='preparation'?this.b.wave+1:this.b.wave)+'/'+(this.b.mapIndex||0);
    if(stage!==UX.stage&&['preparation','move','shoot','fight'].includes(this.b.phase)){UX.stage=stage;const team=this.b.alive(['move','shoot'].includes(this.b.phase)?this.b.side:'good');const x=team.length?team.reduce((n,u)=>n+u.x,0)/team.length:1165;const z=mobileLayout()?Math.max(.55,Math.min(.8,UX.height/(pt.height*.72))):.82;const y=this.b.phase==='preparation'?(team.length?team.reduce((n,u)=>n+u.y,0)/team.length:690):this.b.mission==='defense'?(mobileLayout()&&innerHeight>innerWidth?600-Math.min(78,UX.height*.16)/z:590):690;panTo(x,y,z,430)}
    updateWorldUI();
};
const clarityRings=Ve.prototype.drawRings;
Ve.prototype.drawRings=function(){
    clarityRings.call(this);if(!UX.ready||!this.rings)return;
    // Labels retain their positions in world space, but their type stays 12–13 CSS px.
    for(const l of this.labels.list){if(l.type!=='Text')continue;
        if(l.text.includes('배치 구역')||l.text.includes('″ 남음')&&l.text.includes(' · ')&&!l.text.includes('사용')){l.setVisible(false);continue;}
        l.setFontFamily('Pretendard, sans-serif').setFontSize(12).setResolution(UX.dpr).setScale(1/UX.zoom).setPadding(6,4);
        if(UX.zoom<.4&&!l.text.includes('그론드')&&!l.text.includes('돌파'))l.setVisible(false);
    }
    if(this.objectiveLabel){this.objectiveLabel.setFontSize(12).setResolution(UX.dpr).setScale(1/UX.zoom).setVisible(this.b.phase!=='menu'&&UX.zoom>=.4&&!!this.objectiveLabel.text)}
    updateWorldUI();
};
let __wuiSig='';
function updateWorldUI(){
    if(!UX.ready||!Tt.actionRing)return;
    const u=actionableUnit(),g=Tt.actionRing;
    const tag=ut('active-tag'),out=ut('offscreen-unit');
    if(!u||inputBlocked()||At||!['preparation','move','shoot'].includes(q.phase)){if(__wuiSig!=='hidden'){__wuiSig='hidden';g.clear();tag.classList.add('hidden');out.classList.add('hidden');}return;}
    const token=Tt.tokens.get(u.uid),p=screenAt(token?.x??u.x,token?.y??u.y),r=u.radius*1.23+5/UX.zoom;
    const on=p.x>16&&p.x<UX.width-16&&p.y>45&&p.y<UX.height-48;
    const text=shortName(u)+' · '+(q.phase==='preparation'?'배치':q.phase==='move'?'이동 차례':'사격 차례');
    const left=Math.max(82,Math.min(UX.width-82,p.x))|0,top=Math.max(48,p.y-r*UX.zoom-11)|0;
    const sig=u.uid+'|'+(token?.x??u.x).toFixed(1)+'|'+(token?.y??u.y).toFixed(1)+'|'+UX.zoom+'|'+r.toFixed(1)+'|'+on+'|'+text+'|'+left+'|'+top;
    if(__wuiSig===sig)return;__wuiSig=sig;
    const x=token?.x??u.x,y=token?.y??u.y;
    g.clear();
    const z=UX.zoom;
    g.lineStyle(14/z,0xe9c97e,.16);g.strokeCircle(x,y,r+2/z);
    g.lineStyle(6.5/z,0x0b100d,.9);g.strokeCircle(x,y,r);g.lineStyle(3.2/z,0xfbe8b0,1);g.strokeCircle(x,y,r);
    // Direction chevron provides a shape cue in addition to colour.
    g.fillStyle(0x0b100d,.9);g.fillTriangle(x-8/z,y-r-12/z,x+8/z,y-r-12/z,x,y-r-1/z);
    g.fillStyle(0xfbe8b0,1);g.fillTriangle(x-5.5/z,y-r-10/z,x+5.5/z,y-r-10/z,x,y-r-3/z);
    if(!UX.reduced&&!Tt._ringPulse)Tt._ringPulse=Tt.tweens.add({targets:g,alpha:{from:1,to:.62},duration:760,yoyo:true,repeat:-1,ease:'Sine.easeInOut'});
    tag.classList.toggle('hidden',!on);out.classList.toggle('hidden',on);
    if(on){tag.textContent=text;tag.style.left=left+'px';tag.style.top=top+'px';}
}
const clarityUpdate=Ve.prototype.update;
Ve.prototype.update=function(t){if(!UX.reduced)clarityUpdate.call(this,t);updateWorldUI();};
Ve.prototype.create=function(){
    this.drawMap();this.terrainLayer=this.add.container(0,0);this.rings=this.add.graphics().setDepth(3);this.labels=this.add.container(0,0).setDepth(8);this.actionRing=this.add.graphics().setDepth(10);
    this.cameras.main.removeBounds();this.input.enabled=false;UX.ready=true;
    resizeBattle(true);installFieldInput(this);this.sync();Yt();
};
function resizeBattle(force=false){
    const rect=ut('game').getBoundingClientRect(),w=Math.max(1,Math.round(rect.width)),h=Math.max(1,Math.round(rect.height));
    // Respect device density, with a hard 3M-pixel surface budget on large screens.
    const dpr=Math.max(1,Math.min(window.devicePixelRatio||1,2,Math.sqrt(3000000/(w*h))));
    if(!force&&w===UX.width&&h===UX.height&&Math.abs(dpr-UX.dpr)<.01)return;
    const center=UX.ready?cameraCenter():{x:1165,y:650},z=UX.zoom;
    resetGestures();UX.width=w;UX.height=h;UX.dpr=dpr;
    if(UX.ready){const scale=Tt.scale;scale.zoom=1/dpr;scale._resetZoom=true;scale.resize(Math.round(w*dpr),Math.round(h*dpr));Tt.game.canvas.style.width=w+'px';Tt.game.canvas.style.height=h+'px';scale.refresh();Tt.cameras.main.setSize(Math.round(w*dpr),Math.round(h*dpr));setCamera(center.x,center.y,UX.cameraMode==='overview'?fitZoom():z);}
    aside.inert=!aside.classList.contains('open');aside.setAttribute('aria-hidden',String(aside.inert));
}
let resizeFrame=0;
function queueResize(){cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(()=>resizeBattle())}
new ResizeObserver(queueResize).observe(ut('game'));
function viewportHeight(){const vp=window.visualViewport;if(vp&&Math.abs(vp.scale-1)>.02)return;const h=Math.round(vp?.height||window.innerHeight);if(h>120)document.documentElement.style.setProperty('--app-h',h+'px');queueResize();}
window.addEventListener('resize',viewportHeight,{passive:true});window.visualViewport?.addEventListener('resize',viewportHeight,{passive:true});viewportHeight();
const pendingFonts=document.fonts.load('16px Pretendard');pendingFonts.then(()=>{if(UX.ready){for(const text of Tt.labels.list)text.updateText?.();Tt.objectiveLabel?.updateText();Tt.drawRings()}}).catch(()=>{});
function nextUnit(){if(At||Qt)return;const list=q.phase==='preparation'?q.alive('good'):q.eligible(q.side);if(!list.length||q.mode==='ai'&&q.side==='evil')return;const i=list.findIndex(u=>u.uid===q.selected);Zt(list[(i+1)%list.length].uid);Tt.focus()}
ut('next-unit').onclick=nextUnit;
ut('speed-quick').onclick=()=>{ut('speed-toggle').click();ut('speed-quick').textContent='×'+qt;};
function renderDock(){
    wt.setMood(['menu','reward','result'].includes(q.phase)?0:q.current&&q.current.boss?2:1);
    wt.setAct&&wt.setAct(q.wave<=15?0:q.wave<=30?1:q.wave<=40?2:3);
    const _sq=ut('speed-quick');if(_sq)_sq.textContent='×'+qt;
    const active=actionableUnit(),selected=q.unit(q.selected),u=selected?.alive?selected:active,busy=At||q.mode==='ai'&&q.side==='evil'&&['move','shoot'].includes(q.phase);
    const phase=q.phase;
    const steps=[['preparation','배치'],['move','이동 · 돌격'],['shoot','사격'],['fight','근접전']];
    ut('phases').innerHTML=steps.map(([id,label],i)=>`<span class="phase ${phase===id?'active':''}" ${phase===id?'aria-current="step"':''}><i>${String(i+1).padStart(2,'0')}</i>${label}</span>`).join('')+`<span class="turn">${phase==='preparation'?'출전 준비':At?'행동 처리 중':phase==='fight'?'교전 판정':q.side==='good'?'아군 차례':'적군 차례'}</span>`;
    ut('cp').textContent=q.cp+' CP';ut('round').textContent=(q.round||'—')+' · '+({preparation:'배치',move:'이동',shoot:'사격',fight:'근접'}[phase]||'정비');
    const _mk=CX.maps[visualMapIdx(q.mapIndex)],_zn=(MAP_ZONE_NAMES[_mk]||[])[mapVariant(q.wave||1)];
    const place=CX.mapNames[visualMapIdx(q.mapIndex)]+(_zn?' · '+_zn:'');
    const _info = q.phase === 'preparation' ? q.next : q.current;
    const _mod = (_info && _info.modifier) || 'clear';
    const _MN = { rain: '폭우 · 사거리↓ 명중↓', dark: '어둠 · 사거리↓ 명중↓', fog: '안개 · 사거리↓↓ 명중↓', reinforce: '적 증원', warg: '와르그 사냥대', ambush: '기습 포위', cavalry: '기병 돌격', swarm: '고블린 떼', snow: '눈보라 · 사거리↓ 이동↓', eclipse: '일식 · 용기↓', mud: '진창 · 보병 이동↓', gale: '강풍 · 궁수 명중↓', frost: '서리 · 힘↓' };
    const _MC = { rain: '#8fb8e8', dark: '#a89ae0', fog: '#b8c4c0', reinforce: '#e09a6a', warg: '#d4b45a', ambush: '#e06a6a', cavalry: '#8fc48f', swarm: '#c4b05a', snow: '#cfe4f5', eclipse: '#b094d8', mud: '#a88a5a' };
    let _chips = _MN[_mod] ? '<span class="hud-mod" style="border-color:' + _MC[_mod] + 'aa;color:' + _MC[_mod] + '">' + _MN[_mod] + '</span>' : '';
    if (_info && _info.boss)
        _chips += '<span class="hud-mod" style="border-color:#e08a5aaa;color:#ffb08a">보스 · ' + esc(q.meta.get(_info.boss).name_ko) + '</span>';
    if (q.weeklySeed) { const _wk = ['적 대군', '보스 러시', '근접전', '베테랑', '기병 전성', '모르도르의 광기', '강철의 전장', '궁술 경연', '긴 밤', '비열한 날', '강행군', '피의 전장'][q.weeklySeed % 12]; _chips += '<span class="hud-mod" style="border-color:#c9a84caa;color:#e8d08a">주간 · ' + _wk + '</span>'; }
    if (q.challenge) { const _chl = (CHALLENGES.find(c=>c.id===q.challenge)||{}).label || q.challenge; _chips += '<span class="hud-mod" style="border-color:#b8452faa;color:#e8a88a">의뢰 · ' + _chl + '</span>'; }
    ut('ux-place').innerHTML = esc(place) + _chips;
    { const _bb = ut('ux-bossbar'); if (_bb && _bb.parentElement !== document.querySelector('header.top')) document.querySelector('header.top')?.appendChild(_bb); if (_bb) {
        const _boss = ((_info && _info.boss) ? q.alive('evil').find(u => u.id === _info.boss) : null) || q.alive('evil').find(u => u.traits && u.traits.includes('boss'));
        if (_boss && _boss.alive) {
            const _max = (_boss.baseStats && _boss.baseStats.wounds) || _boss.stats.wounds || 1;
            const _frac = Math.max(0, Math.min(1, _boss.currentWounds / _max));
            _bb.classList.remove('hidden'); if (_bb.dataset.boss !== _boss.uid) { _bb.dataset.boss = _boss.uid; _bb.classList.remove('bossbar-in'); void _bb.offsetWidth; _bb.classList.add('bossbar-in'); }
            const _bn = _bb.querySelector('.bossbar-name'); if (_bn) _bn.textContent = (_boss.name || q.meta.get(_boss.id).name_ko || '보스') + (_boss.traits.includes('terror') ? ' · 공포' : '') + ((_boss.bossPhase||1)>1 ? ' · ' + _boss.bossPhase + '단계' : '') + (_boss._enraged ? ' · 격노' : ''); _bb.classList.toggle('enraged', !!_boss._enraged);
            const _bf = _bb.querySelector('.bossbar-fill'); if (_bf) { _bf.style.width = (_frac * 100).toFixed(1) + '%'; _bf.style.background = _frac > .5 ? 'linear-gradient(90deg,#7e1d12,#c63d1e)' : _frac > .25 ? 'linear-gradient(90deg,#8a3a10,#d97a20)' : 'linear-gradient(90deg,#a85a10,#e0a020)'; }
            const _bh = _bb.querySelector('.bossbar-hp'); if (_bh) _bh.textContent = _boss.currentWounds + ' / ' + _max;
        } else _bb.classList.add('hidden');
    } }
    { const _wf = ut('wx-fx'), _mod = (q.current && q.current.modifier) || ''; _wf && (_wf.className = ['rain', 'dark', 'fog', 'snow', 'eclipse', 'gale', 'frost', 'mud'].includes(_mod) ? 'wx-' + _mod : ''); }
    ut('wave').textContent=String(phase==='preparation'?q.wave+1:q.wave||1).padStart(2,'0');
    const rules={defense:`라운드 끝 · 구역에 적 ${q.breachCount}기면 패배`,annihilation:'남은 적을 모두 격파',hold:`거점 우세 ${q.capture||0}/3 라운드`,survive:`생존 ${q.round||0}/5 라운드`,breakthrough:'아군 2기를 남쪽 돌파선으로',rescue:q.rescued?`구출 후 생존 ${q.capture||0}/3`:'포로 구역 확보 후 3라운드 생존',commander:'보스를 처치하면 승리',escort:`보급 호송 — 남쪽 출구까지 호송${q.escortCart&&q.unit(q.escortCart)?.alive?` · 마차 ${Math.round(q.unit(q.escortCart).y)}/1180`:''} · 파괴 시 패배`};
    ut('ux-mission').innerHTML=`<em>${CX.missionNames[q.mission]||'원정 준비'}</em>${esc(rules[q.mission]||'병사를 선택해 전열을 정하세요')}`;
    const image=ut('dock-portrait');if(u){const src=Th(q.meta.get(u.id).file);if(image.getAttribute('src')!==src){image.dataset.full=Ut(q.meta.get(u.id).file);image.onerror=function(){this.onerror=null;this.src=this.dataset.full};image.src=src;}image.classList.remove('hidden')}else image.classList.add('hidden');
    ut('dock-eyebrow').textContent=phase==='preparation'?'전열 배치':At?'행동 처리 중':active?'선택 병사':busy?'상대의 차례':phase==='fight'?'근접전 판정':'원정대 지휘';
    ut('dock-name').textContent=u?shortName(u):phase==='fight'?(q.fightQueue.length?'교전 중인 전열':'다음 라운드 준비'):'병사를 선택하세요';
    ut('dock-status').textContent=u?(q.engaged(u)?'교전 중':u.acted?'행동 완료':phase==='preparation'?'배치':q.canAct(u)?'행동 가능':'대기'):phase==='fight'?'남은 교전 '+q.fightQueue.length:'원정 정비';
    const primary=ut('dock-primary');primary.classList.remove('confirm');
    if(phase==='preparation')primary.textContent='전투 시작 →';else if(phase==='fight')primary.textContent=q.fightQueue.length?'교전 해결 →':'라운드 종료';else primary.textContent=busy?'상대 행동 중 · '+q.alive(q.side).filter(function(u){return!u.acted}).length+'명':phase==='move'?'이동 종료':'사격 대기';
    primary.disabled=At||AUTO||busy||!['preparation','move','shoot','fight'].includes(phase)||(['move','shoot'].includes(phase)&&!active);
    if(At)primary.textContent='처리 중…';
    const key=q.round+'-'+phase+'-'+(active?.uid||'');if(waitConfirm===key&&!primary.disabled){primary.textContent='종료 확인 ✓';primary.classList.add('confirm')}
    const team=q.phase==='preparation'||q.mode==='ai'?q.alive('good'):q.alive(q.side);
    const signature=team.map(v=>[v.uid,v.id].join(':')).join('|');
    if(signature!==UX.rosterKey){UX.rosterKey=signature;ut('roster-strip').innerHTML=team.map(v=>`<button class="roster-unit tier-${heroGrade(v.id)}" type="button" data-unit="${v.uid}" aria-label="${esc(v.name)} 선택"><img src="${Ut(q.meta.get(v.id).file)}" alt=""></button>`).join('');
        ut('roster-strip').querySelectorAll('[data-unit]').forEach(btn=>btn.onclick=()=>{if(At||Qt)return;Zt(btn.dataset.unit);const v=q.unit(btn.dataset.unit);if(v?.alive){const p=screenAt(v.x,v.y);if(p.x<40||p.x>UX.width-40||p.y<48||p.y>UX.height-48)panTo(v.x,v.y,UX.cameraMode==='overview'?.78:UX.zoom,280)}});
    }
    for(const btn of ut('roster-strip').children){const v=q.unit(btn.dataset.unit);const spent=v.acted&&['move','shoot'].includes(phase);btn.classList.toggle('is-active',v.uid===active?.uid);btn.classList.toggle('is-selected',v.uid===q.selected);btn.classList.toggle('is-spent',spent);btn.style.setProperty('--hp',String(Math.max(0,Math.min(1,v.currentWounds/Math.max(1,v.stats.wounds)))));btn.setAttribute('aria-pressed',String(v.uid===q.selected));btn.title=v.name+' · '+(v.uid===active?.uid?'현재 행동':spent?'행동 완료':'선택');btn.disabled=At;}
    ut('next-unit').disabled=At||AUTO||q.mode==='ai'&&q.side==='evil'||!['preparation','move','shoot'].includes(phase);
    ut('hint').textContent=touchLayout()?'병사 탭 → 목적지 탭 · 한 손가락: 시점 이동 · 두 손가락: 확대 / 축소':'병사 클릭 → 목적지 클릭 · 빈 땅 드래그: 시점 이동 · 휠: 확대 · Q/E: 방향 전환';
    updateWorldUI();
}
const clarityRender=Yt;
Yt=function(){const u=q.unit(q.selected);if(u&&!u.alive){q.selected='';q.autoSelect();}clarityRender();renderDock();};
// Keep the existing wait confirmation, but surface it on the persistent button.
ut('dock-primary').onclick=()=>{if(At||Qt||ut('dock-primary').disabled)return;if(['preparation','fight'].includes(q.phase)){setSheet(false);ut('action').click();return;}const u=actionableUnit();if(u){q.selected=u.uid;ut('wait').click();renderDock();}};
// Ensure the fixed controls cannot issue a second action while animation is running.
Rt=async function(fn){if(At)return;wt.unlock();clearTimeout(Jt);At=true;Tt.busy=true;resetGestures();renderDock();try{fn();renderDock();const events=q.drain();ut('action').disabled=true;ut('wait').disabled=true;for(const event of events){await $e(event);ut('dice').classList.add('hidden');await Tt.play(event);if(['WaveStarted','Event','CommandUsed'].includes(event.type)&&event.message)Xt(event.message);if(event.type==='WaveStarted')(event.boss?bossIntro(event.boss):stageIntro());}}catch(error){console.error('[battle action]',error);try{localStorage.setItem('__dbgstart',String(error&&error.stack||error).slice(0,1200))}catch(e){}Xt('행동을 처리하지 못했습니다 — '+String(error&&error.message||error).slice(0,90))}finally{ut('dice').classList.add('hidden');At=false;Tt.busy=false;Tt.preview=undefined;Tt.previewPlan=null;Yt();me();}};
const clarityPlay=Ve.prototype.play;
Ve.prototype.play=async function(event){await clarityPlay.call(this,event);if(event.type==='UnitKilled')removeCasualty(event.uid);};
const claritySchedule=me;me=function(){if(document.hidden){clearTimeout(Jt);return;}claritySchedule();};
// Switching units no longer schedules a late re-selection behind a later turn.
Zt=function(uid){const u=q.unit(uid);if(!u?.alive||At||Qt)return;if(q.phase==='move'&&q.activeMoverUid&&uid!==q.activeMoverUid){if(u.side===q.side)Rt(()=>{q.wait(q.activeMoverUid);q.selected=uid});else Xt('이동 중인 병사의 이동을 먼저 종료하세요.');return;}if(q.phase==='fight'){const gi=q.fightQueue.findIndex(g=>g.includes(uid));if(gi>0){q.fightQueue.unshift(q.fightQueue.splice(gi,1)[0]);Xt('우선권 — 그 교전부터 해결합니다.');}}Tt.preview=undefined;Tt.previewPlan=null;Tt.chargeTarget=null;q.selected=uid;wt.play('ui_select');Yt();};
const helpHandler=ut('help').onclick;ut('help').onclick=()=>{setSheet(false);helpHandler();const entries=ut('overlay').querySelectorAll('.help-list p');if(entries[5])entries[5].innerHTML='<b>모바일 조작 · 상태 표시</b><br>병사 탭 → 목적지 탭. 한 손가락 드래그는 카메라 이동, 두 손가락은 확대·축소입니다. 드래그 후 놓아도 이동 명령은 나가지 않습니다. 금색 고리와 화살표는 현재 행동 병사, 회색 병사는 현재 단계의 행동 완료입니다. 전사자는 전장에서 사라집니다. 하단 명령에서 능력과 상세 수치를 확인하세요.';};
document.addEventListener('keydown',e=>{if(e.key==='Escape'){setSheet(false);document.querySelector('.top-actions').classList.remove('open');ut('settings-toggle').setAttribute('aria-expanded','false');if(Qt)ut('close-help')?.click();}});
window.MESBG.ui={version:UX.version,state:UX,resize:()=>resizeBattle(true),worldToScreen:screenAt,screenToWorld:worldAt,focus:()=>Tt.focus(),setCamera,active:()=>actionableUnit()?.uid||'',openSheet:setSheet,update:()=>Yt()};

/* v1.4: portrait commands, reversible recruitment and a data-driven unit registry. */
const UNIT_RULES = { version: 1, worldPerMm: 76/25, chargeTolerance: 10,
    pointsNote: '원정 밸런스용 자체 포인트. 공식 MESBG 포인트가 아님.' };
function estimatePoints(p) {
    const traits=p.traits||[];
    const value=8+Math.max(0,p.fight-3)*4+Math.max(0,p.strength-3)*5+Math.max(0,p.defence-4)*3
        +Math.max(0,p.attacks-1)*18+Math.max(0,p.wounds-1)*22+Math.max(0,p.courage-3)*2
        +(p.might||0)*6+(p.will||0)*3+(p.fate||0)*5+(p.shootRange?8+Math.max(0,4-p.shootValue)*4:0)
        +(traits.includes('mounted')?18:0)+(traits.includes('flying')?25:0)+(traits.includes('terror')?15:0)
        +(traits.includes('spear')?3:0)+Math.max(0,p.move-270)/45*2;
    return Math.max(5,Math.round(value/5)*5);
}
const UnitCatalog={};
for(const [id,meta] of q.meta){if(!zt[id]||meta.side==='terrain')continue;
    const profile=structuredClone(zt[id]),points=estimatePoints(profile);
    if(id==='cave_troll')meta.baseMm=60; // units.json physical footprint, independent of token art size
    meta.baseMm=meta.baseMm||(id==='morgoth'?132*2/UNIT_RULES.worldPerMm:($t[meta.base]||38)*2/UNIT_RULES.worldPerMm);if(profile.traits.includes('mounted'))meta.baseMm=Math.max(meta.baseMm,40);
    UnitCatalog[id]={id,enabled:true,meta:structuredClone(meta),profile,points,
        recruitCost:Math.max(30,Math.round(points*.8/5)*5),rarity:heroGrade(id,points,meta.role),
        unlockWave:profile.traits.includes('hero')?2:0,uniqueKey:profile.traits.includes('hero')?id.replace(/(_(foot_mace|mounted_sheet|mounted|foot|fellbeast|dismounted|sheet))+$/,''):null,
        recruitable:CX.recruits.includes(id),skill:CX.skills[id]||null};
}
P.price=function(id){return UnitCatalog[id]?.recruitCost??30;};
P.ownedUniqueKeys=function(){
    const owned=new Set(this.permanent().concat(this.alive('good')).map(u=>UnitCatalog[u.id]?.uniqueKey).filter(Boolean));
    for(const f of (this.fallen||[])){const k=UnitCatalog[f.id]?.uniqueKey;if(k)owned.add(k);}
    return owned;
};
P.sanitizeRecruitOffers=function(){
    const owned=this.ownedUniqueKeys();
    for(const o of (this.recruitOffers||[])){const k=UnitCatalog[o.id]?.uniqueKey;if(k&&owned.has(k))o.bought=true;}
    this.recruitDraft=(this.recruitDraft||[]).filter(i=>this.recruitOffers?.[i]&&!this.recruitOffers[i].bought);
};
const FACTION_BY_MAP={minas_tirith:['gondor','minastirith'],osgiliath:['gondor','minastirith'],pelennor:['gondor','minastirith'],amon_sul:['arnor','bree'],helms_deep:['rohan'],edoras:['rohan'],dunharrow:['rohan'],fangorn:['rohan','elf'],moria:['dwarf','erebor'],erebor:['dwarf','erebor'],isengard:['rohan','gondor'],black_gate:['gondor','numenor'],gorgoroth:['gondor','numenor'],rivendell:['rivendell','elf'],lothlorien:['lothlorien','elf'],dead_marshes:['gondor','arnor']};
P.rollRecruits=function(){
    this.recruitDraft=[];
    const isH=d=>(d.profile.traits||[]).includes('hero')||d.meta.role==='hero';
    // 영웅은 유니크 — 전사한 영웅도 영입 후보에서 제외 (발라의 은총 부활로만 복귀)
    const owned=this.ownedUniqueKeys();
    const base=Object.values(UnitCatalog).filter(d=>d.enabled&&this.meta.has(d.id)&&(d.meta.side==='good'||this.relics.darkpact&&d.meta.side==='evil'));
    // 지역 파벌 가중치 — 그 땅의 군대가 영입 후보에 우선 등장 (로한 땅엔 로한군 등)
    const _facs=(FACTION_BY_MAP[CX.maps[visualMapIdx(this.mapIndex)]]||[]);
    const _isfac=d=>_facs.includes(d.meta.faction);
    const heroPool=base.filter(d=>isH(d)&&this.wave>=(d.unlockWave||0)&&!owned.has(d.uniqueKey||d.id)&&(!SILMARIL_HEROES.has(d.uniqueKey||d.id)||this.rank("silmaril"))).map(d=>({id:d.id,r:this.rng()})).sort((a,b)=>a.r-b.r);
    const heroes=heroPool.filter(d=>_isfac(UnitCatalog[d.id])).slice(0,1).concat(heroPool.filter(d=>!_isfac(UnitCatalog[d.id]))).slice(0,2);
    const candidates=base.filter(d=>d.recruitable&&!isH(d)).map(d=>({id:d.id,r:this.rng(),fac:_isfac(d),role:d.profile.traits.includes('mounted')?'cavalry':d.profile.shootRange?'archer':d.profile.traits.includes('spear')?'support':'infantry'})).sort((a,b)=>(b.fac-a.fac)||(a.r-b.r));
    const troops=[];
    for(const role of ['infantry','support','archer','cavalry']){const d=candidates.find(d=>d.role===role&&d.fac)||candidates.find(d=>d.role===role);if(d)troops.push(d);}
    for(const d of candidates)if(troops.length<4&&!troops.includes(d))troops.push(d);
    this.recruitOffers=[...heroes,...troops].map(d=>({id:d.id,bought:false}));
};
const SILMARIL_HEROES=new Set("fingolfin feanor turgon fingon ecthelion maedhros finrod_felagund celegorm tuor hurin_thalion thingol tom_bombadil goldberry luthien beren turin beleg huan gil_galad cirdan glorfindel mablung_sindar daeron melian maglor gwindor celebrimbor huor barahir azaghal elendil isildur elendur arpharazon earendil maeglin eol galdor anarion".split(" "));
// Explicit registration happens before Phaser preload, so missing art can never silently enter recruitment.
const customSkills=new Map();
function registerUnit(def){
    if(UX.ready)throw Error('registerUnit must run before game preload; edit data/unit-catalog.json and rebuild.');
    if(!def?.id||!def.meta||!def.profile||!['good','evil'].includes(def.meta.side))throw Error('Unit needs id, metadata, side and profile');
    if(!__assetOk(def.meta.file))throw Error('Missing unit art: '+def.meta.file);
    const p={...structuredClone(Ft),...structuredClone(def.profile)};
    if(!Array.isArray(p.traits)||!['move','fight','strength','defence','attacks','wounds','courage','shootValue','shootRange','might','will','fate'].every(k=>Number.isFinite(p[k])&&p[k]>=0)||p.wounds<1||p.attacks<1)throw Error('Invalid unit profile: '+def.id);
    if(!Number.isFinite(def.meta.baseMm)||def.meta.baseMm<=0)throw Error('Explicit physical baseMm required: '+def.id);
    if(def.skill&&!customSkills.has(def.id))throw Error('A new skill requires a registered handler: '+def.id);
    const points=def.points??estimatePoints(p),cost=def.recruitCost??Math.max(30,Math.round(points*.8/5)*5);
    if(!Number.isInteger(points)||points<=0||!Number.isInteger(cost)||cost<0)throw Error('Invalid points/cost');
    const meta={...def.meta,id:def.id};if(p.traits.includes('mounted'))meta.baseMm=Math.max(meta.baseMm||0,40);
    zt[def.id]=p;q.meta.set(def.id,meta);
    UnitCatalog[def.id]={...def,meta,profile:p,points,recruitCost:cost,enabled:def.enabled!==false,rarity:isHeroUnit(def.id,def.meta.role)?heroGrade(def.id,points,'hero'):(def.rarity||'normal'),unlockWave:def.unlockWave??2};
    UnitCatalog[def.id].uniqueKey=def.uniqueKey??(p.traits.includes('hero')?def.id.replace(/(_(foot_mace|mounted_sheet|mounted|foot|fellbeast|dismounted|sheet))+$/,''):null);
    if(def.skill){const k=def.skill;CX.skills[def.id]=[k.name,k.resource,k.cost,k.description];}
    if(def.recruitable&&!CX.recruits.includes(def.id))CX.recruits.push(def.id);
    return UnitCatalog[def.id];
}
const catalogSpawn=P.spawn;
P.spawn=function(id,side,pos){const u=catalogSpawn.call(this,id,side,pos),d=UnitCatalog[id];if(d){u.points=d.points;u.radius=(d.meta.baseMm||25)*UNIT_RULES.worldPerMm/2;u.visualRadius=d.meta.visualRadius||u.visualRadius;u.artScale=d.meta.artScale||1;}return u;};
const catalogSkill=P.skill;
P.skill=function(uid){const u=this.unit(uid),handler=u&&customSkills.get(u.id);if(!handler)return catalogSkill.call(this,uid);if(!u.alive||this.skillReason(u))return false;
    const [name,resource,cost]=CX.skills[u.id];u.resources[resource]-=cost;u.skillRound=true;handler({battle:this,unit:u});this.emit('HeroSkill',u.name+' · '+name,{uid});return true;};
const catalogResume=P.resume;
P.resume=function(){if(!catalogResume.call(this))return false;for(const u of this.units){const d=UnitCatalog[u.id];if(d){u.points=d.points;u.radius=(d.meta.baseMm||25)*UNIT_RULES.worldPerMm/2;}}this.sanitizeRecruitOffers();return true;};
P.toggleRecruit=function(index){
    if(this.phase!=='reward'||this.campStep!=='recruit')return false;
    const o=this.recruitOffers[index];if(!o||o.bought)return false;
    this.recruitDraft=this.recruitDraft||[];const at=this.recruitDraft.indexOf(index);
    if(at>=0){this.recruitDraft.splice(at,1);this.save();return true;}
    const cost=this.recruitDraft.reduce((n,i)=>n+this.price(this.recruitOffers[i].id),0)+this.price(o.id);
    if(cost>this.gold||this.permanent().length+this.recruitDraft.length>=this.capacity())return false;
    const unique=UnitCatalog[o.id]?.uniqueKey;
    if(unique&&this.recruitDraft.some(i=>UnitCatalog[this.recruitOffers[i].id]?.uniqueKey===unique))return false;
    if(this.initialDraft&&zt[o.id]&&(zt[o.id].traits.includes('hero')||UnitCatalog[o.id]&&UnitCatalog[o.id].meta.role==='hero')&&this.recruitDraft.some(i=>zt[this.recruitOffers[i].id]&&(zt[this.recruitOffers[i].id].traits.includes('hero')||UnitCatalog[this.recruitOffers[i].id]&&UnitCatalog[this.recruitOffers[i].id].meta.role==='hero')))return false;
    this.recruitDraft.push(index);this.save();return true;
};
P.commitRecruits=function(){
    if(this.phase!=='reward'||this.campStep!=='recruit')return false;
    const chosen=[...new Set(this.recruitDraft||[])];if(this.initialDraft&&!chosen.length)return false;
    if(chosen.some(i=>!this.recruitOffers[i]||this.recruitOffers[i].bought))return false;
    const total=chosen.reduce((n,i)=>n+this.price(this.recruitOffers[i].id),0);
    if(total>this.gold||this.permanent().length+chosen.length>this.capacity())return false;
    const snapshot={units:structuredClone(this.units),counter:this.counter,gold:this.gold,offers:structuredClone(this.recruitOffers)};
    for(const i of chosen){const offer=this.recruitOffers[i],u=this.spawn(offer.id,'good',{x:-1000,y:-1000});
        if(!this.placeInDeployment(u)){this.units=snapshot.units;this.counter=snapshot.counter;this.gold=snapshot.gold;this.recruitOffers=snapshot.offers;return false;}
        offer.bought=true;
    }
    this.gold-=total;this.recruitDraft=[];
    if(this.initialDraft){this.initialDraft=false;this.phase='preparation';this.campStep='';this.selected=this.alive('good')[0]?.uid||'';this.emit('Preparation','원정대가 결성됐습니다. 병사를 선택해 전열을 정하세요.');}
    else this.campStep='relic';
    this.save();return true;
};
P.mountVariant=function(u){
    if(!u||!u.alive||u.side!=='good'||u.traits.includes('mounted'))return null;
    const d=UnitCatalog[u.id];if(!d||!d.uniqueKey||!isHeroUnit(u.id))return null;
    const cands=Object.values(UnitCatalog).filter(m=>m.id!==u.id&&m.uniqueKey===d.uniqueKey&&m.profile.traits.includes('mounted'));
    return cands.find(m=>m.id===u.id+'_mounted')||cands.find(m=>m.id.startsWith(u.id))||cands[0]||null;
};
P.mountCost=function(u){const v=this.mountVariant(u);if(!v)return 0;const d=UnitCatalog[u.id];return Math.max(30,Math.round(((v.points||60)-(d.points||50))*.6/5)*5);};
P.buyHorse=function(){
    if(this.phase!=='reward'||this.campStep!=='recruit')return false;
    const cost=40;if(this.gold<cost)return false;
    this.gold-=cost;this.horses=(this.horses||0)+1;
    this.emit('Camp','군마를 구입했습니다 — 기마를 줄 도보 영웅을 지정하세요.');
    this.save();return true;
};
P.applyMount=function(u,v){
    u.id=v.id;u.name=v.meta.name_ko;u.baseStats=structuredClone(zt[v.id]);u.stats=structuredClone(zt[v.id]);
    u.traits=[...new Set([...u.traits.filter(t=>t!=='dismounted'&&t!=='mounted'),...v.profile.traits])];
    u.radius=(v.meta.baseMm||50)*UNIT_RULES.worldPerMm/2;
    u.currentWounds=Math.min(u.currentWounds,u.stats.wounds);
    this.refreshUnit(u);
};
P.mountOptions=function(u){
    const v=this.mountVariant(u);
    if(!v)return[];
    const opts=[v];
    if(UnitCatalog[u.id]?.uniqueKey==='witchking'&&UnitCatalog.witchking_fellbeast&&!opts.some(m=>m.id==='witchking_fellbeast'))opts.push(UnitCatalog.witchking_fellbeast);
    return opts;
};
P.specialMountCost=function(u,v){const d=UnitCatalog[u.id];return Math.max(60,Math.round((((v.points||150)-(d&&d.points||60))*.5)/5)*5);};
P.buySpecialMount=function(uid,vid){
    if(this.phase!=='reward'||this.campStep!=='recruit')return false;
    const u=this.unit(uid),v=UnitCatalog[vid];
    if(!u||!v||u.side!=='good'||u.traits.includes('mounted')||u.traits.includes('flying')||v.profile.traits.includes('mounted'))return false;
    const cost=this.specialMountCost(u,v);if(this.gold<cost)return false;
    this.gold-=cost;
    this.applyMount(u,v);
    this.emit('Camp',`${v.meta.name_ko} — ${u.name}의 탈것이 됐습니다.`);
    this.save();return true;
};
P.assignMount=function(uid,vid){
    if(this.phase!=='reward'||this.campStep!=='recruit')return false;
    if(!(this.horses>0))return false;
    const u=this.unit(uid),v=(vid&&UnitCatalog[vid])||(u&&this.mountVariant(u));if(!u||!v)return false;
    this.horses--;
    this.applyMount(u,v);
    this.emit('Camp',`${v.meta.name_ko} — 군마에 올랐습니다. 이동력과 돌격이 강해집니다.`);
    this.save();return true;
};
if(!document.getElementById('tier-css')){const _st=document.createElement('style');_st.id='tier-css';_st.textContent='.recruit-card.tier-legendary{background:linear-gradient(145deg,#342d22,#172b34 66%,#302719)!important;border:2px solid #e1bb6c!important;box-shadow:inset 0 0 0 1px #ffdc864d,0 0 17px #e9b7544d!important}.recruit-card.tier-legendary:before{content:"✦";position:absolute;right:9px;top:5px;color:#ffdd8e;font-size:21px;text-shadow:0 0 12px #f3b249}.recruit-card.tier-legendary .recruit-grade{color:#ffda88}.recruit-card.tier-epic{background:linear-gradient(145deg,#29233c,#1b2e35)!important;border:2px solid #bd9cdb!important;box-shadow:inset 0 0 0 1px #d9bdf44d!important}.recruit-card.tier-epic .recruit-grade{color:#e0c5ff}.recruit-card.tier-rare{background:#243140!important;border:1px solid #81a8d0!important}.recruit-card.tier-rare .recruit-grade{color:#b6d6f4}.recruit-card.tier-elite{background:#263330!important;border:1px solid #9aad88!important}.recruit-card.tier-elite .recruit-grade{color:#bdd8a9}.recruit-card.tier-normal{border:1px solid #747c74!important}.recruit-card.tier-normal .recruit-grade{color:#d0d4c8}';document.head.appendChild(_st);}
function setProgressLine(){
    const rows=q.relicSets().filter(s=>s.count>0);
    if(!rows.length)return'';
    return `<p class="bond-line" style="font-size:10px;color:#aeb99a;margin:0 0 8px">유물 세트 — `+rows.map(s=>`<span style="${s.active?'color:#e6d9a8':''}" title="${s.desc}">${s.family} ${s.count}/${s.need}${s.active?' ✦':''}</span>`).join(' · ')+`</p>`;
}
function bondHint(){
    const counts=q.factionCounts?q.factionCounts():{},live=(q.factionBonds?q.factionBonds():[]).map(b=>b.faction);
    const rows=Object.entries(counts).filter(([,n])=>n>=2).sort((a,b)=>b[1]-a[1]).slice(0,4);
    if(!rows.length)return'';
    return `<p class="bond-line" style="font-size:10px;color:#aeb99a;margin:0 0 8px">세력 결속(4기) — `+rows.map(([f,n])=>{const on=live.includes(f);return `<span style="${on?'color:#e6d9a8':''}">${FACTION_KO[f]||f} ×${n}${on?' ✦':''}</span>`;}).join(' · ')+`</p>`;
}
function renderRecruitDraft(){
    q.sanitizeRecruitOffers();
    const selected=q.recruitDraft||[],sum=selected.reduce((n,i)=>n+q.price(q.recruitOffers[i].id),0),capacity=q.capacity()-q.permanent().length-selected.length;
    const box=ut('overlay');
    box.innerHTML=`<div class="modal camp"><div class="eyebrow">${q.initialDraft ? '출정 · 원정대 편성' : 'STAGE ' + q.wave + ' · 원정대 정비'}</div><h2>${q.initialDraft ? '원정대 편성' : '동료 영입'}</h2><p class="recruit-summary">보유 <b>${q.gold}</b> · 선택 비용 <b>${sum}</b> · 남은 금화 <b>${q.gold-sum}</b><br>선택 ${selected.length}명 · 남은 정원 ${capacity}명</p>${bondHint()}${q.initialDraft?'<p class="draft-help">영웅 최대 1기 · 600 금화</p>':''}<div class="recruit-cards">${(q.recruitOffers||[]).map((o,i)=>{const d=UnitCatalog[o.id]||{rarity:'normal'},m=q.meta.get(o.id)||{},p=zt[o.id]||{traits:[]},on=selected.includes(i),cost=q.price(o.id),disabled=o.bought||!on&&(cost>q.gold-sum||capacity<=0);return `<button type="button" class="recruit-card tier-${d.rarity} ${on?'is-picked':''}" data-draft="${i}" aria-pressed="${on}" ${disabled?'disabled':''}><span class="pick-mark">${on?'선택됨':'영입 후보'}</span>${q.meta.get(o.id)?unitImage(o.id):''}<span class="recruit-grade">${isHeroUnit(o.id)?tierLabel(o.id):({normal:'일반',elite:'정예',rare:'희귀',epic:'영웅급',legendary:'전설'})[d.rarity]||tierLabel(o.id)}</span><b>${esc(m.name_ko)}</b><small>${d.points} pt · ${CX.roleNames[m.role]||m.role}</small><p>Attack ${p.attacks} · Defense ${p.defence}<br>${esc(CX.skills[o.id]?.[0]||'전열')}</p><em>${o.bought?'합류 완료':cost+' 금화'}</em></button>`}).join('')}</div>${(()=>{const ms=q.alive('good').map(u=>({u,vs:q.mountOptions(u)})).filter(x=>x.vs.length);return ms.length||q.horses>0?'<div class="mount-head">군마 · 탈것</div><div class="mount-row" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:9px;margin-bottom:10px">'+`<button class="recruit-card mount-card" id="mount-buy" ${q.gold<40?'disabled':''}><b>군마 구입</b><small>보유 ${q.horses||0}필</small><p>이동력 · 기병 돌격</p><em>40 금화</em></button>`+ms.map(({u,vs})=>vs.map(v=>v.profile.traits.includes('mounted')?`<button class="recruit-card mount-card" data-mount="${u.uid}|${v.id}" ${q.horses>0?'':'disabled'}>${unitImage(v.id)}<b>기마 지정 · ${esc(v.meta.name_ko)}</b><small>${esc(u.name)}</small><p>이동 ${u.stats.move}→${v.profile.move} · 기병 특성</p><em>군마 1필 소비</em></button>`:`<button class="recruit-card mount-card" data-buymount="${u.uid}|${v.id}" ${q.gold>=q.specialMountCost(u,v)?'':'disabled'}>${unitImage(v.id)}<b>탈것 고용 · ${esc(v.meta.name_ko)}</b><small>${esc(u.name)}</small><p>이동 ${u.stats.move}→${v.profile.move} · 비행</p><em>${q.specialMountCost(u,v)} 금화</em></button>`).join('')).join('')+'</div>':''})()}<div class="camp-secondary"><button id="draft-menu">← 메뉴</button><button id="draft-clear" ${selected.length?'':'disabled'}>선택 취소</button><button id="draft-reroll" ${q.gold<q.rerollCost()?'disabled':''}>후보 교체 · ${q.rerollCost()}</button><button id="draft-expand" ${q.gold<45+q.capacityBought*25||q.capacity()>=30?'disabled':''}>정원 +2 · ${45+q.capacityBought*25}</button></div><div class="camp-confirm"><span>${selected.length?selected.length+'명 · '+sum+' 금화':(q.initialDraft?'병사를 선택해 출정하세요':'영입 없이 금화 보관')}</span><button id="draft-confirm" class="primary" ${q.initialDraft&&!selected.length?'disabled':''}>${selected.length?'영입 확정':(q.initialDraft?'1명 이상 선택 후 출정':'영입 건너뛰기')} →</button></div></div>`;
    box.querySelectorAll('[data-draft]').forEach(el=>el.onclick=()=>{if(q.toggleRecruit(Number(el.dataset.draft)))wt.play('ui_select');Yt();});
    ut('draft-menu').onclick=()=>{if(window.confirm('편성을 그만두고 메인 메뉴로 나갈까요?')){q.save();q.phase='menu';Yt();}};ut('draft-clear').onclick=()=>{q.recruitDraft=[];q.save();Yt();};
    ut('draft-reroll').onclick=()=>{q.reroll();Yt();};ut('draft-expand').onclick=()=>{q.expand();Yt();};
    ut('draft-confirm').onclick=()=>{if(q.commitRecruits())wt.play('reward_select');else Xt('영입할 공간이 부족합니다. 선택을 조정하세요.');Yt();};
    box.querySelectorAll('[data-mount]').forEach(el=>el.onclick=()=>{const[uid,vid]=el.dataset.mount.split('|');if(q.assignMount(uid,vid))wt.play('reward_select');Yt();});
    box.querySelectorAll('[data-buymount]').forEach(el=>el.onclick=()=>{const[uid,vid]=el.dataset.buymount.split('|');if(q.buySpecialMount(uid,vid))wt.play('reward_select');Yt();});
    const mb=ut('mount-buy');if(mb)mb.onclick=()=>{if(q.buyHorse())wt.play('reward_select');Yt();};
}

// One shared, collision-safe contact solver for AI, preview and committed charge.
const exactPlan=ve;
let chargeCache=new Map();
function chargePlan(u,target,units,terrain,budget){
    if(!u?.alive||!target?.alive||u.side===target.side||ht(u,target)>budget+u.radius+target.radius+UNIT_RULES.chargeTolerance)return null;
    const key=[u.uid,target.uid,budget,...units.filter(v=>v.alive).map(v=>`${v.uid}:${v.x},${v.y},${v.radius}`),...terrain.map(t=>`${t.id}:${t.active}:${t.x},${t.y}`)].join('|');
    if(chargeCache.has(key))return chargeCache.get(key);
    const limit=budget+UNIT_RULES.chargeTolerance,angle=Math.atan2(u.y-target.y,u.x-target.x),radius=u.radius+target.radius+.6;
    const candidates=Array.from({length:48},(_,i)=>{const a=angle+(i%2?1:-1)*Math.ceil(i/2)*Math.PI/24;return{x:target.x+Math.cos(a)*radius,y:target.y+Math.sin(a)*radius};})
        .filter(p=>ht(u,p)<=limit&&Et(u,p,units,terrain)).sort((a,b)=>ht(u,a)-ht(u,b));
    let found=null;
    for(const p of candidates){if(bt(u,p,units,terrain)){found={to:p,path:[{x:u.x,y:u.y},p],distance:ht(u,p),snapped:true,yields:[]};break;}}
    if(!found)for(const p of candidates.slice(0,8)){const plan=exactPlan(u,p,units,terrain,limit,{snap:false,chargeTarget:target});if(plan&&(!found||plan.distance<found.distance))found=plan;}
    if(chargeCache.size>100)chargeCache.clear();chargeCache.set(key,found);return found;
}
ve=function(u,to,units,terrain,budget=u.stats.move,options={}){return options.chargeTarget?chargePlan(u,options.chargeTarget,units,terrain,budget):exactPlan(u,to,units,terrain,budget,options);};
P.charge=function(uid,targetId){const u=this.unit(uid),v=this.unit(targetId);if(this.phase!=='move'||!u||!this.canAct(u)||this.engaged(u))return false;const p=chargePlan(u,v,this.alive(),this.terrain,this.remaining(u));return p?this.move(uid,p.to,targetId):false;};

// A tap chooses a destination; the persistent action button commits it.
UX.intent=null;
function clearIntent(){UX.intent=null;Tt.preview=undefined;Tt.previewPlan=null;Tt.chargeTarget=null;ut('intent-cancel')?.classList.add('hidden');}
function setIntent(intent){UX.intent=intent;renderDock();Tt.drawRings();}
function planIntent(point,foe){const u=actionableUnit();if(!u||At||AUTO)return;
    if(q.phase==='preparation'){const p=Be(u,point,q.alive(),q.terrain,95,v=>v.y>=285&&v.y<=pt.deployY);if(!p){Xt('배치 구역의 빈 곳을 선택하세요.');return;}setIntent({kind:'deploy',uid:u.uid,to:p});return;}
    if(q.phase==='move'){const plan=foe?chargePlan(u,foe,q.alive(),q.terrain,q.remaining(u)):ve(u,point,q.alive(),q.terrain,q.remaining(u));
        if(!plan){clearIntent();renderDock();Xt(foe?'돌격 경로가 막혀 있거나 이동력이 부족합니다.':'이동 가능한 착지점을 선택하세요.');Tt.drawRings();return;}
        setIntent({kind:foe?'charge':'move',uid:u.uid,target:foe?.uid,to:plan.to,plan});return;}
    if(q.phase==='shoot'&&foe){if(!q.validTargets(u).includes(foe)){Xt('사거리 또는 사선을 확인하세요.');return;}setIntent({kind:'shoot',uid:u.uid,target:foe.uid,to:{x:foe.x,y:foe.y}});}
}
const directUnit=Tt.onUnit;
Tt.onPoint=p=>planIntent(p);
Tt.onUnit=uid=>{const v=q.unit(uid),u=actionableUnit();if(u&&v&&v.side!==u.side&&['move','shoot'].includes(q.phase))planIntent(v,v);else{clearIntent();directUnit(uid);}};
Zt=function(uid){const u=q.unit(uid);if(!u?.alive||At||Qt||AUTO)return;
    if(q.phase==='move'&&q.activeMoverUid&&uid!==q.activeMoverUid){if(u.side===q.side)setIntent({kind:'switch',uid:q.activeMoverUid,target:uid});else Xt('현재 병사의 이동을 먼저 종료하세요.');return;}
    clearIntent();q.selected=uid;wt.play('ui_select');Yt();};
ut('dock-primary').insertAdjacentHTML('beforebegin','<button type="button" id="intent-cancel" class="hidden" aria-label="명령 취소">취소</button>');
ut('intent-cancel').onclick=()=>{clearIntent();renderDock();Tt.drawRings();};
const baseDock=renderDock;
renderDock=function(){baseDock();renderUnitVitals();const p=UX.intent,b=ut('dock-primary');ut('intent-cancel').classList.toggle('hidden',!p);
    if(p&&!At){b.disabled=false;b.classList.add('confirm');b.textContent=({move:'이동 확정',charge:'돌격 확정',shoot:'사격 확정',deploy:'배치 확정',switch:'병사 변경',skill:'능력 확정',heroic:'능력 확정',spell:'주문 확정'})[p.kind];ut('dock-status').textContent=(p.detail?p.label+' · '+p.detail:'')||(p.kind==='switch'?'남은 이동 종료':p.plan?(p.plan.distance/45).toFixed(1)+'″ · 잔여 '+Math.max(0,(q.remaining(q.unit(p.uid))-p.plan.distance)/45).toFixed(1)+'″':p.kind==='shoot'?'대상 · '+q.unit(p.target).name:'배치 지점 선택');}
    ut('hint').textContent=touchLayout()?'병사 → 목적지 → 확정 · 드래그: 화면 이동 · 두 손가락: 확대':'클릭 이동 · 드래그 시점 이동 · 휠 확대';
};
const defaultPrimary=ut('dock-primary').onclick;
ut('dock-primary').onclick=()=>{const p=UX.intent;if(!p){defaultPrimary();return;}if(At||Qt)return;clearIntent();setSheet(false);Rt(()=>{
    let ok=false;if(p.kind==='move')ok=q.move(p.uid,p.to);if(p.kind==='charge')ok=q.charge(p.uid,p.target);if(p.kind==='shoot')ok=q.shoot(p.uid,p.target);if(p.kind==='deploy'){ok=q.deploy(p.uid,p.to);if(ok){const _n=q.alive('good').find(u=>u.x<0);if(_n)q.selected=_n.uid;}}
    if(p.kind==='switch'){ok=q.wait(p.uid);if(ok)q.selected=p.target;}
    if(p.kind==='skill')ok=q.skill(p.uid);
    if(p.kind==='heroic')ok=q.heroic(p.uid,p.key);
    if(p.kind==='spell')ok=q.castSpell(p.uid,p.key);
    if(!ok)Xt('명령을 실행하지 못했습니다. 위치와 차례를 다시 확인하세요.');
});};
const actionBeforeV14=Rt;
Rt=async function(fn){if(At)return;clearIntent();if(mobileLayout())setSheet(false);return actionBeforeV14(fn);};
// The closest visible figure wins hit selection. No hero-priority stealing of taps.
Ve.prototype.hit=function(p){const min=touchLayout()?23/(UX.zoom||1):0;return this.b.alive().filter(u=>ht(p,u)<=Math.max(min,u.radius+7,(u.visualRadius||u.radius)*.85)).sort((a,b)=>ht(p,a)-ht(p,b))[0];};
const ringV14=Ve.prototype.drawRings;
Ve.prototype.drawRings=function(){const intent=UX.intent;if(intent){this.preview=intent.to;this.previewPlan=intent.plan||null;this.chargeTarget=intent.kind==='charge'?{u:q.unit(intent.target),plan:intent.plan}:null;}ringV14.call(this);
    if(intent?.kind==='deploy'&&this.rings){const r=q.unit(intent.uid).radius,g=this.rings,z=UX.zoom;g.fillStyle(0x58c9a5,.22);g.fillCircle(intent.to.x,intent.to.y,r);g.lineStyle(6/z,0x0b100d,.6);g.strokeCircle(intent.to.x,intent.to.y,r);g.lineStyle(2.6/z,0x9ff0cf,1);g.strokeCircle(intent.to.x,intent.to.y,r);}
    if(intent?.kind==='shoot'){const u=q.unit(intent.uid),v=q.unit(intent.target),g=this.rings,z=UX.zoom;g.lineStyle(7/z,0x0b100d,.6);g.lineBetween(u.x,u.y,v.x,v.y);g.lineStyle(10/z,0xff5f4a,.18);g.lineBetween(u.x,u.y,v.x,v.y);g.lineStyle(3/z,0xff8a6e,1);g.lineBetween(u.x,u.y,v.x,v.y);}
};
let uiPhase='',uiActive='';
const renderBeforeV14=Yt;
Yt=function(){const key=q.phase+'/'+q.campStep,modal=ut('overlay').querySelector('.modal'),scroll=key===uiPhase?(modal?.scrollTop||0):0,strip=ut('roster-strip').scrollLeft;
    if(key!==uiPhase){clearIntent();setSheet(false);closeRelicInfo();document.querySelector('.top-actions').classList.remove('open');ut('settings-toggle').setAttribute('aria-expanded','false');}
    renderBeforeV14();if(!Qt&&q.phase==='reward'&&q.campStep==='recruit')renderRecruitDraft();
    const nextModal=ut('overlay').querySelector('.modal');if(nextModal)nextModal.scrollTop=scroll;ut('roster-strip').scrollLeft=strip;
    const active=actionableUnit();if(UX.ready&&active&&active.uid!==uiActive&&!At&&!UX.gesture&&q.side==='good'){
        const pos=screenAt(active.x,active.y);if(pos.x<50||pos.x>UX.width-50||pos.y<80||pos.y>UX.height-72)panTo(active.x,active.y,UX.zoom,260);
        const btn=ut('roster-strip').querySelector(`[data-unit="${active.uid}"]`);if(btn){const left=btn.offsetLeft,stripEl=ut('roster-strip');if(left<stripEl.scrollLeft||left+btn.offsetWidth>stripEl.scrollLeft+stripEl.clientWidth)stripEl.scrollLeft=Math.max(0,left-stripEl.clientWidth/2+btn.offsetWidth/2);}}
    uiPhase=key;uiActive=active?.uid||'';renderDock();
};
const phaseHelp=ut('help').onclick;
ut('help').onclick=()=>{clearIntent();phaseHelp();const ps=ut('overlay').querySelectorAll('.help-list p');if(ps[0])ps[0].innerHTML='<b>이동과 명령</b><br>병사 선택 → 목적지 선택 → 하단 확정. 확정 전에는 취소하거나 다른 목적지를 선택할 수 있습니다. 한 손가락 드래그는 화면 이동, 두 손가락은 확대·축소입니다.';if(ps[3])ps[3].innerHTML='<b>동료 영입</b><br>카드를 탭해 선택하고 다시 탭해 취소합니다. 영입 확정을 눌러야 금화가 차감되고 합류합니다. 포인트는 이 게임의 원정 밸런스 수치입니다.';};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&UX.intent){clearIntent();renderDock();Tt.drawRings();}});

// Existing seven effect assets are routed by action and weapon, never by sprite silhouette.
function effectType(u,kind){if(kind==='shot')return'shoot';const w=q.meta.get(u.id)?.weapon||'';if(u.traits.includes('wizard')||w==='staff')return'cast';if(/spear|pike|lance/.test(w))return'thrust';if(/claw|bite|fang|talon|whip/.test(w)||u.traits.includes('beast'))return'pounce';if(/mace|hammer|club|axe|twohanded|drum|bomb/.test(w)||u.traits.includes('monster'))return'smash';return'slash';}
Ve.prototype.combat=async function(result){
    if(window._lwbFx)return;
    const cam=this.cameras&&this.cameras.main;
    if(this.textures&&!this.textures.exists('fx-spark')){const g0=this.add.graphics();g0.fillStyle(0xffffff,1);g0.fillCircle(4,4,3.4);g0.generateTexture('fx-spark',8,8);g0.destroy();}
    if(this.textures&&!this.textures.exists('fx-flash')){const f0=this.add.graphics();for(let r=30;r>0;r-=6)f0.fillStyle(0xffffff,.14+r/30*.5).fillCircle(32,32,r);f0.generateTexture('fx-flash',64,64);f0.destroy();}
    if(this.textures&&!this.textures.exists('fx-ring')){const r0=this.add.graphics();r0.lineStyle(7,0xffffff,.9);r0.strokeCircle(48,48,42);r0.generateTexture('fx-ring',96,96);r0.destroy();}
    if(this.textures)for(const n of['slash','thrust','smash','shoot','cast','pounce','rally','blood'])this.textures.get('fx-'+n).setFilter(Phaser.Textures.FilterMode.NEAREST);
    for(const K of result.trappedUnits||[]){const $=this.b.unit(K);if(!$)continue;const p=this.add.text($.x,$.y-$.radius-25,'포위 · 추가 타격',{fontFamily:'Pretendard',fontSize:'16px',color:'#ffdb9c',backgroundColor:'#5d241cee',padding:{x:8,y:5}}).setOrigin(.5).setDepth(20);this.time.delayedCall(1500,()=>p.destroy());}
    for(const K of result.knockedDownUnits||[]){const $=this.b.unit(K);if(!$)continue;const p=this.add.text($.x,$.y-$.radius-45,'기병 충격 · 넘어짐',{fontFamily:'Pretendard',fontSize:'17px',color:'#f9edba',backgroundColor:'#31504cf0',padding:{x:8,y:5}}).setOrigin(.5).setDepth(21);this.time.delayedCall(1400,()=>p.destroy());}
    const burst=(x,y,color,n,spd)=>{for(let i=0;i<n;i++){const a=Math.random()*6.2832,d=(16+Math.random()*34)*spd,p=this.add.image(x,y,'fx-spark').setDepth(15).setTint(color).setScale(.5+Math.random()*.9).setAlpha(.95);this.tween(p,{x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,alpha:0,scale:.08},200+Math.random()*160).then(()=>p.destroy());}};
    for(const hit of result.strikeResults.slice(0,qt>=20?2:12)){
        const u=this.b.unit(hit.attacker),v=this.b.unit(hit.target),ac=this.tokens.get(u?.uid),vc=this.tokens.get(v?.uid),sprite=ac?.getByName('token'),vsprite=vc?.getByName('token');
        if(!u||!v||!sprite)continue;
        const type=effectType(u,result.kind),angle=Math.atan2(v.y-u.y,v.x-u.x),size=Math.max(v.radius*3.1,90/UX.zoom);
        const heavy=type==='smash'||type==='cast'||!!u.traits.includes('monster')||!!u.traits.includes('boss');
        const fx=this.add.image(type==='shoot'?u.x:v.x,type==='shoot'?u.y:v.y,'fx-'+type).setDepth(14).setDisplaySize(size,size).setRotation(type==='smash'||type==='cast'?0:angle);

        const flash=this.add.image(v.x,v.y,'fx-flash').setDepth(15).setBlendMode(Phaser.BlendModes.ADD).setScale(hit.wound||hit.killed?v.radius*4/64:v.radius*2.4/64).setAlpha(hit.wound||hit.killed?.95:.55);
        this.tween(flash,{alpha:0,scale:flash.scaleX*.25},150).then(()=>flash.destroy());
        const ring=this.add.image(v.x,v.y,'fx-ring').setDepth(14).setTint(heavy?0xffd9a0:0xfff4dc).setScale(v.radius*1.4/96).setAlpha(.8);
        this.tween(ring,{scale:ring.scaleX*(hit.killed?3.4:2.4),alpha:0},hit.killed?340:230).then(()=>ring.destroy());
        this.soundFX.play(type==='shoot'?'arrow_release':hit.wound?'sword_flesh':'sword_shield');
        const sx=sprite.getData('baseSX')||sprite.scaleX,sy=sprite.getData('baseSY')||sprite.scaleY,duration=qt>=20?18:Math.max(160,300/qt),start=performance.now();
        const center=sprite.getData('cxy')||{x:0,y:0};
        const lunge=type==='shoot'?5:type==='thrust'?18:type==='pounce'?15:type==='cast'?-6:13;
        await new Promise(resolve=>{const frame=()=>{if(!fx.scene){resolve();return;}
            const t=Math.min(1,(performance.now()-start)/duration),sw=Math.sin(t*Math.PI);
            if(type==='shoot')fx.setPosition(u.x+(v.x-u.x)*t,u.y+(v.y-u.y)*t).setAlpha(1-t*.3);
            else if(type==='slash'){const bump=1+sw*.24;fx.setDisplaySize(size*bump,size*bump).setAlpha(sw).setRotation(angle-.65+t*1.05);}
            else if(type==='thrust'){const bump=1+sw*.18;fx.setDisplaySize(size*(bump+sw*.3),size*bump).setAlpha(sw);}
            else if(type==='pounce'){const bump=1+sw*.3;fx.setDisplaySize(size*bump,size*bump).setAlpha(sw).setRotation(angle-.4+t*.9).setPosition(v.x-Math.cos(angle+1.57)*10*t,v.y-Math.sin(angle+1.57)*10*t);}
            else if(type==='cast'){const bump=.7+t*.8;fx.setDisplaySize(size*bump,size*bump).setAlpha(sw).setPosition(v.x,v.y-14*t);}
            else{const bump=1.5-t*.5;fx.setDisplaySize(size*bump,size*bump).setAlpha(sw);}
            if(!UX.reduced&&type!=='cast')sprite.setPosition(center.x+Math.cos(angle)*sw*lunge,center.y+Math.sin(angle)*sw*lunge);
            if(t<1)requestAnimationFrame(frame);else resolve();};frame();});
        fx.destroy();sprite.setScale(sx,sy).setPosition(center.x,center.y);
        if(hit.wound||hit.killed){
            const bl=this.add.image(v.x,v.y,'fx-blood').setDepth(13).setRotation(Math.random()*6.28).setDisplaySize(v.radius*(hit.killed?3.4:2.3),v.radius*(hit.killed?3.4:2.3));
            this.tween(bl,{alpha:0},hit.killed?700:420).then(()=>bl.destroy());
            burst(v.x,v.y,hit.killed?0xd8452c:0xe8b090,UX.reduced?0:hit.killed?6:3,1);
            if(vsprite){vsprite.setTintFill(0xd8452c);this.time.delayedCall(130,()=>vsprite.scene&&vsprite.clearTint());}
        }else if(!UX.reduced)burst(v.x,v.y,0xffdca0,2,.6);
        if(!UX.reduced&&heavy&&hit.wound)cam&&cam.shake(55,.0012);
        if(hit.killed&&vsprite)await this.tween(vsprite,{angle:vsprite.angle+78,alpha:.25,y:vsprite.y+7},230);
        const label=this.add.text(v.x,v.y-v.radius-15,hit.prevented||(hit.wound?'−1':'Defense'),{fontFamily:'Pretendard',fontSize:'15px',color:hit.wound?'#ffc4ab':'#e8dfc5',stroke:'#141a17',strokeThickness:3}).setOrigin(.5).setResolution(UX.dpr).setScale(1/UX.zoom).setDepth(15);
        this.tween(label,{y:label.y-24,alpha:0},480).then(()=>label.destroy());if(hit.killed)vc&&vc.setVisible(false);
    }
    await Promise.all(result.pushVectors.map(p=>{const c=this.tokens.get(p.uid);return c?this.tween(c,{x:p.to.x,y:p.to.y},180):Promise.resolve();}));
};

// ---- Motion v2 (presentation only) ----
// Quarter-view figures are painted facing the camera, so they must never be spun around: they stay upright and
// "turn" by mirroring left/right with a quick squash. Units look toward the nearest foe, face each other in combat,
// and walk along their path with ease-in/out, a footstep bob, a forward lean and a soft landing.
// Unit positions, facing used by the rules (u.angle) and all results are untouched.
(function(){
const ART=new Map();
function artDir(scene,key){
    if(ART.has(key))return ART.get(key);
    let d=1;
    try{const img=scene.textures.get(key).getSourceImage(),w=48,h=Math.max(1,Math.round(48*img.height/img.width)),cv=document.createElement('canvas');cv.width=w;cv.height=h;
        const x=cv.getContext('2d',{willReadFrequently:true});x.drawImage(img,0,0,w,h);const px=x.getImageData(0,0,w,h).data;let s=0,sx=0,x0=w,x1=0;
        for(let yy=0;yy<h;yy++)for(let xx=0;xx<w;xx++){const a=px[(yy*w+xx)*4+3];if(a>40){s+=a;sx+=a*xx;if(xx<x0)x0=xx;if(xx>x1)x1=xx;}}
        if(s){const m=sx/s,c=(x0+x1)/2;d=m<c-w*.015?-1:1;}}catch(e){}
    ART.set(key,d);return d;
}
const kindOf=u=>u.traits.includes('flying')?'fly':u.traits.includes('mounted')||u.traits.includes('beast')?'cav':u.traits.includes('monster')?'heavy':'foot';
const easeIO=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const now=()=>performance.now();
// world-facing request: +1 look right, -1 look left
function face(scene,uid,dir){const c=scene.tokens&&scene.tokens.get(uid);if(!c||!dir)return;const s=c.getByName('token');if(s)s.setData('faceDir',dir);}
function faceToward(scene,uid,x){const u=scene.b.unit(uid);if(!u)return;const dx=x-u.x;if(Math.abs(dx)>Math.max(6,u.radius*.25))face(scene,uid,Math.sign(dx));}
window.MESBG&&(window.MESBG.faceToward=(a,b)=>{const v=Tt.b.unit(b);v&&faceToward(Tt,a,v.x);});
Ve.prototype.mvFaceToward=function(uid,x){faceToward(this,uid,x);};
let lastAuto=0,lastActive='';
Ve.prototype.update=function(time){
    if(this.tokens){
        const t=now(),calm=UX.reduced,busy=this.busy;
        // idle: every unit glances toward its nearest foe
        // a small "ready" hop when a unit becomes the one to act
        const act=actionableUnit?.()?.uid||'';if(act!==lastActive){lastActive=act;const c=act&&this.tokens.get(act);if(c&&!calm)c.setData('mvHop',t);}
        for(const u of this.b.alive()){
            const c=this.tokens.get(u.uid),s=c&&c.getByName('token');
            if(!s||!s.getData('baseSX')||s.getData('fxLock'))continue;
            // turning: |cos| squash through zero, mirror at the midpoint
            const turnK=1,_fd=s.getData('faceDir')||0;s.setFlipX(_fd!==0&&_fd!==artDir(this,u.id));
            // idle breathing (kept from TokenIdle) — frozen positionally while the battle is resolving
            let m={sx:1,sy:1,dx:0,dy:0};if(!calm){let kind=c.getData('ik');if(kind===undefined){kind=window.TokenIdle.classify(u.id,this.b.meta.get(u.id));c.setData('ik',kind);}m=window.TokenIdle.sample(kind,time,u.uid);}
            let oy=0,sx=1,sy=1,ang=0;
            const mv=c.getData('mvMove');
            if(mv&&!calm){const R=u.radius,ph=mv.dist/mv.step*Math.PI,bob=Math.abs(Math.sin(ph));
                if(mv.kind==='fly'){oy=-R*.16-Math.sin(ph*.5)*R*.04;ang=mv.dir*7*mv.vel;}
                else{oy=-bob*R*(mv.kind==='cav'?.13:mv.kind==='heavy'?.06:.1)*mv.vel;sy=1-(1-bob)*.05*mv.vel;sx=1+(1-bob)*.03*mv.vel;ang=mv.dir*(mv.kind==='cav'?3.5:4.5)*mv.vel+Math.sin(ph)*(mv.kind==='heavy'?2:1.2)*mv.vel;}}
            const land=c.getData('mvLand');if(land&&!calm){const k=(t-land)/200;if(k<1){const w=Math.sin(k*Math.PI);sy*=1-.075*w;sx*=1+.05*w;}else c.setData('mvLand',0);}
            const hop=c.getData('mvHop');if(hop&&!calm){const k=(t-hop)/300;if(k<1){const w=Math.sin(k*Math.PI);oy-=w*u.radius*.16;sy*=1+.05*w;sx*=1-.03*w;}else c.setData('mvHop',0);}
            s.setScale(s.getData('baseSX')*m.sx*sx*turnK,s.getData('baseSY')*m.sy*sy);
            s.setAngle(ang);
            if(!busy||mv){const cc=s.getData('cxy')||{x:0,y:0};s.setPosition((busy?0:m.dx*u.radius*2)+cc.x,(busy?0:m.dy*u.radius*2)+cc.y+oy);}
        }
    }
    updateWorldUI();
};
async function glide(scene,e,yield_){
    const c=scene.tokens.get(e.uid),u=scene.b.unit(e.uid);if(!c||!u)return;
    const pts=(e.path&&e.path.length>1?e.path:[e.from,e.to]).map(p=>({x:p.x,y:p.y}));
    const seg=[];let L=0;for(let i=1;i<pts.length;i++){const d=Math.hypot(pts[i].x-pts[i-1].x,pts[i].y-pts[i-1].y);seg.push(d);L+=d;}
    c.setPosition(pts[0].x,pts[0].y);
    if(L<1){c.setPosition(pts.at(-1).x,pts.at(-1).y);return;}
    const sp=Math.max(1,Math.min(qt,5)),kind=kindOf(u);
    const pace=kind==='cav'?1.35:kind==='fly'?1.2:kind==='heavy'?.8:1;
    const dur=yield_?Math.max(140,Math.min(260,L*1.2))/sp:Math.max(240,Math.min(950,180+L*.95/pace))/sp;
    if(!yield_)scene.soundFX.play('base_slide');
    const mv={dist:0,step:kind==='cav'?78:kind==='heavy'?70:kind==='fly'?120:48,kind,dir:0,vel:0};
    c.setData('mvMove',yield_?null:mv);
    const at=d=>{let a=0;for(let i=0;i<seg.length;i++){if(a+seg[i]>=d||i===seg.length-1){const k=seg[i]?Math.min(1,(d-a)/seg[i]):1;return{x:pts[i].x+(pts[i+1].x-pts[i].x)*k,y:pts[i].y+(pts[i+1].y-pts[i].y)*k,i};}a+=seg[i];}return{...pts.at(-1),i:seg.length-1};};
    const st=now();let prev=0;
    await new Promise(res=>{const fr=()=>{if(!c.scene){res();return;}
        const t=Math.min(1,(now()-st)/dur),k=yield_?1-Math.pow(1-t,3):easeIO(t),d=k*L,p=at(d);
        c.setPosition(p.x,p.y);
        const sx=pts[p.i+1].x-pts[p.i].x;
        if(!yield_){mv.dist=d;mv.vel=Math.min(1,Math.abs(d-prev)/Math.max(.001,L/ (dur/16.7))*1.6);if(Math.abs(sx)>4){mv.dir=Math.sign(sx);face(scene,e.uid,mv.dir);}}
        prev=d;
        if(t<1)requestAnimationFrame(fr);else res();};fr();});
    c.setPosition(pts.at(-1).x,pts.at(-1).y);
    c.setData('mvMove',null);
    if(!yield_&&!UX.reduced)c.setData('mvLand',now());
}
// Outlines sit on the ground with the base, never across the painted figure:
// the team rim goes under the sprite inside each token, and the active-unit ring drops below the token layer.
const mvSync=Ve.prototype.sync;
Ve.prototype.sync=function(){
    mvSync.apply(this,arguments);
    if(this.tokens)for(const c of this.tokens.values()){const rim=c.getByName('rim'),tok=c.getByName('token');if(rim&&tok&&c.getIndex(rim)>c.getIndex(tok)){c.remove(rim,false);c.addAt(rim,c.getIndex(tok));}}
    if(this.actionRing&&this.actionRing.depth!==4.5)this.actionRing.setDepth(4.5);
};
const mvPrevPlay=Ve.prototype.play;
Ve.prototype.play=async function(event){
    if(!window._lwbFx&&qt<20&&this.tokens){
        if(event.type==='UnitMoved'){await glide(this,event,false);return;}
        if(event.type==='UnitYielded'){await glide(this,event,true);return;}
        if(event.type==='ChargeConnected'){const u=this.b.unit(event.uid);if(u){let best=null,bd=1e9;for(const v of this.b.alive()){if(v.side===u.side)continue;const d=Math.hypot(v.x-u.x,v.y-u.y);if(d<bd){bd=d;best=v;}}if(best){faceToward(this,u.uid,best.x);faceToward(this,best.uid,u.x);}}}
        // ---- 연출 강화: 보스 기술·페이즈·경고·처치 이펙트 (표현 전용, 결과는 로직에서 이미 결정됨)
        const FXV=this,ADDB=Phaser.BlendModes.ADD,camV=FXV.cameras&&FXV.cameras.main;
        if(FXV.textures&&!FXV.textures.exists('fx2-ring')){
            let g=FXV.add.graphics();g.fillStyle(0xffffff,1);g.fillRoundedRect(0,1,28,6,3);g.generateTexture('fx2-streak',28,8);g.destroy();
            g=FXV.add.graphics();for(let r=32;r>0;r-=2)g.fillStyle(0xffffff,.03+Math.pow(1-r/32,2)*.5).fillCircle(32,32,r);g.generateTexture('fx2-glow',64,64);g.destroy();
            g=FXV.add.graphics();g.lineStyle(6,0xffffff,1);g.strokeCircle(64,64,58);g.lineStyle(2,0xffffff,.55);g.strokeCircle(64,64,47);g.generateTexture('fx2-ring',128,128);g.destroy();
            g=FXV.add.graphics();for(let r=16;r>0;r-=2)g.fillStyle(0xd7cfbd,.05+(1-r/16)*.16).fillCircle(16,16,r);g.generateTexture('fx2-dust',32,32);g.destroy();
        }
        const vfxShake=(dur,mag)=>{if(camV&&camV.shake)camV.shake(dur,mag);};
        const vfxRing=(x,y,col,R,ms)=>{const r=FXV.add.image(x,y,'fx2-ring').setDepth(17).setBlendMode(ADDB).setTint(col).setScale(R/64*.35);FXV.tween(r,{scale:R/64*1.6,alpha:0},ms||380).then(()=>r.destroy());};
        const vfxGlow=(x,y,col,R,ms)=>{const g=FXV.add.image(x,y,'fx2-glow').setDepth(16).setBlendMode(ADDB).setTint(col).setScale(R/32*.4);FXV.tween(g,{scale:R/32*1.5,alpha:0},ms||420).then(()=>g.destroy());};
        const vfxBurst=(x,y,col,n)=>{for(let i=0;i<n;i++){const a=Math.random()*6.28,d=20+Math.random()*70,p=FXV.add.image(x,y,'fx2-streak').setDepth(18).setBlendMode(ADDB).setTint(col).setRotation(a).setAlpha(1).setScale(.6+Math.random()*.7);FXV.tween(p,{x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,alpha:0,scaleX:.05},280+Math.random()*180).then(()=>p.destroy());}};
        const vfxLabel=(x,y,text,col)=>{const z=1/(UX.zoom||1),t=FXV.add.text(x,y,text,{fontFamily:'Pretendard, sans-serif',fontSize:'24px',fontStyle:'900',color:col||'#ffd66b',stroke:'#120b04',strokeThickness:6}).setOrigin(.5).setResolution(UX.dpr).setScale(.4*z).setDepth(25);FXV.tween(t,{scale:1.1*z},90).then(()=>FXV.tween(t,{y:t.y-40*z,alpha:0},520)).then(()=>t.destroy());};
        if(event.type==='BossImpact'){
            const at=event.at||(event.uid&&this.b.unit(event.uid));if(at){
                vfxGlow(at.x,at.y,0xff5a3c,150,480);vfxRing(at.x,at.y,0xffb46a,160,420);vfxBurst(at.x,at.y,0xffc39c,14);vfxShake(260,.012);
                if(event.message)vfxLabel(at.x,at.y-60,event.message.split('—')[0].trim(),'#ff9a6b');
                await new Promise(r=>this.time.delayedCall(180,r));return;}
        }
        if(event.type==='BossPhase'){
            const u=this.b.alive('evil').find(v=>v.traits.includes('boss'))||{x:1165,y:728};
            vfxGlow(u.x,u.y,0xb44dff,220,700);vfxRing(u.x,u.y,0xb44dff,240,600);vfxBurst(u.x,u.y,0xda8cff,22);vfxShake(500,.02);
            if(event.message)vfxLabel(u.x,u.y-80,'격노','#e0aaff');
            await new Promise(r=>this.time.delayedCall(320,r));return;
        }
        if(event.type==='BossWarning'){vfxShake(300,.008);if(event.message)vfxLabel(1165,500,'⚠ '+event.message.slice(0,22),'#ff7060');}
        if(event.type==='UnitKilled'&&event.uid){
            const c=this.tokens.get(event.uid),x=c?c.x:event.x,y=c?c.y:event.y;
            if(x!==undefined){vfxGlow(x,y,0xff4040,110,420);vfxRing(x,y,0xffd0b0,120,360);vfxBurst(x,y,0xc23a2e,12);vfxShake(160,.007);}
        }
        if(event.type==='Saved'&&event.uid){
            const c=this.tokens.get(event.uid);if(c){vfxGlow(c.x,c.y,0xffd66b,110,420);vfxRing(c.x,c.y,0xffe8a0,110,360);if(event.message)vfxLabel(c.x,c.y-50,'막힘','#ffe8a0');}
        }
        if(event.type==='WaveStarted'&&event.message){vfxLabel(1165,460,event.message.split('·')[0].trim(),'#cfe3ff');vfxGlow(1165,460,0x7fb0ff,260,600);}
    }
    return mvPrevPlay.call(this,event);
};
})();
// ---- Combat FX v2 (presentation only): anticipation → strike trail → impact (hit-stop, flash, shockwave,
// directional sparks, shake) → large readable result popup. Combat results are computed elsewhere; this only draws them.
(function(){
const prevCombat=Ve.prototype.combat;
const FXC={good:{core:0xffffff,glow:0x8fe8ff,spark:0xdaf8ff},evil:{core:0xfff2e8,glow:0xff7a4a,spark:0xffc39c}};
function fx2Textures(s){
    if(!s.textures||s.textures.exists('fx2-streak'))return;
    let g=s.add.graphics();g.fillStyle(0xffffff,1);g.fillRoundedRect(0,1,28,6,3);g.generateTexture('fx2-streak',28,8);g.destroy();
    g=s.add.graphics();for(let r=32;r>0;r-=2)g.fillStyle(0xffffff,.03+Math.pow(1-r/32,2)*.5).fillCircle(32,32,r);g.generateTexture('fx2-glow',64,64);g.destroy();
    g=s.add.graphics();for(let r=16;r>0;r-=2)g.fillStyle(0xd7cfbd,.05+(1-r/16)*.16).fillCircle(16,16,r);g.generateTexture('fx2-dust',32,32);g.destroy();
    g=s.add.graphics();g.lineStyle(6,0xffffff,1);g.strokeCircle(64,64,58);g.lineStyle(2,0xffffff,.55);g.strokeCircle(64,64,47);g.generateTexture('fx2-ring',128,128);g.destroy();
}
Ve.prototype.combat=async function(result){
    if(window._lwbFx||!this.add||!this.tokens)return prevCombat.call(this,result);
    fx2Textures(this);
    const scene=this,cam=this.cameras&&this.cameras.main,speed=Math.max(1,Math.min(qt,5)),fast=qt>=20,calm=UX.reduced;
    const ADD=Phaser.BlendModes.ADD;
    const anim=(ms,fn)=>new Promise(res=>{const st=performance.now();const fr=()=>{const t=Math.min(1,(performance.now()-st)/Math.max(1,ms));fn(t);if(t<1)requestAnimationFrame(fr);else res();};fr();});
    const wait=ms=>new Promise(res=>scene.time.delayedCall(Math.max(0,ms),res));
    const popup=(x,y,text,kind)=>{
        const st=kind==='kill'?{size:'30px',color:'#ffd66b',stroke:'#3b2306'}:kind==='wound'?{size:'28px',color:'#ff7a5c',stroke:'#2a0904'}:{size:'20px',color:'#d6ecff',stroke:'#0e1a26'};
        const t=scene.add.text(x,y,text,{fontFamily:'Pretendard, sans-serif',fontSize:st.size,fontStyle:'900',color:st.color,stroke:st.stroke,strokeThickness:6}).setOrigin(.5).setResolution(UX.dpr).setDepth(24);
        t.setShadow(0,3,'rgba(0,0,0,.65)',4,true,true);
        const z=1/(UX.zoom||1);t.setScale(.35*z);
        scene.tween(t,{scale:1.25*z},fast?20:90).then(()=>scene.tween(t,{scale:z},fast?20:90)).then(()=>wait(fast?60:260/speed)).then(()=>scene.tween(t,{y:t.y-34*z,alpha:0},fast?60:420)).then(()=>t.destroy());
    };
    const spray=(x,y,dir,spread,n,color,dist,life)=>{for(let i=0;i<n;i++){const a=dir+(Math.random()-.5)*spread,d=dist*(.45+Math.random()*.75),p=scene.add.image(x,y,'fx2-streak').setDepth(16).setBlendMode(ADD).setTint(color).setRotation(a).setScale(.5+Math.random()*.6,.6+Math.random()*.5).setAlpha(1);
        scene.tween(p,{x:x+Math.cos(a)*d,y:y+Math.sin(a)*d,scaleX:.05,alpha:0},life*(.7+Math.random()*.6)).then(()=>p.destroy());}};
    for(const K of result.trappedUnits||[]){const $=this.b.unit(K);if(!$)continue;const p=this.add.text($.x,$.y-$.radius-25,'포위 · 추가 타격',{fontFamily:'Pretendard, sans-serif',fontSize:'16px',fontStyle:'800',color:'#ffe1b0',stroke:'#3a0e08',strokeThickness:5}).setOrigin(.5).setResolution(UX.dpr).setScale(1/(UX.zoom||1)).setDepth(22);this.time.delayedCall(1500,()=>p.destroy());}
    for(const K of result.knockedDownUnits||[]){const $=this.b.unit(K);if(!$)continue;const p=this.add.text($.x,$.y-$.radius-45,'기병 충격 · 넘어짐',{fontFamily:'Pretendard, sans-serif',fontSize:'16px',fontStyle:'800',color:'#f9edba',stroke:'#0e2622',strokeThickness:5}).setOrigin(.5).setResolution(UX.dpr).setScale(1/(UX.zoom||1)).setDepth(22);this.time.delayedCall(1400,()=>p.destroy());}
    let idx=0;
    for(const hit of result.strikeResults.slice(0,fast?2:12)){
        const u=this.b.unit(hit.attacker),v=this.b.unit(hit.target),ac=this.tokens.get(u?.uid),vc=this.tokens.get(v?.uid),sprite=ac?.getByName('token'),vsprite=vc?.getByName('token');
        if(!u||!v||!sprite)continue;
        idx++;
        this.mvFaceToward&&(this.mvFaceToward(u.uid,v.x),this.mvFaceToward(v.uid,u.x));
        const type=effectType(u,result.kind),angle=Math.atan2(v.y-u.y,v.x-u.x),col=FXC[u.side]||FXC.good;
        const heavy=type==='smash'||type==='cast'||u.traits.includes('monster')||u.traits.includes('boss');
        const wound=!!(hit.wound||hit.killed),kill=!!hit.killed,R=v.radius,W=Math.max(9,R*.32);
        const center=sprite.getData('cxy')||{x:0,y:0},vcenter=vsprite?(vsprite.getData('cxy')||{x:0,y:0}):null;
        const lunge=calm?0:type==='shoot'?-6:type==='thrust'?22:type==='pounce'?18:type==='cast'?-8:type==='smash'?14:16;
        const D=fast?50:Math.max(200,(heavy?400:320)/speed);
        const tg=this.add.graphics().setDepth(14).setBlendMode(ADD);
        // ── 1) wind-up + strike (or projectile flight) ──
        if(type==='shoot'){
            this.soundFX.play('arrow_release');
            const dist=Math.hypot(v.x-u.x,v.y-u.y),arc=Math.min(160,dist*.16),arrow=this.add.image(u.x,u.y,'fx-shoot').setDepth(15).setDisplaySize(R*3,R*3).setRotation(angle),trail=[];
            if(!calm){const mz=this.add.image(u.x+Math.cos(angle)*u.radius*.8,u.y+Math.sin(angle)*u.radius*.8,'fx2-glow').setDepth(16).setBlendMode(ADD).setTint(col.glow).setScale(u.radius*1.6/64);this.tween(mz,{alpha:0,scale:mz.scaleX*1.6},fast?30:180).then(()=>mz.destroy());spray(mz.x,mz.y,angle,.9,fast?0:4,col.spark,u.radius*.9,160);}
            const pos=t=>({x:u.x+(v.x-u.x)*t,y:u.y+(v.y-u.y)*t-Math.sin(t*Math.PI)*arc});
            await anim(fast?40:Math.max(200,Math.min(420,dist*.42))/speed,t=>{
                const p=pos(t),q2=pos(Math.min(1,t+.02));arrow.setPosition(p.x,p.y).setRotation(Math.atan2(q2.y-p.y,q2.x-p.x));
                if(!calm)sprite.setPosition(center.x-Math.cos(angle)*6*Math.sin(Math.min(1,t*3)*Math.PI),center.y-Math.sin(angle)*6*Math.sin(Math.min(1,t*3)*Math.PI));
                trail.push(p);if(trail.length>16)trail.shift();tg.clear();
                for(let i=1;i<trail.length;i++){const k=i/trail.length;tg.lineStyle(W*1.3*k,col.glow,.35*k);tg.lineBetween(trail[i-1].x,trail[i-1].y,trail[i].x,trail[i].y);tg.lineStyle(W*.42*k,0xffffff,.95*k);tg.lineBetween(trail[i-1].x,trail[i-1].y,trail[i].x,trail[i].y);}
            });
            arrow.destroy();sprite.setPosition(center.x,center.y);
        }else{
            this.soundFX.play('sword_swing');
            const flip=idx%2?1:-1;
            await anim(D*.55,t=>{
                // anticipation (pull back) for the first third, then a snap forward
                const k=t<.4?-Math.sin(t/.4*Math.PI/2)*.35:Math.sin((t-.4)/.6*Math.PI/2);
                if(!calm&&type!=='cast')sprite.setPosition(center.x+Math.cos(angle)*k*lunge,center.y+Math.sin(angle)*k*lunge);
                tg.clear();if(t<.4&&type!=='cast')return;
                const p=type==='cast'?t:(t-.4)/.6;
                if(type==='slash'||type==='smash'){
                    const cx=v.x-Math.cos(angle)*R*.25,cy=v.y-Math.sin(angle)*R*.25,r=R*(type==='smash'?1.35:1.2),span=type==='smash'?2.6:2.3;
                    const base=type==='smash'?-Math.PI/2:angle+Math.PI;const a0=base-flip*span/2,head=a0+flip*span*p,ww=W*(type==='smash'?1.5:1);
                    for(let i=0;i<16;i++){const aa=head-flip*i*.1,ab=head-flip*(i+1)*.1,f=1-i/16;if(flip>0?ab<a0:ab>a0)break;
                        tg.lineStyle(ww*2.2*f,col.glow,.28*f);tg.lineBetween(cx+Math.cos(aa)*r,cy+Math.sin(aa)*r,cx+Math.cos(ab)*r,cy+Math.sin(ab)*r);
                        tg.lineStyle(ww*f,col.core,.95*f);tg.lineBetween(cx+Math.cos(aa)*r,cy+Math.sin(aa)*r,cx+Math.cos(ab)*r,cy+Math.sin(ab)*r);}
                }else if(type==='thrust'){
                    const sx=u.x+Math.cos(angle)*u.radius*.6,sy=u.y+Math.sin(angle)*u.radius*.6,ex=v.x+Math.cos(angle)*R*.7,ey=v.y+Math.sin(angle)*R*.7;
                    const hx=sx+(ex-sx)*p,hy=sy+(ey-sy)*p,tx=sx+(ex-sx)*Math.max(0,p-.45),ty=sy+(ey-sy)*Math.max(0,p-.45);
                    tg.lineStyle(W*2.4,col.glow,.25);tg.lineBetween(tx,ty,hx,hy);tg.lineStyle(W*.9,col.core,1);tg.lineBetween(tx,ty,hx,hy);
                    tg.fillStyle(col.core,1);tg.fillTriangle(hx+Math.cos(angle)*W*1.6,hy+Math.sin(angle)*W*1.6,hx+Math.cos(angle+1.6)*W*.8,hy+Math.sin(angle+1.6)*W*.8,hx+Math.cos(angle-1.6)*W*.8,hy+Math.sin(angle-1.6)*W*.8);
                }else if(type==='pounce'){
                    const n=Math.min(3,Math.floor(p*3.2)+1),d=angle+Math.PI/2*flip*.6;
                    for(let i=0;i<n;i++){const o=(i-1)*R*.42,q3=Math.min(1,p*3-i),bx=v.x+Math.cos(angle+Math.PI/2)*o,by=v.y+Math.sin(angle+Math.PI/2)*o,L=R*1.1;
                        const x0=bx-Math.cos(d)*L,y0=by-Math.sin(d)*L,x1=x0+Math.cos(d)*2*L*q3,y1=y0+Math.sin(d)*2*L*q3;
                        tg.lineStyle(W*2,col.glow,.3);tg.lineBetween(x0,y0,x1,y1);tg.lineStyle(W*.75,col.core,1);tg.lineBetween(x0,y0,x1,y1);}
                }else if(type==='cast'){
                    const ox=u.x+(v.x-u.x)*p,oy=u.y+(v.y-u.y)*p-Math.sin(p*Math.PI)*R*.8,mag=u.side==='good'?0xbfe9ff:0xd2a3ff;
                    for(let i=0;i<6;i++){const pp=Math.max(0,p-i*.035),gx=u.x+(v.x-u.x)*pp,gy=u.y+(v.y-u.y)*pp-Math.sin(pp*Math.PI)*R*.8;tg.fillStyle(mag,.5*(1-i/6));tg.fillCircle(gx,gy,W*(1.6-i*.2));}
                    tg.fillStyle(0xffffff,1);tg.fillCircle(ox,oy,W*.8);
                }
            });
        }
        // ── 2) impact ──
        tg.clear();
        this.soundFX.play(type==='shoot'?'arrow_impact':wound?'sword_flesh':'sword_shield');
        const glow=this.add.image(v.x,v.y,'fx2-glow').setDepth(17).setBlendMode(ADD).setTint(wound?col.glow:0xfff0c0).setScale(R*(kill?5:wound?3.6:2.4)/64).setAlpha(1);
        this.tween(glow,{alpha:0,scale:glow.scaleX*1.5},fast?40:200).then(()=>glow.destroy());
        const ring=this.add.image(v.x,v.y,'fx2-ring').setDepth(16).setBlendMode(ADD).setTint(wound?col.spark:0xfff3c8).setScale(R*1.1/64).setAlpha(.95);
        this.tween(ring,{scale:R*(kill?3.4:heavy?2.8:2.2)/64,alpha:0},fast?50:(kill?380:280)).then(()=>ring.destroy());
        if(type==='smash'||type==='cast'){const acc=this.add.image(v.x,v.y,'fx-'+type).setDepth(15).setDisplaySize(R*2.6,R*2.6).setAlpha(.95);this.tween(acc,{displayWidth:R*4.2,displayHeight:R*4.2,alpha:0},fast?40:320).then(()=>acc.destroy());}
        if(!calm){
            if(wound){spray(v.x,v.y,angle,1.5,fast?3:kill?16:10,col.spark,R*2.2,fast?60:300);spray(v.x,v.y,angle+Math.PI,1.2,fast?0:3,0xff6a50,R*1.1,260);}
            else{spray(v.x-Math.cos(angle)*R*.7,v.y-Math.sin(angle)*R*.7,angle+Math.PI,2.2,fast?2:7,0xffe9a8,R*1.5,220);
                const sh=this.add.graphics().setDepth(16).setBlendMode(ADD);sh.lineStyle(W*1.1,0xe8f4ff,1);sh.beginPath();sh.arc(v.x,v.y,R*1.05,angle+Math.PI-.75,angle+Math.PI+.75);sh.strokePath();
                this.tween(sh,{alpha:0},fast?40:260).then(()=>sh.destroy());}
            if(wound&&this.textures.exists('fx-blood')){const bl=this.add.image(v.x,v.y,'fx-blood').setDepth(13).setRotation(Math.random()*6.28).setDisplaySize(R*(kill?3.4:2.3),R*(kill?3.4:2.3));this.tween(bl,{alpha:0},kill?800:480).then(()=>bl.destroy());}
            if(cam&&!fast&&(wound||heavy))cam.shake(kill?150:heavy?110:70,kill?.006:heavy?.005:.0025);
        }
        if(vsprite){
            vsprite.setTintFill(0xffffff);
            this.time.delayedCall(fast?20:60,()=>{if(!vsprite.scene)return;if(wound)vsprite.setTint(0xff7a62);else vsprite.clearTint();});
            this.time.delayedCall(fast?40:200,()=>{vsprite.scene&&vsprite.clearTint();});
        }
        popup(v.x,v.y-R-18/(UX.zoom||1),kill?'격파!':wound?'−1':(hit.prevented||'막음'),kill?'kill':wound?'wound':'block');
        // hit-stop: a brief freeze sells the impact
        if(!fast&&!calm)await wait((kill?80:wound?55:30)/speed);
        // ── 3) recoil / recover ──
        await anim(D*.45,t=>{
            const e=1-t;
            if(type!=='shoot'&&type!=='cast'&&!calm)sprite.setPosition(center.x+Math.cos(angle)*e*lunge*.6,center.y+Math.sin(angle)*e*lunge*.6);
            if(vsprite&&vcenter&&!calm&&!kill){const kb=(wound?10:5)*Math.sin(t*Math.PI)*e,jit=(Math.random()-.5)*(wound?3:1.5)*e;vsprite.setPosition(vcenter.x+Math.cos(angle)*kb+jit,vcenter.y+Math.sin(angle)*kb-jit);}
        });
        tg.destroy();sprite.setPosition(center.x,center.y);if(vsprite&&vcenter&&!kill)vsprite.setPosition(vcenter.x,vcenter.y);
        if(kill&&vsprite){
            this.soundFX.play('death');
            if(!calm&&this.textures.exists('fx2-dust'))for(let i=0;i<(fast?0:7);i++){const a=Math.random()*6.283,d=R*(.6+Math.random()*.9),pf=this.add.image(v.x,v.y,'fx2-dust').setDepth(12).setScale(R*.05).setAlpha(.9);this.tween(pf,{x:v.x+Math.cos(a)*d,y:v.y+Math.sin(a)*d*.7,scale:R*.09,alpha:0},520).then(()=>pf.destroy());}
            vsprite.setTintFill(0xffffff);vsprite.setData('fxLock',1);
            await this.tween(vsprite,{angle:vsprite.angle+(angle>-1.57&&angle<1.57?70:-70),alpha:0,scaleX:vsprite.scaleX*.82,scaleY:vsprite.scaleY*.82,x:vsprite.x+Math.cos(angle)*R*.35,y:vsprite.y+Math.sin(angle)*R*.35+6},fast?30:220);
            vsprite.clearTint();vc&&vc.setVisible(false);
        }
    }
    await Promise.all((result.pushVectors||[]).map(p=>{const c=this.tokens.get(p.uid);return c?this.tween(c,{x:p.to.x,y:p.to.y},180):Promise.resolve();}));
};
})();


// ---- Off-screen unit markers (no automatic camera movement) ----
// Units outside the view are marked on the screen edge; the camera only moves when the player taps a marker.
(function(){
const portrait=()=>UX.width<600&&UX.height>UX.width*1.1;
const safe=()=>portrait()?{t:54,r:58,b:18,l:14}:UX.height<360?{t:44,r:16,b:22,l:12}:{t:54,r:18,b:62,l:14};
const field=document.querySelector('#app .field');
const layer=document.createElement('div');layer.id='offscreen-marks';field&&field.appendChild(layer);
const pool=[];let lastMarks=0,markSig='';
function marks(){
    const t=performance.now();if(t-lastMarks<140)return;lastMarks=t;
    const show=UX.ready&&['preparation','move','shoot','fight'].includes(q.phase)&&ut('overlay').classList.contains('hidden');
    if(!show){if(markSig!==''){markSig='';layer.innerHTML='';pool.length=0;}return;}
    const s=safe(),W=UX.width,H=UX.height,cx=(s.l+W-s.r)/2,cy=(s.t+H-s.b)/2,inset=16;
    const L=s.l+inset,R=W-s.r-inset,T=s.t+inset,B=H-s.b-inset;
    const buckets=new Map();
    for(const u of q.alive()){if(u.escaped)continue;const p=screenAt(u.x,u.y),rr=u.radius*UX.zoom*.6;
        if(p.x>=s.l-rr&&p.x<=W-s.r+rr&&p.y>=s.t-rr&&p.y<=H-s.b+rr)continue;
        const dx=p.x-cx,dy=p.y-cy;let k=Infinity;if(dx)k=Math.min(k,(dx>0?R-cx:L-cx)/dx);if(dy)k=Math.min(k,(dy>0?B-cy:T-cy)/dy);
        const ex=cx+dx*k,ey=cy+dy*k,key=u.side+'|'+((Math.round(Math.atan2(dy,dx)/(Math.PI/4))+8)%8);
        const bk=buckets.get(key)||{side:u.side,x:0,y:0,n:0,ang:Math.atan2(dy,dx),near:u,nd:Infinity};bk.x+=ex;bk.y+=ey;bk.n++;const d=Math.hypot(dx,dy);if(d<bk.nd){bk.nd=d;bk.near=u;}buckets.set(key,bk);}
    const list=[...buckets.values()];
    const sig=list.map(b=>b.side+(b.x/b.n|0)+','+(b.y/b.n|0)+'x'+b.n).join(';');if(sig===markSig)return;markSig=sig;
    while(pool.length<list.length){const el=document.createElement('button');el.type='button';el.className='os-mark';el.innerHTML='<i></i><b></b>';layer.appendChild(el);pool.push(el);}
    pool.forEach((el,i)=>{const b=list[i];if(!b){el.style.display='none';return;}
        el.style.display='';el.className='os-mark '+(b.side==='good'?'ally':'foe');
        el.style.transform='translate('+(b.x/b.n-15)+'px,'+(b.y/b.n-15)+'px)';
        el.querySelector('i').style.transform='rotate('+(b.ang*180/Math.PI)+'deg)';
        el.querySelector('b').textContent=b.n>1?b.n:'';
        el.title=(b.side==='good'?'아군 ':'적 ')+b.n+'명 · 탭하면 이동';
        el.onclick=()=>{const u=b.near;if(u?.alive)setCamera(u.x,u.y,UX.zoom,'manual');};});
}
const omUpdate=Ve.prototype.update;
Ve.prototype.update=function(time){omUpdate.call(this,time);if(UX.ready)marks();};
})();

// The older play wrapper handles HeroSkill; its asset is changed to cast/rally below.
const effectPlay=Ve.prototype.play;
Ve.prototype.play=async function(event){if(event.type==='CommandUsed'){const u=this.b.unit(event.uid||this.b.selected);if(u){const fx=this.add.image(u.x,u.y,'fx-rally').setDepth(13).setDisplaySize(140,140);await this.tween(fx,{displayWidth:230,displayHeight:230,alpha:0},350);fx.destroy();}}return effectPlay.call(this,event);};
const heroFallenPlay=Ve.prototype.play;
Ve.prototype.play=async function(event){if(event.type==='UnitKilled'&&event.uid){const u=this.b.unit(event.uid);try{const _cam=window.MESBG&&window.MESBG.scene&&window.MESBG.scene.cameras&&window.MESBG.scene.cameras.main;if(_cam&&u&&u.x!=null&&u.traits&&(u.traits.includes('hero')||u.traits.includes('boss'))){_cam.pan(u.x,u.y,650,'Sine.easeInOut');_cam.shake(250,.0035)}}catch(e){}if(u&&u.traits&&u.traits.includes('boss')){try{const _sc=window.MESBG&&window.MESBG.scene;if(_sc){const _tw=_sc.tweens.timeScale,_tm=_sc.time.timeScale;_sc.tweens.timeScale=.3;_sc.time.timeScale=.35;setTimeout(()=>{try{_sc.tweens.timeScale=_tw;_sc.time.timeScale=_tm}catch(e){}},900)}}catch(e){}this.soundFX&&this.soundFX.play('death');const _bcp=(window.MESBG&&window.MESBG.scene&&window.MESBG.scene.cameras&&window.MESBG.scene.cameras.main);_bcp&&_bcp.shake(500,.007);const el=document.createElement('div');el.className='hero-fallen evil boss-fallen';const _bw=(u.stats&&u.stats.wounds)||8,_bounty=40+_bw*6;el.innerHTML='<b>레이드 보스 격파</b><span>'+esc(u.name)+' · +'+_bounty+'금</span>';document.body.appendChild(el);setTimeout(()=>el.classList.add('on'),30);setTimeout(()=>{el.classList.remove('on');setTimeout(()=>el.remove(),450)},2400);this.b&&(this.b.gold=(this.b.gold||0)+_bounty);this.emit&&this.emit('Event',esc(u.name)+' 격파 · 보상 +'+_bounty+'금');}else if(u.traits&&u.traits.includes('hero')){this.soundFX&&this.soundFX.play('death');const good=u.side==='good';const el=document.createElement('div');el.className='hero-fallen '+(good?'good':'evil');el.innerHTML=`<b>${good?'영웅 전사':'적장 격파'}</b><span>${esc(u.name)}</span>`;document.body.appendChild(el);setTimeout(()=>el.classList.add('on'),30);setTimeout(()=>{el.classList.remove('on');setTimeout(()=>el.remove(),450)},1600);}}return heroFallenPlay.call(this,event);};
const unitFxPlay=Ve.prototype.play;
Ve.prototype.play=async function(event){if(event.uid&&['Terror','HeroSkill','Saved','Relic','Heroic','JumpTest'].includes(event.type)){const u=this.b.unit(event.uid);if(u){const tex=event.type==='Terror'?'fx-terror':event.type==='HeroSkill'?'fx-rally':'fx-cast';const col=event.type==='Terror'?'#b9a4e8':event.type==='HeroSkill'||event.type==='Heroic'?'#fbe8b0':event.type==='Relic'?'#9ff0cf':'#cfe6ff';this.soundFX&&this.soundFX.play(event.type==='Terror'?'dice_roll':'event');const fx=this.add.image(u.x,u.y,tex).setDepth(14).setDisplaySize(100,100).setAlpha(.92);if(event.type==='Relic')fx.setTint(0x9ff0cf);const nm=this.add.text(u.x,u.y-u.radius-30,(event.text||'').split('·').pop().trim(),{fontFamily:'Pretendard',fontSize:'13px',color:col,stroke:'#17211d',strokeThickness:2,backgroundColor:'#1d2b3af0',padding:{x:6,y:3}}).setOrigin(.5).setDepth(15);await this.tween(fx,{displayWidth:180,displayHeight:180,alpha:0},400);fx.destroy();this.tween(nm,{y:u.y-u.radius-58,alpha:0},650).then(()=>nm.destroy());}}return unitFxPlay.call(this,event);};
const trapFxPlay=Ve.prototype.play;
Ve.prototype.play=async function(event){if(event.type==='Trap'&&event.at){const d=event.at;this.soundFX&&this.soundFX.play(d.type==='ballista'||d.type==='scorpion'?'arrow_release':'base_contact');const r=Math.max(70,(d.radius||120)*1.2);const fx=this.add.image(d.x,d.y,'fx-clash').setDepth(14).setDisplaySize(80,80).setAlpha(.95);if(d.type==='oil'||d.type==='barrel')fx.setTint(0xff8a3d);else if(d.type==='spike')fx.setTint(0xc9d6e8);const nm=this.add.text(d.x,d.y-40,(event.text||'').split('·')[0].trim(),{fontFamily:'Pretendard',fontSize:'13px',color:'#ffcf9a',stroke:'#17211d',strokeThickness:2,backgroundColor:'#2a1d12f0',padding:{x:6,y:3}}).setOrigin(.5).setDepth(15);await this.tween(fx,{displayWidth:r*2,displayHeight:r*2,alpha:0},420);fx.destroy();this.tween(nm,{y:d.y-70,alpha:0},650).then(()=>nm.destroy());}return trapFxPlay.call(this,event);};
const spellFxPlay=Ve.prototype.play;
Ve.prototype.play=async function(event){if(event.type==='Spell'&&event.uid){const u=this.b.unit(event.uid);if(u){this.soundFX&&this.soundFX.play('event');const fx=this.add.image(u.x,u.y,'fx-cast').setDepth(14).setDisplaySize(110,110).setAlpha(.95);const nm=this.add.text(u.x,u.y-46,(event.text||'').split('·').pop().trim(),{fontFamily:'Pretendard',fontSize:'13px',color:event.offensive?'#ffb9a0':'#cfe6ff',stroke:'#17211d',strokeThickness:2,backgroundColor:'#1d2b3af0',padding:{x:6,y:3}}).setOrigin(.5).setDepth(15);for(const tid of event.targets||[]){const tv=this.b.unit(tid);if(!tv)continue;const tfx=this.add.image(tv.x,tv.y,'fx-cast').setDepth(13).setDisplaySize(70,70).setAlpha(.8);if(event.offensive)tfx.setTint(0xff9a70);this.tween(tfx,{displayWidth:130,displayHeight:130,alpha:0},420).then(()=>tfx.destroy());}for(const rid of event.resisted||[]){const rv=this.b.unit(rid);if(!rv)continue;const rfx=this.add.image(rv.x,rv.y,'fx-cast').setDepth(13).setDisplaySize(80,80).setAlpha(.85).setTint(0x7fb4ff);this.tween(rfx,{displayWidth:150,displayHeight:150,alpha:0},430).then(()=>rfx.destroy());const rt=this.add.text(rv.x,rv.y-30,'저항',{fontFamily:'Pretendard',fontSize:'11px',color:'#9fc9ff',stroke:'#17211d',strokeThickness:2}).setOrigin(.5).setDepth(15);this.tween(rt,{y:rv.y-56,alpha:0},650).then(()=>rt.destroy());}await this.tween(fx,{displayWidth:200,displayHeight:200,alpha:0},430);fx.destroy();this.tween(nm,{y:u.y-82,alpha:0},700).then(()=>nm.destroy());}}return spellFxPlay.call(this,event);};
window.MESBG.ui.confirm=()=>ut('dock-primary').click();window.MESBG.ui.cancel=()=>ut('intent-cancel').click();
window.MESBG.catalog={rules:UNIT_RULES,units:UnitCatalog,estimatePoints,register:registerUnit,registerSkill:(id,fn)=>customSkills.set(id,fn)};
window.MESBG.chargePlan=chargePlan;window.MESBG.effectType=effectType;window.MESBG.plan=ve;window.MESBG.act=fn=>Rt(fn);
// Optional extensions: data definitions plus skill handlers, evaluated before preload.
for(const [id,handler] of Object.entries(window.MESBG_SKILL_HANDLERS||{}))customSkills.set(id,handler);
// ---- v1.6 full roster: extra units from the asset catalog (MESBG army-book profiles) ----
window.MESBG_EXTRA_UNITS=[{"id":"gundabad_warg_rider","meta":{"id":"gundabad_warg_rider","name_ko":"군다바드 와르그기병","name_en":"Gundabad Warg Rider","side":"evil","faction":"gundabad","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/gundabad_warg_rider.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"haradrim_raider","meta":{"id":"haradrim_raider","name_ko":"하라드림 기마약탈자","name_en":"Haradrim Raider","side":"evil","faction":"harad","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/haradrim_raider.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"dragon_knight","meta":{"id":"dragon_knight","name_ko":"드래곤 나이트","name_en":"Dragon Knight","side":"evil","faction":"rhun","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/dragon_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":4,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"khandish_horseman","meta":{"id":"khandish_horseman","name_ko":"칸드 기수","name_en":"Khandish Horseman","side":"evil","faction":"rhun","role":"cavalry","weapon":"axe","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/khandish_horseman.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"khandish_chieftain","meta":{"id":"khandish_chieftain","name_ko":"칸드 족장","name_en":"Khandish Chieftain","side":"evil","faction":"rhun","role":"hero","weapon":"axe","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/khandish_chieftain.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"rare"},{"id":"khandish_chariot","meta":{"id":"khandish_chariot","name_ko":"칸드 전차","name_en":"Khandish Chariot","side":"evil","faction":"rhun","role":"monster","weapon":"lance","base":"XXL","sheet":"roster-exp-evil-v1.png","file":"tokens/khandish_chariot.png","visualBase":"XXL","visualRadius":105,"baseMm":70,"artScale":1.0},"profile":{"move":400,"fight":4,"strength":5,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"sons_of_eorl","meta":{"id":"sons_of_eorl","name_ko":"에오를의 아들들","name_en":"Sons of Éorl","side":"good","faction":"rohan","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-rohan-exp-v1.png","file":"tokens/sons_of_eorl.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear","mounted"]},"recruitable":true,"unlockWave":4,"rarity":"rare"},{"id":"dead_rider","meta":{"id":"dead_rider","name_ko":"망자 기병","name_en":"Rider of the Dead","side":"good","faction":"dead","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-legends-good-v2.png","file":"tokens/dead_rider.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":8,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["terror","mounted","spear"]},"recruitable":true,"unlockWave":6,"rarity":"epic"},{"id":"fingolfin_mounted","meta":{"id":"fingolfin_mounted","name_ko":"핑골핀 (로칼로르)","name_en":"Fingolfin on Rochallor","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"XL","sheet":"roster-silmarillion-good-v1.png","file":"tokens/fingolfin_mounted.png","visualBase":"XL","visualRadius":60,"baseMm":50,"artScale":1.0},"profile":{"move":400,"fight":8,"strength":5,"defence":6,"attacks":4,"wounds":4,"courage":9,"shootValue":0,"shootRange":0,"might":4,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":6,"uniqueKey":"fingolfin"},{"id":"turgon","meta":{"id":"turgon","name_ko":"투르곤","name_en":"Turgon","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/turgon.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":5,"defence":6,"attacks":4,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":6,"uniqueKey":"turgon"},{"id":"fingon","meta":{"id":"fingon","name_ko":"핑곤","name_en":"Fingon","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/fingon.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"fingon"},{"id":"ecthelion","meta":{"id":"ecthelion","name_ko":"엑텔리온","name_en":"Ecthelion","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/ecthelion.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":6,"uniqueKey":"ecthelion"},{"id":"maedhros","meta":{"id":"maedhros","name_ko":"마이드로스","name_en":"Maedhros","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/maedhros.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":5,"defence":6,"attacks":4,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"maedhros"},{"id":"finrod_felagund","meta":{"id":"finrod_felagund","name_ko":"핀로드 펠라군드","name_en":"Finrod Felagund","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/finrod_felagund.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":4,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"finrod_felagund"},{"id":"celegorm","meta":{"id":"celegorm","name_ko":"켈레고름","name_en":"Celegorm","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/celegorm.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":290,"fight":7,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":3,"shootRange":700,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"celegorm"},{"id":"tuor","meta":{"id":"tuor","name_ko":"투오르","name_en":"Tuor","side":"good","faction":"men","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/tuor.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":5,"defence":5,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":6,"uniqueKey":"tuor"},{"id":"hurin_thalion","meta":{"id":"hurin_thalion","name_ko":"후린 탈리온","name_en":"Hurin Thalion","side":"good","faction":"men","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/hurin_thalion.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":5,"defence":5,"attacks":4,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"uniqueKey":"hurin_thalion"},{"id":"thingol","meta":{"id":"thingol","name_ko":"싱골","name_en":"Thingol","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/thingol.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":6,"uniqueKey":"thingol"},{"id":"tom_bombadil","meta":{"id":"tom_bombadil","name_ko":"톰 봄바딜","name_en":"Tom Bombadil","side":"good","faction":"other","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/tom_bombadil.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":260,"fight":6,"strength":4,"defence":7,"attacks":2,"wounds":5,"courage":10,"shootValue":0,"shootRange":0,"might":2,"will":6,"fate":3,"traits":["hero","terror"]},"recruitable":true,"unlockWave":7,"uniqueKey":"tom_bombadil"},{"id":"goldberry","meta":{"id":"goldberry","name_ko":"골드베리","name_en":"Goldberry","side":"good","faction":"other","role":"hero","weapon":"sword","base":"M","sheet":"roster-silmarillion-good-v1.png","file":"tokens/goldberry.png","visualBase":"M","visualRadius":40,"baseMm":25},"profile":{"move":270,"fight":3,"strength":2,"defence":5,"attacks":1,"wounds":3,"courage":9,"shootValue":0,"shootRange":0,"might":1,"will":5,"fate":3,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":7,"uniqueKey":"goldberry"},{"id":"witchking_foot","meta":{"id":"witchking_foot","name_ko":"마술왕(도보)","name_en":"Witch-king on foot","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"lotr-tokens-v1.png","file":"tokens/witchking_foot.png","visualBase":"L","visualRadius":47,"baseMm":25,"artScale":1.5},"profile":{"move":270,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":20,"fate":3,"traits":["hero","terror","wizard"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"witchking"},{"id":"witchking_mounted","meta":{"id":"witchking_mounted","name_ko":"마술왕(기마)","name_en":"Witch-king mounted","side":"evil","faction":"angmar","role":"cavalry","weapon":"sword","base":"XL","sheet":"witchking-mounted-topdown-v1.png","file":"tokens/witchking_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":20,"fate":3,"traits":["hero","mounted","terror","wizard"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"witchking"},{"id":"witchking_mounted_sheet","meta":{"id":"witchking_mounted_sheet","name_ko":"마술왕(기마·예비)","name_en":"Witch-king mounted (alt)","side":"evil","faction":"angmar","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-enemy-heroes-v1.png","file":"tokens/witchking_mounted_sheet.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":20,"fate":3,"traits":["hero","mounted","terror","wizard"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"witchking"},{"id":"witchking_foot_mace","meta":{"id":"witchking_foot_mace","name_ko":"마술왕(철퇴)","name_en":"Witch-king with mace","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-enemy-heroes-v1.png","file":"tokens/witchking_foot_mace.png","visualBase":"L","visualRadius":47,"baseMm":25,"artScale":1.5},"profile":{"move":270,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":20,"fate":3,"traits":["hero","terror","wizard"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"witchking"},{"id":"nazgul_sword","meta":{"id":"nazgul_sword","name_ko":"나즈굴(검)","name_en":"Nazgul, sword","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"roster-enemy-heroes-v1.png","file":"tokens/nazgul_sword.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"nazgul"},{"id":"orc_shaman","meta":{"id":"orc_shaman","name_ko":"오크 주술사","name_en":"Orc Shaman","side":"evil","faction":"moria","role":"support","weapon":"staff","base":"S","sheet":"roster-enemy-heroes-v1.png","file":"tokens/orc_shaman.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.9},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_spearman","meta":{"id":"orc_spearman","name_ko":"오크 창병","name_en":"Orc Spearman","side":"evil","faction":"mordor","role":"infantry","weapon":"spear","base":"S","sheet":"roster-enemy-troops-v1.png","file":"tokens/orc_spearman.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":1.0},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_swordshield","meta":{"id":"uruk_swordshield","name_ko":"우르크하이 검방","name_en":"Uruk-hai, sword & shield","side":"evil","faction":"isengard","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-enemy-troops-v1.png","file":"tokens/uruk_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"morannon_orc","meta":{"id":"morannon_orc","name_ko":"모라논 오크","name_en":"Morannon Orc","side":"evil","faction":"mordor","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-enemy-troops-v1.png","file":"tokens/morannon_orc.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":250,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"haradrim_spearman","meta":{"id":"haradrim_spearman","name_ko":"하라드림 창병","name_en":"Haradrim Spearman","side":"evil","faction":"harad","role":"infantry","weapon":"spear","base":"M","sheet":"roster-enemy-troops-v1.png","file":"tokens/haradrim_spearman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"eowyn","meta":{"id":"eowyn","name_ko":"에오윈","name_en":"Eowyn","side":"good","faction":"rohan","role":"hero","weapon":"sword","base":"M","sheet":"roster-free-heroes-v1.png","file":"tokens/eowyn.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"eowyn"},{"id":"frodo","meta":{"id":"frodo","name_ko":"프로도","name_en":"Frodo","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-free-heroes-v1.png","file":"tokens/frodo.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.5},"profile":{"move":230,"fight":2,"strength":2,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"frodo"},{"id":"rohan_royal_guard","meta":{"id":"rohan_royal_guard","name_ko":"로한 근위병","name_en":"Rohan Royal Guard","side":"good","faction":"rohan","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-free-troops-v1.png","file":"tokens/rohan_royal_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"mountain_troll","meta":{"id":"mountain_troll","name_ko":"산악 트롤","name_en":"Mountain Troll","side":"evil","faction":"mordor","role":"monster","weapon":"club","base":"XXL","sheet":"roster-monsters-v1.png","file":"tokens/mountain_troll.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":300,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"shelob","meta":{"id":"shelob","name_ko":"셀로브","name_en":"Shelob","side":"evil","faction":"mordor","role":"monster","weapon":"various","base":"XXL","sheet":"roster-monsters-v1.png","file":"tokens/shelob.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":300,"fight":6,"strength":5,"defence":8,"attacks":4,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"barrow_wight","meta":{"id":"barrow_wight","name_ko":"고분 망령","name_en":"Barrow-wight","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"M","sheet":"roster-monsters-v1.png","file":"tokens/barrow_wight.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":250,"fight":4,"strength":4,"defence":6,"attacks":1,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":4,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"barrow_wight"},{"id":"nazgul_sword_2","meta":{"id":"nazgul_sword_2","name_ko":"나즈굴(검·B)","name_en":"Nazgul, sword (v2)","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/nazgul_sword_2.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"nazgul"},{"id":"nazgul_mace","meta":{"id":"nazgul_mace","name_ko":"나즈굴(철퇴)","name_en":"Nazgul, mace","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/nazgul_mace.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"nazgul"},{"id":"nazgul_mounted","meta":{"id":"nazgul_mounted","name_ko":"나즈굴(기마)","name_en":"Nazgul mounted","side":"evil","faction":"angmar","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/nazgul_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","mounted","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"nazgul"},{"id":"morgul_knight","meta":{"id":"morgul_knight","name_ko":"모르굴 기사","name_en":"Morgul Knight","side":"evil","faction":"mordor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/morgul_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"dwimmerlaik","meta":{"id":"dwimmerlaik","name_ko":"드위머레이크(갑옷 나즈굴)","name_en":"Dwimmerlaik","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-sauron-nazgul-v1.png","file":"tokens/dwimmerlaik.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"dwimmerlaik"},{"id":"mt_swordshield","meta":{"id":"mt_swordshield","name_ko":"미나스 티리스 검방","name_en":"MT sword & shield","side":"good","faction":"gondor","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"mt_spearshield","meta":{"id":"mt_spearshield","name_ko":"미나스 티리스 창방","name_en":"MT spear & shield","side":"good","faction":"gondor","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_spearshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"mt_bowman","meta":{"id":"mt_bowman","name_ko":"미나스 티리스 궁수","name_en":"MT bowman","side":"good","faction":"gondor","role":"infantry","weapon":"bow","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_bowman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"mt_captain","meta":{"id":"mt_captain","name_ko":"미나스 티리스 장교","name_en":"MT shield captain","side":"good","faction":"gondor","role":"infantry","weapon":"","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_captain.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"mt_captain"},{"id":"mt_fountain_guard","meta":{"id":"mt_fountain_guard","name_ko":"샘물수위병","name_en":"Fountain Court Guard","side":"good","faction":"gondor","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-minastirith-variants-v1.png","file":"tokens/mt_fountain_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":7,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"orc_sword2","meta":{"id":"orc_sword2","name_ko":"오크(검)","name_en":"Orc, sword","side":"evil","faction":"mordor","role":"infantry","weapon":"sword","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_sword2.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_swordshield","meta":{"id":"orc_swordshield","name_ko":"오크(검방)","name_en":"Orc, sword & shield","side":"evil","faction":"mordor","role":"infantry","weapon":"sword_shield","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_swordshield.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_spear2","meta":{"id":"orc_spear2","name_ko":"오크(창)","name_en":"Orc, spear","side":"evil","faction":"mordor","role":"infantry","weapon":"spear","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_spear2.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_twohanded","meta":{"id":"orc_twohanded","name_ko":"오크(양손도끼)","name_en":"Orc, two-handed axe","side":"evil","faction":"mordor","role":"infantry","weapon":"twohanded","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_twohanded.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":4,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_bow","meta":{"id":"orc_bow","name_ko":"오크(활)","name_en":"Orc, bow","side":"evil","faction":"mordor","role":"infantry","weapon":"bow","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_bow.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":5,"shootRange":720,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"orc_drummer","meta":{"id":"orc_drummer","name_ko":"오크 전쟁북","name_en":"Orc war drummer","side":"evil","faction":"mordor","role":"support","weapon":"drum","base":"S","sheet":"roster-orc-variants-v1.png","file":"tokens/orc_drummer.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"dwarf_axeshield","meta":{"id":"dwarf_axeshield","name_ko":"드워프 도끼방","name_en":"Dwarf, axe & shield","side":"good","faction":"dwarf","role":"infantry","weapon":"axe","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/dwarf_axeshield.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"dwarf_2haxe","meta":{"id":"dwarf_2haxe","name_ko":"드워프 양손도끼","name_en":"Dwarf, two-handed axe","side":"good","faction":"dwarf","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/dwarf_2haxe.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":5,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"dwarf_ranger","meta":{"id":"dwarf_ranger","name_ko":"드워프 레인저","name_en":"Dwarf Ranger","side":"good","faction":"dwarf","role":"infantry","weapon":"bow","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/dwarf_ranger.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"khazad_guard","meta":{"id":"khazad_guard","name_ko":"카자드 근위병","name_en":"Khazad Guard","side":"good","faction":"dwarf","role":"infantry","weapon":"axe","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/khazad_guard.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":8,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"iron_guard","meta":{"id":"iron_guard","name_ko":"아이언 가드","name_en":"Iron Guard","side":"good","faction":"dwarf","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/iron_guard.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":8,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"dwarf_banner","meta":{"id":"dwarf_banner","name_ko":"드워프 기수","name_en":"Dwarf banner bearer","side":"good","faction":"dwarf","role":"support","weapon":"banner","base":"M","sheet":"roster-dwarf-variants-v1.png","file":"tokens/dwarf_banner.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf","banner"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elf_swordshield","meta":{"id":"elf_swordshield","name_ko":"엘프 검방","name_en":"Elf, sword & shield","side":"good","faction":"elf","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elf_spear","meta":{"id":"elf_spear","name_ko":"엘프 창병","name_en":"Elf, spear","side":"good","faction":"elf","role":"infantry","weapon":"spear","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_spear.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf","spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elf_bow","meta":{"id":"elf_bow","name_ko":"엘프 궁수","name_en":"Elf, bow","side":"good","faction":"elf","role":"infantry","weapon":"bow","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_bow.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":3,"shootRange":830,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elf_glaive","meta":{"id":"elf_glaive","name_ko":"엘프 글레이브","name_en":"Elf, glaive","side":"good","faction":"elf","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_glaive.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"galadhrim_warrior","meta":{"id":"galadhrim_warrior","name_ko":"갈라드림 전사","name_en":"Galadhrim Warrior","side":"good","faction":"lothlorien","role":"infantry","weapon":"sword","base":"M","sheet":"roster-elf-variants-v1.png","file":"tokens/galadhrim_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"elf_knight","meta":{"id":"elf_knight","name_ko":"엘프 기마기사","name_en":"Elf Knight","side":"good","faction":"rivendell","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-elf-variants-v1.png","file":"tokens/elf_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf","mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"uruk_swordshield2","meta":{"id":"uruk_swordshield2","name_ko":"우르크하이 검방","name_en":"Uruk-hai, sword & shield","side":"evil","faction":"isengard","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_swordshield2.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_pike","meta":{"id":"uruk_pike","name_ko":"우르크하이 파이크","name_en":"Uruk-hai, pike","side":"evil","faction":"isengard","role":"infantry","weapon":"pike","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_pike.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_crossbow","meta":{"id":"uruk_crossbow","name_ko":"우르크하이 석궁","name_en":"Uruk-hai, crossbow","side":"evil","faction":"isengard","role":"infantry","weapon":"crossbow","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_crossbow.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":700,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_scout","meta":{"id":"uruk_scout","name_ko":"우르크하이 스카웃","name_en":"Uruk-hai Scout","side":"evil","faction":"isengard","role":"infantry","weapon":"sword","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_scout.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_berserker2","meta":{"id":"uruk_berserker2","name_ko":"우르크하이 광전사","name_en":"Uruk-hai Berserker","side":"evil","faction":"isengard","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_berserker2.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":5,"defence":5,"attacks":2,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_banner","meta":{"id":"uruk_banner","name_ko":"우르크하이 기수","name_en":"Uruk-hai banner bearer","side":"evil","faction":"isengard","role":"support","weapon":"banner","base":"M","sheet":"roster-uruk-variants-v1.png","file":"tokens/uruk_banner.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["banner"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"haradrim_spear","meta":{"id":"haradrim_spear","name_ko":"하라드림 창병","name_en":"Haradrim spearman","side":"evil","faction":"harad","role":"infantry","weapon":"spear","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/haradrim_spear.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"haradrim_bow","meta":{"id":"haradrim_bow","name_ko":"하라드림 궁수","name_en":"Haradrim archer","side":"evil","faction":"harad","role":"infantry","weapon":"bow","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/haradrim_bow.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"haradrim_priest","meta":{"id":"haradrim_priest","name_ko":"하라드림 전사제","name_en":"Haradrim warrior priest","side":"evil","faction":"harad","role":"support","weapon":"staff","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/haradrim_priest.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"easterling_phalanx","meta":{"id":"easterling_phalanx","name_ko":"이스터링 방진병","name_en":"Easterling phalangite","side":"evil","faction":"easterling","role":"infantry","weapon":"pike","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/easterling_phalanx.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"easterling_swordshield","meta":{"id":"easterling_swordshield","name_ko":"이스터링 검방","name_en":"Easterling, sword & shield","side":"evil","faction":"easterling","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/easterling_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"easterling_kataphrakt","meta":{"id":"easterling_kataphrakt","name_ko":"이스터링 중기병","name_en":"Easterling Kataphrakt","side":"evil","faction":"easterling","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-haradrim-easterling-v1.png","file":"tokens/easterling_kataphrakt.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"dol_amroth_knight","meta":{"id":"dol_amroth_knight","name_ko":"돌 암로스 백조기사","name_en":"Knight of Dol Amroth","side":"good","faction":"gondor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-gondor-exp-v1.png","file":"tokens/dol_amroth_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":4,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"gondor_knight","meta":{"id":"gondor_knight","name_ko":"곤도르 기병","name_en":"Knight of Minas Tirith","side":"good","faction":"gondor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-gondor-exp-v1.png","file":"tokens/gondor_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"osgiliath_veteran","meta":{"id":"osgiliath_veteran","name_ko":"오스길리아스 베테랑","name_en":"Osgiliath Veteran","side":"good","faction":"gondor","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-gondor-exp-v1.png","file":"tokens/osgiliath_veteran.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["veteran"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"lossarnach_axeman","meta":{"id":"lossarnach_axeman","name_ko":"로사르나흐 도끼병","name_en":"Lossarnach Axeman","side":"good","faction":"gondor","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-gondor-exp-v1.png","file":"tokens/lossarnach_axeman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"pelennor_militia","meta":{"id":"pelennor_militia","name_ko":"펠렌노르 민병","name_en":"Pelennor Militia","side":"good","faction":"gondor","role":"infantry","weapon":"spear","base":"M","sheet":"roster-gondor-exp-v1.png","file":"tokens/pelennor_militia.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"rohan_swordshield","meta":{"id":"rohan_swordshield","name_ko":"로한 검방","name_en":"Rohan, sword & shield","side":"good","faction":"rohan","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_swordshield.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"rohan_spear","meta":{"id":"rohan_spear","name_ko":"로한 창병","name_en":"Rohan, spear","side":"good","faction":"rohan","role":"infantry","weapon":"spear","base":"M","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_spear.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"rohan_archer","meta":{"id":"rohan_archer","name_ko":"로한 궁수","name_en":"Rohan archer","side":"good","faction":"rohan","role":"infantry","weapon":"bow","base":"M","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"eomer","meta":{"id":"eomer","name_ko":"에오메르(기마)","name_en":"Eomer mounted","side":"good","faction":"rohan","role":"hero","weapon":"sword","base":"XL","sheet":"roster-rohan-exp-v1.png","file":"tokens/eomer.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.05},"profile":{"move":430,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"eomer"},{"id":"rohan_outrider","meta":{"id":"rohan_outrider","name_ko":"로한 기마궁수","name_en":"Rohan outrider","side":"good","faction":"rohan","role":"cavalry","weapon":"bow","base":"XL","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_outrider.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"rohan_banner","meta":{"id":"rohan_banner","name_ko":"로한 깃발수","name_en":"Rohan banner bearer","side":"good","faction":"rohan","role":"support","weapon":"banner","base":"M","sheet":"roster-rohan-exp-v1.png","file":"tokens/rohan_banner.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["banner"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"black_numenorean","meta":{"id":"black_numenorean","name_ko":"검은 누메노르인(도보)","name_en":"Black Numenorean on foot","side":"evil","faction":"mordor","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-mordor-elite-v1.png","file":"tokens/black_numenorean.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":250,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"black_numenorean_mounted","meta":{"id":"black_numenorean_mounted","name_ko":"검은 누메노르인(기마)","name_en":"Black Numenorean mounted","side":"evil","faction":"mordor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-mordor-elite-v1.png","file":"tokens/black_numenorean_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"orc_tracker","meta":{"id":"orc_tracker","name_ko":"오크 추적자","name_en":"Orc Tracker","side":"evil","faction":"mordor","role":"infantry","weapon":"twohanded","base":"S","sheet":"roster-mordor-elite-v1.png","file":"tokens/orc_tracker.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":250,"fight":3,"strength":4,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"war_troll","meta":{"id":"war_troll","name_ko":"전쟁 트롤","name_en":"Mordor War Troll","side":"evil","faction":"mordor","role":"monster","weapon":"club","base":"XXL","sheet":"roster-mordor-elite-v1.png","file":"tokens/war_troll.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":300,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"black_guard","meta":{"id":"black_guard","name_ko":"바라드두르 흑근위","name_en":"Black Guard of Barad-dur","side":"evil","faction":"mordor","role":"infantry","weapon":"spear_shield","base":"M","sheet":"roster-mordor-elite-v1.png","file":"tokens/black_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":250,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"orc_taskmaster","meta":{"id":"orc_taskmaster","name_ko":"오크 두목","name_en":"Orc Taskmaster","side":"evil","faction":"mordor","role":"support","weapon":"whip","base":"M","sheet":"roster-mordor-elite-v1.png","file":"tokens/orc_taskmaster.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":255,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"orc_taskmaster"},{"id":"goblin_spear","meta":{"id":"goblin_spear","name_ko":"고블린 창병","name_en":"Goblin, spear","side":"evil","faction":"moria","role":"infantry","weapon":"spear","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_spear.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.9},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_shield","meta":{"id":"goblin_shield","name_ko":"고블린 방패병","name_en":"Goblin, shield","side":"evil","faction":"moria","role":"infantry","weapon":"sword_shield","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_shield.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.9},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_bow","meta":{"id":"goblin_bow","name_ko":"고블린 궁수","name_en":"Goblin, bow","side":"evil","faction":"moria","role":"infantry","weapon":"bow","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_bow.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.9},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":5,"shootRange":720,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_prowler","meta":{"id":"goblin_prowler","name_ko":"고블린 프라울러","name_en":"Goblin Prowler","side":"evil","faction":"moria","role":"infantry","weapon":"dagger","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_prowler.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.9},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_king","meta":{"id":"goblin_king","name_ko":"고블린 왕","name_en":"Goblin King","side":"evil","faction":"moria","role":"hero","weapon":"club","base":"L","sheet":"roster-goblin-v1.png","file":"tokens/goblin_king.png","visualBase":"L","visualRadius":47,"baseMm":25,"artScale":0.9},"profile":{"move":250,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"goblin_king"},{"id":"goblin_shaman","meta":{"id":"goblin_shaman","name_ko":"고블린 샤먼","name_en":"Goblin Shaman","side":"evil","faction":"moria","role":"support","weapon":"staff","base":"S","sheet":"roster-goblin-v1.png","file":"tokens/goblin_shaman.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.9},"profile":{"move":235,"fight":2,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"dunlending_warrior","meta":{"id":"dunlending_warrior","name_ko":"던랜딩 전사","name_en":"Dunlending Warrior","side":"evil","faction":"dunland","role":"infantry","weapon":"sword","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/dunlending_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"dunlending_huscarl","meta":{"id":"dunlending_huscarl","name_ko":"던랜딩 허스칼","name_en":"Dunlending Huscarl","side":"evil","faction":"dunland","role":"infantry","weapon":"twohanded","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/dunlending_huscarl.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"warg","meta":{"id":"warg","name_ko":"야생 와르그","name_en":"Wild Warg","side":"evil","faction":"isengard","role":"monster","weapon":"none","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/warg.png","visualBase":"M","visualRadius":38,"baseMm":40},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast","monster"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"uruk_sapper","meta":{"id":"uruk_sapper","name_ko":"우르크 폭파반","name_en":"Uruk-hai Demolition Team","side":"evil","faction":"isengard","role":"infantry","weapon":"bomb","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/uruk_sapper.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"uruk_scout_archer","meta":{"id":"uruk_scout_archer","name_ko":"우르크 스카웃 궁수","name_en":"Uruk-hai Scout Archer","side":"evil","faction":"isengard","role":"infantry","weapon":"bow","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/uruk_scout_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"crebain_swarm","meta":{"id":"crebain_swarm","name_ko":"크레반 까마귀 떼","name_en":"Crebain swarm","side":"evil","faction":"isengard","role":"support","weapon":"none","base":"M","sheet":"roster-isengard-exp-v1.png","file":"tokens/crebain_swarm.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":420,"fight":2,"strength":2,"defence":5,"attacks":1,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["support","flying"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"hobbit_shirriff","meta":{"id":"hobbit_shirriff","name_ko":"호빗 민병","name_en":"Hobbit Shirriff","side":"good","faction":"shire","role":"infantry","weapon":"pitchfork","base":"S","sheet":"roster-free-special-v1.png","file":"tokens/hobbit_shirriff.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.5},"profile":{"move":200,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"hobbit_bounder","meta":{"id":"hobbit_bounder","name_ko":"호빗 궁수","name_en":"Hobbit Bounder","side":"good","faction":"shire","role":"infantry","weapon":"bow","base":"S","sheet":"roster-free-special-v1.png","file":"tokens/hobbit_bounder.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.5},"profile":{"move":200,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":1,"courage":3,"shootValue":4,"shootRange":650,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"ent","meta":{"id":"ent","name_ko":"엔트","name_en":"Ent","side":"good","faction":"ent","role":"monster","weapon":"none","base":"XXL","sheet":"roster-free-special-v1.png","file":"tokens/ent.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":290,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["monster","terror"]},"recruitable":true,"unlockWave":4,"rarity":"legendary"},{"id":"beorning","meta":{"id":"beorning","name_ko":"베오르닝 전사","name_en":"Beorning","side":"good","faction":"beorning","role":"hero","weapon":"axe","base":"L","sheet":"roster-free-special-v1.png","file":"tokens/beorning.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"beorning"},{"id":"ranger_north","meta":{"id":"ranger_north","name_ko":"북부 레인저","name_en":"Ranger of the North","side":"good","faction":"arnor","role":"infantry","weapon":"sword","base":"M","sheet":"roster-free-special-v1.png","file":"tokens/ranger_north.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["ranger"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"faramir","meta":{"id":"faramir","name_ko":"파라미르","name_en":"Faramir","side":"good","faction":"gondor","role":"hero","weapon":"bow","base":"M","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/faramir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":3,"shootRange":820,"might":3,"will":3,"fate":3,"traits":["hero","ranger"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"faramir"},{"id":"haldir","meta":{"id":"haldir","name_ko":"할디르","name_en":"Haldir","side":"good","faction":"lothlorien","role":"hero","weapon":"twohanded","base":"M","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/haldir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":290,"fight":5,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":3,"shootRange":830,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"haldir"},{"id":"galadriel","meta":{"id":"galadriel","name_ko":"갈라드리엘","name_en":"Galadriel","side":"good","faction":"lothlorien","role":"hero","weapon":"none","base":"M","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/galadriel.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":2,"defence":5,"attacks":1,"wounds":2,"courage":8,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"galadriel"},{"id":"gamling","meta":{"id":"gamling","name_ko":"감링(기수)","name_en":"Gamling with banner","side":"good","faction":"rohan","role":"hero","weapon":"banner","base":"M","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/gamling.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"gamling"},{"id":"samwise","meta":{"id":"samwise","name_ko":"샘와이즈","name_en":"Samwise Gamgee","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-free-heroes-exp-v1.png","file":"tokens/samwise.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.5},"profile":{"move":230,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"samwise"},{"id":"mouth_of_sauron","meta":{"id":"mouth_of_sauron","name_ko":"사우론의 입(기마)","name_en":"Mouth of Sauron","side":"evil","faction":"mordor","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/mouth_of_sauron.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":4,"fate":2,"traits":["hero","mounted","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"mouth_of_sauron"},{"id":"lurtz","meta":{"id":"lurtz","name_ko":"루르츠","name_en":"Lurtz","side":"evil","faction":"isengard","role":"hero","weapon":"bow","base":"M","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/lurtz.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":4,"shootRange":760,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"lurtz"},{"id":"sharku","meta":{"id":"sharku","name_ko":"샤르쿠(와르그)","name_en":"Sharku on warg","side":"evil","faction":"isengard","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/sharku.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":420,"fight":4,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","mounted","spear"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"sharku"},{"id":"grima","meta":{"id":"grima","name_ko":"그리마 웜텅","name_en":"Grima Wormtongue","side":"evil","faction":"isengard","role":"hero","weapon":"dagger","base":"M","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/grima.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":4,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"grima"},{"id":"khamul","meta":{"id":"khamul","name_ko":"카물","name_en":"Khamul the Easterling","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-evil-heroes-exp-v1.png","file":"tokens/khamul.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"khamul"},{"id":"fingolfin","meta":{"id":"fingolfin","name_ko":"핑골핀","name_en":"Fingolfin","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-legends-good-v1.png","file":"tokens/fingolfin.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":4,"defence":6,"attacks":4,"wounds":4,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"fingolfin"},{"id":"imrahil","meta":{"id":"imrahil","name_ko":"임라힐","name_en":"Imrahil","side":"good","faction":"gondor","role":"hero","weapon":"lance","base":"M","sheet":"roster-legends-good-v1.png","file":"tokens/imrahil.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":1.05},"profile":{"move":270,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"imrahil"},{"id":"merry","meta":{"id":"merry","name_ko":"메리아독","name_en":"Meriadoc Brandybuck","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-legends-good-v1.png","file":"tokens/merry.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.5},"profile":{"move":230,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"merry"},{"id":"pippin","meta":{"id":"pippin","name_ko":"피핀","name_en":"Peregrin Took","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-legends-good-v1.png","file":"tokens/pippin.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.5},"profile":{"move":230,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"pippin"},{"id":"beorn","meta":{"id":"beorn","name_ko":"베오른","name_en":"Beorn","side":"good","faction":"beorning","role":"hero","weapon":"twohanded","base":"L","sheet":"roster-legends-good-v1.png","file":"tokens/beorn.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":6,"defence":6,"attacks":3,"wounds":4,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","monster"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"beorn"},{"id":"elendil","meta":{"id":"elendil","name_ko":"엘렌딜","name_en":"Elendil","side":"good","faction":"arnor","role":"hero","weapon":"sword","base":"L","sheet":"roster-legends-good-v1.png","file":"tokens/elendil.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"elendil"},{"id":"melkor","meta":{"id":"melkor","name_ko":"멜코르","name_en":"Melkor (Morgoth)","side":"evil","faction":"angband","role":"monster","weapon":"mace","base":"XXL","sheet":"roster-legends-evil-v1.png","file":"tokens/melkor.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":230,"fight":10,"strength":9,"defence":9,"attacks":5,"wounds":16,"courage":10,"shootValue":0,"shootRange":0,"might":6,"will":12,"fate":6,"traits":["hero","monster","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary","uniqueKey":"melkor"},{"id":"mumakil","meta":{"id":"mumakil","name_ko":"무마킬","name_en":"War Mumak","side":"evil","faction":"harad","role":"monster","weapon":"none","base":"XXL","sheet":"roster-legends-evil-v1.png","file":"tokens/mumakil.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":340,"fight":7,"strength":8,"defence":8,"attacks":5,"wounds":8,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"smaug","meta":{"id":"smaug","name_ko":"스마우그","name_en":"Smaug","side":"evil","faction":"erebor","role":"monster","weapon":"none","base":"XXL","sheet":"roster-legends-evil-v1.png","file":"tokens/smaug.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":460,"fight":8,"strength":7,"defence":8,"attacks":5,"wounds":9,"courage":8,"shootValue":4,"shootRange":240,"might":0,"will":0,"fate":0,"traits":["monster","flying","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary"},{"id":"ungoliant","meta":{"id":"ungoliant","name_ko":"웅골리안트","name_en":"Ungoliant","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"XXL","sheet":"roster-legends-evil-v1.png","file":"tokens/ungoliant.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":300,"fight":8,"strength":7,"defence":8,"attacks":6,"wounds":10,"courage":9,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary"},{"id":"bolg","meta":{"id":"bolg","name_ko":"볼그","name_en":"Bolg","side":"evil","faction":"gundabad","role":"hero","weapon":"mace","base":"L","sheet":"roster-legends-evil-v1.png","file":"tokens/bolg.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":6,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"bolg"},{"id":"easterling_warlord","meta":{"id":"easterling_warlord","name_ko":"이스터링 장군","name_en":"Easterling Warlord","side":"evil","faction":"easterling","role":"hero","weapon":"pike","base":"M","sheet":"roster-legends-evil-v1.png","file":"tokens/easterling_warlord.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"easterling_warlord"},{"id":"radagast","meta":{"id":"radagast","name_ko":"라다가스트","name_en":"Radagast the Brown","side":"good","faction":"maiar","role":"hero","weapon":"staff","base":"M","sheet":"roster-legends-good-v2.png","file":"tokens/radagast.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":4,"strength":3,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":8,"fate":4,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"radagast"},{"id":"thranduil","meta":{"id":"thranduil","name_ko":"트란두일","name_en":"Thranduil","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-legends-good-v2.png","file":"tokens/thranduil.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"thranduil"},{"id":"celeborn","meta":{"id":"celeborn","name_ko":"켈레보른","name_en":"Celeborn","side":"good","faction":"lothlorien","role":"hero","weapon":"spear","base":"M","sheet":"roster-legends-good-v2.png","file":"tokens/celeborn.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","spear"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"celeborn"},{"id":"bilbo","meta":{"id":"bilbo","name_ko":"빌보","name_en":"Bilbo Baggins","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"S","sheet":"roster-legends-good-v2.png","file":"tokens/bilbo.png","visualBase":"S","visualRadius":34,"baseMm":25,"artScale":0.5},"profile":{"move":230,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"bilbo"},{"id":"king_of_the_dead","meta":{"id":"king_of_the_dead","name_ko":"망자의 왕","name_en":"King of the Dead","side":"good","faction":"dead","role":"hero","weapon":"sword","base":"L","sheet":"roster-legends-good-v2.png","file":"tokens/king_of_the_dead.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","terror"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"king_of_the_dead"},{"id":"dead_soldier","meta":{"id":"dead_soldier","name_ko":"망자 병사","name_en":"Soldier of the Dead","side":"good","faction":"dead","role":"infantry","weapon":"spear","base":"M","sheet":"roster-legends-good-v2.png","file":"tokens/dead_soldier.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["terror","spear"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"olog_hai","meta":{"id":"olog_hai","name_ko":"올로그하이","name_en":"Olog-hai","side":"evil","faction":"mordor","role":"monster","weapon":"mace","base":"XXL","sheet":"roster-legends-evil-v2.png","file":"tokens/olog_hai.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":300,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":4,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"watcher_in_the_water","meta":{"id":"watcher_in_the_water","name_ko":"물 속의 감시자","name_en":"Watcher in the Water","side":"evil","faction":"moria","role":"monster","weapon":"none","base":"XXL","sheet":"roster-legends-evil-v2.png","file":"tokens/watcher_in_the_water.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":280,"fight":6,"strength":7,"defence":7,"attacks":4,"wounds":5,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"mirkwood_spider","meta":{"id":"mirkwood_spider","name_ko":"미르크우드 거미","name_en":"Mirkwood Spider","side":"evil","faction":"dol_guldur","role":"monster","weapon":"none","base":"L","sheet":"roster-legends-evil-v2.png","file":"tokens/mirkwood_spider.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":300,"fight":4,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"harad_chieftain","meta":{"id":"harad_chieftain","name_ko":"하라드 족장","name_en":"Haradrim Chieftain","side":"evil","faction":"harad","role":"hero","weapon":"sword","base":"M","sheet":"roster-legends-evil-v2.png","file":"tokens/harad_chieftain.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"harad_chieftain"},{"id":"uruk_captain","meta":{"id":"uruk_captain","name_ko":"우룩하이 대장","name_en":"Uruk-hai Captain","side":"evil","faction":"isengard","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-legends-evil-v2.png","file":"tokens/uruk_captain.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"uruk_captain"},{"id":"hill_troll","meta":{"id":"hill_troll","name_ko":"언덕 트롤","name_en":"Hill Troll","side":"evil","faction":"angmar","role":"monster","weapon":"club","base":"XL","sheet":"roster-legends-evil-v2.png","file":"tokens/hill_troll.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":300,"fight":6,"strength":7,"defence":7,"attacks":3,"wounds":3,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"feanor","meta":{"id":"feanor","name_ko":"페아노르","name_en":"Feanor","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/feanor.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":8,"strength":5,"defence":6,"attacks":4,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"feanor"},{"id":"luthien","meta":{"id":"luthien","name_ko":"루시엔","name_en":"Luthien","side":"good","faction":"doriath","role":"hero","weapon":"staff","base":"M","sheet":"roster-silmarillion-good-v1.png","file":"tokens/luthien.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":3,"strength":2,"defence":5,"attacks":1,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"luthien"},{"id":"beren","meta":{"id":"beren","name_ko":"베렌","name_en":"Beren","side":"good","faction":"men","role":"hero","weapon":"sword","base":"M","sheet":"roster-silmarillion-good-v1.png","file":"tokens/beren.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":5,"strength":4,"defence":4,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"beren"},{"id":"turin","meta":{"id":"turin","name_ko":"투린","name_en":"Turin Turambar","side":"good","faction":"men","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/turin.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"turin"},{"id":"beleg","meta":{"id":"beleg","name_ko":"벨레그","name_en":"Beleg Strongbow","side":"good","faction":"doriath","role":"hero","weapon":"bow","base":"M","sheet":"roster-silmarillion-good-v1.png","file":"tokens/beleg.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":290,"fight":5,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":3,"shootRange":850,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"beleg"},{"id":"huan","meta":{"id":"huan","name_ko":"훈","name_en":"Huan the Hound","side":"good","faction":"valinor","role":"beast","weapon":"none","base":"L","sheet":"roster-silmarillion-good-v1.png","file":"tokens/huan.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":330,"fight":6,"strength":5,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["beast","hero"]},"recruitable":true,"unlockWave":4,"rarity":"legendary"},{"id":"glaurung","meta":{"id":"glaurung","name_ko":"글라우룽","name_en":"Glaurung","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"XXL","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/glaurung.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":320,"fight":8,"strength":7,"defence":8,"attacks":5,"wounds":8,"courage":8,"shootValue":4,"shootRange":240,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"carcharoth","meta":{"id":"carcharoth","name_ko":"카르하로스","name_en":"Carcharoth","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"L","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/carcharoth.png","visualBase":"L","visualRadius":47,"baseMm":40,"artScale":1.5},"profile":{"move":340,"fight":6,"strength":6,"defence":6,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":1,"traits":["monster","hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"gothmog_balrog","meta":{"id":"gothmog_balrog","name_ko":"고스모그(발록 군주)","name_en":"Gothmog, Lord of Balrogs","side":"evil","faction":"angband","role":"monster","weapon":"whip","base":"XXL","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/gothmog_balrog.png","visualBase":"XXL","visualRadius":105,"baseMm":70,"artScale":1.5},"profile":{"move":300,"fight":8,"strength":7,"defence":7,"attacks":4,"wounds":8,"courage":8,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary"},{"id":"draugluin","meta":{"id":"draugluin","name_ko":"드라우글루인","name_en":"Draugluin","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"L","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/draugluin.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":340,"fight":6,"strength":5,"defence":6,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"thuringwethil","meta":{"id":"thuringwethil","name_ko":"수링웨실","name_en":"Thuringwethil","side":"evil","faction":"angband","role":"monster","weapon":"none","base":"L","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/thuringwethil.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":430,"fight":5,"strength":4,"defence":6,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"boldog","meta":{"id":"boldog","name_ko":"볼독","name_en":"Boldog","side":"evil","faction":"angband","role":"hero","weapon":"sword","base":"L","sheet":"roster-silmarillion-evil-v1.png","file":"tokens/boldog.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":6,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"boldog"},{"id":"thorin","meta":{"id":"thorin","name_ko":"토린 오큰실드","name_en":"Thorin Oakenshield","side":"good","faction":"dwarf","role":"hero","weapon":"sword","base":"L","sheet":"roster-hobbit-good-v1.png","file":"tokens/thorin.png","visualBase":"L","visualRadius":47,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"thorin"},{"id":"tauriel","meta":{"id":"tauriel","name_ko":"타우리엘","name_en":"Tauriel","side":"good","faction":"elf","role":"hero","weapon":"dagger","base":"M","sheet":"roster-hobbit-good-v1.png","file":"tokens/tauriel.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":290,"fight":5,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":3,"shootRange":820,"might":2,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"tauriel"},{"id":"bard","meta":{"id":"bard","name_ko":"바드","name_en":"Bard the Bowman","side":"good","faction":"men","role":"hero","weapon":"bow","base":"M","sheet":"roster-hobbit-good-v1.png","file":"tokens/bard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":3,"shootRange":830,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"bard"},{"id":"dain","meta":{"id":"dain","name_ko":"데인","name_en":"Dain Ironfoot","side":"good","faction":"dwarf","role":"hero","weapon":"mace","base":"L","sheet":"roster-hobbit-good-v1.png","file":"tokens/dain.png","visualBase":"L","visualRadius":47,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"dain"},{"id":"fili","meta":{"id":"fili","name_ko":"필리","name_en":"Fili","side":"good","faction":"dwarf","role":"hero","weapon":"sword","base":"M","sheet":"roster-hobbit-good-v1.png","file":"tokens/fili.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":5,"strength":3,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"fili"},{"id":"kili","meta":{"id":"kili","name_ko":"킬리","name_en":"Kili","side":"good","faction":"dwarf","role":"hero","weapon":"bow","base":"M","sheet":"roster-hobbit-good-v1.png","file":"tokens/kili.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":5,"strength":3,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":3,"shootRange":760,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"kili"},{"id":"azog","meta":{"id":"azog","name_ko":"아조그","name_en":"Azog the Defiler","side":"evil","faction":"gundabad","role":"hero","weapon":"mace","base":"L","sheet":"roster-hobbit-evil-v1.png","file":"tokens/azog.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":7,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"azog"},{"id":"azog_warg_rider","meta":{"id":"azog_warg_rider","name_ko":"아조그(흰 와르그)","name_en":"Azog on white warg","side":"evil","faction":"gundabad","role":"cavalry","weapon":"mace","base":"XL","sheet":"roster-hobbit-evil-v1.png","file":"tokens/azog_warg_rider.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":7,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"azog"},{"id":"necromancer","meta":{"id":"necromancer","name_ko":"네크로맨서","name_en":"The Necromancer","side":"evil","faction":"dol_guldur","role":"hero","weapon":"staff","base":"L","sheet":"roster-hobbit-evil-v1.png","file":"tokens/necromancer.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":8,"fate":3,"traits":["hero","wizard","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"necromancer"},{"id":"hunter_orc","meta":{"id":"hunter_orc","name_ko":"헌터 오크","name_en":"Hunter Orc","side":"evil","faction":"gundabad","role":"infantry","weapon":"bow","base":"M","sheet":"roster-hobbit-evil-v1.png","file":"tokens/hunter_orc.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":3,"shootValue":5,"shootRange":720,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"gundabad_orc","meta":{"id":"gundabad_orc","name_ko":"군다바드 오크","name_en":"Gundabad Orc","side":"evil","faction":"gundabad","role":"infantry","weapon":"sword_shield","base":"M","sheet":"roster-hobbit-evil-v1.png","file":"tokens/gundabad_orc.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"goblin_mercenary","meta":{"id":"goblin_mercenary","name_ko":"고블린 용병","name_en":"Goblin Mercenary","side":"evil","faction":"moria","role":"infantry","weapon":"club","base":"M","sheet":"roster-hobbit-evil-v1.png","file":"tokens/goblin_mercenary.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.9},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"halbarad","meta":{"id":"halbarad","name_ko":"할바라드","name_en":"Halbarad","side":"good","faction":"arnor","role":"hero","weapon":"banner","base":"L","sheet":"roster-exp-good-v1.png","file":"tokens/halbarad.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"halbarad"},{"id":"beregond","meta":{"id":"beregond","name_ko":"베레곤드","name_en":"Beregond","side":"good","faction":"gondor","role":"hero","weapon":"sword_shield","base":"M","sheet":"roster-exp-good-v1.png","file":"tokens/beregond.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"beregond"},{"id":"elladan","meta":{"id":"elladan","name_ko":"엘라단","name_en":"Elladan","side":"good","faction":"rivendell","role":"hero","weapon":"sword","base":"M","sheet":"roster-exp-good-v1.png","file":"tokens/elladan.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":3,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"elladan"},{"id":"elrohir","meta":{"id":"elrohir","name_ko":"엘로히르","name_en":"Elrohir","side":"good","faction":"rivendell","role":"hero","weapon":"spear","base":"M","sheet":"roster-exp-good-v1.png","file":"tokens/elrohir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":3,"fate":2,"traits":["hero","spear"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"elrohir"},{"id":"grimbeorn","meta":{"id":"grimbeorn","name_ko":"그림베오른","name_en":"Grimbeorn","side":"good","faction":"beorning","role":"hero","weapon":"axe","base":"L","sheet":"roster-exp-good-v1.png","file":"tokens/grimbeorn.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"grimbeorn"},{"id":"ghan_buri_ghan","meta":{"id":"ghan_buri_ghan","name_ko":"간부리간","name_en":"Ghan-buri-Ghan","side":"good","faction":"men","role":"infantry","weapon":"bow","base":"S","sheet":"roster-exp-good-v1.png","file":"tokens/ghan_buri_ghan.png","visualBase":"S","visualRadius":34,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":3,"shootRange":830,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"suladan","meta":{"id":"suladan","name_ko":"술라단","name_en":"Suladan the Serpent Lord","side":"evil","faction":"harad","role":"hero","weapon":"spear","base":"L","sheet":"roster-exp-evil-v1.png","file":"tokens/suladan.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"suladan"},{"id":"corsair_umbra","meta":{"id":"corsair_umbra","name_ko":"움바르 해적","name_en":"Corsair of Umbar","side":"evil","faction":"harad","role":"infantry","weapon":"sword","base":"M","sheet":"roster-exp-evil-v1.png","file":"tokens/corsair_umbra.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"variag_horseman","meta":{"id":"variag_horseman","name_ko":"바리악 기수","name_en":"Variag Horseman","side":"evil","faction":"rhun","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/variag_horseman.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"shagrat","meta":{"id":"shagrat","name_ko":"샤그랏","name_en":"Shagrat","side":"evil","faction":"mordor","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-exp-evil-v1.png","file":"tokens/shagrat.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":260,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"shagrat"},{"id":"gorbag","meta":{"id":"gorbag","name_ko":"고르바그","name_en":"Gorbag","side":"evil","faction":"mordor","role":"hero","weapon":"sword","base":"M","sheet":"roster-exp-evil-v1.png","file":"tokens/gorbag.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":255,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"gorbag"},{"id":"warg_alpha","meta":{"id":"warg_alpha","name_ko":"와르그 우두머리","name_en":"Warg Alpha","side":"evil","faction":"isengard","role":"beast","weapon":"none","base":"XL","sheet":"roster-exp-evil-v1.png","file":"tokens/warg_alpha.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"balin","meta":{"id":"balin","name_ko":"발린","name_en":"Balin","side":"good","faction":"dwarf","role":"hero","weapon":"sword","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/balin.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":5,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"balin"},{"id":"dwalin","meta":{"id":"dwalin","name_ko":"드왈린","name_en":"Dwalin","side":"good","faction":"dwarf","role":"hero","weapon":"axe","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/dwalin.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":5,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"dwalin"},{"id":"gloin","meta":{"id":"gloin","name_ko":"글로인","name_en":"Gloin","side":"good","faction":"dwarf","role":"infantry","weapon":"axe","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/gloin.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"gloin"},{"id":"oin","meta":{"id":"oin","name_ko":"오인","name_en":"Oin","side":"good","faction":"dwarf","role":"infantry","weapon":"club","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/oin.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"oin"},{"id":"nori","meta":{"id":"nori","name_ko":"노리","name_en":"Nori","side":"good","faction":"dwarf","role":"infantry","weapon":"sword","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/nori.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":3,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"nori"},{"id":"ori","meta":{"id":"ori","name_ko":"오리","name_en":"Ori","side":"good","faction":"dwarf","role":"infantry","weapon":"sword","base":"M","sheet":"roster-hobbit-company-v1.png","file":"tokens/ori.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":3,"defence":6,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"ori"},{"id":"dori","meta":{"id":"dori","name_ko":"도리","name_en":"Dori","side":"good","faction":"dwarf","role":"infantry","weapon":"sword","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/dori.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"dori"},{"id":"bifur","meta":{"id":"bifur","name_ko":"비푸르","name_en":"Bifur","side":"good","faction":"dwarf","role":"infantry","weapon":"spear","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/bifur.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"bifur"},{"id":"bofur","meta":{"id":"bofur","name_ko":"보푸르","name_en":"Bofur","side":"good","faction":"dwarf","role":"infantry","weapon":"club","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/bofur.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":240,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"bofur"},{"id":"bombur","meta":{"id":"bombur","name_ko":"봄부르","name_en":"Bombur","side":"good","faction":"dwarf","role":"infantry","weapon":"club","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/bombur.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":230,"fight":4,"strength":4,"defence":7,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"bombur"},{"id":"goat_rider","meta":{"id":"goat_rider","name_ko":"산양 기수","name_en":"Iron Hills Goat Rider","side":"good","faction":"dwarf","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-hobbit-exp-v1.png","file":"tokens/goat_rider.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":0.85},"profile":{"move":430,"fight":4,"strength":4,"defence":7,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["dwarf","mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"gollum","meta":{"id":"gollum","name_ko":"골룸","name_en":"Gollum","side":"evil","faction":"moria","role":"beast","weapon":"none","base":"M","sheet":"roster-hobbit-exp-v1.png","file":"tokens/gollum.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":300,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"gil_galad","meta":{"id":"gil_galad","name_ko":"길갈라드","name_en":"Gil-galad","side":"good","faction":"elf","role":"hero","weapon":"spear","base":"L","sheet":"roster-elf-exp-v1.png","file":"tokens/gil_galad.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":7,"strength":5,"defence":6,"attacks":4,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","spear"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"gil_galad"},{"id":"cirdan","meta":{"id":"cirdan","name_ko":"키르단","name_en":"Cirdan the Shipwright","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"roster-elf-exp-v1.png","file":"tokens/cirdan.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":6,"fate":2,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"cirdan"},{"id":"arwen","meta":{"id":"arwen","name_ko":"아르웬","name_en":"Arwen","side":"good","faction":"rivendell","role":"hero","weapon":"dagger","base":"M","sheet":"roster-elf-exp-v1.png","file":"tokens/arwen.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":5,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"arwen"},{"id":"lindir","meta":{"id":"lindir","name_ko":"린디르","name_en":"Lindir","side":"good","faction":"rivendell","role":"hero","weapon":"sword","base":"M","sheet":"roster-elf-exp-v1.png","file":"tokens/lindir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":3,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"lindir"},{"id":"erestor","meta":{"id":"erestor","name_ko":"에레스토르","name_en":"Erestor","side":"good","faction":"rivendell","role":"hero","weapon":"sword","base":"M","sheet":"roster-elf-exp-v1.png","file":"tokens/erestor.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":5,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"erestor"},{"id":"elf_seer","meta":{"id":"elf_seer","name_ko":"엘프 선견자","name_en":"Elf Seer","side":"good","faction":"lothlorien","role":"support","weapon":"staff","base":"M","sheet":"roster-elf-exp-v1.png","file":"tokens/elf_seer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":4,"fate":2,"traits":["support","wizard"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"rumil","meta":{"id":"rumil","name_ko":"루밀","name_en":"Rumil","side":"good","faction":"lothlorien","role":"hero","weapon":"bow","base":"M","sheet":"roster-elf-exp-v2.png","file":"tokens/rumil.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":3,"shootRange":830,"might":2,"will":3,"fate":2,"traits":["elf","hero"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"orophin","meta":{"id":"orophin","name_ko":"오로핀","name_en":"Orophin","side":"good","faction":"lothlorien","role":"hero","weapon":"spear","base":"M","sheet":"roster-elf-exp-v2.png","file":"tokens/orophin.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["elf","spear","hero"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"mirkwood_sentinel","meta":{"id":"mirkwood_sentinel","name_ko":"미르크우드 보초","name_en":"Mirkwood Sentinel","side":"good","faction":"elf","role":"infantry","weapon":"pike","base":"M","sheet":"roster-elf-exp-v2.png","file":"tokens/mirkwood_sentinel.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf","spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"noldor_warrior","meta":{"id":"noldor_warrior","name_ko":"놀도르 정예병","name_en":"Noldor Warrior","side":"good","faction":"elf","role":"infantry","weapon":"sword_shield","base":"L","sheet":"roster-elf-exp-v2.png","file":"tokens/noldor_warrior.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"elite"},{"id":"silvan_archer","meta":{"id":"silvan_archer","name_ko":"실반 궁수","name_en":"Silvan Archer","side":"good","faction":"elf","role":"infantry","weapon":"bow","base":"M","sheet":"roster-elf-exp-v2.png","file":"tokens/silvan_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":6,"shootValue":3,"shootRange":830,"might":0,"will":0,"fate":0,"traits":["elf"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"elven_lancer","meta":{"id":"elven_lancer","name_ko":"엘프 기창기병","name_en":"Elven Lancer","side":"good","faction":"rivendell","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-elf-exp-v2.png","file":"tokens/elven_lancer.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf","mounted"]},"recruitable":true,"unlockWave":1,"rarity":"elite"},{"id":"imrahil_mounted","meta":{"id":"imrahil_mounted","name_ko":"임라힐(기마)","name_en":"Prince Imrahil, mounted","side":"good","faction":"gondor","role":"cavalry","weapon":"lance","base":"XL","sheet":"roster-mounted-heroes-v1.png","file":"tokens/imrahil_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.05},"profile":{"move":440,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"imrahil"},{"id":"gandalf_mounted","meta":{"id":"gandalf_mounted","name_ko":"간달프(섀도우팩스)","name_en":"Gandalf on Shadowfax","side":"good","faction":"maiar","role":"hero","weapon":"sword","base":"XL","sheet":"roster-mounted-heroes-v1.png","file":"tokens/gandalf_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":6,"fate":6,"traits":["hero","mounted","wizard"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"gandalf"},{"id":"thranduil_mounted","meta":{"id":"thranduil_mounted","name_ko":"스란두일(기마)","name_en":"Thranduil, mounted","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"XL","sheet":"roster-mounted-heroes-v1.png","file":"tokens/thranduil_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"thranduil"},{"id":"aragorn_mounted","meta":{"id":"aragorn_mounted","name_ko":"아라곤(기마)","name_en":"Aragorn, mounted","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"XL","sheet":"roster-mounted-heroes-v1.png","file":"tokens/aragorn_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"aragorn"},{"id":"blackroot_archer","meta":{"id":"blackroot_archer","name_ko":"검은뿌리골 궁수","name_en":"Blackroot Vale Archer","side":"good","faction":"gondor","role":"infantry","weapon":"bow","base":"M","sheet":"roster-mounted-heroes-v1.png","file":"tokens/blackroot_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"half_troll","meta":{"id":"half_troll","name_ko":"하프 트롤","name_en":"Half-Troll of Far Harad","side":"evil","faction":"harad","role":"monster","weapon":"club","base":"L","sheet":"roster-mordor-monsters-v1.png","file":"tokens/half_troll.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":280,"fight":5,"strength":5,"defence":6,"attacks":2,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"cave_drake","meta":{"id":"cave_drake","name_ko":"동굴 드레이크","name_en":"Cave Drake","side":"evil","faction":"moria","role":"monster","weapon":"none","base":"XL","sheet":"roster-mordor-monsters-v1.png","file":"tokens/cave_drake.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":340,"fight":6,"strength":5,"defence":7,"attacks":3,"wounds":4,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"bat_swarm","meta":{"id":"bat_swarm","name_ko":"박쥐 떼","name_en":"Bat Swarm","side":"evil","faction":"dol_guldur","role":"monster","weapon":"none","base":"M","sheet":"roster-mordor-monsters-v1.png","file":"tokens/bat_swarm.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":420,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":4,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"muzgur","meta":{"id":"muzgur","name_ko":"무즈구르","name_en":"Muzgur, Morgul Shaman","side":"evil","faction":"angmar","role":"hero","weapon":"staff","base":"M","sheet":"roster-mordor-monsters-v1.png","file":"tokens/muzgur.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":1,"will":8,"fate":2,"traits":["hero","wizard","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"muzgur"},{"id":"buhrdur","meta":{"id":"buhrdur","name_ko":"부르두르","name_en":"Buhrdur, Troll Chieftain","side":"evil","faction":"angmar","role":"monster","weapon":"mace","base":"XL","sheet":"roster-mordor-monsters-v1.png","file":"tokens/buhrdur.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":300,"fight":6,"strength":7,"defence":7,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"mahud_chieftain","meta":{"id":"mahud_chieftain","name_ko":"마후드 족장","name_en":"Mahud War-Chieftain","side":"evil","faction":"harad","role":"hero","weapon":"spear","base":"L","sheet":"roster-mordor-monsters-v1.png","file":"tokens/mahud_chieftain.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"mahud_chieftain"},{"id":"eowyn_mounted","meta":{"id":"eowyn_mounted","name_ko":"에오윈(기마)","name_en":"Eowyn, mounted","side":"good","faction":"rohan","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-west-heroes-v1.png","file":"tokens/eowyn_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"eowyn"},{"id":"forlong","meta":{"id":"forlong","name_ko":"포를롱","name_en":"Forlong the Fat","side":"good","faction":"gondor","role":"hero","weapon":"axe","base":"L","sheet":"roster-west-heroes-v1.png","file":"tokens/forlong.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"forlong"},{"id":"erkenbrand","meta":{"id":"erkenbrand","name_ko":"에르켄브란트","name_en":"Erkenbrand","side":"good","faction":"rohan","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-west-heroes-v1.png","file":"tokens/erkenbrand.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"erkenbrand"},{"id":"damrod","meta":{"id":"damrod","name_ko":"담로드","name_en":"Damrod","side":"good","faction":"gondor","role":"hero","weapon":"bow","base":"M","sheet":"roster-west-heroes-v1.png","file":"tokens/damrod.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":3,"shootRange":800,"might":2,"will":2,"fate":2,"traits":["hero","ranger"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"damrod"},{"id":"mablung","meta":{"id":"mablung","name_ko":"마블룽","name_en":"Mablung","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"M","sheet":"roster-west-heroes-v1.png","file":"tokens/mablung.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":3,"shootRange":800,"might":2,"will":2,"fate":2,"traits":["hero","ranger"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"mablung"},{"id":"duinhir","meta":{"id":"duinhir","name_ko":"두인히르","name_en":"Duinhir of Blackroot","side":"good","faction":"gondor","role":"hero","weapon":"bow","base":"M","sheet":"roster-west-heroes-v1.png","file":"tokens/duinhir.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":4,"shootRange":780,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"duinhir"},{"id":"ugluk","meta":{"id":"ugluk","name_ko":"우글룩","name_en":"Ugluk","side":"evil","faction":"isengard","role":"hero","weapon":"sword","base":"L","sheet":"roster-east-monsters-v1.png","file":"tokens/ugluk.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"ugluk"},{"id":"mauhur","meta":{"id":"mauhur","name_ko":"마우후르","name_en":"Mauhur","side":"evil","faction":"isengard","role":"hero","weapon":"sword","base":"M","sheet":"roster-east-monsters-v1.png","file":"tokens/mauhur.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"mauhur"},{"id":"vrasku","meta":{"id":"vrasku","name_ko":"브라스쿠","name_en":"Vrasku","side":"evil","faction":"isengard","role":"hero","weapon":"bow","base":"M","sheet":"roster-east-monsters-v1.png","file":"tokens/vrasku.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":4,"shootRange":760,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"vrasku"},{"id":"stone_troll","meta":{"id":"stone_troll","name_ko":"돌 트롤","name_en":"Stone Troll","side":"evil","faction":"angmar","role":"monster","weapon":"club","base":"XL","sheet":"roster-east-monsters-v1.png","file":"tokens/stone_troll.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":300,"fight":6,"strength":7,"defence":7,"attacks":3,"wounds":3,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"werewolf","meta":{"id":"werewolf","name_ko":"웨어울프","name_en":"Werewolf","side":"evil","faction":"mordor","role":"beast","weapon":"none","base":"L","sheet":"roster-east-monsters-v1.png","file":"tokens/werewolf.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":340,"fight":5,"strength":5,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"gulavhar","meta":{"id":"gulavhar","name_ko":"굴라브하르","name_en":"Gulavhar, the Vampire","side":"evil","faction":"angmar","role":"monster","weapon":"none","base":"XXL","sheet":"roster-east-monsters-v1.png","file":"tokens/gulavhar.png","visualBase":"XXL","visualRadius":105,"baseMm":70},"profile":{"move":320,"fight":7,"strength":6,"defence":7,"attacks":4,"wounds":4,"courage":8,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"epic"},{"id":"dark_marshal","meta":{"id":"dark_marshal","name_ko":"어둠의 장군","name_en":"The Dark Marshal","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/dark_marshal.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"dark_marshal"},{"id":"shadow_lord","meta":{"id":"shadow_lord","name_ko":"그림자 군주","name_en":"The Shadow Lord","side":"evil","faction":"angmar","role":"hero","weapon":"sword","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/shadow_lord.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"shadow_lord"},{"id":"betrayer","meta":{"id":"betrayer","name_ko":"배신자","name_en":"The Betrayer","side":"evil","faction":"angmar","role":"hero","weapon":"mace","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/betrayer.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"betrayer"},{"id":"tainted","meta":{"id":"tainted","name_ko":"타락한 자","name_en":"The Tainted","side":"evil","faction":"angmar","role":"hero","weapon":"dagger","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/tainted.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"tainted"},{"id":"undying","meta":{"id":"undying","name_ko":"죽지 않는 자","name_en":"The Undying","side":"evil","faction":"angmar","role":"hero","weapon":"staff","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/undying.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero","wizard","terror"]},"recruitable":false,"unlockWave":0,"rarity":"epic","uniqueKey":"undying"},{"id":"knight_of_umbar","meta":{"id":"knight_of_umbar","name_ko":"움바르의 기사","name_en":"Knight of Umbar","side":"evil","faction":"harad","role":"hero","weapon":"spear","base":"L","sheet":"roster-nazgul-nine-v1.png","file":"tokens/knight_of_umbar.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","spear"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"knight_of_umbar"},{"id":"isildur","meta":{"id":"isildur","name_ko":"이실두르","name_en":"Isildur","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"roster-good-fill-v1.png","file":"tokens/isildur.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"isildur"},{"id":"gandalf_white","meta":{"id":"gandalf_white","name_ko":"간달프(백색)","name_en":"Gandalf the White","side":"good","faction":"maiar","role":"hero","weapon":"staff","base":"L","sheet":"roster-good-fill-v1.png","file":"tokens/gandalf_white.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":280,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":4,"will":7,"fate":6,"traits":["hero","wizard"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"gandalf_white"},{"id":"denethor","meta":{"id":"denethor","name_ko":"데네소르","name_en":"Denethor, Steward of Gondor","side":"good","faction":"gondor","role":"hero","weapon":"none","base":"M","sheet":"roster-good-fill-v1.png","file":"tokens/denethor.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":240,"fight":2,"strength":2,"defence":4,"attacks":1,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":4,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"denethor"},{"id":"huorn","meta":{"id":"huorn","name_ko":"휘오른","name_en":"Huorn","side":"good","faction":"fangorn","role":"monster","weapon":"","base":"XL","sheet":"roster-good-fill-v1.png","file":"tokens/huorn.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":280,"fight":6,"strength":6,"defence":7,"attacks":2,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":true,"unlockWave":4,"rarity":"elite"},{"id":"boromir_mounted","meta":{"id":"boromir_mounted","name_ko":"보로미르(기마)","name_en":"Boromir, mounted","side":"good","faction":"gondor","role":"cavalry","weapon":"sword_shield","base":"XL","sheet":"roster-good-fill-v1.png","file":"tokens/boromir_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"boromir"},{"id":"elrond_mounted","meta":{"id":"elrond_mounted","name_ko":"엘론드(기마)","name_en":"Elrond, mounted","side":"good","faction":"rivendell","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-good-fill-v1.png","file":"tokens/elrond_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":0.95},"profile":{"move":430,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":6,"fate":3,"traits":["hero","mounted","wizard"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"elrond"},{"id":"gandalf_white_mounted","meta":{"id":"gandalf_white_mounted","name_ko":"간달프 백색(기마)","name_en":"Gandalf the White on Shadowfax","side":"good","faction":"maiar","role":"cavalry","weapon":"staff","base":"XL","sheet":"roster-good-fill-v2.png","file":"tokens/gandalf_white_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":440,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":4,"will":7,"fate":6,"traits":["hero","mounted","wizard"]},"recruitable":true,"unlockWave":2,"rarity":"rare","uniqueKey":"gandalf_white"},{"id":"theoden_foot","meta":{"id":"theoden_foot","name_ko":"세오덴(도보)","name_en":"Theoden on foot","side":"good","faction":"rohan","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-good-fill-v2.png","file":"tokens/theoden_foot.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"theoden"},{"id":"dain_boar","meta":{"id":"dain_boar","name_ko":"다인(맷돼지)","name_en":"Dain Ironfoot on war boar","side":"good","faction":"dwarf","role":"cavalry","weapon":"mace","base":"XL","sheet":"roster-good-fill-v2.png","file":"tokens/dain_boar.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":0.85},"profile":{"move":420,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"dain"},{"id":"faramir_mounted","meta":{"id":"faramir_mounted","name_ko":"파라미르(기마)","name_en":"Faramir, mounted","side":"good","faction":"gondor","role":"cavalry","weapon":"sword","base":"XL","sheet":"roster-good-fill-v2.png","file":"tokens/faramir_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"faramir"},{"id":"eomer_foot","meta":{"id":"eomer_foot","name_ko":"에오메르(도보)","name_en":"Eomer on foot","side":"good","faction":"rohan","role":"hero","weapon":"spear","base":"L","sheet":"roster-good-fill-v2.png","file":"tokens/eomer_foot.png","visualBase":"L","visualRadius":47,"baseMm":25,"artScale":1.05},"profile":{"move":270,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","spear"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"eomer"},{"id":"elfhelm","meta":{"id":"elfhelm","name_ko":"엘프헬름","name_en":"Elfhelm of Rohan","side":"good","faction":"rohan","role":"hero","weapon":"sword_shield","base":"L","sheet":"roster-good-fill-v2.png","file":"tokens/elfhelm.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":270,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":3,"rarity":"epic","uniqueKey":"elfhelm"},{"id":"warg_rider_spear","meta":{"id":"warg_rider_spear","name_ko":"와르그 기병(창)","name_en":"Warg Rider, spear","side":"evil","faction":"isengard","role":"cavalry","weapon":"spear","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/warg_rider_spear.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"warg_rider_bow","meta":{"id":"warg_rider_bow","name_ko":"와르그 기병(활)","name_en":"Warg Rider, bow","side":"evil","faction":"isengard","role":"cavalry","weapon":"bow","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/warg_rider_bow.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"warg_chieftain","meta":{"id":"warg_chieftain","name_ko":"와르그 우두머리 기병","name_en":"Warg Chieftain","side":"evil","faction":"isengard","role":"hero","weapon":"axe","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/warg_chieftain.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":420,"fight":5,"strength":5,"defence":5,"attacks":3,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","mounted"]},"recruitable":false,"unlockWave":0,"rarity":"rare","uniqueKey":"warg_chieftain"},{"id":"wild_warg","meta":{"id":"wild_warg","name_ko":"야생 와르그","name_en":"Wild Warg","side":"evil","faction":"isengard","role":"monster","weapon":"claws","base":"L","sheet":"roster-warg-riders-v1.png","file":"tokens/wild_warg.png","visualBase":"L","visualRadius":47,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast","monster"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"wild_warg_alpha","meta":{"id":"wild_warg_alpha","name_ko":"와르그 우두머리","name_en":"Warg Alpha","side":"evil","faction":"isengard","role":"monster","weapon":"claws","base":"XL","sheet":"roster-warg-riders-v1.png","file":"tokens/wild_warg_alpha.png","visualBase":"XL","visualRadius":62,"baseMm":40},"profile":{"move":430,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["beast","monster"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"ancalagon","meta":{"id":"ancalagon","name_ko":"앙칼라곤","name_en":"Ancalagon the Black","side":"evil","faction":"angband","role":"monster","weapon":"claws","base":"XXL","sheet":"single-ancalagon.png","file":"tokens/ancalagon.png","visualBase":"XXL","visualRadius":105,"baseMm":70,"artScale":1.5},"profile":{"move":480,"fight":9,"strength":8,"defence":8,"attacks":6,"wounds":10,"courage":9,"shootValue":4,"shootRange":240,"might":0,"will":0,"fate":0,"traits":["monster","flying","terror","boss"]},"recruitable":false,"unlockWave":0,"rarity":"legendary"},{"id":"nazgul_fellbeast","meta":{"id":"nazgul_fellbeast","name_ko":"나즈굴(펠비스트)","name_en":"Ringwraith on Fell Beast","side":"evil","faction":"angmar","role":"monster","weapon":"claws","base":"XXL","sheet":"single-nazgul-fellbeast.png","file":"tokens/nazgul_fellbeast.png","visualBase":"XXL","visualRadius":105,"baseMm":70,"artScale":1.8},"profile":{"move":470,"fight":5,"strength":5,"defence":5,"attacks":3,"wounds":4,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["monster","flying","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"fellbeast","meta":{"id":"fellbeast","name_ko":"펠비스트","name_en":"Fell Beast (riderless)","side":"evil","faction":"angmar","role":"monster","weapon":"claws","base":"XXL","sheet":"suladan-fellbeast.png","file":"tokens/fellbeast.png","visualBase":"XXL","visualRadius":105,"baseMm":70,"artScale":1.8},"profile":{"move":460,"fight":5,"strength":5,"defence":5,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying","terror"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"quickbeam","meta":{"id":"quickbeam","name_ko":"퀵빔","name_en":"Quickbeam","side":"good","faction":"ent","role":"monster","weapon":"none","base":"XL","sheet":"ents.png","file":"tokens/quickbeam.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":300,"fight":7,"strength":7,"defence":8,"attacks":3,"wounds":4,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["monster","terror"]},"recruitable":true,"unlockWave":4,"rarity":"epic"},{"id":"aragorn_blackgate","meta":{"id":"aragorn_blackgate","name_ko":"아라곤(검은문)","name_en":"Aragorn at the Black Gate","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"single-aragorn-blackgate.png","file":"tokens/aragorn_blackgate.png","visualBase":"L","visualRadius":47,"baseMm":25,"artScale":1.05},"profile":{"move":290,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"aragorn"},{"id":"aragorn_blackgate_mounted","meta":{"id":"aragorn_blackgate_mounted","name_ko":"아라곤(검은문·기마)","name_en":"Aragorn at the Black Gate, mounted","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"XL","sheet":"single-aragorn-blackgate-mounted.png","file":"tokens/aragorn_blackgate_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.05},"profile":{"move":430,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":5,"rarity":"legendary","uniqueKey":"aragorn"}];
window.MESBG_STAGE_THEME={"0":{"foot":["orc_sword","orc_sword2","orc_swordshield","moria_goblin","bill_ferny","ruffian"],"spec":["orc_spearman","orc_spear2","orc_archer","orc_bow","kardush","orc_drummer"],"cav":["warg_rider"],"elite":["morannon_orc","orc_twohanded","orc_tracker"],"monster":["mountain_troll"],"hero":["orc_captain","gothmog","shagrat","gorbag","orc_taskmaster","grishnakh","orc_sergeant"]},"1":{"foot":["orc_sword","orc_sword2","moria_goblin","haradrim_spearman","mahud_raider","abrakhan_guard","serpent_guard","watcher_karna"],"spec":["orc_archer","orc_bow","haradrim_bow","haradrim_priest"],"cav":["warg_rider","variag_horseman","camel_rider","haradrim_raider"],"elite":["morannon_orc","haradrim_spear"],"monster":["mountain_troll"],"hero":["orc_captain","harad_chieftain","suladan","gothmog","far_harad_chieftain","mahud_chieftain","amdur"]},"2":{"foot":["moria_goblin","goblin_spear","orc_sword","goblin_shield","gundabad_orc","hunter_orc"],"spec":["goblin_bow","orc_archer"],"cav":["gundabad_warg_rider"],"elite":["barrow_wight","goblin_prowler"],"monster":["hill_troll","stone_troll","watcher_in_the_water","stone_giant"],"hero":["nazgul_sword","khamul","dark_marshal","nazgul_mounted","golfimbul","nazgul_mace","azog_foot","dwimmerlaik"]},"3":{"foot":["uruk_swordshield","uruk_swordshield2","uruk_scout","snaga"],"spec":["uruk_crossbow","uruk_scout_archer","uruk_pike"],"cav":["warg_rider_spear","warg_rider_bow"],"elite":["uruk_berserker","uruk_berserker2","uruk_sapper"],"monster":["warg","wild_warg"],"hero":["uruk_captain","lurtz","ugluk","vrasku","targsh"]},"4":{"foot":["uruk_scout","orc_tracker","moria_goblin","ruffian"],"spec":["uruk_scout_archer","goblin_bow"],"cav":["warg_rider_spear","sharku"],"elite":["uruk_berserker","crebain_swarm"],"monster":["wild_warg","wild_warg_alpha"],"hero":["sharku","warg_chieftain","mauhur","narzug","fimbul"]},"5":{"foot":["dunlending_warrior","orc_sword","corsair_umbra","mahud_raider","corsair_bosun","dunlending_archer"],"spec":["haradrim_bow","orc_archer","mahud_blowpipe","corsair_crossbowman","dunlending_shaman"],"cav":["warg_rider","sharku","camel_rider","mahud_camel_raider","dunlending_horseman"],"elite":["dunlending_huscarl","uruk_swordshield","dunlending_berserker"],"monster":["wild_warg"],"hero":["sharku","harad_chieftain","uruk_captain","corsair_captain","dalamyr","sangarunya","thrydan","wulf","golden_king","mahud_beastmaster"]},"6":{"foot":["moria_goblin","goblin_spear","goblin_shield","goblin_mercenary"],"spec":["goblin_bow","goblin_drummer","goblin_scribe"],"cav":[],"elite":["goblin_prowler","goblin_shaman","gollum"],"monster":["cave_troll","cave_drake","spider_queen"],"hero":["goblin_king","orc_shaman","troll_shaman","golfimbul","durburz","zagdush","ashrak","castellan","dungeon_keeper","forsaken","yazneg"]},"7":{"foot":["uruk_swordshield","uruk_swordshield2","uruk_pike"],"spec":["uruk_crossbow","uruk_scout_archer"],"cav":["warg_rider_spear"],"elite":["uruk_berserker","uruk_berserker2","uruk_banner"],"monster":["warg","warg_alpha","isengard_troll"],"hero":["uruk_captain","saruman","lurtz","ugluk","grima","gorulf"]},"8":{"foot":["morannon_orc","black_numenorean","easterling_phalanx","easterling_swordshield","mordor_uruk","khandish_warrior","variag_warrior"],"spec":["orc_archer","orc_bow","easterling_archer","easterling_priest"],"cav":["morgul_knight","black_numenorean_mounted","easterling_kataphrakt","dragon_knight","khandish_horseman","easterling_mounted_archer"],"elite":["black_guard","orc_twohanded","morgul_duellist"],"monster":["war_troll","olog_hai","troll_shaman","carcharoth","scatha","khandish_chariot","great_beast_gorgoroth"],"hero":["mouth_of_sauron","gothmog","easterling_warlord","knight_of_umbar","sauron_wolf","annatar","guritz","numenorean_marshal","arpharazon","khandish_chieftain"]},"9":{"foot":["morannon_orc","black_numenorean","morgul_orc","morgul_rat"],"spec":["orc_archer"],"cav":["morgul_knight","witchking_mounted","witchking_mounted_sheet"],"elite":["black_guard","orc_tracker","goblin_prowler","morgul_duellist","morgul_stalker"],"monster":["war_troll","olog_hai","shelob","werewolf","fellbeast","carcharoth","scatha"],"hero":["mouth_of_sauron","nazgul_mounted","gulavhar","sauron_wolf","witchking_spear","betrayer","dwimmerlaik","muzgur","nazgul_mace","nazgul_sword_2","tainted","witchking_foot","witchking_foot_mace","ufthak"]}};
window.MESBG_LEGEND_POOL=["gulavhar","buhrdur","undying","shadow_lord","nazgul_fellbeast","cave_drake","mumakil","half_troll","mirkwood_spider","bat_swarm","bolg","azog","azog_warg_rider","gothmog_balrog","glaurung","carcharoth","draugluin","thuringwethil","boldog","necromancer","smaug","ancalagon","melkor","ungoliant","sauron_wolf","scatha","witchking_spear"];
window.MESBG_EXTRA_UNITS2=[{"id":"azog_foot","meta":{"id":"azog_foot","name_ko":"아조그(도보)","name_en":"Azog the Defiler on foot","side":"evil","faction":"gundabad","role":"hero","weapon":"mace","base":"L","sheet":"roster-hobbit-evil-v1.png","file":"tokens/azog_foot.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":7,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"anborn","meta":{"id":"anborn","name_ko":"안보른","name_en":"Anborn the Ranger","side":"good","faction":"gondor","role":"hero","weapon":"bow","base":"L","sheet":"exp-gondor-heroes.png","file":"tokens/anborn.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":2,"shootRange":740,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"hirluin","meta":{"id":"hirluin","name_ko":"히를루인","name_en":"Hirluin the Fair","side":"good","faction":"gondor","role":"hero","weapon":"sword_shield","base":"L","sheet":"exp-gondor-heroes.png","file":"tokens/hirluin.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"madril","meta":{"id":"madril","name_ko":"마드릴","name_en":"Madril, Ranger Lieutenant","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"exp-gondor-heroes.png","file":"tokens/madril.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"irolas","meta":{"id":"irolas","name_ko":"이롤라스","name_en":"Irolas, Guard of the Citadel","side":"good","faction":"gondor","role":"hero","weapon":"sword_shield","base":"L","sheet":"exp-gondor-heroes.png","file":"tokens/irolas.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"hurin","meta":{"id":"hurin","name_ko":"후린","name_en":"Hurin, Warden of the Keys","side":"good","faction":"gondor","role":"hero","weapon":"mace","base":"L","sheet":"exp-gondor-heroes.png","file":"tokens/hurin.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"cirion","meta":{"id":"cirion","name_ko":"키리온","name_en":"Cirion, Captain of Gondor","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"exp-gondor-heroes.png","file":"tokens/cirion.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"theodred","meta":{"id":"theodred","name_ko":"테오드레드","name_en":"Theodred, Prince of Rohan","side":"good","faction":"rohan","role":"hero","weapon":"sword","base":"L","sheet":"exp-rohan.png","file":"tokens/theodred.png","visualBase":"L","visualRadius":38,"baseMm":50,"artScale":1.0},"profile":{"move":430,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"hama","meta":{"id":"hama","name_ko":"하마","name_en":"Hama, Doorwarden of Meduseld","side":"good","faction":"rohan","role":"hero","weapon":"sword","base":"L","sheet":"exp-rohan.png","file":"tokens/hama.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"deorwine","meta":{"id":"deorwine","name_ko":"데오르바인","name_en":"Deorwine, Chief of the Royal Guard","side":"good","faction":"rohan","role":"hero","weapon":"sword","base":"L","sheet":"exp-rohan.png","file":"tokens/deorwine.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"grimbold","meta":{"id":"grimbold","name_ko":"그림볼드","name_en":"Grimbold of Grimslade","side":"good","faction":"rohan","role":"hero","weapon":"sword","base":"L","sheet":"exp-rohan.png","file":"tokens/grimbold.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"harding","meta":{"id":"harding","name_ko":"하딩","name_en":"Harding of the Eastemnet","side":"good","faction":"rohan","role":"hero","weapon":"bow","base":"L","sheet":"exp-rohan.png","file":"tokens/harding.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":2,"shootRange":740,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"rohan_royal_guard_mounted","meta":{"id":"rohan_royal_guard_mounted","name_ko":"로한 근위기병","name_en":"Rohan Royal Guard, mounted","side":"good","faction":"rohan","role":"cavalry","weapon":"spear","base":"XL","sheet":"exp-rohan.png","file":"tokens/rohan_royal_guard_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted","spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"arvedui","meta":{"id":"arvedui","name_ko":"아르베두이","name_en":"Arvedui, Last King of Arnor","side":"good","faction":"arnor","role":"hero","weapon":"sword","base":"L","sheet":"exp-numenor-arnor.png","file":"tokens/arvedui.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"malbeth","meta":{"id":"malbeth","name_ko":"말베스","name_en":"Malbeth the Seer","side":"good","faction":"arnor","role":"hero","weapon":"staff","base":"L","sheet":"exp-numenor-arnor.png","file":"tokens/malbeth.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":8,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"numenorean_captain","meta":{"id":"numenorean_captain","name_ko":"누메노르 대장","name_en":"Numenorean Captain","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"exp-numenor-arnor.png","file":"tokens/numenorean_captain.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"numenorean_warrior","meta":{"id":"numenorean_warrior","name_ko":"누메노르 전사","name_en":"Numenorean Warrior","side":"good","faction":"gondor","role":"infantry","weapon":"sword_shield","base":"M","sheet":"exp-numenor-arnor.png","file":"tokens/numenorean_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":4,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"numenorean_spearman","meta":{"id":"numenorean_spearman","name_ko":"누메노르 창병","name_en":"Numenorean Spearman","side":"good","faction":"gondor","role":"infantry","weapon":"spear","base":"M","sheet":"exp-numenor-arnor.png","file":"tokens/numenorean_spearman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"arnor_warrior","meta":{"id":"arnor_warrior","name_ko":"아르노르 전사","name_en":"Warrior of Arnor","side":"good","faction":"arnor","role":"infantry","weapon":"sword_shield","base":"M","sheet":"exp-numenor-arnor.png","file":"tokens/arnor_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"hasharin","meta":{"id":"hasharin","name_ko":"하샤린","name_en":"Hasharin of Harad","side":"evil","faction":"harad","role":"hero","weapon":"dagger","base":"L","sheet":"exp-harad.png","file":"tokens/hasharin.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"golden_king","meta":{"id":"golden_king","name_ko":"아브라칸의 황금왕","name_en":"Golden King of Abrakhan","side":"evil","faction":"harad","role":"hero","weapon":"sword","base":"L","sheet":"exp-harad.png","file":"tokens/golden_king.png","visualBase":"L","visualRadius":38,"baseMm":50,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero","mounted"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"mahud_beastmaster","meta":{"id":"mahud_beastmaster","name_ko":"마후드 야수조련사","name_en":"Mahud Beastmaster","side":"evil","faction":"harad","role":"hero","weapon":"whip","base":"L","sheet":"exp-harad.png","file":"tokens/mahud_beastmaster.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"watcher_karna","meta":{"id":"watcher_karna","name_ko":"카르나의 감시자","name_en":"Watcher of Karna","side":"evil","faction":"harad","role":"infantry","weapon":"sword","base":"M","sheet":"exp-harad.png","file":"tokens/watcher_karna.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"mahud_camel_raider","meta":{"id":"mahud_camel_raider","name_ko":"마후드 낙타기병","name_en":"Mahud Camel Raider","side":"evil","faction":"harad","role":"cavalry","weapon":"spear","base":"XL","sheet":"exp-harad.png","file":"tokens/mahud_camel_raider.png","visualBase":"XL","visualRadius":62,"baseMm":50,"artScale":1.0},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted","spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"amdur","meta":{"id":"amdur","name_ko":"암두르 검의 군주","name_en":"Amdur, Lord of Blades","side":"evil","faction":"easterling","role":"hero","weapon":"sword","base":"L","sheet":"exp-easterling.png","file":"tokens/amdur.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"easterling_priest","meta":{"id":"easterling_priest","name_ko":"이스터링 전쟁사제","name_en":"Easterling War Priest","side":"evil","faction":"easterling","role":"support","weapon":"dagger","base":"M","sheet":"exp-easterling.png","file":"tokens/easterling_priest.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":4,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"easterling_archer","meta":{"id":"easterling_archer","name_ko":"이스터링 궁수","name_en":"Easterling Archer","side":"evil","faction":"easterling","role":"infantry","weapon":"bow","base":"M","sheet":"exp-easterling.png","file":"tokens/easterling_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":3,"shootRange":740,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"variag_warrior","meta":{"id":"variag_warrior","name_ko":"바리악 전사","name_en":"Variag Warrior of Khand","side":"evil","faction":"easterling","role":"infantry","weapon":"sword_shield","base":"M","sheet":"exp-easterling.png","file":"tokens/variag_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"forsaken","meta":{"id":"forsaken","name_ko":"버려진 자(나즈굴)","name_en":"The Forsaken, Ringwraith","side":"evil","faction":"dol_guldur","role":"hero","weapon":"sword","base":"L","sheet":"exp-dolguldur.png","file":"tokens/forsaken.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":1,"traits":["hero","terror"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"castellan","meta":{"id":"castellan","name_ko":"돌 굴두르 성주","name_en":"Castellan of Dol Guldur","side":"evil","faction":"dol_guldur","role":"hero","weapon":"sword","base":"L","sheet":"exp-dolguldur.png","file":"tokens/castellan.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":1,"traits":["hero","terror"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"dungeon_keeper","meta":{"id":"dungeon_keeper","name_ko":"감옥지기","name_en":"Keeper of the Dungeons","side":"evil","faction":"dol_guldur","role":"hero","weapon":"mace","base":"L","sheet":"exp-dolguldur.png","file":"tokens/dungeon_keeper.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"kardush","meta":{"id":"kardush","name_ko":"카두쉬 화염술사","name_en":"Kardush the Firecaller","side":"evil","faction":"mordor","role":"support","weapon":"staff","base":"M","sheet":"exp-dolguldur.png","file":"tokens/kardush.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":6,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"morgul_stalker","meta":{"id":"morgul_stalker","name_ko":"모르굴 추적자","name_en":"Morgul Stalker","side":"evil","faction":"mordor","role":"infantry","weapon":"dagger","base":"M","sheet":"exp-dolguldur.png","file":"tokens/morgul_stalker.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"numenorean_marshal","meta":{"id":"numenorean_marshal","name_ko":"검은 누메노르 사령관","name_en":"Black Numenorean Marshal","side":"evil","faction":"mordor","role":"hero","weapon":"mace","base":"L","sheet":"exp-dolguldur.png","file":"tokens/numenorean_marshal.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"thrydan","meta":{"id":"thrydan","name_ko":"트리단 울프스베인","name_en":"Thrydan Wolfsbane","side":"evil","faction":"dunland","role":"hero","weapon":"twohanded","base":"L","sheet":"exp-dunland.png","file":"tokens/thrydan.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"gorulf","meta":{"id":"gorulf","name_ko":"고룰프 아이언스킨","name_en":"Gorulf Ironskin","side":"evil","faction":"dunland","role":"hero","weapon":"axe","base":"L","sheet":"exp-dunland.png","file":"tokens/gorulf.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"dunlending_berserker","meta":{"id":"dunlending_berserker","name_ko":"던랜드 광전사","name_en":"Dunlending Berserker","side":"evil","faction":"dunland","role":"infantry","weapon":"twohanded","base":"M","sheet":"exp-dunland.png","file":"tokens/dunlending_berserker.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":4,"defence":4,"attacks":2,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"dunlending_shaman","meta":{"id":"dunlending_shaman","name_ko":"던랜드 주술사","name_en":"Dunlending Shaman","side":"evil","faction":"dunland","role":"support","weapon":"staff","base":"M","sheet":"exp-dunland.png","file":"tokens/dunlending_shaman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":4,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"dunlending_archer","meta":{"id":"dunlending_archer","name_ko":"던랜드 궁수","name_en":"Dunlending Archer","side":"evil","faction":"dunland","role":"infantry","weapon":"bow","base":"M","sheet":"exp-dunland.png","file":"tokens/dunlending_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":3,"shootValue":4,"shootRange":740,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"ruffian","meta":{"id":"ruffian","name_ko":"샤키의 불한당","name_en":"Sharkey’s Ruffian","side":"evil","faction":"isengard","role":"infantry","weapon":"club","base":"M","sheet":"exp-dunland.png","file":"tokens/ruffian.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"paladin_took","meta":{"id":"paladin_took","name_ko":"팔라딘 툭","name_en":"Paladin Took","side":"good","faction":"shire","role":"hero","weapon":"sword","base":"L","sheet":"exp-misc.png","file":"tokens/paladin_took.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.5},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"farmer_maggot","meta":{"id":"farmer_maggot","name_ko":"농부 매곳","name_en":"Farmer Maggot","side":"good","faction":"shire","role":"hero","weapon":"pitchfork","base":"L","sheet":"exp-misc.png","file":"tokens/farmer_maggot.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.5},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"fredegar","meta":{"id":"fredegar","name_ko":"프레데가르 볼저","name_en":"Fredegar Bolger","side":"good","faction":"shire","role":"hero","weapon":"dagger","base":"L","sheet":"exp-misc.png","file":"tokens/fredegar.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.5},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"durin_vi","meta":{"id":"durin_vi","name_ko":"두린 6세","name_en":"Durin VI, King of Khazad-dum","side":"good","faction":"dwarf","role":"hero","weapon":"mace","base":"L","sheet":"exp-misc.png","file":"tokens/durin_vi.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"dead_spearman","meta":{"id":"dead_spearman","name_ko":"죽은자 창병","name_en":"Dead spearman of Dunharrow","side":"good","faction":"dead","role":"infantry","weapon":"spear","base":"M","sheet":"exp-misc.png","file":"tokens/dead_spearman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear","terror"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"stone_giant","meta":{"id":"stone_giant","name_ko":"안개산맥 거인","name_en":"Stone Giant of the Misty Mountains","side":"evil","faction":"gundabad","role":"monster","weapon":"club","base":"XXL","sheet":"exp-misc.png","file":"tokens/stone_giant.png","visualBase":"XXL","visualRadius":91,"baseMm":60},"profile":{"move":260,"fight":7,"strength":6,"defence":8,"attacks":3,"wounds":5,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"rare"},{"id":"arathorn","meta":{"id":"arathorn","name_ko":"아라손","name_en":"Arathorn II","side":"good","faction":"arnor","role":"hero","weapon":"sword","base":"L","sheet":"nb-exp-heroes2.png","file":"tokens/arathorn.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"angbor","meta":{"id":"angbor","name_ko":"앵보르 무서운 자","name_en":"Angbor the Fearless","side":"good","faction":"gondor","role":"hero","weapon":"twohanded","base":"L","sheet":"nb-exp-heroes2.png","file":"tokens/angbor.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"dunhere","meta":{"id":"dunhere","name_ko":"둔헤레","name_en":"Dunhere","side":"good","faction":"rohan","role":"hero","weapon":"spear","base":"L","sheet":"nb-exp-heroes2.png","file":"tokens/dunhere.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero","spear"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"haleth","meta":{"id":"haleth","name_ko":"할레스","name_en":"Haleth son of Hama","side":"good","faction":"rohan","role":"hero","weapon":"spear","base":"L","sheet":"nb-exp-heroes2.png","file":"tokens/haleth.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero","spear"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"bandobras","meta":{"id":"bandobras","name_ko":"반도브라스 툭","name_en":"Bandobras Bullroarer Took","side":"good","faction":"shire","role":"hero","weapon":"club","base":"L","sheet":"nb-exp-heroes2.png","file":"tokens/bandobras.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.5},"profile":{"move":235,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"gildor","meta":{"id":"gildor","name_ko":"길도르","name_en":"Gildor Inglorion","side":"good","faction":"rivendell","role":"hero","weapon":"staff","base":"L","sheet":"nb-exp-heroes2.png","file":"tokens/gildor.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":2,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"grishnakh","meta":{"id":"grishnakh","name_ko":"그리쉬나크","name_en":"Grishnakh","side":"evil","faction":"mordor","role":"hero","weapon":"sword","base":"L","sheet":"nb-exp-evil2.png","file":"tokens/grishnakh.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"snaga","meta":{"id":"snaga","name_ko":"스나가","name_en":"Snaga","side":"evil","faction":"isengard","role":"hero","weapon":"sword","base":"L","sheet":"nb-exp-evil2.png","file":"tokens/snaga.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":3,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"zagdush","meta":{"id":"zagdush","name_ko":"자그두쉬","name_en":"Zagdush","side":"evil","faction":"moria","role":"hero","weapon":"cleaver","base":"L","sheet":"nb-exp-evil2.png","file":"tokens/zagdush.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"dalamyr","meta":{"id":"dalamyr","name_ko":"달라미르","name_en":"Dalamyr, Fleetmaster of Umbar","side":"evil","faction":"umbar","role":"hero","weapon":"twohanded","base":"L","sheet":"nb-exp-evil2.png","file":"tokens/dalamyr.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":4,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"goblin_drummer","meta":{"id":"goblin_drummer","name_ko":"고블린 북병","name_en":"Goblin drummer","side":"evil","faction":"moria","role":"support","weapon":"none","base":"M","sheet":"nb-exp-evil2.png","file":"tokens/goblin_drummer.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.9},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"yazneg","meta":{"id":"yazneg","name_ko":"야즈네그","name_en":"Yazneg","side":"evil","faction":"gundabad","role":"hero","weapon":"spear","base":"L","sheet":"nb-exp-evil2.png","file":"tokens/yazneg.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero","spear"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"eorl_the_young","meta":{"id":"eorl_the_young","name_ko":"에오를","name_en":"Eorl the Young","side":"good","faction":"rohan","role":"hero","weapon":"spear","base":"L","sheet":"nb-exp-heroes3.png","file":"tokens/eorl_the_young.png","visualBase":"L","visualRadius":38,"baseMm":50,"artScale":1.0},"profile":{"move":430,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":2,"traits":["hero","mounted","spear"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"helm_hammerhand","meta":{"id":"helm_hammerhand","name_ko":"헬름 해머핸드","name_en":"Helm Hammerhand","side":"good","faction":"rohan","role":"hero","weapon":"twohanded","base":"L","sheet":"nb-exp-heroes3.png","file":"tokens/helm_hammerhand.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":7,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"dervorin","meta":{"id":"dervorin","name_ko":"데르보린","name_en":"Dervorin of Ringlo Vale","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"nb-exp-heroes3.png","file":"tokens/dervorin.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"dol_amroth_man_at_arms","meta":{"id":"dol_amroth_man_at_arms","name_ko":"돌 암로스 병사","name_en":"Man-at-Arms of Dol Amroth","side":"good","faction":"gondor","role":"infantry","weapon":"spear","base":"M","sheet":"nb-exp-troops2.png","file":"tokens/dol_amroth_man_at_arms.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"numenorean_archer","meta":{"id":"numenorean_archer","name_ko":"누메노르 궁병","name_en":"Numenorean archer","side":"good","faction":"numenor","role":"infantry","weapon":"bow","base":"M","sheet":"nb-exp-troops2.png","file":"tokens/numenorean_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":5,"shootValue":3,"shootRange":740,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"vault_warden","meta":{"id":"vault_warden","name_ko":"철언덕 방벽병","name_en":"Iron Hills Vault Warden","side":"good","faction":"dwarf","role":"infantry","weapon":"spear","base":"M","sheet":"nb-exp-troops2.png","file":"tokens/vault_warden.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"palace_guard","meta":{"id":"palace_guard","name_ko":"궁정 근위병","name_en":"Mirkwood Palace Guard","side":"good","faction":"elf","role":"infantry","weapon":"sword","base":"M","sheet":"nb-exp-troops2.png","file":"tokens/palace_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"hobbit_militia","meta":{"id":"hobbit_militia","name_ko":"호빗 민병대","name_en":"Hobbit militia","side":"good","faction":"shire","role":"infantry","weapon":"club","base":"M","sheet":"nb-exp-troops2.png","file":"tokens/hobbit_militia.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.5},"profile":{"move":235,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"guritz","meta":{"id":"guritz","name_ko":"구리츠","name_en":"Guritz","side":"evil","faction":"mordor","role":"hero","weapon":"twohanded","base":"L","sheet":"nb-exp-evil3.png","file":"tokens/guritz.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":3,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"targsh","meta":{"id":"targsh","name_ko":"타르그쉬","name_en":"Targsh","side":"evil","faction":"isengard","role":"hero","weapon":"spear","base":"L","sheet":"nb-exp-evil3.png","file":"tokens/targsh.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":5,"defence":5,"attacks":3,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero","spear"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"durburz","meta":{"id":"durburz","name_ko":"두르부르즈","name_en":"Durburz, Goblin King of Moria","side":"evil","faction":"moria","role":"hero","weapon":"sword","base":"L","sheet":"nb-exp-evil3.png","file":"tokens/durburz.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"goblin_scribe","meta":{"id":"goblin_scribe","name_ko":"고블린 서기","name_en":"Goblin scribe","side":"evil","faction":"moria","role":"support","weapon":"none","base":"M","sheet":"nb-exp-evil3.png","file":"tokens/goblin_scribe.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.9},"profile":{"move":235,"fight":2,"strength":2,"defence":4,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"fimbul","meta":{"id":"fimbul","name_ko":"핌불","name_en":"Fimbul the Hunter","side":"evil","faction":"gundabad","role":"hero","weapon":"spear","base":"L","sheet":"nb-exp-evil3.png","file":"tokens/fimbul.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero","spear"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"narzug","meta":{"id":"narzug","name_ko":"나르주그","name_en":"Narzug","side":"evil","faction":"gundabad","role":"hero","weapon":"bow","base":"L","sheet":"nb-exp-evil3.png","file":"tokens/narzug.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":3,"shootRange":740,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"great_beast_gorgoroth","meta":{"id":"great_beast_gorgoroth","name_ko":"고르고로스 거수","name_en":"Great Beast of Gorgoroth","side":"evil","faction":"mordor","role":"monster","weapon":"none","base":"XXL","sheet":"nb-exp-harad2.png","file":"tokens/great_beast_gorgoroth.png","visualBase":"XXL","visualRadius":91,"baseMm":60},"profile":{"move":200,"fight":5,"strength":7,"defence":8,"attacks":4,"wounds":6,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"rare"},{"id":"abrakhan_guard","meta":{"id":"abrakhan_guard","name_ko":"아브라칸 근위대","name_en":"Abrakhan Guard","side":"evil","faction":"harad","role":"infantry","weapon":"glaive","base":"M","sheet":"nb-exp-harad2.png","file":"tokens/abrakhan_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"corsair_bosun","meta":{"id":"corsair_bosun","name_ko":"코르사 갑판장","name_en":"Corsair boatswain","side":"evil","faction":"umbar","role":"infantry","weapon":"sword","base":"M","sheet":"nb-exp-harad2.png","file":"tokens/corsair_bosun.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"spider_queen","meta":{"id":"spider_queen","name_ko":"거미 여왕","name_en":"Spider Queen of Mirkwood","side":"evil","faction":"dol_guldur","role":"monster","weapon":"claws","base":"XXL","sheet":"nb-exp-harad2.png","file":"tokens/spider_queen.png","visualBase":"XXL","visualRadius":91,"baseMm":60},"profile":{"move":290,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":4,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":0,"rarity":"rare"},{"id":"mablung_sindar","meta":{"id":"mablung_sindar","name_ko":"마블룽","name_en":"Mablung","side":"good","faction":"doriath","role":"hero","weapon":"sword","base":"L","sheet":"px-nb-exp-silm2.png","file":"tokens/mablung_sindar.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"melian","meta":{"id":"melian","name_ko":"멜리안","name_en":"Melian","side":"good","faction":"maiar","role":"hero","weapon":"staff","base":"L","sheet":"px-nb-exp-silm2.png","file":"tokens/melian.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":14,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"mim","meta":{"id":"mim","name_ko":"밈","name_en":"Mim the Petty-dwarf","side":"good","faction":"dwarf","role":"hero","weapon":"dagger","base":"L","sheet":"px-nb-exp-silm2.png","file":"tokens/mim.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"doriath_warrior","meta":{"id":"doriath_warrior","name_ko":"도리아스 전사","name_en":"Doriath Warrior","side":"good","faction":"doriath","role":"infantry","weapon":"sword","base":"M","sheet":"px-nb-exp-silm3.png","file":"tokens/doriath_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"falathrim_archer","meta":{"id":"falathrim_archer","name_ko":"팔라스림 궁수","name_en":"Falathrim Archer","side":"good","faction":"elf","role":"infantry","weapon":"bow","base":"M","sheet":"px-nb-exp-silm3.png","file":"tokens/falathrim_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":5,"shootValue":3,"shootRange":740,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"nargothrond_ranger","meta":{"id":"nargothrond_ranger","name_ko":"나르고스론드 레인저","name_en":"Nargothrond Ranger","side":"good","faction":"elf","role":"infantry","weapon":"bow","base":"M","sheet":"px-nb-exp-silm3.png","file":"tokens/nargothrond_ranger.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":5,"shootValue":3,"shootRange":740,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"edain_warrior","meta":{"id":"edain_warrior","name_ko":"에다인 전사","name_en":"Edain Warrior","side":"good","faction":"men","role":"infantry","weapon":"sword","base":"M","sheet":"px-nb-exp-silm3.png","file":"tokens/edain_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"gondolin_guard","meta":{"id":"gondolin_guard","name_ko":"곤돌린 근위병","name_en":"Gondolin Guard","side":"good","faction":"elf","role":"infantry","weapon":"spear","base":"M","sheet":"px-nb-exp-silm3.png","file":"tokens/gondolin_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"mirkwood_captain","meta":{"id":"mirkwood_captain","name_ko":"미르크우드 대장","name_en":"Mirkwood Captain","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"px-nb-exp-silm3.png","file":"tokens/mirkwood_captain.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"mordor_uruk","meta":{"id":"mordor_uruk","name_ko":"모르도르 우르크","name_en":"Mordor Uruk","side":"evil","faction":"mordor","role":"infantry","weapon":"sword","base":"M","sheet":"px-nb-exp-mordor2.png","file":"tokens/mordor_uruk.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"morgul_orc","meta":{"id":"morgul_orc","name_ko":"모르굴 오크","name_en":"Morgul Orc","side":"evil","faction":"mordor","role":"infantry","weapon":"sword","base":"M","sheet":"px-nb-exp-mordor2.png","file":"tokens/morgul_orc.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"morgul_rat","meta":{"id":"morgul_rat","name_ko":"모르굴 추적병","name_en":"Morgul Rat","side":"evil","faction":"mordor","role":"infantry","weapon":"dagger","base":"M","sheet":"px-nb-exp-mordor2.png","file":"tokens/morgul_rat.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":2,"strength":3,"defence":3,"attacks":1,"wounds":1,"courage":2,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"ufthak","meta":{"id":"ufthak","name_ko":"우프탁","name_en":"Ufthak","side":"evil","faction":"mordor","role":"hero","weapon":"sword","base":"L","sheet":"px-nb-exp-mordor2.png","file":"tokens/ufthak.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"orc_sergeant","meta":{"id":"orc_sergeant","name_ko":"오크 하사","name_en":"Orc Sergeant","side":"evil","faction":"mordor","role":"hero","weapon":"sword","base":"L","sheet":"px-nb-exp-mordor2.png","file":"tokens/orc_sergeant.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"ashrak","meta":{"id":"ashrak","name_ko":"아슈라크","name_en":"Ashrak","side":"evil","faction":"dol_guldur","role":"hero","weapon":"sword","base":"L","sheet":"px-nb-exp-mordor2.png","file":"tokens/ashrak.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":1,"traits":["hero","terror"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"isengard_troll","meta":{"id":"isengard_troll","name_ko":"이센가드 트롤","name_en":"Isengard Troll","side":"evil","faction":"isengard","role":"monster","weapon":"club","base":"XXL","sheet":"px-nb-exp-wotr.png","file":"tokens/isengard_troll.png","visualBase":"XXL","visualRadius":91,"baseMm":60},"profile":{"move":260,"fight":4,"strength":6,"defence":7,"attacks":3,"wounds":4,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster"]},"recruitable":false,"unlockWave":0,"rarity":"rare"},{"id":"dunlending_horseman","meta":{"id":"dunlending_horseman","name_ko":"던랜드 기병","name_en":"Dunlending Horseman","side":"evil","faction":"dunland","role":"cavalry","weapon":"axe","base":"XL","sheet":"px-nb-exp-wotr.png","file":"tokens/dunlending_horseman.png","visualBase":"XL","visualRadius":62,"baseMm":50,"artScale":1.0},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"wulf","meta":{"id":"wulf","name_ko":"울프","name_en":"Wulf","side":"evil","faction":"dunland","role":"hero","weapon":"twohanded","base":"L","sheet":"px-nb-exp-wotr.png","file":"tokens/wulf.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"hera","meta":{"id":"hera","name_ko":"헤라","name_en":"Hera","side":"good","faction":"rohan","role":"hero","weapon":"axe","base":"L","sheet":"px-nb-exp-wotr.png","file":"tokens/hera.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"frealaf","meta":{"id":"frealaf","name_ko":"프레알라프","name_en":"Frealaf","side":"good","faction":"rohan","role":"hero","weapon":"axe","base":"L","sheet":"px-nb-exp-wotr.png","file":"tokens/frealaf.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"rohan_yeoman","meta":{"id":"rohan_yeoman","name_ko":"로한 여맨","name_en":"Rohan Yeoman","side":"good","faction":"rohan","role":"infantry","weapon":"spear","base":"M","sheet":"px-nb-exp-wotr.png","file":"tokens/rohan_yeoman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"serpent_guard","meta":{"id":"serpent_guard","name_ko":"뱀 근위대","name_en":"Serpent Guard","side":"evil","faction":"harad","role":"infantry","weapon":"glaive","base":"M","sheet":"px-nb-exp-harad3.png","file":"tokens/serpent_guard.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":4,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"corsair_crossbowman","meta":{"id":"corsair_crossbowman","name_ko":"코르사 석궁병","name_en":"Corsair Crossbowman","side":"evil","faction":"umbar","role":"infantry","weapon":"crossbow","base":"M","sheet":"px-nb-exp-harad3.png","file":"tokens/corsair_crossbowman.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":3,"shootRange":640,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"mahud_blowpipe","meta":{"id":"mahud_blowpipe","name_ko":"마후드 취관병","name_en":"Mahud Blowpipe Warrior","side":"evil","faction":"harad","role":"infantry","weapon":"blowpipe","base":"M","sheet":"px-nb-exp-harad3.png","file":"tokens/mahud_blowpipe.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":3,"shootRange":480,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"khandish_warrior","meta":{"id":"khandish_warrior","name_ko":"칸드 전사","name_en":"Khandish Warrior","side":"evil","faction":"easterling","role":"infantry","weapon":"mace","base":"M","sheet":"px-nb-exp-harad3.png","file":"tokens/khandish_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":3,"strength":4,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"easterling_mounted_archer","meta":{"id":"easterling_mounted_archer","name_ko":"이스터링 기마궁수","name_en":"Easterling Mounted Archer","side":"evil","faction":"easterling","role":"cavalry","weapon":"bow","base":"XL","sheet":"px-nb-exp-harad3.png","file":"tokens/easterling_mounted_archer.png","visualBase":"XL","visualRadius":62,"baseMm":50,"artScale":1.0},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":3,"shootRange":740,"might":0,"will":0,"fate":0,"traits":["mounted"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"far_harad_chieftain","meta":{"id":"far_harad_chieftain","name_ko":"먼 하라드 족장","name_en":"Far Harad Chieftain","side":"evil","faction":"harad","role":"hero","weapon":"spear","base":"L","sheet":"px-nb-exp-harad3.png","file":"tokens/far_harad_chieftain.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero","spear"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"numenorean_knight","meta":{"id":"numenorean_knight","name_ko":"누메노르 기사","name_en":"Numenorean Knight","side":"good","faction":"numenor","role":"cavalry","weapon":"lance","base":"XL","sheet":"px-nb-exp-gondor2.png","file":"tokens/numenorean_knight.png","visualBase":"XL","visualRadius":62,"baseMm":50,"artScale":1.0},"profile":{"move":430,"fight":4,"strength":4,"defence":6,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted","lance","spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"arnor_archer","meta":{"id":"arnor_archer","name_ko":"아르노르 궁수","name_en":"Arnor Archer","side":"good","faction":"arnor","role":"infantry","weapon":"bow","base":"M","sheet":"px-nb-exp-gondor2.png","file":"tokens/arnor_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":3,"shootRange":740,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"duilin","meta":{"id":"duilin","name_ko":"두일린","name_en":"Duilin","side":"good","faction":"gondor","role":"hero","weapon":"bow","base":"L","sheet":"px-nb-exp-gondor2.png","file":"tokens/duilin.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":4,"attacks":2,"wounds":2,"courage":5,"shootValue":2,"shootRange":740,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"derufin","meta":{"id":"derufin","name_ko":"데루핀","name_en":"Derufin","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"px-nb-exp-gondor2.png","file":"tokens/derufin.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"hirgon","meta":{"id":"hirgon","name_ko":"히르곤","name_en":"Hirgon","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"px-nb-exp-gondor2.png","file":"tokens/hirgon.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"pippin_citadel","meta":{"id":"pippin_citadel","name_ko":"성채 근위병 피핀","name_en":"Pippin, Guard of the Citadel","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"px-nb-exp-gondor2.png","file":"tokens/pippin_citadel.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.5},"profile":{"move":235,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"beorn_bear","meta":{"id":"beorn_bear","name_ko":"베오른 (곰)","name_en":"Beorn, Bear Form","side":"good","faction":"beorning","role":"monster","weapon":"claws","base":"XXL","sheet":"px-nb-exp-wild.png","file":"tokens/beorn_bear.png","visualBase":"XXL","visualRadius":91,"baseMm":60},"profile":{"move":300,"fight":7,"strength":6,"defence":6,"attacks":3,"wounds":4,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["monster","hero"]},"recruitable":true,"unlockWave":0,"rarity":"legendary"},{"id":"gwaihir","meta":{"id":"gwaihir","name_ko":"그와이히르","name_en":"Gwaihir the Windlord","side":"good","faction":"eagle","role":"hero","weapon":"talons","base":"XL","sheet":"px-nb-exp-wild.png","file":"tokens/gwaihir.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":430,"fight":8,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero","monster","flying"]},"recruitable":true,"unlockWave":0,"rarity":"epic"},{"id":"lobelia","meta":{"id":"lobelia","name_ko":"로벨리아","name_en":"Lobelia Sackville-Baggins","side":"good","faction":"shire","role":"hero","weapon":"umbrella","base":"L","sheet":"px-nb-exp-wild.png","file":"tokens/lobelia.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.5},"profile":{"move":235,"fight":2,"strength":2,"defence":4,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"will_whitfoot","meta":{"id":"will_whitfoot","name_ko":"윌 휫풋","name_en":"Will Whitfoot","side":"good","faction":"shire","role":"hero","weapon":"umbrella","base":"L","sheet":"px-nb-exp-wild.png","file":"tokens/will_whitfoot.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.5},"profile":{"move":235,"fight":2,"strength":2,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":1,"will":0,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"dwarf_shieldbearers","meta":{"id":"dwarf_shieldbearers","name_ko":"드워프 방패 운반병","name_en":"Dwarf Shieldbearers","side":"good","faction":"dwarf","role":"support","weapon":"shield","base":"M","sheet":"px-nb-exp-wild.png","file":"tokens/dwarf_shieldbearers.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":4,"strength":3,"defence":7,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"iron_hills_captain","meta":{"id":"iron_hills_captain","name_ko":"아이언 힐즈 대장","name_en":"Iron Hills Captain","side":"good","faction":"dwarf","role":"hero","weapon":"mattock","base":"L","sheet":"px-nb-exp-wild.png","file":"tokens/iron_hills_captain.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":6,"strength":4,"defence":7,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"pallando","meta":{"id":"pallando","name_ko":"팔란도","name_en":"Pallando the Blue","side":"good","faction":"maiar","role":"hero","weapon":"staff","base":"L","sheet":"null","file":"tokens/pallando.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":3,"defence":5,"attacks":1,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"alatar","meta":{"id":"alatar","name_ko":"알라타르","name_en":"Alatar the Blue","side":"good","faction":"maiar","role":"hero","weapon":"staff","base":"L","sheet":"null","file":"tokens/alatar.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":3,"defence":5,"attacks":1,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":12,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"annatar","meta":{"id":"annatar","name_ko":"안나타르","name_en":"Annatar, Lord of Gifts","side":"evil","faction":"mordor","role":"hero","weapon":"staff","base":"L","sheet":"null","file":"tokens/annatar.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":7,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":12,"fate":3,"traits":["hero","terror"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"sauron_wolf","meta":{"id":"sauron_wolf","name_ko":"사우론 (늑대인간)","name_en":"Sauron, wolf form","side":"evil","faction":"mordor","role":"monster","weapon":"claws","base":"XXL","sheet":"null","file":"tokens/sauron_wolf.png","visualBase":"XXL","visualRadius":91,"baseMm":60},"profile":{"move":300,"fight":8,"strength":5,"defence":7,"attacks":4,"wounds":4,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":5,"fate":3,"traits":["monster","hero","terror"]},"recruitable":false,"unlockWave":0,"rarity":"rare"},{"id":"landroval","meta":{"id":"landroval","name_ko":"란드로발","name_en":"Landroval","side":"good","faction":"eagle","role":"monster","weapon":"talons","base":"XL","sheet":"null","file":"tokens/landroval.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":430,"fight":7,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying"]},"recruitable":true,"unlockWave":0,"rarity":"epic"},{"id":"meneldor","meta":{"id":"meneldor","name_ko":"메넬도르","name_en":"Meneldor","side":"good","faction":"eagle","role":"monster","weapon":"talons","base":"XL","sheet":"null","file":"tokens/meneldor.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":430,"fight":7,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","flying"]},"recruitable":true,"unlockWave":0,"rarity":"epic"},{"id":"leaflock","meta":{"id":"leaflock","name_ko":"리플락","name_en":"Leaflock","side":"good","faction":"ent","role":"monster","weapon":"club","base":"XXL","sheet":"null","file":"tokens/leaflock.png","visualBase":"XXL","visualRadius":91,"baseMm":60},"profile":{"move":200,"fight":6,"strength":7,"defence":8,"attacks":3,"wounds":5,"courage":7,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":true,"unlockWave":0,"rarity":"epic"},{"id":"beechbone","meta":{"id":"beechbone","name_ko":"비치본","name_en":"Beechbone","side":"good","faction":"ent","role":"monster","weapon":"club","base":"XXL","sheet":"null","file":"tokens/beechbone.png","visualBase":"XXL","visualRadius":91,"baseMm":60},"profile":{"move":200,"fight":6,"strength":7,"defence":8,"attacks":3,"wounds":5,"courage":7,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":true,"unlockWave":0,"rarity":"epic"},{"id":"azaghal","meta":{"id":"azaghal","name_ko":"아자갈","name_en":"Azaghal, Lord of Belegost","side":"good","faction":"dwarf","role":"hero","weapon":"axe","base":"L","sheet":"null","file":"tokens/azaghal.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":7,"strength":5,"defence":8,"attacks":3,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"nain","meta":{"id":"nain","name_ko":"나인","name_en":"Nain of the Iron Hills","side":"good","faction":"dwarf","role":"hero","weapon":"axe","base":"L","sheet":"null","file":"tokens/nain.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":6,"strength":4,"defence":8,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"maglor","meta":{"id":"maglor","name_ko":"마글로르","name_en":"Maglor","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"null","file":"tokens/maglor.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":8,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"gwindor","meta":{"id":"gwindor","name_ko":"그윈도르","name_en":"Gwindor of Nargothrond","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"null","file":"tokens/gwindor.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":3,"defence":4,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"celebrimbor","meta":{"id":"celebrimbor","name_ko":"켈레브림보르","name_en":"Celebrimbor","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":"null","file":"tokens/celebrimbor.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":6,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"daeron","meta":{"id":"daeron","name_ko":"다에론","name_en":"Daeron the Minstrel","side":"good","faction":"doriath","role":"hero","weapon":"staff","base":"L","sheet":"null","file":"tokens/daeron.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":4,"strength":3,"defence":4,"attacks":1,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":8,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"earnur","meta":{"id":"earnur","name_ko":"에아르누르","name_en":"Earnur, King of Gondor","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":"null","file":"tokens/earnur.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":7,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"sangarunya","meta":{"id":"sangarunya","name_ko":"상가루냐","name_en":"Sangarunya, Corsair Captain","side":"evil","faction":"umbar","role":"hero","weapon":"sword","base":"L","sheet":"null","file":"tokens/sangarunya.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":4,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"huor","meta":{"id":"huor","name_ko":"후오르","name_en":"Huor son of Galdor","side":"good","faction":"men","role":"hero","weapon":"twohanded","base":"L","sheet":"null","file":"tokens/huor.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":7,"strength":5,"defence":5,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"barahir","meta":{"id":"barahir","name_ko":"바라히르","name_en":"Barahir of Ladros","side":"good","faction":"men","role":"hero","weapon":"twohanded","base":"L","sheet":"null","file":"tokens/barahir.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"elendur","meta":{"id":"elendur","name_ko":"엘렌두르","name_en":"Elendur, heir of Isildur","side":"good","faction":"numenor","role":"hero","weapon":"sword","base":"L","sheet":"null","file":"tokens/elendur.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero"]},"recruitable":true,"unlockWave":2,"rarity":"normal"},{"id":"arpharazon","meta":{"id":"arpharazon","name_ko":"아르파라존","name_en":"Ar-Pharazon the Golden","side":"evil","faction":"numenor","role":"hero","weapon":"sword","base":"L","sheet":"null","file":"tokens/arpharazon.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero"]},"recruitable":false,"unlockWave":2,"rarity":"normal"},{"id":"esgaroth_archer","meta":{"id":"esgaroth_archer","name_ko":"에스가로스 궁수","name_en":"Esgaroth Archer","side":"good","faction":"dale","role":"infantry","weapon":"bow","base":"M","sheet":"exp-new-units.png","file":"tokens/esgaroth_archer.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":4,"shootRange":800,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"dale_warrior","meta":{"id":"dale_warrior","name_ko":"데일 전사","name_en":"Dale Warrior","side":"good","faction":"dale","role":"infantry","weapon":"sword_shield","base":"M","sheet":"exp-new-units.png","file":"tokens/dale_warrior.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":3,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0,"rarity":"normal"},{"id":"galadhrim_knight","meta":{"id":"galadhrim_knight","name_ko":"갈라드림 기사","name_en":"Galadhrim Knight","side":"good","faction":"lothlorien","role":"cavalry","weapon":"lance","base":"XL","sheet":"exp-new-units.png","file":"tokens/galadhrim_knight.png","visualBase":"XL","visualRadius":62,"baseMm":40,"artScale":1.0},"profile":{"move":430,"fight":5,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":6,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["elf","mounted"]},"recruitable":true,"unlockWave":3,"rarity":"elite"},{"id":"mahud_raider","meta":{"id":"mahud_raider","name_ko":"마후드 약탈자","name_en":"Mahud Raider","side":"evil","faction":"harad","role":"infantry","weapon":"spear","base":"M","sheet":"exp-new-units.png","file":"tokens/mahud_raider.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":3,"strength":4,"defence":4,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"camel_rider","meta":{"id":"camel_rider","name_ko":"낙타 기병","name_en":"Camel Rider","side":"evil","faction":"harad","role":"cavalry","weapon":"spear","base":"XL","sheet":"exp-new-units.png","file":"tokens/camel_rider.png","visualBase":"XL","visualRadius":62,"baseMm":50,"artScale":1.0},"profile":{"move":430,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["mounted","spear"]},"recruitable":false,"unlockWave":0,"rarity":"normal"},{"id":"morgul_duellist","meta":{"id":"morgul_duellist","name_ko":"모르굴 결투사","name_en":"Morgul Duellist","side":"evil","faction":"mordor","role":"infantry","weapon":"sword","base":"L","sheet":"exp-new-units.png","file":"tokens/morgul_duellist.png","visualBase":"L","visualRadius":47,"baseMm":25},"profile":{"move":260,"fight":5,"strength":4,"defence":6,"attacks":2,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"troll_shaman","meta":{"id":"troll_shaman","name_ko":"트롤 주술사","name_en":"Troll Shaman","side":"evil","faction":"mordor","role":"monster","weapon":"staff","base":"XL","sheet":"exp-new-units.png","file":"tokens/troll_shaman.png","visualBase":"XL","visualRadius":62,"baseMm":60},"profile":{"move":300,"fight":4,"strength":6,"defence":6,"attacks":3,"wounds":3,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster"]},"recruitable":false,"unlockWave":0,"rarity":"elite"},{"id":"rhosgobel_rabbit","meta":{"id":"rhosgobel_rabbit","name_ko":"로스고벨 토끼","name_en":"Rhosgobel Rabbits","side":"good","faction":"other","role":"support","weapon":"claws","base":"M","sheet":"exp-new-units.png","file":"tokens/rhosgobel_rabbit.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":400,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":1,"rarity":"normal"},{"id":"thorondor","meta":{"id":"thorondor","name_ko":"톨론도르","name_en":"Thorondor","side":"good","faction":"eagle","role":"hero","weapon":"talons","base":"XXL","sheet":"exp-new-units.png","file":"tokens/thorondor.png","visualBase":"XXL","visualRadius":78,"baseMm":100},"profile":{"move":430,"fight":9,"strength":7,"defence":7,"attacks":4,"wounds":4,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero","monster","flying"]},"recruitable":true,"unlockWave":6,"rarity":"legendary"}];
for(const def of window.MESBG_EXTRA_UNITS||[])registerUnit(def);
for(const def of window.MESBG_EXTRA_UNITS2)registerUnit(def);
window.MESBG_EXTRA_UNITS3=[{"id":"witchking_spear","meta":{"id":"witchking_spear","name_ko":"마술왕(창)","name_en":"Witch-king, crowned with spear","side":"evil","faction":"angmar","role":"hero","weapon":"twohanded","base":"L","sheet":null,"file":"tokens/witchking_spear.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":7,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":2,"traits":["hero","terror"]},"recruitable":false,"unlockWave":8,"rarity":"legendary"},{"id":"anarion","meta":{"id":"anarion","name_ko":"아나리온","name_en":"Anarion, son of Elendil","side":"good","faction":"numenor","role":"hero","weapon":"sword","base":"L","sheet":null,"file":"tokens/anarion.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","gondor"]},"recruitable":true,"unlockWave":4},{"id":"earendil","meta":{"id":"earendil","name_ko":"에아렌딜","name_en":"Earendil the Mariner","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":null,"file":"tokens/earendil.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":280,"fight":8,"strength":4,"defence":5,"attacks":4,"wounds":3,"courage":8,"shootValue":0,"shootRange":0,"might":3,"will":3,"fate":3,"traits":["hero","elf"]},"recruitable":true,"unlockWave":6},{"id":"maeglin","meta":{"id":"maeglin","name_ko":"매글린","name_en":"Maeglin of Gondolin","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":null,"file":"tokens/maeglin.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","elf"]},"recruitable":true,"unlockWave":4},{"id":"eol","meta":{"id":"eol","name_ko":"에올","name_en":"Eol the Dark Elf","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":null,"file":"tokens/eol.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":6,"strength":5,"defence":6,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":2,"fate":2,"traits":["hero","elf"]},"recruitable":true,"unlockWave":4},{"id":"galdor","meta":{"id":"galdor","name_ko":"갈도르","name_en":"Galdor of the Grey Havens","side":"good","faction":"elf","role":"hero","weapon":"sword","base":"L","sheet":null,"file":"tokens/galdor.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":3,"defence":5,"attacks":2,"wounds":2,"courage":6,"shootValue":0,"shootRange":0,"might":1,"will":2,"fate":2,"traits":["hero","elf"]},"recruitable":true,"unlockWave":4},{"id":"thrain","meta":{"id":"thrain","name_ko":"스라인","name_en":"Thrain, son of Thror","side":"good","faction":"dwarf","role":"hero","weapon":"hammer","base":"GS","sheet":null,"file":"tokens/thrain.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":6,"strength":4,"defence":7,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero","dwarf"]},"recruitable":true,"unlockWave":4},{"id":"thror","meta":{"id":"thror","name_ko":"스로르","name_en":"Thror, King of Erebor","side":"good","faction":"dwarf","role":"hero","weapon":"hammer","base":"GS","sheet":null,"file":"tokens/thror.png","visualBase":"M","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":5,"strength":4,"defence":7,"attacks":2,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero","dwarf"]},"recruitable":true,"unlockWave":4},{"id":"golfimbul","meta":{"id":"golfimbul","name_ko":"골핌불","name_en":"Golfimbul of Mount Gram","side":"evil","faction":"moria","role":"hero","weapon":"twohanded","base":"L","sheet":null,"file":"tokens/golfimbul.png","visualBase":"L","visualRadius":38,"baseMm":25,"artScale":0.85},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":2,"wounds":2,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":3},{"id":"eomund","meta":{"id":"eomund","name_ko":"에오문드","name_en":"Eomund, Marshal of the Riddermark","side":"good","faction":"rohan","role":"hero","weapon":"lance","base":"XL","sheet":null,"file":"tokens/eomund.png","visualBase":"XL","visualRadius":62,"baseMm":50,"artScale":0.75},"profile":{"move":430,"fight":6,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":2,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":4},{"id":"guthlaf","meta":{"id":"guthlaf","name_ko":"구슬라프","name_en":"Guthlaf, banner-bearer of Rohan","side":"good","faction":"rohan","role":"soldier","weapon":"spear","base":"M","sheet":null,"file":"tokens/guthlaf.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":270,"fight":4,"strength":3,"defence":5,"attacks":1,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["spear"]},"recruitable":true,"unlockWave":0},{"id":"corsair_captain","meta":{"id":"corsair_captain","name_ko":"움바 선장","name_en":"Corsair Captain of Umbar","side":"evil","faction":"umbar","role":"hero","weapon":"sword","base":"L","sheet":null,"file":"tokens/corsair_captain.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":5,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":1,"traits":["hero"]},"recruitable":false,"unlockWave":4},{"id":"butterbur","meta":{"id":"butterbur","name_ko":"버터버","name_en":"Barliman Butterbur, innkeeper","side":"good","faction":"bree","role":"civil","weapon":"none","base":"M","sheet":null,"file":"tokens/butterbur.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":250,"fight":2,"strength":2,"defence":3,"attacks":1,"wounds":1,"courage":4,"shootValue":0,"shootRange":0,"might":0,"will":1,"fate":0,"traits":[]},"recruitable":true,"unlockWave":0},{"id":"bill_ferny","meta":{"id":"bill_ferny","name_ko":"빌 페르니","name_en":"Bill Ferny of Bree","side":"evil","faction":"bree","role":"civil","weapon":"club","base":"M","sheet":null,"file":"tokens/bill_ferny.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":260,"fight":3,"strength":3,"defence":4,"attacks":1,"wounds":1,"courage":3,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":false,"unlockWave":0},{"id":"scatha","meta":{"id":"scatha","name_ko":"스카사","name_en":"Scatha the Worm","side":"evil","faction":"dragon","role":"monster","weapon":"none","base":"XXL","sheet":null,"file":"tokens/scatha.png","visualBase":"XXL","visualRadius":91,"baseMm":70},"profile":{"move":340,"fight":6,"strength":6,"defence":7,"attacks":4,"wounds":5,"courage":7,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":["monster","terror"]},"recruitable":false,"unlockWave":10,"rarity":"legendary"},{"id":"war_hound","meta":{"id":"war_hound","name_ko":"전투견","name_en":"War Hound of Rohan","side":"good","faction":"rohan","role":"beast","weapon":"bite","base":"GS","sheet":null,"file":"tokens/war_hound.png","visualBase":"M","visualRadius":38,"baseMm":25},"profile":{"move":400,"fight":3,"strength":3,"defence":4,"attacks":2,"wounds":1,"courage":5,"shootValue":0,"shootRange":0,"might":0,"will":0,"fate":0,"traits":[]},"recruitable":true,"unlockWave":1},{"id":"ingold","meta":{"id":"ingold","name_ko":"인골드","name_en":"Ingold of Minas Tirith","side":"good","faction":"gondor","role":"hero","weapon":"sword","base":"L","sheet":null,"file":"tokens/ingold.png","visualBase":"L","visualRadius":38,"baseMm":25},"profile":{"move":235,"fight":5,"strength":4,"defence":5,"attacks":3,"wounds":3,"courage":6,"shootValue":0,"shootRange":0,"might":2,"will":1,"fate":3,"traits":["hero"]},"recruitable":true,"unlockWave":2},{"id":"theoden_mounted","meta":{"id":"theoden_mounted","name_ko":"세오덴(피어매인)","name_en":"Théoden on Firemane","side":"good","faction":"rohan","role":"hero","weapon":"lance","base":"XL","sheet":null,"file":"tokens/theoden_mounted.png","visualBase":"XL","visualRadius":62,"baseMm":50,"artScale":1.0},"profile":{"move":450,"fight":5,"strength":4,"defence":6,"attacks":3,"wounds":3,"courage":7,"shootValue":0,"shootRange":0,"might":3,"will":2,"fate":3,"traits":["hero","mounted"]},"recruitable":true,"unlockWave":4,"uniqueKey":"theoden","rarity":"epic"}];
for(const def of window.MESBG_EXTRA_UNITS3||[])registerUnit(def);
Object.assign(CX.skills,{witchking_spear:['검은 낙인','will',2,'8인치 내 적 결투 −1, 이동력 −90.',{foe:{r:480,stats:{fight:-1,move:-90}}}],anarion:['엘렌딜의 아들','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],earendil:['실마릴의 빛','will',2,'주변 아군 공포 면역, 8인치 내 적 결투 −1.',{ally:{r:360,protect:1},foe:{r:480,stats:{fight:-1}}}],maeglin:['곤돌린의 광장','might',1,'이번 라운드 결투 +2.',{self:{fight:2}}],eol:['어둠의 대장장이','might',1,'이번 라운드 Attack +1, 힘 +1.',{self:{attacks:1,strength:1}}],galdor:['회색 항구의 안내자','will',1,'6인치 내 아군 Defense +1.',{ally:{r:360,stats:{defence:1}}}],thrain:['스라인의 인장','might',1,'6인치 내 드워프 아군 결투 +1.',{ally:{r:360,trait:'dwarf',stats:{fight:1}}}],thror:['에레보르의 왕','might',1,'이번 라운드 결투 +1, Defense +1.',{self:{fight:1,defence:1}}],eomund:['리더마크의 장수','might',1,'6인치 내 기병 아군 결투 +1, 이동력 +60.',{ally:{r:360,trait:'mounted',stats:{fight:1,move:60}}}],golfimbul:['그램산의 난동자','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],corsair_captain:['검은 함대의 선장','might',1,'6인치 내 아군 결투 +1.',{ally:{r:360,stats:{fight:1}}}],butterbur:['한 잔 더!','will',1,'주변 아군 1명 상처 1 회복.',{heal:{r:360,n:1}}]});
Object.assign(CX.skills,{amdur:['하라드의 왕','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],annatar:['선물의 주인','will',2,'8인치 내 적 용기 −2.',{foe:{r:480,stats:{courage:-2}}}],arpharazon:['누메노르의 황금왕','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],ashrak:['거미 사냥꾼','will',1,'8인치 내 적 결투 −1.',{foe:{r:480,stats:{fight:-1}}}],azog_foot:['더 팔은 고블린','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],beorn_bear:['거대한 곰의 진노','might',1,'이번 라운드 힘 +2, Attack +1.',{self:{strength:2,attacks:1}}],bifur:['이마의 도끼','might',1,'이번 라운드 Attack +1, 용기 +2.',{self:{attacks:1,courage:2}}],bofur:['맷돼지 창','might',1,'이번 라운드 결투 +1, 용기 +2.',{self:{fight:1,courage:2}}],bombur:['무거운 발걸음','might',1,'이번 라운드 Defense +1, 용기 +1.',{self:{defence:1,courage:1}}],carcharoth:['붉은 아귀','might',1,'이번 라운드 Attack +1, 힘 +1.',{self:{attacks:1,strength:1}}],castellan:['돌 구덩이의 관리인','will',1,'8인치 내 적 결투 −1.',{foe:{r:480,stats:{fight:-1}}}],dalamyr:['칸드의 전장','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],dori:['드워프의 등판','might',1,'이번 라운드 Defense +1, 결투 +1.',{self:{defence:1,fight:1}}],dungeon_keeper:['지하 감옥의 관리인','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],durburz:['모리아의 왕','might',1,'6인치 내 아군 결투 +1.',{ally:{r:360,stats:{fight:1}}}],far_harad_chieftain:['먼 하라드의 족장','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],fimbul:['워그 대장','might',1,'6인치 내 기병 아군 결투 +1, 이동력 +60.',{ally:{r:360,trait:'mounted',stats:{fight:1,move:60}}}],forsaken:['버려진 자의 저주','will',1,'8인치 내 적 용기 −1.',{foe:{r:480,stats:{courage:-1}}}],golden_king:['아브라탄의 황금왕','might',1,'이번 라운드 결투 +1, Defense +1.',{self:{fight:1,defence:1}}],gorulf:['고룰프의 격노','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],grishnakh:['모르도르의 추격자','might',1,'6인치 내 아군 이동력 +60.',{ally:{r:360,stats:{move:60}}}],guritz:['모굴 부관','might',1,'6인치 내 아군 결투 +1.',{ally:{r:360,stats:{fight:1}}}],gwaihir:['바람의 왕','might',1,'이번 라운드 Attack +1, 가장 가까운 적을 밀어냅니다.',{self:{attacks:1},push:120}],hasharin:['침묵의 칼날','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],huan:['발리노르의 사냥개','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],kardush:['오크 주술사','will',2,'8인치 내 적 용기 −2.',{foe:{r:480,stats:{courage:-2}}}],khandish_chieftain:['칸드의 족장','might',1,'6인치 내 아군 결투 +1.',{ally:{r:360,stats:{fight:1}}}],mahud_beastmaster:['무마킬 조련사','might',1,'6인치 내 몬스터 아군 결투 +1.',{ally:{r:360,trait:'monster',stats:{fight:1}}}],narzug:['오크 정찰병','might',1,'이번 라운드 이동력 +60, 결투 +1.',{self:{move:60,fight:1}}],nori:['도끼 던지기','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],numenorean_marshal:['누메노르의 원수','might',1,'6인치 내 아군 결투 +1.',{ally:{r:360,stats:{fight:1}}}],oin:['불꽃의 방패','might',1,'이번 라운드 Defense +1, 용기 +1.',{self:{defence:1,courage:1}}],orc_sergeant:['오크 하사관','might',1,'이번 라운드 결투 +1.',{self:{fight:1}}],ori:['드워프의 서기','might',1,'이번 라운드 Defense +1.',{self:{defence:1}}],sangarunya:['하라드의 사령술','will',1,'8인치 내 적 용기 −1.',{foe:{r:480,stats:{courage:-1}}}],sauron_wolf:['어둠의 변신','will',2,'이번 라운드 Attack +1, 힘 +1.',{self:{attacks:1,strength:1}}],snaga:['겁쟁이의 발버둥','might',1,'이번 라운드 용기 +1.',{self:{courage:1}}],targsh:['오크 대장','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],thorondor:['마누웨의 독수리','might',1,'이번 라운드 Attack +1, 가장 가까운 적을 밀어냅니다.',{self:{attacks:1},push:120}],thrydan:['둔랜드의 복수','might',1,'이번 라운드 Attack +1, 결투 +1.',{self:{attacks:1,fight:1}}],ufthak:['뚱보 오크의 돌진','might',1,'이번 라운드 용기 +2.',{self:{courage:2}}],wulf:['둔랜드의 칼날','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],yazneg:['야즈네그의 돌진','might',1,'6인치 내 기병 아군 이동력 +60.',{ally:{r:360,trait:'mounted',stats:{move:60}}}],zagdush:['청동빌 클리버','might',1,'이번 라운드 Attack +1.',{self:{attacks:1}}],aragorn:['안두릴의 검왕','might',1,'이번 라운드 결투 +1, Attack +1.',{self:{fight:1,attacks:1}}],boromir:['곤도르의 뿔','might',1,'8인치 내 적 용기 −1.',{foe:{r:480,stats:{courage:-1}}}],glorfindel_foot:['발로그 사냥꾼','might',1,'이번 라운드 결투 +1, Attack +1.',{self:{fight:1,attacks:1}}],glorfindel_mounted:['빛나는 신위','will',1,'6인치 내 아군 결투 +1, 공포 방어 +1.',{ally:{r:360,stats:{fight:1},protect:1}}],gothmog:['펠렌노르의 사령관','might',1,'6인치 내 아군 결투 +1.',{ally:{r:360,stats:{fight:1}}}],witchking_fellbeast:['앙그마르의 마술왕','will',2,'8인치 내 적 용기 −2.',{foe:{r:480,stats:{courage:-2}}}]});


const LORE_FIX={fingolfin:{fight:9,strength:5,defence:7,courage:9,might:4},feanor:{fight:9,strength:5,courage:8},fingolfin_mounted:{fight:9,strength:5,defence:6,courage:9,might:4},gil_galad:{fight:9,strength:6,courage:8},turin:{fight:8,strength:5,courage:7},beren:{fight:6,defence:5,courage:7,fate:3},beleg:{fight:6,strength:4,shootValue:2,shootRange:880},luthien:{fight:4,will:12,might:3,fate:3},thranduil:{fight:7,courage:7},thranduil_mounted:{fight:7,courage:7},cirdan:{fight:7,will:9},mablung:{fight:6,strength:4,courage:6},isildur:{fight:7,courage:8},elendil:{fight:8,strength:5},arwen:{fight:4,will:6},elladan:{fight:6,attacks:3},elrohir:{fight:6,attacks:3},glorfindel_foot:{fight:9,courage:8},glorfindel_mounted:{fight:9,courage:8},gothmog_balrog:{fight:9,strength:8,wounds:9},glaurung:{fight:9,strength:8,defence:9,wounds:10},ungoliant:{fight:9,strength:8,wounds:12},ancalagon:{fight:10,strength:9,wounds:12},smaug:{strength:8,wounds:10},carcharoth:{fight:8,strength:7,wounds:6},draugluin:{fight:7,strength:6,wounds:5},thuringwethil:{fight:6,wounds:5},boldog:{fight:7},necromancer:{fight:6,will:12}};
for(const[li,lx]of Object.entries(LORE_FIX)){const lp=zt[li];if(!lp)continue;Object.assign(lp,lx);const lc=UnitCatalog[li];if(lc){lc.points=estimatePoints(lp);lc.recruitCost=Math.max(30,Math.round(lc.points*.8/5)*5);if(typeof heroGrade==='function'&&typeof isHeroUnit==='function'&&isHeroUnit(li,lc.meta.role))lc.rarity=heroGrade(li,lc.points,'hero');}}
const LORE_FIX2={nazgul_sword:{fight:7,defence:6,wounds:3,will:10},nazgul_sword_2:{fight:7,defence:6,wounds:3,will:10},nazgul_mace:{fight:7,defence:6,wounds:3,will:10},nazgul_mounted:{fight:7,defence:6,wounds:3,will:10},khamul:{fight:7,defence:6,wounds:3,will:10},dark_marshal:{fight:7,defence:6,wounds:3,will:12},shadow_lord:{fight:6,defence:6,wounds:3,will:10},betrayer:{fight:7,defence:6,wounds:3,will:10},tainted:{fight:6,defence:6,wounds:3,will:8},undying:{fight:7,defence:6,wounds:3,will:14},knight_of_umbar:{fight:7,defence:6,wounds:3,will:8},dwimmerlaik:{fight:7,defence:6,wounds:3,will:10},witchking_foot:{fight:8,defence:8,courage:8},witchking_foot_mace:{fight:8,defence:8,courage:8},witchking_mounted:{fight:8,defence:8,courage:8},witchking_mounted_sheet:{fight:8,defence:8,courage:8},witchking_fellbeast:{fight:8,strength:5,defence:8,attacks:3,wounds:4,courage:8},nazgul_fellbeast:{fight:7,strength:5,defence:7,attacks:3,wounds:4}};
for(const[li,lx]of Object.entries(LORE_FIX2)){const lp=zt[li];if(lp)Object.assign(lp,lx);}
const LORE_PTS={nazgul_sword:70,nazgul_sword_2:70,nazgul_mace:70,nazgul_mounted:85,khamul:80,dark_marshal:95,shadow_lord:80,betrayer:85,tainted:75,undying:95,knight_of_umbar:65,dwimmerlaik:80,khandish_chieftain:90,nazgul_fellbeast:130,witchking_foot:230,witchking_foot_mace:230,witchking_mounted:255,witchking_mounted_sheet:255,witchking_fellbeast:270};
for(const[li,np]of Object.entries(LORE_PTS)){const lc=UnitCatalog[li];if(!lc)continue;lc.points=np;lc.recruitCost=Math.max(30,Math.round(np*.8/5)*5);if(typeof heroGrade==='function')lc.rarity=heroGrade(li,np,'hero');}
if(UnitCatalog.witchking_fellbeast)UnitCatalog.witchking_fellbeast.uniqueKey='witchking';
// MESBG army-book Might/Will/Fate — Armies of LotR / The Hobbit 프로필 기준.
const ARMY_RESOURCES={aragorn:{might:3,will:3,fate:3},aragorn_mounted:{might:3,will:3,fate:3},aragorn_blackgate:{might:3,will:3,fate:3},aragorn_blackgate_mounted:{might:3,will:3,fate:3},boromir:{might:6,will:1,fate:3},boromir_mounted:{might:6,will:1,fate:3},legolas:{might:3,will:1,fate:2},gimli:{might:3,will:1,fate:3},gandalf:{might:1,will:6,fate:3},gandalf_mounted:{might:1,will:6,fate:3},gandalf_white:{might:1,will:6,fate:3},gandalf_white_mounted:{might:1,will:6,fate:3},theoden:{might:3,will:2,fate:3},theoden_foot:{might:3,will:2,fate:3},theoden_mounted:{might:3,will:2,fate:3},elrond:{might:3,will:6,fate:3},elrond_mounted:{might:3,will:6,fate:3},glorfindel_foot:{might:3,will:3,fate:3},glorfindel_mounted:{might:3,will:3,fate:3},saruman:{might:2,will:6,fate:3},sauron:{might:3,will:8,fate:3},gothmog:{might:3,will:2,fate:3},eowyn:{might:3,will:1,fate:3},eowyn_mounted:{might:3,will:1,fate:3},eomer:{might:3,will:2,fate:3},eomer_mounted:{might:3,will:2,fate:3},eomer_foot:{might:3,will:2,fate:3},faramir:{might:3,will:2,fate:3},faramir_mounted:{might:3,will:2,fate:3},imrahil:{might:3,will:2,fate:3},imrahil_mounted:{might:3,will:2,fate:3},haldir:{might:2,will:2,fate:3},galadriel:{might:2,will:6,fate:3},celeborn:{might:3,will:3,fate:3},elendil:{might:3,will:3,fate:3},feanor:{might:3,will:4,fate:3},beren:{might:3,will:2},thranduil:{might:3,will:3,fate:3},thranduil_mounted:{might:3,will:3,fate:3},beorn:{might:3,will:3,fate:3},beorning:{might:2,will:1,fate:2},grimbeorn:{might:2,will:2,fate:3},frodo:{might:0,will:3,fate:3},samwise:{might:3,will:1,fate:3},merry:{might:3,will:1,fate:3},pippin:{might:3,will:1,fate:3},pippin_citadel:{might:3,will:1,fate:3},bilbo:{might:0,will:2,fate:3},mt_captain:{might:2,will:2,fate:3},numenorean_captain:{might:2,will:2,fate:3},witchking_fellbeast:{might:2,will:5,fate:3},witchking_foot:{might:2,will:5,fate:3},witchking_foot_mace:{might:2,will:5,fate:3},witchking_mounted:{might:2,will:5,fate:3},witchking_mounted_sheet:{might:2,will:5,fate:3},nazgul_sword:{might:1,fate:1},nazgul_sword_2:{might:1,fate:1},nazgul_mace:{might:1,fate:1},nazgul_mounted:{might:1,fate:1},dwimmerlaik:{might:1,fate:1},khamul:{might:1,fate:2},muzgur:{might:1,will:2,fate:1},dark_marshal:{might:1,fate:1},shadow_lord:{might:1,fate:1},betrayer:{might:3,fate:1},tainted:{might:1,fate:1},undying:{might:1,fate:3},knight_of_umbar:{might:1,fate:1},mouth_of_sauron:{might:1,will:4,fate:3},lurtz:{might:2,will:1,fate:3},sharku:{might:2,will:1,fate:3},uruk_captain:{might:2,will:1,fate:3},orc_captain:{might:2,will:1,fate:3},orc_taskmaster:{might:2,will:1,fate:3},goblin_king:{might:2,will:2,fate:3},bolg:{might:2,will:1,fate:3},easterling_warlord:{might:2,will:2,fate:3},harad_chieftain:{might:2,will:1,fate:3},mahud_chieftain:{might:2,will:1,fate:3},suladan:{might:2,will:1,fate:3},king_of_the_dead:{might:1,will:3,fate:3},grima:{might:1,will:3,fate:3},radagast:{might:3,will:6,fate:3},barrow_wight:{might:1,will:3,fate:1},melkor:{might:4,will:10,fate:3},azog:{might:3,will:2,fate:3},azog_warg_rider:{might:3,will:2,fate:3},boldog:{might:2,will:2,fate:3},shagrat:{might:2,will:1,fate:3},gorbag:{might:2,will:1,fate:3},ugluk:{might:2,will:1,fate:3},mauhur:{might:2,will:1,fate:3},vrasku:{might:2,will:1,fate:3},warg_chieftain:{might:1,will:1,fate:2},necromancer:{might:2,fate:3},gil_galad:{might:3,will:3,fate:3},arwen:{might:1,fate:3},cirdan:{might:3,fate:3},gamling:{might:2,will:2,fate:3},halbarad:{might:2,will:3,fate:3},beregond:{might:2,will:2,fate:3},elladan:{might:3,will:2,fate:3},elrohir:{might:3,will:2,fate:3},thorin:{might:3,will:2,fate:3},fili:{might:2,will:1,fate:3},kili:{might:2,will:1,fate:3},balin:{might:2,will:2,fate:3},dwalin:{might:3,will:1,fate:3},gloin:{might:2,will:2,fate:3},dain:{might:3,will:2,fate:3},dain_boar:{might:3,will:2,fate:3},iron_hills_captain:{might:2,will:2,fate:3},durin_vi:{might:3,will:3,fate:3},azaghal:{might:3,will:2,fate:3},nain:{might:3,will:2,fate:3},bard:{might:3,will:2,fate:3},tauriel:{might:3,will:1,fate:3},beleg:{might:3,will:2,fate:3},turin:{might:3,will:2,fate:3},forlong:{might:2,will:2,fate:3},mablung:{might:3,will:2,fate:3},rumil:{might:2,will:1,fate:3},orophin:{might:2,will:1,fate:3},anborn:{might:2,will:2,fate:3},madril:{might:2,will:2,fate:3},damrod:{might:2,will:1,fate:3},duinhir:{might:2,will:2,fate:3},harding:{might:2,will:1,fate:3},turgon:{might:3,will:4,fate:3},ecthelion:{might:3,will:3,fate:3},fingon:{might:3,will:3,fate:3},maedhros:{might:3,will:3,fate:3},celegorm:{might:3,will:3,fate:3},finrod_felagund:{might:3,will:5,fate:3},tuor:{might:3,will:3,fate:3},hurin_thalion:{might:3,will:3,fate:3},thingol:{might:3,will:4,fate:3},tom_bombadil:{might:1,will:6,fate:3},goldberry:{might:1,will:4,fate:3},isildur:{might:3,will:3,fate:3},denethor:{might:1,will:2,fate:3},erestor:{might:2,will:2,fate:3},lindir:{might:1,will:4,fate:3},elfhelm:{might:2,will:2,fate:3},erkenbrand:{might:3,will:2,fate:3},hirluin:{might:2,will:2,fate:3},irolas:{might:2,will:2,fate:3},hurin:{might:2,will:2,fate:3},cirion:{might:3,will:2,fate:3},theodred:{might:3,will:2,fate:3},hama:{might:2,will:2,fate:3},deorwine:{might:2,will:2,fate:3},grimbold:{might:3,will:2,fate:3},arvedui:{might:3,will:2,fate:3},malbeth:{might:1,will:4,fate:3},paladin_took:{might:2,will:2,fate:3},farmer_maggot:{might:2,will:1,fate:3},fredegar:{might:1,will:1,fate:2},arathorn:{might:3,will:2,fate:3},angbor:{might:2,will:2,fate:3},dunhere:{might:2,will:1,fate:3},haleth:{might:2,will:1,fate:3},bandobras:{might:3,will:2,fate:3},gildor:{might:2,will:3,fate:3},eorl_the_young:{might:3,will:2,fate:3},helm_hammerhand:{might:3,will:2,fate:3},dervorin:{might:2,will:2,fate:3},mablung_sindar:{might:3,will:2,fate:3},melian:{might:3,will:6,fate:3},mim:{might:2,will:1,fate:3},mirkwood_captain:{might:2,will:2,fate:3},hera:{might:3,will:2,fate:3},frealaf:{might:3,will:2,fate:3},duilin:{might:2,will:1,fate:3},derufin:{might:2,will:1,fate:3},hirgon:{might:2,will:1,fate:3},ingold:{might:2,will:1,fate:3},lobelia:{might:1,will:1,fate:2},will_whitfoot:{might:1,will:2,fate:2},pallando:{might:2,will:6,fate:3},alatar:{might:2,will:6,fate:3},maglor:{might:3,will:4,fate:3},gwindor:{might:3,will:2,fate:3},celebrimbor:{might:3,will:3,fate:3},daeron:{might:1,will:4,fate:3},earnur:{might:3,will:2,fate:3},huor:{might:3,will:2,fate:3},barahir:{might:3,will:2,fate:3},elendur:{might:3,will:2,fate:3},thorondor:{might:3,will:2,fate:3}};
for(const[ri,rx]of Object.entries(ARMY_RESOURCES)){const lp=zt[ri];if(!lp)continue;const lw=lp.might,ll=lp.will,lf=lp.fate;Object.assign(lp,rx);const lc=UnitCatalog[ri];if(lc&&!LORE_PTS[ri]&&(lw!==lp.might||ll!==lp.will||lf!==lp.fate)){lc.points=estimatePoints(lp);lc.recruitCost=Math.max(30,Math.round(lc.points*.8/5)*5);if(typeof heroGrade==='function'&&typeof isHeroUnit==='function'&&isHeroUnit(ri,lc.meta.role))lc.rarity=heroGrade(ri,lc.points,'hero');}}
// MESBG: 스킬 보유 유닛이 최소 자원을 갖도록 — 아미북 마이너 영웅 기본값(M2/W1/F3)으로 데드 스킬 해제.
for(const si of Object.keys(CX.skills)){const lp=zt[si];if(lp&&!lp.might&&!lp.will&&!lp.fate){lp.might=2;lp.will=1;lp.fate=3;}}
// ---- themed enemy composition per campaign map ----
const __origStageInfo=P.stageInfo;
P.stageInfo=function(n){
    const info=__origStageInfo.call(this,n);
    const theme=(window.MESBG_STAGE_THEME||{})[info.map];
    if(!theme)return info;
    const count=Math.min(24,4+Math.floor(n*.85));
    const pick=(pool,i)=>pool&&pool.length?pool[(n*7+i*5+(i>>2))%pool.length]:null;
    const ids=[];
    for(let i=0;i<count;i++){
        const r=(n*13+i*17)%20;
        let id=r<10?pick(theme.foot,i):r<15?pick(theme.spec,i):r<17?(pick(theme.cav,i)||pick(theme.elite,i)):r<19?pick(theme.elite,i):pick(theme.monster,i);
        if (n < 4 && id && zt[id]?.traits.includes('monster') || n < 3 && id && zt[id]?.traits.includes('mounted')) id=pick(theme.foot,i);
        if(n>=3 && i%5===3){const spear=(theme.spec||[]).find(k=>/spear|pike/.test(this.meta.get(k)?.weapon||''));if(spear)id=spear;}
        ids.push(id||pick(theme.foot,i));
    }
    if(n>3)ids.push(pick(theme.hero,n)||'orc_captain');
    if(n>9&&n%4===2)ids.push(pick(theme.monster,n)||'mountain_troll');
    if(n>40){const L=window.MESBG_LEGEND_POOL||[];for(let i=0;i<Math.min(3,1+Math.floor((n-40)/10));i++)ids.push(L[(n+i*3)%L.length]);}
    if(info.boss)ids.push(info.boss);
    else if(info.mission==='commander')ids.push(n>8?(pick(theme.hero,n*2)||'orc_captain'):'orc_captain');
    if(info.modifier==='warg')ids.push('warg_rider','warg_rider');
    info.ids=ids;
    return info;
};

/* ---- LWB tactical upgrade (merged) ---- */
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
  if(u.side!==front.side||!contact(u,front)||!clear(u,front))continue;
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
 const g=Math.max(...r.diceResults.good),e=Math.max(...r.diceResults.evil),f=r.fightValues,onHill=u=>terrain.some(t=>t.z==='hill'&&t.active&&le(u,t,0)),hillAdv=s=>group.some(u=>u.side===s&&onHill(u))&&!group.some(u=>u.side!==s&&onHill(u));r.winnerSide=g!==e?(g>e?'good':'evil'):hillAdv('good')?'good':hillAdv('evil')?'evil':f.good!==f.evil?(f.good>f.evil?'good':'evil'):priority;
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

window.LWB_TERRAIN_DEFS=[{"id":"terr_fallen_log","name":"쓰러진 통나무","file":"tokens/terr_fallen_log.png","visualBase":"M","visualRadius":0.72}];
// ---- Tactical upgrade overlay (ported from feat/last-war-band-tactical-upgrade) ----
const metaFor = id => q.meta.get(id);
const __lwbRoleNames = { infantry: '전열', support: '창 지원', archer: '사격', cavalry: '기병 돌격', monster: '괴수', hero: '영웅 지휘' };
const supportFor = (group, all = q.alive()) => window.LWBTactics.supportLinks(group, all, metaFor, (a, b) => _t(a, b, q.terrain) === 'clear');
supportAlly = function (u) {
    const all = q.alive();
    for (const group of Oe(all)) {
        const l = supportFor(group, all).find(l => l.unit.uid === u.uid);
        if (l) return l.via;
    }
    return null;
};
for (const def of (window.LWB_TERRAIN_DEFS || []))
    if (!q.meta.has(def.id)) q.meta.set(def.id, def);
const __lwbBR = P.beginRound;
P.beginRound = function () { for (const u of this.units) u.supportSpent = false; return __lwbBR.call(this); };
const __lwbAC = P.applyCombat;
P.applyCombat = function (r) {
    for (const id of r.supports || []) { const u = this.unit(id); if (u) u.supportSpent = true; }
    for (const id of r.knockedDownUnits || []) { const u = this.unit(id); if (u) u.prone = true; }
    return __lwbAC.call(this, r);
};
const __lwbHC = P.heroic;
P.heroic = function (uid, key) {
    const u = this.unit(uid);
    if (!u || !['move', 'shoot', 'fight'].includes(this.phase) || (this.mode === 'ai' && this.side === 'evil' && this.phase !== 'fight')) return false;
    if (this.phase === 'fight' && !this.fightQueue.some(g => g.includes(uid))) return false;
    return __lwbHC.call(this, uid, key);
};
const __lwbDR = P.drain;
P.drain = function () {
    const e = __lwbDR.call(this);
    return e.some(e => e.result) ? [...e.filter(e => e.type !== 'UnitKilled'), ...e.filter(e => e.type === 'UnitKilled')] : e;
};
be = function (b, u) {
    if (b.engaged(u) || b.remaining(u) < 12) return null;
    const all = b.alive(), foes = b.alive(Ht(u.side)); if (!foes.length) return null;
    const role = window.LWBTactics.role(u, metaFor), budget = b.remaining(u);
    if (role === 'support' && supportFor(Oe(all).flat(), all).some(l => l.unit.uid === u.uid)) return null;
    const score = p => window.LWBTactics.positionScore(u, p, all, metaFor, b.mission === 'defense' ? Mt.objective : null, (a, v) => _t(a, v, b.terrain)), options = [], reach = role === 'archer' && !u.moved ? Math.min(budget, u.stats.move / 2) : budget;
    for (const amount of [reach, reach * .65, reach * .32])
        for (let i = 0; i < 16; i++) {
            const a = i * Math.PI / 8, p = { x: u.x + Math.cos(a) * amount, y: u.y + Math.sin(a) * amount };
            if (Et(u, p, all, b.terrain)) options.push({ p, score: score(p) });
        }
    if (role === 'support')
        for (const f of all.filter(v => v.side === u.side && v.uid !== u.uid && !v.traits.includes('mounted') && !v.traits.includes('monster'))) {
            const e = foes.slice().sort((a, c) => ht(f, a) - ht(f, c))[0], d = ht(f, e) || 1, p = { x: f.x + (f.x - e.x) / d * (u.radius + f.radius + 1), y: f.y + (f.y - e.y) / d * (u.radius + f.radius + 1) };
            if (Et(u, p, all, b.terrain)) options.push({ p, score: score(p) });
        }
    const current = score(u);
    for (const c of options.sort((a, b) => a.score - b.score).slice(0, 8)) {
        if (c.score >= current - 8) continue;
        const p = ve(u, c.p, all, b.terrain, budget, { snap: false });
        if (p && p.distance >= 12) return p.to;
    }
    return null;
};
He = function (b) {
    const order = { infantry: 0, monster: 1, hero: 2, cavalry: 3, support: 4, archer: 5 },
        _cand = b.eligible(),
        _pool = b.side === 'good' && !AUTO ? _cand.filter(x => x.autoAlly) : _cand,
        u = _pool.sort((a, c) => order[window.LWBTactics.role(a, id => b.meta.get(id))] - order[window.LWBTactics.role(c, id => b.meta.get(id))])[0];
    if (!u) { if (b.side === 'good' && !AUTO && _cand.length) return; b.advance(); return; }
    if (CX.skills[u.id] && !b.skillReason(u)) b.skill(u.uid);
    b.autoSpell(u);
    if (!b.canAct(u)) return;
    const role = window.LWBTactics.role(u, id => b.meta.get(id));
    if (b.phase === 'move') {
        const foes = b.alive(Ht(u.side));
        const near = foes.filter(v => ht(u, v) <= u.stats.move + u.radius + v.radius + 20);
        const canShoot = role === 'archer' && foes.some(v => ht(u, v) <= (u.stats.shootRange || 0) && _t(u, v, b.terrain) === 'clear');
        if (role !== 'support' && !b.engaged(u) && (role !== 'archer' || !canShoot || near.length)) {
            const _dd = b.difficulty || 'normal', _wf = _dd === 'easy' ? 0 : _dd === 'despair' ? 55 : 35;
            const value = v => ht(u, v) + (role === 'cavalry' ? (v.traits.includes('mounted') ? 130 : v.stats.shootRange ? -100 : 0) : 0) + (role === 'hero' ? b.alive(u.side).filter(f => Vt(f, v)).length * -90 : 0) - Math.min(2, v.stats.wounds-v.currentWounds)*_wf - (_dd === 'despair' ? v.stats.defence*14 : 0) + (v.stats.fight>u.stats.fight+2?65:0);
            for (const foe of foes.sort((a, c) => value(a) - value(c)).slice(0, 5))
                if (b.charge(u.uid, foe.uid)) return;
        }
        const dest = be(b, u);
        let done = !!dest && b.move(u.uid, dest);
        if (!done && role === 'archer' && foes.length) {
            const f = foes.slice().sort((a, c) => ht(u, a) - ht(u, c))[0], d = ht(u, f), rng = u.stats.shootRange || 0;
            if (rng && d < rng * 0.45) {
                // 카이팅: 사거리 안쪽으로 파고든 적이 있으면 사선 유지 거리까지 후퇴
                const back = Math.min(u.stats.move, rng * 0.8 - d);
                if (back > 20) done = b.move(u.uid, { x: u.x - (f.x - u.x) / d * back, y: u.y - (f.y - u.y) / d * back });
            }
            if (!done && d > rng * 0.7) {
                const step = Math.min(u.stats.move / 2, d - rng * 0.7);
                done = b.move(u.uid, { x: u.x + (f.x - u.x) / d * step, y: u.y + (f.y - u.y) / d * step });
            }
        }
        if (!done) b.wait(u.uid);
    } else if (b.phase === 'shoot') {
        const _d = b.difficulty || 'normal', target = b.validTargets(u).sort((a, c) => _d === 'easy' ? ht(u, a) - ht(u, c) : _d === 'despair' ? (a.currentWounds * 6 + a.stats.defence) - (c.currentWounds * 6 + c.stats.defence) || ht(u, a) - ht(u, c) : a.currentWounds - c.currentWounds || ht(u, a) - ht(u, c))[0];
        if (!target || !b.shoot(u.uid, target.uid)) b.wait(u.uid);
    }
};
const __lwbSI = P.stageInfo;
P.stageInfo = function (n) {
    const info = __lwbSI.call(this, n), counts = {};
    for (const id of info.ids || []) {
        const p = zt[id]; if (!p) continue;
        const r = window.LWBTactics.role({ id, traits: p.traits, stats: p }, metaFor);
        counts[r] = (counts[r] || 0) + 1;
    }
    info.scouting = Object.entries(counts).map(([r, n]) => __lwbRoleNames[r] + ' ' + n).join(' · ');
    return info;
};
const __lwbSI2 = P.stageInfo;
P.stageInfo = function (n) {
    const info = __lwbSI2.call(this, n);
    if (this.weeklySeed) {
        const r = this.weeklySeed % 12;
        if (r === 0)
            info.ids = info.ids.concat(info.ids.slice(0, Math.max(1, Math.ceil(info.ids.length * .4))));
        if (r === 1 && n % 3 === 0 && !info.boss) {
            const pool = ['cave_troll', 'scatha', 'witchking_fellbeast', 'khamul', 'stone_giant', 'balrog', 'ungoliant', 'sauron', 'ancalagon', 'morgoth'];
            info.boss = pool[Math.floor(n / 3) % pool.length];
            info.mission = 'commander';
            info.ids.push(info.boss);
        }
        if (r === 2)
            info.ids = info.ids.map(id => zt[id] && zt[id].shootRange ? 'orc_sword' : id);
    }
    return info;
};
const __lwbPS = P.prepareStage;
P.prepareStage = function () {
    __lwbPS.call(this);
    const points = [[[650, 840], [1680, 850]], [[790, 840], [1540, 960]], [[480, 950], [1780, 780]]][(this.wave + this.mapIndex) % 3];
    const zones = this.terrain.filter(t => t.z), free = (p, w) => !zones.some(z => le(p, z, w / 2 + 80));
    ['terr_rock_outcrop', 'terr_ruined_wall'].forEach((id, i) => {
        const t = this.terrain.find(t => t.id === id);
        if (!t) return;
        for (const dx of [0, -180, 180, -360, 360])
            if (free({ x: points[i][0] + dx, y: points[i][1] }, t.w)) { t.x = points[i][0] + dx; t.y = points[i][1]; return; }
        t.active = false;
    });
    const tid = this.mapIndex % 2 ? 'terr_crates' : 'terr_fallen_log';
    for (const dx of [0, -200, 200, -420, 420])
        if (free({ x: 1165 + dx, y: 850 }, 150)) { this.terrain.push({ id: tid, x: 1165 + dx, y: 850, w: 150, h: 105, kind: 'cover', active: true }); break; }
    const _tp = [[1000, 470], [1330, 470], [1165, 600], [820, 560], [1510, 560]];
    for (const [i, d] of (this.devices || []).entries()) {
        d.x = _tp[i % _tp.length][0] + Math.floor(i / _tp.length) * 90;
        d.y = _tp[i % _tp.length][1] + Math.floor(i / _tp.length) * 40;
        d.armed = true;
    }
    const _hz = [[815, 548], [1510, 548], [520, 742], [1830, 742], [1165, 690]];
    for (let i = 0; i < 1 + (this.wave % 2); i++) {
        const [hx, hy] = _hz[(this.wave * 2 + i) % _hz.length];
        this.devices.push({ type: 'barrel', neutral: true, armed: true, x: hx, y: hy, trigger: 55, radius: 140 });
    }
};
const __lwbSV = P.save;
P.save = function () {
    __lwbSV.call(this);
    if (!['preparation', 'reward'].includes(this.phase)) return;
    try {
        const raw = localStorage.getItem('mesbg-endless-save'); if (!raw) return;
        const s = JSON.parse(raw);
        s.tactical = { version: 1, mapIndex: this.mapIndex, mission: this.mission, current: this.current, next: this.next, terrain: this.terrain };
        localStorage.setItem('mesbg-endless-save', JSON.stringify(s));
    } catch { this.emit('SaveFailed', '저장 공간을 확인하세요. 현재 원정을 저장하지 못했습니다.'); }
};
const __lwbRS = P.resume;
P.resume = function () {
    if (!__lwbRS.call(this)) return false;
    const t = JSON.parse(localStorage.getItem('mesbg-endless-save'))?.tactical;
    if (t?.version === 1) {
        for (const k of ['mapIndex', 'mission', 'current', 'next']) if (t[k] !== undefined) this[k] = t[k];
        if (this.phase === 'reward' && Array.isArray(t.terrain)) this.terrain = t.terrain;
    } else if (this.phase === 'reward') {
        this.current = this.stageInfo(Math.max(1, this.wave));
        this.mapIndex = this.current.map;
        this.mission = this.current.mission;
    }
    // JSON cannot preserve event callbacks; restore from the canonical event definition.
    if (this.campStep === 'event' && !this.eventOutcome) {
        this.campEvent = LWB_EVENTS.find(e => e.id === this.campEvent?.id) || null;
        if (!this.campEvent) this.rollCampEvent();
    }
    this.campDraft = this.campDraft?.step === this.campStep ? this.campDraft : null;
    for (const u of this.units) {
        u.supportSpent = false;
        const m = this.meta.get(u.id);
        if (m && m.baseMm) u.radius = m.baseMm * UNIT_RULES.worldPerMm / 2;
    }
    return true;
};
const __lwbSE = P.spawnEnemies;
P.spawnEnemies = function (ids) {
    const before = new Set(this.units.map(u => u.uid));
    __lwbSE.call(this, ids);
    const added = this.alive('evil').filter(u => !before.has(u.uid)), original = new Map(added.map(u => [u.uid, { x: u.x, y: u.y }]));
    for (const u of added) { u.x = -1000; u.y = -1000; }
    const order = { infantry: 0, monster: 1, hero: 2, support: 3, archer: 4, cavalry: 5 }, count = {};
    for (const u of added.sort((a, b) => order[window.LWBTactics.role(a, metaFor)] - order[window.LWBTactics.role(b, metaFor)])) {
        const r = window.LWBTactics.role(u, metaFor), i = count[r] || 0;
        count[r] = i + 1;
        const cols = [1165, 1010, 1320, 855, 1475, 700, 1630, 545, 1785], y = r === 'archer' ? 1310 : r === 'support' ? 1190 : r === 'hero' ? 1160 : r === 'cavalry' ? 1040 : 1080,
            x = r === 'cavalry' ? (i % 2 ? 2060 : 270) : cols[i % cols.length],
            candidates = [{ x, y }, original.get(u.uid)];
        for (let row = 1320; row >= 880; row -= 85)
            for (const col of cols) candidates.push({ x: col, y: row });
        const p = candidates.find(p => Et(u, p, this.alive(), this.terrain));
        if (p) Object.assign(u, p); else { u.alive = false; this.delayed.push(u.id); }
    }
};
field.insertAdjacentHTML('beforeend', '<section id="fight-preview" class="hidden" aria-label="교전 참여자"><div class="fight-preview-title"></div><div class="fight-preview-units"></div></section><div id="tactical-legend" class="hidden">이동 범위 · 금색: 돌격 · 사선: 장애물</div>');
function previewGroup() {
    const all = q.alive(), groups = Oe(all);
    if (q.phase === 'fight') return (q.fightQueue[0] || []).map(id => q.unit(id)).filter(u => u?.alive);
    return groups.find(g => g.some(u => u.uid === q.selected) || supportFor(g, all).some(l => l.unit.uid === q.selected)) || [];
}
function renderTacticalHUD() {
    const group = previewGroup(), box = ut('fight-preview');
    box.classList.toggle('hidden', !group.length || !['move', 'shoot', 'fight'].includes(q.phase) || inputBlocked());
    if (group.length) {
        const links = supportFor(group),
            parts = group.map(u => ({ u, label: '전열' })).concat(links.map(l => ({ u: l.unit, label: l.rank === 2 ? '파이크 2열' : '창 지원' })));
        box.querySelector('.fight-preview-title').textContent = '교전 ' + group.filter(u => u.side === 'good').length + ' vs ' + group.filter(u => u.side === 'evil').length + ' · 지원 ' + links.filter(l => l.unit.side === 'good').length + ' / ' + links.filter(l => l.unit.side === 'evil').length;
        const key = parts.map(p => p.u.uid + p.label).join('|');
        if (box.dataset.group !== key) {
            box.dataset.group = key;
            box.querySelector('.fight-preview-units').innerHTML = parts.map(({ u, label }) => '<button type="button" class="fight-member ' + u.side + '" data-focus="' + u.uid + '" aria-label="' + esc(u.name + ' · ' + label) + '"><img src="' + Ut(q.meta.get(u.id).file) + '" alt=""><span>' + esc(u.name) + '</span><small>' + label + '</small></button>').join('');
            box.querySelectorAll('[data-focus]').forEach(el => el.onclick = () => { const u = q.unit(el.dataset.focus); if (u) setCamera(u.x, u.y, UX.zoom, 'manual'); });
        }
    }
    const u = actionableUnit();
    ut('tactical-legend').classList.toggle('hidden', q.phase !== 'move' || !u || inputBlocked());
    if (u && !UX.intent && q.phase === 'move' && u.uid===q.selected)
        ut('dock-status').textContent = q.engaged(u)?'교전 중':u.stats.shootRange&&u.movementSpent*2>u.stats.move?'사격 불가 · 반 이동 초과':'이동 · 돌격';
    if (u) ut('dock-portrait').alt = u.name;
    const next = document.querySelector('.next-stage');
    if (next && !next.querySelector('.scout-roles')) {
        const p = document.createElement('p'); p.className = 'scout-roles';
        const _si = q.stageInfo(q.wave + 1); p.textContent = _si.scouting + (_si.boss ? ' · 보스 ' + ((UnitCatalog[_si.boss] && UnitCatalog[_si.boss].name) || _si.boss) : ''); next.append(p);
    }
}
const __lwbR = Yt;
Yt = function () { __lwbR(); renderTacticalHUD(); renderPolishedHUD(); };
const __lwbRG = Ve.prototype.drawRings;
Ve.prototype.drawRings = function () {
    __lwbRG.call(this);
    if (!this.rings || !UX.ready) return;
    const group = previewGroup(), g = this.rings, z = UX.zoom;
    for (const u of group) {
        g.lineStyle(6.5 / z, 0x0b100d, .55);
        g.strokeCircle(u.x, u.y, u.radius + 8 / z);
        g.lineStyle(3 / z, u.side === 'good' ? 0x9ff0cf : 0xffa898, 1);
        g.strokeCircle(u.x, u.y, u.radius + 8 / z);
    }
};
window.MESBG.tactics = { supportFor, role: u => window.LWBTactics.role(u, metaFor), previewGroup, version: '2.0-merge' };
window.__LWB = { be: (...a) => be(...a), He: (...a) => He(...a), metaFor, supportFor };

// Product HUD: one command surface, restrained materials, contextual detail.
function renderPolishedHUD() {
    document.body.dataset.phase=q.phase;document.body.dataset.side=q.side||'';
    {const wm=ut('wave')?.parentElement;if(wm)wm.dataset.round=['move','shoot','fight'].includes(q.phase)&&q.round?'R'+q.round:'';
     const hm=document.querySelector('#hud-mission .hm-line'),em=ut('ux-mission')?.querySelector('em');if(hm)hm.textContent=em?.textContent||'원정 준비';}
    renderUnitVitals();
    if(!Qt&&q.phase==='reward'&&['event','relic'].includes(q.campStep)&&!q.eventOutcome){
        const modal=ut('overlay').querySelector('.modal'),draft=q.campDraft;
        const buttons=modal.querySelectorAll('[data-relic],[data-evopt]');
        let selected='';
        for(const b of buttons){const key=b.dataset.relic??b.dataset.evopt,on=draft?.step===q.campStep&&draft.key===key;b.classList.toggle('is-picked',on);b.setAttribute('aria-pressed',String(on));if(on)selected=b.querySelector('b').textContent;}
        if(!modal.querySelector('#camp-choice-confirm'))modal.insertAdjacentHTML('beforeend','<div class="camp-confirm"><span id="camp-choice-summary"></span><button id="camp-choice-cancel" class="secondary">취소</button><button id="camp-choice-confirm" class="primary">선택 확정</button></div>');
        ut('camp-choice-summary').textContent=selected||'선택 대기';
        ut('camp-choice-confirm').disabled=!selected;ut('camp-choice-cancel').disabled=!selected;
        ut('camp-choice-cancel').onclick=()=>{q.campDraft=null;q.save();Yt();};
        ut('camp-choice-confirm').onclick=()=>{if(q.confirmCampChoice())wt.play('reward_select');Yt();};
    }
    // Current selection is represented in the dock; detailed skill prose belongs in tooltips.
    const skill=ut('hero-skill');if(skill){const small=skill.querySelector('small');if(small)skill.title=small.textContent+' · '+skill.title;}
}
document.body.classList.add('lwb-polished');
// ==== Mobile portrait UX v4 — core: pixel status icons + MESBG unit states (all mapped 1:1 to real game state) ====
const PX_PAL={k:'#0b0d0c',w:'#f4ecd6',g:'#f2c75a',y:'#c99a4a',s:'#dfe6ea',h:'#c9973f',o:'#f0a860',r:'#e0604c',c:'#8fc8f0',t:'#7fd3b0',p:'#b98ee0',e:'#7c8478'};
const PX_ICONS={
 // 기병 돌격 — double chevron
 charge:{bg:'#2d3a24',rows:['kkkkkkkkkkkkkkkk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kbbgbbbbgbbbbbbk','kbbggbbbggbbbbbk','kbbbggbbbggbbbbk','kbbbbggbbbggbbbk','kbbbbbggbbbggbbk','kbbbbbggbbbggbbk','kbbbbggbbbggbbbk','kbbbggbbbggbbbbk','kbbggbbbggbbbbbk','kbbgbbbbgbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kkkkkkkkkkkkkkkk']},
 // 교전 중 — crossed swords
 engaged:{bg:'#3a2618',rows:['kkkkkkkkkkkkkkkk','kbbbbbbbbbbbbbbk','kbsbbbbbbbbbbsbk','kbbsbbbbbbbbsbbk','kbbbsbbbbbbsbbbk','kbbbbsbbbbsbbbbk','kbbbbbsbbsbbbbbk','kbbbbbbssbbbbbbk','kbbbbbbssbbbbbbk','kbbbbbsbbsbbbbbk','kbbhbsbbbbsbhbbk','kbbbhbbbbbbhbbbk','kbbhbhbbbbhbhbbk','kbhbbbbbbbbbbhbk','kbbbbbbbbbbbbbbk','kkkkkkkkkkkkkkkk']},
 // 넘어짐 — figure lying on the ground
 prone:{bg:'#3a2a18',rows:['kkkkkkkkkkkkkkkk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbboobk','kbooobbbbbbboobk','kbbooooooooooobk','kbooobbbbbbbbbbk','kbbbbbbbbbbbbbbk','kbeeeeeeeeeeeebk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kkkkkkkkkkkkkkkk']},
 // 이동력 감소 — boot + down arrow
 slowed:{bg:'#1e2a3a',rows:['kkkkkkkkkkkkkkkk','kbbbbbbbbbbbbbbk','kbbcccbbbbbwbbbk','kbbcccbbbbbwbbbk','kbbcccbbbbbwbbbk','kbbcccbbbbbwbbbk','kbbcccbbbbbwbbbk','kbbcccbbbwwwwwbk','kbbccccbbbwwwbbk','kbbcccccbbbwbbbk','kbbccccccbbbbbbk','kbbccccccbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kkkkkkkkkkkkkkkk']},
 // 공포 — skull
 terror:{bg:'#2a1a3a',rows:['kkkkkkkkkkkkkkkk','kbbbbbbbbbbbbbbk','kbbbbwwwwwwbbbbk','kbbbwwwwwwwwbbbk','kbbwwwwwwwwwwbbk','kbbwwwwwwwwwwbbk','kbbwkkwwwwkkwbbk','kbbwkkwwwwkkwbbk','kbbwwwwkkwwwwbbk','kbbbwwwkkwwwbbbk','kbbbbwwwwwwbbbbk','kbbbbwkwkwkbbbbk','kbbbbwwwwwwbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kkkkkkkkkkkkkkkk']},
 // 전열 붕괴 — cracked shield
 broken:{bg:'#3a1414',rows:['kkkkkkkkkkkkkkkk','kbbbbbbbbbbbbbbk','kbbrrrrrrrrrrbbk','kbbrrrrrkrrrrbbk','kbbrrrrrkrrrrbbk','kbbrrrrkrrrrrbbk','kbbrrrrkrrrrrbbk','kbbrrrrrkkrrrbbk','kbbbrrrrrkrrbbbk','kbbbrrrrkrrrbbbk','kbbbbrrrkrrbbbbk','kbbbbbrrrrbbbbbk','kbbbbbbrrbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kkkkkkkkkkkkkkkk']},
 // 반 이상 이동 — 사격 불가 (bow + cross)
 noshoot:{bg:'#2a2418',rows:['kkkkkkkkkkkkkkkk','kbbbbbbbbbbbbbbk','kbbbbyybbbbbbbbk','kbrbbbyybbbbrbbk','kbbrbbbyybbrbbbk','kbbbrbbbywrbbbbk','kbbbbrbbyrbbbbbk','kbbbbbrbrwbbbbbk','kbbbbbbrywbbbbbk','kbbbbbrbyrbbbbbk','kbbbbrbbywbrbbbk','kbbbrbbyybbbrbbk','kbbrbbyybbbbbrbk','kbbbbyybbbbbbbbk','kbbbbbbbbbbbbbbk','kkkkkkkkkkkkkkkk']},
 // 전열 유지 — shield
 hold:{bg:'#1a2a24',rows:['kkkkkkkkkkkkkkkk','kbbbbbbbbbbbbbbk','kbbttttttttttbbk','kbbtttttwttttbbk','kbbtttttwttttbbk','kbbttwwwwwwwtbbk','kbbtttttwttttbbk','kbbtttttwttttbbk','kbbbttttwtttbbbk','kbbbtttttttbbbbk','kbbbbttttttbbbbk','kbbbbbttttbbbbbk','kbbbbbbttbbbbbbk','kbbbbbbbbbbbbbbk','kbbbbbbbbbbbbbbk','kkkkkkkkkkkkkkkk']},
 // 정밀 사격 — crosshair
 aim:{bg:'#2a2414',rows:['kkkkkkkkkkkkkkkk','kbbbbbbgbbbbbbbk','kbbbbbbgbbbbbbbk','kbbbbggggggbbbbk','kbbbgbbgbbbgbbbk','kbbgbbbbbbbbgbbk','kbbgbbbbbbbbgbbk','kggggbbbwbbggggk','kbbgbbbbbbbbgbbk','kbbgbbbbbbbbgbbk','kbbbgbbgbbbgbbbk','kbbbbggggggbbbbk','kbbbbbbgbbbbbbbk','kbbbbbbgbbbbbbbk','kbbbbbbbbbbbbbbk','kkkkkkkkkkkkkkkk']},
 // UI glyphs
 sword:{bg:null,rows:['.......kk.','......kwwk','.....kwwk.','....kwwk..','.k.kwwk...','.kgkwk....','..kgk.....','.kgkgk....','kgk..k....','kk........']},
 flag:{bg:null,rows:['kk......','kgkkkk..','kggggk..','kgggggk.','kggggk..','kgkkkk..','kg......','kk......']},
 heart:{bg:null,rows:['.kk.kk..','krrkrrk.','krrrrrk.','krrrrrk.','.krrrk..','..krk...','...k....','........']}
};
const PX_URL={};
function pxIcon(id){
    if(PX_URL[id])return PX_URL[id];
    const d=PX_ICONS[id];if(!d)return '';
    const h=d.rows.length,w=d.rows[0].length,c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');
    for(let j=0;j<h;j++)for(let i=0;i<w;i++){const ch=d.rows[j][i];if(ch==='.')continue;x.fillStyle=ch==='b'?d.bg:(PX_PAL[ch]||'#f0f');x.fillRect(i,j,1,1);}
    return PX_URL[id]=c.toDataURL();
}
// Every entry reads a real field of the unit / battle — no invented buffs.
const UNIT_STATE_DEFS={
    charge:{label:'기병 돌격',desc:'이번 돌격에 기병 보너스 적용',test:u=>!!u.charged},
    engaged:{label:'교전 중',desc:'적과 베이스가 맞닿아 있음',test:u=>q.engaged(u)},
    terror:{label:'공포',desc:'공포 검사 실패 — 이번 라운드 돌격 불가',test:u=>!!u.feared},
    prone:{label:'넘어짐',desc:'기병 충격으로 넘어진 상태',test:u=>!!u.prone},
    broken:{label:'전열 붕괴',desc:'병력 절반 이하 — 매 라운드 용기 판정',test:u=>{const b=q.waveStartCounts?.[u.side];return !!b&&q.alive(u.side).length<=b/2;}},
    slowed:{label:'이동력 감소',desc:'이번 라운드 이동력이 줄어듦',test:u=>(u.roundBuff?.move||0)<0},
    noshoot:{label:'반 이상 이동',desc:'이동력 절반 넘게 이동 — 이번 턴 사격 불가',test:u=>u.stats.shootRange>0&&['move','shoot'].includes(q.phase)&&u.movementSpent*2>u.stats.move},
    hold:{label:'전열 유지',desc:'전열 유지 명령 적용 중',test:u=>!!u.hold},
    aim:{label:'정밀 사격',desc:'정밀 사격 명령 적용 중',test:u=>!!u.aim}
};
const UNIT_STATE_ORDER=['charge','engaged','terror','prone','broken','slowed','noshoot','hold','aim'];
function unitStates(u){if(!u?.alive)return[];const out=[];for(const id of UNIT_STATE_ORDER){try{if(UNIT_STATE_DEFS[id].test(u))out.push(id);}catch(e){}}return out;}
window.MESBG&&(window.MESBG.unitStates=u=>unitStates(typeof u==='string'?q.unit(u):u));
// ==== Mobile portrait UX v4 — screen structure ====
// Thin top HUD · battlefield · compact unit panel + contextual actions · bottom sheet for details.
// The previous HUD pieces (phase stepper row, camera buttons, minimap button, legend, roster strip, right drawer)
// are removed from the battle screen rather than restyled.
(function(){
window.__muxPrimary=ut('dock-primary').onclick;
const $=id=>document.getElementById(id);
const field=document.querySelector('#app .field'),top=document.querySelector('#app .top'),dock=$('command-dock'),sheet=$('battle-sheet');
// --- top HUD: [공세·라운드] [임무] [CP] [≡]
const hud=document.createElement('div');hud.id='hud-mission';hud.setAttribute('role','button');hud.tabIndex=0;
hud.innerHTML='<div class="hm-line"></div><div class="hm-more"></div>';
top.querySelector('.runmeta').after(hud);
const hmMore=hud.querySelector('.hm-more');
hmMore.appendChild($('ux-mission'));hmMore.appendChild($('ux-place'));
hud.onclick=()=>hud.classList.toggle('open');
document.addEventListener('pointerdown',e=>{if(!hud.contains(e.target))hud.classList.remove('open');});
// --- menu (≡): overview + battle log live here instead of on the battlefield
const menu=document.querySelector('#app .top-actions');
menu.insertAdjacentHTML('afterbegin','<button class="iconbtn" id="menu-overview" type="button">▦ 전장 전체 보기</button>');
menu.insertAdjacentHTML('afterbegin','<button class="iconbtn" id="menu-fs" type="button">⛶ 전체화면</button>');
$('menu-fs').onclick=()=>{try{document.fullscreenElement?document.exitFullscreen().catch(()=>{}):document.documentElement.requestFullscreen().catch(()=>{})}catch(e){}};
const logBtn=$('battle-log-toggle');if(logBtn){logBtn.textContent='✎ 전투 기록';menu.insertBefore(logBtn,$('menu-overview').nextSibling);}
{const _mst=document.createElement('style');_mst.textContent='#app .top-actions{flex-wrap:wrap;gap:6px}#app .top-actions>*{order:50}#menu-fs{order:1}#menu-overview{order:2}#auto{order:3}#fx-toggle{order:4}#battle-log-toggle{order:5}#speed-toggle{order:6}#sound{order:7}#help{order:8}#menu-exit{order:9}';document.head.appendChild(_mst);}menu.insertAdjacentHTML('beforeend','<button class="iconbtn" id="menu-exit" type="button">⌂ 메뉴로</button>');$('menu-exit').onclick=()=>{if(window.confirm('전투를 끝내고 메인 메뉴로 나갈까요?')){q.phase='menu';menu.classList.remove('open');Yt();}};
let overviewBack=null;
$('menu-overview').onclick=()=>{if(overviewBack){setCamera(overviewBack.x,overviewBack.y,overviewBack.z,'manual');overviewBack=null;$('menu-overview').textContent='▦ 전장 전체 보기';}
    else{const c=cameraCenter();overviewBack={x:c.x,y:c.y,z:UX.zoom};Tt.overview();$('menu-overview').textContent='◂ 원래 시점으로';}
    menu.classList.remove('open');};
// --- bottom: unit panel + action bar
dock.innerHTML='';
dock.insertAdjacentHTML('beforeend',
 '<div class="u-panel" id="u-panel" role="button" tabindex="0" aria-label="병사 상세 보기">'+
   '<img id="dock-portrait" class="dock-portrait" alt="">'+
   '<div class="u-id"><strong id="dock-name"></strong><div class="u-hp" id="u-hp"></div><div class="u-states" id="u-states"></div></div>'+
   '<div class="u-stats" id="u-stats"></div>'+
   '<div class="u-res" id="u-res"></div>'+
   '<span class="u-grab" aria-hidden="true"></span>'+
 '</div>'+
 '<div class="u-actions">'+
   '<span class="act-phase" id="act-phase"></span>'+
   '<button type="button" class="act-btn" id="act-end">턴 종료</button>'+
   '<span class="act-gap"></span>'+
   '<button type="button" class="act-btn" id="act-ability">능력</button>'+
   '<button type="button" class="act-btn" id="act-shoot">사격</button>'+
  '<button type="button" class="act-btn" id="auto-dock" title="자동 진행 온/오프" aria-label="자동 진행 온/오프">자동</button>'+
  '<button type="button" class="act-btn" id="speed-dock" title="재생 속도 ×1·×2·×4" aria-label="재생 속도">1×</button>'+
   '<button type="button" id="intent-cancel" class="hidden act-btn" aria-label="명령 취소">취소</button>'+
   '<button type="button" id="dock-primary" class="dock-primary"></button>'+
 '</div>'+
 '<div class="u-tip hidden" id="u-tip"></div>'+
 // legacy nodes other code still writes to; kept off-screen
 '<div class="mux-legacy" hidden><span id="dock-eyebrow"></span><div id="dock-status"></div><div id="dock-vitals"></div><div id="roster-strip"></div><button id="next-unit"></button><button id="dock-detail"></button></div>');
// re-wire handlers that were bound to the old nodes
ut('intent-cancel').onclick=()=>{clearIntent();renderDock();Tt.drawRings();};
ut('dock-primary').onclick=window.__muxPrimary;
{const _ad=ut('auto-dock');if(_ad)_ad.onclick=()=>{const _o=ut('auto');_o&&_o.click();};}
{const _sd=ut('speed-dock');if(_sd){const _sy=()=>{const _o=ut('speed-toggle');if(_o)_sd.textContent=_o.textContent;};_sd.onclick=()=>{const _o=ut('speed-toggle');_o&&_o.click();_sy();};_sy();}}
// --- bottom sheet: unit details, abilities & commands
sheet.classList.add('mux-sheet');
const sh=$('sheet-toggle');sh.textContent='';sh.setAttribute('aria-label','상세 닫기');sh.innerHTML='<span class="grab"></span>';
const stSec=document.createElement('section');stSec.id='sheet-unit-extra';stSec.innerHTML='<div class="section-label">상태</div><div id="sheet-states"></div><div class="section-label">장비</div><div id="sheet-equip"></div>';
const unitSec=$('unit')?.closest('section');if(unitSec)unitSec.after(stSec);
const openSheet=on=>{setSheet(on);if(on)sheet.scrollTop=0;};
const panel=$('u-panel');
panel.addEventListener('click',e=>{if(e.target.closest('.u-st'))return;if(!At)openSheet(true);});
let swy=null;panel.addEventListener('pointerdown',e=>{swy=e.clientY;});
panel.addEventListener('pointermove',e=>{if(swy!==null&&e.clientY-swy<-28){swy=null;if(!At)openSheet(true);}});
panel.addEventListener('pointerup',()=>{swy=null;});
let sdy=null;sheet.addEventListener('pointerdown',e=>{if(sheet.scrollTop<=0)sdy=e.clientY;});
sheet.addEventListener('pointermove',e=>{if(sdy!==null&&e.clientY-sdy>48){sdy=null;openSheet(false);}});
sheet.addEventListener('pointerup',()=>{sdy=null;});
// --- status icon tooltips (tap)
const tip=$('u-tip');let tipT=0;
dock.addEventListener('click',e=>{const b=e.target.closest('.u-st');if(!b)return;e.stopPropagation();const d=UNIT_STATE_DEFS[b.dataset.st];if(!d)return;
    tip.innerHTML='<img src="'+pxIcon(b.dataset.st)+'" alt=""><b>'+d.label+'</b><span>'+d.desc+'</span>';tip.classList.remove('hidden');clearTimeout(tipT);tipT=setTimeout(()=>tip.classList.add('hidden'),2600);});
// --- combat forecast (vs) panel on the battlefield
const vs=document.createElement('div');vs.id='vs-panel';vs.className='hidden';field.appendChild(vs);
window.__muxEls={hud,vs,tip};
})();

// Unit panel: portrait · name · HP · F S D A · Might/Will/Fate pips · state icons
function renderUnitVitals(){
    const u=q.unit(q.selected)||actionableUnit();
    const name=ut('dock-name'),hp=ut('u-hp'),st=ut('u-stats'),rs=ut('u-res'),ss=ut('u-states'),img=ut('dock-portrait'),panel=ut('u-panel');
    if(!name)return;
    if(!u?.alive||['menu','reward','result'].includes(q.phase)){panel.classList.add('empty');name.textContent=q.phase==='fight'?(q.fightQueue.length?'교전 판정':'다음 라운드 준비'):'병사를 선택하세요';hp.innerHTML='';st.innerHTML='';rs.innerHTML='';ss.innerHTML='';img.classList.add('hidden');return;}
    panel.classList.remove('empty');panel.classList.toggle('foe',u.side!==(q.mode==='ai'?'good':q.side));
    const src=Th(q.meta.get(u.id).file);if(img.getAttribute('src')!==src){img.dataset.full=Ut(q.meta.get(u.id).file);img.onerror=function(){this.onerror=null;this.src=this.dataset.full};img.src=src;}img.classList.remove('hidden');
    name.textContent=shortName(u);
    const w=u.stats.wounds,c=Math.max(0,u.currentWounds),r=Math.max(0,Math.min(1,c/Math.max(1,w)));
    hp.innerHTML='<img class="px" src="'+pxIcon('heart')+'" alt=""><b>'+c+'<small>/'+w+'</small></b><span class="hpbar'+(r<=.34?' low':'')+'"><i style="width:'+Math.round(r*100)+'%"></i></span><span class="mv">이동 '+(q.remaining(u)/45).toFixed(1)+'″</span>';
    const S=u.stats;st.innerHTML=[['F',S.fight,'결투'],['S',S.strength,'힘'],['D',S.defence,'방어'],['A',S.attacks,'공격 횟수']].map(([k,v,t])=>'<span title="'+t+'"><i>'+k+'</i><b>'+v+'</b></span>').join('');
    if(u.traits.includes('hero')||S.might||S.will||S.fate){const pip=(k,n,m)=>{let h='';for(let i=0;i<Math.max(m,n);i++)h+='<i class="'+(i<n?'on':'')+'"></i>';return '<span class="res-'+k+'"><em>'+k.toUpperCase()[0]+'</em>'+h+'</span>';};
        const R=u.resources||{};rs.innerHTML=pip('might',R.might||0,S.might||0)+pip('will',R.will||0,S.will||0)+pip('fate',R.fate||0,S.fate||0);rs.classList.remove('hidden');}
    else{rs.innerHTML='';rs.classList.add('hidden');}
    const states=unitStates(u);
    ss.innerHTML=states.slice(0,5).map(id=>'<button type="button" class="u-st" data-st="'+id+'" title="'+UNIT_STATE_DEFS[id].label+'"><img src="'+pxIcon(id)+'" alt="'+UNIT_STATE_DEFS[id].label+'"></button>').join('');
    // bottom sheet extras
    const sl=ut('sheet-states');if(sl)sl.innerHTML=states.length?states.map(id=>'<div class="sheet-st"><img src="'+pxIcon(id)+'" alt=""><b>'+UNIT_STATE_DEFS[id].label+'</b><span>'+UNIT_STATE_DEFS[id].desc+'</span></div>').join(''):'<p class="mini">특별한 상태 없음</p>';
    const eq=ut('sheet-equip');if(eq){const list=(u.equipment||[]).map(id=>(typeof LWB_EQUIP!=='undefined'&&LWB_EQUIP.find(x=>x.id===id))||null).filter(Boolean);eq.innerHTML=list.length?list.map(d=>'<div class="sheet-eq"><b>'+esc(d.label||d.id)+'</b>'+(d.desc?'<span>'+esc(d.desc)+'</span>':'')+'</div>').join(''):'<p class="mini">장비 없음</p>';}
}

// Action bar: only what the current phase / unit allows
function muxActions(){
    const ph=ut('act-phase'),endB=ut('act-end'),abB=ut('act-ability'),shB=ut('act-shoot'),prim=ut('dock-primary');if(!ph)return;
    const phase=q.phase,mine=!AUTO&&!(q.mode==='ai'&&q.side==='evil'),u=q.unit(q.selected),act=actionableUnit();
    const sideKo=q.side==='good'?'아군':'적군',phKo={preparation:'배치',move:'이동',shoot:'사격',fight:'근접전'}[phase]||'';
    ph.textContent=phase==='preparation'?'배치':phase==='fight'?'근접전':phKo?sideKo+' · '+phKo:'';
    ph.className='act-phase '+(phase==='fight'||phase==='preparation'?'neutral':q.side==='good'?'ally':'foe');
    const turnPhase=['move','shoot'].includes(phase)&&mine&&!At&&q.eligible(q.side).length>0;
    endB.classList.toggle('hidden',!turnPhase);if(!turnPhase){endB.classList.remove('confirm');endB.textContent='턴 종료';}
    const own=u&&u.alive&&u.side===q.side&&mine&&['move','shoot'].includes(phase);
    const heroReady=own&&!At&&(()=>{const hs=ut('hero-skill');if(hs&&!hs.disabled&&hs.offsetParent!==null)return true;return [...document.querySelectorAll('#commands .heroic-btn')].some(b=>!b.disabled);})();
    abB.classList.toggle('hidden',!heroReady||!!UX.intent);
    const canShoot=own&&phase==='shoot'&&!UX.intent&&q.canAct(u)&&u.stats.shootRange>0&&q.validTargets(u).length>0;
    shB.classList.toggle('hidden',!canShoot);
    if(phase==='shoot'&&!UX.intent&&prim.textContent==='사격 대기')prim.textContent='대기';
}
// Turn end: the same as pressing "wait" for every unit that still has to act this phase (no rule change)
(function(){
    const endB=ut('act-end');let armT=0;
    endB.onclick=()=>{if(At||Qt||!['move','shoot'].includes(q.phase))return;
        if(!endB.classList.contains('confirm')){endB.classList.add('confirm');endB.textContent='종료?';clearTimeout(armT);armT=setTimeout(()=>{endB.classList.remove('confirm');endB.textContent='턴 종료';},2600);return;}
        clearTimeout(armT);endB.classList.remove('confirm');endB.textContent='턴 종료';clearIntent();
        Rt(()=>{const side=q.side,ph=q.phase;for(let n=0;n<80&&q.side===side&&q.phase===ph;n++){const m=q.unit(q.activeMoverUid);const id=m&&q.canAct(m)?m.uid:q.eligible(side)[0]?.uid;if(!id||!q.wait(id))break;}});};
    ut('act-ability').onclick=()=>{if(At)return;setSheet(true);const cb=document.querySelector('#battle-sheet .control-block');const sh=ut('battle-sheet');if(cb&&sh)sh.scrollTop=cb.offsetTop-8;};
    ut('act-shoot').onclick=()=>{const u=q.unit(q.selected);if(!u||At)return;const t=q.validTargets(u).sort((a,b)=>Math.hypot(a.x-u.x,a.y-u.y)-Math.hypot(b.x-u.x,b.y-u.y))[0];if(t)planIntent(t,t);};
})();
// Tap the same destination / target again to confirm (the confirm button keeps working too)
(function(){
    const prevPoint=Tt.onPoint,prevUnit=Tt.onUnit;
    Tt.onPoint=p=>{const it=UX.intent;if(it&&!At&&['move','deploy'].includes(it.kind)&&it.to){const u=q.unit(it.uid),r=Math.max(26,(u?.radius||30)*.9);if(Math.hypot(p.x-it.to.x,p.y-it.to.y)<=r){ut('dock-primary').click();return;}}prevPoint(p);};
    Tt.onUnit=uid=>{const it=UX.intent;if(it&&!At&&['charge','shoot'].includes(it.kind)&&it.target===uid){ut('dock-primary').click();return;}prevUnit(uid);};
})();
// Combat forecast: attacker vs target with the numbers a player actually weighs
function renderVs(){
    const vs=ut('vs-panel');if(!vs)return;const it=UX.intent;
    if(!it||At||!['charge','shoot'].includes(it.kind)){vs.classList.add('hidden');vs.dataset.k='';return;}
    const a=q.unit(it.uid),t=q.unit(it.target);if(!a||!t){vs.classList.add('hidden');return;}
    const shot=it.kind==='shoot';
    const willCharge=!shot&&a.traits.includes('mounted')&&(a.movementSpent+(it.plan?.distance||0))>a.radius;
    const card=(u,side,extra)=>{const w=u.stats.wounds,c=Math.max(0,u.currentWounds),r=c/Math.max(1,w);const sts=unitStates(u).concat(extra||[]).filter((v,i,arr)=>arr.indexOf(v)===i).slice(0,3);
        const nums=shot?(side==='a'?'<span><i>명중</i><b>'+u.stats.shootValue+'+</b></span><span><i>S</i><b>'+u.stats.strength+'</b></span>':'<span><i>D</i><b>'+u.stats.defence+'</b></span><span><i>F</i><b>'+u.stats.fight+'</b></span>')
            :'<span><i>F</i><b>'+u.stats.fight+'</b></span><span><i>A</i><b>'+u.stats.attacks+'</b></span>';
        return '<div class="vs-u vs-'+side+(u.side==='good'?' ally':' foe')+'"><img class="vs-pt" src="'+Th(q.meta.get(u.id).file)+'" data-full="'+Ut(q.meta.get(u.id).file)+'" onerror="'+ThFallback+'" alt=""><div class="vs-tx"><strong>'+esc(shortName(u))+'</strong><div class="vs-hp"><span class="hpbar'+(r<=.34?' low':'')+'"><i style="width:'+Math.round(r*100)+'%"></i></span><b>'+c+'/'+w+'</b></div><div class="vs-n">'+nums+'</div><div class="vs-st">'+sts.map(id=>'<img src="'+pxIcon(id)+'" alt="'+UNIT_STATE_DEFS[id].label+'" title="'+UNIT_STATE_DEFS[id].label+'">').join('')+'</div></div></div>';};
    const k=[it.kind,a.uid,t.uid,a.currentWounds,t.currentWounds,willCharge].join('|');if(vs.dataset.k===k){vs.classList.remove('hidden');return;}vs.dataset.k=k;
    vs.className=(shot?'shot':'melee');
    vs.innerHTML=card(a,'a',willCharge?['charge']:[])+'<div class="vs-mid"><img class="px" src="'+pxIcon(shot?'aim':'sword')+'" alt=""><b>'+(shot?'사격':willCharge?'기병 돌격':'돌격')+'</b><small>다시 탭 · 확정</small></div>'+card(t,'b');
}
const muxDock=renderDock;
renderDock=function(){muxDock();try{renderUnitVitals();muxActions();renderVs();for(const el of [document.querySelector('#app .layout'),document.querySelector('#app .battle-column'),ut('app')])if(el&&(el.scrollTop||el.scrollLeft)){el.scrollTop=0;el.scrollLeft=0;}}catch(e){console.error('[mux]',e);}};
// ==== Mobile portrait UX v4 — battlefield feedback ====
// (a) up to 3 pixel state icons under each token, constant on-screen size
// (b) prone units visibly lie down (sprite tilts; base and rules untouched)
(function(){
function pxTex(id){const k='px-'+id;if(Tt.textures.exists(k))return k;const d=PX_ICONS[id];if(!d)return null;
    const c=document.createElement('canvas');c.width=d.rows[0].length;c.height=d.rows.length;const x=c.getContext('2d');
    for(let j=0;j<c.height;j++)for(let i=0;i<c.width;i++){const ch=d.rows[j][i];if(ch==='.')continue;x.fillStyle=ch==='b'?d.bg:(PX_PAL[ch]||'#f0f');x.fillRect(i,j,1,1);}
    Tt.textures.addCanvas(k,c);try{Tt.textures.get(k).setFilter(Phaser.Textures.FilterMode.NEAREST);}catch(e){}return k;}
const LEGACY=['clash','prone','terror','charge','halfmove'];
let lastZ=0;
function iconRow(scene,u,c){
    let row=c.getByName('st-row');if(!row){row=scene.add.container(0,0).setName('st-row');c.add(row);}
    const states=(u.alive&&!u.escaped&&scene.b.phase!=='menu')?unitStates(u).slice(0,3):[];
    const sig=states.join(',');
    if(row.getData('sig')!==sig){row.removeAll(true);row.setData('sig',sig);
        states.forEach((id,i)=>{const k=pxTex(id);if(k)row.add(scene.add.image((i-(states.length-1)/2)*17,0,k).setOrigin(.5));});}
    const z=UX.zoom||1;row.setScale(1/z);row.setPosition(0,u.radius+6/z);
    return row;
}
const fxSync=Ve.prototype.sync;
Ve.prototype.sync=function(){
    fxSync.apply(this,arguments);if(!this.tokens||!UX.ready)return;
    for(const [uid,c] of this.tokens){const u=this.b.unit(uid);if(!u)continue;
        for(const nm of LEGACY){const el=c.getByName(nm);if(el)el.setVisible(false);}
        iconRow(this,u,c);}
    lastZ=UX.zoom;
};
const fxUpdate=Ve.prototype.update;
Ve.prototype.update=function(t){
    fxUpdate.call(this,t);if(!this.tokens||!UX.ready)return;
    const zChanged=Math.abs((UX.zoom||1)-lastZ)>1e-4;
    for(const [uid,c] of this.tokens){const u=this.b.unit(uid);if(!u?.alive)continue;
        if(zChanged){const row=c.getByName('st-row');if(row){const z=UX.zoom||1;row.setScale(1/z);row.setPosition(0,u.radius+6/z);}}
        const s=c.getByName('token');if(!s||s.getData('fxLock'))continue;
        if(u.prone){s.setAngle(s.flipX?-72:72);s.setScale(s.scaleX,s.scaleY*.9);s.setAlpha(.92);}else if(s.alpha<.99&&!s.getData('fxLock'))s.setAlpha(1);
    }
    if(zChanged)lastZ=UX.zoom;
};
})();

// ==== Compact dice result (replaces the large dice panel) ====
// A slim strip at the top of the battlefield: who vs who, the deciding dice, the outcome. Tap it to see every die.
(function(){
const SIDE_KO={good:'곤도르',evil:'모르도르'};
const face=(side,v)=>{const f=side==='good'?'minastirith':'mordor',set=Fe.dice.find(o=>o.faction===f);return Ut(set.faces[Math.max(1,Math.min(6,v|0))]);};
const sleep=ms=>new Promise(r=>setTimeout(r,Math.max(0,ms)));
const lead=(ids,side)=>ids.map(id=>q.unit(id)).filter(u=>u&&u.side===side).sort((a,b)=>(b.traits.includes('hero')-a.traits.includes('hero'))||(b.stats.fight-a.stats.fight))[0];
const isBoss=u=>!!u&&(u.traits.includes('boss')||u.traits.includes('monster')&&u.traits.includes('hero'));
const box=ut('dice');let hold=0;
box.addEventListener('click',()=>{box.classList.toggle('open');hold+=1800;});
$e=async function(e){
    if(qt>=20)return;
    let L,R,ld=[],rd=[],res='',sub='',special=false,detail='',kind='';
    if(e.type==='PriorityRolled'){kind='prio';L={name:'곤도르',side:'good'};R={name:'모르도르',side:'evil'};ld=[e.good];rd=[e.evil];res=(q.priority==='good'?'곤도르':'모르도르')+' 선공';sub=e.ties?'동점 재굴림':'우선권';}
    else if(e.result&&e.result.kind==='shot'){kind='shot';const S=e.result,t=S.strikeResults[0]||{},a=q.unit(t.attacker),v=q.unit(t.target),side=a?.side||'good',raw=S.diceResults[side]||[];
        L={name:a?shortName(a):SIDE_KO[side],side};R={name:v?shortName(v):'대상',side:v?.side||(side==='good'?'evil':'good')};
        ld=[raw[0]];rd=raw.length>1?[raw[raw.length-1]]:[];
        res=t.hit<t.hitNeeded?'빗나감':t.killed?'격파':t.wound?'상처':'막음';
        if((t.interceptions||[]).some(i=>!i.passed))res='아군 오사';
        sub='명중 '+t.hitNeeded+'+'+(rd.length?' · 상처 '+t.needed+'+':'');special=isBoss(v)||isBoss(a);
        detail=raw.map((d,i)=>'<img src="'+face(side,d)+'" alt="'+d+'">').join('');}
    else if(e.result){kind='fight';const S=e.result,ids=S.participants||[];const g=lead(ids,'good'),b=lead(ids,'evil');
        L={name:g?shortName(g):'곤도르',side:'good'};R={name:b?shortName(b):'모르도르',side:'evil'};
        ld=S.diceResults.good||[];rd=S.diceResults.evil||[];const w=S.winnerSide==='good'?L.name:R.name;
        res=w+' 승리';sub=(S.wounds?.length?'부상 '+S.wounds.length:'')+(S.trappedUnits?.length?(S.wounds?.length?' · ':'')+'포위':'');
        special=(isBoss(g)||isBoss(b))||ids.some(id=>q.unit(id)?.charged);
        detail='<div><span class="dx-side good">곤도르</span>'+ld.map(d=>'<img src="'+face('good',d)+'" alt="'+d+'">').join('')+'</div><div><span class="dx-side evil">모르도르</span>'+rd.map(d=>'<img src="'+face('evil',d)+'" alt="'+d+'">').join('')+'</div>'+(S.fightValues?'<div class="dx-fv">결투 '+S.fightValues.good+' / '+S.fightValues.evil+'</div>':'');
        if(S.winnerSide)e.__w=S.winnerSide;}
    else return;
    const sp=(Math.max(1,qt)||1),best=a=>a.length?Math.max(...a):0;
    const dieHTML=(side,v,id)=>'<span class="dx-die" id="'+id+'"><img src="'+face(side,v||1+Math.floor(Math.random()*6))+'" alt=""></span>';
    box.className='dice-panel dx kind-'+kind+(special?' special':'');
    box.innerHTML='<div class="dx-row"><span class="dx-n l '+L.side+'">'+esc(L.name)+'</span>'+dieHTML(L.side,0,'dx-l')+'<img class="dx-vs px" src="'+pxIcon(kind==='shot'?'aim':'sword')+'" alt="">'+(kind==='shot'&&!rd.length?'':dieHTML(kind==='shot'?L.side:R.side,0,'dx-r'))+'<span class="dx-n r '+R.side+'">'+esc(R.name)+'</span></div><div class="dx-res"><b></b><small></small></div>'+(detail?'<div class="dx-detail">'+detail+'</div>':'');
    box.classList.remove('hidden');hold=0;
    wt.play('dice_roll');
    const lEl=box.querySelector('#dx-l img'),rEl=box.querySelector('#dx-r img');
    const rollSide=kind==='shot'?L.side:R.side;
    if(!UX.reduced){const t0=performance.now();while(performance.now()-t0<240/sp){lEl&&(lEl.src=face(L.side,1+Math.floor(Math.random()*6)));rEl&&(rEl.src=face(kind==='shot'?L.side:R.side,1+Math.floor(Math.random()*6)));await sleep(45/sp);if(performance.now()-t0>3000)break;}}
    lEl&&(lEl.src=face(L.side,best(ld)||ld[0]));rEl&&(rEl.src=face(kind==='shot'?L.side:R.side,best(rd)||rd[0]));
    box.querySelectorAll('.dx-die').forEach(x=>x.classList.add('landed'));
    if(kind==='fight'||kind==='prio'){const lw=(kind==='prio'?q.priority:e.__w)==='good';box.querySelector(lw?'#dx-l':'#dx-r')?.classList.add('win');box.querySelector(lw?'.dx-n.l':'.dx-n.r')?.classList.add('win');}
    if(kind==='shot'){const t=e.result.strikeResults[0]||{};box.querySelector('#dx-l')?.classList.add(t.hit>=t.hitNeeded?'win':'lose');box.querySelector('#dx-r')?.classList.add(t.wound?'win':'lose');}
    box.querySelector('.dx-res b').textContent=res;box.querySelector('.dx-res small').textContent=sub;
    let wait=({fight:520,shot:460,prio:380})[kind]+(special?260:0);
    const t1=performance.now();while(performance.now()-t1<(wait+hold)/sp){await sleep(40);if(performance.now()-t1>8000)break;}
    box.classList.remove('open');
};
})();
try{document.documentElement.style.setProperty('--ui-title-art','url("'+Ut('backgrounds/bg_black_gate.png')+'")');}catch(e){}
ut('dock-detail').textContent='명령';
ut('dock-primary').setAttribute('aria-label','현재 명령 확정 또는 단계 진행');
ut('dock-status').setAttribute('aria-live','polite');
ut('phases').setAttribute('aria-label','전투 단계');
ut('tactical-legend').innerHTML='<span class="legend-move">이동</span><span class="legend-charge">돌격</span><span class="legend-block">장애물</span>';
const polishStyle=document.createElement('style');polishStyle.id='lwb-product-hud';
polishStyle.textContent=[
'body.lwb-polished{--paper:#eee6d2;--muted:#b8b6a7;--panel:#202721;--line:#555d4b;background:#151b17;color:var(--paper)}',
'body.lwb-polished button,body.lwb-polished select{border-radius:2px!important;text-shadow:none;touch-action:manipulation}body.lwb-polished button:focus-visible{outline:2px solid #efdc9a!important;outline-offset:3px}body.lwb-polished button:disabled{opacity:.42}',
'body.lwb-polished #app .top{background:#1b231e!important;border-bottom:1px solid #545c4a;box-shadow:none;height:54px;min-height:54px}body.lwb-polished .brand strong{font-size:15px;letter-spacing:.02em}body.lwb-polished .sigil img{width:32px;height:32px;object-fit:contain}',
'body.lwb-polished .top-actions{gap:5px}body.lwb-polished #speed-toggle{display:none}body.lwb-polished .metric{border:0;padding-left:10px}body.lwb-polished .metric small{font-size:10px}body.lwb-polished .metric strong{font-size:15px;font-variant-numeric:tabular-nums}',
'body.lwb-polished #app .layout{position:relative;overflow:hidden}body.lwb-polished #app .battle-column{padding-bottom:0;min-width:0}body.lwb-polished #app .hint,body.lwb-polished #app .footer{display:none!important}',
'body.lwb-polished #battle-sheet{position:absolute!important;left:auto!important;right:0!important;top:0!important;bottom:0!important;width:min(340px,94%)!important;max-height:100%!important;padding:0 18px 18px!important;background:#202821!important;border:0;border-left:1px solid #84744f;box-shadow:none!important;display:block!important;z-index:32;transform:translateX(105%)!important;visibility:hidden;transition:transform .16s ease,visibility .16s}',
'body.lwb-polished #battle-sheet.open{transform:translateX(0)!important;visibility:visible}body.lwb-polished #sheet-toggle{display:block!important;position:sticky;top:0;margin:0 -18px 14px;width:calc(100% + 36px);height:48px;background:#283228;border:0;border-bottom:1px solid #545e4c;font-size:13px;color:#f0e6c8;z-index:2}',
'body.lwb-polished #sheet-backdrop{position:absolute!important;inset:0!important;z-index:31;background:#070d0990;border:0;display:none!important}body.lwb-polished #sheet-backdrop.open{display:block!important}',
'body.lwb-polished .unit-card{background:none!important;border:0!important;padding:0!important;box-shadow:none!important}body.lwb-polished .unit-head img{filter:none;width:66px;height:74px}body.lwb-polished .unit-head strong{font-size:16px}body.lwb-polished .unit-head small{font-size:12px}',
'body.lwb-polished .objective{padding-bottom:12px;margin-bottom:16px}body.lwb-polished .objective h3{font-size:18px}body.lwb-polished .objective p{font-size:12px}body.lwb-polished .stats span,body.lwb-polished .resources{font-size:12px}body.lwb-polished .stats b{font-size:17px}',
'body.lwb-polished .hero-skill{background:#303b2d;border:1px solid #8d8059;border-radius:2px;min-height:48px}body.lwb-polished .hero-skill small{display:none}body.lwb-polished .heroic-btn{border-radius:2px!important;min-height:44px;background:#293329!important}body.lwb-polished .command{min-height:44px;border-width:0 0 1px;background:none!important}body.lwb-polished .command b{font-size:13px}',
'body.lwb-polished #app .phases{display:flex!important;background:#1c251e!important;min-height:30px;gap:14px;padding:0 16px;border-bottom:1px solid #4d5746}body.lwb-polished .phase{background:none!important;border:0;border-radius:0!important;padding:7px 0;font-size:11px;color:#a9b2a2}body.lwb-polished .phase.active{color:#f1dda4;box-shadow:inset 0 -2px #d7be80}body.lwb-polished .phase i{display:none}body.lwb-polished .turn{margin-left:auto;font-size:11px}',
'body.lwb-polished #command-dock{display:flex!important;flex-direction:column!important;gap:5px!important;min-height:0!important;padding:8px 16px calc(7px + env(safe-area-inset-bottom))!important;background:#1d261f!important;border-top:1px solid #8a7b53;box-shadow:none!important}',
'body.lwb-polished .dock-main{display:flex!important;height:48px!important;gap:10px!important;width:100%}body.lwb-polished .dock-portrait{width:42px!important;height:46px!important;object-fit:contain;border:0!important;background:none!important}body.lwb-polished .dock-eyebrow{display:none!important}body.lwb-polished .dock-text{flex:1;min-width:0}body.lwb-polished .dock-text strong{font-size:17px!important;line-height:22px!important;color:#f3e7c4}body.lwb-polished .dock-status{font-size:12px!important;line-height:17px!important;color:#c7cebb;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}',
'body.lwb-polished #dock-primary{background:#d7c38d!important;color:#1c271d!important;border:1px solid #e1d3ab;box-shadow:none!important;min-width:112px!important;min-height:44px!important;font-size:13px!important;padding:8px 12px!important}body.lwb-polished #dock-primary.confirm{background:#eddaa2!important;color:#17251b!important;border-color:#f8ebc1!important}body.lwb-polished #intent-cancel{background:#2a342b!important;min-width:44px;min-height:44px}',
'body.lwb-polished #dock-vitals{display:flex;flex-wrap:wrap;row-gap:2px;column-gap:16px;align-items:center;min-height:23px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;font-size:11px;color:#b3bdad;font-variant-numeric:tabular-nums}body.lwb-polished #dock-vitals b{font-size:13px;color:#f1e5c3;margin-left:3px}body.lwb-polished .vital-resources{display:flex;gap:10px;border-left:1px solid #59634c;padding-left:12px}',
'body.lwb-polished .dock-sub{display:flex!important;width:100%!important;max-width:none!important;height:44px!important;min-height:44px!important;gap:10px!important}body.lwb-polished .roster-strip{height:44px!important;min-height:44px!important}body.lwb-polished .roster-unit{border:0!important;border-bottom:2px solid transparent!important;border-radius:0!important;background:none!important;box-shadow:none!important;width:44px!important;min-width:44px!important;height:44px!important;min-height:44px!important}body.lwb-polished .roster-unit img{width:40px!important;height:40px!important}body.lwb-polished .roster-unit.is-selected{border-bottom-color:#efdc9a!important;background:#c8bc8325!important}body.lwb-polished .roster-unit.is-active{box-shadow:inset 0 1px #efdc9a!important}body.lwb-polished .roster-tools button{min-width:44px;min-height:44px;padding:5px 9px}',
'body.lwb-polished .battle-info{top:9px!important;left:12px!important;max-width:calc(100% - 80px);gap:3px!important}body.lwb-polished .battle-info .place{font-size:12px!important;color:#f0e7ce;text-shadow:0 1px 3px #000}body.lwb-polished .battle-info .mission{font-size:12px!important;background:#1b281fe8!important;border:0!important;border-left:2px solid #bbae79!important;border-radius:0!important;padding:5px 8px!important;line-height:17px!important}body.lwb-polished .hud-mod{border:0!important;border-radius:0!important;background:#18251de8!important}',
'body.lwb-polished .active-tag{background:#e6d398!important;color:#18271b!important;border:1px solid #233520!important;border-radius:1px!important;box-shadow:none!important;font-size:11px!important;padding:3px 6px!important}body.lwb-polished .field-actions button,body.lwb-polished #map-toggle{border-radius:2px!important;box-shadow:none!important;background:#1c2a20ef!important;min-height:44px}',
'body.lwb-polished #fight-preview{position:absolute;right:12px;left:auto;top:70px;max-width:min(340px,65%);z-index:11;background:#1c271fee;border:0;border-left:2px solid #c9b77e;padding:7px 9px;color:#eee5c9}body.lwb-polished .fight-preview-title{font-size:12px;margin-bottom:5px}body.lwb-polished .fight-preview-units{display:flex;gap:3px;overflow-x:auto;max-height:88px}body.lwb-polished .fight-member{flex:0 0 58px;display:grid;justify-items:center;border:0;border-bottom:2px solid #b3c5b1;background:none;color:#eee6d2;padding:3px;min-height:44px}body.lwb-polished .fight-member.evil{border-color:#ce947d}body.lwb-polished .fight-member img{width:36px;height:36px;object-fit:contain}body.lwb-polished .fight-member span{max-width:56px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:10px}body.lwb-polished .fight-member small{font-size:10px;color:#ddc58b}',
'body.lwb-polished #tactical-legend{position:absolute;left:64px;bottom:12px;z-index:9;pointer-events:none;display:flex;gap:10px;background:#1a261ee8;padding:5px 7px;font-size:10px;color:#eee5cc}body.lwb-polished #tactical-legend span:before{content:"";display:inline-block;width:9px;height:9px;margin-right:4px;border:1px solid #c2decc}body.lwb-polished #tactical-legend .legend-charge:before{border:2px dashed #e0ac7d;border-radius:50%}body.lwb-polished #tactical-legend .legend-block:before{border-color:#ce9987;background:repeating-linear-gradient(135deg,transparent 0 3px,#ce9987 3px 4px)}',
'body.lwb-polished .overlay{background:#0c1512e8!important;backdrop-filter:none!important}body.lwb-polished .modal{border-radius:2px!important;background:#202920!important;border:1px solid #887b58!important;box-shadow:none!important;padding:28px!important;max-width:960px;overscroll-behavior:contain;scroll-padding-bottom:80px}body.lwb-polished .modal h1{color:#f1e7cc;font-family:Georgia,serif;font-weight:500;letter-spacing:-.025em}body.lwb-polished .modal h2{font-size:25px!important}body.lwb-polished .modal p{color:#c3c7b6}body.lwb-polished .eyebrow{font-size:10px;letter-spacing:.12em;color:#bdae7c}body.lwb-polished .hero-tokens img{filter:none!important}body.lwb-polished .menu-buttons button{min-height:48px}body.lwb-polished .menu-notes{border:0;padding-top:0;margin-top:16px}',
'body.lwb-polished .recruit-card{border-radius:0!important;border-width:0 0 2px!important;background:#283228!important;box-shadow:none!important;min-height:180px!important}body.lwb-polished .recruit-card:before{display:none!important}body.lwb-polished .recruit-card.is-picked,body.lwb-polished .reward.is-picked{outline:2px solid #ecdaa2!important;outline-offset:-2px;background:#354431!important}body.lwb-polished .recruit-card img{filter:none!important}body.lwb-polished .pick-mark{font-size:10px}body.lwb-polished .recruit-cards{gap:8px!important}body.lwb-polished .reward{border-radius:0!important;background:#283228!important;border-width:0 0 3px!important;box-shadow:none!important}body.lwb-polished .reward b{font-size:17px}body.lwb-polished .reward p{font-size:13px;line-height:1.6}body.lwb-polished .camp-steps{font-size:12px;gap:16px}body.lwb-polished .camp-confirm{position:sticky;bottom:-28px;display:flex;align-items:center;gap:8px;background:#202920!important;border-top:1px solid #797354;padding:12px 0 calc(12px + env(safe-area-inset-bottom));z-index:3}body.lwb-polished .camp-confirm span{flex:1;min-width:0;font-size:12px}body.lwb-polished .camp-confirm button{min-height:44px}',
'body.lwb-polished #relic-info{border-radius:2px;background:#1d2a20;box-shadow:none}body.lwb-polished .dice-panel{border-radius:2px!important;background:#202a21f5!important;box-shadow:none!important}body.lwb-polished .hidden{display:none!important}',
'@media(max-width:900px){body.lwb-polished #app .top{height:48px!important;min-height:48px!important;max-height:48px!important}body.lwb-polished .brand strong{max-width:102px;font-size:12px!important}body.lwb-polished #app .phases{min-height:28px;gap:12px;padding:0 8px}body.lwb-polished .phase{font-size:10px;padding:6px 0}body.lwb-polished .turn{font-size:10px}body.lwb-polished #command-dock{padding:5px 8px calc(5px + env(safe-area-inset-bottom))!important;gap:3px!important}body.lwb-polished .dock-main{height:44px!important;gap:6px!important}body.lwb-polished .dock-text strong{font-size:14px!important;line-height:18px!important}body.lwb-polished .dock-status{font-size:11px!important}body.lwb-polished .dock-portrait{width:32px!important;height:40px!important}body.lwb-polished #dock-primary{min-width:92px!important;font-size:12px!important;padding:6px 8px!important}body.lwb-polished #dock-vitals{gap:11px;font-size:10px;min-height:24px}body.lwb-polished #dock-vitals b{font-size:12px;margin-left:2px}body.lwb-polished .vital-resources{gap:7px;padding-left:8px}body.lwb-polished .modal{padding:18px 12px!important;max-height:calc(var(--app-h) - 16px)!important}body.lwb-polished .camp-confirm{bottom:-18px}body.lwb-polished #fight-preview{top:70px;right:8px;max-width:calc(100% - 76px);padding:5px 7px}body.lwb-polished .fight-member img{width:28px;height:28px}body.lwb-polished #tactical-legend{left:12px;bottom:60px;gap:6px;font-size:9px;padding:3px}body.lwb-polished .field-actions{gap:3px!important}body.lwb-polished .field-actions .focus-control span{display:none!important}}',
'@media(max-width:375px){body.lwb-polished .dock-portrait{display:none!important}body.lwb-polished #dock-vitals{gap:9px}body.lwb-polished #tactical-legend{display:none!important}}',
'@media(max-height:510px) and (orientation:landscape){body.lwb-polished #command-dock{display:grid!important;grid-template-columns:minmax(250px,1fr) minmax(180px,.7fr);gap:2px 12px!important}body.lwb-polished .dock-main{grid-column:1;grid-row:1}body.lwb-polished #dock-vitals{grid-column:1/3;grid-row:2}body.lwb-polished .dock-sub{grid-column:2;grid-row:1}body.lwb-polished #app .top{height:40px!important;min-height:40px!important;max-height:40px!important}body.lwb-polished #app .phases{min-height:24px}body.lwb-polished .phase{padding:4px 0}body.lwb-polished #fight-preview{top:42px;max-width:280px}body.lwb-polished .fight-member{grid-template-columns:28px 1fr;flex-basis:84px}body.lwb-polished .fight-member img{grid-row:1/3}body.lwb-polished .fight-member span{max-width:48px}}',
'@media(prefers-reduced-motion:reduce){body.lwb-polished *,body.lwb-polished *:before,body.lwb-polished *:after{transition:none!important;animation:none!important}}'
].join('\n');
document.head.appendChild(polishStyle);

// ==== Asset loading UX ====
// Pixel UI fonts (Galmuri, SIL OFL 1.1) — registered through Ut() so the offline bundle embeds them too.
(function(){try{if(document.getElementById('lwb-fonts'))return;const st=document.createElement('style');st.id='lwb-fonts';
const ff=(fam,file,w)=>"@font-face{font-family:'"+fam+"';src:url('"+Ut('fonts/galmuri/'+file+'.woff')+"') format('woff');font-weight:"+w+";font-display:swap}";
st.textContent=ff('Galmuri11','Galmuri11',400)+ff('Galmuri11','Galmuri11-Bold',700)+ff('Galmuri9','Galmuri9',400)+ff('Galmuri14','Galmuri14',400)+":root{--ui-bg:url('"+Ut('ui/title-bg.jpg')+"')}";document.head.appendChild(st);}catch(e){}})();
// Title shows real loader progress; the battlefield is veiled until its textures are in; DOM portraits shimmer until loaded.
(function(){
const st={p:0,done:false};
const field=document.querySelector('.field');
if(field&&!document.getElementById('field-veil'))field.insertAdjacentHTML('beforeend','<div id="field-veil" class="field-veil" aria-live="polite"><div><i><b></b></i><span>전장을 펼치는 중</span></div></div>');
const put=(id,label,pc)=>{const el=document.getElementById(id);if(!el)return;const b=el.querySelector('b'),t=el.querySelector('span'),w=pc+'%',tx=label+' '+pc+'%';if(b&&b.style.width!==w)b.style.width=w;if(t&&t.textContent!==tx)t.textContent=tx;};
const paint=()=>{const pc=Math.round(st.p*100);put('boot-load','전장 준비 중',pc);put('field-veil','전장을 펼치는 중',pc);};
const finish=()=>{st.p=1;st.done=true;paint();document.body.classList.add('assets-ready');mo.disconnect();};
const mo=new MutationObserver(()=>{if(!st.done)paint();});
mo.observe(document.getElementById('app')||document.body,{childList:true,subtree:true});
const pre=Ve.prototype.preload;
Ve.prototype.preload=function(){pre.apply(this,arguments);this.load.on('progress',v=>{st.p=v;paint();});this.load.once('complete',finish);};
document.addEventListener('load',e=>{const t=e.target;if(t&&t.tagName==='IMG')t.classList.add('ld');},true);
document.addEventListener('error',e=>{const t=e.target;if(t&&t.tagName==='IMG'&&!t.dataset.full)t.classList.add('ld');},true);
})();
const clarityGame = new Ot.Game({ type: Ot.AUTO, parent: "game", width: Math.max(1,Math.round(document.querySelector('#game').clientWidth)), height: Math.max(1,Math.round(document.querySelector('#game').clientHeight)), backgroundColor: "#293038", scale: { mode: Ot.Scale.NONE, autoCenter: Ot.Scale.NO_CENTER, autoRound: false }, scene: [Tt], render: { antialias: true, antialiasGL: true, pixelArt: false, roundPixels: false, powerPreference: "low-power" }, fps: {target:60}, audio: {noAudio:true} });
Yt();
ut("overview").onclick = () => Tt.overview();
ut("focus").onclick = () => Tt.focus();
const re = ut("minimap");
re.onpointerdown = Z => { const Y = re.getBoundingClientRect(); panTo((Z.clientX - Y.left) / Y.width * pt.width, (Z.clientY - Y.top) / Y.height * pt.height, UX.zoom, 300); };
function xe() { var $; const Z = ut("minimap"); if (document.hidden || !Z.offsetParent) return; const Y = Z.getContext("2d"), b = Z.width / pt.width, H = Z.height / pt.height; Y.clearRect(0, 0, Z.width, Z.height), Y.fillStyle = "#263a37", Y.fillRect(0, 0, Z.width, Z.height); if (Mt.objective && ['defense', 'hold', 'rescue'].includes(q.mission)) { Y.strokeStyle = '#f0d89b', Y.lineWidth = 1.5, Y.setLineDash([3, 2]), Y.beginPath(), Y.arc(Mt.objective.x * b, Mt.objective.y * H, Mt.objective.radius * b, 0, 7), Y.stroke(), Y.setLineDash([]); } else if (q.mission === 'breakthrough') { Y.strokeStyle = '#f0d89b', Y.lineWidth = 1.5, Y.setLineDash([3, 2]), Y.strokeRect(12 * b, 1200 * H, (pt.width - 24) * b, 244 * H), Y.setLineDash([]); } for (const p of q.terrain.filter(S => S.active))
    Y.fillStyle = p.kind === "block" ? "#8c9480" : "#b6a27b", Y.fillRect((p.x - p.w / 2) * b, (p.y - p.h / 2) * H, p.w * b, p.h * H); for (const p of q.alive())
    Y.fillStyle = p.traits && p.traits.includes('boss') ? "#ff5a3c" : p.side === "good" ? "#b9e8f6" : "#ee9879", Y.beginPath(), Y.arc(p.x * b, p.y * H, p.traits && p.traits.includes('boss') ? 4.6 : p.traits.includes("hero") ? 3.3 : 2.3, 0, 7), Y.fill(), p.traits && p.traits.includes('boss') && (Y.strokeStyle = "#ffb199", Y.lineWidth = 1.5, Y.beginPath(), Y.arc(p.x * b, p.y * H, 6.5, 0, 7), Y.stroke()), p.uid === (q.activeMoverUid || q.selected) && (Y.strokeStyle = "#f17b70", Y.lineWidth = 2, Y.beginPath(), Y.arc(p.x * b, p.y * H, 6, 0, 7), Y.stroke()); const K = ($ = Tt.cameras) == null ? void 0 : $.main; K && (Y.strokeStyle = "#f0d89b", Y.lineWidth = 1, Y.strokeRect(K.worldView.x * b, K.worldView.y * H, K.worldView.width * b, K.worldView.height * H)); }
setInterval(xe, 200);
