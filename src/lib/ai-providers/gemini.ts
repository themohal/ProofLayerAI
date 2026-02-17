import { GoogleGenerativeAI } from "@google/generative-ai";
import type { AIProvider, RawAnalysis } from "./types";
import { DETECTION_SYSTEM_PROMPT, TEXT_ANALYSIS_PROMPT, IMAGE_ANALYSIS_PROMPT, AUDIO_ANALYSIS_PROMPT } from "./prompts";

export class GeminiProvider implements AIProvider {
  name = "gemini";
  private client: GoogleGenerativeAI;

  constructor(apiKey: string) {
    this.client = new GoogleGenerativeAI(apiKey);
  }

  async analyzeText(content: string): Promise<RawAnalysis> {
    const model = this.client.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: DETECTION_SYSTEM_PROMPT + "\n\n" + TEXT_ANALYSIS_PROMPT + content }] }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 1000, responseMimeType: "application/json" },
    });

    return this.parseResponse(result.response.text());
  }

  async analyzeImage(imageBase64: string, mimeType: string): Promise<RawAnalysis> {
    const model = this.client.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { text: DETECTION_SYSTEM_PROMPT + "\n\n" + IMAGE_ANALYSIS_PROMPT },
          { inlineData: { mimeType, data: imageBase64 } },
        ],
      }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 1000, responseMimeType: "application/json" },
    });

    return this.parseResponse(result.response.text());
  }

  async analyzeAudio(audioBase64: string, mimeType: string): Promise<RawAnalysis> {
    const model = this.client.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { text: DETECTION_SYSTEM_PROMPT + "\n\n" + AUDIO_ANALYSIS_PROMPT },
          { inlineData: { mimeType, data: audioBase64 } },
        ],
      }],
      generationConfig: { temperature: 0.1, maxOutputTokens: 1000, responseMimeType: "application/json" },
    });

    return this.parseResponse(result.response.text());
  }

  private parseResponse(raw: string): RawAnalysis {
    try {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("No JSON found");
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        aiProbability: Math.min(100, Math.max(0, parsed.aiProbability || 0)),
        isAiGenerated: parsed.isAiGenerated || false,
        modelFingerprint: parsed.modelFingerprint || null,
        manipulationType: parsed.manipulationType || null,
        confidence: Math.min(100, Math.max(0, parsed.confidence || 50)),
        details: {
          reasoning: parsed.reasoning || "No reasoning provided",
          textualPatterns: parsed.signals || [],
          metadata: { raw: parsed },
        },
      };
    } catch {
      return {
        aiProbability: 50,
        isAiGenerated: false,
        modelFingerprint: null,
        manipulationType: null,
        confidence: 0,
        details: { reasoning: "Failed to parse AI response" },
      };
    }
  }
}
