const fs=require('node:fs'),vm=require('node:vm');
module.exports=function(){const html=fs.readFileSync('LAST-WAR-BAND_v1.9.html','utf8'),store=new Map();
 const ctx={structuredClone,console,lt:(o,k,v)=>o[k]=v,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},window:{},document:{getElementById:()=>true}};vm.createContext(ctx);
 const section=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b,html.indexOf(a)));
 vm.runInContext(section('window.__MESBG_ASSETS__=','</script>'),ctx);vm.runInContext(section('window.CAMPAIGN_META=','</script>'),ctx);
 vm.runInContext('const '+section('Ht=Z=>','class Ve extends')+';const q=new ze(window.CAMPAIGN_META,123);class Ve{};let be=()=>null,He=()=>{};const UX={ready:false};',ctx);
 vm.runInContext(section('const CX = {','const oldPreload = Ve.prototype.preload'),ctx);
 vm.runInContext(section('const UNIT_RULES =',"if(!document.getElementById('tier-css'))"),ctx);vm.runInContext(section('const exactPlan=ve;','// A tap chooses a destination'),ctx);
 // Execute the actual built source, stopping before the DOM-only HUD.
 // runtime/upgrade.js is an old reference, not the production implementation.
 vm.runInContext(section('window.MESBG_EXTRA_UNITS=',"field.insertAdjacentHTML('beforeend', '<section id=\"fight-preview\""),ctx);
 vm.runInContext('this.api={q,P,CX,zt,UnitCatalog,He,Et,ve,chargePlan,Ue,baseFile,De,oe,Ne,relicFamily,LWB_EVENTS,Tactics:window.LWBTactics};',ctx);return {...ctx.api,store,assets:ctx.window.__MESBG_ASSETS__};};
