'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { Minus, Plus, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function CartClient() {
  const locale = useLocale() as 'en' | 'ar';
  const t = useTranslations('cart');
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">{t('title')}</h1>
        <p className="text-gray-500 mb-6">{t('empty')}</p>
        <Link
          href="/"
          className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
        >
          {t('continue_shopping')}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>

      <div className="grid md:grid-cols-3 gap-4 sm:gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => {
            const name = locale === 'ar' ? product.name_ar : product.name_en;
            return (
              <div
                key={product.id}
                className="flex gap-2 sm:gap-4 border border-gray-200 rounded-lg p-3 sm:p-4"
              >
                <div className="relative w-16 sm:w-20 h-16 sm:h-20 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                  <Image src={product.image} alt={name} fill className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${product.id}`}
                    className="font-medium hover:underline line-clamp-1"
                  >
                    {name}
                  </Link>
                  <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-1.5 hover:bg-gray-100"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-3 text-sm" aria-live="polite">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label="Increase quantity"
                        className="p-1.5 hover:bg-gray-100"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(product.id)}
                      aria-label={t('remove')}
                      className="text-sm text-red-600 hover:underline flex items-center gap-1"
                    >
                      <X size={14} />
                      {t('remove')}
                    </button>
                  </div>
                </div>

                <p className="font-semibold whitespace-nowrap">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="border border-gray-200 rounded-lg p-6 h-fit">
          <div className="flex justify-between mb-4 text-lg font-semibold">
            <span>{t('subtotal')}</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            className="block text-center bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            {t('checkout')}
          </Link>
        </div>
      </div>
    </div>
  );
}