import { productCatalog, type ProductCatalogItem } from "@/lib/product-catalog";

export const productListingNav = [
  { href: "/products", label: "Lineup" },
  { href: "/products/puramax-2", label: "Pura Max 2" },
  { href: "/products/puramax-2#compare", label: "Compare" },
];

export const litterBoxProducts = productCatalog.filter((product) => product.sectionId === "litter-box-family");
export const ecosystemProducts = productCatalog.filter((product) => product.sectionId === "ecosystem");
export const listingProducts = productCatalog;

export function getPublicCardSpecs(product: ProductCatalogItem) {
  return product.specs.filter(
    (spec) =>
      !spec.label.toLowerCase().includes("caveat") &&
      !spec.label.toLowerCase().includes("health") &&
      !spec.label.toLowerCase().includes("litter"),
  );
}
