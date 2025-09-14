"use client"; 

import { useEffect } from "react";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Log In | HocxHire</title>
      </Head>
      <div className="px-5 max-w-6xl mx-auto min-h-screen shadow-dark border-b-[3px] border-b-[var(--color-accent-gold)] flex flex-col items-center">
        <h2 className="mt-9 text-2xl font-bold">Log in or sign up</h2>

        <p className="mt-2 text-center text-[color:var(--color-dark-gray)] text-sm max-w-md">
          Log in to HocxHire to apply for jobs, connect with recruiters, and
          explore career opportunities tailored just for you.
        </p>

        <div className="flex flex-col gap-4 w-full max-w-sm mt-6">
          <button
            className="flex items-center justify-center gap-2 border rounded-lg py-3 px-4"
            onClick={() => signIn("google")}
          >
            <img src="/google-icon.png" alt="Google" className="rounded-md w-7 h-7" />
            <span>Continue with Google</span>
          </button>

          <button
            className="flex items-center justify-center gap-2 border rounded-lg py-3 px-4"
            onClick={() => signIn("linkedin")}
          >
            <img src="/linkedin-icon.png" alt="LinkedIn" className="rounded-md w-7 h-7" />
            <span>Continue with LinkedIn</span>
          </button>
        </div>
      </div>
    </>
  );
}
