from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.payment_service import get_subscription_plans, handle_checkout_session

payment_bp = Blueprint("payment", __name__)

@payment_bp.get("/plans")
@jwt_required(optional=True)
def subscription_plan():
    username = get_jwt_identity() if get_jwt_identity() else None
    plans = get_subscription_plans(username)
    return jsonify(plans)

@payment_bp.post("/create-checkout-session")
@jwt_required()
def create_checkout_session():
    username = get_jwt_identity()
    plan_name = request.json.get('planName')
    response = handle_checkout_session(username, plan_name)
    return response
    