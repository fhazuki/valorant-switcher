from fastapi import FastAPI
from backend.routers import accounts, current

app = FastAPI()

# ルーターを登録
app.include_router(accounts.router)
app.include_router(current.router)