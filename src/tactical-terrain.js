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
const caches=new WeakMap();
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const flying=u=>!!u?.traits?.includes('flying');
function local(p,t){const a=-(t.angle||0)*Math.PI/180,c=Math.cos(a),s=Math.sin(a),x=p.x-t.x,y=p.y-t.y;return{x:x*c-y*s,y:x*s+y*c};}
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
// Authored Middle-earth battlefields. Coordinates are physical world units.
// Each region owns its silhouettes, crossing geometry and approach routes.
const REGIONAL_PLANS={
 minas_tirith:{identity:'백색 성문과 람마스 에코르 농지',objects:[['whitewall',310,205,1.5],['whitewall',770,205,1.25,'minas_tirith'],['whitewall',1600,205,1.25],['whitewall',2060,205,1.5],['stone',400,710],['stone',1940,920],['fence',760,1050,.8],['oak',2080,540,.9],['rock',210,1120,.8]],roads:[[[1165,80],[1165,620],[1370,1000],[1460,1380]],[[260,1250],[730,950],[1165,620]]],roadWidths:[210,95],features:'gondor-fields'},
 osgiliath:{identity:'안두인 양안의 무너진 곤도르 도시',water:{points:[[-180,660],[370,660],[690,710],[1120,850],[1660,870],[2480,1000]],bank:280,deep:185,cross:[[400,300],[1630,310]]},objects:[['ruin',260,340,.95,'osgiliath'],['whitewall',770,445,.8],['ruin',1830,480,1.05],['ruin',2100,610,.8],['ruin',740,1180,1.1],['whitewall',1950,1230,.8],['rock',1210,1100,.65],['ruin',160,1140,.7]],roads:[[[400,120],[400,1250]],[[1630,120],[1630,1340]],[[700,450],[1400,450],[2030,620]],[[420,1180],[1270,1180],[2000,1260]]],roadWidths:[130,145,100,100],features:'ruined-quays'},
 amon_sul:{identity:'웨더톱의 원형 폐성터와 돌계단',objects:[['ruin',1100,650,1.55,'amon_sul'],['ruin',680,520,.75],['rock',1520,570,1.05],['rock',1680,810,.85],['ruin',750,970,.8],['rock',1380,1050,.75],['dead',300,420,.8],['rock',2040,1120,.8]],roads:[[[360,1350],[560,1030],[470,770],[560,510],[930,350],[1510,350],[1830,620],[1840,1010],[1680,1340]]],roadWidths:[125],features:'weathered-ring'},
 helms_deep:{identity:'호른부르크 산벽과 디핑 방어선',water:{points:[[-160,1060],[440,1060],[870,1010],[1270,975],[1770,1020],[2480,1150]],bank:115,deep:45,cross:[[1150,330],[1870,280,true]]},objects:[['cliff',150,350,1.25],['cliff',110,780,1.3],['cliff',2180,330,1.3],['cliff',2210,770,1.3],['whitewall',620,700,1.15],['whitewall',1710,700,1.15],['whitewall',1960,210,1.4,'helms_deep'],['stone',470,1220,.85],['rock',1680,1240,.7]],roads:[[[1165,90],[1165,620],[1150,1130],[1030,1380]],[[1150,1160],[1860,1160],[1930,1380]]],roadWidths:[170,115],features:'deeping-wall'},
 fangorn:{identity:'팡고른 고목의 뿌리길과 엔트워시',water:{points:[[-160,900],[420,960],[850,880],[1300,700],[1760,670],[2480,650]],bank:150,deep:65,cross:[[570,330,true],[1750,290,true]]},objects:[['oak',420,490,1.25,'fangorn'],['oak',170,750,1.2],['oak',830,550,1.1],['oak',1270,1040,1.3],['oak',1740,1070,1.15],['oak',2040,490,1.1],['dead',2080,1230,1.1],['rock',510,1220,.85]],roads:[[[570,120],[570,700],[570,1150],[900,1380]],[[1770,100],[1760,850],[1900,1380]]],roadWidths:[100,85],features:'root-canopy'},
 edoras:{identity:'메두셀드 황금 전당과 스노우번 초원',water:{points:[[-150,1110],[400,1080],[850,1110],[1360,1160],[1900,1080],[2480,1090]],bank:100,deep:0,cross:[]},objects:[['palisade',1680,205,1.45,'edoras'],['palisade',600,520,.85],['palisade',1800,540,.85],['fence',360,840,.9],['fence',720,980,.8],['stone',1980,830,.85],['rock',2100,1280,.6]],roads:[[[1680,50],[1430,400],[1180,730],[1260,1050],[1450,1380]],[[120,590],[650,680],[1180,730],[2190,620]]],roadWidths:[160,95],features:'rohan-pasture'},
 moria:{identity:'카자드둠의 석주와 심연 위 좁은 다리',water:{kind:'chasm',points:[[-180,900],[390,900],[830,805],[1190,805],[1680,720],[2480,720]],bank:250,deep:250,cross:[[1120,330]]},objects:[['rock',390,440,1.3,'moria'],['rock',1830,390,1.3,'moria'],['rock',400,1210,1.3,'moria'],['rock',1830,1210,1.3,'moria'],['rim',125,770,.85],['rim',2220,860,.8]],roads:[[[1120,80],[1120,1380]],[[390,420],[1830,420]],[[390,1210],[1830,1210]]],roadWidths:[115,180,180],features:'dwarven-abyss'},
 isengard:{identity:'아이센가드 원형 방벽과 벌목된 제련장',objects:[['darkwall',400,430,1.2],['darkwall',1930,430,1.2],['darkwall',210,810,1.1],['darkwall',2120,810,1.1],['darkwall',550,1170,1.15],['darkwall',1780,1170,1.15],['rock',740,740,1.35,'isengard'],['rock',1620,820,1.2,'isengard'],['burnt',600,300,.8],['dead',1810,250,.8]],roads:[[[1165,40],[1165,1410]],[[160,680],[2160,680]],[[500,270],[650,480],[1150,680],[1680,1080],[1800,1370]]],roadWidths:[190,130,100],features:'isengard-ring'},
 black_gate:{identity:'모란논 흑철 성문과 우둔의 자갈길',objects:[['darkwall',270,680,1.5],['darkwall',730,680,1.3,'black_gate'],['darkwall',1610,680,1.3,'black_gate'],['darkwall',2070,680,1.5],['cliff',140,1070,1.25],['cliff',2200,1110,1.25],['rock',560,330,.8],['rock',1830,345,.8]],roads:[[[1165,80],[1165,1370]],[[570,1330],[850,1110],[1165,890],[1480,1110],[1830,1330]]],roadWidths:[260,120],features:'morannon-road'},
 gorgoroth:{identity:'고르고로스 화산재와 갈라진 현무암',objects:[['rock',430,540,1.7,'gorgoroth'],['rock',1570,700,1.8,'gorgoroth'],['cliff',2120,440,1.0],['rock',650,1080,1.4,'gorgoroth'],['rock',2070,1150,1.15,'gorgoroth'],['burnt',180,1140,.9]],roads:[[[1165,100],[980,470],[1050,850],[1300,1280],[1460,1400]],[[1650,120],[1840,570],[1900,880],[1690,1360]]],roadWidths:[150,110],features:'ash-fissures'},
 rivendell:{identity:'브루이넨 물굽이와 붉은 지붕의 엘프 정원',water:{points:[[-180,1120],[360,1050],[800,860],[1190,620],[1690,630],[2480,680]],bank:215,deep:125,cross:[[490,300],[1570,310]]},objects:[['ruin',1880,240,1.4,'rivendell'],['stone',1210,1080,.75],['oak',480,480,.85],['oak',2020,1050,.95],['rock',150,1290,.8],['rock',2230,860,.85]],roads:[[[490,100],[490,1380]],[[1570,80],[1570,1070],[1880,1370]],[[500,400],[1130,310],[1880,400]]],roadWidths:[115,125,100],features:'elven-terraces'},
 lothlorien:{identity:'황금 말로른 군락과 실버로드 여울',water:{points:[[-160,1180],[500,1180],[990,1100],[1430,1030],[1910,1030],[2480,930]],bank:105,deep:0,cross:[]},objects:[['oak',380,440,1.3,'lothlorien'],['oak',900,720,1.15,'lothlorien'],['oak',1920,520,1.4,'lothlorien'],['oak',1450,1150,1.1,'lothlorien'],['oak',200,1060,1.15,'lothlorien'],['rock',2150,1210,.7]],roads:[[[1150,100],[1300,450],[1350,770],[1050,1030],[900,1400]],[[200,650],[500,800],[1350,770],[2130,840]]],roadWidths:[95,75],features:'golden-flets'},
 pelennor:{identity:'펠렌노르 곡식밭과 열린 기병 돌격로',objects:[['ruin',330,420,1.3,'pelennor'],['ruin',1910,1100,1.05,'pelennor'],['stone',400,760,1.05],['fence',690,820,.85],['stone',1730,580,1.05],['fence',2030,740,.85],['oak',210,1180,.75]],roads:[[[1060,50],[1060,530],[1310,1000],[1310,1410]],[[100,1020],[700,990],[1310,1000],[2230,970]]],roadWidths:[230,100],features:'harvest-fields'},
 dead_marshes:{identity:'죽음늪의 끊어진 둑과 가라앉은 무덤',water:{points:[[-160,560],[440,590],[900,660],[1440,710],[1910,630],[2480,660]],bank:240,deep:130,cross:[[710,300,true],[1850,300,true]]},pools:[[350,1080,210,145],[1280,1050,260,140],[2000,1160,180,125]],objects:[['dead',360,350,.85],['rock',1060,385,1.2,'dead_marshes'],['rock',1540,1100,1.15,'dead_marshes'],['dead',2100,390,.85],['burnt',560,1230,.8]],roads:[[[710,80],[710,930],[890,1160],[890,1380]],[[1850,80],[1850,920],[1690,1280],[1690,1380]]],roadWidths:[80,75],features:'sunken-barrows'},
 dunharrow:{identity:'던해로 입석과 망자의 길로 오르는 산길',objects:[['cliff',190,500,1.4],['cliff',420,960,1.2],['cliff',2150,430,1.3],['cliff',1970,940,1.35],['rock',750,490,1.1,'dunharrow'],['rock',1550,780,1.1,'dunharrow'],['rock',800,1170,.85,'dunharrow']],roads:[[[1165,60],[1310,400],[1110,700],[1160,1040],[1290,1400]]],roadWidths:[165],features:'mountain-switchback'},
 erebor:{identity:'외로운 산의 황금 산문과 러닝 강',water:{points:[[-160,1080],[380,1080],[820,1000],[1320,1060],[1840,1190],[2480,1180]],bank:155,deep:80,cross:[[600,300],[1510,300]]},objects:[['ruin',1200,210,1.6,'erebor'],['cliff',280,420,1.3],['cliff',2100,420,1.3],['rock',510,730,1.1],['rock',1880,820,1.1],['rock',2100,1310,.7]],roads:[[[1200,80],[1200,490],[1000,730],[600,1000],[600,1390]],[[1200,490],[1500,790],[1510,1380]]],roadWidths:[190,140],features:'lonely-mountain'},
 mirkwood:{identity:'어둠숲 검은 수목과 거미줄 사냥길',objects:[['oak',260,430,1.2,'mirkwood'],['oak',690,630,1.15,'mirkwood'],['oak',1210,540,1.35,'mirkwood'],['oak',1690,820,1.2,'mirkwood'],['oak',2100,430,1.2,'mirkwood'],['oak',310,1110,1.2,'mirkwood'],['dead',1020,1050,1.1],['oak',2080,1180,1.25,'mirkwood']],roads:[[[470,90],[470,580],[430,820],[810,930],[700,1370]],[[1870,80],[1860,580],[2080,780],[2020,1000],[1730,1380]]],roadWidths:[85,85],features:'webbed-thickets'},
 dol_guldur:{identity:'돌 굴두르의 부서진 계단과 죽은 숲',objects:[['darkwall',580,500,1.4,'dol_guldur'],['ruin',1680,650,1.1],['darkwall',1950,1150,1.2,'dol_guldur'],['dead',220,620,1.2],['dead',2180,340,1.2],['burnt',820,1080,1.1],['ruin',1240,900,.75]],roads:[[[1165,70],[1100,440],[1350,680],[1480,1100],[1165,1380]],[[400,1300],[500,900],[1100,440]]],roadWidths:[135,100],features:'necromancer-stairs'},
 gondolin:{identity:'곤돌린 은백색 성문과 숨겨진 산중 정원',objects:[['whitewall',330,280,1.1],['whitewall',2000,280,1.1],['whitewall',1640,600,1.45,'gondolin'],['whitewall',650,940,1.1,'gondolin'],['cliff',130,800,1.1],['cliff',2220,1010,1.1],['oak',1960,1190,.75]],roads:[[[1080,40],[1080,490],[950,790],[1220,1080],[1220,1400]],[[1080,490],[1880,490]],[[430,1190],[1220,1080],[1870,1190]]],roadWidths:[185,100,110],features:'hidden-city'},
 angband:{identity:'앙그반드 철문과 탕고로드림의 화산 협곡',objects:[['darkwall',1165,180,1.65,'angband'],['cliff',190,480,1.4],['cliff',2100,600,1.4],['cliff',370,1010,1.15],['cliff',1970,1200,1.15],['darkwall',710,800,1.1],['darkwall',1660,970,1.1],['rock',1880,280,.9,'gorgoroth']],roads:[[[1165,60],[1165,570],[1320,820],[1165,1080],[1165,1400]]],roadWidths:[200],features:'iron-ravine'},
 minas_court:{identity:'미나스 티리스 백색나무와 석조 회랑',objects:[['rock',650,760,1.1,'minas_court'],['whitewall',250,480,1.2],['whitewall',2080,480,1.2],['whitewall',250,1060,1.2],['whitewall',2080,1060,1.2],['stone',1600,790,.8]],roads:[[[1165,60],[1165,1390]],[[200,760],[2100,760]]],roadWidths:[260,175],features:'white-tree-court'},
 orthanc:{identity:'오르상크 흑요석 기단과 사방으로 뻗은 공성로',objects:[['rock',1165,700,1.65,'orthanc'],['darkwall',420,450,1.15],['darkwall',1910,450,1.15],['darkwall',420,1080,1.15],['darkwall',1910,1080,1.15],['rock',670,880,.8,'isengard']],roads:[[[1165,50],[760,440],[740,980],[1165,1400]],[[1165,50],[1570,440],[1590,980],[1165,1400]],[[160,760],[780,760]],[[1560,760],[2170,760]]],roadWidths:[145,145,100,100],features:'orthanc-radials'},
 barad_dur:{identity:'바랏두르 거대 흑탑과 층층의 방벽',objects:[['darkwall',1800,220,1.65,'barad_dur'],['darkwall',550,610,1.15],['darkwall',1740,850,1.25],['rock',270,1050,1.5,'gorgoroth'],['darkwall',770,1160,1.0],['cliff',2180,660,1.1]],roads:[[[1780,80],[1340,420],[1130,790],[1270,1130],[1480,1390]],[[270,330],[890,430],[1130,790]]],roadWidths:[220,120],features:'dark-tower-approach'},
 minas_morgul:{identity:'미나스 모르굴 창백한 성벽과 모르굴두인',water:{points:[[-160,1020],[420,1020],[860,930],[1330,900],[1860,960],[2480,1010]],bank:180,deep:110,cross:[[1165,320]]},objects:[['darkwall',700,490,1.25,'minas_morgul'],['darkwall',1660,490,1.25,'minas_morgul'],['dead',250,770,1.05],['dead',2080,730,1.05],['cliff',210,1200,1.0],['rock',1940,1220,.85]],roads:[[[1165,50],[1165,1380]]],roadWidths:[200],features:'morgul-withering'},
 dale:{identity:'데일 상점가와 러닝 강의 붉은 지붕',water:{points:[[-160,840],[440,810],[940,800],[1430,730],[1880,710],[2480,720]],bank:195,deep:115,cross:[[530,300],[1790,300]]},objects:[['ruin',270,400,1.15,'dale'],['ruin',1165,460,1.05,'dale'],['ruin',2050,420,1.1,'dale'],['ruin',880,1170,1.15,'dale'],['stone',2110,1040,.8],['ruin',180,1220,.8]],roads:[[[530,100],[530,1370]],[[1790,100],[1790,1370]],[[100,500],[2150,500]],[[480,1120],[1770,1120]]],roadWidths:[130,130,120,125],features:'dale-market'},
 hornburg:{identity:'혼부르크 견고한 석조 안뜰과 방어 회랑',objects:[['whitewall',1165,205,1.65,'hornburg'],['stone',420,690,1.1],['stone',1910,690,1.1],['whitewall',230,1050,1.15],['whitewall',2100,1050,1.15],['palisade',790,1020,.75]],roads:[[[1165,70],[1165,1380]],[[290,500],[1165,500],[2040,500]],[[1165,920],[1730,1120],[1900,1380]]],roadWidths:[220,130,110],features:'hornburg-stonework'},
 erebor_hall:{identity:'에레보르 왕의 전당 녹색 석주와 황금 기하문양',objects:[['rock',390,430,1.4,'erebor_hall'],['rock',1940,430,1.4,'erebor_hall'],['rock',660,830,1.4,'erebor_hall'],['rock',1670,830,1.4,'erebor_hall'],['rock',390,1220,1.4,'erebor_hall'],['rock',1940,1220,1.4,'erebor_hall']],roads:[[[1165,40],[1165,1410]],[[160,640],[2170,640]],[[160,1040],[2170,1040]]],roadWidths:[250,155,155],features:'dwarven-royal'}
};

const ART_ASPECT={"minas_tirith":0.762125,"osgiliath":0.793981,"amon_sul":0.92623,"helms_deep":0.804627,"edoras":0.557875,"pelennor":0.741206,"minas_court":1.0,"dale":0.810069,"hornburg":0.814815,"fangorn":0.946262,"rivendell":1.207715,"lothlorien":1.056,"moria":1.607656,"dunharrow":0.897243,"erebor":0.853301,"mirkwood":0.962963,"gondolin":0.983294,"erebor_hall":1.85782,"isengard":0.768293,"black_gate":0.607375,"gorgoroth":0.874674,"dead_marshes":0.742991,"dol_guldur":0.969274,"angband":0.69265,"orthanc":1.968421,"barad_dur":1.100865,"minas_morgul":0.989333};
function build(key,stage=1){
 key=THEMES[key]?key:'pelennor';
 const theme=THEMES[key],plan=REGIONAL_PLANS[key],progress=Math.max(0,Math.min(4,(stage-1)%5)),terrain=[],roads=plan.roads.map(p=>p.map(q=>q.slice())),decals=[],bridges=[];
 const add=(type,x,y,s=1,art)=>{
  const t=object(type,x,y,s);if(art){
   const tree=['fangorn','lothlorien','mirkwood'].includes(art),pillar=['moria','erebor_hall'].includes(art),tower=['orthanc','barad_dur'].includes(art);
   t.art=art;if(t.y<285)t.y=305;
   const desired=(tree?385:pillar?220:tower?350:465)*s,aspect=ART_ASPECT[art]||1;
   t.drawH=Math.min(desired*aspect,(t.y-22)/.919);t.drawW=t.drawH/aspect;t.w=t.drawW*(tree?.44:pillar?.78:.72);t.h=t.drawH*.18;t.shape=tree?'ellipse':'rect';t.label=REGIONAL_PLANS[art]?.identity||THEMES[key].title;
   if(['minas_tirith','gondolin','erebor','minas_morgul','hornburg','angband'].includes(art)){
    t.decoration=true;
    for(const side of[-1,1])terrain.push({id:t.id+'-pier-'+side,x:t.x+side*t.drawW*.28,y:t.y,w:t.drawW*.23,h:t.h,shape:'ellipse',kind:'block',active:true,tactical:true,renderHidden:true,los:'blocked'});
   }
  }terrain.push(t);return t;
 };
 for(const row of plan.objects)add(...row);
 for(const t of terrain.filter(t=>t.type&&!t.art)){
  if(key==='moria'&&t.type==='rim')t.skin='abyss-edge';
  else if(['cliff','rim','rock'].includes(t.type)&&['gorgoroth','black_gate','angband','barad_dur','isengard','minas_morgul'].includes(key))t.skin='basalt';
  else if(t.type==='cliff')t.skin='white-cliff';
 }
 const ribbon=(id,surface,points,w)=>{const xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);const t={id,x:(Math.min(...xs)+Math.max(...xs))/2,y:(Math.min(...ys)+Math.max(...ys))/2,w,h:Math.max(...ys)-Math.min(...ys)+w,points:points.map(p=>p.slice()),shape:'ribbon',surface,kind:'surface',los:'clear',active:true,tactical:true};terrain.push(t);return t;};
 let water=null;
 if(plan.water){const q=plan.water,chasm=q.kind==='chasm';water=ribbon('water-bank',chasm?'chasm':'shallow',q.points,q.bank);if(q.deep&&!chasm)ribbon('water-depth','deep',q.points,q.deep);
  for(const [i,c]of q.cross.entries()){const [cx,cw,ford=false]=c,j=q.points.findIndex((p,n)=>n&&cx<=p[0]),a=q.points[j-1],b=q.points[j],slope=(b[1]-a[1])/(b[0]-a[0]),y=a[1]+slope*(cx-a[0]),angle=Math.atan(slope)*180/Math.PI;
   const type=key==='fangorn'||key==='edoras'?'woodbridge':'stonebridge',t={id:'crossing-'+i,x:cx,y,w:cw,h:q.bank+310,angle,surface:'bridge',over:chasm?'chasm':'deep',shape:'rect',kind:'surface',active:true,tactical:true,ford,label:ford?'여울 · 이동 50%':chasm?'카자드둠 석교':'다리 · 정상 이동',type:ford?null:type};
   if(!ford){t.frame=TYPES[type].frame;t.drawW=t.w/.92;t.drawH=t.h+20;if(key==='moria'){t.bridgeStyle='dwarf';t.skin='khazad-bridge';}}terrain.push(t);bridges.push(t);
  }
 }
 for(const [i,p]of (plan.pools||[]).entries()){const [x,y,w,h]=p;terrain.push({id:'marsh-pool-'+i,x,y,w:w+40,h:h+40,shape:'ellipse',surface:'shallow',kind:'surface',los:'clear',active:true,tactical:true},{id:'marsh-depth-'+i,x,y,w,h,shape:'ellipse',surface:'deep',kind:'surface',los:'clear',active:true,tactical:true});}
 // No object relocation at runtime: the authored silhouettes and approaches
 // remain exactly where the artist put them, including after save/resume.
 const anchors=terrain.filter(t=>t.type&&!t.surface&&!['cliff','rim'].includes(t.type));
 const indoor=['moria','erebor_hall','minas_court','hornburg','orthanc'].includes(key);
 for(let i=0;i<progress*3;i++){const a=anchors[(i*3+1)%anchors.length];if(!a)continue;const x=Math.max(130,Math.min(WIDTH-130,a.x+(i%2?1:-1)*(a.w/2+95))),y=Math.min(HEIGHT-155,a.y+130+(i%3)*22);decals.push({x,y,w:120+(i%3)*30,h:75+(i%2)*20,angle:i*47,alpha:.12+progress*.04,kind:indoor?'dust':theme.ground==='forest'?'leafburn':'scorch'});
  if(i%3===0){const t=add('rubble',x,y,.68);if(bridges.some(b=>Math.abs(t.x-b.x)<b.w/2+190&&Math.abs(t.y-b.y)<b.h/2+190))t.active=false;}
 }
 for(const t of anchors){t.damage=progress>=2&&['ruin','whitewall','darkwall','palisade'].includes(t.type)?progress-1:0;if(progress>=2&&['oak','pine'].includes(t.type)&&key!=='lothlorien'&&Math.floor(t.x/90)%3===0)t.scorched=true;}
 const fx=[];
 if(progress){const sites=anchors.filter(t=>t.art||['ruin','burnt','dead','palisade'].includes(t.type));for(const [i,a]of sites.slice(0,Math.min(progress+1,5)).entries()){
  const wood=['edoras','pelennor','dale','hornburg'].includes(key),forest=['fangorn','lothlorien','mirkwood'].includes(key),kind=indoor?'dust':forest?'leaves':wood&&progress>=2?'fire':'smoke';
  fx.push({kind,x:a.x+a.w*.30,y:a.y+a.h*.45,w:kind==='smoke'?62:kind==='dust'?110:kind==='leaves'?80:90,h:kind==='smoke'?155:kind==='dust'?70:kind==='leaves'?65:100,alpha:kind==='smoke'?.38:kind==='leaves'?.60:.82});
 }}
 return{version:3,key,stage,progress,fx,phase:['접근','교전','격전','포위','결전'][progress],theme:{...theme,identity:plan.identity,features:plan.features},terrain,roads,roadWidths:plan.roadWidths,decals,bridges,water};
}
// Fords carve a genuine passage out of the deep core but retain shallow cost.
const baseSpeed=speed;
function surfaceSpeed(u,p,terrain){if(flying(u))return 1;const c=terrain.find(t=>t.active&&t.surface==='bridge'&&contains(p,t));if(c)return c.ford?.5:1;return baseSpeed(u,p,terrain);}
speed=surfaceSpeed;
root.MESBGTerrain={version:3,TYPES,THEMES,REGIONAL_PLANS,WIDTH,HEIGHT,CELL,contains,signed,blocks,legal,line,cost,speed,plan,route,prefix,sight,build,pathCost,stamp};
if(typeof module!=='undefined'&&module.exports)module.exports=root.MESBGTerrain;
})(typeof window!=='undefined'?window:globalThis);
