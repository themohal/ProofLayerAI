import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Fingerprint, Clock, Cpu, AlertTriangle, CheckCircle } from "lucide-react";
import Link from "next/link";

export default async function ScanDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: scan } = await supabase.from("scans").select("*").eq("id", id).eq("user_id", user.id).single();
  if (!scan) notFound();

  const trustLevel = scan.trust_score >= 70 ? "high" : scan.trust_score >= 40 ? "medium" : "low";
  const trustColors = { high: "text-trust-high", medium: "text-trust-medium", low: "text-trust-low" };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard/scans"><ArrowLeft className="h-4 w-4" /></Link>
        </Button>
        <h1 className="text-2xl font-bold">Scan Details</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Trust Score
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className={`text-6xl font-bold ${trustColors[trustLevel]}`}>
              {Math.round(scan.trust_score)}
            </div>
            <div className="flex items-center gap-2">
              {scan.is_ai_generated ? (
                <><AlertTriangle className="h-5 w-5 text-trust-low" /><span className="font-medium">Likely AI-Generated</span></>
              ) : (
                <><CheckCircle className="h-5 w-5 text-trust-high" /><span className="font-medium">Likely Authentic</span></>
              )}
            </div>
            <div className="w-full space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">AI Probability</span><span className="font-medium">{scan.ai_probability}%</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Content Type</span><Badge variant="outline" className="capitalize">{scan.content_type}</Badge></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Provider</span><div className="flex items-center gap-1"><span className="capitalize">{scan.provider_used}</span>{scan.is_byok && <Badge variant="secondary" className="text-xs">BYOK</Badge>}</div></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Processing</span><span>{scan.processing_time_ms}ms</span></div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Analysis Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <Fingerprint className="h-5 w-5 text-brand mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Model Fingerprint</p>
                  <p className="text-sm text-muted-foreground">{scan.model_fingerprint || "Unknown"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-brand mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Manipulation Type</p>
                  <p className="text-sm text-muted-foreground">{scan.manipulation_type || "None detected"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-brand mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Scanned At</p>
                  <p className="text-sm text-muted-foreground">{new Date(scan.created_at).toLocaleString()}</p>
                </div>
              </div>
              {scan.file_name && (
                <div className="flex items-start gap-3">
                  <Cpu className="h-5 w-5 text-brand mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">File</p>
                    <p className="text-sm text-muted-foreground">{scan.file_name} ({scan.file_size ? `${(scan.file_size / 1024).toFixed(1)} KB` : "N/A"})</p>
                  </div>
                </div>
              )}
            </div>
            {scan.detailed_analysis?.reasoning && (
              <>
                <Separator />
                <div>
                  <p className="text-sm font-medium mb-2">Reasoning</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{scan.detailed_analysis.reasoning}</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
