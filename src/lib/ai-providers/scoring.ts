import type { RawAnalysis, TrustScore } from "./types";

export function calculateTrustScore(
  analysis: RawAnalysis,
  provider: string,
  isByok: boolean,
  processingTimeMs: number
): TrustScore {
  // Trust score = inverse of AI probability, weighted by confidence
  // Higher trust score = more likely human/authentic
  const rawTrustScore = 100 - analysis.aiProbability;

  // Apply confidence weighting — low confidence pushes score toward 50 (uncertain)
  const confidenceWeight = analysis.confidence / 100;
  const weightedScore = rawTrustScore * confidenceWeight + 50 * (1 - confidenceWeight);

  // Round to 2 decimal places
  const score = Math.round(weightedScore * 100) / 100;

  return {
    score: Math.min(100, Math.max(0, score)),
    aiProbability: analysis.aiProbability,
    isAiGenerated: analysis.isAiGenerated,
    confidence: analysis.confidence,
    modelFingerprint: analysis.modelFingerprint,
    manipulationType: analysis.manipulationType,
    detailedAnalysis: analysis.details,
    provider,
    isByok,
    processingTimeMs,
  };
}
