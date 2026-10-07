# LAST WAR BAND — 게임 파일 수정 가이드 (AI 에이전트용)

## 파일 구조 (src/game.js 방식 — 권장)

게임 로직은 **`src/game.js`** (~345KB 일반 JavaScript)에 분리돼 있습니다. ChatGPT/Cursor 같은 AI에게 이 파일만 통째로 주면 됩니다 — 40MB HTML을 올릴 필요 없음.

수정 흐름:
1. `src/game.js`를 수정 (또는 AI에게 수정 요청 후 파일 교체)
2. `node tools/build.js` 실행 → `index.html`에 소스 반영 + `LAST-WAR-BAND_v1.9.html`(오프라인 풀패키지) 로컬 생성
3. 커밋·푸시 → GitHub Pages(https://leesh603.github.io/mesbg-assets/)에 자동 배포

두 결과물의 차이:
- **`index.html`** (~2MB) = 배포용 라이트 빌드이자 **원본 문서**. 에셋을 `assets/mesbg/` 외부 파일에서 불러와서 로딩이 빠름 — **반드시 `assets/` 폴더와 같이 커밋할 것**. file:// 로 직접 열면 에셋 로딩이 안 됨(서버 필요)
- **`LAST-WAR-BAND_v1.9.html`** (~114MB) = 게임 전체가 담긴 단일 HTML (오프라인/다운로드용). **GitHub 100MB 한도 때문에 git에는 커밋하지 않음(.gitignore)** — 빌드하면 로컬에 생성되고, 온라인 게임은 `index.html` + `assets/mesbg/`로만 동작한다. 직접 고치지 말 것 — `src/game.js`를 고치고 다시 빌드.

- HTML 앞부분은 base64 인코딩 이미지 에셋 — **절대 손대지 말 것**
- HTML에서 `src/game.js`에 해당하는 구간은 `/*__LWB_SRC_BEGIN__*/` ~ `/*__LWB_SRC_END__*/` 마커 사이
- HTML을 직접 수정해서 `src/game.js`와 어긋났으면 `node tools/extract_src.js`로 다시 추출

## 타이틀 로고·초상화·글꼴 자원

- 타이틀 로고: `assets/mesbg/ui/logo.png` (도트 그림, 화면에서 2배 확대). `python3 tools/make_logo.py <google/fonts 저장소 경로>`로 다시 만든다 (블랙레터·Cinzel Decorative로 그린 뒤 도트로 변환, playwright 필요).
- 초상화 썸네일: 화면 UI(영입 카드·하단 패널·정비창)는 `assets/mesbg/thumbs/*.webp`(높이 160px)를 쓴다. 유닛 그림을 추가·교체하면 `python3 tools/make_thumbs.py`로 다시 만들고 함께 커밋한다 (없으면 원본으로 자동 대체되지만 로딩이 느려진다).
- 픽셀 글꼴: 타이틀은 갈무리(SIL OFL, https://github.com/quiple/galmuri) 서브셋 `assets/mesbg/fonts/galmuri/`를 쓴다. `python3 tools/make_ui_fonts.py <galmuri/dist 경로>`로 다시 만든다.
- 타이틀·로딩·등급 색 CSS는 index.html의 `<style id="ui-extras">`에 있다.

## UI 스타일(CSS) 수정 — index.html 직접 수정 가능 영역

`index.html`에서 `/*__LWB_SRC_END__*/` 마커 **이후**에 나오는 `<style>` 블록들은 빌드로 덮어쓰이지 않는다 — **여기만 HTML을 직접 고쳐도 된다**. HUD/패널/버튼의 색·크기·레이아웃 같은 순수 스타일 변경은 이 구간의 CSS를 수정하면 된다. (index.html이 원본 문서라 새 클론에서도 바로 편집 가능)

- 스타일만 바꾼 경우: HTML만 커밋해도 되지만, 관례적으로 `node tools/build.js` 후 커밋하면 항상 일관됨
- UI 동작·화면 문자열·DOM 생성 코드는 `src/game.js`에 있다 — CSS가 아닌 변경은 src/game.js를 수정 후 빌드

## Claude Code / Cursor 같은 에이전트에 맡기기

```
git clone https://github.com/leesh603/mesbg-assets.git
cd mesbg-assets
npm install sharp
```

에이전트에게 붙여넣을 프롬프트 (그대로 복사):

```
mesbg-assets 리포에서 LAST WAR BAND 게임의 UI/HUD를 개선한다.

[절대 규칙]
- 작업 전 EDITING.md를 읽는다.
- 코드 로직·UI 동작·화면 문자열은 src/game.js 만 수정한다.
- index.html의 __LWB_SRC_BEGIN__/__LWB_SRC_END__ 마커 사이는 빌드 산출물이라 절대 손대지 않는다.
- CSS는 index.html 안 __LWB_SRC_END__ 이후의 <style> 블록들을 수정한다.
- 지금 잘 돌아가는 시스템은 건드리지 말고 최소한의 수정만 한다. 새 버전이 더 나쁘면 적용하지 않고 기존 상태를 유지한다.

[할 일]
(여기에 원하는 작업 작성. 예: 모바일 HUD 크기 조정 / 하단 명령 패널 재구성 / 유닛 카드 디자인 개선)

[완료 후]
- node tools/build.js 실행해 빌드한다.
- git add -A && git commit -m "UI update" && git push origin main
- push하면 https://leesh603.github.io/mesbg-assets/ 에 자동 배포된다.
```

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

- `git push origin main` 만으로 자동 배포 — GitHub Pages가 main 브랜치를 서빙
- 라이브: https://leesh603.github.io/mesbg-assets/ (푸시 후 반영까지 ~1-5분)
- 구 주소(https://c--users-administrator-mesbg-d-ggxmnwtm.devinapps.com)는 수동 배포라 갱신 안 됨
