from fastapi import APIRouter
import json
from pathlib import Path

router = APIRouter()
CURRENT_PATH = Path("backend/current.json")

@router.get("/current")
def get_current():
    if CURRENT_PATH.exists():
        return json.loads(CURRENT_PATH.read_text(encoding="utf-8"))
    return {}

@router.post("/current")
def sent_current(account: dict):
    CURRENT_PATH.write_text(json.dumps(account, indent=2, ensure_ascii=False), encoding="utf=8")
    return {"message": "Current account updated"}