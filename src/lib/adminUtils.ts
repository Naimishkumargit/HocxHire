import { Session } from "next-auth";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

/**
 * Check if a user is an admin based on their session
 * @param session - The NextAuth session object
 * @returns boolean - true if user is admin, false otherwise
 */
export const isUserAdmin = (session: Session | null): boolean => {
  if (!session?.user) return false;
  return (session.user as any)?.role === "admin";
};

/**
 * Fetch admin status from database (server-side only)
 * @param email - User email to check
 * @returns boolean - true if user is admin
 */
export const checkAdminByEmail = async (email: string): Promise<boolean> => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    return user?.role === "admin";
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

/**
 * Check if device is mobile based on user agent
 * @param userAgent - The User-Agent header from request
 * @returns boolean - true if mobile device
 */
export const isMobileDevice = (userAgent: string): boolean => {
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return mobileRegex.test(userAgent);
};
