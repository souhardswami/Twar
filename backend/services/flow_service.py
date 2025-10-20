from db import db
from models.flow import Flow, FlowStep, FlowNextStep

def create_flow(username):
    flow = Flow(user_id=username)
    db.session.add(flow)
    db.session.commit()
    return flow.id


def create_flow_steps(flow_id, node_id, label, user_input):
    try:
        step = FlowStep(flow_id=flow_id, node_id=node_id, label=label, user_input=user_input)
        db.session.add(step)
        db.session.commit()
        return True
    except Exception as ex:
        db.session.rollback()
        print(f"Error: {ex} while creating step for {flow_id}")
        return False


def create_next_steps(flow_id, source, target):
    try:
        next_step = FlowNextStep(flow_id=flow_id, node_id=source, next_node_id=target)
        db.session.add(next_step)
        db.session.commit()
        return True
    except Exception as ex:
        db.session.rollback()
        print(f"Error: {ex} while creating next step for flow_id {flow_id}")
        return False
