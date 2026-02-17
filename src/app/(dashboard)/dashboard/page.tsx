import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScanLine, Shield, Key, TrendingUp } from "lucide-react";
import Link from "next/link";
import { PLANS, type PlanType } from "@/lib/constants";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
  const { count: totalScans } = await supabase.from("scans").select("*", { count: "exact", head: true }).eq("user_id", user.id);
  const { data: recentScans } = await supabase.from("scans").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5);
  const { count: apiKeyCount } = await supabase.from("api_keys").select("*", { count: "exact", head: true }).eq("user_id", user.id);

  const plan = PLANS[(profile?.plan || "starter") as PlanType];
  const scanUsage = profile ? Math.round((profile.current_month_scans / profile.monthly_scan_limit) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/verify">New Scan</Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
            <ScanLine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalScans || 0}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Monthly Usage</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{profile?.current_month_scans || 0} / {profile?.monthly_scan_limit || 500}</div>
            <div className="mt-2 h-2 rounded-full bg-muted">
              <div className="h-full rounded-full bg-brand" style={{ width: `${Math.min(scanUsage, 100)}%` }} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">API Keys</CardTitle>
            <Key className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apiKeyCount || 0}</div>
            <p className="text-xs text-muted-foreground">Active keys</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{plan.name}</div>
            <p className="text-xs text-muted-foreground">${plan.price}/mo</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          {recentScans && recentScans.length > 0 ? (
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <Link key={scan.id} href={`/dashboard/scans/${scan.id}`} className="flex items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="capitalize">{scan.content_type}</Badge>
                    <span className="text-sm">{scan.file_name || "Text scan"}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-medium ${scan.trust_score >= 70 ? "text-trust-high" : scan.trust_score >= 40 ? "text-trust-medium" : "text-trust-low"}`}>
                      {scan.trust_score}
                    </span>
                    {scan.is_byok && <Badge variant="secondary" className="text-xs">BYOK</Badge>}
                    <span className="text-xs text-muted-foreground">{new Date(scan.created_at).toLocaleDateString()}</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-4 text-center">No scans yet. Start by verifying some content.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
