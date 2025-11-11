"use client";

import { useEffect, useRef, useState } from "react";
import DemoHero from "@/components/ui/demo-hero";
import { Pricing } from "@/components/ui/single-pricing-card-1";
import { MainLayout } from "@/components/home/main-layout";

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
      setLastError(
        "Sorry, Dream encountered an error while contacting your assistant."
      );
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

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/20 to-background text-foreground">
      <DemoHero />
      <MainLayout
        messages={messages}
        isConfigured={isConfigured}
        hasMessages={hasMessages}
        isLoading={isLoading}
        lastError={lastError}
        input={input}
        apiKey={apiKey}
        assistantId={assistantId}
        onInputChange={setInput}
        onApiKeyChange={setApiKey}
        onAssistantIdChange={setAssistantId}
        onKeyPress={handleKeyPress}
        onSend={sendMessage}
        messagesEndRef={messagesEndRef}
      />
      <div className="border-t border-border">
        <Pricing />
      </div>
    </div>
  );
}

export type { Message };
