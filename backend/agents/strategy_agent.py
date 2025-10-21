from .base_agent import BaseAgent
from services.flow_service import get_node_details

class StrategyAgent(BaseAgent):
    def run(self, input_data, memory):
        try:
            flow_id = input_data.get("flow_id")
            step = get_node_details(flow_id, 'Reply')[0]
            reply = step.user_input
            memory["replies"] = reply
            return memory["replies"] 
        
        except Exception as e:
            print(f"ERROR: {self.name} Error Adding Strategy Agent details: {e}")
            return None