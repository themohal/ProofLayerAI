import Link from "next/link";
import { Logo } from "./logo";

const footerLinks = {
  Product: [
    { href: "/verify", label: "Verify Content" },
    { href: "/pricing", label: "Pricing" },
    { href: "/docs", label: "API Docs" },
    { href: "/blog", label: "Blog" },
  ],
  Company: [
    { href: "/about", label: "About" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Contact" },
  ],
  Legal: [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Service" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-muted-foreground">
              The SSL Certificate of the AI Age. Verify any content, trust every source.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold">{category}</h3>
              <ul className="mt-3 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} ProofLayer AI. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Securing trust in the age of AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
