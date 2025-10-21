import tweepy, os
from .base_agent import BaseAgent

class ReplyAgent(BaseAgent):
    def _get_twitter_client(self):
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
            text = input_data.get("text")
            tweet_id = input_data.get("tweet_id")
            response = self._get_twitter_client().create_tweet(text=text, in_reply_to_tweet_id=tweet_id)
            print(f"INFO: {self.name} replied to tweet {tweet_id}")
            memory['reply_response'] = response
            return response
        except Exception as e:
            print(f"ERROR: {self.name} Error replying to tweet: {e}")
            return None
