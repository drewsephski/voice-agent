"use client";

export function BackgroundGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 size-full opacity-30"
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 size-full opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(var(--foreground-rgb), 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--foreground-rgb), 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at center, var(--background) 10%, transparent 70%)",
        }}
      />
    </div>
  );
}