"use client";
import React, { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

interface JobManagementActionsProps {
  jobId: string;
  ownerId?: string;
  onEdit: (jobId: string) => void;
  onDelete: (jobId: string) => void;
  isLoading?: boolean;
}

export const JobManagementActions = ({
  jobId,
  ownerId,
  onEdit,
  onDelete,
  isLoading = false,
}: JobManagementActionsProps) => {
  const { data: session } = useSession();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Check if current user is admin and owns this job
  const isAdmin = (session?.user as any)?.role === "admin";
  const isOwner = ownerId && session?.user && (session.user as any)?.id === ownerId;

  if (!isAdmin || !isOwner) {
    return null;
  }

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch("/api/jobs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId }),
      });

      if (response.ok) {
        onDelete(jobId);
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete job");
    } finally {
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* Edit Button */}
      <button
        onClick={() => onEdit(jobId)}
        disabled={isLoading || isDeleting}
        className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded text-sm disabled:opacity-50"
        title="Edit job"
      >
        <Edit size={16} />
        Edit
      </button>

      {/* Delete Button */}
      <button
        onClick={() => setShowDeleteConfirm(true)}
        disabled={isLoading || isDeleting}
        className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded text-sm disabled:opacity-50"
        title="Delete job"
      >
        <Trash2 size={16} />
        Delete
      </button>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
            <h3 className="text-lg font-bold text-black mb-2">Delete Job?</h3>
            <p className="text-gray-600 mb-4">
              This action cannot be undone. This job posting will be permanently deleted.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                disabled={isDeleting}
                className="px-4 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobManagementActions;
