

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TechBadge } from "@/components/ui/tech-badge";
import { Button } from "@/components/ui/button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ArrowRight, Zap, ShieldCheck, Users, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";
export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background text-foreground">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(var(--foreground-rgb, 148, 163, 253), 0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--foreground-rgb, 148, 163, 253), 0.03) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,1) 5%, transparent 70%)",
        }}
      />

      <main className="mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-16 pt-16 lg:px-6">
        {/* 1) Hero / What We Are */}
        <section className="flex flex-col items-center gap-4 text-center">
          <TechBadge variant="secondary" className="uppercase tracking-[0.18em]" iconPosition="left">
            About Dream Chat
          </TechBadge>

          <GradientHeading
            size="xl"
            variant="primary"
            className="mx-auto max-w-4xl leading-tight"
          >
            The white-label AI Voice Platform interface for fast-moving teams
          </GradientHeading>

          <p className="mx-auto max-w-2xl text-sm md:text-base text-muted-foreground">
            Designed to feel native in every product you ship. One production-ready chat shell, endlessly rebrandable.
          </p>

          <div className="mt-2 flex flex-col items-center gap-2 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="sm"
              className="gap-2 rounded-full px-5"
            >
              <Link href="/pricing">
                View pricing
                <ArrowRight className="h-3 w-3" />
              </Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="rounded-full px-5"
            >
              <Link href="/features">Browse features</Link>
            </Button>
          </div>
        </section>

        {/* 2) How It Works */}
        <section className="grid gap-4 md:grid-cols-3">
          <Card className="border border-border bg-card/80 backdrop-blur-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Zap className="h-4 w-4 text-primary" />
                Plug in your assistant
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Connect any Vapi assistant with your own keys. No backend
                rewrite, no custom protocol.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-border bg-card/80 backdrop-blur-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Users className="h-4 w-4 text-primary" />
                Brand it for every client
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Swap logos, colors, and copy once. Deliver a premium, consistent
                chat UI across all deployments.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border border-border bg-card/80 backdrop-blur-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                <Clock className="h-4 w-4 text-primary" />
                Launch in hours, not months
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Use our opinionated layout and streaming UX to go live quickly,
                then customize only where it matters.
              </CardDescription>
            </CardHeader>
          </Card>
        </section>

        {/* 3) Why Teams Use Us */}
        <section className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
            <h2 className="text-lg font-semibold tracking-tight md:text-xl">
              Why agencies and product teams choose Dream Chat
            </h2>
            <p className="max-w-xl text-xs md:text-sm text-muted-foreground">
              Opinionated where it counts, flexible where you need it. Built to
              be resold, rebranded, and trusted in real client environments.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border border-border bg-card/75 backdrop-blur-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm">White-label by design</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  One codebase, unlimited brands. Keep your stack simple while
                  making each deployment feel bespoke.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border bg-card/75 backdrop-blur-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm">Battle-tested UX</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Modern AI patterns out of the box: streaming, keyboard
                  shortcuts, compact layout, responsive by default.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border border-border bg-card/75 backdrop-blur-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-sm">Secure by default</CardTitle>
                <CardDescription className="text-xs text-muted-foreground">
                  Your clients bring their own keys. You control hosting,
                  observability, and compliance.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* 4) Built For Velocity / Credibility */}
        <section className="grid gap-6 items-start md:grid-cols-[1.6fr,1.4fr]">
          <Card className="border border-border bg-card/85 backdrop-blur-xl">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-sm md:text-base">
                <Zap className="h-4 w-4 text-primary" />
                Built for modern AI shipping velocity
              </CardTitle>
              <CardDescription className="text-xs md:text-sm text-muted-foreground">
                A lean Next.js + TypeScript + Tailwind stack your team already
                knows how to extend.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-[10px] md:text-xs text-muted-foreground">
              <div>Next.js App Router, file-based routes</div>
              <div>shadcn/ui primitives and tokens</div>
              <div>Dark/light mode with smooth theming</div>
              <div>Accessible, responsive layout</div>
            </CardContent>
          </Card>

          <Card className="border border-dashed border-border bg-muted/40 backdrop-blur-md">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <ShieldCheck className="h-4 w-4 text-primary" />
                Trusted implementation patterns
              </CardTitle>
              <CardDescription className="text-xs text-muted-foreground">
                Designed to slot cleanly into serious AI and devtool stacks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-[10px] text-muted-foreground">
              <p>Use it as-is, or as a reference implementation for your own shell.</p>
              <p>No vendor lock-in, no opaque components—just clean React.</p>
            </CardContent>
          </Card>
        </section>

        {/* Final CTA */}
        <section className="mt-2">
          <Card className="border border-border bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-xl">
            <CardHeader className="flex flex-col items-center gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
              <div className="space-y-1">
                <CardTitle className="text-base md:text-lg">
                  See pricing or explore the feature set
                </CardTitle>
                <CardDescription className="max-w-xl text-xs md:text-sm text-muted-foreground">
                  Evaluate Dream Chat like a real AI Voice Platform product: transparent pricing,
                  documented stack, and ready-to-ship UI.
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  asChild
                  size="sm"
                  className="gap-2 rounded-full px-4"
                >
                  <Link href="/pricing">
                    View pricing
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                  className="rounded-full px-4"
                >
                  <Link href="/features">Browse features</Link>
                </Button>
              </div>
            </CardHeader>
          </Card>
        </section>
      </main>
    </div>
  );
}