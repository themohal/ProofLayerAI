import { createHash } from "crypto";
import { createAdminClient } from "./supabase/admin";
import { decryptApiKey } from "./ai-providers/key-vault";
import type { ProviderName } from "./ai-providers/factory";

interface AuthResult {
  userId: string;
  plan: string;
  isByok: boolean;
  byokApiKey?: string;
  byokProvider?: ProviderName;
}

export async function authenticateRequest(
  authHeader: string | null,
  providerPreference?: string
): Promise<AuthResult | { error: string; status: number }> {
  if (!authHeader) {
    return { error: "Missing Authorization header", status: 401 };
  }

  const token = authHeader.replace("Bearer ", "");
  const supabase = createAdminClient();

  // Check if it's a platform API key (starts with pl_)
  if (token.startsWith("pl_")) {
    const keyHash = createHash("sha256").update(token).digest("hex");
    const { data: apiKey, error } = await supabase
      .from("api_keys")
      .select("*, profiles(*)")
      .eq("key_hash", keyHash)
      .eq("is_active", true)
      .single();

    if (error || !apiKey) {
      return { error: "Invalid API key", status: 401 };
    }

    // Update last used
    await supabase
      .from("api_keys")
      .update({ last_used_at: new Date().toISOString() })
      .eq("id", apiKey.id);

    const profile = apiKey.profiles;
    let isByok = false;
    let byokApiKey: string | undefined;
    let byokProvider: ProviderName | undefined;

    // Check for BYOK key if provider preference specified
    if (providerPreference && profile.byok_enabled) {
      const { data: providerKey } = await supabase
        .from("user_provider_keys")
        .select("*")
        .eq("user_id", profile.id)
        .eq("provider", providerPreference)
        .eq("is_active", true)
        .single();

      if (providerKey) {
        isByok = true;
        byokApiKey = decryptApiKey(providerKey.encrypted_key);
        byokProvider = providerPreference as ProviderName;
      }
    }

    return {
      userId: profile.id,
      plan: profile.plan,
      isByok,
      byokApiKey,
      byokProvider,
    };
  }

  // Otherwise treat as Supabase session token
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return { error: "Invalid session token", status: 401 };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) {
    return { error: "Profile not found", status: 404 };
  }

  let isByok = false;
  let byokApiKey: string | undefined;
  let byokProvider: ProviderName | undefined;

  if (providerPreference && profile.byok_enabled) {
    const { data: providerKey } = await supabase
      .from("user_provider_keys")
      .select("*")
      .eq("user_id", user.id)
      .eq("provider", providerPreference)
      .eq("is_active", true)
      .single();

    if (providerKey) {
      isByok = true;
      byokApiKey = decryptApiKey(providerKey.encrypted_key);
      byokProvider = providerPreference as ProviderName;
    }
  }

  return {
    userId: user.id,
    plan: profile.plan,
    isByok,
    byokApiKey,
    byokProvider,
  };
}
