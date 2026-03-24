import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ThirstMetrics — Software for the Beverage Industry",
  description:
    "ThirstMetrics builds tools for beverage professionals — from street-level market intelligence to inventory management to menu printing software.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "ThirstMetrics — Software for the Beverage Industry",
    description:
      "ThirstMetrics builds tools for beverage professionals — from street-level market intelligence to inventory management to menu printing software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KBN2TRTQG0"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KBN2TRTQG0');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
