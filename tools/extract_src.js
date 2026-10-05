// tools/extract_src.js — pull the marked game-code region out of index.html
// back into src/game.js.
// Use this if the HTML was edited directly and src/game.js needs re-syncing.
// Normal flow is the opposite: edit src/game.js → node tools/build.js.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const HTML = path.join(ROOT, 'index.html');
const SRC = path.join(ROOT, 'src', 'game.js');
const BEGIN = '/*__LWB_SRC_BEGIN__*/';
const END = '/*__LWB_SRC_END__*/';

const html = fs.readFileSync(HTML, 'utf8');
const a = html.indexOf(BEGIN), b = html.indexOf(END);
if (a < 0 || b < 0 || b < a) {
  console.error('markers not found in', HTML);
  process.exit(1);
}

const src = html.slice(a + BEGIN.length, b).replace(/^\n+|\s+$/g, '');
fs.writeFileSync(SRC, src + '\n');
console.log('extracted', src.length, 'bytes → src/game.js');
