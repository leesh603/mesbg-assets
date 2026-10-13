// Isolated browser review: pinned baseline, actual Phaser scene and real actions.
// Map previews explicitly select a test region; combat health and resources are
// never altered. No writes to live servers or rankings.
const fs=require('fs'),http=require('http'),path=require('path'),{execFileSync}=require('child_process'),{chromium}=require('playwright');
const sha=process.env.BASE_SHA||'a1a254cf6c3a1e0e91f6cc4a82208a62a6bf5ef3',out='review/terrain-20261013';fs.mkdirSync(out,{recursive:true});
const baseline=execFileSync('git',['show',sha+':index.html'],{maxBuffer:20e6}),cache=new Map(),mime={'.png':'image/png','.webp':'image/webp','.js':'text/javascript','.html':'text/html','.woff2':'font/woff2','.jpg':'image/jpeg','.json':'application/json','.mp3':'audio/mpeg'};
const server=http.createServer(async(req,res)=>{try{const url=new URL(req.url,'http://localhost'),base=url.pathname.startsWith('/baseline/');let name=decodeURIComponent(url.pathname).replace(/^\/baseline\//,'/').slice(1)||'index.html';if(name.includes('..')||req.method!=='GET'){res.writeHead(403);return res.end();}res.setHeader('Content-Type',mime[path.extname(name)]||'application/octet-stream');if(base&&name==='index.html')return res.end(baseline);if(fs.existsSync(name)&&fs.statSync(name).isFile())return fs.createReadStream(name).pipe(res);if(!cache.has(name))cache.set(name,fetch('https://raw.githubusercontent.com/leesh603/mesbg-assets/'+sha+'/'+name).then(async r=>({status:r.status,body:Buffer.from(await r.arrayBuffer())})));const a=await cache.get(name);res.writeHead(a.status);res.end(a.body);}catch(e){res.writeHead(502);res.end(String(e));}});
const report={base:sha,errors:[],failed:[],scenarios:[],views:[]};let browser;
async function boot(version,width=1280,height=900){const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});await ctx.route('**/*',route=>/workers\.dev/.test(route.request().url())||route.request().method()!=='GET'?route.abort():route.continue());await ctx.addInitScript(()=>{Element.prototype.requestFullscreen=async()=>{};});const page=await ctx.newPage();page.on('pageerror',e=>report.errors.push({version,error:e.message}));page.on('response',r=>{if(r.status()>=400)report.failed.push({url:r.url(),status:r.status()});});await page.goto('http://127.0.0.1:8139/'+(version==='before'?'baseline/':''),{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:120000});return{page,ctx};}
async function shot(page,name){await page.waitForTimeout(350);await page.screenshot({path:out+'/'+name+'.png'});report.views.push({name,...await page.evaluate(()=>({phase:MESBG.battle.phase,map:MESBG.constants.maps[MESBG.battle.mapIndex],progress:MESBG.battle.battlefield?.progress,overflow:document.documentElement.scrollWidth>innerWidth,objects:MESBG.scene._terrainObjects?.length,broken:[...document.images].filter(i=>i.offsetWidth&&i.complete&&!i.naturalWidth).map(i=>i.src)}))});}
async function selectMap(page,key,stage=1){await page.evaluate(({key,stage})=>{const b=MESBG.battle,c=MESBG.constants;b.start('hotseat');const info=b.stageInfo(stage);b.wave=stage-1;b._routeChoice={...info,map:c.maps.indexOf(key),mission:'annihilation',modifier:'clear'};b.prepareStage();MESBG.scene.sync();MESBG.render();MESBG.scene.overview();},{key,stage});await page.waitForTimeout(1200);}
async function snapshotState(page){return page.evaluate(()=>{const b=MESBG.battle;return{phase:b.phase,wave:b.wave,round:b.round,good:b.alive('good').length,evil:b.alive('evil').length,result:b.result,log:b.log?.slice(0,2)};});}
(async()=>{await new Promise(r=>server.listen(8139,'127.0.0.1',r));const cloudChrome=process.env.CHROMIUM_MODULE?require(process.env.CHROMIUM_MODULE).default:null;browser=await chromium.launch({headless:true,...(cloudChrome?{executablePath:await cloudChrome.executablePath(),args:cloudChrome.args}:process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});try{
 for(const version of(['play','probes'].includes(process.env.REVIEW_SCENES)?['after']:['before','after'])){
  const {page,ctx}=await boot(version);await shot(page,version+'-entry');
  for(const key of(['play','probes'].includes(process.env.REVIEW_SCENES)?[]:['osgiliath','fangorn','moria','black_gate'])){await selectMap(page,key,1);if(process.env.REVIEW_SCENES==='comparison')await page.evaluate(()=>MESBG.ui.setCamera(1165,750,.5));await shot(page,version+'-'+key+'-early');if(version==='after'){await selectMap(page,key,5);if(process.env.REVIEW_SCENES==='comparison')await page.evaluate(()=>MESBG.ui.setCamera(1165,750,.5));await shot(page,version+'-'+key+'-late');}}
  if(version==='after'&&process.env.REVIEW_SCENES!=='comparison'){
   for(const key of(['play','probes'].includes(process.env.REVIEW_SCENES)?[]:Object.keys(await page.evaluate(()=>MESBG.terrain.THEMES)))){await selectMap(page,key,3);await shot(page,'map-'+key);}
   // Seeded field fixtures only set starting positions, then use the real planner
   // and move action. They do not draw a fabricated path or fake the resulting unit.
   for(const kind of['deep-block','bridge-cross','shallow-cost','rock-detour','wall-block','tree-detour']){
    await selectMap(page,kind.includes('tree')?'mirkwood':kind.includes('shallow')?'fangorn':kind.includes('wall')?'black_gate':'osgiliath',1);
    const probe=await page.evaluate(kind=>{
     const b=MESBG.battle,T=MESBG.terrain,u=b.alive('good').find(u=>u.id==='aragorn')||b.alive('good')[0];
     const others=b.alive('good').filter(v=>v.uid!==u.uid);for(const [i,v]of others.entries()){v.x=250+i*115;v.y=1360;}
     let start,to;if(kind==='deep-block'){start={x:1100,y:640};to={x:1100,y:880};}
     if(kind==='bridge-cross'){const c=b.battlefield.bridges[0];start={x:c.x,y:c.y-135};to={x:c.x,y:c.y+120};}
     if(kind==='shallow-cost'){const c=b.battlefield.bridges.find(c=>c.ford);start={x:c.x,y:c.y-100};to={x:c.x,y:c.y+20};}
     if(kind==='rock-detour'||kind==='tree-detour'){const t=b.terrain.find(t=>t.type===(kind==='tree-detour'?'oak':'rock')&&t.y>600&&t.y<1200)||b.terrain.find(t=>t.type==='rock');start={x:t.x-110,y:t.y+75};to={x:t.x+110,y:t.y+75};}
     if(kind==='wall-block'){const t=b.terrain.find(t=>t.type==='darkwall');start={x:t.x,y:t.y+115};to={x:t.x,y:t.y};}
     Object.assign(u,start);b.phase='move';b.side='good';b.priority='good';b.selected=u.uid;b.activeMoverUid='';u.acted=false;u.movementSpent=0;b.events=[];
     // Add a real distant opponent to retain a valid battle while checking movement.
     b.spawn('orc_sword','evil',{x:2180,y:1300});
     const plan=MESBG.plan(u,to,b.alive(),b.terrain,b.remaining(u),{snap:false});
     MESBG.scene.preview=to;MESBG.scene.previewPlan=plan;MESBG.scene.sync();MESBG.render();MESBG.ui.setCamera((start.x+to.x)/2,(start.y+to.y)/2,.88);
     return{kind,uid:u.uid,start,to,budget:b.remaining(u),radius:u.radius,plan:plan?{path:plan.path,distance:plan.distance,travel:plan.travel}:null};
    },kind);
    if(probe.plan){await page.waitForTimeout(250);const target=await page.evaluate(p=>{const s=MESBG.ui.worldToScreen(p.to.x,p.to.y),r=document.querySelector('canvas').getBoundingClientRect();const u=MESBG.ui.state;return{x:r.left+s.x*r.width/u.width,y:r.top+s.y*r.height/u.height};},probe);await page.mouse.click(target.x,target.y);await page.locator('#intent-cancel').waitFor({state:'visible',timeout:3000});probe.uiPlan=await page.evaluate(()=>MESBG.ui.state.intent?.plan);}
    await shot(page,'probe-'+kind+'-preview');
    if(probe.plan){await page.locator('#dock-primary').click();await page.waitForTimeout(900);}
    const action=await page.evaluate(async p=>{const b=MESBG.battle;const actual=b.unit(p.uid);let moved=Math.hypot(actual.x-p.start.x,actual.y-p.start.y)>1;const u=b.unit(p.uid);return{moved,after:{x:u.x,y:u.y},spent:u.movementSpent,remaining:b.remaining(u),legal:MESBG.legal(u,u,b.alive(),b.terrain)};},probe);report.scenarios.push({...probe,...action});if(probe.plan&&Math.hypot(action.after.x-probe.to.x,action.after.y-probe.to.y)>1)throw Error(kind+' UI target mismatch');if(probe.uiPlan&&Math.abs(action.spent-probe.uiPlan.distance)>1)throw Error(kind+' preview/commit cost mismatch');if(['bridge-cross','shallow-cost','rock-detour','tree-detour'].includes(kind)&&!action.moved)throw Error(kind+' failed actual movement');if(!action.legal)throw Error(kind+' left an illegal position');if(['deep-block','wall-block'].includes(kind)&&action.moved)throw Error(kind+' crossed blocked ground');await shot(page,'probe-'+kind+'-result');
   }
   if(process.env.REVIEW_SCENES==='probes'){const previous=JSON.parse(fs.readFileSync(out+'/map-review.json','utf8'));report.play=previous.play;report.performance=previous.performance;}else{
   // Complete a fresh ordinary first battle through recruitment, deployment and
   // autoplay UI; no combat state overrides. Extra map fixtures above are labelled.
   await page.evaluate(()=>{MESBG.battle.start('hotseat');MESBG.scene.sync();MESBG.render();});
   await page.locator('#dock-primary').click();await page.locator('#auto-dock').click();
   for(let i=0;i<3;i++)await page.locator('#speed-dock').click();let previous='',changed=Date.now();const checkpoints=[];
   for(let i=0;i<120;i++){await page.waitForTimeout(1000);const s=await snapshotState(page);const k=JSON.stringify(s);if(k!==previous){previous=k;changed=Date.now();checkpoints.push(s);}fs.writeFileSync(out+'/browser-report.partial.json',JSON.stringify({...report,play:{checkpoints,final:s}},null,2));if(['reward','result'].includes(s.phase))break;if(Date.now()-changed>40000)break;}
   report.play={checkpoints,final:await snapshotState(page)};await shot(page,'actual-battle-result');
   report.performance=await page.evaluate(async()=>{const times=[];let last=performance.now();for(let i=0;i<60;i++){await new Promise(requestAnimationFrame);let t=performance.now();times.push(t-last);last=t;}return{frameMedianMs:times.sort((a,b)=>a-b)[30],p95:times[57],cachedLayers:MESBG.scene._terrainObjects?.length,heap:performance.memory?.usedJSHeapSize};});
   }
  }
  await ctx.close();
 }
 const {page,ctx}=await boot('after',390,844);await selectMap(page,'osgiliath',3);await shot(page,'mobile-osgiliath');await selectMap(page,'mirkwood',3);await shot(page,'mobile-forest');await ctx.close();
}catch(e){report.fatal=e.stack;process.exitCode=1;console.error(e.stack);}finally{fs.writeFileSync(out+(process.env.REVIEW_SCENES==='comparison'?'/comparison-report.json':'/browser-report.json'),JSON.stringify(report,null,2));await browser?.close();server.close();console.log(JSON.stringify({views:report.views.length,errors:report.errors,failed:report.failed.slice(0,6),probes:report.scenarios,play:report.play?.final,fatal:report.fatal},null,2));}})();
