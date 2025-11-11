import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CheckoutErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 size-full opacity-40"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,253,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,253,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,black_55%,transparent_100%)]"
        />
      </div>

      {/* Centered content */}
      <div className="flex min-h-screen items-center justify-center px-4 py-10">
        <Card className="w-full max-w-md border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl shadow-[0_0_80px_rgba(15,23,42,0.7)]">
          <CardHeader className="text-center">
            <CardTitle className="text-xl font-bold text-zinc-100">
              Checkout Failed
            </CardTitle>
            <CardDescription className="text-zinc-400">
              Your payment was not completed. No charges have been made.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-amber-500" />
            <p className="text-sm text-zinc-300">
              If you encountered an issue, please try again or contact support.
            </p>
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/#pricing">Try Again</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}