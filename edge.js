const {PNG}=require('pngjs');const fs=require('fs');
process.argv.slice(2).forEach(n=>{
  const p=PNG.sync.read(fs.readFileSync('tokens/'+n+'.png'));
  let t=0,b=0,l=0,r=0;
  for(let x=0;x<p.width;x++){if(p.data[(0*p.width+x)*4+3]>110)t++;if(p.data[((p.height-1)*p.width+x)*4+3]>110)b++;}
  for(let y=0;y<p.height;y++){if(p.data[(y*p.width+0)*4+3]>110)l++;if(p.data[(y*p.width+p.width-1)*4+3]>110)r++;}
  console.log(n,p.width+'x'+p.height,'edge-contact T/B/L/R =',t,b,l,r);
});
