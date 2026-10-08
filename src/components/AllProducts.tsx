import { getProducts } from '@/lib/products';
import ProductCard from './ProductCard';

const AllProducts = async () => {
  const products = await getProducts();

  return (
    <section id="all-products" className="rounded-2xl bg-gray-50 p-4">
      <h2 className="text-2xl font-bold text-gray-900">সব পণ্য</h2>
      <p className="mb-4 text-sm text-gray-500">
        সব পণ্যের আজকের দাম ও দামের পরিবর্তন এক জায়গায় দেখুন
      </p>

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">এই মুহূর্তে কোনো তথ্য নেই</p>
      )}
    </section>
  );
};

export default AllProducts;