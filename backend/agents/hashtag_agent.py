from .base_agent import BaseAgent
from services.flow_service import get_node_details

class HashtagAgent(BaseAgent):
    def run(self, input_data, memory):
        try:
            flow_id = input_data.get("flow_id")
            steps = get_node_details(flow_id, 'Hashtag')
            hashtags = [step.user_input for step in steps]
            hashtags = ','.join(hashtags)
            memory['hashtag'] = hashtags
            return hashtags
        except Exception as e:
            print(f"Error Hashtag Agent: {e}")
            return None  