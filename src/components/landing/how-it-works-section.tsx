import { Upload, Cpu, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Upload, Cpu, CheckCircle,
};

export async function HowItWorksSection() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("site_content")
    .select("*")
    .eq("section", "how_it_works")
    .eq("is_active", true)
    .order("sort_order");

  if (!items || items.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Verify any content in three simple steps
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, i) => {
            const Icon = iconMap[item.data.icon] || Cpu;
            return (
              <div key={item.id} className="relative text-center">
                {i < items.length - 1 && (
                  <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-border md:block" />
                )}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand text-brand-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <p className="mt-4 text-sm font-semibold text-brand">{item.data.step}</p>
                <h3 className="mt-2 text-xl font-semibold">{item.data.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.data.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
