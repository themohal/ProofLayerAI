import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Globe, Server, Building } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Newspaper, Server, Building,
};

export async function ImpactStats() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("site_content")
    .select("*")
    .eq("section", "donation_impact")
    .eq("is_active", true)
    .order("sort_order");

  if (!items || items.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Your Impact</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {items.map((item) => {
            const Icon = iconMap[item.data.icon] || Globe;
            return (
              <Card key={item.id} className="text-center">
                <CardContent className="pt-6">
                  <Icon className="mx-auto h-8 w-8 text-brand mb-3" />
                  <p className="text-2xl font-bold text-brand">{item.data.amount}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.data.impact}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
