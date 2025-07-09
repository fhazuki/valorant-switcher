from fastapi import FastAPI, Query
from routers import accounts, current
from models import Account
import crud
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

#   ルーターを登録
app.include_router(accounts.router)
app.include_router(current.router)

#   CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/accounts")
def get_accounts():
    return crud.get_accounts()

@app.post("/accounts")
def add_account(account: Account):
    crud.add_account(account.dict())
    return {"message": "Account added successfully"}

@app.delete("/accounts")
def delete_account(game_name: str = Query(...)):
    crud.delete_account_by_game_name(game_name)
    return {"message": f"Deleted account with game_name: {game_name}"}

@app.get("/current")
def get_current():
    return crud.get_current_account()

@app.post("/current")
def update_current(account: Account):
    crud.update_current_account(account.dict())
    return {"message": "Current account updated"}