export const STORAGE_KEYS = {
  cart: "petkit_cart_items",
  cartUpdatedEvent: "petkit-cart-updated",
  wishlist: "petkit_wishlist_items",
  recent: "petkit_recently_viewed",
  chatMessages: "petkit_assistant_messages",
  locale: "petkit_locale",
  theme: "petkit_theme",
  contactDraft: "petkit_update_contact",
} as const;

export const PRODUCT_IDS = {
  puramax2: "puramax-2",
  purobotMaxPro2: "purobot-max-pro-2",
  purobotCrystalDuo: "purobot-crystal-duo",
  yumshareSolo: "yumshare-solo",
  eversweetMax2: "eversweet-max-2",
} as const;

export const PRODUCT_SECTIONS = {
  litterBoxFamily: "litter-box-family",
  ecosystem: "ecosystem",
} as const;

export const LOCALSTORAGE_MAX_HISTORY = {
  chat: 16,
  recent: 5,
} as const;
