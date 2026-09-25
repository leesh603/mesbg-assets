// Cut token sprites out of the roster sheets -> transparent PNGs.
// Sheets are dark-slate backgrounds; tokens have a saturated blue/red rim ring.
// Per cell: find the rim ring -> token circle; bg = border color median;
// foreground = inside-circle OR (differs from bg AND connected to the circle).
const { PNG } = require('pngjs');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/Administrator/mesbg-assets';
const OUT = path.join(SRC, 'tokens');
fs.mkdirSync(OUT, { recursive: true });

const sheets = [
  { file: 'lotr-tokens-v1.png', rows: 2, cols: 3, names: ['aragorn', 'gandalf', 'warrior_minas_tirith', 'witchking_foot', 'orc_sword', 'cave_troll'] },
  { file: 'glorfindel-topdown-v2.png', rows: 1, cols: 2, names: ['glorfindel_foot', 'glorfindel_mounted'] },
  { file: 'fellbeast-topdown-v2.png', rows: 1, cols: 1, names: ['witchking_fellbeast'] },
  { file: 'witchking-mounted-topdown-v1.png', rows: 1, cols: 1, names: ['witchking_mounted'] },
  { file: 'roster-enemy-heroes-v1.png', rows: 2, cols: 3, names: ['witchking_mounted_sheet', 'witchking_foot_mace', 'nazgul_sword', 'saruman', 'orc_shaman', 'orc_captain'] },
  { file: 'roster-enemy-troops-v1.png', rows: 2, cols: 3, names: ['orc_spearman', 'orc_archer', 'uruk_swordshield', 'morannon_orc', 'warg_rider', 'haradrim_spearman'] },
  { file: 'roster-free-heroes-v1.png', rows: 2, cols: 3, names: ['legolas', 'gimli', 'boromir', 'eowyn', 'frodo', 'elrond'] },
  { file: 'roster-free-troops-v1.png', rows: 2, cols: 3, names: ['gondor_archer', 'elf_swordsman', 'dwarf_guardian', 'rohan_royal_guard', 'ithilien_ranger', 'rohan_rider'] },
  { file: 'roster-monsters-v1.png', rows: 2, cols: 3, names: ['balrog', 'mountain_troll', 'shelob', 'barrow_wight', 'moria_goblin', 'uruk_berserker'] },
  { file: 'roster-sauron-nazgul-v1.png', rows: 2, cols: 3, names: ['sauron', 'nazgul_sword_2', 'nazgul_mace', 'nazgul_mounted', 'morgul_knight', 'dwimmerlaik'] },
  { file: 'roster-minastirith-variants-v1.png', rows: 2, cols: 3, names: ['mt_swordshield', 'mt_spear', 'mt_spearshield', 'mt_bowman', 'mt_banner', 'mt_fountain_guard'] },
  { file: 'roster-orc-variants-v1.png', rows: 2, cols: 3, names: ['orc_sword2', 'orc_swordshield', 'orc_spear2', 'orc_twohanded', 'orc_bow', 'orc_drummer'] },
  { file: 'roster-dwarf-variants-v1.png', rows: 2, cols: 3, names: ['dwarf_axeshield', 'dwarf_2haxe', 'dwarf_ranger', 'khazad_guard', 'iron_guard', 'dwarf_banner'] },
  { file: 'roster-elf-variants-v1.png', rows: 2, cols: 3, names: ['elf_swordshield', 'elf_spear', 'elf_bow', 'elf_glaive', 'galadhrim_warrior', 'elf_knight'] },
  { file: 'roster-uruk-variants-v1.png', rows: 2, cols: 3, names: ['uruk_swordshield2', 'uruk_pike', 'uruk_crossbow', 'uruk_scout', 'uruk_berserker2', 'uruk_banner'] },
  { file: 'roster-haradrim-easterling-v1.png', rows: 2, cols: 3, names: ['haradrim_spear', 'haradrim_bow', 'haradrim_priest', 'easterling_phalanx', 'easterling_swordshield', 'easterling_kataphrakt'] },
  { file: 'roster-gondor-exp-v1.png', rows: 2, cols: 3, names: ['dol_amroth_knight', 'gondor_knight', 'osgiliath_veteran', 'lossarnach_axeman', 'citadel_guard', 'pelennor_militia'] },
  { file: 'roster-rohan-exp-v1.png', rows: 2, cols: 3, names: ['rohan_swordshield', 'rohan_spear', 'rohan_archer', 'eomer', 'rohan_outrider', 'rohan_banner'] },
  { file: 'roster-mordor-elite-v1.png', rows: 2, cols: 3, names: ['black_numenorean', 'black_numenorean_mounted', 'orc_tracker', 'war_troll', 'black_guard', 'orc_taskmaster'] },
  { file: 'roster-goblin-v1.png', rows: 2, cols: 3, names: ['goblin_spear', 'goblin_shield', 'goblin_bow', 'goblin_prowler', 'goblin_king', 'goblin_shaman'] },
  { file: 'roster-isengard-exp-v1.png', rows: 2, cols: 3, names: ['dunlending_warrior', 'dunlending_huscarl', 'warg', 'uruk_sapper', 'uruk_scout_archer', 'crebain_swarm'] },
  { file: 'roster-free-special-v1.png', rows: 2, cols: 3, names: ['hobbit_shirriff', 'hobbit_bounder', 'great_eagle', 'ent', 'beorning', 'ranger_north'] },
  { file: 'roster-free-heroes-exp-v1.png', rows: 2, cols: 3, names: ['theoden', 'faramir', 'haldir', 'galadriel', 'gamling', 'samwise'] },
  { file: 'roster-evil-heroes-exp-v1.png', rows: 2, cols: 3, names: ['mouth_of_sauron', 'gothmog', 'lurtz', 'sharku', 'grima', 'khamul'] },
  { file: 'terrain-natural-v1.png', rows: 2, cols: 3, names: ['terr_rock_outcrop', 'terr_standing_stones', 'terr_pine_copse', 'terr_oak_tree', 'terr_dead_tree', 'terr_hedgerow'] },
  { file: 'terrain-structures-v1.png', rows: 2, cols: 3, names: ['terr_ruined_wall', 'terr_ruined_tower', 'terr_gondor_house', 'terr_rohan_hall', 'terr_orc_camp', 'terr_barrow'] },
];

function idx(x, y, w) { return (y * w + x) << 2; }
function sat(px) { const mx = Math.max(px[0], px[1], px[2]); const mn = Math.min(px[0], px[1], px[2]); return mx === 0 ? 0 : (mx - mn) / mx; }
function isRim(d, i) {
  const r = d[i], g = d[i + 1], b = d[i + 2];
  const s = sat([r, g, b]);
  if (s < 0.45) return false;
  const mx = Math.max(r, g, b);
  if (mx < 60) return false;
  // blue rim or red rim
  return (b > r + 25) || (r > g + 30 && r > b + 30);
}
function dist(px, bg) {
  return Math.sqrt((px[0] - bg[0]) ** 2 + (px[1] - bg[1]) ** 2 + (px[2] - bg[2]) ** 2);
}

function medianBg(png, cx0, cy0, cw, ch, W) {
  const samples = [];
  const step = 4;
  for (let x = 0; x < cw; x += step) { for (const y of [0, 1, ch - 2, ch - 1]) samples.push(idx(cx0 + x, cy0 + y, W)); }
  for (let y = 0; y < ch; y += step) { for (const x of [0, 1, cw - 2, cw - 1]) samples.push(idx(cx0 + x, cy0 + y, W)); }
  const rs = [], gs = [], bs = [];
  for (const i of samples) { rs.push(png.data[i]); gs.push(png.data[i + 1]); bs.push(png.data[i + 2]); }
  const med = a => a.sort((p, q) => p - q)[Math.floor(a.length / 2)];
  return [med(rs), med(gs), med(bs)];
}

function cutToken(png, cx0, cy0, cw, ch, name) {
  const d = png.data, W = png.width;
  const bg = medianBg(png, cx0, cy0, cw, ch, W);
  const TH = 26;
  const fg = new Uint8Array(cw * ch);
  const rim = new Uint8Array(cw * ch);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const i = idx(cx0 + x, cy0 + y, W);
    const p = y * cw + x;
    const px = [d[i], d[i + 1], d[i + 2]];
    if (dist(px, bg) > TH) fg[p] = 1;
    if (isRim(d, i)) rim[p] = 1;
  }
  // rim circle: bbox of rim pixels
  let rx0 = cw, rx1 = -1, ry0 = ch, ry1 = -1, rn = 0;
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (rim[y * cw + x]) {
    rn++; if (x < rx0) rx0 = x; if (x > rx1) rx1 = x; if (y < ry0) ry0 = y; if (y > ry1) ry1 = y;
  }
  let cx = cw / 2, cy = ch / 2, cr = Math.min(cw, ch) * 0.40;
  if (rn > 40) {
    cx = (rx0 + rx1) / 2; cy = (ry0 + ry1) / 2;
    cr = Math.max(rx1 - rx0, ry1 - ry0) / 2;
  }
  // inside-circle = foreground
  const cr2 = (cr * 1.02) ** 2;
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const dx = x - cx, dy = y - cy;
    if (dx * dx + dy * dy <= cr2) fg[y * cw + x] = 1;
  }
  // keep fg components overlapping circle (for weapons sticking out)
  const lab = new Int32Array(cw * ch).fill(-1);
  let nc = 0;
  const stack = [];
  for (let p = 0; p < cw * ch; p++) {
    if (!fg[p] || lab[p] >= 0) continue;
    const comp = nc++;
    stack.push(p); lab[p] = comp;
    while (stack.length) {
      const q = stack.pop(); const qx = q % cw, qy = (q / cw) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = qx + dx, ny = qy + dy;
        if (nx < 0 || ny < 0 || nx >= cw || ny >= ch) continue;
        const np = ny * cw + nx;
        if (fg[np] && lab[np] < 0) { lab[np] = comp; stack.push(np); }
      }
    }
  }
  const cR = cr * 1.12;
  const good = new Set();
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const l = lab[y * cw + x]; if (l < 0) continue;
    const dx = x - cx, dy = y - cy;
    if (dx * dx + dy * dy <= cR * cR) good.add(l);
  }
  const keep = new Uint8Array(cw * ch);
  for (let p = 0; p < cw * ch; p++) if (lab[p] >= 0 && good.has(lab[p])) keep[p] = 1;
  // also keep interior of circle even if same color as bg
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    const dx = x - cx, dy = y - cy;
    if (dx * dx + dy * dy <= cr2) keep[y * cw + x] = 1;
  }
  // feather alpha: erode then 3x3 box blur
  const er = new Uint8Array(cw * ch);
  for (let y = 1; y < ch - 1; y++) for (let x = 1; x < cw - 1; x++) {
    const p = y * cw + x;
    if (keep[p] && keep[p - 1] && keep[p + 1] && keep[p - cw] && keep[p + cw]) er[p] = 1;
  }
  const alpha = new Float32Array(cw * ch);
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
    let s = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < cw && ny < ch) s += er[ny * cw + nx];
    }
    alpha[y * cw + x] = s / 9;
  }
  // bbox of keep
  let bx0 = cw, bx1 = -1, by0 = ch, by1 = -1;
  for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) if (keep[y * cw + x]) {
    if (x < bx0) bx0 = x; if (x > bx1) bx1 = x; if (y < by0) by0 = y; if (y > by1) by1 = y;
  }
  if (bx1 < 0) { console.log(`  !! ${name}: empty mask`); return; }
  const pad = 6;
  bx0 = Math.max(0, bx0 - pad); by0 = Math.max(0, by0 - pad);
  bx1 = Math.min(cw - 1, bx1 + pad); by1 = Math.min(ch - 1, by1 + pad);
  const ow = bx1 - bx0 + 1, oh = by1 - by0 + 1;
  const out = new PNG({ width: ow, height: oh });
  for (let y = 0; y < oh; y++) for (let x = 0; x < ow; x++) {
    const si = idx(cx0 + bx0 + x, cy0 + by0 + y, W);
    const di = idx(x, y, ow);
    out.data[di] = d[si]; out.data[di + 1] = d[si + 1]; out.data[di + 2] = d[si + 2];
    out.data[di + 3] = Math.round(alpha[(by0 + y) * cw + (bx0 + x)] * 255);
  }
  fs.writeFileSync(path.join(OUT, name + '.png'), PNG.sync.write(out));
  console.log(`  ${name} -> ${ow}x${oh}`);
}

for (const s of sheets) {
  const fp = path.join(SRC, s.file);
  if (!fs.existsSync(fp)) { console.log(`MISSING ${s.file}`); continue; }
  const png = PNG.sync.read(fs.readFileSync(fp));
  const cw = Math.floor(png.width / s.cols), ch = Math.floor(png.height / s.rows);
  console.log(`${s.file} ${png.width}x${png.height} cells ${cw}x${ch}`);
  s.names.forEach((name, i) => {
    const r = Math.floor(i / s.cols), c = i % s.cols;
    cutToken(png, c * cw, r * ch, cw, ch, name);
  });
}
console.log('done');
