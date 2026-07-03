import type { Metadata } from "next";

export const rootMetadata: Metadata = {
  title: "PETKIT",
  description:
    "Explore PETKIT Pura Max 2, a smart self-cleaning litter box for modern cat homes, with daily care features and app-connected behavior logs.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "PETKIT Pura Max 2 | Smart Cat Care",
    description:
      "A product landing page for PETKIT Pura Max 2 and the Smart Cat Care ecosystem.",
    type: "website",
  },
};

export const productsPageMetadata = {
  title: "PETKIT Products | Smart Cat Care",
  description: "Browse PETKIT litter care, feeding, and hydration products in one smart cat care lineup.",
};
