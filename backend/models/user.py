from db import db

class User(db.Model):
    __tablename__ = "user_auth"

    username = db.Column(db.String(100), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)