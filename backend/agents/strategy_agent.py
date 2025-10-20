from .base_agent import BaseAgent

class StrategyAgent(BaseAgent):
    def run(self, input_data, memory):
        # tweets = memory.get("tweets", [])
        # company = input_data
        # print(f"[{self.name}] Crafting replies for {company}")
        # replies = [f"{company} appreciates this discussion on {t}" for t in tweets]
        # memory["replies"] = replies
        # return replies
        memory["replies"] = 'You are good marketing agent you hash to reply to tweet by building good reply on tweet post reply, but replying and permoting my company name'
        return memory["replies"] 