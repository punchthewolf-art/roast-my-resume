"use client";

import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageContext";
import LanguageToggle from "./LanguageToggle";

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-card-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🔥</span>
          <span className="text-xl font-bold">
            Roast<span className="gradient-text">My</span>Resume
          </span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <a
            href="#how-it-works"
            className="hidden sm:block text-sm text-muted hover:text-foreground transition-colors"
          >
            {t("nav.howItWorks")}
          </a>
          <a
            href="#examples"
            className="hidden sm:block text-sm text-muted hover:text-foreground transition-colors"
          >
            {t("nav.examples")}
          </a>
          <LanguageToggle />
          <Link
            href="/"
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover transition-colors"
          >
            {t("nav.cta")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
