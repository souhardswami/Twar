import os

script_dir = os.path.dirname(os.path.abspath(__file__))
DATA_FILE = os.path.join(script_dir, 'accounts.json')
APP_URL = os.getenv('APP_URL')
CONSUMER_KEY = os.getenv('CONSUMER_KEY')
CONSUMER_SECRET = os.getenv('CONSUMER_SECRET')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
ACCESS_SECRET = os.getenv('ACCESS_SECRET')
BEARER_TOKEN = os.getenv('BEARER_TOKEN')
KEYWORDS = ','.join(['#web3gaming',
                '#cryptogaming',
                '#web3game',
                '#solana',
                '#solanacoin',
                '#cryptoproject',
                '#altcoin',
                '#nftgaming'])
PROMPT = 'Generate a friendly and engaging reply to the following tweet promoting our company subtly:'

request_token_url = "https://api.twitter.com/oauth/request_token"
authorization_url = "https://api.twitter.com/oauth/authorize"
access_token_url = "https://api.twitter.com/oauth/access_token"

DATA_SCHEMA = {
    'screen_name' : '',
    'oauth_token' : '',
    'oauth_token_secret' : '',
    'id' : '',
    'status' : 'active',
    'keywords' : KEYWORDS,
    'prompt' : PROMPT,
    'kpi': {
        'weekly': '70',
        'daily': '10'
    },
    'left_kpi': {
        'weekly': '70',
        'daily': '10'
    }
}