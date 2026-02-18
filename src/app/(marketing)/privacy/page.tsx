import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for ProofLayer AI, operated by Kraken AI.",
};

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-muted-foreground mb-8">Effective Date: February 18, 2026</p>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction</h2>
          <p><strong className="text-foreground">Kraken AI</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates ProofLayer AI at <a href="https://proof-layer-ai.vercel.app" className="text-brand hover:underline">https://proof-layer-ai.vercel.app</a>. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service. By using ProofLayer AI, you consent to the data practices described in this policy.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Information We Collect</h2>
          <h3 className="text-base font-semibold text-foreground mt-4 mb-2">2.1 Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Email address</li>
            <li>Full name (if provided)</li>
            <li>Profile avatar (if using OAuth)</li>
            <li>Authentication provider data (Google, GitHub)</li>
          </ul>

          <h3 className="text-base font-semibold text-foreground mt-4 mb-2">2.2 Scan Metadata</h3>
          <p>When you use the verification service, we store:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Content type (image, audio, video, text)</li>
            <li>One-way cryptographic hash (SHA-256) of the content</li>
            <li>Trust score and analysis results</li>
            <li>AI provider used and model identified</li>
            <li>Timestamp of the scan</li>
          </ul>
          <p className="mt-2"><strong className="text-foreground">We do NOT store your actual content.</strong> All uploaded files and text are processed entirely in-memory and are discarded immediately after analysis. We never save images, audio, video, or text content to any database or file storage system.</p>

          <h3 className="text-base font-semibold text-foreground mt-4 mb-2">2.3 Usage Data</h3>
          <p>We automatically collect:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>API usage logs (endpoint, timestamp, response status)</li>
            <li>Scan counts and quota usage</li>
            <li>Feature usage patterns (aggregated)</li>
          </ul>

          <h3 className="text-base font-semibold text-foreground mt-4 mb-2">2.4 Payment Information</h3>
          <p>Payment processing is handled entirely by Paddle.com Market Limited (our Merchant of Record). We do <strong className="text-foreground">not</strong> collect, store, or have access to your credit card numbers, bank account details, or other payment instrument data. Paddle provides us with:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Paddle customer ID</li>
            <li>Subscription status and plan type</li>
            <li>Transaction history (amounts, dates)</li>
          </ul>

          <h3 className="text-base font-semibold text-foreground mt-4 mb-2">2.5 BYOK API Keys</h3>
          <p>If you use the BYOK feature, your third-party API keys are encrypted using AES-256-GCM encryption before storage. We cannot access or view your plaintext API keys. Keys are decrypted only in-memory during request processing and are never logged.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>To provide, maintain, and improve the Service</li>
            <li>To process your transactions and manage your subscription</li>
            <li>To display your scan history and usage analytics in your dashboard</li>
            <li>To enforce rate limits and plan quotas</li>
            <li>To communicate with you about your account, service updates, and security alerts</li>
            <li>To detect, prevent, and address fraud, abuse, and technical issues</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p className="mt-2">We do <strong className="text-foreground">not</strong> sell, rent, or trade your personal information to third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Third-Party Services</h2>
          <p>We use the following third-party services to operate ProofLayer AI:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong className="text-foreground">Supabase:</strong> Authentication and database hosting. Your account data and scan metadata are stored in Supabase&apos;s infrastructure with row-level security policies.</li>
            <li><strong className="text-foreground">Paddle:</strong> Payment processing, billing, and tax handling as our Merchant of Record.</li>
            <li><strong className="text-foreground">Vercel:</strong> Application hosting and CDN.</li>
            <li><strong className="text-foreground">AI Providers (OpenAI, Anthropic, Google):</strong> Content is sent to these providers for analysis when you initiate a scan. Their respective privacy policies apply to data transmitted to their APIs. When using BYOK, data is sent under your own API key and account.</li>
          </ul>
          <p className="mt-2">Each third-party provider has their own privacy practices. We encourage you to review their respective privacy policies.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Cookies &amp; Tracking</h2>
          <p>We use essential cookies for:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong className="text-foreground">Authentication:</strong> Session cookies to keep you signed in</li>
            <li><strong className="text-foreground">Preferences:</strong> Theme preference (light/dark mode)</li>
          </ul>
          <p className="mt-2">We do not use third-party tracking cookies, advertising pixels, or analytics services that track individual users across websites. We do not participate in cross-site tracking or targeted advertising.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Retention</h2>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong className="text-foreground">Account data:</strong> Retained for the duration of your account. Deleted within 30 days of account deletion request.</li>
            <li><strong className="text-foreground">Scan metadata:</strong> Retained for the duration of your account for your scan history feature.</li>
            <li><strong className="text-foreground">Usage logs:</strong> Retained for up to 90 days for operational purposes, then aggregated and anonymized.</li>
            <li><strong className="text-foreground">Uploaded content:</strong> Not retained. Processed in-memory only and discarded immediately.</li>
            <li><strong className="text-foreground">BYOK API keys:</strong> Deleted immediately upon your request or account deletion.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Your Rights (GDPR)</h2>
          <p>If you are located in the European Economic Area (EEA), United Kingdom, or Switzerland, you have the following rights under the General Data Protection Regulation (GDPR):</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong className="text-foreground">Right of Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong className="text-foreground">Right to Rectification:</strong> Request correction of inaccurate personal data</li>
            <li><strong className="text-foreground">Right to Erasure:</strong> Request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
            <li><strong className="text-foreground">Right to Data Portability:</strong> Request a machine-readable copy of your data</li>
            <li><strong className="text-foreground">Right to Restrict Processing:</strong> Request limitation of how we process your data</li>
            <li><strong className="text-foreground">Right to Object:</strong> Object to processing of your personal data</li>
            <li><strong className="text-foreground">Right to Withdraw Consent:</strong> Withdraw previously given consent at any time</li>
          </ul>
          <p className="mt-2">To exercise any of these rights, contact us at support@prooflayer.ai. We will respond within 30 days.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Your Rights (CCPA)</h2>
          <p>If you are a California resident, the California Consumer Privacy Act (CCPA) provides you with the following rights:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>The right to know what personal information is collected, used, shared, or sold</li>
            <li>The right to delete personal information held by businesses</li>
            <li>The right to opt out of the sale of personal information</li>
            <li>The right to non-discrimination for exercising your CCPA rights</li>
          </ul>
          <p className="mt-2">We do not sell personal information. To exercise your rights, contact support@prooflayer.ai.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Data Security</h2>
          <p>We implement appropriate technical and organizational measures to protect your personal data, including:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Encryption in transit (TLS/HTTPS) and at rest</li>
            <li>AES-256-GCM encryption for sensitive data (BYOK keys)</li>
            <li>Row-level security (RLS) policies on all database tables</li>
            <li>Regular security audits and monitoring</li>
            <li>Principle of least privilege for internal access</li>
          </ul>
          <p className="mt-2">While we strive to protect your data, no method of electronic transmission or storage is 100% secure. We cannot guarantee absolute security.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">10. International Data Transfers</h2>
          <p>Your data may be transferred to and processed in countries other than your country of residence, including the United States. These countries may have data protection laws that differ from your jurisdiction. By using our Service, you consent to such transfers. Where required by law, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) approved by the European Commission.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">11. Children&apos;s Privacy</h2>
          <p>The Service is not intended for individuals under the age of 13 (or 16 in the EEA). We do not knowingly collect personal information from children. If we become aware that we have collected personal data from a child without parental consent, we will take steps to delete that information promptly. If you believe we have collected data from a child, please contact us at support@prooflayer.ai.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">12. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Material changes will be communicated via email or a prominent notice on the Service at least 30 days before they take effect. The &quot;Effective Date&quot; at the top of this page indicates when the policy was last revised. Your continued use of the Service after changes take effect constitutes acceptance of the updated policy.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">13. Contact</h2>
          <p>For questions, concerns, or requests related to this Privacy Policy or your personal data, contact:</p>
          <p className="mt-2"><strong className="text-foreground">Kraken AI</strong><br />Email: support@prooflayer.ai<br />Website: <a href="https://proof-layer-ai.vercel.app" className="text-brand hover:underline">https://proof-layer-ai.vercel.app</a></p>
        </section>
      </div>
    </div>
  );
}
