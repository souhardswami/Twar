from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from services.auth_service import login_user, register_user

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.get_json()
    success, message = register_user(
        data.get("username"),
        data.get("email"),
        data.get("password")
    )
    status = 200 if success else 400
    return jsonify({"message": message}), status

@auth_bp.post("/login")
def user_login():
    data = request.get_json()
    success, username = login_user(data.get("email"), data.get("password"))
    if not success:
        return jsonify({"message": "Invalid email or password"}), 401

    token = create_access_token(identity=username)
    return jsonify({"token": token, "message": "Login successful"}), 200
