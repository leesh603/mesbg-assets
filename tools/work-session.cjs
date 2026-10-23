// Dependency-free resource check and resumable, bounded verification runner.
const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {spawn}=require('node:child_process');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'reports/battlefield-20261023');
const MB=1024*1024;
function read(p){try{return fs.readFileSync(p,'utf8').trim();}catch{return null;}}
function status(){
 const disk=fs.statfsSync(ROOT),free=Number(disk.bavail)*Number(disk.bsize);
 const limit=read('/sys/fs/cgroup/memory.max'),used=read('/sys/fs/cgroup/memory.current');
 const memory=limit&&limit!=='max'?{usedMiB:Math.round(Number(used)/MB),limitMiB:Math.round(Number(limit)/MB)}:{freeMiB:Math.round(os.freemem()/MB)};
 const state={freeDiskMiB:Math.floor(free/MB),memory,processes:read('/sys/fs/cgroup/pids.current'),processLimit:read('/sys/fs/cgroup/pids.max')};
 console.log(JSON.stringify(state,null,2));return state;
}
async function verify(){
 const s=status();if(s.freeDiskMiB<256)throw Error('Less than 256 MiB disk free. Remove reproducible temporary output before retrying; keep sources and commits.');
 fs.mkdirSync(OUT,{recursive:true});
 const report={started:new Date().toISOString(),checks:[]};
 const save=()=>{const p=path.join(OUT,'verification.json'),tmp=p+'.tmp';fs.writeFileSync(tmp,JSON.stringify(report,null,2)+'\n');fs.renameSync(tmp,p);};
 for(const [name,args,timeout]of[
  ['syntax',['--check','src/game.js'],30000],
  ['online-build',['tools/build.js','--online-only'],60000],
  ['combat-audio',['--test','--test-concurrency=1','tests/battle-fx.test.cjs','tests/regional-battle-audio.test.cjs'],60000],
  ['terrain',['--test','--test-concurrency=1','tests/terrain.test.cjs','tests/terrain-campaign.test.cjs'],240000]
 ]){
  const log=fs.createWriteStream(path.join(OUT,name+'.log'));
  const check={name,status:'running',started:new Date().toISOString()};report.checks.push(check);save();
  console.log('Starting '+name);
  await new Promise((resolve,reject)=>{
   const child=spawn(process.execPath,args,{cwd:ROOT,stdio:['ignore','pipe','pipe']});let timedOut=false;
   for(const stream of[child.stdout,child.stderr])stream.on('data',b=>{log.write(b);process.stdout.write(b);});
   const heartbeat=setInterval(()=>console.log(name+' still running; log saved'),20000);
   const timer=setTimeout(()=>{timedOut=true;child.kill('SIGTERM');},timeout);
   const killTimer=setTimeout(()=>child.kill('SIGKILL'),timeout+5000);
   child.once('error',e=>{clearTimeout(timer);clearTimeout(killTimer);clearInterval(heartbeat);log.end();check.status='failed';check.error=e.message;save();reject(e);});
   child.once('exit',(code,signal)=>{clearTimeout(timer);clearTimeout(killTimer);clearInterval(heartbeat);log.end();Object.assign(check,{status:code===0&&!timedOut?'passed':'failed',code,signal,timedOut,finished:new Date().toISOString()});save();code===0&&!timedOut?resolve():reject(Error(name+' failed; see its log and verification.json'));});
  });
 }
 report.finished=new Date().toISOString();save();console.log('Verification complete. Results: reports/battlefield-20261023/verification.json');
}
if(require.main===module){const mode=process.argv[2]||'status';(mode==='status'?Promise.resolve(status()):mode==='verify'?verify():Promise.reject(Error('Usage: node tools/work-session.cjs [status|verify]'))).catch(e=>{console.error(e.message);process.exitCode=1;});}
module.exports={status};
