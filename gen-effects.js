// gen-effects.js — procedurally renders attack effect sprites into effects/
// Usage: node gen-effects.js   (needs pngjs)
const fs = require('fs');
const { PNG } = require('pngjs');

const S = 128, OUT = 'effects';
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

const mk = () => { const p = new PNG({ width: S, height: S }); return p; };
const put = (p, x, y, r, g, b, a) => {
  x |= 0; y |= 0; if (x < 0 || y < 0 || x >= S || y >= S || a <= 0) return;
  const i = (y * S + x) * 4, w = Math.min(1, a);
  const inv = 1 - w; // over-composite
  p.data[i] = p.data[i] * inv + r * w;
  p.data[i + 1] = p.data[i + 1] * inv + g * w;
  p.data[i + 2] = p.data[i + 2] * inv + b * w;
  p.data[i + 3] = Math.min(255, p.data[i + 3] + a * 255);
};
const save = (p, n) => { fs.writeFileSync(`${OUT}/${n}.png`, PNG.sync.write(p)); console.log(n); };

// ---- fx_slash: crescent arc, bright head fading to tail ----
{
  const p = mk(), cx = 64, cy = 64;
  const th0 = -65 * Math.PI / 180, th1 = 55 * Math.PI / 180;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy);
    let th = Math.atan2(dy, dx);
    if (th < th0 || th > th1) continue;
    const t = (th - th0) / (th1 - th0);              // 0 tail -> 1 head
    const band = Math.exp(-(((r - 48) / 8) ** 2));   // radial core
    const a = Math.pow(t, 1.5) * band * 0.95;
    if (a < 0.01) continue;
    const core = Math.exp(-(((r - 48) / 4) ** 2)) * Math.pow(t, 2);
    put(p, x, y, 200 + 55 * core, 220 + 35 * core, 255, a);
  }
  save(p, 'fx_slash');
}

// ---- fx_thrust: three converging speed streaks ----
{
  const p = mk();
  const rows = [{ y: 52, w: 2.6 }, { y: 64, w: 3.6 }, { y: 77, w: 2.2 }];
  for (const { y, w } of rows) for (let yy = 0; yy < S; yy++) for (let x = 8; x < 120; x++) {
    const t = x / 120;                              // head at right
    const ldist = Math.abs(yy - y);
    const a = Math.pow(t, 2.2) * Math.exp(-((ldist / w) ** 2)) * 0.9;
    if (a < 0.01) continue;
    put(p, x, yy, 210, 230, 255, a);
  }
  save(p, 'fx_thrust');
}

// ---- fx_cast: starburst + glow + sparkles ----
{
  const p = mk(), cx = 64, cy = 60;
  let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const rays = [];
  for (let i = 0; i < 10; i++) rays.push(i * Math.PI / 5 + rnd() * 0.2);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy);
    const glow = Math.exp(-(((d / 30) ** 2))) * 0.5;
    let ray = 0;
    const th = Math.atan2(dy, dx);
    for (const ra of rays) {
      let dd = Math.abs(((th - ra + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
      const lw = 0.06 + 0.03 * Math.sin(d * 0.3);
      if (dd < lw) ray = Math.max(ray, (1 - dd / lw) * Math.exp(-(d / 42)) * 0.9);
    }
    const a = glow + ray;
    if (a < 0.01) continue;
    const hot = Math.exp(-(((d / 16) ** 2)));
    put(p, x, y, 220 + 35 * hot, 190 + 60 * hot, 255, Math.min(1, a));
  }
  for (let i = 0; i < 26; i++) {
    const sx = cx + (rnd() - 0.5) * 96, sy = cy + (rnd() - 0.5) * 96;
    const rr = 0.7 + rnd() * 1.8, bb = 0.5 + rnd() * 0.5;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const dd = Math.hypot(dx, dy);
      if (dd > rr) continue;
      put(p, sx + dx, sy + dy, 255, 255, 255, bb * (1 - dd / rr));
    }
  }
  save(p, 'fx_cast');
}

// ---- fx_smash: ground shockwave ellipse ring + dust ----
{
  const p = mk(), cx = 64, cy = 78, rx = 55, ry = 26;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const ex = (x - cx) / rx, ey = (y - cy) / ry, e = Math.hypot(ex, ey);
    const ring = Math.exp(-(((e - 1) / 0.10) ** 2)) * 0.9;
    const dust = e < 0.95 ? 0.10 * (1 - e) : 0;
    const a = ring + dust;
    if (a < 0.01) continue;
    put(p, x, y, 235, 230, 220, a);
  }
  save(p, 'fx_smash');
}

// ---- fx_pounce: three parallel claw slashes ----
{
  const p = mk();
  for (let i = 0; i < 3; i++) {
    const cx = 38 + i * 26, cy = 78 - i * 16;
    const th0 = -80 * Math.PI / 180, th1 = -5 * Math.PI / 180;
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const dx = x - cx, dy = y - cy, r = Math.hypot(dx, dy);
      const th = Math.atan2(dy, dx);
      if (th < th0 || th > th1) continue;
      const t = (th - th0) / (th1 - th0);
      const band = Math.exp(-(((r - 40) / 5.5) ** 2));
      const a = Math.pow(1 - t, 1.2) * band * 0.9;  // bright at low-θ end
      if (a < 0.01) continue;
      put(p, x, y, 255, 235, 225, a);
    }
  }
  save(p, 'fx_pounce');
}

// ---- fx_shoot: arrow + motion trail ----
{
  const p = mk(), cy = 64;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    let a = 0;
    // shaft x 40..95
    if (x >= 40 && x <= 95) a = Math.exp(-(((y - cy) / 1.6) ** 2)) * 0.9;
    // head triangle x 95..112
    if (x > 95 && x <= 112) { const hw = (112 - x) / 6; if (Math.abs(y - cy) < hw) a = 0.95; }
    // fletching
    if (x >= 34 && x < 40) { const hw = 3 + (40 - x) * 0.4; if (Math.abs(y - cy) < hw) a = 0.7; }
    // trail streaks behind
    if (x < 34) { const ldist = Math.abs(y - cy); a = Math.max(a, Math.exp(-(((ldist) / 2.2) ** 2)) * (1 - x / 34) * 0.5); }
    if (a < 0.01) continue;
    put(p, x, y, 230, 240, 255, a);
  }
  save(p, 'fx_shoot');
}

// ---- fx_rally: expanding morale ring ----
{
  const p = mk(), cx = 64, cy = 64;
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const d = Math.hypot(x - cx, y - cy);
    const ring = Math.exp(-(((d - 42) / 6) ** 2)) * 0.85;
    const ring2 = Math.exp(-(((d - 26) / 4) ** 2)) * 0.4;
    const a = ring + ring2;
    if (a < 0.01) continue;
    put(p, x, y, 255, 235, 180, a);
  }
  save(p, 'fx_rally');
}
