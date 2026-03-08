import { NextResponse, NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
import { jobs as localJobs } from "@/data/jobs";

// Helper function to verify admin
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

// CREATE JOB (POST) - Admin only
export async function POST(request: Request) {
  try {
    const { isAdmin, user, error } = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        { error: error || "Unauthorized: Only admins can create jobs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    await connectToDatabase();

    const newJob = new Job({
      title: body.title,
      description: body.description,
      summary: body.summary,
      company: body.company,
      category: body.category,
      type: body.type,
      experience: body.experience,
      email: body.email,
      skills: body.skills ? body.skills.split(",").map((s: string) => s.trim()) : [],
      budget: body.budget,
      location: body.location,
      featured: body.featured || false,
      draft: body.draft || false,
      owner: user._id, // Associate job with admin user
    });

    await newJob.save();

    // Add job to user's jobs array
    await User.findByIdAndUpdate(user._id, {
      $push: { jobs: newJob._id },
    });

    // Revalidate all pages that display jobs
    revalidatePath("/", "layout");
    revalidatePath("/find-jobs", "page");

    return NextResponse.json(
      { message: "Job created successfully", job: newJob },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create job" },
      { status: 500 }
    );
  }
}

// GET ALL JOBS (GET)
export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find({ draft: false })
      .populate("owner", "name email role")
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(jobs);
  } catch (error: any) {
    console.error("GET /api/jobs - DB fetch failed, returning local jobs:", error);
    return NextResponse.json(localJobs, { status: 200 });
  }
}

// UPDATE JOB (PATCH) - Admin only, must own the job
export async function PATCH(request: Request) {
  try {
    const { isAdmin, user, error } = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        { error: error || "Unauthorized: Only admins can update jobs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Verify job ownership
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    if (job.owner.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Forbidden: You can only edit your own jobs" },
        { status: 403 }
      );
    }

    // Update job fields
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        title: body.title || job.title,
        description: body.description || job.description,
        summary: body.summary || job.summary,
        company: body.company || job.company,
        category: body.category || job.category,
        type: body.type || job.type,
        experience: body.experience || job.experience,
        email: body.email || job.email,
        skills: body.skills ? body.skills.split(",").map((s: string) => s.trim()) : job.skills,
        budget: body.budget !== undefined ? body.budget : job.budget,
        location: body.location || job.location,
        featured: body.featured !== undefined ? body.featured : job.featured,
        draft: body.draft !== undefined ? body.draft : job.draft,
      },
      { new: true }
    );

    revalidatePath("/", "layout");
    revalidatePath("/find-jobs", "page");

    return NextResponse.json(
      { message: "Job updated successfully", job: updatedJob },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating job:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update job" },
      { status: 500 }
    );
  }
}

// DELETE JOB (DELETE) - Admin only, must own the job
export async function DELETE(request: Request) {
  try {
    const { isAdmin, user, error } = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        { error: error || "Unauthorized: Only admins can delete jobs" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { jobId } = body;

    if (!jobId) {
      return NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Verify job ownership
    const job = await Job.findById(jobId);
    if (!job) {
      return NextResponse.json(
        { error: "Job not found" },
        { status: 404 }
      );
    }

    if (job.owner.toString() !== user._id.toString()) {
      return NextResponse.json(
        { error: "Forbidden: You can only delete your own jobs" },
        { status: 403 }
      );
    }

    // Delete job
    await Job.findByIdAndDelete(jobId);

    // Remove job from user's jobs array
    await User.findByIdAndUpdate(user._id, {
      $pull: { jobs: jobId },
    });

    revalidatePath("/", "layout");
    revalidatePath("/find-jobs", "page");

    return NextResponse.json(
      { message: "Job deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting job:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete job" },
      { status: 500 }
    );
  }
}
