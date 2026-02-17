import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, ArrowRight, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand/10 via-background to-background" />
      <div className="container mx-auto px-4 text-center">
        <Badge variant="secondary" className="mb-6 gap-1.5">
          <Sparkles className="h-3 w-3" />
          The SSL Certificate of the AI Age
        </Badge>
        <h1 className="mx-auto max-w-4xl text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
          Verify Any Content.{" "}
          <span className="bg-gradient-to-r from-brand to-blue-400 bg-clip-text text-transparent">
            Trust Every Source.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          ProofLayer AI detects AI-generated images, audio, video, and text with
          industry-leading accuracy. Get trust scores, model fingerprinting, and
          manipulation detection through a single API.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" asChild className="gap-2">
            <Link href="/signup">
              Start 7-Day Free Trial
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/verify">Try a Scan</Link>
          </Button>
        </div>
        <div className="mx-auto mt-16 flex max-w-lg items-center justify-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-trust-high" />
            <span>99.2% Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand" />
            <span>Multi-Provider</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-brand" />
            <span>BYOK Support</span>
          </div>
        </div>
      </div>
    </section>
  );
}
