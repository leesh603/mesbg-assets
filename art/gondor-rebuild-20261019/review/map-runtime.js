// Review-only aliases: production IDs, profiles and save data are never changed.
(function installWorkshopArt(){
 if(!UX.ready||!Tt.sys.isActive()){setTimeout(installWorkshopArt,50);return;}
 const origin=window.__WORKSHOP_ORIGIN__,data=window.__WORKSHOP_DATA__;
 const previousAsset=Tt.asset.bind(Tt);
 Tt.asset=file=>file.startsWith('workshop:')?origin+'/'+file.slice(9):previousAsset(file);
 for(const r of data.units.filter(r=>r.status==='ready')){
  const old=q.meta.get(r.id);if(!old)continue;
  old._workshop=true;old.name_ko=r.name+' · 기존';
  const id='trial__'+r.id;
  q.meta.set(id,{...old,id,name_ko:r.name+' · 신규',file:'workshop:'+r.image,_workshop:true});
  UNIT_ART_PROFILES[id]=[r.rider?'human':r.stature<60?'hobbit':'human',r.top,r.bottom,r.centerX,r.centerY,r.stature,r.rider?'rider':'body'];
 }
})();
// Injected at the end of the game's source module in an isolated preview frame.
// All art, terrain, anatomical sizing and camera transforms are production code.
(function installGalleryPreview(){
 if(!UX.ready||!Tt.sys.isActive()){setTimeout(installGalleryPreview,50);return;}
 const scene=Tt, battle=q;const WORLD={width:pt.width,height:pt.height};
 battle.save=()=>{};battle.units=[];battle.devices=[];battle.relics={};battle.phase='preparation';battle.mission='annihilation';battle.selected='';battle.activeMoverUid='';scene.busy=true;
 document.getElementById('overlay')?.style.setProperty('display','none','important');scene.tweens.killAll();for(const c of scene.tokens.values())c.destroy();scene.tokens.clear();
 scene.drawRings=function(){this.rings.clear();this.labels.removeAll(true);this.underlay?.removeAll(true);this.actionRing?.clear();};
 const guides=scene.add.graphics().setDepth(20), names=scene.add.container(0,0).setDepth(21);
 let selected='',showNames=true,showReference=false,showBases=true,animate=false;
 const gameUpdate=scene.update.bind(scene);scene.update=function(time){if(animate)gameUpdate(time);};scene.sys.sceneUpdate=scene.update;
 function unit(){return battle.unit(selected);}
 function paint(){
  scene.sync();scene.busy=!animate;scene.objectiveLabel?.setVisible(false);guides.clear();names.removeAll(true);
  for(const u of battle.alive()){
   const c=scene.tokens.get(u.uid),sp=c?.getByName('token');if(!sp)continue;
   for(const child of c.list)if(!['token','base','base-shadow'].includes(child.name))child.setVisible(false);for(const key of ['base','base-shadow'])c.getByName(key)?.setVisible(showBases);
   const source=scene.textures.get(u.id).getSourceImage(),layout=unitArtLayout(u,source),r=UNIT_ART_PROFILES[u.id];
   if(!animate)sp.setScale(sp.getData('baseSX'),sp.getData('baseSY')).setPosition(0,0).setAngle(0).setFlipX(false).setOrigin(layout.originX,layout.originY);
   if(showReference&&r){const x=u.x-layout.width*layout.originX,y=u.y-layout.height*layout.originY;
    guides.lineStyle(1.5/UX.zoom,0x8be5e0,.95);guides.strokeRect(x+(r[8]??0)*layout.width,y+r[1]*layout.height,(r[7]==='width'?(r[9]-r[8]):1)*layout.width,(r[2]-r[1])*layout.height);
   }
   if(u.uid===selected){guides.lineStyle(2/UX.zoom,0xf4d581,1);guides.strokeCircle(u.x,u.y,8/UX.zoom);}
   if(showNames){const y=u.y+layout.height*(1-layout.originY)+10/UX.zoom;
    names.add(scene.add.text(u.x,y,u.name,{fontFamily:'Pretendard,sans-serif',fontSize:'12px',color:u.side==='good'?'#e1efd1':'#ffc5ba',backgroundColor:'#111b13dc',padding:{x:4,y:3}}).setOrigin(.5,0).setResolution(UX.dpr).setScale(1/UX.zoom));}
  }
 }
 function notify(){window.parent.postMessage({type:'mesbg-preview-change'},window.__WORKSHOP_ORIGIN__);}
 function center(){return cameraCenter();}
 function zoom(z){const c=center();setCamera(c.x,c.y,Math.max(.12,Math.min(1.65,z)),'manual');paint();notify();}
 function gameView(){setCamera(center().x,center().y,mobileLayout()?Math.max(.82,Math.min(1.05,UX.height/(pt.height*.5))):.95,'manual');paint();notify();}
 function maps(){return CX.maps.map((key,i)=>({key,name:CX.mapNames[i],index:MAP_PLAY_ORDER.indexOf(i)}));}
 function setMap(key,stage){const m=maps().find(m=>m.key===key);if(!m)throw Error('알 수 없는 맵');battle.mapIndex=m.index;battle.wave=stage-1;battle.battlefield=Terrain.build(key,stage);battle.terrain=battle.battlefield.terrain;scene._terrainStamp=null;paint();notify();}
 async function spawn(id,count=1){const m=battle.meta.get(id);if(!m||!['good','evil'].includes(m.side))throw Error('캐릭터를 찾을 수 없습니다.');
  if(!scene.textures.exists(id))await new Promise((resolve,reject)=>{
   const ok=()=>{scene.load.off('loaderror',fail);resolve();};const fail=f=>{if(f.key!==id)return;scene.load.off('filecomplete-image-'+id,ok);scene.load.off('loaderror',fail);reject(Error(m.name_ko+' 이미지 로딩 실패'));};
   scene.load.once('filecomplete-image-'+id,ok);scene.load.on('loaderror',fail);scene.load.image(id,scene.asset(m.file));scene.load.start();
  });
  const c=center();for(let i=0;i<count;i++){const u=battle.spawn(id,m.side,c);u.x=Math.max(80,Math.min(WORLD.width-80,c.x+(i-(count-1)/2)*160));u.y=Math.max(80,Math.min(WORLD.height-80,c.y));u.acted=false;u.angle=0;selected=u.uid;}
  paint();notify();
 }
 function lineup(){const list=battle.alive();if(!list.length)return;const c=center(),rowSize=Math.max(1,Math.min(6,list.length));
  list.forEach((u,i)=>{const src=scene.textures.get(u.id).getSourceImage(),l=unitArtLayout(u,src);u.x=400+(i%rowSize)*300;const feet=420+Math.floor(i/rowSize)*360;u.y=feet-l.height*(1-l.originY);});
  const rows=Math.ceil(list.length/rowSize),fit=Math.min(UX.zoom,(UX.width-60)/(rowSize*300),(UX.height-60)/(rows*360));setCamera(400+(rowSize-1)*150,Math.min(1050,500+Math.floor((list.length-1)/rowSize)*180),fit,'overview');paint();notify();
 }
 function remove(uid=selected){const c=scene.tokens.get(uid);c?.destroy();scene.tokens.delete(uid);battle.units=battle.units.filter(u=>u.uid!==uid);if(selected===uid)selected='';paint();notify();}
 const canvas=scene.game.canvas;let gesture=null;const points=new Map();
 const point=e=>{const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};};
 const world=p=>scene.cameras.main.getWorldPoint(p.x*UX.dpr,p.y*UX.dpr);
 const hit=p=>battle.alive().slice().reverse().find(u=>{const sp=scene.tokens.get(u.uid)?.getByName('token');if(!sp)return false;const r=sp.getBounds();return p.x>=r.x&&p.x<=r.right&&p.y>=r.y&&p.y<=r.bottom;});
 canvas.addEventListener('pointerdown',e=>{e.preventDefault();e.stopImmediatePropagation();const p=point(e);points.set(e.pointerId,p);canvas.setPointerCapture(e.pointerId);
  if(points.size===1){const w=world(p),u=hit(w);selected=u?.uid||'';gesture={p,c:center(),uid:u?.uid,dx:u?u.x-w.x:0,dy:u?u.y-w.y:0};paint();notify();}
  else if(points.size===2){const [a,b]=[...points.values()];gesture={pinch:true,d:Math.hypot(a.x-b.x,a.y-b.y),z:UX.zoom};}
 },true);
 canvas.addEventListener('pointermove',e=>{e.stopImmediatePropagation();if(!points.has(e.pointerId)||!gesture)return;e.preventDefault();const p=point(e);points.set(e.pointerId,p);
  if(gesture.pinch){if(points.size===2){const[a,b]=[...points.values()];zoom(gesture.z*Math.hypot(a.x-b.x,a.y-b.y)/Math.max(1,gesture.d));}return;}
  const u=battle.unit(gesture.uid);if(u){const w=world(p);u.x=Math.max(0,Math.min(WORLD.width,w.x+gesture.dx));u.y=Math.max(0,Math.min(WORLD.height,w.y+gesture.dy));}
  else setCamera(gesture.c.x-(p.x-gesture.p.x)/UX.zoom,gesture.c.y-(p.y-gesture.p.y)/UX.zoom,UX.zoom,'manual');paint();
 },true);
 for(const event of ['pointerup','pointercancel'])canvas.addEventListener(event,e=>{e.stopImmediatePropagation();points.delete(e.pointerId);gesture=null;notify();},true);
 canvas.addEventListener('wheel',e=>{e.preventDefault();e.stopImmediatePropagation();zoom(UX.zoom*Math.exp(-Math.max(-120,Math.min(120,e.deltaY))*.002));},{capture:true,passive:false});
 const ro=new ResizeObserver(()=>requestAnimationFrame(()=>{resizeBattle(true);paint();notify();}));ro.observe(document.getElementById('game'));
 window.GalleryPreview={
  maps:maps(),catalog:[...battle.meta.values()].filter(m=>m._workshop&&['good','evil'].includes(m.side)&&m.file).map(m=>({id:m.id,name:m.name_ko,english:m.name_en,side:m.side,faction:m.faction,role:m.role,file:m.file,class:UNIT_ART_PROFILES[m.id]?.[0]})),
  setMap,spawn,lineup,remove,zoom,gameView,select(uid){selected=uid;const u=unit();if(u)setCamera(u.x,u.y,UX.zoom,'manual');paint();notify();},
  clear(){for(const u of [...battle.units])remove(u.uid);},
  options(v){showNames=v.names;showReference=v.reference;showBases=v.bases;animate=v.animate;paint();},
  overview(){setCamera(WORLD.width/2,WORLD.height/2,Math.min(UX.width/WORLD.width,UX.height/WORLD.height)*.96,'overview');paint();notify();},
  snapshot(){return {zoom:UX.zoom,map:battle.battlefield.key,stage:battle.battlefield.stage,phase:battle.battlefield.phase,selected,units:battle.alive().map(u=>{const src=scene.textures.get(u.id).getSourceImage(),l=unitArtLayout(u,src);return{uid:u.uid,id:u.id,name:u.name,x:u.x,y:u.y,...l};})};},
  png(){scene.game.renderer.snapshot(image=>{const a=document.createElement('a');a.href=image.src;a.download='mesbg-map-size-preview.png';a.click();});}
 };
 setMap(CX.maps[0],1);setCamera(1165,690,1,'manual');paint();notify();
})();
