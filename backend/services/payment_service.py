import os
import stripe
from flask import jsonify
from db_connection import subscribe_plan
stripe.api_key = os.getenv('STRIPE_API_KEY')

PRICES = {
    "Basic Plan": 0,
    "Pro Plan": "price_RGJ771",  
    "Enterprise Plan": "price_DXY590"  
}

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

