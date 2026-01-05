import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import connectToDatabase from "@/lib/mongodb";
import Job from "@/models/Job";

export async function POST(request: Request) {
  try {
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
    });

    await newJob.save();

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

export async function GET() {
  try {
    await connectToDatabase();
    const jobs = await Job.find({ draft: false })
      .sort({ createdAt: -1 })
      .lean();
    return NextResponse.json(jobs);
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}
