# 글로르핀델 기준 비율·쿼터뷰 교정

- 중단 지점: `art/glorfindel-fivehead-20261019`의 `7a150873`, 최초 원화 28종만 저장된 상태.
- 최종: 원화 61종의 인간·엘프·기수 비율을 약 5등신으로 재제작. 이후 사용자가 지정한 길갈라드 첨부본은 그대로 적용. 난쟁이·고블린 10종의 기존 종족 체형 유지. 에레스토르 첨부본도 보존.
- 기존 글로르핀델 도보·기마 PNG 바이트와 기준점 유지. 무기·깃발·투구 장식·망토를 제외한 몸체/기수 구간과 중심을 개별 검토해 고정.
- PNG 원본·전투용·갤러리 사본, 160px WebP와 캐시 리비전 동기화. 새 재작화 PNG는 기존 캔버스와 최대 384px RGBA 유지. 두 지정 첨부본은 원본 1171×1343 바이트를 보존.
- 과거 검수표는 보존하고 후속 승인 원화로 이어지는 `supersededBy` 검증 추가. 모든 현행 원화 해시·신체 기준·종횡비·중심·캐시 검증 유지.
- `gameplay-preservation.json`: 아트 표·이미지 캐시·병종 아트 메타데이터 외 게임 소스와 병종 전투·경제 데이터 동일.

검증: `passed-tests.txt` 95/95. 기존 영입·포인트·출전 배치·트리단 반지 조건·성장·승급·저장·다크 이벤트 검사 포함. 실제 Phaser 전투 엔진에서 62종을 변경하지 않은 글로르핀델과 11그룹으로 비교하고 390×844 모바일 확인. JS 오류 0개. 원화 전후 비교 페이지 검색·필터·모바일 넘침 없음 확인.

재현:
```
node tools/sync-unit-art-profiles.cjs
node tools/build.js --online-only
node --test tests/fivehead-art.test.cjs tests/unit-art.test.cjs tests/roster-art.test.cjs tests/roster-redraw.test.cjs tests/unit-redraw.test.cjs tests/lorien-weapons.test.cjs tests/warband-growth.test.cjs tests/troop-promotions.test.cjs tests/ready-deployment.test.cjs tests/warband-deployment.test.cjs tests/warband-points.test.cjs tests/recruit-dark-events.test.cjs
node tests/fivehead-browser.cjs
node tests/fivehead-review-browser.cjs
```
브라우저 테스트는 Playwright와 Chromium 실행 경로가 필요하며 `BROWSER_EXECUTABLE`로 지정합니다. 생성 방식은 내장 imagegen이고 개별 프롬프트는 `generation-log.json`에 있습니다.
