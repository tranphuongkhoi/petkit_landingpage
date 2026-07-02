"use client";

import { type FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Cat,
  ChevronUp,
  Menu,
  MessageCircle,
  PawPrint,
  Plus,
  Recycle,
  Send,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Trash2,
  Wind,
  X,
} from "lucide-react";
import type { LandingContent, LandingFeature, LandingStat } from "@/types/landing";
import type { ProductCardData, ProductFoundation, ProductSectionData } from "@/types/product-foundation";

type LandingPageProps = {
  content: LandingContent;
  productFoundation: ProductFoundation;
};

type ContentProps = {
  content: LandingContent;
};

type ProductFoundationProps = {
  productFoundation: ProductFoundation;
};

type ChatMessage = {
  from: "bot" | "user";
  text: string;
};

type CartItem = {
  id: string;
  name: string;
  role: string;
  quantity: number;
};

export function LandingPage({ content, productFoundation }: LandingPageProps) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: ProductCardData) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === product.id);

      if (existing) {
        return items.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }

      return [...items, { id: product.id, name: product.name, role: product.role, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <SiteHeader cartCount={cartCount} content={content} onCartOpen={() => setCartOpen(true)} />
      <HeroSection content={content} />
      <FeaturesSection content={content} />
      <SpecsSection content={content} />
      <ProductFamilySection onAddToCart={addToCart} productFoundation={productFoundation} />
      <ProductSectionCards onAddToCart={addToCart} section={productFoundation.ecosystem} variant="wide" />
      <UpdatesSection content={content} />
      <SiteFooter content={content} />
      <CartDrawer cartItems={cartItems} open={cartOpen} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />
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

function SiteHeader({
  cartCount,
  content,
  onCartOpen,
}: ContentProps & {
  cartCount: number;
  onCartOpen: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <header className="glass-surface fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <button
          className="flex items-center gap-2 font-display text-lg font-semibold tracking-normal text-[var(--foreground)]"
          type="button"
          onClick={() => scrollToSection(content.brand.href)}
        >
          <PawPrint className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
          {content.brand.name}
        </button>
        <nav className="hidden items-center gap-8 text-sm font-medium text-[color:rgba(32,26,20,0.76)] md:flex">
          {content.nav.map((item) => (
            <button
              key={item.href}
              className="transition hover:text-[var(--primary)]"
              type="button"
              onClick={() => scrollToSection(item.href)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
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
          <button
            className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-hover)]"
            type="button"
            onClick={() => scrollToSection("#contact")}
          >
            Get updates
          </button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <button
            aria-label="Open cart"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/45"
            type="button"
            onClick={onCartOpen}
          >
            <ShoppingCart className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
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
          {content.nav.map((item) => (
            <button
              key={item.href}
              className="block py-2.5 text-left text-sm font-semibold text-[color:rgba(32,26,20,0.78)]"
              type="button"
              onClick={() => {
                scrollToSection(item.href);
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            className="mt-3 inline-flex rounded-full bg-[var(--primary)] px-5 py-2 text-sm font-semibold text-white"
            type="button"
            onClick={() => {
              scrollToSection("#contact");
              setOpen(false);
            }}
          >
            Get updates
          </button>
        </nav>
      ) : null}
    </header>
  );
}

function HeroSection({ content }: ContentProps) {
  const { hero } = content;

  return (
    <section
      id="top"
      className="relative overflow-hidden px-5 pb-20 pt-32"
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
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight sm:text-4xl">{section.heading}</h2>
          <p className="mt-3 leading-7 text-[var(--muted-foreground)]">{section.body}</p>
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
          <span className="text-lg font-bold text-[var(--primary)]">{product.role}</span>
          <button
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--primary-hover)]"
            type="button"
            onClick={() => onAddToCart(product)}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </button>
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

function SiteFooter({ content }: ContentProps) {
  return (
    <footer className="border-t border-[var(--border)] px-5">
      <div className="mx-auto flex max-w-6xl items-center gap-2 py-8 text-sm text-[var(--muted-foreground)]">
        <PawPrint className="h-4 w-4 text-[var(--primary)]" aria-hidden="true" />
        <span>{content.footer.body}</span>
      </div>
    </footer>
  );
}

function CartDrawer({
  cartItems,
  onClose,
  onRemove,
  open,
}: {
  cartItems: CartItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  open: boolean;
}) {
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

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
                  className="flex items-center justify-between gap-4 rounded-2xl border border-[var(--border)] bg-white/70 p-4"
                >
                  <div>
                    <h3 className="font-bold">{item.name}</h3>
                    <p className="mt-1 text-sm text-[var(--muted-foreground)]">
                      {item.role} · Qty {item.quantity}
                    </p>
                  </div>
                  <button
                    aria-label={`Remove ${item.name}`}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--card)] text-[var(--primary)] transition hover:bg-[var(--accent)]"
                    type="button"
                    onClick={() => onRemove(item.id)}
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
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

function FloatingActions() {
  const [chatOpen, setChatOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      from: "bot",
      text: "Hi, I can help with Pura Max 2 specs, product fit, and PETKIT care routines.",
    },
  ]);
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
      {
        from: "bot",
        text: "Thanks for your message. A PETKIT team member will contact you as soon as possible.",
      },
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
              <p className="text-xs text-[var(--muted-foreground)]">Product guidance</p>
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
            {messages.map((message, index) => (
              <div
                key={`${message.from}-${index}`}
                className={[
                  "max-w-[82%] rounded-2xl px-3 py-2 text-sm leading-5",
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
