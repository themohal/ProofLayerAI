import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getPriceId } from "@/lib/paddle/prices";
import type { PlanType } from "@/lib/constants";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { plan, billing } = await request.json();
    const priceId = getPriceId(plan as PlanType, billing);

    // Return price ID for client-side Paddle checkout
    return NextResponse.json({
      priceId,
      customerId: user.id,
      email: user.email,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
