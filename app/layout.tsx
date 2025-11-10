import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dream Chat",
  description: "Dark, modern AI chat with integrated pricing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={cn(
          inter.className,
          "bg-background text-foreground antialiased",
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/70 backdrop-blur-md">
              <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 lg:px-6">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/15 text-primary text-xs font-semibold">
                    D
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-sm font-semibold">Dream</span>
                    <span className="text-[10px] text-muted-foreground">
                      AI chat & pricing
                    </span>
                  </div>
                </div>
                <ThemeToggle />
              </div>
            </header>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
