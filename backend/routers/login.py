import httpx
from fastapi import APIRouter, HTTPException

router = APIRouter()

@router.post("/login")
async def login(account: dict):
    
    # 実際のログイン処理はこの間に入力する
    success = True  #   ログイン成功と仮定
    
    if not success:
        raise HTTPException(status_code=401, details="ログイン失敗")
    
    async with httpx.AsyncClient() as client:
        await client.post("http://localhost:8000/current", json={
            "game_name": account["game_name"],
            "username": account["username"],
            "tag": account["tag"]
        })
    
    return {"message": "ログイン成功"}