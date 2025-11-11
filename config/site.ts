export type NavVariant =
  | "link"
  | "button"
  | "outline"
  | "ghost"
  | "secondary";

export interface BaseNavItem {
  label: string;
  href: string;
  variant?: NavVariant;
  authOnly?: boolean;
  guestOnly?: boolean;
  external?: boolean;
}

export type PrimaryNavItem = BaseNavItem;

export type CtaItem = BaseNavItem;

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  nav: {
    primary: PrimaryNavItem[];
    auth: {
      signIn: CtaItem;
      signUp: CtaItem;
      dashboard: CtaItem;
    };
  };
}

export const siteConfig: SiteConfig = {
  siteName: "Dream Chat",
  siteDescription:
    "A starter for AI-powered chat experiences with Polar billing and Clerk authentication.",
  nav: {
    primary: [
      { label: "Features", href: "/features", variant: "link" },
      { label: "Pricing", href: "/pricing", variant: "link" },
      { label: "About", href: "/about", variant: "link" },
    ],
    auth: {
      signIn: {
        label: "Sign in",
        href: "/sign-in",
        variant: "outline",
        guestOnly: true,
      },
      signUp: {
        label: "Sign up",
        href: "/sign-up",
        variant: "button",
        guestOnly: true,
      },
      dashboard: {
        label: "Dashboard",
        href: "/dashboard",
        variant: "outline",
        authOnly: true,
      },
    },
  },
};