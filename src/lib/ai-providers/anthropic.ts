import Anthropic from "@anthropic-ai/sdk";
import type { AIProvider, RawAnalysis } from "./types";
import { DETECTION_SYSTEM_PROMPT, TEXT_ANALYSIS_PROMPT, IMAGE_ANALYSIS_PROMPT } from "./prompts";

export class AnthropicProvider implements AIProvider {
  name = "anthropic";
  private client: Anthropic;

  constructor(apiKey: string) {
    this.client = new Anthropic({ apiKey });
  }

  async analyzeText(content: string): Promise<RawAnalysis> {
    const response = await this.client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1000,
      system: DETECTION_SYSTEM_PROMPT,
      messages: [
        { role: "user", content: TEXT_ANALYSIS_PROMPT + content },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return this.parseResponse(text);
  }

  async analyzeImage(imageBase64: string, mimeType: string): Promise<RawAnalysis> {
    const mediaType = mimeType as "image/jpeg" | "image/png" | "image/gif" | "image/webp";
    const response = await this.client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 1000,
      system: DETECTION_SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: imageBase64 } },
            { type: "text", text: IMAGE_ANALYSIS_PROMPT },
          ],
        },
      ],
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return this.parseResponse(text);
  }

  async analyzeAudio(_audioBase64: string, _mimeType: string): Promise<RawAnalysis> {
    // Anthropic doesn't natively support audio — return unsupported
    return {
      aiProbability: 50,
      isAiGenerated: false,
      modelFingerprint: null,
      manipulationType: null,
      confidence: 0,
      details: { reasoning: "Audio analysis is not supported by the Anthropic provider. Please use OpenAI or Gemini for audio analysis." },
    };
  }

  private parseResponse(raw: string): RawAnalysis {
    try {
      // Extract JSON from response (Claude might wrap it in markdown)
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
