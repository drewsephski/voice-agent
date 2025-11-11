"use client";

import { BackgroundGrid } from "@/components/home/background-grid";
import { LeftInfoColumn } from "@/components/home/left-info-column";
import { ChatSection } from "@/components/home/chat-section";
import { RightConfigColumn } from "@/components/home/right-config-column";
import type { Message } from "@/app/page";

export interface MainLayoutProps {
  messages: Message[];
  isConfigured: boolean;
  hasMessages: boolean;
  isLoading: boolean;
  lastError: string | null;
  input: string;
  apiKey: string;
  assistantId: string;
  onInputChange: (value: string) => void;
  onApiKeyChange: (value: string) => void;
  onAssistantIdChange: (value: string) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function MainLayout(props: MainLayoutProps) {
  const {
    messages,
    isConfigured,
    hasMessages,
    isLoading,
    lastError,
    input,
    apiKey,
    assistantId,
    onInputChange,
    onApiKeyChange,
    onAssistantIdChange,
    onKeyPress,
    onSend,
    messagesEndRef,
  } = props;

  return (
    <div className="relative mx-auto max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
      {/* Pricing-style subtle grid background */}
      <BackgroundGrid />
      {/* Side-by-side 3-column layout on desktop, stacked on mobile */}
      <div className="flex w-full flex-col gap-4 md:flex-row md:items-stretch md:gap-4 lg:gap-6">
        {/* Left column: fixed width */}
        <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col">
          <LeftInfoColumn />
        </div>

        {/* Center column: flexible */}
        <div className="w-full md:flex-1 flex flex-col">
          <ChatSection
            messages={messages}
            isConfigured={isConfigured}
            hasMessages={hasMessages}
            isLoading={isLoading}
            lastError={lastError}
            input={input}
            onInputChange={onInputChange}
            onKeyPress={onKeyPress}
            onSend={onSend}
            messagesEndRef={messagesEndRef}
          />
        </div>

        {/* Right column: fixed width */}
        <div className="w-full md:w-[260px] flex-shrink-0 flex flex-col">
          <RightConfigColumn
            apiKey={apiKey}
            assistantId={assistantId}
            isConfigured={isConfigured}
            onApiKeyChange={onApiKeyChange}
            onAssistantIdChange={onAssistantIdChange}
          />
        </div>
      </div>
    </div>
  );
}