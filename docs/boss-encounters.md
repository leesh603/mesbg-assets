# 보스 특수 패턴

시작 기준 main: `a492df38f022452eebf7b8cace0398a8ebd65b01`. 완료 전 `a28a7ce3cead1f8e7e28b4a6511af968d3b05cf3`로 rebase하여 추가 음향·적 편성 변경도 보존했다. 원본 변경은 `src/game.js`와 `src/ui.css`, HTML은 빌드로 생성한다. 원작과 MESBG의 특징을 이 게임의 라운드·좌표·자원 체계로 각색한 패턴이며 공식 프로필을 그대로 재현하는 규칙은 아니다.

## 공통 판정과 대응

- 큰 공격은 현재 위치·방향을 기록해 다음 라운드에 판정한다. 예고 후 플레이어에게 이동·사격·전투 한 라운드를 보장한다. 즉시 추적 피해·확정 상처를 제거했다.
- 부채꼴 화염, 직선 급강하/투척, 원형 강타가 다른 범위로 표시된다. 판정은 유닛의 실제 전투 반경을 포함한다. 화염·마법 발사체는 지형의 시야 차단을 따른다.
- 상처는 Strength/Defence 주사위로 판정하며 Fate·기존 방어 유물·영웅적 수비가 작동한다. 공격 마법은 보스 Will 1을 사용하고 대상은 기존 게임 방식인 Will 1/4+로 저항한다. 공포는 용기 검사와 fearless/protected를 존중한다.
- 보스 66%/33% 상처 단계의 Attack 증가를 유지한다. 추가 패턴마다 위상 차이·지원군·잔불이 적용되며 한 보스당 새로운 예고는 최대 2개다. 잔불은 1회 판정 후 사라진다. 지원군은 생존 적과 대기 증원 합산 한도를 따른다. 사우론의 아홉 악령은 1회만 소환되며, 기존 본대까지 포함한 절대 한도는 45기다.
- 자동전투 아군은 이동 가능한 경우 위험 범위를 벗어나고, 위험한 위치로 돌격하지 않는다. 교전·지형·이동 예산은 그대로 적용된다.
- 라운드 되돌리기에 예고·적장 목록도 함께 복원한다. 죽은 보스의 공격 예고는 무효다.

| 보스 | 핵심 패턴 | 대응 |
|---|---|---|
| 사루만 | 주술 폭풍으로 일렬 진형 밀침/넘어짐, 명령, 목소리, 우루크 지원 | 직선 이탈, Will 저항, 지휘관 접근 |
| 마술사왕(펠비스트) | 검은 다트, 급강하, 의지 흡수, 투척 | 지정된 자리 이탈, Will 보존 |
| 검은문 | 사우론의 입의 절망/총공세, 트롤, 펠비스트 나즈굴 3기 교대 급강하 | 지상/공중 경로 분산, 모든 적장 격파 |
| 스마우그 | 부채꼴 화염, 꼬리, 후기 잔불, 브레스 직후 비늘 틈 | 화염 옆으로 이동, 약점 Defence −2 한 라운드 공략 |
| 사우론 | 철퇴 광역 밀침, 영혼 냉각, 후기 나즈굴 지원 | 철퇴 범위 회피, Will 저항, 악령 분리 |
| 전쟁/동굴 트롤 | 몸통 강타·투척 | 밀집을 풀고 측면 지원 |
| 고블린 왕 | 몸통 강타·고블린 소집 | 강타 회피, 증원 차단 |
| 아조그 | 영웅 지목 결투·직선 돌진 | 지목 위치 이탈, 창병 지원 |
| 글라우룽/스카사 | 용의 화염·꼬리, 글라우룽의 시선 | 측면 분산, 시선 저항 |
| 카르카로스 | 광란 돌진·실마릴의 불타는 아귀 | 돌진 경로 회피 |
| 웅골리안트 | 암흑 거미줄 감속·탐식 회복 | 거미줄에서 이동, 포식 범위 밖 공격 |
| 발록/고스모그 | 화염 채찍·불꽃/검은 도끼, 발록 지휘 | 채찍 경로 회피, 협공 분리 |
| 앙칼라곤 | 넓은 용화·산을 무너뜨리는 날개 | 부채꼴 이탈, 강타 범위 분산 |
| 모르고스 | 그론드 균열·여진·공포, 강타 후 다친 발 노출 | 균열 회피 후 약점 집중 |

스마우그의 기존 등장 대사, 그림자 비행, 아군/적군 전체 힘 5 화염, 착지 연출은 유지했다. 각 보스의 기존 그림을 크게 보여주고 대응 문구를 추가했으며, 검은문 등장 카드에는 펠비스트 나즈굴 세 기를 함께 표시한다.

검은문 적장 ID 중복을 `find(id)`로 추적하던 승리 판정을 실제 모든 UID로 수정했다. 배치가 지연된 적장도 도착 전에는 클리어할 수 없다. 첫 나즈굴만 죽여도 클리어되던 문제를 방지한다. 기존 최신 main에 이미 있는 적 편성 수량 복원은 유지한다.

## 근거

- Games Workshop, [Isengard Faction Focus](https://www.warhammer-community.com/en-gb/articles/sjZ0P8uD/middle-earth-faction-focus-isengard/): Saruman / Sorcerous Blast.
- Games Workshop, [Dale Windlance](https://www.warhammer-community.com/en-gb/articles/gKCPKYVN/the-dale-windlance-wield-the-weapon-that-wounded-smaug/): Girion, 비늘의 약점, Bard의 검은 화살.
- Games Workshop, [Moria Faction Focus](https://www.warhammer-community.com/en-gb/articles/pV9BR7Ja/middle-earth-faction-focus-moria/): 발록의 화염과 괴수 Hurl/Barge.
- Tolkien, *The Two Towers*, “The Voice of Saruman”; *The Return of the King*, “The Battle of the Pelennor Fields”, “The Black Gate Opens”; *The Hobbit*, “Inside Information”, “Fire and Water”; *The Silmarillion*, 글라우룽·카르카로스·웅골리안트·곤돌린·분노의 전쟁·핑골핀과 모르고스의 전승.

## 검증

- `node tools/build.js --online-only`
- `node tests/boss-patterns.test.cjs` — 18개 보스의 예고, 이동 회피, Strength/Defence/Fate, Will 저항, 용기, 화염, 약점, 증원 한도, 중복 적장 승리 판정, 라운드 복원.
- `node tests/tactics.test.cjs` — 기존 전술 20개.
- `node tests/hero-identities.test.cjs` — 기존 영웅 프로필 활성화/스킬/성장.
- `CHROMIUM_PATH=<chrome> node tests/boss-patterns-browser.cjs` — 실제 Phaser, PC 1280×900 / 모바일 390×844, 스테이지 10·15·20·35·40·55·70의 등장 카드·예고·발동 FX. 스테이지 선택은 fixture이며 실제 전투 스탯을 바꾸지 않는다. 결과와 스크린샷은 `review/boss-patterns/`.

기존 `tests/battle-fx.test.cjs`는 오디오 함수 `combatAudioImpact` / `eventAudioCue`를 mock 환경에 넣지 않아 4개가 실패한다. 변경 전 기준 main에서도 동일한 실패를 재현했다. 실제 브라우저에서 공격 렌더러를 별도로 실행해 이 변경의 런타임 오류 여부를 확인한다.
