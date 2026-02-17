import type { AIProvider } from "./types";
import { OpenAIProvider } from "./openai";
import { AnthropicProvider } from "./anthropic";
import { GeminiProvider } from "./gemini";

export type ProviderName = "openai" | "anthropic" | "gemini";

export function createProvider(providerName: ProviderName, apiKey: string): AIProvider {
  switch (providerName) {
    case "openai":
      return new OpenAIProvider(apiKey);
    case "anthropic":
      return new AnthropicProvider(apiKey);
    case "gemini":
      return new GeminiProvider(apiKey);
    default:
      throw new Error(`Unsupported provider: ${providerName}`);
  }
}

export function getDefaultProvider(): ProviderName {
  // Default priority: OpenAI > Anthropic > Gemini
  if (process.env.OPENAI_API_KEY) return "openai";
  if (process.env.ANTHROPIC_API_KEY) return "anthropic";
  if (process.env.GOOGLE_GEMINI_API_KEY) return "gemini";
  throw new Error("No AI provider API keys configured");
}

export function getPlatformApiKey(provider: ProviderName): string {
  switch (provider) {
    case "openai":
      return process.env.OPENAI_API_KEY || "";
    case "anthropic":
      return process.env.ANTHROPIC_API_KEY || "";
    case "gemini":
      return process.env.GOOGLE_GEMINI_API_KEY || "";
  }
}

export function getBestProviderForContent(contentType: string): ProviderName {
  switch (contentType) {
    case "audio":
      return "openai"; // Whisper is best for audio
    case "image":
    case "video":
      return "openai"; // GPT-4o Vision is strong
    case "text":
    default:
      return "openai";
  }
}
