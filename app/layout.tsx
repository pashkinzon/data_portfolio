import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://pashkinzon.github.io/data_portfolio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Pavel Polishchuk — Data Analyst & Automation Builder",
  description:
    "Working-student data analyst building evidence-led dashboards, reporting automations, and self-service analytical tools.",
  icons: {
    icon: `${siteUrl}/favicon.svg`,
    shortcut: `${siteUrl}/favicon.svg`,
  },
  openGraph: {
    title: "Pavel Polishchuk — Data Analyst & Automation Builder",
    description:
      "Define clearly. Build what helps. Data analysis, automation, and self-service tools.",
    url: siteUrl,
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-v6.png`,
        width: 1731,
        height: 909,
        alt: "Pavel Polishchuk — Data analysis, automation, and self-service tools.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pavel Polishchuk — Data Analyst & Automation Builder",
    description: "Define clearly. Build what helps. Data analysis, automation, and self-service tools.",
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
