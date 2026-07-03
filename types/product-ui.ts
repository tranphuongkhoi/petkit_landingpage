import type { ProductCatalogItem } from "@/lib/product-catalog";

export type ProductFaqItem = {
  answer: string;
  question: string;
};

export type ProductCompareProps = {
  currentProductId: string;
  products: ProductCatalogItem[];
};

export type ProductFaqProps = {
  body: string;
  items: ProductFaqItem[];
  title: string;
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
