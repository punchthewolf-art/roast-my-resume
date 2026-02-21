import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession } from "@/lib/stripe";
import { getRoast } from "@/lib/supabase";

const TIER_PRICES: Record<string, { amount: number; name: string }> = {
  fix: { amount: 499, name: "Quick Fix - Resume Rewrite" },
  pro: { amount: 999, name: "Pro Package - Resume + Cover Letter + LinkedIn" },
  career: { amount: 1999, name: "Career Boost - Full Career Makeover" },
};

export async function POST(request: NextRequest) {
  try {
    const { roastId, tier = "fix" } = await request.json();

    if (!roastId) {
      return NextResponse.json(
        { error: "No roast ID provided" },
        { status: 400 }
      );
    }

    const tierInfo = TIER_PRICES[tier];
    if (!tierInfo) {
      return NextResponse.json(
        { error: "Invalid pricing tier" },
        { status: 400 }
      );
    }

    // Verify roast exists
    const roast = await getRoast(roastId);
    if (!roast) {
      return NextResponse.json(
        { error: "Roast not found" },
        { status: 404 }
      );
    }

    // Already paid? Return fix directly
    if (roast.paid && roast.fixed_text) {
      return NextResponse.json({
        already_paid: true,
        redirect: `/roast/${roastId}?paid=true`,
      });
    }

    // Create Stripe checkout session with tier info
    const checkoutUrl = await createCheckoutSession(roastId, tierInfo.amount, tierInfo.name, tier);

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to create checkout session",
      },
      { status: 500 }
    );
  }
}
