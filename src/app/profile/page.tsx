'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { authClient } from '@/lib/auth-client';

const input =
  'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm focus:border-green-600 focus:outline-none';
const label = 'mb-1 block text-sm font-medium text-gray-800';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [saving, setSaving] = useState(false);

  // login na thakle sign-in e pathao
  useEffect(() => {
    if (!isPending && !user) router.push('/sign-in');
  }, [isPending, user, router]);

  // session load hole form e boshao
  useEffect(() => {
    if (user) {
      setName(user.name ?? '');
      setImage(user.image ?? '');
    }
  }, [user]);

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) return toast.error('সাইন আউট করা যায়নি');

    toast.success('সাইন আউট হয়েছে');
    router.push('/');
    router.refresh();
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return toast.error('নাম খালি রাখা যাবে না');

    setSaving(true);
    const { error } = await authClient.updateUser({
      name: name.trim(),
      image: image.trim() || undefined,
    });
    setSaving(false);

    if (error) return toast.error(error.message ?? 'আপডেট করা যায়নি');

    toast.success('প্রোফাইল আপডেট হয়েছে');
    router.refresh();
  };

  // skeleton
  if (isPending || !user) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12">
        <div className="mb-5 h-24 animate-pulse rounded-2xl bg-gray-200" />
        <div className="h-48 animate-pulse rounded-2xl bg-gray-200" />
      </div>
    );
  }

  return (
    <div className="bg-green-50/60 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
        <p className="mb-5 text-sm text-gray-500">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

        {/* User card */}
        <div className="mb-5 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-green-100">
              {user.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-green-700">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>

            <div>
              <p className="text-lg font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="rounded-lg border border-red-500 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            ↩ সাইন আউট
          </button>
        </div>

        {/* Info card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-semibold text-gray-900">তথ্য</h2>

          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <div>
              <label className={label}>নাম</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={input}
              />
            </div>

         

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-green-700 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60"
            >
              {saving ? 'অপেক্ষা করুন...' : 'আপডেট'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-sm text-red-500">
          <Link href="/">← হোম পেজে ফিরে যান</Link>
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;