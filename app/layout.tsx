import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://pashkinzon.github.io/data_portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pavel Polishchuk — Data Products with Measurable Impact",
  description:
    "Mathematics student and data analyst building self-service software, analytical models, automations, pipelines, APIs, and practical AI tools.",
  icons: {
    icon: `${siteUrl}/favicon.svg`,
    shortcut: `${siteUrl}/favicon.svg`,
  },
  openGraph: {
    title: "Pavel Polishchuk — Data Products with Measurable Impact",
    description:
      "−73% delivery time, ~€760k conservatively derived revenue, and an 8-hour KPI workflow reduced to under 15 minutes.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-kpi.png`,
        width: 1731,
        height: 909,
        alt: "Pavel Polishchuk — Data products with measurable impact.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavel Polishchuk — Data Products with Measurable Impact",
    description: "−73% delivery time, ~€760k conservatively derived revenue, and an 8-hour KPI workflow reduced to under 15 minutes.",
    images: [`${siteUrl}/og-kpi.png`],
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
