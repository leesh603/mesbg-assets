// Isolated Chromium QA: source is served over localhost; production is only an asset source.
// UI clicks advance runs. Scenario fixtures only define legal starting parties, never outcomes.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const out='reports/playtest-overhaul-20261015/browser';fs.mkdirSync(out,{recursive:true});
const baseSHA=process.env.BASE_SHA||'e804344617e860324a09ea9c33264fa201783ae0';
const base='https://raw.githubusercontent.com/leesh603/mesbg-assets/'+baseSHA+'/';
const cache=new Map(),report={baseline:baseSHA,errors:[],failedResources:[],views:[],campaign:[],missions:[],status:'running'};
async function asset(name){if(!cache.has(name))cache.set(name,fetch(base+name).then(async r=>({status:r.status,body:Buffer.from(await r.arrayBuffer())})));return cache.get(name);}
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2','.woff':'font/woff','.mp3':'audio/mpeg','.ogg':'audio/ogg','.wav':'audio/wav'};
const server=http.createServer(async(req,res)=>{try{
 if(req.method!=='GET'){res.writeHead(405);return res.end();}
 let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';
 if(name.includes('..'))throw Error('Invalid path');const baseline=name.startsWith('baseline/');if(baseline)name=name.slice(9)||'index.html';
 const file=path.resolve(name);res.setHeader('Content-Type',mime[path.extname(name)]||'application/octet-stream');
 if(!baseline&&fs.existsSync(file)&&fs.statSync(file).isFile())return fs.createReadStream(file).pipe(res);
 const remote=await asset(name);res.writeHead(remote.status);res.end(remote.body);
 }catch(e){res.writeHead(502);res.end(String(e));}});
const state=page=>page.evaluate(()=>{const b=window.MESBG?.battle;return b?{phase:b.phase,wave:b.wave,round:b.round,step:b.campStep,gold:b.gold,auto:MESBG.auto(),result:b.result,mission:b.mission,evacuated:b.retreatMission?.evacuated,offers:b.recruitOffers,units:b.alive('good').map(u=>({uid:u.uid,id:u.id,hp:u.currentWounds})),enemyCount:b.alive('evil').length}:null;});
async function click(page,selector){const node=page.locator(selector).first();if(await node.isVisible()&&await node.isEnabled()){await node.click({timeout:5000});return true;}return false;}
async function shot(page,name){await page.screenshot({path:out+'/'+name+'.png'});const view=await page.evaluate(()=>({width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,columns:document.querySelector('.recruit-cards')?getComputedStyle(document.querySelector('.recruit-cards')).gridTemplateColumns:null,broken:[...document.images].filter(i=>i.getBoundingClientRect().width&&i.complete&&!i.naturalWidth).map(i=>i.src)}));report.views.push({name,...view});return view;}
function persist(){fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));}
async function open(browser,width,height,version='after',fixture){
 const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
 await ctx.route('**/*',route=>route.request().method()==='GET'&&!/workers\.dev/.test(route.request().url())?route.continue():route.abort());
 await ctx.addInitScript(saved=>{Element.prototype.requestFullscreen=async()=>{};if(saved)localStorage.setItem('mesbg-endless-save',saved);},fixture?JSON.stringify(fixture):null);
 const page=await ctx.newPage();page.on('pageerror',e=>report.errors.push({version,width,error:e.message}));page.on('requestfailed',req=>{if(!/workers\.dev/.test(req.url()))report.failedResources.push({version,width,url:req.url(),error:req.failure()?.errorText});});
 await page.goto('http://127.0.0.1:8139/'+(version==='before'?'baseline/':''),{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:180000});return{page,ctx};
}
async function recruit(page){
 const options=await page.evaluate(()=>MESBG.battle.recruitOffers.map((o,i)=>({i,id:o.id})));
 // Catalog is not a test hook requirement: use the same card selection guarded by live UI.
 const heroes=await page.evaluate(()=>MESBG.battle.recruitOffers.map((o,i)=>({i,id:o.id,hero:!!document.querySelector('[data-draft="'+i+'"] .recruit-grade')?.textContent.includes('영웅')})));
 const hero=heroes.find(o=>o.hero);if(hero)await click(page,'[data-draft="'+hero.i+'"] .recruit-name');
 for(let round=0;round<6;round++)for(const offer of options){const plus=page.locator('[data-qty="'+offer.i+'"][data-delta="1"]');if(await plus.count()&&await plus.isVisible()&&await plus.isEnabled())await plus.click();}
 if(!await click(page,'#draft-confirm'))throw Error('Cannot confirm a legal recruitment');
}
async function auto(page){
 if(await click(page,'#settings-toggle')){
  for(const checkbox of await page.locator('#qa-auto-pause input').all())if(await checkbox.isVisible())await checkbox.uncheck();
  const speed=page.locator('#speed');if(await speed.isVisible())await speed.selectOption('30');
  await click(page,'#settings-toggle');
 }
 if(!(await state(page)).auto)await click(page,'#auto-dock');
}
async function campStep(page,s){
 if(s.step==='event'){if(!await click(page,'#ev-next')){for(const option of await page.locator('[data-evopt]').all())if(await option.isEnabled()){await option.click();break;}await click(page,'#camp-choice-confirm');}}
 else if(s.step==='recruit')await click(page,'#draft-confirm');
 else if(s.step==='relic'){await click(page,'[data-relic="pass"]');await click(page,'#camp-choice-confirm');await click(page,'#relic-next');}
 else if(s.step==='ready'){await click(page,'#promotion-defer');await click(page,'#leave-camp');}
}
async function manualMove(page){
 const aim=await page.evaluate(()=>{const b=MESBG.battle,u=b.unit(b.selected);if(b.phase!=='move'||!u||b.engaged(u))return null;
  for(const [dx,dy]of[[0,70],[70,0],[-70,0],[0,-70]]){const plan=MESBG.plan(u,{x:u.x+dx,y:u.y+dy},b.alive(),b.terrain,b.remaining(u));if(plan){const screen=MESBG.ui.worldToScreen(plan.to.x,plan.to.y);const rect=document.querySelector('canvas').getBoundingClientRect();screen.x+=rect.left;screen.y+=rect.top;if(screen.x>10&&screen.x<innerWidth-10&&screen.y>80&&screen.y<innerHeight-130)return {uid:u.uid,x:screen.x,y:screen.y,before:{x:u.x,y:u.y}};}}return null;});
 if(!aim){report.manual={status:'unverified',reason:'No on-screen legal manual move'};return;}
 await page.mouse.click(aim.x,aim.y);const preview=await page.locator('#intent-cancel').isVisible();if(!preview){report.manual={status:'failed',reason:'No action preview'};return;}
 await shot(page,'after-manual-preview');await click(page,'#intent-cancel');const unchanged=await page.evaluate(uid=>{const u=MESBG.battle.unit(uid);return{x:u.x,y:u.y};},aim.uid);
 await page.mouse.click(aim.x,aim.y);await click(page,'#dock-primary');await page.waitForTimeout(800);const moved=await page.evaluate(uid=>{const u=MESBG.battle.unit(uid);return{x:u.x,y:u.y};},aim.uid);
 report.manual={status:unchanged.x===aim.before.x&&unchanged.y===aim.before.y&&(moved.x!==aim.before.x||moved.y!==aim.before.y)?'passed':'failed',aim,unchanged,moved};
}
function fixture(full=true){const h=require('./campaign-harness.cjs')(),q=h.q;q.start('ai');q.initialDraft=false;q.units=[];q.wave=2;q.gold=600;
 const party=full?['aragorn',...Array(4).fill('mt_swordshield'),...Array(3).fill('mt_spearshield'),...Array(3).fill('gondor_archer'),...Array(2).fill('rohan_rider')]:['mt_swordshield'];
 for(const id of party){q.spawn(id,'good',{x:-1000,y:-1000});q.gold-=q.price(id);}q.linkedOperation={id:'anduin',active:true,startWave:2,step:1,bridge:0,report:'QA scenario · legally recruited party'};
 q._routeChoice={...q.stageInfo(3),mission:'osgiliath_retreat',map:h.CX.maps.indexOf('osgiliath'),modifier:'clear',ids:['orc_sword','orc_sword','orc_spear','orc_archer','warg_rider','moria_goblin'],linkedStep:1};q.prepareStage();return q._saveState();}
(async()=>{server.listen(8139,'127.0.0.1');let browser;
 try{browser=await chromium.launch({headless:true});
  for(const [width,height]of[[360,780],[390,844],[1365,900]])for(const version of ['before','after']){
   const {page,ctx}=await open(browser,width,height,version);await shot(page,version+'-'+width+'-menu');await click(page,'#start-ai');await page.waitForSelector('[data-draft]');const view=await shot(page,version+'-'+width+'-recruit');
   if(version==='after'){if(view.overflow)throw Error('Page overflow '+width);if(width<600&&view.columns?.split(' ').length!==2)throw Error('Mobile recruitment must use two columns');const gate=await page.evaluate(()=>MESBG.battle.recruitOffers.map(o=>MESBG.battle.recruitGateReason(o.id,true)));if(gate.some(Boolean))throw Error('Locked initial offer');}
   await ctx.close();persist();console.log('viewport',version,width,height);
  }
  {const {page,ctx}=await open(browser,390,844);await click(page,'#start-ai');await page.waitForSelector('[data-draft]');await recruit(page);await shot(page,'after-deployment');await click(page,'#dock-primary');await manualMove(page);await auto(page);
   const deadline=Date.now()+12*60000;let last='',savedResume=false,completed=0;
   while(Date.now()<deadline){await page.waitForTimeout(700);const s=await state(page);const key=[s.phase,s.step,s.wave,s.round,s.enemyCount].join(':');if(key!==last){last=key;report.campaign.push(s);persist();}
    if(s.phase==='result'){await shot(page,'after-campaign-result');break;}
    if(s.phase==='reward'){completed=Math.max(completed,s.wave);if(s.step==='event')await shot(page,'after-stage-'+s.wave+'-recap');if(s.wave>=5){report.fiveStages={status:'passed',completed};break;}await campStep(page,s);}
    else if(s.phase==='preparation'){if(!savedResume){const before=await page.evaluate(()=>({gold:MESBG.battle.gold,units:MESBG.battle.units.map(u=>({uid:u.uid,id:u.id,hp:u.currentWounds,x:u.x,y:u.y,points:u.entryPoints}))}));await page.reload();await page.waitForFunction(()=>MESBG.scene?.sys?.isActive());if(!await click(page,'#resume'))await click(page,'#continue-run');const after=await page.evaluate(()=>({gold:MESBG.battle.gold,units:MESBG.battle.units.map(u=>({uid:u.uid,id:u.id,hp:u.currentWounds,x:u.x,y:u.y,points:u.entryPoints}))}));report.resume={status:JSON.stringify(before)===JSON.stringify(after)?'passed':'failed',before,after};savedResume=true;}await click(page,'#dock-primary');await auto(page);}
    else if(!s.auto)await auto(page);
   }
   if(!report.fiveStages)report.fiveStages={status:'failed',completed,final:await state(page)};await ctx.close();
  }
  for(const full of [true,false]){const {page,ctx}=await open(browser,390,844,'after',fixture(full));if(!await click(page,'#resume'))await click(page,'#continue-run');await shot(page,'retreat-'+(full?'strong':'weak')+'-preparation');await click(page,'#dock-primary');await auto(page);const start=Date.now();let final;
   while(Date.now()-start<6*60000){await page.waitForTimeout(700);final=await state(page);if(['reward','result'].includes(final.phase))break;if(!final.auto)await auto(page);}
   report.missions.push({fixture:full?'mixed-party':'one-guard',status:full?(final.phase==='reward'?'passed':'failed'):(final.phase==='result'?'passed':'failed'),final});await shot(page,'retreat-'+(full?'success':'failure'));await ctx.close();persist();
  }
  report.status=report.errors.length||report.fiveStages?.status!=='passed'||report.missions.some(m=>m.status!=='passed')?'failed':'passed';
 }catch(error){report.status='failed';report.fatal=error.stack;console.error(error.stack);process.exitCode=1;}
 finally{persist();if(browser)await browser.close();server.close();}
})();
