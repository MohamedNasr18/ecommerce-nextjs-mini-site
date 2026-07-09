'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useWishlistStore } from '@/store/useWishlistStore';
import ProductCard from '@/components/ProductCard';

export default function WishlistClient() {
  const t = useTranslations('nav');
  const tCart = useTranslations('cart');
  const items = useWishlistStore((s) => s.items);

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">{t('wishlist')}</h1>
        <p className="text-gray-500 mb-6">
          {tCart('empty').replace('cart', 'wishlist')}
        </p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          {tCart('continue_shopping')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('wishlist')}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}