const { PNG } = require('pngjs');
const fs = require('fs');
const p = PNG.sync.read(fs.readFileSync('C:/Users/Administrator/mesbg-assets/roster-orc-variants-v1.png'));
const cx0 = 0, cy0 = 512, cw = 512, ch = 512, W = p.width, d = p.data;
function idx(x, y) { return (y * W + x) * 4 }
const rs = [], gs = [], bs = [];
for (let x = 0; x < cw; x++) for (const y of [cy0, cy0 + 1, cy0 + ch - 1]) { const i = idx(cx0 + x, y); rs.push(d[i]); gs.push(d[i + 1]); bs.push(d[i + 2]); }
for (let y = 0; y < ch; y++) for (const x of [cx0, cx0 + 1, cx0 + cw - 1]) { const i = idx(x, cy0 + y); rs.push(d[i]); gs.push(d[i + 1]); bs.push(d[i + 2]); }
const med = a => a.sort((p, q) => p - q)[Math.floor(a.length / 2)]; const bg = [med(rs), med(gs), med(bs)];
console.log('bg', bg);
const dist = px => Math.sqrt((px[0] - bg[0]) ** 2 + (px[1] - bg[1]) ** 2 + (px[2] - bg[2]) ** 2);
const fg = new Uint8Array(cw * ch);
for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) { const i = idx(cx0 + x, cy0 + y); if (dist([d[i], d[i + 1], d[i + 2]]) > 26) fg[y * cw + x] = 1 }
const lab = new Int32Array(cw * ch).fill(-1); let nc = 0; const area = []; const stack = [];
for (let q = 0; q < cw * ch; q++) {
  if (!fg[q] || lab[q] >= 0) continue;
  const c = nc++; area.push(0); stack.push(q); lab[q] = c;
  while (stack.length) {
    const s = stack.pop(); area[c]++; const sx = s % cw, sy = (s / cw) | 0;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = sx + dx, ny = sy + dy; if (nx < 0 || ny < 0 || nx >= cw || ny >= ch) continue;
      const np = ny * cw + nx; if (fg[np] && lab[np] < 0) { lab[np] = c; stack.push(np) }
    }
  }
}
let main = 0; area.forEach((a, i) => { if (a > area[main]) main = i });
console.log('main area', area[main], 'ncomps', nc, 'second', area.sort((a, b) => b - a)[1]);
let sx = 0, sy = 0;
for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (lab[y * cw + x] === main) { sx += x; sy += y }
const cx = sx / area[main], cy = sy / area[main];
const ds = []; for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (lab[y * cw + x] === main) ds.push(Math.hypot(x - cx, y - cy));
ds.sort((a, b) => a - b); let cr = ds[Math.floor(ds.length * 0.90)];
console.log('centroid', cx.toFixed(0), cy.toFixed(0), 'cr90', cr.toFixed(0));
const rMax = Math.min(cw, ch) * 0.55, lo = cr * 0.7; let lastDense = lo;
for (let r = lo; r < rMax; r += 4) {
  let tot = 0, hit = 0;
  for (let a = 0; a < 64; a++) {
    const x = Math.round(cx + r * Math.cos(a * Math.PI / 32)), y = Math.round(cy + r * Math.sin(a * Math.PI / 32));
    if (x < 0 || y < 0 || x >= cw || y >= ch) continue; tot++; if (lab[y * cw + x] >= 0) hit++
  }
  if (tot && hit / tot > 0.30) lastDense = r; else if (r > lastDense + 12) break;
  if (r % 20 < 4) console.log('r', r.toFixed(0), 'density', (hit / tot).toFixed(2));
}
console.log('lastDense', lastDense, 'final cr', Math.max(lastDense * 1.03, Math.min(cw, ch) * 0.25).toFixed(0));
