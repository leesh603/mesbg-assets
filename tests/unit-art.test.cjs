const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict'),test=require('node:test');
const source=fs.readFileSync('src/game.js','utf8');
const begin=source.indexOf('const UNIT_ART_PROFILES ='),end=source.indexOf('Ve.prototype.update = function (time)',begin);
const context={};vm.createContext(context);vm.runInContext(source.slice(begin,end)+';this.profiles=UNIT_ART_PROFILES;this.layout=unitArtLayout;this.apply=applyUnitArtSprite;',context);
const audit=JSON.parse(fs.readFileSync('docs/unit-art-audit.json','utf8'));
test('every production combat token has an explicit anatomical reference',()=>{
 const h=require('./campaign-harness.cjs')();const models=h.run(`Array.from(q.meta.values()).filter(m=>m.side!=='terrain'&&!m.id.startsWith('terr_')).map(m=>m.id)`);
 assert.equal(models.length,492);assert.equal(Object.keys(context.profiles).length,492);
 assert.deepEqual([...models].sort(),Object.keys(context.profiles).sort());assert.equal(audit.units.length,492);
});
test('all 492 anatomical spans render to their specified size, independent of radius and artScale',()=>{
 for(const a of audit.units){const p=context.profiles[a.id];assert(p[1]>=0&&p[2]>p[1]&&p[2]<=1);assert(p[3]>=0&&p[3]<=1&&p[4]>=0&&p[4]<=1);
  const src={width:a.sourceWidth,height:a.sourceHeight},u={id:a.id,radius:5,artScale:.1};const out=context.layout(u,src),other=context.layout({...u,radius:500,artScale:20},src);
  assert.deepEqual(out,other);assert(Math.abs(out.height*(p[2]-p[1])-a.worldReferenceSize)<.001,a.id);
  assert(Math.abs(out.width/out.height-src.width/src.height)<1e-8,a.id);assert.equal(out.originX,a.centerX);assert.equal(out.originY,a.centerY);
  assert.equal(a.worldReferenceSize,a.reference==='rider'?Math.round(audit.targets[a.bodyClass]*.56*100)/100:audit.targets[a.bodyClass]);
 }
});
test('banners, staves and spears have anatomical centers independent of their ornament envelopes',()=>{
 assert(context.profiles.dwarf_banner[2]-context.profiles.dwarf_banner[1]<.8);
 assert(context.profiles.gandalf[3]<.6);assert(context.profiles.orc_spear2[3]>.5);
 assert.equal(context.profiles.mt_spear[5],context.profiles.mt_swordshield[5]);
 assert(Math.abs(context.profiles.gandalf_mounted[5]-86*.56)<.001);assert(Math.abs(context.profiles.dain_boar[5]-67*.56)<.001);
});
test('lazy-loaded and transformed units anchor rotation and idle at the body, with no stale profile',()=>{
 const data=new Map(),sprite={scaleX:1,scaleY:1,visible:true,getData:k=>data.get(k),setData(k,v){data.set(k,v);return this;},setDisplaySize(w,h){this.width=w;this.height=h;this.scaleX=w/400;this.scaleY=h/500;return this;},setOrigin(x,y){this.originX=x;this.originY=y;return this;},setPosition(x,y){this.x=x;this.y=y;return this;},setVisible(v){this.visible=v;return this;}};
 let loaded=false;const scene={textures:{exists:()=>loaded,get:()=>({getSourceImage:()=>({width:400,height:500})})}};
 context.apply(scene,sprite,{id:'gandalf'});assert.equal(sprite.visible,false);assert.equal(data.has('bodyProfile'),false);
 loaded=true;context.apply(scene,sprite,{id:'gandalf'});assert.equal(sprite.visible,true);assert.equal(sprite.originX,context.profiles.gandalf[3]);assert.equal(sprite.x,0);assert.equal(sprite.y,0);
 context.apply(scene,sprite,{id:'gandalf_white_mounted'});assert.equal(data.get('bodyProfile'),'gandalf_white_mounted');assert.equal(sprite.originX,context.profiles.gandalf_white_mounted[3]);
 assert.equal(data.get('baseSX'),sprite.scaleX);assert.equal(data.get('cxy').x,0);assert.equal(data.get('cxy').y,0);
});
test('production creates neither permanent discs nor token rims and never scans alpha for scaling',()=>{
 assert(!source.includes("setName('base')"));assert(!source.includes('setName("rim")'));assert(!source.includes("load.image('basefile:"));
 assert(!source.includes('__figCenterPx'));assert(!source.includes('const p = this.add.ellipse(3, 6, H.radius'));
});
