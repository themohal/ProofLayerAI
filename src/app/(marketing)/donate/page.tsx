import { Metadata } from "next";
import { DonationHero } from "./_components/donation-hero";
import { ImpactStats } from "./_components/impact-stats";
import { DonationForm } from "./_components/donation-form";
import { FundingProgressBar } from "./_components/funding-progress-bar";
import { DonorWall } from "./_components/donor-wall";
import { DonationFAQ } from "./_components/donation-faq";
import { JsonLd } from "@/components/shared/seo-head";

export const metadata: Metadata = {
  title: "Donate",
  description: "Support ProofLayer AI and help fund free AI verification for journalists, educators, and researchers.",
};

export default function DonatePage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
        { "@type": "Question", name: "How are donations used?", acceptedAnswer: { "@type": "Answer", text: "Donations fund free verifications for journalists, server costs, and platform development." }},
      ]}} />
      <DonationHero />
      <ImpactStats />
      <DonationForm />
      <FundingProgressBar />
      <DonorWall />
      <DonationFAQ />
    </>
  );
}
