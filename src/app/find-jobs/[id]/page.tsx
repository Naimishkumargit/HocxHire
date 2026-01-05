import { MapPin, Clock, Briefcase, Mail, ArrowLeft } from "lucide-react";
import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";

type Props = {
  params: {
    id: string;
  };
};

export default async function JobDetails({ params }: Props) {
  await connectToDatabase();
  let job: any = null;

  try {
    // Try finding by ObjectId
    job = await Job.findById(params.id).lean();
  } catch (e) {
    // ignore
  }

  if (!job) {
    // Not found in DB
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Job Not Found</h1>
          <p className="text-gray-600 mt-2">
            The job you're looking for doesn't exist.
          </p>
          <a
            href="/find-jobs"
            className="mt-4 inline-flex items-center px-4 py-2 hover:text-[var(--color-accent-gold)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Browse Jobs
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark">
          <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="px-4 mx-auto">
              <a
                href="/find-jobs"
                className="inline-flex items-center hover:text-[var(--color-accent-gold)] mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </a>

              <div className="rounded-xl shadow-md overflow-hidden border">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold">
                        {job.title}
                      </h1>

                      <div className="flex flex-wrap items-center mt-4 gap-4">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2" />
                          <span>{job.location}</span>
                        </div>

                        <div className="flex items-center">
                          <Clock className="w-5 h-5 mr-2" />
                          <span>{job.experience}</span>
                        </div>

                        <div className="flex items-center">
                          <Briefcase className="w-5 h-5 mr-2" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-semibold px-3 py-2 rounded-full uppercase self-start">
                      {(job.type || "").includes("Contract")
                        ? "Contract"
                        : "Full-Time"}
                    </div>
                  </div>

                  <div className="mt-8 border-t pt-6">
                    <h2 className="text-xl font-semibold  mb-4">Job Summary</h2>
                    <p className=" leading-relaxed">{job.summary}</p>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-semibold  mb-4">
                      Required Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {(job.skills || []).map(
                        (skill: string, index: number) => (
                          <ul
                            className="list-disc marker:text-[var(--color-accent-gold)] pl-5"
                            key={index}
                          >
                            <li className="leading-none">
                              <span>{skill}</span>
                            </li>
                          </ul>
                        )
                      )}
                    </div>
                  </div>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    {job.email && (
                      <a
                        href={`mailto:${job.email}`}
                        className="hover:text-[var(--color-accent-gold)] border py-1 px-1 rounded text-sm font-medium transition-colors flex items-center justify-center"
                      >
                        <Mail className="h-4 w-4 mr-1.5" />
                        {job.email}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
