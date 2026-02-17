"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, FileAudio, FileVideo, FileText } from "lucide-react";
import { UploadZone } from "./upload-zone";
import { TextInputZone } from "./text-input-zone";
import { ProviderSelector } from "./provider-selector";
import { ScanResultCard } from "./scan-result-card";
import type { VerifyResponse } from "@/lib/ai-providers/types";

export function ContentTypeTabs() {
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [provider, setProvider] = useState<string>("auto");

  return (
    <div className="space-y-6">
      <ProviderSelector value={provider} onChange={setProvider} />
      <Tabs defaultValue="image" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="image" className="gap-1.5">
            <Image className="h-4 w-4" />
            <span className="hidden sm:inline">Image</span>
          </TabsTrigger>
          <TabsTrigger value="audio" className="gap-1.5">
            <FileAudio className="h-4 w-4" />
            <span className="hidden sm:inline">Audio</span>
          </TabsTrigger>
          <TabsTrigger value="video" className="gap-1.5">
            <FileVideo className="h-4 w-4" />
            <span className="hidden sm:inline">Video</span>
          </TabsTrigger>
          <TabsTrigger value="text" className="gap-1.5">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Text</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="image">
          <UploadZone contentType="image" accept="image/*" provider={provider} onResult={setResult} />
        </TabsContent>
        <TabsContent value="audio">
          <UploadZone contentType="audio" accept="audio/*" provider={provider} onResult={setResult} />
        </TabsContent>
        <TabsContent value="video">
          <UploadZone contentType="video" accept="video/*" provider={provider} onResult={setResult} />
        </TabsContent>
        <TabsContent value="text">
          <TextInputZone provider={provider} onResult={setResult} />
        </TabsContent>
      </Tabs>
      {result && <ScanResultCard result={result} />}
    </div>
  );
}
