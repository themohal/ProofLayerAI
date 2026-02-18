import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { createClient } from "@/lib/supabase/server";

export async function DonationFAQ() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("site_content")
    .select("*")
    .eq("section", "donation_faq")
    .eq("is_active", true)
    .order("sort_order");

  if (!items || items.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-2xl font-bold text-center mb-8">Donation FAQ</h2>
        <Accordion type="single" collapsible>
          {items.map((item, i) => (
            <AccordionItem key={item.id} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{item.data.question}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{item.data.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
