'use client';
import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SupportUs() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const { id } = await response.json();
    const stripe = await stripePromise;
    stripe?.redirectToCheckout({ sessionId: id });
  };

  return (
    <div className="text-center p-8">
      <h1 className="text-3xl font-semibold mb-4">Support Us</h1>
      <p className="mb-6">Click the button below to make a one-time donation of $50.</p>
      <button 
        onClick={handleCheckout} 
        disabled={loading}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Loading...' : 'Donate $50'}
      </button>
    </div>
  );
}