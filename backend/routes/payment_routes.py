from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import db_connection

payment_bp = Blueprint("paytment", __name__)

@payment_bp.get("/plans")
@jwt_required(optional=True)
def subscription_plan():
    username = get_jwt_identity() if get_jwt_identity() else None
    return db_connection.subscription_plan_details(username)