import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("host") || "localhost:5173";
  const forwardedProto = requestHeaders.get("x-forwarded-proto");
  const protocol = forwardedProto || (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    metadataBase: new URL(origin),
    title: "Pavel Polishchuk — Data Product Owner & Analytics Builder",
    description:
      "I design and ship dashboards, data workflows, and internal AI tools—from an ambiguous retail question to measurable adoption.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Pavel Polishchuk — Data Product Owner & Analytics Builder",
      description:
        "Dashboards, data workflows, and internal AI tools—from an ambiguous retail question to measurable adoption.",
      type: "website",
      images: [
        {
          url: `${origin}/og-v4.png`,
          width: 1731,
          height: 909,
          alt: "Pavel Polishchuk — I own what gets built.",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Pavel Polishchuk — Data Product Owner & Analytics Builder",
      description: "Dashboards, data workflows, and internal AI tools—from an ambiguous retail question to measurable adoption.",
      images: [`${origin}/og-v4.png`],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
