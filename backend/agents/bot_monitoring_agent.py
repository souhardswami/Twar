from .base_agent import BaseAgent
from services.flow_service import get_node_details
from services.account_service import get_account_by_account_id

class BotMonitoringAgent(BaseAgent):
    def run(self, input_data, memory):
        memory["bot_status"] = "inactive"
        memory["twitter_account_id"] = None
        try:
            flow_id = input_data.get("flow_id")
            steps = get_node_details(flow_id, 'Hashtag')
            if steps:
                account_id = steps[0].user_input
                account_details = get_account_by_account_id(account_id)[0]
                
                # Check is account active and not used daily kpis 
                if account_details.status and account_details.daily != account_details.used_daily:
                    memory["bot_status"] = "inactive"
                memory["twitter_account_id"] = account_id
                
        except Exception as e:
            print(f"Error monitoring bot: {e}")
            return {"bot_status": "inactive", "twitter_account_id": None}