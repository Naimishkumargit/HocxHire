import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import Job from "@/models/Job";
import Professional from "@/models/Professional";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";

/**
 * DELETE user account (admin only)
 * When a user is deleted, all their jobs are automatically deleted (cascading delete)
 */
export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    await connectToDatabase();

    // Verify requester is an admin
    const requester = await User.findOne({ email: session.user.email });
    if (!requester || requester.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Only admins can delete users" },
        { status: 403 }
      );
    }

    const userIdToDelete = params.userId;

    // Fetch user to be deleted
    const userToDelete = await User.findById(userIdToDelete);
    if (!userToDelete) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Delete all jobs created by this user (cascading delete)
    await Job.deleteMany({ owner: userIdToDelete });
    // also delete any profiles they submitted
    await Professional.deleteMany({ owner: userIdToDelete });

    // Delete the user
    await User.findByIdAndDelete(userIdToDelete);

    return NextResponse.json(
      { message: "User and all associated jobs deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete user" },
      { status: 500 }
    );
  }
}
