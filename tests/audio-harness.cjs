const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
function setup(){
 const state={clock:1000,started:[],fetches:[],timers:new Map(),storage:{}};
 class Param{constructor(value=0){this.value=value;}setValueAtTime(v){this.value=v;}setTargetAtTime(v){this.value=v;}linearRampToValueAtTime(v){this.value=v;}cancelScheduledValues(){}cancelAndHoldAtTime(){}}
 class Node{constructor(){this.gain=new Param();this.frequency=new Param();this.Q=new Param();}connect(){}disconnect(){}}
 class Audio{constructor(){this.paused=true;this.ended=false;this.dataset={};this.volume=1;this.attrs={};}setAttribute(k,v){this.attrs[k]=v;}removeAttribute(k){delete this.attrs[k];if(k==='src')this.src='';}canPlayType(){return 'probably';}load(){}addEventListener(){}pause(){this.paused=true;}play(){this.paused=false;return this.reject?Promise.reject(this.reject):Promise.resolve();}}
 class AC{
  constructor(){this.state='running';this.currentTime=1;this.destination=new Node();}resume(){this.state='running';return Promise.resolve();}suspend(){this.state='suspended';return Promise.resolve();}
  decodeAudioData(){return Promise.resolve({duration:.2,length:4410,numberOfChannels:1});}createGain(){return new Node();}createBiquadFilter(){return new Node();}createMediaElementSource(){return new Node();}
  createDynamicsCompressor(){const n=new Node();for(const k of ['threshold','knee','ratio','attack','release'])n[k]=new Param();return n;}
  createBufferSource(){return {playbackRate:{},connect(){},disconnect(){},start(){state.started.push(this);},stop(){this.onended?.();}};}
 }
 const context={Audio,window:{AudioContext:AC},document:{hidden:false,body:{append(){}},getElementById(){return null;}},performance:{now:()=>state.clock},console,qt:1,localStorage:{setItem:(k,v)=>state.storage[k]=v},setTimeout:fn=>{const id=state.timers.size+1;state.timers.set(id,fn);return id;},clearTimeout:id=>state.timers.delete(id),fetch:async url=>{state.fetches.push(url);return {ok:true,arrayBuffer:async()=>new ArrayBuffer(1)};}};
 const source=fs.readFileSync(path.join(__dirname,'../src/game.js'),'utf8');vm.createContext(context);vm.runInContext(source.slice(source.indexOf('const Ye = '),source.indexOf('function be(Z, Y)'))+';this.Engine=We;this.effects=Ye;',context);
 return {state,context,engine:new context.Engine(),source,AC,Audio};
}
module.exports={setup};
