from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
from pathlib import Path

router = APIRouter()

USERS_PATH = Path(__file__).resolve().parent.parent.parent / "users.json"

class Account(BaseModel):
    username: str
    password: str
    game_name: str
    tag: str

def load_accounts():
    if USERS_PATH.exists():
        with open(USERS_PATH, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_accounts(data):
    with open(USERS_PATH, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

@router.get("/accounts")
def get_accounts_handler():
    return load_accounts()

@router.post("/accounts")
def add_account_handler(account: Account):
    data = load_accounts()
    
    #   重複チェック
    for acc in data:
        if acc["username"] == account.username and acc["game_name"] == account.game_name:
            raise HTTPException(status_code=409, detail="このアカウントは既に登録されています")
        
    data.append(account.dict())
    save_accounts(data)
    return {"message": "Account added"}

@router.delete("/accounts")
def delete_account_handler(game_name: str):
    data = load_accounts()
    new_data = [acc for acc in data if acc["game_name"] != game_name]
    if len(data) == len(new_data):
        raise HTTPException(status_code=404, detail="Not found")
    save_accounts(new_data)
    return {"message": "Account deleted"}