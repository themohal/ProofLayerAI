import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Key, Shield, Zap, Code, Settings } from "lucide-react";

export const metadata: Metadata = {
  title: "API Documentation",
  description: "Complete API documentation for ProofLayer AI. Learn how to integrate AI content verification into your applications.",
};

const sections = [
  { href: "/docs#getting-started", icon: BookOpen, title: "Getting Started", desc: "Quick start guide for the ProofLayer API" },
  { href: "/docs#authentication", icon: Key, title: "Authentication", desc: "API key management and auth methods" },
  { href: "/docs#verify-endpoint", icon: Shield, title: "Verify Endpoint", desc: "Core endpoint for content verification" },
  { href: "/docs#response-format", icon: Code, title: "Response Format", desc: "Understanding trust scores and analysis" },
  { href: "/docs#rate-limits", icon: Zap, title: "Rate Limits", desc: "Plan-based rate limits and quotas" },
  { href: "/docs#byok-setup", icon: Settings, title: "BYOK Setup", desc: "Configure your own AI provider keys" },
];

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <Badge variant="secondary" className="mb-4">Documentation</Badge>
        <h1 className="text-4xl font-bold tracking-tight">API Documentation</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Everything you need to integrate ProofLayer AI into your application.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-16">
        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full transition-colors hover:border-brand">
              <CardHeader>
                <section.icon className="h-8 w-8 text-brand mb-2" />
                <CardTitle className="text-lg">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{section.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Getting Started */}
      <section id="getting-started" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">Getting Started</h2>
        <p className="text-muted-foreground mb-4">
          ProofLayer AI provides a REST API for verifying AI-generated content. Here&apos;s a quick example:
        </p>
        <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
          <pre>{`curl -X POST https://api.prooflayer.ai/api/verify \\
  -H "Authorization: Bearer pl_live_your_api_key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "contentType": "text",
    "content": "Text to analyze for AI generation..."
  }'`}</pre>
        </div>
        <p className="text-muted-foreground mt-4">
          The API returns a trust score (0-100), AI probability, model fingerprint, and detailed analysis.
        </p>
      </section>

      {/* Authentication */}
      <section id="authentication" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">Authentication</h2>
        <p className="text-muted-foreground mb-4">
          All API requests require authentication via an API key in the Authorization header:
        </p>
        <div className="rounded-lg bg-muted p-4 font-mono text-sm">
          <pre>{`Authorization: Bearer pl_live_your_api_key`}</pre>
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Creating API Keys</h3>
        <p className="text-muted-foreground">
          Generate API keys from your <Link href="/dashboard/api-keys" className="text-brand hover:underline">Dashboard &rarr; API Keys</Link> page.
          Keys are prefixed with <code className="bg-muted px-1 rounded">pl_live_</code> for production
          and <code className="bg-muted px-1 rounded">pl_test_</code> for sandbox.
        </p>
      </section>

      {/* Verify Endpoint */}
      <section id="verify-endpoint" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">Verify Endpoint</h2>
        <div className="flex items-center gap-2 mb-4">
          <Badge>POST</Badge>
          <code className="text-sm">/api/verify</code>
        </div>
        <h3 className="text-lg font-semibold mb-2">Request Body</h3>
        <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
          <pre>{`{
  "contentType": "image" | "audio" | "video" | "text",
  "content": "base64_encoded_file_or_raw_text",
  "mimeType": "image/jpeg",           // required for files
  "provider": "openai" | "anthropic" | "gemini",  // optional
  "fileName": "photo.jpg",            // optional
  "fileSize": 1024000                  // optional, bytes
}`}</pre>
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Headers</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="py-2 text-left">Header</th><th className="py-2 text-left">Required</th><th className="py-2 text-left">Description</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="py-2 font-mono">Authorization</td><td>Yes</td><td>Bearer token (API key or session)</td></tr>
              <tr className="border-b"><td className="py-2 font-mono">Content-Type</td><td>Yes</td><td>application/json</td></tr>
              <tr><td className="py-2 font-mono">X-Provider</td><td>No</td><td>Override AI provider selection</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Response Format */}
      <section id="response-format" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">Response Format</h2>
        <div className="rounded-lg bg-muted p-4 font-mono text-sm overflow-x-auto">
          <pre>{`{
  "id": "scan_uuid",
  "trustScore": 85.5,           // 0-100, higher = more authentic
  "aiProbability": 14.5,        // 0-100, probability of AI generation
  "isAiGenerated": false,       // boolean threshold at 70%
  "confidence": 92,             // 0-100, model confidence
  "modelFingerprint": null,     // e.g., "GPT-4", "DALL-E 3"
  "manipulationType": null,     // e.g., "full_generation", "face_swap"
  "detailedAnalysis": {
    "reasoning": "Detailed explanation...",
    "textualPatterns": ["signal1", "signal2"]
  },
  "provider": "openai",
  "isByok": false,
  "processingTimeMs": 1250,
  "contentType": "text",
  "createdAt": "2026-01-15T10:30:00Z"
}`}</pre>
        </div>
      </section>

      {/* Rate Limits */}
      <section id="rate-limits" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">Rate Limits</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b"><th className="py-2 text-left">Plan</th><th className="py-2 text-left">Requests/min</th><th className="py-2 text-left">Scans/month</th><th className="py-2 text-left">BYOK Scans/month</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="py-2">Starter</td><td>20</td><td>500</td><td>2,500</td></tr>
              <tr className="border-b"><td className="py-2">Pro</td><td>100</td><td>5,000</td><td>25,000</td></tr>
              <tr className="border-b"><td className="py-2">Growth</td><td>500</td><td>50,000</td><td>250,000</td></tr>
              <tr><td className="py-2">Enterprise</td><td>2,000</td><td>500,000</td><td>Unlimited</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-muted-foreground mt-4">
          Rate-limited responses return <code className="bg-muted px-1 rounded">429 Too Many Requests</code> with a <code className="bg-muted px-1 rounded">Retry-After</code> header.
        </p>
      </section>

      {/* BYOK Setup */}
      <section id="byok-setup" className="mb-16 scroll-mt-20">
        <h2 className="text-2xl font-bold mb-4">BYOK Setup</h2>
        <p className="text-muted-foreground mb-4">
          Bring Your Own Key (BYOK) lets you use your own API keys from OpenAI, Anthropic, or Google Gemini.
        </p>
        <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
          <li>Go to <Link href="/dashboard/providers" className="text-brand hover:underline">Dashboard &rarr; BYOK Providers</Link></li>
          <li>Click &quot;Add Provider Key&quot; and select your provider</li>
          <li>Enter your API key (encrypted at rest with AES-256-GCM)</li>
          <li>Test the key to verify it works</li>
          <li>Use the <code className="bg-muted px-1 rounded">X-Provider</code> header or <code className="bg-muted px-1 rounded">provider</code> body param to select your provider</li>
        </ol>
        <p className="text-muted-foreground mt-4">
          BYOK scans charge only the platform fee (${`$0.001-$0.003`}/scan) instead of counting against your platform scan quota.
        </p>
      </section>
    </div>
  );
}
