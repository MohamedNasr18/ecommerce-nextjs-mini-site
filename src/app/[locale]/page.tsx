import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { Product, Category } from '@/types';
import productsData from '../../../data/products.json';
import categoriesData from '../../../data/categories.json';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ar' }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });

  

  return {
    title: t('hero_title'),
    description: t('hero_subtitle'),
    openGraph: {
      title: t('hero_title'),
      description: t('hero_subtitle'),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('hero_title'),
      description: t('hero_subtitle'),
    },
    alternates: {
      languages: {
        en: '/en',
        ar: '/ar',
      },
    },
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
 const products = productsData;
const categories = categoriesData;
  
  const featuredProducts = products.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <div className="grid grid-cols-12 gap-8 items-center bg-[#f3f0f1] p-8 lg:p-12">
        {/* Left - Text */}
        <div className="col-span-12 md:col-span-6 flex flex-col items-start justify-center gap-6 px-4 md:px-8">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-slate-900">
            {t('hero_title')}
          </h1>

          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            {t('hero_subtitle')}
          </p>

          <Link
            href={`/${locale}#featured-categories`}
            className="bg-black text-white px-8 py-3 rounded-full hover:bg-slate-800 transition-colors font-medium"
          >
            {t('hero_cta')}
          </Link>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-slate-900">200+</span>
              <span className="text-slate-500 text-xs md:text-sm">
                {locale === 'ar' ? 'علامة تجارية عالمية' : 'International Brands'}
              </span>
            </div>
            <div className="w-px h-12 bg-slate-300 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-slate-900">2,000+</span>
              <span className="text-slate-500 text-xs md:text-sm">
                {locale === 'ar' ? 'منتج عالي الجودة' : 'High-Quality Products'}
              </span>
            </div>
            <div className="w-px h-12 bg-slate-300 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-2xl md:text-3xl font-bold text-slate-900">30,000+</span>
              <span className="text-slate-500 text-xs md:text-sm">
                {locale === 'ar' ? 'عميل سعيد' : 'Happy Customers'}
              </span>
            </div>
          </div>
        </div>

        {/* Right - Image */}
        <div className="col-span-12 md:col-span-6 flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-square bg-slate-200 rounded-3xl overflow-hidden">
            <Image
              src="/images/hero.jpg"
              alt={t('hero_title')}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section id="featured-categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
          {t('featured_categories')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => {
            const categoryName = locale === 'ar' ? category.name_ar : category.name_en;
            return (
              <Link
                key={category.slug}
                href={`/${locale}/category/${category.slug}`}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 hover:shadow-xl transition-all"
              >
                <Image
                  src={category.image}
                  alt={categoryName}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                  <h3 className="text-white font-semibold text-lg">{categoryName}</h3>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/category/all`}
            className="inline-block px-8 py-3 border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-colors font-medium text-slate-700"
          >
            {t('view_all')}
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-slate-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-900">
          {t('featured_products')}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href={`/${locale}/category/all`}
            className="inline-block px-8 py-3 border-2 border-slate-200 rounded-full hover:bg-slate-50 transition-colors font-medium text-slate-700 bg-white"
          >
            {t('view_all')}
          </Link>
        </div>
      </section>
    </>
  );
}
