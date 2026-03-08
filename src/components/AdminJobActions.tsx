"use client";
import React, { useState } from "react";
import {Edit, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";

interface Job {
  _id: string;
  title: string;
  description: string;
  summary?: string;
  company?: string;
  category?: string;
  type?: string;
  experience?: string;
  email?: string;
  skills?: string[];
  budget?: number;
  location?: string;
  featured?: boolean;
  draft?: boolean;
}

interface AdminJobActionsProps {
  job: Job;
  onJobUpdated?: () => void;
}

export const AdminJobActions = ({ job, onJobUpdated }: AdminJobActionsProps) => {
  const { data: session } = useSession();
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editFormData, setEditFormData] = useState(job);
  const [isEditing, setIsEditing] = useState(false);
  const [editError, setEditError] = useState<string | null>(null);

  const isAdmin = (session?.user as any)?.role === "admin";

  if (!isAdmin) {
    return null;
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(true);
    setEditError(null);

    try {
      const response = await fetch("/api/jobs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job._id,
          title: editFormData.title,
          description: editFormData.description,
          summary: editFormData.summary,
          company: editFormData.company,
          category: editFormData.category,
          type: editFormData.type,
          experience: editFormData.experience,
          email: editFormData.email,
          skills: editFormData.skills?.join(", "),
          budget: editFormData.budget,
          location: editFormData.location,
          featured: editFormData.featured,
          draft: editFormData.draft,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to update job");
      }

      setShowEditModal(false);
      onJobUpdated?.();
    } catch (err: any) {
      setEditError(err.message || "Failed to update job");
    } finally {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      return;
    }

    try {
      const response = await fetch("/api/jobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job._id }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete job");
      }

      onJobUpdated?.();
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <>
      {/* Action Buttons */}
      <div className="flex gap-2">
        {/* Edit Button */}
        <button
          onClick={() => setShowEditModal(true)}
          className="p-1 hover:text-[var(--color-accent-gold)] transition-colors"
          title="Edit job"
        >
          <Edit size={18} />
        </button>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          className="p-1 hover:text-red-500 transition-colors"
          title="Delete job"
        >
          <Trash2 size={18} />
        </button>
      </div>

      {/* View Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white">
              <h2 className="text-xl font-bold text-black">{job.title}</h2>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {job.company && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Company</p>
                  <p className="text-black">{job.company}</p>
                </div>
              )}

              {job.category && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Category</p>
                  <p className="text-black">{job.category}</p>
                </div>
              )}

              {job.type && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Job Type</p>
                  <p className="text-black">{job.type}</p>
                </div>
              )}

              {job.experience && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Experience</p>
                  <p className="text-black">{job.experience}</p>
                </div>
              )}

              {job.location && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Location</p>
                  <p className="text-black">{job.location}</p>
                </div>
              )}

              {job.budget && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Budget</p>
                  <p className="text-black">${job.budget}</p>
                </div>
              )}

              {job.email && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Contact Email</p>
                  <p className="text-black">{job.email}</p>
                </div>
              )}

              {job.skills && job.skills.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Required Skills</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {job.skills.map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-black text-sm rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {job.summary && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Summary</p>
                  <p className="text-black">{job.summary}</p>
                </div>
              )}

              {job.description && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Description</p>
                  <p className="text-black whitespace-pre-wrap">{job.description}</p>
                </div>
              )}

              {job.featured && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-800">⭐ This job is featured</p>
                </div>
              )}

              {job.draft && (
                <div className="p-3 bg-gray-100 border border-gray-300 rounded">
                  <p className="text-sm text-gray-800">📝 This job is a draft</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-white">
              <h2 className="text-xl font-bold text-black">Edit Job</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              {editError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-sm">
                  {editError}
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-gray-600">Title *</label>
                <input
                  type="text"
                  value={editFormData.title}
                  onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
                  className="w-full border rounded p-2 mt-1 text-black"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Description *</label>
                <textarea
                  value={editFormData.description}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, description: e.target.value })
                  }
                  className="w-full border rounded p-2 mt-1 text-black h-24"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-600">Company</label>
                  <input
                    type="text"
                    value={editFormData.company || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, company: e.target.value })}
                    className="w-full border rounded p-2 mt-1 text-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Category</label>
                  <input
                    type="text"
                    value={editFormData.category || ""}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, category: e.target.value })
                    }
                    className="w-full border rounded p-2 mt-1 text-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Type</label>
                  <input
                    type="text"
                    value={editFormData.type || ""}
                    onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
                    className="w-full border rounded p-2 mt-1 text-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Experience</label>
                  <input
                    type="text"
                    value={editFormData.experience || ""}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, experience: e.target.value })
                    }
                    className="w-full border rounded p-2 mt-1 text-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Location</label>
                  <input
                    type="text"
                    value={editFormData.location || ""}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, location: e.target.value })
                    }
                    className="w-full border rounded p-2 mt-1 text-black"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Budget ($)</label>
                  <input
                    type="number"
                    value={editFormData.budget || ""}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, budget: e.target.value ? Number(e.target.value) : undefined })
                    }
                    className="w-full border rounded p-2 mt-1 text-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Email</label>
                <input
                  type="email"
                  value={editFormData.email || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full border rounded p-2 mt-1 text-black"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Skills (comma separated)</label>
                <input
                  type="text"
                  value={editFormData.skills?.join(", ") || ""}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                  }
                  className="w-full border rounded p-2 mt-1 text-black"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">Summary</label>
                <input
                  type="text"
                  value={editFormData.summary || ""}
                  onChange={(e) => setEditFormData({ ...editFormData, summary: e.target.value })}
                  className="w-full border rounded p-2 mt-1 text-black"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 border rounded py-2 text-black hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="flex-1 bg-black text-white rounded py-2 hover:bg-gray-800 disabled:opacity-50"
                >
                  {isEditing ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminJobActions;
