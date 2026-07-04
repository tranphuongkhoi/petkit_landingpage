"use client";

import { ProductLabel } from "@/components/i18n/localized-product-text";
import { useAppPreferences } from "@/components/providers/app-preferences";
import type { ProductWhyItFitsProps } from "@/types/product-ui";

export function ProductWhyItFits({ fallbackItems, productId }: ProductWhyItFitsProps) {
  const { dictionary } = useAppPreferences();
  const items =
    dictionary.productDetail.whyItFits[productId as keyof typeof dictionary.productDetail.whyItFits] ?? fallbackItems;

  return (
    <section className="mt-24">
      <h2 className="text-4xl font-bold leading-tight">
        <ProductLabel value="whyItFits" />
      </h2>
      <div className="mt-10 grid gap-10 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title}>
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="mt-4 text-sm leading-6 text-[var(--muted-foreground)]">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
