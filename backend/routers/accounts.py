from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import json
from pathlib import Path

router = APIRouter()
DATA_PATH = Path("backend/users.json")

class Account(BaseModel):
    username: str
    password: str
    game_name: str
    tag: str

def load_accounts():
    if DATA_PATH.exists():
        with open(DATA_PATH, "r", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

@router.get("/accounts")
def get_accounts_handler():
    return load_accounts()

@router.post("/accounts")
def add_account_handler(account: Account):
    data = load_accounts()
    data.append(account.dict())
    save_accounts(data)
    return {"message": "Account added"}

@router.delete("/accounts")
def delete_account_handler(game_name: str):
    data = load_accounts()
    new_data = [acc for acc in data if ac["game_name"] != game_name]
    if len(data) == len(new_data):
        raise HTTPException(status_code=404, detail="Not found")
    save_accounts(new_data)
    return {"message": "Account deleted"}