/* World art v1. Shared, deterministic art composition; no gameplay mutations.
 * Logical art pixel = 2 world units. Can run in the browser or build-time canvas.
 * Base-centre navigation coordinates stay authoritative in tactical-terrain.js. */
(function(root){'use strict';
const VERSION='battlefield-20261023-1',SCALE=2,W=1165,H=728;
// Material indices: meadow, woodland, limestone, earth, basalt, dungeon, marsh, scree, goldleaf.
const REGIONS={
 minas_tirith:{material:0,secondary:2,scheme:'gondor',pattern:'approach',light:0xf5f2e9,landmark:'whitegate',accent:'#aeb3a2'},
 osgiliath:{material:2,secondary:0,scheme:'gondor',pattern:'ruined-grid',light:0xedeee7,landmark:'dome',accent:'#9d9e8d'},
 amon_sul:{material:0,secondary:7,scheme:'arnor',pattern:'ancient-ring',light:0xebeee7,landmark:'watchtower',accent:'#959b8a'},
 helms_deep:{material:7,secondary:0,scheme:'rohan',pattern:'valley',light:0xe9eeeb,landmark:'hornburg',accent:'#96998c'},
 fangorn:{material:1,secondary:0,scheme:'forest',pattern:'old-forest',light:0xe7eddf,landmark:'oldtree',accent:'#6c7b4e'},
 edoras:{material:0,secondary:3,scheme:'rohan',pattern:'horse-path',light:0xf7edda,landmark:'goldenhall',accent:'#8c8b53'},
 moria:{material:5,secondary:7,scheme:'dwarf',pattern:'pillared-hall',light:0xdce5ed,landmark:'dwarfarch',accent:'#797d7b'},
 isengard:{material:4,secondary:5,scheme:'industry',pattern:'iron-ring',light:0xe6e8e3,landmark:'furnace',accent:'#767969'},
 black_gate:{material:4,secondary:7,scheme:'mordor',pattern:'gate-road',light:0xe5e5dd,landmark:'irongate',accent:'#8c8170'},
 gorgoroth:{material:4,secondary:3,scheme:'mordor',pattern:'volcanic',light:0xece0d5,landmark:'slag',accent:'#8a6451'},
 rivendell:{material:0,secondary:2,scheme:'elf',pattern:'garden',light:0xedf0e7,landmark:'elfpavilion',accent:'#a6ab83'},
 lothlorien:{material:1,secondary:8,scheme:'elf',pattern:'mallorn',light:0xf0eddb,landmark:'mallorn',accent:'#b1a66c'},
 pelennor:{material:0,secondary:3,scheme:'gondor',pattern:'farm',light:0xf6f0df,landmark:'farmhouse',accent:'#9d925a'},
 dead_marshes:{material:6,secondary:1,scheme:'marsh',pattern:'fen',light:0xdce5d9,landmark:'reedbed',accent:'#7f8c6f'},
 dunharrow:{material:7,secondary:0,scheme:'mountain',pattern:'barrow-road',light:0xe3e9e7,landmark:'standingstones',accent:'#9ba29b'},
 erebor:{material:7,secondary:5,scheme:'dwarf',pattern:'mountain-road',light:0xe8eae5,landmark:'dwarfarch',accent:'#999484'},
 mirkwood:{material:1,secondary:6,scheme:'forest',pattern:'dark-forest',light:0xdce7dd,landmark:'webtree',accent:'#768161'},
 dol_guldur:{material:4,secondary:1,scheme:'mordor',pattern:'broken-court',light:0xdfe8db,landmark:'darkruin',accent:'#6e7c69'},
 gondolin:{material:2,secondary:8,scheme:'elf',pattern:'silver-court',light:0xf0f3ec,landmark:'elfgate',accent:'#b4b8a7'},
 angband:{material:4,secondary:5,scheme:'mordor',pattern:'iron-valley',light:0xe9dbcf,landmark:'irongate',accent:'#886654'},
 minas_court:{material:2,secondary:0,scheme:'gondor',pattern:'white-court',light:0xf3f0e5,landmark:'whitetree',accent:'#a7ae9b'},
 orthanc:{material:5,secondary:4,scheme:'industry',pattern:'forge-court',light:0xe3e6e6,landmark:'furnace',accent:'#87877a'},
 barad_dur:{material:4,secondary:5,scheme:'mordor',pattern:'tower-road',light:0xe9dfd6,landmark:'darktower',accent:'#8b7760'},
 minas_morgul:{material:6,secondary:4,scheme:'mordor',pattern:'withered',light:0xdce9df,landmark:'morgulruin',accent:'#819586'},
 dale:{material:2,secondary:0,scheme:'dale',pattern:'market-street',light:0xf5ecde,landmark:'dalehouse',accent:'#b19376'},
 hornburg:{material:7,secondary:2,scheme:'rohan',pattern:'rohan-hall',light:0xeee6d7,landmark:'goldenhall',accent:'#9e926d'},
 erebor_hall:{material:5,secondary:2,scheme:'dwarf',pattern:'royal-hall',light:0xeae6da,landmark:'dwarfpillar',accent:'#a29565'}
};
const LANDMARKS={whitegate:null,dome:'dome',watchtower:'watchtower',hornburg:'hornburg',oldtree:null,goldenhall:'goldenhall',dwarfarch:'dwarfarch',furnace:'furnace',irongate:'irongate',slag:null,elfpavilion:'elfpavilion',mallorn:'mallorn',farmhouse:'farmhouse',reedbed:'reedbed',standingstones:'standingstones',webtree:null,darkruin:'darkruin',elfgate:null,whitetree:null,darktower:'darktower',morgulruin:'darkruin',dalehouse:'farmhouse',dwarfpillar:'dwarfpillar'};
const LANDMARK_NAMES=['whitegate','dome','watchtower','hornburg','goldenhall','dwarfarch','furnace','irongate','elfpavilion','mallorn','farmhouse','reedbed','standingstones','darkruin','darktower','dwarfpillar'];
const SIZE={oak:[240,290],pine:[205,320],dead:[185,255],rock:[200,115],stone:[270,60],fence:[280,58],palisade:[285,130],ruin:[275,150],whitewall:[350,185],darkwall:[350,190],cliff:[365,250],rim:[330,205],rubble:[155,62],burnt:[170,90]};
const depth=y=>5+Math.max(0,Math.min(9999,y))/100000;
const seed=s=>{let h=2166136261;for(const c of s){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;};
const random=s=>()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296;};
function region(key){if(!REGIONS[key])throw Error('Missing world art profile '+key);return REGIONS[key];}
function polygon(ctx,points){ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.closePath();}
function material(ctx,img,id){const sw=img.width/3,sh=img.height/3;const canvas=ctx.canvas.ownerDocument?ctx.canvas.ownerDocument.createElement('canvas'):null;return{img,sx:(id%3)*sw,sy:Math.floor(id/3)*sh,sw,sh};}
function tile(ctx,m,box=[0,0,W,H],size=128){const[x,y,w,h]=box;ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();for(let yy=Math.floor(y/size)*size;yy<y+h;yy+=size)for(let xx=Math.floor(x/size)*size;xx<x+w;xx+=size){ctx.save();const flipX=(Math.floor(xx/size)&1),flipY=(Math.floor(yy/size)&1);ctx.translate(xx+(flipX?size:0),yy+(flipY?size:0));ctx.scale(flipX?-1:1,flipY?-1:1);ctx.drawImage(m.img,m.sx,m.sy,m.sw,m.sh,0,0,size,size);ctx.restore();}ctx.restore();}
function patch(ctx,m,pts,size=128){ctx.save();polygon(ctx,pts);ctx.clip();tile(ctx,m,[0,0,W,H],size);ctx.restore();}
// Fresh composition for every region, using terrain-aware footprints. It is baked
// to compact WebP once; this does not run in the combat frame loop.
function paintGround(ctx,key,atlas){
 const r=region(key),rnd=random(seed(key)),field=root.MESBGTerrain.build(key,1),feature=field.theme.features;
 ctx.imageSmoothingEnabled=false;const primary=material(ctx,atlas,r.material),secondary=material(ctx,atlas,r.secondary),dirt=material(ctx,atlas,3),stone=material(ctx,atlas,2),dark=material(ctx,atlas,5);tile(ctx,primary,[0,0,W,H],160);
 const slab=(x,y,w,h,color,alpha=.20)=>{ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=color;ctx.fillRect(x,y,w,h);ctx.fillStyle='#111a20';ctx.fillRect(x,y+h-1,w,1);ctx.fillRect(x+w-1,y,1,h);ctx.fillStyle='#b1b6ae';ctx.globalAlpha=alpha*.55;ctx.fillRect(x,y,w-1,1);ctx.restore();};
 const area=(pts,m)=>patch(ctx,m,pts);
 const rectangle=(x,y,w,h,m)=>area([[x,y],[x+w,y],[x+w,y+h],[x,y+h]],m);
 const inlay=(pts,color,width=2)=>{ctx.save();ctx.strokeStyle=color;ctx.globalAlpha=.24;ctx.lineWidth=width;ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));ctx.stroke();ctx.restore();};
 const circle=(x,y,rx,ry,color,width)=>{ctx.save();ctx.translate(x,y);ctx.scale(1,ry/rx);ctx.beginPath();ctx.arc(0,0,rx,0,Math.PI*2);ctx.strokeStyle=color;ctx.lineWidth=width;ctx.globalAlpha=.25;ctx.stroke();ctx.restore();};
 // A terrain footprint controls its own undergrowth or masonry apron. No random
 // circles of unrelated rubble on every map and no baked invisible obstacles.
 for(const t of field.terrain.filter(t=>t.type&&t.surface!=='bridge')){
  const x=t.x/2,y=t.y/2,rx=(t.w/2+44)/2,ry=(t.h/2+36)/2,tree=['oak','pine','dead'].includes(t.type),m=tree?secondary:r.material===5?primary:secondary;
  const pts=[];for(let j=0;j<14;j++){const a=j*Math.PI/7,q=.88+rnd()*.12;pts.push([x+Math.cos(a)*rx*q,y+Math.sin(a)*ry*q]);}ctx.save();ctx.globalAlpha=tree?.60:.30;area(pts,m);ctx.restore();
 }
 if(['gondor-fields','harvest-fields'].includes(feature)){
  const fields=feature==='harvest-fields'?[[75,310,260,165],[745,120,255,130],[760,520,250,150]]:[[80,430,250,190],[800,210,230,150]];
  for(const [x,y,w,h]of fields){rectangle(x,y,w,h,dirt);for(let yy=y+3;yy<y+h;yy+=7)inlay([[x+4,yy],[x+w-5,yy+2]],yy%14?'#8e8854':'#c2af6b',3);inlay([[x,y-5],[x+w,y-5]],'#665e3c',2);}
 }
 if(feature==='rohan-pasture'){
  area([[650,0],[W,0],[W,240],[970,290],[810,200]],secondary);
  for(let i=0;i<950;i++){const x=rnd()*W,y=rnd()*H;ctx.globalAlpha=.24;ctx.fillStyle=i%3?'#c0ae62':'#e0ca78';ctx.fillRect(x|0,y|0,1,3);if(i%4===0)ctx.fillRect(x-1|0,y+1|0,1,2);}ctx.globalAlpha=1;
  inlay([[900,80],[820,170],[720,260],[600,375]],'#e2ce8c',3);
 }
 if(['ruined-quays','dale-market'].includes(feature)){
  for(const [x,y,w,h]of(feature==='ruined-quays'?[[55,80,360,195],[790,80,310,200],[95,540,400,150],[720,570,340,140]]:[[55,100,950,170],[210,530,670,160]])){
   rectangle(x,y,w,h,stone);for(let yy=y;yy<y+h;yy+=24)for(let xx=x;xx<x+w;xx+=44)slab(xx+(yy%48?12:0),yy,38,19,r.accent,.20);
  }
  if(feature==='ruined-quays')for(let i=0;i<100;i++){const x=rnd()*W|0,y=rnd()*H|0;slab(x,y,5+rnd()*10,3+rnd()*4,'#929387',.22);}
 }
 if(feature==='weathered-ring'){
  for(let n=0;n<4;n++)circle(550,330,185+n*12,122+n*9,'#a4a194',n===1?12:2);
  for(let a=0;a<Math.PI*2;a+=Math.PI/11){const x=550+Math.cos(a)*207,y=330+Math.sin(a)*140;slab(x,y,18,9,'#a5a08b',.3);}
 }
 if(['deeping-wall','mountain-switchback','lonely-mountain','iron-ravine'].includes(feature)){
  area([[0,0],[165,0],[240,240],[175,430],[220,H],[0,H]],secondary);area([[W,0],[W-150,0],[W-220,230],[W-145,440],[W-210,H],[W,H]],secondary);
  if(feature==='deeping-wall'){rectangle(260,285,650,65,stone);inlay([[250,350],[970,350]],'#b9b7a8',4);}
  if(feature==='lonely-mountain')for(let y=135;y<310;y+=18)inlay([[430,y],[740,y]],'#b5ad8c',4);
  if(feature==='mountain-switchback')for(let i=0;i<8;i++){const y=100+i*78;inlay([[380+Math.sin(i)*55,y],[760+Math.sin(i)*55,y]],'#8d958b',2);}
 }
 if(['dwarven-abyss','dwarven-royal','white-tree-court','hornburg-stonework','hidden-city','orthanc-radials'].includes(feature)){
  const dwarf=feature.startsWith('dwarven'),size=dwarf?68:52;
  for(let y=12;y<H;y+=size*.55)for(let x=12;x<W;x+=size)slab(x+((y/(size*.55)|0)%2)*12,y,size-5,size*.55-5,dwarf?'#75818c':r.accent,.12);
  if(dwarf){for(const x of[138,194,970,1027])inlay([[x,30],[x,H-30]],feature==='dwarven-royal'?'#a99454':'#697382',3);for(const y of[190,530])inlay([[120,y],[1045,y]],feature==='dwarven-royal'?'#a99454':'#697382',3);}
  if(feature==='white-tree-court'){circle(325,380,117,72,'#a5a997',9);circle(325,380,100,61,'#d8dac7',2);inlay([[535,35],[535,690]],'#c8c9b7',3);inlay([[625,35],[625,690]],'#c8c9b7',3);}
  if(feature==='hidden-city'){for(const x of[220,960]){rectangle(x,200,85,340,secondary);inlay([[x+10,220],[x+65,270],[x+10,320],[x+65,370],[x+10,420]],'#acb8a4',3);}}
  if(feature==='orthanc-radials')for(let n=0;n<4;n++)circle(582,350,180+n*12,130+n*10,'#656b6d',n===0?10:2);
 }
 if(feature==='isengard-ring'){circle(582,400,450,290,'#242c2c',22);circle(582,400,430,276,'#707570',3);for(let a=0;a<6.3;a+=Math.PI/6)inlay([[582,400],[582+Math.cos(a)*440,400+Math.sin(a)*280]],'#53595a',8);}
 if(['ash-fissures','iron-ravine','dark-tower-approach','morannon-road'].includes(feature)){
  ctx.save();for(let i=0;i<45;i++){const x=rnd()*W,y=rnd()*H;ctx.beginPath();ctx.moveTo(x,y);for(let j=1;j<6;j++)ctx.lineTo(x+j*5,y+j*3+(rnd()-.5)*10);ctx.strokeStyle=i%7?'#252a2b':'#825340';ctx.globalAlpha=i%7?.5:.35;ctx.lineWidth=i%7?2:1;ctx.stroke();}ctx.restore();
  if(feature==='morannon-road')rectangle(460,30,240,670,dark);
 }
 if(['elven-terraces','golden-flets','root-canopy','webbed-thickets','necromancer-stairs','morgul-withering','sunken-barrows'].includes(feature)){
  const golden=feature==='golden-flets',elf=feature==='elven-terraces';
  for(let i=0;i<1600;i++){const x=rnd()*W,y=rnd()*H;ctx.globalAlpha=golden?.27:.15;ctx.fillStyle=golden?['#cfb45e','#b79945','#e1c875'][i%3]:feature==='morgul-withering'?'#849b83':feature==='webbed-thickets'?'#3c454b':['#72815c','#333f32','#8c865e'][i%3];ctx.fillRect(x|0,y|0,2+rnd()*3|0,1+rnd()*2|0);}ctx.globalAlpha=1;
  if(elf){for(const [x,y]of[[750,135],[850,230],[420,550]]){circle(x,y,80,50,'#c5c7ac',4);circle(x,y,68,42,'#a3b18e',2);}}
  if(feature==='root-canopy'||feature==='webbed-thickets')for(const t of field.terrain.filter(t=>t.art===key)){const x=t.x/2,y=t.y/2;for(let i=0;i<6;i++){const a=i*Math.PI/3;inlay([[x,y],[x+Math.cos(a)*38,y+Math.sin(a)*22],[x+Math.cos(a+.2)*75,y+Math.sin(a+.2)*45]],feature==='root-canopy'?'#514d32':'#383c39',3);}}
  if(feature==='necromancer-stairs')for(let i=0;i<16;i++)inlay([[485+i*5,170+i*12],[650+i*5,170+i*12]],'#676b61',3);
  if(feature==='morgul-withering')for(const x of[450,715])inlay([[x,100],[x,300],[x+10,450]],'#9cb398',2);
 }
 // Soft map illumination is baked once; figures receive the matching light tint.
 const shade=ctx.createRadialGradient(W*.52,H*.52,100,W*.5,H*.5,W*.67);shade.addColorStop(0,'rgba(0,0,0,0)');shade.addColorStop(1,'rgba(8,15,18,'+(['dwarven-abyss','webbed-thickets'].includes(feature)?'.38':'.16')+')');ctx.fillStyle=shade;ctx.fillRect(0,0,W,H);
 return{key,pattern:feature,material:r.material,width:W,height:H};
}
// Cached at terrain rebuild, never in the combat frame loop. Existing terrain
// shapes, collision boundaries and baked painted textures remain authoritative.
function paintAtmosphere(ctx,key,width=W*SCALE,height=H*SCALE){
 const r=region(key),rnd=random(seed(key+'-light')),sx=width/W,sy=height/H;
 ctx.save();ctx.scale(sx,sy);
 const underground=['moria','erebor_hall','orthanc','angband'].includes(key),forest=['fangorn','mirkwood','lothlorien','dol_guldur'].includes(key),evil=['mordor','industry','marsh'].includes(r.scheme);
 // Directional daylight; cool ground shade unifies warm masonry and figures.
 const daylight=ctx.createLinearGradient(0,0,W,H);
 daylight.addColorStop(0,underground?'rgba(17,24,35,.20)':evil?'rgba(57,65,60,.06)':'rgba(239,220,167,.11)');
 daylight.addColorStop(.52,'rgba(0,0,0,0)');daylight.addColorStop(1,underground?'rgba(10,16,25,.24)':forest?'rgba(15,34,29,.21)':'rgba(20,32,41,.13)');ctx.fillStyle=daylight;ctx.fillRect(0,0,W,H);
 if(forest){
  for(let i=0;i<7;i++){
   const x=rnd()*W,y=rnd()*H,rad=75+rnd()*100,g=ctx.createRadialGradient(x,y,rad*.18,x,y,rad);
   g.addColorStop(0,'rgba(10,25,23,.12)');g.addColorStop(1,'rgba(10,25,23,0)');ctx.fillStyle=g;ctx.fillRect(x-rad,y-rad,rad*2,rad*2);
  }
 }
 if(underground){
  for(const x of[180,975])for(const y of[190,535]){
   const g=ctx.createRadialGradient(x,y,8,x,y,125);g.addColorStop(0,'rgba(206,152,70,.15)');g.addColorStop(.4,'rgba(176,115,50,.07)');g.addColorStop(1,'rgba(125,80,40,0)');ctx.fillStyle=g;ctx.fillRect(x-125,y-125,250,250);
  }
 }
 ctx.restore();return{key,underground,forest,evil};
}
function overlap(t,u,head=86,override){if(!t.active||t.surface==='bridge'||!t.type||t.type==='rubble')return false;const dims=override||SIZE[t.type]||[t.drawW,t.drawH],w=dims[0],h=dims[1];return u.y<t.y+10&&u.y>t.y-h-head*.25&&Math.abs(u.x-t.x)<w*.44+(u.radius||38)*.35;}
root.MESBGWorldArt={VERSION,SCALE,W,H,REGIONS,SIZE,LANDMARKS,LANDMARK_NAMES,depth,region,paintGround,paintAtmosphere,overlap};if(typeof module!=='undefined'&&module.exports)module.exports=root.MESBGWorldArt;
})(typeof window!=='undefined'?window:globalThis);
