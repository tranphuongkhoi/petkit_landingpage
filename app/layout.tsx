import { Analytics } from "@vercel/analytics/next";
import { rootMetadata } from "@/lib/site-metadata";
import "./globals.css";

export const metadata = rootMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
