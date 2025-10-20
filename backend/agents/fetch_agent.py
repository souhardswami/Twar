from .base_agent import BaseAgent

class FetchDataAgent(BaseAgent):
    def run(self, input_data, memory):
        # hashtags = memory.get("hashtags", [])
        # print(f"[{self.name}] Fetching tweets for {hashtags}")
        # # Placeholder for your Twitter API integration
        # tweets = [f"Tweet about {tag}" for tag in hashtags]
        # memory["tweets"] = tweets
        # return tweets
        memory['tweets'] = [
            'we are building most popular web3 echosystem in solana place',
            'rusk is usefull in solana'
        ]
        return  memory['tweets']