'use client';

import { useMemo, useState } from 'react';
import { Product } from '@/lib/products';
import ProductCard from './ProductCard';

const sortOptions = [
  { value: 'default', label: 'ডিফল্ট' },
  { value: 'price-asc', label: 'দাম কম থেকে বেশি' },
  { value: 'price-desc', label: 'দাম বেশি থেকে কম' },
  
];

const CategoryProducts = ({ products }: { products: Product[] }) => {
  const [sort, setSort] = useState('default');

  const sorted = useMemo(() => {
    const list = [...products];
    switch (sort) {
      case 'price-asc':
        return list.sort((a, b) => a.today - b.today);
      case 'price-desc':
        return list.sort((a, b) => b.today - a.today);
      case 'rise':
        return list.sort((a, b) => b.change.pct - a.change.pct);
      case 'fall':
        return list.sort((a, b) => a.change.pct - b.change.pct);
      default:
        return list;
    }
  }, [products, sort]);

  return (
    <>
      <div className="mb-3 flex items-center justify-end gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm">
        <label htmlFor="sort" className="text-sm text-gray-500">
          সাজান
        </label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-800 focus:border-green-600 focus:outline-none"
        >
          {sortOptions.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mb-3 text-sm text-gray-500">
        মোট {products.length.toLocaleString('bn-BD')}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sorted.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </>
  );
};

export default CategoryProducts;