import os

class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "YOUR_SECRET_KEY")
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "JWT_SECRET")
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER", "./uploads")
    DEBUG = os.getenv("DEBUG", True)
    
    # For DB 
    MYSQL_HOST="0.0.0.0"
    MYSQL_PORT=3307
    MYSQL_USER="root"
    MYSQL_USER_PASSWORD="mysql"
    MYSQL_READ_DATABASE="Twar_read_db"
    SQLALCHEMY_DATABASE_URI = (
        f"mysql+pymysql://{MYSQL_USER}:{MYSQL_USER_PASSWORD}@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_READ_DATABASE}"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Twitter Related 
    # request_token_url = "https://api.twitter.com/oauth/request_token"
    # authorization_url = "https://api.twitter.com/oauth/authorize"
    # access_token_url = "https://api.twitter.com/oauth/access_token"