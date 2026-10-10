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

const GoogleIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 shrink-0"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
    />
  </svg>
);

const GitHubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="h-5 w-5 shrink-0"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.97c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.58.23 2.75.11 3.04.74.8 1.18 1.83 1.18 3.08 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
  </svg>
);

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<Provider | null>(null);

  const busy = loading || socialLoading !== null;

  const handleSocialSignIn = async (provider: Provider) => {
    if (busy) return;

    const label = provider === "google" ? "Google" : "GitHub";
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/sign-in",
      });

      if (error) {
        console.error("social error:", error);
        toast.error(
          error.message || `${label} দিয়ে লগইন করা যায়নি (${error.status ?? "unknown"})`
        );
      }
    } catch (err) {
      console.error(err);
      toast.error(`${label} দিয়ে লগইন করা যায়নি`);
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
              <label htmlFor="name" className={labelClass}>
                নাম
              </label>
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
              <label htmlFor="email" className={labelClass}>
                ইমেইল
              </label>
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
              <label htmlFor="password" className={labelClass}>
                পাসওয়ার্ড
              </label>
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
              <label htmlFor="confirm" className={labelClass}>
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
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

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => handleSocialSignIn("google")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              <GoogleIcon />
              {socialLoading === "google" ? (
                "অপেক্ষা করুন..."
              ) : (
                <>
                  <span className="sm:hidden">Google দিয়ে চালিয়ে যান</span>
                  <span className="hidden sm:inline">Google</span>
                </>
              )}
            </button>

            <button
              type="button"
              disabled={busy}
              onClick={() => handleSocialSignIn("github")}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-3 font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"
            >
              <GitHubIcon />
              {socialLoading === "github" ? (
                "অপেক্ষা করুন..."
              ) : (
                <>
                  <span className="sm:hidden">GitHub দিয়ে চালিয়ে যান</span>
                  <span className="hidden sm:inline">GitHub</span>
                </>
              )}
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