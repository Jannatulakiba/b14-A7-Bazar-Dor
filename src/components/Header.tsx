'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';

interface Category {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

const Avatar = ({ name, image }: { name?: string; image?: string | null }) => {
  const [failed, setFailed] = useState(false);
  const initial = name?.trim()?.charAt(0)?.toUpperCase() ?? '?';
  const showImage = Boolean(image) && !failed;

  return (
    <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-green-100 text-sm font-bold text-green-700">
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={image ?? ''}
          alt={name ?? 'User avatar'}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>{initial}</span>
      )}
    </div>
  );
};

const Header = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);

  const date = new Date().toLocaleDateString('bn-BD', { dateStyle: 'full' });

  useEffect(() => {
    fetch('https://api.abcz.workers.dev/api/bazardor/categories')
      .then((res) => res.json())
      .then((json) => setCategories(Array.isArray(json) ? json : json.data ?? []))
      .catch(() => setCategories([]));
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    setOpen(false);
    router.push('/');
    router.refresh();
  };

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto max-w-7xl px-4">
        {/* Top row */}
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
              🛒
            </div>
            <div>
              <p className="text-lg font-bold leading-tight text-gray-900">বাজার দর</p>
              <p className="text-xs text-gray-500" suppressHydrationWarning>
                {date}
              </p>
            </div>
          </Link>

          {/* Right side */}
          {isPending ? null : user ? (
            <div className="relative">
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-sm font-medium text-gray-800"
              >
                <Avatar name={user.name} image={user.image} />
                {user.name}
                <span className="text-[10px] text-gray-500">▾</span>
              </button>

              {open && (
                <div className="absolute right-0 z-20 mt-2 w-44 rounded-xl border border-gray-100 bg-white py-1 shadow-lg">
                  <Link
                    href="/profile"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/sign-in" className="text-sm font-semibold text-gray-800">
                সাইন ইন
              </Link>
              <Link
                href="/sign-up"
                className="rounded-lg bg-green-700 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>

        {/* Category nav */}
        {categories.length > 0 && (
          <nav className="flex items-center justify-center gap-6 overflow-x-auto pb-3 text-sm text-gray-700">
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/category/${c.slug}`}
                className="flex shrink-0 items-center gap-1.5 hover:text-green-700"
              >
                <span>{c.icon}</span>
                {c.nameBn}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
