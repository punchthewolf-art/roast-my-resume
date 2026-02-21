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
  amountCents: number = 499,
  productName: string = "Quick Fix - Resume Rewrite",
  tier: string = "fix"
): Promise<string> {
  const stripe = getStripe();

  const TIER_DESCRIPTIONS: Record<string, string> = {
    fix: "Professional resume rewrite + ATS optimization",
    pro: "Resume rewrite + Cover letter + LinkedIn summary + 3 variations",
    career: "Full career makeover: 3 resume versions + cover letter + interview prep + salary tips",
  };

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: productName,
            description: TIER_DESCRIPTIONS[tier] || TIER_DESCRIPTIONS.fix,
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
      tier,
    },
  });

  return session.url!;
}
