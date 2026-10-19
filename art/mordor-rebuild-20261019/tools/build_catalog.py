from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import json,hashlib,math
R=Path(__file__).resolve().parents[1]
def read(n):return json.loads((R/n).read_text())
units=read('source-units.json'); specs={s[0]:s for s in read('unit-specs.json')}; audits={u['id']:u for u in read('references/main/docs/unit-art-audit.json')['units']}; manual=read('landmarks.json') if (R/'landmarks.json').exists() else {}
small={'orc_sword':.98,'orc_sword2':.95,'orc_tracker':.9,'orc_bow':.94,'morgul_rat':.9,'gorbag':.96,'kardush':.95,'grishnakh':.96}; large={'orc_captain':1.02,'morannon_orc':1.04,'morannon_swordshield':1.04,'guritz':1.06,'shagrat':1.02}
poses={'orc_sword': '마른 체형 · 낮게 돌진', 'orc_captain': '굵은 팔 · 전진 지휘', 'orc_spearman': '굽은 등 · 창 버티기', 'orc_archer': '가벼운 장비 · 활 조준', 'morannon_orc': '두꺼운 철갑 · 도끼 내려치기', 'warg_rider': '낮은 기승 · 와르그 돌진', 'mountain_troll': '넓은 어깨 · 짧은 다리', 'shelob': '거대한 배 · 여덟 다리', 'sauron': '거대한 중갑 · 철퇴와 반지', 'morgul_knight': '인간 기수 · 창을 내린 기마', 'orc_sword2': '작은 체형 · 가로 베기 준비', 'orc_swordshield': '두꺼운 몸통 · 방패 밀기', 'orc_spear2': '가느다란 체형 · 창 경계', 'orc_twohanded': '굵은 팔과 허리 · 양손도끼', 'orc_bow': '마른 체형 · 화살 꺼내기', 'orc_drummer': '배가 나온 체형 · 북 치기', 'black_numenorean': '넓은 어깨 · 엄정한 검 경계', 'black_numenorean_mounted': '인간 기수 · 중장갑 기마', 'orc_tracker': '야윈 체형 · 낮게 추적', 'war_troll': '거대한 중갑 · 방패와 망치', 'black_guard': '건장한 체형 · 중갑 경계', 'orc_taskmaster': '굵은 허리 · 채찍 지휘', 'mouth_of_sauron': '입이 드러난 투구 · 검은 기마', 'gothmog': '비대한 체형 · 비대칭 얼굴과 팔', 'olog_hai': '두꺼운 중갑 · 양손 망치', 'shagrat': '근육질 어깨 · 키리스 웅골 방패', 'gorbag': '작고 질긴 체형 · 검과 원형 방패', 'werewolf': '굽은 등 · 발톱 돌진', 'kardush': '배가 나온 체형 · 화염 주술', 'morgul_stalker': '마른 체형 · 양손 단검', 'numenorean_marshal': '큰 체격 · 검을 내린 지휘', 'grishnakh': '굽은 등 · 앞으로 움켜쥐기', 'guritz': '해골 장식 투구 · 양손 곡괭이', 'great_beast_gorgoroth': '거대한 몸체 · 궁수 탑승 누각', 'mordor_uruk': '근육질 체형 · 거친 중장갑', 'morgul_orc': '마른 체형 · 굽은 검', 'morgul_rat': '작은 체형 · 낮게 잠입', 'ufthak': '두꺼운 상체 · 무거운 양손 검', 'orc_sergeant': '마른 노병 · 전진 지시', 'annatar': '가느다란 체형 · 반지 제시', 'sauron_wolf': '낮은 어깨 · 검은 늑대 형상', 'morgul_duellist': '가느다란 허리 · 쌍검 경계', 'troll_shaman': '거대한 몸체 · 뼈 장식 주술', 'guritz_mounted': '해골 투구 · 와르그 기승', 'morannon_swordshield': '두꺼운 철갑 · 방패 돌진', 'orc_elite_tracker': '마른 노병 · 추적궁 준비'}
result=[]; checks=[]
for u in units:
 id=u['id'];f=R/'units'/f'{id}.png'
 if not f.exists():continue
 (R/'thumbs').mkdir(exist_ok=True)
 thumb=Image.open(f).convert('RGBA');thumb.thumbnail((512,512),Image.Resampling.NEAREST);thumb.save(R/'thumbs'/f'{id}.png')
 im=Image.open(f);a=im.getchannel('A') if im.mode=='RGBA' else None;b=a.point(lambda v:255 if v>16 else 0).getbbox() if a else None
 old=audits.get(id,{'id':id,'reference':'body','top':.02,'bottom':.97,'centerX':.5,'centerY':.55,'worldReferenceSize':76});typ=specs[id][2];m=manual.get(id)
 if m is None:continue
 target=old['worldReferenceSize']*small.get(id,large.get(id,1))
 # Review-only corrections: riders use the trial's seated head/pelvis value; body heights are never alpha-normalized.
 if typ=='mounted':target=39 if id in ['warg_rider','guritz_mounted'] else 50
 prof=dict(top=m[0],bottom=m[1],centerX=m[2],centerY=m[3],worldReferenceSize=round(target,2),reference=('rider' if typ=='mounted' else old['reference']),referenceAxis='height')
 op={k:old[k] for k in ['top','bottom','centerX','centerY','worldReferenceSize']}
 result.append(dict(id=id,name=u['name_ko'],name_en=u['name_en'],role=u['role'],file=f'units/{id}.png',preview=f'thumbs/{id}.png',old=f'references/old/{id}.png',pose=poses[id],body=typ,profile=prof,oldProfile=op,sourceWidth=im.width,sourceHeight=im.height,sourceSHA256=hashlib.sha256(f.read_bytes()).hexdigest(),review='individual visual camera, compact anatomy, gear and body landmarks'))
 checks.append(dict(id=id,size=list(im.size),mode=im.mode,alphaExtrema=a.getextrema() if a else None,bbox=b,edgeClear=bool(b and min(b[0],b[1],im.width-b[2],im.height-b[3])>=1),sha256=hashlib.sha256(f.read_bytes()).hexdigest()))
(R/'catalog.json').write_text(json.dumps({'baseline':'3f60319','trial':'0b46e78','count':len(result),'scalePolicy':'Review-only anatomical landmarks; weapons, plumes, flags and cape edges excluded. No production profiles changed.','units':result},ensure_ascii=False,indent=2))
(R/'verification.json').write_text(json.dumps({'count':len(checks),'checks':checks,'note':'Original generated alpha retained. Visible-silhouette bounds use alpha > 16 to exclude near-invisible edge noise. Technical checks do not establish camera or anatomy quality; those are visually reviewed.'},ensure_ascii=False,indent=2))
font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',14)
# Same display height is used ONLY in contact sheets for camera review. World-scale scenes use manual anatomical landmarks.
W=1440;cols=8;cw=180;ch=250;rows=math.ceil(len(result)/cols)
sheet=Image.new('RGB',(W,max(1,rows)*ch),(43,52,45));d=ImageDraw.Draw(sheet)
for i,u in enumerate(result):
 im=Image.open(R/u['file']);im.thumbnail((170,210));x=i%cols*cw+(cw-im.width)//2;y=i//cols*ch
 sheet.paste(im,(x,y),im);d.text((i%cols*cw+5,y+214),u['id'],fill='#e1ddcc',font=font)
sheet.save(R/'previews'/'mordor-units.png')
print(json.dumps({'catalog':len(result),'technical':len(checks),'missing':[u['id'] for u in units if not (R/'units'/f"{u['id']}.png").exists()],'unmeasured':[u['id'] for u in units if (R/'units'/f"{u['id']}.png").exists() and u['id'] not in manual]}))
