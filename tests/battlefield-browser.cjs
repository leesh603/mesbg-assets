// Candidate HTML uses the unchanged live asset tree; mutations to external services are blocked.
const fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const {chromium}=require('playwright');
const OUT=path.resolve('reports/battlefield-20261023');fs.mkdirSync(OUT,{recursive:true});
const report=process.env.RESUME_BROWSER?JSON.parse(fs.readFileSync(path.join(OUT,'browser.json'),'utf8')):{candidate:'793ccdc739727165e3363076f4f12d20492adc37',started:new Date().toISOString(),regions:[],combat:[],music:[],errors:[],failed:[],screenshots:[]};
const fingerprint=require('node:crypto').createHash('sha256').update(fs.readFileSync('src/game.js')).update(fs.readFileSync('index.html')).digest('hex');
if(report.fingerprint&&report.fingerprint!==fingerprint)throw Error('Candidate changed; start a fresh browser report.');report.fingerprint=fingerprint;
delete report.fatal;report.renderer='Phaser Canvas (headless, WebGL disabled to bound memory)';
const save=()=>fs.writeFileSync(path.join(OUT,'browser.json'),JSON.stringify(report,null,2)+'\n');
async function region(page,key){await page.evaluate(key=>{const b=MESBG.battle,c=MESBG.constants;b.start('hotseat');const info=b.stageInfo(3);b.wave=2;b._routeChoice={...info,map:c.maps.indexOf(key),mission:'annihilation',modifier:'clear'};b.prepareStage();MESBG.scene.sync();MESBG.render();MESBG.scene.overview();},key);await page.waitForFunction(()=>MESBG.scene._terrainObjects?.getLength()>0,null,{timeout:20000});}
let browser;
async function launch(){return chromium.launch({headless:true,...(process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{}),...(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY}}:{}),args:['--no-sandbox','--no-zygote','--single-process','--disable-gpu','--disable-http2','--disable-dev-shm-usage','--disk-cache-size=1','--media-cache-size=1','--autoplay-policy=no-user-gesture-required']});}
(async()=>{
try{for(const [device,viewport]of [['pc',{width:1280,height:900}],['mobile',{width:390,height:844}]]){
 if(report.regions.filter(r=>r.device===device).length===27&&report.combat.filter(r=>r.device===device).length===6&&report.music.filter(r=>r.device===device).length===12)continue;
 browser=await launch();const ctx=await browser.newContext({viewport,deviceScaleFactor:1,isMobile:device==='mobile',hasTouch:device==='mobile',serviceWorkers:'block',ignoreHTTPSErrors:true});
 await ctx.route('**/*',async route=>{const r=route.request(),u=new URL(r.url());if(r.method()!=='GET'||u.hostname.endsWith('workers.dev'))return route.abort();if(u.hostname==='leesh603.github.io'&&u.pathname==='/mesbg-assets/')return route.fulfill({path:'index.html',contentType:'text/html; charset=utf-8'});return route.continue();});
 await ctx.addInitScript(()=>{Element.prototype.requestFullscreen=async()=>{};const get=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:get.call(this,type,...args);};});
 const page=await ctx.newPage();page.on('pageerror',e=>{report.errors.push({device,error:e.message,stack:e.stack});save();});page.on('requestfailed',r=>{console.log('Request failed',r.url(),r.failure()?.errorText);});page.on('response',r=>{if(r.status()>=400)report.failed.push({device,url:r.url(),status:r.status()});});
 await page.goto('https://leesh603.github.io/mesbg-assets/',{waitUntil:'domcontentloaded',timeout:90000});
 await page.waitForFunction(()=>window.MESBG?.scene?.sys?.isActive(),null,{timeout:120000});console.log(device+' engine ready');
 for(const key of await page.evaluate(()=>Object.keys(window.MESBGWorldArt.REGIONS))){if(report.regions.some(r=>r.device===device&&r.key===key))continue;await region(page,key);await page.waitForTimeout(80);
  const state=await page.evaluate(()=>({map:MESBG.constants.maps[MESBG.battle.mapIndex],terrain:MESBG.scene._terrainObjects?.getLength(),overflow:document.documentElement.scrollWidth>innerWidth,canvas:document.querySelector('canvas')?.width,good:MESBG.battle.alive('good').length}));
  assert.equal(state.map,key);assert(!state.overflow,device+' '+key+' overflow');assert(state.canvas>0&&state.terrain>0&&state.good>0,JSON.stringify(state));report.regions.push({device,key,...state});save();
  if(['osgiliath','moria','mirkwood','black_gate'].includes(key)){const file=device+'-'+key+'.png';await page.screenshot({path:path.join(OUT,file)});report.screenshots.push(file);}
 }
 console.log(device+' 27 regions rendered');
 await region(page,'osgiliath');await page.mouse.click(2,2);await page.evaluate(()=>MESBG.audio.unlock());
 for(const [key,boss,wanted]of [['osgiliath',false,'gondor'],['edoras',false,'rohan'],['orthanc',false,'mordor'],['edoras',true,'heroes-bosses']]){if(report.music.filter(r=>r.device===device&&r.key===key&&r.boss===boss).length===3)continue;
  await page.evaluate(({key,boss})=>MESBG.audio.setScene('fight',key,boss),{key,boss});
  await page.waitForFunction(wanted=>{const a=MESBG.audio;return a.music?.dataset?.ostTrack===wanted&&!a.music.paused&&a.music._buf?.duration>0;},wanted,{timeout:45000});
  for(const phase of ['move','shoot','fight']){await page.evaluate(({phase,key,boss})=>MESBG.audio.setScene(phase,key,boss),{phase,key,boss});const state=await page.evaluate(()=>({track:MESBG.audio.music.dataset.ostTrack,duration:MESBG.audio.music._buf.duration,paused:MESBG.audio.music.paused,rate:MESBG.audio.music.playbackRate,context:MESBG.audio.context.state}));assert.equal(state.track,wanted);assert(!state.paused);assert.equal(state.rate,1);report.music.push({device,key,boss,phase,...state});save();}
 }
 console.log(device+' OST decoded and phase continuity verified');
 for(const kind of ['sword','axe','spear','bow','cavalry','monster']){if(report.combat.some(r=>r.device===device&&r.kind===kind))continue;
  const result=await page.evaluate(async kind=>{const b=MESBG.battle,s=MESBG.scene;const entry=[...b.meta.values()].find(m=>{const p=MESBG.profiles[m.id],t=p?.traits||[];return kind==='cavalry'?t.includes('mounted'):kind==='monster'?t.includes('monster'):/sword|axe|spear|bow/.test(kind)&&new RegExp(kind).test(m.weapon||'')&&!t.includes('mounted')&&!t.includes('static');});if(!entry)throw Error('No '+kind+' unit');
   const a=b.spawn(entry.id,'good',{x:1020,y:750}),v=b.spawn('orc_sword','evil',{x:1140,y:750});s.sync();MESBG.render();MESBG.ui.setCamera(1080,750,.9);await new Promise(r=>requestAnimationFrame(r));
   const ac=s.tokens.get(a.uid),bc=s.tokens.get(v.uid),body=ac.getByName('token');const before={ax:ac.x,ay:ac.y,bx:bc.x,by:bc.y,children:s.children.list.length};
   const sounds=[],play=s.soundFX.play;s.soundFX.play=function(name,...args){sounds.push(name);return play.call(this,name,...args);};
   const started=performance.now();try{await s.combat({kind:kind==='bow'?'shot':'fight',strikeResults:[{attacker:a.uid,target:v.uid,wound:true,killed:false}],pushVectors:[],trappedUnits:[],knockedDownUnits:[]});}finally{s.soundFX.play=play;}
   return{kind,id:entry.id,sounds,elapsed:performance.now()-started,locked:!!body.getData('fxLock'),before,after:{ax:ac.x,ay:ac.y,bx:bc.x,by:bc.y,children:s.children.list.length}};
  },kind);
  assert(!result.locked);for(const k of ['ax','ay','bx','by'])assert.equal(result.after[k],result.before[k]);assert(result.sounds.length>0);if(kind==='bow')assert.deepEqual(result.sounds,['arrow_release','arrow_fly','arrow_impact']);report.combat.push({device,...result});save();
 }
 console.log(device+' six real-engine combat fixtures completed');await ctx.close();
}
assert.equal(report.errors.length,0);assert.equal(report.failed.length,0);report.finished=new Date().toISOString();report.passed=true;save();console.log(JSON.stringify({regions:report.regions.length,combat:report.combat.length,music:report.music.length,errors:report.errors.length,failed:report.failed.length}));
}catch(error){report.fatal=error.stack;save();throw error;}finally{await browser?.close();}})().catch(e=>{console.error(e.stack);process.exitCode=1;});
