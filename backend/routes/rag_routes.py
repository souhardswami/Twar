from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.utils import secure_filename
import utils.file_utils
import db_connection
import os


rag_bp = Blueprint("rag", __name__)
FILE_PATH = db_connection.FILE_UPLOAD_PATH

@rag_bp.post("")
@jwt_required()
def upload_rag_document():
    user_id = get_jwt_identity()
    if 'document' not in request.files:
        return jsonify({"msg": "No document uploaded"}), 400
    
    document = request.files['document']
    if document.filename == '':
        return jsonify({"msg": "No document selected"}), 400
    
    if document and utils.file_utils.allowed_file(document.filename):
        filename = secure_filename(document.filename)
        document.save(os.path.join(FILE_PATH, filename))
        db_connection.store_vector(filename, user_id)
        return jsonify({"msg": "Document uploaded successfully"}), 200
    return jsonify({"msg": "Invalid file type"}), 400
