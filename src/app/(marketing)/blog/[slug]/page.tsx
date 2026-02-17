import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { JsonLd } from "@/components/shared/seo-head";
import { APP_URL } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("title, excerpt")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (!post) notFound();

  // Simple markdown-to-HTML (handles ## headers, **, lists, and links)
  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return <h2 key={i} className="text-2xl font-bold mt-8 mb-4">{block.replace("## ", "")}</h2>;
      }
      if (block.startsWith("### ")) {
        return <h3 key={i} className="text-lg font-semibold mt-6 mb-2">{block.replace("### ", "")}</h3>;
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter(l => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc list-inside space-y-1 text-muted-foreground my-4">
            {items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />)}
          </ul>
        );
      }
      if (block.match(/^\d\./)) {
        const items = block.split("\n").filter(l => l.match(/^\d\./));
        return (
          <ol key={i} className="list-decimal list-inside space-y-1 text-muted-foreground my-4">
            {items.map((item, j) => <li key={j} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\.\s*/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />)}
          </ol>
        );
      }
      return <p key={i} className="text-muted-foreground my-4" dangerouslySetInnerHTML={{ __html: block.replace(/\*\*(.*?)\*\*/g, "<strong class='text-foreground'>$1</strong>").replace(/\[(.*?)\]\((.*?)\)/g, "<a href='$2' class='text-brand hover:underline'>$1</a>") }} />;
    });
  };

  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        datePublished: post.published_at,
        author: { "@type": "Organization", name: "ProofLayer AI" },
        url: `${APP_URL}/blog/${slug}`,
      }} />
      <Button variant="ghost" asChild className="mb-6 gap-1">
        <Link href="/blog"><ArrowLeft className="h-4 w-4" />Back to Blog</Link>
      </Button>
      <div className="flex items-center gap-3 mb-4">
        <Badge variant="secondary">{post.category}</Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {new Date(post.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </div>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          {post.read_time}
        </div>
      </div>
      <h1 className="text-4xl font-bold tracking-tight mb-8">{post.title}</h1>
      <div className="prose-like">{renderContent(post.content)}</div>
    </article>
  );
}
