# lwb-worker — LAST WAR BAND save/leaderboard API (Cloudflare Workers + D1)

`lwb-server/` FastAPI와 동일한 API를 Cloudflare Workers 무료 티어로 옮긴 포트.
실서비스: https://lwb-server.justzeon.workers.dev

## 엔드포인트
- `GET /health` → `{"ok":true}`
- `PUT /save/{id}` `{pw,data}` → 200 `{"ok":true}` | 403 비번 불일치 | 413 초과
- `POST /save/{id}/load` `{pw}` → `{"data":...}` | 404 없음 | 403 비번 불일치
- `GET /scores?limit=20` → `{"scores":[{rank,nickname,stage,kills,gold,t}]}`
- `POST /scores` `{nickname,stage,kills,gold}` → `{"rank":n}`

### 온라인 대전 (비공개 코드 방)
- `POST /room` `{settings}` → `{code, token, role:"host"}` — 6자리 코드, 6시간 뒤 만료
- `POST /room/{code}/join` → `{token, role:"guest", settings}` | 404 없음 | 409 두 명 다 참가
- `GET /room/{code}?token=&since=seq` → `{role, guest, settings, hostBand, guestBand, seq, state?}`
- `POST /room/{code}/band` `{token, band}` — 양쪽 편성 제출
- `PUT /room/{code}/state` `{token, seq, state}` — 방장 기기의 전투 상태 (최대 900KB)
- `POST /room/{code}/cmd` `{token, cmd}` / `GET /room/{code}/cmds?token=&since=n` — 상대 명령 전달

## 구조
- `src/index.js` — Worker 핸들러 (첫 요청 시 `CREATE TABLE IF NOT EXISTS` 자동 실행)
- `wrangler.toml` — D1 바인딩 `env.DB` → DB `lwb` (id: 35decbba-ba01-4d9d-812a-8b9b832acb4f)
- 데이터는 계정 `justzeon@gmail.com`의 D1 `lwb`에 저장 (saves/scores 테이블)

## 재배포
```sh
npm i -D wrangler
CLOUDFLARE_API_TOKEN=<토큰> npx wrangler deploy
```
GitHub 저장소 시크릿 `CLOUDFLARE_API_TOKEN`을 넣어 두면 `lwb-worker/` 변경이 main에 올라갈 때 `.github/workflows/deploy-worker.yml`이 자동 배포한다.
토큰 없으면 `npx wrangler login`(브라우저 승인). 무료 티어: 요청 10만/일, D1 읽기 500만·쓰기 10만/일.
