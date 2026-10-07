"""LAST WAR BAND — server save + leaderboard API.

Endpoints consumed by the game (src/game.js, LWB_API):
  GET  /scores?limit=20          -> {"scores": [{rank, nickname, stage, kills, gold, t}]}
  POST /scores  {nickname,stage,kills,gold} -> {"rank": int}
  PUT  /save/{id} {pw, data}     -> 200 {"ok":true} | 403 wrong pw
  POST /save/{id}/load {pw}      -> {"data": ...} | 404 no save | 403 wrong pw

Storage: sqlite file (persistent volume at /data when deployed).
"""
import hashlib
import json
import os
import sqlite3
import threading
import time
from typing import Any

from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

DB_PATH = os.environ.get("LWB_DB", "/data/lwb.db" if os.path.isdir("/data") else "lwb.db")
MAX_SAVE_BYTES = 1_000_000  # generous; real saves are a few KB of JSON

_lock = threading.Lock()


def _db() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH, timeout=15)
    conn.execute(
        "CREATE TABLE IF NOT EXISTS saves("
        "id TEXT PRIMARY KEY, pw TEXT NOT NULL, data TEXT NOT NULL, updated REAL)"
    )
    conn.execute(
        "CREATE TABLE IF NOT EXISTS scores("
        "nickname TEXT NOT NULL, stage INTEGER NOT NULL, kills INTEGER NOT NULL,"
        "gold INTEGER NOT NULL, t REAL NOT NULL)"
    )
    return conn


def _hash(pw: str) -> str:
    return hashlib.sha256(("lwb-save." + pw).encode("utf-8")).hexdigest()


class SavePut(BaseModel):
    pw: str = Field(min_length=1, max_length=64)
    data: Any


class SaveLoad(BaseModel):
    pw: str = Field(min_length=1, max_length=64)


class ScoreIn(BaseModel):
    nickname: str = Field(default="무명 전사", max_length=24)
    stage: int = Field(default=0, ge=0)
    kills: int = Field(default=0, ge=0)
    gold: int = Field(default=0, ge=0)


app = FastAPI()
app.title = "LAST WAR BAND save server"
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict:
    return {"ok": True}


@app.put("/save/{save_id}")
def save_put(save_id: str, body: SavePut, request: Request):
    sid = save_id[:64]
    payload = json.dumps(body.data, ensure_ascii=False)
    if len(payload) > MAX_SAVE_BYTES:
        raise HTTPException(413, "save too large")
    with _lock, _db() as conn:
        row = conn.execute("SELECT pw FROM saves WHERE id=?", (sid,)).fetchone()
        if row and row[0] != _hash(body.pw):
            raise HTTPException(403, "wrong password")
        conn.execute(
            "INSERT INTO saves(id,pw,data,updated) VALUES(?,?,?,?)"
            " ON CONFLICT(id) DO UPDATE SET pw=excluded.pw,data=excluded.data,updated=excluded.updated",
            (sid, _hash(body.pw), payload, time.time()),
        )
    return {"ok": True}


@app.post("/save/{save_id}/load")
def save_load(save_id: str, body: SaveLoad):
    sid = save_id[:64]
    with _lock, _db() as conn:
        row = conn.execute("SELECT pw,data FROM saves WHERE id=?", (sid,)).fetchone()
        if not row:
            raise HTTPException(404, "no save")
        if row[0] != _hash(body.pw):
            raise HTTPException(403, "wrong password")
        return {"data": json.loads(row[1])}


@app.get("/scores")
def scores(limit: int = 20):
    limit = max(1, min(100, limit))
    with _lock, _db() as conn:
        rows = conn.execute(
            "SELECT nickname,stage,kills,gold,t FROM scores"
            " ORDER BY stage DESC, kills DESC, gold DESC, t ASC LIMIT ?",
            (limit,),
        ).fetchall()
    return {
        "scores": [
            {"rank": i + 1, "nickname": r[0], "stage": r[1], "kills": r[2], "gold": r[3], "t": r[4]}
            for i, r in enumerate(rows)
        ]
    }


@app.post("/scores")
def score_add(body: ScoreIn):
    nick = (body.nickname or "").strip()[:16] or "무명 전사"
    now = time.time()
    with _lock, _db() as conn:
        conn.execute(
            "INSERT INTO scores(nickname,stage,kills,gold,t) VALUES(?,?,?,?,?)",
            (nick, body.stage, body.kills, body.gold, now),
        )
        better = conn.execute(
            "SELECT COUNT(*) FROM scores WHERE"
            " stage>? OR (stage=? AND kills>?) OR (stage=? AND kills=? AND gold>?)"
            " OR (stage=? AND kills=? AND gold=? AND t<?)",
            (
                body.stage, body.stage, body.kills, body.stage, body.kills, body.gold,
                body.stage, body.kills, body.gold, now,
            ),
        ).fetchone()[0]
    return {"rank": better + 1}
