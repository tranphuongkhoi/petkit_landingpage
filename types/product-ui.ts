import type { ProductCatalogItem } from "@/lib/product-catalog";
import type { ReactNode } from "react";

export type ProductFaqItem = {
  answer: string;
  question: string;
};

export type ProductCompareProps = {
  currentProductId: string;
  products: ProductCatalogItem[];
};

export type ProductFaqProps = {
  body: ReactNode;
  items: ProductFaqItem[];
  productId: string;
  title: ReactNode;
};

export type ProductWhyItFitsItem = {
  body: string;
  title: string;
};

export type ProductWhyItFitsProps = {
  fallbackItems: ProductWhyItFitsItem[];
  productId: string;
};

export type ProductGalleryImage = {
  alt: string;
  src: string;
  title: string;
};

export type ProductGalleryProps = {
  images: ProductGalleryImage[];
};

export type ProductSuiteProps = {
  products: ProductCatalogItem[];
};
