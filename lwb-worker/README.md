# lwb-worker — LAST WAR BAND save/leaderboard API (Cloudflare Workers + D1)

`lwb-server/` FastAPI와 동일한 API를 Cloudflare Workers 무료 티어로 옮긴 포트.
실서비스: https://lwb-server.justzeon.workers.dev

## 엔드포인트
- `GET /health` → `{"ok":true}`
- `PUT /save/{id}` `{pw,data}` → 200 `{"ok":true}` | 403 비번 불일치 | 413 초과
- `POST /save/{id}/load` `{pw}` → `{"data":...}` | 404 없음 | 403 비번 불일치
- `GET /scores?limit=20` → `{"scores":[{rank,nickname,stage,kills,gold,t}]}`
- `POST /scores` `{nickname,stage,kills,gold}` → `{"rank":n}`

## 구조
- `src/index.js` — Worker 핸들러 (첫 요청 시 `CREATE TABLE IF NOT EXISTS` 자동 실행)
- `wrangler.toml` — D1 바인딩 `env.DB` → DB `lwb` (id: 35decbba-ba01-4d9d-812a-8b9b832acb4f)
- 데이터는 계정 `justzeon@gmail.com`의 D1 `lwb`에 저장 (saves/scores 테이블)

## 재배포
```sh
npm i -D wrangler
CLOUDFLARE_API_TOKEN=<토큰> npx wrangler deploy
```
토큰 없으면 `npx wrangler login`(브라우저 승인). 무료 티어: 요청 10만/일, D1 읽기 500만·쓰기 10만/일.
