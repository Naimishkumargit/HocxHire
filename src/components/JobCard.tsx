"use client";
import { Job } from "../data/jobs";
import { MapPin, Briefcase, Award, Clock, Mail } from "lucide-react";
import { useState } from "react";

interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="rounded-lg border p-4 hover:shadow-md transition-all duration-300 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg  line-clamp-2 leading-tight">
          {job.title}
        </h3>
      </div>

      {/* Location and Experience */}
      <div className="flex flex-col mb-3">
        <div className="flex items-center  text-sm">
          <MapPin className="h-4 w-4 mr-1.5" />
          <span className="line-clamp-1">{job.location}</span>
        </div>
        <div className="flex items-center text-sm mt-3">
          <Award className="h-4 w-4 mr-1.5" />
          <span>{job.experience}</span>
        </div>
      </div>

      {/* Job Type */}
      <div className="flex items-center text-sm mb-4">
        <Clock className="h-4 w-4 mr-1.5" />
        <span>{job.type}</span>
      </div>

      {/* Summary */}
      {job.summary && (
        <div className="mb-4">
          <h4 className="font-medium mb-2 text-sm">
            <b>Job Summary:</b>
          </h4>
          <p className=" text-sm line-clamp-3 ml-1">{job.summary}</p>
        </div>
      )}

      {/* Action Buttons - Simple and Clean */}
      <div className="mt-auto pt-3 flex flex-row sm:flex-row gap-2 justify-around">
        <button className="hover:text-[var(--color-accent-gold)] border py-1 px-1 rounded">
          <a href={`/find-jobs/${job.id}`}>View Details</a>
        </button>
        <a
          href={`mailto:${job.email}?subject=Application for ${job.title} Position`}
          className="hover:text-[var(--color-accent-gold)] border py-1 px-1 rounded text-sm font-medium transition-colors flex items-center justify-center"
        >
          <Mail className="h-4 w-4 mr-1.5" />
          Apply Now
        </a>
      </div>
    </div>
  );
};

export default JobCard;
