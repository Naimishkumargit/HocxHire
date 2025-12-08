import Head from "next/head";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";
import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";

export default async function FindJobsPage() {
  await connectToDatabase();
  const dbJobs = await Job.find({ draft: false }).sort({ createdAt: -1 }).lean();

  // Map DB jobs to the shape JobCard expects (id/_id handled in JobCard)
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
              We currently have {jobsForUI.length} exciting opportunity
              {jobsForUI.length !== 1 ? "ies" : ""} available. Find your perfect fit
              below.
            </p>
          </div>
          <SearchBar />
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="px-4 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {jobsForUI.map((job) => (
                  <JobCard key={job._id ?? job.title} job={job} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
