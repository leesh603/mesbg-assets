# MESBG 팬게임 에셋 라이브러리

반지의 제왕 MESBG(게임즈워크숍) 스타일의 팬게임용 그래픽 에셋.
타워디펜스 + SRPG + 로그라이크 웹게임용.

## 폴더 구조

| 경로 | 내용 |
|---|---|
| `tokens/` | 유닛·지형 투명 PNG 178종 — **픽셀아트 단순화 버전** (게임에서 바로 쓰는 파일) |
| `tokens_painted/` | 같은 178종의 도색 미니어처 원본 (픽셀화 전 마스터) |
| `dice-faces/` | 진영별 D6 면 텍스처 42장 — **픽셀아트 버전** (`{faction}-{1~5|emblem}.png`) |
| `dice-faces-painted/` | 도색 원본 주사위 면 42장 |
| `units.csv` / `units.json` | 유닛 DB — id ↔ 이름 ↔ 진영/타입/무기/베이스 ↔ 파일명 |
| `backgrounds/` | 전장 배경 맵 10종 (미나스 티리스·검은문·헬름 협곡·아몬 술·오스길리아스·이젠가드·모리아·고르고로스·에도라스·팡곤) — 토큰이 도드라지도록 채도 낮춘 탑다운 맵 |
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

토큰은 정지 PNG지만 게임 내에서 "살짝 숨쉬는" 느낌을 런타임에 줄 수 있음 — 프레임 이미지 불필요. **베이스(발판)는 항상 정지**: `mount()`가 같은 이미지를 한 장 더 쌓아 중심 방사형 마스크로 피겨 부분만 덮은 뒤 그 레이어만 움직임.

```html
<script src="token-idle.js"></script>
<script>
  // <img> 토큰: id만 넘기면 종류 자동 판별 (units.json 항목 넘겨도 됨)
  TokenIdle.mount(imgEl, 'warg_rider');          // 아이들 시작 (베이스 고정, 피겨만 움직임)
  TokenIdle.unmount(imgEl);                      // 정지
  TokenIdle.attack(imgEl);                       // 공격 원샷 — 무기 종류 자동 판별
  TokenIdle.attack(imgEl, 'smash');              // 종류 강제 지정도 가능
  TokenIdle.strike(imgEl);                       // = attack() 별칭
  TokenIdle.die(imgEl);                          // 죽음 (가라앉으며 페이드, 전체)
</script>
```

캔버스 렌더러면 같은 2겹 구조를 직접 그림: 스프라이트를 한 번 그대로(고정 베이스), 중심 방사형 마스크를 씌워 한 번 더(피겨) — 두 번째 패스에만 transform 적용. `sample()`의 반환값 `m.mask` = `[불투명 반경, 페이드 끝 반경]` (절반 폭 기준 비율):

```js
const m = TokenIdle.sample('cavalry', performance.now(), unitId);
// pass 2 (figure) only: pivot at (50%, m.oy*h) — rotate(m.rot), scale(m.sx, m.sy), translate(m.dx*w, m.dy*h)
```

종류: `foot`(숨쉬기) `hero`(느린 숨쉬기) `cavalry`(걸음 출렁임 — 발굽 붙고 몸통만) `beast`(전진 몸흔들림) `monster`(무거운 숨) `flyer`(부유) `wraith`(표류+광번쩍임) `banner`(깃대 흔들림) `terrain`(정지). 토큰별로 위상이 해시로 어긋나서 일제히 움직이지 않음. `gallery.html`의 "모션" 버튼에서 바로 확인 가능 — 카드 클릭 시 공격 모션 재생.

공격 모션 종류 (무기/종류로 자동 판별, `attackTypeFor(id, meta)`): `slash`(검·도끼·단검 — 베기) `thrust`(창·랜스·파이크 — 찌르기) `smash`(둔기·양손무기·몬스터 — 들어올렸다 내리찍기) `shoot`(활·석궁 — 당겼다 놓기) `cast`(지팡이·폭탄 — 부상+광 폭발) `rally`(기수·북 — 깃 흔들기) `pounce`(야수 — 덮치기). 마술왕·나즈굴·간달프·사루만·주술사 계열은 이름 기준으로 무기와 무관하게 `cast` 적용. 모든 공격은 예비동작→타격(플래시)→여운 단계에 구간별 이징.

타격 프레임에 `effects/fx_<type>.png` 오버레이(베기 섬광·찌르기 잔상·충격파·마법 폭발·발톱·화살·기수 링)가 자동으로 얹힘 — 마스크 밖이라 피겨 실루엣 너머까지 표시됨. DOM 경로만 자동; 경로 바꾸려면 `TokenIdle.fxDir = 'assets/fx/'`. 스프라이트 재생성은 `node gen-effects.js`. 캔버스면 `attackSample(type, progress01)` 반환값을 idle `sample()` 결과에 합성(스케일은 곱, 나머지는 합)하고, `ATTACKS[type].fxAt` 시점부터 같은 스프라이트를 그리면 됨.
