import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();

  const [{ data: donors }, { data: goal }, { count: donorCount }] = await Promise.all([
    supabase.from("donor_wall").select("*").order("created_at", { ascending: false }).limit(30),
    supabase.from("funding_goals").select("*").eq("is_active", true).single(),
    supabase.from("donations").select("*", { count: "exact", head: true }).eq("status", "completed"),
  ]);

  return NextResponse.json({
    donors: donors || [],
    goal,
    totalDonors: donorCount || 0,
  });
}
