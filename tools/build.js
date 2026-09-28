// tools/build.js — splice src/game.js into LAST-WAR-BAND_v1.9.html between the
// /*__LWB_SRC_BEGIN__*/ ... /*__LWB_SRC_END__*/ markers, then refresh index.html.
// Usage (repo root):  node tools/build.js
// Edit src/game.js, run this, commit both files. The rest of the HTML
// (embedded images, engine, CSS) is left untouched.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HTML = path.join(ROOT, 'LAST-WAR-BAND_v1.9.html');
const SRC = path.join(ROOT, 'src', 'game.js');
const BEGIN = '/*__LWB_SRC_BEGIN__*/';
const END = '/*__LWB_SRC_END__*/';

const html = fs.readFileSync(HTML, 'utf8');
const src = fs.readFileSync(SRC, 'utf8');

const a = html.indexOf(BEGIN), b = html.indexOf(END);
if (a < 0 || b < 0 || b < a) {
  console.error('markers not found in', HTML);
  process.exit(1);
}

const out = html.slice(0, a + BEGIN.length) + '\n' + src.replace(/^\n+|\s+$/g, '') + '\n' + html.slice(b);
fs.writeFileSync(HTML, out);
fs.writeFileSync(path.join(ROOT, 'index.html'), out);
console.log('built', (out.length / 1048576).toFixed(1) + 'MB → LAST-WAR-BAND_v1.9.html + index.html');
