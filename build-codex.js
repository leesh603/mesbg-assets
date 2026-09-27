// Build codex.html — in-game unit codex (card UI) from units.json
const fs = require('fs');
const path = require('path');
const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'units.json'), 'utf8'));

const ROLE_KO = { hero: '영웅', soldier: '보병', support: '지원', monster: '괴수', terrain: '지형' };
const SIDE_KO = { good: '자유민족', evil: '악의 세력' };

const units = db.units.filter(u => u.role !== 'terrain');
const dataJson = JSON.stringify(units).replace(/</g, '\\u003c');

const html = `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>유닛 도감</title><style>
:root{--bg:#0f120c;--panel:#1a1d14;--panel2:#232718;--line:#5d5233;--gold:#c9a959;--gold2:#efe0ae;--txt:#ece4cd;--dim:#a89d7f;--good:#8fb8d9;--evil:#d98f7d;--leaf:#8fae6e}
*{box-sizing:border-box;margin:0}
body{background:radial-gradient(ellipse at 50% -5%,#26301b 0%,#141a10 45%,#0f120c 100%);color:var(--txt);font-family:'Malgun Gothic','Apple SD Gothic Neo',Georgia,serif;min-height:100vh}
header{padding:16px 22px;border-bottom:1px solid var(--line);display:flex;align-items:center;gap:18px;flex-wrap:wrap;position:sticky;top:0;background:rgba(15,18,12,.94);backdrop-filter:blur(5px);z-index:5;box-shadow:0 4px 18px rgba(0,0,0,.5)}
header h1{font-family:Georgia,'Times New Roman',serif;font-size:20px;color:var(--gold2);letter-spacing:3px;text-shadow:0 0 14px rgba(201,169,89,.35);font-variant:small-caps}
header h1::before{content:'❧ ';color:var(--gold)}
.filters{display:flex;gap:6px;flex-wrap:wrap}
.filters button{background:var(--panel);border:1px solid var(--line);color:var(--dim);padding:6px 14px;border-radius:3px;cursor:pointer;font-size:12px;letter-spacing:.5px;transition:all .15s}
.filters button:hover{color:var(--gold2);border-color:var(--gold)}
.filters button.on{background:linear-gradient(180deg,#d4b567,#a98c3f);color:#1a150f;border-color:var(--gold);font-weight:700}
.filters input{background:var(--panel);border:1px solid var(--line);color:var(--txt);padding:6px 12px;border-radius:3px;font-size:12px;width:170px}
.filters input:focus{outline:none;border-color:var(--gold)}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(135px,1fr));gap:12px;padding:18px 22px}
.uc{background:linear-gradient(170deg,#20241a,#181b12);border:1px solid var(--line);border-radius:8px;padding:12px 8px 9px;text-align:center;cursor:pointer;transition:border-color .15s,transform .15s,box-shadow .15s;position:relative}
.uc::before{content:'';position:absolute;inset:3px;border:1px solid rgba(201,169,89,.18);border-radius:5px;pointer-events:none}
.uc:hover{border-color:var(--gold);transform:translateY(-2px);box-shadow:0 6px 18px rgba(0,0,0,.5)}
.uc .t{height:96px;display:flex;align-items:flex-end;justify-content:center}
.uc img{max-height:96px;max-width:100px;image-rendering:auto;filter:drop-shadow(0 4px 5px rgba(0,0,0,.7))}
.uc .n{font-size:12px;color:var(--txt);margin-top:7px;font-weight:600}
.uc .r{font-size:10px;color:var(--dim);margin-top:2px}
.uc .dot{display:inline-block;width:7px;height:7px;border-radius:50%;margin-right:4px;vertical-align:1px}
.ov{position:fixed;inset:0;background:rgba(8,10,6,.8);display:none;align-items:center;justify-content:center;z-index:10;padding:20px}
.ov.open{display:flex}
.card-big{background:linear-gradient(165deg,#252a1c,#15190f 70%);border:2px solid var(--gold);border-radius:10px;width:350px;max-width:95vw;padding:0 0 14px;box-shadow:0 0 50px rgba(0,0,0,.85),inset 0 0 40px rgba(201,169,89,.05);position:relative}
.card-big::before{content:'';position:absolute;inset:5px;border:1px solid rgba(201,169,89,.35);border-radius:7px;pointer-events:none}
.card-big .head{background:linear-gradient(90deg,#3d361f,#2a2e1e);background:linear-gradient(90deg,#3d361f,#2a2e1e);padding:12px 16px;border-bottom:1px solid var(--gold);border-radius:8px 8px 0 0}
.card-big .head .nm{font-family:Georgia,serif;font-size:17px;font-weight:700;color:var(--gold2);letter-spacing:1px}
.card-big .head .en{font-size:11px;color:var(--dim);font-style:italic}
.card-big .fig{height:160px;display:flex;align-items:flex-end;justify-content:center;padding:10px;background:radial-gradient(ellipse at center,rgba(201,169,89,.07),transparent 70%)}
.card-big .fig img{max-height:155px;filter:drop-shadow(0 6px 9px rgba(0,0,0,.8))}
.stats{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:10px 16px}
.stat{background:rgba(0,0,0,.35);border:1px solid var(--line);border-radius:4px;text-align:center;padding:6px 0}
.stat .k{font-size:9px;color:var(--dim);font-family:Georgia,serif}
.stat .v{font-size:15px;font-weight:700;color:var(--gold2);font-family:Georgia,serif}
.mwf{display:flex;gap:6px;padding:0 16px 10px;justify-content:center}
.mwf span{font-size:11px;padding:4px 12px;border-radius:12px;border:1px solid var(--line);font-family:Georgia,serif;letter-spacing:.5px}
.mwf .m{color:#e8cf8f;border-color:#8a6f3a}.mwf .wl{color:#8fb8e8;border-color:#3a5a8a}.mwf .ft{color:#9adc9a;border-color:#3a8a4a}
.info{padding:8px 16px;font-size:12px;color:var(--dim);line-height:1.7}
.info b{color:var(--gold2)}
.rules{padding:4px 16px}
.rule{display:inline-block;font-size:10px;color:#c9b8e8;border:1px solid #5a4a7a;background:#221d30;padding:3px 9px;border-radius:10px;margin:2px}
.trait{display:inline-block;font-size:10px;color:#e8a87d;border:1px solid #7a5a3a;background:#30251c;padding:3px 9px;border-radius:10px;margin:2px}
.x{position:absolute;top:8px;right:12px;font-size:22px;color:var(--dim);cursor:pointer;background:none;border:none;z-index:2}
.x:hover{color:var(--gold2)}
</style></head><body>
<header><h1>유닛 도감</h1><div class="filters" id="fl">
<input id="q" placeholder="이름 검색…" oninput="render()">
<button class="on" data-f="all" onclick="setF('all',this)">전체</button>
<button data-f="good" onclick="setF('good',this)">자유민족</button>
<button data-f="evil" onclick="setF('evil',this)">악의 세력</button>
<button data-f="hero" onclick="setF('hero',this)">영웅</button>
<button data-f="soldier" onclick="setF('soldier',this)">보병</button>
<button data-f="monster" onclick="setF('monster',this)">괴수</button>
<button data-f="stats" onclick="setF('stats',this)">스탯 보유</button>
</div></header>
<div class="grid" id="g"></div>
<div class="ov" id="ov" onclick="if(event.target===this)close()"><div class="card-big" id="cb"></div></div>
<script>
const U=${dataJson};
let F='all';
const RK=${JSON.stringify(ROLE_KO)},SK=${JSON.stringify(SIDE_KO)};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
function match(u){
 if(F==='stats')return!!u.stats;
 if(F==='good'||F==='evil')return u.side===F;
 if(F!=='all')return u.role===F;
 return true;
}
function render(){
 const q=(document.getElementById('q').value||'').toLowerCase();
 document.getElementById('g').innerHTML=U.filter(u=>match(u)&&(u.name_ko+u.name_en+u.id).toLowerCase().includes(q)).map(u=>
 '<div class="uc" onclick="openCard(\\''+u.id+'\\')"><div class="t"><img src="tokens/'+u.id+'.png" loading="lazy"></div><div class="n"><span class="dot" style="background:'+(u.side==='evil'?'var(--evil)':'var(--good)')+'"></span>'+esc(u.name_ko)+'</div><div class="r">'+(RK[u.role]||u.role)+' · '+esc(u.faction)+'</div></div>').join('');
}
function openCard(id){
 const u=U.find(x=>x.id===id);if(!u)return;
 const s=u.stats;
 document.getElementById('cb').innerHTML=
 '<button class="x" onclick="close()">×</button>'+
 '<div class="head"><div class="nm">'+esc(u.name_ko)+'</div><div class="en">'+esc(u.name_en)+' · '+(SK[u.side]||'')+'</div></div>'+
 '<div class="fig"><img src="tokens/'+u.id+'.png"></div>'+
 (s?'<div class="stats">'+[['F','전투'],['S','힘'],['D','방어'],['A','공격'],['W','체력'],['C','용기']].map(([k])=>'<div class="stat"><div class="k">'+k+'</div><div class="v">'+s[k.toLowerCase()==='f'?'f':k.toLowerCase()]+'</div></div>').join('')+'<div class="stat"><div class="k">베이스</div><div class="v" style="font-size:11px">'+esc(u.base_mm||u.base)+'</div></div></div>'+
 '<div class="mwf"><span class="m">Might '+s.might+'</span><span class="wl">Will '+s.will+'</span><span class="ft">Fate '+s.fate+'</span></div>'
 :'<div class="info" style="text-align:center;padding:14px">병사 유닛 · 베이스 '+esc(u.base_mm||u.base)+'</div>')+
 '<div class="info"><b>'+(RK[u.role]||u.role)+'</b> · '+esc(u.faction)+' · 무기: '+esc(u.weapon)+'</div>'+
 ((u.traits&&u.traits.length?u.traits.map(t=>'<span class="trait">'+esc(t)+'</span>').join(''):'')+(u.rules?u.rules.map(r=>'<span class="rule">'+esc(r)+'</span>').join(''):''))+
 '</div>';
 document.getElementById('ov').classList.add('open');
}
function close(){document.getElementById('ov').classList.remove('open')}
function setF(f,btn){F=f;document.querySelectorAll('#fl button').forEach(b=>b.classList.toggle('on',b===btn));render()}
document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
render();
</script></body></html>`;

fs.writeFileSync(path.join(__dirname, 'codex.html'), html);
console.log('codex.html written,', units.length, 'units');
