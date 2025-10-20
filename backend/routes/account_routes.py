from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.account_service import get_accounts, delete_accounts, switch_account_status, update_kpi_details

account_bp = Blueprint("account", __name__)

@account_bp.get("")
@jwt_required()
def get_account():
    username = get_jwt_identity()
    accounts = get_accounts(username)
    return jsonify(accounts)

@account_bp.delete("/<int:account_id>")
def delete_account(account_id):
    if not delete_accounts(account_id):
        return jsonify({"error": "Account not found"}), 404
    return '', 204

@account_bp.put("/<int:account_id>/switch-status")
@jwt_required()
def swich_status(account_id):
    if not switch_account_status(account_id):
        return jsonify({"error": "Account not found"}), 404

    username = get_jwt_identity()
    return jsonify(get_accounts(username))

@account_bp.put('/<int:account_id>/kpi')
@jwt_required()
def update_kpi(account_id):
    data = request.get_json()
    daily = data.get('daily')
    weekly = data.get('weekly')

    if not update_kpi_details(account_id, daily, weekly):
        return jsonify({"error": "Account not found"}), 404

    username = get_jwt_identity()
    return jsonify(get_accounts(username)), 200