from .base_agent import BaseAgent
from services.flow_service import get_node_details

class SafeguardAgent(BaseAgent):
    def run(self, input_data, memory):
        try:
            flow_id = input_data.get("flow_id")
            step = get_node_details(flow_id, 'Safeguard')[0]
            safe_replied = step.user_input
            memory["safe_replies"] = safe_replied
            return memory["safe_replies"]
        
        except Exception as e:
            print(f"ERROR: {self.name} Error Adding SafeGuard details: {e}")
            return None