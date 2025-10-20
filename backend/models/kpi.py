from db import db

class KPI(db.Model):
    __tablename__ = "kpi"

    id = db.Column(db.Integer, primary_key=True)
    daily = db.Column(db.Integer, default=0)
    weekly = db.Column(db.Integer, default=0)
    used_daily = db.Column(db.Integer, default=0)
    used_weekly = db.Column(db.Integer, default=0)

    bot = db.relationship("Bot", back_populates="kpi", uselist=False)
