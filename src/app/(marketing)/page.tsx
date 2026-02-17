import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { BYOKSection } from "@/components/landing/byok-section";
import { StatsBanner } from "@/components/landing/stats-banner";
import { PricingPreviewSection } from "@/components/landing/pricing-preview-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { CTAFinalSection } from "@/components/landing/cta-final-section";
import { JsonLd } from "@/components/shared/seo-head";
import { APP_NAME, APP_URL } from "@/lib/constants";

export const metadata = {
  title: "ProofLayer AI — The SSL Certificate of the AI Age",
  description: "Verify any AI-generated content — images, audio, video, and text. Get trust scores, model fingerprinting, and manipulation detection through a universal API.",
};

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: APP_NAME,
          applicationCategory: "SecurityApplication",
          operatingSystem: "Web",
          url: APP_URL,
          description: "Universal AI Trust API — verify any AI-generated content with trust scores and model fingerprinting.",
          offers: {
            "@type": "Offer",
            price: "19",
            priceCurrency: "USD",
          },
        }}
      />
      <HeroSection />
      <StatsBanner />
      <FeaturesSection />
      <HowItWorksSection />
      <BYOKSection />
      <PricingPreviewSection />
      <TestimonialsSection />
      <CTAFinalSection />
    </>
  );
}
