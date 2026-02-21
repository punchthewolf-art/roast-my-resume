import Header from "@/components/Header";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-3xl px-4 pt-28 pb-20">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
          <p className="text-sm text-muted">Last updated: February 21, 2026</p>

          <section>
            <h2 className="text-xl font-bold text-white mt-6 mb-3">1. What We Collect</h2>
            <p>When you use RoastMyResume, we collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-white">Your resume text</strong> - extracted from the PDF you upload</li>
              <li><strong className="text-white">Payment information</strong> - processed securely by Stripe (we never see your card details)</li>
              <li><strong className="text-white">Usage data</strong> - anonymous analytics to improve the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-6 mb-3">2. How We Use Your Data</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To generate your AI resume roast and fix</li>
              <li>To process payments via Stripe</li>
              <li>To improve our service</li>
            </ul>
            <p>We do <strong className="text-white">NOT</strong> sell, share, or rent your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-6 mb-3">3. Data Retention</h2>
            <p>Your resume data is automatically deleted after <strong className="text-white">24 hours</strong>. We do not store resumes long-term.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-6 mb-3">4. Third-Party Services</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong className="text-white">Stripe</strong> - for secure payment processing</li>
              <li><strong className="text-white">Anthropic (Claude AI)</strong> - for resume analysis and rewriting</li>
              <li><strong className="text-white">Vercel</strong> - for hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-6 mb-3">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Request deletion of your data</li>
              <li>Access the data we have about you</li>
              <li>Opt out of analytics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mt-6 mb-3">6. Contact</h2>
            <p>For any privacy-related questions, contact us at: <a href="mailto:punchthewolf@gmail.com" className="text-accent hover:underline">punchthewolf@gmail.com</a></p>
          </section>
        </div>
      </main>
    </div>
  );
}
