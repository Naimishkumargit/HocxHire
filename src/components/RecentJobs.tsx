import React from "react";
import { ArrowRight } from "lucide-react";
import JobCard from "./JobCard";
import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";

const RecentJobs = async () => {
  await connectToDatabase();

  // DB se last 6 jobs fetch karo
  const dbJobs = await Job.find({ draft: false })
    .sort({ createdAt: -1 })
    .limit(6)
    .lean();

  const jobsForUI = dbJobs.map((j: any) => ({
    id: j._id.toString(), // must be string for Client Component
    title: j.title ?? "",
    location: j.location ?? "",
    type: j.type ?? "",
    experience: j.experience ?? "",
    email: j.email ?? "",
    skills: Array.isArray(j.skills) ? j.skills : [],
    summary: j.summary ?? "",
  }));
console.log("Jobs fetched:", jobsForUI.length);
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
                  <JobCard key={job.id} job={job} />
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
