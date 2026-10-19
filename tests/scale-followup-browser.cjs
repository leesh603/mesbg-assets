// Real Phaser rendering at the same camera zoom, with approved references in every group.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const dir='review/scale-followup-20261019',input=dir;
fs.mkdirSync(dir,{recursive:true});
const targets=JSON.parse(fs.readFileSync(input+'/manifest.json')).units.map(u=>u.id);
const version=process.env.ART_REVIEW_PHASE||'after',report={version,errors:[],groups:[],mobile:[]};
const mime={'.html':'text/html','.js':'text/javascript','.json':'application/json','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.css':'text/css','.woff2':'font/woff2','.mp3':'audio/mpeg'};
const server=http.createServer((req,res)=>{let p=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';
 if(p.includes('..')){res.writeHead(400);return res.end();}
 if(version==='before'&&p==='index.html')p='review/roster-unify-20261019/before-index.html';
 if(version==='before'&&p.startsWith('assets/mesbg/tokens/')&&targets.includes(path.basename(p,'.png')))p='art-src/roster-unify-20261019/before/'+path.basename(p);
 if(!fs.existsSync(p)||!fs.statSync(p).isFile()){res.writeHead(404);return res.end();}
 res.writeHead(200,{'Content-Type':mime[path.extname(p)]||'application/octet-stream'});fs.createReadStream(p).pipe(res);
});
async function board(page,ids,mobile=false){return page.evaluate(async({ids,mobile})=>{const b=MESBG.battle,s=MESBG.scene,missing=ids.filter(id=>!s.textures.exists(id));
 if(missing.length)await new Promise(resolve=>{for(const id of missing)s.load.image(id,s.asset(b.meta.get(id).file));s.load.once('complete',resolve);s.load.start();});
 for(const c of s.tokens.values())c.destroy();s.tokens.clear();b.units=[];b.terrain=[];b.cleared=0;b.phase='preparation';b.selected='';b.activeMoverUid='';
 const cols=mobile?2:4,units=ids.map((id,i)=>b.spawn(id,b.meta.get(id).side,{x:990+(i%cols)*150,y:500+Math.floor(i/cols)*200}));b.units=units;s.busy=true;s.sync();
 const w=mobile?390:1320,h=mobile?844:950;s.scale.resize(w,h);s.cameras.main.setViewport(0,0,w,h).setZoom(mobile?1:1.6).centerOn(mobile?1065:1215,mobile?600:600);
 return units.map(u=>{const sp=s.tokens.get(u.uid).getByName('token'),im=s.textures.get(u.id).getSourceImage(),p=MESBG.unitArtProfiles[u.id];return{id:u.id,visible:sp.visible,source:[im.width,im.height],display:[sp.displayWidth,sp.displayHeight],origin:[sp.originX,sp.originY],reference:sp.getData('baseSY')*im.height*(p[2]-p[1]),expected:p[5]};});
 },{ids,mobile});}
(async()=>{await new Promise(r=>server.listen(8149,'127.0.0.1',r));const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--disable-software-rasterizer','--no-zygote']});
 try{const context=await browser.newContext({viewport:{width:1320,height:950},deviceScaleFactor:1});await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8149/')?r.continue():r.abort());
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));await page.goto('http://127.0.0.1:8149/',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:120000});
 await page.evaluate(()=>{MESBG.battle.start('ai');for(const id of ['battle-notices','lwb-killfeed','active-tag']){const el=document.getElementById(id);if(el)el.style.display='none';}const g=document.getElementById('game');document.body.appendChild(g);for(const[k,v]of Object.entries({position:'fixed',left:'0',top:'0',width:'1320px',height:'950px','max-width':'none','max-height':'none','z-index':'10000'}))g.style.setProperty(k,v,'important');});
 await page.waitForTimeout(800);
 for(let i=0;i<targets.length;i+=6){const ids=['glorfindel_foot','glorfindel_mounted',...targets.slice(i,i+6)],rows=await board(page,ids);report.groups.push({index:i/6,units:rows});for(const u of rows){assert(u.visible,u.id);assert(Math.abs(u.reference-u.expected)<.1,u.id+' anatomy');}await page.waitForTimeout(150);await page.locator('#game').screenshot({path:dir+'/'+version+'-'+i/6+'.jpg',type:'jpeg',quality:86});}
 await board(page,['glorfindel_foot','imrahil','feanor','fingolfin','glorfindel_mounted','imrahil_mounted','theoden','fingolfin_mounted']);await page.waitForTimeout(150);await page.locator('#game').screenshot({path:dir+'/focus.jpg',type:'jpeg',quality:92});
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{const g=document.getElementById('game');g.style.setProperty('width','390px','important');g.style.setProperty('height','844px','important');});
 report.mobile=await board(page,['glorfindel_foot','imrahil','glorfindel_mounted','theoden'],true);await page.waitForTimeout(150);await page.screenshot({path:dir+'/'+version+'-mobile.jpg',type:'jpeg',quality:90});assert.deepEqual(report.errors,[]);
await context.close();
 }catch(e){report.fatal=e.stack;throw e;}finally{fs.writeFileSync(dir+'/'+version+'-browser.json',JSON.stringify(report,null,2)+'\n');await browser.close();server.close();}
 console.log('PASS: '+version+' real Phaser '+targets.length+' sprites, approved references, desktop and mobile');
})().catch(e=>{console.error(e);process.exitCode=1;});
