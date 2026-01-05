// src/app/layout.tsx
import { Inter, Roboto_Mono } from "next/font/google";
import type { Metadata } from "next";
import SessionProviderWrapper from "./providers/SessionProviderWrapper";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HocxHire — Find Jobs in USA & India",
  description:
    "HocxHire connects talented professionals with growing companies across the USA and India. Discover IT, startup, and corporate jobs.",
  keywords: [
    "HocxHire",
    "jobs in USA",
    "jobs in India",
    "IT jobs",
    "software jobs",
    "remote jobs",
    "contract jobs",
    "hire",
    "recruiting",
    "career",
    "Hocx Hire",
    "job search",
    "talent acquisition",
    "employment",
    "job opportunities",
    "job blogs",
    "career advice",
  ],
  robots: "index, follow",
  openGraph: {
    title: "HocxHire — Find Jobs in USA & India",
    description:
      "HocxHire connects talented professionals with growing companies across the USA and India.",
    url: "https://hocxhire.com",
    siteName: "HocxHire",
    images: [
      {
        url: "og-image.jpg",
        alt: "HocxHire",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HocxHire — Find Jobs in USA & India",
    description:
      "HocxHire connects talented professionals with growing companies across the USA and India.",
    images: ["og-image.jpg"],
  },
  alternates: { canonical: "https://hocxhire.com" },
  icons: {
    icon: "logo.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning={true}>
        <SessionProviderWrapper>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}