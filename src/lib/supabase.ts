import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key || url.includes("your_supabase")) {
      throw new Error(
        "Supabase not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
      );
    }

    _supabase = createClient(url, key);
  }
  return _supabase;
}

export interface RoastRecord {
  id: string;
  resume_text: string;
  roast_text: string;
  score: number;
  problems: string[];
  fixed_text: string | null;
  ats_score: number | null;
  improvements: string[] | null;
  paid: boolean;
  created_at: string;
}

export async function saveRoast(data: {
  id: string;
  resume_text: string;
  roast_text: string;
  score: number;
  problems: string[];
}): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.from("roasts").insert({
    id: data.id,
    resume_text: data.resume_text,
    roast_text: data.roast_text,
    score: data.score,
    problems: data.problems,
    paid: false,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error("Failed to save roast");
  }
}

export async function getRoast(id: string): Promise<RoastRecord | null> {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("roasts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Supabase fetch error:", error);
    return null;
  }

  return data as RoastRecord;
}

export async function updateRoastWithFix(
  id: string,
  fixData: {
    fixed_text: string;
    ats_score: number;
    improvements: string[];
  }
): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase
    .from("roasts")
    .update({
      fixed_text: fixData.fixed_text,
      ats_score: fixData.ats_score,
      improvements: fixData.improvements,
      paid: true,
    })
    .eq("id", id);

  if (error) {
    console.error("Supabase update error:", error);
    throw new Error("Failed to update roast with fix");
  }
}
