const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),{execFile}=require('node:child_process');
const {chromium}=require('playwright');
const catalog=JSON.parse(fs.readFileSync('docs/unit-art-audit.json','utf8')).units;
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2','.woff':'font/woff','.mp3':'audio/mpeg'};
const cache=new Map();
function gitFile(name){if(cache.has(name))return cache.get(name);const promise=new Promise(resolve=>execFile('git',['show','HEAD:'+name],{maxBuffer:30*1024*1024,encoding:'buffer'},(e,body)=>{if(e)return resolve(null);const p=path.resolve(name);fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,body);resolve(Buffer.from(body));}));cache.set(name,promise);return promise;}
const server=http.createServer(async(req,res)=>{try{
 if(req.method!=='GET'){res.writeHead(405);return res.end();}
 let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';const baseline=name.startsWith('baseline/');if(baseline)name=name.slice(9)||'index.html';
 if(name.includes('..')){res.writeHead(400);return res.end();}let body;
 if(name==='index.html')body=fs.readFileSync(baseline?'review-output/baseline.html':'index.html');
 else if(name.startsWith('assets/mesbg/tokens/')&&fs.existsSync('review-output/assets/'+path.basename(name)))body=fs.readFileSync('review-output/assets/'+path.basename(name));
 else if(fs.existsSync(name)&&fs.statSync(name).isFile())body=fs.readFileSync(name);
 else body=await gitFile(name);
 if(!body){res.writeHead(404);return res.end();}res.writeHead(200,{'Content-Type':mime[path.extname(name)]||'application/octet-stream'});res.end(body);
 }catch(e){res.writeHead(500);res.end(String(e));}});
const report={errors:[],failedRequests:[],samples:[],unitsChecked:0,versions:[],normalPlay:null};
async function shot(page,name){fs.mkdirSync('docs/unit-art-proof',{recursive:true});await ((/size-lineup|body-classes|rider-reference/.test(name))?page.locator('#game'):page).screenshot({path:'docs/unit-art-proof/'+name+'.png'});}
async function board(page,ids){return page.evaluate(async ids=>{
 const b=MESBG.battle,s=MESBG.scene;
 const missing=ids.filter(id=>!s.textures.exists(id));
 if(missing.length)await new Promise(resolve=>{for(const id of missing)s.load.image(id,s.asset(b.meta.get(id).file));s.load.once('complete',resolve);s.load.start();});
 for(const c of s.tokens.values())c.destroy();s.tokens.clear();b.units=[];b.terrain=[];b.phase='preparation';b.selected='';b.activeMoverUid='';
 const sample=ids.map((id,i)=>{const u=b.spawn(id,b.meta.get(id).side,{x:0,y:0});u.x=1060+(i%2)*206;u.y=460+Math.floor(i/2)*225;u.angle=0;u.acted=false;u.prone=false;return u;});
 b.units=sample;s.busy=true;s.sync();s.cameras.main.setZoom(.82).centerOn(1165,685);s.busy=true;
 return sample.map(u=>{const c=s.tokens.get(u.uid),sp=c.getByName('token');return{id:u.id,uid:u.uid,radius:u.radius,width:sp.displayWidth,height:sp.displayHeight,baseWidth:sp.getData('baseSX')*s.textures.get(u.id).getSourceImage().width,baseHeight:sp.getData('baseSY')*s.textures.get(u.id).getSourceImage().height,originX:sp.originX,originY:sp.originY,bases:c.list.filter(x=>['base','rim'].includes(x.name)).map(x=>x.name),alpha:sp.alpha,visible:sp.visible};});
 },ids);}
(async()=>{server.listen(8146,'127.0.0.1');const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--disable-software-rasterizer','--no-zygote']});
 try{
 const selected=['mt_swordshield','mt_spear','warrior_minas_tirith','gondor_archer','arnor_warrior','dwarf_banner','gandalf','boromir',
 'frodo','samwise','pippin_citadel','gimli','dwarf_axeshield','beorn','uruk_pike','sauron',
 'boromir_mounted','gandalf_white_mounted','imrahil_mounted','rohan_rider','dain_boar','azog','cave_troll','great_eagle'];
 for(const version of ['before','after']){
  const context=await browser.newContext({viewport:{width:1500,height:1050},deviceScaleFactor:1});await context.route('**/*',r=>r.request().method()==='GET'&&!/workers\.dev/.test(r.request().url())?r.continue():r.abort());
  await context.addInitScript(()=>{Element.prototype.requestFullscreen=async()=>{};});const page=await context.newPage();page.on('pageerror',e=>report.errors.push({version,message:e.message}));page.on('requestfailed',r=>report.failedRequests.push({version,url:r.url(),error:r.failure()?.errorText}));
  await page.goto('http://127.0.0.1:8146/'+(version==='before'?'baseline/':''),{waitUntil:'domcontentloaded',timeout:60000});await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:180000});
  await page.locator('#start-ai').click();await page.waitForSelector('[data-draft]');for(let i=0;i<4;i++){const l=page.locator('[data-draft="'+i+'"] .recruit-name');if(await l.isVisible())await l.click();}await page.locator('#draft-confirm').click();await page.waitForFunction(()=>{const s=MESBG.scene;return MESBG.battle.alive('good').every(u=>s.textures.exists(u.id));},null,{timeout:60000});await page.waitForTimeout(300);
  await shot(page,version+'-normal-deployment');
  if(version==='after'){
   const prior=await page.evaluate(()=>MESBG.battle.alive().map(u=>({uid:u.uid,x:u.x,y:u.y})));await page.locator('#dock-primary').click();await page.locator('#auto-dock').click();for(let k=0;k<3;k++)await page.locator('#speed-dock').click();await page.waitForTimeout(8000);
   await shot(page,'after-normal-combat');await page.locator('#auto-dock').click();await page.waitForTimeout(1800);report.normalPlay=await page.evaluate(prior=>({phase:MESBG.battle.phase,round:MESBG.battle.round,wave:MESBG.battle.wave,log:MESBG.battle.log.slice(0,6),moved:MESBG.battle.units.filter(u=>prior.some(v=>v.uid===u.uid&&Math.hypot(v.x-u.x,v.y-u.y)>5)).length}),prior);
  }

  await page.evaluate(()=>{for(const id of ['battle-notices','lwb-killfeed','active-tag']){const e=document.getElementById(id);if(e)e.style.display='none';}});
  const samples=await board(page,['mt_swordshield','mt_spear','warrior_minas_tirith','gondor_archer','gandalf','boromir']);report.samples.push({version,units:samples});await page.waitForTimeout(300);await shot(page,version+'-size-lineup');
  await board(page,['frodo','gimli','warrior_minas_tirith','beorn','cave_troll','sauron']);await page.waitForTimeout(600);await shot(page,version+'-body-classes');
  await board(page,['boromir','boromir_mounted','gandalf','gandalf_white_mounted','gimli','dain_boar']);await page.waitForTimeout(600);await shot(page,version+'-rider-reference');
  if(version==='after'){
   for(let i=0;i<(process.env.QUICK_QA?0:catalog.length);i+=32){const ids=catalog.slice(i,i+32).map(x=>x.id),rows=await board(page,ids);for(const r of rows){const meta=await page.evaluate(id=>({p:MESBG.unitArtProfiles[id],m:MESBG.battle.meta.get(id)}),r.id);if(r.bases.length)throw Error('Base still present: '+r.id);if(!r.visible||!Number.isFinite(r.width)||r.width<=0)throw Error('Missing art: '+r.id);if(Math.abs((meta.p[7]==='width'?r.baseWidth*(meta.p[9]-meta.p[8]):r.baseHeight*(meta.p[2]-meta.p[1]))-meta.p[5])>.01)throw Error('Wrong anatomical height: '+r.id);if(Math.abs(r.originX-meta.p[3])>.001||Math.abs(r.originY-meta.p[4])>.001)throw Error('Wrong body center: '+r.id);report.unitsChecked++;}
    fs.writeFileSync('review-output/browser-report.json',JSON.stringify(report,null,2));
   }
   await board(page,['mt_swordshield','mt_spear','warrior_minas_tirith','gondor_archer','gandalf','boromir']);await page.waitForTimeout(600);await shot(page,'after-size-lineup');
   await page.evaluate(()=>{const el=document.getElementById('game');for(const k of ['position','left','top','width','height','zIndex'])el.style[k]='';});await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{const s=MESBG.scene;s.busy=false;s.cameras.main.setZoom(.9).centerOn(1165,685);});await page.waitForTimeout(500);await shot(page,'after-mobile-lineup');
  }
  report.versions.push(version);await context.close();
 }
 }catch(e){report.fatal=e.stack;console.error(e.stack);process.exitCode=1;}finally{fs.writeFileSync('review-output/browser-report.json',JSON.stringify(report,null,2));await browser.close();server.close();}
})();

