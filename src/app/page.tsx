import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";

const exampleRoasts = [
  {
    score: 3,
    preview:
      "Oh honey... 'Proficient in Microsoft Word' is not a skill, it's a baseline for existing in 2026. Your resume reads like a grocery list written by someone who forgot what they went shopping for.",
    emoji: "💀",
  },
  {
    score: 5,
    preview:
      "I see you listed 'team player' as a skill. That's like a fish listing 'swimming' on their resume. Your experience section has more buzzwords than a Silicon Valley pitch deck.",
    emoji: "😬",
  },
  {
    score: 7,
    preview:
      "Not terrible! But your resume has the personality of a beige wall. You've got the skills, but this formatting is giving '2005 Word template'. Let's add some spice.",
    emoji: "🔥",
  },
];

const stats = [
  { value: "🔥", label: "Brutally Honest" },
  { value: "⚡", label: "30-Second Roast" },
  { value: "✨", label: "AI-Powered Fix" },
];

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <main className="mx-auto max-w-5xl px-4 pt-28 pb-20">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm text-accent">
            <span className="fire-bounce">🔥</span>
            Free AI Resume Roast
          </div>

          {/* Title */}
          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight md:text-7xl">
            Your Resume
            <br />
            <span className="gradient-text">Gets Roasted</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            Upload your CV and let our brutally honest AI tell you what
            recruiters <em>really</em> think. Get scored, get roasted, then get
            the fix.
          </p>

          {/* Stats */}
          <div className="mt-8 flex items-center gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl">
                  {stat.value}
                </div>
                <div className="text-xs text-muted font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Upload Zone */}
          <div className="mt-12 w-full flex justify-center">
            <UploadZone />
          </div>

          <p className="mt-4 text-xs text-muted">
            Your resume is processed securely and never shared. We use it only
            for the roast.
          </p>
        </div>

        {/* How it works */}
        <section id="how-it-works" className="mt-32">
          <h2 className="text-center text-3xl font-bold">How It Works</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                emoji: "📄",
                title: "Upload Your CV",
                desc: "Drop your PDF resume. We extract the text securely.",
              },
              {
                step: "2",
                emoji: "🔥",
                title: "Get Roasted",
                desc: "Our AI reads your resume and delivers a brutal, funny roast with a score.",
              },
              {
                step: "3",
                emoji: "✨",
                title: "Get The Fix",
                desc: "Unlock the professionally rewritten, ATS-optimized version starting at just $4.99.",
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
            Example Roasts <span className="fire-bounce inline-block">🔥</span>
          </h2>
          <p className="mt-2 text-center text-muted">
            Real roasts from real resumes (anonymized)
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
            <h2 className="text-3xl font-bold">Ready to Face the Truth?</h2>
            <p className="mt-3 text-muted">
              Upload your resume now. It only takes 30 seconds.
            </p>
            <a
              href="#top"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3 text-lg font-bold text-white transition-all hover:bg-accent-hover hover:scale-105"
            >
              🔥 Roast My Resume
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-20 border-t border-card-border pt-8 text-center text-sm text-muted">
          <p>
            &copy; 2026 RoastMyResume. Built with 🔥 and questionable career
            advice.
          </p>
          <p className="mt-2">
            Your data is processed securely and deleted after 24 hours.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <a href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</a>
            <span className="text-card-border">|</span>
            <a href="/terms" className="hover:text-accent transition-colors">Terms of Service</a>
            <span className="text-card-border">|</span>
            <a href="mailto:punchthewolf@gmail.com" className="hover:text-accent transition-colors">Contact</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
