// Model fingerprinting intelligence
// Maps detection signals to known AI model signatures

const MODEL_SIGNATURES: Record<string, string[]> = {
  "GPT-4": ["structured_lists", "hedging_language", "comprehensive_coverage", "markdown_formatting"],
  "GPT-4o": ["concise_responses", "natural_flow", "multimodal_awareness"],
  "Claude": ["nuanced_reasoning", "ethical_considerations", "structured_analysis", "caveat_language"],
  "DALL-E 3": ["smooth_textures", "consistent_lighting", "text_in_images", "photorealistic_skin"],
  "Midjourney": ["artistic_style", "dramatic_lighting", "painterly_quality", "aspect_ratio_artifacts"],
  "Stable Diffusion": ["texture_artifacts", "finger_anomalies", "background_blur_patterns"],
  "ElevenLabs": ["consistent_prosody", "natural_pauses", "voice_cloning_markers"],
  "Suno": ["musical_patterns", "lyric_generation_markers", "audio_loop_artifacts"],
};

export function identifyModelFingerprint(
  signals: string[],
  contentType: string,
  rawFingerprint: string | null
): string | null {
  // If the AI provider already identified a model, validate it
  if (rawFingerprint) {
    const normalized = rawFingerprint.toLowerCase();
    for (const model of Object.keys(MODEL_SIGNATURES)) {
      if (normalized.includes(model.toLowerCase())) {
        return model;
      }
    }
    return rawFingerprint; // Return as-is if not in our database
  }

  // Otherwise, try to match based on signals
  if (!signals.length) return null;

  const normalizedSignals = signals.map((s) => s.toLowerCase().replace(/\s+/g, "_"));

  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [model, signatures] of Object.entries(MODEL_SIGNATURES)) {
    const matchCount = signatures.filter((sig) =>
      normalizedSignals.some((s) => s.includes(sig) || sig.includes(s))
    ).length;
    const score = matchCount / signatures.length;
    if (score > bestScore && score > 0.3) {
      bestScore = score;
      bestMatch = model;
    }
  }

  return bestMatch;
}
