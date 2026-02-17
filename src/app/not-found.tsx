import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Shield className="h-16 w-16 text-muted-foreground mb-6" />
      <h1 className="text-4xl font-bold">404</h1>
      <p className="mt-2 text-lg text-muted-foreground">Page not found</p>
      <p className="mt-1 text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button variant="outline" asChild>
          <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Go Back</Link>
        </Button>
        <Button asChild>
          <Link href="/"><Home className="mr-2 h-4 w-4" />Home</Link>
        </Button>
      </div>
    </div>
  );
}
