"use client";
import React from "react";
import { jobs } from "@/data/jobs";
import { Job } from "@/data/jobs";
import { MapPin, Clock, Briefcase, Mail, ArrowLeft, Save } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function JobDetails({ params }: Props) {
  const [job, setJob] = React.useState<Job | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadJob() {
      try {
        const unwrappedParams = await params;
        const jobId = Number(unwrappedParams.id);
        const foundJob = jobs.find((job) => job.id === jobId);
        setJob(foundJob || null);
      } catch (error) {
        console.error("Error loading job:", error);
        setJob(null);
      } finally {
        setLoading(false);
      }
    }
    loadJob();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!job) {
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
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark">
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
          <div className="px-4 mx-auto">
            {/* Back Button */}
            <a
              href="/find-jobs"
              className="inline-flex items-center hover:text-[var(--color-accent-gold)] mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </a>

            {/* Job Card */}
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
                    {job.type.includes("Contract") ? "Contract" : "Full-Time"}
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
                    {job.skills.map((skill, index) => (
                      <ul className="list-disc marker:text-[var(--color-accent-gold)] pl-5" key={index}>
                        <li className="leading-none">
                          <span>
                            {skill}
                          </span>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <a
                    href={`mailto:${job.email}?subject=Application for ${job.title} position`}
                    className="inline-flex items-center justify-center border hover:text-[var(--color-accent-gold)] font-medium py-3 px-6 rounded-md transition-colors"
                  >
                    <Mail className="w-5 h-5 mr-2" />
                    Apply Now
                  </a>
{/* 
                  <button className="inline-flex items-center justify-center border hover:text-[var(--color-accent-gold)] font-medium py-3 px-6 rounded-md transition-colors">
                    <Save className="w-5 h-5 mr-2" />
                    Save Job
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
