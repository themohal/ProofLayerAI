import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function ScansPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: scans } = await supabase
    .from("scans")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Scan History</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">File</th>
                  <th className="pb-3 font-medium">Trust Score</th>
                  <th className="pb-3 font-medium">AI Prob.</th>
                  <th className="pb-3 font-medium">Provider</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {scans?.map((scan) => (
                  <tr key={scan.id} className="border-b last:border-0">
                    <td className="py-3">
                      <Badge variant="outline" className="capitalize">{scan.content_type}</Badge>
                    </td>
                    <td className="py-3">
                      <Link href={`/dashboard/scans/${scan.id}`} className="text-brand hover:underline">
                        {scan.file_name || "Text scan"}
                      </Link>
                    </td>
                    <td className="py-3">
                      <span className={`font-medium ${scan.trust_score >= 70 ? "text-trust-high" : scan.trust_score >= 40 ? "text-trust-medium" : "text-trust-low"}`}>
                        {scan.trust_score}
                      </span>
                    </td>
                    <td className="py-3">{scan.ai_probability}%</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1.5">
                        <span className="capitalize">{scan.provider_used}</span>
                        {scan.is_byok && <Badge variant="secondary" className="text-xs">BYOK</Badge>}
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{new Date(scan.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {(!scans || scans.length === 0) && (
                  <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No scans yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
