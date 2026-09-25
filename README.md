# MESBG 팬게임 에셋 라이브러리

반지의 제왕 MESBG(게임즈워크숍) 스타일의 팬게임용 그래픽 에셋.
타워디펜스 + SRPG + 로그라이크 웹게임용.

## 폴더 구조

| 경로 | 내용 |
|---|---|
| `tokens/` | 유닛·지형 투명 PNG 142종 — **픽셀아트 단순화 버전** (게임에서 바로 쓰는 파일) |
| `tokens_painted/` | 같은 142종의 도색 미니어처 원본 (픽셀화 전 마스터) |
| `dice-faces/` | 진영별 D6 면 텍스처 42장 — **픽셀아트 버전** (`{faction}-{1~5|emblem}.png`) |
| `dice-faces-painted/` | 도색 원본 주사위 면 42장 |
| `units.csv` / `units.json` | 유닛 DB — id ↔ 이름 ↔ 진영/타입/무기/베이스 ↔ 파일명 |
| `dice.json` | 진영별 주사위 면 경로 매니페스트 |
| `gallery.html` | 에셋 전체 매칭 검수용 갤러리 (정적 서빙해서 열면 됨) |
| `dice-demo/` | three.js + cannon-es 3D 주사위 데모 |
| `px-*.png` (루트) | 픽셀아트 6컷 시트들 + 주사위면 시트 (`tokens/`, `dice-faces/`의 소스) |
| `*.png` (루트) | 도색 원본 6컷 시트들 (`tokens_painted/`의 소스) |
| `cutout.js` | 시트 → 투명 PNG 컷아웃 스크립트 (node + pngjs) |
| `token-idle.js` | 토큰 아이들 모션 헬퍼 — `<img>`용 CSS 클래스 + 캔버스용 `sample()` |
| `build-db.js` | `db-data.js` → units.csv/json + gallery.html 생성기 |
| `db-data.js` | 유닛 메타데이터 원본 (수정은 여기서) |

## 토큰 규격

- **정면 90° 탑다운** — 엔진에서 스태틱 이미지를 360° in-plane 회전하는 구조
- **픽셀아트 룩**: 채도 낮은 셀룩 + 어두운 외곽선 — 인게임 가독성용
- 베이스 림 색: **파랑 = 자유민족(아군), 빨강 = 악(적군)**
- 베이스 크기 = 유닛 등급: `S`(보병 소형) < `M`(보병) < `L`(영웅/경병) < `XL`(기병/대형) < `XXL`(괴수/보스)
- 파일명 = `units.json`의 `id`와 1:1 (`tokens/{id}.png`)
- `terr_` 접두어 = 지형지물 (림 없음, 불규칙 지면 패치)

## 주사위 규격

- 7진영: `minastirith, mordor, isengard, rohan, elf, dwarf, haradrim`
- 1~5면 = 핍, **6면 = 진영 문양** (GW MESBG 방식)
- 512×512 — three.js `BoxGeometry` 6면 텍스처로 바로 사용
- 면 배치 관례: 마주보는 면 합 = 7 (1↔6, 2↔5, 3↔4)

## 쓰는 법 (다른 개발자용)

```bash
git clone https://github.com/leesh603/mesbg-assets.git
# tokens/*.png 를 게임 에셋 폴더로 복사
# units.json 읽어서 유닛 스폰: { id, name_ko, name_en, side, faction, role, weapon, base, file }
```

에셋 추가/수정 요청은 이 repo 이슈 또는 Devin 세션에 — 생성 파이프라인(시트생성 → `node cutout.js` → `node build-db.js` → push)이 갖춰져 있음. `cutout.js`는 기본적으로 `px-*.png` 시트를 읽어 `tokens/`에 출력.

## 아이들 모션 (`token-idle.js`)

토큰은 정지 PNG지만 게임 내에서 "살짝 숨쉬는" 느낌을 런타임에 줄 수 있음 — 프레임 이미지 불필요.

```html
<script src="token-idle.js"></script>
<script>
  // <img> 토큰: id만 넘기면 종류 자동 판별 (units.json 항목 넘겨도 됨)
  TokenIdle.mount(imgEl, 'warg_rider');          // 아이들 시작
  TokenIdle.unmount(imgEl);                      // 정지
  TokenIdle.strike(imgEl);                       // 공격 펀치 (원샷)
  TokenIdle.die(imgEl);                          // 죽음 (가라앉으며 페이드)
</script>
```

캔버스 렌더러면 매 프레임 샘플해서 직접 변환:

```js
const m = TokenIdle.sample('cavalry', performance.now(), unitId);
ctx.translate(m.dx * w, m.dy * h);
ctx.rotate(m.rot);
ctx.scale(m.sx, m.sy);   // dx/dy = 토큰 크기 대비 비율, rot = 라디안
```

종류: `foot`(숨쉬기) `hero`(느린 숨쉬기) `cavalry`(걸음 출렁임) `beast`(전진 몸흔들림) `monster`(무거운 숨) `flyer`(부유) `wraith`(표류+광번쩍임) `banner`(깃대 흔들림) `terrain`(정지). 토큰별로 위상이 해시로 어긋나서 일제히 움직이지 않음. `gallery.html`의 "모션" 버튼에서 바로 확인 가능.
