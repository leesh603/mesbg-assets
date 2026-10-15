// Isolated Chromium QA: source is served over localhost; production is only an asset source.
// UI clicks advance runs. Scenario fixtures only define legal starting parties, never outcomes.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const out='reports/playtest-overhaul-20261015/browser';fs.mkdirSync(out,{recursive:true});
const baseSHA=process.env.BASE_SHA||'e804344617e860324a09ea9c33264fa201783ae0';
const base='https://raw.githubusercontent.com/leesh603/mesbg-assets/'+baseSHA+'/';
const cache=new Map(),report={baseline:baseSHA,errors:[],consoleErrors:[],failedResources:[],views:[],campaign:[],missions:[],status:'running'};
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
const state=page=>page.evaluate(()=>{const b=window.MESBG?.battle;return b?{phase:b.phase,wave:b.wave,round:b.round,step:b.campStep,gold:b.gold,auto:MESBG.auto(),result:b.result,operation:b.linkedOperation,current:b.current?.linkedStep,mission:b.mission,evacuated:b.retreatMission?.evacuated,early:b.retreatMission?.early,offers:b.recruitOffers,units:b.alive('good').map(u=>({uid:u.uid,id:u.id,hp:u.currentWounds})),enemyCount:b.alive('evil').length}:null;});
async function click(page,selector){await page.waitForFunction(()=>!document.querySelector('#boss-intro,#stage-intro,#arc-transition,#dragon-cine'),null,{timeout:30000});const node=page.locator(selector).first();if(await node.isVisible()&&await node.isEnabled()){await node.click({timeout:15000});return true;}return false;}
async function shot(page,name){await page.screenshot({path:out+'/'+name+'.png'});const view=await page.evaluate(()=>({performance:{sceneReadyMs:performance.getEntriesByName('qa-scene-ready')[0]?.startTime,bootMs:performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd,heapBytes:performance.memory?.usedJSHeapSize,fps:MESBG.scene?.game?.loop?.actualFps},width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,columns:document.querySelector('.recruit-cards')?getComputedStyle(document.querySelector('.recruit-cards')).gridTemplateColumns:null,broken:[...document.images].filter(i=>i.getBoundingClientRect().width&&i.complete&&!i.naturalWidth).map(i=>i.src)}));report.views.push({name,...view});return view;}
function persist(){fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));}
async function open(browser,width,height,version='after',fixture){
 const ctx=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
 await ctx.route('**/*',route=>route.request().method()==='GET'&&!/workers\.dev/.test(route.request().url())?route.continue():route.abort());
 await ctx.addInitScript(saved=>{Element.prototype.requestFullscreen=async()=>{};if(saved)localStorage.setItem('mesbg-endless-save',saved);},fixture?JSON.stringify(fixture):null);
 const page=await ctx.newPage();page.on('pageerror',e=>report.errors.push({version,width,error:e.message}));page.on('console',m=>{if(m.type()==='error'&&!/workers\.dev/.test(m.location()?.url||''))report.consoleErrors.push({version,width,text:m.text()});});page.on('response',response=>{if(response.status()>=400&&!/workers\.dev/.test(response.url()))report.failedResources.push({version,width,url:response.url(),status:response.status()});});page.on('requestfailed',req=>{if(!/workers\.dev/.test(req.url()))report.failedResources.push({version,width,url:req.url(),error:req.failure()?.errorText});});
 await page.goto('http://127.0.0.1:8139/'+(version==='before'?'baseline/':''),{waitUntil:'domcontentloaded'});
 await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:180000});await page.evaluate(()=>performance.mark('qa-scene-ready'));return{page,ctx};
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
 else if(s.step==='recruit'){for(let round=0;round<4;round++){const counts=await page.evaluate(()=>({current:MESBG.battle.permanent().length,drafted:MESBG.battle.draftTotals().count,gold:MESBG.battle.gold,cost:MESBG.battle.draftTotals().gold}));if(counts.current+counts.drafted>=14||counts.gold-counts.cost<70)break;for(const plus of await page.locator('[data-qty][data-delta="1"]').all())if(await plus.isEnabled())await plus.click();}await click(page,'#draft-confirm');}
 else if(s.step==='relic'){const choice=page.locator('[data-relic]:not([data-relic="pass"])').first();if(await choice.isVisible()&&await choice.isEnabled()){const id=await choice.getAttribute('data-relic');await choice.click();(report.relicSelections=report.relicSelections||[]).push({wave:s.wave,id});}else await click(page,'[data-relic="pass"]');await click(page,'#camp-choice-confirm');await click(page,'#relic-next');}
 else if(s.step==='ready'){for(let n=0;n<2;n++){const choice=page.locator('[data-promote]:not([disabled])').first();if(await choice.isVisible()){const id=await choice.getAttribute('data-promote');await choice.click();(report.promotions=report.promotions||[]).push({wave:s.wave,to:id});}else break;}await click(page,'#promotion-defer');if(s.wave===1&&await click(page,'#anduin-operation'))report.operationEntry={status:'passed',wave:s.wave};await click(page,'#leave-camp');}
}
async function manualMove(page){
 await page.waitForFunction(()=>{const b=MESBG.battle,u=b.unit(MESBG.ui.active());return b.phase==='move'&&b.side==='good'&&u&&b.canAct(u)&&!b.engaged(u)&&!document.querySelector('#dock-primary').disabled&&document.querySelector('#overlay').classList.contains('hidden')&&!document.querySelector('#stage-intro');},null,{timeout:90000}).catch(()=>{});
 const aim=await page.evaluate(()=>{const b=MESBG.battle,u=b.unit(MESBG.ui.active());if(b.phase!=='move'||b.side!=='good'||!u||!b.canAct(u)||b.engaged(u))return null;
  const canvas=MESBG.scene.game.canvas,rect=canvas.getBoundingClientRect();
  for(const distance of [170,240,120])for(let i=0;i<16;i++){const a=i*Math.PI/8,plan=MESBG.plan(u,{x:u.x+Math.cos(a)*distance,y:u.y+Math.sin(a)*distance},b.alive(),b.terrain,b.remaining(u));if(!plan||MESBG.scene.hit(plan.to))continue;
   const screen=MESBG.ui.worldToScreen(plan.to.x,plan.to.y);screen.x=rect.left+screen.x*rect.width/MESBG.ui.state.width;screen.y=rect.top+screen.y*rect.height/MESBG.ui.state.height;
   if(document.elementFromPoint(screen.x,screen.y)===canvas&&screen.x>rect.left+16&&screen.x<rect.right-16&&screen.y>rect.top+70&&screen.y<rect.bottom-90)return {uid:u.uid,x:screen.x,y:screen.y,to:plan.to,before:{x:u.x,y:u.y},canvas:{x:rect.x,y:rect.y,width:rect.width,height:rect.height},ui:{width:MESBG.ui.state.width,height:MESBG.ui.state.height}};
  }return null;});
 if(!aim){report.manual={status:'unverified',reason:'No on-screen legal background destination'};return;}
 await page.mouse.click(aim.x,aim.y);const preview=await page.locator('#intent-cancel').isVisible();if(!preview){report.manual={status:'failed',reason:'No action preview',aim,dom:await page.locator('body').innerText()};await shot(page,'manual-preview-failed');return;}
 if(!await page.locator('#qa-forecast').isVisible())throw Error('Shared action forecast is hidden');await shot(page,'after-manual-preview');await click(page,'#intent-cancel');const unchanged=await page.evaluate(uid=>{const u=MESBG.battle.unit(uid);return{x:u.x,y:u.y};},aim.uid);
 await page.mouse.click(aim.x,aim.y);await click(page,'#dock-primary');await page.waitForTimeout(800);const moved=await page.evaluate(uid=>{const u=MESBG.battle.unit(uid);return{x:u.x,y:u.y};},aim.uid);
 report.manual={status:unchanged.x===aim.before.x&&unchanged.y===aim.before.y&&(moved.x!==aim.before.x||moved.y!==aim.before.y)?'passed':'failed',aim,unchanged,moved};
}
function fixture(full=true){const h=require('./campaign-harness.cjs')(),q=h.q;q.start('ai');q.initialDraft=false;q.units=[];q.wave=2;q.gold=600;
 const party=full?['aragorn',...Array(4).fill('mt_swordshield'),...Array(3).fill('mt_spearshield'),...Array(3).fill('gondor_archer'),...Array(2).fill('rohan_rider')]:['mt_swordshield'];
 for(const id of party){q.spawn(id,'good',{x:-1000,y:-1000});q.gold-=q.price(id);}q.linkedOperation={id:'anduin',active:true,startWave:2,step:1,bridge:0,report:'QA scenario · legally recruited party'};
 q._routeChoice={...q.stageInfo(3),mission:'osgiliath_retreat',map:h.CX.maps.indexOf('osgiliath'),modifier:'clear',ids:['orc_sword','orc_sword','orc_spearman','orc_archer','warg_rider','moria_goblin'],linkedStep:1};q.prepareStage();return q._saveState();}
(async()=>{server.listen(8139,'127.0.0.1');let browser;
 try{browser=await chromium.launch({headless:true});
  for(const [width,height]of[[360,780],[390,844],[1365,900]])for(const version of ['before','after']){
   const {page,ctx}=await open(browser,width,height,version);await shot(page,version+'-'+width+'-menu');await click(page,'#start-ai');await page.waitForSelector('[data-draft]');const view=await shot(page,version+'-'+width+'-recruit');
   if(version==='after'){if(view.overflow)throw Error('Page overflow '+width);if(width<600&&view.columns?.split(' ').length!==2)throw Error('Mobile recruitment must use two columns');const gate=await page.evaluate(()=>MESBG.battle.recruitOffers.map(o=>MESBG.battle.recruitGateReason(o.id,true)));if(gate.some(Boolean))throw Error('Locked initial offer');if(width!==390){await recruit(page);await click(page,'#dock-primary');await manualMove(page);(report.viewportActions=report.viewportActions||[]).push({width,height,status:report.manual?.status});if(report.manual?.status!=='passed')throw Error('Viewport battlefield input failed '+width);await shot(page,'after-'+width+'-battle');}}
   await ctx.close();persist();console.log('viewport',version,width,height);
  }
  {const {page,ctx}=await open(browser,390,844);await click(page,'#start-ai');await page.waitForSelector('[data-draft]');await recruit(page);await shot(page,'after-deployment');await click(page,'#dock-primary');await manualMove(page);if(report.manual?.status!=='passed')throw Error('Manual input verification failed: '+JSON.stringify(report.manual));await auto(page);
   // This checks five consecutive playable stages; a real defeat on stage five is a valid recorded outcome.
   const deadline=Date.now()+12*60000;let last='',changedAt=Date.now(),savedResume=false,completed=0;
   while(Date.now()<deadline){await page.waitForTimeout(700);const s=await state(page);const key=[s.phase,s.step,s.wave,s.round,s.enemyCount].join(':');if(key!==last){last=key;changedAt=Date.now();report.campaign.push(s);persist();console.log('campaign',s.wave,s.round,s.phase,s.step,s.units.length,s.enemyCount);}
    if(s.phase==='result'){await shot(page,'after-campaign-result');if(s.wave>=5)report.fiveStages={status:'passed',played:5,completed:s.wave-1,outcome:s.result};break;}if(s.phase==='reward'&&Date.now()-changedAt>45000){report.stall={state:s,dom:await page.locator('body').innerText()};await shot(page,'camp-stalled');throw Error('Camp UI did not advance for 45 seconds');}
    if(s.phase==='reward'){completed=Math.max(completed,s.wave);if(s.wave===4)report.operationComplete={status:s.operation?.active===false?'passed':'failed',operation:s.operation};if(s.step==='event'){if(!(report.battles||[]).some(b=>b.record.wave===s.wave)){const battle=await page.evaluate(()=>({record:MESBG.battle.battleRecord,ledger:MESBG.battle.rewardBook(),gold:MESBG.battle.gold,displayed:MESBG.battle.lastGold}));(report.battles=report.battles||[]).push(battle);const sum=battle.ledger.entries.reduce((n,e)=>n+e.amount,0),spent=(battle.ledger.spending||[]).reduce((n,e)=>n+e.amount,0);if(sum!==battle.displayed||battle.ledger.openingGold+sum-spent!==battle.gold)throw Error('Actual reward ledger mismatch '+s.wave);}await shot(page,'after-stage-'+s.wave+'-recap');}if(s.wave>=5){report.fiveStages={status:'passed',played:5,completed,outcome:'victory'};break;}await campStep(page,s);}
    else if(s.phase==='preparation'){if(!savedResume){const before=await page.evaluate(()=>({gold:MESBG.battle.gold,units:MESBG.battle.units.map(u=>({uid:u.uid,id:u.id,hp:u.currentWounds,x:u.x,y:u.y,points:u.entryPoints}))}));await page.reload();await page.waitForFunction(()=>MESBG.scene?.sys?.isActive());if(!await click(page,'#resume'))await click(page,'#continue-run');const after=await page.evaluate(()=>({gold:MESBG.battle.gold,units:MESBG.battle.units.map(u=>({uid:u.uid,id:u.id,hp:u.currentWounds,x:u.x,y:u.y,points:u.entryPoints}))}));report.resume={status:JSON.stringify(before)===JSON.stringify(after)?'passed':'failed',before,after};savedResume=true;}if(await page.evaluate(()=>!!MESBG.battle.linkedOperation?.active)){(report.operationEffects=report.operationEffects||[]).push(await page.evaluate(()=>({wave:MESBG.battle.wave+1,mission:MESBG.battle.mission,operation:MESBG.battle.linkedOperation,zone:MESBG.battle.deploymentBounds(),priority:MESBG.battle.priorityForce})));if(!await page.locator('#qa-mission').isVisible())throw Error('Operation choices are hidden');}await click(page,'#dock-primary');await auto(page);}
    else if(!s.auto)await auto(page);
   }
   if(!report.fiveStages)report.fiveStages={status:'failed',completed,final:await state(page)};await ctx.close();
  }
  for(const full of [true,false]){const {page,ctx}=await open(browser,390,844,'after',fixture(full));if(!await click(page,'#resume'))await click(page,'#continue-run');if(!await page.locator('#qa-mission').isVisible())throw Error('Retreat choices are hidden: '+await page.locator('#qa-mission').evaluate(n=>n.outerHTML));await click(page,'#qa-mission summary');await click(page,'[data-bridge-choice="1"]');if(!await page.evaluate(()=>MESBG.battle.linkedOperation.bridge===1))throw Error('Bridge choice did not apply');await click(page,'[data-bridge-choice="0"]');await shot(page,'retreat-'+(full?'strong':'weak')+'-preparation');await click(page,'#qa-mission summary');await click(page,'#dock-primary');await auto(page);const start=Date.now();let final;
   while(Date.now()-start<6*60000){await page.waitForTimeout(700);final=await state(page);if(['reward','result'].includes(final.phase))break;if(full&&final.evacuated>=2){if(final.auto)await click(page,'#auto-dock');if(await page.locator('#qa-mission').getAttribute('open')===null)await click(page,'#qa-mission summary');if(await click(page,'#qa-withdraw'))report.earlyWithdraw={status:'passed',round:final.round,evacuated:final.evacuated};}else if(!final.auto)await auto(page);}
   await page.locator(final.phase==='reward'?'.modal.camp':'.result-modal').waitFor({state:'visible',timeout:20000}).catch(()=>{});report.missions.push({fixture:full?'mixed-party':'one-guard',status:full?(final.phase==='reward'?'passed':'failed'):(final.phase==='result'?'passed':'failed'),final});await shot(page,'retreat-'+(full?'success':'failure'));if(full&&final.phase==='reward'){const until=Date.now()+90000;while(Date.now()<until){const s=await state(page);if(s.phase==='preparation'){report.retreatCarryover=await page.evaluate(()=>({status:'passed',next:MESBG.battle.mission,operation:MESBG.battle.linkedOperation,zone:MESBG.battle.deploymentBounds()}));await click(page,'#dock-primary');report.retreatCarryover.supportUnits=await page.evaluate(()=>MESBG.battle.alive('good').filter(u=>u._stageSupport==='anduin').length);await shot(page,'retreat-next-defense');break;}if(s.phase!=='reward')break;await campStep(page,s);await page.waitForTimeout(700);}}await ctx.close();persist();
  }
  report.status=report.errors.length||report.consoleErrors.length||report.failedResources.some(r=>r.status>=400||r.error&&r.error!=='net::ERR_ABORTED')||report.manual?.status!=='passed'||report.resume?.status!=='passed'||report.fiveStages?.status!=='passed'||!report.operationEntry||report.operationComplete?.status!=='passed'||report.missions.some(m=>m.status!=='passed')?'failed':'passed';
  if(report.status==='failed')process.exitCode=1;
 }catch(error){report.status='failed';report.fatal=error.stack;console.error(error.stack);process.exitCode=1;}
 finally{persist();if(browser)await browser.close();server.close();}
})();
