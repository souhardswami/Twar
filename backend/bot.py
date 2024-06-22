import tweepy, openai, os

openai.api_key = os.getenv('OPENAI_API_KEY')

def generate_response(prompt, tweet_text):
    messages = [
        {"role": "system", "content": "Lets assume you are expert in Twitter posting and marketing related to web-3 realted content."},
        {"role": "user", "content": f"{prompt} {tweet_text}"}
    ]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages,
        max_tokens=50
    )
    return response.choices[0].message['content'].strip()

def get_client(BEARER_TOKEN, CONSUMER_KEY, CONSUMER_SECRET, OAUTH_TOKEN, OAUTH_SECRET):
    return tweepy.Client(bearer_token=BEARER_TOKEN,
                                   consumer_key=CONSUMER_KEY,
                                   consumer_secret=CONSUMER_SECRET,
                                   access_token=OAUTH_TOKEN,
                                   access_token_secret=OAUTH_SECRET)

def get_recent_posts(client, keywords):
    keywords = keywords.split(',')
    query = ' OR '.join(keywords)
    tweet_fields = ['public_metrics']
    res = client.search_recent_tweets(query=query, tweet_fields=tweet_fields)
    return res

def reply_to_tweet(client, tweet_id, text):
    try:
        response = client.create_tweet(text=text, in_reply_to_tweet_id=tweet_id)
        print("Successfully replied to the tweet!")
        return response
    except Exception as e:
        print(f"Error: {e}")
        return None

def run(accounts, BEARER_TOKEN, CONSUMER_KEY, CONSUMER_SECRET):
    for account in accounts:
        try:
            if account['status'] == 'active':
                oauth_token = account['oauth_token']
                oauth_secret = account['oauth_token_secret']
                prompt = account['prompt']
                keywords = account['keywords']


                client = get_client(BEARER_TOKEN, CONSUMER_KEY, CONSUMER_SECRET, oauth_token, oauth_secret)
                tweets = get_recent_posts(client, keywords).data

                # Giving priority of most retweeted post first.
                tweets.sort(key = lambda tweet: -(int(tweet.public_metrics['retweet_count'])))

                if int(account['left_kpi']['daily']) > 0 and int(account['left_kpi']['weekly']) > 0:
                    tweet_count = 0
                    tweet_ids = []
                    for tweet in tweets:
                        tweet_id = tweet.id
                        text = tweet.text

                        genai_tweet_response = generate_response(prompt, text)
                        reply_to_tweet(client, tweet_id, genai_tweet_response)
                        account['left_kpi']['daily'] = str( int(account['left_kpi']['daily']) - 1)
                        account['left_kpi']['weekly'] = str( int(account['left_kpi']['weekly']) - 1)

                        tweet_count += 1
                        tweet_ids.append(tweet_id)
                        if tweet_count > 3:
                            break

        except Exception as ex:
            print ("Error while running bot....")
            print (ex)
    return accounts

