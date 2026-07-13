'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { TEMPLATES, AdConceptInput, AdConcept } from '@/lib/templates';

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENAI_API_KEY!);

async function generateConceptForTemplate(
  template: typeof TEMPLATES[0],
  input: AdConceptInput
): Promise<AdConcept> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const prompt = `You are an expert advertising creative director trained in the Goldenberg, Mazursky & Solomon creativity template methodology.

TEMPLATE: ${template.name}
TEMPLATE GUIDANCE: ${template.promptGuidance}

PRODUCT DETAILS:
- Product/Service Name: ${input.productName}
- Key Benefit / USP: ${input.keyBenefit}
- Brand Tone: ${input.brandTone}
- Post Format: ${input.postFormat}
${input.targetAudience ? `- Target Audience: ${input.targetAudience}` : ''}
${input.competitors ? `- Key Competitors: ${input.competitors}` : ''}
${input.campaignType ? `- Campaign Type: ${input.campaignType}` : ''}

Generate ONE highly creative ad concept using ONLY the ${template.name} template as described above. The concept must:
1. Strictly follow the template's mechanics (not just be vaguely related to the name)
2. Be specific and visual — not abstract
3. Feel surprising yet inevitable when explained
4. Match the brand tone: ${input.brandTone}
5. Work for the format: ${input.postFormat}

Respond in this EXACT JSON format (no markdown, no extra text):
{
  "conceptIdea": "A vivid 2-3 sentence description of the core ad concept and how the template mechanic is applied",
  "visualHook": "Specific visual description — what the viewer sees, the composition, key visual elements",
  "copyHook": "The headline or key copy line for this ad (punchy, memorable, on-brand)",
  "callToAction": "A short, compelling call to action for this ad"
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Strip potential markdown code fences
  const jsonText = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();

  let parsed: { conceptIdea: string; visualHook: string; copyHook: string; callToAction: string };
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    // Fallback: extract fields manually
    parsed = {
      conceptIdea: 'Unable to parse AI response. Please try regenerating.',
      visualHook: '',
      copyHook: '',
      callToAction: '',
    };
  }

  return {
    templateKey: template.key,
    templateName: template.name,
    conceptIdea: parsed.conceptIdea,
    visualHook: parsed.visualHook,
    copyHook: parsed.copyHook,
    callToAction: parsed.callToAction,
  };
}

export async function generateAllConcepts(input: AdConceptInput): Promise<AdConcept[]> {
  const results = await Promise.all(
    TEMPLATES.map((template) => generateConceptForTemplate(template, input))
  );
  return results;
}

export async function regenerateSingleConcept(
  templateKey: string,
  input: AdConceptInput
): Promise<AdConcept> {
  const template = TEMPLATES.find((t) => t.key === templateKey);
  if (!template) throw new Error(`Template not found: ${templateKey}`);
  return generateConceptForTemplate(template, input);
}
