export interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  image: string;
  unit: string;
  today: number;
  change: { dir: 'up' | 'down' | 'flat'; pct: number };
}

export interface ProductDetail extends Product {
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  markets: Market[];
}

export interface Category {
  id: number;
  slug: string;
  nameBn: string;
  icon: string;
}

export const unitBn: Record<string, string> = {
  kg: 'কেজি',
  l: 'লিটার',
  litre: 'লিটার',
  dozen: 'ডজন',
  pcs: 'পিস',
  piece: 'পিস',
};

const API = 'https://openapi.programming-hero.com/api/bazardor';

const getList = async <T,>(url: string, revalidate: number): Promise<T[]> => {
  try {
    const res = await fetch(url, { next: { revalidate } });
    if (!res.ok) return [];
    const json: unknown = await res.json();
    if (Array.isArray(json)) return json as T[];
    if (typeof json === 'object' && json !== null && 'data' in json && Array.isArray(json.data)) {
      return json.data as T[];
    }
    return [];
  } catch {
    return [];
  }
};

export const getProducts = () => getList<ProductDetail>(`${API}/products`, 300);

export const getProductsByCategory = (slug: string) =>
  getList<ProductDetail>(`${API}/products?category=${encodeURIComponent(slug)}`, 300);

export const getCategories = () => getList<Category>(`${API}/categories`, 3600);

export const getProductBySlug = async (slug: string): Promise<ProductDetail | null> => {
  const list = await getProducts();
  return list.find((p) => p.slug === slug) ?? null;
};