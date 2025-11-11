import "./globals.css";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { Header } from "@/components/ui/header-2";
import { ClerkProvider } from '@clerk/nextjs'  
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
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          bricolage.variable,
          "bg-background text-foreground antialiased font-sans",
        )}
      >
        <ClerkProvider>
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
        </ClerkProvider>
      </body>
    </html>
  );
}
