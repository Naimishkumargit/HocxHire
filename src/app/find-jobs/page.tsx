import { NextPage } from "next";
import Head from "next/head";
import JobCard from "@/components/JobCard";
import { jobs } from "@/data/jobs";
import SearchBar from "@/components/SearchBar";

const FindJobs: NextPage = () => {
  return (
    <>
      <Head>
        <title>Job Vacancies – HocxHire</title>
        <meta
          name="description"
          content="Explore open job positions at HocxHire including Cloud DevOps Engineer and Java Developer roles. Apply now via email."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.jpg" />
      </Head>

      <main className="min-h-screen sm:px-6 lg:px-8">
        <div className="border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark">
          <div className="text-center">
            <h1 className="text-4xl font-bold pt-4">
              Join Our Growing Team at{" "}
              <span className="text-[var(--color-accent-gold)]">HocxHire</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We currently have {jobs.length} exciting opportunity
              {jobs.length !== 1 ? "ies" : ""} available. Find your perfect fit
              below.
            </p>
          </div>
          <SearchBar />
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
      </main>
    </>
  );
};

export default FindJobs;
