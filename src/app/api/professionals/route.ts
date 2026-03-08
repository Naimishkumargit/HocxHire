import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import Professional from "@/models/Professional";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { professionals as localProfessionals } from "@/data/Professionals";

// helper to ensure admin rights
async function verifyAdmin(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return { isAdmin: false, user: null, error: "Not authenticated" };
    }
    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return { isAdmin: false, user: null, error: "User not found" };
    }
    const isAdmin = user.role === "admin";
    return { isAdmin, user, error: null };
  } catch (error: any) {
    console.error("Admin verification error:", error);
    return { isAdmin: false, user: null, error: error.message };
  }
}

// GET ALL PROFESSIONALS
export async function GET(request: Request) {
  try {
    await connectToDatabase();

    // determine if caller is admin so we can include sensitive data
    const { isAdmin, user } = await verifyAdmin(request);
    const userId = (user as any)?._id?.toString();

    const profs = await Professional.find()
      .sort({ createdAt: -1 })
      .lean();

    if (isAdmin) {
      // admins see everything including owner field
      return NextResponse.json(profs);
    }

    // strip sensitive contact info for public API and only expose owner for the current user
    const safe = profs.map((p: any) => {
      const base: any = {
        _id: p._id,
        fullName: p.fullName,
        jobTitle: p.jobTitle,
        experience: p.experience,
        keySkills: p.keySkills,
        location: p.location,
        workAuthorization: p.workAuthorization,
        expectedRate: p.expectedRate,
        availability: p.availability,
        // omit email/phone/linkedin
      };
      if (userId && p.owner && p.owner.toString() === userId) {
        base.owner = p.owner;
      }
      return base;
    });
    return NextResponse.json(safe);
  } catch (err: any) {
    // fallback to local data if DB unreachable
    console.error("GET /api/professionals - DB fetch failed, returning local data:", err);
    // ensure local fallback also hides contact info
    const safeLocal = localProfessionals.map((p: any) => ({
      ...p,
      email: undefined,
      phone: undefined,
      linkedin: undefined,
    }));
    return NextResponse.json(safeLocal, { status: 200 });
  }
}

// CREATE PROFESSIONAL (POST) - user must be logged in
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const body = await request.json();

    // basic validation: require all fields except optional ones? problem states all fields required
    const requiredFields = [
      "fullName",
      "jobTitle",
      "experience",
      "keySkills",
      "location",
      "workAuthorization",
      "expectedRate",
      "availability",
      "email",
      "phone",
      "linkedin",
    ];
    for (const f of requiredFields) {
      if (!body[f] || (typeof body[f] === "string" && !body[f].trim())) {
        return NextResponse.json({ error: `${f} is required` }, { status: 400 });
      }
    }

    await connectToDatabase();
    // find submitting user to get _id and enforce limit
    const submittingUser = await User.findOne({ email: session.user.email });
    if (submittingUser) {
      // admins may create unlimited profiles; regular users limited to 3
      if (submittingUser.role !== "admin") {
        const count = await Professional.countDocuments({ owner: submittingUser._id });
        if (count >= 3) {
          return NextResponse.json({ error: "Profile limit reached (3)" }, { status: 403 });
        }
      }
    }

    const newProf = new Professional({
      fullName: body.fullName,
      jobTitle: body.jobTitle,
      experience: body.experience || "",
      keySkills: Array.isArray(body.keySkills)
        ? body.keySkills
        : body.keySkills
        ? body.keySkills.split(",").map((s: string) => s.trim())
        : [],
      location: body.location || "",
      workAuthorization: body.workAuthorization || "",
      expectedRate: body.expectedRate || "",
      availability: body.availability || "",
      email: body.email || "",
      phone: body.phone || "",
      linkedin: body.linkedin || "",
      owner: submittingUser?._id,
    });

    await newProf.save();

    // link profile to the user document if available
    if (submittingUser) {
      await User.findByIdAndUpdate(submittingUser._id, {
        $push: { profiles: newProf._id },
      });
    }

    // revalidate homepage where featured section lives and listing page
    revalidatePath("/", "layout");
    revalidatePath("/find-professionals", "page");

    return NextResponse.json({ message: "Professional added", professional: newProf }, { status: 201 });
  } catch (err: any) {
    console.error("Error creating professional:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to create professional" },
      { status: 500 }
    );
  }
}

// DELETE PROFESSIONAL - admin or owner
export async function DELETE(request: Request) {
  try {
    const { isAdmin, user, error } = await verifyAdmin(request);
    if (!user) {
      return NextResponse.json({ error: error || "Unauthorized" }, { status: 403 });
    }
    const body = await request.json();
    const { professionalId } = body;
    if (!professionalId) {
      return NextResponse.json({ error: "Professional ID required" }, { status: 400 });
    }

    await connectToDatabase();
    const prof = await Professional.findById(professionalId);
    if (!prof) {
      return NextResponse.json({ error: "Professional not found" }, { status: 404 });
    }

    // if not admin, ensure current user owns the profile
    if (!isAdmin) {
      if (!prof.owner || prof.owner.toString() !== user._id.toString()) {
        return NextResponse.json({ error: "Unauthorized to delete this profile" }, { status: 403 });
      }
    }

    await Professional.findByIdAndDelete(professionalId);
    // remove reference from user document if owner
    if (prof.owner) {
      await User.findByIdAndUpdate(prof.owner, {
        $pull: { profiles: prof._id },
      });
    }

    // revalidate affected pages
    revalidatePath("/", "layout");
    revalidatePath("/find-professionals", "page");
    return NextResponse.json({ message: "Professional deleted" }, { status: 200 });
  } catch (err: any) {
    console.error("Error deleting professional:", err);
    return NextResponse.json({ error: err?.message || "Failed to delete" }, { status: 500 });
  }
}

// PATCH existing professional - admin only (optional, for review/edits)
export async function PATCH(request: Request) {
  try {
    const { isAdmin, error } = await verifyAdmin(request);
    if (!isAdmin) {
      return NextResponse.json({ error: error || "Unauthorized" }, { status: 403 });
    }
    const body = await request.json();
    const { professionalId } = body;
    if (!professionalId) {
      return NextResponse.json({ error: "Professional ID required" }, { status: 400 });
    }
    await connectToDatabase();
    const updated = await Professional.findByIdAndUpdate(
      professionalId,
      {
        fullName: body.fullName,
        jobTitle: body.jobTitle,
        experience: body.experience,
        keySkills: Array.isArray(body.keySkills) ? body.keySkills : body.keySkills?.split(",").map((s: string) => s.trim()),
        location: body.location,
        workAuthorization: body.workAuthorization,
        expectedRate: body.expectedRate,
        availability: body.availability,
        email: body.email,
        phone: body.phone,
        linkedin: body.linkedin,
      },
      { new: true }
    );
    revalidatePath("/", "layout");
    revalidatePath("/find-professionals", "page");
    return NextResponse.json({ message: "Professional updated", professional: updated }, { status: 200 });
  } catch (err: any) {
    console.error("Error updating professional:", err);
    return NextResponse.json({ error: err?.message || "Failed to update" }, { status: 500 });
  }
}
