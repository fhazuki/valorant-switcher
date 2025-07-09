from pydantic import BaseModel
from typing import Optional

class Account(BaseModel):
    username: str
    password: str
    game_name: str
    tag: Optional[str] = None