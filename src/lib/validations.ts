import { z } from "zod";

export const verifyRequestSchema = z.object({
  contentType: z.enum(["image", "audio", "video", "text"]),
  content: z.string().min(1, "Content is required"),
  mimeType: z.string().optional(),
  provider: z.enum(["openai", "anthropic", "gemini"]).optional(),
  fileName: z.string().optional(),
  fileSize: z.number().optional(),
});

export const createApiKeySchema = z.object({
  label: z.string().min(1).max(100),
  scopes: z.array(z.enum(["verify", "history", "usage"])).default(["verify"]),
});

export const addProviderKeySchema = z.object({
  provider: z.enum(["openai", "anthropic", "gemini"]),
  apiKey: z.string().min(1, "API key is required"),
  label: z.string().min(1).max(100).default("Default"),
});

export const donationCheckoutSchema = z.object({
  amount: z.number().min(1, "Minimum donation is $1"),
  frequency: z.enum(["one_time", "monthly"]),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
  message: z.string().max(500).optional(),
  showOnWall: z.boolean().default(true),
  isAnonymous: z.boolean().default(false),
});

export type VerifyRequest = z.infer<typeof verifyRequestSchema>;
export type CreateApiKeyRequest = z.infer<typeof createApiKeySchema>;
export type AddProviderKeyRequest = z.infer<typeof addProviderKeySchema>;
export type DonationCheckoutRequest = z.infer<typeof donationCheckoutSchema>;
