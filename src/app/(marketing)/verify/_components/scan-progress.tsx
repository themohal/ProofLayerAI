"use client";

import { useEffect, useState } from "react";
import { Loader2, Shield, Cpu, CheckCircle } from "lucide-react";

const stages = [
  { icon: Shield, label: "Authenticating..." },
  { icon: Cpu, label: "Analyzing content..." },
  { icon: CheckCircle, label: "Computing trust score..." },
];

export function ScanProgress() {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((s) => (s < stages.length - 1 ? s + 1 : s));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <Loader2 className="h-8 w-8 animate-spin text-brand" />
      <div className="space-y-2">
        {stages.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={s.label}
              className={`flex items-center gap-2 text-sm transition-opacity ${
                i <= stage ? "opacity-100" : "opacity-30"
              }`}
            >
              <Icon className={`h-4 w-4 ${i < stage ? "text-trust-high" : i === stage ? "text-brand" : "text-muted-foreground"}`} />
              <span>{s.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
