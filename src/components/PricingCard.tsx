"use client";

import { useState } from "react";
import { useTranslation } from "@/i18n/LanguageContext";

interface PricingCardProps {
  roastId: string;
}

export default function PricingCard({ roastId }: PricingCardProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roastId }),
      });

      if (!res.ok) throw new Error("Checkout failed");

      const { url } = await res.json();
      window.location.href = url;
    } catch {
      alert(t("pricing.error"));
      setIsLoading(false);
    }
  };

  const features = [
    t("pricing.feature1"),
    t("pricing.feature2"),
    t("pricing.feature3"),
    t("pricing.feature4"),
    t("pricing.feature5"),
    t("pricing.feature6"),
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-b from-accent/10 to-card-bg p-8">
      {/* Badge */}
      <div className="absolute -right-8 top-6 rotate-45 bg-accent px-10 py-1 text-xs font-bold text-white">
        {t("pricing.badge")}
      </div>

      <div className="text-center">
        <h3 className="text-2xl font-bold">{t("pricing.title")}</h3>
        <p className="mt-2 text-muted">
          {t("pricing.subtitle")}
        </p>

        <div className="my-6 flex items-baseline justify-center gap-1">
          <span className="text-5xl font-black gradient-text">{t("pricing.price")}</span>
          <span className="text-muted">{t("pricing.priceLabel")}</span>
        </div>

        <ul className="mb-8 space-y-3 text-left">
          {features.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm">
              <svg
                className="h-5 w-5 shrink-0 text-success"
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
              {item}
            </li>
          ))}
        </ul>

        <button
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full rounded-full bg-accent py-3 text-lg font-bold text-white transition-all hover:bg-accent-hover hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {t("pricing.ctaLoading")}
            </span>
          ) : (
            <>🚀 {t("pricing.cta")}</>
          )}
        </button>

        <p className="mt-3 text-xs text-muted">
          {t("pricing.secure")}
        </p>
      </div>
    </div>
  );
}
