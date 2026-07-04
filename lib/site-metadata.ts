import type { Metadata } from "next";

export const siteUrl = "https://helicorp-petkit.vercel.app";

export const rootMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "PETKIT",
  description:
    "Explore PETKIT Pura Max 2, a smart self-cleaning litter box for modern cat homes, with daily care features and app-connected behavior logs.",
  alternates: {
    canonical: "/",
  },
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
    url: siteUrl,
    images: [
      {
        url: "/cover.png",
        width: 512,
        height: 512,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PETKIT Pura Max 2 | Smart Cat Care",
    description:
      "A product landing page for PETKIT Pura Max 2 and the Smart Cat Care ecosystem.",
    images: ["/cover.png"],
  },
};

export const productsPageMetadata = {
  title: "PETKIT Products | Smart Cat Care",
  description:
    "Browse PETKIT litter care, feeding, and hydration products in one smart cat care lineup.",
  alternates: {
    canonical: "/products",
  },
};
