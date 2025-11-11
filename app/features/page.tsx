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
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { LogoCarouselDemo } from "@/components/ui/feature-section-with-hover-effects";
import { GradientHeading } from "@/components/ui/gradient-heading";

export default function Features() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 md:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <ConsistentBadge variant="secondary">
            Features
          </ConsistentBadge>
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
            Everything you need to
            <span className="block text-primary">deploy AI Voice Agents with confidence</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Dream Chat ships a production-ready, white-label interface that lets agencies
            and teams launch premium AI experiences in minutes, not months.
          </p>
        </div>
      </section>

      {/* Modern Stack / Credibility Section */}
      <section className="w-full bg-background/40 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 space-y-6">
          <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
            Modern, proven stack
          </p>
          <GradientHeading
            size="xl"
            variant="secondary"
            className="mt-1"
          >
            Trusted patterns. Familiar tools. No black boxes.
          </GradientHeading>
          <p className="max-w-3xl text-sm md:text-base text-muted-foreground leading-relaxed">
            Dream Chat is built on Next.js, TypeScript, Tailwind CSS, shadcn/ui, and modern AI
            infrastructure so your deployments stay fast, observable, and maintainable across
            every client — using tools your team already knows and trusts.
          </p>
          {/* Reinforcing value-focused highlights */}
          <div className="grid gap-4 md:gap-6 md:grid-cols-3 pt-6">
            <Card className="h-full border-border/70 bg-background/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm md:text-base">
                  Frictionless, trusted access
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs md:text-sm text-muted-foreground">
                Secure, stress-free sign-in built in, so clients start using your AI workspace without confusion or extra setup.
              </CardContent>
            </Card>
            <Card className="h-full border-border/70 bg-background/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm md:text-base">
                  Revenue-ready out of the box
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs md:text-sm text-muted-foreground">
                Payments live where conversations happen, making it simple to charge for premium access without extra tools.
              </CardContent>
            </Card>
            <Card className="h-full border-border/70 bg-background/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm md:text-base">
                  One smart workspace
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs md:text-sm text-muted-foreground">
                An AI-first hub for chat, voice, and clients that replaces scattered widgets with one clear, on-brand experience.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <LogoCarouselDemo />

      {/* Value-Focused Feature Cards (Why teams choose Dream Chat) */}
      <section className="w-full bg-background/40 border-t border-border/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Why teams choose Dream Chat
            </p>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mt-2">
              One simple workspace instead of a messy stack
            </h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              Give your clients a polished AI Voice Agent, voice, and payment-ready experience without juggling six different tools,
              logins, and surprise fees.
            </p>
          </div>
          <div className="grid gap-4 md:gap-6 md:grid-cols-1 lg:grid-cols-3">
            <Card className="h-full border-border/70 bg-background/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg">
                  AI co-pilot that actually helps
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Guide users through answers, next steps, and decisions in a human way, reducing support work while keeping conversations on-brand.
              </CardContent>
            </Card>
            <Card className="h-full border-border/70 bg-background/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg">
                  Always-on voice agent
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Let a friendly voice handle FAQs, bookings, and lead capture 24/7 so your team only steps in when it truly matters.
              </CardContent>
            </Card>
            <Card className="h-full border-border/70 bg-background/70">
              <CardHeader className="pb-2">
                <CardTitle className="text-base md:text-lg">
                  Smarter value for your budget
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Replace $300+/mo patchwork stacks with one streamlined workspace that ships faster, looks better, and actually gets used.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
       <section className="relative mx-auto max-w-3xl px-4 pb-16 md:px-6 lg:px-8">
        <Card className="border border-border/80 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 backdrop-blur-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <Image
                src="/dream.png"
                alt="Dream Logo"
                width={64}
                height={64}
                className="h-16 w-16 rounded-xl object-cover shadow-sm"
              />
            </div>
            <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight">
              Ready to ship a premium AI Voice Agent experience?
            </CardTitle>
            <CardDescription className="text-sm md:text-base max-w-xl mx-auto text-muted-foreground">
              Use Dream Chat as your foundation, plug in your AI Voice Agents, and hand your
              clients a polished interface that is ready for production on day one.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/pricing">
                View pricing
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-border/80 bg-background/60"
            >
              <Link href="/about">Explore how it works</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}