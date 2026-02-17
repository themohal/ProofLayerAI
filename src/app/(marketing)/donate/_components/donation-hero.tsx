import { Heart } from "lucide-react";

export function DonationHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand via-blue-600 to-purple-600 py-20 text-white">
      <div className="container mx-auto px-4 text-center">
        <Heart className="mx-auto h-12 w-12 mb-6 opacity-80" />
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Power the Future of AI Trust</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg opacity-90">
          Your contribution helps us provide free AI verification tools to journalists, educators, and researchers worldwide.
        </p>
      </div>
    </section>
  );
}
