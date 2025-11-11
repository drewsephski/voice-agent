import * as React from "react";
import { cn } from "@/lib/utils";

type GradientHeadingSize = "sm" | "md" | "lg" | "xl" | "xxl";
type GradientHeadingVariant = "primary" | "secondary";

export interface GradientHeadingProps {
  children: React.ReactNode;
  size?: GradientHeadingSize;
  variant?: GradientHeadingVariant;
  className?: string;
  as?: "h2" | "div";
}

const sizeClasses: Record<GradientHeadingSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-2xl",
  xl: "text-3xl",
  xxl: "text-4xl md:text-5xl",
};

const variantClasses: Record<GradientHeadingVariant, string> = {
  primary: "bg-gradient-to-r from-primary via-primary/80 to-primary/40",
  secondary:
    "bg-gradient-to-r from-muted-foreground via-foreground to-primary/60",
};

export const GradientHeading: React.FC<GradientHeadingProps> = ({
  children,
  size = "lg",
  variant = "primary",
  className,
  as = "h2",
}) => {
  const Comp = as;

  return (
    <Comp
      className={cn(
        "bg-clip-text text-transparent font-semibold tracking-tight",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </Comp>
  );
};