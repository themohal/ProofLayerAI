import { NextRequest, NextResponse } from "next/server";
import { donationCheckoutSchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = donationCheckoutSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid request", details: parsed.error.flatten() }, { status: 400 });
    }

    // Return data needed for Paddle client-side checkout
    return NextResponse.json({
      productId: process.env.PADDLE_DONATION_PRODUCT_ID || "pro_donation",
      customData: {
        type: "donation",
        ...parsed.data,
      },
    });
  } catch (error) {
    console.error("Donation checkout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
