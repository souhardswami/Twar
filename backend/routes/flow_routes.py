from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from services.flow_service import create_flow, create_flow_steps, create_next_steps

flow_bp = Blueprint("flow", __name__)

@flow_bp.post("")
@jwt_required()
def flow():
    username = get_jwt_identity()
    nodes = request.json.get('nodes')
    edges = request.json.get('edges')
    flow_id = create_flow(username)
    
    for step in nodes:
        user_input = step['data'].get('user_input')
        create_flow_steps(flow_id, step['id'], step['data']['label'], user_input)

    for edge in edges:
        create_next_steps(flow_id, edge['source'], edge['target'])

    return jsonify({"flow_id": flow_id, "message": "Flow created successfully"}), 200