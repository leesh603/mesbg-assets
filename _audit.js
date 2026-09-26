const fs=require('fs'),path=require('path'),{PNG}=require('pngjs');
const files=fs.readdirSync('tokens').filter(f=>f.endsWith('.png')).sort();
const CELL=170,COLS=8,perSheet=COLS*6;
for(let s=0;s<Math.ceil(files.length/perSheet);s++){
  const sheet=files.slice(s*perSheet,(s+1)*perSheet);
  const img=new PNG({width:COLS*CELL,height:6*CELL,fill:{r:20,g:22,b:26}});
  for(let i=0;i<sheet.length;i++){
    const png=PNG.sync.read(fs.readFileSync(path.join('tokens',sheet[i])));
    const sc=Math.min((CELL-6)/png.width,(CELL-6)/png.height);
    const w=Math.round(png.width*sc),h=Math.round(png.height*sc);
    const cx=(i%COLS)*CELL+Math.floor((CELL-w)/2),cy=Math.floor(i/COLS)*CELL+Math.floor((CELL-h)/2);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){
      const sp=(Math.floor(y/sc)*png.width+Math.floor(x/sc))*4,a=png.data[sp+3];if(!a)continue;
      const dp=((cy+y)*img.width+cx+x)*4;
      img.data[dp]=png.data[sp];img.data[dp+1]=png.data[sp+1];img.data[dp+2]=png.data[sp+2];img.data[dp+3]=Math.max(img.data[dp+3],a);
    }
  }
  fs.writeFileSync(`_audit-${s}.png`,PNG.sync.write(img));
}
console.log('sheets:',Math.ceil(files.length/perSheet));
