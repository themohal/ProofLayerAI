import OpenAI from "openai";
import type { AIProvider, RawAnalysis } from "./types";
import { DETECTION_SYSTEM_PROMPT, TEXT_ANALYSIS_PROMPT, IMAGE_ANALYSIS_PROMPT, AUDIO_ANALYSIS_PROMPT } from "./prompts";

export class OpenAIProvider implements AIProvider {
  name = "openai";
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async analyzeText(content: string): Promise<RawAnalysis> {
    const response = await this.client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: DETECTION_SYSTEM_PROMPT },
        { role: "user", content: TEXT_ANALYSIS_PROMPT + content },
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 1000,
    });

    return this.parseResponse(response.choices[0].message.content || "{}");
  }

  async analyzeImage(imageBase64: string, mimeType: string): Promise<RawAnalysis> {
    const response = await this.client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: DETECTION_SYSTEM_PROMPT },
        {
          role: "user",
          content: [
            { type: "text", text: IMAGE_ANALYSIS_PROMPT },
            { type: "image_url", image_url: { url: `data:${mimeType};base64,${imageBase64}` } },
          ],
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 1000,
    });

    return this.parseResponse(response.choices[0].message.content || "{}");
  }

  async analyzeAudio(audioBase64: string, mimeType: string): Promise<RawAnalysis> {
    // First transcribe with Whisper, then analyze the transcription + metadata
    const audioBuffer = Buffer.from(audioBase64, "base64");
    const file = new File([audioBuffer], "audio.wav", { type: mimeType });

    const transcription = await this.client.audio.transcriptions.create({
      model: "whisper-1",
      file,
    });

    const response = await this.client.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: DETECTION_SYSTEM_PROMPT },
        {
          role: "user",
          content: `${AUDIO_ANALYSIS_PROMPT}\n\nTranscription of the audio:\n${transcription.text}\n\nNote: This is a transcription-based analysis. Analyze the speech patterns, word choices, and any indicators of AI-generated speech.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 1000,
    });

    return this.parseResponse(response.choices[0].message.content || "{}");
  }

  private parseResponse(raw: string): RawAnalysis {
    try {
      const parsed = JSON.parse(raw);
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
