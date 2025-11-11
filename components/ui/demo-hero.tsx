"use client";

import React from "react";
import { GridBeam } from "@/components/ui/background-grid-beam";

/**
 * DemoHero
 *
 * Primary hero, aligned to the same max-width and spacing system
 * as the main layout/sections in [app/page.tsx](app/page.tsx:1).
 * Uses GridBeam for full-width background while constraining text
 * within a centered container.
 */
const DemoHero: React.FC = () => {
  return (
    <section className="w-full">
      <GridBeam className="flex items-center justify-center pt-24 pb-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4 text-left">
            <h1 className="text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground">
              Create Voice Agents That Convert.
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Build voice agents that convert. Drop in your API keys, paste your
              assistant ID, and get started. Hand clients a production UX they&apos;ll actually
              love using. 
            </p>
          </div>
        </div>
      </GridBeam>
    </section>
  );
};

export default DemoHero;