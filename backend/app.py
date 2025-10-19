from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from routes.auth_routes import auth_bp
from routes.account_routes import account_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    JWTManager(app)
    
    app.register_blueprint(account_bp, url_prefix="/account")
    app.register_blueprint(auth_bp, url_prefix="/auth")
    

    @app.route('/')
    def home():
        return {"msg": "System is Working"}
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
