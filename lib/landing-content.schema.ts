import { z } from "zod";

const ctaSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const statSchema = z.object({
  label: z.string(),
  value: z.string(),
});

const featureSchema = z.object({
  title: z.string(),
  body: z.string(),
});

const formFieldSchema = z.object({
  label: z.string(),
  name: z.string(),
  type: z.enum(["text", "email"]),
  placeholder: z.string(),
});

const imageSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
});

export const landingContentSchema = z.object({
  brand: z.object({
    name: z.string(),
    href: z.string(),
  }),
  nav: z.array(
    z.object({
      label: z.string(),
      href: z.string(),
    }),
  ),
  hero: z.object({
    productName: z.string(),
    headline: z.string(),
    body: z.string(),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema,
    visual: z.object({
      label: z.string(),
      title: z.string(),
      caption: z.string(),
      image: imageSchema,
      stats: z.array(statSchema),
    }),
  }),
  careSystem: z.object({
    id: z.string(),
    heading: z.string(),
    body: z.string(),
    items: z.array(
      z.object({
        title: z.string(),
        product: z.string(),
        body: z.string(),
      }),
    ),
  }),
  primaryProduct: z.object({
    id: z.string(),
    name: z.string(),
    model: z.string(),
    heading: z.string(),
    body: z.string(),
    stats: z.array(statSchema),
    features: z.array(featureSchema),
  }),
  comparison: z.object({
    id: z.string(),
    heading: z.string(),
    body: z.string(),
    columns: z.tuple([z.string(), z.string(), z.string()]),
    rows: z.array(z.tuple([z.string(), z.string(), z.string()])),
    note: z.string(),
  }),
  updates: z.object({
    id: z.string(),
    heading: z.string(),
    body: z.string(),
    fields: z.array(formFieldSchema),
    submitLabel: z.string(),
    disclaimer: z.string(),
  }),
  footer: z.object({
    body: z.string(),
  }),
});
