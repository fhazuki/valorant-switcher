from fastapi import APIRouter, HTTPException
from pathlib import Path
import json
import httpx

router = APIRouter()

USERS_PATH = Path(__file__).resolve().parent.parent / "users.json"

@router.post("/login")
async def login(account: dict):
    
    #   アカウント情報の読み込み
    if not USERS_PATH.exists():
        raise HTTPException(status_code=500, detail="ユーザー情報が存在しません")
    
    with open(USERS_PATH, "r", encoding="utf-8") as f:
        users = json.load(f)
    
    #   アカウント情報の検索
    found = next((u for u in users if
                    u["username"] == account.get("username") and
                    u["password"] == account.get("password") and
                    u["game_name"] == account.get("game_name")), None)
    
    if not found:
        raise HTTPException(status_code=401, detail="ユーザー名・パスワードが存在しません")
    
    #   ログイン成功時に /current に反映する
    async with httpx.AsyncClient() as client:
        await client.post("http://localhost:8000/current", json={
            "game_name": found["game_name"],
            "username": found["username"],
            "tag": found.get["tag"]
        })
    
    return {"message": "ログイン成功"}