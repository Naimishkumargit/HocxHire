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
      try {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({ name: user.name, email: user.email, image: user.image });
        }
      } catch (e) {
        // ignore DB errors here — signIn should still proceed if auth provider works
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
        // ignore
      }
      return session;
    },
  },
};

export default authOptions;
