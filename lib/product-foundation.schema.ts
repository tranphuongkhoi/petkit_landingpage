import { z } from "zod";

const imageSchema = z
  .object({
    src: z.string(),
    alt: z.string(),
    width: z.number(),
    height: z.number(),
  })
  .nullable();

const statSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const productCardSchema = z.object({
  id: z.string(),
  name: z.string(),
  model: z.string(),
  category: z.string(),
  role: z.string(),
  badge: z.string(),
  description: z.string(),
  image: imageSchema,
  specs: z.array(statSchema),
  fit: z.string(),
});

const productSectionSchema = z.object({
  id: z.string(),
  heading: z.string(),
  body: z.string(),
  products: z.array(productCardSchema),
});

export const productFoundationSchema = z.object({
  source: z.object({
    title: z.string(),
    derivedFrom: z.string(),
    updatedAt: z.string(),
    scope: z.string(),
  }),
  litterBoxFamily: productSectionSchema,
  ecosystem: productSectionSchema,
  useCaseComparison: z.object({
    id: z.string(),
    heading: z.string(),
    body: z.string(),
    columns: z.tuple([z.string(), z.string(), z.string()]),
    rows: z.array(z.tuple([z.string(), z.string(), z.string()])),
    note: z.string(),
  }),
  claimSafety: z.object({
    safe: z.array(z.string()),
    needsCaveat: z.array(z.string()),
    doNotUse: z.array(z.string()),
  }),
});
