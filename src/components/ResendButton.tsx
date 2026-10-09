'use client';

import { useState } from 'react';
import { authClient } from '@/lib/auth-client';

const ResendButton = ({ email }: { email?: string }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const resend = async () => {
    if (!email) return;
    setLoading(true);
    setMessage('');

    const { error } = await authClient.sendVerificationEmail({
      email,
      callbackURL: '/',
    });

    setLoading(false);
    setMessage(
      error ? 'ইমেইল পাঠানো যায়নি, আবার চেষ্টা করুন' : 'যাচাইয়ের ইমেইল আবার পাঠানো হয়েছে'
    );
  };

  return (
    <>
      {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      <button
        onClick={resend}
        disabled={loading || !email}
        className="mt-3 w-full rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
      >
        {loading ? 'অপেক্ষা করুন...' : 'আবার যাচাইয়ের ইমেইল পাঠান'}
      </button>
    </>
  );
};

export default ResendButton;