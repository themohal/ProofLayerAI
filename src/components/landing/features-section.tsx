import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Fingerprint, BarChart3, Key, Layers, Cpu } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "AI Detection",
    description: "Detect AI-generated content across images, audio, video, and text with state-of-the-art models.",
  },
  {
    icon: Fingerprint,
    title: "Model Fingerprinting",
    description: "Identify which AI model generated the content — GPT-4, DALL-E, Midjourney, Stable Diffusion, and more.",
  },
  {
    icon: BarChart3,
    title: "Trust Scores",
    description: "Get a 0-100 trust score with detailed breakdown of authenticity signals and confidence levels.",
  },
  {
    icon: Key,
    title: "BYOK Support",
    description: "Bring your own API keys from OpenAI, Anthropic, or Google Gemini. Save on inference costs.",
  },
  {
    icon: Layers,
    title: "Multi-Provider",
    description: "Choose from multiple AI providers for analysis. Each provider offers unique detection strengths.",
  },
  {
    icon: Cpu,
    title: "API Access",
    description: "Integrate ProofLayer into your app with our REST API. Verify content programmatically at scale.",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to verify AI content
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Comprehensive AI detection tools for developers, journalists, and enterprises.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-0 bg-background shadow-sm">
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10">
                  <feature.icon className="h-5 w-5 text-brand" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
