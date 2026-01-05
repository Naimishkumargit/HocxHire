import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";
import { jobs as localJobs } from "@/data/jobs";
import type { Metadata } from "next";
import FindJobsClient from "./FindJobsClient";

export const revalidate = 0; // Disable caching - always fetch fresh data
export const dynamic = "force-dynamic"; // Force dynamic rendering

export const metadata: Metadata = {
  title: "Find Jobs — IT, Software & Corporate Roles | HocxHire",
  description:
    "Search and apply for IT, software, DevOps, and corporate jobs in USA and India. Explore Java Developer, Cloud Engineer, Full Stack roles and more on HocxHire.",
  keywords: [
    "find jobs",
    "IT jobs",
    "software jobs",
    "jobs USA",
    "jobs India",
    "DevOps jobs",
    "Java developer jobs",
    ".NET developer jobs",
    "remote jobs",
    "contract jobs",
  ],
  openGraph: {
    title: "Find Jobs — IT, Software & Corporate Roles | HocxHire",
    description:
      "Search and apply for IT, software, DevOps, and corporate jobs in USA and India.",
    url: "https://hocxhire.com/find-jobs",
    siteName: "HocxHire",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Jobs — IT, Software & Corporate Roles | HocxHire",
    description:
      "Search and apply for IT, software, DevOps, and corporate jobs in USA and India.",
  },
};

export default async function FindJobsPage() {
  let dbJobs: any[] = [];
  try {
    await connectToDatabase();
    dbJobs = await Job.find({ draft: false }).sort({ createdAt: -1 }).lean();
  } catch (err) {
    // Fallback to local data when DB is unreachable (deployment without DB_URI)
    // eslint-disable-next-line no-console
    console.error("DB connection failed, falling back to local jobs:", err);
    dbJobs = localJobs.map((j: any) => ({
      ...j,
      createdAt: j.createdAt ?? new Date().toISOString(),
      _id: j.id?.toString?.() ?? undefined,
    }));
  }

  const jobsForUI = dbJobs.map((j: any) => ({
    _id: j._id?.toString?.() ?? undefined,
    title: j.title,
    location: j.location || "",
    type: j.type || "",
    experience: j.experience || "",
    email: j.email || "",
    skills: j.skills || [],
    summary: j.summary || "",
  }));

  // Extract unique locations and job titles for suggestions
  const uniqueLocations = [...new Set(dbJobs.map((j: any) => j.location).filter(Boolean))].sort();
  const uniqueTitles = [...new Set(dbJobs.map((j: any) => j.title).filter(Boolean))].sort();

  // JSON-LD Schema for JobPosting
  const jobPostingSchema = dbJobs.map((job: any) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary || job.description,
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
      },
    },
    hiringOrganization: {
      "@type": "Organization",
      name: "HocxHire",
      sameAs: "https://hocxhire.com",
      logo: "https://hocxhire.com/logo.jpg",
    },
    employmentType: job.type || "CONTRACTOR",
    experienceRequirements: {
      "@type": "OccupationalExperienceRequirements",
      monthsOfExperience: parseInt(job.experience) || 0,
    },
    skills: job.skills || [],
    datePosted: new Date(job.createdAt).toISOString(),
    applicantLocationRequirements: {
      "@type": "Country",
      name: "US",
    },
  }));

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HocxHire",
    url: "https://hocxhire.com",
    logo: "https://hocxhire.com/logo.jpg",
    description:
      "HocxHire connects talented professionals with growing companies across the USA and India.",
    sameAs: [
      "https://www.linkedin.com/company/hocxhire",
      "https://twitter.com/hocxhire",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: "support@hocxhire.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, ...jobPostingSchema]),
        }}
      />

      <FindJobsClient 
        initialJobs={jobsForUI} 
        locations={uniqueLocations}
        jobTitles={uniqueTitles}
      />
    </>
  );
}
