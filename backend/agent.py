import tweepy, openai, os
from sentence_transformers import SentenceTransformer
import pinecone
import random

openai.api_key = os.getenv('OPENAI_API_KEY')

class TwitterAgent:
    def __init__(self, account):
        self.name = account['name']
        self.status = account['status']
        self.oauth_token = account['oauth_token']
        self.oauth_secret = account['oauth_token_secret']
        self.prompt = account['prompt']
        self.keywords = account['keywords']
        self.daily_limit = int(account['left_kpi']['daily'])
        self.weekly_limit = int(account['left_kpi']['weekly'])

        self.client = self.get_client(
            os.getenv("BEARER_TOKEN"),
            os.getenv("CONSUMER_KEY"),
            os.getenv("CONSUMER_SECRET"),
            self.oauth_token,
            self.oauth_secret
        )
        
        self.rag_model = SentenceTransformer("all-MiniLM-L6-v2")
        self.rag_index = self.init_vector_database()

    def get_client(self, BEARER_TOKEN, CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_SECRET):
        return tweepy.Client(
            bearer_token=BEARER_TOKEN,
            consumer_key=CONSUMER_KEY,
            consumer_secret=CONSUMER_SECRET,
            access_token=OAUTH_TOKEN,
            access_token_secret=OAUTH_SECRET
        )

    def init_vector_database(self):
        pinecone.init(api_key=os.getenv("PINECONE_API_KEY"), environment="us-west1-gcp")
        index_name = "twitter-bot"
        if index_name not in pinecone.list_indexes():
            pinecone.create_index(index_name, dimension=384)
        return pinecone.Index(index_name)

    def get_recent_posts(self):
        query = ' OR '.join(self.keywords.split(','))
        tweet_fields = ['public_metrics']
        res = self.client.search_recent_tweets(query=query, tweet_fields=tweet_fields)
        return res.data if res else []

    def generate_response(self, tweet_text):
        tweet_embedding = self.rag_model.encode([tweet_text])
        similar_docs = self.rag_index.query(tweet_embedding, top_k=3, include_metadata=True)

        context = "\n".join([doc['metadata']['text'] for doc in similar_docs['matches']]) if similar_docs else "No relevant data found."

        # Generate AI response
        messages = [
            {"role": "system", "content": "You are an expert in Web3 marketing for Twitter."},
            {"role": "user", "content": f"Context: {context}\nTweet: {tweet_text}\nGenerate an engaging reply:"}
        ]
        response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages, max_tokens=50)
        return response.choices[0].message['content'].strip()

    def reply_to_tweet(self, tweet_id, text):
        try:
            response = self.client.create_tweet(text=text, in_reply_to_tweet_id=tweet_id)
            print(f"INFO: {self.name} replied to tweet {tweet_id}")
            return response
        except Exception as e:
            print(f"ERROR: {self.name} Error replying to tweet: {e}")
            return None

    def run(self):
        if self.status != "active":
            print(f"ERROR: {self.name} is inactive.")
            return
        
        if self.daily_limit <= 0 or self.weekly_limit <= 0:
            print(f"WARN: {self.name} has exhausted its tweet limit.")
            return

        tweets = self.get_recent_posts()
        if not tweets:
            print(f"ERROR: {self.name} found no relevant tweets.")
            return

        # Prioritize tweets with highest retweets
        tweets.sort(key=lambda tweet: -tweet.public_metrics['retweet_count'])

        tweet_count = 0
        for tweet in tweets:
            if tweet_count >= 3:
                break

            tweet_id = tweet.id
            text = tweet.text
            reply_text = self.generate_response(text)
            self.reply_to_tweet(tweet_id, reply_text)

            # Decrease KPI count
            self.daily_limit -= 1
            self.weekly_limit -= 1
            tweet_count += 1

        print(f"INFO: {self.name} finished execution.")
