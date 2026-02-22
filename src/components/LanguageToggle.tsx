"use client";

import { useTranslation, type Locale } from "@/i18n/LanguageContext";

export default function LanguageToggle() {
  const { locale, setLocale } = useTranslation();

  function toggle() {
    const next: Locale = locale === "en" ? "fr" : "en";
    setLocale(next);
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full border border-card-border px-2.5 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent/50 hover:text-foreground"
      aria-label="Switch language"
    >
      <span className="text-sm">{locale === "en" ? "\ud83c\uddeb\ud83c\uddf7" : "\ud83c\uddec\ud83c\udde7"}</span>
      <span>{locale === "en" ? "FR" : "EN"}</span>
    </button>
  );
}
