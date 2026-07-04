"use client";

import { type FormEvent, useEffect, useRef, useState } from "react";
import { ChevronUp, MessageCircle, Send, X } from "lucide-react";
import { useAppPreferences } from "@/components/providers/app-preferences";
import {
  readStoredArray,
  type StoredCartItem,
} from "@/lib/cart-storage";
import { type ChatMessage } from "@/lib/floating-actions-content";
import { LOCALSTORAGE_MAX_HISTORY, STORAGE_KEYS } from "@/lib/constants";
import { productCatalog } from "@/lib/product-catalog";

type StoredWishlistItem = {
  id: string;
  name?: string;
};

function cleanAssistantText(value: string) {
  return value
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function FloatingActions() {
  const { dictionary, locale } = useAppPreferences();
  const [chatOpen, setChatOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [chatHydrated, setChatHydrated] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const submittedLeadRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEYS.chatMessages);
      if (!stored) return;

      const parsed = JSON.parse(stored) as ChatMessage[];
      if (Array.isArray(parsed)) {
        setMessages(
          parsed.filter(
            (message): message is ChatMessage =>
              !!message &&
              (message.from === "bot" || message.from === "user") &&
              typeof message.text === "string",
          ),
        );
      }
    } catch (error) { console.error("LocalStorage read failed", error);
      setMessages([]);
    } finally {
      setChatHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!chatHydrated) return;

    window.localStorage.setItem(
      STORAGE_KEYS.chatMessages,
      JSON.stringify(messages.slice(-LOCALSTORAGE_MAX_HISTORY.chat)),
    );
  }, [chatHydrated, messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, submitting]);

  useEffect(() => {
    const updateBackToTopVisibility = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      setShowBackToTop(progress > 0.2);
    };

    updateBackToTopVisibility();
    window.addEventListener("scroll", updateBackToTopVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateBackToTopVisibility);

    return () => {
      window.removeEventListener("scroll", updateBackToTopVisibility);
      window.removeEventListener("resize", updateBackToTopVisibility);
    };
  }, []);

  const sendMessage = async (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText || submitting) return;

    const history = messages.slice(-8).map((entry) => ({
      role: entry.from === "user" ? ("user" as const) : ("assistant" as const),
      content: entry.text,
    }));

    setSubmitting(true);
    setMessages((current) => [...current, { from: "user", text: trimmedText }]);
    setInput("");

    try {
      const response = await fetch("/api/assistant", {
        body: JSON.stringify({
          context: getAssistantContext(),
          history,
          locale,
          message: trimmedText,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const data = (await response.json()) as { reply?: string };

      const reply = data.reply;

      if (!response.ok || !reply) throw new Error("Assistant unavailable");

      setMessages((current) => [
        ...current,
        { from: "bot", text: cleanAssistantText(reply) },
      ]);
      await submitLeadFromMessage(trimmedText, submittedLeadRef);
    } catch (error) {
      console.error("Assistant message failed", error);
      setMessages((current) => [
        ...current,
        { from: "bot", text: dictionary.assistant.unavailable },
      ]);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSend = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    void sendMessage(input);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {chatOpen ? (
        <section className="glass-surface flex h-[30rem] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl shadow-[0_24px_70px_-32px_rgba(32,26,20,0.55)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--soft-panel)] px-4 py-3">
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">
                {dictionary.assistant.title}
              </p>
              <p className="text-xs text-[var(--muted-foreground)]">
                {dictionary.assistant.subtitle}
              </p>
            </div>
            <button
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted-foreground)] transition hover:bg-white/70 hover:text-[var(--foreground)]"
              type="button"
              onClick={() => setChatOpen(false)}>
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-2">
              {dictionary.assistant.prompts.map((prompt) => (
                <button
                  key={prompt}
                  className="rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-xs font-bold text-[var(--primary)] transition hover:border-[var(--primary)] hover:bg-[var(--soft-panel)]"
                  disabled={submitting}
                  type="button"
                  onClick={() => void sendMessage(prompt)}>
                  {prompt}
                </button>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {messages.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-[var(--border)] bg-[var(--background)] px-4 py-3 text-sm leading-6 text-[var(--muted-foreground)]">
                  {dictionary.assistant.empty}
                </div>
              ) : null}
              {messages.map((message, index) => (
                <div
                  key={`${message.from}-${index}`}
                  className={[
                    "inline-block min-w-0 max-w-[88%] whitespace-pre-line break-words rounded-2xl px-3 py-2 text-sm leading-5",
                    message.text.length <= 16 ? "max-w-fit px-4" : "",
                    message.from === "bot"
                      ? "self-start bg-[var(--card)] text-[var(--foreground)]"
                      : "self-end bg-[var(--primary)] text-white",
                  ].join(" ")}>
                  {message.text}
                </div>
              ))}
              {submitting ? (
                <div className="inline-flex w-fit max-w-[88%] items-center gap-1.5 rounded-2xl bg-[var(--card)] px-3 py-2 text-sm leading-5 text-[var(--muted-foreground)]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)] [animation-delay:120ms]" />
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--primary)] [animation-delay:240ms]" />
                  <span className="sr-only">
                    {dictionary.assistant.thinking}
                  </span>
                </div>
              ) : null}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <form
            className="flex items-center gap-2 border-t border-[var(--border)] bg-[var(--soft-panel)] p-3"
            onSubmit={handleSend}>
            <label className="flex-1">
              <span className="sr-only">Message</span>
              <input
                className="w-full rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[var(--primary)]"
                disabled={submitting}
                placeholder={dictionary.assistant.placeholder}
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </label>
            <button
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={submitting}
              type="submit">
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      ) : null}

      <div className="flex items-center gap-3">
        {showBackToTop ? (
          <button
            aria-label="Back to top"
            className="glass-surface flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
            type="button"
            onClick={scrollToTop}>
            <ChevronUp
              className="h-5 w-5 text-[var(--primary)]"
              aria-hidden="true"
            />
          </button>
        ) : null}
        <button
          aria-label={chatOpen ? "Close chat" : "Open chat"}
          className="glass-surface flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
          type="button"
          onClick={() => setChatOpen((value) => !value)}>
          {chatOpen ? (
            <X className="h-6 w-6 text-[var(--primary)]" aria-hidden="true" />
          ) : (
            <MessageCircle
              className="h-6 w-6 text-[var(--primary)]"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
    </div>
  );
}

function getAssistantContext() {
  const cart = readStoredArray<StoredCartItem>(STORAGE_KEYS.cart, []).map(
    (item) => ({
      name: item.name,
      quantity: item.quantity,
    }),
  );
  const saved = readStoredArray<StoredWishlistItem>(
    STORAGE_KEYS.wishlist,
    [],
  ).map((item) => {
    const product = productCatalog.find((entry) => entry.id === item.id);

    return {
      name: item.name ?? product?.name ?? item.id,
    };
  });

  return {
    cart,
    page: window.location.pathname || "/",
    saved,
  };
}

async function submitLeadFromMessage(
  message: string,
  submittedLeadRef: { current: string | null },
) {
  const email = message.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/)?.[0];
  if (!email) return;

  const nameCandidate = message
    .replace(email, " ")
    .replace(/(?:my name is|i am|i'm|toi la|tôi là|ten toi la|tên tôi là|name|email|mail|là|:)/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  const name = nameCandidate.length >= 2 ? nameCandidate.slice(0, 80) : "";
  if (!name) return;

  const context = getAssistantContext();
  const productName =
    context.cart.length > 0
      ? `Cart: ${context.cart
          .map((item) => `${item.name} x${item.quantity ?? 1}`)
          .join(", ")}`
      : context.saved.length > 0
        ? `Saved: ${context.saved.map((item) => item.name).join(", ")}`
        : "PETKIT product updates";
  const signature = `${email.toLowerCase()}|${name.toLowerCase()}|${productName}`;

  if (submittedLeadRef.current === signature) return;
  submittedLeadRef.current = signature;

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const scrollDepth =
    maxScroll > 0 ? Math.round((window.scrollY / maxScroll) * 100) : 0;

  await fetch("/api/events", {
    body: JSON.stringify({
      email,
      eventType: "lead_submit",
      metadata: {
        action: "assistant_lead",
        cartItems: context.cart.length,
        savedItems: context.saved.length,
      },
      name,
      page: window.location.pathname || "/",
      productName,
      scrollDepth,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
}

