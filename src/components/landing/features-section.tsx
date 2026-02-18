import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Fingerprint, BarChart3, Key, Layers, Cpu } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield, Fingerprint, BarChart3, Key, Layers, Cpu,
};

export async function FeaturesSection() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("site_content")
    .select("*")
    .eq("section", "feature")
    .eq("is_active", true)
    .order("sort_order");

  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to verify AI content
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive AI detection tools for developers, journalists, and enterprises.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const Icon = iconMap[item.data.icon] || Shield;
            return (
              <Card key={item.id} className="border-0 bg-background shadow-sm">
                <CardHeader>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                    <Icon className="h-5 w-5 text-brand" />
                  </div>
                  <CardTitle className="text-lg">{item.data.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.data.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
