"use client";

import { useTranslation } from "@/i18n/LanguageContext";
import RoastResult from "@/components/RoastResult";
import ShareButton from "@/components/ShareButton";
import PricingCard from "@/components/PricingCard";
import FixedResume from "@/components/FixedResume";

interface RoastData {
  id: string;
  roast_text: string;
  score: number;
  problems: string[];
  paid: boolean;
  fixed_text: string | null;
  ats_score: number | null;
  improvements: string[] | null;
  [key: string]: unknown;
}

interface RoastPageClientProps {
  roast: RoastData;
  showFix: boolean;
}

export default function RoastPageClient({ roast, showFix }: RoastPageClientProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Roast Result */}
      <RoastResult
        roast={roast.roast_text}
        score={roast.score}
        problems={roast.problems}
      />

      {/* Share */}
      <div className="mt-10">
        <p className="mb-4 text-center text-sm text-muted">
          {t("roast.share")}
        </p>
        <ShareButton score={roast.score} roastId={roast.id} />
      </div>

      {/* Fixed Resume or Pricing */}
      <div className="mt-12">
        {showFix ? (
          <FixedResume
            fixedText={roast.fixed_text!}
            atsScore={roast.ats_score!}
            improvements={roast.improvements!}
          />
        ) : (
          <div>
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">
                {t("roast.fixTitle")} <span className="fire-bounce inline-block">✨</span>
              </h2>
              <p className="mt-2 text-muted">
                {t("roast.fixSubtitle")}
              </p>
            </div>
            <PricingCard roastId={roast.id} />
          </div>
        )}
      </div>

      {/* AstroCareer Teaser */}
      <div className="mt-16">
        <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-transparent p-8 text-center">
          <div className="mb-4 text-5xl">🔮</div>
          <h3 className="text-xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t("astro.title")}
            </span>
            {" "}&mdash; {t("astro.coming")}
          </h3>
          <p className="mt-2 text-sm text-muted max-w-md mx-auto">
            {t("astro.desc")}
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            {t("astro.badge")}
          </div>
        </div>
      </div>

      {/* Try Again CTA */}
      <div className="mt-12 text-center">
        <a
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-6 py-3 font-semibold transition-all hover:bg-card-border"
        >
          🔥 {t("roast.tryAgain")}
        </a>
      </div>
    </>
  );
}
