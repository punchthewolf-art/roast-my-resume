import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { fixResume } from "@/lib/claude";
import { getRoast, updateRoastWithFix } from "@/lib/supabase";

// Stripe needs the raw body to verify webhook signatures
export const runtime = "nodejs";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key || key.includes("your_")) {
    throw new Error("Stripe not configured");
  }
  return new Stripe(key, {
    apiVersion: "2026-01-28.clover",
  });
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "No signature provided" },
      { status: 400 }
    );
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret || webhookSecret.includes("your_")) {
    console.error("Webhook secret not configured");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const roastId = session.metadata?.roastId;

    if (!roastId) {
      console.error("No roastId in session metadata");
      return NextResponse.json({ received: true });
    }

    console.log(`Payment completed for roast: ${roastId}`);

    try {
      // Get original roast
      const roast = await getRoast(roastId);
      if (!roast) {
        console.error(`Roast not found: ${roastId}`);
        return NextResponse.json({ received: true });
      }

      // Skip if already fixed
      if (roast.fixed_text) {
        console.log(`Roast already fixed: ${roastId}`);
        return NextResponse.json({ received: true });
      }

      // Generate fix via Claude AI
      console.log(`Generating fix for roast: ${roastId}`);
      const result = await fixResume(roast.resume_text);

      // Save to Supabase
      await updateRoastWithFix(roastId, {
        fixed_text: result.fixed,
        ats_score: result.atsScore,
        improvements: result.improvements,
      });

      console.log(`Fix generated and saved for roast: ${roastId}`);
    } catch (error) {
      console.error(`Error processing fix for ${roastId}:`, error);
      // Don't return error - Stripe will retry the webhook
      // The fix can be generated on-demand when user visits the page
    }
  }

  return NextResponse.json({ received: true });
}
