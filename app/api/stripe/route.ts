import Stripe from 'stripe';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
// Create Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

// Define product item type
type CartItem = {
  name: string;
  price: number;
  quantity: number;
  image: {
    asset: {
      _ref: string;
    };
  }[];
};

// POST handler
export async function POST(req: Request) {
  try {
    const origin = req.headers.get('origin') || 'http://localhost:3000';
    const body: CartItem[] = await req.json();

    const session = await stripe.checkout.sessions.create({
      submit_type: 'pay',
      mode: 'payment',
      payment_method_types: ['card'],
      billing_address_collection: 'auto',
      shipping_options: [
        { shipping_rate: 'shr_1RmTlgGdJbFoBuuStJvQ2oFw' },
        { shipping_rate: 'shr_1RmTouGdJbFoBuuS4XTx7yMC' },
      ],
      line_items: body.map((item) => {
        const img = item.image[0].asset._ref;
        const newImage = img
          .replace('image-', 'https://cdn.sanity.io/images/59e2j473/production/')
          .replace('-webp', '.webp');

        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name,
              images: [newImage],
            },
            unit_amount: item.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${origin}/?success=true`,
      cancel_url: `${origin}/?canceled=true`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
