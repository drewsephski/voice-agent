"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WhiteLabelHooksCard } from "@/components/home/white-label-hooks-card";

export function LeftInfoColumn() {
  return (
    <section className="hidden h-full w-64 flex-col gap-4 md:flex">
      {/* Stack two cards to visually match chat/right column height */}
      <Card className="flex flex-col flex-1 border border-border/60 bg-card/95 backdrop-blur-xl shadow-[0_16px_50px_rgba(15,23,42,0.4)]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl font-bold text-primary">
            Dream
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            White-label AI Voice Agent experience your clients can deploy in
            minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>Plug into any Vapi assistant and hand this UI to your clients.</p>
          <ul className="space-y-1.5">
            <li>• Self-hosted and brandable.</li>
            <li>• Uses your client&apos;s own Vapi keys.</li>
            <li>• Modern, production-ready UX.</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="flex flex-col border border-border/50 bg-card/90 backdrop-blur-xl shadow-[0_14px_40px_rgba(15,23,42,0.35)]">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            Quick start
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-xs text-muted-foreground">
          <p>1. Paste your Vapi API key.</p>
          <p>2. Paste your Assistant ID.</p>
          <p>3. Start chatting with your assistant via Dream.</p>
          <p className="mt-2 text-[10px] text-muted-foreground/70">
            Note: This interface never ships with a shared key. Each deployment
            provides its own credentials.
          </p>
        </CardContent>
      </Card>

      <WhiteLabelHooksCard />
    </section>
  );
}