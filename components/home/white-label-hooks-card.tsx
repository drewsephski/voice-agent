"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function WhiteLabelHooksCard() {
  return (
    <Card className="border border-border bg-card/60 backdrop-blur-md md:col-span-2">
      <CardHeader>
        <CardTitle className="text-sm font-semibold text-foreground">
          White-label hooks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-xs text-muted-foreground">
        <p>
          Replace the Dream name, logo, and colors in a single place to match
          any client brand.
        </p>
        <p>
          All logic is isolated so agencies can resell this safely and
          repeatedly.
        </p>
      </CardContent>
    </Card>
  );
}