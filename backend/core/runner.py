from agents.bot_monitoring_agent import BotMonitoringAgent
from agents.hashtag_agent import HashtagAgent
from agents.fetch_agent import FetchDataAgent
from agents.strategy_agent import StrategyAgent
from agents.safeguard_agent import SafeguardAgent
from agents.reply_agent import ReplyAgent
from agents.rag_retrival_agent import RagRetrivalAgent

from core.master_agent import MasterAgent



def load_tools():
    tools = {
        "Bot Monitoring": BotMonitoringAgent("Bot Monitoring"),
        "Hashtag": HashtagAgent("Hashtag"),
        "Fetch Data": FetchDataAgent("Fetch Data"),
        "Strategy Agent": StrategyAgent("Strategy Agent"),
        "Safeguard Agent": SafeguardAgent("Safeguard Agent"),
        "Reply Data": ReplyAgent("Reply Data"),
        "Rag Retrieval Data": RagRetrivalAgent("Rag Retrieval Data"),
    }

    operations = {}
    for name, inst in tools.items():
        desc = getattr(inst, "description", None)
        if desc is None:
            default_desc = {
                "Bot Monitoring": "Validate/return bot account & credentials.",
                "Hashtag": "Return hashtags to monitor for this flow (input: comma-separated tags).",
                "Fetch Data": "Fetch tweets for given hashtags and return tweet metadata list.",
                "Strategy Agent": "Generate reply templates / strategy given company profile and tweets.",
                "Safeguard Agent": "Filter replies for policy violations; return safe replies.",
                "Reply Data": "Post replies on Twitter using given bot credentials and tweet ids and frames",
                "Rag Retrieval Data": "Retrieve company-specific knowledge from vector DB.",
            }
            desc = default_desc.get(name, "No description available.")
        operations[name] = desc
    
    return operations, tools


def start_flow(flow_id, company_name):
    operations, tools = load_tools()
    goal = f"Promote company {company_name} and 'flow_id':{flow_id} safely on Twitter (be helpful, non-spammy, follow policies)."

    master_agent = MasterAgent(
        goal=goal,
        operations=operations,
        tools=tools
    )

    master_agent.run()
    



