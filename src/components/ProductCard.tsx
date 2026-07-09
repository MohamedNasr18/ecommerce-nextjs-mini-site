'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { ShoppingCart, Heart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import { useWishlistStore } from '@/store/useWishlistStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale();
  const t = useTranslations('product');
  const addToCart = useCartStore((s) => s.addItem);
  const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  
  const isWishlisted = wishlistItems.some((item) => item.id === product.id);
  const productName = locale === 'ar' ? product.name_ar : product.name_en;
  const productDescription = locale === 'ar' ? product.description_ar : product.description_en;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.inStock) {
      addToCart(product);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Link href={`/${locale}/product/${product.id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-200 transition-all hover:shadow-lg">
        {/* Image */}
        <div className="relative aspect-square bg-slate-50 overflow-hidden">
          <Image
            src={product.image}
            alt={productName}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          {/* Stock badge */}
          {!product.inStock && (
            <div className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {t('out_of_stock')}
            </div>
          )}

          {/* Wishlist button */}
          <button
            onClick={handleToggleWishlist}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
            aria-label={isWishlisted ? t('remove_from_wishlist') : t('add_to_wishlist')}
          >
            <Heart
              size={18}
              className={isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}
            />
          </button>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-sm sm:text-base text-slate-900 mb-1 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {productName}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mb-3 line-clamp-2">
            {productDescription}
          </p>

          {/* Price & Action */}
          <div className="flex items-center justify-between gap-2">
            <div className="text-xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`p-2 rounded-full transition-colors ${
                product.inStock
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
              aria-label={`${t('add_to_cart')} - ${productName}`}
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
