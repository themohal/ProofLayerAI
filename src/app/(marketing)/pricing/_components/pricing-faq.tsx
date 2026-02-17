import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is BYOK (Bring Your Own Key)?",
    a: "BYOK lets you use your own API keys from OpenAI, Anthropic, or Google Gemini. You handle the raw AI inference cost, and we charge a small platform fee for our proprietary scoring algorithm, dashboard, and infrastructure.",
  },
  {
    q: "Is there a free trial?",
    a: "Yes! The Starter plan includes a 7-day free trial. You'll need to provide a payment method upfront, but you won't be charged until the trial ends.",
  },
  {
    q: "Can I switch plans?",
    a: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "What happens if I exceed my scan limit?",
    a: "You'll receive a notification when you're approaching your limit. Once reached, scans will be paused until your next billing cycle or until you upgrade your plan.",
  },
  {
    q: "Do you offer annual billing?",
    a: "Yes! Annual billing saves you 2 months compared to monthly billing. That's about a 17% discount.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit and debit cards through our payment provider Paddle. This includes Visa, Mastercard, American Express, and more.",
  },
];

export function PricingFAQ() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
