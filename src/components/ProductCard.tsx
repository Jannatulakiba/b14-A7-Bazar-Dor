import Link from 'next/link';
import { Product, unitBn } from '@/lib/products';

const ProductCard = ({ p }: { p: Product }) => {
  const dir = p.change?.dir;
  const pct = Math.abs(p.change?.pct ?? 0);

  const pill =
    dir === 'up'
      ? 'bg-red-50 text-red-600'
      : dir === 'down'
      ? 'bg-green-50 text-green-600'
      : 'bg-gray-100 text-gray-500';

  const symbol = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—';

  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-50 text-2xl">
          {p.image}
        </div>
        <div>
          <p className="text-lg font-bold text-gray-900">{p.nameBn}</p>
          <p className="text-sm text-gray-500">প্রতি {unitBn[p.unit] ?? p.unit}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-xl font-bold text-gray-900">
            {p.today.toLocaleString('bn-BD')} টাকা
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${pill}`}>
          {symbol} {pct.toLocaleString('bn-BD', { minimumFractionDigits: 1 })}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;