/* Tactical terrain: one authoritative geometry for navigation, drawing and saves.
 * World units, base-centred collision; surfaces never inherit projectile blocking.
 * Static navigation grids are cached per terrain array and base size, not per frame. */
(function(root){
'use strict';
const WIDTH=2330,HEIGHT=1456,CELL=32,COLS=Math.ceil(WIDTH/CELL),ROWS=Math.ceil(HEIGHT/CELL);
const TYPES={
 oak:{frame:0,w:180,h:210,shape:'ellipse',cw:128,ch:128,los:'blocked',label:'참나무 · 우회'},
 pine:{frame:1,w:155,h:220,shape:'ellipse',cw:112,ch:132,los:'blocked',label:'침엽수 · 우회'},
 dead:{frame:2,w:140,h:185,shape:'ellipse',cw:85,ch:95,los:'cover',label:'고목 · 우회'},
 rock:{frame:3,w:190,h:145,shape:'ellipse',cw:170,ch:126,los:'blocked',label:'바위 · 우회'},
 stone:{frame:4,w:270,h:96,shape:'rect',cw:252,ch:52,jump:true,los:'cover',label:'낮은 돌담 · 넘기'},
 fence:{frame:5,w:280,h:82,shape:'rect',cw:260,ch:34,jump:true,los:'cover',label:'울타리 · 넘기'},
 palisade:{frame:6,w:285,h:138,shape:'rect',cw:265,ch:65,los:'blocked',label:'목책 · 우회'},
 ruin:{frame:7,w:275,h:158,shape:'rect',cw:254,ch:74,los:'blocked',label:'폐허벽 · 우회'},
 whitewall:{frame:8,w:350,h:170,shape:'rect',cw:330,ch:88,los:'blocked',label:'곤도르 성벽 · 차단'},
 darkwall:{frame:9,w:350,h:165,shape:'rect',cw:330,ch:82,los:'blocked',label:'흑색 성벽 · 차단'},
 cliff:{frame:10,w:365,h:250,shape:'ellipse',cw:335,ch:205,los:'blocked',label:'절벽 · 차단'},
 rim:{frame:11,w:330,h:210,shape:'ellipse',cw:300,ch:165,los:'blocked',label:'협곡 바위 · 차단'},
 woodbridge:{frame:12,w:330,h:355,shape:'rect',los:'clear',label:'목교 · 통행'},
 stonebridge:{frame:13,w:340,h:360,shape:'rect',los:'clear',label:'석교 · 통행'},
 rubble:{frame:14,w:155,h:110,shape:'ellipse',cw:120,ch:80,los:'cover',slow:2,label:'잔해 · 이동 50%'},
 burnt:{frame:15,w:170,h:120,shape:'ellipse',cw:142,ch:75,los:'cover',label:'불탄 고목 · 우회'}
};
// Every current region has its own geography and silhouettes. The tuple stores
// ground family / river or chasm / crossing positions / dominant object palette.
const THEMES={
 minas_tirith:{ground:'gondor',layout:'gate',palette:['whitewall','ruin','rock','oak'],title:'람마스 에코르 성문길',story:'성문 앞 석벽과 농지, 좌우 돌담 우회로'},
 osgiliath:{ground:'gondor',layout:'river',cross:[760,1670],palette:['ruin','whitewall','rock'],title:'안두인 도하전',story:'깊은 안두인과 두 석교, 폐허 사이 측면길'},
 amon_sul:{ground:'meadow',layout:'ruins',palette:['ruin','rock','dead'],title:'웨더톱의 옛 성터',story:'무너진 아르노르 석벽과 정상으로 오르는 틈길'},
 helms_deep:{ground:'meadow',layout:'valley',cross:[1250,550],palette:['cliff','stone','palisade'],title:'디핑 계류 방어선',story:'협곡 절벽, 디핑 개울과 돌담 뒤 방어선'},
 fangorn:{ground:'forest',layout:'stream',cross:[680,1660],palette:['oak','pine','rock'],title:'엔트워시 숲길',story:'고목 군락이 동선을 나누고 여울과 목교가 연결'},
 edoras:{ground:'meadow',layout:'stream',cross:[1400,560],palette:['palisade','fence','stone'],title:'스노우번 목책길',story:'로한 초지와 개울, 목책 문과 농가 울타리'},
 moria:{ground:'stone',layout:'chasm',cross:[1110,1850],palette:['rim','rock','ruin'],title:'카자드둠의 다리',story:'깊은 균열 위 석교와 바위 사이 좁은 우회길'},
 isengard:{ground:'ash',layout:'ring',palette:['darkwall','dead','rock'],title:'오르상크 외곽 공성로',story:'검은 원형 방벽의 문과 벌목 잔해'},
 black_gate:{ground:'ash',layout:'gate',palette:['darkwall','cliff','rock'],title:'모란논의 길목',story:'검은 성벽의 중앙문과 바위 측면 통로'},
 gorgoroth:{ground:'ash',layout:'rocks',palette:['rock','cliff','dead'],title:'재의 평원',story:'검은 암반이 전열을 나누는 세 갈래 길'},
 rivendell:{ground:'forest',layout:'river',cross:[1000,1830],palette:['rock','oak','stone'],title:'브루이넨 계곡',story:'깊은 계곡 강, 두 석교와 바위 사이 접근로'},
 lothlorien:{ground:'forest',layout:'stream',cross:[850,1680],palette:['oak','oak','rock'],title:'실버로드 강숲',story:'말로른 숲의 통로와 여울을 통한 측면 도하'},
 pelennor:{ground:'meadow',layout:'fields',palette:['stone','fence','oak','rock'],title:'펠렌노르 농지',story:'낮은 농지 경계와 열린 기병 통로'},
 dead_marshes:{ground:'forest',layout:'marsh',cross:[760,1640],palette:['dead','rock','burnt'],title:'늪의 마른 둑길',story:'깊은 물웅덩이를 피해 얕은 여울과 마른 둑으로 이동'},
 dunharrow:{ground:'stone',layout:'valley',palette:['cliff','rim','rock'],title:'망자의 길 입구',story:'백색산맥의 절벽 사이 좁은 산길'},
 erebor:{ground:'stone',layout:'river',cross:[1190,550],palette:['cliff','ruin','rock'],title:'러닝 강의 산문',story:'산문 앞 강과 두 석교, 바위 사이 측면 접근'},
 mirkwood:{ground:'forest',layout:'forest',palette:['pine','oak','dead','rock'],title:'어둠숲 사냥길',story:'밀집한 수목이 막는 중심부와 좌우 좁은 숲길'},
 dol_guldur:{ground:'ash',layout:'ruins',palette:['darkwall','dead','ruin'],title:'남부 어둠숲 폐허',story:'버려진 검은 벽과 고목 사이의 세 갈래 길'},
 gondolin:{ground:'gondor',layout:'gate',palette:['whitewall','cliff','ruin'],title:'숨겨진 도시의 문',story:'흰 성벽과 산벽 사이 중앙문과 외곽길'},
 angband:{ground:'ash',layout:'valley',palette:['darkwall','cliff','rock'],title:'탕고로드림 철벽길',story:'재의 협곡과 철벽 문 사이의 좁은 진군로'},
 minas_court:{ground:'gondor',layout:'court',palette:['whitewall','ruin','oak'],title:'백색 도시의 안뜰',story:'석조 회랑과 분리된 안뜰 통로'},
 orthanc:{ground:'ash',layout:'court',palette:['darkwall','rock','ruin'],title:'오르상크 기단',story:'검은 석조 기단과 공성로 사이 회랑'},
 barad_dur:{ground:'ash',layout:'rocks',palette:['darkwall','cliff','rock'],title:'흑탑의 그림자',story:'검은 암반과 무너진 방벽이 갈라놓은 전선'},
 minas_morgul:{ground:'ash',layout:'river',cross:[870,1690],palette:['darkwall','dead','cliff'],title:'모르굴 계곡의 다리',story:'모르굴두인 깊은 수로와 검은 성벽의 문'},
 dale:{ground:'gondor',layout:'river',cross:[700,1590],palette:['ruin','stone','rock'],title:'데일의 러닝 강변',story:'석조 골목과 강을 건너는 두 석교'},
 hornburg:{ground:'stone',layout:'court',palette:['stone','palisade','rock'],title:'혼부르크 대전당',story:'로한 석조 회랑과 방책 사이 전열'},
 erebor_hall:{ground:'stone',layout:'court',palette:['ruin','rock','whitewall'],title:'두린의 돌기둥 전당',story:'드워프 석주와 방벽 사이의 넓고 좁은 회랑'}
};
const caches=new WeakMap(),rotations=new WeakMap();
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const flying=u=>!!u?.traits?.includes('flying');
function local(p,t){const angle=t.angle||0;let r=rotations.get(t);if(!r||r.angle!==angle){const a=-angle*Math.PI/180;r={angle,c:Math.cos(a),s:Math.sin(a)};rotations.set(t,r);}const x=p.x-t.x,y=p.y-t.y;return{x:x*r.c-y*r.s,y:x*r.s+y*r.c};}
function segmentDistance(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],q=Math.max(0,Math.min(1,((p.x-a[0])*dx+(p.y-a[1])*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p.x-a[0]-q*dx,p.y-a[1]-q*dy);}
function signed(p,t){
 if(t.shape==='ribbon'){let d=Infinity;for(let i=1;i<t.points.length;i++)d=Math.min(d,segmentDistance(p,t.points[i-1],t.points[i]));return d-t.w/2;}
 const q=local(p,t),w=t.w/2,h=t.h/2;
 if(t.shape==='ellipse'){// conservative radial distance, smooth and no corner boxes
  const k0=Math.hypot(q.x/w,q.y/h),k1=Math.hypot(q.x/(w*w),q.y/(h*h));return k1?k0*(k0-1)/k1:-Math.min(w,h);
 }
 const dx=Math.abs(q.x)-w,dy=Math.abs(q.y)-h;return Math.hypot(Math.max(0,dx),Math.max(0,dy))+Math.min(Math.max(dx,dy),0);
}
// Cheap bounding reject before the exact signed distance (identical results, far fewer trig calls).
// Rect: true distance >= centre distance - circumradius. Ellipse (radial approximation):
// signed >= (d/M-1)*m for half-axes M>=m, so d >= M*(1+pad/m) can never be inside.
const contains=(p,t,pad=0)=>{
 if(t.shape!=='ribbon'&&t.w>0&&t.h>0){
  const P=Math.max(0,pad),M=Math.max(t.w,t.h)/2,m=Math.min(t.w,t.h)/2;
  const R=(t.shape==='ellipse'?M*(1+P/m):Math.hypot(t.w,t.h)/2+P)+1,dx=p.x-t.x,dy=p.y-t.y;
  if(dx>R||dx<-R||dy>R||dy<-R||dx*dx+dy*dy>R*R)return false;
 }
 return signed(p,t)<pad;
};
function corridor(p,terrain,pad=0,kind){return terrain.some(t=>t.active&&t.surface==='bridge'&&(!kind||t.over===kind)&&signed(p,t)<=-pad);}
function blocks(u,p,t,terrain,pad=u?.radius||0,passJump=false){
 if(!t.active||t.decoration||flying(u)||t.surface==='bridge'||t.surface==='shallow'||t.surface==='rubble'||t.z==='hill')return false;
 if(passJump&&t.jump)return false;
 if(t.surface==='deep'||t.surface==='chasm'){
  if(!contains(p,t,pad))return false;
  if(corridor(p,terrain,pad,t.surface))return false;
  // On bridge approaches only the part of the base over water needs a deck.
  // Land behind the bridge remains valid support for large units.
  if(contains(p,t)&&!corridor(p,terrain,0,t.surface))return true;
  for(let i=0;i<24;i++){const a=i*Math.PI/12,q={x:p.x+Math.cos(a)*pad,y:p.y+Math.sin(a)*pad};if(contains(q,t)&&!corridor(q,terrain,0,t.surface))return true;}
  return false;
 }
 if(t.surface==='ford')return false;
 // Old preparations migrate to the authored layout. Legacy barriers still work
 // in combat fixtures without requiring any new fields.
 if(t.z==='mountain'&&u?.traits?.includes('mountain'))return false;
 return contains(p,t,pad);
}
function legal(u,p,units,terrain,passJump=false){
 const r=u.radius||0;if(p.x<r+12||p.x>WIDTH-r-12||p.y<r+25||p.y>HEIGHT-r-12)return false;
 if(terrain.some(t=>blocks(u,p,t,terrain,r,passJump)))return false;
 return !units.some(v=>v.alive&&v.uid!==u.uid&&dist(v,p)<r+v.radius-.3);
}
function speed(u,p,terrain){
 if(flying(u)||corridor(p,terrain,0))return 1;
 return terrain.some(t=>t.active&&!t.decoration&&(t.surface==='shallow'||t.surface==='ford'||t.surface==='rubble')&&contains(p,t))?.5:1;
}
function line(u,a,b,units,terrain,passJump=true){
 const n=Math.max(1,Math.ceil(dist(a,b)/8));for(let i=1;i<=n;i++){const p={x:a.x+(b.x-a.x)*i/n,y:a.y+(b.y-a.y)*i/n};if(!legal(u,p,units,terrain,passJump))return false;}return true;
}
function cost(u,a,b,terrain){const d=dist(a,b),n=Math.max(1,Math.ceil(d/8));let c=0;for(let i=0;i<n;i++)c+=d/n/speed(u,{x:a.x+(b.x-a.x)*(i+.5)/n,y:a.y+(b.y-a.y)*(i+.5)/n},terrain);return c;}
function pathCost(u,path,terrain){let c=0;for(let i=1;i<path.length;i++)c+=cost(u,path[i-1],path[i],terrain);return c;}
class Heap{constructor(){this.a=[];}push(v){let i=this.a.length;this.a.push(v);while(i){let p=(i-1)>>1;if(this.a[p][0]<=v[0])break;this.a[i]=this.a[p];i=p;}this.a[i]=v;}pop(){const first=this.a[0],v=this.a.pop();if(this.a.length){let i=0;while(i*2+1<this.a.length){let j=i*2+1;if(j+1<this.a.length&&this.a[j+1][0]<this.a[j][0])j++;if(this.a[j][0]>=v[0])break;this.a[i]=this.a[j];i=j;}this.a[i]=v;}return first;}get length(){return this.a.length;}}
function stamp(terrain){return terrain.map(t=>[t.id,t.active,t.x,t.y,t.w,t.h,t.angle,t.surface].join(':')).join('|');}
function grid(u,terrain){
 let bucket=caches.get(terrain);const key=[u.radius,flying(u),u.traits?.includes('mountain')].join(':'),s=stamp(terrain);
 if(!bucket||bucket.stamp!==s){bucket={stamp:s,grids:new Map()};caches.set(terrain,bucket);}
 if(bucket.grids.has(key))return bucket.grids.get(key);
 const open=new Uint8Array(COLS*ROWS),slow=new Float32Array(COLS*ROWS);
 for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){const i=y*COLS+x,p={x:(x+.5)*CELL,y:(y+.5)*CELL};open[i]=legal(u,p,[],terrain,true)?1:0;slow[i]=1/speed(u,p,terrain);}
 const g={open,slow};bucket.grids.set(key,g);return g;
}
function route(u,to,units,terrain,budget=Infinity){
 if(!legal(u,to,units,terrain)||dist(u,to)>budget+.1)return null;
 const start={x:u.x,y:u.y};
 if(line(u,start,to,units,terrain)){const c=cost(u,start,to,terrain);if(c<=budget+.1)return{to,path:[start,to],distance:c,travel:dist(start,to),snapped:false,yields:[]};}
 const {open,slow}=grid(u,terrain),N=COLS*ROWS,g=new Float64Array(N).fill(Infinity),prev=new Int32Array(N).fill(-1),closed=new Uint8Array(N),heap=new Heap(),pt=i=>({x:(i%COLS+.5)*CELL,y:(Math.floor(i/COLS)+.5)*CELL});
 const near=(p,r=3)=>{const out=[],cx=Math.floor(p.x/CELL),cy=Math.floor(p.y/CELL);for(let y=Math.max(0,cy-r);y<=Math.min(ROWS-1,cy+r);y++)for(let x=Math.max(0,cx-r);x<=Math.min(COLS-1,cx+r);x++){let i=y*COLS+x;if(open[i])out.push(i);}return out.sort((a,b)=>dist(pt(a),p)-dist(pt(b),p));};
 for(const i of near(start,2)){const p=pt(i);if(!line(u,start,p,units,terrain))continue;g[i]=cost(u,start,p,terrain);heap.push([g[i]+dist(p,to),i]);}
 let end=-1,endCost=Infinity;const targetNodes=new Set(near(to,2));
 while(heap.length){const [,i]=heap.pop();if(closed[i])continue;closed[i]=1;const a=pt(i);if(g[i]+dist(a,to)>budget+.1)continue;
  if(targetNodes.has(i)&&line(u,a,to,units,terrain)){const c=g[i]+cost(u,a,to,terrain);if(c<=budget+.1){end=i;endCost=c;break;}}
  const x=i%COLS,y=Math.floor(i/COLS);
  for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){
   const xx=x+dx,yy=y+dy;if(xx<0||xx>=COLS||yy<0||yy>=ROWS)continue;const j=yy*COLS+xx;if(!open[j]||closed[j])continue;
   const b=pt(j);if(!line(u,a,b,units,terrain))continue;const d=CELL*Math.hypot(dx,dy)*(slow[i]+slow[j])/2,ng=g[i]+d;
   if(ng<g[j]&&ng<=budget+.1){g[j]=ng;prev[j]=i;heap.push([ng+dist(b,to),j]);}
  }
 }
 if(end<0)return null;
 const raw=[to];for(let i=end;i>=0;i=prev[i])raw.unshift(pt(i));raw.unshift(start);
 // Smooth only when the shortcut neither clips geometry nor exceeds the cost
 // of the section it replaces. A faster road can beat a shorter shallow ford.
 const path=[start];let i=0;while(i<raw.length-1){let best=i+1,old=0;for(let j=i+1;j<raw.length;j++){old+=cost(u,raw[j-1],raw[j],terrain);if(line(u,raw[i],raw[j],units,terrain)&&cost(u,raw[i],raw[j],terrain)<=old+.5)best=j;}path.push(raw[best]);i=best;}
 const actual=pathCost(u,path,terrain);if(actual>budget+.1)return null;
 return{to,path,distance:actual,travel:path.slice(1).reduce((d,p,i)=>d+dist(path[i],p),0),snapped:false,yields:[],gridCost:endCost};
}
function plan(u,to,units,terrain,budget,options={}){
 const candidates=[];if(legal(u,to,units,terrain))candidates.push(to);
 if(options.snap!==false&&!options.chargeTarget)for(const d of[16,32,56,80])for(let i=0;i<12;i++){const p={x:to.x+Math.cos(i*Math.PI/6)*d,y:to.y+Math.sin(i*Math.PI/6)*d};if(dist(u,p)<=budget&&legal(u,p,units,terrain))candidates.push(p);}
 candidates.sort((a,b)=>dist(a,to)-dist(b,to));for(const p of candidates.slice(0,10)){const r=route(u,p,units,terrain,budget);if(r)return{...r,snapped:dist(p,to)>1};}return null;
}
function prefix(u,path,terrain,budget){let left=budget,result={x:u.x,y:u.y};for(let i=1;i<path.length;i++){const a=path[i-1],b=path[i],c=cost(u,a,b,terrain);if(c<=left){left-=c;result=b;continue;}let lo=0,hi=1;for(let n=0;n<14;n++){const f=(lo+hi)/2,p={x:a.x+(b.x-a.x)*f,y:a.y+(b.y-a.y)*f};if(cost(u,a,p,terrain)<=left)lo=f;else hi=f;}return{x:a.x+(b.x-a.x)*lo,y:a.y+(b.y-a.y)*lo};}return result;}
function sight(a,b,terrain){let cover=false;for(const t of terrain){if(!t.active||t.decoration||t.los==='clear'||t.surface==='deep'||t.surface==='shallow'||t.surface==='bridge'||t.surface==='chasm'||t.z==='hill')continue;const n=Math.ceil(dist(a,b)/12);for(let i=1;i<n;i++)if(contains({x:a.x+(b.x-a.x)*i/n,y:a.y+(b.y-a.y)*i/n},t)){if(t.los==='blocked'||(!t.los&&t.kind==='block'))return'blocked';cover=true;break;}}return cover?'cover':'clear';}
function object(type,x,y,scale=1,angle=0){const d=TYPES[type];return{id:'terrain-'+type+'-'+x+'-'+y,type,x,y,w:d.cw*scale||d.w*scale,h:d.ch*scale||d.h*scale,drawW:d.w*scale,drawH:d.h*scale,shape:d.shape,angle,frame:d.frame,kind:d.jump?'cover':'block',jump:!!d.jump,los:d.los,surface:d.slow?'rubble':undefined,active:true,tactical:true,label:d.label};}
function build(key,stage=1){
 const theme=THEMES[key]||THEMES.pelennor,progress=Math.max(0,Math.min(4,(stage-1)%5)),terrain=[],roads=[],decals=[],bridges=[];
 const add=(type,x,y,s=1,a=0)=>{const t=object(type,x,y,s,a);terrain.push(t);return t;};
 const ribbon=(id,surface,points,w)=>{const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);const t={id,x:(Math.min(...xs)+Math.max(...xs))/2,y:(Math.min(...ys)+Math.max(...ys))/2,w,h:Math.max(...ys)-Math.min(...ys)+w,points,shape:'ribbon',surface,kind:'surface',los:'clear',active:true,tactical:true};terrain.push(t);return t;};
 const river=['river','stream','chasm','marsh'].includes(theme.layout)||(theme.layout==='valley'&&key==='helms_deep');
 let water=null;
 if(river){
  const points=[[-150,800],[440,820],[850,780],[1250,815],[1750,790],[2480,830]],chasm=theme.layout==='chasm',stream=theme.layout==='stream'||key==='helms_deep',marsh=theme.layout==='marsh';
  const width=chasm?205:stream?140:190;
  water=ribbon('water-bank',chasm?'chasm':'shallow',points,width+40);
  ribbon('water-depth',chasm?'chasm':'deep',points,chasm?width:stream?65:135);
  const xs=theme.cross||[1110,1830];
  for(const [i,x]of xs.entries()){
   // Linear interpolation keeps bridge decks aligned with their actual river.
   const seg=points.findIndex((p,j)=>j&&x<=p[0]),a=points[seg-1],b=points[seg],y=a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0]);
   const ford=(stream||marsh)&&i===1;
   const t={id:'crossing-'+i,x,y,w:i===0?340:270,h:width+180,surface:'bridge',over:chasm?'chasm':'deep',shape:'rect',kind:'surface',active:true,tactical:true,ford,label:ford?'밝은 여울 · 이동 50%':chasm?'카자드둠 석교':'다리 · 정상 이동',type:ford?null:theme.ground==='meadow'||theme.ground==='forest'?'woodbridge':'stonebridge'};
   if(ford){t.surface='bridge';t.ford=true;}else{t.frame=TYPES[t.type].frame;t.drawW=t.w/.68;t.drawH=t.h+35;}
   terrain.push(t);bridges.push(t);roads.push([[x,350],[x,y],[x,1260]]);
  }
 }
 // Hand-authored routes stay stable over the five stages; damage is additive.
 const p=theme.palette;
 if(['gate','ring'].includes(theme.layout)){
  for(const x of[300,675,1655,2030])add(p[0],x,215,1.06);
  for(const x of[380,1950]){add(p[1],x,650,1.05);add(p[2],x,1080,1.0);}
  add(p[0],650,940,.8);add(p[0],1680,940,.8);roads.push([[1165,160],[1165,700],[1165,1340]]);
 }else if(theme.layout==='court'){
  for(const x of[420,1910])for(const y of[480,960])add(p[0],x,y,1.25);
  for(const x of[870,1470])add(p[1],x,800,1.12);
  roads.push([[1165,180],[1165,1300]],[[210,730],[2120,730]]);
 }else if(theme.layout==='valley'){
  for(const x of[150,2180])for(const y of[340,750,1160])add('cliff',x,y,1.2);
  add(p[1],715,990,1.1);add(p[1],1615,1030,1.1);add('rock',580,485,.95);add('rock',1740,500,.95);
  roads.push([[1165,120],[1200,680],[1100,1320]]);
 }else if(theme.layout==='forest'){
  for(const [x,y]of[[300,350],[520,610],[310,1080],[790,840],[1030,850],[1250,840],[1500,820],[1760,550],[1960,950],[2080,1240]])add(p[Math.floor(x/230)%p.length],x,y,1.15);
  roads.push([[650,220],[660,670],[580,1040],[950,1310]],[[1650,220],[1650,670],[1790,1040],[1420,1310]]);
 }else if(['river','stream','chasm','marsh'].includes(theme.layout)){
  for(const [x,y,i]of[[320,520,0],[2000,460,0],[360,1090,1],[1980,1080,1],[1180,1100,2],[1180,490,2]])add(i===2&&['cliff','rim'].includes(p[i%p.length])?'rock':p[i%p.length],x,y,i===2?.8:1.1);
  if(theme.layout==='chasm'){add('rim',280,800,1.1);add('rim',2160,820,1.1);}
 }else if(theme.layout==='fields'){
  for(const [x,y,type]of[[480,660,'stone'],[810,840,'fence'],[1630,700,'stone'],[1880,1040,'fence'],[330,1060,'oak'],[1920,420,'rock']])add(type,x,y,1.1);
  roads.push([[1165,150],[1165,1330]],[[300,500],[1900,1120]]);
 }else{
  for(const [x,y,i]of[[330,510,0],[600,800,1],[1165,800,0],[1730,815,1],[2040,540,2],[430,1180,2],[1860,1170,0]])add(p[i%p.length],x,y,.85);
  roads.push([[1165,170],[980,530],[930,1020],[1165,1320]],[[580,200],[500,710],[610,1320]]);
 }
 // Keep authored bridge approaches open for every supported ground base.
 for(const t of terrain.filter(t=>t.type&&!t.surface))for(const c of bridges){
  if(Math.abs(t.x-c.x)<c.w/2+t.w/2+145&&Math.abs(t.y-c.y)<c.h/2+t.h/2+145){
   t.x=Math.max(220,Math.min(WIDTH-220,c.x+(t.x<c.x?-1:1)*(c.w/2+t.w/2+190)));
  }
 }
 // Trees form small forests with discrete gaps, not invisible solid rectangles.
 if(['forest','meadow'].includes(theme.ground)&&theme.layout!=='forest'){
  for(const [x,y]of[[140,410],[2100,320],[160,1200],[2140,1210]])add(theme.ground==='forest'?'oak':'rock',x,y,.85);
 }
 for(let i=0;i<progress*3;i++){
  const anchors=terrain.filter(t=>t.type&&!t.surface&&t.type!=='cliff'&&t.type!=='rim'),a=anchors[i%anchors.length];if(!a)continue;
  const x=Math.max(120,Math.min(WIDTH-120,a.x+(i%2?1:-1)*(a.w/2+90))),y=Math.min(HEIGHT-140,a.y+100+(i%3)*18);
  // Scorching is decoration; walkable rubble is explicitly slow, never a wall.
  decals.push({x,y,w:150+(i%3)*25,h:90+(i%2)*25,angle:i*43,alpha:.15+progress*.04});
  if(i%3===0){const t=add('rubble',x,y,.75);if(bridges.some(b=>contains(t,b,160)))t.active=false;}
 }
 for(const t of terrain){if(t.type&&progress>=2&&['oak','pine'].includes(t.type)&&Math.floor(t.x/100)%4===0)t.scorched=true;}
 return{version:2,key,stage,progress,phase:['접근','교전','격전','포위','결전'][progress],theme,terrain,roads,decals,bridges,water};
}
// Fords carve a genuine passage out of the deep core but retain shallow cost.
const baseSpeed=speed;
function surfaceSpeed(u,p,terrain){if(flying(u))return 1;const c=terrain.find(t=>t.active&&t.surface==='bridge'&&contains(p,t));if(c)return c.ford?.5:1;return baseSpeed(u,p,terrain);}
speed=surfaceSpeed;
root.MESBGTerrain={version:2,TYPES,THEMES,WIDTH,HEIGHT,CELL,contains,signed,blocks,legal,line,cost,speed,plan,route,prefix,sight,build,pathCost,stamp};
if(typeof module!=='undefined'&&module.exports)module.exports=root.MESBGTerrain;
})(typeof window!=='undefined'?window:globalThis);
