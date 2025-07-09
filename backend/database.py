import json
from pathlib import Path

USERS_FILE = Path("users.json")
CURRENT_FILE = Path("current.json")

def load_accounts():
    if USERS_FILE.exists():
        with open(USERS_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_accounts(data):
    with open(USERS_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def load_current():
    if CURRENT_FILE.exists():
        with open(CURRENT_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return {}

def save_current(data):
    with open(CURRENT_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)