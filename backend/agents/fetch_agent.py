import tweepy, os
from .base_agent import BaseAgent

class FetchDataAgent(BaseAgent):
    def _get_twitter_client(self, ):
        # System Account
        BEARER_TOKEN = os.getenv("BEARER_TOKEN")
        CONSUMER_KEY = os.getenv("CONSUMER_KEY")
        CONSUMER_SECRET = os.getenv("CONSUMER_SECRET")
        # Todo - User account
        oauth_token, oauth_token_secret = '', '' 
        
        return tweepy.Client(
            bearer_token=BEARER_TOKEN,
            consumer_key=CONSUMER_KEY,
            consumer_secret=CONSUMER_SECRET,
            access_token=oauth_token,
            access_token_secret=oauth_token_secret
        )
        
    def run(self, input_data, memory):
        try:
            hashtags = input_data.get('hashtags', '')
            query = ' OR '.join(hashtags(','))
            res = self._get_twitter_client().search_recent_tweets(query=query)
            memory['tweets'] = res.data
            return res.data
        
        except Exception as e:
            print(f"Error Fetch data Agent: {e}")
            return None