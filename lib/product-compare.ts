import { formatProductPrice, type ProductCatalogItem } from "@/lib/product-catalog";

export const PRODUCT_COMPARE_ROWS = ["Price", "Interior", "Waste bin", "Entry", "Noise", "Sensors", "Wi-Fi", "Litter"];

export function getCompareSpecValue(product: ProductCatalogItem, label: string) {
  if (label === "Price") return formatProductPrice(product);
  return product.specs.find((spec) => spec.label.toLowerCase() === label.toLowerCase())?.value ?? "Check detail page";
}
