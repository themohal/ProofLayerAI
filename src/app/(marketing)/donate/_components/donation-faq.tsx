import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How are donations used?", a: "Donations fund free verifications for journalists and educators, cover infrastructure costs, and support platform development." },
  { q: "Can I cancel my monthly donation?", a: "Yes, you can cancel your monthly donation at any time through the link in your receipt email." },
  { q: "Is my payment secure?", a: "All payments are processed securely through Paddle, a trusted payment provider. We never store your card details." },
  { q: "Will I get a receipt?", a: "Yes, you'll receive an email receipt from Paddle for every donation transaction." },
];

export function DonationFAQ() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-8">Donation FAQ</h2>
        <Accordion type="single" collapsible>
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
