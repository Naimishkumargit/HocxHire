"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Briefcase, FileText, DollarSign, MapPin, Star } from "lucide-react";

const CreateJobPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [description, setDescription] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [featured, setFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState<string | null>(null);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  function validateEmail(emailStr: string) {
    return !emailStr || /^\S+@\S+\.\S+$/.test(emailStr);
  }

  async function submitJob(draft = false) {
    setError(null);
    setSuccess(null);

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }

    if (email && !validateEmail(email)) {
      setError("Please enter a valid contact email.");
      return;
    }

    if (budget && Number(budget) < 0) {
      setError("Budget must be a positive number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          summary,
          company,
          category,
          type,
          experience,
          email,
          skills,
          budget: budget || undefined,
          location,
          featured,
          draft,
        }),
      });

      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload?.error || "Failed to create job");
      }

      // show success and reset form (for draft keep fields)
      setSuccess(draft ? "Draft saved." : "Job posted successfully.");
      if (!draft) {
        // clear form
        setTitle("");
        setDescription("");
        setSummary("");
        setCompany("");
        setCategory("");
        setType("");
        setExperience("");
        setEmail("");
        setSkills("");
        setBudget("");
        setLocation("");
        setFeatured(false);
      }

      // redirect to find-jobs after short delay for user to see success
      setTimeout(() => router.push("/find-jobs"), 1300);
    } catch (err: any) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  function clearForm() {
    setTitle("");
    setDescription("");
    setSummary("");
    setCompany("");
    setCategory("");
    setType("");
    setExperience("");
    setEmail("");
    setSkills("");
    setBudget("");
    setLocation("");
    setFeatured(false);
    setError(null);
    setSuccess(null);
    setShowConfirmClear(false);
  }

  function promptClear() {
    setShowConfirmClear(true);
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">You need to sign in to post a job.</p>
          <a href="/login" className="bg-black text-white py-2 px-4 rounded">Sign In</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen sm:px-6 lg:px-8 border-b-[3px] border-b-[var(--color-accent-gold)] max-w-6xl mx-auto shadow-dark color">
      <div className="border sm:mx-2 p-6">
        <div className="text-center space-y-1 mb-6">
          <h1 className="text-2xl font-bold">Post a Job</h1>
          <p className="text-sm text-gray-500">Create a new job listing to find the perfect professional for your needs</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitJob(false);
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Title */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4" /> Job Title
            </label>
            <input
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., Java Developer"
              disabled={loading}
              aria-required
            />
          </div>

          {/* Description (full width) */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <FileText className="h-4 w-4" /> Job Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded p-2 h-36 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="Describe the job in detail..."
              disabled={loading}
              aria-required
            />
          </div>

          {/* Summary and Company */}
          <div>
            <label className="text-sm font-medium">Short Summary</label>
            <input
              name="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="Short summary for listing"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Company</label>
            <input
              name="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="Company name"
              disabled={loading}
            />
          </div>

          {/* Experience and Type */}
          <div>
            <label className="text-sm font-medium">Experience</label>
            <input
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., 3+ years"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Job Type</label>
            <input
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., Full-time, Contract"
              disabled={loading}
            />
          </div>

          {/* Contact and Skills */}
          <div>
            <label className="text-sm font-medium">Contact Email</label>
            <input
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="contact@example.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Skills</label>
            <input
              name="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., Java, Spring, REST"
              disabled={loading}
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-sm font-medium">Category</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              disabled={loading}
            >
              <option value="">Select category</option>
              <option>Software Development</option>
              <option>Cybersecurity</option>
              <option>Cloud Computing</option>
              <option>Artificial Intelligence /ML</option>
              <option>Data & Analytics</option>
              <option>Networking & Infrastructure</option>
              <option>Web & App Design</option>
              <option>IT Project & PM</option>
              <option>QA & Testing</option>
              <option>Salesforce</option>
              <option>Other</option>
            </select>
          </div>

          {/* Budget and Location */}
          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="h-4 w-4" /> Budget ($)
            </label>
            <input
              name="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              type="number"
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., 200"
              disabled={loading}
            />
          </div>

          <div>
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4" /> Location
            </label>
            <input
              name="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded p-2 mt-1 text-black focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
              placeholder="e.g., New York, NY"
              disabled={loading}
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-3 mt-2">
            <input id="featured" type="checkbox" checked={featured} onChange={() => setFeatured(!featured)} disabled={loading} />
            <label htmlFor="featured" className="text-sm cursor-pointer flex items-center">
              <Star className="inline h-4 w-4 mr-1" /> Feature this job posting (+$10)
            </label>
          </div>

          {/* Error / Success */}
          <div className="md:col-span-2">
            {error && <div className="text-red-600 mb-2">{error}</div>}
            {success && <div className="text-green-700 mb-2">{success}</div>}
          </div>

          {/* Actions */}
          <div className="md:col-span-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => submitJob(true)}
              disabled={loading}
              className="flex-1 border rounded py-2 "
            >
              {loading ? "Saving…" : "Save as Draft"}
            </button>

            <button
              type="button"
              onClick={promptClear}
              disabled={loading}
              className="px-4 py-2 rounded border bg-red-50 text-red-700 hover:bg-red-100"
            >
              Clear All
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 border rounded py-2"
            >
              {loading ? "Posting…" : "Post Job"}
            </button>
          </div>
        </form>
        {showConfirmClear && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowConfirmClear(false)} />
            <div className="relative bg-white rounded shadow-lg p-6 w-11/12 max-w-md">
              <h3 className="text-lg font-semibold mb-2 text-black">Clear all fields?</h3>
              <p className="text-sm text-gray-600 mb-4">This will remove all entered data. This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button className="px-3 py-1 rounded border text-black" onClick={() => setShowConfirmClear(false)}>Cancel</button>
                <button className="px-3 py-1 rounded bg-red-600 text-white" onClick={() => clearForm()}>Clear</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJobPage;