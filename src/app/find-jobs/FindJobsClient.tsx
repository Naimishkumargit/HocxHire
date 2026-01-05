"use client";

import { useState, useMemo } from "react";
import JobCard from "@/components/JobCard";
import SearchBar from "@/components/SearchBar";

interface Job {
  _id: string;
  title: string;
  location: string;
  type: string;
  experience: string;
  email: string;
  skills: string[];
  summary: string;
}

interface FindJobsClientProps {
  initialJobs: Job[];
  locations: string[];
  jobTitles: string[];
}

export default function FindJobsClient({
  initialJobs,
  locations,
  jobTitles,
}: FindJobsClientProps) {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filteredJobs = useMemo(() => {
    return initialJobs.filter((job) => {
      const titleMatch = job.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());
      const locationMatch = job.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());

      // If both filters are active, job must match both
      if (searchTitle && searchLocation) {
        return titleMatch && locationMatch;
      }
      // If only title filter is active
      if (searchTitle) {
        return titleMatch;
      }
      // If only location filter is active
      if (searchLocation) {
        return locationMatch;
      }
      // If no filters, show all
      return true;
    });
  }, [initialJobs, searchTitle, searchLocation]);

  const handleSearch = (title: string, location: string) => {
    setSearchTitle(title);
    setSearchLocation(location);
  };

  // Suggestions for no results
  const suggestedLocations = [
    "USA",
    "New York",
    "San Francisco",
    "Austin",
    "Chicago",
    "India",
    "Bangalore",
    "Mumbai",
    "Hyderabad",
  ];

  const suggestedTitles = [
    "Java Developer",
    "Python Developer",
    "DevOps Engineer",
    "Cloud Engineer",
    ".NET Developer",
    "Full Stack Developer",
  ];

  return (
    <main className="min-h-screen sm:px-6 lg:px-8">
      <div className="border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark">
        <div className="text-center">
          <h1 className="text-4xl font-bold pt-4">
            Join Our Growing Team at{" "}
            <span className="text-[var(--color-accent-gold)]">HocxHire</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We currently have {initialJobs.length} exciting opportunity
            {initialJobs.length !== 1 ? "ies" : ""} available. Find your perfect fit
            below.
          </p>
        </div>

        <SearchBar
          onSearch={handleSearch}
          locations={locations}
          jobTitles={jobTitles}
        />

        <div className="py-8 px-4 sm:px-6 lg:px-8">
          {/* Show search results count */}
          {(searchTitle || searchLocation) && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-blue-800">
                Found <strong>{filteredJobs.length}</strong> job
                {filteredJobs.length !== 1 ? "s" : ""} matching your search
                {searchTitle && ` for "${searchTitle}"`}
                {searchTitle && searchLocation && " and"}
                {searchLocation && ` in "${searchLocation}"`}
              </p>
            </div>
          )}

          {filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  No jobs found
                </h2>
                <p className="text-gray-600 mb-8">
                  {searchTitle || searchLocation
                    ? "Sorry, we couldn't find any jobs matching your search criteria."
                    : "No jobs available at the moment."}
                </p>
              </div>

              {/* Show suggestions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Location Suggestions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Popular Locations
                  </h3>
                  <div className="space-y-2">
                    {suggestedLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => handleSearch("", loc)}
                        className="block w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-[var(--color-accent-gold)] hover:bg-opacity-30 transition text-gray-700 font-medium"
                      >
                        📍 {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Job Title Suggestions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Popular Job Titles
                  </h3>
                  <div className="space-y-2">
                    {suggestedTitles.map((title) => (
                      <button
                        key={title}
                        onClick={() => handleSearch(title, "")}
                        className="block w-full text-left px-4 py-2 rounded-lg bg-gray-100 hover:bg-[var(--color-accent-gold)] hover:bg-opacity-30 transition text-gray-700 font-medium"
                      >
                        💼 {title}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear filters button */}
              {(searchTitle || searchLocation) && (
                <button
                  onClick={() => handleSearch("", "")}
                  className="mt-8 px-6 py-3 bg-[var(--color-accent-gold)] text-black font-semibold rounded-lg hover:bg-amber-500 transition"
                >
                  Clear Filters & View All Jobs
                </button>
              )}
            </div>
          ) : (
            <div className="px-4 mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredJobs.map((job) => (
                  <JobCard key={job._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
