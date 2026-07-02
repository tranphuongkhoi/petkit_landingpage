import productFoundationData from "@/content/product-foundation.json";
import { productFoundationSchema } from "@/lib/product-foundation.schema";

export const productFoundation = productFoundationSchema.parse(productFoundationData);
