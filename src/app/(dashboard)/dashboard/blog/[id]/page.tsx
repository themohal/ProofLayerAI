"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, ArrowLeft, Trash2 } from "lucide-react";
import { useToast } from "@/providers/toast-provider";

export default function EditBlogPostPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "General",
    read_time: "5 min",
    cover_image: "",
    is_published: false,
  });

  useEffect(() => {
    const loadPost = async () => {
      const res = await fetch(`/api/admin/blog/${id}`);
      if (res.ok) {
        const post = await res.json();
        setForm({
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          read_time: post.read_time,
          cover_image: post.cover_image || "",
          is_published: post.is_published,
        });
      } else {
        addToast({ title: "Failed to load post", variant: "destructive" });
      }
      setLoading(false);
    };
    loadPost();
  }, [id]);

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const res = await fetch(`/api/admin/blog/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      addToast({ title: "Post updated successfully" });
      router.push("/dashboard/blog");
    } else {
      const data = await res.json();
      addToast({ title: "Error", description: data.error, variant: "destructive" });
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    const res = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (res.ok) {
      addToast({ title: "Post deleted" });
      router.push("/dashboard/blog");
    } else {
      addToast({ title: "Failed to delete", variant: "destructive" });
      setDeleting(false);
      setShowDelete(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard/blog"><ArrowLeft className="h-4 w-4" /></Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Post</h1>
            <p className="text-muted-foreground">Update blog post details</p>
          </div>
        </div>
        <Button variant="destructive" size="sm" onClick={() => setShowDelete(true)}>
          <Trash2 className="mr-2 h-4 w-4" />Delete
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Edit your blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" value={form.title} onChange={(e) => updateField("title", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={form.slug} onChange={(e) => updateField("slug", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" rows={2} value={form.excerpt} onChange={(e) => updateField("excerpt", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown)</Label>
              <Textarea id="content" rows={16} value={form.content} onChange={(e) => updateField("content", e.target.value)} required className="font-mono text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" value={form.category} onChange={(e) => updateField("category", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="read_time">Read Time</Label>
                <Input id="read_time" value={form.read_time} onChange={(e) => updateField("read_time", e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cover_image">Cover Image URL (optional)</Label>
              <Input id="cover_image" value={form.cover_image} onChange={(e) => updateField("cover_image", e.target.value)} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-3">
              <Switch id="is_published" checked={form.is_published} onCheckedChange={(val) => updateField("is_published", val)} />
              <Label htmlFor="is_published">Published</Label>
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
              <Button variant="outline" asChild>
                <Link href="/dashboard/blog">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Dialog open={showDelete} onOpenChange={setShowDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>Are you sure? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDelete(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete} disabled={deleting}>
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
