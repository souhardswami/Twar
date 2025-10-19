from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import db_connection

account_bp = Blueprint("account", __name__)

@account_bp.get("")
@jwt_required()
def get_accounts():
    username = get_jwt_identity() if get_jwt_identity() else None
    accounts = db_connection.get_details(username)
    return jsonify(accounts)

@account_bp.delete("/<int:account_id>")
def delete_account(account_id):
    res = db_connection.delete_account(account_id)
    if not res:
        return 'Account not Found', 404
    return '', 204

@account_bp.put("/<int:account_id>/switch-status")
@jwt_required()
def swich_status(account_id):
    res = db_connection.switch_account_status(account_id)
    if not res:
        return 'Account not Found', 404
    username = get_jwt_identity()
    return jsonify(db_connection.get_details(username))

@account_bp.post('/<int:account_id>/kpi')
@jwt_required()
def update_kpi(account_id):
    daily = request.json.get('daily')
    weekly = request.json.get('weekly')
    res = db_connection.update_kpi_deatils(account_id, daily, weekly)

    if not res:
        return 'Account not found', 404
    username = get_jwt_identity()
    return jsonify(db_connection.get_details(username)), 200