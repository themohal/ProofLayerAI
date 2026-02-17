"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, X } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { useToast } from "@/providers/toast-provider";
import type { VerifyResponse } from "@/lib/ai-providers/types";

interface UploadZoneProps {
  contentType: string;
  accept: string;
  provider: string;
  onResult: (result: VerifyResponse) => void;
}

export function UploadZone({ contentType, accept, provider, onResult }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const { user } = useUser();
  const { addToast } = useToast();

  const handleFile = useCallback((f: File) => {
    setFile(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleScan = async () => {
    if (!file) return;

    if (!user) {
      addToast({ title: "Sign in required", description: "Create an account to start scanning.", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const buffer = await file.arrayBuffer();
      const base64 = Buffer.from(buffer).toString("base64");

      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentType,
          content: base64,
          mimeType: file.type,
          provider: provider === "auto" ? undefined : provider,
          fileName: file.name,
          fileSize: file.size,
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
      <CardContent className="pt-6">
        <div
          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 transition-colors ${
            dragOver ? "border-brand bg-brand/5" : "border-muted-foreground/25"
          }`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">{file.name}</p>
              <span className="text-xs text-muted-foreground">
                ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </span>
              <Button variant="ghost" size="icon" onClick={() => setFile(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Upload className="h-10 w-10 text-muted-foreground mb-4" />
              <p className="text-sm font-medium">Drag & drop your {contentType} file here</p>
              <p className="text-xs text-muted-foreground mt-1">or click to browse</p>
              <input
                type="file"
                accept={accept}
                className="absolute inset-0 cursor-pointer opacity-0"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </>
          )}
        </div>
        <Button className="w-full mt-4" onClick={handleScan} disabled={!file || loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            "Scan Content"
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
