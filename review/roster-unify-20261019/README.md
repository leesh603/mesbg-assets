# 전체 유닛 아트 교정

597개 토큰을 모두 비교하여 실사용 49종과 미등록 호환 원화 1종을 재제작했다. 글로르핀델 도보 크기 기준은 76 → 86으로 바로잡고, 자동 보정기가 수동으로 확정한 크기를 변경하지 못하도록 수정했다.

- [검색 가능한 전후 비교](index.html)
- [유닛별 상세 변경 및 검증](../../reports/roster-unify-20261019/README.md)
- 원본·교정본·수동 몸체 기준점: manifest.json
- 전체 검토 목록: census.json
- built-in image_gen 제작 프롬프트: prompts.json

검증: 자동 테스트 96/96, 실제 Phaser의 교정본 49종과 기준 도보·기마 비교, 390×844 모바일 검수. `BROWSER_EXECUTABLE=<chromium path> node tests/roster-art-browser.cjs`. 이전 버전 재현은 `ART_REVIEW_PHASE=before`로 실행하며 보존된 before-index.html과 원본 PNG를 사용한다.
