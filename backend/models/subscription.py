from db import db

class SubscriptionPlan(db.Model):
    __tablename__ = 'subscription_plan'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    price = db.Column(db.Integer)
    features = db.Column(db.Text)
    
class UserSubscriptionPlan(db.Model):
    __tablename__ = 'user_subscription_plan'
    
    user = db.Column(db.String(50), primary_key=True, nullable=False)
    subscription_plan_id = db.Column(db.Integer, db.ForeignKey('subscription_plan.id'), primary_key=True)

    