'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { useEffect, useRef } from 'react';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import {
  Message as AIMessage,
  MessageContent,
  MessageResponse,
} from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputBody,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from '@/components/ai-elements/prompt-input';
import {
  Suggestions,
  Suggestion,
} from '@/components/ai-elements/suggestion';
import { Loader } from '@/components/ai-elements/loader';

type UIPart =
  | { type: 'text'; text: string }
  | { type: 'data-weather'; data: { status: string; city: string; weather?: string } }
  | { type: 'source-url'; url: string; title: string }
  | { type: string; [key: string]: unknown };

type UIMessageWithParts = UIMessage & {
  parts: UIPart[];
};

function getTextFromParts(message: UIMessageWithParts): string {
  return message.parts
    .filter((part) => part.type === 'text')
    .map((part) => ('text' in part ? part.text : ''))
    .join('');
}

function MessagePartsRenderer({ message }: { message: UIMessageWithParts }) {
  const textContent = getTextFromParts(message);

  return (
    <div className="flex flex-col gap-1">
      {textContent && (
        <div
          data-part-type="text"
          data-message-id={message.id}
          className="prose prose-invert max-w-none text-sm leading-relaxed"
        >
          <MessageResponse>{textContent}</MessageResponse>
        </div>
      )}

      {message.parts
        .filter((part) => part.type === 'data-weather')
        .map((part, index) => {
          const p = part as Extract<UIPart, { type: 'data-weather' }>;
          return (
            <div
              key={`weather-${message.id}-${index}`}
              data-part-type="data-weather"
              className="mt-1 rounded-md border border-border/60 bg-muted/40 px-2 py-1 text-xs text-muted-foreground"
            >
              {p.data.status === 'loading'
                ? `Getting weather for ${p.data.city}...`
                : `Weather in ${p.data.city}: ${p.data.weather ?? ''}`}
            </div>
          );
        })}

      {message.parts
        .filter((part) => part.type === 'source-url')
        .map((part, index) => {
          const p = part as Extract<UIPart, { type: 'source-url' }>;
          return (
            <div
              key={`source-${message.id}-${index}`}
              data-part-type="source"
              className="mt-1 text-[10px] text-muted-foreground"
            >
              Source:{' '}
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                className="underline"
              >
                {p.title}
              </a>
            </div>
          );
        })}
    </div>
  );
}

export default function ChatPage() {
  const {
    messages,
    sendMessage,
    status,
    stop,
  } = useChat<UIMessageWithParts>({
    id: 'dashboard-openrouter-chat',
    transport: new DefaultChatTransport({
      api: '/api/openrouter',
    }),
  });

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const isStreaming = status === 'streaming';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  const handleSuggestionClick = (text: string) => {
    void sendMessage({
      role: 'user',
      parts: [{ type: 'text', text }],
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <Conversation className="flex flex-col h-full">
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4"
        >
          <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              title="Start a conversation"
              description="Ask a question, get help with code, or explore ideas with your OpenRouter-powered assistant."
            />
          ) : (
            <>
              {messages.map((message) => (
                <AIMessage key={message.id} from={message.role}>
                  <MessageContent>
                    <MessagePartsRenderer message={message as UIMessageWithParts} />
                  </MessageContent>
                </AIMessage>
              ))}

              {isStreaming && (
                <AIMessage from="assistant">
                  <MessageContent>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <Loader size={16} />
                      <span>Thinking...</span>
                      <button
                        type="button"
                        className="text-xs underline"
                        onClick={() => stop()}
                      >
                        Stop
                      </button>
                    </div>
                  </MessageContent>
                </AIMessage>
              )}
            </>
          )}
          </ConversationContent>
        </div>
        <ConversationScrollButton />
      </Conversation>

      <div className="px-4 pb-3 flex-shrink-0">
        <Suggestions>
          <Suggestion
            suggestion="Explain transformers in simple terms."
            onClick={handleSuggestionClick}
          />
          <Suggestion
            suggestion="Compare different LLM reasoning styles."
            onClick={handleSuggestionClick}
          />
          <Suggestion
            suggestion="Help me brainstorm startup ideas using AI."
            onClick={handleSuggestionClick}
          />
        </Suggestions>
      </div>

      <div className="border-t px-4 pb-4 pt-2 flex-shrink-0">
        <PromptInput
          className="mx-auto max-w-3xl"
          onSubmit={(message) => {
            const text = (message as { text?: string } | undefined)?.text?.trim();
            if (!text || isStreaming) return;
            void sendMessage({
              role: 'user',
              parts: [{ type: 'text', text }],
            });
          }}
        >
          <PromptInputBody>
            <PromptInputTextarea placeholder="Ask anything or describe what you'd like to build..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools />
            <PromptInputSubmit
              status={isStreaming ? 'streaming' : undefined}
              disabled={isStreaming}
            />
          </PromptInputFooter>
        </PromptInput>
      </div>
    </div>
  );
}