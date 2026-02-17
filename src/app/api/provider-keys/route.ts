import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { encryptApiKey } from "@/lib/ai-providers/key-vault";
import { addProviderKeySchema } from "@/lib/validations";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const parsed = addProviderKeySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { provider, apiKey, label } = parsed.data;

    // Encrypt the key
    const encryptedKey = encryptApiKey(apiKey);

    const admin = createAdminClient();

    // Check if key already exists for this provider+label
    const { data: existing } = await admin
      .from("user_provider_keys")
      .select("id")
      .eq("user_id", user.id)
      .eq("provider", provider)
      .eq("key_label", label)
      .single();

    if (existing) {
      // Update existing
      const { error } = await admin
        .from("user_provider_keys")
        .update({
          encrypted_key: encryptedKey,
          is_active: true,
          last_verified_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      // Insert new
      const { error } = await admin
        .from("user_provider_keys")
        .insert({
          user_id: user.id,
          provider,
          encrypted_key: encryptedKey,
          key_label: label,
          is_active: true,
          last_verified_at: new Date().toISOString(),
        });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    // Enable BYOK on user profile
    await admin
      .from("profiles")
      .update({ byok_enabled: true })
      .eq("id", user.id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Provider key error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
