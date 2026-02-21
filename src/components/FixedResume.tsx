"use client";

import { useState } from "react";

interface FixedResumeProps {
  fixedText: string;
  atsScore: number;
  improvements: string[];
}

export default function FixedResume({
  fixedText,
  atsScore,
  improvements,
}: FixedResumeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fixedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = fixedText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* ATS Score */}
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-success/30 bg-success/5 p-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-success to-emerald-600 shadow-lg">
          <span className="text-2xl font-black text-white">{atsScore}%</span>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-bold text-success">ATS Compatibility Score</h3>
          <p className="text-sm text-muted">Your fixed resume is optimized for Applicant Tracking Systems</p>
        </div>
      </div>

      {/* Improvements */}
      <div className="rounded-2xl border border-card-border bg-card-bg p-6">
        <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
          <span>✨</span> Improvements Made
        </h3>
        <div className="space-y-2">
          {improvements.map((improvement, index) => (
            <div
              key={index}
              className="flex items-start gap-2 text-sm"
            >
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-success"
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
              <span className="text-foreground/80">{improvement}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Resume Text */}
      <div className="rounded-2xl border border-card-border bg-card-bg p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-lg font-bold">
            <span>📄</span> Your Fixed Resume
          </h3>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 rounded-lg border border-card-border bg-background px-3 py-1.5 text-sm transition-all hover:bg-card-border"
          >
            {copied ? (
              <>
                <svg className="h-4 w-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Copy All
              </>
            )}
          </button>
        </div>
        <div className="max-h-[600px] overflow-y-auto rounded-lg border border-card-border bg-background p-6 text-sm leading-relaxed whitespace-pre-wrap">
          {fixedText}
        </div>
      </div>
    </div>
  );
}
