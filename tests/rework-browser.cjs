// Isolated real-browser play. Only normal UI controls advance the expedition.
// No forced wins, edits to health/resources, or leaderboard submissions.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const mode=process.env.REVIEW_MODE||'play';const out='review-output';fs.mkdirSync(out,{recursive:true});
const base='https://raw.githubusercontent.com/leesh603/mesbg-assets/'+process.env.BASE_SHA+'/';
const cache=new Map();
async function asset(name){if(cache.has(name))return cache.get(name);const promise=fetch(base+name).then(async r=>({status:r.status,body:Buffer.from(await r.arrayBuffer()),type:r.headers.get('content-type')}));cache.set(name,promise);return promise;}
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2'};
const server=http.createServer(async(req,res)=>{try{if(req.method!=='GET'){res.writeHead(405);return res.end();}let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';const baseline=name.startsWith('baseline/');if(baseline)name=name.slice(9)||'index.html';if(name.includes('..'))throw Error('path');const file=path.resolve(name);if(!baseline&&fs.existsSync(file)&&fs.statSync(file).isFile()){res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');return fs.createReadStream(file).pipe(res);}const a=await asset(name);res.writeHead(a.status,{'Content-Type':mime[path.extname(name)]||a.type||'application/octet-stream'});res.end(a.body);}catch(e){res.writeHead(502);res.end(String(e));}});
const report={mode,base:process.env.BASE_SHA,errors:[],requestsFailed:[],views:[],runs:[]};
const state=page=>page.evaluate(()=>{const b=window.MESBG?.battle;return b?{initialDraft:b.initialDraft,phase:b.phase,step:b.campStep,wave:b.wave,round:b.round,result:b.result,gold:b.gold,units:b.alive('good').map(u=>({id:u.id,hp:u.currentWounds})),foes:b.alive('evil').length,offers:b.recruitOffers,draft:b.recruitDraft,log:b.log?.slice(0,3)}:null;});
async function screenshot(page,name){await page.screenshot({path:out+'/'+name+'.png'});const layout=await page.evaluate(()=>({bodyClasses:document.body.className,columns:document.querySelector('.recruit-cards')?getComputedStyle(document.querySelector('.recruit-cards')).gridTemplateColumns:null,width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.getBoundingClientRect().width&&i.complete&&!i.naturalWidth).map(i=>i.src)}));report.views.push({name,...layout});if(name.startsWith('after-')&&name.endsWith('-recruit')){const box=await page.locator('.camp-confirm>span').boundingBox();if(!box||box.width<70||box.height>60)throw Error('Recruit confirmation text is squeezed');if(layout.columns?.split(' ').length!==2)throw Error('Mobile recruitment must have two columns');}}
async function click(page,selector){const l=page.locator(selector).first();if(await l.isVisible()&&await l.isEnabled()){await l.click({timeout:5000});return true;}return false;}
async function recruit(page){const initial=await state(page);for(let i=0;i<(initial.offers||[]).length;i++){if(page.viewportSize().width===360&&i===1&&initial.initialDraft)continue;const card=page.locator('[data-draft="'+i+'"]');if(await card.isVisible()&&await card.isEnabled())await card.locator('.recruit-name').click({timeout:5000});}await click(page,'#draft-confirm');}
async function manualProbe(page,run){
  await page.waitForTimeout(4000);
  await click(page,'#offscreen-unit');await page.waitForTimeout(450);
  const attempt=await page.evaluate(()=>{
    const api=window.MESBG,b=api?.battle,u=b?.unit(b.selected),c=api?.scene?.cameras?.main,canvas=document.querySelector('canvas');
    if(!u||!c||!canvas||b.phase!=='move'||!b.canAct(u)||b.engaged(u))return {skipped:'이동 가능한 현재 아군 없음'};
    const r=canvas.getBoundingClientRect(),z=c.zoom/(devicePixelRatio||1),cx=c.scrollX+c.width/2,cy=c.scrollY+c.height/2;
    for(const [dx,dy]of[[0,90],[90,0],[-90,0],[0,-90]]){const plan=api.plan(u,{x:u.x+dx,y:u.y+dy},b.alive(),b.terrain,b.remaining(u));if(!plan)continue;const x=(plan.to.x-cx)*z+r.width/2+r.left,y=(plan.to.y-cy)*z+r.height/2+r.top;if(x>r.left+8&&x<r.right-8&&y>r.top+8&&y<r.bottom-8)return {uid:u.uid,x,y,before:{x:u.x,y:u.y},resources:{...u.resources}};}
    return {skipped:'화면 안 안전한 이동 후보 없음'};
  });run.manual=attempt;if(attempt.skipped)return;
  await page.mouse.click(attempt.x,attempt.y);await page.waitForTimeout(200);
  if(!await page.locator('#intent-cancel').isVisible()){run.manual.preview=false;return;}
  run.manual.preview=true;await screenshot(page,'manual-move-preview');await click(page,'#intent-cancel');
  run.manual.afterCancel=await page.evaluate(uid=>{const u=MESBG.battle.unit(uid);return{x:u.x,y:u.y};},attempt.uid);
  await page.mouse.click(attempt.x,attempt.y);await click(page,'#dock-primary');await page.waitForTimeout(1300);
  run.manual.afterConfirm=await page.evaluate(uid=>{const u=MESBG.battle.unit(uid);return{x:u.x,y:u.y};},attempt.uid);
  await click(page,'#act-ability');
  if(await page.locator('#battle-sheet').isVisible())await screenshot(page,'hero-command-sheet');
  if(await click(page,'#hero-skill')){await screenshot(page,'manual-skill-preview');await click(page,'#sk-use');await click(page,'#dock-primary');await page.waitForTimeout(800);run.manual.skillUsed=true;}
  await click(page,'#sheet-toggle');
}

(async()=>{server.listen(8137,'127.0.0.1');const browser=await chromium.launch({headless:true});
 try{
  for(const [width,version] of (mode==='ui'?[[360,'before'],[360,'after'],[390,'before'],[390,'after']]:mode==='comparison'?[[390,'before'],[390,'after'],[360,'after']]:[[390,'after']])){
   const context=await browser.newContext({viewport:{width,height:width===360?740:844},deviceScaleFactor:1});
   await context.route('**/*',route=>{const r=route.request();if(r.method()!=='GET'||/workers\.dev/.test(r.url()))return route.abort();return route.continue();});
   await context.addInitScript(()=>{Element.prototype.requestFullscreen=async()=>{};});
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push({version,width,message:e.message}));page.on('requestfailed',r=>{if(!/workers\.dev/.test(r.url()))report.requestsFailed.push({url:r.url(),error:r.failure()?.errorText});});
   await page.goto('http://127.0.0.1:8137/'+(version==='before'?'baseline/':''),{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:180000});
   await screenshot(page,version+'-'+width+'-menu');const perf=await page.evaluate(async()=>{const start=performance.now();await new Promise(resolve=>{let frames=0;function tick(){if(++frames>=30)resolve();else requestAnimationFrame(tick)}requestAnimationFrame(tick)});return {frameMs:(performance.now()-start)/30,heapBytes:performance.memory?.usedJSHeapSize,loadMs:performance.getEntriesByType('navigation')[0]?.domContentLoadedEventEnd};});report.views[report.views.length-1].performance=perf;
   await click(page,'#start-ai');await page.waitForSelector('[data-draft]');await screenshot(page,version+'-'+width+'-recruit');
   await recruit(page);await page.waitForTimeout(700);await screenshot(page,version+'-'+width+'-deployment');
   if(mode==='ui'){await context.close();continue;}
   const run={width,version,checkpoints:[],started:new Date().toISOString(),finished:false};report.runs.push(run);
   await click(page,'#dock-primary');await page.waitForTimeout(1200);if(mode==='play')await manualProbe(page,run);await click(page,'#auto-dock');
   for(let i=0;i<3;i++)await click(page,'#speed-dock');await click(page,'#act-ability');if(await page.locator('#speed').isVisible())await page.locator('#speed').selectOption('30');await click(page,'#sheet-toggle');run.speed=await page.locator('#speed-dock').textContent();
   const deadline=Date.now()+(mode==='comparison'?6:18)*60*1000;let last='',lastChange=Date.now(),campShot=false;
   while(Date.now()<deadline){
    await page.waitForTimeout(1200);const s=await state(page);if(!s)continue;
    const key=[s.phase,s.step,s.wave,s.round,s.foes,s.units.map(u=>u.hp).join(',')].join('|');
    if(key!==last){last=key;lastChange=Date.now();run.checkpoints.push(s);}
    if(s.phase==='result'){run.finished=true;run.result=s;await screenshot(page,version+'-'+width+'-result');break;}
    if(s.wave===5&&!run.bossSeen){run.bossSeen=true;await screenshot(page,version+'-'+width+'-first-boss');}
    if(s.phase==='preparation'){await click(page,'#dock-primary');continue;}
    if(s.phase==='reward'){
     if(s.step==='event'){if(!await click(page,'#ev-next')){await click(page,'[data-evopt]');await click(page,'#camp-choice-confirm');}}
     else if(s.step==='recruit')await recruit(page);
     else if(s.step==='relic'){await click(page,'[data-relic]');await click(page,'#camp-choice-confirm');}
     else if(s.step==='ready'){if(!campShot){await screenshot(page,version+'-'+width+'-camp');campShot=true;}if(mode==='comparison'){run.firstBattleComplete=true;break;}await click(page,'#leave-camp');}
    }
    if(Date.now()-lastChange>90000){run.stalled=s;await screenshot(page,version+'-'+width+'-stalled');break;}
    fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));
   }
   run.final=await state(page);await screenshot(page,version+'-'+width+'-final');await context.close();
  }
 }catch(e){report.fatal=e.stack;console.error(e.stack);process.exitCode=1;}finally{fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));await browser.close();server.close();}
})();
