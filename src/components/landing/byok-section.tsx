import { Card, CardContent } from "@/components/ui/card";
import { Key, DollarSign, Zap, Shield } from "lucide-react";

export function BYOKSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Bring Your Own Key
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Use your own API keys from OpenAI, Anthropic, or Google Gemini.
              Get 5x more scans and save on per-scan costs while keeping our
              proprietary scoring algorithm.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="flex gap-3">
                <Key className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Your Keys, Our Intelligence</p>
                  <p className="text-sm text-muted-foreground">Raw inference on your dime, smart scoring on ours.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <DollarSign className="h-5 w-5 text-trust-high mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Up to 80% Savings</p>
                  <p className="text-sm text-muted-foreground">Pay only $0.001-$0.003 platform fee per scan.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Zap className="h-5 w-5 text-trust-medium mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">5x More Scans</p>
                  <p className="text-sm text-muted-foreground">BYOK plans include 5x the scan limits.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Shield className="h-5 w-5 text-brand mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-sm">Multi-Provider</p>
                  <p className="text-sm text-muted-foreground">Choose OpenAI, Anthropic, or Gemini per scan.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              { name: "OpenAI", desc: "GPT-4o, Whisper, DALL-E detection", color: "bg-green-500/10 text-green-600" },
              { name: "Anthropic", desc: "Claude 3.5 Sonnet, vision analysis", color: "bg-orange-500/10 text-orange-600" },
              { name: "Google Gemini", desc: "Gemini 2.0 Flash, multimodal", color: "bg-blue-500/10 text-blue-600" },
            ].map((provider) => (
              <Card key={provider.name} className="border shadow-sm">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${provider.color}`}>
                    <Key className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold">{provider.name}</p>
                    <p className="text-sm text-muted-foreground">{provider.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
