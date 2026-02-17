import { createClient } from "@/lib/supabase/server";
import { Badge } from "@/components/ui/badge";

const tierStyles: Record<string, string> = {
  supporter: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
  champion: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  guardian: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
  patron: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
};

export async function DonorWall() {
  const supabase = await createClient();
  const { data: donors } = await supabase.from("donor_wall").select("*").order("created_at", { ascending: false }).limit(30);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Donor Wall</h2>
        {donors && donors.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {donors.map((donor) => (
              <div key={donor.id} className="rounded-lg border bg-background p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-sm">{donor.display_name}</span>
                  <Badge className={tierStyles[donor.tier] || ""} variant="secondary">{donor.tier}</Badge>
                </div>
                {donor.message && <p className="text-sm text-muted-foreground mb-2">&ldquo;{donor.message}&rdquo;</p>}
                <p className="text-xs text-muted-foreground">{new Date(donor.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Be the first to donate and appear on the wall!</p>
        )}
      </div>
    </section>
  );
}
