# LAST WAR BAND — 게임 파일 수정 가이드 (AI 에이전트용)

## 파일 구조 (src/game.js 방식 — 권장)

게임 로직은 **`src/game.js`** (~345KB 일반 JavaScript)에 분리돼 있습니다. ChatGPT/Cursor 같은 AI에게 이 파일만 통째로 주면 됩니다 — 40MB HTML을 올릴 필요 없음.

수정 흐름:
1. `src/game.js`를 수정 (또는 AI에게 수정 요청 후 파일 교체)
2. `node tools/build.js` 실행 → `LAST-WAR-BAND_v1.9.html` + `index.html` 자동 생성
3. 커밋·푸시 → GitHub Pages(https://leesh603.github.io/mesbg-assets/)에 자동 배포

`LAST-WAR-BAND_v1.9.html` = 게임 전체가 담긴 단일 HTML (~53MB, 빌드 결과물). 직접 고치지 말 것 — `src/game.js`를 고치고 다시 빌드.

- HTML 앞부분은 base64 인코딩 이미지 에셋 — **절대 손대지 말 것**
- HTML에서 `src/game.js`에 해당하는 구간은 `/*__LWB_SRC_BEGIN__*/` ~ `/*__LWB_SRC_END__*/` 마커 사이
- HTML을 직접 수정해서 `src/game.js`와 어긋났으면 `node tools/extract_src.js`로 다시 추출

## 수정 시 핵심 규칙

1. **문자열 치환으로 수정** — 정규식/전체 재작성 금지. 고유한 앵커 문자열을 찾아 `replace` 방식으로 바꾼다
2. **앵커가 바이트 단위로 정확해야 함** — 공백·들여쓰기가 다르면 치환 실패. 먼저 `grep`으로 정확한 텍스트 확인
3. **템플릿 리터럴 중첩 금지** — 삽입 코드 안에 `` `...${x}...` `` 를 넣으면 깨질 수 있음. 문자열 연결(`'a'+x+'b'`)로 작성
4. **한국어 텍스트는 UTF-8** — 인코딩 깨지지 않게 주의

## 주요 코드 앵커 (파일 내 검색할 문자열)

| 기능 | 앵커 |
|---|---|
| 게임 상수·유물 목록 | `const CX = {` → `relics: [` 배열 |
| 유닛 스탯 재계산 | `P.refreshUnit = function` |
| 웨이브/미션 생성 | `P.stageInfo = function` |
| 적 스폰 | `P.spawnEnemies = function` |
| 라운드 시작 | `P.beginRound = function` |
| 웨이브 클리어 보상 | `P.finishWave = function` |
| 영입 추첨 | `P.rollRecruits = function` |
| 캠프 랜덤 이벤트 목록 | `const LWB_EVENTS = [` |
| 이벤트 추첨 | `P.rollCampEvent = function` |
| 영웅 행동 | `P.heroic = function` |
| 유닛 스킬 | `P.skill = function` |
| 추가 유물 등록 | `CX.relics.push(...` |
| 화면 렌더 | `function Yt()` |
| 디버그 객체 | `window.MESBG` |

## 상태 모델 (중요)

- `u.baseStats` = 영구 스탯 (이벤트의 영구 버프는 여기에)
- `u.stats` = 현재 스탯 — `refreshUnit()`이 baseStats에서 재계산
- `u.roundBuff` = 이번 라운드만 적용되는 버프 — `beginRound`에서 초기화됨
- `q.nextRoundBuffs` = 다음 라운드 1회 버프 큐 (`{stat, n, side}`)
- `q.relics` = `{유물id: 개수}` 맵, `q.rank(id)` = 보유 개수
- 저장 필드 목록에 새 상태를 추가해야 세이브에 유지됨: `const keys = ['gold', 'relics', ...]` 검색해서 배열에 추가

## 로컬 테스트

브라우저 콘솔에서:
```js
MESBG.battle           // 라이브 게임 상태 (q)
MESBG.battle.start('ai')              // 새 게임 시작
MESBG.battle.alive('good')            // 아군 유닛 목록
MESBG.battle.rollCampEvent()          // 이벤트 다시 추첨
MESBG.render()                        // 화면 갱신
```

수정 후 반드시 브라우저에서 실제로 실행해 확인할 것.

## ChatGPT 같은 채팅 AI로 수정할 때

파일이 40MB라 통째로 업로드/붙여넣기 불가:
1. 위 앵커로 해당 함수 부분만 복사해 AI에게 붙여넣고 수정 요청
2. 돌아온 코드를 원래 위치에 다시 붙여넣기 (치환)
3. `data:image/png;base64` 로 시작하는 초대형 문자열은 절대 건드리지 않기

## 배포

- 리포에 커밋만으로는 라이브 반영 안 됨 — 별도 정적 호스팅 배포 필요
- 현재 라이브: https://c--users-administrator-mesbg-d-ggxmnwtm.devinapps.com
