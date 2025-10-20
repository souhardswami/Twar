from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from db import db

def register_user(username, email, password):
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return False, "User already exists"

    # hashed_password = generate_password_hash(password)
    new_user = User(username=username, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return True, "Registration successful"

def login_user(email, password):
    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return False, None
    return True, user.username
