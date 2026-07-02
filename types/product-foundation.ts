import type { z } from "zod";
import type { productFoundationSchema } from "@/lib/product-foundation.schema";

export type ProductFoundation = z.infer<typeof productFoundationSchema>;
export type ProductCardData = ProductFoundation["litterBoxFamily"]["products"][number];
export type ProductSectionData = ProductFoundation["litterBoxFamily"];
