/* World art v1. Shared, deterministic art composition; no gameplay mutations.
 * Logical art pixel = 2 world units. Can run in the browser or build-time canvas.
 * Base-centre navigation coordinates stay authoritative in tactical-terrain.js. */
(function(root){'use strict';
const VERSION='world-20261020-1',SCALE=2,W=1165,H=728;
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
 rivendell:{material:8,secondary:2,scheme:'elf',pattern:'garden',light:0xedf0e7,landmark:'elfpavilion',accent:'#a6ab83'},
 lothlorien:{material:8,secondary:1,scheme:'elf',pattern:'mallorn',light:0xf0eddb,landmark:'mallorn',accent:'#b1a66c'},
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
function paintGround(ctx,key,atlas){const r=region(key),rnd=random(seed(key));ctx.imageSmoothingEnabled=false;const primary=material(ctx,atlas,r.material),secondary=material(ctx,atlas,r.secondary);tile(ctx,primary);
 // Large irregular secondary patches break any repeating square material edges.
 for(let i=0;i<24;i++){const x=Math.floor(rnd()*W),y=Math.floor(rnd()*H),rx=25+Math.floor(rnd()*90),ry=15+Math.floor(rnd()*50),pts=[];for(let j=0;j<14;j++){const a=j*Math.PI/7,q=.65+rnd()*.35;pts.push([Math.round(x+Math.cos(a)*rx*q),Math.round(y+Math.sin(a)*ry*q)]);}patch(ctx,secondary,pts);}
 const slab=(x,y,w,h,shade)=>{ctx.save();ctx.globalAlpha=.18;ctx.fillStyle=shade||r.accent;ctx.fillRect(x,y,w,h);ctx.globalAlpha=.16;ctx.fillStyle='#171c1b';ctx.fillRect(x,y+h-1,w,1);ctx.fillRect(x+w-1,y,1,h);ctx.globalAlpha=.12;ctx.fillStyle='#e3ddc1';ctx.fillRect(x,y,w-1,1);ctx.restore();};
 const street=(x,y,w,h)=>patch(ctx,secondary,[[x,y],[x+w,y],[x+w,y+h],[x,y+h]]);
 if(['approach','gate-road','tower-road','mountain-road','iron-valley'].includes(r.pattern)){street(491,0,184,H);for(let y=0;y<H;y+=18)for(let x=495;x<675;x+=28)if(rnd()>.08)slab(x+(y%36?8:0),y,24,14);}
 if(['ruined-grid','market-street','broken-court'].includes(r.pattern)){for(let y=38;y<H;y+=190)street(0,y,W,55);for(let x=160;x<W;x+=320)street(x,0,74,H);for(let i=0;i<180;i++){const x=Math.floor(rnd()*W),y=Math.floor(rnd()*H);if(rnd()>.4)slab(x,y,4+Math.floor(rnd()*14),3+Math.floor(rnd()*7),r.accent);}}
 if(['white-court','silver-court','pillared-hall','royal-hall','rohan-hall','forge-court'].includes(r.pattern)){for(let y=14;y<H;y+=31)for(let x=14;x<W;x+=56){if(rnd()<.94)slab(x+((y/31|0)%2)*15,y,50,25,r.pattern==='forge-court'?'#454c4b':r.pattern.includes('hall')?'#737c7c':'#a4aa9b');}ctx.strokeStyle=r.accent;ctx.lineWidth=3;ctx.strokeRect(66,44,W-132,H-88);ctx.lineWidth=1;ctx.strokeRect(72,49,W-144,H-98);for(const x of[211,954])for(const y of[240,480]){ctx.fillStyle=r.accent;ctx.globalAlpha=.30;ctx.fillRect(x-42,y-26,84,52);ctx.globalAlpha=1;ctx.strokeRect(x-38,y-23,76,46);}}
 if(['ancient-ring','iron-ring'].includes(r.pattern)){ctx.save();ctx.translate(W/2,H*.44);ctx.scale(1,.62);for(let n=0;n<3;n++){ctx.strokeStyle=n===1?r.accent:'#424c40';ctx.lineWidth=n===1?18:3;ctx.beginPath();ctx.arc(0,0,190+n*14,0,Math.PI*2);ctx.stroke();}ctx.restore();}
 if(r.pattern==='farm'){for(const [x,y,w,h]of[[90,90,270,160],[790,465,255,160],[740,80,220,125]]){street(x,y,w,h);for(let yy=y+5;yy<y+h;yy+=7){ctx.strokeStyle=(yy%14)?'#676b42':'#8c8c56';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x+3,yy);ctx.lineTo(x+w-3,yy+2);ctx.stroke();}}}
 if(['horse-path','barrow-road','valley'].includes(r.pattern)){ctx.strokeStyle=r.accent;ctx.globalAlpha=.28;for(let k=0;k<2;k++){ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(570+k*18,0);ctx.bezierCurveTo(490+k*18,220,670+k*18,430,520+k*18,H);ctx.stroke();}ctx.globalAlpha=1;}
 if(['old-forest','dark-forest','mallorn','garden','fen','withered'].includes(r.pattern)){const leaves=r.pattern==='mallorn'||r.pattern==='garden';for(let i=0;i<1100;i++){const x=(rnd()*W)|0,y=(rnd()*H)|0;ctx.globalAlpha=.24+rnd()*.24;ctx.fillStyle=leaves?['#c3b875','#9b9b61','#6a794c'][i%3]:['#667449','#889165','#394d3e'][i%3];ctx.fillRect(x,y,2+(rnd()*4|0),1+(rnd()*2|0));}ctx.globalAlpha=1;}
 if(['volcanic','iron-valley','tower-road'].includes(r.pattern)){for(let i=0;i<35;i++){const x=rnd()*W|0,y=rnd()*H|0;ctx.strokeStyle=i%4?'#323431':'#76523e';ctx.lineWidth=i%4?2:1;ctx.beginPath();ctx.moveTo(x,y);for(let j=0;j<7;j++)ctx.lineTo(x+j*5+(rnd()*10|0),y+j*3+(rnd()*8|0));ctx.stroke();}}
 // Sparse coherent detail, no high-contrast noise beneath figures.
 ctx.globalAlpha=.16;for(let i=0;i<450;i++){ctx.fillStyle=i%2?'#e5dfbb':'#131d18';ctx.fillRect(rnd()*W|0,rnd()*H|0,2+rnd()*3|0,1);}ctx.globalAlpha=1;
 ctx.fillStyle={0:'#727d4f',1:'#525f42',2:'#9a9f91',3:'#8a7960',4:'#494a45',5:'#596363',6:'#59634b',7:'#8a9187',8:'#8b8e59'}[r.material];ctx.globalAlpha=.18;ctx.fillRect(0,0,W,H);ctx.globalAlpha=1;
 return{key,pattern:r.pattern,material:r.material,width:W,height:H};}
function overlap(t,u,head=86,override){if(!t.active||t.surface==='bridge'||!t.type||t.type==='rubble')return false;const dims=override||SIZE[t.type]||[t.drawW,t.drawH],w=dims[0],h=dims[1];return u.y<t.y+10&&u.y>t.y-h-head*.25&&Math.abs(u.x-t.x)<w*.44+(u.radius||38)*.35;}
root.MESBGWorldArt={VERSION,SCALE,W,H,REGIONS,SIZE,LANDMARKS,LANDMARK_NAMES,depth,region,paintGround,overlap};if(typeof module!=='undefined'&&module.exports)module.exports=root.MESBGWorldArt;
})(typeof window!=='undefined'?window:globalThis);
