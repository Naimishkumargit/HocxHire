"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";import { useSession } from "next-auth/react";import { Briefcase, MapPin, Star, Award, Mail, Phone, Link as LinkIcon, CircleUser } from "lucide-react";

const CreateProfessionalPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // redirect if not authenticated
  useEffect(() => {
    if (session === undefined) return; // still loading
    if (!session) {
      router.push("/login");
    }
  }, [session, router]);

  // responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [experience, setExperience] = useState("");
  const [keySkills, setKeySkills] = useState("");
  const [location, setLocation] = useState("");
  const [workAuthorization, setWorkAuthorization] = useState("");
  const [expectedRate, setExpectedRate] = useState("");
  const [availability, setAvailability] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");

  function validateEmail(emailStr: string) {
    return !emailStr || /^\S+@\S+\.\S+$/.test(emailStr);
  }

  async function submitProfile() {
    setError(null);
    setSuccess(null);

    if (!fullName.trim() || !jobTitle.trim()) {
      setError("Name and job title are required.");
      return;
    }

    if (email && !validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/professionals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          jobTitle,
          experience,
          keySkills,
          location,
          workAuthorization,
          expectedRate,
          availability,
          email,
          phone,
          linkedin,
        }),
      });

      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload?.error || "Failed to create profile");
      }

      setSuccess("Profile submitted successfully.");
      // clear form
      setFullName("");
      setJobTitle("");
      setExperience("");
      setKeySkills("");
      setLocation("");
      setWorkAuthorization("");
      setExpectedRate("");
      setAvailability("");
      setEmail("");
      setPhone("");
      setLinkedin("");

      // redirect to home after a short delay
      setTimeout(() => router.push("/"), 1200);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Submitting profiles is best done on a desktop.</p>
          <a href="/" className="bg-black text-white py-2 px-4 rounded">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:px-6 lg:px-8 border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark color">
      <div className="border sm:mx-2 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="text-center flex-1">
            <h1 className="text-2xl font-bold">Submit Professional Profile</h1>
            <p className="text-sm text-gray-500">
              Provide your details and let companies find you.
            </p>
          </div>
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitProfile();
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <CircleUser className="h-4 w-4" /> Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., Ranjith Reddy Nareddy"
              disabled={loading}
              required
            />
          </div>

          {/* Job title */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Job Title
            </label>
            <input
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., Full Stack Developer"
              disabled={loading}
              required
            />
          </div>

          {/* Experience */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <Award className="h-4 w-4" /> Experience
            </label>
            <input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., 5+ years"
              disabled={loading}
              required
            />
          </div>

          {/* Key Skills */}
          <div>
            <label className="text-sm font-medium">Key Skills (comma separated)</label>
            <input
              value={keySkills}
              onChange={(e) => setKeySkills(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="React, Node.js, SQL"
              disabled={loading}
              required
            />
          </div>

          {/* Location*/}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Location
            </label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., Dallas, TX"
              disabled={loading}
              required
            />
          </div>

          {/* work authorization */}
          <div>
            <label className="text-sm font-medium">Work Authorization</label>
            <input
              value={workAuthorization}
              onChange={(e) => setWorkAuthorization(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="H1B, GC, US Citizen"
              disabled={loading}
              required
            />
          </div>

          {/* expected rate */}
          <div>
            <label className="text-sm font-medium">Expected Rate</label>
            <input
              value={expectedRate}
              onChange={(e) => setExpectedRate(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="$50/hr"
              disabled={loading}
              required
            />
          </div>

          {/* availability */}
          <div>
            <label className="text-sm font-medium">Availability</label>
            <input
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="Immediate, 2 weeks notice"
              disabled={loading}
              required
            />
          </div>

          {/* contact info */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Mail className="h-4 w-4" /> Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="your@example.com"
              disabled={loading}
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium">
              <Phone className="h-4 w-4" /> Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="123-456-7890"
              disabled={loading}
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <LinkIcon className="h-4 w-4" /> LinkedIn URL
            </label>
            <input
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="https://linkedin.com/in/yourprofile"
              disabled={loading}
              required
            />
          </div>

          <div className="md:col-span-2 text-right">
            <button
              type="submit"
              disabled={loading}
              className="bg-[var(--color-accent-gold)] text-black py-2 px-4 rounded hover:bg-amber-500 transition"
            >
              {loading ? "Submitting..." : "Submit Profile"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfessionalPage;