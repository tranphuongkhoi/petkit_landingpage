import type { LandingContent } from "@/types/landing";
import type { ProductFoundation } from "@/types/product-foundation";

export type LandingPageProps = {
  content: LandingContent;
  productFoundation: ProductFoundation;
};

export type ContentProps = {
  content: LandingContent;
};

export type ProductFoundationProps = {
  productFoundation: ProductFoundation;
};
