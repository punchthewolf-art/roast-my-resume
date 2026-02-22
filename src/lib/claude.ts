import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function roastResume(resumeText: string, locale: string = "en"): Promise<{
  roast: string;
  score: number;
  problems: string[];
}> {
  const isFrench = locale === "fr";

  const promptEN = `You are a sarcastic, brutally honest, and hilarious recruiter. Your job is to ROAST this resume without mercy, but keep it funny and entertaining.

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

${resumeText}`;

  const promptFR = `Tu es un recruteur sarcastique, brutalement honnête et hilarant. Ton job est de ROASTER ce CV sans pitié, mais en restant drôle et divertissant.

Règles :
- Donne un score sur 10 (sois dur mais juste)
- Identifie les TOP 5 plus gros problèmes de ce CV
- Sois brutal mais DRÔLE - utilise l'humour, le sarcasme et l'esprit
- Utilise des emojis généreusement
- Écris en français
- Formate ta réponse EXACTEMENT en JSON avec cette structure :
{
  "score": <nombre 1-10>,
  "roast": "<ton roast complet en format markdown, sois créatif et drôle, 300-500 mots>",
  "problems": ["<problème 1>", "<problème 2>", "<problème 3>", "<problème 4>", "<problème 5>"]
}

IMPORTANT : Retourne UNIQUEMENT du JSON valide, pas d'autre texte avant ou après.

Voici le CV à roaster :

${resumeText}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: isFrench ? promptFR : promptEN,
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

export async function fixResume(resumeText: string, locale: string = "en"): Promise<{
  fixed: string;
  improvements: string[];
  atsScore: number;
}> {
  const isFrench = locale === "fr";

  const promptEN = `You are an expert recruiter and ATS optimization specialist with 20 years of experience. Your job is to completely rewrite and optimize this resume.

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

${resumeText}`;

  const promptFR = `Tu es un expert en recrutement et spécialiste de l'optimisation ATS avec 20 ans d'expérience. Ton travail est de réécrire et optimiser complètement ce CV.

Règles :
- Réécris le CV de manière professionnelle, optimisé pour les systèmes ATS
- Corrige TOUS les problèmes (mise en forme, contenu, mots-clés, structure)
- Ajoute des mots-clés pertinents du secteur
- Utilise des verbes d'action forts et des réalisations quantifiées
- Donne un score de compatibilité ATS sur 100
- Liste les principales améliorations effectuées
- Formate le CV corrigé en markdown propre
- Écris en français

Retourne EXACTEMENT cette structure JSON :
{
  "fixed": "<le CV entièrement réécrit en markdown>",
  "improvements": ["<amélioration 1>", "<amélioration 2>", ...],
  "atsScore": <nombre 1-100>
}

IMPORTANT : Retourne UNIQUEMENT du JSON valide, pas d'autre texte.

Voici le CV à corriger :

${resumeText}`;

  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: isFrench ? promptFR : promptEN,
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
