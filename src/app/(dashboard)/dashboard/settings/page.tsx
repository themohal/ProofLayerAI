"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { useToast } from "@/providers/toast-provider";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { addToast } = useToast();
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
        const { data: profile } = await supabase.from("profiles").select("full_name").eq("id", user.id).single();
        if (profile) setFullName(profile.full_name || "");
      }
    };
    load();
  }, []);

  const updateProfile = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.from("profiles").update({ full_name: fullName }).eq("id", user.id);
      if (error) {
        addToast({ title: "Update failed", description: error.message, variant: "destructive" });
      } else {
        addToast({ title: "Profile updated" });
      }
    }
    setLoading(false);
  };

  const updatePasswordHandler = async () => {
    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) {
      addToast({ title: "Password update failed", description: error.message, variant: "destructive" });
    } else {
      addToast({ title: "Password updated" });
      setCurrentPassword("");
      setNewPassword("");
    }
    setPasswordLoading(false);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={email} disabled />
            <p className="text-xs text-muted-foreground">Email cannot be changed.</p>
          </div>
          <Button onClick={updateProfile} disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>New Password</Label>
            <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={8} />
          </div>
          <Button onClick={updatePasswordHandler} disabled={passwordLoading || newPassword.length < 8}>
            {passwordLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
