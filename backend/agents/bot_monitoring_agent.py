from .base_agent import BaseAgent

class BotMonitoringAgent(BaseAgent):
    def run(self, input_data, memory):
        # print(f"[{self.name}] Monitoring bot account {input_data}")
        memory["bot_status"] = "active"
        memory["twitter_account_id"] = 'twitter02'
        return {"status": "active", "twitter_account_id": 'twitter02'}