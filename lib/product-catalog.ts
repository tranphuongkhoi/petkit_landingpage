import productFoundationJson from "@/content/product-foundation.json";
import type { ProductCardData, ProductFoundation } from "@/types/product-foundation";

const productFoundation = productFoundationJson as ProductFoundation;

export type ProductCatalogItem = ProductCardData & {
  sectionId: string;
  sectionTitle: string;
  slug: string;
};

const sections = [productFoundation.litterBoxFamily, productFoundation.ecosystem];

export const productCatalog: ProductCatalogItem[] = sections.flatMap((section) =>
  section.products.map((product) => ({
    ...product,
    sectionId: section.id,
    sectionTitle: section.heading,
    slug: product.id,
  })),
);

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}

export function formatProductPrice(product: ProductCatalogItem) {
  return formatUsd(product.priceUsd);
}

export function formatUsd(value: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
    style: "currency",
  }).format(value);
}
