"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export interface RightConfigColumnProps {
  apiKey: string;
  assistantId: string;
  isConfigured: boolean;
  onApiKeyChange: (value: string) => void;
  onAssistantIdChange: (value: string) => void;
}

export function RightConfigColumn(props: RightConfigColumnProps) {
  const {
    apiKey,
    assistantId,
    isConfigured,
    onApiKeyChange,
    onAssistantIdChange,
  } = props;

  return (
    <aside className="hidden w-72 flex-col gap-4 md:flex">
      <Card className="border border-border/60 bg-card/95 backdrop-blur-xl shadow-[0_16px_50px_rgba(15,23,42,0.4)]">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            Connect your assistant
          </CardTitle>
          <CardDescription className="text-xs text-muted-foreground">
            Dream never bundles shared keys. Enter your own Vapi credentials for
            this deployment.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1.5">
            <Label
              htmlFor="api-key"
              className="text-[10px] font-medium text-foreground"
            >
              Vapi API Key
            </Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="Paste your secret key"
              className="h-8 text-[10px] border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <div className="space-y-1.5">
            <Label
              htmlFor="assistant-id"
              className="text-[10px] font-medium text-foreground"
            >
              Assistant ID
            </Label>
            <Input
              id="assistant-id"
              value={assistantId}
              onChange={(e) => onAssistantIdChange(e.target.value)}
              placeholder="Paste your assistant ID"
              className="h-8 text-[10px] border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-2 space-y-1.5 text-[10px]">
            {isConfigured ? (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-emerald-600 dark:text-emerald-300">
                <CheckCircle2 className="h-3 w-3" />
                Connected to your assistant.
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-amber-600 dark:text-amber-200">
                <AlertTriangle className="h-3 w-3" />
                Add credentials to start.
              </div>
            )}
            <p className="text-muted-foreground/70">
              Create and manage assistants in your Vapi dashboard. This UI
              simply forwards your inputs securely.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/50 bg-card/90 backdrop-blur-xl shadow-[0_14px_40px_rgba(15,23,42,0.35)]">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            Implementation notes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1.5 text-[10px] text-muted-foreground">
          <p>
            To white-label: replace the Dream name, logo, and primary color
            accents, or wrap this page in your own layout.
          </p>
          <p>
            Backend remains unchanged:
            <code className="text-primary">/api/chat</code> proxies to
            <code className="ml-1 text-primary">
              https://api.vapi.ai/chat
            </code>
             , using provided keys.
          </p>
        </CardContent>
      </Card>

      {/* Direct Vapi CTA card */}
      <Card className="border border-border/40 bg-card/92 backdrop-blur-xl shadow-[0_12px_32px_rgba(15,23,42,0.28)]">
        <CardHeader>
          <CardTitle className="text-sm font-semibold text-foreground">
            Get your Vapi API keys
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-[10px] text-muted-foreground">
          <p>
            This template is built for agencies and teams who already trust Vapi for AI voice,
            but need a polished, white-label client console in days instead of weeks.
          </p>
          <p>
            Pain point solved: instead of shipping raw demos or internal tools, you hand clients
            a production-grade UI where they plug in their own Vapi keys and assistant IDs—no
            custom frontend sprint required.
          </p>
          <a
            href="https://vapi.ai"
            target="_blank"
            rel="noreferrer"
            className="mt-1 inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-[10px] font-medium text-primary hover:bg-primary/15 hover:text-primary-foreground transition-colors"
          >
            Go to Vapi dashboard to create your keys
          </a>
        </CardContent>
      </Card>
    </aside>
  );
}