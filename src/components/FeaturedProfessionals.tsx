import React from "react";
import { ArrowRight } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Professional from "@/models/Professional";
import { professionals as localProfessionals } from "@/data/Professionals";
import ProfessionalCard from "./ProfessionalCard"; // card tailored for professional profiles
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

// simplified interface for UI consumption
interface ProfessionalData {
  _id: string;
  fullName: string;
  jobTitle?: string;
  experience?: string;
  location?: string;
  keySkills: string[];
  email?: string;
  phone?: string;
  linkedin?: string;
  owner?: string; // objectid string
}

const FeaturedProfessionals = async () => {
  let dbItems: any[] = [];
  let isAdmin = false;

  // check session to determine admin status
  try {
    const session = await getServerSession(authOptions);
    isAdmin = (session?.user as any)?.role === "admin";
  } catch {}

  try {
    await connectToDatabase();
    dbItems = await Professional.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("FeaturedProfessionals: DB unavailable, using local professionals:", err);
    dbItems = localProfessionals
      .slice()
      .sort((a, b) => (b.id || 0) - (a.id || 0))
      .slice(0, 6)
      .map((p: any) => ({
        _id: p.id?.toString?.() ?? "",
        fullName: p.fullName ?? "",
        jobTitle: p.jobTitle ?? "",
        location: p.location ?? "",
        experience: p.experience ?? "",
        email: p.email ?? "",
        phone: p.phone ?? "",
        linkedin: p.linkedin ?? "",
        keySkills: Array.isArray(p.keySkills) ? p.keySkills : [],
      }));
  }

  const profilesForUI: ProfessionalData[] = dbItems.map((p: any) => {
    const base: ProfessionalData = {
      _id: p._id?.toString?.() ?? p._id ?? p.id?.toString?.() ?? "",
      fullName: p.fullName ?? "",
      jobTitle: p.jobTitle ?? "",
      location: p.location ?? "",
      experience: p.experience ?? "",
      keySkills: Array.isArray(p.keySkills) ? p.keySkills : [],
      owner: p.owner ? p.owner.toString() : undefined,
    };
    if (isAdmin) {
      base.email = p.email ?? "";
      base.phone = p.phone ?? "";
      base.linkedin = p.linkedin ?? "";
    }
    return base;
  });
  return (
    <>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark">
          <div className="flex items-center justify-between sm:px-12 px-2 pt-4">
            <h2 className="text-left text-xl font-semibold">
              Featured Professionals
            </h2>

            <a
              href="/find-professionals"
              className="flex items-center gap-2 mb-3 sm:px-4 py-1 rounded-md transition hover:text-[var(--color-accent-gold)]"
            >
              <b>View All</b>
              <ArrowRight className="w-6 h-6 font-bold" />
            </a>
          </div>

          <div className="py-8 px-4 sm:px-6 lg:px-8">
            {profilesForUI.length === 0 ? (
              <p className="text-center text-gray-500">No professionals found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {profilesForUI.map((prof) => (
                  <ProfessionalCard key={prof._id} professional={prof as any} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProfessionals;
