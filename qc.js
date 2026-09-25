// QC: find tokens whose cutout kept disconnected leftovers (neighbor bleed / residue).
// Also renders flagged tokens on a magenta bg into qc-contact.png for eyeballing.
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');
const TOK = 'C:/Users/Administrator/mesbg-assets/tokens';

function comps(png) {
  const { width: w, height: h, data: d } = png;
  const lab = new Int32Array(w * h).fill(-1);
  const area = [];
  const stack = [];
  for (let p = 0; p < w * h; p++) {
    if (d[p * 4 + 3] < 64 || lab[p] >= 0) continue;
    const c = area.length; area.push(0);
    stack.push(p); lab[p] = c;
    while (stack.length) {
      const q = stack.pop(); area[c]++;
      const qx = q % w, qy = (q / w) | 0;
      for (const [dx, dy] of [[1,0],[-1,0],[0,1],[0,-1]]) {
        const nx = qx+dx, ny = qy+dy;
        if (nx<0||ny<0||nx>=w||ny>=h) continue;
        const np = ny*w+nx;
        if (d[np*4+3]>=64 && lab[np]<0) { lab[np]=c; stack.push(np); }
      }
    }
  }
  return { lab, area };
}

const flagged = [];
for (const f of fs.readdirSync(TOK).filter(f => f.endsWith('.png'))) {
  const png = PNG.sync.read(fs.readFileSync(path.join(TOK, f)));
  const { area } = comps(png);
  if (!area.length) { flagged.push({ f, why: 'empty' }); continue; }
  const sorted = [...area].sort((a,b)=>b-a);
  const main = sorted[0];
  const leftovers = sorted.slice(1).filter(a => a > Math.max(30, main*0.02));
  const lr = leftovers.reduce((a,b)=>a+b,0);
  if (leftovers.length || lr > main*0.05) {
    flagged.push({ f, main, leftoverComps: leftovers.length, leftoverArea: lr, pct: (100*lr/main).toFixed(1) });
  }
}
flagged.sort((a,b)=>(b.leftoverArea||0)-(a.leftoverArea||0));
console.log(`flagged ${flagged.length}/${fs.readdirSync(TOK).filter(f=>f.endsWith('.png')).length}`);
for (const x of flagged.slice(0,40)) console.log(`  ${x.f} main=${x.main} leftovers=${x.leftoverComps} (+${x.pct}%)`);

// contact sheet of flagged tokens on magenta bg
const cols = 8, cell = 260;
const rowsN = Math.ceil(Math.min(flagged.length, 40) / cols);
const out = new PNG({ width: cols*cell, height: Math.max(1, rowsN)*cell });
out.data = Buffer.alloc(out.width * out.height * 4);
for (let i=0;i<out.data.length;i+=4){out.data[i]=255;out.data[i+1]=0;out.data[i+2]=255;out.data[i+3]=255;}
flagged.slice(0, cols*rowsN).forEach((x, i) => {
  const png = PNG.sync.read(fs.readFileSync(path.join(TOK, x.f)));
  const cx = (i%cols)*cell, cy = ((i/cols)|0)*cell;
  const s = Math.min((cell-16)/png.width, (cell-16)/png.height);
  const dw = Math.round(png.width*s), dh = Math.round(png.height*s);
  for (let y=0;y<dh;y++) for (let xx=0;xx<dw;xx++){
    const sx = Math.min(png.width-1, Math.floor(xx/s)), sy = Math.min(png.height-1, Math.floor(y/s));
    const si=(sy*png.width+sx)*4, di=((cy+8+y)*out.width+cx+8+xx)*4;
    const a = png.data[si+3]/255;
    for (let c=0;c<3;c++) out.data[di+c] = Math.round(png.data[si+c]*a + out.data[di+c]*(1-a));
    out.data[di+3]=255;
  }
});
fs.writeFileSync('C:/Users/Administrator/mesbg-assets/qc-contact.png', PNG.sync.write(out));
console.log('qc-contact.png written');
