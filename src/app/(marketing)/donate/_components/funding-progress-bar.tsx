import { createClient } from "@/lib/supabase/server";

export async function FundingProgressBar() {
  const supabase = await createClient();
  const { data: goal } = await supabase.from("funding_goals").select("*").eq("is_active", true).single();

  if (!goal) return null;

  const percentage = Math.min(Math.round((goal.current_amount / goal.target_amount) * 100), 100);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-2">{goal.title}</h2>
        {goal.description && <p className="text-center text-muted-foreground mb-6">{goal.description}</p>}
        <div className="h-4 rounded-full bg-muted overflow-hidden">
          <div className="h-full rounded-full bg-gradient-to-r from-brand to-blue-400 transition-all duration-1000" style={{ width: `${percentage}%` }} />
        </div>
        <div className="flex justify-between mt-3 text-sm">
          <span className="font-medium">${goal.current_amount.toLocaleString()} raised</span>
          <span className="text-muted-foreground">of ${goal.target_amount.toLocaleString()} goal</span>
        </div>
      </div>
    </section>
  );
}
