import type { ProductCatalogItem } from "@/lib/product-catalog";

export const PRODUCT_COMPARE_ROWS = ["Price", "Interior", "Waste bin", "Entry", "Noise", "Sensors", "Wi-Fi", "Litter"] as const;

export const PRODUCT_COMPARE_LABELS: Record<string, string> = {
  "Price": "Price",
  "Interior": "Interior",
  "Waste bin": "Waste bin",
  "Entry": "Entry",
  "Noise": "Noise",
  "Sensors": "Sensors",
  "Wi-Fi": "Wi-Fi",
  "Litter": "Litter",
};

export function getCompareSpecValue(product: ProductCatalogItem, label: string) {
  return product.specs.find((spec) => spec.label.toLowerCase() === label.toLowerCase())?.value;
}