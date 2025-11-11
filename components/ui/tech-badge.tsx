import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Cpu, Zap, Code2, Terminal, DollarSign } from "lucide-react";
import React from "react";

type TechBadgeVariant = 'default' | 'secondary' | 'outline' | 'destructive' | 'premium';

interface TechBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TechBadgeVariant;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

const defaultIcons = {
  default: <Code2 className="h-3.5 w-3.5" />,
  secondary: <Cpu className="h-3.5 w-3.5" />,
  outline: <Terminal className="h-3.5 w-3.5" />,
  destructive: <Zap className="h-3.5 w-3.5" />,
  premium: <DollarSign className="h-3.5 w-3.5" />,
};

export function TechBadge({
  variant = 'default',
  icon,
  iconPosition = 'left',
  className,
  children,
  ...props
}: TechBadgeProps) {
  const variantStyles = {
    default: 'bg-primary/10 text-primary border-primary/20 hover:bg-primary/15',
    secondary: 'bg-muted/40 text-foreground/80 border-border/50 hover:bg-muted/60',
    outline: 'border-border/50 hover:bg-muted/20 text-foreground',
    destructive: 'bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive/15',
    premium: 'py-0.5 px-2 mb-1 bg-gradient-to-r from-green-500/10 to-green-500/10 text-green-400 border-green-500/20 hover:from-green-500/15 hover:to-green-500/15',
  };

  const selectedIcon = icon || defaultIcons[variant] || defaultIcons.default;

  return (
    <Badge
      variant="outline"
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {iconPosition === 'left' && selectedIcon}
      {children}
      {iconPosition === 'right' && selectedIcon}
    </Badge>
  );
}
