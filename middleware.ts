import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { isMobileDevice } from "@/lib/adminUtils";

export default withAuth(async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Protect /create-jobs route
  if (pathname.startsWith("/create-jobs")) {
    const token = (req as any).nextauth.token;

    // Check if user is authenticated
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check if user is admin
    try {
      await connectToDatabase();
      const user = await User.findById(token.sub);

      if (user?.role !== "admin") {
        // Not an admin - redirect to home
        return NextResponse.redirect(new URL("/", req.url));
      }

      // Check if accessing via mobile
      const userAgent = req.headers.get("user-agent") || "";
      if (isMobileDevice(userAgent)) {
        // Mobile user trying to access create-jobs - redirect
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      console.error("Middleware auth check error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    const token = (req as any).nextauth.token;

    // Check if user is authenticated
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Check if user is admin
    try {
      await connectToDatabase();
      const user = await User.findById(token.sub);

      if (user?.role !== "admin") {
        // Not an admin - redirect to home
        return NextResponse.redirect(new URL("/", req.url));
      }
    } catch (error) {
      console.error("Middleware admin auth check error:", error);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
},
{
  callbacks: {
    authorized: ({ token }) => {
      // Allow request to continue to middleware logic
      return true;
    },
  },
});

export const config = {
  matcher: ["/create-jobs/:path*", "/admin/:path*"],
};
