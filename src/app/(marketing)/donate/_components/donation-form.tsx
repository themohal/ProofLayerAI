"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { getPaddle } from "@/lib/paddle/client";
import { useToast } from "@/providers/toast-provider";

const presets = [5, 10, 25, 50, 100];

export function DonationForm() {
  const [frequency, setFrequency] = useState<"one_time" | "monthly">("one_time");
  const [amount, setAmount] = useState(25);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showOnWall, setShowOnWall] = useState(true);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const effectiveAmount = customAmount ? parseFloat(customAmount) : amount;

  const handleDonate = async () => {
    if (!effectiveAmount || effectiveAmount < 1) {
      addToast({ title: "Minimum donation is $1", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const paddle = await getPaddle();
      paddle.Checkout.open({
        items: [{ priceId: process.env.NEXT_PUBLIC_PADDLE_DONATION_PRICE_ID || "pri_donation", quantity: 1 }],
        settings: {
          successUrl: `${window.location.origin}/donate/thank-you?amount=${effectiveAmount}&name=${encodeURIComponent(name || "Friend")}`,
        },
        customData: {
          type: "donation",
          amount: effectiveAmount,
          frequency,
          donor_name: isAnonymous ? "Anonymous" : name,
          donor_email: email,
          message,
          show_on_wall: showOnWall,
          is_anonymous: isAnonymous,
        },
      });
    } catch (error) {
      console.error("Donation checkout error:", error);
      addToast({ title: "Failed to open checkout", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Make a Donation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Frequency toggle */}
            <div className="grid grid-cols-2 gap-2">
              <Button variant={frequency === "one_time" ? "default" : "outline"} onClick={() => setFrequency("one_time")} className="w-full">One-Time</Button>
              <Button variant={frequency === "monthly" ? "default" : "outline"} onClick={() => setFrequency("monthly")} className="w-full">Monthly</Button>
            </div>

            {/* Preset amounts */}
            <div className="grid grid-cols-5 gap-2">
              {presets.map((p) => (
                <Button key={p} variant={amount === p && !customAmount ? "default" : "outline"} onClick={() => { setAmount(p); setCustomAmount(""); }} className="w-full">${p}</Button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input type="number" min="1" placeholder="Custom amount" value={customAmount} onChange={(e) => setCustomAmount(e.target.value)} className="pl-7" />
            </div>

            {/* Name & Email */}
            <div className="space-y-3">
              <div className="space-y-1">
                <Label>Name (optional)</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
              </div>
              <div className="space-y-1">
                <Label>Email (for receipt)</Label>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
              </div>
              <div className="space-y-1">
                <Label>Message (optional)</Label>
                <Input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Leave a message..." maxLength={500} />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Checkbox id="wall" checked={showOnWall} onCheckedChange={(v) => setShowOnWall(v as boolean)} />
                <Label htmlFor="wall" className="text-sm">Show on donor wall</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="anon" checked={isAnonymous} onCheckedChange={(v) => setIsAnonymous(v as boolean)} />
                <Label htmlFor="anon" className="text-sm">Make anonymous</Label>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleDonate} disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Donate ${effectiveAmount || 0} {frequency === "monthly" ? "Monthly" : "Now"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
