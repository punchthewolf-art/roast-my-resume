"use client";

import { useTranslation } from "@/i18n/LanguageContext";

interface ShareButtonProps {
  score: number;
  roastId: string;
}

export default function ShareButton({ score, roastId }: ShareButtonProps) {
  const { t, locale } = useTranslation();
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const shareUrl = `${baseUrl}/roast/${roastId}`;

  const tweetText =
    locale === "fr"
      ? `Mon CV vient de se faire ROASTER par l'IA et j'ai eu ${score}/10 🔥💀\n\nTu penses faire mieux ? Essaie :\n${shareUrl}\n\n#RoastMyResume #CV #Emploi`
      : `My resume just got ROASTED by AI and scored ${score}/10 🔥💀\n\nThink yours is better? Try it:\n${shareUrl}\n\n#RoastMyResume #Resume #JobSearch`;

  const linkedInText =
    locale === "fr"
      ? `Je viens de faire roaster mon CV par l'IA et j'ai eu ${score}/10 ! 🔥\n\nCurieux de voir votre score ? Essayez RoastMyResume :`
      : `I just got my resume brutally roasted by AI and scored ${score}/10! 🔥\n\nCurious about your score? Try RoastMyResume:`;

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&summary=${encodeURIComponent(linkedInText)}`;
    window.open(url, "_blank", "width=550,height=420");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert(t("share.copied"));
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert(t("share.copied"));
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        onClick={handleTwitterShare}
        className="flex items-center gap-2 rounded-full bg-[#1DA1F2] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#1a91da] hover:scale-105"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
        {t("share.twitter")}
      </button>

      <button
        onClick={handleLinkedInShare}
        className="flex items-center gap-2 rounded-full bg-[#0A66C2] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#094d92] hover:scale-105"
      >
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        {t("share.linkedin")}
      </button>

      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 rounded-full border border-card-border bg-card-bg px-5 py-2.5 text-sm font-semibold text-foreground transition-all hover:bg-card-border hover:scale-105"
      >
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
          />
        </svg>
        {t("share.copy")}
      </button>
    </div>
  );
}
