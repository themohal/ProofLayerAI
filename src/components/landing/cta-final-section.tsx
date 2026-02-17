import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

export function CTAFinalSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl rounded-2xl bg-gradient-to-br from-brand to-blue-600 p-12 text-center text-white shadow-xl">
          <Shield className="mx-auto h-12 w-12 mb-6 opacity-80" />
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Ready to verify AI content?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Start your 7-day free trial today. No credit card required to explore.
            Cancel anytime.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild className="gap-2">
              <Link href="/signup">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="link" asChild className="text-white hover:text-white/80">
              <Link href="/docs">View API Docs</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
