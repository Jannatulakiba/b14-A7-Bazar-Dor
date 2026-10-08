'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

const PROFILE_INPUT =
  'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-900 focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const user = session?.user;


  useEffect(() => {
    if (!isPending && !user) router.push('/sign-in');
  }, [isPending, user, router]);


  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push('/');
    router.refresh();
  };

  const handleUpdate = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage('');
    setSaving(true);

    const { error } = await authClient.updateUser({ name });

    setSaving(false);
    setMessage(error ? 'আপডেট করা যায়নি, আবার চেষ্টা করুন' : 'নাম আপডেট হয়েছে');
  };

  if (isPending || !user) {
    return <p className="px-4 py-12 text-center text-sm text-gray-500">লোড হচ্ছে...</p>;
  }

  const profileImage =
    user.image && user.image.trim()
      ? user.image
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email || 'User')}&background=dcfce7&color=166534`;

  console.log('session user:', user);
  console.log('session image:', user.image);
  console.log('profile image source:', profileImage);

  return (
    <div className="bg-green-50/60 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mb-5 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

        {/* User card */}
        <div className="mb-5 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-gray-200 bg-gray-100">
              <Image
                src={profileImage}
                alt={user.name || 'Profile image'}
                width={64}
                height={64}
                unoptimized
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            ↩ সাইন আউট
          </button>
        </div>

        {/* Info card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-semibold text-gray-900">তথ্য</h2>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4 px-2">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-gray-800">
                নাম
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={PROFILE_INPUT}
              />
            </div>

            {message && <p className="text-sm text-gray-600">{message}</p>}

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-green-800 disabled:opacity-60"
            >
              {saving ? 'অপেক্ষা করুন...' : 'আপডেট'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            ← হোম পেজে ফিরে যান
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;