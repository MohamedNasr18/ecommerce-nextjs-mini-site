import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import CategoryClient from './CategoryClient';
import products from '../../../../../data/products.json';
import categories from '../../../../../data/categories.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateStaticParams() {
  const locales = ['en', 'ar'];
  return categories.flatMap((c) =>
    locales.map((locale) => ({
      locale,
      slug: c.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  const category = categories.find((c) => c.slug === slug);
  if (!category) return {};

  const name = locale === 'ar' ? category.name_ar : category.name_en;
  const title = `${name} | ShopNext`;
  const description =
    locale === 'ar'
      ? `تسوّق أحدث منتجات ${name} بأفضل الأسعار`
      : `Shop the latest ${name} products at the best prices`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/category/${slug}`,
      languages: {
        en: `${siteUrl}/en/category/${slug}`,
        ar: `${siteUrl}/ar/category/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/category/${slug}`,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const category = categories.find((c) => c.slug === slug);
  if (!category) notFound();

  const t = await getTranslations('nav');
  const categoryProducts = products.filter((p) => p.category === slug);
  const name = locale === 'ar' ? category.name_ar : category.name_en;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: t('home'), href: '/' },
          { label: t('categories'), href: '/' },
          { label: name },
        ]}
      />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6\">{name}</h1>
      <CategoryClient products={categoryProducts} locale={locale} />
    </div>
  );
}