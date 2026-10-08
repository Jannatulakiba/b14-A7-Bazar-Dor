import { notFound } from 'next/navigation';
import { getProductsByCategory } from '@/lib/products';
import CategoryProducts from '@/components/CategoryProducts';

const CategoryPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  if (products.length === 0) notFound();

  const { categoryNameBn, categoryIcon } = products[0];

  return (
    <div className="bg-green-50/60 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-5 shadow-sm">
          <span className="text-4xl">{categoryIcon}</span>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{categoryNameBn}</h1>
            <p className="text-sm text-gray-500">
              {products.length.toLocaleString('bn-BD')}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        <CategoryProducts products={products} />
      </div>
    </div>
  );
};

export default CategoryPage;