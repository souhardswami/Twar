from flask import Flask, request, jsonify, session, redirect
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from requests_oauthlib import OAuth1Session
from config import *
from bot import run
from payment import handle_checkout_session
import json, os
import db_connection


app = Flask(__name__)
app.secret_key = 'YOUR_SECRET_KEY'
CORS(app)

jwt = JWTManager(app)

def save_data(data):
    with open(DATA_FILE, 'w') as file:
        json.dump(data, file, indent=4)

def add_account(oauth_tokens):
    accounts = load_data()
    new_account = DATA_SCHEMA.copy()
    new_account['oauth_token'] = oauth_tokens['oauth_token']
    new_account['oauth_token_secret'] = oauth_tokens['oauth_token_secret']
    new_account['id'] = oauth_tokens['user_id']
    new_account['screen_name'] = oauth_tokens['screen_name']
    accounts.append(new_account)
    save_data(accounts)
    print ("New Account saved Successfully")

@app.route('/')
def index():
    return 'System is Working'

@app.route('/accounts', methods=['GET'])
def get_accounts():
    accounts = db_connection.get_details()
    return jsonify(accounts)

@app.route('/account/<int:account_id>', methods=['DELETE'])
def delete_account(account_id):
    res = db_connection.delete_account(account_id)
    if not res:
        return 'Account not Found', 404
    return '', 204

@app.route('/account/<int:account_id>/swichStatus', methods=['PUT'])
def swich_status(account_id):
    res = db_connection.switch_account_status(account_id)
    if not res:
        return 'Account not Found', 404
    
    return jsonify(db_connection.get_details())



@app.route('/kpi/<int:account_id>', methods=['POST'])
def update_kpi(account_id):
    daily = request.json.get('daily')
    weekly = request.json.get('weekly')
    res = db_connection.update_kpi_deatils(account_id, daily, weekly)

    if not res:
        return 'Account not found', 404
    return jsonify(db_connection.get_details()), 200

@app.route('/user-register', methods=['POST'])
def user_register():
    username = request.json.get('username')
    email = request.json.get('email')
    password = request.json.get('password')
    res = db_connection.register_user(username, email, password)
    
    if not res:
        return 'User is Already registered', 200
    return 'Registration successfull', 200

@app.route('/user-login', methods=['POST'])
def user_login():
    email = request.json.get('email')
    password = request.json.get('password')
    res, username = db_connection.login_user(email, password)
    
    if not res:
        return 'Email/Password Wrong !!!', 404
    
    
    access_token = create_access_token(identity=username, expires_delta=False)
    
    return jsonify({
        "msg": "User Logged in.",
        "token": access_token
    }), 200
    
@app.route('/get_plans', methods=['GET'])
def subscription_plan():
    return db_connection.subscription_plan_details()
    

@app.route('/login')
def login():
    oauth = OAuth1Session(CONSUMER_KEY, client_secret=CONSUMER_SECRET, callback_uri=CALLBACK_URL)
    fetch_response = oauth.fetch_request_token(request_token_url)
    session['request_token'] = fetch_response
    authorization_redirect_url = oauth.authorization_url(authorization_url)
    return redirect(authorization_redirect_url)

@app.route('/callback')
def callback():
    request_token = session['request_token']
    del session['request_token']
    oauth = OAuth1Session(
        CONSUMER_KEY,
        client_secret=CONSUMER_SECRET,
        resource_owner_key=request_token['oauth_token'],
        resource_owner_secret=request_token['oauth_token_secret']
    )
    verifier = request.args.get('oauth_verifier')
    oauth = OAuth1Session(
        CONSUMER_KEY,
        client_secret=CONSUMER_SECRET,
        resource_owner_key=request_token['oauth_token'],
        resource_owner_secret=request_token['oauth_token_secret'],
        verifier=verifier
    )
    oauth_tokens = oauth.fetch_access_token(access_token_url)

    session['oauth_token'] = oauth_tokens['oauth_token']
    session['oauth_token_secret'] = oauth_tokens['oauth_token_secret']
    session['user_id'] = oauth_tokens['user_id']
    session['screen_name'] = oauth_tokens['screen_name']
    add_account(oauth_tokens)
    return "Authentication successful"
    
@app.route('/runbot')
def run_bot():
    print ("Running bot...")
    accounts = load_data()
    accounts = run(accounts, BEARER_TOKEN, CONSUMER_KEY, CONSUMER_SECRET)
    save_data(accounts)
    return 'Bot Work is Done!!!!'


@app.route("/create-checkout-session", methods=["POST"])
@jwt_required()
def create_checkout_session():
    username = get_jwt_identity()
    plan_name = request.json.get('planName')
    response = handle_checkout_session(username, plan_name)
    return response

if __name__ == '__main__':
    app.run(debug=True)