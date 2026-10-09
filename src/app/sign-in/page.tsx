"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const input =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-green-600 focus:outline-none";
const label = "mb-1 block text-sm font-medium text-gray-800";

const SignInPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({ ...user });

    if (error) {
      console.error("Error signing in:", error);
      setError("ইমেইল বা পাসওয়ার্ড ভুল");
      toast.error("ইমেইল বা পাসওয়ার্ড ভুল");
      return;
    }

    console.log("User signed in successfully:", data);
    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push("/");
  };

  return (
    <main className="bg-green-50/60 px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">সাইন ইন করুন</h2>
          <p className="mt-1 text-sm text-gray-500">
            আপনার অ্যাকাউন্টে প্রবেশ করে সব দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label className={label}>ইমেইল</label>
              <input name="email" type="email" required className={input} placeholder="you@example.com" />
            </div>

            <div>
              <label className={label}>পাসওয়ার্ড</label>
              <input name="password" type="password" required className={input} placeholder="আপনার পাসওয়ার্ড" />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              className="rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-800"
            >
              সাইন ইন করুন
            </button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-gray-500">
            <span className="h-px flex-1 bg-gray-200" />
            অথবা
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => authClient.signIn.social({ provider: "google", callbackURL: "/" })}
              className="rounded-lg border border-gray-200 py-2.5 text-xs font-medium hover:bg-gray-50"
            >
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              type="button"
              onClick={() => authClient.signIn.social({ provider: "github", callbackURL: "/" })}
              className="rounded-lg border border-gray-200 py-2.5 text-xs font-medium hover:bg-gray-50"
            >
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          <p className="mt-5 text-center text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/sign-up" className="font-medium text-green-700 hover:underline">
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/">← হোম পেজে ফিরে যান</Link>
        </p>
      </div>
    </main>
  );
};

export default SignInPage;