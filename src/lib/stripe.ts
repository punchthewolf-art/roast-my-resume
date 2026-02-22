import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover",
});

export async function createCheckoutSession(
  roastId: string,
  amount: number = 900,
  productName: string = "Resume Fix & ATS Optimization",
  tier: string = "fix"
): Promise<string> {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: productName,
            description:
              "Get your resume professionally rewritten and optimized for ATS systems",
          },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/roast/${roastId}?paid=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/roast/${roastId}`,
    metadata: {
      roastId,
      tier,
    },
  });

  return session.url!;
}
