"""Inject editable upgrades by unique anchors, preserving original image bytes."""
from pathlib import Path
import hashlib,json,base64
ROOT=Path(__file__).resolve().parents[1]
p=ROOT/'LAST-WAR-BAND_v1.9.html';s=p.read_text();asset_hash=hashlib.sha256(s[:s.index('</script>')].encode()).hexdigest()
def replace(old,new):
 global s
 if new in s:return
 assert s.count(old)==1,'Missing/nonunique anchor: '+old[:70]
 s=s.replace(old,new,1)
def block(start,end,content,before):
 global s
 if start in s:
  a=s.index(start);b=s.index(end,a)+len(end)
  if s[b:b+1]=='\n':b+=1
  s=s[:a]+s[b:]
 assert s.count(before)==1
 s=s.replace(before,start+'\n'+content+'\n'+end+'\n'+before,1)
replace("if(profile.traits.includes('mounted'))meta.baseMm=Math.max(meta.baseMm,50);","if(profile.traits.includes('mounted'))meta.baseMm=Math.max(meta.baseMm,40);")
replace("if(p.traits.includes('mounted'))meta.baseMm=Math.max(meta.baseMm||0,50);","if(p.traits.includes('mounted'))meta.baseMm=Math.max(meta.baseMm||0,40);")
a="    const supports = all.filter(u => u.alive && u.traits.includes('spear') && !group.includes(u)";b="    result.supports = supports.map(u => u.uid);"
if a in s:
 start=s.index(a);end=s.index(b,start)+len(b)
 s=s[:start]+'''    const links = supportFor(group, all);
    const participating = group.map(u => ({ ...u, stats: { ...u.stats } }));
    const result = Tactics.resolveFight(participating, all, terrain, priority, rng, links, {push: De, wound: oe});'''+s[end:]
replace("    result.fightValues = { good: Math.max(...participating.filter(u => u.side === 'good').map(u => u.stats.fight)), evil: Math.max(...participating.filter(u => u.side === 'evil').map(u => u.stats.fight)) };","    // Fight values include the supporting models.")
replace('g.fillStyle(0x7daaa0,.15);g.fillPoints(points,true);','g.fillStyle(0x9aa977,.29);g.fillPoints(points,true);')
replace('g.lineStyle(.9/z,0xd9efe4,.5);g.strokePoints(points,true);','g.lineStyle(2/z,0xe4ddb2,.95);g.strokePoints(points,true);')
replace('g.lineStyle(1.2/z,jump?0xd6ba77:0xb77c68,.5);','g.lineStyle(2/z,jump?0xd6ba77:0xc48b73,.95);')
replace('g.strokeRoundedRect(t.x-t.w/2,t.y-t.h/2,t.w,t.h,6);','g.strokeRoundedRect(t.x-t.w/2,t.y-t.h/2,t.w,t.h,6);\n                if(!jump){g.lineStyle(1/z,0xc48b73,.5);for(let x=t.x-t.w/2+8;x<t.x+t.w/2;x+=22)g.lineBetween(x,t.y-t.h/2,x,t.y+t.h/2);}')
replace('g.lineStyle(2.5/UX.zoom,0xf0746c,1);','g.lineStyle(2.5/UX.zoom,0xf0d58d,1);')
replace('g.fillStyle(0xffc4b1,1);','g.fillStyle(0xf4e4b9,1);')
a='                const K = this.add.graphics();\n                K.fillStyle(1319200, .4)'
if a in s:
 start=s.index(a);end=s.index('                this.terrainLayer.add(K);',start)+len('                this.terrainLayer.add(K);')
 s=s[:start]+"                this.terrainLayer.add(this.add.image(H.x, H.y, 'terr_barricade').setDisplaySize(H.w + 12, H.w + 12));"+s[end:]
replace('if(!u?.alive||u.escaped){removeCasualty(uid);continue;}','if(!u?.alive||u.escaped){if(!this.busy)removeCasualty(uid);continue;}')
replace('아라곤과 다섯 병사로 시작하세요.<br>','영웅과 병사를 골라 원정대를 꾸리세요.<br>')
units=json.loads((ROOT/'units.json').read_text())['units'];sizes={u['id']:int(u['base_mm'][:-2]) for u in units if str(u.get('base_mm','')).endswith('mm') and u['base_mm'][:-2].isdigit()}
ids=json.loads((ROOT/'runtime/assets.json').read_text())['terrain'];defs=[u for u in units if u['id'] in ids];assert len(defs)==len(ids)
assets={u['file']:'data:image/png;base64,'+base64.b64encode((ROOT/u['file']).read_bytes()).decode() for u in defs}
data='\nwindow.LWB_BASES='+json.dumps(sizes)+';\nwindow.LWB_TERRAIN_DEFS='+json.dumps(defs,ensure_ascii=False)+';\nObject.assign(window.__MESBG_ASSETS__,'+json.dumps(assets)+');'
block('/* LWB_TACTICS_BEGIN */','/* LWB_TACTICS_END */',(ROOT/'runtime/tactics.cjs').read_text()+data,'var ye=Object.defineProperty;')
block('/* LWB_UPGRADE_BEGIN */','/* LWB_UPGRADE_END */',(ROOT/'runtime/upgrade.js').read_text(),'const clarityGame = new Ot.Game(')
block('/* LWB_STYLE_BEGIN */','/* LWB_STYLE_END */',(ROOT/'runtime/upgrade.css').read_text(),'\n@media(min-width:901px){\n  body.force-mobile')
assert hashlib.sha256(s[:s.index('</script>')].encode()).hexdigest()==asset_hash
p.write_text(s);print('Built; original image block preserved:',asset_hash)
