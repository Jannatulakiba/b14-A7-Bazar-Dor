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

const SignUpPage = () => {
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
    if (error) {
  console.error("social error:", JSON.stringify(error, null, 2), error.status, error.statusText);
  toast.error(error.message || `সোশ্যাল লগইন করা যায়নি (${error.status ?? "unknown"})`);
}
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
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirm = String(formData.get("confirm") ?? "");

    if (!name) return toast.error("নাম দিন");
    if (password.length < 8) return toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return toast.error("পাসওয়ার্ড দুটি মিলছে না");

    setLoading(true);
    try {
      const { error } = await authClient.signUp.email({ name, email, password });

      if (error) {
        console.error("Error signing up:", error);
        toast.error(error.message || "সাইন আপ করা যায়নি");
        return;
      }

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে");
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
          <h2 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="mt-1 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className={labelClass}>নাম</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={inputClass}
                placeholder="যেমন: রহিম উদ্দিন"
              />
            </div>

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
                minLength={8}
                autoComplete="new-password"
                className={inputClass}
                placeholder="কমপক্ষে ৮ অক্ষর"
              />
            </div>

            <div>
              <label htmlFor="confirm" className={labelClass}>পাসওয়ার্ড নিশ্চিত করুন</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                required
                autoComplete="new-password"
                className={inputClass}
                placeholder="আবার লিখুন"
              />
            </div>

            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
            >
              {loading ? "অপেক্ষা করুন..." : "অ্যাকাউন্ট তৈরি করুন"}
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
            অ্যাকাউন্ট আছে?{" "}
            <Link href="/sign-in" className="font-medium text-green-700 hover:underline">
              সাইন ইন করুন
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

export default SignUpPage;