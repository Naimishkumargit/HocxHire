import { MetadataRoute } from "next";
import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://hocxhire.com";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/find-jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Dynamic job pages
  try {
    await connectToDatabase();
    const jobs = await Job.find({ draft: false }).select("_id createdAt").lean();

    const jobPages: MetadataRoute.Sitemap = jobs.map((job: any) => ({
      url: `${baseUrl}/find-jobs/${job._id}`,
      lastModified: new Date(job.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

    return [...staticPages, ...jobPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    return staticPages;
  }
}
