'use client';

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import type { FormEvent, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FaPaperPlane,
  FaRobot,
  FaUser,
  FaWandMagicSparkles,
} from 'react-icons/fa6';
import { FaTimes } from 'react-icons/fa';

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  costUsd?: number;
  totalTokens?: number;
  model?: string;
};

type ChatResponse = {
  answer?: string;
  error?: string;
  model?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  };
  cost?: {
    totalUsd: number;
    isEstimate: boolean;
    pricingAvailable: boolean;
  };
};

type OpenChatEvent = CustomEvent<{
  prompt?: string;
  projectTitle?: string;
  autoSend?: boolean;
}>;

const starterPrompts = [
  'Who is Krutin?',
  'What projects has he built?',
  'Why should I hire him?',
];

const initialMessages: ChatMessage[] = [
  {
    id: 'welcome',
    role: 'assistant',
    content:
      "Hi, I'm Krutin's portfolio assistant.\n\n- Ask about projects, experience, skills, or resume.\n- Open a project explainer for a structured recruiter-friendly summary.",
  },
];

function createProjectPrompt(projectTitle: string) {
  return `Explain the "${projectTitle}" project to a recruiter in simple terms. Include what it does, the tech used, the main challenges, and why it matters.`;
}

function formatEstimatedCost(cost: number) {
  if (cost === 0) return '$0.00';
  if (cost < 0.000001) return '<$0.000001';

  return `$${cost.toFixed(6)}`;
}

function useDesktopSidebar() {
  const [isDesktopSidebar, setIsDesktopSidebar] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    const updateLayoutMode = () => setIsDesktopSidebar(mediaQuery.matches);

    updateLayoutMode();
    mediaQuery.addEventListener('change', updateLayoutMode);

    return () => mediaQuery.removeEventListener('change', updateLayoutMode);
  }, []);

  return isDesktopSidebar;
}

function renderInlineMarkdown(text: string) {
  return text
    .split(/(\[[^\]]+\]\((?:https?:\/\/|mailto:)[^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g)
    .map((part, index) => {
      const link = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|mailto:)[^)]+)\)$/);
      if (link) {
        return (
          <a
            key={`${part}-${index}`}
            href={link[2]}
            target={link[2].startsWith('mailto:') ? undefined : '_blank'}
            rel={link[2].startsWith('mailto:') ? undefined : 'noreferrer'}
            className="font-semibold text-indigo-200 underline decoration-indigo-300/50 underline-offset-4 transition hover:text-white"
          >
            {link[1]}
          </a>
        );
      }

      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={`${part}-${index}`} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }

      if (part.startsWith('`') && part.endsWith('`')) {
        return (
          <code
            key={`${part}-${index}`}
            className="rounded bg-black/30 px-1.5 py-0.5 text-[0.92em] text-indigo-100"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      return part;
    });
}

function MarkdownMessage({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const elements: ReactNode[] = [];
  let listItems: string[] = [];
  let orderedListItems: string[] = [];

  const flushLists = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="my-2 space-y-1 pl-4">
          {listItems.map((item, index) => (
            <li key={`${item}-${index}`} className="list-disc">
              {renderInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
    }

    if (orderedListItems.length > 0) {
      elements.push(
        <ol key={`ol-${elements.length}`} className="my-2 space-y-1 pl-4">
          {orderedListItems.map((item, index) => (
            <li key={`${item}-${index}`} className="list-decimal">
              {renderInlineMarkdown(item)}
            </li>
          ))}
        </ol>
      );
      orderedListItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      flushLists();
      return;
    }

    const heading = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushLists();
      elements.push(
        <h3
          key={`heading-${index}`}
          className="mb-1 mt-3 text-sm font-bold text-indigo-200 first:mt-0"
        >
          {renderInlineMarkdown(heading[2])}
        </h3>
      );
      return;
    }

    const bullet = trimmedLine.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      orderedListItems = [];
      listItems.push(bullet[1]);
      return;
    }

    const numbered = trimmedLine.match(/^\d+\.\s+(.+)$/);
    if (numbered) {
      listItems = [];
      orderedListItems.push(numbered[1]);
      return;
    }

    flushLists();
    elements.push(
      <p key={`p-${index}`} className="my-2 first:mt-0 last:mb-0">
        {renderInlineMarkdown(trimmedLine)}
      </p>
    );
  });

  flushLists();

  return <div>{elements}</div>;
}

export function openPortfolioChat(projectTitle: string) {
  window.dispatchEvent(
    new CustomEvent('open-portfolio-chat', {
      detail: {
        projectTitle,
        prompt: createProjectPrompt(projectTitle),
        autoSend: true,
      },
    })
  );
}

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sessionCost, setSessionCost] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isDesktopSidebar = useDesktopSidebar();

  const sendMessage = useCallback(async (message: string) => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || isSending) return;

    const assistantMessageId = `assistant-${Date.now()}`;
    setIsSending(true);
    setInput('');
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmedMessage,
      },
      {
        id: assistantMessageId,
        role: 'assistant',
        content: 'Thinking...',
      },
    ]);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmedMessage }),
      });

      const data = (await response.json()) as ChatResponse;
      const responseCost =
        data.cost?.pricingAvailable && data.cost.totalUsd
          ? data.cost.totalUsd
          : 0;

      if (responseCost > 0) {
        setSessionCost(currentCost => currentCost + responseCost);
      }

      setMessages(currentMessages =>
        currentMessages.map(chatMessage =>
          chatMessage.id === assistantMessageId
            ? {
                ...chatMessage,
                content:
                  data.answer ??
                  data.error ??
                  'Sorry, I could not answer that right now.',
                costUsd: responseCost,
                totalTokens: data.usage?.totalTokens,
                model: data.model,
              }
            : chatMessage
        )
      );
    } catch {
      setMessages(currentMessages =>
        currentMessages.map(chatMessage =>
          chatMessage.id === assistantMessageId
            ? {
                ...chatMessage,
                content:
                  'Sorry, the AI assistant is temporarily unavailable. Please try again soon.',
              }
            : chatMessage
        )
      );
    } finally {
      setIsSending(false);
    }
  }, [isSending]);

  useEffect(() => {
    const handleOpenChat = (event: Event) => {
      const { prompt, autoSend } = (event as OpenChatEvent).detail ?? {};

      setIsOpen(true);

      if (!prompt) return;

      if (autoSend) {
        sendMessage(prompt);
        return;
      }

      setInput(prompt);
    };

    window.addEventListener('open-portfolio-chat', handleOpenChat);
    return () =>
      window.removeEventListener('open-portfolio-chat', handleOpenChat);
  }, [sendMessage]);

  useEffect(() => {
    const handleHashOpen = () => {
      if (window.location.hash === '#chat') {
        setIsOpen(true);
      }
    };

    handleHashOpen();
    window.addEventListener('hashchange', handleHashOpen);

    return () => window.removeEventListener('hashchange', handleHashOpen);
  }, []);

  useEffect(() => {
    const pageContent = document.getElementById('page-content');
    if (!pageContent) return;

    pageContent.style.marginRight =
      isOpen && isDesktopSidebar ? '440px' : '0px';

    return () => {
      pageContent.style.marginRight = '0px';
    };
  }, [isDesktopSidebar, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendMessage(input);
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => {
          setIsOpen(true);
          if (window.location.hash !== '#chat') {
            window.history.pushState(null, '', '#chat');
          }
        }}
        className="fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full border border-indigo-400/40 bg-[#11111a]/95 text-indigo-300 shadow-[0_0_24px_rgba(99,102,241,0.55)] backdrop-blur-md transition hover:text-white"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open portfolio chatbot"
      >
        <FaRobot className="text-2xl" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={
              isDesktopSidebar
                ? { opacity: 0, x: 80 }
                : { opacity: 0, y: 24, scale: 0.96 }
            }
            animate={
              isDesktopSidebar
                ? { opacity: 1, x: 0 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              isDesktopSidebar
                ? { opacity: 0, x: 80 }
                : { opacity: 0, y: 24, scale: 0.96 }
            }
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 z-[70] flex h-[min(680px,calc(100vh-8rem))] w-[calc(100vw-2rem)] max-w-[420px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b0b1d]/95 text-white shadow-2xl backdrop-blur-xl sm:right-6 lg:bottom-0 lg:right-0 lg:h-screen lg:w-[440px] lg:max-w-none lg:rounded-none lg:border-y-0 lg:border-r-0"
          >
            <div className="border-b border-white/10 bg-white/10 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-indigo-400/40 bg-[#11111a] text-indigo-300 shadow-[0_0_18px_rgba(99,102,241,0.45)]">
                    <FaWandMagicSparkles className="text-xl" />
                  </span>
                  <div>
                    <h2 className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-fuchsia-400">
                      Talk to My Portfolio
                    </h2>
                    <p className="text-xs text-gray-300">
                      Projects, resume, skills, and experience
                    </p>
                    <p className="mt-1 text-[11px] text-indigo-200/80">
                      Session estimate: {formatEstimatedCost(sessionCost)}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    if (window.location.hash === '#chat') {
                      window.history.pushState(null, '', window.location.pathname);
                    }
                  }}
                  className="rounded-full p-2 text-gray-300 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close portfolio chatbot"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {starterPrompts.map(prompt => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setInput(prompt)}
                    className="rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-semibold text-indigo-100 transition hover:border-indigo-400/40 hover:bg-indigo-500/20"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-indigo-500/20 text-indigo-300">
                      <FaRobot />
                    </span>
                  )}

                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      message.role === 'user'
                        ? 'bg-indigo-500 text-white'
                        : 'border border-white/10 bg-white/10 text-gray-200'
                    }`}
                  >
                    {message.role === 'assistant' ? (
                      <MarkdownMessage content={message.content} />
                    ) : (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    )}
                    {message.role === 'assistant' &&
                      message.costUsd !== undefined &&
                      message.totalTokens !== undefined && (
                        <p className="mt-3 border-t border-white/10 pt-2 text-[11px] leading-none text-indigo-200/75">
                          Est. {formatEstimatedCost(message.costUsd)} |{' '}
                          {message.totalTokens} tokens
                          {message.model ? ` | ${message.model}` : ''}
                        </p>
                      )}
                  </div>

                  {message.role === 'user' && (
                    <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/10 text-indigo-200">
                      <FaUser />
                    </span>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="border-t border-white/10 bg-black/20 p-4"
            >
              <div className="flex items-end gap-3 rounded-2xl border border-white/10 bg-white/10 p-2 focus-within:border-indigo-400/50">
                <textarea
                  value={input}
                  onChange={event => setInput(event.target.value)}
                  onKeyDown={event => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      event.currentTarget.form?.requestSubmit();
                    }
                  }}
                  placeholder="Ask about Krutin..."
                  rows={1}
                  disabled={isSending}
                  className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-white outline-none placeholder:text-gray-400"
                />
                <button
                  type="submit"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-indigo-500 text-white transition hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={!input.trim() || isSending}
                  aria-label="Send message"
                >
                  <FaPaperPlane />
                </button>
              </div>
            </form>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
