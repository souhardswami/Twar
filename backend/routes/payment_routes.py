from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import db_connection
import services.payment_service

payment_bp = Blueprint("paytment", __name__)

@payment_bp.get("/plans")
@jwt_required(optional=True)
def subscription_plan():
    username = get_jwt_identity() if get_jwt_identity() else None
    return db_connection.subscription_plan_details(username)

@payment_bp.post("/create-checkout-session")
@jwt_required()
def create_checkout_session():
    username = get_jwt_identity()
    plan_name = request.json.get('planName')
    response = services.payment_service.handle_checkout_session(username, plan_name)
    return response
    