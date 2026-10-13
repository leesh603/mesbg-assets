// Isolated real-browser play. Only normal UI controls advance the expedition.
// No forced wins, edits to health/resources, or leaderboard submissions.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const {chromium}=require('playwright');
const out='review-output';fs.mkdirSync(out,{recursive:true});
const base='https://raw.githubusercontent.com/leesh603/mesbg-assets/'+process.env.BASE_SHA+'/';
const cache=new Map();
async function asset(name){if(cache.has(name))return cache.get(name);const promise=fetch(base+name).then(async r=>({status:r.status,body:Buffer.from(await r.arrayBuffer()),type:r.headers.get('content-type')}));cache.set(name,promise);return promise;}
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.json':'application/json','.woff2':'font/woff2'};
const server=http.createServer(async(req,res)=>{try{if(req.method!=='GET'){res.writeHead(405);return res.end();}let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).slice(1)||'index.html';const baseline=name.startsWith('baseline/');if(baseline)name=name.slice(9)||'index.html';if(name.includes('..'))throw Error('path');const file=path.resolve(name);if(!baseline&&fs.existsSync(file)&&fs.statSync(file).isFile()){res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');return fs.createReadStream(file).pipe(res);}const a=await asset(name);res.writeHead(a.status,{'Content-Type':mime[path.extname(name)]||a.type||'application/octet-stream'});res.end(a.body);}catch(e){res.writeHead(502);res.end(String(e));}});
const report={base:process.env.BASE_SHA,errors:[],requestsFailed:[],views:[],runs:[]};
const state=page=>page.evaluate(()=>{const b=window.MESBG?.battle;return b?{phase:b.phase,step:b.campStep,wave:b.wave,round:b.round,result:b.result,gold:b.gold,units:b.alive('good').map(u=>({id:u.id,hp:u.currentWounds})),foes:b.alive('evil').length,offers:b.recruitOffers,draft:b.recruitDraft,log:b.log?.slice(0,3)}:null;});
async function screenshot(page,name){await page.screenshot({path:out+'/'+name+'.png'});const layout=await page.evaluate(()=>({width:innerWidth,height:innerHeight,overflow:document.documentElement.scrollWidth>innerWidth,broken:[...document.images].filter(i=>i.getBoundingClientRect().width&&i.complete&&!i.naturalWidth).map(i=>i.src)}));report.views.push({name,...layout});}
async function click(page,selector){const l=page.locator(selector).first();if(await l.isVisible()&&await l.isEnabled()){await l.click({timeout:5000});return true;}return false;}
async function recruit(page){const initial=await state(page);for(let i=0;i<(initial.offers||[]).length;i++){const card=page.locator('[data-draft="'+i+'"]');if(await card.isVisible()&&await card.isEnabled())await card.click({position:{x:12,y:12}});}await click(page,'#draft-confirm');}
(async()=>{server.listen(8137,'127.0.0.1');const browser=await chromium.launch({headless:true});
 try{
  for(const width of [360,390])for(const version of ['before','after']){
   const context=await browser.newContext({viewport:{width,height:width===360?740:844},deviceScaleFactor:1});
   await context.route('**/*',route=>{const r=route.request();if(r.method()!=='GET'||/workers\.dev/.test(r.url()))return route.abort();return route.continue();});
   await context.addInitScript(()=>{const now=1791853200000;Date.now=()=>now;});
   const page=await context.newPage();page.on('pageerror',e=>report.errors.push({version,width,message:e.message}));page.on('requestfailed',r=>{if(!/workers\.dev/.test(r.url()))report.requestsFailed.push({url:r.url(),error:r.failure()?.errorText});});
   await page.goto('http://127.0.0.1:8137/'+(version==='before'?'baseline/':''),{waitUntil:'domcontentloaded',timeout:60000});
   await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:180000});
   await screenshot(page,version+'-'+width+'-menu');
   await click(page,'#start-ai');await page.waitForSelector('[data-draft]');await screenshot(page,version+'-'+width+'-recruit');
   await recruit(page);await page.waitForTimeout(700);await screenshot(page,version+'-'+width+'-deployment');
   if(version==='before'||width===360){await context.close();continue;}
   const run={width,checkpoints:[],started:new Date().toISOString(),finished:false};report.runs.push(run);
   await click(page,'#dock-primary');await page.waitForTimeout(1200);await click(page,'#auto-dock');
   for(let i=0;i<3;i++)await click(page,'#speed-dock');
   const deadline=Date.now()+18*60*1000;let last='',lastChange=Date.now(),campShot=false;
   while(Date.now()<deadline){
    await page.waitForTimeout(1200);const s=await state(page);if(!s)continue;
    const key=[s.phase,s.step,s.wave,s.round,s.foes,s.units.map(u=>u.hp).join(',')].join('|');
    if(key!==last){last=key;lastChange=Date.now();run.checkpoints.push(s);}
    if(s.phase==='result'){run.finished=true;run.result=s;await screenshot(page,'after-390-result');break;}
    if(s.wave===5&&!run.bossSeen){run.bossSeen=true;await screenshot(page,'after-390-first-boss');}
    if(s.phase==='preparation'){await click(page,'#dock-primary');continue;}
    if(s.phase==='reward'){
     if(s.step==='event'){if(!await click(page,'#ev-next')){await click(page,'[data-evopt]');await click(page,'#camp-choice-confirm');}}
     else if(s.step==='recruit')await recruit(page);
     else if(s.step==='relic'){await click(page,'[data-relic]');await click(page,'#camp-choice-confirm');}
     else if(s.step==='ready'){if(!campShot){await screenshot(page,'after-390-camp');campShot=true;}await click(page,'#leave-camp');}
    }
    if(Date.now()-lastChange>90000){run.stalled=s;await screenshot(page,'after-390-stalled');break;}
    fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));
   }
   run.final=await state(page);await screenshot(page,'after-390-final');await context.close();
  }
 }catch(e){report.fatal=e.stack;process.exitCode=1;}finally{fs.writeFileSync(out+'/report.json',JSON.stringify(report,null,2));await browser.close();server.close();}
})();
