import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PETKIT Pura Max 2 | Smart Cat Care by HeLiCorp",
  description:
    "Explore PETKIT Pura Max 2, a smart self-cleaning litter box for modern cat homes, with daily care features and app-connected behavior logs.",
  openGraph: {
    title: "PETKIT Pura Max 2 | Smart Cat Care by HeLiCorp",
    description:
      "A product landing page for PETKIT Pura Max 2 and the Smart Cat Care ecosystem.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
