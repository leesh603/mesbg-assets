// The audit contains reviewed anatomical points. Never regenerate it from alpha bounds.
const fs=require('node:fs');
const data=JSON.parse(fs.readFileSync('docs/unit-art-audit.json','utf8'));
const rows={};
for(const u of data.units){
 if(!(u.top>=0&&u.bottom>u.top&&u.bottom<=1&&u.centerX>=0&&u.centerX<=1&&u.centerY>=0&&u.centerY<=1&&u.worldReferenceSize>0))throw Error('Invalid anatomy: '+u.id);
 if(rows[u.id])throw Error('Duplicate anatomy: '+u.id);
 rows[u.id]=[u.bodyClass,u.top,u.bottom,u.centerX,u.centerY,u.worldReferenceSize,u.reference];
 if(u.referenceAxis==='width'){
  if(!(u.left>=0&&u.right>u.left&&u.right<=1))throw Error('Invalid torso width: '+u.id);
  rows[u.id].push('width',u.left,u.right);
 }
}
const file='src/game.js',src=fs.readFileSync(file,'utf8'),anchor='const UNIT_ART_PROFILES = ',a=src.indexOf(anchor),b=src.indexOf(';',a);
if(a<0||b<0)throw Error('Art profile marker is missing');
fs.writeFileSync(file,src.slice(0,a)+anchor+JSON.stringify(rows)+src.slice(b));
console.log('Synced '+data.units.length+' reviewed anatomy profiles. Run node tools/build.js --online-only.');

