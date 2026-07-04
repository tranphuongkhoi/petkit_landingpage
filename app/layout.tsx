import { Analytics } from "@vercel/analytics/next";
import { AppPreferencesProvider } from "@/components/providers/app-preferences";
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
        <AppPreferencesProvider>{children}</AppPreferencesProvider>
        <Analytics />
      </body>
    </html>
  );
}
