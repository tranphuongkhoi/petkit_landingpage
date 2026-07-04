import enAssistant from "@/lib/i18n/locales/en/assistant.json";
import enCart from "@/lib/i18n/locales/en/cart.json";
import enCommon from "@/lib/i18n/locales/en/common.json";
import enForm from "@/lib/i18n/locales/en/form.json";
import enLanding from "@/lib/i18n/locales/en/landing.json";
import enNav from "@/lib/i18n/locales/en/nav.json";
import enProduct from "@/lib/i18n/locales/en/product.json";
import enProductDetail from "@/lib/i18n/locales/en/product-detail.json";
import viAssistant from "@/lib/i18n/locales/vi/assistant.json";
import viCart from "@/lib/i18n/locales/vi/cart.json";
import viCommon from "@/lib/i18n/locales/vi/common.json";
import viForm from "@/lib/i18n/locales/vi/form.json";
import viLanding from "@/lib/i18n/locales/vi/landing.json";
import viNav from "@/lib/i18n/locales/vi/nav.json";
import viProduct from "@/lib/i18n/locales/vi/product.json";
import viProductDetail from "@/lib/i18n/locales/vi/product-detail.json";

export type Locale = "en" | "vi";

const en = {
  assistant: enAssistant,
  cart: enCart,
  common: enCommon,
  form: enForm,
  landing: enLanding,
  nav: enNav,
  product: enProduct,
  productDetail: enProductDetail,
};

const vi = {
  assistant: viAssistant,
  cart: viCart,
  common: viCommon,
  form: viForm,
  landing: viLanding,
  nav: viNav,
  product: viProduct,
  productDetail: viProductDetail,
};

export type Dictionary = typeof en;

export const dictionaries: Record<Locale, Dictionary> = {
  en,
  vi,
};
