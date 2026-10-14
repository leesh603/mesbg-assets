# 사우론 / 마술사왕 도트 등장 컷신

PR #29의 보스 패턴 위에 추가했다. 최신 main의 누메노르 궁수 원화/체급 수정도 보존했다. 전투 수치·기존 스마우그 등장 연출은 변경하지 않는다.

## 장면

- **사우론:** 검은 강철 건틀릿 위로 절대반지가 내려온다 → 손가락에 끼워진다 → 금속음과 황금 문양 → 주먹을 쥔다 → 사우론 본체와 공격 안내가 드러난다. 6개 고유 키프레임, 일반 속도 약 5초.
- **마술사왕:** 펠비스트의 어두운 실루엣 → 날개를 펼치는/내리는 6개 키프레임 → 비명과 함께 **“No living man may hinder me!”** → 마술사왕 본체와 공격 안내. `man`은 금색으로 강조한다. 일반 속도 약 6초.
- 정지 그림 확대만 반복하는 기존 카드 대신, 실제 3×2 스프라이트 시트의 각 프레임을 바꿔 재생한다. 기존 보스 그림은 마지막 본체 장면에 사용한다.

## 그림 / 소리

- `assets/mesbg/cinematics/sauron-ring-sheet.png`
- `assets/mesbg/cinematics/witchking-flight-sheet.png`
- 두 PNG 모두 1536×1024 RGBA, 512×512 프레임 6개. 내장 이미지 생성 도구로 제작했고, 사용한 프롬프트·기준 그림·파일 대응은 [boss-cinematic-assets.json](boss-cinematic-assets.json)에 남겼다.
- `audio/boss_nazgul_shriek.wav`: 떨리는 발성·서로 다른 음높이·공기 소리·잔향을 겹친 4.2초 울음.
- `audio/boss_fell_wing.wav`: 날개막이 공기를 가르는 소리와 낮은 충격.
- `audio/boss_ring_seal.wav`: 강철과 금이 맞닿는 비조화 금속 배음.
- `audio/boss_dark_omen.wav`: 등장 아래에 깔리는 낮은 불협화음.
- 소리는 영화 녹음/샘플 없이 직접 합성했다. 재생용 PCM은 22050Hz stereo/16-bit, 파형 peak ≤0.68. 재현: `python tools/make-boss-cinematic-audio.py`. 음향 경로는 `assets/mesbg/audio/`, 측정값은 `boss-cinematic-audio.json`.

## 재생과 조작

실제 `WaveStarted` 이벤트를 게임 행동 큐에서 기다려 재생한다. 그동안 기존 게임 영역은 inert이며 중복 입력을 막는다. 끝나면 큐를 이어가고 원래 포커스·조작을 복원한다. 기본 보스 카드가 중복으로 뜨지 않는다.

원래 BGM은 컷신 동안 24%로 낮아지고 끝나면 사용자 음량·현재 음악 모드로 복원된다. 효과음도 기존 음소거·효과음 음량·동시 음성 한도를 따른다. 오디오 파일 다운로드 중 건너뛰거나 음소거해도 늦게 비명이 재생되지 않는다. 컷신 소리를 중단할 때 짧게 페이드아웃한다.

- **건너뛰기 / Escape:** 즉시 종료·입력 복원·음악 복원.
- **화면 숨김:** 컷신 종료, 잔여 타이머/음향 정리.
- **연출 OFF / 즉시 진행:** 컷신 생략.
- **움직임 줄이기:** 고정 프레임·대사 위주로 짧게 재생, 화면 흔들림 제거.
- 일반 배속 4× 이상에서는 짧은 키프레임 재생으로 압축한다. 효과음 pitch를 배속으로 올리지 않는다.
- 해당 보스 배치 단계에서만 시트를 미리 받는다. 모든 컷신을 초기 부팅 때 읽지 않는다. 다운로드 실패 시 기존 본체 그림과 대사로 대체한다.

## 검증

- 빌드: `node tools/build.js --no-bundle` — 전체 기존 에셋 manifest에 새 시트·소리를 추가하고 JS/CSS를 HTML에 합친다.
- `node tests/boss-cinematic-audio.test.cjs` — 6프레임 위치, 정확한 대사, 음향 데이터, BGM duck/복원, mute/hidden/volume, 정리·다운로드 취소.
- `node tests/audio-pack.test.cjs` — 기존 30종/74개 음향, BGM 전환·캐시·음량·음소거 검사 유지.
- 기존 `boss-patterns.test.cjs` 15개, `tactics.test.cjs` 20개 유지.
- `CHROMIUM_PATH=<chrome> node tests/boss-cinematics-browser.cjs` — 실제 Phaser 행동 큐, PCM decode, PC 1280×900 / 모바일 세로 390×844 / 가로 844×390. 두 보스 일반 재생 6개와 각 화면의 skip/off/reduced/muted 3개. 6개 프레임 표시, 대사·뷰포트 범위, BGM 복원, inert 해제, 정적 카드 중복 및 런타임/새 에셋 오류를 확인한다. 실제 전투 능력치나 체력은 바꾸지 않는다.

결과와 화면은 `review/boss-cinematics/`에 있다. 디버그 미리보기: `MESBG.bossCinematics.preview('sauron')`, `MESBG.bossCinematics.preview('witchking_fellbeast')`.
