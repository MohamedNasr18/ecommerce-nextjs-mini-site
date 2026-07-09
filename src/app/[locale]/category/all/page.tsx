import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Breadcrumb from '@/components/Breadcrumb';
import CategoryClient from '../[slug]/CategoryClient';
import products from '../../../../../data/products.json';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const title = locale === 'ar' ? 'كل المنتجات | ShopNext' : 'All Products | ShopNext';
  const description =
    locale === 'ar'
      ? 'تصفح كل منتجاتنا في مكان واحد'
      : 'Browse all our products in one place';

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}/category/all`,
      languages: {
        en: `${siteUrl}/en/category/all`,
        ar: `${siteUrl}/ar/category/all`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}/category/all`,
      locale: locale === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
    },
  };
}

export default async function AllProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations('nav');
  const title = locale === 'ar' ? 'كل المنتجات' : 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Breadcrumb
        items={[
          { label: t('home'), href: '/' },
          { label: title },
        ]}
      />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6\">{title}</h1>
      <CategoryClient products={products} locale={locale} />
    </div>
  );
}