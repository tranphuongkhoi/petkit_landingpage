import productFoundationJson from "@/content/product-foundation.json";
import type { ProductCardData, ProductFoundation } from "@/types/product-foundation";
import { formatUsd } from "@/lib/pricing";

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
    slug: product.id as string,
  })),
);

export function getProductBySlug(slug: string) {
  return productCatalog.find((product) => product.slug === slug);
}

export function formatProductPrice(product: ProductCatalogItem) {
  return formatUsd(product.priceUsd);
}