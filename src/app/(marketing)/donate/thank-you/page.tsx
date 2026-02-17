"use client";

import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Share2, Home } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Suspense } from "react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";
  const name = searchParams.get("name") || "Friend";
  const hasConfetti = useRef(false);

  useEffect(() => {
    if (!hasConfetti.current) {
      hasConfetti.current = true;
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  }, []);

  const freeVerifications = Math.round(parseFloat(amount) * 200);

  const shareText = encodeURIComponent(`I just donated $${amount} to @ProofLayerAI to support free AI content verification! 🛡️`);

  return (
    <div className="container mx-auto px-4 py-20 text-center">
      <Card className="mx-auto max-w-lg">
        <CardContent className="pt-8 pb-8 space-y-6">
          <Heart className="mx-auto h-16 w-16 text-brand" />
          <h1 className="text-3xl font-bold">Thank you, {decodeURIComponent(name)}!</h1>
          <p className="text-muted-foreground">
            Your ${amount} donation funds approximately <strong>{freeVerifications.toLocaleString()}</strong> free verifications
            for journalists and educators.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button variant="outline" asChild className="gap-2">
              <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer">
                <Share2 className="h-4 w-4" />Share on Twitter
              </a>
            </Button>
            <Button asChild className="gap-2">
              <Link href="/verify"><Home className="h-4 w-4" />Try a Scan</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-20 text-center">Loading...</div>}>
      <ThankYouContent />
    </Suspense>
  );
}
