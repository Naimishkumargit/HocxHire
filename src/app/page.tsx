import type { Metadata } from "next";
import FeaturedProfessionals from "@/components/FeaturedProfessionals";
import HeroSection from "@/components/Herosection";
import RecentJobs from "@/components/RecentJobs";

export const metadata: Metadata = {
  title: "HocxHire — Home",
  description:
    "HocxHire helps you discover IT, startup, and corporate job opportunities across the USA and India. Browse fresh listings or submit your profile today.",
  keywords: [
    "HocxHire",
    "jobs in USA",
    "jobs in India",
    "IT jobs",
    "software jobs",
    "career",
    "job portal",
  ],
  openGraph: {
    title: "HocxHire — Home",
    description:
      "HocxHire helps you discover IT, startup, and corporate job opportunities across the USA and India.",
    url: "https://hocxhire.com",
    siteName: "HocxHire",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HocxHire — Home",
    description:
      "HocxHire helps you discover IT, startup, and corporate job opportunities across the USA and India.",
  },
  alternates: { canonical: "https://hocxhire.com" },
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecentJobs />
      <FeaturedProfessionals />

    </>
  );
}
