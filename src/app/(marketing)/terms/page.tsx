import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for ProofLayer AI, operated by Kraken AI.",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
      <p className="text-muted-foreground mb-8">Effective Date: February 18, 2026</p>

      <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Introduction &amp; Acceptance</h2>
          <p>These Terms of Service (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;User,&quot; &quot;you,&quot; or &quot;your&quot;) and <strong className="text-foreground">Kraken AI</strong> (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), operating the ProofLayer AI platform (&quot;Service&quot;) accessible at <a href="https://proof-layer-ai.vercel.app" className="text-brand hover:underline">https://proof-layer-ai.vercel.app</a>.</p>
          <p className="mt-2">By accessing or using the Service, you agree to be bound by these Terms, our Privacy Policy, and any additional guidelines or policies referenced herein. If you do not agree to these Terms, you must discontinue use of the Service immediately.</p>
          <p className="mt-2">You represent that you are at least 18 years of age (or the age of legal majority in your jurisdiction) and have the legal capacity to enter into this agreement. If you are using the Service on behalf of an organization, you represent that you have authority to bind that organization to these Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Service Description</h2>
          <p>ProofLayer AI provides an AI content verification platform that analyzes digital content — including images, audio, video, and text — to determine the likelihood of AI generation or manipulation. The Service includes:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>AI detection and trust scoring across multiple content types</li>
            <li>Model fingerprinting to identify the AI system that generated content</li>
            <li>A web-based interface and REST API for programmatic access</li>
            <li>BYOK (Bring Your Own Key) functionality allowing use of third-party AI provider API keys</li>
            <li>Dashboard for scan history, analytics, and account management</li>
          </ul>
          <p className="mt-2"><strong className="text-foreground">Important Disclaimer:</strong> ProofLayer AI provides probabilistic analysis. Results are not guaranteed to be accurate and should not be used as the sole basis for legal, journalistic, or other consequential decisions. Trust scores represent the confidence level of our algorithms and are subject to the inherent limitations of AI detection technology.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Payments, Billing &amp; Paddle as Merchant of Record</h2>
          <p>All payments for the Service are processed by <strong className="text-foreground">Paddle.com Market Limited</strong> (&quot;Paddle&quot;), which acts as our Merchant of Record. When you make a purchase, you are purchasing from Paddle, which is the authorized reseller of our Service.</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Paddle handles all billing, payment processing, sales tax, VAT, and applicable transaction taxes on our behalf</li>
            <li>Your payment relationship is with Paddle, and their <a href="https://www.paddle.com/legal/terms" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">Terms of Service</a> and <a href="https://www.paddle.com/legal/privacy" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a> apply to all transactions</li>
            <li>Paddle will appear on your bank or credit card statements as the charge descriptor</li>
            <li>For billing inquiries or payment disputes, please contact Paddle directly or reach us at support@prooflayer.ai</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Subscription Plans &amp; Pricing</h2>
          <p>The Service is offered under the following paid subscription tiers:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong className="text-foreground">Starter</strong> — $19/month (includes 7-day free trial)</li>
            <li><strong className="text-foreground">Pro</strong> — $49/month</li>
            <li><strong className="text-foreground">Growth</strong> — $149/month</li>
            <li><strong className="text-foreground">Enterprise</strong> — $499/month</li>
          </ul>
          <p className="mt-2">Subscriptions automatically renew at the end of each billing cycle unless cancelled. You may upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the start of your next billing cycle. Annual billing options are available at a discounted rate.</p>
          <p className="mt-2">We reserve the right to modify pricing with at least 30 days&apos; prior written notice. Existing subscribers will be notified of price changes before their next renewal.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Free Trial</h2>
          <p>The Starter plan includes a 7-day free trial. A valid payment method is required to begin the trial. You will not be charged during the trial period. If you do not cancel before the trial ends, your subscription will automatically begin and you will be charged the applicable subscription fee.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Refund Policy</h2>
          <p>We want you to be satisfied with our Service. All payments are processed by Paddle as the Merchant of Record. Our refund policy aligns with Paddle&apos;s refund policy:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>If you are unsatisfied with the Service for any reason, you may request a refund by contacting us at support@prooflayer.ai or by submitting a request directly through Paddle.</li>
            <li>Refund requests are handled in accordance with <a href="https://www.paddle.com/legal/terms" className="text-brand hover:underline" target="_blank" rel="noopener noreferrer">Paddle&apos;s Terms of Service</a> and their refund policy.</li>
            <li>If you cancel during your free trial period, you will not be charged.</li>
            <li>Refunds are typically processed within 5–10 business days.</li>
          </ul>
          <p className="mt-2">For any billing disputes or refund inquiries, please contact support@prooflayer.ai or reach out to Paddle directly.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">7. BYOK (Bring Your Own Key)</h2>
          <p>The BYOK feature allows you to use your own API keys from third-party AI providers (OpenAI, Anthropic, Google Gemini) with our platform. By using BYOK:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>You are solely responsible for the costs incurred with your third-party AI provider</li>
            <li>You must comply with the terms of service of each third-party provider</li>
            <li>A per-scan platform fee applies as specified in your subscription plan</li>
            <li>Your API keys are encrypted at rest using AES-256-GCM encryption. We do not have access to your plaintext keys</li>
            <li>Kraken AI is not liable for any charges, service disruptions, or issues arising from your use of third-party provider keys</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Content &amp; Data Processing</h2>
          <p>When you submit content for verification:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong className="text-foreground">No Content Storage:</strong> Uploaded content (images, audio, video, text) is processed entirely in-memory and is <strong className="text-foreground">never stored</strong> on our servers, in any database, or in any persistent storage system</li>
            <li><strong className="text-foreground">Metadata Only:</strong> We retain only scan metadata (content hash, file type, trust score, timestamp) for your scan history and analytics. Content hashes are one-way cryptographic hashes that cannot be used to reconstruct original content</li>
            <li><strong className="text-foreground">Ownership:</strong> You retain all rights to your content. We claim no ownership, license, or rights over any content you submit for analysis</li>
            <li>Content is transmitted to the selected AI provider for analysis via their API. The respective provider&apos;s data handling policies apply to that transmission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">9. API Usage &amp; Rate Limits</h2>
          <p>API access is available on Pro, Growth, and Enterprise plans. Each plan includes specific rate limits and monthly scan quotas as described on our pricing page. You agree to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Keep your API keys confidential and secure</li>
            <li>Not share, sell, or transfer your API keys to unauthorized parties</li>
            <li>Accept responsibility for all activity occurring under your API keys</li>
            <li>Not attempt to circumvent rate limits, quotas, or other technical restrictions</li>
          </ul>
          <p className="mt-2">We reserve the right to throttle, suspend, or revoke API access for accounts that exceed their plan limits, engage in abusive behavior, or violate these Terms.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Acceptable Use</h2>
          <p>You agree not to use the Service to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Upload or submit illegal content, including child sexual abuse material (CSAM), content that violates applicable laws, or content that infringes intellectual property rights</li>
            <li>Reverse engineer, decompile, disassemble, or otherwise attempt to derive the source code, algorithms, or proprietary methods of the Service</li>
            <li>Circumvent or attempt to circumvent any usage limits, security measures, or access controls</li>
            <li>Use automated systems (bots, scrapers) to access the Service except through our documented API</li>
            <li>Resell, sublicense, or redistribute the Service without written authorization</li>
            <li>Harass, abuse, or harm others through your use of the Service</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
          </ul>
          <p className="mt-2">Violation of this section may result in immediate suspension or termination of your account without refund.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">11. Intellectual Property</h2>
          <p>The Service, including its algorithms, trust scoring methodology, model fingerprinting technology, user interface, documentation, and all associated intellectual property, is owned by Kraken AI and protected by copyright, trademark, and other intellectual property laws.</p>
          <p className="mt-2">We grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service in accordance with these Terms and your subscription plan. This license does not include the right to modify, distribute, or create derivative works of any part of the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">12. Limitation of Liability</h2>
          <p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT</li>
            <li>KRAKEN AI DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY SECURE</li>
            <li>WE DO NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY TRUST SCORES, DETECTION RESULTS, OR MODEL FINGERPRINTS. AI DETECTION TECHNOLOGY HAS INHERENT LIMITATIONS AND MAY PRODUCE FALSE POSITIVES OR FALSE NEGATIVES</li>
            <li>IN NO EVENT SHALL KRAKEN AI, ITS OFFICERS, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE</li>
            <li>OUR TOTAL AGGREGATE LIABILITY FOR ANY CLAIMS RELATED TO THE SERVICE SHALL NOT EXCEED THE TOTAL FEES PAID BY YOU TO US DURING THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM</li>
          </ul>
          <p className="mt-2">You acknowledge that you are solely responsible for any decisions, actions, or consequences arising from your reliance on the Service&apos;s output.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">13. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless Kraken AI and its officers, directors, employees, agents, licensors, and service providers from and against any and all claims, damages, obligations, losses, liabilities, costs, and expenses (including attorney&apos;s fees) arising from: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any third-party rights, including intellectual property and privacy rights; (d) content you submit through the Service; or (e) your use of BYOK keys and associated third-party services.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">14. Dispute Resolution &amp; Arbitration</h2>
          <p><strong className="text-foreground">Informal Resolution:</strong> Before initiating any formal dispute proceedings, you agree to contact us at support@prooflayer.ai and attempt to resolve the dispute informally for at least thirty (30) days.</p>
          <p className="mt-2"><strong className="text-foreground">Binding Arbitration:</strong> If informal resolution fails, any dispute, controversy, or claim arising out of or relating to these Terms or the breach, termination, or validity thereof shall be settled by binding arbitration administered by the American Arbitration Association (&quot;AAA&quot;) under its Commercial Arbitration Rules. The arbitration shall be conducted in English, and the seat of arbitration shall be Wilmington, Delaware, USA.</p>
          <p className="mt-2"><strong className="text-foreground">Class Action Waiver:</strong> YOU AGREE THAT ANY CLAIMS SHALL BE BROUGHT IN YOUR INDIVIDUAL CAPACITY ONLY AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION. The arbitrator may not consolidate actions or permit class-wide arbitration.</p>
          <p className="mt-2"><strong className="text-foreground">Exceptions:</strong> Nothing in this section prevents either party from seeking injunctive or equitable relief in a court of competent jurisdiction for claims related to intellectual property infringement or unauthorized access to the Service.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">15. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with the laws of the State of Delaware, United States of America, without regard to its conflict of law principles. For any matters not subject to arbitration, you consent to the exclusive jurisdiction of the state and federal courts located in Wilmington, Delaware.</p>
          <p className="mt-2">If you are located in the European Union, you retain any mandatory consumer protection rights afforded to you under the laws of your country of residence. Nothing in these Terms affects your statutory rights as a consumer under applicable local law.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">16. Termination</h2>
          <p>You may terminate your account at any time by cancelling your subscription through the dashboard or by contacting us at support@prooflayer.ai. Upon cancellation, your access will continue until the end of your current billing period.</p>
          <p className="mt-2">We reserve the right to suspend or terminate your account immediately, without prior notice or liability, for any reason, including: (a) violation of these Terms; (b) non-payment; (c) fraudulent or abusive activity; (d) upon request by law enforcement or government agencies.</p>
          <p className="mt-2">Upon termination, your right to use the Service ceases immediately. We may retain anonymized, aggregated usage data for analytics purposes, but all personally identifiable data will be handled in accordance with our Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">17. Donations</h2>
          <p>Donations made through the Service are voluntary contributions used exclusively to maintain and operate ProofLayer AI, including server infrastructure costs, third-party API costs, and ongoing platform maintenance. Donations:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Are processed by Paddle as the Merchant of Record</li>
            <li>Are subject to Paddle&apos;s standard refund policy</li>
            <li>Are used solely to cover operational and infrastructure costs of the Service</li>
            <li>Do not grant access to paid features or additional Service capabilities</li>
            <li>May be displayed on our public donor wall (display name only) unless you opt out</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">18. Privacy</h2>
          <p>Your use of the Service is also governed by our <a href="/privacy" className="text-brand hover:underline">Privacy Policy</a>, which describes how we collect, use, and protect your personal information. By using the Service, you consent to the data practices described in our Privacy Policy.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">19. Force Majeure</h2>
          <p>Kraken AI shall not be liable for any failure or delay in performing its obligations under these Terms due to circumstances beyond its reasonable control, including but not limited to: acts of God, natural disasters, pandemics, war, terrorism, riots, government restrictions, power failures, internet or telecommunications failures, cyberattacks, or failures of third-party service providers.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">20. Modifications to Terms</h2>
          <p>We reserve the right to modify these Terms at any time. Material changes will be communicated via email or a prominent notice on the Service at least thirty (30) days before they take effect. Your continued use of the Service after the effective date of revised Terms constitutes acceptance of the changes. If you do not agree to the revised Terms, you must stop using the Service and cancel your subscription.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">21. Severability &amp; Entire Agreement</h2>
          <p>If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect. These Terms, together with our Privacy Policy and any other policies referenced herein, constitute the entire agreement between you and Kraken AI regarding the Service and supersede any prior agreements or understandings.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">22. Waiver</h2>
          <p>No waiver of any term or condition shall be deemed a further or continuing waiver of such term or any other term. Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">23. Assignment</h2>
          <p>You may not assign or transfer your rights or obligations under these Terms without our prior written consent. We may assign our rights and obligations without restriction.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">24. Contact Information</h2>
          <p>For questions about these Terms or the Service, please contact:</p>
          <p className="mt-2"><strong className="text-foreground">Kraken AI</strong><br />Email: support@prooflayer.ai<br />Website: <a href="https://proof-layer-ai.vercel.app" className="text-brand hover:underline">https://proof-layer-ai.vercel.app</a></p>
        </section>
      </div>
    </div>
  );
}
