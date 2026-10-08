import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, unitBn } from '@/lib/products';

// পূর্ণ সংখ্যা হলে ৬৬, ভগ্নাংশ হলে ৬৩.৫০
const bn = (n: number) =>
  n.toLocaleString('bn-BD', { minimumFractionDigits: Number.isInteger(n) ? 0 : 2 });

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const p = await getProductBySlug(slug);
  if (!p) notFound();

  const unit = unitBn[p.unit] ?? p.unit;
  const diff = p.today - p.yesterday;

  // প্রতি বাজারের গড়, কম থেকে বেশি সাজানো
  const markets = p.markets
    .map((m) => ({ ...m, avg: (m.min + m.max) / 2 }))
    .sort((a, b) => a.avg - b.avg);

  const lowest = Math.min(...p.markets.map((m) => m.min));
  const highest = Math.max(...p.markets.map((m) => m.max));
  const average = Math.round(markets.reduce((sum, m) => sum + m.avg, 0) / markets.length);

  const summary = [
    { title: 'সর্বনিম্ন দাম', value: lowest, note: 'সবচেয়ে কম দামের বাজার', color: 'text-green-600' },
    { title: 'সর্বাধিক দাম', value: highest, note: 'সবচেয়ে বেশি দামের বাজার', color: 'text-red-600' },
    { title: 'গড় দাম', value: average, note: `প্রতি ${unit}-এর হিসাবে`, color: 'text-green-700' },
  ];

  const trendColor =
    p.change.dir === 'up' ? 'text-red-600' : p.change.dir === 'down' ? 'text-green-600' : 'text-gray-500';
  const arrow = p.change.dir === 'up' ? '▲' : p.change.dir === 'down' ? '▼' : '—';

  return (
    <div className="bg-green-50/60 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-4 flex items-center gap-2 text-xs text-gray-600">
          <Link href="/" className="hover:text-green-700 hover:underline">
            হোম
          </Link>
          <span>›</span>
          <Link href={`/category/${p.category}`} className="hover:text-green-700 hover:underline">
            {p.categoryNameBn}
          </Link>
          <span>›</span>
          <span className="font-medium text-gray-900">{p.nameBn}</span>
        </nav>

        {/* Hero card */}
        <section className="mb-4 flex items-center justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gray-50 text-3xl">
              {p.image}
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">{p.nameBn}</h1>
              <p className="text-xs text-gray-500">
                প্রতি {unit} · {p.categoryNameBn}
              </p>
              <p className="mt-1 text-xs text-gray-800">
                গতকালের তুলনায় আজ দাম{' '}
                {diff === 0 ? (
                  <b>অপরিবর্তিত</b>
                ) : (
                  <>
                    <b>{diff > 0 ? 'বেড়েছে' : 'কমেছে'}</b> · {bn(Math.abs(diff))} টাকা
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-gray-50 px-5 py-3 text-center">
            <p className="text-xs text-gray-500">আজকের দাম</p>
            <p className="text-3xl font-extrabold text-gray-900">{bn(p.today)}</p>
            <p className="text-xs text-gray-500">টাকা / {unit}</p>
            <p className={`mt-1 text-xs font-semibold ${trendColor}`}>
              {arrow} {Math.abs(p.change.pct).toLocaleString('bn-BD', { minimumFractionDigits: 1 })}%
            </p>
          </div>
        </section>

        {/* Summary + table */}
        <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <h2 className="mb-3 font-bold text-gray-900">দামের সারসংক্ষেপ</h2>

          <div className="mb-6 grid gap-3 md:grid-cols-3">
            {summary.map((s) => (
              <div key={s.title} className="rounded-xl border border-gray-100 p-4">
                <p className="text-xs text-gray-500">{s.title}</p>
                <p className={`text-xl font-bold ${s.color}`}>
                  {bn(s.value)} <span className="text-sm font-medium">টাকা</span>
                </p>
                <p className="text-xs text-gray-500">{s.note}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-3 font-bold text-gray-900">বাজারভিত্তিক আজকের দাম</h2>

          <div className="overflow-x-auto rounded-xl border border-gray-100">
            <table className="w-full min-w-[560px] text-sm">
              <thead>
                <tr className="text-xs text-gray-500">
                  <th className="p-3 text-left font-normal">বাজার</th>
                  <th className="p-3 text-left font-normal">বিভাগ</th>
                  <th className="p-3 text-right font-normal">সর্বনিম্ন</th>
                  <th className="p-3 text-right font-normal">সর্বাধিক</th>
                  <th className="p-3 text-right font-normal">গড়</th>
                </tr>
              </thead>
              <tbody>
                {markets.map((m) => (
<tr key={m.market} className="border-t border-gray-900 even:bg-[#F0F5F0]">
                    <td className="p-3 font-semibold text-gray-900">{m.market}</td>
                    <td className="p-3 text-gray-600">{m.division}</td>
                    <td className="p-3 text-right">{bn(m.min)} টাকা</td>
                    <td className="p-3 text-right">{bn(m.max)} টাকা</td>
                    <td className="p-3 text-right font-bold text-gray-900">{bn(m.avg)} টাকা</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductPage;