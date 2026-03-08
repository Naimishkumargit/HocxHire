"use client";
import React, { useState } from "react";
import { Trash2, Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Professional {
  _id: string;
  fullName?: string;
  jobTitle?: string;
  experience?: string;
  keySkills?: string[];
  location?: string;
  workAuthorization?: string;
  expectedRate?: string;
  availability?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  owner?: string;
}

interface AdminProfessionalActionsProps {
  professional: Professional;
  onUpdated?: () => void;
}

// this component renders a delete button for admins or for the user who owns
// the profile. it was originally admin-only but we re‑use it for owners too.
const AdminProfessionalActions: React.FC<AdminProfessionalActionsProps> = ({ professional, onUpdated }) => {
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";
  const currentUserId = (session?.user as any)?.id;
  const isOwner = currentUserId && professional.owner === currentUserId;
  const router = useRouter();

  if (!isAdmin && !isOwner) {
    return null;
  }

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this profile? This cannot be undone.")) {
      return;
    }
    try {
      const resp = await fetch("/api/professionals", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ professionalId: professional._id }),
      });
      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.error || "Failed to delete");
      }
      onUpdated?.();
      // refresh root so server components re-run (grid/list pages)
      router.refresh();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    }
  };

  // edit capability could be added later

  return (
    <div className="flex gap-2">
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        className="p-1 text-red-500 hover:text-red-700 transition-colors"
        title="Delete profile"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};

export default AdminProfessionalActions;