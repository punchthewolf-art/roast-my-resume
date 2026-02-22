import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { roastResume } from "@/lib/claude";
import { saveRoast } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { text, locale } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: locale === "fr" ? "Aucun texte de CV fourni" : "No resume text provided" },
        { status: 400 }
      );
    }

    if (text.length < 50) {
      return NextResponse.json(
        { error: locale === "fr" ? "Le texte du CV est trop court. Veuillez uploader un vrai CV." : "Resume text is too short. Please upload a proper resume." },
        { status: 400 }
      );
    }

    // Generate roast via Claude (with locale for language)
    const result = await roastResume(text, locale || "en");

    // Save to Supabase
    const id = uuidv4();
    await saveRoast({
      id,
      resume_text: text,
      roast_text: result.roast,
      score: result.score,
      problems: result.problems,
    });

    return NextResponse.json({
      id,
      roast: result.roast,
      score: result.score,
      problems: result.problems,
    });
  } catch (error) {
    console.error("Roast error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate roast",
      },
      { status: 500 }
    );
  }
}
