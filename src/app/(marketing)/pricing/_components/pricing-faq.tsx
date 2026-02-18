import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { createClient } from "@/lib/supabase/server";

export async function PricingFAQ() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("site_content")
    .select("*")
    .eq("section", "pricing_faq")
    .eq("is_active", true)
    .order("sort_order");

  if (!items || items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, i) => (
          <AccordionItem key={item.id} value={`item-${i}`}>
            <AccordionTrigger className="text-left">{item.data.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{item.data.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
