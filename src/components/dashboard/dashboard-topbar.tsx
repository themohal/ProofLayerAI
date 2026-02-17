"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { signOut } from "@/actions/auth";
import { LogOut, User as UserIcon, CreditCard } from "lucide-react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";

interface DashboardTopbarProps {
  user: User;
  profile: { plan: string; full_name: string; email: string } | null;
}

export function DashboardTopbar({ user, profile }: DashboardTopbarProps) {
  const initials = (profile?.full_name || user.email || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <Link href="/dashboard" className="text-lg font-bold">ProofLayer</Link>
      </div>
      <div className="hidden lg:block" />
      <div className="flex items-center gap-3">
        <Badge variant="secondary" className="capitalize">{profile?.plan || "starter"}</Badge>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">{profile?.full_name || "User"}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings"><UserIcon className="mr-2 h-4 w-4" />Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/pricing"><CreditCard className="mr-2 h-4 w-4" />Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
