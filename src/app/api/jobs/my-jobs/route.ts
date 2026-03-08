import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

// GET admin's own jobs
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Only admins can view their jobs" },
        { status: 403 }
      );
    }

    // Fetch all jobs created by this admin
    const jobs = await Job.find({ owner: user._id })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(jobs, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching admin jobs:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
