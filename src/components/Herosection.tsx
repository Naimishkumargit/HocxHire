import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="relative  min-h-screen flex items-center justify-center px-4 md:px-12 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/Hero_Image.png')" }}
      >
      
      {/* Content Wrapper */}
      <div className="text-center max-w-4xl ">
        <h1 className="md:text-6xl font-extrabold mb-4 md:mb-6 text-[var(--color-primary-dark)]">
          Find IT & Software Jobs in USA & India — HocxHire
        </h1>

        <p className="text-lg md:text-2xl mb-6 text-[var(--color-primary-dark)]">
          Browse IT jobs, software roles, remote and contract positions across the
          USA and India. Discover opportunities that match your skills and career goals.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/find-jobs" className="hocx_btn hover:bg-yellow-400">
            Get Started
          </a>

          <a
            href="/about-us"
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
