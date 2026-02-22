import { NextRequest, NextResponse } from "next/server";
import { fixResume } from "@/lib/claude";
import { getRoast, updateRoastWithFix } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { roastId, locale } = await request.json();

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

    // SECURITY: Check if user has paid
    if (!roast.paid) {
      return NextResponse.json(
        { error: "Payment required. Please complete checkout first." },
        { status: 402 }
      );
    }

    // Already fixed? Return cached result
    if (roast.fixed_text) {
      return NextResponse.json({
        fixed: roast.fixed_text,
        atsScore: roast.ats_score,
        improvements: roast.improvements,
      });
    }

    // Fallback: Generate fix if webhook hasn't processed yet
    console.log(`Generating fix on-demand for paid roast: ${roastId}`);
    const result = await fixResume(roast.resume_text, locale || "en");

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

// GET endpoint to check fix status (for polling)
export async function GET(request: NextRequest) {
  const roastId = request.nextUrl.searchParams.get("roastId");

  if (!roastId) {
    return NextResponse.json({ error: "No roast ID" }, { status: 400 });
  }

  const roast = await getRoast(roastId);
  if (!roast) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    paid: roast.paid,
    hasfix: !!roast.fixed_text,
    fixed: roast.fixed_text,
    atsScore: roast.ats_score,
    improvements: roast.improvements,
  });
}
