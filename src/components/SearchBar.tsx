"use client";
import { Search, MapPin } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  onSearch: (title: string, location: string) => void;
  locations: string[];
  jobTitles: string[];
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, locations = [], jobTitles = [] }) => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [showTitleSuggestions, setShowTitleSuggestions] = useState(false);
  const containerRef = useRef<HTMLFormElement>(null);

  // Filter suggestions based on input
  const filteredLocations = locations.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const filteredTitles = jobTitles.filter((t) =>
    t.toLowerCase().includes(title.toLowerCase())
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(title, location);
    setShowLocationSuggestions(false);
    setShowTitleSuggestions(false);
    // Clear input fields after search
    setTitle("");
    setLocation("");
  };

  const handleLocationSelect = (loc: string) => {
    setLocation(loc);
    setShowLocationSuggestions(false);
  };

  const handleTitleSelect = (t: string) => {
    setTitle(t);
    setShowTitleSuggestions(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowLocationSuggestions(false);
        setShowTitleSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form ref={containerRef} onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg">
      <div className="w-full relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for jobs..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            // Show suggestions only when there's input
            setShowTitleSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => title.length > 0 && setShowTitleSuggestions(true)}
          className="border rounded-md px-4 py-2 pl-10 w-full focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)] text-black"
        />
        {showTitleSuggestions && title.length > 0 && filteredTitles.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-10 max-h-48 overflow-y-auto shadow-lg">
            {filteredTitles.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => handleTitleSelect(t)}
                className="block w-full text-left px-4 py-2 hover:bg-[var(--color-accent-gold)] hover:bg-opacity-20 text-black"
              >
                {t}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex w-full sm:w-[60%] relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-20" />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            // Show suggestions only when there's input
            setShowLocationSuggestions(e.target.value.length > 0);
          }}
          onFocus={() => location.length > 0 && setShowLocationSuggestions(true)}
          className="border rounded-l-md px-4 py-2 pl-10 w-full focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)] text-black"
        />
        {showLocationSuggestions && location.length > 0 && filteredLocations.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md mt-1 z-10 max-h-48 overflow-y-auto shadow-lg">
            {filteredLocations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => handleLocationSelect(loc)}
                className="block w-full text-left px-4 py-2 hover:bg-[var(--color-accent-gold)] hover:bg-opacity-20 text-black"
              >
                {loc}
              </button>
            ))}
          </div>
        )}

        <button
          type="submit"
          className="bg-[var(--color-accent-gold)] text-black hover:bg-amber-500 font-medium px-6 py-2 transition-colors duration-200 whitespace-nowrap flex items-center gap-2 rounded-r-md"
        >
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
