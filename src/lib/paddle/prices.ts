import type { PlanType } from "@/lib/constants";

interface PriceIds {
  monthly: string;
  annual: string;
}

export const PRICE_IDS: Record<PlanType, PriceIds> = {
  starter: {
    monthly: process.env.PADDLE_STARTER_MONTHLY_PRICE_ID || "pri_starter_monthly",
    annual: process.env.PADDLE_STARTER_ANNUAL_PRICE_ID || "pri_starter_annual",
  },
  pro: {
    monthly: process.env.PADDLE_PRO_MONTHLY_PRICE_ID || "pri_pro_monthly",
    annual: process.env.PADDLE_PRO_ANNUAL_PRICE_ID || "pri_pro_annual",
  },
  growth: {
    monthly: process.env.PADDLE_GROWTH_MONTHLY_PRICE_ID || "pri_growth_monthly",
    annual: process.env.PADDLE_GROWTH_ANNUAL_PRICE_ID || "pri_growth_annual",
  },
  enterprise: {
    monthly: process.env.PADDLE_ENTERPRISE_MONTHLY_PRICE_ID || "pri_enterprise_monthly",
    annual: process.env.PADDLE_ENTERPRISE_ANNUAL_PRICE_ID || "pri_enterprise_annual",
  },
};

export function getPriceId(plan: PlanType, billing: "monthly" | "annual"): string {
  return PRICE_IDS[plan][billing];
}
