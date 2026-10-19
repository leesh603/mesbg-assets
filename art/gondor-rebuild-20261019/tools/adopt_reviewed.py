"""Promote only candidates with explicit, visually reviewed anatomical landmarks."""
from pathlib import Path
from PIL import Image
import json
import shutil

ROOT = Path(__file__).resolve().parents[1]

def main():
    reviewed = json.loads((ROOT / 'anatomical-landmarks.json').read_text())['reviewed']
    specs = json.loads((ROOT / 'variants.json').read_text())
    jobs = {j['id']: j for name in ['generation-queue-remaining.json', 'generation-queue-specials.json']
            for j in json.loads((ROOT / name).read_text())}
    checks = []
    for ident, v in reviewed.items():
        source = ROOT / 'candidates-v3' / (ident + '.png')
        image = Image.open(source)
        assert image.mode == 'RGBA', ident
        alpha = image.getchannel('A')
        assert alpha.getextrema()[0] == 0, ident
        # Visible alpha only: sub-16-alpha compression specks are not anatomy.
        bbox = alpha.point(lambda value: 255 if value >= 128 else 0).getbbox()
        assert bbox and min(bbox[0], bbox[1], image.width-bbox[2], image.height-bbox[3]) >= 4, (ident, bbox)
        assert 0 <= v[0] < v[1] <= 1 and 0 < v[2] < 1 and 0 < v[3] < 1, ident
        checks.append({'id': ident, 'dimensions': image.size, 'visibleAlphaBBox': bbox})
    # Validate the complete proposal before updating any profiles or ready images.
    for ident, v in reviewed.items():
        spec = specs[ident]
        spec.update(top=v[0], bottom=v[1], centerX=v[2], centerY=v[3],
                    review='하이앵글 프론트·기준 5등신·픽셀톤 육안 검토. 무기·장식 제외 머리/발 또는 기수 골반 기준점 수동 기록. 최종 채택 전 검토본.')
        if len(v) > 4:
            spec['stature'] = v[4]
        shutil.copy2(ROOT / 'candidates-v3' / (ident + '.png'), ROOT / 'units' / (ident + '.png'))
        record_path = ROOT / 'generation-records' / (ident + '-v3.json')
        record = json.loads(record_path.read_text()) if record_path.exists() else {
            'id': ident, 'candidate': 'candidates-v3/' + ident + '.png',
            'refs': jobs[ident]['refs'], 'note': 'Recovered existing candidate; prior generation record was interrupted.'}
        record.update(status='visually-reviewed-workshop-candidate', anatomicalLandmarks=v)
        record_path.write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'variants.json').write_text(json.dumps(specs, ensure_ascii=False, indent=2) + '\n')
    (ROOT / 'file-qa-20261019.json').write_text(json.dumps({'reviewedCount': len(checks), 'checks': checks}, indent=2) + '\n')
    print(f'Promoted {len(reviewed)} reviewed candidates')

if __name__ == '__main__':
    main()
