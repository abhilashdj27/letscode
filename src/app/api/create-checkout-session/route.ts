// src/app/api/create-checkout-session/route.ts

import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-10-28.acacia', // Adjust to your Stripe API version
});



export async function POST(req: NextRequest) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Support Us',
            },
            unit_amount: 5000, // amount in cents ($50)
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/supportus/success`,
      cancel_url: `${req.nextUrl.origin}/supportus/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
