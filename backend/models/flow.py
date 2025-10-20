from db import db

class Flow(db.Model):
    __tablename__ = 'flows'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(255), nullable=False)

class FlowStep(db.Model):
    __tablename__ = 'flow_steps'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    flow_id = db.Column(db.Integer)
    node_id = db.Column(db.Integer)
    label = db.Column(db.String(255))
    user_input = db.Column(db.Text, nullable=True)

class FlowNextStep(db.Model):
    __tablename__ = 'flow_next_step'
    
    flow_id = db.Column(db.Integer, primary_key=True)
    node_id = db.Column(db.Integer, primary_key=True)
    next_node_id = db.Column(db.Integer, primary_key=True)
