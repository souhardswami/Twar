from db import db

class Bot(db.Model):
    __tablename__ = "bot"

    id = db.Column(db.Integer, primary_key=True)
    screen_name = db.Column(db.String(100))
    kpi_id = db.Column(db.Integer, db.ForeignKey("kpi.id"))
    status = db.Column(db.Boolean, default=False)

    kpi = db.relationship("KPI", back_populates="bot", uselist=False)
