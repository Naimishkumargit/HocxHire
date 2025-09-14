// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google"; // Google Fonts use करें
import SessionProviderWrapper from "./providers/SessionProviderWrapper";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Google Fonts - Next.js 14.2.19 में available
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HocxHire",
  description: "Find your next opportunity with HocxHire",
  icons: {
    icon: "/logo.jpg",
    shortcut: "/logo.jpg",
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