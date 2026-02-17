import { Check, Minus } from "lucide-react";
import { PLANS } from "@/lib/constants";

const features = [
  { name: "Platform key scans", values: ["500/mo", "5K/mo", "50K/mo", "500K/mo"] },
  { name: "BYOK scans", values: ["2,500/mo", "25K/mo", "250K/mo", "Unlimited"] },
  { name: "BYOK platform fee", values: ["$0.003", "$0.002", "$0.001", "$0.0005"] },
  { name: "Image verification", values: [true, true, true, true] },
  { name: "Text verification", values: [true, true, true, true] },
  { name: "Audio verification", values: [false, true, true, true] },
  { name: "Video verification", values: [false, true, true, true] },
  { name: "Model fingerprinting", values: [false, true, true, true] },
  { name: "API access", values: [false, true, true, true] },
  { name: "Advanced analytics", values: [false, false, true, true] },
  { name: "Webhook integrations", values: [false, false, true, true] },
  { name: "Custom model training", values: [false, false, false, true] },
  { name: "SLA guarantee", values: [false, false, false, true] },
  { name: "Dedicated support", values: [false, false, true, true] },
];

const plans = ["Starter", "Pro", "Growth", "Enterprise"];

export function PricingComparison() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-2xl font-bold text-center mb-8">Compare Plans</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left font-medium">Feature</th>
              {plans.map((p) => (
                <th key={p} className="py-3 text-center font-medium">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature) => (
              <tr key={feature.name} className="border-b">
                <td className="py-3 text-muted-foreground">{feature.name}</td>
                {feature.values.map((val, i) => (
                  <td key={i} className="py-3 text-center">
                    {typeof val === "boolean" ? (
                      val ? <Check className="h-4 w-4 text-trust-high mx-auto" /> : <Minus className="h-4 w-4 text-muted-foreground mx-auto" />
                    ) : (
                      <span className="font-medium">{val}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
