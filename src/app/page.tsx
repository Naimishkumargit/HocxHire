import HeroSection from "@/components/Herosection";
import RecentJobs from "@/components/RecentJobs";

export const metadata = {
  title: "HocxHire — Home",
  description:
    "Find IT, startup, and corporate jobs in the USA and India. Browse latest openings and post jobs on HocxHire.",
  keywords: ["HocxHire", "jobs in USA", "jobs in India", "IT jobs", "software jobs", "career"],
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <RecentJobs />
    </>
  );
}
