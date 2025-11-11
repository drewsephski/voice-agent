import "./globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { ClerkProvider } from '@clerk/nextjs';
import { Header } from "@/components/ui/header-2";
import { LenisProvider } from '@/components/providers/lenis-provider';
import { Footer } from '@/components/ui/footer';

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Dream Chat",
  description: "Dark, modern AI chat with integrated pricing.",
};

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="theme"
    >
      {children}
    </ThemeProvider>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    // Context7-guided debug log to ensure env wiring is correct at build/runtime
    console.warn(
      "[Clerk Debug] NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing. " +
        "ClerkProvider cannot initialize. Check .env.local and restart dev server."
    );
  }

  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      appearance={{
        // Align with Clerk Next.js App Quickstart guidance
        // and avoid Tailwind layer conflicts if using v4+
        cssLayerName: "clerk",
        baseTheme: undefined,
      }}
    >
      <html suppressHydrationWarning lang="en">
        <body
          className={cn(
            bricolage.variable,
            "bg-background text-foreground antialiased font-sans",
          )}
        >
          <ThemeWrapper>
            <LenisProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </LenisProvider>
          </ThemeWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
