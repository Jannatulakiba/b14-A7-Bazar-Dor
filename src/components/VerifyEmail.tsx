'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

const VerifyEmail = () => {
  const email = useSearchParams().get('email') ?? '';

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const resend = async () => {
    if (!email) return;
    setLoading(true);
    setMessage('');

    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: '/sign-in',
    });

    setLoading(false);
    setMessage(error ? 'ইমেইল পাঠানো যায়নি, আবার চেষ্টা করুন' : 'যাচাইয়ের ইমেইল আবার পাঠানো হয়েছে');
  };

  return (
    <div className="bg-green-50/60 px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900">ইমেইল যাচাই করুন</h1>
          <p className="mt-1 text-sm text-gray-500">আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।</p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm">
          {/* Icon */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-700">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8" />
              <path d="m22 7-10 6L2 7" />
              <path d="m16 19 2 2 4-4" />
            </svg>
          </div>

          <h2 className="text-base font-bold text-gray-900">যাচাইয়ের লিংক পাঠানো হয়েছে</h2>
          <p className="mt-1 text-sm text-gray-500">
            নিচের ইমেইল ঠিকানায় একটি যাচাইয়ের লিংক পাঠানো হয়েছে।
          </p>

          {/* Email box */}
          <div className="my-4 rounded-xl bg-gray-50 px-4 py-3">
            <p className="break-all text-sm font-semibold text-gray-900">
              {email || 'you@example.com'}
            </p>
            <p className="text-xs text-gray-500">আপনার ইমেইল ঠিকানা</p>
          </div>

          <p className="text-sm text-gray-700">
            ইমেইলে থাকা লিংকে ক্লিক করে আপনার ইমেইল যাচাই করুন। এরপর সাইন ইন করতে পারবেন।
          </p>

          <p className="mt-6 text-sm text-gray-500">
            ইমেইল পাননি? স্প্যাম বা জাঙ্ক ফোল্ডার দেখুন।
          </p>

          {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}

          <button
            onClick={resend}
            disabled={loading || !email}
            className="mt-3 w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? 'অপেক্ষা করুন...' : 'আবার যাচাইয়ের ইমেইল পাঠান'}
          </button>

          <p className="mt-4 text-sm text-gray-600">
            ইমেইল ভুল হয়েছে?{' '}
            <Link href="/sign-up" className="font-semibold text-green-700 hover:underline">
              ঠিকানা পরিবর্তন করুন
            </Link>
          </p>

          <div className="mt-5 border-t border-gray-100 pt-5 text-sm text-gray-600">
            ইমেইল যাচাই করেছেন?{' '}
            <Link href="/sign-in" className="font-semibold text-green-700 hover:underline">
              সাইন ইন করুন
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">← হোম পেজে ফিরে যান</Link>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;