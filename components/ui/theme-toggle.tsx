"use client";

import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();

  const resolvedTheme =
    theme === "system" || !theme ? systemTheme ?? "dark" : theme;
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-8 w-8 items-center justify-center rounded-full border text-[0px] transition-colors",
        "border-zinc-700/60 bg-zinc-900/80 text-zinc-200 hover:bg-zinc-800",
        "dark:border-zinc-700/80 dark:bg-zinc-900/90 dark:text-zinc-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
      aria-label="Toggle theme"
    >
      <span aria-hidden="true">
        {isDark ? (
          <Moon className="h-4 w-4" />
        ) : (
          <Sun className="h-4 w-4" />
        )}
      </span>
    </button>
  );
}