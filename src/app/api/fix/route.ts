import { NextRequest, NextResponse } from "next/server";
import { fixResume } from "@/lib/claude";
import { getRoast, updateRoastWithFix } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { roastId } = await request.json();

    if (!roastId) {
      return NextResponse.json(
        { error: "No roast ID provided" },
        { status: 400 }
      );
    }

    // Get original roast
    const roast = await getRoast(roastId);
    if (!roast) {
      return NextResponse.json(
        { error: "Roast not found" },
        { status: 404 }
      );
    }

    // Check if already fixed
    if (roast.fixed_text) {
      return NextResponse.json({
        fixed: roast.fixed_text,
        atsScore: roast.ats_score,
        improvements: roast.improvements,
      });
    }

    // Generate fix via Claude
    const result = await fixResume(roast.resume_text);

    // Update in Supabase
    await updateRoastWithFix(roastId, {
      fixed_text: result.fixed,
      ats_score: result.atsScore,
      improvements: result.improvements,
    });

    return NextResponse.json({
      fixed: result.fixed,
      atsScore: result.atsScore,
      improvements: result.improvements,
    });
  } catch (error) {
    console.error("Fix error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fix resume",
      },
      { status: 500 }
    );
  }
}
