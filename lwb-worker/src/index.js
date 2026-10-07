// LAST WAR BAND — cloud save + leaderboard API (Cloudflare Worker + D1).
// Port of lwb-server/app/main.py — same endpoints and semantics.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,PUT,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const MAX_SAVE_BYTES = 1_000_000;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...CORS },
  });

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
const hash = (pw) => sha256Hex("lwb-save." + pw);

let schemaReady;
function ensureSchema(db) {
  return (schemaReady ??= db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS saves(id TEXT PRIMARY KEY, pw TEXT NOT NULL, data TEXT NOT NULL, updated REAL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS scores(nickname TEXT NOT NULL, stage INTEGER NOT NULL, kills INTEGER NOT NULL, gold INTEGER NOT NULL, t REAL NOT NULL)"),
  ]));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method.toUpperCase();
    if (method === "OPTIONS") return new Response(null, { status: 204, headers: CORS });
    const db = env.DB;
    try {
      if (pathname === "/health") return json({ ok: true });

      const mSave = pathname.match(/^\/save\/([^/]+)(\/load)?$/);
      if (mSave) {
        await ensureSchema(db);
        const sid = decodeURIComponent(mSave[1]).slice(0, 64);
        const isLoad = !!mSave[2];
        const body = await request.json().catch(() => ({}));
        const pw = typeof body.pw === "string" && body.pw.length >= 1 && body.pw.length <= 64
          ? body.pw : null;
        if (!pw) return json({ detail: "pw required (1-64 chars)" }, 422);

        if (method === "PUT" && !isLoad) {
          const payload = JSON.stringify(body.data ?? null);
          if (payload.length > MAX_SAVE_BYTES) return json({ detail: "save too large" }, 413);
          const pwHash = await hash(pw);
          const row = await db.prepare("SELECT pw FROM saves WHERE id=?").bind(sid).first();
          if (row && row.pw !== pwHash) return json({ detail: "wrong password" }, 403);
          await db.prepare(
            "INSERT INTO saves(id,pw,data,updated) VALUES(?,?,?,?)" +
            " ON CONFLICT(id) DO UPDATE SET pw=excluded.pw,data=excluded.data,updated=excluded.updated"
          ).bind(sid, pwHash, payload, Date.now() / 1000).run();
          return json({ ok: true });
        }

        if (method === "POST" && isLoad) {
          const row = await db.prepare("SELECT pw,data FROM saves WHERE id=?").bind(sid).first();
          if (!row) return json({ detail: "no save" }, 404);
          if (row.pw !== (await hash(pw))) return json({ detail: "wrong password" }, 403);
          return json({ data: JSON.parse(row.data) });
        }
        return json({ detail: "method not allowed" }, 405);
      }

      if (pathname === "/scores") {
        await ensureSchema(db);
        if (method === "GET") {
          const limit = Math.max(1, Math.min(100, parseInt(url.searchParams.get("limit") || "20", 10) || 20));
          const { results } = await db.prepare(
            "SELECT nickname,stage,kills,gold,t FROM scores" +
            " ORDER BY stage DESC, kills DESC, gold DESC, t ASC LIMIT ?"
          ).bind(limit).all();
          return json({
            scores: results.map((r, i) => ({
              rank: i + 1, nickname: r.nickname, stage: r.stage,
              kills: r.kills, gold: r.gold, t: r.t,
            })),
          });
        }
        if (method === "POST") {
          const body = await request.json().catch(() => ({}));
          const nick = String(body.nickname || "무명 전사").trim().slice(0, 16) || "무명 전사";
          const stage = Math.max(0, body.stage | 0), kills = Math.max(0, body.kills | 0);
          const gold = Math.max(0, body.gold | 0), now = Date.now() / 1000;
          await db.prepare(
            "INSERT INTO scores(nickname,stage,kills,gold,t) VALUES(?,?,?,?,?)"
          ).bind(nick, stage, kills, gold, now).run();
          const { better } = await db.prepare(
            "SELECT COUNT(*) AS better FROM scores WHERE" +
            " stage>? OR (stage=? AND kills>?) OR (stage=? AND kills=? AND gold>?)" +
            " OR (stage=? AND kills=? AND gold=? AND t<?)"
          ).bind(stage, stage, kills, stage, kills, gold, stage, kills, gold, now).first();
          return json({ rank: better + 1 });
        }
        return json({ detail: "method not allowed" }, 405);
      }

      return json({ detail: "not found" }, 404);
    } catch (e) {
      return json({ detail: String(e) }, 500);
    }
  },
};
