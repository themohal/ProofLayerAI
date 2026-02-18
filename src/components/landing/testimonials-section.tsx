import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function TestimonialsSection() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("site_content")
    .select("*")
    .eq("section", "testimonial")
    .eq("is_active", true)
    .order("sort_order");

  if (!items || items.length === 0) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Trusted by professionals
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our users have to say about ProofLayer AI
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {items.map((item) => (
            <Card key={item.id} className="border-0 bg-background shadow-sm">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: item.data.rating || 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-trust-medium text-trust-medium" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">&ldquo;{item.data.content}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold">{item.data.name}</p>
                  <p className="text-xs text-muted-foreground">{item.data.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
