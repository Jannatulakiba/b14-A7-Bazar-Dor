"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-green-600 focus:outline-none";
const labelClass = "mb-1 block text-sm font-medium text-gray-800";

type Provider = "google" | "github";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<Provider | null>(null);

  const busy = loading || socialLoading !== null;

  const handleSocialSignIn = async (provider: Provider) => {
    if (busy) return;
    setSocialLoading(provider);
    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
      });
      if (error) toast.error(error.message || "সোশ্যাল লগইন করা যায়নি");
    } catch (err) {
      console.error(err);
      toast.error("সোশ্যাল লগইন করা যায়নি");
    } finally {
      setSocialLoading(null);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (busy) return;

    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    if (!email || !password) return toast.error("ইমেইল ও পাসওয়ার্ড দিন");

    setLoading(true);
    try {
      const { error } = await authClient.signIn.email({ email, password });

      if (error) {
        console.error("Error signing in:", error);
        toast.error(error.message || "ইমেইল বা পাসওয়ার্ড ভুল");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে");
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      toast.error("কিছু ভুল হয়েছে, আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
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
              <label htmlFor="email" className={labelClass}>ইমেইল</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={inputClass}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClass}>পাসওয়ার্ড</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className={inputClass}
                placeholder="আপনার পাসওয়ার্ড"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
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
              disabled={busy}
              onClick={() => handleSocialSignIn("google")}
              className="rounded-lg border border-gray-200 py-2.5 text-xs font-medium hover:bg-gray-50 disabled:opacity-60"
            >
              {socialLoading === "google" ? "অপেক্ষা করুন..." : "Google দিয়ে চালিয়ে যান"}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => handleSocialSignIn("github")}
              className="rounded-lg border border-gray-200 py-2.5 text-xs font-medium hover:bg-gray-50 disabled:opacity-60"
            >
              {socialLoading === "github" ? "অপেক্ষা করুন..." : "GitHub দিয়ে চালিয়ে যান"}
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