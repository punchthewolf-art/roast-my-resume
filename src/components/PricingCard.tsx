"use client";

import { useState } from "react";

interface PricingCardProps {
  roastId: string;
}

interface PricingTier {
  name: string;
  price: string;
  priceNum: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  badge?: string;
  cta: string;
  tier: string;
  emoji: string;
}

const tiers: PricingTier[] = [
  {
    name: "Quick Fix",
    price: "$4.99",
    priceNum: 499,
    period: "one-time",
    description: "Resume rewrite + ATS optimization",
    emoji: "🔧",
    features: [
      "Complete resume rewrite by AI",
      "ATS-optimized structure & formatting",
      "Industry keyword optimization",
      "Strong action verbs & metrics",
      "Copy-paste ready format",
    ],
    highlighted: false,
    cta: "Fix My Resume",
    tier: "fix",
  },
  {
    name: "Pro Package",
    price: "$9.99",
    priceNum: 999,
    period: "one-time",
    description: "Resume + Cover Letter + LinkedIn",
    emoji: "🚀",
    features: [
      "Everything in Quick Fix",
      "Custom cover letter template",
      "LinkedIn profile optimization",
      "3 professional summary variations",
      "Quantified achievements for every point",
      "Priority AI processing",
    ],
    highlighted: true,
    badge: "BEST VALUE",
    cta: "Get Pro Package",
    tier: "pro",
  },
  {
    name: "Career Boost",
    price: "$19.99",
    priceNum: 1999,
    period: "one-time",
    description: "Full career makeover by AI",
    emoji: "👑",
    features: [
      "Everything in Pro Package",
      "3 tailored resume versions",
      "Interview preparation guide (10 Q&As)",
      "Salary negotiation scripts",
      "LinkedIn headline + skills strategy",
      "48h email support",
    ],
    highlighted: false,
    badge: "PREMIUM",
    cta: "Boost My Career",
    tier: "career",
  },
];

export default function PricingCard({ roastId }: PricingCardProps) {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async (tier: PricingTier) => {
    setLoadingTier(tier.tier);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roastId, tier: tier.tier, price: tier.priceNum }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const data = await res.json();
      if (data.already_paid) {
        window.location.href = data.redirect;
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please try again.");
      setLoadingTier(null);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {tiers.map((tier) => (
        <div
          key={tier.tier}
          className={`relative overflow-hidden rounded-2xl border p-6 transition-all hover:scale-[1.02] ${
            tier.highlighted
              ? "border-accent/50 bg-gradient-to-b from-accent/15 to-card-bg shadow-lg shadow-accent/10"
              : "border-card-border bg-card-bg"
          }`}
        >
          {/* Badge */}
          {tier.badge && (
            <div
              className={`absolute -right-8 top-5 rotate-45 px-10 py-1 text-[10px] font-bold text-white ${
                tier.highlighted ? "bg-accent" : "bg-purple-500"
              }`}
            >
              {tier.badge}
            </div>
          )}

          <div className="text-center">
            <h3 className="text-lg font-bold">{tier.name}</h3>
            <p className="mt-1 text-xs text-muted">{tier.description}</p>

            <div className="my-4 flex items-baseline justify-center gap-1">
              <span
                className={`text-4xl font-black ${
                  tier.highlighted ? "gradient-text" : "text-white"
                }`}
              >
                {tier.price}
              </span>
              <span className="text-muted text-sm">{tier.period}</span>
            </div>

            <ul className="mb-6 space-y-2 text-left">
              {tier.features.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-xs">
                  <svg
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      tier.highlighted ? "text-accent" : "text-success"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-foreground/80">{item}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(tier)}
              disabled={loadingTier !== null}
              className={`w-full rounded-full py-2.5 text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                tier.highlighted
                  ? "bg-accent text-white hover:bg-accent-hover"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {loadingTier === tier.tier ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing...
                </span>
              ) : (
                `\u{1F680} ${tier.cta}`
              )}
            </button>
          </div>
        </div>
      ))}

      {error && (
        <div className="col-span-full rounded-lg border border-danger/30 bg-danger/10 p-3 text-center text-sm text-danger">
          {error}
        </div>
      )}
      <p className="col-span-full text-center text-xs text-muted mt-2">
        🔒 Secure payment via Stripe &bull; ⚡ Instant delivery &bull; 💯 48h refund guarantee
      </p>
    </div>
  );
}
