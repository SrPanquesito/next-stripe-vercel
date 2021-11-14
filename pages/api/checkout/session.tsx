import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {quantity} = req.body;
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: 'price_1JuoNHGJpLtlPZ8BaPCYMiom',
            quantity,
          },
        ],
        payment_method_types: [
          'card',
          'oxxo',
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
    });
    
    res.status(200).json({ sessionId: session.id })
}