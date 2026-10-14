const fs=require('fs'),http=require('http'),path=require('path'),assert=require('assert/strict');const {chromium}=require('playwright');
const catalog=JSON.parse(fs.readFileSync('docs/unit-art-audit.json')).units;
const report={errors:[],checked:0,directions:[],normalPlay:null};
const output='docs/unit-centering-proof';fs.mkdirSync(output,{recursive:true});
const mime={'.html':'text/html','.js':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.woff':'font/woff','.woff2':'font/woff2','.mp3':'audio/mpeg'};
const server=http.createServer((req,res)=>{const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';if(name.includes('..')||!fs.existsSync(name)||!fs.statSync(name).isFile()){res.writeHead(404);res.end();return;}res.setHeader('Content-Type',mime[path.extname(name)]||'application/octet-stream');res.end(fs.readFileSync(name));});server.listen(8146,'127.0.0.1');
(async()=>{let browser;try{
 browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
 const page=await browser.newPage({viewport:{width:1400,height:1000},deviceScaleFactor:1});page.on('pageerror',e=>report.errors.push(e.message));
 await page.route('**/*',r=>/workers\.dev/.test(r.request().url())?r.abort():r.continue());
 await page.addInitScript(()=>{Element.prototype.requestFullscreen=async()=>{};});
 await page.goto('http://127.0.0.1:8146/',{waitUntil:'domcontentloaded',timeout:60000});
 await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:180000});console.log('Boot ready');
 await page.locator('#start-ai').click();await page.waitForSelector('[data-draft]');
 const draft=page.locator('[data-draft] .recruit-name');await draft.first().click();await page.locator('#draft-confirm').click();
 await page.waitForFunction(()=>MESBG.battle.alive('good').every(u=>MESBG.scene.textures.exists(u.id)),null,{timeout:60000});
 await page.locator('#dock-primary').click();await page.locator('#auto-dock').click();for(let i=0;i<3;i++)await page.locator('#speed-dock').click();
 await page.waitForFunction(()=>MESBG.battle.round>=2||['reward','result'].includes(MESBG.battle.phase),null,{timeout:120000});
 await page.locator('#auto-dock').click();await page.waitForTimeout(1200);
 report.normalPlay=await page.evaluate(()=>({phase:MESBG.battle.phase,round:MESBG.battle.round,wave:MESBG.battle.wave}));console.log('Normal play',report.normalPlay);
 for(let i=0;i<catalog.length;i+=32){
  const rows=await page.evaluate(async entries=>{
   const b=MESBG.battle,s=MESBG.scene;await Promise.all(entries.map(async a=>{if(s.textures.exists(a.id))return;const img=new Image();img.src='assets/mesbg/'+a.file;await img.decode();s.textures.addImage(a.id,img);}));
   s.tweens.killAll();for(const c of s.tokens.values())c.destroy();s.tokens.clear();b.units=[];b.devices=[];b.phase='preparation';b.selected='';b.activeMoverUid='';
   for(const [j,a] of entries.entries()){const u=b.spawn(a.id,b.meta.get(a.id).side,{x:400+(j%8)*220,y:300+Math.floor(j/8)*200});u.acted=false;u.prone=false;u.angle=0;}
   s.busy=true;s.sync();s.busy=true;
   const rows=[];for(const dir of [-1,1]){for(const u of b.alive()){const sp=s.tokens.get(u.uid).getByName('token');sp.setData('faceDir',dir);sp.setFlipX(true);s.mvFaceToward(u.uid,u.x+dir*300);}
    s.update(performance.now());
    for(const u of b.alive()){const c=s.tokens.get(u.uid),sp=c.getByName('token'),base=c.getByName('base'),p=MESBG.unitArtProfiles[u.id],im=s.textures.get(u.id).getSourceImage();rows.push({id:u.id,dir,flipX:sp.flipX,originX:sp.originX,originY:sp.originY,x:sp.x,y:sp.y,referenceHeight:sp.getData('baseSY')*im.height*(p[2]-p[1]),expected:p[5],baseX:base?.x,baseY:base?.y});}
   }return rows;
  },catalog.slice(i,i+32));
  for(const r of rows){const a=catalog.find(a=>a.id===r.id);assert.equal(r.flipX,false,r.id);assert.equal(r.originX,a.centerX,r.id);assert.equal(r.originY,a.centerY,r.id);assert.equal(r.baseX,0,r.id);assert.equal(r.baseY,0,r.id);assert(Math.abs(r.referenceHeight-r.expected)<.001,r.id);}
  report.checked+=rows.length/2;if(i%128===0)console.log('Checked',report.checked);
 }
 async function board(ids){return page.evaluate(async ids=>{
  const b=MESBG.battle,s=MESBG.scene;for(const c of s.tokens.values())c.destroy();s.tokens.clear();b.units=[];b.phase='preparation';b.selected='';b.activeMoverUid='';
  for(const [j,id] of ids.entries()){const u=b.spawn(id,b.meta.get(id).side,{x:750+(j%2)*240,y:400+Math.floor(j/2)*260});u.acted=false;u.prone=false;}
  b.side='good';b.selected=b.units[0].uid;b.activeMoverUid=b.units[0].uid;MESBG.render();s.busy=true;s.sync();s.cameras.main.setZoom(.9).centerOn(1110,665);s.busy=true;
  for(const id of ['battle-notices','lwb-killfeed','active-tag'])document.getElementById(id)?.style.setProperty('display','none');
  return b.alive().map(u=>({id:u.id,x:u.x,y:u.y,originX:s.tokens.get(u.uid).getByName('token').originX,originY:s.tokens.get(u.uid).getByName('token').originY}));
 },ids)}
 // Walk the same model both ways through the actual production glide adapter.
 await board(['aragorn_mounted','elrond_mounted']);
 report.directions=await page.evaluate(async()=>{const s=MESBG.scene,b=MESBG.battle,u=b.alive()[0],out=[];
  for(const dir of [-1,1]){const from={x:u.x,y:u.y},to={x:u.x+dir*120,y:u.y};u.x=to.x;u.y=to.y;
   await s.play({type:'UnitMoved',uid:u.uid,from,to,path:[from,to]});s.update(performance.now());const c=s.tokens.get(u.uid),sp=c.getByName('token');out.push({dir,flipX:sp.flipX,originX:sp.originX,originY:sp.originY,x:c.x,y:c.y,to});}
  return out;});
 for(const r of report.directions){assert.equal(r.flipX,false);assert.equal(r.x,r.to.x);assert.equal(r.y,r.to.y);}
 await page.mouse.move(0,0);
 await board(['gandalf','gondor_archer','elf_bow','dwarf_banner']);await page.evaluate(()=>MESBG.scene.cameras.main.setZoom(.78).centerOn(875,530));await page.waitForTimeout(300);await page.locator('#game').screenshot({path:output+'/foot-centres.png'});
 await board(['aragorn_mounted','elrond_mounted','witchking_mounted','fingolfin_mounted']);await page.evaluate(()=>MESBG.scene.cameras.main.setZoom(.70).centerOn(875,530));await page.waitForTimeout(300);await page.locator('#game').screenshot({path:output+'/cavalry-centres.png'});
 await board(['witchking_fellbeast','gulavhar','mumakil','great_eagle']);await page.evaluate(()=>MESBG.scene.cameras.main.setZoom(.38).centerOn(880,550));await page.waitForTimeout(300);await page.locator('#game').screenshot({path:output+'/creature-centres.png'});
 await page.setViewportSize({width:390,height:844});await board(['gandalf','gondor_archer','aragorn_mounted','elrond_mounted']);await page.evaluate(()=>MESBG.scene.cameras.main.setZoom(.64).centerOn(875,530));await page.waitForTimeout(300);await page.screenshot({path:output+'/mobile-centres.png'});
 assert.equal(report.errors.length,0,report.errors.join('\n'));console.log('PASS',report.checked,'units, 984 direction checks, no browser errors');
 }catch(e){report.fatal=e.stack;console.error(e);process.exitCode=1;}finally{fs.writeFileSync(output+'/browser-report.json',JSON.stringify(report,null,2));await browser?.close();server.close();}})();
