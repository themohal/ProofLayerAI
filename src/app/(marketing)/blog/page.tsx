import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights on AI detection, content authenticity, and the future of digital trust.",
};

export default async function BlogPage() {
  const supabase = await createClient();

  const { data: posts } = await supabase
    .from("blog_posts")
    .select("slug, title, excerpt, category, read_time, published_at")
    .eq("is_published", true)
    .order("published_at", { ascending: false });

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Insights on AI detection, content authenticity, and digital trust.
        </p>
      </div>
      <div className="space-y-6">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="transition-colors hover:border-brand">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {post.read_time}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{post.excerpt}</p>
                  <span className="text-sm text-brand flex items-center gap-1">
                    Read more <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-muted-foreground">No blog posts yet. Check back soon!</p>
        )}
      </div>
    </div>
  );
}
