from db import db
from models.bot import Bot
from models.kpi import KPI
from models.user_bot import UserBot

def get_accounts(username):
    bots = (
        db.session.query(Bot)
        .join(KPI, Bot.kpi_id == KPI.id)
        .join(UserBot, UserBot.bot_id == Bot.id)
        .filter(UserBot.username == username)
        .all()
    )

    result = []
    for bot in bots:
        result.append({
            "id": bot.id,
            "screen_name": bot.screen_name,
            "status": bot.status,
            "kpi_id": bot.kpi.id,
            "daily": bot.kpi.daily,
            "weekly": bot.kpi.weekly,
            "used_daily": bot.kpi.used_daily,
            "used_weekly": bot.kpi.used_weekly,
        })
    
    return result

def delete_accounts(account_id):
    bot = Bot.query.get(account_id)
    if not bot:
        return False
    db.session.delete(bot)
    db.session.commit()
    return True

def switch_account_status(account_id):
    bot = Bot.query.get(account_id)
    if not bot:
        return False
    bot.status =  not bot.status
    db.session.commit()
    return True

def update_kpi_details(account_id, daily, weekly):
    bot = Bot.query.get(account_id)
    if not bot:
        return False
    kpi = bot.kpi
    kpi.daily = daily
    kpi.weekly = weekly
    db.session.commit()
    return True

def get_account_by_account_id(account_id):
    try:
        accounts = (
            db.session.query(Bot)
            .filter( Bot.id == account_id)
            .all())
        return accounts      
    except Exception as ex:
        print(f"Error: {ex} getting data for account id {account_id}")
        return None