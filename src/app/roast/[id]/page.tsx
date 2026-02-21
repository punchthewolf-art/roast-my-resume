import { notFound } from "next/navigation";
import Header from "@/components/Header";
import RoastResult from "@/components/RoastResult";
import ShareButton from "@/components/ShareButton";
import PricingCard from "@/components/PricingCard";
import FixedResume from "@/components/FixedResume";
import { getRoast } from "@/lib/supabase";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ paid?: string }>;
}

export default async function RoastPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { paid } = await searchParams;
  const roast = await getRoast(id);

  if (!roast) {
    notFound();
  }

  const showFix = paid === "true" && roast.paid && roast.fixed_text;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-3xl px-4 pt-28 pb-20">
        {/* Roast Result */}
        <RoastResult
          roast={roast.roast_text}
          score={roast.score}
          problems={roast.problems}
        />

        {/* Share */}
        <div className="mt-10">
          <p className="mb-4 text-center text-sm text-muted">
            Share your score with the world (if you dare)
          </p>
          <ShareButton score={roast.score} roastId={id} />
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
                  Want to Actually Get Hired? <span className="fire-bounce inline-block">✨</span>
                </h2>
                <p className="mt-2 text-muted">
                  Stop getting ghosted. Get your resume fixed by AI.
                </p>
              </div>
              <PricingCard roastId={id} />
            </div>
          )}
        </div>

        {/* AstroCareer Teaser */}
        <div className="mt-16">
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-b from-purple-500/10 to-transparent p-8 text-center">
            <div className="mb-4 text-5xl">🔮</div>
            <h3 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AstroCareer
              </span>
              {" "}&mdash; Coming Soon
            </h3>
            <p className="mt-2 text-sm text-muted max-w-md mx-auto">
              What does the universe say about your career? Get a fun, astrology-powered
              career reading based on your birth chart. Because why not?
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              Just for fun &mdash; Launching March 2026
            </div>
          </div>
        </div>

        {/* Try Again CTA */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-6 py-3 font-semibold transition-all hover:bg-card-border"
          >
            🔥 Roast Another Resume
          </a>
        </div>
      </main>
    </div>
  );
}
