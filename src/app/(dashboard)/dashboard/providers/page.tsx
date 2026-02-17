"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Key, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/providers/toast-provider";
import { PROVIDER_DISPLAY_NAMES, SUPPORTED_PROVIDERS } from "@/lib/constants";

interface ProviderKey {
  id: string;
  provider: string;
  key_label: string;
  is_active: boolean;
  last_verified_at: string | null;
  created_at: string;
}

export default function ProvidersPage() {
  const [keys, setKeys] = useState<ProviderKey[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [provider, setProvider] = useState<string>("openai");
  const [apiKey, setApiKey] = useState("");
  const [keyLabel, setKeyLabel] = useState("Default");
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState<string | null>(null);
  const { addToast } = useToast();
  const supabase = createClient();

  useEffect(() => { loadKeys(); }, []);

  const loadKeys = async () => {
    const { data } = await supabase.from("user_provider_keys").select("id, provider, key_label, is_active, last_verified_at, created_at").order("created_at", { ascending: false });
    setKeys(data || []);
  };

  const addKey = async () => {
    setSaving(true);
    try {
      // Call server endpoint to encrypt and store key
      const res = await fetch("/api/provider-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ provider, apiKey, label: keyLabel }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to add key");
      }
      addToast({ title: "Provider key added" });
      setDialogOpen(false);
      setApiKey("");
      loadKeys();
    } catch (err) {
      addToast({ title: "Error", description: err instanceof Error ? err.message : "Unknown error", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const deleteKey = async (id: string) => {
    await supabase.from("user_provider_keys").delete().eq("id", id);
    addToast({ title: "Provider key removed" });
    loadKeys();
  };

  const testKey = async (id: string) => {
    setTesting(id);
    try {
      const res = await fetch(`/api/provider-keys/${id}/test`, { method: "POST" });
      const result = await res.json();
      if (result.valid) {
        addToast({ title: "Key is valid" });
      } else {
        addToast({ title: "Key is invalid", description: result.error, variant: "destructive" });
      }
      loadKeys();
    } catch {
      addToast({ title: "Test failed", variant: "destructive" });
    } finally {
      setTesting(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">BYOK Provider Keys</h1>
          <p className="text-sm text-muted-foreground mt-1">Bring your own API keys to save on scan costs.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4" />Add Provider Key</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Provider Key</DialogTitle>
              <DialogDescription>Add your API key for an AI provider to use BYOK scanning.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Provider</Label>
                <Select value={provider} onValueChange={setProvider}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SUPPORTED_PROVIDERS.map((p) => (
                      <SelectItem key={p} value={p}>{PROVIDER_DISPLAY_NAMES[p]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>API Key</Label>
                <Input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="sk-..." />
              </div>
              <div className="space-y-2">
                <Label>Label</Label>
                <Input value={keyLabel} onChange={(e) => setKeyLabel(e.target.value)} placeholder="e.g., Production" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={addKey} disabled={!apiKey || saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Add Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {SUPPORTED_PROVIDERS.map((p) => {
          const providerKeys = keys.filter((k) => k.provider === p);
          const hasActive = providerKeys.some((k) => k.is_active);
          return (
            <Card key={p}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{PROVIDER_DISPLAY_NAMES[p]}</CardTitle>
                  {hasActive ? (
                    <Badge className="bg-trust-high text-white">Connected</Badge>
                  ) : (
                    <Badge variant="secondary">Not connected</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {providerKeys.length > 0 ? (
                  <div className="space-y-2">
                    {providerKeys.map((key) => (
                      <div key={key.id} className="flex items-center justify-between rounded border p-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Key className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{key.key_label}</span>
                          {key.is_active ? <CheckCircle className="h-3.5 w-3.5 text-trust-high" /> : <XCircle className="h-3.5 w-3.5 text-destructive" />}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => testKey(key.id)} disabled={testing === key.id}>
                            {testing === key.id ? <Loader2 className="h-3 w-3 animate-spin" /> : "Test"}
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => deleteKey(key.id)}>
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-3">No keys added</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
