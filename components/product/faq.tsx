"use client";

import { useState } from "react";
import { ProductLabel } from "@/components/i18n/localized-product-text";
import { useAppPreferences } from "@/components/providers/app-preferences";
import type { ProductFaqProps } from "@/types/product-ui";

export function ProductFaq({ body, items, productId, title }: ProductFaqProps) {
  const { dictionary } = useAppPreferences();
  const [openIndex, setOpenIndex] = useState(0);
  const translatedItems = dictionary.productDetail.faqs[productId as keyof typeof dictionary.productDetail.faqs] ?? items;

  return (
    <section className="mt-24 grid gap-10 border-b border-[var(--border)] pb-16 lg:grid-cols-[0.36fr_1fr]">
      <div>
        <p className="text-[0.68rem] font-bold uppercase text-[var(--primary)]">
          <ProductLabel value="productFaq" />
        </p>
        <h2 className="mt-5 max-w-sm font-serif text-4xl leading-tight">{title}</h2>
        <p className="mt-5 max-w-sm text-sm leading-6 text-[var(--muted-foreground)]">{body}</p>
      </div>
      <div className="border-t border-[var(--border)]">
        {translatedItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question} className="border-b border-[var(--border)] py-5">
              <button
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-6 text-left font-display text-lg font-bold"
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                {item.question}
                <span
                  className={[
                    "text-xl font-normal text-[var(--primary)] transition-transform duration-300",
                    isOpen ? "rotate-45" : "",
                  ].join(" ")}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>
              <div
                className={[
                  "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden">
                  <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--muted-foreground)]">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
