from .base_agent import BaseAgent

class SafeguardAgent(BaseAgent):
    def run(self, input_data, memory):
        # replies = memory.get("replies", [])
        # print(f"[{self.name}] Checking for safe content")
        # safe_replies = [r for r in replies if "spam" not in r]
        # memory["safe_replies"] = safe_replies
        # return safe_replies
        memory["safe_replies"] = 'Not using valugur language'
        return memory["safe_replies"]