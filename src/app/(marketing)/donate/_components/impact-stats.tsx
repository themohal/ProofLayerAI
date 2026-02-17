import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, Globe, Server, Building } from "lucide-react";

const impacts = [
  { icon: Globe, amount: "$5", impact: "1,000 free verifications" },
  { icon: Newspaper, amount: "$25", impact: "1 week API for a journalist" },
  { icon: Server, amount: "$100", impact: "1 month server costs" },
  { icon: Building, amount: "$500", impact: "Sponsor a newsroom" },
];

export function ImpactStats() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Your Impact</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
          {impacts.map((item) => (
            <Card key={item.amount} className="text-center">
              <CardContent className="pt-6">
                <item.icon className="mx-auto h-8 w-8 text-brand mb-3" />
                <p className="text-2xl font-bold text-brand">{item.amount}</p>
                <p className="text-sm text-muted-foreground mt-1">{item.impact}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
