'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

export default function ProductDetailClient({ product }: { product: Product }) {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('product');
  const addToCart = useCartStore((s) => s.addItem);
  const { addItem, removeItem, isWishlisted } = useWishlistStore();

  const name = locale === 'ar' ? product.name_ar : product.name_en;
  const description = locale === 'ar' ? product.description_ar : product.description_en;
  const wishlisted = isWishlisted(product.id);

  const toggleWishlist = () => {
    if (wishlisted) removeItem(product.id);
    else addItem(product);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
          className="object-cover"
        />
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>

        <span
          className={`inline-block text-sm px-3 py-1 rounded-full mb-4 ${
            product.inStock
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {product.inStock ? t('in_stock') : t('out_of_stock')}
        </span>

        <h2 className="font-semibold mt-6 mb-2">{t('description')}</h2>
        <p className="text-gray-600 leading-relaxed">{description}</p>

        <div className="flex gap-3 mt-8">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="flex-1 bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            {t('add_to_cart')}
          </button>
          <button
            onClick={toggleWishlist}
            aria-label={wishlisted ? t('remove_from_wishlist') : t('add_to_wishlist')}
            aria-pressed={wishlisted}
            className="border border-gray-300 rounded-md p-3 hover:bg-gray-50 transition-colors"
          >
            <Heart
              size={22}
              className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
            />
          </button>
        </div>
      </div>
    </div>
  );
}