from .base_agent import BaseAgent

class HashtagAgent(BaseAgent):
    def run(self, input_data, memory):
        # hashtags = input_data.split(",")
        # print(f"[{self.name}] Using hashtags: {hashtags}")
        memory["hashtags"] = ['Web3', 'Blockchain']
        return memory["hashtags"]