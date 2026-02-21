import Anthropic from "@anthropic-ai/sdk";

let _anthropic: Anthropic | null = null;

function getAnthropic(): Anthropic {
  if (!_anthropic) {
    const apiKey = process.env.ROAST_ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.includes("your_")) {
      throw new Error(
        "Anthropic API key not configured. Set ANTHROPIC_API_KEY in .env.local"
      );
    }
    _anthropic = new Anthropic({ apiKey });
  }
  return _anthropic;
}

export async function roastResume(resumeText: string): Promise<{
  roast: string;
  score: number;
  problems: string[];
}> {
  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `You are a sarcastic, brutally honest, and hilarious recruiter. Your job is to ROAST this resume without mercy, but keep it funny and entertaining.

Rules:
- Give a score out of 10 (be harsh but fair)
- Identify the TOP 5 biggest problems with this resume
- Be brutal but FUNNY - use humor, sarcasm, and wit
- Use emojis liberally
- Write in English
- Format your response EXACTLY as JSON with this structure:
{
  "score": <number 1-10>,
  "roast": "<your full roast in markdown format, be creative and funny, 300-500 words>",
  "problems": ["<problem 1>", "<problem 2>", "<problem 3>", "<problem 4>", "<problem 5>"]
}

IMPORTANT: Return ONLY valid JSON, no other text before or after.

Here is the resume to roast:

${resumeText}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  try {
    const parsed = JSON.parse(content.text);
    return {
      roast: parsed.roast,
      score: Math.min(10, Math.max(1, parsed.score)),
      problems: parsed.problems.slice(0, 5),
    };
  } catch {
    // If JSON parsing fails, try to extract from markdown code block
    const jsonMatch = content.text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[1]);
      return {
        roast: parsed.roast,
        score: Math.min(10, Math.max(1, parsed.score)),
        problems: parsed.problems.slice(0, 5),
      };
    }
    throw new Error("Failed to parse AI response");
  }
}

export async function fixResume(resumeText: string): Promise<{
  fixed: string;
  improvements: string[];
  atsScore: number;
}> {
  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `You are an expert recruiter and ATS optimization specialist with 20 years of experience. Your job is to completely rewrite and optimize this resume.

Rules:
- Rewrite the resume professionally, optimized for ATS systems
- Fix ALL problems (formatting, content, keywords, structure)
- Add relevant industry keywords
- Use strong action verbs and quantified achievements
- Give an ATS compatibility score out of 100
- List the top improvements made
- Format the fixed resume in clean markdown

Return EXACTLY this JSON structure:
{
  "fixed": "<the complete rewritten resume in markdown>",
  "improvements": ["<improvement 1>", "<improvement 2>", ...],
  "atsScore": <number 1-100>
}

IMPORTANT: Return ONLY valid JSON, no other text.

Here is the resume to fix:

${resumeText}`,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type");
  }

  try {
    const parsed = JSON.parse(content.text);
    return {
      fixed: parsed.fixed,
      improvements: parsed.improvements,
      atsScore: Math.min(100, Math.max(1, parsed.atsScore)),
    };
  } catch {
    const jsonMatch = content.text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[1]);
      return {
        fixed: parsed.fixed,
        improvements: parsed.improvements,
        atsScore: Math.min(100, Math.max(1, parsed.atsScore)),
      };
    }
    throw new Error("Failed to parse AI response");
  }
}
