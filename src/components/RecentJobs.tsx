import React from "react";
import { ArrowRight } from "lucide-react";
import { jobs } from "../data/jobs";
import JobCard from "./JobCard";



const RecentJobs: React.FC = () => {
  return (
    <>
      <hr />
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark">
          <div className="flex items-center justify-between sm:px-12 px-2 pt-4">
            {/* Heading */}
            <h2 className="text-left text-xl font-semibold">
              Recent Job Postings
            </h2>

            {/* Button */}
            <button className="flex items-center mb-3 sm:px-4 py-1 rounded-md transition hover:text-[var(--color-accent-gold)]">
              <a href="/find-jobs" className="flex items-center gap-2 ">
                <span>
                  <b>View All</b>
                </span>
                <ArrowRight className="w-6 h-6 font-bold" />
              </a>
            </button>
          </div>
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="px-4 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentJobs;
