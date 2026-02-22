"use client";

import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import { useTranslation } from "@/i18n/LanguageContext";

export default function Home() {
  const { t, tArray } = useTranslation();

  const exampleRoasts = tArray("examples.data") as {
    score: number;
    preview: string;
    emoji: string;
  }[];

  const stats = [
    { value: "50K+", label: t("stats.roasted") },
    { value: "3.2/10", label: t("stats.avg") },
    { value: "89%", label: t("stats.hired") },
  ];

  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <main className="mx-auto max-w-5xl px-4 pt-28 pb-20">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            <span className="fire-bounce">🔥</span>
            {t("hero.badge")}
          </div>

          {/* Title */}
          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            {t("hero.title1")}
            <br />
            <span className="gradient-text">{t("hero.title2")}</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-xs text-muted">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Upload Zone */}
          <div className="mt-12 w-full flex justify-center">
            <UploadZone />
          </div>

          <p className="mt-4 text-xs text-muted">
            {t("upload.hint")}
          </p>
        </div>

        {/* How it works */}
        <section id="how-it-works" className="mt-32">
          <h2 className="text-center text-3xl font-bold">{t("howItWorks.title")}</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                emoji: "📄",
                title: t("howItWorks.step1.title"),
                desc: t("howItWorks.step1.desc"),
              },
              {
                step: "2",
                emoji: "🔥",
                title: t("howItWorks.step2.title"),
                desc: t("howItWorks.step2.desc"),
              },
              {
                step: "3",
                emoji: "✨",
                title: t("howItWorks.step3.title"),
                desc: t("howItWorks.step3.desc"),
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-2xl border border-card-border bg-card-bg p-6 text-center transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="mb-4 text-4xl">{item.emoji}</div>
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent/20 text-sm font-bold text-accent">
                  {item.step}
                </div>
                <h3 className="mt-2 text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Example Roasts */}
        <section id="examples" className="mt-32">
          <h2 className="text-center text-3xl font-bold">
            {t("examples.title")} <span className="fire-bounce inline-block">🔥</span>
          </h2>
          <p className="mt-2 text-center text-muted">
            {t("examples.subtitle")}
          </p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {exampleRoasts.map((example, i) => (
              <div
                key={i}
                className="rounded-2xl border border-card-border bg-card-bg p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-3xl">{example.emoji}</span>
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-bold ${
                      example.score <= 4
                        ? "bg-danger/20 text-danger"
                        : example.score <= 6
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-success/20 text-success"
                    }`}
                  >
                    {example.score}/10
                  </span>
                </div>
                <p className="text-sm italic text-foreground/70 leading-relaxed">
                  &ldquo;{example.preview}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-32 text-center">
          <div className="rounded-3xl border border-accent/20 bg-gradient-to-b from-accent/10 to-transparent p-12">
            <h2 className="text-3xl font-bold">{t("cta.title")}</h2>
            <p className="mt-3 text-muted">
              {t("cta.subtitle")}
            </p>
            <a
              href="#top"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-lg font-bold text-white transition-all hover:bg-accent-hover hover:scale-105"
            >
              🔥 {t("cta.button")}
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-card-border pt-8 text-center text-sm text-muted">
          <p>
            &copy; 2026 {t("footer.copyright")}
          </p>
          <p className="mt-2">
            {t("footer.privacy")}
          </p>
        </footer>
      </main>
    </div>
  );
}
