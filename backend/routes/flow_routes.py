from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.auth_service import login_user, register_user
import db_connection


flow_bp = Blueprint("flow", __name__)


@flow_bp.post("")
@jwt_required()
def create_flow():
    username = get_jwt_identity()
    nodes = request.json.get('nodes')
    edges = request.json.get('edges')
    flow_id = db_connection.create_flow(username)
    for step in nodes:
        user_input = None
        if 'user_input' in step['data']:
            user_input = step['data']['user_input']
        db_connection.create_flow_steps(flow_id, step['id'], step['data']['label'], user_input)
        
    for edge in edges:
        source, target = edge['source'], edge['target']
        db_connection.create_next_steps(flow_id, source, target)
        
    return {"flow_id": flow_id , "message": "Flow created successfully"}