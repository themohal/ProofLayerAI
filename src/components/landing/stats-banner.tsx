import { createClient } from "@/lib/supabase/server";
import { StatsBannerClient } from "./stats-banner-client";

export async function StatsBanner() {
  const supabase = await createClient();
  const { data: items } = await supabase
    .from("site_content")
    .select("*")
    .eq("section", "platform_stat")
    .eq("is_active", true)
    .order("sort_order");

  if (!items || items.length === 0) return null;

  const stats = items.map((item) => ({
    value: item.data.value,
    label: item.data.label,
    suffix: item.data.suffix,
  }));

  return <StatsBannerClient stats={stats} />;
}
