const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
test('camp notifications escape the overlay and return to the battlefield without losing their children',()=>{
 const s=fs.readFileSync('src/game.js','utf8'),a=s.indexOf('function uiNoticeHost()'),b=s.indexOf('function uiCopy(',a);
 const nodes=new Map();
 function node(){const classes=new Set();return {children:[],parentElement:null,classList:{toggle(k,on){on?classes.add(k):classes.delete(k);},contains:k=>classes.has(k)},appendChild(el){if(el.parentElement)el.parentElement.children=el.parentElement.children.filter(x=>x!==el);el.parentElement=this;this.children.push(el);if(el.id)nodes.set(el.id,el);}};}
 const body=node(),field=node(),ctx={q:{phase:'move'},document:{body,getElementById:id=>nodes.get(id),querySelector:()=>field,createElement:()=>node()}};
 vm.createContext(ctx);vm.runInContext(s.slice(a,b),ctx);const host=ctx.uiNoticeHost(),toast=node();host.appendChild(toast);
 assert.equal(host.parentElement,field);assert.equal(host.classList.contains('camp-notices'),false);
 for(const phase of ['reward','menu','result']){ctx.q.phase=phase;assert.equal(ctx.uiNoticeHost(),host);assert.equal(host.parentElement,body);assert.ok(host.classList.contains('camp-notices'));assert.equal(host.children[0],toast);assert.equal(body.children.length,1);}
 for(const phase of ['preparation','move','shoot','fight']){ctx.q.phase=phase;assert.equal(ctx.uiNoticeHost(),host);assert.equal(host.parentElement,field);assert.equal(host.classList.contains('camp-notices'),false);assert.equal(host.children[0],toast);assert.equal(field.children.length,1);}
});
