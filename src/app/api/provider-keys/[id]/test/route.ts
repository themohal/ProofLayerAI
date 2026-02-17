import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { decryptApiKey } from "@/lib/ai-providers/key-vault";
import { createProvider, type ProviderName } from "@/lib/ai-providers/factory";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const admin = createAdminClient();
    const { data: providerKey } = await admin
      .from("user_provider_keys")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (!providerKey) {
      return NextResponse.json({ error: "Key not found" }, { status: 404 });
    }

    try {
      const apiKey = decryptApiKey(providerKey.encrypted_key);
      const provider = createProvider(providerKey.provider as ProviderName, apiKey);

      // Simple test: analyze a short text
      await provider.analyzeText("This is a test message to verify the API key works.");

      // Update last verified timestamp
      await admin
        .from("user_provider_keys")
        .update({ last_verified_at: new Date().toISOString(), is_active: true })
        .eq("id", id);

      return NextResponse.json({ valid: true });
    } catch (err) {
      // Mark key as inactive
      await admin
        .from("user_provider_keys")
        .update({ is_active: false })
        .eq("id", id);

      return NextResponse.json({
        valid: false,
        error: err instanceof Error ? err.message : "Key validation failed",
      });
    }
  } catch (error) {
    console.error("Test key error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
