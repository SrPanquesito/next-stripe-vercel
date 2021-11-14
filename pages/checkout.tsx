import { loadStripe } from '@stripe/stripe-js';

const stripe = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function Checkout() {
    const handleClick = async (e) => {
        e.preventDefault();
        // Calls backend to create session checkout
        const {sessionId} = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({quantity: 1})
        })
        .then(res => res.json())

        // When user clicks on button, redirect them to checkout
        const stripeCheckout = await stripe;
        const {error} = await stripeCheckout.redirectToCheckout({sessionId});
    }

    return (
        <>
            <h1>Checkout</h1>
            <button role="link" onClick={handleClick}>
                Checkout
            </button>
        </>
    )
}