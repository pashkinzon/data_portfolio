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
    title: "Pavel Polishchuk — Data Analyst & Automation Builder",
    description:
      "Technical data analyst who prototypes dashboards and automations quickly, gets feedback early, and tests what is worth building.",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Pavel Polishchuk — Data Analyst & Automation Builder",
      description:
        "Build fast. Test what matters. Data analysis, automation, and rapid prototyping.",
      type: "website",
      images: [
        {
          url: `${origin}/og-v5.png`,
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
      images: [`${origin}/og-v5.png`],
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
