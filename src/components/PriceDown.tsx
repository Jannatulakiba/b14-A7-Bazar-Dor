import { getProducts } from '@/lib/products';
import ProductCard from './ProductCard';

const PriceDown = async () => {
  const products = await getProducts();

  const down = products
    .filter((p) => p.change?.dir === 'down')
    .sort((a, b) => a.change.pct - b.change.pct) // most negative first
    .slice(0, 6);

  if (down.length === 0) return null;

  return (
    <section>
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-gray-900">
        <span className="text-sm text-green-600">▼</span>
        আজ দাম কমেছে
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {down.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
};

export default PriceDown;