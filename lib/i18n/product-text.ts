import type { Dictionary } from "@/lib/i18n/dictionaries";

export function translateCategory(dictionary: Dictionary, value: string) {
  return dictionary.product.categories[value as keyof typeof dictionary.product.categories] ?? value;
}

export function translateRole(dictionary: Dictionary, value: string) {
  return dictionary.product.roles[value as keyof typeof dictionary.product.roles] ?? value;
}

export function translateSpecLabel(dictionary: Dictionary, value: string) {
  return dictionary.product.specs[value as keyof typeof dictionary.product.specs] ?? value;
}

export function translateProductUi(dictionary: Dictionary, value: keyof Dictionary["product"]["ui"]) {
  return dictionary.product.ui[value];
}
