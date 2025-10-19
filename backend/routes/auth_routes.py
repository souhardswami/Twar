from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from services.auth_service import login_user, register_user
import db_connection

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.json
    success, message = register_user(data)
    status = 200 if success else 400
    return jsonify({"msg": message}), status

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
