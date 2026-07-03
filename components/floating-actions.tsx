"use client";

import { type FormEvent, useEffect, useState } from "react";
import { ChevronUp, MessageCircle, Send, X } from "lucide-react";
import {
  assistantReply,
  initialChatMessages,
  quickChatPrompts,
  type ChatMessage,
} from "@/lib/floating-actions-content";

export function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(initialChatMessages);
  const [input, setInput] = useState("");

  useEffect(() => {
    const updateBackToTopVisibility = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      setShowBackToTop(progress > 0.2);
    };

    updateBackToTopVisibility();
    window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });
    window.addEventListener("resize", updateBackToTopVisibility);

    return () => {
      window.removeEventListener("scroll", updateBackToTopVisibility);
      window.removeEventListener("resize", updateBackToTopVisibility);
    };
  }, []);

  const handleSend = (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const text = input.trim();
    if (!text) return;

    setMessages((current) => [
      ...current,
      { from: "user", text },
      { from: "bot", text: assistantReply },
    ]);
    setInput("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {chatOpen ? (
        <section className="glass-surface flex h-[26rem] w-[min(20rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl shadow-[0_24px_70px_-32px_rgba(32,26,20,0.55)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] bg-[color:rgba(247,245,240,0.72)] px-4 py-3">
            <div>
              <p className="text-sm font-bold text-[var(--foreground)]">PETKIT Assistant</p>
              <p className="text-xs text-[var(--muted-foreground)]">Care and product guidance</p>
            </div>
            <button
              aria-label="Close chat"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--muted-foreground)] transition hover:bg-white/70 hover:text-[var(--foreground)]"
              type="button"
              onClick={() => setChatOpen(false)}
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-2">
              {quickChatPrompts.map((prompt) => (
                <button
                  key={prompt}
                  className="rounded-full border border-[var(--border)] bg-white/60 px-3 py-2 text-xs font-bold text-[var(--primary)] transition hover:bg-[var(--card)]"
                  type="button"
                  onClick={() => setInput(prompt)}
                >
                  {prompt}
                </button>
              ))}
            </div>
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={[
                  "w-fit max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-5",
                  message.from === "bot"
                    ? "bg-[var(--card)] text-[var(--foreground)]"
                    : "ml-auto bg-[var(--primary)] text-white",
                ].join(" ")}
              >
                {message.text}
              </div>
            ))}
          </div>

          <form
            className="flex items-center gap-2 border-t border-[var(--border)] bg-[color:rgba(247,245,240,0.72)] p-3"
            onSubmit={handleSend}
          >
            <label className="flex-1">
              <span className="sr-only">Message</span>
              <input
                className="w-full rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none transition focus:border-[var(--primary)]"
                placeholder="Ask about PETKIT..."
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
              />
            </label>
            <button
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-white transition hover:bg-[var(--primary-hover)]"
              type="submit"
            >
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
            onClick={scrollToTop}
          >
            <ChevronUp className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
          </button>
        ) : null}
        <button
          aria-label={chatOpen ? "Close chat" : "Open chat"}
          className="glass-surface flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105"
          type="button"
          onClick={() => setChatOpen((value) => !value)}
        >
          {chatOpen ? (
            <X className="h-6 w-6 text-[var(--primary)]" aria-hidden="true" />
          ) : (
            <MessageCircle className="h-6 w-6 text-[var(--primary)]" aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}
