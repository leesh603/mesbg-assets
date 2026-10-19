// Actual Phaser rendering; set BROWSER_EXECUTABLE when Chromium is external.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const dir='review/osgiliath-growth-20261019';fs.mkdirSync(dir,{recursive:true});
const report={errors:[],groups:[],mobile:[],weapons:[]};
const ids=JSON.parse(fs.readFileSync(dir+'/manifest.json')).units.map(d=>d.id);
const types={'.html':'text/html','.js':'text/javascript','.json':'application/json','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.css':'text/css','.woff2':'font/woff2','.mp3':'audio/mpeg'};
const server=http.createServer((req,res)=>{
 let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';
 const before=name.startsWith('before/');if(before)name=name.slice(7)||'index.html';
 if(name.includes('..')){res.writeHead(400);return res.end();}
 if(before&&name==='index.html')name='art-review/growth-before.html';
 if(before&&name.startsWith('assets/mesbg/tokens/')&&ids.includes(path.basename(name,'.png')))name='art-src/osgiliath-legs-20261019/before/'+path.basename(name);
 if(!fs.existsSync(name)||!fs.statSync(name).isFile()){res.writeHead(404);return res.end();}
 res.writeHead(200,{'Content-Type':types[path.extname(name)]||'application/octet-stream'});fs.createReadStream(name).pipe(res);
});
async function board(page,group,mobile=false){return page.evaluate(async({group,mobile})=>{
 const b=MESBG.battle,s=MESBG.scene; b.cleared=0; const missing=group.filter(id=>!s.textures.exists(id));
 if(missing.length)await new Promise(resolve=>{for(const id of missing)s.load.image(id,s.asset(b.meta.get(id).file));s.load.once('complete',resolve);s.load.start();});
 for(const c of s.tokens.values())c.destroy();s.tokens.clear();b.units=[];b.terrain=[];b.phase='preparation';b.selected='';b.activeMoverUid='';
 const cols=mobile?2:3;
 const units=group.map((id,i)=>b.spawn(id,b.meta.get(id).side,{x:1015+(i%cols)*150,y:510+Math.floor(i/cols)*180}));
 b.units=units;s.busy=true;s.sync();s.scale.resize(mobile?390:1500,mobile?844:1050);s.cameras.main.setViewport(0,0,mobile?390:1500,mobile?844:1050).setZoom(mobile?1:1.65).centerOn(mobile?1090:1165,mobile?690:600);s.busy=true;
 return units.map(u=>{const sp=s.tokens.get(u.uid).getByName('token'),im=s.textures.get(u.id).getSourceImage(),p=MESBG.unitArtProfiles[u.id];return{id:u.id,visible:sp.visible,source:[im.width,im.height],display:[sp.displayWidth,sp.displayHeight],origin:[sp.originX,sp.originY],reference:sp.getData('baseSY')*im.height*(p[2]-p[1]),expected:p[5],shootRange:u.stats.shootRange};});
 },{group,mobile});}
(async()=>{
 await new Promise(r=>server.listen(8147,'127.0.0.1',r));
 const browser=await chromium.launch({executablePath:process.env.BROWSER_EXECUTABLE||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu','--disable-software-rasterizer','--no-zygote']});
 try{
  for(const version of ['before','after']){
   const context=await browser.newContext({viewport:{width:1500,height:1050},deviceScaleFactor:1});
   await context.route('**/*',r=>r.request().url().startsWith('http://127.0.0.1:8147/')?r.continue():r.abort());
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push({version,message:e.message}));
   await page.goto('http://127.0.0.1:8147/'+(version==='before'?'before/':''),{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:120000});
   await page.evaluate(()=>{MESBG.battle.start('ai');for(const id of ['battle-notices','lwb-killfeed','active-tag']){const el=document.getElementById(id);if(el)el.style.display='none';}const game=document.getElementById('game');document.body.appendChild(game);for(const [k,v] of Object.entries({position:'fixed',left:'0',top:'0',width:'1500px',height:'1050px','max-width':'none','max-height':'none','z-index':'10000'}))game.style.setProperty(k,v,'important');MESBG.scene.scale.resize(1500,1050);});
   const groups=[ids];
   for(let i=0;i<groups.length;i++){
    const rows=await board(page,groups[i]);report.groups.push({version,index:i,units:rows});
    for(const u of rows){assert(u.visible,u.id);assert(Math.abs(u.reference-u.expected)<.1,u.id+' stature');}
    await page.waitForTimeout(200);await page.locator('#game').screenshot({path:dir+'/'+version+'-'+i+'.jpg',type:'jpeg',quality:90});
   }
   if(version==='after'){
    report.training=await page.evaluate(()=>{const b=MESBG.battle;b.cleared=24;const fresh=b.spawn('mt_swordshield','good',{x:1000,y:500}),veteran=b.spawn('mt_swordshield','good',{x:1200,y:500});veteran.xp=66;veteran.battlesParticipated=8;b.refreshUnit(veteran);return {fresh:{rank:b.troopTrainingRank(fresh),stats:fresh.stats,hp:fresh.currentWounds},veteran:{rank:b.troopTrainingRank(veteran),stats:veteran.stats,hp:veteran.currentWounds}};});assert.equal(report.training.fresh.rank,2);assert.equal(report.training.veteran.rank,3);assert.equal(report.training.veteran.stats.attacks,2);
    await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{const g=document.getElementById('game');g.style.setProperty('width','390px','important');g.style.setProperty('height','844px','important');MESBG.scene.scale.resize(390,844);});
    report.mobile=await board(page,ids,true);
    await page.waitForTimeout(300);await page.screenshot({path:dir+'/after-mobile.jpg',type:'jpeg',quality:90});
   }
   await context.close();
  }
  assert.deepEqual(report.errors,[]);
 }catch(e){report.fatal=e.stack;throw e;}finally{fs.writeFileSync(dir+'/browser-report.json',JSON.stringify(report,null,2)+'\n');await browser.close();server.close();}
 console.log('PASS: actual Phaser Osgiliath three-sprite leg correction, mobile, reinforcement and veteran stats');
})().catch(e=>{console.error(e);process.exitCode=1;});
