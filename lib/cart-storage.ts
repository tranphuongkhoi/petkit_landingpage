import { productCatalog, type ProductCatalogItem } from "@/lib/product-catalog";
import { STORAGE_KEYS } from "@/lib/constants";

export type StoredCartItem = {
  id: string;
  image: ProductCatalogItem["image"];
  name: string;
  priceUsd?: number;
  quantity: number;
  role: string;
  slug: string;
};

export const CART_STORAGE_KEY = STORAGE_KEYS.cart;
export const CART_UPDATED_EVENT = STORAGE_KEYS.cartUpdatedEvent;
export const WISHLIST_STORAGE_KEY = STORAGE_KEYS.wishlist;
export const RECENT_STORAGE_KEY = STORAGE_KEYS.recent;

export function readStoredArray<T>(key: string, fallback: T[]): T[] {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T[]) : fallback;
  } catch {
    return fallback;
  }
}

export function writeCart(cart: StoredCartItem[]) {
  window.localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(cart));
  window.dispatchEvent(new Event(STORAGE_KEYS.cartUpdatedEvent));
}

export function getStoredCart() {
  return readStoredArray<StoredCartItem>(STORAGE_KEYS.cart, []);
}

export function getItemPrice(item: StoredCartItem) {
  return item.priceUsd ?? productCatalog.find((product) => product.id === item.id)?.priceUsd ?? 0;
}

export function getCartItemCount(items: StoredCartItem[]) {
  return items.reduce((total, item) => total + item.quantity, 0);
}