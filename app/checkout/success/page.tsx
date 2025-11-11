import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      <div className="relative mx-auto flex h-screen max-w-6xl gap-4 px-4 py-10 lg:gap-6 lg:px-6">
        {/* Subtle grid background to match pricing section */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 size-full opacity-40"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,253,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,253,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,black_55%,transparent_100%)]"
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <Card className="w-full max-w-md border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              </div>
              <CardTitle className="text-2xl font-bold text-zinc-100">
                Payment Successful!
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Thank you for your purchase. You should receive a confirmation email shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-6 text-sm text-zinc-400">
                Access to the repository has been granted to your email address. You can now start using the chat interface.
              </p>
              <Button asChild>
                <Link href="/">Return to Home</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}