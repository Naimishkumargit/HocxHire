"use client";

import { useState, useMemo } from "react";
import ProfessionalCard from "@/components/ProfessionalCard";
import SearchBar from "@/components/SearchBar";

interface Professional {
  _id: string;
  fullName: string;
  jobTitle?: string;
  location?: string;
  experience?: string;
  email?: string;      // only provided when admin
  phone?: string;      // only provided when admin
  linkedin?: string;   // only provided when admin
  owner?: string;
  keySkills: string[];
}

interface FindProfessionalsClientProps {
  initialProfessionals: Professional[];
  locations: string[];
  titles: string[]; // job titles used as search
}

export default function FindProfessionalsClient({
  initialProfessionals,
  locations,
  titles,
}: FindProfessionalsClientProps) {
  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filtered = useMemo(() => {
    return initialProfessionals.filter((p) => {
      const q = searchTitle.toLowerCase();
      // match job title or name
      const titleMatch = p.jobTitle
        ? p.jobTitle.toLowerCase().includes(q)
        : p.fullName.toLowerCase().includes(q);
      // also match any skill
      const skillsMatch = p.keySkills
        ? p.keySkills.some((s) => s.toLowerCase().includes(q))
        : false;
      const primaryMatch = titleMatch || skillsMatch;

      const locationMatch = p.location
        ? p.location.toLowerCase().includes(searchLocation.toLowerCase())
        : false;

      if (searchTitle && searchLocation) {
        return primaryMatch && locationMatch;
      }
      if (searchTitle) {
        return primaryMatch;
      }
      if (searchLocation) {
        return locationMatch;
      }
      return true;
    });
  }, [initialProfessionals, searchTitle, searchLocation]);

  const handleSearch = (title: string, location: string) => {
    setSearchTitle(title);
    setSearchLocation(location);
  };

  return (
    <main className="min-h-screen sm:px-6 lg:px-8">
      <div className="border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark">
        <div className="text-center">
          <h1 className="text-4xl font-bold pt-4">
            Browse Professionals
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {initialProfessionals.length} profiles available.
          </p>
        </div>

        <SearchBar
          onSearch={handleSearch}
          locations={locations}
          jobTitles={titles}
        />

        <div className="py-8 px-4 sm:px-6 lg:px-8">
          {(searchTitle || searchLocation) && (
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between">
              <p className="text-blue-800 mb-2 sm:mb-0">
                Found <strong>{filtered.length}</strong> professional
                {filtered.length !== 1 ? "s" : ""} matching your search
                {searchTitle && ` for \"${searchTitle}\"`}
                {searchTitle && searchLocation && " and"}
                {searchLocation && ` in \"${searchLocation}\"`}
              </p>
              <button
                onClick={() => {
                  setSearchTitle("");
                  setSearchLocation("");
                }}
                className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm transition"
              >
                Clear search
              </button>
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500">No profiles found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((prof) => (
                <ProfessionalCard key={prof._id} professional={prof} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}