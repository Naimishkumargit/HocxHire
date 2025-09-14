import { Search,MapPin } from "lucide-react";
import React from "react";

const SearchBar: React.FC = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg">
      <div className="w-full relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          id="search"
          placeholder="Search for jobs..."
          className="border rounded-md px-4 py-2 pl-10 w-full focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]  text-black"
        />
      </div>

      <div className="flex w-full sm:w-[60%] relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          id="location"
          placeholder="Location"
          className="border rounded-l-md px-4 py-2 pl-10 w-full focus:outline-none focus:ring-1 focus:ring-[var(--color-accent-gold)]  text-black"
        />

        <button className="bg-[var(--color-accent-gold)] text-black hover:bg-amber-500 font-medium px-6 py-2 transition-colors duration-200 whitespace-nowrap flex items-center gap-2 rounded-r-md">
          <Search className="w-4 h-4" />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
