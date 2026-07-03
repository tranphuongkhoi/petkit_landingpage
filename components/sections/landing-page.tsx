"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Cat,
  Minus,
  Plus,
  Recycle,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Trash2,
  Wind,
  X,
} from "lucide-react";
import { FloatingActions } from "@/components/floating-actions";
import { SiteFooter, SiteHeader } from "@/components/layout";
import { CART_STORAGE_KEY, CART_UPDATED_EVENT, getCartItemCount, getItemPrice, type StoredCartItem } from "@/lib/cart-storage";
import type { LandingFeature, LandingStat } from "@/types/landing";
import type { ProductCardData, ProductSectionData } from "@/types/product-foundation";
import { formatUsd } from "@/lib/product-catalog";
import type { ContentProps, LandingPageProps, ProductFoundationProps } from "@/types/section-props";

export function LandingPage({ content, productFoundation }: LandingPageProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<StoredCartItem[]>([]);
  const [cartLoaded, setCartLoaded] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY);

      if (stored) {
        setCartItems(JSON.parse(stored) as StoredCartItem[]);
      }
    } catch {
      setCartItems([]);
    } finally {
      setCartLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;

    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    window.dispatchEvent(new Event(CART_UPDATED_EVENT));
  }, [cartItems, cartLoaded]);

  const addToCart = (product: ProductCardData) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
        return items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [
        ...items,
        {
          id: product.id,
          image: product.image,
          name: product.name,
          priceUsd: product.priceUsd,
          role: product.role,
          slug: product.id,
          quantity: 1,
        },
      ];
    });
    setCartOpen(true);
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0),
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader
        brand={content.brand}
        cartCount={cartCount}
        mode="landing"
        nav={content.nav}
        onCartOpen={() => setCartOpen(true)}
      />
      <HeroSection content={content} />
      <FeaturesSection content={content} />
      <SpecsSection content={content} />
      <ProductFamilySection onAddToCart={addToCart} productFoundation={productFoundation} />
      <ProductSectionCards onAddToCart={addToCart} section={productFoundation.ecosystem} variant="wide" />
      <UpdatesSection content={content} />
      <SiteFooter body={content.footer.body} />
      <CartDrawer
        cartItems={cartItems}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQuantityChange={updateCartQuantity}
        onRemove={removeFromCart}
      />
      <FloatingActions />
    </main>
  );
}

function scrollToSection(target: string) {
  const id = target.replace(/^#/, "");
  const element = document.getElementById(id);

  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function HeroSection({ content }: ContentProps) {
  const { hero } = content;

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-20"
      style={{
        background:
          "radial-gradient(120% 90% at 80% 0%, #ece7de 0%, #f7f5f0 55%, #f7f5f0 100%)",
      }}
    >
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="inline-flex rounded-full border border-[var(--border)] bg-[var(--glass)] px-3 py-1 text-xs font-bold uppercase text-[var(--primary)]">
            Smart Cat Care
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-[var(--foreground)] sm:text-5xl lg:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-5 max-w-md text-lg leading-8 text-[var(--muted-foreground)]">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              className="inline-flex items-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
              type="button"
              onClick={() => scrollToSection(hero.primaryCta.href)}
            >
              {hero.primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
            <button
              className="inline-flex items-center rounded-full border border-[color:rgba(32,26,20,0.22)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--card)]"
              type="button"
              onClick={() => scrollToSection(hero.secondaryCta.href)}
            >
              {hero.secondaryCta.label}
            </button>
          </div>

          <dl className="mt-10 flex flex-wrap gap-3">
            {hero.visual.stats.map((stat) => (
              <div key={stat.label} className="glass-surface rounded-2xl px-5 py-3 shadow-sm">
                <dd className="text-2xl font-bold text-[var(--primary)]">{stat.value}</dd>
                <dt className="mt-1 text-xs text-[var(--muted-foreground)]">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <ProductVisual content={content} />
      </div>
    </section>
  );
}

function ProductVisual({ content }: ContentProps) {
  const { visual } = content.hero;

  return (
    <div className="rounded-[2rem] bg-[var(--card)] p-6 shadow-[0_30px_60px_-30px_rgba(32,26,20,0.35)] sm:p-10">
      <div className="overflow-hidden rounded-3xl bg-[var(--background)]">
        <Image
          alt={visual.image.alt}
          className="mx-auto aspect-square h-auto w-full max-w-md rounded-2xl object-cover"
          height={visual.image.height}
          priority
          src={visual.image.src}
          width={visual.image.width}
        />
      </div>
    </div>
  );
}

function ProductFamilySection({
  onAddToCart,
  productFoundation,
}: ProductFoundationProps & {
  onAddToCart: (product: ProductCardData) => void;
}) {
  return (
    <ProductSectionCards
      onAddToCart={onAddToCart}
      section={productFoundation.litterBoxFamily}
      sectionId="product"
      variant="family"
    />
  );
}

function ProductSectionCards({
  onAddToCart,
  section,
  variant,
  sectionId,
}: {
  onAddToCart: (product: ProductCardData) => void;
  section: ProductSectionData;
  variant: "family" | "wide";
  sectionId?: string;
}) {
  const gridClass = variant === "wide" ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section id={sectionId ?? section.id} className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{section.heading}</h2>
            <p className="mt-3 leading-7 text-[var(--muted-foreground)]">{section.body}</p>
          </div>
          {variant === "family" ? (
            <Link
              className="inline-flex items-center rounded-full border border-[var(--border)] px-5 py-3 text-sm font-bold text-[var(--primary)] transition hover:bg-[var(--card)]"
              href="/products"
            >
              Browse products
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
        <div className={`mt-12 grid gap-5 ${gridClass}`}>
          {section.products.map((product, index) => (
            <ProductCard
              key={product.id}
              featured={variant === "family" && index === 0}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  featured,
  onAddToCart,
  product,
}: {
  featured?: boolean;
  onAddToCart: (product: ProductCardData) => void;
  product: ProductCardData;
}) {
  return (
    <article
      className={[
        "group flex flex-col overflow-hidden rounded-2xl bg-[var(--card)] shadow-sm transition hover:-translate-y-1",
        featured ? "border-[var(--primary)]" : "border-[var(--border)]",
      ].join(" ")}
    >
      <div className="relative flex min-h-[238px] items-center justify-center bg-[color:rgba(201,185,156,0.4)] p-6">
        {featured ? (
          <span className="absolute left-4 top-4 rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-bold text-white">
            Flagship
          </span>
        ) : null}
        {product.image ? (
          <Image
            alt={product.image.alt}
            className="h-auto w-full max-w-[220px] rounded-2xl object-contain transition duration-300 group-hover:scale-[1.02]"
            height={product.image.height}
            src={product.image.src}
            width={product.image.width}
          />
        ) : (
          <div className="flex h-[220px] w-full max-w-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[color:rgba(32,26,20,0.22)] bg-[color:rgba(247,245,240,0.64)] text-center">
            <span className="text-sm font-bold text-[var(--primary)]">{product.badge}</span>
            <span className="mt-2 px-5 text-xs leading-5 text-[var(--muted-foreground)]">Image pending</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col border-t border-[var(--border)] bg-[color:rgba(255,255,255,0.42)] p-5">
        <p className="text-xs font-bold uppercase text-[var(--muted-foreground)]">
          {product.category} - {product.model}
        </p>
        <h3 className="mt-1 text-xl font-bold">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-6 text-[var(--muted-foreground)]">{product.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="font-display text-xl font-bold text-[var(--primary)]">{formatUsd(product.priceUsd)}</span>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              className="inline-flex items-center rounded-full border border-[var(--border)] px-4 py-2 text-sm font-bold text-[var(--primary)] transition hover:bg-[var(--card)]"
              href={`/products/${product.id}`}
            >
              Details
            </Link>
            <button
              className="inline-flex items-center gap-1 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--primary-hover)]"
              type="button"
              onClick={() => onAddToCart(product)}
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Add
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function SpecsSection({ content }: ContentProps) {
  const product = content.primaryProduct;
  const specs = product.stats.slice(0, 4);

  return (
    <section id="specs" className="px-5 py-20">
      <div className="mx-auto max-w-6xl rounded-[2rem] bg-[var(--card)] p-8 sm:p-12">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">Technical at a glance</h2>
          <p className="mt-3 leading-7 text-[var(--muted-foreground)]">
            Production-ready hardware specs for the {product.name} ({product.model}).
          </p>
        </div>
        <StatsGrid stats={specs} />
      </div>
    </section>
  );
}

function StatsGrid({ stats }: { stats: LandingStat[] }) {
  return (
    <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-[var(--border)] bg-[var(--background)] p-6">
          <dd className="text-3xl font-bold leading-tight text-[var(--primary)]">{stat.value}</dd>
          <dt className="mt-1 text-sm text-[var(--muted-foreground)]">{stat.label}</dt>
        </div>
      ))}
    </dl>
  );
}

function FeaturesSection({ content }: ContentProps) {
  const product = content.primaryProduct;

  return (
    <section id="features" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{product.heading}</h2>
          <p className="mt-3 leading-7 text-[var(--muted-foreground)]">{product.body}</p>
        </div>
        <FeatureList features={product.features} />
      </div>
    </section>
  );
}

function FeatureList({ features }: { features: LandingFeature[] }) {
  const icons = [Sparkles, ShieldCheck, Smartphone, Wind, Cat, Recycle];

  return (
    <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => {
        const Icon = icons[index % icons.length];

        return (
          <article
            key={feature.title}
            className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm transition hover:-translate-y-1"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/70">
              <Icon className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-[var(--muted-foreground)]">{feature.body}</p>
          </article>
        );
      })}
    </div>
  );
}

function UpdatesSection({ content }: ContentProps) {
  const updates = content.updates;

  return (
    <section id={updates.id} className="px-5 py-20">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-[var(--card)] p-8 text-center sm:p-12">
        <div>
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{updates.heading}</h2>
          <p className="mx-auto mt-3 max-w-md leading-7 text-[var(--muted-foreground)]">{updates.body}</p>
        </div>
        <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 text-left">
          {updates.fields.map((field) => (
            <label key={field.name}>
              <span className="sr-only">{field.label}</span>
              <input
                className="w-full rounded-xl border border-[color:rgba(32,26,20,0.2)] bg-[var(--background)] px-4 py-3 text-base font-normal outline-none transition focus:border-[var(--primary)]"
                name={field.name}
                placeholder={field.placeholder}
                type={field.type}
              />
            </label>
          ))}
          <button
            className="w-full rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-bold text-white transition hover:bg-[var(--primary-hover)]"
            type="button"
          >
            {updates.submitLabel}
          </button>
        </form>
        <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-[var(--muted-foreground)]">{updates.disclaimer}</p>
      </div>
    </section>
  );
}

function CartDrawer({
  cartItems,
  onClose,
  onQuantityChange,
  onRemove,
  open,
}: {
  cartItems: StoredCartItem[];
  onClose: () => void;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  open: boolean;
}) {
  const totalItems = getCartItemCount(cartItems);
  const totalPrice = cartItems.reduce((total, item) => total + getItemPrice(item) * item.quantity, 0);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        aria-label="Close cart overlay"
        className="absolute inset-0 bg-[rgba(32,26,20,0.18)]"
        type="button"
        onClick={onClose}
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-[var(--border)] bg-[var(--background)] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <div>
            <p className="text-sm font-bold uppercase text-[var(--primary)]">Cart</p>
            <h2 className="text-2xl font-bold">Selected products</h2>
          </div>
          <button
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/60"
            type="button"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {cartItems.length > 0 ? (
            <div className="grid gap-3">
              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="grid grid-cols-[4.5rem_1fr] gap-4 rounded-2xl border border-[var(--border)] bg-white/70 p-4"
                >
                  <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-2xl bg-[var(--card)]">
                    {item.image ? (
                      <Image
                        alt={item.image.alt}
                        className="h-full w-full object-cover"
                        height={item.image.height}
                        src={item.image.src}
                        width={item.image.width}
                      />
                    ) : (
                      <ShoppingCart className="h-6 w-6 text-[var(--primary)]" aria-hidden="true" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="mt-1 text-sm text-[var(--muted-foreground)]">{item.role}</p>
                        <p className="mt-2 text-sm font-bold text-[var(--primary)]">{formatUsd(getItemPrice(item))}</p>
                      </div>
                      <button
                        aria-label={`Remove ${item.name}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--card)] text-[var(--primary)] transition hover:bg-[var(--accent)]"
                        type="button"
                        onClick={() => onRemove(item.id)}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      <Link
                        className="text-sm font-bold text-[var(--primary)] underline-offset-4 hover:underline"
                        href={`/products/${item.slug}`}
                        onClick={onClose}
                      >
                        View details
                      </Link>
                      <div className="flex items-center rounded-full border border-[var(--border)] bg-[var(--background)]">
                        <button
                          aria-label={`Decrease ${item.name} quantity`}
                          className="flex h-8 w-8 items-center justify-center text-[var(--primary)]"
                          type="button"
                          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          aria-label={`Increase ${item.name} quantity`}
                          className="flex h-8 w-8 items-center justify-center text-[var(--primary)]"
                          type="button"
                          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                      <p className="text-sm font-bold">{formatUsd(getItemPrice(item) * item.quantity)}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-[var(--border)] bg-white/55 p-6 text-center">
              <ShoppingCart className="mx-auto h-8 w-8 text-[var(--primary)]" aria-hidden="true" />
              <p className="mt-3 font-bold">Your cart is empty</p>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-foreground)]">
                Add products from the PETKIT lineup to prepare an inquiry list.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-[var(--border)] p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--muted-foreground)]">Items</span>
            <span className="font-bold">{totalItems}</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-[var(--muted-foreground)]">Total</span>
            <span className="font-display text-2xl font-bold text-[var(--primary)]">{formatUsd(totalPrice)}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-[var(--muted-foreground)]">
            Your selection is saved on this browser for a smoother return visit.
          </p>
          <button
            className="mt-4 w-full rounded-xl bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--primary-hover)]"
            type="button"
            onClick={() => {
              onClose();
              scrollToSection("#contact");
            }}
          >
            Continue to updates
          </button>
        </div>
      </aside>
    </div>
  );
}

