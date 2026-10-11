const fs=require('node:fs'),vm=require('node:vm');
module.exports=function(){let html=fs.readFileSync('index.html','utf8');const store=new Map();
 if(process.env.MESBG_TEST_SOURCE){const begin='/*__LWB_SRC_BEGIN__*/',end='/*__LWB_SRC_END__*/';html=html.slice(0,html.indexOf(begin)+begin.length)+'\n'+fs.readFileSync(process.env.MESBG_TEST_SOURCE,'utf8')+'\n'+html.slice(html.indexOf(end));}
 const node={style:{},children:[],remove(){},append(){},appendChild(){},prepend(){},classList:{add(){},remove(){}}};
 const ctx={structuredClone,console,setTimeout:()=>0,clearTimeout(){},esc:String,uiCopy:String,uiNoticeHost:()=>node,Xt(){},arcTransition(){},lt:(o,k,v)=>o[k]=v,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v),removeItem:k=>store.delete(k)},window:{},document:{getElementById:()=>node,createElement:()=>({...node,style:{}}),body:node,head:node}};vm.createContext(ctx);
 const section=(a,b)=>html.slice(html.indexOf(a),html.indexOf(b,html.indexOf(a)));
 vm.runInContext(section('window.__MESBG_ASSETS__=','</script>'),ctx);vm.runInContext(section('window.CAMPAIGN_META=','</script>'),ctx);
 vm.runInContext('const __ASSET_SET__=new Set([...Object.keys(window.__MESBG_ASSETS__||{}),...(window.__MESBG_ASSET_KEYS__||[])]),__assetOk=id=>__ASSET_SET__.has(id);',ctx);
 vm.runInContext('const '+section('Ht=Z=>','class Ve extends')+';const q=new ze(window.CAMPAIGN_META,123);class Ve{};let be=()=>null,He=()=>{};const UX={ready:false};',ctx);
 vm.runInContext(section('const CX = {','const oldPreload = Ve.prototype.preload'),ctx);
 vm.runInContext(section('const UNIT_RULES =',"if(!document.getElementById('tier-css'))"),ctx);vm.runInContext(section('const exactPlan=ve;','// A tap chooses a destination'),ctx);
 // Execute the actual built source, stopping before the DOM-only HUD.
 // runtime/upgrade.js is an old reference, not the production implementation.
 vm.runInContext(section('window.MESBG_EXTRA_UNITS=',"field.insertAdjacentHTML('beforeend', '<section id=\"fight-preview\""),ctx);
 vm.runInContext('this.api={q,P,CX,zt,UnitCatalog,He,be,Et,ve,chargePlan,Ue,baseFile,De,oe,Ne,relicFamily,LWB_EVENTS,Tactics:window.LWBTactics};',ctx);return {...ctx.api,store,assets:Object.fromEntries((ctx.window.__MESBG_ASSET_KEYS__||[]).map(k=>[k,fs.existsSync('assets/mesbg/'+k)])),run:code=>vm.runInContext(code,ctx)};};
