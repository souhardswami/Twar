import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "YOUR_SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "JWT_SECRET")
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "./uploads")
    DEBUG = os.getenv("DEBUG", True)
    
    # For DB 
    SQLALCHEMY_DATABASE_URI = (
        "mysql+pymysql://root:mysql@0.0.0.0:3307/Twar_read_db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Twitter Related 
    # request_token_url = "https://api.twitter.com/oauth/request_token"
    # authorization_url = "https://api.twitter.com/oauth/authorize"
    # access_token_url = "https://api.twitter.com/oauth/access_token"