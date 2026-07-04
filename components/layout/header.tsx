"use client";

import Link from "next/link";
import { Languages, Menu, Moon, PawPrint, ShoppingCart, Sun, X } from "lucide-react";
import { useState } from "react";
import { SiteCartControl } from "@/components/product/actions";
import { useAppPreferences } from "@/components/providers/app-preferences";
import { getRouteHref, scrollToSection } from "@/lib/site-navigation";
import type { SiteHeaderProps } from "@/types/layout";

export function SiteHeader({ brand, cartCount = 0, mode = "route", nav, onCartOpen }: SiteHeaderProps) {
  const [open, setOpen] = useState(false);
  const { dictionary, locale, setLocale, theme, toggleTheme } = useAppPreferences();
  const isLanding = mode === "landing";
  const translatedNav = nav.map((item) => ({
    ...item,
    label: getNavLabel(item.href, item.label, dictionary.nav),
  }));

  const handleLocalNavigation = (href: string) => {
    scrollToSection(href);
    setOpen(false);
  };

  return (
    <header className="glass-surface sticky inset-x-0 top-0 z-50 border-b border-[var(--border)]">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto] items-center gap-4 px-5 py-3.5 md:grid-cols-[1fr_auto_1fr]">
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

        <nav className="hidden items-center justify-center gap-8 text-sm font-medium text-[var(--muted-foreground)] md:flex">
          {translatedNav.map((item) =>
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

        <div className="hidden items-center justify-end gap-3 md:flex">
          <PreferenceControls
            locale={locale}
            setLocale={setLocale}
            theme={theme}
            toggleTheme={toggleTheme}
          />
          {onCartOpen ? <CartButton cartCount={cartCount} onCartOpen={onCartOpen} /> : <SiteCartControl />}
          {isLanding ? (
            <button
              className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
              type="button"
              onClick={() => handleLocalNavigation("#contact")}
            >
              {dictionary.nav.getUpdates}
            </button>
          ) : null}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <PreferenceControls
            compact
            locale={locale}
            setLocale={setLocale}
            theme={theme}
            toggleTheme={toggleTheme}
          />
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
        <nav className="border-t border-[var(--border)] bg-[var(--background)] px-5 py-4 md:hidden">
          {translatedNav.map((item) =>
            isLanding ? (
              <button
                key={item.href}
                className="block py-2.5 text-left text-sm font-semibold text-[var(--muted-foreground)]"
                type="button"
                onClick={() => handleLocalNavigation(item.href)}
              >
                {item.label}
              </button>
            ) : (
              <Link
                key={item.href}
                className="block py-2.5 text-left text-sm font-semibold text-[var(--muted-foreground)]"
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
              {dictionary.nav.getUpdates}
            </button>
          ) : null}
        </nav>
      ) : null}
    </header>
  );
}

function getNavLabel(href: string, fallback: string, nav: ReturnType<typeof useAppPreferences>["dictionary"]["nav"]) {
  if (href === "/") return nav.home;
  if (href === "/products") return nav.lineup;
  if (href === "#specs") return nav.specs;
  if (href === "#features") return nav.features;
  if (href === "#product") return nav.product;
  if (href === "#ecosystem") return nav.ecosystem;
  if (href === "#contact") return nav.contact;
  if (href.includes("#compare")) return nav.compare;
  return fallback;
}

function PreferenceControls({
  compact,
  locale,
  setLocale,
  theme,
  toggleTheme,
}: {
  compact?: boolean;
  locale: "en" | "vi";
  setLocale: (locale: "en" | "vi") => void;
  theme: "light" | "dark";
  toggleTheme: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        aria-label="Toggle language"
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-[var(--border)] bg-white/35 px-2.5 text-[0.68rem] font-bold uppercase text-[var(--foreground)] transition hover:bg-white/60"
        type="button"
        onClick={() => setLocale(locale === "en" ? "vi" : "en")}
      >
        <Languages className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
        <span className={compact ? "hidden sm:inline" : ""}>{locale === "en" ? "EN" : "VI"}</span>
      </button>
      <button
        aria-label="Toggle dark mode"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-white/35 text-[var(--foreground)] transition hover:bg-white/60"
        type="button"
        onClick={toggleTheme}
      >
        {theme === "dark" ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
      </button>
    </div>
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
