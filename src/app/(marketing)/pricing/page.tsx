import { Metadata } from "next";
import { PricingCards } from "./_components/pricing-cards";
import { PricingComparison } from "./_components/pricing-comparison";
import { PricingFAQ } from "./_components/pricing-faq";
import { JsonLd } from "@/components/shared/seo-head";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for AI content verification. All plans include BYOK support and a 7-day free trial.",
};

export default function PricingPage() {
  return (
    <div className="py-16">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        { "@type": "Question", name: "What is BYOK?", acceptedAnswer: { "@type": "Answer", text: "Bring Your Own Key lets you use your own AI provider API keys while leveraging our scoring platform." }},
        { "@type": "Question", name: "Is there a free trial?", acceptedAnswer: { "@type": "Answer", text: "Yes, the Starter plan includes a 7-day free trial with payment method required upfront." }},
      ]}} />
      <div className="container mx-auto px-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Simple, transparent pricing</h1>
        <p className="mt-4 text-lg text-muted-foreground">All plans include BYOK support. Start with a 7-day free trial.</p>
      </div>
      <PricingCards />
      <PricingComparison />
      <PricingFAQ />
    </div>
  );
}
