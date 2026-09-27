const fs = require('fs');
let s = fs.readFileSync('build-db.js', 'utf8');
const old = 'const h = dispH(r);\r\n  return';
if (!s.includes(old)) { console.log('NOT FOUND'); process.exit(1); }
const add = `const h = dispH(r);\r\n  const st = r.stats ? '<div class="meta" style="color:#d8c98a">F' + r.stats.f + ' S' + r.stats.s + ' D' + r.stats.d + ' A' + r.stats.a + ' W' + r.stats.w + ' C' + r.stats.c + ' · M' + r.stats.might + ' W' + r.stats.will + ' F' + r.stats.fate + '</div>' : '';\r\n  const rl = (r.rules && r.rules.length) ? '<div class="meta" style="color:#9a8ac0">' + r.rules.join(' · ') + '</div>' : '';\r\n  return`;
s = s.replace(old, add);
// append ${st}${rl} before the final card close
s = s.replace('r.traits.join("·") : ""}</div></div>`;', 'r.traits.join("·") : ""}</div>\' + st + \'' + "' + rl + '" + '</div>`;');
fs.writeFileSync('build-db.js', s);
console.log('done');
