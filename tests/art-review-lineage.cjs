const fs=require('node:fs'),assert=require('node:assert/strict');
module.exports=function effective(original){
 let u=original;const seen=new Set();
 while(u.supersededBy){assert(!seen.has(u.supersededBy),'cyclic art review');seen.add(u.supersededBy);const next=JSON.parse(fs.readFileSync(u.supersededBy)).units.find(v=>v.id===u.id);assert(next,u.id+' missing approved successor');u=next;}
 return u;
};
