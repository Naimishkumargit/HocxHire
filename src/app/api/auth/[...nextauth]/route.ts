import NextAuth from "next-auth";
import authOptions from "@/lib/authOptions";

const handler = NextAuth(authOptions as any);

export const dynamic = "force-dynamic";
export { handler as GET, handler as POST };
