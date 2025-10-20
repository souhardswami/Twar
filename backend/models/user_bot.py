from db import db

class UserBot(db.Model):
    __tablename__ = "user_bots"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    bot_id = db.Column(db.Integer, db.ForeignKey("bot.id"))
