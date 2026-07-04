import type { MetadataRoute } from "next";
import { productCatalog } from "@/lib/product-catalog";
import { siteUrl } from "@/lib/site-metadata";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const productRoutes = productCatalog.map((product) => ({
    changeFrequency: "weekly" as const,
    lastModified: now,
    priority: product.slug === "puramax-2" ? 0.9 : 0.7,
    url: `${siteUrl}/products/${product.slug}`,
  }));

  return [
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 1,
      url: siteUrl,
    },
    {
      changeFrequency: "weekly",
      lastModified: now,
      priority: 0.8,
      url: `${siteUrl}/products`,
    },
    ...productRoutes,
  ];
}
