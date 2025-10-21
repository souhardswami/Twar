from .base_agent import BaseAgent
from services.rag_service import retrieve

class RagRetrivalAgent(BaseAgent):
    def run(self, input_data, memory):
        try:
            query = input_data.get('query')
            username = input_data.get('user_id')
            documents = retrieve(query, username)
            memory['documents'] = documents
            return documents
    
        except Exception as e:
            print(f"Error retrieval of Rag Document: {e}")
            return None