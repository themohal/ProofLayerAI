export const APP_NAME = "ProofLayer AI";
export const APP_DESCRIPTION = "The SSL Certificate of the AI Age — Universal AI Trust API";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export type PlanType = "starter" | "pro" | "growth" | "enterprise";

export interface PlanConfig {
  name: string;
  price: number;
  annualPrice: number;
  platformScans: number;
  byokScans: number;
  byokFeePerScan: number;
  features: string[];
}

export const PLANS: Record<PlanType, PlanConfig> = {
  starter: {
    name: "Starter",
    price: 19,
    annualPrice: 190,
    platformScans: 500,
    byokScans: 2500,
    byokFeePerScan: 0.003,
    features: [
      "500 scans/mo (platform keys)",
      "2,500 scans/mo (BYOK)",
      "Image & text verification",
      "Basic trust scores",
      "Email support",
      "7-day free trial",
    ],
  },
  pro: {
    name: "Pro",
    price: 49,
    annualPrice: 490,
    platformScans: 5000,
    byokScans: 25000,
    byokFeePerScan: 0.002,
    features: [
      "5K scans/mo (platform keys)",
      "25K scans/mo (BYOK)",
      "All content types",
      "Model fingerprinting",
      "API access",
      "Priority support",
    ],
  },
  growth: {
    name: "Growth",
    price: 149,
    annualPrice: 1490,
    platformScans: 50000,
    byokScans: 250000,
    byokFeePerScan: 0.001,
    features: [
      "50K scans/mo (platform keys)",
      "250K scans/mo (BYOK)",
      "All content types",
      "Advanced analytics",
      "Webhook integrations",
      "Dedicated support",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: 499,
    annualPrice: 4990,
    platformScans: 500000,
    byokScans: -1, // unlimited
    byokFeePerScan: 0.0005,
    features: [
      "500K scans/mo (platform keys)",
      "Unlimited BYOK scans",
      "Custom model training",
      "SLA guarantee",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
};

export const SUPPORTED_PROVIDERS = ["openai", "anthropic", "gemini"] as const;
export type AIProviderName = (typeof SUPPORTED_PROVIDERS)[number];

export const PROVIDER_DISPLAY_NAMES: Record<AIProviderName, string> = {
  openai: "OpenAI",
  anthropic: "Anthropic",
  gemini: "Google Gemini",
};

export const CONTENT_TYPES = ["image", "audio", "video", "text"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

export const MAX_FILE_SIZES: Record<ContentType, number> = {
  image: 10 * 1024 * 1024, // 10MB
  audio: 25 * 1024 * 1024, // 25MB
  video: 50 * 1024 * 1024, // 50MB
  text: 1 * 1024 * 1024, // 1MB
};

export const DONATION_TIERS = {
  supporter: { min: 1, max: 24, label: "Supporter", color: "gray" },
  champion: { min: 25, max: 99, label: "Champion", color: "blue" },
  guardian: { min: 100, max: 499, label: "Guardian", color: "purple" },
  patron: { min: 500, max: Infinity, label: "Patron", color: "gold" },
} as const;

export function getDonationTier(amount: number) {
  if (amount >= 500) return DONATION_TIERS.patron;
  if (amount >= 100) return DONATION_TIERS.guardian;
  if (amount >= 25) return DONATION_TIERS.champion;
  return DONATION_TIERS.supporter;
}
