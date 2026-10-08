'use client';

import React, { useEffect, useState } from 'react';
import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';

interface Product {
  id: number;
  nameBn: string;
  image: string;
  today: number;
  change: { dir: 'up' | 'down'; pct: number };
}

const Marquee = () => {
  const [products, setProducts] = useState<Product[]>([]);

useEffect(() => {
  fetch('https://api.api-store.workers.dev/api/bazardor/products')
    .then((res) => res.json())
    .then((json) => setProducts(Array.isArray(json) ? json : json.data ?? []))
    .catch(() => setProducts([]));
}, []);

  return (
    <div className="border-y border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto">
        {products.length > 0 ? (
          <MarqueeText className="py-3" direction="right" duration={10}>
            {products.map((p) => (
              <span key={p.id} className="flex items-center gap-2 px-6 text-sm">
                <span>{p.image}</span>
                <span className="font-medium">{p.nameBn}</span>
                <span className="text-gray-600">
                  {p.today.toLocaleString('bn-BD')} টাকা/কেজি
                </span>
                <span
                  className={`font-semibold ${
                    p.change.dir === 'up' ? 'text-red-600' : 'text-green-600'
                  }`}
                >
                  {p.change.dir === 'up' ? '▲' : '▼'}{' '}
                  {p.change.pct.toLocaleString('bn-BD', { minimumFractionDigits: 1 })}%
                </span>
              </span>
            ))}
          </MarqueeText>
        ) : (
          <p className="py-3 px-4 text-sm text-gray-500">
            এই মুহূর্তে কোনো দাম পাওয়া যাচ্ছে না
          </p>
        )}
      </div>
    </div>
  );
};

export default Marquee;