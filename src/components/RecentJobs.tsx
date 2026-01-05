import React from "react";
import { ArrowRight } from "lucide-react";
import JobCard from "./JobCard";
import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";
import { jobs as localJobs } from "@/data/jobs";

interface JobData {
  _id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  email: string;
  skills: string[];
  summary: string;
}

const RecentJobs = async () => {
  let dbJobs: any[] = [];
  try {
    await connectToDatabase();
    dbJobs = await Job.find({ draft: false })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("RecentJobs: DB unavailable, using local jobs:", err);
    dbJobs = localJobs
      .slice()
      .sort((a, b) => (b.id || 0) - (a.id || 0))
      .slice(0, 6)
      .map((j: any) => ({
        _id: j.id?.toString?.() ?? "",
        title: j.title ?? "",
        location: j.location ?? "",
        type: j.type ?? "",
        experience: j.experience ?? "",
        email: j.email ?? "",
        skills: Array.isArray(j.skills) ? j.skills : [],
        summary: j.summary ?? "",
      }));
  }

  const jobsForUI: JobData[] = dbJobs.map((j: any) => ({
    _id: j._id?.toString?.() ?? j._id ?? j.id?.toString?.() ?? "",
    title: j.title ?? "",
    location: j.location ?? "",
    type: j.type ?? "",
    experience: j.experience ?? "",
    email: j.email ?? "",
    skills: Array.isArray(j.skills) ? j.skills : [],
    summary: j.summary ?? "",
  }));
  return (
    <>
      <hr />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark">
          <div className="flex items-center justify-between sm:px-12 px-2 pt-4">
            <h2 className="text-left text-xl font-semibold">
              Recent Job Postings
            </h2>

            <a
              href="/find-jobs"
              className="flex items-center gap-2 mb-3 sm:px-4 py-1 rounded-md transition hover:text-[var(--color-accent-gold)]"
            >
              <b>View All</b>
              <ArrowRight className="w-6 h-6 font-bold" />
            </a>
          </div>

          <div className="py-8 px-4 sm:px-6 lg:px-8">
            {jobsForUI.length === 0 ? (
              <p className="text-center text-gray-500">No jobs found</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobsForUI.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentJobs;
