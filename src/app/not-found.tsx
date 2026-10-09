import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-[#F0F5F0] px-4 py-20">
      <div className="mx-auto max-w-md text-center">
        <p className="text-6xl font-extrabold text-green-700">৪০৪</p>
        <h1 className="mt-4 text-2xl font-bold text-gray-900">পেজটি খুঁজে পাওয়া যায়নি</h1>
        <p className="mt-2 text-sm text-gray-500">
          আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে অথবা লিংকটি ভুল।
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
          >
            হোম পেজে যান
          </Link>
          <Link
            href="/#all-products"
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
          >
            সব পণ্য দেখুন
          </Link>
        </div>
      </div>
    </div>
  );
}