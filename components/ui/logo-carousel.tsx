"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type LogoItem = {
  id: number | string;
  name: string;
  img: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export interface LogoCarouselProps {
  logos: LogoItem[];
  columnCount?: number;
  className?: string;
}

export const LogoCarousel: React.FC<LogoCarouselProps> = ({
  logos,
  columnCount = 4,
  className,
}) => {
  const safeColumnCount = Math.max(1, columnCount);
  const limitedLogos =
    logos.length > safeColumnCount * 2
      ? logos.slice(0, safeColumnCount * 2)
      : logos;

  return (
    <div
      className={cn(
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8 items-center",
        className
      )}
    >
      {limitedLogos.map((logo) => {
        const Icon = logo.img;
        return (
          <div
            key={logo.id}
            className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity duration-200"
          >
            <Icon
              aria-label={logo.name}
              className="h-6 md:h-8 w-auto text-foreground/80 fill-current"
            />
          </div>
        );
      })}
    </div>
  );
};

/**
 * Inline SVG logo icons
 * Minimal, theme-aware where possible. No external assets.
 */

const AppleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-current", props.className)}
  >
    <path d="M16.365 1.43c0 1.14-.417 2.058-1.25 2.86-.9.86-1.98 1.36-3.167 1.28-.04-1.1.43-2.09 1.28-2.88.43-.41.97-.76 1.6-1.02.32-.13.65-.22.99-.27.04.34.07.67.07 1.03Zm3.26 6.56c-.06-.05-1.86-1.42-3.68-1.42-.98 0-1.87.37-2.64.37-.81 0-1.78-.36-2.64-.36-1.87 0-3.56 1.44-4.51 3.66-.16.37-.3.75-.4 1.14-.42 1.64-.18 3.75.62 5.41.46.96 1.07 1.82 1.82 2.47.71.62 1.5.99 2.33.99.86 0 1.42-.32 2.14-.32.75 0 1.22.32 2.14.32.83 0 1.63-.39 2.34-1.02.71-.64 1.27-1.52 1.74-2.5.3-.62.54-1.27.7-1.94.03-.11.06-.22.08-.33-.09-.03-1.57-.59-1.59-2.3-.02-1.44 1.13-2.12 1.18-2.15Z" />
  </svg>
);

const SupabaseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-emerald-500", props.className)}
  >
    <path d="M4.5 3.5c0-.83.67-1.5 1.5-1.5h9.38c1.2 0 1.86 1.37 1.15 2.33L12.4 11.5h5.6c1.2 0 1.86 1.37 1.15 2.33l-5.33 7.17c-.79 1.06-2.46.5-2.46-.86V13.5H6c-.83 0-1.5-.67-1.5-1.5V3.5Z" />
  </svg>
);

const VercelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-foreground", props.className)}
  >
    <path d="M12 3L1 21h22L12 3z" />
  </svg>
);

const LowesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 32 12"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-current", props.className)}
  >
    <rect x="1" y="3" width="30" height="6" rx="1.5" />
  </svg>
);

const AllyLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-purple-500", props.className)}
  >
    <circle cx="10" cy="10" r="8" />
  </svg>
);

const PierreIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-sky-500", props.className)}
  >
    <rect x="4" y="4" width="12" height="12" rx="3" />
  </svg>
);

const BMWIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-current", props.className)}
  >
    <circle cx="10" cy="10" r="8" className="stroke-current" />
    <path d="M10 3v14M3 10h14" className="stroke-current" />
  </svg>
);

const ClaudeAIIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-amber-500", props.className)}
  >
    <circle cx="12" cy="12" r="7" />
  </svg>
);

const NextjsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-current", props.className)}
  >
    <circle cx="12" cy="12" r="9" className="fill-background" />
    <path d="M4 5l9 14h2L6 5h-2z" />
    <path d="M14 5h2v7h-2z" />
  </svg>
);

const TailwindCSSIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-sky-400", props.className)}
  >
    <path d="M4 10c1.333-2.667 3.333-4 6-4 4 0 4 3 6 3 1.333 0 2.667-.667 4-2-1.333 2.667-3.333 4-6 4-4 0-4-3-6-3-1.333 0-2.667.667-4 2Z" />
    <path d="M4 16c1.333-2.667 3.333-4 6-4 4 0 4 3 6 3 1.333 0 2.667-.667 4-2-1.333 2.667-3.333 4-6 4-4 0-4-3-6-3-1.333 0-2.667.667-4 2Z" />
  </svg>
);

const UpstashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-emerald-500", props.className)}
  >
    <path d="M4 10a6 6 0 0 1 6-6h2v3h-2a3 3 0 1 0 0 6h2v3h-2a6 6 0 0 1-6-6Z" />
  </svg>
);

const TypeScriptIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 20 20"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-sky-500", props.className)}
  >
    <rect x="2" y="4" width="16" height="12" rx="2" />
    <path
      d="M6 9h2v6H6v-6Zm3 0h5v2h-1.5c.5.3.8.8.8 1.4 0 1.1-.9 1.9-2.2 1.9-.8 0-1.5-.3-2-.8l.9-1.3c.3.3.6.4 1 .4.4 0 .7-.2.7-.6 0-.4-.3-.6-.9-.6H9V9Z"
      className="fill-background"
    />
  </svg>
);

const StripeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-indigo-500", props.className)}
  >
    <rect x="3" y="7" width="18" height="10" rx="3" />
  </svg>
);

const OpenAIIconBlack: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    viewBox="0 0 24 24"
    role="img"
    aria-hidden="true"
    {...props}
    className={cn("fill-current", props.className)}
  >
    <circle cx="12" cy="12" r="9" />
    <path
      d="M12 6v6l4 2"
      className="stroke-background"
      strokeWidth="1.4"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Exported logos dataset for reuse on the Features page.
 */
export const allLogos: LogoItem[] = [
  { id: "apple", name: "Apple", img: AppleIcon },
  { id: "supabase", name: "Supabase", img: SupabaseIcon },
  { id: "vercel", name: "Vercel", img: VercelIcon },
  { id: "lowes", name: "Lowe's", img: LowesIcon },
  { id: "ally", name: "Ally", img: AllyLogo },
  { id: "pierre", name: "Pierre", img: PierreIcon },
  { id: "bmw", name: "BMW", img: BMWIcon },
  { id: "claude", name: "Claude AI", img: ClaudeAIIcon },
  { id: "nextjs", name: "Next.js", img: NextjsIcon },
  { id: "tailwind", name: "Tailwind CSS", img: TailwindCSSIcon },
  { id: "upstash", name: "Upstash", img: UpstashIcon },
  { id: "typescript", name: "TypeScript", img: TypeScriptIcon },
  { id: "stripe", name: "Stripe", img: StripeIcon },
  { id: "openai", name: "OpenAI", img: OpenAIIconBlack },
];
