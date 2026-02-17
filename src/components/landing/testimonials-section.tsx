import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Head of Trust & Safety, MediaCorp",
    content: "ProofLayer has become our first line of defense against AI-generated misinformation. The accuracy is remarkable.",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Investigative Journalist",
    content: "The BYOK feature is a game-changer. I use my own keys and the platform fee is minimal. Saved us thousands.",
    rating: 5,
  },
  {
    name: "Dr. Emily Whitfield",
    role: "AI Ethics Researcher",
    content: "Model fingerprinting capability is unique. Being able to identify which AI generated content is invaluable for our research.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Trusted by professionals
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See what our users have to say about ProofLayer AI
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-0 bg-background shadow-sm">
              <CardContent className="pt-6">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-trust-medium text-trust-medium" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">&ldquo;{testimonial.content}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
