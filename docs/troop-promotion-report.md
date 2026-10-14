# 병종 승급 시스템 및 신규 에셋 완료 보고

시작 main: `5d238187b6f29e4ee318d21adc39df114bed365d`  
작업 브랜치: `feature/troop-promotion-system`  
첫 구현 원격 커밋: `366074a49a8e76ac49386a0d3bfd798bb2d18ef1`  
최종 통합 기준 main: `4f0114ff382c3200dc8f3f7135519f2229974a48` (기존 원화·크기·음향·UI·지형과 머크우드 표기 보존).
병종 승급 PR #28과 보스 PR #29를 한 통합 커밋으로 반영한다. 원격 병합/배포 상태는 해당 PR 및 GitHub Actions 기록을 기준으로 확인한다.

## 구현 결과

- 587개 에셋 행 / 510개 전투 프로필 전수 대조. 일반병 154개 행(호환용 중복 포함), 26개 계통, 68개 출발 경로와 110개 전직 분기.
- 전직은 실제 ID·스프라이트·무장·기본 프로필·이동·공격 방식·특성을 변경한다. 최초 `entryUnitId`/`entryPoints`를 유지하며 `rosterPoints()`가 이를 사용한다. 영웅의 기존 기마 포인트와 100킬 히든 진화 규칙은 유지한다.
- UID·개인 킬·경험치·참전 수·장비·부상·영구 강화·승급 이력 유지. 기존 자동 베테랑/챔피언 수치 중복을 제거하는 1회 세이브 마이그레이션.
- 경험치: 참여 +2, 생존 +4, 처치 +3(전투당 최대 +18). 1/2/3단계는 24/64/112XP 및 최소 3/7/11회 참전. 전직 비용 45/65/85금, 새 기마 전직 추가 35금 및 탈것 1.
- 군마 40금, 와르그 50금, 산양 55금, 낙타 50금. 낙마는 같은 병사의 도보 프로필로 전환하며 재탑승에도 최초 포인트와 이력을 유지한다. 전차는 기존 괴수/특수 전투 프로필을 보존하고 일반병 전직에서 제외한다.
- 어둠의 계약 유지. 헬밍가는 그림볼드·공세5, 적색방패는 에르켄브란드·공세7, 특수 시대는 실마릴 조건. 일반병→고유 영웅, 오크→인간, 왕국이 다른 엘프 전직 없음.
- 모바일 전투 종료 선택창, 분기별 실제 스프라이트·기본 프로필 비교·무장·특성·포인트 유지·보류·탈것 확보. 상세창에 현재 병종과 후속 트리 제공.

[전체 병종 표](troop-catalog.md) · [전체 진영별 승급 트리](troop-trees.md) · [기계 판독 전수 데이터](troop-catalog.json)

## 누락 병종 처리

| 대상 | 처리 |
|---|---|
| 성채근위 궁병 | 신규 원화 및 전투 프로필 |
| 오스길리아스 무장 변형 | 기존 검방 재사용, 창방·활 신규 |
| 돌 암로스 | 일반 검방·도보 백조기사 신규, 장창/기마 기존 재사용 |
| 로한 | 적색방패·헬밍가 신규, 기존 보병/기병/근위병 재사용 |
| 철산 | 매톡·창방·석궁 신규, 산양기병 기존 재사용. 카자드둠과 별도 계통 |
| 리븐델 | 기존 엘프 검·검방·창·활을 왕국별로 재분류하고 재사용. 방패/중장갑 방어 프로필 교정 |
| 로스로리엔 | 갈라드림 궁수·정예 궁병 신규 |
| 머크우드 | 레인저 신규, 기존 보초·궁정근위병 재분류 |
| 아르노르 | 기사·일반 레인저 신규. 기존 북부 레인저는 하급 영웅으로 별도 구분 |
| 모르도르 | 모라논 검방·정예 추적궁병 신규, 기존 모라논 창방 재사용. 활을 든 오크 추적자의 근접 전용 프로필 교정 |
| 데일 | 기리온 근위병 신규 |
| 아이센가드·군다바드·모리아·하라드·이스터링·던랜드 등 | 연결에 필요한 기존 병종 재사용. 다른 종족/왕국/시대로 넘어가야 하는 병종은 현재 지원·최종 형태를 유지 |

공식 병종의 존재 여부와 포인트 검증 여부는 구분했다. 기존 2024 기반 고정 포인트 표는 유지했다. **신규 18종 포인트는 정확한 2024 아미북 값을 직접 검증하지 못해 자체 산정으로 명시했다.** 돌 암로스 일반 검방, 갈라드림 정예 궁병, 오크 정예 추적궁병은 게임 확장. 헬밍가·적색방패는 구판 병종/업그레이드. 아르노르 기사는 공식 신규 병종.

참조: [GW 아르노르 기사](https://www.warhammer-community.com/en-gb/articles/ETqxuN31/middle-earth-strategy-battle-game-reinforcements-arrive-in-the-north/) · [GW 철산](https://www.warhammer-community.com/en-gb/articles/n8vZN5kI/middle-earth-faction-focus-iron-hills-dwarves/) · [GW 철산 석궁](https://www.warhammer.com/en-WW/shop/Iron-Hills-Dwarf-Crossbows-2017) · [GW 오스길리아스 베테랑](https://www.warhammer-community.com/en-gb/articles/MPWzNKVq/middle-earth-army-showcase-the-defenders-of-osgiliath/) · [GW 신판/구판 범위](https://www.warhammer-community.com/en-gb/articles/vozvvb0g/middle-earthtm-strategy-battle-game-the-upcoming-range-update-explained/)

## 신규 원화 18종

원본은 `art-src/troop-promotions/`, 게임용은 `assets/mesbg/tokens/`, 갤러리용은 `tokens/`, UI 썸네일은 `assets/mesbg/thumbs/`. 기존 유닛 PNG를 덮어쓰지 않았다. PNG는 진짜 알파 투명 배경이며 말판·배경·바닥 그림자가 없다. 배포 텍스처는 최대384px, 몸체 기준 86(인간)/68(난쟁이)/76(오크), 인간 기수43. 창·활·장식 외곽은 측정에 포함하지 않았다. 각 원화의 몸체 측정값은 `data/troop-new-units.json`에 보존한다. 게임의 기존 발판 렌더링은 유지한다.

| ID | 신규 병종 | 구분 | 직접 모집 포인트 | 파일 |
|---|---|---|---:|---|
| citadel_guard_bow | 성채근위 궁병 | official | 10 | [PNG](../assets/mesbg/tokens/citadel_guard_bow.png) · [원본](../art-src/troop-promotions/citadel_guard_bow.png) |
| osgiliath_spearshield | 오스길리아스 베테랑 창방 | official | 11 | [PNG](../assets/mesbg/tokens/osgiliath_spearshield.png) · [원본](../art-src/troop-promotions/osgiliath_spearshield.png) |
| osgiliath_bow | 오스길리아스 베테랑 궁병 | official | 10 | [PNG](../assets/mesbg/tokens/osgiliath_bow.png) · [원본](../art-src/troop-promotions/osgiliath_bow.png) |
| dol_amroth_swordshield | 돌 암로스 검방병 | custom | 8 | [PNG](../assets/mesbg/tokens/dol_amroth_swordshield.png) · [원본](../art-src/troop-promotions/dol_amroth_swordshield.png) |
| dol_amroth_knight_foot | 돌 암로스 백조기사 도보 | official | 12 | [PNG](../assets/mesbg/tokens/dol_amroth_knight_foot.png) · [원본](../art-src/troop-promotions/dol_amroth_knight_foot.png) |
| rohan_helmingas | 헬밍가 전사 | legacy | 9 | [PNG](../assets/mesbg/tokens/rohan_helmingas.png) · [원본](../art-src/troop-promotions/rohan_helmingas.png) |
| rohan_redshield | 웨스트폴드 적색방패 기병 | legacy | 17 | [PNG](../assets/mesbg/tokens/rohan_redshield.png) · [원본](../art-src/troop-promotions/rohan_redshield.png) |
| ironhills_warrior | 철산 매톡 전사 | official | 12 | [PNG](../assets/mesbg/tokens/ironhills_warrior.png) · [원본](../art-src/troop-promotions/ironhills_warrior.png) |
| ironhills_spearshield | 철산 창방병 | official | 13 | [PNG](../assets/mesbg/tokens/ironhills_spearshield.png) · [원본](../art-src/troop-promotions/ironhills_spearshield.png) |
| ironhills_crossbow | 철산 석궁병 | official | 14 | [PNG](../assets/mesbg/tokens/ironhills_crossbow.png) · [원본](../art-src/troop-promotions/ironhills_crossbow.png) |
| galadhrim_bow | 갈라드림 궁수 | official | 10 | [PNG](../assets/mesbg/tokens/galadhrim_bow.png) · [원본](../art-src/troop-promotions/galadhrim_bow.png) |
| galadhrim_elite_bow | 갈라드림 정예 궁병 | custom | 13 | [PNG](../assets/mesbg/tokens/galadhrim_elite_bow.png) · [원본](../art-src/troop-promotions/galadhrim_elite_bow.png) |
| mirkwood_ranger | 머크우드 레인저 | official | 14 | [PNG](../assets/mesbg/tokens/mirkwood_ranger.png) · [원본](../art-src/troop-promotions/mirkwood_ranger.png) |
| arnor_knight | 아르노르 기사 | official | 18 | [PNG](../assets/mesbg/tokens/arnor_knight.png) · [원본](../art-src/troop-promotions/arnor_knight.png) |
| arnor_ranger | 아르노르 레인저 | official | 9 | [PNG](../assets/mesbg/tokens/arnor_ranger.png) · [원본](../art-src/troop-promotions/arnor_ranger.png) |
| morannon_swordshield | 모라논 오크 검방 | official | 9 | [PNG](../assets/mesbg/tokens/morannon_swordshield.png) · [원본](../art-src/troop-promotions/morannon_swordshield.png) |
| orc_elite_tracker | 오크 정예 추적궁병 | custom | 8 | [PNG](../assets/mesbg/tokens/orc_elite_tracker.png) · [원본](../art-src/troop-promotions/orc_elite_tracker.png) |
| dale_guard | 데일 기리온 근위병 | official | 10 | [PNG](../assets/mesbg/tokens/dale_guard.png) · [원본](../art-src/troop-promotions/dale_guard.png) |

제작: 내장 image_gen, 병종당 독립 생성. [제작 스펙·산출물·몸체 측정](troop-asset-prompts.json). 갤러리에 신규 승급 병종 탭을 추가했다.

## 실제 게임 캡처

전직 전/분기 선택/전직 후 화면은 실제 브라우저 UI에서 버튼을 눌러 촬영했다. 신규 병종 비교는 동일 게임 렌더러·맵 위에 배치한 검수 화면이다.

| 화면 | 캡처 |
|---|---|
| 모바일 전직 전 | [390px](troop-promotion-proof/390-promotion-before.png) |
| 보병·기병 분기 | [390px](troop-promotion-proof/390-promotion-branches.png) |
| 기사 전직 후 9pt 유지 | [390px](troop-promotion-proof/390-promotion-after.png) |
| 신규 곤도르·돌 암로스·헬밍가 | [실제 렌더](troop-promotion-proof/new-units-1.png) |
| 신규 적색방패·철산·갈라드림 | [실제 렌더](troop-promotion-proof/new-units-2.png) |
| 신규 머크우드·아르노르·오크·데일 | [실제 렌더](troop-promotion-proof/new-units-3.png) |
| 병종 전후·기병·난쟁이 크기 비교 | [실제 렌더](troop-promotion-proof/career-in-game.png) |
| 자동 전투 | [모바일 390px](troop-promotion-proof/390-normal-combat.png) |

## 검증

- Node 자동 테스트 47개 통과: 110개 분기 전수 실행, 최초 포인트, UID/장비/킬/부상/영구 강화, XP/참전/생존 중복 방지, 직접 고급병 모집, 조건·금화·탈것, 낙마/재탑승, 보류/저장/복원/구세이브 마이그레이션, darkpact/시대, 기존 100킬 진화, 사격/근접/석궁 이동 제약, 명중 재굴림·근위 보호 조건.
- 기존 포인트 회귀 테스트 전체 통과. 기존 진행 테스트의 오래된 사운드·클라우드 API mock 2곳을 현재 API에 맞춰 수정했으며 런타임의 해당 기능은 변경하지 않았다.
- 모바일 360px/390px 및 PC1280px UI: 가로 넘침 없음, 동작 버튼 높이44px 이상. 실제 클릭으로 검방→베테랑→기병 후 9pt 유지, 킬18과 이력·세이브 복원 확인.
- 신규18종 텍스처 로딩/가시성/몸체 기준 배율 확인. 기존6종과 함께24개 렌더 프로필 검사. 브라우저 JavaScript 오류0.
- 실제 자동 전투: 공세8, 라운드4 근접전까지 실행. 궁병의 정상 사격과 석궁병의 이동 후 사격 금지 확인. 전직한 병사와 새 영입 병사의 개인 참전 XP 누적 확인. 전투 도중 병사 전사는 정상적으로 포인트를 해제한다.
- 빌드 및 모든 인라인 스크립트 구문 검사 통과.
- 배포용 신규 PNG+WebP는 아래 크기이며, 원본19MB는 게임 부팅에서 로드하지 않는다. 신규 원화는 필요할 때 개별 로딩된다.

신규 게임 에셋 총 2.33MB. Headless Chromium PC 렌더 측정: 평균 32.7ms/프레임, p95 50.0ms, JS heap 약 53.5MB. 실제 Android/iOS 발열·메모리 및 장시간 플레이는 물리 기기에서 추가 확인이 필요하다. 이 수치를 모바일 FPS 보장으로 해석하지 않는다.

[브라우저 원시 결과](troop-promotion-proof/browser-report.json) · [자동 테스트 로그](troop-promotion-proof/unit-tests.txt)
