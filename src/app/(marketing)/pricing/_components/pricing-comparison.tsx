import { Check, Minus } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const plans = ["Starter", "Pro", "Growth", "Enterprise"];

export async function PricingComparison() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("site_content")
    .select("*")
    .eq("section", "pricing_comparison")
    .eq("is_active", true)
    .order("sort_order");

  if (!items || items.length === 0) return null;

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
            {items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 text-muted-foreground">{item.data.name}</td>
                {(item.data.values as (string | boolean)[]).map((val, i) => (
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
