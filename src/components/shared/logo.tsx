import { Shield } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
        <Shield className="h-5 w-5" />
      </div>
      <span className="text-lg font-bold tracking-tight">ProofLayer</span>
    </Link>
  );
}
