// Crop the 6 die faces from each faction sheet into individual square textures.
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/Administrator/mesbg-assets';
const OUT = path.join(SRC, 'px-dice-faces');
fs.mkdirSync(OUT, { recursive: true });

const factions = {
  'px-dice-minastirith-faces-v1.png': 'minastirith',
  'px-dice-mordor-faces-v1.png': 'mordor',
  'px-dice-isengard-faces-v1.png': 'isengard',
  'px-dice-rohan-faces-v1.png': 'rohan',
  'px-dice-elf-faces-v1.png': 'elf',
  'px-dice-dwarf-faces-v1.png': 'dwarf',
  'px-dice-haradrim-faces-v1.png': 'haradrim',
};
const FACE_NAMES = ['1', '2', '3', '4', '5', 'emblem'];

function idx(x, y, w) { return (y * w + x) << 2; }

for (const [file, faction] of Object.entries(factions)) {
  const png = PNG.sync.read(fs.readFileSync(path.join(SRC, file)));
  const W = png.width, d = png.data;
  const cw = Math.floor(W / 3), ch = Math.floor(png.height / 2);
  // bg = darkest-ish median of whole image corners
  const b0 = idx(4, 4, W);
  const bg = [d[b0], d[b0 + 1], d[b0 + 2]];
  for (let i = 0; i < 6; i++) {
    const r = Math.floor(i / 3), c = i % 3;
    const x0 = c * cw, y0 = r * ch;
    // bright mask: face is much lighter than bg
    let bx0 = cw, bx1 = -1, by0 = ch, by1 = -1;
    for (let y = 2; y < ch - 2; y++) for (let x = 2; x < cw - 2; x++) {
      const p = idx(x0 + x, y0 + y, W);
      const lum = (d[p] + d[p + 1] + d[p + 2]) / 3;
      const dl = lum - (bg[0] + bg[1] + bg[2]) / 3;
      if (dl > 14) {
        if (x < bx0) bx0 = x; if (x > bx1) bx1 = x;
        if (y < by0) by0 = y; if (y > by1) by1 = y;
      }
    }
    if (bx1 < 0) { console.log(`${faction}/${i}: empty`); continue; }
    // square crop centered on bbox, inset 3px to kill edge shadow
    const w = bx1 - bx0 + 1, h = by1 - by0 + 1;
    const side = Math.min(w, h) - 6;
    const sx = Math.round(bx0 + (w - side) / 2), sy = Math.round(by0 + (h - side) / 2);
    const out = new PNG({ width: 512, height: 512 });
    for (let y = 0; y < 512; y++) for (let x = 0; x < 512; x++) {
      const fx = sx + (x / 512) * side, fy = sy + (y / 512) * side;
      const ix = Math.floor(fx), iy = Math.floor(fy);
      const tx = fx - ix, ty = fy - iy;
      const s00 = idx(x0 + ix, y0 + iy, W), s10 = idx(x0 + ix + 1, y0 + iy, W);
      const s01 = idx(x0 + ix, y0 + iy + 1, W), s11 = idx(x0 + ix + 1, y0 + iy + 1, W);
      const di = idx(x, y, 512);
      for (let k = 0; k < 3; k++) {
        const a = d[s00 + k] * (1 - tx) + d[s10 + k] * tx;
        const b = d[s01 + k] * (1 - tx) + d[s11 + k] * tx;
        out.data[di + k] = Math.round(a * (1 - ty) + b * ty);
      }
      out.data[di + 3] = 255;
    }
    fs.writeFileSync(path.join(OUT, `${faction}-${FACE_NAMES[i]}.png`), PNG.sync.write(out));
  }
  console.log(`${faction}: 6 faces cropped`);
}
console.log('done');
