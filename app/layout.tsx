import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dream Chat",
  description: "Dark, modern AI chat with integrated pricing.",
};

function ThemeToggle() {
  // Inline client component for header toggle
  if (typeof window === "undefined") return null;
  // Lazy import next-themes hook to avoid server usage
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { useTheme } = require("next-themes");
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark" || theme === "system";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border text-xs transition-colors",
        "border-zinc-700/70 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800",
        "dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:text-zinc-100",
      )}
      aria-label="Toggle theme"
    >
      {isDark ? "☾" : "☼"}
    </button>
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
