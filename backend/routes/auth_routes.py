from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from services.auth_service import login_user, register_user
import db_connection

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    res = db_connection.register_user(username, email, password)
    if not res:
        return 'User is Already registered', 200
    return 'Registration successfull', 200

@auth_bp.post("/login")
def user_login():
    email = request.json.get('email')
    password = request.json.get('password')
    res, username = db_connection.login_user(email, password)
    
    if not res:
        return 'Email/Password Wrong !!!', 404
    
    
    access_token = create_access_token(identity=username, expires_delta=False)
    
    return jsonify({
        "msg": "User Logged in.",
        "token": access_token
    }), 200
