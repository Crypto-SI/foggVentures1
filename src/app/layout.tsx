import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { FlashIntro } from "@/components/flash-intro";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fogg.ventures"),
  title: {
    default: "FOGG Ventures",
    template: "%s | FOGG Ventures",
  },
  description:
    "High-level consultancy services in Guyana, led by a former British diplomat with deep governmental and commercial experience.",
  openGraph: {
    title: "FOGG Ventures",
    description:
      "High-level consultancy services in Guyana for investors, governments, and strategic partners.",
    url: "https://www.fogg.ventures",
    siteName: "FOGG Ventures",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Literata:opsz,wght@7..72,400;7..72,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {/* Flash intro overlay - runs once per session and respects reduced motion */}
        {/* Implemented in [`src/components/flash-intro.FlashIntro()`](src/components/flash-intro.tsx:1) */}
        <FlashIntro />
        <div id="fogg-root" className="relative">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
