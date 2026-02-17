"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/providers/toast-provider";
import type { VerifyResponse } from "@/lib/ai-providers/types";

interface TextInputZoneProps {
  provider: string;
  onResult: (result: VerifyResponse) => void;
}

export function TextInputZone({ provider, onResult }: TextInputZoneProps) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { addToast } = useToast();

  const handleScan = async () => {
    if (!text.trim()) return;

    if (!user) {
      addToast({ title: "Sign in required", description: "Create an account to start scanning.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType: "text",
          content: text,
          provider: provider === "auto" ? undefined : provider,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Scan failed");
      }

      const result = await res.json();
      onResult(result);
    } catch (err) {
      addToast({ title: "Scan failed", description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <Textarea
          placeholder="Paste text here to check if it was written by AI..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={8}
          className="resize-none"
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{text.length} characters</p>
          <Button onClick={handleScan} disabled={!text.trim() || loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Scan Text"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
