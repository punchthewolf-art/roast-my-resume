"use client";

import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

interface RoastResultProps {
  roast: string;
  score: number;
  problems: string[];
}

function ScoreBadge({ score }: { score: number }) {
  const getColor = () => {
    if (score <= 3) return "from-red-500 to-red-700";
    if (score <= 5) return "from-orange-500 to-red-500";
    if (score <= 7) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-emerald-600";
  };

  const getEmoji = () => {
    if (score <= 2) return "\u{1F480}";
    if (score <= 4) return "\u{1F62C}";
    if (score <= 6) return "\u{1F610}";
    if (score <= 8) return "\u{1F44D}";
    return "\u{1F31F}";
  };

  return (
    <div className="score-reveal flex flex-col items-center gap-2">
      <div
        className={`flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br ${getColor()} shadow-lg shadow-accent/20`}
      >
        <span className="text-4xl font-black text-white">{score}/10</span>
      </div>
      <span className="text-3xl">{getEmoji()}</span>
    </div>
  );
}

export default function RoastResult({ roast, score, problems }: RoastResultProps) {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showProblems, setShowProblems] = useState(false);

  useEffect(() => {
    if (visibleChars < roast.length) {
      const timer = setTimeout(() => {
        // Speed up: 8 chars at a time for faster reveal
        setVisibleChars((prev) => Math.min(prev + 8, roast.length));
      }, 5);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowProblems(true), 500);
    }
  }, [visibleChars, roast.length]);

  const displayedRoast = roast.slice(0, visibleChars);
  const isComplete = visibleChars >= roast.length;

  return (
    <div className="w-full space-y-8">
      {/* Score */}
      <div className="flex justify-center">
        <ScoreBadge score={score} />
      </div>

      {/* Roast text */}
      <div className="rounded-2xl border border-card-border bg-card-bg p-6 md:p-8">
        <div className="mb-4 flex items-center gap-2">
          <span className="text-xl fire-bounce">🔥</span>
          <h2 className="text-xl font-bold">The Roast</h2>
          {!isComplete && (
            <span className="ml-2 inline-block h-5 w-0.5 animate-pulse bg-accent" />
          )}
        </div>
        <div className="prose prose-invert max-w-none leading-relaxed
          prose-headings:text-white prose-headings:font-bold prose-headings:mt-4 prose-headings:mb-2
          prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg
          prose-p:text-foreground/90 prose-p:mb-3
          prose-strong:text-accent prose-strong:font-bold
          prose-em:text-yellow-300/80
          prose-li:text-foreground/80
          prose-ul:my-2 prose-ol:my-2
        ">
          <ReactMarkdown>{displayedRoast}</ReactMarkdown>
          {!isComplete && <span className="inline-block h-5 w-0.5 animate-pulse bg-accent ml-0.5" />}
        </div>
      </div>

      {/* Problems */}
      {showProblems && (
        <div className="rounded-2xl border border-card-border bg-card-bg p-6 md:p-8">
          <h3 className="mb-4 flex items-center gap-2 text-xl font-bold">
            <span>🚨</span> Top 5 Problems
          </h3>
          <div className="space-y-3">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="flex items-start gap-3 rounded-lg border border-danger/20 bg-danger/5 p-3"
                style={{
                  animation: `score-reveal 0.3s ease-out ${index * 0.1}s both`,
                }}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-danger/20 text-xs font-bold text-danger">
                  {index + 1}
                </span>
                <p className="text-sm text-foreground/80">{problem}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
