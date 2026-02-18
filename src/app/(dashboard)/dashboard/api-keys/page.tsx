"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Plus, Copy, Trash2, Key } from "lucide-react";
import { useToast } from "@/providers/toast-provider";

interface ApiKey {
  id: string;
  key_prefix: string;
  label: string;
  is_active: boolean;
  last_used_at: string | null;
  created_at: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [newKeyLabel, setNewKeyLabel] = useState("Default");
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { addToast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    loadKeys();
  }, []);

  const loadKeys = async () => {
    const { data } = await supabase.from("api_keys").select("*").order("created_at", { ascending: false });
    setKeys(data || []);
  };

  const createKey = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      addToast({ title: "Not authenticated", variant: "destructive" });
      return;
    }

    // Generate key client-side, hash it, store only the hash
    const key = `pl_live_${crypto.randomUUID().replace(/-/g, "")}`;
    const keyPrefix = key.slice(0, 12);

    // Hash using SubtleCrypto
    const encoder = new TextEncoder();
    const data = encoder.encode(key);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const keyHash = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    const { error } = await supabase.from("api_keys").insert({
      user_id: user.id,
      key_hash: keyHash,
      key_prefix: keyPrefix,
      label: newKeyLabel,
      scopes: ["verify"],
    });

    if (error) {
      addToast({ title: "Failed to create key", description: error.message, variant: "destructive" });
      return;
    }

    setGeneratedKey(key);
    loadKeys();
  };

  const revokeKey = async (id: string) => {
    await supabase.from("api_keys").update({ is_active: false }).eq("id", id);
    addToast({ title: "API key revoked" });
    loadKeys();
  };

  const copyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    addToast({ title: "Copied to clipboard" });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">API Keys</h1>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => { setGeneratedKey(null); setNewKeyLabel("Default"); }}>
              <Plus className="h-4 w-4" />Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{generatedKey ? "API Key Created" : "Create API Key"}</DialogTitle>
              <DialogDescription>
                {generatedKey ? "Copy your API key now. You won't be able to see it again." : "Create a new API key for programmatic access."}
              </DialogDescription>
            </DialogHeader>
            {generatedKey ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 rounded-lg bg-muted p-3 font-mono text-sm">
                  <code className="flex-1 break-all">{generatedKey}</code>
                  <Button variant="ghost" size="icon" onClick={() => copyKey(generatedKey)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <DialogFooter>
                  <Button onClick={() => setDialogOpen(false)}>Done</Button>
                </DialogFooter>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Label</Label>
                  <Input value={newKeyLabel} onChange={(e) => setNewKeyLabel(e.target.value)} placeholder="e.g., Production" />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={createKey}>Create Key</Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your API Keys</CardTitle>
          <CardDescription>Use these keys to authenticate API requests.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {keys.map((key) => (
              <div key={key.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex items-center gap-3">
                  <Key className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{key.label}</p>
                    <p className="text-xs text-muted-foreground font-mono">{key.key_prefix}...</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={key.is_active ? "default" : "secondary"}>
                    {key.is_active ? "Active" : "Revoked"}
                  </Badge>
                  {key.is_active && (
                    <Button variant="ghost" size="icon" onClick={() => revokeKey(key.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
            {keys.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">No API keys yet. Create one to get started.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
