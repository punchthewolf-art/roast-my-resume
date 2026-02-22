import { notFound } from "next/navigation";
import Header from "@/components/Header";
import RoastPageClient from "@/components/RoastPageClient";
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
        <RoastPageClient
          roast={{ ...roast, id }}
          showFix={!!showFix}
        />
      </main>
    </div>
  );
}
