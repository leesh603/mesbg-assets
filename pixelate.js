// Pixelate token PNGs: downscale to a coarse grid, median-cut palette,
// nearest-neighbour upscale. Keeps silhouettes + team rims, flattens the
// painted texture noise that makes units unreadable at game zoom.
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const SRC = process.argv[2] || 'tokens';
const DST = process.argv[3] || 'tokens_px';
const GRID = 80;          // max grid dimension (pixel-art working res)
const COLORS = 30;        // palette size
const UPSCALE = 5;        // final scale factor (nearest)

function medianCut(px, K) {
  let boxes = [px];
  while (boxes.length < K) {
    let bi = -1, best = 0;
    for (let i = 0; i < boxes.length; i++) {
      const b = boxes[i];
      if (b.length < 2) continue;
      let mn = [255, 255, 255], mx = [0, 0, 0];
      for (const p of b) for (let c = 0; c < 3; c++) {
        if (p[c] < mn[c]) mn[c] = p[c];
        if (p[c] > mx[c]) mx[c] = p[c];
      }
      const range = Math.max(mx[0] - mn[0], mx[1] - mn[1], mx[2] - mn[2]);
      const score = range * b.length;
      if (score > best) { best = score; bi = i; }
    }
    if (bi < 0) break;
    const b = boxes[bi];
    let mn = [255, 255, 255], mx = [0, 0, 0];
    for (const p of b) for (let c = 0; c < 3; c++) {
      if (p[c] < mn[c]) mn[c] = p[c];
      if (p[c] > mx[c]) mx[c] = p[c];
    }
    const ch = (mx[0] - mn[0] >= mx[1] - mn[1] && mx[0] - mn[0] >= mx[2] - mn[2]) ? 0
      : (mx[1] - mn[1] >= mx[2] - mn[2]) ? 1 : 2;
    b.sort((p, q) => p[ch] - q[ch]);
    const mid = b.length >> 1;
    boxes.splice(bi, 1, b.slice(0, mid), b.slice(mid));
  }
  return boxes.map(b => {
    let r = 0, g = 0, bl = 0;
    for (const p of b) { r += p[0]; g += p[1]; bl += p[2]; }
    return [Math.round(r / b.length), Math.round(g / b.length), Math.round(bl / b.length)];
  });
}

function pixelate(png) {
  // content bbox
  let x0 = png.width, x1 = -1, y0 = png.height, y1 = -1;
  for (let y = 0; y < png.height; y++) for (let x = 0; x < png.width; x++) {
    if (png.data[(y * png.width + x) * 4 + 3] > 24) {
      if (x < x0) x0 = x; if (x > x1) x1 = x;
      if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
  const s = Math.min(GRID / cw, GRID / ch, 1);
  const gw = Math.max(8, Math.round(cw * s)), gh = Math.max(8, Math.round(ch * s));
  // downsample to grid (average rgb of opaque, alpha average)
  const gp = new Float32Array(gw * gh * 4);
  for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) {
    let r = 0, g = 0, b = 0, a = 0, n = 0;
    const sx0 = Math.floor(gx / s), sx1 = Math.max(sx0 + 1, Math.floor((gx + 1) / s));
    const sy0 = Math.floor(gy / s), sy1 = Math.max(sy0 + 1, Math.floor((gy + 1) / s));
    for (let y = sy0; y < sy1 && y < ch; y++) for (let x = sx0; x < sx1 && x < cw; x++) {
      const i = ((y0 + y) * png.width + x0 + x) * 4, pa = png.data[i + 3];
      if (pa > 0) { r += png.data[i] * pa; g += png.data[i + 1] * pa; b += png.data[i + 2] * pa; a += pa; n++; }
    }
    const o = (gy * gw + gx) * 4;
    if (n && a > 0) {
      const sa = a / n / 255;
      // gamma lift: painted minis are dark — brighten mids before quantizing
      const rr = 255 * Math.pow(r / a / 255, 0.72);
      const gg = 255 * Math.pow(g / a / 255, 0.72);
      const bb = 255 * Math.pow(b / a / 255, 0.72);
      const mean = (rr + gg + bb) / 3;
      gp[o] = Math.min(255, mean + (rr - mean) * 1.3);
      gp[o + 1] = Math.min(255, mean + (gg - mean) * 1.3);
      gp[o + 2] = Math.min(255, mean + (bb - mean) * 1.3);
      gp[o + 3] = sa;
    }
  }
  // palette: split vivid vs dark/muted pixels so the dark base interior can't
  // hog the budget — the figure's colours keep their own palette entries
  const vivid = [], muted = [];
  for (let p = 0; p < gw * gh; p++) {
    const a = gp[p * 4 + 3];
    if (a <= 0.35) continue;
    const r = gp[p * 4], g = gp[p * 4 + 1], b = gp[p * 4 + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    if (mx > 90 && (mx - mn) / mx > 0.22) vivid.push([r, g, b]);
    else muted.push([r, g, b]);
  }
  const pal = [
    ...medianCut(vivid.length ? vivid : [[128, 0, 0]], Math.min(24, Math.max(4, vivid.length >> 4))),
    ...medianCut(muted.length ? muted : [[40, 40, 40]], Math.min(10, Math.max(4, muted.length >> 8))),
  ];
  // saturation + value lift on the palette: pixel art reads better with pop
  for (const c of pal) {
    const mx = Math.max(c[0], c[1], c[2]), mn = Math.min(c[0], c[1], c[2]);
    const mean = (c[0] + c[1] + c[2]) / 3;
    for (let k = 0; k < 3; k++) c[k] = Math.min(255, Math.max(0, Math.round(mean + (c[k] - mean) * 1.22)));
    const v = Math.min(255, mx * 1.06), sc = mx ? v / mx : 1;
    for (let k = 0; k < 3; k++) c[k] = Math.min(255, Math.round(c[k] * sc));
  }
  // map to palette + binary-ish alpha
  const ow = gw * UPSCALE, oh = gh * UPSCALE;
  const out = new PNG({ width: ow, height: oh });
  for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) {
    const o = (gy * gw + gx) * 4;
    const a = gp[o + 3];
    let col = [0, 0, 0], al = 0;
    if (a >= 0.42) {
      al = 255;
      let bd = 1e9;
      for (const c of pal) {
        const dd = (gp[o] - c[0]) ** 2 + (gp[o + 1] - c[1]) ** 2 + (gp[o + 2] - c[2]) ** 2;
        if (dd < bd) { bd = dd; col = c; }
      }
    }
    for (let y = 0; y < UPSCALE; y++) for (let x = 0; x < UPSCALE; x++) {
      const di = ((gy * UPSCALE + y) * ow + gx * UPSCALE + x) * 4;
      out.data[di] = col[0]; out.data[di + 1] = col[1]; out.data[di + 2] = col[2];
      out.data[di + 3] = al;
    }
  }
  // outline ring OUTSIDE the silhouette (rim colours survive): transparent
  // cells touching an opaque cell become a dark halo
  for (let gy = 0; gy < gh; gy++) for (let gx = 0; gx < gw; gx++) {
    const o = (gy * gw + gx) * 4;
    if (gp[o + 3] >= 0.42) continue;
    let edge = false;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
      const nx = gx + dx, ny = gy + dy;
      if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue;
      if (gp[(ny * gw + nx) * 4 + 3] >= 0.42) { edge = true; break; }
    }
    if (!edge) continue;
    for (let y = 0; y < UPSCALE; y++) for (let x = 0; x < UPSCALE; x++) {
      const di = ((gy * UPSCALE + y) * ow + gx * UPSCALE + x) * 4;
      out.data[di] = 24; out.data[di + 1] = 24; out.data[di + 2] = 28;
      out.data[di + 3] = 255;
    }
  }
  return out;
}

fs.mkdirSync(DST, { recursive: true });
const files = fs.readdirSync(SRC).filter(f => f.endsWith('.png'));
const only = process.argv[4] ? process.argv[4].split(',') : null;
for (const f of files) {
  if (only && !only.includes(f.replace('.png', ''))) continue;
  const png = PNG.sync.read(fs.readFileSync(path.join(SRC, f)));
  const out = pixelate(png);
  fs.writeFileSync(path.join(DST, f), PNG.sync.write(out));
  console.log(f, '->', out.width + 'x' + out.height);
}
console.log('done', files.length);
