// Build units.csv (Excel, UTF-8 BOM), units.json (engine), gallery.html (visual check).
const fs = require('fs');
const path = require('path');
const sheets = require('./db-data.js');
const SRC = 'C:/Users/Administrator/mesbg-assets';
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
const card = r => `<div class="card"><img src="tokens/${r.id}.png" loading="lazy"><div class="id">${r.id}</div><div class="ko">${r.name_ko}</div><div class="meta">${r.faction} · ${r.role} · ${r.weapon} · ${r.base}</div></div>`;
const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><title>에셋 매칭 갤러리</title><style>
body{background:#14161a;color:#e8e4d8;font-family:system-ui;margin:0;padding:24px}
h1{font-size:20px}h2{font-size:15px;margin:28px 0 10px;color:#9db4d0;border-bottom:1px solid #333;padding-bottom:6px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:12px}
.card{background:#1e2126;border-radius:10px;padding:10px;text-align:center}
.card img{width:100%;aspect-ratio:1;object-fit:contain}
.id{font-size:11px;color:#7fa3cc;word-break:break-all;margin-top:6px}
.ko{font-size:13px;font-weight:600;margin-top:2px}
.meta{font-size:10px;color:#8a8f98;margin-top:3px}
</style></head><body>
<h1>MESBG 에셋 매칭 갤러리 — ${rows.length}종</h1>
${['good','evil','terrain'].filter(k=>groups[k]).map(k=>`<h2>${k==='good'?'자유민족 (파랑 림)':k==='evil'?'악의 세력 (빨강 림)':'지형지물'} — ${groups[k].length}</h2><div class="grid">${groups[k].map(card).join('')}</div>`).join('')}
</body></html>`;
fs.writeFileSync(path.join(SRC, 'gallery.html'), html);

console.log(`OK: ${rows.length} rows -> units.csv / units.json / gallery.html`);
