from .database import load_accounts, save_accounts, load_current, save_current

def get_accounts():
    return load_accounts()

def add_account(account: dict):
    accounts = load_accounts()
    accounts.append(account)
    save_accounts(accounts)

def delete_account_by_game_name(game_name: str):
    accounts = load_accounts()
    accounts = [a for a in accounts if a["game_name"] != game_name]
    save_accounts(accounts)

def get_current_account():
    return load_current()

def update_current_account(account: dict):
    save_current(account)