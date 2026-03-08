import connectToDatabase from "@/lib/mongodb";
import Professional from "@/models/Professional";
import { professionals as localProfessionals } from "@/data/Professionals";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import FindProfessionalsClient from "./FindProfessionalsClient";

export const revalidate = 0; // always fresh
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Find Professionals — HocxHire",
  description: "Search and discover skilled professionals across the USA and India for your next project or full‑time hire.",
  keywords: [
    "find professionals",
    "IT talent",
    "freelancers",
    "developers",
    "hire professionals",
  ],
  openGraph: {
    title: "Find Professionals — HocxHire",
    description: "Search and discover skilled professionals across the USA and India for your next project or full‑time hire.",
    url: "https://hocxhire.com/find-professionals",
    siteName: "HocxHire",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Find Professionals — HocxHire",
    description: "Search and discover skilled professionals across the USA and India for your next project or full‑time hire.",
  },
  alternates: { canonical: "https://hocxhire.com/find-professionals" },
};

export default async function FindProfessionalsPage() {
  let dbItems: any[] = [];
  let isAdmin = false;

  // determine admin status server-side
  try {
    const session = await getServerSession(authOptions);
    isAdmin = (session?.user as any)?.role === "admin";
  } catch {}

  try {
    await connectToDatabase();
    dbItems = await Professional.find().sort({ createdAt: -1 }).lean();
  } catch (err) {
    // fallback
    // eslint-disable-next-line no-console
    console.error("DB connection failed, falling back to local professionals:", err);
    dbItems = localProfessionals.map((p: any) => ({
      ...p,
      _id: p.id?.toString?.() ?? undefined,
    }));
  }

  const profsForUI = dbItems.map((p: any) => {
    const base: any = {
      _id: p._id?.toString?.() ?? undefined,
      fullName: p.fullName,
      jobTitle: p.jobTitle || "",
      location: p.location || "",
      experience: p.experience || "",
      keySkills: p.keySkills || [],
      owner: p.owner ? p.owner.toString() : undefined,
    };
    if (isAdmin) {
      base.email = p.email || "";
      base.phone = p.phone || "";
      base.linkedin = p.linkedin || "";
    }
    return base;
  });

  const uniqueLocations = [...new Set(dbItems.map((p: any) => p.location).filter(Boolean))].sort();
  const uniqueTitles = [...new Set(dbItems.map((p: any) => p.jobTitle).filter(Boolean))].sort();

  return (
    <FindProfessionalsClient
      initialProfessionals={profsForUI}
      locations={uniqueLocations}
      titles={uniqueTitles}
    />
  );
}