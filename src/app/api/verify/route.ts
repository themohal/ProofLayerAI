import { NextRequest, NextResponse } from "next/server";
import { createProvider, getDefaultProvider, getPlatformApiKey, getBestProviderForContent, type ProviderName } from "@/lib/ai-providers/factory";
import { calculateTrustScore } from "@/lib/ai-providers/scoring";
import { identifyModelFingerprint } from "@/lib/ai-providers/fingerprinting";
import { authenticateRequest } from "@/lib/api-auth";
import { checkRateLimit } from "@/lib/rate-limiter";
import { computeContentHash } from "@/lib/upload";
import { verifyRequestSchema } from "@/lib/validations";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    // 1. Parse and validate request
    const body = await request.json();
    const parsed = verifyRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { contentType, content, mimeType, provider: preferredProvider } = parsed.data;

    // 2. Authenticate
    const authHeader = request.headers.get("authorization");
    const providerHeader = request.headers.get("x-provider") || preferredProvider;
    const auth = await authenticateRequest(authHeader, providerHeader);

    if ("error" in auth) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    // 3. Rate limit check
    const rateLimit = checkRateLimit(auth.userId, auth.plan);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Rate limit exceeded", retryAfter: Math.ceil((rateLimit.resetAt - Date.now()) / 1000) },
        { status: 429, headers: { "Retry-After": String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) } }
      );
    }

    // 4. Check scan quota
    const supabase = createAdminClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", auth.userId)
      .single();

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const isByok = auth.isByok;
    if (isByok) {
      if (profile.plan !== "enterprise" && profile.current_month_byok_scans >= profile.byok_monthly_scan_limit) {
        return NextResponse.json({ error: "BYOK scan limit reached for this month" }, { status: 403 });
      }
    } else {
      if (profile.current_month_scans >= profile.monthly_scan_limit) {
        return NextResponse.json({ error: "Scan limit reached for this month. Upgrade your plan or use BYOK." }, { status: 403 });
      }
    }

    // 5. Content hash for dedup/caching
    const contentHash = computeContentHash(content);

    // Check cache (same user, same content, within 1 hour)
    const { data: cachedScan } = await supabase
      .from("scans")
      .select("*")
      .eq("user_id", auth.userId)
      .eq("content_hash", contentHash)
      .gte("created_at", new Date(Date.now() - 3600000).toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (cachedScan) {
      return NextResponse.json({
        id: cachedScan.id,
        trustScore: cachedScan.trust_score,
        aiProbability: cachedScan.ai_probability,
        isAiGenerated: cachedScan.is_ai_generated,
        confidence: cachedScan.detailed_analysis?.confidence || 0,
        modelFingerprint: cachedScan.model_fingerprint,
        manipulationType: cachedScan.manipulation_type,
        detailedAnalysis: cachedScan.detailed_analysis,
        provider: cachedScan.provider_used,
        isByok: cachedScan.is_byok,
        processingTimeMs: 0,
        contentType: cachedScan.content_type,
        createdAt: cachedScan.created_at,
        cached: true,
      });
    }

    // 6. Resolve provider and API key
    let providerName: ProviderName;
    let apiKey: string;

    if (isByok && auth.byokApiKey && auth.byokProvider) {
      providerName = auth.byokProvider;
      apiKey = auth.byokApiKey;
    } else {
      providerName = (providerHeader as ProviderName) || getBestProviderForContent(contentType);
      apiKey = getPlatformApiKey(providerName);
    }

    if (!apiKey) {
      return NextResponse.json({ error: "No API key available for provider" }, { status: 500 });
    }

    // 7. Run analysis — content is processed in-memory only.
    // No uploaded media is stored in Supabase or on disk.
    // Only metadata (hash, scores, analysis) is persisted.
    const provider = createProvider(providerName, apiKey);
    let analysis;

    switch (contentType) {
      case "text":
        analysis = await provider.analyzeText(content);
        break;
      case "image":
        analysis = await provider.analyzeImage(content, mimeType || "image/jpeg");
        break;
      case "audio":
      case "video":
        analysis = await provider.analyzeAudio(content, mimeType || "audio/wav");
        break;
      default:
        return NextResponse.json({ error: "Unsupported content type" }, { status: 400 });
    }

    // 8. Apply scoring & fingerprinting
    const processingTimeMs = Date.now() - startTime;
    const trustResult = calculateTrustScore(analysis, providerName, isByok, processingTimeMs);

    // Enhance fingerprinting
    const fingerprint = identifyModelFingerprint(
      analysis.details.textualPatterns || analysis.details.visualArtifacts || [],
      contentType,
      analysis.modelFingerprint
    );

    // 9. Save scan result
    const { data: scan, error: scanError } = await supabase
      .from("scans")
      .insert({
        user_id: auth.userId,
        content_type: contentType,
        content_hash: contentHash,
        file_name: parsed.data.fileName,
        file_size: parsed.data.fileSize,
        trust_score: trustResult.score,
        ai_probability: trustResult.aiProbability,
        is_ai_generated: trustResult.isAiGenerated,
        model_fingerprint: fingerprint || trustResult.modelFingerprint,
        manipulation_type: trustResult.manipulationType,
        detailed_analysis: {
          ...trustResult.detailedAnalysis,
          confidence: trustResult.confidence,
        },
        provider_used: providerName,
        is_byok: isByok,
        processing_time_ms: processingTimeMs,
      })
      .select()
      .single();

    if (scanError) {
      console.error("Failed to save scan:", scanError);
    }

    // 10. Increment scan count
    await supabase.rpc("increment_scan_count", {
      p_user_id: auth.userId,
      p_is_byok: isByok,
    });

    // 11. Log usage
    await supabase.from("usage_logs").insert({
      user_id: auth.userId,
      endpoint: "/api/verify",
      method: "POST",
      content_type: contentType,
      provider_used: providerName,
      is_byok: isByok,
      processing_time_ms: processingTimeMs,
      status_code: 200,
    });

    // 12. Return response
    return NextResponse.json({
      id: scan?.id || "unknown",
      trustScore: trustResult.score,
      aiProbability: trustResult.aiProbability,
      isAiGenerated: trustResult.isAiGenerated,
      confidence: trustResult.confidence,
      modelFingerprint: fingerprint || trustResult.modelFingerprint,
      manipulationType: trustResult.manipulationType,
      detailedAnalysis: trustResult.detailedAnalysis,
      provider: providerName,
      isByok,
      processingTimeMs,
      contentType,
      createdAt: scan?.created_at || new Date().toISOString(),
    });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
