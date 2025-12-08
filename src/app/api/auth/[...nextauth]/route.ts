import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }: { user: any }) {
      await connectToDatabase();

      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }

      return true;
    },

    async session({ session }: { session: any }) {
      try {
        await connectToDatabase();
        const dbUser = await User.findOne({ email: session.user?.email });
        if (dbUser) {
          (session.user as any).id = dbUser._id.toString();
        }
      } catch (e) {
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export const dynamic = "force-dynamic";
export { handler as GET, handler as POST };
