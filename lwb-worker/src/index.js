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
    db.prepare("CREATE TABLE IF NOT EXISTS rooms(code TEXT PRIMARY KEY, host_tok TEXT NOT NULL, guest_tok TEXT, settings TEXT, host_band TEXT, guest_band TEXT, state TEXT, seq INTEGER NOT NULL DEFAULT 0, created REAL NOT NULL, updated REAL NOT NULL)"),
    db.prepare("CREATE TABLE IF NOT EXISTS room_cmds(code TEXT NOT NULL, n INTEGER NOT NULL, cmd TEXT NOT NULL, PRIMARY KEY(code,n))"),
  ]).catch((error) => {
    // A transient D1 error must not poison every subsequent request.
    schemaReady = undefined;
    throw error;
  }));
}


// ---- Online match rooms (private code, host-authoritative, HTTP polling) ----
const ROOM_TTL = 6 * 3600;
const MAX_STATE_BYTES = 900_000;
const CODE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
const rand = (n, chars) => { const a = crypto.getRandomValues(new Uint8Array(n)); return [...a].map((b) => chars[b % chars.length]).join(""); };
const token = () => rand(24, "abcdefghijklmnopqrstuvwxyz0123456789");
const parse = (t) => { try { return t == null ? null : JSON.parse(t); } catch { return null; } };

async function rooms(request, env, url, pathname, method) {
  const db = env.DB;
  await ensureSchema(db);
  const now = Date.now() / 1000;
  if (pathname === "/room" && method === "POST") {
    const body = await request.json().catch(() => ({}));
    await db.batch([
      db.prepare("DELETE FROM room_cmds WHERE code IN (SELECT code FROM rooms WHERE updated<?)").bind(now - ROOM_TTL),
      db.prepare("DELETE FROM rooms WHERE updated<?").bind(now - ROOM_TTL),
    ]);
    for (let i = 0; i < 6; i++) {
      const code = rand(6, CODE_CHARS), tok = token();
      const r = await db.prepare("INSERT OR IGNORE INTO rooms(code,host_tok,settings,created,updated) VALUES(?,?,?,?,?)")
        .bind(code, tok, JSON.stringify(body.settings ?? {}), now, now).run();
      if (r.meta.changes) return json({ code, token: tok, role: "host" });
    }
    return json({ detail: "could not allocate a room code" }, 503);
  }
  const m = pathname.match(/^\/room\/([A-Z0-9]{6})(\/(join|band|state|cmd|cmds|settings))?$/);
  if (!m) return null;
  const code = m[1], op = m[3] || "";
  const room = await db.prepare("SELECT * FROM rooms WHERE code=?").bind(code).first();
  if (!room || room.updated < now - ROOM_TTL) return json({ detail: "room not found" }, 404);
  const body = method === "GET" ? {} : await request.json().catch(() => ({}));
  const tok = method === "GET" ? url.searchParams.get("token") : body.token;
  const role = tok && tok === room.host_tok ? "host" : tok && tok === room.guest_tok ? "guest" : null;

  if (op === "join" && method === "POST") {
    if (role) return json({ token: tok, role, settings: parse(room.settings) });
    if (room.guest_tok) return json({ detail: "room is full" }, 409);
    const g = token();
    const r = await db.prepare("UPDATE rooms SET guest_tok=?,updated=? WHERE code=? AND guest_tok IS NULL").bind(g, now, code).run();
    if (!r.meta.changes) return json({ detail: "room is full" }, 409);
    return json({ token: g, role: "guest", settings: parse(room.settings) });
  }
  if (!role) return json({ detail: "invalid token" }, 403);

  if (op === "" && method === "GET") {
    const since = parseInt(url.searchParams.get("since") || "-1", 10);
    return json({
      role, guest: !!room.guest_tok, settings: parse(room.settings),
      hostBand: parse(room.host_band), guestBand: parse(room.guest_band),
      seq: room.seq, state: room.seq > since ? parse(room.state) : undefined,
    });
  }
  if (op === "settings" && method === "POST") {
    if (role !== "host") return json({ detail: "host only" }, 403);
    await db.prepare("UPDATE rooms SET settings=?,updated=? WHERE code=?").bind(JSON.stringify(body.settings ?? {}), now, code).run();
    return json({ ok: true });
  }
  if (op === "band" && method === "POST") {
    const col = role === "host" ? "host_band" : "guest_band";
    await db.prepare(`UPDATE rooms SET ${col}=?,updated=? WHERE code=?`).bind(JSON.stringify(body.band ?? null), now, code).run();
    return json({ ok: true });
  }
  if (op === "state" && method === "PUT") {
    if (role !== "host") return json({ detail: "host only" }, 403);
    const payload = JSON.stringify(body.state ?? null);
    if (new TextEncoder().encode(payload).byteLength > MAX_STATE_BYTES) return json({ detail: "state too large" }, 413);
    const seq = Number.isSafeInteger(body.seq) ? body.seq : room.seq + 1;
    await db.prepare("UPDATE rooms SET state=?,seq=?,updated=? WHERE code=?").bind(payload, seq, now, code).run();
    return json({ ok: true, seq });
  }
  if (op === "cmd" && method === "POST") {
    if (role !== "guest") return json({ detail: "guest only" }, 403);
    const last = await db.prepare("SELECT COALESCE(MAX(n),0) AS n FROM room_cmds WHERE code=?").bind(code).first();
    const n = (last?.n || 0) + 1;
    await db.batch([
      db.prepare("INSERT INTO room_cmds(code,n,cmd) VALUES(?,?,?)").bind(code, n, JSON.stringify(body.cmd ?? null)),
      db.prepare("UPDATE rooms SET updated=? WHERE code=?").bind(now, code),
    ]);
    return json({ n });
  }
  if (op === "cmds" && method === "GET") {
    if (role !== "host") return json({ detail: "host only" }, 403);
    const since = parseInt(url.searchParams.get("since") || "0", 10);
    const { results } = await db.prepare("SELECT n,cmd FROM room_cmds WHERE code=? AND n>? ORDER BY n LIMIT 50").bind(code, since).all();
    return json({ cmds: results.map((r) => ({ n: r.n, cmd: parse(r.cmd) })) });
  }
  return json({ detail: "method not allowed" }, 405);
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
      if (pathname === "/room" || pathname.startsWith("/room/")) {
        const r = await rooms(request, env, url, pathname, method);
        if (r) return r;
      }

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
          if (new TextEncoder().encode(payload).byteLength > MAX_SAVE_BYTES) return json({ detail: "save too large" }, 413);
          const pwHash = await hash(pw);
          const row = await db.prepare("SELECT pw FROM saves WHERE id=?").bind(sid).first();
          if (row && row.pw !== pwHash) return json({ detail: "wrong password" }, 403);
          // The SQL statement must enforce ownership atomically: two initial
          // SELECTs can both see an absent id before either INSERT executes.
          const written = await db.prepare(
            "INSERT INTO saves(id,pw,data,updated) VALUES(?,?,?,?)" +
            " ON CONFLICT(id) DO UPDATE SET data=excluded.data,updated=excluded.updated WHERE saves.pw=excluded.pw"
          ).bind(sid, pwHash, payload, Date.now() / 1000).run();
          if (written.meta.changes === 0) return json({ detail: "wrong password" }, 403);
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
          const { stage, kills, gold } = body;
          if (!Number.isInteger(stage) || stage < 0 || stage > 70 ||
              !Number.isSafeInteger(kills) || kills < 0 || kills > 2147483647 ||
              !Number.isSafeInteger(gold) || gold < 0 || gold > 2147483647)
            return json({ detail: "invalid score: stage 0-70; nonnegative integer kills/gold required" }, 422);
          const now = Date.now() / 1000;
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
