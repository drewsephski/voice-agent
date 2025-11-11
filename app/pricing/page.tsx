"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ConsistentBadge } from "@/components/ui/consistent-badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Clock,
  Users,
  Zap,
  Infinity,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
const monthlyPrice = 7.99;
const originalMonthlyPrice = 12.99;
const monthlyDiscount = Math.round(
  ((originalMonthlyPrice - monthlyPrice) / originalMonthlyPrice) * 100
);

const oneTimePrice = 79.99;
const yearlyPrice = monthlyPrice * 12;
const oneTimeDiscount = Math.round(
  ((yearlyPrice - oneTimePrice) / yearlyPrice) * 100
);

const FEATURES_ALL = [
  "Unlimited branded workspaces",
  "Connect any Vapi assistant",
  "Self-hosted and white-label ready",
  "Real-time streaming UI",
  "Responsive, mobile-friendly layout",
  "Theme-aware design (light & dark)",
  "Production-ready UX out of the box",
  "Developer-friendly Next.js + TypeScript stack",
];

const FEATURES_MONTHLY = [
  "Perfect for agencies validating demand",
  "Low commitment, pause anytime",
  "Full access to all features",
  "Priority email support",
];

const FEATURES_ONETIME = [
  "Lifetime license for agencies",
  "Use across all your client projects",
  "No recurring license fees",
  "Top-tier support & early feature access",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background text-foreground">
      {/* Page Shell */}
      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-16 lg:px-6">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 size-full opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(var(--foreground-rgb), 0.06) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(var(--foreground-rgb), 0.03) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
            maskImage:
              "radial-gradient(ellipse at center, var(--background) 5%, transparent 70%)",
          }}
        />

        {/* Hero */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-1 text-xs text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Transparent pricing. No hidden fees. White-label friendly.
          </div>
          <h1 className="text-4xl font-bold tracking-tighter md:text-5xl lg:text-6xl">
            Simple pricing for
            <span className="block text-primary">
              serious AI Voice Agent deployments
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground md:text-lg">
            Choose the model that fits your agency. Monthly to start fast, or a
            one-time license for lifetime access and unlimited client projects.
          </p>
        </section>

        {/* Pricing Toggle Hint */}
        <section className="mt-10 grid gap-6 lg:grid-cols-[2fr,1.5fr] items-start">
          {/* Plans */}
          <div className="space-y-6">
            {/* Monthly Plan */}
            <Card className="border border-border bg-card/90 backdrop-blur-xl shadow-sm">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ConsistentBadge variant="outline">
                      Recommended
                    </ConsistentBadge>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      For growing agencies
                    </span>
                  </div>
                  <CardTitle className="text-2xl">Monthly License</CardTitle>
                  <CardDescription className="text-sm">
                    Launch Dream Chat for your agency and clients with a simple,
                    flexible subscription.
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-end justify-end gap-1 text-xs text-muted-foreground">
                    <span className="line-through">
                      ${originalMonthlyPrice.toFixed(2)}
                    </span>
                    <ConsistentBadge variant="secondary">
                      Save {monthlyDiscount}%
                    </ConsistentBadge>
                  </div>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-4xl font-extrabold tracking-tighter">
                      {monthlyPrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      /month
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  asChild
                  className="w-full gap-2 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary"
                  size="lg"
                >
                  <Link href="/api/polar/checkout?products=MONTHLY_PRODUCT_ID">
                    Start monthly license
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {FEATURES_MONTHLY.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 leading-snug"
                    >
                      <CheckCircle2 className="mt-[2px] h-4 w-4 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* One-time Plan */}
            <Card className="border border-primary/40 bg-card/95 backdrop-blur-xl shadow-md">
              <CardHeader className="flex flex-row items-start justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ConsistentBadge variant="primary">
                      Lifetime Agency License
                    </ConsistentBadge>
                    <span className="text-[10px] uppercase tracking-[0.16em] text-primary">
                      Best value
                    </span>
                  </div>
                  <CardTitle className="text-2xl">
                    One-Time License
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Pay once, deploy Dream Chat across all client projects with
                    no recurring license fees.
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="flex items-end justify-end gap-1 text-xs text-muted-foreground">
                    <span className="line-through">
                      ${yearlyPrice.toFixed(2)}
                    </span>
                    <ConsistentBadge variant="outline">
                      Save {oneTimeDiscount}%
                    </ConsistentBadge>
                  </div>
                  <div className="flex items-baseline justify-end gap-1">
                    <span className="text-4xl font-extrabold tracking-tighter">
                      {oneTimePrice.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      lifetime
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full gap-2 rounded-full"
                >
                  <Link href="/api/polar/checkout?products=ONETIME_PRODUCT_ID">
                    Get lifetime access
                    <Infinity className="h-4 w-4" />
                  </Link>
                </Button>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {FEATURES_ONETIME.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 leading-snug"
                    >
                      <CheckCircle2 className="mt-[2px] h-4 w-4 text-emerald-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Included with all plans */}
          <div className="space-y-4">
            <Card className="border border-border bg-card/85 backdrop-blur-xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <ConsistentBadge variant="outline" className="text-[10px]">
                    For agencies, studios & product teams
                  </ConsistentBadge>
                </div>
                <CardTitle className="text-xl mt-2">
                  Every plan includes
                </CardTitle>
                <CardDescription className="text-sm">
                  Ship a polished AI Voice Agent experience with zero design or infra
                  overhead.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {FEATURES_ALL.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 leading-snug"
                    >
                      <CheckCircle2 className="mt-[2px] h-4 w-4 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-dashed border-border bg-muted/40 backdrop-blur-md">
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Deploy in under 15 minutes</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>No shared keys. Your clients use their own Vapi keys.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Zap className="h-3.5 w-3.5" />
                  <span>Optimized for modern AI workflows and streaming UX.</span>
                </div>
              </CardHeader>
            </Card>
          </div>
        </section>

        {/* FAQ / Clarifications */}
        <section className="mt-16 grid gap-6 lg:grid-cols-3">
          <Card className="border border-border bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">
                  How does licensing work?
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Monthly gives you an active license while subscribed. The
                one-time option grants a lifetime agency license for use across
                your client projects.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">
                  Is Dream Chat self-hosted?
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Yes. You host the application, control deployment, and integrate
                directly with your clients&apos; Vapi assistants using their own
                keys.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card/80 backdrop-blur-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">
                  Can I white-label completely?
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>
                Absolutely. Swap logos, colors, and copy to match any brand.
                Dream Chat is designed for full white-label usage.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Final CTA */}
        <section className="mt-16">
          <Card className="border border-border bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-xl">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-2xl md:text-3xl">
                Choose your path and launch in minutes
              </CardTitle>
              <CardDescription className="max-w-2xl mx-auto text-sm md:text-base">
                Whether you are testing the waters or standardizing a white-label
                AI Voice Platform offering, Dream Chat gives you a fast, polished, and
                theme-aware experience your clients can trust.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto gap-2 rounded-full"
              >
                <Link href="/api/polar/checkout?products=MONTHLY_PRODUCT_ID">
                  Start monthly
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto gap-2 rounded-full"
              >
                <Link href="/api/polar/checkout?products=ONETIME_PRODUCT_ID">
                  Get lifetime license
                  <Infinity className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}