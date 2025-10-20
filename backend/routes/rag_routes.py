from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
from services.rag_service import uploaded_document
from utils.file_utils import allowed_file


rag_bp = Blueprint("rag", __name__)

@rag_bp.post("")
@jwt_required()
def upload_rag_document():
    user_id = get_jwt_identity()
    if 'document' not in request.files:
        return jsonify({"msg": "No document uploaded"}), 400
    
    document = request.files['document']
    if  not document.filename:
        return jsonify({"msg": "No document selected"}), 400
    
    if not allowed_file(document.filename):
        return jsonify({"msg": "Invalid file type"}), 400
        
    try:
        filename = secure_filename(document.filename)
        result = uploaded_document(document, filename, user_id)
        return jsonify({"msg": result}), 200
    
    except Exception as e:
        return jsonify({"msg": f"Upload failed: {str(e)}"}), 500
