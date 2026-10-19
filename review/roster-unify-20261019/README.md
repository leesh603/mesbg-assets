# 전체 유닛 아트 점검 후 중단된 작업 복구

기준 main: `5af9b6c50a5e84b3ca7426ffd9a8b54d705efad2`. 보존된 생성 결과 50종 중 현재 카탈로그에 등록된 49종을 적용하고, 미등록 `galadriel_war`는 원화만 보관한다. 기존 22종 재제작 및 오스길리아스 3종 교정은 그대로 유지한다.

- 대상: 구형 저해상도 병사·영웅, 길고 정면에 가까운 엘프 보병, 기수/말 비율이 다른 기마. `targets.json`에 분류와 이름을 보존.
- 원화: `art-src/roster-unify-20261019/`, 이전 그림: 그 아래 `before/`. 기존 생성 도구 결과를 복구하여 사용했으며 이번 재개 과정에서 새 이미지 생성은 하지 않았다. 사용된 생성 프롬프트와 참조는 `prompts.json`에 보존.
- 게임·갤러리 PNG와 높이 160px WebP, 두 갤러리 이미지 캐시/종횡비, 런타임 캐시, 수동 신체 기준점을 일치시켰다. PNG 최대 384px RGBA.
- 보행은 정수리–발, 기마는 정수리–앉은 골반. 중심은 몸통 또는 말·기수의 결합 몸체. 깃발/창/검/투구 장식/뿔을 제외. `manifest.json`에서 49종의 좌표·체급·원본 해시 확인 가능.
- 마블룽은 인간 86, 아라손·구슬라프·아나리온 기마는 기수 43으로 과도한 축소를 교정. 키 큰 영웅 및 종족별 체급은 기존 설정을 보존.
- 기존 전투/무장/스탯/능력 코드는 변경하지 않았다. 신체 표와 캐시 표를 제외한 기준 소스의 SHA256을 보존하고 비교하는 회귀 검사 포함.

검증: `node --test tests/*.test.cjs` 전체 **91/91 통과**. 원시 출력은 `qa-tests.txt`. 실제 Phaser에서 49종 모두와 글로르핀델 기준을 9개 그룹으로 렌더링, 390×844 모바일 검수. 결과 `after-browser.json`, 전후 화면 `before-*` / `after-*`.

재검수: `BROWSER_EXECUTABLE=<chromium path> node tests/roster-art-browser.cjs`. 수정 전 재현은 기준 커밋의 index.html을 `art-review/full-roster-20261019/baseline.html`로 놓고 `ART_REVIEW_PHASE=before` 설정.
