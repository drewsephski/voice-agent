import { cn } from "@/lib/utils";
import { Badge, type BadgeVariant } from "@/components/ui/badge";

type ExtendedVariant = BadgeVariant | 'primary' | 'destructive';

interface ConsistentBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: ExtendedVariant;
  asChild?: boolean;
}

export function ConsistentBadge({ 
  className,
  variant = 'secondary',
  asChild = false,
  ...props 
}: ConsistentBadgeProps) {
  const variantMap: Record<ExtendedVariant, string> = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-muted/40 text-foreground/80 border-border/50 hover:bg-muted/60",
    outline: "border-border/50 hover:bg-muted/20 text-foreground",
    destructive: "bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15",
    primary: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/15"
  };

  // Map our extended variants to standard badge variants
  const badgeVariant: BadgeVariant = 
    variant === 'primary' || variant === 'destructive' ? 'outline' : variant;

  return (
    <Badge
      variant={badgeVariant}
      className={cn(
        "px-3 py-1.5 text-xs font-medium tracking-[0.16em] uppercase rounded-full border transition-colors",
        variantMap[variant] || variantMap.secondary,
        className
      )}
      asChild={asChild}
      {...props}
    />
  );
}
