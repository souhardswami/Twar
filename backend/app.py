from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from db import db
from config import Config
from routes.auth_routes import auth_bp
from routes.account_routes import account_bp
from routes.payment_routes import payment_bp
from routes.flow_routes import flow_bp
from routes.rag_routes import rag_bp
from routes.twitter_routes import twitter_bp


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)
    JWTManager(app)
    db.init_app(app)
    
    app.register_blueprint(account_bp, url_prefix="/account")
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(payment_bp, url_prefix="/payment")
    app.register_blueprint(flow_bp, url_prefix="/flow")
    app.register_blueprint(rag_bp, url_prefix="/rag")
    app.register_blueprint(twitter_bp, url_prefix="/twitter")
    

    @app.route('/')
    def home():
        return {"msg": "System is Working"}
    return app


if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
