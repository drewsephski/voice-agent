"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertTriangle,
  Bot,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Send,
  User,
} from "lucide-react";
import { Pricing } from "@/components/ui/single-pricing-card-1";
import Image from "next/image";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Dream() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [assistantId, setAssistantId] = useState("");
  const [lastError, setLastError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const isConfigured = Boolean(apiKey.trim() && assistantId.trim());
  const hasMessages = messages.length > 0;

  // Smooth scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isLoading]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !isConfigured) return;

    const userMessage: Message = {
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setLastError(null);

    // Placeholder assistant message for streaming
    const assistantMessage: Message = {
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, assistantMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage.content,
          apiKey,
          assistantId,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("Failed to get response");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      // Stream and progressively update the last assistant message
      // (AI Elements-style: conversation + message + loader pattern)
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n").filter((line) => line.trim());

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const data = JSON.parse(line.slice(6));
            if (data.delta) {
              accumulated += data.delta;
              setMessages((prev) => {
                const next = [...prev];
                const lastIndex = next.length - 1;
                if (lastIndex >= 0 && next[lastIndex].role === "assistant") {
                  next[lastIndex] = {
                    ...next[lastIndex],
                    content: accumulated,
                  };
                }
                return next;
              });
            }
          } catch (err) {
            console.error("Failed to parse streaming data:", err);
          }
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setLastError("Sorry, Dream encountered an error while contacting your assistant.");
      // Replace last assistant message content with error text
      setMessages((prev) => {
        const next = [...prev];
        const lastIndex = next.length - 1;
        if (lastIndex >= 0 && next[lastIndex].role === "assistant") {
          next[lastIndex] = {
            ...next[lastIndex],
            content:
              "Sorry, I encountered an error while generating a response. Please verify your credentials and try again.",
          };
        }
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-zinc-100">
      {/* Top-level Dream shell with sleek dark aesthetic */}
      <div className="relative mx-auto flex h-screen max-w-6xl gap-4 px-4 py-10 lg:gap-6 lg:px-6">
        {/* Subtle grid background to match pricing section */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 size-full opacity-40"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,253,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,253,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,rgba(15,23,42,0)_0%,black_55%,transparent_100%)]"
          />
        </div>
        {/* Left: Dream brand + onboarding */}
        <section className="hidden w-64 flex-col gap-4 md:flex">
          <Card className="border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold text-blue-200">
                Dream
              </CardTitle>
              <CardDescription className="text-zinc-400">
                White-label AI chat your clients can deploy in minutes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-zinc-400">
              <p>Plug into any Vapi assistant and hand this UI to your clients.</p>
              <ul className="space-y-1.5">
                <li>• Self-hosted and brandable.</li>
                <li>• Uses your client's own Vapi keys.</li>
                <li>• Modern, production-ready UX.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border border-zinc-800/70 bg-zinc-900/40 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-zinc-100">
                Quick start
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-zinc-400">
              <p>1. Paste your Vapi API key.</p>
              <p>2. Paste your Assistant ID.</p>
              <p>3. Start chatting with your assistant via Dream.</p>
              <p className="mt-2 text-[10px] text-zinc-500">
                Note: This interface never ships with a shared key. Each deployment provides its own credentials.
              </p>
            </CardContent>
          </Card>

          <Card className="border border-zinc-800/70 bg-zinc-950/60 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-zinc-100">
                White-label hooks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-zinc-400">
              <p>
                Replace the Dream name, logo, and colors in a single place to match any client brand.
              </p>
              <p>
                All logic is isolated so agencies can resell this safely and repeatedly.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Center: Conversation */}
        <section className="flex min-w-0 flex-1 flex-col gap-4">
          <Card className="flex flex-1 flex-col border border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl shadow-[0_0_80px_rgba(15,23,42,0.7)]">
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
                  <span className="text-zinc-50">Chat</span>
                </CardTitle>
                <CardDescription className="text-xs md:text-sm text-zinc-400">
                  Connects directly to your Vapi assistant using your own keys.
                </CardDescription>
              </div>
              {isConfigured && (
                <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-medium text-emerald-300">
                  <CheckCircle2 className="h-3 w-3" />
                  Ready
                </div>
              )}
            </CardHeader>

            <CardContent className="flex flex-1 flex-col gap-4 overflow-hidden">
              {/* Conversation list */}
              <div className="relative flex-1 space-y-3 pr-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {!hasMessages ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-sm text-zinc-400">
                    <div className="inline-flex h-48 w-48 items-center justify-center rounded-2xl bg-indigo-500/15 shadow-[0_0_40px_rgba(79,70,229,0.35)]">
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
                ) : (
                  <>
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`flex max-w-[85%] items-start gap-2 ${
                            message.role === "user"
                              ? "flex-row-reverse"
                              : "flex-row"
                          }`}
                        >
                          <Avatar>
                            <AvatarFallback
                              className={
                                message.role === "user"
                                  ? "bg-indigo-500/80 text-zinc-50"
                                  : "bg-zinc-900 text-zinc-300 border border-zinc-800/80"
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
                                ? "border-indigo-500/40 bg-indigo-500/20 text-zinc-50"
                                : "border-zinc-800/80 bg-zinc-900/70 text-zinc-100"
                            }`}
                          >
                            {message.content || (
                              <span className="inline-flex items-center gap-1 text-zinc-400">
                                <Loader2 className="h-3 w-3 animate-spin" />
                                Thinking...
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="flex max-w-[70%] items-start gap-2">
                          <Avatar>
                            <AvatarFallback className="bg-zinc-900 text-zinc-300 border border-zinc-800/80">
                              <Bot className="h-3.5 w-3.5" />
                            </AvatarFallback>
                          </Avatar>
                          <div className="rounded-2xl border border-zinc-800/70 bg-zinc-900/80 px-3 py-2 text-xs text-zinc-400 shadow-sm">
                            <span className="inline-flex items-center gap-1.5">
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-400" />
                              Dream is generating a reply...
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Error surface */}
              {lastError && (
                <div className="flex items-start gap-2 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-[10px] text-red-300">
                  <AlertTriangle className="mt-[1px] h-3 w-3" />
                  <p>{lastError}</p>
                </div>
              )}

              {/* Composer */}
              <div className="mt-1 flex items-end gap-2 rounded-2xl border border-zinc-800/80 bg-zinc-950/90 px-3 py-2 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={
                    isConfigured
                      ? "Ask your assistant anything... (Enter to send, Shift+Enter for newline)"
                      : "Add your Vapi API key and Assistant ID on the right to start."
                  }
                  className="min-h-[40px] max-h-[120px] flex-1 resize-none border-0 bg-transparent px-0 py-1 text-xs md:text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                  disabled={isLoading || !isConfigured}
                />
                <Button
                  size="icon"
                  className="h-9 w-9 rounded-full bg-indigo-500/90 text-zinc-50 hover:bg-indigo-400/90 shadow-[0_0_30px_rgba(79,70,229,0.6)]"
                  disabled={!input.trim() || isLoading || !isConfigured}
                  onClick={sendMessage}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Right: Configuration + status */}
        <aside className="hidden w-72 flex-col gap-3 md:flex">
          <Card className="border border-zinc-800/80 bg-zinc-950/85 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-zinc-100">
                Connect your assistant
              </CardTitle>
              <CardDescription className="text-xs text-zinc-400">
                Dream never bundles shared keys. Enter your own Vapi credentials
                for this deployment.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="api-key" className="text-[10px] font-medium text-zinc-300">
                  Vapi API Key
                </Label>
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Paste your secret key"
                  className="h-8 text-[10px] border-zinc-800/80 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="assistant-id"
                  className="text-[10px] font-medium text-zinc-300"
                >
                  Assistant ID
                </Label>
                <Input
                  id="assistant-id"
                  value={assistantId}
                  onChange={(e) => setAssistantId(e.target.value)}
                  placeholder="Paste your assistant ID"
                  className="h-8 text-[10px] border-zinc-800/80 bg-zinc-950/80 text-zinc-100 placeholder:text-zinc-600"
                />
              </div>

              <div className="mt-2 space-y-1.5 text-[10px]">
                {isConfigured ? (
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" />
                    Connected to your assistant.
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-amber-200">
                    <AlertTriangle className="h-3 w-3" />
                    Add credentials to start.
                  </div>
                )}
                <p className="text-zinc-500">
                  Create and manage assistants in your Vapi dashboard. This UI simply forwards your inputs securely.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-zinc-800/70 bg-zinc-950/70 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-zinc-100">
                Implementation notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 text-[10px] text-zinc-400">
              <p>
                To white-label: replace the Dream name, logo, and primary color accents, or wrap this page in your own layout.
              </p>
              <p>
                Backend remains unchanged: <code className="text-indigo-300">/api/chat</code> proxies to
                <code className="ml-1 text-indigo-300">https://api.vapi.ai/chat</code> using provided keys.
              </p>
      {/* Pricing section on landing page */}
      <section className="mt-24">
        {/* Import-level component reference */}
      </section>
            </CardContent>
          </Card>
        </aside>
      </div>

      {/* Landing page pricing section */}
      <div className="border-t border-zinc-900/80 ">
        <Pricing />
      </div>
    </div>
  );
}
