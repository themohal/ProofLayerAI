"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Fingerprint, Clock, Cpu, AlertTriangle, CheckCircle } from "lucide-react";
import { TrustScoreGauge } from "./trust-score-gauge";
import type { VerifyResponse } from "@/lib/ai-providers/types";

export function ScanResultCard({ result }: { result: VerifyResponse }) {
  const trustLevel = result.trustScore >= 70 ? "high" : result.trustScore >= 40 ? "medium" : "low";
  const trustColors = {
    high: "text-trust-high",
    medium: "text-trust-medium",
    low: "text-trust-low",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Scan Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-around">
          <TrustScoreGauge score={result.trustScore} />
          <div className="space-y-2 text-center sm:text-left">
            <div className="flex items-center gap-2">
              {result.isAiGenerated ? (
                <AlertTriangle className="h-5 w-5 text-trust-low" />
              ) : (
                <CheckCircle className="h-5 w-5 text-trust-high" />
              )}
              <span className="text-lg font-semibold">
                {result.isAiGenerated ? "Likely AI-Generated" : "Likely Authentic"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI Probability: <span className={`font-medium ${trustColors[trustLevel]}`}>{result.aiProbability}%</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Confidence: <span className="font-medium">{result.confidence}%</span>
            </p>
          </div>
        </div>

        <Separator />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <Fingerprint className="h-5 w-5 text-brand mt-0.5" />
            <div>
              <p className="text-sm font-medium">Model Fingerprint</p>
              <p className="text-sm text-muted-foreground">
                {result.modelFingerprint || "Unknown"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-brand mt-0.5" />
            <div>
              <p className="text-sm font-medium">Manipulation Type</p>
              <p className="text-sm text-muted-foreground">
                {result.manipulationType || "None detected"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Cpu className="h-5 w-5 text-brand mt-0.5" />
            <div>
              <p className="text-sm font-medium">Provider</p>
              <div className="flex items-center gap-1.5">
                <span className="text-sm text-muted-foreground capitalize">{result.provider}</span>
                {result.isByok && <Badge variant="secondary" className="text-xs">BYOK</Badge>}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-brand mt-0.5" />
            <div>
              <p className="text-sm font-medium">Processing Time</p>
              <p className="text-sm text-muted-foreground">{result.processingTimeMs}ms</p>
            </div>
          </div>
        </div>

        {result.detailedAnalysis?.reasoning && (
          <>
            <Separator />
            <div>
              <p className="text-sm font-medium mb-2">Analysis Details</p>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {result.detailedAnalysis.reasoning}
              </p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
