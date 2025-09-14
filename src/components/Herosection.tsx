import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative  min-h-screen flex items-center justify-center px-4 md:px-12">
      {/* Content Wrapper */}
      <div className="text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4 md:mb-6">
          Welcome to HocxHire
        </h1>

        <p className="text-lg md:text-2xl mb-6 text-gray-200">
          Find your next opportunity with the best platform for your career growth.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#get-started"
            className="hocx_btn hover:bg-yellow-400"
          >
            Get Started
          </a>

          <a
            href="#learn-more"
            className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-gray-900 transition text-center"
          >
            Learn More
          </a>
        </div>
      </div>

      {/* Optional Background Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {/* Decorative shapes or SVG can go here */}
      </div>
    </section>
  );
};

export default HeroSection;
