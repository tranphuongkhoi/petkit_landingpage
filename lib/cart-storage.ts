import { productCatalog, type ProductCatalogItem } from "@/lib/product-catalog";

export type StoredCartItem = {
  id: string;
  image: ProductCatalogItem["image"];
  name: string;
  priceUsd?: number;
  quantity: number;
  role: string;
  slug: string;
};

export const CART_STORAGE_KEY = "petkit_cart_items";
export const CART_UPDATED_EVENT = "petkit-cart-updated";
export const WISHLIST_STORAGE_KEY = "petkit_wishlist_items";
export const RECENT_STORAGE_KEY = "petkit_recently_viewed";

export function readStoredArray<T>(key: string, fallback: T[]): T[] {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function writeCart(cart: StoredCartItem[]) {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event(CART_UPDATED_EVENT));
}

export function getStoredCart() {
  return readStoredArray<StoredCartItem>(CART_STORAGE_KEY, []);
}

export function getItemPrice(item: StoredCartItem) {
  return item.priceUsd ?? productCatalog.find((product) => product.id === item.id)?.priceUsd ?? 0;
}

export function getCartItemCount(items: StoredCartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}
