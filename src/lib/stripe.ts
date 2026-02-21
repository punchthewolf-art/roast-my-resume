import Stripe from "stripe";

let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key || key.includes("your_")) {
      throw new Error("Stripe not configured. Set STRIPE_SECRET_KEY in .env.local");
    }
    _stripe = new Stripe(key, {
      apiVersion: "2026-01-28.clover",
    });
  }
  return _stripe;
}

export async function createCheckoutSession(
  roastId: string,
  amountCents: number = 900,
  productName: string = "Resume Fix & ATS Optimization"
): Promise<string> {
  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: productName,
            description:
              "Get your resume professionally rewritten and optimized by AI",
          },
          unit_amount: amountCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/roast/${roastId}?paid=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/roast/${roastId}`,
    metadata: {
      roastId,
    },
  });

  return session.url!;
}
