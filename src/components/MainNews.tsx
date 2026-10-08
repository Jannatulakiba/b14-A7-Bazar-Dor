import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '@/lib/products';

const MainNews = async () => {
  const products = await getProducts();
  const priceUp = products
    .filter((p) => p.change?.dir === 'up' && p.change.pct > 0)
    .slice(0, 6);
  const date = new Date().toLocaleDateString('bn-BD', { dateStyle: 'full' });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-6">
      {/* Hero card */}
      <section className="w-full rounded-2xl border border-gray-100 bg-white px-10 py-4 shadow-sm">
        <div className="flex items-center justify-between gap-6">
          <div className="flex max-w-xl flex-1 flex-col items-start gap-4">
            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
              {date}
            </span>

            <h1 className="text-4xl font-extrabold leading-tight text-gray-900">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-base leading-relaxed text-gray-600">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
              গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <Link
              href="#all-products"
              className="rounded-lg bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-green-800"
            >
              সব পণ্য দেখুন
            </Link>
          </div>

          <div className="relative hidden h-[300px] w-[300px] shrink-0 md:block">
            <Image
              src="/bazar-hero.png"
              alt="বাজারের দাম"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Price up section */}
      <section>
        <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
          <span className="text-sm text-red-600">▲</span>
          আজ দাম বেড়েছে
        </h2>

        {priceUp.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {priceUp.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">এই মুহূর্তে কোনো তথ্য নেই</p>
        )}
      </section>
    </div>
  );
};

export default MainNews;