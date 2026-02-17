import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PLANS, type PlanType } from "@/lib/constants";

// In production, verify Paddle webhook signature
function verifyWebhookSignature(body: string, signature: string | null): boolean {
  if (!process.env.PADDLE_WEBHOOK_SECRET || !signature) return false;
  // Simplified — in production use Paddle SDK's webhook verification
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("paddle-signature");

    if (process.env.NODE_ENV === "production" && !verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    const supabase = createAdminClient();
    const eventType = event.event_type || event.alert_name;

    switch (eventType) {
      case "subscription.created":
      case "subscription.updated": {
        const sub = event.data;
        const customData = sub.custom_data || {};
        const userId = customData.user_id;
        const plan = (customData.plan || "starter") as PlanType;

        if (!userId) break;

        const planConfig = PLANS[plan];

        // Upsert subscription
        await supabase.from("subscriptions").upsert({
          user_id: userId,
          paddle_subscription_id: sub.id,
          paddle_customer_id: sub.customer_id,
          plan,
          status: sub.status === "trialing" ? "trialing" : "active",
          billing_cycle: sub.billing_cycle?.interval === "year" ? "annual" : "monthly",
          current_period_start: sub.current_billing_period?.starts_at,
          current_period_end: sub.current_billing_period?.ends_at,
        }, { onConflict: "paddle_subscription_id" });

        // Update profile
        await supabase.from("profiles").update({
          plan,
          monthly_scan_limit: planConfig.platformScans,
          byok_monthly_scan_limit: planConfig.byokScans === -1 ? 999999999 : planConfig.byokScans,
          paddle_customer_id: sub.customer_id,
        }).eq("id", userId);

        break;
      }

      case "subscription.canceled": {
        const sub = event.data;
        const customData = sub.custom_data || {};
        const userId = customData.user_id;

        if (!userId) break;

        await supabase.from("subscriptions")
          .update({ status: "canceled", cancel_at: sub.scheduled_change?.effective_at })
          .eq("paddle_subscription_id", sub.id);

        // Downgrade to starter limits
        await supabase.from("profiles").update({
          plan: "starter",
          monthly_scan_limit: PLANS.starter.platformScans,
          byok_monthly_scan_limit: PLANS.starter.byokScans,
        }).eq("id", userId);

        break;
      }

      case "transaction.completed": {
        const tx = event.data;
        const customData = tx.custom_data || {};

        // Check if this is a donation
        if (customData.type === "donation") {
          const amount = parseFloat(tx.details?.totals?.total || "0") / 100;

          const { data: donation } = await supabase.from("donations").insert({
            paddle_transaction_id: tx.id,
            user_id: customData.user_id || null,
            amount,
            currency: tx.currency_code || "USD",
            frequency: customData.frequency || "one_time",
            donor_name: customData.donor_name,
            donor_email: customData.donor_email,
            is_anonymous: customData.is_anonymous || false,
            message: customData.message,
            status: "completed",
          }).select().single();

          // Add to donor wall if not anonymous
          if (donation && !customData.is_anonymous && customData.show_on_wall !== false) {
            const tier = amount >= 500 ? "patron" : amount >= 100 ? "guardian" : amount >= 25 ? "champion" : "supporter";
            await supabase.from("donor_wall").insert({
              donation_id: donation.id,
              display_name: customData.donor_name || "Anonymous",
              amount,
              tier,
              message: customData.message,
            });
          }
        }
        break;
      }

      case "transaction.payment_failed": {
        const tx = event.data;
        const customData = tx.custom_data || {};
        if (customData.type === "donation") {
          await supabase.from("donations")
            .update({ status: "failed" })
            .eq("paddle_transaction_id", tx.id);
        }
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
