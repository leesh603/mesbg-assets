const {PNG}=require('pngjs');const fs=require('fs');
fs.readdirSync('tokens').filter(f=>f.endsWith('.png')).forEach(f=>{
  const p=PNG.sync.read(fs.readFileSync('tokens/'+f));
  let op=0,blue=0;
  for(let i=0;i<p.data.length;i+=4){
    if(p.data[i+3]<110)continue;op++;
    const r=p.data[i],g=p.data[i+1],b=p.data[i+2];
    if(b>r+40&&b>g+15&&b>60)blue++;
  }
  if(op>0&&blue/op>0.15)console.log(f,(100*blue/op).toFixed(0)+'% blue');
});
