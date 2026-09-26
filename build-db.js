// Build units.csv (Excel, UTF-8 BOM), units.json (engine), gallery.html (visual check).
const fs = require('fs');
const path = require('path');
const sheets = require('./db-data.js');
const SRC = __dirname;
const TOKENS = path.join(SRC, 'tokens');

const rows = [];
for (const s of sheets) {
  for (const u of s.units) {
    const [id, ko, en, ov = {}] = u;
    rows.push({
      id,
      name_ko: ko,
      name_en: en,
      side: ov.side ?? s.side ?? '',
      faction: ov.faction ?? s.faction ?? '',
      role: ov.role ?? s.role ?? '',
      weapon: ov.weapon ?? s.weapon ?? '',
      base: ov.base ?? s.base ?? '',
      sheet: s.sheet,
      file: `tokens/${id}.png`,
    });
  }
}

// sanity: every row has a PNG; every PNG has a row
const pngs = new Set(fs.readdirSync(TOKENS).filter(f => f.endsWith('.png')));
const ids = new Set(rows.map(r => r.id));
const missingFile = rows.filter(r => !pngs.has(r.id + '.png')).map(r => r.id);
const missingRow = [...pngs].filter(f => !ids.has(f.replace('.png', ''))).map(f => f.replace('.png', ''));
if (missingFile.length) console.log('DB rows without PNG:', missingFile.join(', '));
if (missingRow.length) console.log('PNGs without DB row:', missingRow.join(', '));

const COLS = ['id', 'name_ko', 'name_en', 'side', 'faction', 'role', 'weapon', 'base', 'sheet', 'file'];
const esc = v => /[",\n]/.test(v) ? '"' + v.replace(/"/g, '""') + '"' : v;
const csv = '﻿' + COLS.join(',') + '\n' + rows.map(r => COLS.map(c => esc(String(r[c]))).join(',')).join('\n') + '\n';
fs.writeFileSync(path.join(SRC, 'units.csv'), csv);

fs.writeFileSync(path.join(SRC, 'units.json'), JSON.stringify({ version: 1, count: rows.length, units: rows }, null, 2));

// dice manifest
const factions = ['minastirith', 'mordor', 'isengard', 'rohan', 'elf', 'dwarf', 'haradrim'];
const dice = factions.map(f => ({ faction: f, faces: { 1: `dice-faces/${f}-1.png`, 2: `dice-faces/${f}-2.png`, 3: `dice-faces/${f}-3.png`, 4: `dice-faces/${f}-4.png`, 5: `dice-faces/${f}-5.png`, 6: `dice-faces/${f}-emblem.png` } }));
fs.writeFileSync(path.join(SRC, 'dice.json'), JSON.stringify({ dice }, null, 2));

// gallery.html — visual check of id <-> image matching
const groups = {};
for (const r of rows) { (groups[r.side] ??= []).push(r); }
// Display height maps to base size so relative scale reads at a glance.
const BASE_H = { S: 56, M: 76, L: 100, XL: 140, XXL: 190 };
const ROLE_KO = { hero: '영웅', infantry: '보병', cavalry: '기병', monster: '괴물', bigmonster: '대형괴물', support: '지원/기수', terrain: '지형지물' };
const ROLE_ORDER = ['hero', 'infantry', 'cavalry', 'monster', 'bigmonster', 'support', 'terrain'];
// display group: mounted heroes and XL riders group under 기병, XXL monsters
// under 대형괴물 — matches how the user browses (by what they see on the map)
const grp = r => r.role === 'monster' ? (r.base === 'XXL' ? 'bigmonster' : 'monster')
  : (r.role === 'cavalry' || (r.base === 'XL' && r.role !== 'monster')) ? 'cavalry'
  : r.role;
const card = r => {
  const h = BASE_H[r.base] || 90;
  return `<div class="card"><div class="fig" style="height:${h}px"><img src="tokens/${r.id}.png" loading="lazy" style="max-height:${h}px;max-width:200px;height:auto;width:auto"></div><div class="id">${r.id}</div><div class="ko">${r.name_ko}</div><div class="meta">${r.faction} · ${r.role} · ${r.weapon} · ${r.base}</div></div>`;
};
const roleGrid = list => ROLE_ORDER.filter(ro => list.some(r => grp(r) === ro)).map(ro =>
  `<h3>${ROLE_KO[ro] || ro} — ${list.filter(r => grp(r) === ro).length}</h3><div class="grid">${list.filter(r => grp(r) === ro).map(card).join('')}</div>`).join('');
const TABS = [['good', '자유민족'], ['evil', '악의 세력'], ['terrain', '지형지물']].filter(([k]) => groups[k]);
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>에셋 매칭 갤러리</title><style>
body{background:#14161a;color:#e8e4d8;font-family:system-ui;margin:0;padding:24px}
h1{font-size:20px}h2{font-size:15px;margin:28px 0 10px;color:#9db4d0;border-bottom:1px solid #333;padding-bottom:6px}
h3{font-size:13px;margin:18px 0 8px;color:#c8b890}
.tabs{display:flex;gap:8px;margin:14px 0 4px;position:sticky;top:0;background:#14161a;padding:8px 0;z-index:10}
.tabs button{background:#1e2126;border:1px solid #333;color:#e8e4d8;padding:8px 18px;border-radius:8px;cursor:pointer;font-size:14px}
.tabs button.on{background:#2d4a6b;border-color:#4a7bb5}
.grid{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-end}
.card{background:#1e2126;border-radius:10px;padding:12px;text-align:center}
.fig{display:flex;align-items:flex-end;justify-content:center}
.card img{image-rendering:pixelated;width:auto;object-fit:contain;display:block}
.id{font-size:11px;color:#7fa3cc;word-break:break-all;margin-top:8px;max-width:170px}
.ko{font-size:13px;font-weight:600;margin-top:2px}
.meta{font-size:10px;color:#8a8f98;margin-top:3px}
</style></head><body>
<h1>MESBG 에셋 매칭 갤러리 — ${rows.length}종 <button id="vsw" onclick="let p=document.querySelectorAll('img'),pt=document.body.dataset.pt!=='1';document.body.dataset.pt=pt?'1':'0';p.forEach(i=>i.src=i.src.replace(pt?'tokens/':'tokens_painted/',pt?'tokens_painted/':'tokens/'));this.textContent=pt?'보는중: 도색 (클릭→픽셀)':'보는중: 픽셀 (클릭→도색)';" style="font-size:12px;padding:4px 10px;cursor:pointer">보는중: 픽셀 (클릭→도색)</button></h1>
<div class="tabs">${TABS.map(([k, n], i) => `<button data-t="${k}" class="${i ? '' : 'on'}" onclick="document.querySelectorAll('.tabs button').forEach(b=>b.classList.remove('on'));this.classList.add('on');document.querySelectorAll('.tabpane').forEach(p=>p.style.display=p.dataset.t===this.dataset.t?'block':'none')">${n} — ${groups[k].length}</button>`).join('')}</div>
${TABS.map(([k, n], i) => `<div class="tabpane" data-t="${k}" style="display:${i ? 'none' : 'block'}"><h2>${n} — ${groups[k].length}</h2>${roleGrid(groups[k])}</div>`).join('')}
</body></html>`;
fs.writeFileSync(path.join(SRC, 'gallery.html'), html);

console.log(`OK: ${rows.length} rows -> units.csv / units.json / gallery.html`);
