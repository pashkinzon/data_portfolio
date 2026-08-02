import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://pashkinzon.github.io/data_portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pavel Polishchuk — Data Analyst & Automation Builder",
  description:
    "Technical data analyst who prototypes dashboards and automations quickly, gets feedback early, and tests what is worth building.",
  icons: {
    icon: `${siteUrl}/favicon.svg`,
    shortcut: `${siteUrl}/favicon.svg`,
  },
  openGraph: {
    title: "Pavel Polishchuk — Data Analyst & Automation Builder",
    description:
      "Build fast. Test what matters. Data analysis, automation, and rapid prototyping.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-v6.png`,
        width: 1731,
        height: 909,
        alt: "Pavel Polishchuk — Build fast. Test what matters.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavel Polishchuk — Data Analyst & Automation Builder",
    description: "Build fast. Test what matters. Data analysis, automation, and rapid prototyping.",
    images: [`${siteUrl}/og-v6.png`],
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
