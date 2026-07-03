"use client";

import Link from "next/link";
import { Menu, PawPrint, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { SiteCartControl } from "@/components/product/actions";
import { getRouteHref, scrollToSection } from "@/lib/site-navigation";
import type { SiteHeaderProps } from "@/types/layout";

export function SiteHeader({ brand, cartCount = 0, mode = "route", nav, onCartOpen }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const isLanding = mode === "landing";

  const handleLocalNavigation = (href: string) => {
    scrollToSection(href);
    setOpen(false);
  };

  return (
    <header className="glass-surface sticky inset-x-0 top-0 z-50 border-b border-[var(--border)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        {isLanding ? (
          <button
            className="flex items-center gap-2 font-display text-lg font-semibold tracking-normal text-[var(--foreground)]"
            type="button"
            onClick={() => handleLocalNavigation(brand.href)}
          >
            <PawPrint className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
            {brand.name}
          </button>
        ) : (
          <Link
            className="flex items-center gap-2 font-display text-lg font-semibold tracking-normal text-[var(--foreground)]"
            href="/"
          >
            <PawPrint className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
            {brand.name}
          </Link>
        )}

        <nav className="hidden items-center gap-8 text-sm font-medium text-[color:rgba(32,26,20,0.76)] md:flex">
          {nav.map((item) =>
            isLanding ? (
              <button
                key={item.href}
                className="transition hover:text-[var(--primary)]"
                type="button"
                onClick={() => handleLocalNavigation(item.href)}
              >
                {item.label}
              </button>
            ) : (
              <Link key={item.href} className="transition hover:text-[var(--primary)]" href={getRouteHref(item.href)}>
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {onCartOpen ? <CartButton cartCount={cartCount} onCartOpen={onCartOpen} /> : <SiteCartControl />}
          {isLanding ? (
            <button
              className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
              type="button"
              onClick={() => handleLocalNavigation("#contact")}
            >
              Get updates
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {onCartOpen ? <CartButton cartCount={cartCount} onCartOpen={onCartOpen} /> : <SiteCartControl />}
          <button
            aria-label="Toggle menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/45 text-[var(--foreground)]"
            type="button"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="border-t border-[var(--border)] bg-[color:rgba(247,245,240,0.96)] px-5 py-4 md:hidden">
          {nav.map((item) =>
            isLanding ? (
              <button
                key={item.href}
                className="block py-2.5 text-left text-sm font-semibold text-[color:rgba(32,26,20,0.78)]"
                type="button"
                onClick={() => handleLocalNavigation(item.href)}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                className="block py-2.5 text-left text-sm font-semibold text-[color:rgba(32,26,20,0.78)]"
                href={getRouteHref(item.href)}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
          {isLanding ? (
            <button
              className="mt-3 inline-flex rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white"
              type="button"
              onClick={() => handleLocalNavigation("#contact")}
            >
              Get updates
            </button>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}

function CartButton({ cartCount, onCartOpen }: { cartCount: number; onCartOpen: () => void }) {
  return (
    <button
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/45 transition hover:bg-white/75"
      type="button"
      onClick={onCartOpen}
      aria-label="Open cart"
    >
      <ShoppingCart className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
      {cartCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-xs font-bold text-white">
          {cartCount}
        </span>
      ) : null}
    </button>
  );
}
