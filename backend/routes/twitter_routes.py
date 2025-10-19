from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
import db_connection

twitter_bp = Blueprint("twitter", __name__)

@twitter_bp.route('/login')
def login():
    oauth = OAuth1Session(CONSUMER_KEY, client_secret=CONSUMER_SECRET, callback_uri=CALLBACK_URL)
    fetch_response = oauth.fetch_request_token(request_token_url)
    session['request_token'] = fetch_response
    authorization_redirect_url = oauth.authorization_url(authorization_url)
    return redirect(authorization_redirect_url)

'''
Make sure we are Adding `<>/twitter/callback`  
As callback url on Twitter Development portal
'''
@twitter_bp.route('/callback')
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

