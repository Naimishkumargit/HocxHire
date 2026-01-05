"use client"; 

import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// metadata moved to head.tsx because this is a client component

export default function LoginPage() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--color-accent-gold)]"></div>
      </div>
    );
  }

  return (
    <>
      <div className="px-5 max-w-6xl mx-auto min-h-screen shadow-dark border-b-[3px] border-b-[var(--color-accent-gold)] flex flex-col items-center">
        <div className="flex items-center justify-center px-2 py-12">
        <div className="w-full max-w-md border rounded-lg shadow-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <img src="/logo.jpg" alt="HocxHire" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <h1 className="text-xl font-bold">HocxHire</h1>
              <p className="text-sm text-gray-500">Log in to manage your job posts and applications</p>
            </div>
          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Welcome back</h2>
            <p className="text-sm text-gray-500 mt-1">Sign in with your account to continue.</p>
          </div>

          <div className="mt-6">
            <button
              onClick={() => signIn("google", { callbackUrl: "/" })}
              className="w-full flex items-center justify-center gap-3 border border-gray-200 rounded-lg py-3 px-4 hover:shadow-sm transition focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-gold)]"
            >
              <img src="/google-icon.png" alt="Google" className="w-6 h-6" />
              <span className="font-medium">Continue with Google</span>
            </button>

            <div className="mt-4 text-center text-xs text-gray-500">
              By continuing you agree to our <a href="/terms-and-conditions" className="text-[var(--color-accent-gold)]">Terms</a> and <a href="/privacy-policy" className="text-[var(--color-accent-gold)]">Privacy Policy</a>.
            </div>
          </div>
      </div>
      </div>
      </div>
    </>
  );
}
