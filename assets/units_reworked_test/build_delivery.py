"""Compose accurate comparison sheets and package verified assets."""
import json
import math
from pathlib import Path
import zipfile
from PIL import Image, ImageDraw, ImageFont

BASE = Path(__file__).resolve().parent
REPO = BASE.parents[1]
catalog = json.loads((BASE / 'catalog.json').read_text())
qa = json.loads((BASE / 'qa_bulk.json').read_text())
assert not qa['errors'] and not qa['missing'] and not qa['unreviewed'] and not qa['visible_framing_flags'], 'Run complete verification first'
rows = [u for u in catalog['records'] if u.get('output')]
font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 17)
comparisons = BASE / 'comparisons'
comparisons.mkdir(exist_ok=True)

def render(chunk, path, columns=4):
    row_count = math.ceil(len(chunk) / columns)
    picture = Image.new('RGB', (columns * 400, 60 + row_count * 410), (30, 36, 43))
    draw = ImageDraw.Draw(picture)
    draw.text((15, 15), 'Each pair: Original (left) / Reworked (right)', font=font, fill='white')
    for i, unit in enumerate(chunk):
        x, y = (i % columns) * 400, 55 + (i // columns) * 410
        draw.text((x + 8, y), unit['id'], font=font, fill=(225, 219, 173))
        sprites = [Image.open(source).convert('RGBA')
                   for source in [REPO / unit['file'], BASE / unit['output']]]
        boxes = [sprite.getbbox() for sprite in sprites]
        common_box = (min(box[0] for box in boxes), min(box[1] for box in boxes),
                      max(box[2] for box in boxes), max(box[3] for box in boxes))
        for k, sprite in enumerate(sprites):
            sprite = sprite.crop(common_box)
            sprite.thumbnail((185, 335), Image.Resampling.NEAREST)
            picture.paste(sprite, (x + 200 * k + (200 - sprite.width) // 2,
                                  y + 30 + 335 - sprite.height), sprite)
    picture.save(path, quality=94)

index = []
for page in range(math.ceil(len(rows) / 12)):
    chunk = rows[page * 12:(page + 1) * 12]
    name = f'comparison_{page + 1:02d}.jpg'
    render(chunk, comparisons / name)
    index.append({'file': name, 'ids': [u['id'] for u in chunk]})
(comparisons / 'index.json').write_text(json.dumps(index, ensure_ascii=False, indent=2))
preview_ids = ['legolas', 'gimli', 'boromir', 'dain', 'hurin_thalion', 'beorn_bear', 'glaurung', 'witchking_foot']
by_id = {u['id']: u for u in rows}
render([by_id[i] for i in preview_ids], BASE / 'result_preview.jpg', columns=4)
asset_map = {u['id']: (u['output'] if u.get('output') else 'preserved/' + Path(u['file']).name)
             for u in catalog['records'] if u['status'] != 'out_of_scope'}
(BASE / 'unit_asset_map.json').write_text(json.dumps(asset_map, ensure_ascii=False, indent=2))
readme = f'''MESBG 유닛 그림체 통일 결과\n\n실제 유닛 463종: 기준 충족 311종 원본 유지, 기준에 맞춰 152종 재작화.\n지형 77종은 작업 대상에서 제외했습니다.\n\npreserved/: 원본과 동일한 유지 에셋 311종\nreworked/: 재작화 PNG 152종 (승인된 레골라스 포함)\nbefore/: 재작화 대상의 원본 152종\ncomparisons/: 152종 전체 전후 비교 이미지 13장 및 인덱스\nunit_asset_map.json: 463종의 최종 파일 경로\ncatalog.json: 분류 이유, 원본 해시, 유닛 정보\nreview_decisions.json: 실제 전후 비교 검수 기록\nqa_bulk.json: 원본 불변, 파일 크기, PNG/알파 및 출력 해시 검증\ngeneration_sources.json, prompt.txt: 실제 생성 프롬프트 기록\n\n타우리엘·핑골핀·임라힐·해머헬름·페아노르·켈레브림보르·글로르핀델·고르바그·웨어울프·루르츠·동굴 드레이크·그림자 군주·미나스 티리스 장교와 승인된 레골라스를 렌더링 기준으로 사용했습니다.\n원본의 정체성, 무기, 복장, 탑승물/생물 종류와 포즈를 유지하면서 윤곽, 명암 덩어리, 재질 표현과 디테일 선명도를 맞췄습니다.\n개별 원본 캔버스 규격과 투명 RGBA PNG를 유지했습니다.\n전후 비교판에서 152종을 직접 검수했으며, 파일 검증과 시각 검수를 통과했습니다.\n실제 게임에 설치하거나 라이브 배포하지 않았습니다. 원본 파일은 수정하지 않았습니다.\n\n작업 기준 소스: {catalog['source_main']}\n'''
(BASE / 'README.md').write_text(readme, encoding='utf-8')
archive = REPO.parent / 'MESBG_Unit_Style_Unification_20261012.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED, compresslevel=3) as z:
    for p in sorted((BASE / 'preserved').glob('*.png')):
        z.write(p, 'preserved/' + p.name)
    for unit in rows:
        z.write(BASE / unit['output'], unit['output'])
        z.write(REPO / unit['file'], 'before/' + Path(unit['file']).name)
    for p in sorted(comparisons.iterdir()):
        z.write(p, 'comparisons/' + p.name)
    for name in ['catalog.json', 'review_decisions.json', 'qa_bulk.json', 'unit_asset_map.json',
                 'generation_sources.json', 'prompt.txt', 'legolas_comparison.png', 'result_preview.jpg']:
        z.write(BASE / name, name)
    z.write(REPO.parent / 'reference-contact-sheet.png', 'references/reference-contact-sheet.png')
    if (BASE / 'normalization_fixes.json').exists():
        z.write(BASE / 'normalization_fixes.json', 'normalization_fixes.json')
    z.writestr('README.txt', readme)
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    assert len(z.namelist()) == len(set(z.namelist()))
print(json.dumps({'archive': str(archive), 'bytes': archive.stat().st_size,
                  'preserved': 311, 'reworked': len(rows), 'comparison_sheets': len(index)}))
