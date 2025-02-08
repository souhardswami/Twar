import os
import stripe
from flask import jsonify


stripe.api_key = os.getenv('STRIPE_API_KEY')

PRICES = {
    "Free": 0,
    "$10/Month": "price_RGJ771",  
    "Enterprise": "price_DXY590"  
}

def handle_checkout_session(request):
    try:
        data = request.json
        plan_name = data.get("plan")

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
        
        return jsonify({"url": session.url}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

