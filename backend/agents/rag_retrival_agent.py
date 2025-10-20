from .base_agent import BaseAgent

class RagRetrivalAgent(BaseAgent):
    def run(self, input_data, memory):
        # safe_replies = memory.get("safe_replies", [])
        # print(f"[{self.name}] Posting replies...")
        # for r in safe_replies:
        #     print(f"Posting: {r}")
        # return {"status": "done", "count": len(safe_replies)}
    
        return 'web3 is emerging'