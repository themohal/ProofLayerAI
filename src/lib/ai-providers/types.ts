export interface RawAnalysis {
  aiProbability: number; // 0-100
  isAiGenerated: boolean;
  modelFingerprint: string | null;
  manipulationType: string | null;
  confidence: number; // 0-100
  details: {
    textualPatterns?: string[];
    visualArtifacts?: string[];
    audioMarkers?: string[];
    metadata?: Record<string, unknown>;
    reasoning: string;
  };
}

export interface AIProvider {
  name: string;
  analyzeText(content: string): Promise<RawAnalysis>;
  analyzeImage(imageBase64: string, mimeType: string): Promise<RawAnalysis>;
  analyzeAudio(audioBase64: string, mimeType: string): Promise<RawAnalysis>;
}

export interface TrustScore {
  score: number; // 0-100, higher = more trustworthy (human)
  aiProbability: number; // 0-100
  isAiGenerated: boolean;
  confidence: number;
  modelFingerprint: string | null;
  manipulationType: string | null;
  detailedAnalysis: RawAnalysis["details"];
  provider: string;
  isByok: boolean;
  processingTimeMs: number;
}

export interface VerifyRequest {
  contentType: "image" | "audio" | "video" | "text";
  content: string; // base64 for files, raw for text
  mimeType?: string;
  provider?: "openai" | "anthropic" | "gemini";
  fileName?: string;
  fileSize?: number;
}

export interface VerifyResponse {
  id: string;
  trustScore: number;
  aiProbability: number;
  isAiGenerated: boolean;
  confidence: number;
  modelFingerprint: string | null;
  manipulationType: string | null;
  detailedAnalysis: RawAnalysis["details"];
  provider: string;
  isByok: boolean;
  processingTimeMs: number;
  contentType: string;
  createdAt: string;
}
