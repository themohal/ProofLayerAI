"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { PLANS, type PlanType } from "@/lib/constants";
import { getPaddle } from "@/lib/paddle/client";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";

const planOrder: PlanType[] = ["starter", "pro", "growth", "enterprise"];

export function PricingCards() {
  const [annual, setAnnual] = useState(false);
  const { user } = useUser();

  const handleCheckout = async (plan: PlanType) => {
    if (!user) {
      window.location.href = "/signup";
      return;
    }

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing: annual ? "annual" : "monthly" }),
      });
      const { priceId, email } = await res.json();

      const paddle = await getPaddle();
      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customer: { email },
        customData: { user_id: user.id, plan },
      });
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Label htmlFor="billing">Monthly</Label>
        <Switch id="billing" checked={annual} onCheckedChange={setAnnual} />
        <Label htmlFor="billing">Annual <Badge variant="secondary" className="ml-1">Save 2 months</Badge></Label>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {planOrder.map((planKey) => {
          const plan = PLANS[planKey];
          const isPopular = planKey === "pro";
          const price = annual ? plan.annualPrice : plan.price;
          const perMonth = annual ? Math.round(plan.annualPrice / 12) : plan.price;

          return (
            <Card key={planKey} className={`relative flex flex-col ${isPopular ? "border-brand shadow-lg" : ""}`}>
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-medium text-white">Most Popular</div>
              )}
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="text-3xl font-bold text-foreground">${perMonth}</span>
                  <span className="text-muted-foreground">/mo</span>
                  {annual && <span className="block text-xs mt-1">${price}/year billed annually</span>}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between gap-4">
                <ul className="space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-trust-high mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-2 text-sm">
                    <Check className="h-4 w-4 text-trust-high mt-0.5 shrink-0" />
                    <span>BYOK fee: ${plan.byokFeePerScan}/scan</span>
                  </li>
                </ul>
                <Button className="w-full" variant={isPopular ? "default" : "outline"} onClick={() => handleCheckout(planKey)}>
                  {planKey === "starter" ? "Start 7-Day Trial" : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
