import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RoastMyResume - Get Your CV Brutally Roasted by AI",
  description:
    "Upload your resume and get a brutally honest, hilarious AI roast. Find out what recruiters really think. Free roast, paid fix.",
  keywords: [
    "resume roast",
    "cv review",
    "AI resume",
    "ATS optimization",
    "resume feedback",
    "career",
  ],
  openGraph: {
    title: "RoastMyResume - Get Your CV Brutally Roasted by AI",
    description:
      "Upload your resume. Get roasted. Get hired. Free AI resume roast with brutal honesty.",
    type: "website",
    locale: "en_US",
    siteName: "RoastMyResume",
  },
  twitter: {
    card: "summary_large_image",
    title: "RoastMyResume - Get Your CV Brutally Roasted by AI",
    description:
      "My resume just got destroyed by AI. Upload yours and see your score.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
