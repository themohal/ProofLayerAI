import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLANS, type PlanType } from "@/lib/constants";

export default async function UsagePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { data: usageLogs } = await supabase.from("usage_logs").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(100);

  const plan = PLANS[(profile?.plan || "starter") as PlanType];
  const platformUsage = profile?.current_month_scans || 0;
  const byokUsage = profile?.current_month_byok_scans || 0;
  const platformPct = Math.min(Math.round((platformUsage / plan.platformScans) * 100), 100);
  const byokLimit = plan.byokScans === -1 ? "Unlimited" : plan.byokScans;
  const byokPct = plan.byokScans === -1 ? 0 : Math.min(Math.round((byokUsage / plan.byokScans) * 100), 100);

  // Provider breakdown
  const providerCounts: Record<string, number> = {};
  usageLogs?.forEach((log) => {
    const p = log.provider_used || "unknown";
    providerCounts[p] = (providerCounts[p] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Usage</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Platform Key Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{platformUsage} <span className="text-lg font-normal text-muted-foreground">/ {plan.platformScans}</span></div>
            <div className="mt-3 h-3 rounded-full bg-muted">
              <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${platformPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{platformPct}% of monthly limit used</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">BYOK Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{byokUsage} <span className="text-lg font-normal text-muted-foreground">/ {byokLimit}</span></div>
            <div className="mt-3 h-3 rounded-full bg-muted">
              <div className="h-full rounded-full bg-trust-high transition-all" style={{ width: `${byokPct}%` }} />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Platform fee: ${plan.byokFeePerScan}/scan
              {byokUsage > 0 && ` (Total: $${(byokUsage * plan.byokFeePerScan).toFixed(2)})`}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Provider Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-3">
            {Object.entries(providerCounts).map(([provider, count]) => (
              <div key={provider} className="rounded-lg border p-3 text-center">
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-muted-foreground capitalize">{provider}</p>
              </div>
            ))}
            {Object.keys(providerCounts).length === 0 && (
              <p className="text-sm text-muted-foreground col-span-3 text-center py-3">No usage data yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
