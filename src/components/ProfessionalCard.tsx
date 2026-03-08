"use client";
import React, { useState } from "react";
import { MapPin, Award, Mail, Phone, Link as LinkIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import AdminProfessionalActions from "./AdminProfessionalActions"; // actions specific to professional records

interface ProfessionalLike {
  _id?: string;
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

interface ProfessionalCardProps {
  professional: ProfessionalLike;
  onUpdated?: () => void;
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({ professional, onUpdated }) => {
  const [key, setKey] = useState(0);
  const { data: session } = useSession();
  const isAdmin = (session?.user as any)?.role === "admin";
  const currentUserId = (session?.user as any)?.id;
  const isOwner = currentUserId && professional.owner === currentUserId;

  return (
    <div className="rounded-lg border p-4 hover:shadow-md transition-all duration-300 h-full flex flex-col">
      {/* Name & Title */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-lg  line-clamp-2 leading-tight">
          {professional.fullName}
        </h3>
        {isOwner && (
          <span className="ml-2 text-green-600 text-xs font-medium">
            Your profile
          </span>
        )}
      </div>

      <div className="flex flex-col mb-3">
        {professional.jobTitle && (
          <div className="text-sm mb-1">
            <b>{professional.jobTitle}</b>
          </div>
        )}
        {professional.location && (
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-1.5" />
            <span className="line-clamp-1">{professional.location}</span>
          </div>
        )}
        {professional.experience && (
          <div className="flex items-center text-sm mt-1">
            <Award className="h-4 w-4 mr-1.5" />
            <span>{professional.experience}</span>
          </div>
        )}
      </div>

      {professional.keySkills && professional.keySkills.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium mb-1 text-sm">Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {professional.keySkills.map((s, i) => (
              <span
                key={i}
                className="text-xs px-2 py-0.5 rounded"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Additional info */}
      <div className="text-sm mb-4 space-y-1">
        {professional.workAuthorization && (
          <div>
            <strong>Auth:</strong> {professional.workAuthorization}
          </div>
        )}
        {professional.expectedRate && (
          <div>
            <strong>Rate:</strong> {professional.expectedRate}
          </div>
        )}
        {professional.availability && (
          <div>
            <strong>Availability:</strong> {professional.availability}
          </div>
        )}
      </div>

      {/* Contact buttons (admin only) */}
      {isAdmin && (
        <div className="mt-auto pt-3 flex flex-col gap-2">
          {professional.email && (
            <button
              onClick={() => {
                try {
                  navigator.clipboard.writeText(professional.email || "");
                } catch {}
              }}
              className="cursor-pointer hover:text-[var(--color-accent-gold)] border py-1 px-2 rounded text-sm font-medium transition-colors flex items-center"
            >
              <Mail className="h-4 w-4 mr-1.5" />
              {professional.email}
            </button>
          )}
          {professional.phone && (
            <button
              onClick={() => {
                try {
                  navigator.clipboard.writeText(professional.phone || "");
                } catch {}
              }}
              className="cursor-pointer hover:text-[var(--color-accent-gold)] border py-1 px-2 rounded text-sm font-medium transition-colors flex items-center"
            >
              <Phone className="h-4 w-4 mr-1.5" />
              {professional.phone}
            </button>
          )}
          {professional.linkedin && (
            <a
              href={professional.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--color-accent-gold)] border py-1 px-2 rounded text-sm font-medium transition-colors flex items-center"
            >
              <LinkIcon className="h-4 w-4 mr-1.5" />
              LinkedIn
            </a>
          )}
        </div>
      )}

      {/* Admin actions placeholder */}
      <div key={key} className="ml-auto">
        <AdminProfessionalActions
          professional={professional as any}
          onUpdated={() => {
            setKey((prev) => prev + 1);
            onUpdated?.();
          }}
        />
      </div>
    </div>
  );
};

export default ProfessionalCard;