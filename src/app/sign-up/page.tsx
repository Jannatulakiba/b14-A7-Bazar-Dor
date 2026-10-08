"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

const input =
  "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-green-600 focus:outline-none";
const label = "mb-1 block text-sm font-medium text-gray-800";

const SignUpPage = () => {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

    const handleGithubSignIn = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const { confirm, ...user } = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
      confirm: string;
    };

    if (user.password !== confirm) {
      alert("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log("User signed up successfully:", data);
      router.push("/");
      router.refresh();
    }
    if (error) console.error("Error signing up:", error);
  };

  return (
    <main className="bg-green-50/60 px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-1 text-center">
          <h2 className="text-2xl font-bold text-gray-900">অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="mt-1 text-sm text-gray-500">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div>
              <label className={label}>নাম</label>
              <input name="name" type="text" required className={input} placeholder="যেমন: রহিম উদ্দিন" />
            </div>

            <div>
              <label className={label}>ইমেইল</label>
              <input name="email" type="email" required className={input} placeholder="you@example.com" />
            </div>

            <div>
              <label className={label}>পাসওয়ার্ড</label>
              <input name="password" type="password" required minLength={8} className={input} placeholder="কমপক্ষে ৮ অক্ষর" />
            </div>

            <div>
              <label className={label}>পাসওয়ার্ড নিশ্চিত করুন</label>
              <input name="confirm" type="password" required className={input} placeholder="আবার লিখুন" />
            </div>

            <button
              type="submit"
              className="rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-800"
            >
              অ্যাকাউন্ট তৈরি করুন
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
              onClick={handleGoogleSignIn}
              className="rounded-lg border border-gray-200 py-2.5 text-xs font-medium hover:bg-gray-50"
            >
              Google দিয়ে চালিয়ে যান
            </button>
            <button
              type="button"
              onClick={handleGithubSignIn}
              className="rounded-lg border border-gray-200 py-2.5 text-xs font-medium hover:bg-gray-50"
            >
              GitHub দিয়ে চালিয়ে যান
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
        
<Link href="/" >   ← হোম পেজে ফিরে যান</Link>
        </p>
      </div>
    </main>
  );
};

export default SignUpPage;