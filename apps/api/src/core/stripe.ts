import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';

export const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-01-27' as any, // Cast to any to avoid TS errors if version mismatch
});

export const createCheckoutSession = async ({
    userId,
    userEmail,
    priceId,
    credits,
}: {
    userId: string;
    userEmail: string;
    priceId: string;
    credits: number;
}) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/dashboard?payment=success`,
        cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3001'}/dashboard?payment=cancel`,
        customer_email: userEmail,
        client_reference_id: userId,
        metadata: {
            userId,
            credits: credits.toString(),
        },
    });

    return session;
};
