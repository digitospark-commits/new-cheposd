import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini SDK with telemetry header as strictly requested
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { businessName, industry, vibe } = body;

    if (!businessName || !industry || !vibe) {
      return NextResponse.json(
        { error: "Business name, industry, and vibe parameters are required." },
        { status: 400 }
      );
    }

    const prompt = `You are a world-class award-winning elite digital designer and UX strategist.
Generate a cohesive high-level web design concept presentation and content strategy blueprint for:
BUSINESS NAME: "${businessName}"
INDUSTRY/NICHE: "${industry}"
BRAND VIBE & AESTHETIC STYLE: "${vibe}" (e.g., Warm Editorial, Techno-Industrial Minimal, Bold brutalist, Swiss Modern)

Review the target identity, then deliver a tailored color palette (with hex codes), highly intentional typographical approach, a killer high-converting hero copy block, and structural section blueprints with interactive feature recommendations. Use standard hex colors.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            colorPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  hex: { type: Type.STRING },
                  role: { type: Type.STRING, description: "e.g., Background, Primary Accent, Text, Secondary Accent" }
                },
                required: ["name", "hex", "role"]
              }
            },
            typography: {
              type: Type.OBJECT,
              properties: {
                headerFont: { type: Type.STRING },
                bodyFont: { type: Type.STRING },
                rationale: { type: Type.STRING }
              },
              required: ["headerFont", "bodyFont", "rationale"]
            },
            heroCopy: {
              type: Type.OBJECT,
              properties: {
                headline: { type: Type.STRING, description: "Highly engaging, minimalist, high-converting bold headline" },
                subheadline: { type: Type.STRING, description: "Compelling value proposition supporting the headline" },
                ctaText: { type: Type.STRING, description: "Direct, high-conviction action label" }
              },
              required: ["headline", "subheadline", "ctaText"]
            },
            sections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING, description: "What this section should contain and why" },
                  suggestedInteractiveFeature: { type: Type.STRING, description: "A unique interactive module or slider to hook users" }
                },
                required: ["title", "description", "suggestedInteractiveFeature"]
              }
            },
            designerTip: { type: Type.STRING, description: "A high-end bespoke premium design recommendation for this identity" }
          },
          required: ["colorPalette", "typography", "heroCopy", "sections", "designerTip"]
        }
      }
    });

    if (!response || !response.text) {
      throw new Error("No response from Gemini API");
    }

    const data = JSON.parse(response.text.trim());
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Gemini Design Blueprint Generator Error:", error);
    return NextResponse.json(
      { error: "Failed to generate design concept blueprint: " + error.message },
      { status: 500 }
    );
  }
}
