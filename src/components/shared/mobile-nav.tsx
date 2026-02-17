"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./logo";

const navLinks = [
  { href: "/verify", label: "Verify" },
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/donate", label: "Donate" },
  { href: "/blog", label: "Blog" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72">
        <SheetTitle className="sr-only">Navigation menu</SheetTitle>
        <div className="flex flex-col gap-6 pt-6">
          <Logo />
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-2 pt-4 border-t">
            <Button variant="ghost" asChild>
              <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup" onClick={() => setOpen(false)}>Start Free Trial</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
