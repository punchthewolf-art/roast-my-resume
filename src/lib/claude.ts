import Anthropic from "@anthropic-ai/sdk";

let _anthropic: Anthropic | null = null;

function getAnthropic(): Anthropic {
  if (!_anthropic) {
    const apiKey = process.env.ROAST_ANTHROPIC_API_KEY;
    if (!apiKey || apiKey.includes("your_")) {
      throw new Error(
        "Anthropic API key not configured. Set ROAST_ANTHROPIC_API_KEY in .env.local"
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
    max_tokens: 3000,
    messages: [
      {
        role: "user",
        content: `You are a legendary, sarcastic, brutally honest recruiter who moonlights as a stand-up comedian. Your job is to ROAST this resume without mercy, but keep it hilarious and entertaining.

## Your Style:
- Think Gordon Ramsay reviewing a dish, but for resumes
- Use emojis generously throughout (at least 10-15 emojis in the roast)
- Be SAVAGE but FUNNY - dark humor, sarcasm, wit, pop culture references
- Make the person laugh at themselves while learning what's wrong
- Write in a conversational, punchy style

## Structure your roast with these SECTIONS (use markdown headers):

### First Impression 👀
(Your gut reaction in 2-3 sentences)

### The Good (If Any) 😅
(Find at least ONE nice thing to say, even if backhanded)

### The Roast 🔥
(The main brutal, hilarious roast - 200-300 words, with paragraph breaks every 2-3 sentences. Use **bold** for emphasis and emojis to break up the text)

### Reality Check 💀
(A short, punchy closing that transitions to "but we can fix this")

## Rules:
- Give a score out of 10 (be harsh but fair - most resumes score 3-6)
- Identify the TOP 5 biggest problems
- Write in English
- Use paragraph breaks and spacing - NO wall of text
- Each problem should be specific and actionable, not generic

Format your response EXACTLY as JSON:
{
  "score": <number 1-10>,
  "roast": "<your full roast in markdown format with sections, emojis, bold, paragraph breaks>",
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

// Tier-specific prompts for the Fix
const FIX_PROMPTS: Record<string, string> = {
  fix: `You are a senior professional resume writer with 15 years of experience in ATS optimization.

Your task: Completely rewrite and optimize this resume for the "Quick Fix" tier.

## What you MUST deliver:
1. **Complete resume rewrite** in clean, professional markdown
2. **ATS-optimized structure**: Summary > Experience > Education > Skills
3. **Strong action verbs** at the start of each bullet point (Led, Developed, Achieved, Implemented...)
4. **Quantified achievements** where possible (%, $, numbers)
5. **Industry-relevant keywords** woven naturally into the content
6. **Clean formatting** - no tables, no columns, no graphics (ATS can't read them)

## Structure the resume as:
# [Full Name]
[Email] | [Phone] | [Location] | [LinkedIn URL]

## Professional Summary
(3-4 powerful sentences summarizing their value proposition)

## Professional Experience
### [Job Title] | [Company] | [Dates]
- Achievement-focused bullet points with metrics
- Strong action verbs + specific results

## Education
### [Degree] | [University] | [Year]

## Skills
Technical Skills: [list] | Soft Skills: [list]

## ATS Score Guide:
- 90-100: Excellent, will pass most ATS
- 70-89: Good, minor tweaks needed
- 50-69: Needs work
- Below 50: Major rewrite needed`,

  pro: `You are an elite career strategist and professional resume writer who has helped 5000+ professionals land jobs at top companies (FAANG, Fortune 500, startups).

Your task: Deliver the FULL "Pro Package" which includes everything below.

## DELIVERABLE 1: Complete Resume Rewrite
Follow the same professional structure as Quick Fix but with EXTRA depth:
- More sophisticated language and industry terminology
- Quantified achievements for EVERY bullet point (estimate if needed)
- Tailored keywords for the candidate's specific industry
- Executive-level formatting and tone
- ATS score of 85+

## DELIVERABLE 2: Professional Summary Variations
Write 3 different professional summaries tailored to different job types:
1. For the candidate's primary industry
2. For a career pivot / adjacent industry
3. For a leadership/management role

## DELIVERABLE 3: Cover Letter Template
Write a customizable cover letter that:
- Matches the resume's tone and achievements
- Has [COMPANY NAME] and [POSITION] placeholders
- Follows the STAR method for key achievements
- Is concise (250-300 words max)

## DELIVERABLE 4: LinkedIn Summary
Write an optimized LinkedIn "About" section (200-300 words):
- First person, conversational but professional
- Keywords for LinkedIn search algorithm
- Clear value proposition
- Call to action at the end

Format each deliverable clearly with markdown headers.`,

  career: `You are a world-class career consultant who has coached C-suite executives and helped professionals negotiate $100K+ salary increases.

Your task: Deliver the COMPLETE "Career Boost" package - the ultimate career makeover.

## DELIVERABLE 1: Premium Resume Rewrite
The absolute best version of their resume:
- Executive-level language and formatting
- Every achievement quantified with metrics
- Industry-specific power keywords
- Perfect ATS optimization (target 95+ score)
- Tailored professional summary

## DELIVERABLE 2: 3 Resume Variations
Create 3 distinct resume versions targeting:
1. Their current industry (optimized)
2. An adjacent/growth industry
3. A senior/leadership position
Each should have a unique professional summary and adjusted bullet points.

## DELIVERABLE 3: Cover Letter (Full)
A complete, polished cover letter:
- Personalized story arc
- STAR method achievements
- [COMPANY] and [ROLE] placeholders
- 250-300 words

## DELIVERABLE 4: LinkedIn Profile Optimization
- Optimized headline (120 chars max)
- "About" section (300 words, keyword-rich)
- Featured section suggestions
- Skills endorsement strategy (top 5 skills to prioritize)

## DELIVERABLE 5: Interview Preparation Guide
Personalized based on their resume:
- 10 likely interview questions they'll face
- STAR-format answer frameworks for each
- 5 questions they should ask the interviewer
- Red flags to address proactively (gaps, transitions, etc.)

## DELIVERABLE 6: Salary Negotiation Tips
- Market rate estimate for their role/experience
- 3 negotiation scripts (initial ask, counter-offer, final negotiation)
- Benefits to negotiate beyond salary
- When and how to bring up compensation

Format each deliverable clearly with markdown headers and sections.`,
};

export async function fixResume(
  resumeText: string,
  tier: string = "fix"
): Promise<{
  fixed: string;
  improvements: string[];
  atsScore: number;
}> {
  const tierPrompt = FIX_PROMPTS[tier] || FIX_PROMPTS.fix;

  const message = await getAnthropic().messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: tier === "career" ? 8000 : tier === "pro" ? 6000 : 4000,
    messages: [
      {
        role: "user",
        content: `${tierPrompt}

Return EXACTLY this JSON structure:
{
  "fixed": "<the complete deliverable(s) in markdown format>",
  "improvements": ["<improvement 1>", "<improvement 2>", "<improvement 3>", "<improvement 4>", "<improvement 5>", "<improvement 6>"],
  "atsScore": <number 1-100>
}

IMPORTANT: Return ONLY valid JSON, no other text.

Here is the resume to fix and optimize:

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
