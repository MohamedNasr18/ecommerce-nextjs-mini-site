'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/types';

type SortOption = 'default' | 'price_asc' | 'price_desc';

export default function CategoryClient({
  products,
  locale,
}: {
  products: Product[];
  locale: string;
}) {
  const t = useTranslations('common');
  const [sort, setSort] = useState<SortOption>('default');

  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (sort === 'price_asc') return list.sort((a, b) => a.price - b.price);
    if (sort === 'price_desc') return list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, sort]);

  return (
    <div>
      <div className="flex justify-end mb-6">
        <label className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">{t('sort_by')}:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="default">--</option>
            <option value="price_asc">{t('price_asc')}</option>
            <option value="price_desc">{t('price_desc')}</option>
          </select>
        </label>
      </div>

      {sortedProducts.length === 0 ? (
        <p className="text-center text-gray-500 py-12">
          {locale === 'ar' ? 'لا توجد منتجات' : 'No products found'}
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
          {sortedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}