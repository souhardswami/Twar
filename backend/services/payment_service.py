import os
import stripe
from flask import jsonify
from models.subscription import SubscriptionPlan, UserSubscriptionPlan
from db import db

stripe.api_key = os.getenv('STRIPE_API_KEY')

PRICES = {
    "Basic Plan": 0,
    "Pro Plan": "price_RGJ771",  
    "Enterprise Plan": "price_DXY590"  
}


def get_subscription_plans(username=None):
    plans = SubscriptionPlan.query.all()
    
    subscribed_plan_id = None
    if username:
        user_plan = (
            UserSubscriptionPlan.query
            .filter_by(user=username)
            .first()
        )
        if user_plan:
            subscribed_plan_id = user_plan.subscription_plan_id
    
    result = []
    for plan in plans:
        result.append({
            "id": plan.id,
            "name": plan.name,
            "price": plan.price,
            "features": plan.features,
            "is_subscribed": (plan.id == subscribed_plan_id)
        })
    return result

def subscribe_plan(username, plan_name):
    try:
        plan = SubscriptionPlan.filter_by(name=plan_name).first()
        if not plan:
            print(f"Plan {plan_name} not found.")
            return False
        
        subscription = UserSubscriptionPlan(username=username, plan_id=plan.id)
        db.session.add(subscription)
        db.session.commit()
        return True
    except Exception as ex:
        db.session.rollback()
        print(f"Error: {ex} while subscribing user {username} to plan {plan_name}")
        return False

def handle_checkout_session(username, plan_name):
    try:
        if plan_name not in PRICES:
            return jsonify({"error": "Invalid plan"}), 400

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price": PRICES[plan_name],
                    "quantity": 1,
                }
            ],
            mode="subscription",
            success_url="http://localhost:3000/success",
            cancel_url="http://localhost:3000/cancel",
        )
        
        subscribe_plan(username, plan_name)
        return jsonify({"url": session.url}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

