const {PNG}=require('pngjs');const fs=require('fs');
const names=process.argv.slice(2);
names.forEach(n=>{
  const p=PNG.sync.read(fs.readFileSync('tokens/'+n+'.png'));
  const hist={};
  for(let i=0;i<p.data.length;i+=4){if(p.data[i+3]<110)continue;
    const r=p.data[i],g=p.data[i+1],b=p.data[i+2];
    const k=(r>>5)+','+(g>>5)+','+(b>>5);
    hist[k]=(hist[k]||0)+1;}
  const top=Object.entries(hist).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([k,c])=>{
    const[r,g,b]=k.split(',').map(v=>+v*32+16);
    return 'rgb('+r+','+g+','+b+')x'+c;});
  console.log(n, p.width+'x'+p.height, '|', top.join(' '));
});
