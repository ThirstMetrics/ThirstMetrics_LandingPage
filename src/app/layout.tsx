import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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
  title: "ThirstMetrics — Texas Alcohol Sales Intelligence for Reps",
  description:
    "Find the right accounts faster with enriched Texas beer, wine, and spirits receipts data. Metroplex filters, DBA names, ownership groups, and industry segment tags.",
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "ThirstMetrics — Texas Alcohol Sales Intelligence for Reps",
    description:
      "Turn public Texas alcohol receipts into actionable account intelligence with DBA resolution, segment tags, and ownership group mapping.",
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
