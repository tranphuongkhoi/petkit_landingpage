"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Check, Heart, Minus, Plus, ShoppingCart, X } from "lucide-react";
import {
  CART_STORAGE_KEY,
  CART_UPDATED_EVENT,
  RECENT_STORAGE_KEY,
  WISHLIST_STORAGE_KEY,
  getCartItemCount,
  getItemPrice,
  getStoredCart,
  readStoredArray,
  type StoredCartItem,
  writeCart,
} from "@/lib/cart-storage";
import { formatUsd, type ProductCatalogItem } from "@/lib/product-catalog";

export function ProductActionBar({ product }: { product: ProductCatalogItem }) {
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = readStoredArray<string>(WISHLIST_STORAGE_KEY, []);
    setWishlisted(wishlist.includes(product.id));
  }, [product.id]);

  const addToCart = () => {
    const storedCart = readStoredArray<StoredCartItem>(CART_STORAGE_KEY, []);
    const existing = storedCart.find((item) => item.id === product.id);
    const nextCart = existing
      ? storedCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      : [
          ...storedCart,
          {
            id: product.id,
            image: product.image,
            name: product.name,
            priceUsd: product.priceUsd,
            role: product.role,
            slug: product.slug,
            quantity: 1,
          },
        ];

    writeCart(nextCart);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  const toggleWishlist = () => {
    const wishlist = readStoredArray<string>(WISHLIST_STORAGE_KEY, []);
    const nextWishlist = wishlist.includes(product.id)
      ? wishlist.filter((id) => id !== product.id)
      : [...wishlist, product.id];

    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(nextWishlist));
    setWishlisted(nextWishlist.includes(product.id));
  };

  return (
    <div className="relative flex flex-wrap gap-3">
      <button
        className="inline-flex items-center rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-bold text-white transition hover:bg-[var(--primary-hover)]"
        type="button"
        onClick={addToCart}
      >
        {added ? <Check className="mr-2 h-4 w-4" aria-hidden="true" /> : <Plus className="mr-2 h-4 w-4" aria-hidden="true" />}
        {added ? "Added" : "Add to cart"}
      </button>
      <button
        className="inline-flex items-center rounded-full border border-[var(--border)] bg-white/50 px-5 py-3 text-sm font-bold text-[var(--primary)] transition hover:bg-[var(--card)]"
        type="button"
        onClick={toggleWishlist}
      >
        <Heart className={["mr-2 h-4 w-4", wishlisted ? "fill-[var(--primary)]" : ""].join(" ")} aria-hidden="true" />
        {wishlisted ? "Saved" : "Save"}
      </button>
      {added ? (
        <div className="absolute -bottom-12 left-0 rounded-full border border-[var(--border)] bg-white px-4 py-2 text-xs font-bold text-[var(--foreground)] shadow-lg">
          Added to cart
        </div>
      ) : null}
    </div>
  );
}

export function CartCountBadge() {
  const [count, setCount] = useState(0);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const cart = getStoredCart();
      setCount(getCartItemCount(cart));
      setBouncing(true);
      window.setTimeout(() => setBouncing(false), 1320);
    };

    const cart = getStoredCart();
    setCount(getCartItemCount(cart));
    window.addEventListener(CART_UPDATED_EVENT, updateCount);
    window.addEventListener("storage", updateCount);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, updateCount);
      window.removeEventListener("storage", updateCount);
    };
  }, []);

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white/55 px-3 py-2 text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]",
        bouncing ? "animate-[cart-bounce_0.42s_ease-in-out_3]" : "",
      ].join(" ")}
    >
      <ShoppingCart className="h-3.5 w-3.5 text-[var(--primary)]" aria-hidden="true" />
      {count}
    </span>
  );
}

export function SiteCartControl() {
  const [cartOpen, setCartOpen] = useState(false);
  const [items, setItems] = useState<StoredCartItem[]>([]);
  const [bouncing, setBouncing] = useState(false);

  useEffect(() => {
    const sync = () => {
      setItems(getStoredCart());
      setBouncing(true);
      window.setTimeout(() => setBouncing(false), 1320);
    };

    setItems(getStoredCart());
    window.addEventListener(CART_UPDATED_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(CART_UPDATED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const updateQuantity = (id: string, quantity: number) => {
    const nextItems = items
      .map((item) => (item.id === id ? { ...item, quantity } : item))
      .filter((item) => item.quantity > 0);
    setItems(nextItems);
    writeCart(nextItems);
  };

  const removeItem = (id: string) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
    writeCart(nextItems);
  };

  return (
    <>
      <button
        aria-label="Open cart"
        className={[
          "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-white/45 transition hover:bg-white/75",
          bouncing ? "animate-[cart-bounce_0.42s_ease-in-out_3]" : "",
        ].join(" ")}
        type="button"
        onClick={() => setCartOpen(true)}
      >
        <ShoppingCart className="h-5 w-5 text-[var(--primary)]" aria-hidden="true" />
        {getCartItemCount(items) > 0 ? (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-xs font-bold text-white">
            {getCartItemCount(items)}
          </span>
        ) : null}
      </button>
      <CartDrawer
        cartItems={items}
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onQuantityChange={updateQuantity}
        onRemove={removeItem}
      />
    </>
  );
}

export function RecentlyViewedTracker({ product }: { product: ProductCatalogItem }) {
  useEffect(() => {
    const recentlyViewed = readStoredArray<string>(RECENT_STORAGE_KEY, []);
    const nextItems = [product.id, ...recentlyViewed.filter((id) => id !== product.id)].slice(0, 5);
    window.localStorage.setItem(RECENT_STORAGE_KEY, JSON.stringify(nextItems));
  }, [product.id]);

  return null;
}

export function StoredProductStatus({ products }: { products: ProductCatalogItem[] }) {
  const [wishlistItems, setWishlistItems] = useState<ProductCatalogItem[]>([]);
  const [recentItems, setRecentItems] = useState<ProductCatalogItem[]>([]);

  useEffect(() => {
    const wishlist = readStoredArray<string>(WISHLIST_STORAGE_KEY, []);
    const recent = readStoredArray<string>(RECENT_STORAGE_KEY, []);

    setWishlistItems(
      wishlist
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is ProductCatalogItem => Boolean(product)),
    );
    setRecentItems(
      recent
        .map((id) => products.find((product) => product.id === id))
        .filter((product): product is ProductCatalogItem => Boolean(product)),
    );
  }, [products]);

  return (
    <aside className="grid gap-7">
      <ProductStatusList
        title="Saved"
        emptyText="Saved products appear here after you tap Save."
        items={wishlistItems}
      />
      <ProductStatusList
        title="Recently viewed"
        emptyText="Product pages appear here after you open them."
        items={recentItems}
      />
    </aside>
  );
}

function ProductStatusList({
  emptyText,
  items,
  title,
}: {
  emptyText: string;
  items: ProductCatalogItem[];
  title: string;
}) {
  return (
    <section className="max-h-72 overflow-y-auto rounded-[1.35rem] border border-[var(--border)] bg-white/45 p-5 shadow-sm">
      <p className="text-[0.68rem] font-bold uppercase text-[var(--primary)]">{title}</p>
      <div className="mt-4 grid gap-3">
        {items.length > 0 ? (
          items.map((product) => (
            <div key={product.id} className="grid grid-cols-[2.25rem_1fr] items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg bg-[var(--card)]">
                {product.image ? (
                  <Image
                    alt={product.image.alt}
                    className="h-full w-full object-cover"
                    height={product.image.height}
                    src={product.image.src}
                    width={product.image.width}
                  />
                ) : null}
              </div>
              <div className="min-w-0">
                <p className="truncate text-xs font-bold text-[var(--foreground)]">{product.name}</p>
                <p className="truncate text-[0.68rem] font-bold uppercase text-[var(--muted-foreground)]">{product.role}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xs leading-5 text-[var(--muted-foreground)]">{emptyText}</p>
        )}
      </div>
    </section>
  );
}

export function CartDrawer({
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

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (!open) return null;

  return createPortal(
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
                        <Link className="font-bold leading-snug hover:text-[var(--primary)]" href={`/products/${item.slug}`}>
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs font-bold uppercase text-[var(--muted-foreground)]">{item.role}</p>
                        <p className="mt-2 text-sm font-bold text-[var(--primary)]">{formatUsd(getItemPrice(item))}</p>
                      </div>
                      <button
                        className="text-xs font-bold uppercase text-[var(--muted-foreground)] transition hover:text-[var(--primary)]"
                        type="button"
                        onClick={() => onRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-[var(--border)] bg-white">
                        <button
                          aria-label={`Decrease ${item.name}`}
                          className="flex h-8 w-8 items-center justify-center"
                          type="button"
                          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <span className="min-w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button
                          aria-label={`Increase ${item.name}`}
                          className="flex h-8 w-8 items-center justify-center"
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
            <span className="font-bold uppercase text-[var(--muted-foreground)]">{totalItems} items</span>
            <span className="font-display text-2xl font-bold text-[var(--primary)]">{formatUsd(totalPrice)}</span>
          </div>
          <p className="mt-2 text-xs leading-5 text-[var(--muted-foreground)]">
            USD reference total. Final pricing can vary by market and purchase channel.
          </p>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
