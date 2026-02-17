import { createHash } from "crypto";
import { MAX_FILE_SIZES, type ContentType } from "./constants";

const ACCEPTED_TYPES: Record<ContentType, string[]> = {
  image: ["image/jpeg", "image/png", "image/gif", "image/webp", "image/bmp"],
  audio: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/webm", "audio/mp4", "audio/flac"],
  video: ["video/mp4", "video/webm", "video/ogg", "video/quicktime"],
  text: ["text/plain", "text/markdown", "text/html", "application/pdf"],
};

export function validateFile(
  contentType: ContentType,
  mimeType: string,
  size: number
): { valid: boolean; error?: string } {
  const accepted = ACCEPTED_TYPES[contentType];
  if (!accepted) {
    return { valid: false, error: `Unsupported content type: ${contentType}` };
  }

  if (!accepted.includes(mimeType)) {
    return { valid: false, error: `Unsupported file type: ${mimeType}. Accepted: ${accepted.join(", ")}` };
  }

  const maxSize = MAX_FILE_SIZES[contentType];
  if (size > maxSize) {
    return { valid: false, error: `File too large. Maximum: ${maxSize / 1024 / 1024}MB` };
  }

  return { valid: true };
}

export function computeContentHash(content: string): string {
  return createHash("sha256").update(content).digest("hex");
}

export function detectContentType(mimeType: string): ContentType | null {
  for (const [type, mimes] of Object.entries(ACCEPTED_TYPES)) {
    if (mimes.includes(mimeType)) return type as ContentType;
  }
  return null;
}
