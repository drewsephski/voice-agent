"use client";

import React from "react";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Loader2,
  Send,
  User,
} from "lucide-react";
import type { Message } from "@/app/page";

export interface ChatSectionProps {
  messages: Message[];
  isConfigured: boolean;
  hasMessages: boolean;
  isLoading: boolean;
  lastError: string | null;
  input: string;
  onInputChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatSection(props: ChatSectionProps) {
  const {
    messages,
    isConfigured,
    hasMessages,
    isLoading,
    lastError,
    input,
    onInputChange,
    onKeyPress,
    onSend,
    messagesEndRef,
  } = props;

  return (
    <section className="flex min-w-0 flex-1 flex-col">
      {/* Card fills its grid cell to align heights with side columns */}
      <Card className="flex h-full flex-col border border-border/70 bg-card/95 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.45)]">
        <CardHeader className="flex flex-row items-center justify-between gap-3">
          <div>
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Image
                src="/dream.png"
                alt="Dream Logo"
                width={28}
                height={28}
                className="h-7 w-7 rounded-full object-cover"
              />
              <span className="text-foreground">Chat</span>
            </CardTitle>
            <CardDescription className="text-xs md:text-sm text-muted-foreground">
              Connects directly to your Vapi assistant using your own keys.
            </CardDescription>
          </div>
          {isConfigured && (
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-600 dark:text-emerald-300">
              <CheckCircle2 className="h-3 w-3" />
              Ready
            </div>
          )}
        </CardHeader>

        <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden">
          <div className="relative flex-1 space-y-3 pr-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {!hasMessages ? (
              <EmptyChatState isConfigured={isConfigured} />
            ) : (
              <ChatMessages messages={messages} />
            )}
            {isLoading && <ChatLoadingMessage />}
            <div ref={messagesEndRef} />
          </div>

          {lastError && <ErrorBanner message={lastError} />}

          <Composer
            input={input}
            isConfigured={isConfigured}
            isLoading={isLoading}
            onInputChange={onInputChange}
            onKeyPress={onKeyPress}
            onSend={onSend}
          />
        </CardContent>
      </Card>
    </section>
  );
}

function EmptyChatState({ isConfigured }: { isConfigured: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-sm text-muted-foreground">
      <div className="inline-flex h-48 w-48 items-center justify-center rounded-2xl bg-primary/15 shadow-sm">
        <Image
          src="/dream.png"
          alt="Dream Logo"
          width={500}
          height={500}
          className="h-48 w-48 rounded-lg object-cover"
        />
      </div>
      <div className="space-y-1">
        <p>
          {isConfigured
            ? "Your assistant is connected. Ask anything to see Dream stream responses in real time."
            : "Add your Vapi API key and Assistant ID to begin chatting with your assistant."}
        </p>
      </div>
    </div>
  );
}

function ChatMessages({ messages }: { messages: Message[] }) {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex max-w-[85%] items-start gap-2 ${
              message.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Avatar>
              <AvatarFallback
                className={
                  message.role === "user"
                    ? "bg-primary/80 text-primary-foreground"
                    : "bg-muted text-muted-foreground border border-border"
                }
              >
                {message.role === "user" ? (
                  <User className="h-3.5 w-3.5" />
                ) : (
                  <Bot className="h-3.5 w-3.5" />
                )}
              </AvatarFallback>
            </Avatar>
            <div
              className={`rounded-2xl border px-3 py-2 text-xs md:text-sm leading-relaxed shadow-sm ${
                message.role === "user"
                  ? "border-primary/40 bg-primary/20 text-foreground"
                  : "border-border bg-muted/70 text-foreground"
              }`}
            >
              {message.content || (
                <span className="inline-flex items-center gap-1 text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Thinking...
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

function ChatLoadingMessage() {
  return (
    <div className="flex justify-start">
      <div className="flex max-w-[70%] items-start gap-2">
        <Avatar>
          <AvatarFallback className="bg-muted text-muted-foreground border border-border">
            <Bot className="h-3.5 w-3.5" />
          </AvatarFallback>
        </Avatar>
        <div className="rounded-2xl border border-border bg-muted/80 px-3 py-2 text-xs text-muted-foreground shadow-sm">
          <span className="inline-flex items-center gap-1.5">
            <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
            Dream is generating a reply...
          </span>
        </div>
      </div>
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[10px] text-red-600 dark:text-red-300">
      <AlertTriangle className="mt-[1px] h-3 w-3" />
      <p>{message}</p>
    </div>
  );
}

interface ComposerProps {
  input: string;
  isConfigured: boolean;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

function Composer(props: ComposerProps) {
  const { input, isConfigured, isLoading, onInputChange, onKeyPress, onSend } =
    props;

  return (
    <div className="mt-1 flex items-end gap-2 rounded-2xl border border-border bg-muted/90/95 px-3 py-2 shadow-sm">
      <Textarea
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={onKeyPress}
        placeholder={
          isConfigured
            ? "Ask your assistant anything... (Enter to send, Shift+Enter for newline)"
            : "Add your Vapi API key and Assistant ID on the right to start."
        }
        className="min-h-[40px] max-h-[120px] flex-1 resize-none border-0 bg-transparent px-0 py-1 text-xs md:text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        disabled={isLoading || !isConfigured}
      />
      <Button
        size="icon"
        className="h-9 w-9 rounded-full bg-primary/90 text-primary-foreground hover:bg-primary/80"
        disabled={!input.trim() || isLoading || !isConfigured}
        onClick={onSend}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}