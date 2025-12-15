import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";
import User from "@/models/User";
import { getServerSession } from "next-auth/next";
import authOptions from "@/lib/authOptions";

export async function POST(request: Request) {
  try {
    const session: any = await getServerSession(authOptions as any);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await request.json();
    const { title, description, summary, company, category, type, experience, email, skills, budget, location, featured, draft } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    await connectToDatabase();

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const skillArray = Array.isArray(skills)
      ? skills
      : typeof skills === "string" && skills.trim()
      ? skills.split(",").map((s: string) => s.trim()).filter(Boolean)
      : [];

    const job = await Job.create({
      title,
      description,
      summary: summary || "",
      company: company || "",
      category: category || "",
      type: type || "",
      experience: experience || "",
      email: email || "",
      skills: skillArray,
      budget: budget ? Number(budget) : undefined,
      location: location || "",
      featured: !!featured,
      draft: !!draft,
      owner: user._id,
    });

    user.jobs = user.jobs || [];
    user.jobs.push(job._id);
    await user.save();

    return NextResponse.json(job, { status: 201 });
  } catch (err) {
    console.error("/api/jobs error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session: any = await getServerSession(authOptions as any);
    if (!session || !session.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const user = await User.findOne({ email: session.user.email }).populate({ path: "jobs" });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const jobs = user.jobs && user.jobs.length ? user.jobs : await Job.find({ owner: user._id });

    return NextResponse.json(jobs, { status: 200 });
  } catch (err) {
    console.error("/api/jobs GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
